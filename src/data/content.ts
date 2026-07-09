import type { Lang } from "./site";
import {
  fundamentosArticles,
  fundamentosDerivations,
  fundamentosExercises
} from "./topics/fundamentos";
import {
  interpolacionArticles,
  interpolacionDerivations,
  interpolacionExercises
} from "./topics/interpolacion";
import {
  diferenciacionArticles,
  diferenciacionDerivations,
  diferenciacionExercises
} from "./topics/diferenciacion";
import {
  integracionArticles,
  integracionDerivations,
  integracionExercises
} from "./topics/integracion";
import {
  edoUnpasoArticles,
  edoUnpasoDerivations,
  edoUnpasoExercises
} from "./topics/edo-unpaso";
import {
  edoMultipasoArticles,
  edoMultipasoDerivations,
  edoMultipasoExercises
} from "./topics/edo-multipaso";
import {
  sistemasLinealesArticles,
  sistemasLinealesDerivations,
  sistemasLinealesExercises
} from "./topics/sistemas-lineales";
import {
  noLinealesArticles,
  noLinealesDerivations,
  noLinealesExercises
} from "./topics/ecuaciones-no-lineales";
import {
  sistemasNoLinealesArticles,
  sistemasNoLinealesDerivations,
  sistemasNoLinealesExercises
} from "./topics/sistemas-no-lineales";

type LocalizedText = Record<Lang, string>;
type LocalizedList = Record<Lang, string[]>;

/** A single labelled step inside a derivation or worked example. */
export type Step = {
  text: LocalizedText;
  formula?: string;
};

/**
 * Rich content blocks. Prose fields support inline math ($...$) and wiki
 * links ([[slug]] / [[slug|label]]), rendered by src/data/richtext.ts.
 */
export type Block =
  | { kind: "paragraph"; text: LocalizedText }
  | { kind: "formula"; tex: string; caption?: LocalizedText }
  | { kind: "steps"; title?: LocalizedText; steps: Step[] }
  | {
      kind: "example";
      title?: LocalizedText;
      statement: LocalizedText;
      steps: Step[];
      result?: Step;
    }
  | {
      kind: "callout";
      variant: "theorem" | "definition" | "note" | "warning";
      title?: LocalizedText;
      text: LocalizedText;
      formula?: string;
    }
  | { kind: "list"; ordered?: boolean; items: LocalizedList }
  | {
      kind: "table";
      head: LocalizedList;
      rows: string[][];
      caption?: LocalizedText;
    }
  /**
   * Transclusion: renders the full derivation entry with the given slug
   * inline inside the article, so readers never have to leave the page to
   * see the deducción. The standalone /deducciones/ page remains as the
   * canonical copy of the same data.
   */
  | { kind: "derivation"; slug: string };

export type Section = {
  heading: LocalizedText;
  blocks?: Block[];
  /** Legacy fields, kept only for backwards type-compatibility. */
  body?: LocalizedList;
  formula?: string;
  bullets?: LocalizedList;
};

export type ContentEntry = {
  slug: string;
  category: string;
  level: "base" | "medio" | "avanzado";
  searchIntent: string;
  title: LocalizedText;
  description: LocalizedText;
  keywords: string[];
  /** Slugs of prerequisite / related topics, surfaced in the sidebar. */
  prerequisites?: string[];
  related?: string[];
  sections: Section[];
};

// Areas in study order: fundamentos (t2) → interpolación (t3) →
// diferenciación (t4) → integración (t5) → EDO un paso (t6) →
// EDO multipaso (t7) → sistemas lineales (t8) → ecuaciones no lineales (t9)
// → sistemas no lineales (t10).
export const articles: ContentEntry[] = [
  ...fundamentosArticles,
  ...interpolacionArticles,
  ...diferenciacionArticles,
  ...integracionArticles,
  ...edoUnpasoArticles,
  ...edoMultipasoArticles,
  ...sistemasLinealesArticles,
  ...noLinealesArticles,
  ...sistemasNoLinealesArticles
];

export const derivations: ContentEntry[] = [
  ...fundamentosDerivations,
  ...interpolacionDerivations,
  ...diferenciacionDerivations,
  ...integracionDerivations,
  ...edoUnpasoDerivations,
  ...edoMultipasoDerivations,
  ...sistemasLinealesDerivations,
  ...noLinealesDerivations,
  ...sistemasNoLinealesDerivations
];

export const exercises: ContentEntry[] = [
  ...fundamentosExercises,
  ...interpolacionExercises,
  ...diferenciacionExercises,
  ...integracionExercises,
  ...edoUnpasoExercises,
  ...edoMultipasoExercises,
  ...sistemasLinealesExercises,
  ...noLinealesExercises,
  ...sistemasNoLinealesExercises
];

