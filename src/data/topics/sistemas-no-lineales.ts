import type { ContentEntry } from "../content";

/**
 * Nonlinear systems: Newton in several variables (Jacobian + linear solve per
 * iteration), efficiency accounting in dimension n, and high-order schemes by
 * composition with frozen Jacobian (Traub, Golden Ratio, NA, Jarratt, RN).
 * Worked numbers verified by recomputation; the source's F1 typo (x·cos(x))
 * corrected to x·cos(y), consistent with its own Jacobian and results.
 */

export const sistemasNoLinealesArticles: ContentEntry[] = [
  {
    slug: "sistemas-no-lineales-introduccion",
    category: "Sistemas no lineales",
    level: "medio",
    searchIntent: "sistemas ecuaciones no lineales punto fijo orden convergencia ACOC normas",
    title: {
      es: "Sistemas de ecuaciones no lineales",
      eu: "Ekuazio ez-linealen sistemak",
      en: "Systems of nonlinear equations"
    },
    description: {
      es: "El problema $F(X)=0$ en varias variables: métodos de punto fijo vectoriales, orden de convergencia con normas, ACOC multidimensional y criterios de parada.",
      eu: "$F(X)=0$ problema aldagai anitzetan: puntu finkoko metodo bektorialak, konbergentzia-ordena normekin, ACOC multidimentsionala eta gelditze-irizpideak.",
      en: "The problem $F(X)=0$ in several variables: vector fixed-point methods, convergence order with norms, multidimensional ACOC and stopping criteria."
    },
    keywords: ["sistemas no lineales", "punto fijo", "orden de convergencia", "ACOC"],
    prerequisites: ["no-lineales-introduccion", "no-lineales-orden-eficiencia"],
    related: [
      "sistemas-no-lineales-newton",
      "sistemas-no-lineales-eficiencia",
      "sistemas-no-lineales-alto-orden",
      "sistemas-lineales-conceptos"
    ],
    sections: [
      {
        heading: {
          es: "El problema",
          eu: "Problema",
          en: "The problem"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Muchos modelos de ingeniería (sistemas de ecuaciones diferenciales acopladas, ecuaciones en derivadas parciales discretizadas, problemas de frontera) desembocan en un sistema de $n$ ecuaciones no lineales con $n$ incógnitas:",
              eu: "Ingeniaritzako eredu asko (ekuazio diferentzial akoplatuen sistemak, deribatu partzialetako ekuazio diskretizatuak, muga-problemak) $n$ ezezaguneko $n$ ekuazio ez-linealen sistema batean amaitzen dira:",
              en: "Many engineering models (coupled systems of differential equations, discretized partial differential equations, boundary problems) end in a system of $n$ nonlinear equations with $n$ unknowns:"
            }
          },
          {
            kind: "formula",
            tex: "\\begin{cases} f_1(x_1,x_2,\\dots,x_n)=0\\\\ f_2(x_1,x_2,\\dots,x_n)=0\\\\ \\;\\;\\vdots\\\\ f_n(x_1,x_2,\\dots,x_n)=0 \\end{cases}\\;\\Longleftrightarrow\\; F(X)=0,\\quad F:D\\subseteq\\mathbb{R}^n\\to\\mathbb{R}^n"
          },
          {
            kind: "paragraph",
            text: {
              es: "donde las $f_i$ son las funciones coordenadas de $F$ y $D$ es abierto y convexo. Igual que en el [[no-lineales-introduccion|caso escalar]], la solución $\\alpha\\in\\mathbb{R}^n$ se aproxima con métodos iterativos de punto fijo, ahora descritos por una función vectorial $G:\\mathbb{R}^n\\to\\mathbb{R}^n$: $x^{(k+1)}=G(x^{(k)})$, $k=0,1,2,\\dots$",
              eu: "non $f_i$-ak $F$-ren funtzio koordenatuak diren eta $D$ irekia eta ganbila den. [[no-lineales-introduccion|Kasu eskalarrean]] bezala, $\\alpha\\in\\mathbb{R}^n$ soluzioa puntu finkoko metodo iteratiboekin hurbiltzen da, orain $G:\\mathbb{R}^n\\to\\mathbb{R}^n$ funtzio bektorial batek deskribatuta: $x^{(k+1)}=G(x^{(k)})$, $k=0,1,2,\\dots$",
              en: "where the $f_i$ are the coordinate functions of $F$ and $D$ is open and convex. Just as in the [[no-lineales-introduccion|scalar case]], the solution $\\alpha\\in\\mathbb{R}^n$ is approximated with fixed-point iterative methods, now described by a vector function $G:\\mathbb{R}^n\\to\\mathbb{R}^n$: $x^{(k+1)}=G(x^{(k)})$, $k=0,1,2,\\dots$"
            }
          }
        ]
      },
      {
        heading: {
          es: "Orden de convergencia con normas",
          eu: "Konbergentzia-ordena normekin",
          en: "Convergence order with norms"
        },
        blocks: [
          {
            kind: "callout",
            variant: "definition",
            title: {
              es: "Orden de convergencia",
              eu: "Konbergentzia-ordena",
              en: "Order of convergence"
            },
            text: {
              es: "Dada la secuencia $\\{x^{(k)}\\}_{k\\ge0}$ generada por un método iterativo que converge a $\\alpha$, el método tiene orden de convergencia $p\\ge 1$ si existen $M>0$ y $k_0>0$ tales que $\\|x^{(k+1)}-\\alpha\\|\\le M\\,\\|x^{(k)}-\\alpha\\|^p$ para todo $k\\ge k_0$.",
              eu: "$\\alpha$-ra konbergitzen duen metodo iteratibo batek sortutako $\\{x^{(k)}\\}_{k\\ge0}$ segida emanda, metodoak $p\\ge 1$ konbergentzia-ordena du baldin badaude $M>0$ eta $k_0>0$ non $\\|x^{(k+1)}-\\alpha\\|\\le M\\,\\|x^{(k)}-\\alpha\\|^p$ betetzen den $k\\ge k_0$ guztietarako.",
              en: "Given the sequence $\\{x^{(k)}\\}_{k\\ge0}$ generated by an iterative method converging to $\\alpha$, the method has order of convergence $p\\ge 1$ if there exist $M>0$ and $k_0>0$ such that $\\|x^{(k+1)}-\\alpha\\|\\le M\\,\\|x^{(k)}-\\alpha\\|^p$ for all $k\\ge k_0$."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "El papel de los valores absolutos del caso escalar lo asumen las normas vectoriales. El [[deduccion-punto-fijo-convergencia|teorema del orden del punto fijo]] también se generaliza: el esquema $x^{(k+1)}=G(x^{(k)})$ tiene orden $p$ si $G(\\alpha)=\\alpha$ y todas las derivadas parciales de las componentes $g_i$ hasta orden $p-1$ se anulan en $\\alpha$, con alguna de orden $p$ no nula. La ecuación del error se escribe $e^{(k+1)}=L\\,(e^{(k)})^p+\\mathcal{O}\\bigl((e^{(k)})^{p+1}\\bigr)$, donde $e^{(k)}=x^{(k)}-\\alpha$ y $L$ es una función $p$-lineal derivada del desarrollo de Taylor multivariante de $F$.",
              eu: "Kasu eskalarreko balio absolutuen papera norma bektorialek hartzen dute. [[deduccion-punto-fijo-convergencia|Puntu finkoaren ordenaren teorema]] ere orokortzen da: $x^{(k+1)}=G(x^{(k)})$ eskemak $p$ ordena du baldin $G(\\alpha)=\\alpha$ bada eta $g_i$ osagaien deribatu partzial guztiak $p-1$ ordenaraino anulatzen badira $\\alpha$-n, $p$ ordenako bat ez-nulua izanik. Errore-ekuazioa $e^{(k+1)}=L\\,(e^{(k)})^p+\\mathcal{O}\\bigl((e^{(k)})^{p+1}\\bigr)$ idazten da, non $e^{(k)}=x^{(k)}-\\alpha$ eta $L$ $F$-ren Taylor garapen aldagai anitzekotik eratorritako funtzio $p$-lineala den.",
              en: "The role of absolute values in the scalar case is taken over by vector norms. The [[deduccion-punto-fijo-convergencia|fixed-point order theorem]] also generalizes: the scheme $x^{(k+1)}=G(x^{(k)})$ has order $p$ if $G(\\alpha)=\\alpha$ and all partial derivatives of the components $g_i$ up to order $p-1$ vanish at $\\alpha$, with some order-$p$ one nonzero. The error equation reads $e^{(k+1)}=L\\,(e^{(k)})^p+\\mathcal{O}\\bigl((e^{(k)})^{p+1}\\bigr)$, where $e^{(k)}=x^{(k)}-\\alpha$ and $L$ is a $p$-linear function derived from the multivariate Taylor expansion of $F$."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Sin conocer $\\alpha$, el orden se estima con el ACOC multidimensional, idéntico al [[no-lineales-orden-eficiencia|escalar]] pero con normas:",
              eu: "$\\alpha$ ezagutu gabe, ordena ACOC multidimentsionalarekin estimatzen da, [[no-lineales-orden-eficiencia|eskalarraren]] berdina baina normekin:",
              en: "Without knowing $\\alpha$, the order is estimated with the multidimensional ACOC, identical to the [[no-lineales-orden-eficiencia|scalar]] one but with norms:"
            }
          },
          {
            kind: "formula",
            tex: "ACOC=\\frac{\\ln\\bigl(\\|x^{(k+1)}-x^{(k)}\\|/\\|x^{(k)}-x^{(k-1)}\\|\\bigr)}{\\ln\\bigl(\\|x^{(k)}-x^{(k-1)}\\|/\\|x^{(k-1)}-x^{(k-2)}\\|\\bigr)},\\qquad k=2,3,\\dots"
          }
        ]
      },
      {
        heading: {
          es: "Criterios de parada",
          eu: "Gelditze-irizpideak",
          en: "Stopping criteria"
        },
        blocks: [
          {
            kind: "list",
            items: {
              es: [
                "Los dos últimos iterados están muy próximos: $\\|x^{(k+1)}-x^{(k)}\\|<\\varepsilon$.",
                "El residuo es muy pequeño: $\\|F(x^{(k+1)})\\|<\\varepsilon$.",
                "Se ha alcanzado el máximo de iteraciones sin converger."
              ],
              eu: [
                "Azken bi iteratuak oso hurbil daude: $\\|x^{(k+1)}-x^{(k)}\\|<\\varepsilon$.",
                "Hondarra oso txikia da: $\\|F(x^{(k+1)})\\|<\\varepsilon$.",
                "Iterazio kopuru maximora iritsi da konbergitu gabe."
              ],
              en: [
                "The last two iterates are very close: $\\|x^{(k+1)}-x^{(k)}\\|<\\varepsilon$.",
                "The residual is very small: $\\|F(x^{(k+1)})\\|<\\varepsilon$.",
                "The maximum number of iterations has been reached without converging."
              ]
            }
          }
        ]
      }
    ]
  },
  {
    slug: "sistemas-no-lineales-newton",
    category: "Sistemas no lineales",
    level: "medio",
    searchIntent: "Newton sistemas no lineales jacobiano matriz sistema lineal por iteración",
    title: {
      es: "Newton para sistemas no lineales",
      eu: "Newton sistema ez-linealetarako",
      en: "Newton for nonlinear systems"
    },
    description: {
      es: "La versión vectorial del método de Newton: la derivada pasa a ser la matriz jacobiana, el cociente se convierte en un sistema lineal por iteración, y el orden cuadrático se conserva.",
      eu: "Newton-en metodoaren bertsio bektoriala: deribatua matrize jacobiarra bihurtzen da, zatidura iterazio bakoitzeko sistema lineal bat bihurtzen da, eta ordena koadratikoa mantentzen da.",
      en: "The vector version of Newton's method: the derivative becomes the Jacobian matrix, the quotient becomes one linear system per iteration, and the quadratic order is preserved."
    },
    keywords: ["Newton", "sistemas no lineales", "jacobiano", "sistema lineal"],
    prerequisites: ["no-lineales-newton-raphson", "sistemas-no-lineales-introduccion"],
    related: [
      "deduccion-newton-sistemas",
      "sistemas-lineales-conceptos",
      "sistemas-no-lineales-alto-orden",
      "ejercicio-newton-sistema-a-mano",
      "ejercicio-newton-sistema-2d"
    ],
    sections: [
      {
        heading: {
          es: "De la derivada al jacobiano",
          eu: "Deribatutik jacobiarrera",
          en: "From the derivative to the Jacobian"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "En el [[no-lineales-newton-raphson|Newton escalar]] se divide por $f'(x_k)$, pero entre matrices no hay cocientes: el papel de $f'$ lo asume la matriz jacobiana $F'(X)$, con entradas $\\bigl[F'(X)\\bigr]_{ij}=\\frac{\\partial f_i}{\\partial x_j}(X)$, y el cociente se sustituye por la inversa:",
              eu: "[[no-lineales-newton-raphson|Newton eskalarrean]] $f'(x_k)$-z zatitzen da, baina matrizeen artean ez dago zatidurarik: $f'$-ren papera $F'(X)$ matrize jacobiarrak hartzen du, $\\bigl[F'(X)\\bigr]_{ij}=\\frac{\\partial f_i}{\\partial x_j}(X)$ osagaiekin, eta zatidura alderantzizkoaz ordezkatzen da:",
              en: "In [[no-lineales-newton-raphson|scalar Newton]] one divides by $f'(x_k)$, but there are no quotients between matrices: the role of $f'$ is taken by the Jacobian matrix $F'(X)$, with entries $\\bigl[F'(X)\\bigr]_{ij}=\\frac{\\partial f_i}{\\partial x_j}(X)$, and the quotient is replaced by the inverse:"
            }
          },
          {
            kind: "formula",
            tex: "x^{(k+1)}=x^{(k)}-\\bigl[F'(x^{(k)})\\bigr]^{-1}F(x^{(k)}),\\qquad k=0,1,2,\\dots",
            caption: {
              es: "Método de Newton para sistemas.",
              eu: "Newton-en metodoa sistemetarako.",
              en: "Newton's method for systems."
            }
          },
          { kind: "derivation", slug: "deduccion-newton-sistemas" }
        ]
      },
      {
        heading: {
          es: "Nunca se invierte el jacobiano",
          eu: "Ez alderantzikatu jacobiarra",
          en: "Do not invert the Jacobian"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "En la práctica, $[F'(x^{(k)})]^{-1}F(x^{(k)})$ no se calcula invirtiendo la matriz: es mucho más barato resolver en cada iteración el [[sistemas-lineales-conceptos|sistema lineal]]",
              eu: "Praktikan, $[F'(x^{(k)})]^{-1}F(x^{(k)})$ ez da matrizea alderantzikatuz kalkulatzen: askoz merkeagoa da iterazio bakoitzean [[sistemas-lineales-conceptos|sistema lineala]] ebaztea",
              en: "In practice, $[F'(x^{(k)})]^{-1}F(x^{(k)})$ is not computed by inverting the matrix: it is much cheaper to solve at each iteration the [[sistemas-lineales-conceptos|linear system]]"
            }
          },
          {
            kind: "formula",
            tex: "\\bigl[F'(x^{(k)})\\bigr]\\,u=F(x^{(k)}),\\qquad x^{(k+1)}=x^{(k)}-u"
          },
          {
            kind: "paragraph",
            text: {
              es: "Resolver un sistema no lineal exige, por tanto, resolver un sistema lineal por iteración: los dos temas están encadenados. El coste de esa resolución ($\\frac{n^3}{3}+n^2-\\frac{n}{3}$ productos/cocientes por eliminación gaussiana) domina el coste total del método y protagoniza el análisis de [[sistemas-no-lineales-eficiencia|eficiencia]].",
              eu: "Sistema ez-lineal bat ebazteak, beraz, iterazio bakoitzeko sistema lineal bat ebaztea eskatzen du: bi gaiak kateatuta daude. Ebazpen horren kostuak ($\\frac{n^3}{3}+n^2-\\frac{n}{3}$ biderketa/zatiketa Gauss-en eliminazioz) metodoaren kostu osoa menderatzen du eta [[sistemas-no-lineales-eficiencia|eraginkortasunaren]] analisiaren protagonista da.",
              en: "Solving a nonlinear system therefore requires solving one linear system per iteration: the two topics are chained. The cost of that solve ($\\frac{n^3}{3}+n^2-\\frac{n}{3}$ products/quotients by Gaussian elimination) dominates the method's total cost and stars in the [[sistemas-no-lineales-eficiencia|efficiency]] analysis."
            }
          },
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Orden",
              eu: "Ordena",
              en: "Order"
            },
            text: {
              es: "Si $F$ es suficientemente diferenciable, $F'$ es continua y no singular en $\\alpha$, y $x^{(0)}$ está suficientemente próximo, Newton para sistemas conserva la convergencia cuadrática del caso escalar, como confirma el ACOC en el [[ejercicio-newton-sistema-2d|ejercicio resuelto]].",
              eu: "$F$ nahikoa diferentziagarria bada, $F'$ jarraitua eta ez-singularra bada $\\alpha$-n, eta $x^{(0)}$ nahikoa hurbil badago, sistemetarako Newton-ek kasu eskalarraren konbergentzia koadratikoa mantentzen du, [[ejercicio-newton-sistema-2d|ariketa ebatzian]] ACOC-ek baieztatzen duen bezala.",
              en: "If $F$ is sufficiently differentiable, $F'$ is continuous and nonsingular at $\\alpha$, and $x^{(0)}$ is close enough, Newton for systems keeps the quadratic convergence of the scalar case, as the ACOC confirms in the [[ejercicio-newton-sistema-2d|solved exercise]]."
            }
          }
        ]
      },
      {
        heading: {
          es: "Adaptaciones por cuadratura",
          eu: "Kuadratura bidezko egokitzapenak",
          en: "Quadrature adaptations"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Los [[no-lineales-metodos-alto-orden|métodos escalares basados en cuadraturas]] se adaptan de forma directa con la misma sustitución cociente → sistema lineal. Con $y^{(k)}=x^{(k)}-[F'(x^{(k)})]^{-1}F(x^{(k)})$ (un paso de Newton como predictor):",
              eu: "[[no-lineales-metodos-alto-orden|Kuadraturetan oinarritutako metodo eskalarrak]] zuzenean egokitzen dira, zatidura → sistema lineal ordezkapen berarekin. $y^{(k)}=x^{(k)}-[F'(x^{(k)})]^{-1}F(x^{(k)})$ hartuta (Newton-en pauso bat iragarle gisa):",
              en: "The [[no-lineales-metodos-alto-orden|quadrature-based scalar methods]] adapt directly with the same quotient → linear system substitution. With $y^{(k)}=x^{(k)}-[F'(x^{(k)})]^{-1}F(x^{(k)})$ (one Newton step as predictor):"
            }
          },
          {
            kind: "formula",
            tex: "x^{(k+1)}=x^{(k)}-2\\bigl[F'(y^{(k)})+F'(x^{(k)})\\bigr]^{-1}F(x^{(k)})",
            caption: {
              es: "Método de trapecios para sistemas.",
              eu: "Trapezioen metodoa sistemetarako.",
              en: "Trapezoid method for systems."
            }
          },
          {
            kind: "formula",
            tex: "x^{(k+1)}=x^{(k)}-\\left[F'\\!\\left(\\frac{x^{(k)}+y^{(k)}}{2}\\right)\\right]^{-1}F(x^{(k)})",
            caption: {
              es: "Método del punto medio para sistemas.",
              eu: "Erdiko puntuaren metodoa sistemetarako.",
              en: "Midpoint method for systems."
            }
          },
          {
            kind: "formula",
            tex: "x^{(k+1)}=x^{(k)}-6\\left[F'(x^{(k)})+4F'\\!\\left(\\frac{x^{(k)}+y^{(k)}}{2}\\right)+F'(y^{(k)})\\right]^{-1}F(x^{(k)})",
            caption: {
              es: "Método de Simpson para sistemas.",
              eu: "Simpson-en metodoa sistemetarako.",
              en: "Simpson method for systems."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "sistemas-no-lineales-eficiencia",
    category: "Sistemas no lineales",
    level: "avanzado",
    searchIntent: "eficiencia coste computacional sistemas no lineales evaluaciones jacobiano óptimo",
    title: {
      es: "Coste y eficiencia en dimensión n",
      eu: "Kostua eta eraginkortasuna n dimentsioan",
      en: "Cost and efficiency in dimension n"
    },
    description: {
      es: "Contabilidad del coste por iteración en sistemas: $n$ evaluaciones por $F$, $n^2$ por jacobiano, coste de los sistemas lineales, índices de eficiencia y la conjetura de optimalidad multidimensional.",
      eu: "Iterazio bakoitzeko kostuaren kontabilitatea sistemetan: $n$ ebaluazio $F$ bakoitzeko, $n^2$ jacobiar bakoitzeko, sistema linealen kostua, eraginkortasun-indizeak eta optimalitate-aieru multidimentsionala.",
      en: "Accounting of per-iteration cost in systems: $n$ evaluations per $F$, $n^2$ per Jacobian, cost of the linear solves, efficiency indices and the multidimensional optimality conjecture."
    },
    keywords: ["eficiencia", "coste computacional", "jacobiano", "óptimo", "índice"],
    prerequisites: ["sistemas-no-lineales-newton", "no-lineales-orden-eficiencia"],
    related: ["sistemas-no-lineales-alto-orden", "ejercicio-comparativa-sistemas"],
    sections: [
      {
        heading: {
          es: "Qué cuesta cada iteración",
          eu: "Zenbat kostatzen den iterazio bakoitza",
          en: "What each iteration costs"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "En dimensión $n$, cada evaluación de la función vectorial $F$ son $n$ evaluaciones escalares, y cada jacobiano $F'$ son $n^2$. Además, cada sistema lineal resuelto de forma directa cuesta $\\frac{n^3}{3}+n^2-\\frac{n}{3}$ productos/cocientes, y resolver $q$ sistemas con la misma matriz de coeficientes (factorizando una sola vez) cuesta $\\frac{n^3}{3}+qn^2-\\frac{n}{3}$: por eso los métodos que congelan el jacobiano son tan atractivos.",
              eu: "$n$ dimentsioan, $F$ funtzio bektorialaren ebaluazio bakoitza $n$ ebaluazio eskalar dira, eta $F'$ jacobiar bakoitza $n^2$. Gainera, zuzenean ebatzitako sistema lineal bakoitzak $\\frac{n^3}{3}+n^2-\\frac{n}{3}$ biderketa/zatiketa kostatzen du, eta koefiziente-matrize bereko $q$ sistema ebazteak (behin bakarrik faktorizatuz) $\\frac{n^3}{3}+qn^2-\\frac{n}{3}$: horregatik dira hain erakargarriak jacobiarra izozten duten metodoak.",
              en: "In dimension $n$, each evaluation of the vector function $F$ is $n$ scalar evaluations, and each Jacobian $F'$ is $n^2$. Moreover, each directly solved linear system costs $\\frac{n^3}{3}+n^2-\\frac{n}{3}$ products/quotients, and solving $q$ systems with the same coefficient matrix (factorizing only once) costs $\\frac{n^3}{3}+qn^2-\\frac{n}{3}$. This cost makes frozen-Jacobian methods attractive."
            }
          },
          {
            kind: "example",
            title: {
              es: "Eficiencia del método de Newton",
              eu: "Newton-en metodoaren eraginkortasuna",
              en: "Efficiency of Newton's method"
            },
            statement: {
              es: "Calcular los índices de eficiencia de [[sistemas-no-lineales-newton|Newton para sistemas]] en dimensión $n$.",
              eu: "Kalkulatu [[sistemas-no-lineales-newton|sistemetarako Newton-en]] eraginkortasun-indizeak $n$ dimentsioan.",
              en: "Compute the efficiency indices of [[sistemas-no-lineales-newton|Newton for systems]] in dimension $n$."
            },
            steps: [
              {
                text: {
                  es: "Por iteración hay una evaluación de $F$ ($n$ escalares) y una del jacobiano ($n^2$): en total $d=n^2+n$ evaluaciones funcionales.",
                  eu: "Iterazio bakoitzeko $F$-ren ebaluazio bat dago ($n$ eskalarrak) eta jacobiarraren bat ($n^2$): guztira $d=n^2+n$ ebaluazio funtzional.",
                  en: "Per iteration there is one evaluation of $F$ ($n$ scalars) and one of the Jacobian ($n^2$): in total $d=n^2+n$ functional evaluations."
                }
              },
              {
                text: {
                  es: "Se resuelve un único sistema lineal por iteración, así que $op=\\frac{n^3}{3}+n^2-\\frac{n}{3}$ productos/cocientes.",
                  eu: "Iterazio bakoitzeko sistema lineal bakarra ebazten da; beraz, $op=\\frac{n^3}{3}+n^2-\\frac{n}{3}$ biderketa/zatiketa.",
                  en: "A single linear system is solved per iteration, so $op=\\frac{n^3}{3}+n^2-\\frac{n}{3}$ products/quotients."
                }
              },
              {
                text: {
                  es: "Con orden $p=2$, los [[no-lineales-orden-eficiencia|índices]] quedan:",
                  eu: "$p=2$ ordenarekin, [[no-lineales-orden-eficiencia|indizeak]] honela geratzen dira:",
                  en: "With order $p=2$, the [[no-lineales-orden-eficiencia|indices]] become:"
                },
                formula: "I_N=2^{1/(n^2+n)},\\qquad IC_N=2^{1/\\left(\\frac{n^3}{3}+2n^2+\\frac{2n}{3}\\right)}"
              }
            ],
            result: {
              text: {
                es: "Ambos índices tienden a 1 al crecer $n$: en dimensiones altas, todas las eficiencias se comprimen y el coste de los sistemas lineales manda.",
                eu: "Bi indizeak 1erantz doaz $n$ handitzean: dimentsio altuetan, eraginkortasun guztiak konprimitzen dira eta sistema linealen kostuak agintzen du.",
                en: "Both indices tend to 1 as $n$ grows: in high dimensions all efficiencies compress and the cost of the linear solves rules."
              }
            }
          }
        ]
      },
      {
        heading: {
          es: "Optimalidad multidimensional",
          eu: "Optimalitate multidimentsionala",
          en: "Multidimensional optimality"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La [[no-lineales-orden-eficiencia|conjetura de Kung-Traub]] escalar ($p\\le 2^{d-1}$) no es válida en varias variables. La conjetura multidimensional acota el orden por",
              eu: "[[no-lineales-orden-eficiencia|Kung-Traub aieru]] eskalarra ($p\\le 2^{d-1}$) ez da baliozkoa aldagai anitzetan. Aieru multidimentsionalak ordena honela mugatzen du:",
              en: "The scalar [[no-lineales-orden-eficiencia|Kung-Traub conjecture]] ($p\\le 2^{d-1}$) does not hold in several variables. The multidimensional conjecture bounds the order by"
            }
          },
          {
            kind: "formula",
            tex: "p\\le 2^{k_1+k_2-1},\\qquad k_1\\le k_2",
            caption: {
              es: "$k_1$ = evaluaciones del jacobiano y $k_2$ = evaluaciones de $F$ por iteración ($d=k_1+k_2$).",
              eu: "$k_1$ = jacobiarraren ebaluazioak eta $k_2$ = $F$-ren ebaluazioak iterazio bakoitzeko ($d=k_1+k_2$).",
              en: "$k_1$ = Jacobian evaluations and $k_2$ = evaluations of $F$ per iteration ($d=k_1+k_2$)."
            }
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Solo Newton es óptimo",
              eu: "Newton bakarrik da optimoa",
              en: "Only Newton is optimal"
            },
            text: {
              es: "Esta cota es muy restrictiva: de los métodos conocidos, solo el método de Newton la alcanza ($k_1=k_2=1$, $p=2=2^{1+1-1}$). Aun así, los [[sistemas-no-lineales-alto-orden|métodos de alto orden]] mejoran a Newton en índice de eficiencia para todo $n>1$.",
              eu: "Kota hori oso murriztailea da: metodo ezagunen artean, Newton-en metodoak bakarrik lortzen du ($k_1=k_2=1$, $p=2=2^{1+1-1}$). Hala ere, [[sistemas-no-lineales-alto-orden|ordena altuko metodoek]] Newton hobetzen dute eraginkortasun-indizean $n>1$ guztietarako.",
              en: "This bound is very restrictive: among known methods, only Newton's method reaches it ($k_1=k_2=1$, $p=2=2^{1+1-1}$). Even so, the [[sistemas-no-lineales-alto-orden|high-order methods]] beat Newton in efficiency index for every $n>1$."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "sistemas-no-lineales-alto-orden",
    category: "Sistemas no lineales",
    level: "avanzado",
    searchIntent: "Traub Golden Ratio NA Jarratt RN sistemas jacobiano congelado composición",
    title: {
      es: "Alto orden en sistemas: Traub, Golden Ratio, NA, Jarratt y RN",
      eu: "Ordena altua sistemetan: Traub, Golden Ratio, NA, Jarratt eta RN",
      en: "High order in systems: Traub, Golden Ratio, NA, Jarratt and RN"
    },
    description: {
      es: "Composición con Newton y jacobiano congelado: cómo ganar un orden por composición sin evaluar jacobianos nuevos, y las familias Traub, Golden Ratio, NA, Jarratt vectorial y RN (orden 5-6).",
      eu: "Newton-ekin konposatzea eta jacobiar izoztua: nola irabazi ordena bat konposizioz jacobiar berririk ebaluatu gabe, eta Traub, Golden Ratio, NA, Jarratt bektoriala eta RN (5-6 ordena) familiak.",
      en: "Composition with Newton and frozen Jacobian: how to gain one order by composition without evaluating new Jacobians, and the Traub, Golden Ratio, NA, vector Jarratt and RN (order 5-6) families."
    },
    keywords: ["Traub", "Golden Ratio", "NA", "Jarratt", "RN", "jacobiano congelado"],
    prerequisites: ["sistemas-no-lineales-newton", "sistemas-no-lineales-eficiencia"],
    related: ["no-lineales-metodos-alto-orden", "ejercicio-comparativa-sistemas"],
    sections: [
      {
        heading: {
          es: "Composición con jacobiano congelado",
          eu: "Konposizioa jacobiar izoztuarekin",
          en: "Composition with frozen Jacobian"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Componer un método de orden $p$, $z^{(k)}=\\Phi(x^{(k)},y^{(k)})$, con un paso completo de Newton da orden $2p$, pero exige evaluar (y factorizar) un jacobiano nuevo en $z^{(k)}$. La alternativa barata es reutilizar el jacobiano ya factorizado:",
              eu: "$p$ ordenako metodo bat, $z^{(k)}=\\Phi(x^{(k)},y^{(k)})$, Newton-en pauso oso batekin konposatzeak $2p$ ordena ematen du, baina $z^{(k)}$-n jacobiar berri bat ebaluatzea (eta faktorizatzea) eskatzen du. Alternatiba merkea dagoeneko faktorizatutako jacobiarra berrerabiltzea da:",
              en: "Composing a method of order $p$, $z^{(k)}=\\Phi(x^{(k)},y^{(k)})$, with a full Newton step gives order $2p$, but requires evaluating (and factorizing) a new Jacobian at $z^{(k)}$. The cheap alternative is to reuse the already factorized Jacobian:"
            }
          },
          {
            kind: "formula",
            tex: "z^{(k)}=\\Phi(x^{(k)},y^{(k)}),\\qquad x^{(k+1)}=z^{(k)}-\\bigl[F'(x^{(k)})\\bigr]^{-1}F(z^{(k)})"
          },
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Orden con jacobiano congelado",
              eu: "Ordena jacobiar izoztuarekin",
              en: "Order with frozen Jacobian"
            },
            text: {
              es: "Sea $F$ suficientemente diferenciable en un entorno de $\\alpha$ con $F'$ continua y no singular en $\\alpha$. Si $z^{(k)}=\\Phi(x^{(k)},y^{(k)})$ es un método de orden $p$, el esquema compuesto con jacobiano congelado converge a $\\alpha$ con orden $p+1$: se gana un orden al precio de una evaluación de $F$ y una resolución extra con la matriz ya factorizada.",
              eu: "Izan bedi $F$ nahikoa diferentziagarria $\\alpha$-ren ingurune batean, $F'$ jarraitua eta ez-singularra izanik $\\alpha$-n. $z^{(k)}=\\Phi(x^{(k)},y^{(k)})$ $p$ ordenako metodoa bada, jacobiar izoztuarekin konposatutako eskemak $\\alpha$-ra konbergitzen du $p+1$ ordenarekin: ordena bat irabazten da $F$-ren ebaluazio baten eta dagoeneko faktorizatutako matrizearekiko ebazpen gehigarri baten truke.",
              en: "Let $F$ be sufficiently differentiable near $\\alpha$ with $F'$ continuous and nonsingular at $\\alpha$. If $z^{(k)}=\\Phi(x^{(k)},y^{(k)})$ is a method of order $p$, the composed scheme with frozen Jacobian converges to $\\alpha$ with order $p+1$: one order is gained at the price of one evaluation of $F$ and one extra solve with the already factorized matrix."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "El ejemplo más simple es el método de Traub vectorial, Newton (orden 2) seguido de un paso con jacobiano congelado, de orden $2+1=3$:",
              eu: "Adibiderik sinpleena Traub-en metodo bektoriala da: Newton (2. ordena) eta ondoren pauso bat jacobiar izoztuarekin, $2+1=3$ ordenakoa:",
              en: "The simplest example is the vector Traub method: Newton (order 2) followed by one frozen-Jacobian step, of order $2+1=3$:"
            }
          },
          {
            kind: "formula",
            tex: "\\begin{aligned} z^{(k)}&=x^{(k)}-\\bigl[F'(x^{(k)})\\bigr]^{-1}F(x^{(k)})\\\\ x^{(k+1)}&=z^{(k)}-\\bigl[F'(x^{(k)})\\bigr]^{-1}F(z^{(k)}) \\end{aligned}",
            caption: {
              es: "Método de Traub para sistemas, orden 3.",
              eu: "Traub-en metodoa sistemetarako, 3. ordena.",
              en: "Traub's method for systems, order 3."
            }
          }
        ]
      },
      {
        heading: {
          es: "Golden Ratio y el método NA",
          eu: "Golden Ratio eta NA metodoa",
          en: "Golden Ratio and the NA method"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Generalizando la idea con pasos ponderados $\\eta_j(x^{(k)})=x^{(k)}-a_j[F'(x^{(k)})]^{-1}F(x^{(k)})$ se obtiene la familia $x^{(k+1)}=x^{(k)}-[F'(x^{(k)})]^{-1}\\bigl(\\sum_j b_jF(\\eta_j(x^{(k)}))\\bigr)$. El miembro de dos pasos es el método Golden Ratio, de orden 3, llamado así porque sus parámetros involucran a $\\sqrt5$: $a=\\frac{-1\\pm\\sqrt5}{2}$, $b=\\frac{3\\pm\\sqrt5}{2}$.",
              eu: "Ideia pauso haztatuekin orokortuz, $\\eta_j(x^{(k)})=x^{(k)}-a_j[F'(x^{(k)})]^{-1}F(x^{(k)})$, familia hau lortzen da: $x^{(k+1)}=x^{(k)}-[F'(x^{(k)})]^{-1}\\bigl(\\sum_j b_jF(\\eta_j(x^{(k)}))\\bigr)$. Bi pausoko kidea Golden Ratio metodoa da, 3. ordenakoa, izen hori duena bere parametroek $\\sqrt5$ dutelako: $a=\\frac{-1\\pm\\sqrt5}{2}$, $b=\\frac{3\\pm\\sqrt5}{2}$.",
              en: "Generalizing the idea with weighted steps $\\eta_j(x^{(k)})=x^{(k)}-a_j[F'(x^{(k)})]^{-1}F(x^{(k)})$ yields the family $x^{(k+1)}=x^{(k)}-[F'(x^{(k)})]^{-1}\\bigl(\\sum_j b_jF(\\eta_j(x^{(k)}))\\bigr)$. The two-step member is the Golden Ratio method, of order 3, so named because its parameters involve $\\sqrt5$: $a=\\frac{-1\\pm\\sqrt5}{2}$, $b=\\frac{3\\pm\\sqrt5}{2}$."
            }
          },
          {
            kind: "formula",
            tex: "\\begin{aligned} y^{(k)}&=x^{(k)}-a\\bigl[F'(x^{(k)})\\bigr]^{-1}F(x^{(k)})\\\\ x^{(k+1)}&=x^{(k)}-b\\bigl[F'(x^{(k)})\\bigr]^{-1}F(y^{(k)}) \\end{aligned}",
            caption: {
              es: "Método Golden Ratio, orden 3.",
              eu: "Golden Ratio metodoa, 3. ordena.",
              en: "Golden Ratio method, order 3."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Componiendo Golden Ratio con un paso de jacobiano congelado se obtiene el método NA, de orden 4 con una única evaluación de jacobiano por iteración. Sus índices de eficiencia baten a los de Newton y Golden Ratio para todo $n>1$: $I_{NA}=4^{1/(n^2+3n)}>I_{GR}=3^{1/(n^2+2n)}>I_N=2^{1/(n^2+n)}$.",
              eu: "Golden Ratio jacobiar izoztuko pauso batekin konposatuz NA metodoa lortzen da, 4. ordenakoa, iterazio bakoitzeko jacobiarraren ebaluazio bakarrarekin. Bere eraginkortasun-indizeek Newton-enak eta Golden Ratio-renak gainditzen dituzte $n>1$ guztietarako: $I_{NA}=4^{1/(n^2+3n)}>I_{GR}=3^{1/(n^2+2n)}>I_N=2^{1/(n^2+n)}$.",
              en: "Composing Golden Ratio with a frozen-Jacobian step yields the NA method, of order 4 with a single Jacobian evaluation per iteration. Its efficiency indices beat Newton's and Golden Ratio's for every $n>1$: $I_{NA}=4^{1/(n^2+3n)}>I_{GR}=3^{1/(n^2+2n)}>I_N=2^{1/(n^2+n)}$."
            }
          },
          {
            kind: "formula",
            tex: "\\begin{aligned} y^{(k)}&=x^{(k)}-a\\bigl[F'(x^{(k)})\\bigr]^{-1}F(x^{(k)})\\\\ z^{(k)}&=x^{(k)}-b\\bigl[F'(x^{(k)})\\bigr]^{-1}F(y^{(k)})\\\\ x^{(k+1)}&=z^{(k)}-\\bigl[F'(x^{(k)})\\bigr]^{-1}F(z^{(k)}) \\end{aligned}",
            caption: {
              es: "Método NA, orden 4 con un solo jacobiano.",
              eu: "NA metodoa, 4. ordena jacobiar bakarrarekin.",
              en: "NA method, order 4 with a single Jacobian."
            }
          }
        ]
      },
      {
        heading: {
          es: "Jarratt vectorial y el método RN",
          eu: "Jarratt bektoriala eta RN metodoa",
          en: "Vector Jarratt and the RN method"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "El [[no-lineales-metodos-alto-orden|método de Jarratt]] también se extiende a sistemas, manteniendo su orden 4:",
              eu: "[[no-lineales-metodos-alto-orden|Jarratt-en metodoa]] ere sistemetara hedatzen da, bere 4. ordena mantenduz:",
              en: "[[no-lineales-metodos-alto-orden|Jarratt's method]] also extends to systems, keeping its order 4:"
            }
          },
          {
            kind: "formula",
            tex: "\\begin{aligned} y^{(k)}&=x^{(k)}-\\tfrac{2}{3}\\bigl[F'(x^{(k)})\\bigr]^{-1}F(x^{(k)})\\\\ x^{(k+1)}&=x^{(k)}-\\tfrac{1}{2}\\bigl[3F'(y^{(k)})-F'(x^{(k)})\\bigr]^{-1}\\bigl(3F'(y^{(k)})+F'(x^{(k)})\\bigr)\\bigl[F'(x^{(k)})\\bigr]^{-1}F(x^{(k)}) \\end{aligned}",
            caption: {
              es: "Método de Jarratt para sistemas, orden 4.",
              eu: "Jarratt-en metodoa sistemetarako, 4. ordena.",
              en: "Jarratt's method for systems, order 4."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "A cambio, evalúa dos jacobianos y resuelve sistemas lineales con dos matrices de coeficientes distintas: $I_J=4^{1/(2n^2+n)}$. Componiéndolo con una variante de Newton se obtiene el método RN, con un tercer paso $x^{(k+1)}=z^{(k)}-\\bigl[aF'(x^{(k)})+bF'(y^{(k)})\\bigr]^{-1}F(z^{(k)})$.",
              eu: "Trukean, bi jacobiar ebaluatzen ditu eta bi koefiziente-matrize desberdineko sistema linealak ebazten ditu: $I_J=4^{1/(2n^2+n)}$. Newton-en aldaera batekin konposatuz RN metodoa lortzen da, hirugarren pauso batekin: $x^{(k+1)}=z^{(k)}-\\bigl[aF'(x^{(k)})+bF'(y^{(k)})\\bigr]^{-1}F(z^{(k)})$.",
              en: "In exchange, it evaluates two Jacobians and solves linear systems with two different coefficient matrices: $I_J=4^{1/(2n^2+n)}$. Composing it with a Newton variant yields the RN method, with a third step $x^{(k+1)}=z^{(k)}-\\bigl[aF'(x^{(k)})+bF'(y^{(k)})\\bigr]^{-1}F(z^{(k)})$."
            }
          },
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Orden del método RN",
              eu: "RN metodoaren ordena",
              en: "Order of the RN method"
            },
            text: {
              es: "Con $F$ suficientemente diferenciable y $F'$ continua y no singular en $\\alpha$, el método RN converge con orden 5 para los esquemas con $a+b=1$; con la elección $a=-\\frac12$, $b=\\frac32$ alcanza orden 6. Su comportamiento práctico se ve en la [[ejercicio-comparativa-sistemas|comparativa numérica]].",
              eu: "$F$ nahikoa diferentziagarria izanik eta $F'$ jarraitua eta ez-singularra $\\alpha$-n, RN metodoak 5. ordenarekin konbergitzen du $a+b=1$ betetzen duten eskemetarako; $a=-\\frac12$, $b=\\frac32$ aukerarekin 6. ordena lortzen du. Bere portaera praktikoa [[ejercicio-comparativa-sistemas|konparatiba numerikoan]] ikusten da.",
              en: "With $F$ sufficiently differentiable and $F'$ continuous and nonsingular at $\\alpha$, the RN method converges with order 5 for the schemes with $a+b=1$; with the choice $a=-\\frac12$, $b=\\frac32$ it reaches order 6. Its practical behaviour is shown in the [[ejercicio-comparativa-sistemas|numerical comparison]]."
            }
          }
        ]
      }
    ]
  }
];

