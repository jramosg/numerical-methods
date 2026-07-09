import type { ContentEntry } from "../content";

/**
 * Fundamentals area, authored from the "Preliminares de cálculo numérico"
 * chapter: error definitions, significant figures / round-off, Taylor and the
 * truncation error, plus the finite-difference origin. Worked numbers reproduce
 * the sin(pi/8), e^0.5 and cos(x) examples from the source.
 */

export const fundamentosArticles: ContentEntry[] = [
  {
    slug: "fundamentos-errores",
    category: "Fundamentos",
    level: "base",
    searchIntent: "error absoluto relativo porcentual iterativo cálculo numérico",
    title: {
      es: "Errores en cálculo numérico",
      eu: "Erroreak kalkulu numerikoan",
      en: "Errors in numerical computing"
    },
    description: {
      es: "Por qué toda solución numérica es aproximada, las dos familias de error (redondeo y truncamiento) y cómo medirlo: error numérico, porcentual e iterativo.",
      eu: "Zergatik den soluzio numeriko oro hurbildua, errore-familia biak (biribiltzea eta trunkatzea) eta nola neurtu: errore numerikoa, ehunekokoa eta iteratiboa.",
      en: "Why every numerical solution is approximate, the two error families (round-off and truncation) and how to measure it: numerical, percentage and iterative error."
    },
    keywords: ["error absoluto", "error relativo", "error iterativo", "redondeo", "truncamiento"],
    related: ["fundamentos-cifras-significativas", "fundamentos-taylor-truncamiento", "ejercicio-error-seno", "ejercicio-error-iterativo-exponencial"],
    sections: [
      {
        heading: {
          es: "Toda solución numérica es aproximada",
          eu: "Soluzio numeriko oro hurbildua da",
          en: "Every numerical solution is approximate"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Algunos problemas tienen solución analítica sencilla: $x^2+2x-3=0$ se resuelve a mano y da $x\\in\\{-3,\\,1\\}$. Pero otros, en apariencia inofensivos, no la tienen: $x-e^{-x}=0$ no se puede despejar, aunque su solución esté cerca de $x\\approx 0.568$.",
              eu: "Zenbait problemak soluzio analitiko sinplea dute: $x^2+2x-3=0$ eskuz ebazten da eta $x\\in\\{-3,\\,1\\}$ ematen du. Baina beste batzuek, itxuraz kaltegabeek, ez dute: $x-e^{-x}=0$ ezin da askatu, nahiz eta bere soluzioa $x\\approx 0.568$ inguruan egon.",
              en: "Some problems have a simple analytic solution: $x^2+2x-3=0$ is solved by hand and gives $x\\in\\{-3,\\,1\\}$. But others, seemingly harmless, do not: $x-e^{-x}=0$ cannot be solved in closed form, even though its solution is near $x\\approx 0.568$."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Cuando no hay fórmula, se recurre a métodos numéricos, que dan una solución aproximada —tan buena como queramos, a cambio de más cálculo—. Al aproximar siempre cometemos un error, y conviene clasificarlo.",
              eu: "Formularik ez dagoenean, metodo numerikoetara jotzen da, soluzio hurbildu bat ematen dutenak —nahi bezain ona, kalkulu gehiagoren truke—. Hurbiltzean beti errore bat egiten dugu, eta komeni da sailkatzea.",
              en: "When there is no formula, we use numerical methods, which give an approximate solution —as good as we like, at the cost of more computation—. Approximating always incurs an error, and it helps to classify it."
            }
          },
          {
            kind: "list",
            items: {
              es: [
                "Error de redondeo: por disponer de un número finito de símbolos para representar un resultado.",
                "Error de truncamiento: por usar un método numérico en lugar de un procedimiento matemático exacto."
              ],
              eu: [
                "Biribiltze-errorea: emaitza bat adierazteko sinbolo kopuru finitua izateagatik.",
                "Trunkatze-errorea: prozedura matematiko zehatz baten ordez metodo numeriko bat erabiltzeagatik."
              ],
              en: [
                "Round-off error: from having a finite number of symbols to represent a result.",
                "Truncation error: from using a numerical method instead of an exact mathematical procedure."
              ]
            }
          }
        ]
      },
      {
        heading: {
          es: "Error numérico y porcentual",
          eu: "Errore numerikoa eta ehunekokoa",
          en: "Numerical and percentage error"
        },
        blocks: [
          {
            kind: "callout",
            variant: "definition",
            title: { es: "Definición: error numérico", eu: "Definizioa: errore numerikoa", en: "Definition: numerical error" },
            text: {
              es: "Con y la solución verdadera e ŷ la aproximada, el error numérico es la diferencia en valor absoluto.",
              eu: "y benetako soluzioa eta ŷ hurbildua izanik, errore numerikoa balio absolutuko diferentzia da.",
              en: "With y the true solution and ŷ the approximation, the numerical error is the difference in absolute value."
            },
            formula: "\\epsilon=|y-\\hat y|"
          },
          {
            kind: "paragraph",
            text: {
              es: "El error numérico depende de las unidades: 1 mm de error no significa lo mismo midiendo un tornillo que un puente. Por eso se complementa con el error porcentual, que lo relativiza al tamaño del valor verdadero.",
              eu: "Errore numerikoa unitateen araberakoa da: 1 mm-ko errorea ez da gauza bera torloju bat edo zubi bat neurtzean. Horregatik ehunekoko errorearekin osatzen da, benetako balioaren tamainarekiko erlatibizatzen duena.",
              en: "The numerical error depends on units: a 1 mm error does not mean the same for a screw as for a bridge. Hence it is complemented by the percentage error, which relativizes it to the size of the true value."
            }
          },
          {
            kind: "callout",
            variant: "definition",
            title: { es: "Definición: error porcentual", eu: "Definizioa: ehunekoko errorea", en: "Definition: percentage error" },
            text: {
              es: "Se define dividiendo el error numérico por el valor verdadero y multiplicando por cien.",
              eu: "Errore numerikoa benetako balioaz zatituz eta ehunez biderkatuz definitzen da.",
              en: "Defined by dividing the numerical error by the true value and multiplying by one hundred."
            },
            formula: "\\epsilon_r[\\%]=100\\left|\\frac{\\epsilon}{y}\\right|"
          }
        ]
      },
      {
        heading: {
          es: "Error iterativo",
          eu: "Errore iteratiboa",
          en: "Iterative error"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Cuando no conocemos la solución verdadera y —lo habitual en métodos iterativos— no podemos usar las definiciones anteriores. En su lugar medimos cuánto cambia la solución entre dos iteraciones consecutivas.",
              eu: "Benetako soluzioa y ez dakigunean —metodo iteratiboetan ohikoa— ezin ditugu aurreko definizioak erabili. Horren ordez, bi iterazio jarraituren arteko aldaketa neurtzen dugu.",
              en: "When we do not know the true solution y —usual in iterative methods— we cannot use the previous definitions. Instead we measure how much the solution changes between two consecutive iterations."
            }
          },
          {
            kind: "callout",
            variant: "definition",
            title: { es: "Definición: error iterativo", eu: "Definizioa: errore iteratiboa", en: "Definition: iterative error" },
            text: {
              es: "Con $\\hat y_k$ y $\\hat y_{k+1}$ las aproximaciones en las iteraciones $k$ y $k+1$, el error iterativo (y su versión porcentual) es:",
              eu: "$\\hat y_k$ eta $\\hat y_{k+1}$ $k$ eta $k+1$ iterazioetako hurbilketak izanik, errore iteratiboa (eta bere ehunekoko bertsioa) hau da:",
              en: "With $\\hat y_k$ and $\\hat y_{k+1}$ the approximations at iterations $k$ and $k+1$, the iterative error (and its percentage version) is:"
            },
            formula: "\\epsilon_k=|\\hat y_{k+1}-\\hat y_k|,\\qquad \\epsilon_{k,r}[\\%]=100\\frac{\\epsilon_k}{|\\hat y_{k+1}|}"
          },
          {
            kind: "callout",
            variant: "note",
            title: { es: "Criterio de parada", eu: "Gelditze-irizpidea", en: "Stopping criterion" },
            text: {
              es: "El error iterativo es la base de los criterios de parada: se itera hasta que ε_{k,r} baja de una tolerancia fijada (por ejemplo 0.05 %).",
              eu: "Errore iteratiboa gelditze-irizpideen oinarria da: ε_{k,r} finkatutako tolerantzia baten azpitik jaitsi arte iteratzen da (adibidez % 0.05).",
              en: "The iterative error is the basis of stopping criteria: iterate until ε_{k,r} drops below a fixed tolerance (for example 0.05 %)."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "fundamentos-cifras-significativas",
    category: "Fundamentos",
    level: "base",
    searchIntent: "cifras significativas redondeo notación científica precisión máquina",
    title: {
      es: "Cifras significativas y redondeo",
      eu: "Zifra esanguratsuak eta biribiltzea",
      en: "Significant figures and round-off"
    },
    description: {
      es: "Cómo contar cifras significativas para números mayores y menores que 1 y en notación científica, y de dónde vienen los errores de redondeo de una máquina.",
      eu: "Nola zenbatu zifra esanguratsuak 1 baino handiago eta txikiagoko zenbakietarako eta notazio zientifikoan, eta nondik datozen makina baten biribiltze-erroreak.",
      en: "How to count significant figures for numbers larger and smaller than 1 and in scientific notation, and where a machine's round-off errors come from."
    },
    keywords: ["cifras significativas", "redondeo", "notación científica", "precisión"],
    prerequisites: ["fundamentos-errores"],
    related: ["fundamentos-errores", "fundamentos-taylor-truncamiento"],
    sections: [
      {
        heading: {
          es: "Contar cifras significativas",
          eu: "Zifra esanguratsuak zenbatu",
          en: "Counting significant figures"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Un mismo número admite varias representaciones. Las cifras significativas son las que aportan información. No hay una definición única, pero sí reglas habituales:",
              eu: "Zenbaki berak hainbat adierazpen onartzen ditu. Zifra esanguratsuak informazioa ematen dutenak dira. Ez dago definizio bakarra, baina bai ohiko arauak:",
              en: "The same number admits several representations. Significant figures are those that carry information. There is no single definition, but there are usual rules:"
            }
          },
          {
            kind: "list",
            items: {
              es: [
                "Números mayores que 1: cuentan las cifras representadas, sin los ceros a la derecha de la parte decimal.",
                "Números menores que 1: cuentan las cifras, sin los ceros a la izquierda del primer dígito no nulo ni los ceros a la derecha de la parte decimal.",
                "Notación científica x·10^z: las cifras significativas son las de la mantisa x."
              ],
              eu: [
                "1 baino handiagoak: adierazitako zifrak zenbatzen dira, zati hamartarraren eskuinaldeko zeroak kenduta.",
                "1 baino txikiagoak: zifrak zenbatzen dira, lehen zifra ez-nuluaren ezkerraldeko zeroak eta zati hamartarraren eskuineko zeroak kenduta.",
                "Notazio zientifikoa x·10^z: zifra esanguratsuak x mantisarenak dira."
              ],
              en: [
                "Numbers larger than 1: count the figures shown, excluding trailing zeros in the decimal part.",
                "Numbers smaller than 1: count the figures, excluding leading zeros before the first nonzero digit and trailing decimal zeros.",
                "Scientific notation x·10^z: the significant figures are those of the mantissa x."
              ]
            }
          },
          {
            kind: "table",
            head: {
              es: ["Número", "Cifras significativas", "Característica"],
              eu: ["Zenbakia", "Zifra esanguratsuak", "Ezaugarria"],
              en: ["Number", "Significant figures", "Feature"]
            },
            rows: [
              ["232.870000", "5", "Decimal > 1"],
              ["0.001100", "2", "Decimal < 1"],
              ["3·10^8", "2", "Notación científica"]
            ]
          }
        ]
      },
      {
        heading: {
          es: "Redondeo y precisión de máquina",
          eu: "Biribiltzea eta makinaren doitasuna",
          en: "Round-off and machine precision"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Los errores de redondeo vienen de la capacidad finita de representación. Un ordenador guarda cada número con un número limitado de cifras; al pasarse de esa capacidad, redondea.",
              eu: "Biribiltze-erroreak adierazpen-ahalmen finitutik datoz. Ordenagailu batek zenbaki bakoitza zifra kopuru mugatuarekin gordetzen du; ahalmen hori gaindituz gero, biribildu egiten du.",
              en: "Round-off errors come from finite representation capacity. A computer stores each number with a limited number of figures; beyond that capacity, it rounds."
            }
          },
          {
            kind: "callout",
            variant: "note",
            title: { es: "En la práctica", eu: "Praktikan", en: "In practice" },
            text: {
              es: "La aritmética de doble precisión (IEEE 754) almacena unas 16 cifras significativas fiables. Cambiar cuántas cifras se muestran en pantalla no cambia las que realmente se guardan; para trabajar con más precisión hace falta aritmética de precisión extendida o simbólica.",
              eu: "Doitasun bikoitzeko aritmetikak (IEEE 754) fidagarriak diren 16 zifra esangarri inguru gordetzen ditu. Pantailan zenbat zifra erakusten diren aldatzeak ez ditu benetan gordetzen direnak aldatzen; doitasun handiagoarekin lan egiteko doitasun hedatuko edo aritmetika sinbolikoa behar da.",
              en: "Double-precision arithmetic (IEEE 754) stores about 16 reliable significant figures. Changing how many figures are displayed does not change those actually stored; working with more precision requires extended-precision or symbolic arithmetic."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "fundamentos-taylor-truncamiento",
    category: "Fundamentos",
    level: "medio",
    searchIntent: "serie de Taylor residuo error de truncamiento orden diferencias finitas",
    title: {
      es: "Taylor y el error de truncamiento",
      eu: "Taylor eta trunkatze-errorea",
      en: "Taylor and the truncation error"
    },
    description: {
      es: "El teorema de Taylor y su residuo, por qué el residuo es el error de truncamiento, y cómo de aquí nacen las diferencias finitas que usará toda la asignatura.",
      eu: "Taylor-en teorema eta bere hondarra, zergatik den hondarra trunkatze-errorea, eta nola sortzen diren hemendik ikasgai osoak erabiliko dituen diferentzia finituak.",
      en: "Taylor's theorem and its remainder, why the remainder is the truncation error, and how finite differences —used throughout the course— arise from it."
    },
    keywords: ["Taylor", "residuo", "truncamiento", "orden", "diferencias finitas"],
    prerequisites: ["fundamentos-errores"],
    related: ["fundamentos-errores", "deduccion-diferencias-finitas-taylor", "ejercicio-taylor-coseno"],
    sections: [
      {
        heading: {
          es: "El teorema de Taylor",
          eu: "Taylor-en teorema",
          en: "Taylor's theorem"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La serie de Taylor desarrolla una función alrededor de un punto a como un polinomio. Al tomar solo los primeros n términos cometemos un error de truncamiento, que el teorema cuantifica exactamente con un término de residuo.",
              eu: "Taylor-en serieak funtzio bat a puntu baten inguruan garatzen du polinomio gisa. Lehen n terminoak soilik hartuz trunkatze-errore bat egiten dugu, teoremak hondar-termino batekin zehazki kuantifikatzen duena.",
              en: "The Taylor series expands a function around a point a as a polynomial. Taking only the first n terms incurs a truncation error, which the theorem quantifies exactly with a remainder term."
            }
          },
          {
            kind: "callout",
            variant: "theorem",
            title: { es: "Teorema de Taylor", eu: "Taylor-en teorema", en: "Taylor's theorem" },
            text: {
              es: "Si f tiene sus primeras n+1 derivadas continuas en un intervalo que contiene a y x, entonces:",
              eu: "f-k bere lehen n+1 deribatu jarraituak baditu a eta x dituen tarte batean, orduan:",
              en: "If f has its first n+1 derivatives continuous on an interval containing a and x, then:"
            },
            formula: "f(x)=f(a)+f'(a)(x-a)+\\frac{f''(a)}{2}(x-a)^2+\\cdots+\\frac{f^{(n)}(a)}{n!}(x-a)^n+R_n"
          },
          {
            kind: "callout",
            variant: "definition",
            title: { es: "Residuo = error de truncamiento", eu: "Hondarra = trunkatze-errorea", en: "Remainder = truncation error" },
            text: {
              es: "El residuo $R_n$ es exactamente el error que cometemos al quedarnos con el polinomio de grado $n$. Para algún $\\xi$ entre $a$ y $x$:",
              eu: "$R_n$ hondarra da, hain zuzen, $n$ graduko polinomioarekin geratzean egiten dugun errorea. $a$ eta $x$ arteko $\\xi$ baterako:",
              en: "The remainder $R_n$ is exactly the error from keeping the degree-$n$ polynomial. For some $\\xi$ between $a$ and $x$:"
            },
            formula: "R_n=\\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-a)^{n+1},\\qquad \\xi\\in(a,x)"
          },
          {
            kind: "paragraph",
            text: {
              es: "Si x−a es del orden de un paso h, el residuo es del orden de h^{n+1}. Ese exponente es el orden del método, y Taylor es la herramienta que lo justifica en diferencias finitas, cuadratura y EDO.",
              eu: "x−a h pausu baten ordenakoa bada, hondarra h^{n+1} ordenakoa da. Berretzaile hori metodoaren ordena da, eta Taylor da diferentzia finituetan, kuadraturan eta EDOetan justifikatzen duen tresna.",
              en: "If x−a is of the order of a step h, the remainder is of order h^{n+1}. That exponent is the order of the method, and Taylor is the tool that justifies it in finite differences, quadrature and ODEs."
            }
          }
        ]
      },
      {
        heading: {
          es: "De Taylor a las diferencias finitas",
          eu: "Taylor-etik diferentzia finituetara",
          en: "From Taylor to finite differences"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Para aproximar derivadas se discretiza el intervalo en nodos equiespaciados $x_i=a+ih$, con paso $h=\\frac{b-a}{n}$. Truncando Taylor en primer orden entre nodos vecinos aparecen las diferencias finitas, que se estudian en detalle en [[diferenciacion-primera-derivada|diferenciación numérica]].",
              eu: "Deribatuak hurbiltzeko, tartea nodo ekidistanteetan diskretizatzen da, $x_i=a+ih$, $h=\\frac{b-a}{n}$ pausuarekin. Taylor lehen ordenean trunkatuz nodo auzokideen artean diferentzia finituak agertzen dira, [[diferenciacion-primera-derivada|deribazio numerikoan]] xehetasunez aztertzen direnak.",
              en: "To approximate derivatives we discretize the interval into equally spaced nodes $x_i=a+ih$, with step $h=\\frac{b-a}{n}$. Truncating Taylor at first order between neighbouring nodes yields the finite differences, studied in detail in [[diferenciacion-primera-derivada|numerical differentiation]]."
            }
          },
          {
            kind: "formula",
            tex: "x_i=a+ih,\\qquad h=\\frac{b-a}{n},\\qquad i=0,1,\\dots,n"
          },
          { kind: "derivation", slug: "deduccion-diferencias-finitas-taylor" }
        ]
      }
    ]
  }
];

