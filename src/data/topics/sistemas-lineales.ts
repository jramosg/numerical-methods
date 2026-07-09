import type { ContentEntry } from "../content";

/**
 * Linear systems area, authored from the "Sistemas de ecuaciones lineales"
 * chapter: iterative methods (Jacobi, Gauss-Seidel, SOR), error/residual,
 * condition number and convergence via the spectral radius. Worked numbers
 * reproduce the 4x4 example and the convergence comparison from the source.
 */

export const sistemasLinealesArticles: ContentEntry[] = [
  {
    slug: "sistemas-lineales-conceptos",
    category: "Sistemas lineales",
    level: "medio",
    searchIntent: "sistemas lineales Ax=b error residuo número de condición iterativo",
    title: {
      es: "Sistemas lineales: error, residuo y condición",
      eu: "Sistema linealak: errorea, hondarra eta baldintza",
      en: "Linear systems: error, residual and conditioning"
    },
    description: {
      es: "Métodos directos frente a iterativos para Ax=b, la diferencia entre error y residuo, el criterio de parada por residuo y por qué el número de condición decide si es fiable.",
      eu: "Metodo zuzenak vs iteratiboak Ax=b-rako, errorearen eta hondarraren arteko aldea, hondarraren araberako gelditze-irizpidea eta zergatik baldintza-zenbakiak erabakitzen duen fidagarria den.",
      en: "Direct versus iterative methods for Ax=b, the difference between error and residual, the residual stopping criterion and why the condition number decides whether it is reliable."
    },
    keywords: ["Ax=b", "residuo", "número de condición", "iterativo"],
    related: ["sistemas-lineales-jacobi", "sistemas-lineales-gauss-seidel", "sistemas-lineales-convergencia"],
    sections: [
      {
        heading: {
          es: "Directos frente a iterativos",
          eu: "Zuzenak vs iteratiboak",
          en: "Direct versus iterative"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Resolver Ax=b se puede hacer con métodos directos (Cramer, Gauss-Jordan), que llegan a la solución en un número finito de operaciones, o con métodos iterativos, que generan aproximaciones cada vez mejores. Para matrices grandes, dispersas o mal condicionadas, los iterativos suelen ser más eficientes y permiten parar al alcanzar la precisión deseada.",
              eu: "Ax=b ebazteko metodo zuzenak (Cramer, Gauss-Jordan) erabil daitezke, eragiketa kopuru finituan soluziora iristen direnak, edo metodo iteratiboak, gero eta hurbilketa hobeak sortzen dituztenak. Matrize handi, sakabanatu edo gaizki baldintzatuentzat, iteratiboak eraginkorragoak izan ohi dira.",
              en: "Solving Ax=b can be done with direct methods (Cramer, Gauss-Jordan), which reach the solution in finitely many operations, or with iterative methods, which produce ever-better approximations. For large, sparse or ill-conditioned matrices, iterative methods are usually more efficient and let you stop once the desired precision is reached."
            }
          }
        ]
      },
      {
        heading: {
          es: "Error, residuo y parada",
          eu: "Errorea, hondarra eta gelditzea",
          en: "Error, residual and stopping"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "El error compara la aproximación con la solución exacta x*; el residuo mide cuánto falla la ecuación. El error no se conoce, así que se para por el residuo.",
              eu: "Erroreak hurbilketa x* soluzio zehatzarekin alderatzen du; hondarrak ekuazioak zenbat huts egiten duen neurtzen du. Errorea ez da ezagutzen, beraz hondarraren arabera gelditzen da.",
              en: "The error compares the approximation with the exact solution x*; the residual measures how much the equation fails. The error is unknown, so we stop by the residual."
            }
          },
          {
            kind: "formula",
            tex: "e^{(k)}=x^*-x^{(k)},\\qquad r^{(k)}=b-Ax^{(k)},\\qquad r^{(k)}=Ae^{(k)}"
          },
          {
            kind: "callout",
            variant: "definition",
            title: { es: "Número de condición", eu: "Baldintza-zenbakia", en: "Condition number" },
            text: {
              es: "Mide cuánto puede amplificar la matriz una perturbación relativa. Relaciona el error relativo con el residuo relativo: si K(A) es grande, un residuo pequeño no garantiza un error pequeño.",
              eu: "Matrizeak perturbazio erlatibo bat zenbat handitu dezakeen neurtzen du. Errore erlatiboa hondar erlatiboarekin lotzen du: K(A) handia bada, hondar txiki batek ez du errore txikia bermatzen.",
              en: "It measures how much the matrix can amplify a relative perturbation. It links the relative error to the relative residual: if K(A) is large, a small residual does not guarantee a small error."
            },
            formula: "\\mathcal{K}(A)=\\|A\\|\\,\\|A^{-1}\\|,\\qquad \\frac{1}{\\mathcal{K}(A)}\\frac{\\|r^{(k)}\\|}{\\|b\\|}\\le\\frac{\\|e^{(k)}\\|}{\\|x^*\\|}\\le\\mathcal{K}(A)\\frac{\\|r^{(k)}\\|}{\\|b\\|}"
          },
          {
            kind: "example",
            title: { es: "Matriz mal condicionada", eu: "Gaizki baldintzatutako matrizea", en: "Ill-conditioned matrix" },
            statement: {
              es: "El sistema con $A=\\bigl(\\begin{smallmatrix}2 & 6\\\\ 2 & 6.0001\\end{smallmatrix}\\bigr)$ y $b=(8,\\,8.0001)^T$ tiene solución $x=(1,1)^T$. Una perturbación mínima cambia drásticamente la solución.",
              eu: "$A=\\bigl(\\begin{smallmatrix}2 & 6\\\\ 2 & 6.0001\\end{smallmatrix}\\bigr)$ eta $b=(8,\\,8.0001)^T$ dituen sistemak $x=(1,1)^T$ soluzioa du. Perturbazio txiki batek soluzioa erabat aldatzen du.",
              en: "The system with $A=\\bigl(\\begin{smallmatrix}2 & 6\\\\ 2 & 6.0001\\end{smallmatrix}\\bigr)$ and $b=(8,\\,8.0001)^T$ has solution $x=(1,1)^T$. A tiny perturbation changes the solution drastically."
            },
            steps: [
              {
                text: { es: "Restando 0.0001 en la segunda fila, la solución pasa a:", eu: "Bigarren errenkadan 0.0001 kenduz, soluzioa hau bihurtzen da:", en: "Subtracting 0.0001 in the second row, the solution becomes:" },
                formula: "\\tilde x=[4,\\ 0]^{t}\\quad\\text{(muy distinta de } [1,1]^t)"
              }
            ],
            result: {
              text: { es: "Se explica por el enorme número de condición:", eu: "Baldintza-zenbaki izugarriak azaltzen du:", en: "Explained by the huge condition number:" },
              formula: "\\mathcal{K}(A)\\approx 4.0001\\cdot 10^{5}"
            }
          }
        ]
      },
      {
        heading: {
          es: "El esquema iterativo estacionario",
          eu: "Eskema iteratibo estazionarioa",
          en: "The stationary iterative scheme"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Los métodos iterativos parten de una partición A=M−N con M fácil de invertir (diagonal, triangular…). Se transforma Ax=b en un punto fijo equivalente:",
              eu: "Metodo iteratiboak A=M−N partiziotik abiatzen dira, M erraz inbertitzekoa (diagonala, triangeluarra…). Ax=b puntu finko baliokide batean bihurtzen da:",
              en: "Iterative methods start from a splitting A=M−N with M easy to invert (diagonal, triangular…). Ax=b is turned into an equivalent fixed point:"
            }
          },
          {
            kind: "formula",
            tex: "Mx^{(k+1)}=Nx^{(k)}+b\\ \\Longleftrightarrow\\ x^{(k+1)}=Hx^{(k)}+q,\\qquad H=M^{-1}N,\\ q=M^{-1}b"
          },
          {
            kind: "paragraph",
            text: {
              es: "H es la matriz de iteración. El método es estacionario si H es constante en todo el proceso. Distintas elecciones de M dan Jacobi, Gauss-Seidel y SOR.",
              eu: "H iterazio-matrizea da. Metodoa estazionarioa da H prozesu osoan konstantea bada. M-ren aukera desberdinek Jacobi, Gauss-Seidel eta SOR ematen dituzte.",
              en: "H is the iteration matrix. The method is stationary if H is constant throughout. Different choices of M give Jacobi, Gauss-Seidel and SOR."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "sistemas-lineales-jacobi",
    category: "Sistemas lineales",
    level: "medio",
    searchIntent: "método de Jacobi matriz iteración D L U esquema iterativo",
    title: {
      es: "Método de Jacobi",
      eu: "Jacobi metodoa",
      en: "Jacobi method"
    },
    description: {
      es: "La partición A=L+D+U, la elección M=D que define Jacobi, su esquema iterativo por componentes y un ejemplo resuelto.",
      eu: "A=L+D+U partizioa, Jacobi definitzen duen M=D aukera, bere osagaien araberako eskema iteratiboa eta ebatzitako adibide bat.",
      en: "The splitting A=L+D+U, the choice M=D that defines Jacobi, its component-wise iterative scheme and a worked example."
    },
    keywords: ["Jacobi", "matriz de iteración", "diagonal", "iterativo"],
    prerequisites: ["sistemas-lineales-conceptos"],
    related: ["sistemas-lineales-gauss-seidel", "deduccion-jacobi-matriz-iteracion", "ejercicio-jacobi-gauss-seidel"],
    sections: [
      {
        heading: {
          es: "Tomar M = D",
          eu: "M = D hartu",
          en: "Taking M = D"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Se parte A en su parte estrictamente inferior L, su diagonal D y su parte estrictamente superior U. Jacobi elige el precondicionador más simple, M=D, con N=−(L+U):",
              eu: "A zatitzen da bere behealde hertsi L, bere diagonal D eta bere goialde hertsi U-tan. Jacobik prekondizionatzaile sinpleena aukeratzen du, M=D, N=−(L+U)-rekin:",
              en: "A is split into its strictly lower part L, its diagonal D and its strictly upper part U. Jacobi picks the simplest preconditioner, M=D, with N=−(L+U):"
            }
          },
          {
            kind: "formula",
            tex: "A=L+D+U,\\qquad x^{(k+1)}=-D^{-1}(L+U)x^{(k)}+D^{-1}b"
          },
          {
            kind: "paragraph",
            text: {
              es: "Por componentes, cada incógnita se despeja de su ecuación usando los valores de la iteración anterior:",
              eu: "Osagaika, ezezagun bakoitza bere ekuaziotik askatzen da aurreko iterazioko balioak erabiliz:",
              en: "Component-wise, each unknown is solved from its equation using the previous iteration's values:"
            }
          },
          {
            kind: "formula",
            tex: "x_i^{(k+1)}=\\frac{1}{a_{ii}}\\left(b_i-\\sum_{j\\ne i} a_{ij}x_j^{(k)}\\right),\\qquad a_{ii}\\ne 0"
          }
        ]
      },
      {
        heading: {
          es: "Deducción de la matriz de iteración",
          eu: "Iterazio-matrizearen dedukzioa",
          en: "Derivation of the iteration matrix"
        },
        blocks: [
          { kind: "derivation", slug: "deduccion-jacobi-matriz-iteracion" }
        ]
      }
    ]
  },
  {
    slug: "sistemas-lineales-gauss-seidel",
    category: "Sistemas lineales",
    level: "medio",
    searchIntent: "método de Gauss-Seidel valores nuevos D+L convergencia rápida",
    title: {
      es: "Método de Gauss-Seidel",
      eu: "Gauss-Seidel metodoa",
      en: "Gauss-Seidel method"
    },
    description: {
      es: "La elección M=D+L, que reutiliza cada componente recién calculada dentro de la misma iteración, y por qué suele converger más rápido que Jacobi.",
      eu: "M=D+L aukera, iterazio berean kalkulatu berri den osagai bakoitza berrerabiltzen duena, eta zergatik Jacobi baino azkarrago konbergitu ohi duen.",
      en: "The choice M=D+L, which reuses each freshly computed component within the same iteration, and why it usually converges faster than Jacobi."
    },
    keywords: ["Gauss-Seidel", "iterativo", "D+L", "convergencia"],
    prerequisites: ["sistemas-lineales-jacobi"],
    related: ["sistemas-lineales-jacobi", "sistemas-lineales-convergencia", "ejercicio-jacobi-gauss-seidel"],
    sections: [
      {
        heading: {
          es: "Usar los valores nuevos ya",
          eu: "Balio berriak berehala erabili",
          en: "Use the new values immediately"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Gauss-Seidel toma M=D+L y N=−U. La diferencia clave con Jacobi es que, en cuanto calcula x_1^{(k+1)}, lo usa para calcular x_2^{(k+1)}, y así sucesivamente dentro de la misma iteración.",
              eu: "Gauss-Seidel-ek M=D+L eta N=−U hartzen ditu. Jacobirekiko funtsezko aldea da x_1^{(k+1)} kalkulatu bezain laster, x_2^{(k+1)} kalkulatzeko erabiltzen duela, eta horrela iterazio berean.",
              en: "Gauss-Seidel takes M=D+L and N=−U. The key difference from Jacobi is that as soon as it computes x_1^{(k+1)}, it uses it to compute x_2^{(k+1)}, and so on within the same iteration."
            }
          },
          {
            kind: "formula",
            tex: "x^{(k+1)}=-(D+L)^{-1}U\\,x^{(k)}+(D+L)^{-1}b\\ \\Longleftrightarrow\\ (D+L)x^{(k+1)}=b-Ux^{(k)}"
          },
          {
            kind: "formula",
            tex: "x_i^{(k+1)}=\\frac{1}{a_{ii}}\\left(b_i-\\sum_{j<i} a_{ij}x_j^{(k+1)}-\\sum_{j>i} a_{ij}x_j^{(k)}\\right)"
          },
          {
            kind: "callout",
            variant: "note",
            title: { es: "Ojo", eu: "Kontuz", en: "Careful" },
            text: {
              es: "Que Jacobi converja no implica que Gauss-Seidel lo haga, ni al revés. Depende de la matriz; lo veremos con el radio espectral.",
              eu: "Jacobi konbergitzeak ez du esan nahi Gauss-Seidel konbergitzen denik, ezta alderantziz ere. Matrizearen araberakoa da; erradio espektralarekin ikusiko dugu.",
              en: "Jacobi converging does not imply Gauss-Seidel does, nor vice versa. It depends on the matrix; we will see it with the spectral radius."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "sistemas-lineales-convergencia",
    category: "Sistemas lineales",
    level: "avanzado",
    searchIntent: "convergencia métodos iterativos radio espectral diagonal dominante teorema",
    title: {
      es: "Convergencia y radio espectral",
      eu: "Konbergentzia eta erradio espektrala",
      en: "Convergence and spectral radius"
    },
    description: {
      es: "La condición ρ(H)<1 que decide la convergencia, el criterio suficiente de diagonal estrictamente dominante y el radio de convergencia que mide la velocidad.",
      eu: "Konbergentzia erabakitzen duen ρ(H)<1 baldintza, diagonal hertsiki nagusiaren irizpide nahikoa eta abiadura neurtzen duen konbergentzia-erradioa.",
      en: "The condition ρ(H)<1 that decides convergence, the sufficient strictly-diagonally-dominant criterion, and the convergence radius that measures speed."
    },
    keywords: ["radio espectral", "convergencia", "diagonal dominante", "iteración"],
    prerequisites: ["sistemas-lineales-jacobi", "sistemas-lineales-gauss-seidel"],
    related: ["sistemas-lineales-jacobi", "sistemas-lineales-gauss-seidel", "ejercicio-convergencia-radio-espectral"],
    sections: [
      {
        heading: {
          es: "El criterio del radio espectral",
          eu: "Erradio espektralaren irizpidea",
          en: "The spectral radius criterion"
        },
        blocks: [
          {
            kind: "callout",
            variant: "definition",
            title: { es: "Radio espectral", eu: "Erradio espektrala", en: "Spectral radius" },
            text: {
              es: "El radio espectral de una matriz es el mayor módulo de sus valores propios.",
              eu: "Matrize baten erradio espektrala bere balio propioen modulurik handiena da.",
              en: "The spectral radius of a matrix is the largest modulus of its eigenvalues."
            },
            formula: "\\rho(A)=\\max_{1\\le i\\le n}|\\lambda_i|"
          },
          {
            kind: "callout",
            variant: "theorem",
            title: { es: "Teorema de convergencia", eu: "Konbergentzia-teorema", en: "Convergence theorem" },
            text: {
              es: "Un método iterativo estacionario x^{(k+1)}=Hx^{(k)}+q converge a la solución para cualquier aproximación inicial si, y solo si, el radio espectral de la matriz de iteración es menor que 1.",
              eu: "x^{(k+1)}=Hx^{(k)}+q metodo iteratibo estazionarioa soluziora konbergitzen da edozein hasierako hurbilketarentzat baldin eta soilik iterazio-matrizearen erradio espektrala 1 baino txikiagoa bada.",
              en: "A stationary iterative method x^{(k+1)}=Hx^{(k)}+q converges to the solution for any initial approximation if and only if the spectral radius of the iteration matrix is less than 1."
            },
            formula: "\\rho(H)<1"
          },
          {
            kind: "callout",
            variant: "theorem",
            title: { es: "Diagonal estrictamente dominante", eu: "Diagonal hertsiki nagusia", en: "Strictly diagonally dominant" },
            text: {
              es: "Si en cada fila el módulo del elemento diagonal supera la suma de los demás, la matriz es estrictamente diagonal dominante, y entonces tanto Jacobi como Gauss-Seidel convergen. Es condición suficiente, no necesaria.",
              eu: "Errenkada bakoitzean elementu diagonalaren modulua besteen batura gainditzen badu, matrizea hertsiki diagonal nagusia da, eta orduan bai Jacobi bai Gauss-Seidel konbergitzen dira. Baldintza nahikoa da, ez beharrezkoa.",
              en: "If in each row the modulus of the diagonal element exceeds the sum of the others, the matrix is strictly diagonally dominant, and then both Jacobi and Gauss-Seidel converge. It is sufficient, not necessary."
            },
            formula: "|a_{ii}|>\\sum_{j\\ne i}|a_{ij}|,\\qquad i=1,\\dots,n"
          },
          {
            kind: "callout",
            variant: "definition",
            title: { es: "Radio de convergencia", eu: "Konbergentzia-erradioa", en: "Convergence radius" },
            text: {
              es: "Mide la velocidad: cuanto menor es ρ(H), mayor es el radio y más rápido converge el método.",
              eu: "Abiadura neurtzen du: ρ(H) zenbat eta txikiagoa izan, orduan eta erradio handiagoa eta metodoa azkarrago konbergitzen da.",
              en: "It measures speed: the smaller ρ(H), the larger the radius and the faster the method converges."
            },
            formula: "R=-\\log_{10}\\bigl(\\rho(H)\\bigr)"
          }
        ]
      }
    ]
  },
  {
    slug: "sistemas-lineales-sor",
    category: "Sistemas lineales",
    level: "avanzado",
    searchIntent: "sobre-relajación SOR JSOR parámetro omega Gauss-Seidel",
    title: {
      es: "Métodos de sobre-relajación (SOR)",
      eu: "Gain-erlaxazio metodoak (SOR)",
      en: "Over-relaxation methods (SOR)"
    },
    description: {
      es: "Cómo un parámetro de relajación ω acelera los métodos clásicos: Jacobi relajado (JSOR) y SOR, que generaliza Gauss-Seidel (ω=1).",
      eu: "Nola ω erlaxazio-parametro batek metodo klasikoak azkartzen dituen: Jacobi erlaxatua (JSOR) eta SOR, Gauss-Seidel orokortzen duena (ω=1).",
      en: "How a relaxation parameter ω speeds up the classical methods: relaxed Jacobi (JSOR) and SOR, which generalizes Gauss-Seidel (ω=1)."
    },
    keywords: ["SOR", "JSOR", "sobre-relajación", "omega"],
    prerequisites: ["sistemas-lineales-gauss-seidel", "sistemas-lineales-convergencia"],
    related: ["sistemas-lineales-gauss-seidel"],
    sections: [
      {
        heading: {
          es: "Relajar con un parámetro ω",
          eu: "ω parametroaz erlaxatu",
          en: "Relaxing with a parameter ω"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Los métodos de sobre-relajación introducen un parámetro ω que pondera entre el valor antiguo y el nuevo. El Jacobi relajado (JSOR) mezcla la iteración de Jacobi con el punto anterior:",
              eu: "Gain-erlaxazio metodoek ω parametro bat sartzen dute, balio zaharraren eta berriaren artean haztatzen duena. Jacobi erlaxatuak (JSOR) Jacobiren iterazioa aurreko puntuarekin nahasten du:",
              en: "Over-relaxation methods introduce a parameter ω that weights between the old and new value. Relaxed Jacobi (JSOR) mixes the Jacobi iteration with the previous point:"
            }
          },
          {
            kind: "formula",
            tex: "x_i^{(k+1)}=\\frac{\\omega}{a_{ii}}\\left(b_i-\\sum_{j\\ne i}a_{ij}x_j^{(k)}\\right)+(1-\\omega)x_i^{(k)}"
          },
          {
            kind: "paragraph",
            text: {
              es: "El método SOR aplica la misma idea sobre Gauss-Seidel. Con x̄^{(k+1)} el iterado de Gauss-Seidel, la forma vectorial es una media ponderada:",
              eu: "SOR metodoak ideia bera Gauss-Seidel-en gainean aplikatzen du. x̄^{(k+1)} Gauss-Seidel-en iteratua izanik, forma bektoriala batez besteko haztatua da:",
              en: "The SOR method applies the same idea over Gauss-Seidel. With x̄^{(k+1)} the Gauss-Seidel iterate, the vector form is a weighted average:"
            }
          },
          {
            kind: "formula",
            tex: "(D+\\omega L)x^{(k+1)}=\\bigl(-\\omega U+(1-\\omega)D\\bigr)x^{(k)}+\\omega b,\\qquad x^{(k+1)}=(1-\\omega)x^{(k)}+\\omega\\,\\bar x^{(k+1)}"
          },
          {
            kind: "callout",
            variant: "note",
            title: { es: "ω = 1 es Gauss-Seidel", eu: "ω = 1 Gauss-Seidel da", en: "ω = 1 is Gauss-Seidel" },
            text: {
              es: "Con ω=1 se recupera Gauss-Seidel. Un ω bien elegido (sobre-relajación, ω>1) puede reducir mucho el número de iteraciones; por ejemplo, un sistema que Gauss-Seidel resuelve en 23 iteraciones puede necesitar bastantes menos con ω=1.3.",
              eu: "ω=1-rekin Gauss-Seidel berreskuratzen da. Ondo aukeratutako ω batek (gain-erlaxazioa, ω>1) iterazio kopurua asko murritz dezake; adibidez, Gauss-Seidel-ek 23 iteraziotan ebazten duen sistema batek nabarmen gutxiago behar ditzake ω=1.3-rekin.",
              en: "With ω=1 you recover Gauss-Seidel. A well-chosen ω (over-relaxation, ω>1) can cut the number of iterations a lot; for instance, a system that Gauss-Seidel solves in 23 iterations may need noticeably fewer with ω=1.3."
            }
          }
        ]
      }
    ]
  }
];

