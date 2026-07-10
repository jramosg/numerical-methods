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
    search: "Buscar",
    syllabus: "Temario",
    articles: "Guía",
    derivations: "Deducciones",
    exercises: "Ejercicios",
    map: "Mapa",
    comparisons: "Comparativas",
    glossary: "Glosario",
    formulas: "Formulario",
    support: "Apoyar",
    about: "Sobre el proyecto",
    legal: "Aviso legal y privacidad",
    contact: "Contacto"
  },
  eu: {
    home: "Hasiera",
    search: "Bilatu",
    syllabus: "Gaiak",
    articles: "Gida",
    derivations: "Frogapenak",
    exercises: "Ariketak",
    map: "Mapa",
    comparisons: "Konparatibak",
    glossary: "Glosarioa",
    formulas: "Formularioa",
    support: "Lagundu",
    about: "Proiektuari buruz",
    legal: "Lege oharra eta pribatutasuna",
    contact: "Kontaktua"
  },
  en: {
    home: "Home",
    search: "Search",
    syllabus: "Syllabus",
    articles: "Guide",
    derivations: "Derivations",
    exercises: "Exercises",
    map: "Map",
    comparisons: "Comparisons",
    glossary: "Glossary",
    formulas: "Formula sheet",
    support: "Support",
    about: "About the project",
    legal: "Legal & privacy",
    contact: "Contact"
  }
};

export const uiStrings: Record<
  Lang,
  {
    skip: string;
    mainNav: string;
    langSelector: string;
    footerNav: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
    explore: string;
  }
> = {
  es: {
    skip: "Saltar al contenido",
    mainNav: "Navegación principal",
    langSelector: "Idioma",
    footerNav: "Navegación del pie de página",
    menu: "Menú",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    explore: "Explorar"
  },
  eu: {
    skip: "Joan edukira",
    mainNav: "Nabigazio nagusia",
    langSelector: "Hizkuntza",
    footerNav: "Oineko nabigazioa",
    menu: "Menua",
    openMenu: "Ireki menua",
    closeMenu: "Itxi menua",
    explore: "Arakatu"
  },
  en: {
    skip: "Skip to content",
    mainNav: "Main navigation",
    langSelector: "Language",
    footerNav: "Footer navigation",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    explore: "Explore"
  }
};

export const ogLocales: Record<Lang, string> = {
  es: "es_ES",
  eu: "eu_ES",
  en: "en_US"
};

const categoryLabels: Record<string, Record<Lang, string>> = {
  Fundamentos: { es: "Fundamentos", eu: "Oinarriak", en: "Foundations" },
  Interpolación: { es: "Interpolación", eu: "Interpolazioa", en: "Interpolation" },
  Diferenciación: { es: "Diferenciación", eu: "Deribazioa", en: "Differentiation" },
  Integración: { es: "Integración", eu: "Integrazioa", en: "Integration" },
  EDO: { es: "EDO", eu: "EDA", en: "ODEs" },
  "Sistemas lineales": {
    es: "Sistemas lineales",
    eu: "Sistema linealak",
    en: "Linear systems"
  },
  "Ecuaciones no lineales": {
    es: "Ecuaciones no lineales",
    eu: "Ekuazio ez-linealak",
    en: "Nonlinear equations"
  },
  "Sistemas no lineales": {
    es: "Sistemas no lineales",
    eu: "Sistema ez-linealak",
    en: "Nonlinear systems"
  }
};

export function categoryLabel(category: string, lang: Lang): string {
  return categoryLabels[category]?.[lang] ?? category;
}

const levelLabels: Record<string, Record<Lang, string>> = {
  base: { es: "base", eu: "oinarrizkoa", en: "basic" },
  medio: { es: "medio", eu: "ertaina", en: "intermediate" },
  avanzado: { es: "avanzado", eu: "aurreratua", en: "advanced" }
};

export function levelLabel(level: string, lang: Lang): string {
  return levelLabels[level]?.[lang] ?? level;
}

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