/** Formula sheet, one group per area, in study order. */
export const formulaGroups = [
  {
    title: {
      es: "Errores y Taylor",
      eu: "Erroreak eta Taylor",
      en: "Errors and Taylor"
    },
    formulas: [
      "\\varepsilon=|y-\\hat y|,\\qquad \\varepsilon_r=\\frac{|y-\\hat y|}{|y|}",
      "\\varepsilon_k=|\\hat y_{k+1}-\\hat y_k|",
      "f(x+h)=\\sum_{j=0}^{m}\\frac{f^{(j)}(x)}{j!}h^j+\\frac{f^{(m+1)}(\\xi)}{(m+1)!}h^{m+1}"
    ]
  },
  {
    title: {
      es: "Interpolación",
      eu: "Interpolazioa",
      en: "Interpolation"
    },
    formulas: [
      "L_i(x)=\\prod_{j\\ne i}\\frac{x-x_j}{x_i-x_j},\\qquad p_n(x)=\\sum_{i=0}^n L_i(x)f(x_i)",
      "f[x_0,\\dots,x_k]=\\frac{f[x_1,\\dots,x_k]-f[x_0,\\dots,x_{k-1}]}{x_k-x_0}",
      "f(x)-p_n(x)=\\frac{f^{(n+1)}(\\xi)}{(n+1)!}\\prod_{i=0}^n(x-x_i)"
    ]
  },
  {
    title: {
      es: "Diferenciación",
      eu: "Deribazioa",
      en: "Differentiation"
    },
    formulas: [
      "f'(x)\\approx\\frac{f(x+h)-f(x)}{h}",
      "f'(x)\\approx\\frac{f(x+h)-f(x-h)}{2h}",
      "f''(x)\\approx\\frac{f(x+h)-2f(x)+f(x-h)}{h^2}"
    ]
  },
  {
    title: {
      es: "Integración",
      eu: "Integrazioa",
      en: "Integration"
    },
    formulas: [
      "M_n=h\\sum_{i=0}^{n-1}f\\left(\\frac{x_i+x_{i+1}}{2}\\right)",
      "T_n=\\frac{h}{2}\\left(f_0+2\\sum_{i=1}^{n-1}f_i+f_n\\right)",
      "S_n=\\frac{h}{3}\\left(f_0+f_n+4\\sum_{i\\ odd}f_i+2\\sum_{i\\ even}f_i\\right)",
      "\\int_a^b f(x)dx=\\frac{b-a}{2}\\int_{-1}^{1}f\\left(\\frac{a+b}{2}+\\frac{b-a}{2}t\\right)dt"
    ]
  },
  {
    title: {
      es: "EDO: métodos de un paso",
      eu: "EDO: urrats bakarreko metodoak",
      en: "ODE: one-step methods"
    },
    formulas: [
      "y_{k+1}=y_k+hf(t_k,y_k)",
      "y_{k+1}=y_k+hf(t_{k+1},y_{k+1})",
      "y_{k+1}=y_k+\\tfrac12 k_1+\\tfrac12 k_2,\\quad k_1=hf(t_k,y_k),\\; k_2=hf(t_{k+1},y_k+k_1)",
      "y_{k+1}=y_k+\\frac{h}{6}(k_1+2k_2+2k_3+k_4)"
    ]
  },
  {
    title: {
      es: "EDO: métodos multipaso",
      eu: "EDO: urrats anitzeko metodoak",
      en: "ODE: multistep methods"
    },
    formulas: [
      "y_{k+1}=y_k+\\frac{h}{2}(3f_k-f_{k-1})",
      "y_{k+1}=y_k+\\frac{h}{24}(55f_k-59f_{k-1}+37f_{k-2}-9f_{k-3})",
      "y_{k+1}=y_k+\\frac{h}{2}(f_{k+1}+f_k)"
    ]
  },
  {
    title: {
      es: "Sistemas lineales",
      eu: "Sistema linealak",
      en: "Linear systems"
    },
    formulas: [
      "x^{(k+1)}=Bx^{(k)}+c,\\qquad \\rho(B)<1",
      "\\kappa(A)=\\|A\\|\\,\\|A^{-1}\\|"
    ]
  },
  {
    title: {
      es: "Ecuaciones no lineales",
      eu: "Ekuazio ez-linealak",
      en: "Nonlinear equations"
    },
    formulas: [
      "m_k=\\frac{a_k+b_k}{2},\\qquad |m_k-\\alpha|\\le\\frac{b-a}{2^{k+1}}",
      "x_{k+1}=x_k-\\frac{f(x_k)}{f'(x_k)}",
      "x_{k+1}=x_k-\\frac{f(x_k)}{f[x_k,x_{k-1}]}"
    ]
  },
  {
    title: {
      es: "Sistemas no lineales",
      eu: "Sistema ez-linealak",
      en: "Nonlinear systems"
    },
    formulas: [
      "x^{(k+1)}=x^{(k)}-[F'(x^{(k)})]^{-1}F(x^{(k)})",
      "F'(x^{(k)})\\,u=F(x^{(k)}),\\qquad x^{(k+1)}=x^{(k)}-u"
    ]
  }
] as const;

export function allContent() {
  return [
    ...articles.map((entry) => ({ ...entry, type: "articulos" })),
    ...derivations.map((entry) => ({ ...entry, type: "deducciones" })),
    ...exercises.map((entry) => ({ ...entry, type: "ejercicios" }))
  ];
}

export function getCollection(type: "articulos" | "deducciones" | "ejercicios") {
  if (type === "articulos") return articles;
  if (type === "deducciones") return derivations;
  return exercises;
}
