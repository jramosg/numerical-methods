#!/bin/sh
set -eu

: "${IMAGE:?IMAGE must be an immutable image tag}"

compose_file="docker-compose.prod.yml"
env_file=".deploy.env"
rollback_file=".rollback-image"
previous_image=""

if [ -f "$env_file" ]; then
  previous_image=$(sed -n 's/^IMAGE=//p' "$env_file" | head -n 1)
fi

rollback_image="$previous_image"
if [ "$previous_image" = "$IMAGE" ]; then
  rollback_image=""
  if [ -f "$rollback_file" ]; then
    rollback_image=$(head -n 1 "$rollback_file")
  fi
fi

cleanup_images() {
  repository=${IMAGE%:*}
  images=$(docker image ls --format '{{.Repository}}:{{.Tag}}') || return 1
  while IFS= read -r old_image; do
    # Match the exact repository, including tags from before cleanup existed.
    case "$old_image" in
      "$repository":sha-*) ;;
      *) continue ;;
    esac
    [ "$old_image" != "$IMAGE" ] || continue
    [ "$old_image" != "$rollback_image" ] || continue

    # Include stopped containers, and never force removal if a race occurs.
    containers=$(docker ps -aq --filter "ancestor=$old_image") || return 1
    [ -z "$containers" ] || continue
    if ! docker image rm "$old_image"; then
      echo "Warning: could not remove old image: $old_image" >&2
    fi
  done <<EOF
$images
EOF
}

write_env() {
  umask 077
  {
    printf 'IMAGE=%s\n' "$1"
    printf 'APP_PORT=%s\n' "${APP_PORT:-4321}"
  } > "$env_file"
}

wait_until_healthy() {
  attempt=1
  while [ "$attempt" -le 20 ]; do
    container_id=$(docker compose --env-file "$env_file" \
      -f "$compose_file" ps -q web)
    health=$(docker inspect --format '{{.State.Health.Status}}' \
      "$container_id" 2>/dev/null || true)
    [ "$health" = "healthy" ] && return 0
    sleep 3
    attempt=$((attempt + 1))
  done
  return 1
}

write_env "$IMAGE"
if ! docker compose --env-file "$env_file" -f "$compose_file" pull web; then
  if [ -n "$previous_image" ]; then
    write_env "$previous_image"
  else
    rm -f "$env_file"
  fi
  exit 1
fi
docker compose --env-file "$env_file" -f "$compose_file" \
  up -d --remove-orphans --wait --wait-timeout 60 web || true

if wait_until_healthy; then
  (umask 077; printf '%s\n' "$rollback_image" > "$rollback_file")
  if ! cleanup_images; then
    echo "Warning: image cleanup failed; deployment remains healthy" >&2
  fi
  echo "Deployment is healthy: $IMAGE"
  exit 0
fi

docker compose --env-file "$env_file" -f "$compose_file" logs --tail=100 web

if [ -n "$previous_image" ] && [ "$previous_image" != "$IMAGE" ]; then
  echo "Health check failed; rolling back to $previous_image" >&2
  write_env "$previous_image"
  docker compose --env-file "$env_file" -f "$compose_file" \
    up -d --remove-orphans web
  wait_until_healthy || {
    echo "Rollback also failed" >&2
    exit 1
  }
fi

exit 1

