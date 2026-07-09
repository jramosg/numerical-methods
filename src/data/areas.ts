import type { Lang } from "./site";

type LocalizedText = Record<Lang, string>;

export type Area = {
  /** Entry-point article, relative to /{lang}/ */
  href: string;
  /** Category string used by content entries in this area. */
  category: string;
  title: LocalizedText;
  text: LocalizedText;
};

/** The nine content areas, in study order. Shared by the home and temario pages. */
export const areas: Area[] = [
  {
    href: "articulos/fundamentos-errores",
    category: "Fundamentos",
    title: {
      es: "Fundamentos numéricos",
      eu: "Zenbakizko oinarriak",
      en: "Numerical foundations"
    },
    text: {
      es: "Errores, cifras significativas, redondeo, truncamiento, Taylor y orden de aproximación.",
      eu: "Erroreak, zifra esanguratsuak, biribiltzea, mozketa, Taylor eta hurbilketaren ordena.",
      en: "Errors, significant figures, rounding, truncation, Taylor and order of approximation."
    }
  },
  {
    href: "articulos/interpolacion-fundamentos",
    category: "Interpolación",
    title: { es: "Interpolación", eu: "Interpolazioa", en: "Interpolation" },
    text: {
      es: "Newton, diferencias divididas, Lagrange, Hermite, splines y cotas de error.",
      eu: "Newton, diferentzia zatituak, Lagrange, Hermite, splineak eta errore-bornak.",
      en: "Newton, divided differences, Lagrange, Hermite, splines and error bounds."
    }
  },
  {
    href: "articulos/diferenciacion-primera-derivada",
    category: "Diferenciación",
    title: {
      es: "Diferenciación numérica",
      eu: "Zenbakizko deribazioa",
      en: "Numerical differentiation"
    },
    text: {
      es: "Fórmulas progresivas, regresivas, centrales, alta precisión y Richardson.",
      eu: "Formula progresiboak, erregresiboak, zentralak, zehaztasun handia eta Richardson.",
      en: "Forward, backward and central formulas, high accuracy and Richardson."
    }
  },
  {
    href: "articulos/integracion-cuadratura-lagrange",
    category: "Integración",
    title: {
      es: "Integración numérica",
      eu: "Zenbakizko integrazioa",
      en: "Numerical integration"
    },
    text: {
      es: "Punto medio, trapecio, Simpson, Newton-Cotes, Gauss-Legendre e integración múltiple.",
      eu: "Erdiko puntua, trapezioa, Simpson, Newton-Cotes, Gauss-Legendre eta integrazio anizkoitza.",
      en: "Midpoint, trapezoid, Simpson, Newton-Cotes, Gauss-Legendre and multiple integration."
    }
  },
  {
    href: "articulos/edo-problemas-valor-inicial",
    category: "EDO",
    title: {
      es: "EDO y problemas de valor inicial",
      eu: "ODEak eta hasierako balioko problemak",
      en: "ODEs and initial value problems"
    },
    text: {
      es: "Euler, Heun, Runge-Kutta, consistencia, estabilidad, convergencia y sistemas de primer orden.",
      eu: "Euler, Heun, Runge-Kutta, kontsistentzia, egonkortasuna, konbergentzia eta lehen ordenako sistemak.",
      en: "Euler, Heun, Runge-Kutta, consistency, stability, convergence and first-order systems."
    }
  },
  {
    href: "articulos/edo-adams-bashforth",
    category: "EDO",
    title: {
      es: "Métodos multipaso y rigidez",
      eu: "Urrats anitzeko metodoak eta zurruntasuna",
      en: "Multistep methods and stiffness"
    },
    text: {
      es: "Adams-Bashforth, Adams-Moulton, predictor-corrector, métodos implícitos y problemas rígidos.",
      eu: "Adams-Bashforth, Adams-Moulton, predictor-corrector, metodo inplizituak eta problema zurrunak.",
      en: "Adams-Bashforth, Adams-Moulton, predictor-corrector, implicit methods and stiff problems."
    }
  },
  {
    href: "articulos/sistemas-lineales-conceptos",
    category: "Sistemas lineales",
    title: { es: "Sistemas lineales", eu: "Sistema linealak", en: "Linear systems" },
    text: {
      es: "Residuo, condición, Jacobi, Gauss-Seidel, radio espectral, convergencia y SOR.",
      eu: "Hondarra, baldintzapena, Jacobi, Gauss-Seidel, erradio espektrala, konbergentzia eta SOR.",
      en: "Residual, conditioning, Jacobi, Gauss-Seidel, spectral radius, convergence and SOR."
    }
  },
  {
    href: "articulos/no-lineales-introduccion",
    category: "Ecuaciones no lineales",
    title: {
      es: "Ecuaciones no lineales",
      eu: "Ekuazio ez-linealak",
      en: "Nonlinear equations"
    },
    text: {
      es: "Bisección, punto fijo, Newton, secante, orden de convergencia y métodos de alto orden.",
      eu: "Bisekzioa, puntu finkoa, Newton, sekantea, konbergentzia-ordena eta ordena altuko metodoak.",
      en: "Bisection, fixed point, Newton, secant, convergence order and high-order methods."
    }
  },
  {
    href: "articulos/sistemas-no-lineales-introduccion",
    category: "Sistemas no lineales",
    title: {
      es: "Sistemas no lineales",
      eu: "Sistema ez-linealak",
      en: "Nonlinear systems"
    },
    text: {
      es: "Jacobiano, Newton para sistemas, coste por iteración y esquemas de alto orden.",
      eu: "Jacobiarra, Newton sistemetarako, iterazio-kostua eta ordena altuko eskemak.",
      en: "Jacobian, Newton for systems, cost per iteration and high-order schemes."
    }
  }
];
