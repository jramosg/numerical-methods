import type { Lang } from "./site";

type LocalizedText = Record<Lang, string>;
type LocalizedRows = Record<Lang, string[][]>;

export type ComparisonTable = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  head: Record<Lang, string[]>;
  rows: LocalizedRows;
  related: string[];
};

export const comparisonTables: ComparisonTable[] = [
  {
    slug: "raices-biseccion-newton-secante",
    title: {
      es: "Newton vs secante vs bisección",
      eu: "Newton vs sekantea vs bisekzioa",
      en: "Newton vs secant vs bisection"
    },
    description: {
      es: "Tres estrategias para raíces escalares: seguridad global, velocidad local y coste por iteración.",
      eu: "Erro eskalarretarako hiru estrategia: segurtasun globala, abiadura lokala eta iterazio bakoitzeko kostua.",
      en: "Three scalar root-finding strategies: global safety, local speed and per-iteration cost."
    },
    head: {
      es: ["Método", "Hipótesis", "Orden", "Coste", "Cuándo usarlo"],
      eu: ["Metodoa", "Hipotesiak", "Ordena", "Kostua", "Noiz erabili"],
      en: ["Method", "Assumptions", "Order", "Cost", "When to use it"]
    },
    rows: {
      es: [
        [
          "[[no-lineales-biseccion|Bisección]]",
          "Continuidad y cambio de signo en $[a,b]$",
          "Lineal; el intervalo se divide por 2",
          "Una evaluación nueva de $f$ por iteración",
          "Para encerrar la raíz y obtener una estimación inicial fiable"
        ],
        [
          "[[no-lineales-newton-raphson|Newton-Raphson]]",
          "Raíz simple, $f'$ disponible y punto inicial cercano",
          "Cuadrático local",
          "$f$ y $f'$ por iteración",
          "Cuando hay buena semilla y derivada barata"
        ],
        [
          "[[no-lineales-secante-steffensen|Secante]]",
          "Dos estimaciones iniciales y $f$ suficientemente regular",
          "Superlineal, $p\\approx1.618$",
          "Una evaluación nueva de $f$ por iteración",
          "Cuando no se quiere o no se puede evaluar $f'$"
        ]
      ],
      eu: [
        [
          "[[no-lineales-biseccion|Bisekzioa]]",
          "Jarraitutasuna eta zeinu-aldaketa $[a,b]$ tartean",
          "Lineala; tartea 2z zatitzen da",
          "$f$-ren ebaluazio berri bat iterazio bakoitzean",
          "Erroa inguratzeko eta hasierako estimazio fidagarria lortzeko"
        ],
        [
          "[[no-lineales-newton-raphson|Newton-Raphson]]",
          "Erro sinplea, $f'$ eskuragarri eta hasierako puntua hurbil",
          "Koadratiko lokala",
          "$f$ eta $f'$ iterazio bakoitzean",
          "Hazi ona eta deribatu merkea daudenean"
        ],
        [
          "[[no-lineales-secante-steffensen|Sekantea]]",
          "Bi hasierako estimazio eta $f$ nahikoa erregularra",
          "Superlineala, $p\\approx1.618$",
          "$f$-ren ebaluazio berri bat iterazio bakoitzean",
          "$f'$ ebaluatu nahi edo ezin denean"
        ]
      ],
      en: [
        [
          "[[no-lineales-biseccion|Bisection]]",
          "Continuity and sign change on $[a,b]$",
          "Linear; the interval is halved",
          "One new evaluation of $f$ per iteration",
          "To bracket the root and get a reliable initial estimate"
        ],
        [
          "[[no-lineales-newton-raphson|Newton-Raphson]]",
          "Simple root, available $f'$ and nearby starting point",
          "Local quadratic",
          "$f$ and $f'$ per iteration",
          "When the seed is good and the derivative is cheap"
        ],
        [
          "[[no-lineales-secante-steffensen|Secant]]",
          "Two initial estimates and sufficiently regular $f$",
          "Superlinear, $p\\approx1.618$",
          "One new evaluation of $f$ per iteration",
          "When $f'$ is unavailable or undesirable"
        ]
      ]
    },
    related: [
      "no-lineales-biseccion",
      "no-lineales-newton-raphson",
      "no-lineales-secante-steffensen"
    ]
  },
  {
    slug: "edo-euler-heun-rk4",
    title: {
      es: "Euler vs Heun vs RK4",
      eu: "Euler vs Heun vs RK4",
      en: "Euler vs Heun vs RK4"
    },
    description: {
      es: "Métodos de un paso para PVI: precisión, evaluaciones de $f$ y uso práctico.",
      eu: "PVIetarako urrats bakarreko metodoak: zehaztasuna, $f$-ren ebaluazioak eta erabilera praktikoa.",
      en: "One-step IVP methods: accuracy, evaluations of $f$ and practical use."
    },
    head: {
      es: ["Método", "Idea", "Error global", "Evaluaciones", "Cuándo usarlo"],
      eu: ["Metodoa", "Ideia", "Errore globala", "Ebaluazioak", "Noiz erabili"],
      en: ["Method", "Idea", "Global error", "Evaluations", "When to use it"]
    },
    rows: {
      es: [
        [
          "[[edo-metodo-euler|Euler explícito]]",
          "Avanza con la pendiente al inicio del intervalo",
          "$\\mathcal{O}(h)$",
          "1 por paso",
          "Para estimaciones rápidas o como predictor"
        ],
        [
          "[[edo-metodo-heun|Heun]]",
          "Promedia la pendiente de Euler y la pendiente corregida",
          "$\\mathcal{O}(h^2)$",
          "2 por paso",
          "Cuando se quiere una mejora barata sobre Euler"
        ],
        [
          "[[edo-metodo-runge-kutta|RK4]]",
          "Combina cuatro pendientes con pesos $1,2,2,1$",
          "$\\mathcal{O}(h^4)$",
          "4 por paso",
          "Para alta precisión sin resolver ecuaciones implícitas"
        ]
      ],
      eu: [
        [
          "[[edo-metodo-euler|Euler esplizitua]]",
          "Tartearen hasierako maldarekin aurrera egiten du",
          "$\\mathcal{O}(h)$",
          "1 pauso bakoitzean",
          "Estimazio azkarretarako edo iragarle gisa"
        ],
        [
          "[[edo-metodo-heun|Heun]]",
          "Euler-en malda eta zuzendutako malda batezbestekatzen ditu",
          "$\\mathcal{O}(h^2)$",
          "2 pauso bakoitzean",
          "Euler baino hobekuntza merkea nahi denean"
        ],
        [
          "[[edo-metodo-runge-kutta|RK4]]",
          "Lau malda konbinatzen ditu $1,2,2,1$ pisuekin",
          "$\\mathcal{O}(h^4)$",
          "4 pauso bakoitzean",
          "Ekuazio inpliziturik ebatzi gabe zehaztasun handia behar denean"
        ]
      ],
      en: [
        [
          "[[edo-metodo-euler|Explicit Euler]]",
          "Advances with the slope at the start of the interval",
          "$\\mathcal{O}(h)$",
          "1 per step",
          "For quick estimates or as a predictor"
        ],
        [
          "[[edo-metodo-heun|Heun]]",
          "Averages Euler's slope with a corrected slope",
          "$\\mathcal{O}(h^2)$",
          "2 per step",
          "When a cheap improvement over Euler is enough"
        ],
        [
          "[[edo-metodo-runge-kutta|RK4]]",
          "Combines four slopes with weights $1,2,2,1$",
          "$\\mathcal{O}(h^4)$",
          "4 per step",
          "For high accuracy without solving implicit equations"
        ]
      ]
    },
    related: ["edo-metodo-euler", "edo-metodo-heun", "edo-metodo-runge-kutta"]
  },
  {
    slug: "lineales-jacobi-gauss-seidel-sor",
    title: {
      es: "Jacobi vs Gauss-Seidel vs SOR",
      eu: "Jacobi vs Gauss-Seidel vs SOR",
      en: "Jacobi vs Gauss-Seidel vs SOR"
    },
    description: {
      es: "Métodos iterativos lineales vistos como particiones $A=M-N$ y su matriz de iteración.",
      eu: "Metodo iteratibo linealak $A=M-N$ partizio gisa eta beren iterazio-matrizearen bidez.",
      en: "Linear iterative methods viewed as splittings $A=M-N$ and through their iteration matrix."
    },
    head: {
      es: ["Método", "Partición", "Actualización", "Ventaja", "Riesgo"],
      eu: ["Metodoa", "Partizioa", "Eguneratzea", "Abantaila", "Arriskua"],
      en: ["Method", "Splitting", "Update", "Advantage", "Risk"]
    },
    rows: {
      es: [
        [
          "[[sistemas-lineales-jacobi|Jacobi]]",
          "$M=D$",
          "Usa solo valores de la iteración anterior",
          "Simple y paralelizable",
          "Puede converger lentamente"
        ],
        [
          "[[sistemas-lineales-gauss-seidel|Gauss-Seidel]]",
          "$M=D-L$",
          "Reutiliza valores nuevos en cuanto se calculan",
          "Suele mejorar a Jacobi sin parámetro extra",
          "Depende del orden de las ecuaciones"
        ],
        [
          "[[sistemas-lineales-sor|SOR]]",
          "$M=\\frac{1}{\\omega}D-L$",
          "Relaja Gauss-Seidel con un peso $\\omega$",
          "Puede acelerar mucho con $\\omega$ adecuado",
          "Un $\\omega$ malo puede empeorar o romper la convergencia"
        ]
      ],
      eu: [
        [
          "[[sistemas-lineales-jacobi|Jacobi]]",
          "$M=D$",
          "Aurreko iterazioko balioak bakarrik erabiltzen ditu",
          "Sinplea eta paralelizagarria",
          "Astiro konbergitu dezake"
        ],
        [
          "[[sistemas-lineales-gauss-seidel|Gauss-Seidel]]",
          "$M=D-L$",
          "Balio berriak kalkulatu bezain laster berrerabiltzen ditu",
          "Askotan Jacobi hobetzen du parametro gehigarririk gabe",
          "Ekuazioen ordenaren menpe dago"
        ],
        [
          "[[sistemas-lineales-sor|SOR]]",
          "$M=\\frac{1}{\\omega}D-L$",
          "Gauss-Seidel erlaxatzen du $\\omega$ pisu batekin",
          "$\\omega$ egokiarekin asko azkar dezake",
          "$\\omega$ txar batek konbergentzia okertu edo hautsi dezake"
        ]
      ],
      en: [
        [
          "[[sistemas-lineales-jacobi|Jacobi]]",
          "$M=D$",
          "Uses only values from the previous iteration",
          "Simple and parallelizable",
          "May converge slowly"
        ],
        [
          "[[sistemas-lineales-gauss-seidel|Gauss-Seidel]]",
          "$M=D-L$",
          "Reuses new values as soon as they are computed",
          "Often improves Jacobi without an extra parameter",
          "Depends on equation ordering"
        ],
        [
          "[[sistemas-lineales-sor|SOR]]",
          "$M=\\frac{1}{\\omega}D-L$",
          "Relaxes Gauss-Seidel with a weight $\\omega$",
          "Can accelerate strongly with a good $\\omega$",
          "A poor $\\omega$ can slow or break convergence"
        ]
      ]
    },
    related: [
      "sistemas-lineales-jacobi",
      "sistemas-lineales-gauss-seidel",
      "sistemas-lineales-sor"
    ]
  },
  {
    slug: "interpolacion-lagrange-newton-hermite-splines",
    title: {
      es: "Lagrange vs Newton vs Hermite vs splines",
      eu: "Lagrange vs Newton vs Hermite vs splineak",
      en: "Lagrange vs Newton vs Hermite vs splines"
    },
    description: {
      es: "Cuatro maneras de interpolar los mismos datos: qué información usan, qué cuesta construirlas y cuándo conviene cada una.",
      eu: "Datu berak interpolatzeko lau modu: zer informazio erabiltzen duten, zenbat kostatzen den eraikitzea eta noiz komeni den bakoitza.",
      en: "Four ways to interpolate the same data: what information they use, what they cost to build and when each one pays off."
    },
    head: {
      es: ["Interpolante", "Datos que usa", "Construcción", "Fortaleza", "Limitación"],
      eu: ["Interpolatzailea", "Erabiltzen dituen datuak", "Eraikuntza", "Indargunea", "Muga"],
      en: ["Interpolant", "Data it uses", "Construction", "Strength", "Limitation"]
    },
    rows: {
      es: [
        [
          "[[interpolacion-lagrange|Lagrange]]",
          "Valores $f(x_i)$ en $n+1$ nodos",
          "Base explícita $\\ell_i(x)$, sin sistemas que resolver",
          "Forma cerrada ideal para teoría y deducciones de cuadratura",
          "Añadir un nodo obliga a rehacer toda la base"
        ],
        [
          "[[interpolacion-newton|Newton]]",
          "Valores $f(x_i)$ en $n+1$ nodos",
          "Tabla de diferencias divididas, forma anidada",
          "Añadir un nodo solo cuesta una diagonal más",
          "Mismo polinomio que Lagrange: hereda sus límites de grado alto"
        ],
        [
          "[[interpolacion-hermite|Hermite]]",
          "Valores $f(x_i)$ y derivadas $f'(x_i)$",
          "Diferencias divididas con nodos repetidos",
          "Dobla la información por nodo: grado $2n+1$ y más precisión",
          "Exige conocer las derivadas, que no siempre existen en los datos"
        ],
        [
          "[[interpolacion-splines|Spline cúbico]]",
          "Valores $f(x_i)$ en todos los nodos",
          "Sistema tridiagonal para los momentos, polinomio cúbico por tramo",
          "Suave ($C^2$) y sin fenómeno de Runge con muchos nodos",
          "No da un único polinomio global y requiere resolver un sistema"
        ]
      ],
      eu: [
        [
          "[[interpolacion-lagrange|Lagrange]]",
          "$f(x_i)$ balioak $n+1$ nodotan",
          "$\\ell_i(x)$ oinarri esplizitua, ebatzi beharreko sistemarik gabe",
          "Forma itxia, teoria eta kuadratura-dedukzioetarako aproposa",
          "Nodo bat gehitzeak oinarri osoa berregitera behartzen du"
        ],
        [
          "[[interpolacion-newton|Newton]]",
          "$f(x_i)$ balioak $n+1$ nodotan",
          "Diferentzia zatituen taula, forma habiaratua",
          "Nodo bat gehitzeak diagonal bat gehiago baino ez du kostatzen",
          "Lagrangeren polinomio bera da: gradu handiko muga berak ditu"
        ],
        [
          "[[interpolacion-hermite|Hermite]]",
          "$f(x_i)$ balioak eta $f'(x_i)$ deribatuak",
          "Diferentzia zatituak nodo errepikatuekin",
          "Nodo bakoitzeko informazioa bikoizten du: $2n+1$ gradua eta doitasun handiagoa",
          "Deribatuak ezagutzea eskatzen du, eta datuetan ez daude beti"
        ],
        [
          "[[interpolacion-splines|Spline kubikoa]]",
          "$f(x_i)$ balioak nodo guztietan",
          "Sistema tridiagonala momentuentzat, polinomio kubikoa zatiko",
          "Leuna ($C^2$) eta Runge fenomenorik gabea nodo askorekin",
          "Ez du polinomio global bakarra ematen eta sistema bat ebatzi behar da"
        ]
      ],
      en: [
        [
          "[[interpolacion-lagrange|Lagrange]]",
          "Values $f(x_i)$ at $n+1$ nodes",
          "Explicit basis $\\ell_i(x)$, no systems to solve",
          "Closed form, ideal for theory and quadrature derivations",
          "Adding a node forces rebuilding the whole basis"
        ],
        [
          "[[interpolacion-newton|Newton]]",
          "Values $f(x_i)$ at $n+1$ nodes",
          "Divided-difference table, nested form",
          "Adding a node only costs one more diagonal",
          "Same polynomial as Lagrange: inherits its high-degree limits"
        ],
        [
          "[[interpolacion-hermite|Hermite]]",
          "Values $f(x_i)$ and derivatives $f'(x_i)$",
          "Divided differences with repeated nodes",
          "Doubles the information per node: degree $2n+1$ and higher accuracy",
          "Requires derivatives, which the data do not always provide"
        ],
        [
          "[[interpolacion-splines|Cubic spline]]",
          "Values $f(x_i)$ at all nodes",
          "Tridiagonal system for the moments, one cubic per piece",
          "Smooth ($C^2$) and free of the Runge phenomenon with many nodes",
          "No single global polynomial, and a system must be solved"
        ]
      ]
    },
    related: [
      "interpolacion-lagrange",
      "interpolacion-newton",
      "interpolacion-hermite",
      "interpolacion-splines"
    ]
  },
  {
    slug: "integracion-trapecio-simpson-punto-medio-gauss",
    title: {
      es: "Trapecio vs Simpson vs punto medio vs Gauss",
      eu: "Trapezioa vs Simpson vs erdiko puntua vs Gauss",
      en: "Trapezoid vs Simpson vs midpoint vs Gauss"
    },
    description: {
      es: "Las cuadraturas de uso diario comparadas por nodos, orden del error compuesto y situación en la que ganan.",
      eu: "Eguneroko kuadraturak alderatuta: nodoak, errore konposatuaren ordena eta zein egoeratan irabazten duten.",
      en: "The everyday quadratures compared by nodes, composite error order and the situation where each wins."
    },
    head: {
      es: ["Fórmula", "Nodos", "Error compuesto", "Grado de precisión", "Cuándo usarla"],
      eu: ["Formula", "Nodoak", "Errore konposatua", "Doitasun-gradua", "Noiz erabili"],
      en: ["Formula", "Nodes", "Composite error", "Degree of precision", "When to use it"]
    },
    rows: {
      es: [
        [
          "[[deduccion-integracion-trapecio-compuesto|Trapecio compuesto]]",
          "Equiespaciados, cerrada (usa los extremos)",
          "$\\mathcal{O}(h^2)$",
          "1",
          "Datos tabulados; sencilla y robusta"
        ],
        [
          "[[integracion-newton-cotes-cerradas|Simpson compuesto]]",
          "Equiespaciados, cerrada, número par de subintervalos",
          "$\\mathcal{O}(h^4)$",
          "3",
          "Integrando suave tabulado: dos órdenes más al mismo coste por nodo"
        ],
        [
          "[[deduccion-integracion-punto-medio-compuesto|Punto medio compuesto]]",
          "Equiespaciados, abierta (evita los extremos)",
          "$\\mathcal{O}(h^2)$",
          "1",
          "Cuando el integrando no se puede evaluar en los extremos"
        ],
        [
          "[[integracion-gauss|Gauss-Legendre]]",
          "Raíces de polinomios de Legendre, no equiespaciados",
          "Grado $2n-1$ con $n$ nodos",
          "$2n-1$",
          "Cuando puedes evaluar $f$ donde quieras y las evaluaciones son caras"
        ]
      ],
      eu: [
        [
          "[[deduccion-integracion-trapecio-compuesto|Trapezio konposatua]]",
          "Ekidistanteak, itxia (muturrak erabiltzen ditu)",
          "$\\mathcal{O}(h^2)$",
          "1",
          "Datu tabulatuak; sinplea eta sendoa"
        ],
        [
          "[[integracion-newton-cotes-cerradas|Simpson konposatua]]",
          "Ekidistanteak, itxia, azpitarte kopuru bikoitia",
          "$\\mathcal{O}(h^4)$",
          "3",
          "Integrakizun leun tabulatua: bi ordena gehiago nodo bakoitzeko kostu berean"
        ],
        [
          "[[deduccion-integracion-punto-medio-compuesto|Erdiko puntu konposatua]]",
          "Ekidistanteak, irekia (muturrak saihesten ditu)",
          "$\\mathcal{O}(h^2)$",
          "1",
          "Integrakizuna muturretan ebaluatu ezin denean"
        ],
        [
          "[[integracion-gauss|Gauss-Legendre]]",
          "Legendre polinomioen erroak, ez ekidistanteak",
          "$2n-1$ gradua $n$ nodorekin",
          "$2n-1$",
          "$f$ nahi duzun tokian ebaluatu badezakezu eta ebaluazioak garestiak badira"
        ]
      ],
      en: [
        [
          "[[deduccion-integracion-trapecio-compuesto|Composite trapezoid]]",
          "Equispaced, closed (uses the endpoints)",
          "$\\mathcal{O}(h^2)$",
          "1",
          "Tabulated data; simple and robust"
        ],
        [
          "[[integracion-newton-cotes-cerradas|Composite Simpson]]",
          "Equispaced, closed, even number of subintervals",
          "$\\mathcal{O}(h^4)$",
          "3",
          "Smooth tabulated integrand: two extra orders at the same cost per node"
        ],
        [
          "[[deduccion-integracion-punto-medio-compuesto|Composite midpoint]]",
          "Equispaced, open (avoids the endpoints)",
          "$\\mathcal{O}(h^2)$",
          "1",
          "When the integrand cannot be evaluated at the endpoints"
        ],
        [
          "[[integracion-gauss|Gauss-Legendre]]",
          "Roots of Legendre polynomials, not equispaced",
          "Degree $2n-1$ with $n$ nodes",
          "$2n-1$",
          "When you can evaluate $f$ anywhere and evaluations are expensive"
        ]
      ]
    },
    related: [
      "deduccion-integracion-trapecio-compuesto",
      "integracion-newton-cotes-cerradas",
      "deduccion-integracion-punto-medio-compuesto",
      "integracion-gauss"
    ]
  },
  {
    slug: "edo-ab2-am2-predictor-corrector",
    title: {
      es: "AB2 vs AM2 vs predictor-corrector",
      eu: "AB2 vs AM2 vs iragarle-zuzentzailea",
      en: "AB2 vs AM2 vs predictor-corrector"
    },
    description: {
      es: "Los multipaso de orden 2 frente a frente: coste por paso, constante de error y qué se paga por la estabilidad implícita.",
      eu: "2. ordenako urrats anitzekoak aurrez aurre: pauso bakoitzeko kostua, errore-konstantea eta zenbat ordaintzen den egonkortasun inplizituagatik.",
      en: "The order-2 multistep methods head to head: cost per step, error constant and the price of implicit stability."
    },
    head: {
      es: ["Método", "Tipo", "Error local", "Coste por paso", "Observaciones"],
      eu: ["Metodoa", "Mota", "Errore lokala", "Kostua pauso bakoitzeko", "Oharrak"],
      en: ["Method", "Type", "Local error", "Cost per step", "Notes"]
    },
    rows: {
      es: [
        [
          "[[edo-adams-bashforth|AB2]]",
          "Explícito, dos pasos",
          "$\\frac{5}{12}h^3y'''(\\xi)$",
          "1 evaluación nueva de $f$",
          "Necesita un valor de arranque (Heun o RK4) y malla uniforme"
        ],
        [
          "[[edo-adams-moulton|AM2 (trapecio implícito)]]",
          "Implícito, un paso nuevo",
          "$-\\frac{1}{12}h^3y'''(\\xi)$",
          "Resolver una ecuación en $y_{k+1}$",
          "Constante 5 veces menor que AB2 y mucha más estabilidad"
        ],
        [
          "[[edo-predictor-corrector|Predictor-corrector AB2+AM2]]",
          "Explícito en la práctica",
          "Del orden del corrector",
          "2 evaluaciones de $f$",
          "Precisión de AM2 sin resolver la ecuación implícita; la diferencia predictor-corrector estima el error"
        ]
      ],
      eu: [
        [
          "[[edo-adams-bashforth|AB2]]",
          "Esplizitua, bi pausokoa",
          "$\\frac{5}{12}h^3y'''(\\xi)$",
          "$f$-ren ebaluazio berri bat",
          "Abioko balio bat behar du (Heun edo RK4) eta sare uniformea"
        ],
        [
          "[[edo-adams-moulton|AM2 (trapezio inplizitua)]]",
          "Inplizitua, pauso berri bat",
          "$-\\frac{1}{12}h^3y'''(\\xi)$",
          "$y_{k+1}$-en ekuazio bat ebatzi",
          "AB2 baino 5 aldiz konstante txikiagoa eta egonkortasun askoz handiagoa"
        ],
        [
          "[[edo-predictor-corrector|Iragarle-zuzentzailea AB2+AM2]]",
          "Esplizitua praktikan",
          "Zuzentzailearen ordenakoa",
          "$f$-ren 2 ebaluazio",
          "AM2-ren doitasuna ekuazio inplizitua ebatzi gabe; iragarle-zuzentzaile diferentziak errorea estimatzen du"
        ]
      ],
      en: [
        [
          "[[edo-adams-bashforth|AB2]]",
          "Explicit, two-step",
          "$\\frac{5}{12}h^3y'''(\\xi)$",
          "1 new evaluation of $f$",
          "Needs a startup value (Heun or RK4) and a uniform mesh"
        ],
        [
          "[[edo-adams-moulton|AM2 (implicit trapezoid)]]",
          "Implicit, one new step",
          "$-\\frac{1}{12}h^3y'''(\\xi)$",
          "Solve one equation in $y_{k+1}$",
          "Error constant 5 times smaller than AB2 and far better stability"
        ],
        [
          "[[edo-predictor-corrector|Predictor-corrector AB2+AM2]]",
          "Explicit in practice",
          "Of the corrector's order",
          "2 evaluations of $f$",
          "AM2's accuracy without solving the implicit equation; the predictor-corrector gap estimates the error"
        ]
      ]
    },
    related: [
      "edo-adams-bashforth",
      "edo-adams-moulton",
      "edo-predictor-corrector",
      "ejercicio-predictor-corrector-comparativa"
    ]
  }
];