export const sistemasNoLinealesDerivations: ContentEntry[] = [
  {
    slug: "deduccion-newton-sistemas",
    category: "Sistemas no lineales",
    level: "medio",
    searchIntent: "deducción Newton sistemas linealización Taylor jacobiano ejemplo",
    title: {
      es: "Deducción: Newton para sistemas por linealización",
      eu: "Dedukzioa: Newton sistemetarako linealizazioz",
      en: "Derivation: Newton for systems by linearization"
    },
    description: {
      es: "El desarrollo de Taylor multivariante de primer orden linealiza F alrededor del iterado actual; anular esa linealización da el paso de Newton, con el jacobiano en el papel de la derivada.",
      eu: "Lehen ordenako Taylor garapen aldagai anitzekoak F linealizatzen du uneko iteratuaren inguruan; linealizazio hori anulatzeak Newton-en pausoa ematen du, jacobiarra deribatuaren paperean dela.",
      en: "The first-order multivariate Taylor expansion linearizes F around the current iterate; setting that linearization to zero gives the Newton step, with the Jacobian in the role of the derivative."
    },
    keywords: ["deducción", "Newton", "sistemas", "jacobiano", "linealización"],
    prerequisites: ["deduccion-newton-raphson"],
    related: ["sistemas-no-lineales-newton", "deduccion-newton-raphson"],
    sections: [
      {
        heading: {
          es: "Linealizar y anular",
          eu: "Linealizatu eta anulatu",
          en: "Linearize and set to zero"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "La matriz jacobiana reúne todas las derivadas parciales primeras de las funciones coordenadas:",
                  eu: "Matrize jacobiarrak funtzio koordenatuen lehen deribatu partzial guztiak biltzen ditu:",
                  en: "The Jacobian matrix collects all first partial derivatives of the coordinate functions:"
                },
                formula: "F'(X)=\\begin{bmatrix} \\frac{\\partial f_1}{\\partial x_1} & \\cdots & \\frac{\\partial f_1}{\\partial x_n}\\\\ \\vdots & & \\vdots\\\\ \\frac{\\partial f_n}{\\partial x_1} & \\cdots & \\frac{\\partial f_n}{\\partial x_n} \\end{bmatrix}"
              },
              {
                text: {
                  es: "El desarrollo de Taylor multivariante de primer orden alrededor del iterado actual $x^{(k)}$ es la versión vectorial de la recta tangente de la [[deduccion-newton-raphson|deducción escalar]]:",
                  eu: "Uneko $x^{(k)}$ iteratuaren inguruko lehen ordenako Taylor garapen aldagai anitzekoa [[deduccion-newton-raphson|dedukzio eskalarreko]] zuzen ukitzailearen bertsio bektoriala da:",
                  en: "The first-order multivariate Taylor expansion around the current iterate $x^{(k)}$ is the vector version of the tangent line in the [[deduccion-newton-raphson|scalar derivation]]:"
                },
                formula: "F(X)\\approx F\\bigl(x^{(k)}\\bigr)+F'\\bigl(x^{(k)}\\bigr)\\bigl(X-x^{(k)}\\bigr)"
              },
              {
                text: {
                  es: "Buscamos el punto que anula esa aproximación lineal (el análogo de cortar el eje con la tangente). Igualando a cero y despejando, con la inversa del jacobiano en lugar del cociente:",
                  eu: "Hurbilketa lineal hori anulatzen duen puntua bilatzen dugu (ukitzailearekin ardatza moztearen analogoa). Zerora berdinduz eta askatuz, zatiduraren ordez jacobiarraren alderantzizkoa erabilita:",
                  en: "We seek the point that makes this linear approximation vanish (the analogue of the tangent crossing the axis). Setting it to zero and solving, with the Jacobian inverse instead of the quotient:"
                },
                formula: "x^{(k+1)}=x^{(k)}-\\bigl[F'(x^{(k)})\\bigr]^{-1}F\\bigl(x^{(k)}\\bigr)"
              }
            ]
          }
        ]
      },
      {
        heading: {
          es: "Ejemplo: montar F y su jacobiano",
          eu: "Adibidea: F eta bere jacobiarra eraiki",
          en: "Example: building F and its Jacobian"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Un sistema 2×2",
              eu: "2×2 sistema bat",
              en: "A 2×2 system"
            },
            statement: {
              es: "Escribir en la forma $F(X)=0$ el sistema $e^xe^y+x\\cos y=0$, $x+y=1$, y calcular su matriz jacobiana.",
              eu: "Idatzi $F(X)=0$ eran $e^xe^y+x\\cos y=0$, $x+y=1$ sistema, eta kalkulatu bere matrize jacobiarra.",
              en: "Write the system $e^xe^y+x\\cos y=0$, $x+y=1$ in the form $F(X)=0$, and compute its Jacobian matrix."
            }
          ,
            steps: [
              {
                text: {
                  es: "Se pasa todo al lado izquierdo:",
                  eu: "Dena ezkerreko aldera pasatzen da:",
                  en: "Move everything to the left-hand side:"
                },
                formula: "F(X)=\\begin{bmatrix} e^xe^y+x\\cos y\\\\ x+y-1 \\end{bmatrix}=\\begin{bmatrix}0\\\\0\\end{bmatrix}"
              },
              {
                text: {
                  es: "Derivando cada componente respecto de cada variable:",
                  eu: "Osagai bakoitza aldagai bakoitzarekiko deribatuz:",
                  en: "Differentiating each component with respect to each variable:"
                },
                formula: "F'(X)=\\begin{bmatrix} e^xe^y+\\cos y & e^xe^y-x\\sin y\\\\ 1 & 1 \\end{bmatrix}"
              }
            ],
            result: {
              text: {
                es: "Este sistema se resuelve con Newton en el [[ejercicio-newton-sistema-2d|ejercicio resuelto]]. Obsérvese que sobre la restricción $x+y=1$ se cumple $e^xe^y=e^{x+y}=e$: en la solución, $x\\cos(1-x)=-e$.",
                eu: "Sistema hau Newton-ekin ebazten da [[ejercicio-newton-sistema-2d|ariketa ebatzian]]. Erreparatu $x+y=1$ murrizketaren gainean $e^xe^y=e^{x+y}=e$ betetzen dela: soluzioan, $x\\cos(1-x)=-e$.",
                en: "This system is solved with Newton in the [[ejercicio-newton-sistema-2d|solved exercise]]. Note that on the constraint $x+y=1$ one has $e^xe^y=e^{x+y}=e$: at the solution, $x\\cos(1-x)=-e$."
              }
            }
          }
        ]
      }
    ]
  }
];

