import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = process.env.PUBLIC_SITE_URL || "https://metodosnumericos.dev";

export default defineConfig({
  site,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es-ES",
          eu: "eu-ES",
          en: "en-US"
        }
      }
    })
  ]
});
