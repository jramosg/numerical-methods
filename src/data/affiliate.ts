import type { Lang } from "./site";

type LocalizedText = Record<Lang, string>;

export type AffiliateBook = {
  title: LocalizedText;
  description: LocalizedText;
  href: string;
  image?: string;
  cover?: "python";
  imageAlt: LocalizedText;
  fit: LocalizedText;
};

/** Curated books shown alongside the numerical-methods guides. */
export const affiliateBooks: AffiliateBook[] = [
  {
    title: {
      es: "Análisis numérico — Burden y Faires",
      eu: "Análisis numerikoa — Burden eta Faires",
      en: "Numerical Analysis — Burden & Faires"
    },
    description: {
      es: "Manual de referencia para profundizar en los métodos de toda la guía.",
      eu: "Gida osoko metodoetan sakontzeko erreferentziazko eskuliburua.",
      en: "A reference textbook for going deeper into the methods covered here."
    },
    href: "https://link.amazon/B077ZHZAc",
    image: "/affiliate-books/analisis-numerico.png",
    imageAlt: {
      es: "Portada de Análisis numérico, de Burden y Faires",
      eu: "Burden eta Faireren Análisis numerikoa liburuaren azala",
      en: "Cover of Numerical Analysis by Burden and Faires"
    },
    fit: {
      es: "Fundamentos · teoría y demostraciones",
      eu: "Oinarriak · teoria eta frogapenak",
      en: "Foundations · theory and derivations"
    }
  },
  {
    title: {
      es: "Numerical Methods for Engineers, 7th ed.",
      eu: "Numerical Methods for Engineers, 7. edizioa",
      en: "Numerical Methods for Engineers, 7th ed."
    },
    description: {
      es: "Un enfoque aplicado a la ingeniería, con métodos y ejemplos de cálculo.",
      eu: "Ingeniaritzara bideratutako ikuspegia, metodo eta kalkulu-adibideekin.",
      en: "An engineering-focused treatment with methods and worked calculations."
    },
    href: "https://link.amazon/B0jfzGEXr",
    image: "/affiliate-books/numerical-methods-engineers.png",
    imageAlt: {
      es: "Portada de Numerical Methods for Engineers, séptima edición",
      eu: "Numerical Methods for Engineers zazpigarren edizioaren azala",
      en: "Cover of Numerical Methods for Engineers, seventh edition"
    },
    fit: {
      es: "Aplicaciones · ingeniería y cálculo",
      eu: "Aplikazioak · ingeniaritza eta kalkulua",
      en: "Applications · engineering and computation"
    }
  },
  {
    title: {
      es: "Numerical Methods in Engineering with Python 3",
      eu: "Numerical Methods in Engineering with Python 3",
      en: "Numerical Methods in Engineering with Python 3"
    },
    description: {
      es: "Para conectar la teoría con implementaciones reproducibles en Python.",
      eu: "Teoria Python-eko inplementazio erreproduzigarriekin lotzeko.",
      en: "For connecting the theory to reproducible Python implementations."
    },
    href: "https://link.amazon/B0g3ZUdfk",
    cover: "python",
    imageAlt: {
      es: "Numerical Methods in Engineering with Python 3",
      eu: "Numerical Methods in Engineering with Python 3",
      en: "Numerical Methods in Engineering with Python 3"
    },
    fit: {
      es: "Implementación · Python 3",
      eu: "Inplementazioa · Python 3",
      en: "Implementation · Python 3"
    }
  }
];