export const sistemasLinealesDerivations: ContentEntry[] = [
  {
    slug: "deduccion-jacobi-matriz-iteracion",
    category: "Sistemas lineales",
    level: "medio",
    searchIntent: "deducir matriz iteración Jacobi partición D L U despejar",
    title: {
      es: "Deducción: matriz de iteración de Jacobi",
      eu: "Frogapena: Jacobiren iterazio-matrizea",
      en: "Derivation: Jacobi iteration matrix"
    },
    description: {
      es: "De despejar cada incógnita de su ecuación a la forma matricial x=−D⁻¹(L+U)x+D⁻¹b.",
      eu: "Ezezagun bakoitza bere ekuaziotik askatzetik x=−D⁻¹(L+U)x+D⁻¹b forma matrizialera.",
      en: "From solving each unknown out of its equation to the matrix form x=−D⁻¹(L+U)x+D⁻¹b."
    },
    keywords: ["deducción", "Jacobi", "matriz de iteración", "partición"],
    prerequisites: ["sistemas-lineales-jacobi"],
    related: ["sistemas-lineales-jacobi"],
    sections: [
      {
        heading: { es: "Despejar y ordenar en matrices", eu: "Askatu eta matrizetan antolatu", en: "Solve and arrange in matrices" },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "En cada ecuación i despejamos x_i (posible porque a_ii≠0):",
                  eu: "i ekuazio bakoitzean x_i askatzen dugu (posible a_ii≠0 delako):",
                  en: "In each equation i we solve for x_i (possible because a_ii≠0):"
                },
                formula: "x_i=\\frac{1}{a_{ii}}\\left(b_i-\\sum_{j\\ne i}a_{ij}x_j\\right)"
              },
              {
                text: {
                  es: "Escribiendo esto para todas las filas y separando la diagonal D de las partes L y U, aparece la forma matricial:",
                  eu: "Hau errenkada guztietarako idatziz eta D diagonala L eta U zatietatik bereiziz, forma matriziala agertzen da:",
                  en: "Writing this for all rows and separating the diagonal D from the parts L and U, the matrix form appears:"
                },
                formula: "x=D^{-1}\\bigl(b-(L+U)x\\bigr)=-D^{-1}(L+U)x+D^{-1}b"
              },
              {
                text: {
                  es: "Convertido en iteración, es exactamente el esquema de Jacobi con matriz de iteración H_J=−D⁻¹(L+U):",
                  eu: "Iterazio bihurtuta, Jacobiren eskema da hain zuzen, H_J=−D⁻¹(L+U) iterazio-matrizearekin:",
                  en: "Turned into an iteration, it is exactly the Jacobi scheme with iteration matrix H_J=−D⁻¹(L+U):"
                },
                formula: "x^{(k+1)}=-D^{-1}(L+U)x^{(k)}+D^{-1}b"
              }
            ]
          }
        ]
      }
    ]
  }
];