export const fundamentosDerivations: ContentEntry[] = [
  {
    slug: "deduccion-diferencias-finitas-taylor",
    category: "Fundamentos",
    level: "medio",
    searchIntent: "deducir diferencias finitas progresiva regresiva central Taylor",
    title: {
      es: "Deducción: diferencias finitas desde Taylor",
      eu: "Frogapena: diferentzia finituak Taylor-etik",
      en: "Derivation: finite differences from Taylor"
    },
    description: {
      es: "Cómo el desarrollo de Taylor truncado da las diferencias finitas progresiva, regresiva y central de la primera derivada.",
      eu: "Nola Taylor-en garapen trunkatuak lehen deribatuaren diferentzia finitu progresiboa, erregresiboa eta zentrala ematen dituen.",
      en: "How the truncated Taylor expansion yields the forward, backward and central finite differences of the first derivative."
    },
    keywords: ["diferencias finitas", "progresiva", "regresiva", "central", "Taylor"],
    prerequisites: ["fundamentos-taylor-truncamiento"],
    related: ["fundamentos-taylor-truncamiento"],
    sections: [
      {
        heading: {
          es: "Progresiva, regresiva y central",
          eu: "Progresiboa, erregresiboa eta zentrala",
          en: "Forward, backward and central"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Tomamos Taylor con $a=x_i$ y $x=x_{i+1}$, quedándonos en primer orden. Despejando la derivada obtenemos la diferencia progresiva:",
                  eu: "Taylor hartzen dugu $a=x_i$ eta $x=x_{i+1}$-ekin, lehen ordenean geldituz. Deribatua askatuz diferentzia progresiboa lortzen dugu:",
                  en: "Take Taylor with $a=x_i$ and $x=x_{i+1}$, keeping first order. Solving for the derivative gives the forward difference:"
                },
                formula: "f(x_{i+1})=f(x_i)+f'(x_i)(x_{i+1}-x_i)+R_1\\ \\Longrightarrow\\ f'(x_i)\\approx\\frac{f(x_{i+1})-f(x_i)}{x_{i+1}-x_i}"
              },
              {
                text: {
                  es: "Con $a=x_{i-1}$ y $x=x_i$ (mirando hacia atrás) sale la diferencia regresiva:",
                  eu: "$a=x_{i-1}$ eta $x=x_i$-rekin (atzera begiratuz) diferentzia erregresiboa ateratzen da:",
                  en: "With $a=x_{i-1}$ and $x=x_i$ (looking backward) we get the backward difference:"
                },
                formula: "f'(x_i)\\approx\\frac{f(x_i)-f(x_{i-1})}{x_i-x_{i-1}}"
              },
              {
                text: {
                  es: "Restando el desarrollo progresivo menos el regresivo se cancela el término par y aparece la diferencia central, más precisa. Con nodos equiespaciados (paso h), x_{i+1}−x_{i−1}=2h:",
                  eu: "Garapen progresiboa ken erregresiboa kenduz termino bikoitia ezabatzen da eta diferentzia zentrala agertzen da, zehatzagoa. Nodo ekidistanteekin (h pausua), x_{i+1}−x_{i−1}=2h:",
                  en: "Subtracting the forward minus the backward expansion cancels the even term and yields the central difference, more accurate. With equally spaced nodes (step h), x_{i+1}−x_{i−1}=2h:"
                },
                formula: "f'(x_i)\\approx\\frac{f(x_{i+1})-f(x_{i-1})}{x_{i+1}-x_{i-1}}=\\frac{f(x_{i+1})-f(x_{i-1})}{2h}"
              }
            ]
          }
        ]
      }
    ]
  }
];

