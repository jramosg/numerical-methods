import katex from "katex";
import type { Lang } from "./site";
import { allContent } from "./content";

type LinkTarget = { type: string; title: Record<Lang, string> };

let slugIndex: Map<string, LinkTarget> | null = null;

function getIndex(): Map<string, LinkTarget> {
  if (!slugIndex) {
    slugIndex = new Map(
      allContent().map((entry) => [
        entry.slug,
        { type: entry.type, title: entry.title }
      ])
    );
  }
  return slugIndex;
}

const escapeHtml = (raw: string) =>
  raw
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/**
 * Strip rich-text markup for plain-text contexts (meta tags, JSON-LD):
 * `$...$` keeps its inner TeX source, `[[slug|label]]` keeps the label,
 * `[[slug]]` keeps the target title (or the slug if unknown).
 */
export function plainText(text: string, lang: Lang): string {
  return text
    .replace(/\$([^$]+)\$/g, "$1")
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, slug: string, label?: string) => {
      if (label) return label;
      const target = getIndex().get(slug.trim());
      return target?.title[lang] ?? slug.trim();
    });
}

/**
 * Render prose to HTML with two inline extensions:
 *
 * - `$...$` renders as inline KaTeX math.
 * - `[[slug]]` / `[[slug|label]]` renders as an internal link to the content
 *   entry with that slug. Without a label, the target's localized title is
 *   used. Unknown slugs degrade to plain text so a typo never breaks a page.
 *
 * Everything else is HTML-escaped.
 */
export function richText(text: string, lang: Lang): string {
  const pattern = /\$([^$]+)\$|\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  let html = "";
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    html += escapeHtml(text.slice(last, match.index));
    last = match.index + match[0].length;
    if (match[1] !== undefined) {
      html += katex.renderToString(match[1], { throwOnError: false });
    } else {
      const slug = match[2].trim();
      const target = getIndex().get(slug);
      const label = match[3] ?? target?.title[lang] ?? slug;
      html += target
        ? `<a class="wiki-link" href="/${lang}/${target.type}/${slug}/">${escapeHtml(label)}</a>`
        : escapeHtml(label);
    }
  }
  html += escapeHtml(text.slice(last));
  return html;
}
