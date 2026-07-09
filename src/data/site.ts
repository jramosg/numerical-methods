export const languages = ["es", "eu", "en"] as const;

export type Lang = (typeof languages)[number];

export const defaultLang: Lang = "es";

export const langNames: Record<Lang, string> = {
  es: "Español",
  eu: "Euskera",
  en: "English"
};

export const siteName = "Métodos Numéricos";

export const navLabels: Record<Lang, Record<string, string>> = {
  es: {
    home: "Inicio",
    syllabus: "Temario",
    articles: "Guía",
    derivations: "Deducciones",
    exercises: "Ejercicios",
    formulas: "Formulario",
    support: "Apoyar"
  },
  eu: {
    home: "Hasiera",
    syllabus: "Gaiak",
    articles: "Gida",
    derivations: "Frogapenak",
    exercises: "Ariketak",
    formulas: "Formularioa",
    support: "Lagundu"
  },
  en: {
    home: "Home",
    syllabus: "Syllabus",
    articles: "Guide",
    derivations: "Derivations",
    exercises: "Exercises",
    formulas: "Formula sheet",
    support: "Support"
  }
};

const bmcUser = import.meta.env.PUBLIC_BMC_USERNAME || "";
const koFiUser = import.meta.env.PUBLIC_KOFI_USERNAME || "";

export const monetization = {
  buyMeACoffeeUser: bmcUser,
  buyMeACoffeeUrl: bmcUser
    ? `https://www.buymeacoffee.com/${bmcUser}`
    : "",
  koFiUser,
  koFiUrl: koFiUser ? `https://ko-fi.com/${koFiUser}` : "",
  email: import.meta.env.PUBLIC_CONTACT_EMAIL || ""
};

export function localPath(lang: Lang, path = "") {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `/${lang}/${clean}`.replace(/\/$/, "") || `/${lang}`;
}

export function getAlternateLinks(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const rest = languages.includes(parts[0] as Lang)
    ? parts.slice(1).join("/")
    : parts.join("/");

  return languages.map((lang) => ({
    lang,
    href: localPath(lang, rest)
  }));
}