export const sistemasLinealesExercises: ContentEntry[] = [
  {
    slug: "ejercicio-jacobi-gauss-seidel",
    category: "Sistemas lineales",
    level: "medio",
    searchIntent: "ejercicio Jacobi Gauss-Seidel sistema 4x4 iteraciones comparación",
    title: {
      es: "Ejercicio: Jacobi y Gauss-Seidel comparados",
      eu: "Ariketa: Jacobi eta Gauss-Seidel alderatuta",
      en: "Exercise: Jacobi and Gauss-Seidel compared"
    },
    description: {
      es: "Resolución de un sistema 4×4 con Jacobi y con Gauss-Seidel desde x⁰=0, comparando cuántas iteraciones necesita cada uno para la misma tolerancia.",
      eu: "4×4 sistema bat Jacobi eta Gauss-Seidel-ekin ebaztea x⁰=0-tik, tolerantzia bererako bakoitzak zenbat iterazio behar dituen alderatuz.",
      en: "Solving a 4×4 system with Jacobi and with Gauss-Seidel from x⁰=0, comparing how many iterations each needs for the same tolerance."
    },
    keywords: ["Jacobi", "Gauss-Seidel", "iteraciones", "ejercicio"],
    prerequisites: ["sistemas-lineales-jacobi", "sistemas-lineales-gauss-seidel"],
    related: ["sistemas-lineales-jacobi", "sistemas-lineales-gauss-seidel"],
    sections: [
      {
        heading: { es: "El sistema y su solución", eu: "Sistema eta bere soluzioa", en: "The system and its solution" },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Sistema (estrictamente diagonal dominante, así que ambos convergen), con solución exacta x*=[1,2,−1,1] y estimación inicial x⁰=[0,0,0,0]:",
              eu: "Sistema (hertsiki diagonal nagusia, beraz biak konbergitzen dira), x*=[1,2,−1,1] soluzio zehatzarekin eta x⁰=[0,0,0,0] hasierako estimazioarekin:",
              en: "System (strictly diagonally dominant, so both converge), with exact solution x*=[1,2,−1,1] and initial guess x⁰=[0,0,0,0]:"
            }
          },
          {
            kind: "formula",
            tex: "\\begin{aligned} 10x_1-x_2+2x_3&=6\\\\ -x_1+11x_2-x_3+3x_4&=25\\\\ 2x_1-x_2+10x_3-x_4&=-11\\\\ 3x_2-x_3+8x_4&=15 \\end{aligned}"
          },
          {
            kind: "table",
            head: {
              es: ["Componente", "Jacobi (k=10)", "Gauss-Seidel (k=5)", "Exacta"],
              eu: ["Osagaia", "Jacobi (k=10)", "Gauss-Seidel (k=5)", "Zehatza"],
              en: ["Component", "Jacobi (k=10)", "Gauss-Seidel (k=5)", "Exact"]
            },
            rows: [
              ["x₁", "0.9997", "1.0001", "1"],
              ["x₂", "2.0004", "2.0000", "2"],
              ["x₃", "-1.0004", "-1.0000", "-1"],
              ["x₄", "1.0006", "1.0000", "1"]
            ]
          },
          {
            kind: "callout",
            variant: "note",
            title: { es: "Gauss-Seidel es más rápido", eu: "Gauss-Seidel azkarragoa da", en: "Gauss-Seidel is faster" },
            text: {
              es: "Con la misma tolerancia, Jacobi llega a un error ≈6.19·10⁻⁴ en 10 iteraciones, mientras que Gauss-Seidel alcanza ≈9.13·10⁻⁵ ya en 5 iteraciones.",
              eu: "Tolerantzia berarekin, Jacobik ≈6.19·10⁻⁴ errorera iristen da 10 iteraziotan, Gauss-Seidel-ek ≈9.13·10⁻⁵ lortzen duen bitartean 5 iteraziotan.",
              en: "With the same tolerance, Jacobi reaches an error ≈6.19·10⁻⁴ in 10 iterations, while Gauss-Seidel reaches ≈9.13·10⁻⁵ in just 5 iterations."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-convergencia-radio-espectral",
    category: "Sistemas lineales",
    level: "avanzado",
    searchIntent: "ejercicio radio espectral Jacobi diverge Gauss-Seidel converge",
    title: {
      es: "Ejercicio: convergencia por radio espectral",
      eu: "Ariketa: konbergentzia erradio espektralaren bidez",
      en: "Exercise: convergence by spectral radius"
    },
    description: {
      es: "Una matriz no diagonal dominante donde Jacobi diverge pero Gauss-Seidel converge, decidido calculando el radio espectral de cada matriz de iteración.",
      eu: "Diagonal nagusia ez den matrize bat non Jacobi dibergitzen den baina Gauss-Seidel konbergitzen den, iterazio-matrize bakoitzaren erradio espektrala kalkulatuz erabakia.",
      en: "A non-diagonally-dominant matrix where Jacobi diverges but Gauss-Seidel converges, decided by computing the spectral radius of each iteration matrix."
    },
    keywords: ["radio espectral", "convergencia", "Jacobi", "Gauss-Seidel"],
    prerequisites: ["sistemas-lineales-convergencia"],
    related: ["sistemas-lineales-convergencia"],
    sections: [
      {
        heading: { es: "Decidir con ρ(H)", eu: "ρ(H)-rekin erabaki", en: "Deciding with ρ(H)" },
        blocks: [
          {
            kind: "example",
            statement: {
              es: "Para $A=\\bigl(\\begin{smallmatrix}3 & 2 & 1\\\\ 2 & 3 & 2\\\\ 1 & 2 & 3\\end{smallmatrix}\\bigr)$ (invertible pero no diagonal dominante), decide qué método converge calculando el radio espectral de sus matrices de iteración.",
              eu: "$A=\\bigl(\\begin{smallmatrix}3 & 2 & 1\\\\ 2 & 3 & 2\\\\ 1 & 2 & 3\\end{smallmatrix}\\bigr)$ matrizerako (inbertigarria baina ez diagonal nagusia), erabaki zein metodo konbergitzen den bere iterazio-matrizeen erradio espektrala kalkulatuz.",
              en: "For $A=\\bigl(\\begin{smallmatrix}3 & 2 & 1\\\\ 2 & 3 & 2\\\\ 1 & 2 & 3\\end{smallmatrix}\\bigr)$ (invertible but not diagonally dominant), decide which method converges by computing the spectral radius of its iteration matrices."
            },
            steps: [
              {
                text: { es: "Radios espectrales de las matrices de iteración:", eu: "Iterazio-matrizeen erradio espektralak:", en: "Spectral radii of the iteration matrices:" },
                formula: "\\rho(H_J)=1.1241>1,\\qquad \\rho(H_{GS})=0.6083<1"
              }
            ],
            result: {
              text: { es: "Por el teorema, Jacobi diverge y Gauss-Seidel converge; de hecho Gauss-Seidel alcanza la tolerancia en 13 iteraciones mientras Jacobi no converge en 300:", eu: "Teoremagatik, Jacobi dibergitzen da eta Gauss-Seidel konbergitzen; izan ere Gauss-Seidel-ek 13 iteraziotan lortzen du tolerantzia Jacobi 300etan konbergitzen ez den bitartean:", en: "By the theorem, Jacobi diverges and Gauss-Seidel converges; in fact Gauss-Seidel reaches the tolerance in 13 iterations while Jacobi does not converge in 300:" },
              formula: "x^{(13)}\\approx[0.6256,\\ -0.5006,\\ 0.1252]^{t}"
            }
          }
        ]
      }
    ]
  }
];