export const sistemasNoLinealesExercises: ContentEntry[] = [
  {
    slug: "ejercicio-newton-sistema-a-mano",
    category: "Sistemas no lineales",
    level: "medio",
    searchIntent: "ejercicio resuelto Newton sistema a mano circunferencia recta",
    title: {
      es: "Ejercicio: Newton para un sistema, a mano",
      eu: "Ariketa: Newton sistema baterako, eskuz",
      en: "Exercise: Newton for a system, by hand"
    },
    description: {
      es: "Dos pasos de Newton a mano sobre el sistema $x^2+y^2=1$, $x=y$: montaje del jacobiano, resolución del sistema lineal $2\\times2$ de cada paso y convergencia cuadrática visible hacia $(\\sqrt2/2,\\sqrt2/2)$.",
      eu: "Newton-en bi pauso eskuz $x^2+y^2=1$, $x=y$ sistemaren gainean: jacobiarraren eraikuntza, pauso bakoitzeko $2\\times2$ sistema linealaren ebazpena eta konbergentzia koadratiko ikusgarria $(\\sqrt2/2,\\sqrt2/2)$-rantz.",
      en: "Two Newton steps by hand on the system $x^2+y^2=1$, $x=y$: building the Jacobian, solving each step's $2\\times2$ linear system and visible quadratic convergence towards $(\\sqrt2/2,\\sqrt2/2)$."
    },
    keywords: ["ejercicio", "Newton", "sistema", "a mano", "jacobiano"],
    prerequisites: ["sistemas-no-lineales-newton"],
    related: ["sistemas-no-lineales-newton", "ejercicio-newton-sistema-2d"],
    sections: [
      {
        heading: {
          es: "Resolución",
          eu: "Ebazpena",
          en: "Solution"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Intersección de circunferencia y bisectriz",
              eu: "Zirkunferentziaren eta erdikariaren ebakidura",
              en: "Intersection of circle and bisector"
            },
            statement: {
              es: "Aproximar con dos pasos de Newton la solución positiva del sistema $x^2+y^2=1$, $x-y=0$, partiendo de $x^{(0)}=(1,1)$. La solución exacta es $\\alpha=\\bigl(\\frac{\\sqrt2}{2},\\frac{\\sqrt2}{2}\\bigr)=(0.7071068,\\,0.7071068)$.",
              eu: "Hurbildu Newton-en bi pausorekin $x^2+y^2=1$, $x-y=0$ sistemaren soluzio positiboa, $x^{(0)}=(1,1)$-etik abiatuta. Soluzio zehatza $\\alpha=\\bigl(\\frac{\\sqrt2}{2},\\frac{\\sqrt2}{2}\\bigr)=(0.7071068,\\,0.7071068)$ da.",
              en: "Approximate with two Newton steps the positive solution of the system $x^2+y^2=1$, $x-y=0$, starting from $x^{(0)}=(1,1)$. The exact solution is $\\alpha=\\bigl(\\frac{\\sqrt2}{2},\\frac{\\sqrt2}{2}\\bigr)=(0.7071068,\\,0.7071068)$."
            },
            steps: [
              {
                text: {
                  es: "Función y jacobiano:",
                  eu: "Funtzioa eta jacobiarra:",
                  en: "Function and Jacobian:"
                },
                formula: "F(x,y)=\\begin{bmatrix}x^2+y^2-1\\\\ x-y\\end{bmatrix},\\qquad F'(x,y)=\\begin{bmatrix}2x & 2y\\\\ 1 & -1\\end{bmatrix}"
              },
              {
                text: {
                  es: "Primer paso: en $(1,1)$, $F=(1,0)^T$ y el sistema lineal $F'u=F$ es $2u_1+2u_2=1$, $u_1-u_2=0$, con solución $u=(\\tfrac14,\\tfrac14)$:",
                  eu: "Lehen pausoa: $(1,1)$-en, $F=(1,0)^T$ eta $F'u=F$ sistema lineala $2u_1+2u_2=1$, $u_1-u_2=0$ da, $u=(\\tfrac14,\\tfrac14)$ soluzioarekin:",
                  en: "First step: at $(1,1)$, $F=(1,0)^T$ and the linear system $F'u=F$ is $2u_1+2u_2=1$, $u_1-u_2=0$, with solution $u=(\\tfrac14,\\tfrac14)$:"
                },
                formula: "x^{(1)}=(1,1)-\\bigl(\\tfrac14,\\tfrac14\\bigr)=(0.75,\\;0.75)"
              },
              {
                text: {
                  es: "Segundo paso: en $(0.75,0.75)$, $F=(0.125,\\,0)^T$ y el sistema es $1.5\\,u_1+1.5\\,u_2=0.125$, $u_1-u_2=0$, es decir, $u=(\\tfrac{1}{24},\\tfrac{1}{24})$:",
                  eu: "Bigarren pausoa: $(0.75,0.75)$-en, $F=(0.125,\\,0)^T$ eta sistema $1.5\\,u_1+1.5\\,u_2=0.125$, $u_1-u_2=0$ da, hau da, $u=(\\tfrac{1}{24},\\tfrac{1}{24})$:",
                  en: "Second step: at $(0.75,0.75)$, $F=(0.125,\\,0)^T$ and the system is $1.5\\,u_1+1.5\\,u_2=0.125$, $u_1-u_2=0$, that is, $u=(\\tfrac{1}{24},\\tfrac{1}{24})$:"
                },
                formula: "x^{(2)}=(0.75,\\;0.75)-\\bigl(\\tfrac{1}{24},\\tfrac{1}{24}\\bigr)=(0.7083333,\\;0.7083333)"
              }
            ],
            result: {
              text: {
                es: "Los errores son $0.293\\to 0.043\\to 0.0012$: cada paso aproximadamente eleva al cuadrado el error, la firma de la convergencia cuadrática. Un tercer paso daría $0.7071078$, con error $10^{-6}$. (En este sistema simétrico la iteración se reduce a la del Newton escalar para $2x^2=1$.)",
                eu: "Erroreak $0.293\\to 0.043\\to 0.0012$ dira: pauso bakoitzak errorea gutxi gorabehera karratura jasotzen du, konbergentzia koadratikoaren sinadura. Hirugarren pauso batek $0.7071078$ emango luke, $10^{-6}$ errorearekin. (Sistema simetriko honetan iterazioa $2x^2=1$-erako Newton eskalarrarena bihurtzen da.)",
                en: "The errors are $0.293\\to 0.043\\to 0.0012$: each step roughly squares the error, the signature of quadratic convergence. A third step would give $0.7071078$, with error $10^{-6}$. (In this symmetric system the iteration reduces to scalar Newton for $2x^2=1$.)"
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-newton-sistema-2d",
    category: "Sistemas no lineales",
    level: "avanzado",
    searchIntent: "ejercicio Newton sistema exponencial coseno tabla iteraciones ACOC",
    title: {
      es: "Ejercicio: Newton en un sistema 2×2 con tabla de iteraciones",
      eu: "Ariketa: Newton 2×2 sistema batean, iterazio-taularekin",
      en: "Exercise: Newton on a 2×2 system with iteration table"
    },
    description: {
      es: "Resolución completa de $e^x e^y+x\\cos y=0$, $x+y=1$ con Newton desde $[2,-1]$: tabla de iterados, normas del residuo e incremento, y ACOC estabilizándose en 2.",
      eu: "$e^x e^y+x\\cos y=0$, $x+y=1$ sistemaren ebazpen osoa Newton-ekin $[2,-1]$-etik: iteratuen taula, hondarraren eta inkrementuaren normak, eta ACOC 2an egonkortzen.",
      en: "Full solution of $e^x e^y+x\\cos y=0$, $x+y=1$ with Newton from $[2,-1]$: table of iterates, residual and increment norms, and ACOC settling at 2."
    },
    keywords: ["ejercicio", "Newton", "sistema", "ACOC", "tabla"],
    prerequisites: ["sistemas-no-lineales-newton"],
    related: ["sistemas-no-lineales-newton", "deduccion-newton-sistemas", "ejercicio-comparativa-sistemas"],
    sections: [
      {
        heading: {
          es: "Planteamiento",
          eu: "Planteamendua",
          en: "Setup"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Se resuelve el sistema $e^xe^y+x\\cos y=0$, $x+y=1$, cuyo montaje ($F$ y jacobiano) se hizo en la [[deduccion-newton-sistemas|deducción]], con estimación inicial $x^{(0)}=[2,-1]^T$, tolerancia $10^{-20}$ (aritmética de precisión extendida) y máximo de 40 iteraciones.",
              eu: "$e^xe^y+x\\cos y=0$, $x+y=1$ sistema ebazten da. Bere eraikuntza ($F$ eta jacobiarra) [[deduccion-newton-sistemas|dedukzioan]] egin zen. Hasierako estimazioa $x^{(0)}=[2,-1]^T$ da, tolerantzia $10^{-20}$ (doitasun hedatuko aritmetika) eta gehienez 40 iterazio izanik.",
              en: "Solve the system $e^xe^y+x\\cos y=0$, $x+y=1$. The [[deduccion-newton-sistemas|derivation]] builds $F$ and the Jacobian. Use initial estimate $x^{(0)}=[2,-1]^T$, tolerance $10^{-20}$ (extended-precision arithmetic) and at most 40 iterations."
            }
          }
        ]
      },
      {
        heading: {
          es: "Iteraciones",
          eu: "Iterazioak",
          en: "Iterations"
        },
        blocks: [
          {
            kind: "table",
            head: {
              es: ["iter", "$x^{(k)}$", "$\\|F(x^{(k+1)})\\|$", "$\\|x^{(k+1)}-x^{(k)}\\|$", "ACOC"],
              eu: ["iter", "$x^{(k)}$", "$\\|F(x^{(k+1)})\\|$", "$\\|x^{(k+1)}-x^{(k)}\\|$", "ACOC"],
              en: ["iter", "$x^{(k)}$", "$\\|F(x^{(k+1)})\\|$", "$\\|x^{(k+1)}-x^{(k)}\\|$", "ACOC"]
            },
            rows: [
              ["1", "[5.3247, −4.3247]", "0.7051", "4.7018", "n/a"],
              ["2", "[5.1697, −4.1697]", "0.0486", "0.2191", "n/a"],
              ["3", "[5.1573, −4.1573]", "0.0003", "0.0176", "0.8229"],
              ["4", "[5.1572, −4.1572]", "1.7091·10⁻⁸", "0.0001", "1.9620"],
              ["5", "[5.1572, −4.1572]", "4.3406·10⁻¹⁷", "6.2690·10⁻⁹", "1.9989"],
              ["6", "[5.1572, −4.1572]", "2.7997·10⁻³⁴", "1.5921·10⁻¹⁷", "2.0000"]
            ],
            caption: {
              es: "Iteraciones de Newton desde $x^{(0)}=[2,-1]$; la solución es $\\alpha\\approx[5.15723,\\,-4.15723]$.",
              eu: "Newton-en iterazioak $x^{(0)}=[2,-1]$-etik; soluzioa $\\alpha\\approx[5.15723,\\,-4.15723]$ da.",
              en: "Newton iterations from $x^{(0)}=[2,-1]$; the solution is $\\alpha\\approx[5.15723,\\,-4.15723]$."
            }
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Lectura",
              eu: "Irakurketa",
              en: "Reading"
            },
            text: {
              es: "Desde la iteración 4 el iterado impreso ya no cambia, pero el criterio $\\|x^{(k+1)}-x^{(k)}\\|<10^{-20}$ aún no se cumple, así que el método continúa hasta la iteración 6. El ACOC se estabiliza en el orden teórico 2. Comprobación independiente: sobre la recta $x+y=1$, la primera ecuación se reduce a $x\\cos(1-x)=-e$, que la solución satisface.",
              eu: "4. iteraziotik aurrera inprimatutako iteratua ez da aldatzen, baina $\\|x^{(k+1)}-x^{(k)}\\|<10^{-20}$ irizpidea oraindik ez da betetzen; beraz, metodoak 6. iteraziora arte jarraitzen du. ACOC 2 ordena teorikoan egonkortzen da. Egiaztapen independentea: $x+y=1$ zuzenaren gainean, lehen ekuazioa $x\\cos(1-x)=-e$ bihurtzen da, soluzioak betetzen duena.",
              en: "From iteration 4 the printed iterate no longer changes, but the criterion $\\|x^{(k+1)}-x^{(k)}\\|<10^{-20}$ is not yet met, so the method continues until iteration 6. The ACOC settles at the theoretical order 2. Independent check: on the line $x+y=1$, the first equation reduces to $x\\cos(1-x)=-e$, which the solution satisfies."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-comparativa-sistemas",
    category: "Sistemas no lineales",
    level: "avanzado",
    searchIntent: "comparativa numérica sistemas Newton Trapecios Golden Ratio NA Jarratt RN",
    title: {
      es: "Ejercicio: comparativa numérica en sistemas",
      eu: "Ariketa: konparatiba numerikoa sistemetan",
      en: "Exercise: numerical comparison on systems"
    },
    description: {
      es: "Newton, Trapecios, Golden Ratio, NA, Jarratt y RN sobre dos sistemas de prueba con tolerancia 10⁻¹²: iteraciones, normas y ACOC, con RN (orden 6) como método más eficaz.",
      eu: "Newton, Trapezioak, Golden Ratio, NA, Jarratt eta RN bi proba-sistemaren gainean 10⁻¹² tolerantziarekin: iterazioak, normak eta ACOC, RN (6. ordena) metodo eraginkorrena izanik.",
      en: "Newton, Trapezoids, Golden Ratio, NA, Jarratt and RN on two test systems with tolerance 10⁻¹²: iterations, norms and ACOC, with RN (order 6) as the most effective method."
    },
    keywords: ["comparativa", "sistemas no lineales", "Jarratt", "RN", "ACOC"],
    prerequisites: ["sistemas-no-lineales-alto-orden"],
    related: ["sistemas-no-lineales-alto-orden", "sistemas-no-lineales-eficiencia", "ejercicio-comparativa-metodos"],
    sections: [
      {
        heading: {
          es: "Condiciones del experimento",
          eu: "Esperimentuaren baldintzak",
          en: "Experimental conditions"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Se comparan seis métodos (RN con $a=-\\frac12$, $b=\\frac32$, orden 6) con aritmética de precisión extendida (200 dígitos) y criterio de parada $\\|x^{(k+1)}-x^{(k)}\\|+\\|F(x^{(k+1)})\\|<10^{-12}$, máximo 40 iteraciones. Sistemas de prueba: $F_1(x,y)=\\bigl(e^xe^y+x\\cos y,\\;x+y-1\\bigr)$ con $\\alpha\\approx[5.15723,-4.15723]$, y $F_2(x,y,z)=\\bigl(\\cos y-\\sin x,\\;z^x-\\frac1y,\\;e^x-z^2\\bigr)$ con $\\alpha\\approx[0.909569,\\,0.661227,\\,1.575834]$.",
              eu: "Sei metodo alderatzen dira (RN $a=-\\frac12$, $b=\\frac32$ hartuta, 6. ordena) doitasun hedatuko aritmetikarekin (200 digitu) eta $\\|x^{(k+1)}-x^{(k)}\\|+\\|F(x^{(k+1)})\\|<10^{-12}$ gelditze-irizpidearekin, gehienez 40 iterazio. Proba-sistemak: $F_1(x,y)=\\bigl(e^xe^y+x\\cos y,\\;x+y-1\\bigr)$, $\\alpha\\approx[5.15723,-4.15723]$ duena, eta $F_2(x,y,z)=\\bigl(\\cos y-\\sin x,\\;z^x-\\frac1y,\\;e^x-z^2\\bigr)$, $\\alpha\\approx[0.909569,\\,0.661227,\\,1.575834]$ duena.",
              en: "Six methods are compared (RN with $a=-\\frac12$, $b=\\frac32$, order 6) using extended-precision arithmetic (200 digits) and stopping criterion $\\|x^{(k+1)}-x^{(k)}\\|+\\|F(x^{(k+1)})\\|<10^{-12}$, at most 40 iterations. Test systems: $F_1(x,y)=\\bigl(e^xe^y+x\\cos y,\\;x+y-1\\bigr)$ with $\\alpha\\approx[5.15723,-4.15723]$, and $F_2(x,y,z)=\\bigl(\\cos y-\\sin x,\\;z^x-\\frac1y,\\;e^x-z^2\\bigr)$ with $\\alpha\\approx[0.909569,\\,0.661227,\\,1.575834]$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Resultados para F₁ (x⁽⁰⁾=[2,−1])",
          eu: "Emaitzak F₁-erako (x⁽⁰⁾=[2,−1])",
          en: "Results for F₁ (x⁽⁰⁾=[2,−1])"
        },
        blocks: [
          {
            kind: "table",
            head: {
              es: ["Método", "iter", "$\\|F(x^{(k+1)})\\|$", "$\\|x^{(k+1)}-x^{(k)}\\|$", "ACOC"],
              eu: ["Metodoa", "iter", "$\\|F(x^{(k+1)})\\|$", "$\\|x^{(k+1)}-x^{(k)}\\|$", "ACOC"],
              en: ["Method", "iter", "$\\|F(x^{(k+1)})\\|$", "$\\|x^{(k+1)}-x^{(k)}\\|$", "ACOC"]
            },
            rows: [
              ["Newton", "5", "4.3406·10⁻¹⁷", "6.2690·10⁻⁹", "1.9989"],
              ["Trapecios", "9", "1.9040·10⁻⁶⁴", "6.7281·10⁻²²", "2.9993"],
              ["Golden Ratio", "7", "8.2086·10⁻⁴³", "2.4788·10⁻²⁷", "2.1867"],
              ["NA", "5", "9.5523·10⁻⁸⁷", "5.7738·10⁻³⁶", "3.4151"],
              ["Jarratt", "6", "2.8540·10⁻¹⁹⁵", "6.1911·10⁻⁴⁹", "3.9985"],
              ["RN", "4", "2.6765·10⁻¹⁴¹", "1.1130·10⁻²³", "6.4561"]
            ],
            caption: {
              es: "Resultados para $F_1$ con $x^{(0)}=[2,-1]$.",
              eu: "Emaitzak $F_1$-erako, $x^{(0)}=[2,-1]$ izanik.",
              en: "Results for $F_1$ with $x^{(0)}=[2,-1]$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Resultados para F₂ (x⁽⁰⁾=[1,1,2])",
          eu: "Emaitzak F₂-rako (x⁽⁰⁾=[1,1,2])",
          en: "Results for F₂ (x⁽⁰⁾=[1,1,2])"
        },
        blocks: [
          {
            kind: "table",
            head: {
              es: ["Método", "iter", "$\\|F(x^{(k+1)})\\|$", "$\\|x^{(k+1)}-x^{(k)}\\|$", "ACOC"],
              eu: ["Metodoa", "iter", "$\\|F(x^{(k+1)})\\|$", "$\\|x^{(k+1)}-x^{(k)}\\|$", "ACOC"],
              en: ["Method", "iter", "$\\|F(x^{(k+1)})\\|$", "$\\|x^{(k+1)}-x^{(k)}\\|$", "ACOC"]
            },
            rows: [
              ["Newton", "6", "5.7716·10⁻¹⁷", "7.5973·10⁻⁹", "1.9760"],
              ["Trapecios", "6", "6.1613·10⁻⁵⁷", "1.4405·10⁻¹⁹", "2.9999"],
              ["Golden Ratio", "6", "1.0510·10⁻⁴¹", "1.2430·10⁻²⁵", "2.7407"],
              ["NA", "6", "5.4870·10⁻⁹²", "1.4939·10⁻³⁸", "3.2701"],
              ["Jarratt", "4", "5.0114·10⁻⁷⁷", "6.9430·10⁻²⁰", "3.9638"],
              ["RN", "4", "7.7869·10⁻²⁰⁸", "1.1636·10⁻⁴¹", "6.0053"]
            ],
            caption: {
              es: "Resultados para $F_2$ con $x^{(0)}=[1,1,2]$.",
              eu: "Emaitzak $F_2$-rako, $x^{(0)}=[1,1,2]$ izanik.",
              en: "Results for $F_2$ with $x^{(0)}=[1,1,2]$."
            }
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Lectura",
              eu: "Irakurketa",
              en: "Reading"
            },
            text: {
              es: "El ACOC tiende al orden teórico de cada método (en Golden Ratio la estabilización hacia su orden 3 es más lenta). Jarratt y RN necesitan menos iteraciones, y RN combina el menor número de iteraciones con la mayor precisión: coherente con su orden 6. Como en el [[ejercicio-comparativa-metodos|caso escalar]], estas conclusiones valen para estos sistemas y puntos iniciales; generalizarlas exige más experimentos.",
              eu: "ACOC metodo bakoitzaren ordena teorikorantz doa (Golden Ratio-n bere 3. ordenarako egonkortzea motelagoa da). Jarratt-ek eta RN-k iterazio gutxiago behar dituzte, eta RN-k iterazio kopuru txikiena eta doitasun handiena konbinatzen ditu: bere 6. ordenarekin koherentea. [[ejercicio-comparativa-metodos|Kasu eskalarrean]] bezala, ondorio hauek sistema eta hasierako puntu hauetarako balio dute; orokortzeko esperimentu gehiago behar dira.",
              en: "The ACOC tends to each method's theoretical order (Golden Ratio settles towards its order 3 more slowly). Jarratt and RN need fewer iterations, and RN combines the fewest iterations with the highest precision: consistent with its order 6. As in the [[ejercicio-comparativa-metodos|scalar case]], these conclusions hold for these systems and initial points; generalizing them requires more experiments."
            }
          }
        ]
      }
    ]
  }
];
