#!/bin/sh
set -eu

: "${IMAGE:?IMAGE must be an immutable image tag}"

compose_file="docker-compose.prod.yml"
env_file=".deploy.env"
previous_image=""

if [ -f "$env_file" ]; then
  previous_image=$(sed -n 's/^IMAGE=//p' "$env_file" | head -n 1)
fi

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
docker compose --env-file "$env_file" -f "$compose_file" pull web
docker compose --env-file "$env_file" -f "$compose_file" \
  up -d --remove-orphans --wait --wait-timeout 60 web || true

if wait_until_healthy; then
  docker image prune -f >/dev/null
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