export const fundamentosExercises: ContentEntry[] = [
  {
    slug: "ejercicio-error-seno",
    category: "Fundamentos",
    level: "base",
    searchIntent: "ejercicio error numérico porcentual seno aproximación pequeño ángulo",
    title: {
      es: "Ejercicio: error de la aproximación sen x ≈ x",
      eu: "Ariketa: sin x ≈ x hurbilketaren errorea",
      en: "Exercise: error of the sin x ≈ x approximation"
    },
    description: {
      es: "Cálculo del error numérico y porcentual al aproximar $\\sin(\\pi/8)$ por $\\pi/8$.",
      eu: "Errore numerikoaren eta ehunekokoaren kalkulua $\\sin(\\pi/8)$ $\\pi/8$-z hurbiltzean.",
      en: "Computing the numerical and percentage error when approximating $\\sin(\\pi/8)$ by $\\pi/8$."
    },
    keywords: ["error numérico", "error porcentual", "seno", "ejercicio"],
    prerequisites: ["fundamentos-errores"],
    related: ["fundamentos-errores"],
    sections: [
      {
        heading: { es: "Enunciado y solución", eu: "Enuntziatua eta soluzioa", en: "Statement and solution" },
        blocks: [
          {
            kind: "example",
            statement: {
              es: "Para valores pequeños, $\\sin x\\approx x$. Calcula el error numérico y porcentual de usar esa aproximación en $x=\\pi/8$.",
              eu: "Balio txikietarako, $\\sin x\\approx x$. Kalkulatu hurbilketa hori $x=\\pi/8$-an erabiltzearen errore numerikoa eta ehunekokoa.",
              en: "For small values, $\\sin x\\approx x$. Compute the numerical and percentage error of using that approximation at $x=\\pi/8$."
            },
            steps: [
              {
                text: { es: "Solución analítica y aproximada:", eu: "Soluzio analitikoa eta hurbildua:", en: "Analytic and approximate solution:" },
                formula: "y=\\sin\\!\\left(\\tfrac{\\pi}{8}\\right)=\\frac{\\sqrt{2-\\sqrt2}}{2},\\qquad \\hat y=\\frac{\\pi}{8}"
              },
              {
                text: { es: "Error numérico (redondeado a seis decimales):", eu: "Errore numerikoa (sei hamartarretara biribilduta):", en: "Numerical error (rounded to six decimals):" },
                formula: "\\epsilon=\\left|\\frac{\\sqrt{2-\\sqrt2}}{2}-\\frac{\\pi}{8}\\right|=0.010016"
              }
            ],
            result: {
              text: { es: "Error porcentual:", eu: "Ehunekoko errorea:", en: "Percentage error:" },
              formula: "\\epsilon_r=100\\left|\\frac{0.010016}{\\sqrt{2-\\sqrt2}/2}\\right|=2.617306\\,\\%"
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-error-iterativo-exponencial",
    category: "Fundamentos",
    level: "medio",
    searchIntent: "ejercicio error iterativo serie Taylor exponencial criterio parada",
    title: {
      es: "Ejercicio: error iterativo con e^0.5",
      eu: "Ariketa: errore iteratiboa e^0.5-ekin",
      en: "Exercise: iterative error with e^0.5"
    },
    description: {
      es: "Aproximación de $e^{0.5}$ por su serie de Taylor añadiendo términos hasta que el error iterativo porcentual baja del 0.05 %.",
      eu: "$e^{0.5}$-en hurbilketa bere Taylor-serieaz, terminoak gehituz ehunekoko errore iteratiboa % 0.05 azpitik jaitsi arte.",
      en: "Approximating $e^{0.5}$ by its Taylor series, adding terms until the percentage iterative error drops below 0.05 %."
    },
    keywords: ["error iterativo", "Taylor", "exponencial", "criterio de parada"],
    prerequisites: ["fundamentos-errores"],
    related: ["fundamentos-errores", "fundamentos-taylor-truncamiento"],
    sections: [
      {
        heading: { es: "Iterar hasta la tolerancia", eu: "Tolerantziaraino iteratu", en: "Iterate to tolerance" },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Usamos la serie $e^x=\\sum_k \\frac{x^k}{k!}$ y vamos sumando términos, calculando el error iterativo porcentual tras cada uno (cuatro decimales en todas las operaciones).",
              eu: "$e^x=\\sum_k \\frac{x^k}{k!}$ serieaz baliatzen gara eta terminoak batzen ditugu, bakoitzaren ondoren ehunekoko errore iteratiboa kalkulatuz (lau hamartar eragiketa guztietan).",
              en: "We use the series $e^x=\\sum_k \\frac{x^k}{k!}$ and add terms, computing the percentage iterative error after each (four decimals throughout)."
            }
          },
          {
            kind: "table",
            head: {
              es: ["k", "Aproximación de e^{0.5}", "Error iterativo ε_{k,r}"],
              eu: ["k", "e^{0.5}-ren hurbilketa", "Errore iteratiboa ε_{k,r}"],
              en: ["k", "Approximation of e^{0.5}", "Iterative error ε_{k,r}"]
            },
            rows: [
              ["0", "1", "—"],
              ["1", "1.5", "33.33 %"],
              ["2", "1.625", "7.6923 %"],
              ["3", "1.6458", "1.2658 %"],
              ["4", "1.6484", "0.1577 %"],
              ["5", "1.6487", "0.0181 %"]
            ]
          },
          {
            kind: "callout",
            variant: "note",
            title: { es: "Parada", eu: "Gelditzea", en: "Stop" },
            text: {
              es: "En $k=5$ el error iterativo es 0.0181 %, ya menor que la tolerancia 0.05 %, así que aceptamos $e^{0.5}\\approx 1.6487$.",
              eu: "$k=5$-ean errore iteratiboa % 0.0181 da, dagoeneko % 0.05 tolerantzia baino txikiagoa, beraz $e^{0.5}\\approx 1.6487$ onartzen dugu.",
              en: "At $k=5$ the iterative error is 0.0181 %, already below the 0.05 % tolerance, so we accept $e^{0.5}\\approx 1.6487$."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-taylor-coseno",
    category: "Fundamentos",
    level: "base",
    searchIntent: "ejercicio serie Taylor coseno orden 3 alrededor de cero",
    title: {
      es: "Ejercicio: Taylor de cos(x) hasta orden 3",
      eu: "Ariketa: cos(x)-ren Taylor 3. ordenaraino",
      en: "Exercise: Taylor of cos(x) up to order 3"
    },
    description: {
      es: "Desarrollo en serie de Taylor de cos(x) alrededor de cero tomando términos hasta orden 3.",
      eu: "cos(x)-ren Taylor-serieko garapena zeroaren inguruan, 3. ordenaraino terminoak hartuz.",
      en: "Taylor series expansion of cos(x) around zero, taking terms up to order 3."
    },
    keywords: ["Taylor", "coseno", "desarrollo", "ejercicio"],
    prerequisites: ["fundamentos-taylor-truncamiento"],
    related: ["fundamentos-taylor-truncamiento"],
    sections: [
      {
        heading: { es: "Desarrollo paso a paso", eu: "Garapena urratsez urrats", en: "Step-by-step expansion" },
        blocks: [
          {
            kind: "example",
            statement: {
              es: "Determina el desarrollo de Taylor de cos(x) alrededor de a=0 hasta orden 3.",
              eu: "Zehaztu cos(x)-ren Taylor-garapena a=0 inguruan 3. ordenaraino.",
              en: "Find the Taylor expansion of cos(x) around a=0 up to order 3."
            },
            steps: [
              {
                text: { es: "Plantilla hasta orden 3 con a=0:", eu: "3. ordenerainoko plantila a=0-rekin:", en: "Order-3 template with a=0:" },
                formula: "f(x)\\approx f(0)+f'(0)x+\\frac{f''(0)}{2}x^2+\\frac{f'''(0)}{6}x^3"
              },
              {
                text: { es: "Derivadas evaluadas en 0:", eu: "0-an ebaluatutako deribatuak:", en: "Derivatives evaluated at 0:" },
                formula: "\\begin{aligned} f(0)&=\\cos 0=1, & f'(0)&=-\\sin 0=0\\\\ f''(0)&=-\\cos 0=-1, & f'''(0)&=\\sin 0=0 \\end{aligned}"
              }
            ],
            result: {
              text: { es: "Sustituyendo, el desarrollo es:", eu: "Ordezkatuz, garapena hau da:", en: "Substituting, the expansion is:" },
              formula: "\\cos(x)\\approx 1-\\frac{x^2}{2}"
            }
          }
        ]
      }
    ]
  }
];
