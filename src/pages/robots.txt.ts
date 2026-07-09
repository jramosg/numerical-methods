import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, "") || "https://metodosnumericos.dev";
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap-index.xml\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};
