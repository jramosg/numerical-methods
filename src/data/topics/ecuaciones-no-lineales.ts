import type { ContentEntry } from "../content";

/**
 * Nonlinear equations (scalar root finding): bisection, fixed point, Newton,
 * secant/Steffensen, convergence order and efficiency, and high-order method
 * design (quadrature, composition, weight functions). Worked numbers verified
 * by recomputation; the source's fixed-point theorem typo (g(α)=0) corrected
 * to g(α)=α.
 */

export const noLinealesArticles: ContentEntry[] = [
  {
    slug: "no-lineales-introduccion",
    category: "Ecuaciones no lineales",
    level: "base",
    searchIntent: "ecuación no lineal raíz métodos iterativos clasificación criterios de parada",
    title: {
      es: "Ecuaciones no lineales: el problema y los métodos iterativos",
      eu: "Ekuazio ez-linealak: problema eta metodo iteratiboak",
      en: "Nonlinear equations: the problem and iterative methods"
    },
    description: {
      es: "Qué significa resolver f(x)=0, por qué se recurre a métodos iterativos, cómo se clasifican (memoria, puntos, derivadas) y con qué criterios se detiene la iteración.",
      eu: "Zer esan nahi duen f(x)=0 ebazteak, zergatik jotzen den metodo iteratiboetara, nola sailkatzen diren (memoria, puntuak, deribatuak) eta zein irizpiderekin gelditzen den iterazioa.",
      en: "What solving f(x)=0 means, why iterative methods are used, how they are classified (memory, points, derivatives) and which criteria stop the iteration."
    },
    keywords: ["ecuación no lineal", "raíz", "método iterativo", "criterio de parada", "tolerancia"],
    related: [
      "no-lineales-biseccion",
      "no-lineales-punto-fijo",
      "no-lineales-newton-raphson",
      "no-lineales-secante-steffensen",
      "no-lineales-orden-eficiencia"
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
              es: "Muchos problemas de ciencia e ingeniería acaban en una ecuación no lineal: encontrar una raíz simple $\\alpha$ de",
              eu: "Zientzia eta ingeniaritzako problema asko ekuazio ez-lineal batean amaitzen dira: erro sinple bat, $\\alpha$, aurkitzea honako honena:",
              en: "Many problems in science and engineering end in a nonlinear equation: finding a simple root $\\alpha$ of"
            }
          },
          {
            kind: "formula",
            tex: "f(x)=0,\\qquad f:D\\subseteq\\mathbb{R}\\longrightarrow\\mathbb{R}"
          },
          {
            kind: "paragraph",
            text: {
              es: "Hay tres vías. La analítica solo funciona en familias concretas de ecuaciones. La gráfica (representar $f$ y mirar dónde corta el eje) localiza la raíz pero no da precisión: para $f(x)=\\cos^2 x-x$ se ve que la raíz está cerca de $0.65$, y nada más. La tercera vía son los métodos iterativos, que a partir de una o varias estimaciones iniciales generan una sucesión $\\{x_0,x_1,x_2,\\dots\\}$ que converge a $\\alpha$ con la precisión que se quiera.",
              eu: "Hiru bide daude. Analitikoak ekuazio-familia jakinetan bakarrik funtzionatzen du. Grafikoak ($f$ irudikatu eta ardatza non mozten duen begiratu) erroa lokalizatzen du baina ez du doitasunik ematen: $f(x)=\\cos^2 x-x$ funtzioarentzat erroa $0.65$ inguruan dagoela ikusten da, eta besterik ez. Hirugarren bidea metodo iteratiboak dira: hasierako estimazio batetik edo batzuetatik abiatuta, $\\{x_0,x_1,x_2,\\dots\\}$ segida bat sortzen dute, nahi den doitasunarekin $\\alpha$-ra konbergitzen duena.",
              en: "There are three routes. The analytic one only works for specific families of equations. The graphical one (plot $f$ and look where it crosses the axis) locates the root but gives no precision: for $f(x)=\\cos^2 x-x$ one sees the root is near $0.65$, and nothing more. The third route is iterative methods, which from one or several initial estimates generate a sequence $\\{x_0,x_1,x_2,\\dots\\}$ converging to $\\alpha$ to any desired accuracy."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "La mayoría de métodos sin memoria se escriben como una iteración de punto fijo $x_{k+1}=\\phi(x_k)$. El ejemplo central es el [[no-lineales-newton-raphson|método de Newton-Raphson]], con $\\phi(x)=x-\\frac{f(x)}{f'(x)}$.",
              eu: "Memoriarik gabeko metodo gehienak puntu finkoko iterazio gisa idazten dira: $x_{k+1}=\\phi(x_k)$. Adibide nagusia [[no-lineales-newton-raphson|Newton-Raphson metodoa]] da, $\\phi(x)=x-\\frac{f(x)}{f'(x)}$ duena.",
              en: "Most memoryless methods are written as a fixed-point iteration $x_{k+1}=\\phi(x_k)$. The central example is the [[no-lineales-newton-raphson|Newton-Raphson method]], with $\\phi(x)=x-\\frac{f(x)}{f'(x)}$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Clasificación de los métodos iterativos",
          eu: "Metodo iteratiboen sailkapena",
          en: "Classification of iterative methods"
        },
        blocks: [
          {
            kind: "list",
            items: {
              es: [
                "Sin memoria / con memoria: los primeros solo usan el iterado actual, $x_{k+1}=\\phi(x_k)$; los segundos usan también iterados anteriores, $x_{k+1}=\\phi(x_k,x_{k-1},\\dots,x_{k-m})$, y necesitan varias estimaciones iniciales. La [[no-lineales-secante-steffensen|secante]] es el ejemplo clásico con memoria.",
                "De un punto / multipunto: los multipunto evalúan la función en puntos intermedios dentro de la misma iteración (estructura predictor-corrector), como el método de Traub o los [[no-lineales-metodos-alto-orden|métodos de alto orden]].",
                "Con derivadas / libres de derivadas: cuando $f'$ no se conoce o es cara, se sustituye por diferencias divididas, como hacen la secante y Steffensen."
              ],
              eu: [
                "Memoriarik gabe / memoriarekin: lehenengoek uneko iteratua bakarrik erabiltzen dute, $x_{k+1}=\\phi(x_k)$; bigarrenek aurreko iteratuak ere bai, $x_{k+1}=\\phi(x_k,x_{k-1},\\dots,x_{k-m})$, eta hasierako hainbat estimazio behar dituzte. [[no-lineales-secante-steffensen|Sekantea]] da memoriadun adibide klasikoa.",
                "Puntu bakarrekoak / puntu anitzekoak: puntu anitzekoek funtzioa tarteko puntuetan ebaluatzen dute iterazio berean (iragarle-zuzentzaile egitura), Traub-en metodoak edo [[no-lineales-metodos-alto-orden|ordena altuko metodoek]] bezala.",
                "Deribatuekin / deribatu gabeak: $f'$ ezagutzen ez denean edo garestia denean, diferentzia zatituez ordezkatzen da, sekanteak eta Steffensen-ek egiten duten bezala."
              ],
              en: [
                "Without memory / with memory: the former use only the current iterate, $x_{k+1}=\\phi(x_k)$; the latter also use previous iterates, $x_{k+1}=\\phi(x_k,x_{k-1},\\dots,x_{k-m})$, and need several initial estimates. The [[no-lineales-secante-steffensen|secant]] is the classic method with memory.",
                "One-point / multipoint: multipoint methods evaluate the function at intermediate points within the same iteration (predictor-corrector structure), like Traub's method or the [[no-lineales-metodos-alto-orden|high-order methods]].",
                "With derivatives / derivative-free: when $f'$ is unknown or expensive, it is replaced by divided differences, as the secant and Steffensen methods do."
              ]
            }
          }
        ]
      },
      {
        heading: {
          es: "Criterios de parada y tolerancia",
          eu: "Gelditze-irizpideak eta tolerantzia",
          en: "Stopping criteria and tolerance"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Un método iterativo necesita saber cuándo parar. Las condiciones habituales, solas o combinadas, son:",
              eu: "Metodo iteratibo batek noiz gelditu jakin behar du. Ohiko baldintzak, bakarrik edo konbinatuta, hauek dira:",
              en: "An iterative method needs to know when to stop. The usual conditions, alone or combined, are:"
            }
          },
          {
            kind: "list",
            items: {
              es: [
                "Los dos últimos iterados están muy próximos: $|x_{k+1}-x_k|<\\varepsilon$.",
                "El residuo es muy pequeño: $|f(x_{k+1})|<\\varepsilon$.",
                "Se ha alcanzado un número máximo de iteraciones sin converger (protege de bucles infinitos cuando el método diverge)."
              ],
              eu: [
                "Azken bi iteratuak oso hurbil daude: $|x_{k+1}-x_k|<\\varepsilon$.",
                "Hondarra oso txikia da: $|f(x_{k+1})|<\\varepsilon$.",
                "Iterazio kopuru maximora iritsi da konbergitu gabe (begizta infinituetatik babesten du metodoak dibergitzen duenean)."
              ],
              en: [
                "The last two iterates are very close: $|x_{k+1}-x_k|<\\varepsilon$.",
                "The residual is very small: $|f(x_{k+1})|<\\varepsilon$.",
                "A maximum number of iterations has been reached without converging (protects against infinite loops when the method diverges)."
              ]
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "El valor $\\varepsilon$ es la tolerancia. Con aritmética de doble precisión no tiene sentido pedir tolerancias por debajo de la [[fundamentos-errores|precisión de la máquina]]; los estudios de convergencia con tolerancias extremas (como $10^{-100}$ en el [[ejercicio-comparativa-metodos|ejercicio comparativo]]) usan aritmética de precisión extendida.",
              eu: "$\\varepsilon$ balioa tolerantzia da. Doitasun bikoitzeko aritmetikarekin ez du zentzurik [[fundamentos-errores|makinaren doitasunaren]] azpiko tolerantziak eskatzeak; muturreko tolerantziekin egindako konbergentzia-azterketek ($10^{-100}$ adibidez, [[ejercicio-comparativa-metodos|ariketa konparatiboan]]) doitasun hedatuko aritmetika erabiltzen dute.",
              en: "The value $\\varepsilon$ is the tolerance. With double-precision arithmetic it makes no sense to request tolerances below [[fundamentos-errores|machine precision]]; convergence studies with extreme tolerances (like $10^{-100}$ in the [[ejercicio-comparativa-metodos|comparison exercise]]) use extended-precision arithmetic."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "no-lineales-biseccion",
    category: "Ecuaciones no lineales",
    level: "base",
    searchIntent: "método bisección Bolzano cota error convergencia garantizada",
    title: {
      es: "Método de bisección",
      eu: "Bisekzio-metodoa",
      en: "Bisection method"
    },
    description: {
      es: "El método más robusto: partir en dos el intervalo que encierra la raíz y quedarse con la mitad donde cambia el signo. Cota de error explícita y convergencia garantizada.",
      eu: "Metodorik sendoena: erroa gordetzen duen tartea bitan zatitu eta zeinua aldatzen den erdiarekin geratu. Errore-kota esplizitua eta konbergentzia bermatua.",
      en: "The most robust method: halve the interval bracketing the root and keep the half where the sign changes. Explicit error bound and guaranteed convergence."
    },
    keywords: ["bisección", "Bolzano", "cota de error", "raíz"],
    prerequisites: ["no-lineales-introduccion"],
    related: ["deduccion-biseccion-cota", "no-lineales-newton-raphson", "ejercicio-biseccion-a-mano"],
    sections: [
      {
        heading: {
          es: "La idea: encerrar la raíz",
          eu: "Ideia: erroa inguratu",
          en: "The idea: bracket the root"
        },
        blocks: [
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Teorema de Bolzano",
              eu: "Bolzanoren teorema",
              en: "Bolzano's theorem"
            },
            text: {
              es: "Si $f$ es continua en $[a,b]$ y $f(a)\\,f(b)<0$ (signos opuestos en los extremos), entonces existe al menos una raíz $\\alpha\\in(a,b)$ con $f(\\alpha)=0$.",
              eu: "$f$ jarraitua bada $[a,b]$-n eta $f(a)\\,f(b)<0$ bada (aurkako zeinuak muturretan), orduan gutxienez erro bat existitzen da, $\\alpha\\in(a,b)$, $f(\\alpha)=0$ betetzen duena.",
              en: "If $f$ is continuous on $[a,b]$ and $f(a)\\,f(b)<0$ (opposite signs at the endpoints), then there is at least one root $\\alpha\\in(a,b)$ with $f(\\alpha)=0$."
            }
          },
          {
            kind: "steps",
            title: {
              es: "Algoritmo de bisección",
              eu: "Bisekzio-algoritmoa",
              en: "Bisection algorithm"
            },
            steps: [
              {
                text: {
                  es: "Se calcula el punto medio $m_k=\\frac{a_k+b_k}{2}$ del intervalo actual.",
                  eu: "Uneko tartearen erdiko puntua kalkulatzen da: $m_k=\\frac{a_k+b_k}{2}$.",
                  en: "Compute the midpoint $m_k=\\frac{a_k+b_k}{2}$ of the current interval."
                }
              },
              {
                text: {
                  es: "Si $f(a_k)\\,f(m_k)<0$, la raíz está en la mitad izquierda: el nuevo intervalo es $[a_k,m_k]$. En caso contrario está en $[m_k,b_k]$. (Si $f(m_k)=0$, se ha encontrado la raíz exacta.)",
                  eu: "$f(a_k)\\,f(m_k)<0$ bada, erroa ezkerreko erdian dago: tarte berria $[a_k,m_k]$ da. Bestela $[m_k,b_k]$-n dago. ($f(m_k)=0$ bada, erro zehatza aurkitu da.)",
                  en: "If $f(a_k)\\,f(m_k)<0$, the root is in the left half: the new interval is $[a_k,m_k]$. Otherwise it is in $[m_k,b_k]$. (If $f(m_k)=0$, the exact root has been found.)"
                }
              },
              {
                text: {
                  es: "Se repite hasta que la longitud del intervalo (o $|f(m_k)|$) baje de la tolerancia. La aproximación es el último punto medio.",
                  eu: "Errepikatzen da tartearen luzera (edo $|f(m_k)|$) tolerantziaren azpitik jaitsi arte. Hurbilketa azken erdiko puntua da.",
                  en: "Repeat until the interval length (or $|f(m_k)|$) drops below the tolerance. The approximation is the last midpoint."
                }
              }
            ]
          }
        ]
      },
      {
        heading: {
          es: "Cota de error y velocidad",
          eu: "Errore-kota eta abiadura",
          en: "Error bound and speed"
        },
        blocks: [
          { kind: "derivation", slug: "deduccion-biseccion-cota" },
          {
            kind: "paragraph",
            text: {
              es: "Cada iteración gana un bit de precisión (reduce el error a la mitad), lo que equivale a una cifra decimal cada $\\log_2 10\\approx 3.3$ iteraciones. Es lento comparado con [[no-lineales-newton-raphson|Newton]], pero no exige derivadas, solo continuidad y un cambio de signo, y no diverge. Se usa a menudo para localizar la raíz y dar una estimación inicial fiable a un método rápido.",
              eu: "Iterazio bakoitzak bit bat irabazten du doitasunean (errorea erdira murrizten du); horrek zifra hamartar bat esan nahi du $\\log_2 10\\approx 3.3$ iteraziotik behin. Motela da [[no-lineales-newton-raphson|Newton]]-en aldean, baina ez du deribaturik eskatzen, jarraitutasuna eta zeinu-aldaketa bat baino ez, eta ez du dibergitzen. Erroa lokalizatzeko eta metodo azkar bati hasierako estimazio fidagarria emateko erabiltzen da maiz.",
              en: "Each iteration gains one bit of precision (halves the error), which amounts to one decimal digit every $\\log_2 10\\approx 3.3$ iterations. It is slow compared with [[no-lineales-newton-raphson|Newton]], but it requires no derivatives, only continuity and a sign change, and it does not diverge. Use it to locate the root and hand a reliable initial estimate to a fast method."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "no-lineales-punto-fijo",
    category: "Ecuaciones no lineales",
    level: "medio",
    searchIntent: "iteración punto fijo convergencia phi contractiva orden teorema",
    title: {
      es: "Iteración de punto fijo",
      eu: "Puntu finkoko iterazioa",
      en: "Fixed-point iteration"
    },
    description: {
      es: "Reescribir f(x)=0 como x=φ(x) e iterar: cuándo converge (|φ'(α)|<1), a qué velocidad, y el teorema que da el orden del método según las derivadas de φ que se anulan en la solución.",
      eu: "f(x)=0 berridatzi x=φ(x) gisa eta iteratu: noiz konbergitzen duen (|φ'(α)|<1), zein abiaduratan, eta metodoaren ordena φ-ren zein deribatu anulatzen diren soluzioan ematen duen teorema.",
      en: "Rewrite f(x)=0 as x=φ(x) and iterate: when it converges (|φ'(α)|<1), how fast, and the theorem giving the method's order from which derivatives of φ vanish at the solution."
    },
    keywords: ["punto fijo", "convergencia", "orden", "función de iteración"],
    prerequisites: ["no-lineales-introduccion"],
    related: ["deduccion-punto-fijo-convergencia", "no-lineales-newton-raphson", "no-lineales-orden-eficiencia"],
    sections: [
      {
        heading: {
          es: "De f(x)=0 a x=φ(x)",
          eu: "f(x)=0-tik x=φ(x)-ra",
          en: "From f(x)=0 to x=φ(x)"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Toda ecuación $f(x)=0$ puede reescribirse (de muchas formas) como un problema de punto fijo $x=\\phi(x)$: la solución $\\alpha$ cumple $\\phi(\\alpha)=\\alpha$. El método consiste en iterar la función:",
              eu: "$f(x)=0$ ekuazio oro (era askotara) puntu finkoko problema gisa berridatz daiteke: $x=\\phi(x)$; soluzioak $\\phi(\\alpha)=\\alpha$ betetzen du. Metodoa funtzioa iteratzea da:",
              en: "Every equation $f(x)=0$ can be rewritten (in many ways) as a fixed-point problem $x=\\phi(x)$: the solution $\\alpha$ satisfies $\\phi(\\alpha)=\\alpha$. The method is to iterate the function:"
            }
          },
          {
            kind: "formula",
            tex: "x_{k+1}=\\phi(x_k),\\qquad k=0,1,2,\\dots"
          },
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Convergencia local",
              eu: "Konbergentzia lokala",
              en: "Local convergence"
            },
            text: {
              es: "Si $\\phi$ es de clase $\\mathcal{C}^1$ en un entorno del punto fijo $\\alpha$ y $|\\phi'(\\alpha)|<1$, la iteración converge a $\\alpha$ para toda estimación inicial suficientemente próxima, y el error se multiplica asintóticamente por $|\\phi'(\\alpha)|$ en cada paso. Si $|\\phi'(\\alpha)|>1$, la iteración se aleja: el punto fijo es repulsivo.",
              eu: "$\\phi$ $\\mathcal{C}^1$ klasekoa bada $\\alpha$ puntu finkoaren ingurune batean eta $|\\phi'(\\alpha)|<1$ bada, iterazioak $\\alpha$-ra konbergitzen du nahikoa hurbil dagoen edozein hasierako estimaziotarako, eta errorea asintotikoki $|\\phi'(\\alpha)|$-z biderkatzen da pauso bakoitzean. $|\\phi'(\\alpha)|>1$ bada, iterazioa urrundu egiten da: puntu finkoa aldaratzailea da.",
              en: "If $\\phi$ is $\\mathcal{C}^1$ near the fixed point $\\alpha$ and $|\\phi'(\\alpha)|<1$, the iteration converges to $\\alpha$ for every sufficiently close initial estimate, and the error is asymptotically multiplied by $|\\phi'(\\alpha)|$ at each step. If $|\\phi'(\\alpha)|>1$, the iteration moves away: the fixed point is repelling."
            }
          }
        ]
      },
      {
        heading: {
          es: "El orden depende de las derivadas de φ",
          eu: "Ordena φ-ren deribatuen araberakoa da",
          en: "The order depends on the derivatives of φ"
        },
        blocks: [
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Orden de un método de punto fijo",
              eu: "Puntu finkoko metodo baten ordena",
              en: "Order of a fixed-point method"
            },
            text: {
              es: "Sea $\\phi$ una función de iteración con $\\phi^{(p)}$ continua en un entorno de $\\alpha$. El método $x_{k+1}=\\phi(x_k)$ tiene orden $p$ si y solo si $\\phi(\\alpha)=\\alpha$, $\\phi'(\\alpha)=0$, $\\dots$, $\\phi^{(p-1)}(\\alpha)=0$ y $\\phi^{(p)}(\\alpha)\\ne 0$.",
              eu: "Izan bedi $\\phi$ iterazio-funtzio bat, $\\phi^{(p)}$ jarraitua duena $\\alpha$-ren ingurune batean. $x_{k+1}=\\phi(x_k)$ metodoak $p$ ordena du baldin eta soilik baldin $\\phi(\\alpha)=\\alpha$, $\\phi'(\\alpha)=0$, $\\dots$, $\\phi^{(p-1)}(\\alpha)=0$ eta $\\phi^{(p)}(\\alpha)\\ne 0$ badira.",
              en: "Let $\\phi$ be an iteration function with $\\phi^{(p)}$ continuous near $\\alpha$. The method $x_{k+1}=\\phi(x_k)$ has order $p$ if and only if $\\phi(\\alpha)=\\alpha$, $\\phi'(\\alpha)=0$, $\\dots$, $\\phi^{(p-1)}(\\alpha)=0$ and $\\phi^{(p)}(\\alpha)\\ne 0$."
            }
          },
          { kind: "derivation", slug: "deduccion-punto-fijo-convergencia" },
          {
            kind: "paragraph",
            text: {
              es: "Este teorema explica por qué [[no-lineales-newton-raphson|Newton]] es de orden 2: su función de iteración $\\phi=x-\\frac{f}{f'}$ cumple $\\phi'(\\alpha)=0$ en una raíz simple. La definición general de orden y su medición práctica se tratan en [[no-lineales-orden-eficiencia]].",
              eu: "Teorema honek azaltzen du zergatik den [[no-lineales-newton-raphson|Newton]] 2. ordenakoa: bere iterazio-funtzioak, $\\phi=x-\\frac{f}{f'}$, $\\phi'(\\alpha)=0$ betetzen du erro sinple batean. Ordenaren definizio orokorra eta haren neurketa praktikoa [[no-lineales-orden-eficiencia]] orrian lantzen dira.",
              en: "This theorem explains why [[no-lineales-newton-raphson|Newton]] is second order: its iteration function $\\phi=x-\\frac{f}{f'}$ satisfies $\\phi'(\\alpha)=0$ at a simple root. The general definition of order and its practical measurement are covered in [[no-lineales-orden-eficiencia]]."
            }
          }
        ]
      },
      {
        heading: {
          es: "Ejemplo: convergencia lenta",
          eu: "Adibidea: konbergentzia motela",
          en: "Example: slow convergence"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Iterar φ(x)=cos²x",
              eu: "φ(x)=cos²x iteratu",
              en: "Iterating φ(x)=cos²x"
            },
            statement: {
              es: "Resolver $x=\\cos^2 x$ iterando directamente $x_{k+1}=\\cos^2(x_k)$ desde $x_0=0.3$, y estimar la velocidad de convergencia.",
              eu: "Ebatzi $x=\\cos^2 x$, $x_{k+1}=\\cos^2(x_k)$ zuzenean iteratuz $x_0=0.3$-tik, eta estimatu konbergentzia-abiadura.",
              en: "Solve $x=\\cos^2 x$ by directly iterating $x_{k+1}=\\cos^2(x_k)$ from $x_0=0.3$, and estimate the convergence speed."
            },
            steps: [
              {
                text: {
                  es: "Los primeros iterados oscilan alrededor de la solución: $x_1=0.9127$, $x_2=0.3741$, $x_3=0.8665$, $x_4=0.4193$, $x_5=0.8343,\\dots$ acercándose muy despacio a $\\alpha=0.641714$.",
                  eu: "Lehen iteratuek soluzioaren inguruan oszilatzen dute: $x_1=0.9127$, $x_2=0.3741$, $x_3=0.8665$, $x_4=0.4193$, $x_5=0.8343,\\dots$ oso poliki hurbilduz $\\alpha=0.641714$-ra.",
                  en: "The first iterates oscillate around the solution: $x_1=0.9127$, $x_2=0.3741$, $x_3=0.8665$, $x_4=0.4193$, $x_5=0.8343,\\dots$ approaching $\\alpha=0.641714$ very slowly."
                }
              },
              {
                text: {
                  es: "La velocidad la fija la derivada en el punto fijo: $\\phi'(x)=-2\\cos x\\sin x=-\\sin 2x$, y en $\\alpha$:",
                  eu: "Abiadura puntu finkoko deribatuak finkatzen du: $\\phi'(x)=-2\\cos x\\sin x=-\\sin 2x$, eta $\\alpha$-n:",
                  en: "The speed is set by the derivative at the fixed point: $\\phi'(x)=-2\\cos x\\sin x=-\\sin 2x$, and at $\\alpha$:"
                },
                formula: "|\\phi'(\\alpha)|=|\\sin(2\\cdot 0.641714)|=0.959<1"
              }
            ],
            result: {
              text: {
                es: "Converge (el signo negativo explica la oscilación), pero con factor $0.959$: hacen falta 455 iteraciones para alcanzar un error de $10^{-9}$. [[no-lineales-newton-raphson|Newton]] resuelve la misma ecuación en 5 iteraciones; ahí se ve la diferencia entre orden 1 y orden 2.",
                eu: "Konbergitzen du (zeinu negatiboak oszilazioa azaltzen du), baina $0.959$ faktorearekin: 455 iterazio behar dira $10^{-9}$-ko errorea lortzeko. [[no-lineales-newton-raphson|Newton]]-ek ekuazio bera 5 iteraziotan ebazten du; hor ikusten da 1. eta 2. ordenaren arteko aldea.",
                en: "It converges (the negative sign explains the oscillation), but with factor $0.959$: 455 iterations are needed to reach an error of $10^{-9}$. [[no-lineales-newton-raphson|Newton]] solves the same equation in 5 iterations; this shows the difference between order 1 and order 2."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "no-lineales-newton-raphson",
    category: "Ecuaciones no lineales",
    level: "medio",
    searchIntent: "método Newton-Raphson deducción tangente orden cuadrático ejemplo",
    title: {
      es: "Método de Newton-Raphson",
      eu: "Newton-Raphson metodoa",
      en: "Newton-Raphson method"
    },
    description: {
      es: "El método iterativo de referencia: linealizar f en el iterado actual y saltar a la raíz de la tangente. Deducción completa por tres caminos y demostración del orden cuadrático con su ecuación del error.",
      eu: "Erreferentziazko metodo iteratiboa: f linealizatu uneko iteratuan eta tangentearen errora jauzi egin. Dedukzio osoa hiru bidetatik eta ordena koadratikoaren frogapena bere errore-ekuazioarekin.",
      en: "The reference iterative method: linearize f at the current iterate and jump to the tangent's root. Full derivation along three routes and proof of quadratic order with its error equation."
    },
    keywords: ["Newton", "Newton-Raphson", "tangente", "orden cuadrático", "raíz"],
    prerequisites: ["no-lineales-punto-fijo", "fundamentos-taylor-truncamiento"],
    related: [
      "deduccion-newton-raphson",
      "no-lineales-secante-steffensen",
      "no-lineales-metodos-alto-orden",
      "ejercicio-newton-coseno",
      "sistemas-no-lineales-newton"
    ],
    sections: [
      {
        heading: {
          es: "La fórmula",
          eu: "Formula",
          en: "The formula"
        },
        blocks: [
          {
            kind: "formula",
            tex: "x_{k+1}=x_k-\\frac{f(x_k)}{f'(x_k)},\\qquad k=0,1,2,\\dots",
            caption: {
              es: "Método de Newton-Raphson.",
              eu: "Newton-Raphson metodoa.",
              en: "Newton-Raphson method."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Geométricamente, cada iteración sustituye la curva por su recta tangente en $(x_k,f(x_k))$ y toma como siguiente aproximación el punto donde esa tangente corta el eje. Es un [[no-lineales-punto-fijo|método de punto fijo]] con $\\phi(x)=x-\\frac{f(x)}{f'(x)}$, de un punto, sin memoria y con derivadas.",
              eu: "Geometrikoki, iterazio bakoitzak kurba $(x_k,f(x_k))$ puntuko zuzen ukitzaileaz ordezkatzen du eta hurrengo hurbilketa gisa ukitzaile horrek ardatza mozten duen puntua hartzen du. [[no-lineales-punto-fijo|Puntu finkoko metodo]] bat da, $\\phi(x)=x-\\frac{f(x)}{f'(x)}$ duena: puntu bakarrekoa, memoriarik gabea eta deribatuduna.",
              en: "Geometrically, each iteration replaces the curve by its tangent line at $(x_k,f(x_k))$ and takes as next approximation the point where that tangent crosses the axis. It is a [[no-lineales-punto-fijo|fixed-point method]] with $\\phi(x)=x-\\frac{f(x)}{f'(x)}$: one-point, memoryless and using derivatives."
            }
          }
        ]
      },
      {
        heading: {
          es: "Deducción y orden",
          eu: "Dedukzioa eta ordena",
          en: "Derivation and order"
        },
        blocks: [
          { kind: "derivation", slug: "deduccion-newton-raphson" },
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Convergencia cuadrática",
              eu: "Konbergentzia koadratikoa",
              en: "Quadratic convergence"
            },
            text: {
              es: "Sea $f$ suficientemente diferenciable en un conjunto convexo $D$ y $\\alpha$ una raíz simple de $f(x)=0$. Si la estimación inicial $x_0$ es suficientemente próxima a $\\alpha$, el método de Newton converge con orden 2 y ecuación del error $e_{k+1}=c_2 e_k^2+\\mathcal{O}(e_k^3)$, donde $c_2=\\frac{1}{2}\\frac{f''(\\alpha)}{f'(\\alpha)}$ y $e_k=x_k-\\alpha$: el número de cifras correctas se duplica (aproximadamente) en cada iteración.",
              eu: "Izan bedi $f$ nahikoa diferentziagarria $D$ multzo ganbil batean eta $\\alpha$ $f(x)=0$-ren erro sinple bat. Hasierako estimazioa, $x_0$, $\\alpha$-tik nahikoa hurbil badago, Newton-en metodoak 2. ordenarekin konbergitzen du, errore-ekuazioa $e_{k+1}=c_2 e_k^2+\\mathcal{O}(e_k^3)$ izanik, non $c_2=\\frac{1}{2}\\frac{f''(\\alpha)}{f'(\\alpha)}$ eta $e_k=x_k-\\alpha$: zifra zuzenen kopurua (gutxi gorabehera) bikoiztu egiten da iterazio bakoitzean.",
              en: "Let $f$ be sufficiently differentiable on a convex set $D$ and $\\alpha$ a simple root of $f(x)=0$. If the initial estimate $x_0$ is close enough to $\\alpha$, Newton's method converges with order 2 and error equation $e_{k+1}=c_2 e_k^2+\\mathcal{O}(e_k^3)$, where $c_2=\\frac{1}{2}\\frac{f''(\\alpha)}{f'(\\alpha)}$ and $e_k=x_k-\\alpha$: the number of correct digits (roughly) doubles at every iteration."
            }
          },
          {
            kind: "callout",
            variant: "warning",
            title: {
              es: "Cuándo falla",
              eu: "Noiz huts egiten duen",
              en: "When it fails"
            },
            text: {
              es: "La convergencia es local: lejos de la raíz puede divergir u oscilar. Si $f'(x_k)\\approx 0$ el salto se dispara, y en raíces múltiples ($f'(\\alpha)=0$) el orden cae a lineal. En la práctica se combina con un método robusto como la [[no-lineales-biseccion|bisección]] para acercarse primero a la raíz.",
              eu: "Konbergentzia lokala da: errotik urrun dibergitu edo oszilatu dezake. $f'(x_k)\\approx 0$ bada jauzia neurriz kanpo handitzen da, eta erro anizkoitzetan ($f'(\\alpha)=0$) ordena linealera jaisten da. Praktikan metodo sendo batekin konbinatzen da, [[no-lineales-biseccion|bisekzioarekin]] adibidez, lehenik errora hurbiltzeko.",
              en: "Convergence is local: far from the root it can diverge or oscillate. If $f'(x_k)\\approx 0$ the jump blows up, and at multiple roots ($f'(\\alpha)=0$) the order drops to linear. In practice it is combined with a robust method such as [[no-lineales-biseccion|bisection]] to first get near the root."
            }
          }
        ]
      },
      {
        heading: {
          es: "Más allá de Newton",
          eu: "Newton-etik harago",
          en: "Beyond Newton"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Newton es el punto de partida de casi todo lo demás: sustituyendo la derivada por diferencias se obtienen la [[no-lineales-secante-steffensen|secante y Steffensen]]; componiendo y añadiendo funciones peso se construyen los [[no-lineales-metodos-alto-orden|métodos de alto orden]] (Traub, Ostrowski, Jarratt); y su versión vectorial resuelve [[sistemas-no-lineales-newton|sistemas de ecuaciones no lineales]]. También es la herramienta estándar para las ecuaciones implícitas que aparecen en los [[edo-adams-moulton|métodos implícitos para EDO]].",
              eu: "Newton ia gainerako guztiaren abiapuntua da: deribatua diferentziez ordezkatuz [[no-lineales-secante-steffensen|sekantea eta Steffensen]] lortzen dira; konposatuz eta pisu-funtzioak gehituz [[no-lineales-metodos-alto-orden|ordena altuko metodoak]] eraikitzen dira (Traub, Ostrowski, Jarratt); eta bere bertsio bektorialak [[sistemas-no-lineales-newton|ekuazio ez-linealen sistemak]] ebazten ditu. [[edo-adams-moulton|EDOetarako metodo inplizituetan]] agertzen diren ekuazio inplizituetarako tresna estandarra ere bada.",
              en: "Newton is the starting point of almost everything else: replacing the derivative by differences yields the [[no-lineales-secante-steffensen|secant and Steffensen]] methods; composing and adding weight functions builds the [[no-lineales-metodos-alto-orden|high-order methods]] (Traub, Ostrowski, Jarratt); and its vector version solves [[sistemas-no-lineales-newton|systems of nonlinear equations]]. It is also the standard tool for the implicit equations arising in [[edo-adams-moulton|implicit ODE methods]]."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "no-lineales-secante-steffensen",
    category: "Ecuaciones no lineales",
    level: "medio",
    searchIntent: "método secante Steffensen sin derivadas diferencias divididas orden",
    title: {
      es: "Métodos sin derivadas: secante y Steffensen",
      eu: "Deribatu gabeko metodoak: sekantea eta Steffensen",
      en: "Derivative-free methods: secant and Steffensen"
    },
    description: {
      es: "Cuando f' no está disponible se sustituye por una diferencia dividida: con dos iterados anteriores (secante, orden ≈1.618) o con una evaluación auxiliar (Steffensen, orden 2).",
      eu: "f' eskuragarri ez dagoenean diferentzia zatitu batez ordezkatzen da: aurreko bi iteraturekin (sekantea, ordena ≈1.618) edo ebaluazio laguntzaile batekin (Steffensen, 2. ordena).",
      en: "When f' is unavailable it is replaced by a divided difference: with two previous iterates (secant, order ≈1.618) or with an auxiliary evaluation (Steffensen, order 2)."
    },
    keywords: ["secante", "Steffensen", "sin derivadas", "diferencias divididas"],
    prerequisites: ["no-lineales-newton-raphson"],
    related: ["no-lineales-newton-raphson", "interpolacion-newton", "ejercicio-secante-a-mano"],
    sections: [
      {
        heading: {
          es: "Sustituir la derivada",
          eu: "Deribatua ordezkatu",
          en: "Replacing the derivative"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Si la derivada de $f$ no se conoce o es cara de evaluar, la receta general es reemplazarla en la fórmula de [[no-lineales-newton-raphson|Newton]] por una [[interpolacion-newton|diferencia dividida]]. Según qué puntos se usen aparecen dos métodos clásicos.",
              eu: "$f$-ren deribatua ezagutzen ez bada edo ebaluatzea garestia bada, errezeta orokorra da [[no-lineales-newton-raphson|Newton]]-en formulan [[interpolacion-newton|diferentzia zatitu]] batez ordezkatzea. Zein puntu erabiltzen diren arabera bi metodo klasiko agertzen dira.",
              en: "If the derivative of $f$ is unknown or expensive to evaluate, the general recipe is to replace it in [[no-lineales-newton-raphson|Newton's]] formula by a [[interpolacion-newton|divided difference]]. Depending on which points are used, two classic methods appear."
            }
          }
        ]
      },
      {
        heading: {
          es: "Método de la secante",
          eu: "Sekantearen metodoa",
          en: "Secant method"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La secante aproxima $f'(x_k)$ con la pendiente entre los dos últimos iterados, $f[x_k,x_{k-1}]=\\frac{f(x_k)-f(x_{k-1})}{x_k-x_{k-1}}$: es un método con memoria que necesita dos estimaciones iniciales.",
              eu: "Sekanteak $f'(x_k)$ azken bi iteratuen arteko maldaz hurbiltzen du, $f[x_k,x_{k-1}]=\\frac{f(x_k)-f(x_{k-1})}{x_k-x_{k-1}}$: memoriadun metodoa da eta hasierako bi estimazio behar ditu.",
              en: "The secant approximates $f'(x_k)$ with the slope between the last two iterates, $f[x_k,x_{k-1}]=\\frac{f(x_k)-f(x_{k-1})}{x_k-x_{k-1}}$: it is a method with memory that needs two initial estimates."
            }
          },
          {
            kind: "formula",
            tex: "x_{k+1}=x_k-\\frac{f(x_k)}{f[x_k,x_{k-1}]},\\qquad k=1,2,\\dots",
            caption: {
              es: "Método de la secante.",
              eu: "Sekantearen metodoa.",
              en: "Secant method."
            }
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Orden superlineal",
              eu: "Ordena superlineala",
              en: "Superlinear order"
            },
            text: {
              es: "Su orden de convergencia es la razón áurea $p=\\frac{1+\\sqrt5}{2}\\approx 1.618$: menor que el 2 de Newton, pero con una sola evaluación nueva de $f$ por iteración (Newton necesita $f$ y $f'$), por lo que su índice de eficiencia es competitivo. El [[ejercicio-secante-a-mano|ejercicio resuelto]] lo aplica paso a paso.",
              eu: "Bere konbergentzia-ordena urrezko arrazoia da: $p=\\frac{1+\\sqrt5}{2}\\approx 1.618$. Newton-en 2a baino txikiagoa, baina $f$-ren ebaluazio berri bakarrarekin iterazio bakoitzeko (Newton-ek $f$ eta $f'$ behar ditu); beraz, bere eraginkortasun-indizea lehiakorra da. [[ejercicio-secante-a-mano|Ariketa ebatziak]] pausoz pauso aplikatzen du.",
              en: "Its convergence order is the golden ratio $p=\\frac{1+\\sqrt5}{2}\\approx 1.618$: less than Newton's 2, but with a single new evaluation of $f$ per iteration (Newton needs $f$ and $f'$), so its efficiency index is competitive. The [[ejercicio-secante-a-mano|solved exercise]] applies it step by step."
            }
          }
        ]
      },
      {
        heading: {
          es: "Método de Steffensen",
          eu: "Steffensen-en metodoa",
          en: "Steffensen's method"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Steffensen evita la memoria evaluando $f$ en un punto auxiliar construido con la propia función: aproxima $f'(x_k)\\approx\\frac{f(x_k+f(x_k))-f(x_k)}{f(x_k)}$. Sustituyendo en Newton:",
              eu: "Steffensen-ek memoria saihesten du $f$ funtzioarekin berarekin eraikitako puntu laguntzaile batean ebaluatuz: $f'(x_k)\\approx\\frac{f(x_k+f(x_k))-f(x_k)}{f(x_k)}$ hurbiltzen du. Newton-en ordezkatuz:",
              en: "Steffensen avoids memory by evaluating $f$ at an auxiliary point built with the function itself: it approximates $f'(x_k)\\approx\\frac{f(x_k+f(x_k))-f(x_k)}{f(x_k)}$. Substituting into Newton:"
            }
          },
          {
            kind: "formula",
            tex: "x_{k+1}=x_k-\\frac{f(x_k)^2}{f\\bigl(x_k+f(x_k)\\bigr)-f(x_k)},\\qquad k=0,1,2,\\dots",
            caption: {
              es: "Método de Steffensen: orden 2 sin derivadas.",
              eu: "Steffensen-en metodoa: 2. ordena deribaturik gabe.",
              en: "Steffensen's method: order 2 without derivatives."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Conserva el orden 2 de Newton sin usar $f'$, a cambio de dos evaluaciones de $f$ por iteración. La misma idea de reemplazar derivadas por diferencias divididas reaparece al resolver [[sistemas-no-lineales-newton|sistemas no lineales]].",
              eu: "Newton-en 2. ordena mantentzen du $f'$ erabili gabe, iterazio bakoitzeko $f$-ren bi ebaluazioren truke. Deribatuak diferentzia zatituez ordezkatzeko ideia bera berriro agertzen da [[sistemas-no-lineales-newton|sistema ez-linealak]] ebaztean.",
              en: "It keeps Newton's order 2 without using $f'$, at the cost of two evaluations of $f$ per iteration. The same idea of replacing derivatives by divided differences reappears when solving [[sistemas-no-lineales-newton|nonlinear systems]]."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "no-lineales-orden-eficiencia",
    category: "Ecuaciones no lineales",
    level: "avanzado",
    searchIntent: "orden convergencia COC ACOC índice eficiencia Kung-Traub óptimo",
    title: {
      es: "Orden de convergencia y eficiencia",
      eu: "Konbergentzia-ordena eta eraginkortasuna",
      en: "Convergence order and efficiency"
    },
    description: {
      es: "Definición del orden de convergencia y la ecuación del error, sus estimadores computacionales COC y ACOC, los índices de eficiencia y la conjetura de Kung-Traub que define los métodos óptimos.",
      eu: "Konbergentzia-ordenaren eta errore-ekuazioaren definizioa, haien COC eta ACOC estimatzaile konputazionalak, eraginkortasun-indizeak eta metodo optimoak definitzen dituen Kung-Traub aierua.",
      en: "Definition of convergence order and the error equation, their computational estimators COC and ACOC, the efficiency indices and the Kung-Traub conjecture defining optimal methods."
    },
    keywords: ["orden de convergencia", "COC", "ACOC", "índice de eficiencia", "Kung-Traub", "óptimo"],
    prerequisites: ["no-lineales-punto-fijo"],
    related: ["no-lineales-metodos-alto-orden", "ejercicio-comparativa-metodos", "edo-convergencia-orden"],
    sections: [
      {
        heading: {
          es: "Orden de convergencia y ecuación del error",
          eu: "Konbergentzia-ordena eta errore-ekuazioa",
          en: "Convergence order and the error equation"
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
              es: "Sea $\\{x_k\\}_{k\\ge 0}$ una sucesión generada por un método iterativo que converge a $\\alpha$. El método tiene orden de convergencia $p\\ge 1$ si existe una constante $C>0$ (con $C<1$ si $p=1$) tal que $\\lim_{k\\to\\infty}\\frac{|x_{k+1}-\\alpha|}{|x_k-\\alpha|^p}=C$.",
              eu: "Izan bedi $\\{x_k\\}_{k\\ge 0}$ metodo iteratibo batek sortutako segida, $\\alpha$-ra konbergitzen duena. Metodoak $p\\ge 1$ konbergentzia-ordena du baldin badago $C>0$ konstante bat ($C<1$, $p=1$ bada) non $\\lim_{k\\to\\infty}\\frac{|x_{k+1}-\\alpha|}{|x_k-\\alpha|^p}=C$ betetzen den.",
              en: "Let $\\{x_k\\}_{k\\ge 0}$ be a sequence generated by an iterative method converging to $\\alpha$. The method has order of convergence $p\\ge 1$ if there is a constant $C>0$ (with $C<1$ if $p=1$) such that $\\lim_{k\\to\\infty}\\frac{|x_{k+1}-\\alpha|}{|x_k-\\alpha|^p}=C$."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "De forma equivalente, escribiendo el error como $e_k=x_k-\\alpha$, el método tiene orden $p$ si y solo si cumple la ecuación del error:",
              eu: "Modu baliokidean, errorea $e_k=x_k-\\alpha$ gisa idatzita, metodoak $p$ ordena du baldin eta soilik baldin errore-ekuazioa betetzen badu:",
              en: "Equivalently, writing the error as $e_k=x_k-\\alpha$, the method has order $p$ if and only if it satisfies the error equation:"
            }
          },
          {
            kind: "formula",
            tex: "e_{k+1}=C\\,e_k^p+\\mathcal{O}\\bigl(e_k^{p+1}\\bigr)"
          },
          {
            kind: "paragraph",
            text: {
              es: "La ecuación del error se obtiene con desarrollos de Taylor, como en la [[deduccion-newton-raphson|demostración del orden de Newton]] o en el [[deduccion-punto-fijo-convergencia|teorema de punto fijo]].",
              eu: "Errore-ekuazioa Taylor-en garapenekin lortzen da, [[deduccion-newton-raphson|Newton-en ordenaren frogapenean]] edo [[deduccion-punto-fijo-convergencia|puntu finkoaren teoreman]] bezala.",
              en: "The error equation is obtained with Taylor expansions, as in the [[deduccion-newton-raphson|proof of Newton's order]] or in the [[deduccion-punto-fijo-convergencia|fixed-point theorem]]."
            }
          }
        ]
      },
      {
        heading: {
          es: "Medir el orden en la práctica: COC y ACOC",
          eu: "Ordena praktikan neurtu: COC eta ACOC",
          en: "Measuring the order in practice: COC and ACOC"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Dada la secuencia de iterados, el orden teórico se estima con el orden de convergencia computacional (COC), que requiere conocer $\\alpha$:",
              eu: "Iteratuen segida emanda, ordena teorikoa konbergentzia-ordena konputazionalarekin (COC) estimatzen da, $\\alpha$ ezagutzea eskatzen duena:",
              en: "Given the sequence of iterates, the theoretical order is estimated with the computational order of convergence (COC), which requires knowing $\\alpha$:"
            }
          },
          {
            kind: "formula",
            tex: "COC=\\frac{\\ln\\bigl(|x_{k+1}-\\alpha|/|x_k-\\alpha|\\bigr)}{\\ln\\bigl(|x_k-\\alpha|/|x_{k-1}-\\alpha|\\bigr)},\\qquad k=1,2,\\dots"
          },
          {
            kind: "paragraph",
            text: {
              es: "Como en la práctica $\\alpha$ no se conoce, se sustituye el error por la diferencia entre iterados consecutivos, obteniendo el orden de convergencia computacional aproximado (ACOC):",
              eu: "Praktikan $\\alpha$ ezagutzen ez denez, errorea ondoz ondoko iteratuen arteko diferentziaz ordezkatzen da, konbergentzia-ordena konputazional hurbildua (ACOC) lortuz:",
              en: "Since in practice $\\alpha$ is unknown, the error is replaced by the difference between consecutive iterates, giving the approximate computational order of convergence (ACOC):"
            }
          },
          {
            kind: "formula",
            tex: "ACOC=\\frac{\\ln\\bigl(|x_{k+1}-x_k|/|x_k-x_{k-1}|\\bigr)}{\\ln\\bigl(|x_k-x_{k-1}|/|x_{k-1}-x_{k-2}|\\bigr)},\\qquad k=2,3,\\dots"
          },
          {
            kind: "paragraph",
            text: {
              es: "Es la misma filosofía que la estimación del orden en [[edo-convergencia-orden|métodos para EDO]]: comparar cómo decrecen los errores al refinar. El [[ejercicio-newton-coseno|ejercicio de Newton]] muestra el ACOC tendiendo a 2.",
              eu: "[[edo-convergencia-orden|EDOetarako metodoetan]] ordena estimatzearen filosofia bera da: erroreak fintzean nola txikitzen diren alderatu. [[ejercicio-newton-coseno|Newton-en ariketak]] ACOC 2rantz doala erakusten du.",
              en: "It is the same philosophy as order estimation in [[edo-convergencia-orden|ODE methods]]: compare how errors shrink under refinement. The [[ejercicio-newton-coseno|Newton exercise]] shows the ACOC tending to 2."
            }
          }
        ]
      },
      {
        heading: {
          es: "Eficiencia y métodos óptimos",
          eu: "Eraginkortasuna eta metodo optimoak",
          en: "Efficiency and optimal methods"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Un orden alto no es gratis: cada iteración puede exigir varias evaluaciones de $f$ y sus derivadas. Para comparar métodos se define el índice de eficiencia $I=p^{1/d}$, donde $p$ es el orden y $d$ el número de evaluaciones funcionales distintas por iteración, y el índice de eficiencia computacional $IC=p^{1/(d+op)}$, que además cuenta los productos y cocientes $op$ de cada iteración.",
              eu: "Ordena altua ez da doakoa: iterazio bakoitzak $f$-ren eta haren deribatuen hainbat ebaluazio eska ditzake. Metodoak alderatzeko eraginkortasun-indizea definitzen da, $I=p^{1/d}$, non $p$ ordena den eta $d$ iterazio bakoitzeko ebaluazio funtzional desberdinen kopurua, eta eraginkortasun konputazionalaren indizea, $IC=p^{1/(d+op)}$, iterazio bakoitzeko $op$ biderketa eta zatiketak ere zenbatzen dituena.",
              en: "High order is not free: each iteration may require several evaluations of $f$ and its derivatives. To compare methods one defines the efficiency index $I=p^{1/d}$, where $p$ is the order and $d$ the number of distinct functional evaluations per iteration, and the computational efficiency index $IC=p^{1/(d+op)}$, which also counts the $op$ products and quotients of each iteration."
            }
          },
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Conjetura de Kung-Traub",
              eu: "Kung-Traub aierua",
              en: "Kung-Traub conjecture"
            },
            text: {
              es: "El orden de convergencia de un método iterativo sin memoria con $d$ evaluaciones funcionales por iteración está acotado por $p\\le 2^{d-1}$. Un método que alcanza esta cota se llama óptimo. Los métodos con memoria no están limitados por esta cota.",
              eu: "Memoriarik gabeko metodo iteratibo baten konbergentzia-ordena, iterazio bakoitzeko $d$ ebaluazio funtzionalekin, $p\\le 2^{d-1}$ kotaz mugatuta dago. Kota hori lortzen duen metodoari optimo deritzo. Memoriadun metodoak ez daude kota honek mugatuta.",
              en: "The convergence order of a memoryless iterative method with $d$ functional evaluations per iteration is bounded by $p\\le 2^{d-1}$. A method reaching this bound is called optimal. Methods with memory are not limited by this bound."
            }
          },
          {
            kind: "table",
            head: {
              es: ["Método", "$p$", "$d$", "$I$", "¿Óptimo?"],
              eu: ["Metodoa", "$p$", "$d$", "$I$", "Optimoa?"],
              en: ["Method", "$p$", "$d$", "$I$", "Optimal?"]
            },
            rows: [
              ["Newton", "2", "2", "$2^{1/2}\\approx 1.414$", "✔"],
              ["Halley", "3", "3", "$3^{1/3}\\approx 1.442$", "✘"],
              ["Chebyshev", "3", "3", "$3^{1/3}\\approx 1.442$", "✘"],
              ["Super-Halley", "3", "3", "$3^{1/3}\\approx 1.442$", "✘"],
              ["Ostrowski", "4", "3", "$4^{1/3}\\approx 1.587$", "✔"]
            ],
            caption: {
              es: "Orden, evaluaciones por iteración e índice de eficiencia de varios métodos.",
              eu: "Hainbat metodoren ordena, iterazio bakoitzeko ebaluazioak eta eraginkortasun-indizea.",
              en: "Order, evaluations per iteration and efficiency index of several methods."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Newton es óptimo ($2=2^{2-1}$); los métodos de tercer orden con tres evaluaciones no lo son ($3<2^{3-1}=4$). Los [[no-lineales-metodos-alto-orden|métodos multipunto]] como Ostrowski o Jarratt alcanzan orden 4 con solo tres evaluaciones: son óptimos y por eso destacan en la [[ejercicio-comparativa-metodos|comparativa numérica]].",
              eu: "Newton optimoa da ($2=2^{2-1}$); hiru ebaluazioko hirugarren ordenako metodoak ez dira ($3<2^{3-1}=4$). [[no-lineales-metodos-alto-orden|Puntu anitzeko metodoek]], Ostrowski edo Jarratt bezalakoek, 4. ordena lortzen dute hiru ebaluaziorekin bakarrik: optimoak dira eta horregatik nabarmentzen dira [[ejercicio-comparativa-metodos|konparatiba numerikoan]].",
              en: "Newton is optimal ($2=2^{2-1}$); third-order methods with three evaluations are not ($3<2^{3-1}=4$). [[no-lineales-metodos-alto-orden|Multipoint methods]] like Ostrowski or Jarratt reach order 4 with only three evaluations: they are optimal, which is why they stand out in the [[ejercicio-comparativa-metodos|numerical comparison]]."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "no-lineales-metodos-alto-orden",
    category: "Ecuaciones no lineales",
    level: "avanzado",
    searchIntent: "métodos alto orden Halley Chebyshev Traub Ostrowski Jarratt King funciones peso composición",
    title: {
      es: "Métodos de alto orden: Halley, Traub, Ostrowski y Jarratt",
      eu: "Ordena altuko metodoak: Halley, Traub, Ostrowski eta Jarratt",
      en: "High-order methods: Halley, Traub, Ostrowski and Jarratt"
    },
    description: {
      es: "Tres técnicas para diseñar métodos iterativos más rápidos que Newton: fórmulas de cuadratura, composición de esquemas (con derivada congelada) y funciones peso, con las familias Chebyshev-Halley y King.",
      eu: "Newton baino metodo iteratibo azkarragoak diseinatzeko hiru teknika: kuadratura-formulak, eskemen konposizioa (deribatu izoztuarekin) eta pisu-funtzioak, Chebyshev-Halley eta King familiekin.",
      en: "Three techniques to design iterative methods faster than Newton: quadrature formulas, scheme composition (with frozen derivative) and weight functions, with the Chebyshev-Halley and King families."
    },
    keywords: ["Halley", "Chebyshev", "Traub", "Ostrowski", "Jarratt", "King", "funciones peso"],
    prerequisites: ["no-lineales-newton-raphson", "no-lineales-orden-eficiencia"],
    related: ["no-lineales-orden-eficiencia", "ejercicio-comparativa-metodos", "deduccion-newton-raphson"],
    sections: [
      {
        heading: {
          es: "Composición: por qué no basta encadenar Newtons",
          eu: "Konposizioa: zergatik ez den nahikoa Newton-ak kateatzea",
          en: "Composition: why chaining Newtons is not enough"
        },
        blocks: [
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Orden de una composición",
              eu: "Konposizio baten ordena",
              en: "Order of a composition"
            },
            text: {
              es: "Si $g_1$ y $g_2$ son funciones de punto fijo para $f(x)=0$ con órdenes $p_1$ y $p_2$, el método asociado a la composición $g(x)=g_2(g_1(x))$ tiene orden $p_1\\cdot p_2$.",
              eu: "$g_1$ eta $g_2$ $f(x)=0$-rako puntu finkoko funtzioak badira, $p_1$ eta $p_2$ ordenekin, $g(x)=g_2(g_1(x))$ konposizioari lotutako metodoak $p_1\\cdot p_2$ ordena du.",
              en: "If $g_1$ and $g_2$ are fixed-point functions for $f(x)=0$ with orders $p_1$ and $p_2$, the method associated with the composition $g(x)=g_2(g_1(x))$ has order $p_1\\cdot p_2$."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Componer Newton consigo mismo (Newton doble) da orden $4$, pero exige 4 evaluaciones por iteración ($f$ y $f'$ en dos puntos): no es [[no-lineales-orden-eficiencia|óptimo]]. Congelar la derivada permite reutilizar $f'(x_k)$ en el segundo paso y gastar una evaluación menos, aunque se pierde algo de orden. El resultado es el método de Traub (o Potra-Pták), de orden 3 con 3 evaluaciones:",
              eu: "Newton bere buruarekin konposatzeak (Newton bikoitza) $4$. ordena ematen du, baina iterazio bakoitzeko 4 ebaluazio eskatzen ditu ($f$ eta $f'$ bi puntutan): ez da [[no-lineales-orden-eficiencia|optimoa]]. Deribatua izozteak bigarren pausoan $f'(x_k)$ berrerabiltzea uzten du eta ebaluazio bat aurrezten du, ordena pixka bat galdu arren. Emaitza Traub-en metodoa da (edo Potra-Pták), 3. ordenakoa 3 ebaluaziorekin:",
              en: "Composing Newton with itself (double Newton) gives order $4$, but requires 4 evaluations per iteration ($f$ and $f'$ at two points): it is not [[no-lineales-orden-eficiencia|optimal]]. Freezing the derivative reuses $f'(x_k)$ in the second step and saves one evaluation, at the cost of some order. The result is Traub's method (or Potra-Pták), of order 3 with 3 evaluations:"
            }
          },
          {
            kind: "formula",
            tex: "\\begin{aligned} y_k&=x_k-\\frac{f(x_k)}{f'(x_k)}\\\\ x_{k+1}&=y_k-\\frac{f(y_k)}{f'(x_k)} \\end{aligned}",
            caption: {
              es: "Método de Traub (Potra-Pták): orden 3 con derivada congelada.",
              eu: "Traub-en metodoa (Potra-Pták): 3. ordena deribatu izoztuarekin.",
              en: "Traub's method (Potra-Pták): order 3 with frozen derivative."
            }
          }
        ]
      },
      {
        heading: {
          es: "Fórmulas de cuadratura",
          eu: "Kuadratura-formulak",
          en: "Quadrature formulas"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Igual que en los [[edo-metodo-heun|métodos para EDO]], se puede escribir $f(x)=f(x_k)+\\int_{x_k}^{x}f'(t)\\,dt$ y aproximar la integral con distintas cuadraturas, usando Newton como predictor $y_k=x_k-\\frac{f(x_k)}{f'(x_k)}$. Con la [[deduccion-integracion-trapecio|regla del trapecio]] sale el método de los trapecios; con el punto medio y con [[deduccion-integracion-simpson|Simpson]], sus análogos:",
              eu: "[[edo-metodo-heun|EDOetarako metodoetan]] bezala, $f(x)=f(x_k)+\\int_{x_k}^{x}f'(t)\\,dt$ idatz daiteke eta integrala hainbat kuadraturarekin hurbildu, Newton iragarle gisa erabiliz: $y_k=x_k-\\frac{f(x_k)}{f'(x_k)}$. [[deduccion-integracion-trapecio|Trapezio-erregelarekin]] trapezioen metodoa ateratzen da; erdiko puntuarekin eta [[deduccion-integracion-simpson|Simpson]]-ekin, haien analogoak:",
              en: "Just as in [[edo-metodo-heun|ODE methods]], one can write $f(x)=f(x_k)+\\int_{x_k}^{x}f'(t)\\,dt$ and approximate the integral with different quadratures, using Newton as predictor $y_k=x_k-\\frac{f(x_k)}{f'(x_k)}$. The [[deduccion-integracion-trapecio|trapezoidal rule]] yields the trapezoid method; the midpoint rule and [[deduccion-integracion-simpson|Simpson]] give their analogues:"
            }
          },
          {
            kind: "formula",
            tex: "x_{k+1}=x_k-\\frac{2f(x_k)}{f'(y_k)+f'(x_k)}",
            caption: {
              es: "Método de los trapecios.",
              eu: "Trapezioen metodoa.",
              en: "Trapezoid method."
            }
          },
          {
            kind: "formula",
            tex: "x_{k+1}=x_k-\\frac{f(x_k)}{f'\\bigl(\\tfrac{x_k+y_k}{2}\\bigr)}",
            caption: {
              es: "Método del punto medio.",
              eu: "Erdiko puntuaren metodoa.",
              en: "Midpoint method."
            }
          },
          {
            kind: "formula",
            tex: "x_{k+1}=x_k-\\frac{6f(x_k)}{f'(x_k)+4f'\\bigl(\\tfrac{x_k+y_k}{2}\\bigr)+f'(y_k)}",
            caption: {
              es: "Método de Simpson.",
              eu: "Simpson-en metodoa.",
              en: "Simpson method."
            }
          }
        ]
      },
      {
        heading: {
          es: "La familia Chebyshev-Halley",
          eu: "Chebyshev-Halley familia",
          en: "The Chebyshev-Halley family"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Usando el grado de convexidad logarítmica $L_f(x_k)=\\frac{f(x_k)f''(x_k)}{f'(x_k)^2}$ se construye una familia uniparamétrica de métodos de orden 3 con segunda derivada:",
              eu: "Ganbiltasun logaritmikoaren gradua erabiliz, $L_f(x_k)=\\frac{f(x_k)f''(x_k)}{f'(x_k)^2}$, bigarren deribatudun 3. ordenako metodoen familia uniparametriko bat eraikitzen da:",
              en: "Using the degree of logarithmic convexity $L_f(x_k)=\\frac{f(x_k)f''(x_k)}{f'(x_k)^2}$ one builds a one-parameter family of third-order methods with second derivative:"
            }
          },
          {
            kind: "formula",
            tex: "x_{k+1}=x_k-\\frac{f(x_k)}{f'(x_k)}\\left[1+\\frac{1}{2}\\,\\frac{L_f(x_k)}{1-\\beta L_f(x_k)}\\right]",
            caption: {
              es: "Familia Chebyshev-Halley, parámetro $\\beta$.",
              eu: "Chebyshev-Halley familia, $\\beta$ parametroa.",
              en: "Chebyshev-Halley family, parameter $\\beta$."
            }
          },
          {
            kind: "list",
            items: {
              es: [
                "$\\beta=0$: método de Chebyshev, $x_{k+1}=x_k-\\frac{f}{f'}\\bigl[1+\\frac{L_f}{2}\\bigr]$.",
                "$\\beta=\\tfrac12$: método de Halley, $x_{k+1}=x_k-\\frac{f}{f'}\\bigl[1+\\frac{L_f}{2-L_f}\\bigr]$.",
                "$\\beta=1$: método Super-Halley, $x_{k+1}=x_k-\\frac{f}{f'}\\bigl[1+\\frac{L_f-2}{2(L_f-1)}\\bigr]$.",
                "$\\beta\\to\\infty$: se recupera el método de Newton."
              ],
              eu: [
                "$\\beta=0$: Chebyshev-en metodoa, $x_{k+1}=x_k-\\frac{f}{f'}\\bigl[1+\\frac{L_f}{2}\\bigr]$.",
                "$\\beta=\\tfrac12$: Halley-ren metodoa, $x_{k+1}=x_k-\\frac{f}{f'}\\bigl[1+\\frac{L_f}{2-L_f}\\bigr]$.",
                "$\\beta=1$: Super-Halley metodoa, $x_{k+1}=x_k-\\frac{f}{f'}\\bigl[1+\\frac{L_f-2}{2(L_f-1)}\\bigr]$.",
                "$\\beta\\to\\infty$: Newton-en metodoa berreskuratzen da."
              ],
              en: [
                "$\\beta=0$: Chebyshev's method, $x_{k+1}=x_k-\\frac{f}{f'}\\bigl[1+\\frac{L_f}{2}\\bigr]$.",
                "$\\beta=\\tfrac12$: Halley's method, $x_{k+1}=x_k-\\frac{f}{f'}\\bigl[1+\\frac{L_f}{2-L_f}\\bigr]$.",
                "$\\beta=1$: Super-Halley method, $x_{k+1}=x_k-\\frac{f}{f'}\\bigl[1+\\frac{L_f-2}{2(L_f-1)}\\bigr]$.",
                "$\\beta\\to\\infty$: Newton's method is recovered."
              ]
            }
          }
        ]
      },
      {
        heading: {
          es: "Funciones peso: King, Ostrowski y Jarratt",
          eu: "Pisu-funtzioak: King, Ostrowski eta Jarratt",
          en: "Weight functions: King, Ostrowski and Jarratt"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La tercera técnica multiplica el segundo paso de Traub por una función peso $H(\\mu)$ de la variable $\\mu=\\frac{f(y_k)}{f(x_k)}$:",
              eu: "Hirugarren teknikak Traub-en bigarren pausoa $H(\\mu)$ pisu-funtzio batez biderkatzen du, $\\mu=\\frac{f(y_k)}{f(x_k)}$ aldagaiarena:",
              en: "The third technique multiplies Traub's second step by a weight function $H(\\mu)$ of the variable $\\mu=\\frac{f(y_k)}{f(x_k)}$:"
            }
          },
          {
            kind: "formula",
            tex: "\\begin{aligned} y_k&=x_k-\\frac{f(x_k)}{f'(x_k)}\\\\ x_{k+1}&=y_k-H(\\mu_k)\\,\\frac{f(y_k)}{f'(x_k)} \\end{aligned}"
          },
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Condiciones para orden 4",
              eu: "4. ordenarako baldintzak",
              en: "Conditions for order 4"
            },
            text: {
              es: "Si $\\alpha$ es raíz simple, $x_0$ está próximo a $\\alpha$ y la función peso cumple $H(0)=1$, $H'(0)=2$ y $|H''(0)|<\\infty$, el esquema anterior tiene orden 4 con ecuación del error $e_{k+1}=\\bigl[\\bigl(5-\\frac{H''(0)}{2}\\bigr)c_2^3-c_2c_3\\bigr]e_k^4+\\mathcal{O}(e_k^5)$, donde $c_j=\\frac{1}{j!}\\frac{f^{(j)}(\\alpha)}{f'(\\alpha)}$. Con solo 3 evaluaciones, es óptimo según Kung-Traub.",
              eu: "$\\alpha$ erro sinplea bada, $x_0$ $\\alpha$-tik hurbil badago eta pisu-funtzioak $H(0)=1$, $H'(0)=2$ eta $|H''(0)|<\\infty$ betetzen baditu, aurreko eskemak 4. ordena du, errore-ekuazioa $e_{k+1}=\\bigl[\\bigl(5-\\frac{H''(0)}{2}\\bigr)c_2^3-c_2c_3\\bigr]e_k^4+\\mathcal{O}(e_k^5)$ izanik, non $c_j=\\frac{1}{j!}\\frac{f^{(j)}(\\alpha)}{f'(\\alpha)}$. 3 ebaluazio bakarrik behar dituenez, optimoa da Kung-Traub-en arabera.",
              en: "If $\\alpha$ is a simple root, $x_0$ is close to $\\alpha$ and the weight function satisfies $H(0)=1$, $H'(0)=2$ and $|H''(0)|<\\infty$, the scheme above has order 4 with error equation $e_{k+1}=\\bigl[\\bigl(5-\\frac{H''(0)}{2}\\bigr)c_2^3-c_2c_3\\bigr]e_k^4+\\mathcal{O}(e_k^5)$, where $c_j=\\frac{1}{j!}\\frac{f^{(j)}(\\alpha)}{f'(\\alpha)}$. With only 3 evaluations, it is optimal by Kung-Traub."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Eligiendo $H(\\mu)=\\frac{1+\\beta\\mu}{1+(\\beta-2)\\mu}$ (que cumple las tres condiciones para todo $\\beta$) se obtiene la familia de King, óptima de orden 4:",
              eu: "$H(\\mu)=\\frac{1+\\beta\\mu}{1+(\\beta-2)\\mu}$ aukeratuz (hiru baldintzak betetzen ditu $\\beta$ guztietarako) King-en familia lortzen da, 4. ordenako optimoa:",
              en: "Choosing $H(\\mu)=\\frac{1+\\beta\\mu}{1+(\\beta-2)\\mu}$ (which satisfies all three conditions for every $\\beta$) yields King's family, optimal of order 4:"
            }
          },
          {
            kind: "formula",
            tex: "x_{k+1}=y_k-\\frac{f(x_k)+\\beta f(y_k)}{f(x_k)+(\\beta-2)f(y_k)}\\,\\frac{f(y_k)}{f'(x_k)}",
            caption: {
              es: "Familia de King. Con $\\beta=0$ se obtiene el método de Ostrowski.",
              eu: "King-en familia. $\\beta=0$ hartuta Ostrowski-ren metodoa lortzen da.",
              en: "King's family. With $\\beta=0$ one obtains Ostrowski's method."
            }
          },
          {
            kind: "formula",
            tex: "\\begin{aligned} y_k&=x_k-\\frac{2}{3}\\,\\frac{f(x_k)}{f'(x_k)}\\\\ x_{k+1}&=x_k-\\frac{1}{2}\\left(\\frac{3f'(y_k)+f'(x_k)}{3f'(y_k)-f'(x_k)}\\right)\\frac{f(x_k)}{f'(x_k)} \\end{aligned}",
            caption: {
              es: "Método de Jarratt, también óptimo de orden 4 (dos derivadas y una evaluación de $f$).",
              eu: "Jarratt-en metodoa, 4. ordenako optimoa hau ere (bi deribatu eta $f$-ren ebaluazio bat).",
              en: "Jarratt's method, also optimal of order 4 (two derivatives and one evaluation of $f$)."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "El comportamiento real de todos estos métodos sobre funciones de prueba se analiza en la [[ejercicio-comparativa-metodos|comparativa numérica]].",
              eu: "Metodo hauen guztien benetako portaera proba-funtzioen gainean [[ejercicio-comparativa-metodos|konparatiba numerikoan]] aztertzen da.",
              en: "The actual behaviour of all these methods on test functions is analysed in the [[ejercicio-comparativa-metodos|numerical comparison]]."
            }
          }
        ]
      }
    ]
  }
];

export const noLinealesDerivations: ContentEntry[] = [
  {
    slug: "deduccion-newton-raphson",
    category: "Ecuaciones no lineales",
    level: "medio",
    searchIntent: "deducción Newton-Raphson tangente Taylor demostración orden 2 ecuación error",
    title: {
      es: "Deducción: Newton-Raphson y su orden cuadrático",
      eu: "Dedukzioa: Newton-Raphson eta bere ordena koadratikoa",
      en: "Derivation: Newton-Raphson and its quadratic order"
    },
    description: {
      es: "La fórmula de Newton por la recta tangente y por el Teorema Fundamental del Cálculo, y la demostración completa con Taylor de que su ecuación del error es cuadrática.",
      eu: "Newton-en formula zuzen ukitzailearen bidez eta Kalkuluaren Oinarrizko Teoremaren bidez, eta Taylor-ekin haren errore-ekuazioa koadratikoa dela erakusten duen frogapen osoa.",
      en: "Newton's formula via the tangent line and via the Fundamental Theorem of Calculus, plus the complete Taylor proof that its error equation is quadratic."
    },
    keywords: ["deducción", "Newton-Raphson", "tangente", "ecuación del error", "orden 2"],
    prerequisites: ["fundamentos-taylor-truncamiento"],
    related: ["no-lineales-newton-raphson", "deduccion-punto-fijo-convergencia"],
    sections: [
      {
        heading: {
          es: "Camino 1: la recta tangente",
          eu: "1. bidea: zuzen ukitzailea",
          en: "Route 1: the tangent line"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "En el iterado actual $x_k$, la recta tangente a la curva $y=f(x)$ es",
                  eu: "Uneko $x_k$ iteratuan, $y=f(x)$ kurbaren zuzen ukitzailea hau da:",
                  en: "At the current iterate $x_k$, the tangent line to the curve $y=f(x)$ is"
                },
                formula: "y=f(x_k)+f'(x_k)(x-x_k)"
              },
              {
                text: {
                  es: "La tangente es la mejor aproximación lineal de $f$ cerca de $x_k$, así que tomamos como siguiente iterado el punto donde la tangente se anula ($y=0$):",
                  eu: "Ukitzailea $f$-ren hurbilketa lineal onena da $x_k$-tik hurbil; beraz, hurrengo iteratu gisa ukitzailea anulatzen den puntua hartzen dugu ($y=0$):",
                  en: "The tangent is the best linear approximation of $f$ near $x_k$, so we take as next iterate the point where the tangent vanishes ($y=0$):"
                },
                formula: "0=f(x_k)+f'(x_k)(x_{k+1}-x_k)\\;\\Rightarrow\\; x_{k+1}=x_k-\\frac{f(x_k)}{f'(x_k)}"
              }
            ]
          }
        ]
      },
      {
        heading: {
          es: "Camino 2: Teorema Fundamental del Cálculo",
          eu: "2. bidea: Kalkuluaren Oinarrizko Teorema",
          en: "Route 2: Fundamental Theorem of Calculus"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Escribimos $f$ mediante el Teorema Fundamental del Cálculo desde $x_k$ y aproximamos la integral con un rectángulo (integrando constante $f'(x_k)$, la misma idea que en la [[deduccion-euler|deducción de Euler]]):",
                  eu: "$f$ Kalkuluaren Oinarrizko Teoremaren bidez idazten dugu $x_k$-tik abiatuta eta integrala laukizuzen batez hurbiltzen dugu ($f'(x_k)$ integrakizun konstantea, [[deduccion-euler|Euler-en dedukzioko]] ideia bera):",
                  en: "Write $f$ via the Fundamental Theorem of Calculus from $x_k$ and approximate the integral with a rectangle (constant integrand $f'(x_k)$, the same idea as in the [[deduccion-euler|Euler derivation]]):"
                },
                formula: "f(x)=f(x_k)+\\int_{x_k}^{x}f'(t)\\,dt\\;\\approx\\; f(x_k)+f'(x_k)(x-x_k)"
              },
              {
                text: {
                  es: "Evaluamos en $x=\\alpha$, donde $f(\\alpha)=0$, y despejamos $\\alpha$:",
                  eu: "$x=\\alpha$-n ebaluatzen dugu, non $f(\\alpha)=0$ den, eta $\\alpha$ askatzen dugu:",
                  en: "Evaluate at $x=\\alpha$, where $f(\\alpha)=0$, and solve for $\\alpha$:"
                },
                formula: "0\\approx f(x_k)+f'(x_k)(\\alpha-x_k)\\;\\Rightarrow\\;\\alpha\\approx x_k-\\frac{f(x_k)}{f'(x_k)}"
              },
              {
                text: {
                  es: "Esa aproximación de $\\alpha$ es el siguiente iterado. Aproximar la integral con [[no-lineales-metodos-alto-orden|cuadraturas más ricas]] (trapecio, punto medio, Simpson) produce métodos de orden mayor por esta misma vía.",
                  eu: "$\\alpha$-ren hurbilketa hori da hurrengo iteratua. Integrala [[no-lineales-metodos-alto-orden|kuadratura aberatsagoekin]] hurbiltzeak (trapezioa, erdiko puntua, Simpson) ordena handiagoko metodoak sortzen ditu bide beretik.",
                  en: "That approximation of $\\alpha$ is the next iterate. Approximating the integral with [[no-lineales-metodos-alto-orden|richer quadratures]] (trapezoid, midpoint, Simpson) produces higher-order methods along this same route."
                }
              }
            ]
          }
        ]
      },
      {
        heading: {
          es: "Demostración del orden 2 (ecuación del error)",
          eu: "2. ordenaren frogapena (errore-ekuazioa)",
          en: "Proof of order 2 (error equation)"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Sea $\\alpha$ raíz simple ($f(\\alpha)=0$, $f'(\\alpha)\\ne 0$), $e_k=x_k-\\alpha$ el error y $c_2=\\frac{1}{2}\\frac{f''(\\alpha)}{f'(\\alpha)}$. Desarrollamos $f(x_k)$ por Taylor en torno a $\\alpha$; el término constante $f(\\alpha)$ desaparece:",
                  eu: "Izan bedi $\\alpha$ erro sinplea ($f(\\alpha)=0$, $f'(\\alpha)\\ne 0$), $e_k=x_k-\\alpha$ errorea eta $c_2=\\frac{1}{2}\\frac{f''(\\alpha)}{f'(\\alpha)}$. $f(x_k)$ Taylor bidez garatzen dugu $\\alpha$-ren inguruan; $f(\\alpha)$ gai konstantea desagertu egiten da:",
                  en: "Let $\\alpha$ be a simple root ($f(\\alpha)=0$, $f'(\\alpha)\\ne 0$), $e_k=x_k-\\alpha$ the error and $c_2=\\frac{1}{2}\\frac{f''(\\alpha)}{f'(\\alpha)}$. Expand $f(x_k)$ by Taylor around $\\alpha$; the constant term $f(\\alpha)$ vanishes:"
                },
                formula: "f(x_k)=f'(\\alpha)\\,e_k+\\frac{1}{2}f''(\\alpha)\\,e_k^2+\\mathcal{O}(e_k^3)=f'(\\alpha)\\bigl[e_k+c_2e_k^2\\bigr]+\\mathcal{O}(e_k^3)"
              },
              {
                text: {
                  es: "Desarrollamos también la derivada:",
                  eu: "Deribatua ere garatzen dugu:",
                  en: "Expand the derivative as well:"
                },
                formula: "f'(x_k)=f'(\\alpha)+f''(\\alpha)\\,e_k+\\mathcal{O}(e_k^2)=f'(\\alpha)\\bigl[1+2c_2e_k\\bigr]+\\mathcal{O}(e_k^2)"
              },
              {
                text: {
                  es: "Dividimos ambos desarrollos. El factor $f'(\\alpha)$ se cancela y, usando $\\frac{1}{1+2c_2e_k}=1-2c_2e_k+\\mathcal{O}(e_k^2)$:",
                  eu: "Bi garapenak zatitzen ditugu. $f'(\\alpha)$ faktorea ezabatzen da eta, $\\frac{1}{1+2c_2e_k}=1-2c_2e_k+\\mathcal{O}(e_k^2)$ erabiliz:",
                  en: "Divide both expansions. The factor $f'(\\alpha)$ cancels and, using $\\frac{1}{1+2c_2e_k}=1-2c_2e_k+\\mathcal{O}(e_k^2)$:"
                },
                formula: "\\frac{f(x_k)}{f'(x_k)}=\\bigl(e_k+c_2e_k^2\\bigr)\\bigl(1-2c_2e_k\\bigr)+\\mathcal{O}(e_k^3)=e_k-c_2e_k^2+\\mathcal{O}(e_k^3)"
              },
              {
                text: {
                  es: "Restamos $\\alpha$ en la fórmula de Newton y sustituimos: los términos lineales en $e_k$ se cancelan y queda la ecuación del error cuadrática. El método de Newton tiene orden $p=2$.",
                  eu: "Newton-en formulan $\\alpha$ kentzen dugu eta ordezkatzen dugu: $e_k$-ren gai linealak ezabatzen dira eta errore-ekuazio koadratikoa geratzen da. Newton-en metodoak $p=2$ ordena du.",
                  en: "Subtract $\\alpha$ in Newton's formula and substitute: the linear terms in $e_k$ cancel and the quadratic error equation remains. Newton's method has order $p=2$."
                },
                formula: "e_{k+1}=x_{k+1}-\\alpha=e_k-\\frac{f(x_k)}{f'(x_k)}=c_2e_k^2+\\mathcal{O}(e_k^3)"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-biseccion-cota",
    category: "Ecuaciones no lineales",
    level: "base",
    searchIntent: "deducción cota error bisección número iteraciones",
    title: {
      es: "Deducción: cota de error de la bisección",
      eu: "Dedukzioa: bisekzioaren errore-kota",
      en: "Derivation: bisection error bound"
    },
    description: {
      es: "Por qué el error de la bisección se reduce a la mitad en cada iteración, y cómo predecir de antemano cuántas iteraciones exige una tolerancia dada.",
      eu: "Zergatik murrizten den bisekzioaren errorea erdira iterazio bakoitzean, eta nola aurreikusi aldez aurretik tolerantzia jakin batek zenbat iterazio eskatzen dituen.",
      en: "Why the bisection error halves at every iteration, and how to predict in advance how many iterations a given tolerance requires."
    },
    keywords: ["deducción", "bisección", "cota de error", "iteraciones"],
    prerequisites: ["no-lineales-biseccion"],
    related: ["no-lineales-biseccion"],
    sections: [
      {
        heading: {
          es: "El error se divide entre dos",
          eu: "Errorea bitan zatitzen da",
          en: "The error halves"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Tras $k$ bisecciones, el intervalo $[a_k,b_k]$ sigue conteniendo la raíz y mide la mitad que el anterior:",
                  eu: "$k$ bisekzioren ondoren, $[a_k,b_k]$ tarteak erroa gordetzen du oraindik eta aurrekoaren erdia neurtzen du:",
                  en: "After $k$ bisections, the interval $[a_k,b_k]$ still contains the root and is half the size of the previous one:"
                },
                formula: "b_k-a_k=\\frac{b-a}{2^k}"
              },
              {
                text: {
                  es: "La aproximación es el punto medio $m_k$, y la raíz está en alguna de las dos mitades, a distancia como mucho la mitad del intervalo:",
                  eu: "Hurbilketa erdiko puntua da, $m_k$, eta erroa bi erdietako batean dago, gehienez tartearen erdia den distantziara:",
                  en: "The approximation is the midpoint $m_k$, and the root lies in one of the two halves, at distance at most half the interval:"
                },
                formula: "|m_k-\\alpha|\\le\\frac{b_k-a_k}{2}=\\frac{b-a}{2^{k+1}}"
              },
              {
                text: {
                  es: "Para garantizar $|m_k-\\alpha|<\\varepsilon$ basta despejar $k$ de $\\frac{b-a}{2^{k+1}}<\\varepsilon$: el número de iteraciones se conoce antes de empezar, cosa que ningún otro método de esta área ofrece.",
                  eu: "$|m_k-\\alpha|<\\varepsilon$ bermatzeko, nahikoa da $k$ askatzea $\\frac{b-a}{2^{k+1}}<\\varepsilon$ desberdintzatik: iterazio kopurua hasi aurretik ezagutzen da, arlo honetako beste inongo metodok eskaintzen ez duena.",
                  en: "To guarantee $|m_k-\\alpha|<\\varepsilon$, solve for $k$ in $\\frac{b-a}{2^{k+1}}<\\varepsilon$: the number of iterations is known before starting, something no other method in this area offers."
                },
                formula: "k>\\log_2\\!\\left(\\frac{b-a}{\\varepsilon}\\right)-1"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-punto-fijo-convergencia",
    category: "Ecuaciones no lineales",
    level: "avanzado",
    searchIntent: "deducción convergencia punto fijo Taylor orden derivadas",
    title: {
      es: "Deducción: convergencia y orden del punto fijo",
      eu: "Dedukzioa: puntu finkoaren konbergentzia eta ordena",
      en: "Derivation: fixed-point convergence and order"
    },
    description: {
      es: "Desarrollar φ por Taylor alrededor del punto fijo produce la ecuación del error del método y demuestra a la vez el criterio |φ'(α)|<1 y el teorema del orden.",
      eu: "φ Taylor bidez puntu finkoaren inguruan garatzeak metodoaren errore-ekuazioa sortzen du eta aldi berean |φ'(α)|<1 irizpidea eta ordenaren teorema frogatzen ditu.",
      en: "Expanding φ by Taylor around the fixed point yields the method's error equation and proves both the |φ'(α)|<1 criterion and the order theorem."
    },
    keywords: ["deducción", "punto fijo", "convergencia", "orden", "Taylor"],
    prerequisites: ["no-lineales-punto-fijo", "fundamentos-taylor-truncamiento"],
    related: ["no-lineales-punto-fijo", "deduccion-newton-raphson"],
    sections: [
      {
        heading: {
          es: "Taylor de φ alrededor del punto fijo",
          eu: "φ-ren Taylor puntu finkoaren inguruan",
          en: "Taylor of φ around the fixed point"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Sea $e_k=x_k-\\alpha$. Desarrollamos $\\phi(x_k)$ por [[fundamentos-taylor-truncamiento|Taylor]] en torno a $\\alpha$ y usamos que $\\phi(\\alpha)=\\alpha$:",
                  eu: "Izan bedi $e_k=x_k-\\alpha$. $\\phi(x_k)$ [[fundamentos-taylor-truncamiento|Taylor]] bidez garatzen dugu $\\alpha$-ren inguruan eta $\\phi(\\alpha)=\\alpha$ dela erabiltzen dugu:",
                  en: "Let $e_k=x_k-\\alpha$. Expand $\\phi(x_k)$ by [[fundamentos-taylor-truncamiento|Taylor]] around $\\alpha$ and use $\\phi(\\alpha)=\\alpha$:"
                },
                formula: "x_{k+1}=\\phi(x_k)=\\alpha+\\phi'(\\alpha)\\,e_k+\\frac{\\phi''(\\alpha)}{2}\\,e_k^2+\\frac{\\phi'''(\\alpha)}{6}\\,e_k^3+\\cdots"
              },
              {
                text: {
                  es: "Restando $\\alpha$ queda la ecuación del error de la iteración de punto fijo:",
                  eu: "$\\alpha$ kenduta, puntu finkoko iterazioaren errore-ekuazioa geratzen da:",
                  en: "Subtracting $\\alpha$ leaves the error equation of the fixed-point iteration:"
                },
                formula: "e_{k+1}=\\phi'(\\alpha)\\,e_k+\\frac{\\phi''(\\alpha)}{2}\\,e_k^2+\\frac{\\phi'''(\\alpha)}{6}\\,e_k^3+\\cdots"
              },
              {
                text: {
                  es: "Si $\\phi'(\\alpha)\\ne 0$, el término dominante es lineal: $e_{k+1}\\approx\\phi'(\\alpha)e_k$. Los errores se contraen si $|\\phi'(\\alpha)|<1$ (convergencia lineal con factor $|\\phi'(\\alpha)|$) y crecen si $|\\phi'(\\alpha)|>1$: ese es el criterio de convergencia local.",
                  eu: "$\\phi'(\\alpha)\\ne 0$ bada, gai nagusia lineala da: $e_{k+1}\\approx\\phi'(\\alpha)e_k$. Erroreak uzkurtu egiten dira $|\\phi'(\\alpha)|<1$ bada (konbergentzia lineala, $|\\phi'(\\alpha)|$ faktorearekin) eta hazi $|\\phi'(\\alpha)|>1$ bada: horixe da konbergentzia lokalaren irizpidea.",
                  en: "If $\\phi'(\\alpha)\\ne 0$, the dominant term is linear: $e_{k+1}\\approx\\phi'(\\alpha)e_k$. Errors contract if $|\\phi'(\\alpha)|<1$ (linear convergence with factor $|\\phi'(\\alpha)|$) and grow if $|\\phi'(\\alpha)|>1$: that is the local convergence criterion."
                }
              },
              {
                text: {
                  es: "Si además $\\phi'(\\alpha)=\\phi''(\\alpha)=\\dots=\\phi^{(p-1)}(\\alpha)=0$ y $\\phi^{(p)}(\\alpha)\\ne 0$, todos los términos anteriores desaparecen y el primero superviviente fija el orden: es el teorema del orden de un método de punto fijo.",
                  eu: "Gainera $\\phi'(\\alpha)=\\phi''(\\alpha)=\\dots=\\phi^{(p-1)}(\\alpha)=0$ eta $\\phi^{(p)}(\\alpha)\\ne 0$ badira, aurreko gai guztiak desagertzen dira eta bizirik dirauen lehenak ordena finkatzen du: puntu finkoko metodo baten ordenaren teorema da, hain zuzen.",
                  en: "If moreover $\\phi'(\\alpha)=\\phi''(\\alpha)=\\dots=\\phi^{(p-1)}(\\alpha)=0$ and $\\phi^{(p)}(\\alpha)\\ne 0$, all earlier terms vanish and the first surviving one fixes the order: this is the order theorem for a fixed-point method."
                },
                formula: "e_{k+1}=\\frac{\\phi^{(p)}(\\alpha)}{p!}\\,e_k^p+\\mathcal{O}\\bigl(e_k^{p+1}\\bigr)"
              },
              {
                text: {
                  es: "Aplicación inmediata: para Newton, $\\phi=x-\\frac{f}{f'}$ y $\\phi'=\\frac{f f''}{(f')^2}$, que se anula en una raíz simple ($f(\\alpha)=0$). Como en general $\\phi''(\\alpha)\\ne 0$, Newton tiene orden 2, en acuerdo con la [[deduccion-newton-raphson|demostración directa]].",
                  eu: "Berehalako aplikazioa: Newton-entzat, $\\phi=x-\\frac{f}{f'}$ eta $\\phi'=\\frac{f f''}{(f')^2}$, erro sinple batean anulatzen dena ($f(\\alpha)=0$). Orokorrean $\\phi''(\\alpha)\\ne 0$ denez, Newton-ek 2. ordena du, [[deduccion-newton-raphson|frogapen zuzenarekin]] bat etorriz.",
                  en: "Immediate application: for Newton, $\\phi=x-\\frac{f}{f'}$ and $\\phi'=\\frac{f f''}{(f')^2}$, which vanishes at a simple root ($f(\\alpha)=0$). Since in general $\\phi''(\\alpha)\\ne 0$, Newton has order 2, agreeing with the [[deduccion-newton-raphson|direct proof]]."
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

export const noLinealesExercises: ContentEntry[] = [
  {
    slug: "ejercicio-biseccion-a-mano",
    category: "Ecuaciones no lineales",
    level: "base",
    searchIntent: "ejercicio resuelto bisección a mano cos2x iteraciones cota",
    title: {
      es: "Ejercicio: bisección a mano",
      eu: "Ariketa: bisekzioa eskuz",
      en: "Exercise: bisection by hand"
    },
    description: {
      es: "Seis iteraciones de bisección para cos²x−x=0 en [0,1], con la cadena de intervalos, la cota de error en cada paso y la predicción del número de iteraciones necesarias.",
      eu: "Bisekzioaren sei iterazio cos²x−x=0 ekuaziorako [0,1] tartean, tarteen katearekin, pauso bakoitzeko errore-kotarekin eta behar den iterazio kopuruaren aurreikuspenarekin.",
      en: "Six bisection iterations for cos²x−x=0 on [0,1], with the chain of intervals, the error bound at each step and the prediction of the required number of iterations."
    },
    keywords: ["ejercicio", "bisección", "a mano", "cota de error"],
    prerequisites: ["no-lineales-biseccion"],
    related: ["no-lineales-biseccion", "deduccion-biseccion-cota", "ejercicio-newton-coseno"],
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
              es: "Bisección en [0,1]",
              eu: "Bisekzioa [0,1] tartean",
              en: "Bisection on [0,1]"
            },
            statement: {
              es: "Aproximar la raíz de $f(x)=\\cos^2 x-x$ en $[0,1]$ con seis iteraciones de bisección.",
              eu: "Hurbildu $f(x)=\\cos^2 x-x$-ren erroa $[0,1]$ tartean bisekzioaren sei iteraziorekin.",
              en: "Approximate the root of $f(x)=\\cos^2 x-x$ on $[0,1]$ with six bisection iterations."
            },
            steps: [
              {
                text: {
                  es: "Comprobación inicial: $f(0)=1>0$ y $f(1)=\\cos^2 1-1=-0.708<0$, así que el teorema de Bolzano garantiza una raíz en $(0,1)$.",
                  eu: "Hasierako egiaztapena: $f(0)=1>0$ eta $f(1)=\\cos^2 1-1=-0.708<0$; beraz, Bolzanoren teoremak erro bat bermatzen du $(0,1)$-en.",
                  en: "Initial check: $f(0)=1>0$ and $f(1)=\\cos^2 1-1=-0.708<0$, so Bolzano's theorem guarantees a root in $(0,1)$."
                }
              },
              {
                text: {
                  es: "$m_1=0.5$: $f(0.5)=0.270>0$, mismo signo que en $0$ → raíz en $[0.5,\\,1]$.",
                  eu: "$m_1=0.5$: $f(0.5)=0.270>0$, $0$-ko zeinu bera → erroa $[0.5,\\,1]$-en.",
                  en: "$m_1=0.5$: $f(0.5)=0.270>0$, same sign as at $0$ → root in $[0.5,\\,1]$."
                }
              },
              {
                text: {
                  es: "$m_2=0.75$: $f(0.75)=-0.215<0$ → raíz en $[0.5,\\,0.75]$.",
                  eu: "$m_2=0.75$: $f(0.75)=-0.215<0$ → erroa $[0.5,\\,0.75]$-en.",
                  en: "$m_2=0.75$: $f(0.75)=-0.215<0$ → root in $[0.5,\\,0.75]$."
                }
              },
              {
                text: {
                  es: "$m_3=0.625$: $f(0.625)=0.033>0$ → raíz en $[0.625,\\,0.75]$.",
                  eu: "$m_3=0.625$: $f(0.625)=0.033>0$ → erroa $[0.625,\\,0.75]$-en.",
                  en: "$m_3=0.625$: $f(0.625)=0.033>0$ → root in $[0.625,\\,0.75]$."
                }
              },
              {
                text: {
                  es: "$m_4=0.6875$: $f=-0.090<0$ → $[0.625,\\,0.6875]$. $m_5=0.65625$: $f=-0.029<0$ → $[0.625,\\,0.65625]$. $m_6=0.640625$: $f=0.002>0$ → $[0.640625,\\,0.65625]$.",
                  eu: "$m_4=0.6875$: $f=-0.090<0$ → $[0.625,\\,0.6875]$. $m_5=0.65625$: $f=-0.029<0$ → $[0.625,\\,0.65625]$. $m_6=0.640625$: $f=0.002>0$ → $[0.640625,\\,0.65625]$.",
                  en: "$m_4=0.6875$: $f=-0.090<0$ → $[0.625,\\,0.6875]$. $m_5=0.65625$: $f=-0.029<0$ → $[0.625,\\,0.65625]$. $m_6=0.640625$: $f=0.002>0$ → $[0.640625,\\,0.65625]$."
                }
              },
              {
                text: {
                  es: "La cota de error tras 6 iteraciones es $\\frac{b-a}{2^{7}}=\\frac{1}{128}=0.0078$; de hecho $m_6=0.640625$ dista de $\\alpha=0.641714$ apenas $0.0011$.",
                  eu: "6 iterazioren ondorengo errore-kota $\\frac{b-a}{2^{7}}=\\frac{1}{128}=0.0078$ da; izan ere, $m_6=0.640625$ eta $\\alpha=0.641714$ artean $0.0011$ baino ez dago.",
                  en: "The error bound after 6 iterations is $\\frac{b-a}{2^{7}}=\\frac{1}{128}=0.0078$; in fact $m_6=0.640625$ is only $0.0011$ away from $\\alpha=0.641714$."
                }
              }
            ],
            result: {
              text: {
                es: "Con la [[deduccion-biseccion-cota|cota de error]] se puede predecir el coste de más precisión: para $\\varepsilon=10^{-9}$ harían falta $k>\\log_2(10^9)-1\\approx 29$ iteraciones. Compárese con las 5 de [[ejercicio-newton-coseno|Newton]] para la misma ecuación.",
                eu: "[[deduccion-biseccion-cota|Errore-kotarekin]] doitasun handiagoaren kostua aurreikus daiteke: $\\varepsilon=10^{-9}$ lortzeko $k>\\log_2(10^9)-1\\approx 29$ iterazio beharko lirateke. Konpara bedi [[ejercicio-newton-coseno|Newton]]-en 5ekin, ekuazio bererako.",
                en: "With the [[deduccion-biseccion-cota|error bound]] the cost of more precision can be predicted: for $\\varepsilon=10^{-9}$ one would need $k>\\log_2(10^9)-1\\approx 29$ iterations. Compare with [[ejercicio-newton-coseno|Newton's]] 5 for the same equation."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-newton-coseno",
    category: "Ecuaciones no lineales",
    level: "medio",
    searchIntent: "ejercicio resuelto Newton x=cos2x iteraciones ACOC tabla",
    title: {
      es: "Ejercicio: Newton sobre x=cos²x",
      eu: "Ariketa: Newton x=cos²x ekuazioan",
      en: "Exercise: Newton on x=cos²x"
    },
    description: {
      es: "Aplicación completa del método de Newton a x=cos²x desde x0=0.3: tabla de iterados, residuos, incrementos y ACOC tendiendo al orden teórico 2.",
      eu: "Newton-en metodoaren aplikazio osoa x=cos²x ekuazioari x0=0.3-tik: iteratuen, hondarren eta inkrementuen taula, eta ACOC 2 ordena teorikorantz.",
      en: "Full application of Newton's method to x=cos²x from x0=0.3: table of iterates, residuals, increments and ACOC tending to the theoretical order 2."
    },
    keywords: ["ejercicio", "Newton", "ACOC", "tabla de iteraciones"],
    prerequisites: ["no-lineales-newton-raphson", "no-lineales-orden-eficiencia"],
    related: ["no-lineales-newton-raphson", "no-lineales-orden-eficiencia", "ejercicio-biseccion-a-mano"],
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
              es: "Se resuelve $x=\\cos^2 x$, es decir, $f(x)=\\cos^2 x-x=0$, con estimación inicial $x_0=0.3$, criterio de parada $|x_{k+1}-x_k|<10^{-9}$ y máximo de 20 iteraciones. Newton necesita la derivada:",
              eu: "$x=\\cos^2 x$ ebazten da, hau da, $f(x)=\\cos^2 x-x=0$, hasierako estimazioa $x_0=0.3$ izanik, gelditze-irizpidea $|x_{k+1}-x_k|<10^{-9}$ eta gehienez 20 iterazio. Newton-ek deribatua behar du:",
              en: "Solve $x=\\cos^2 x$, that is, $f(x)=\\cos^2 x-x=0$, with initial estimate $x_0=0.3$, stopping criterion $|x_{k+1}-x_k|<10^{-9}$ and at most 20 iterations. Newton needs the derivative:"
            }
          },
          {
            kind: "formula",
            tex: "f'(x)=-2\\cos x\\,\\sin x-1=-\\sin 2x-1"
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
              es: ["iter", "$x_k$", "$|f(x_k)|$", "$|x_k-x_{k-1}|$", "ACOC"],
              eu: ["iter", "$x_k$", "$|f(x_k)|$", "$|x_k-x_{k-1}|$", "ACOC"],
              en: ["iter", "$x_k$", "$|f(x_k)|$", "$|x_k-x_{k-1}|$", "ACOC"]
            },
            rows: [
              ["1", "0.691570", "0.098293", "0.39157", "n/a"],
              ["2", "0.641989", "5.3803·10⁻⁴", "0.049581", "n/a"],
              ["3", "0.641714", "2.1349·10⁻⁸", "2.7463·10⁻⁴", "2.5143"],
              ["4", "0.641714", "3.3663·10⁻¹⁷", "1.0898·10⁻⁸", "1.9505"],
              ["5", "0.641714", "8.3691·10⁻³⁵", "1.7184·10⁻¹⁷", "1.9999"]
            ],
            caption: {
              es: "Iteraciones de Newton desde $x_0=0.3$ (las dos últimas filas requieren aritmética de precisión extendida).",
              eu: "Newton-en iterazioak $x_0=0.3$-tik (azken bi errenkadek doitasun hedatuko aritmetika eskatzen dute).",
              en: "Newton iterations from $x_0=0.3$ (the last two rows require extended-precision arithmetic)."
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
              es: "La solución es $\\alpha=0.641714$. Obsérvese la firma de la convergencia cuadrática: el exponente del residuo se duplica en cada fila ($10^{-4}\\to 10^{-8}\\to 10^{-17}\\to 10^{-35}$) y el [[no-lineales-orden-eficiencia|ACOC]] tiende a 2. La iteración directa de punto fijo $x_{k+1}=\\cos^2 x_k$ necesita 455 iteraciones para lo que Newton hace en 5.",
              eu: "Soluzioa $\\alpha=0.641714$ da. Erreparatu konbergentzia koadratikoaren sinadurari: hondarraren berretzailea bikoiztu egiten da errenkada bakoitzean ($10^{-4}\\to 10^{-8}\\to 10^{-17}\\to 10^{-35}$) eta [[no-lineales-orden-eficiencia|ACOC]] 2rantz doa. Puntu finkoko iterazio zuzenak, $x_{k+1}=\\cos^2 x_k$, 455 iterazio behar ditu Newton-ek 5ean egiten duenerako.",
              en: "The solution is $\\alpha=0.641714$. Quadratic convergence shows in the residual's exponent, which doubles at each row ($10^{-4}\\to 10^{-8}\\to 10^{-17}\\to 10^{-35}$), and in the [[no-lineales-orden-eficiencia|ACOC]], which tends to 2. The direct fixed-point iteration $x_{k+1}=\\cos^2 x_k$ needs 455 iterations for what Newton does in 5."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-secante-a-mano",
    category: "Ecuaciones no lineales",
    level: "medio",
    searchIntent: "ejercicio resuelto secante a mano diferencias divididas iteraciones",
    title: {
      es: "Ejercicio: la secante a mano",
      eu: "Ariketa: sekantea eskuz",
      en: "Exercise: the secant by hand"
    },
    description: {
      es: "El método de la secante aplicado a cos²x−x=0 desde x0=0, x1=1: cinco iteraciones con las diferencias divididas explícitas y la convergencia superlineal a la vista.",
      eu: "Sekantearen metodoa cos²x−x=0 ekuazioari aplikatuta x0=0, x1=1-etik: bost iterazio diferentzia zatitu esplizituekin eta konbergentzia superlineala agerian.",
      en: "The secant method applied to cos²x−x=0 from x0=0, x1=1: five iterations with explicit divided differences and superlinear convergence on display."
    },
    keywords: ["ejercicio", "secante", "diferencias divididas", "a mano"],
    prerequisites: ["no-lineales-secante-steffensen"],
    related: ["no-lineales-secante-steffensen", "ejercicio-newton-coseno"],
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
              es: "Secante con x₀=0, x₁=1",
              eu: "Sekantea x₀=0, x₁=1 hartuta",
              en: "Secant with x₀=0, x₁=1"
            },
            statement: {
              es: "Aproximar la raíz de $f(x)=\\cos^2 x-x$ con el método de la secante partiendo de $x_0=0$ y $x_1=1$.",
              eu: "Hurbildu $f(x)=\\cos^2 x-x$-ren erroa sekantearen metodoarekin, $x_0=0$ eta $x_1=1$-etik abiatuta.",
              en: "Approximate the root of $f(x)=\\cos^2 x-x$ with the secant method starting from $x_0=0$ and $x_1=1$."
            },
            steps: [
              {
                text: {
                  es: "Valores iniciales: $f(0)=1$ y $f(1)=-0.7081$. La primera diferencia dividida es $f[x_1,x_0]=\\frac{f(1)-f(0)}{1-0}=-1.7081$, y:",
                  eu: "Hasierako balioak: $f(0)=1$ eta $f(1)=-0.7081$. Lehen diferentzia zatitua $f[x_1,x_0]=\\frac{f(1)-f(0)}{1-0}=-1.7081$ da, eta:",
                  en: "Initial values: $f(0)=1$ and $f(1)=-0.7081$. The first divided difference is $f[x_1,x_0]=\\frac{f(1)-f(0)}{1-0}=-1.7081$, and:"
                },
                formula: "x_2=x_1-\\frac{f(x_1)}{f[x_1,x_0]}=1-\\frac{-0.7081}{-1.7081}=0.585455"
              },
              {
                text: {
                  es: "Con $f(x_2)=0.10924$: $f[x_2,x_1]=\\frac{0.10924-(-0.7081)}{0.585455-1}=-1.9721$, luego $x_3=0.585455-\\frac{0.10924}{-1.9721}=0.640845$.",
                  eu: "$f(x_2)=0.10924$ izanik: $f[x_2,x_1]=\\frac{0.10924-(-0.7081)}{0.585455-1}=-1.9721$; beraz, $x_3=0.585455-\\frac{0.10924}{-1.9721}=0.640845$.",
                  en: "With $f(x_2)=0.10924$: $f[x_2,x_1]=\\frac{0.10924-(-0.7081)}{0.585455-1}=-1.9721$, hence $x_3=0.585455-\\frac{0.10924}{-1.9721}=0.640845$."
                }
              },
              {
                text: {
                  es: "Dos iteraciones más siguen el mismo patrón: $x_4=0.641722$ (residuo $1.6\\cdot 10^{-5}$) y $x_5=0.6417144$ (residuo $2.0\\cdot 10^{-9}$).",
                  eu: "Beste bi iteraziok eredu berari jarraitzen diote: $x_4=0.641722$ (hondarra $1.6\\cdot 10^{-5}$) eta $x_5=0.6417144$ (hondarra $2.0\\cdot 10^{-9}$).",
                  en: "Two more iterations follow the same pattern: $x_4=0.641722$ (residual $1.6\\cdot 10^{-5}$) and $x_5=0.6417144$ (residual $2.0\\cdot 10^{-9}$)."
                }
              }
            ],
            result: {
              text: {
                es: "En cuatro iteraciones útiles el residuo cae de $10^{-1}$ a $10^{-9}$ sin evaluar ninguna derivada. La cadencia de los exponentes ($-1,-3,-5,-9$) refleja el orden superlineal $p\\approx 1.618$: más lento que [[ejercicio-newton-coseno|Newton]], mucho más rápido que la bisección.",
                eu: "Lau iterazio erabilgarritan hondarra $10^{-1}$-etik $10^{-9}$-ra jaisten da deribaturik ebaluatu gabe. Berretzaileen kadentziak ($-1,-3,-5,-9$) ordena superlineala islatzen du, $p\\approx 1.618$: [[ejercicio-newton-coseno|Newton]] baino motelagoa, bisekzioa baino askoz azkarragoa.",
                en: "In four useful iterations the residual falls from $10^{-1}$ to $10^{-9}$ without evaluating any derivative. The cadence of the exponents ($-1,-3,-5,-9$) reflects the superlinear order $p\\approx 1.618$: slower than [[ejercicio-newton-coseno|Newton]], much faster than bisection."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-comparativa-metodos",
    category: "Ecuaciones no lineales",
    level: "avanzado",
    searchIntent: "comparativa numérica Newton Halley Ostrowski Traub Jarratt funciones test",
    title: {
      es: "Ejercicio: comparativa numérica de métodos iterativos",
      eu: "Ariketa: metodo iteratiboen konparatiba numerikoa",
      en: "Exercise: numerical comparison of iterative methods"
    },
    description: {
      es: "Newton, Halley, Ostrowski, Traub, punto medio, Jarratt y Newton doble sobre funciones de prueba con tolerancia 10⁻¹⁰⁰: iteraciones, residuos y ACOC confirmando los órdenes teóricos.",
      eu: "Newton, Halley, Ostrowski, Traub, erdiko puntua, Jarratt eta Newton bikoitza proba-funtzioen gainean 10⁻¹⁰⁰ tolerantziarekin: iterazioak, hondarrak eta ACOC ordena teorikoak baieztatuz.",
      en: "Newton, Halley, Ostrowski, Traub, midpoint, Jarratt and double Newton on test functions with tolerance 10⁻¹⁰⁰: iterations, residuals and ACOC confirming the theoretical orders."
    },
    keywords: ["comparativa", "Newton", "Halley", "Ostrowski", "Jarratt", "ACOC"],
    prerequisites: ["no-lineales-metodos-alto-orden", "no-lineales-orden-eficiencia"],
    related: ["no-lineales-metodos-alto-orden", "no-lineales-orden-eficiencia"],
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
              es: "Se comparan siete métodos bajo condiciones idénticas: criterio de parada $|x_{k+1}-x_k|<10^{-100}$ o 60 iteraciones, con aritmética de precisión extendida (400 dígitos), imprescindible para tolerancias tan extremas. Las funciones de prueba y sus raíces son $f_1(x)=\\sin x-e^{-x}$ con $\\alpha\\approx 0.58853274$ y $f_3(x)=(x-1)^3-1$ con $\\alpha=2$.",
              eu: "Zazpi metodo alderatzen dira baldintza berberetan: gelditze-irizpidea $|x_{k+1}-x_k|<10^{-100}$ edo 60 iterazio, doitasun hedatuko aritmetikarekin (400 digitu), hain tolerantzia muturrekoetarako ezinbestekoa. Proba-funtzioak eta haien erroak: $f_1(x)=\\sin x-e^{-x}$, $\\alpha\\approx 0.58853274$ duena, eta $f_3(x)=(x-1)^3-1$, $\\alpha=2$ duena.",
              en: "Seven methods are compared under identical conditions: stopping criterion $|x_{k+1}-x_k|<10^{-100}$ or 60 iterations, with extended-precision arithmetic (400 digits), essential for such extreme tolerances. The test functions and their roots are $f_1(x)=\\sin x-e^{-x}$ with $\\alpha\\approx 0.58853274$ and $f_3(x)=(x-1)^3-1$ with $\\alpha=2$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Resultados para f₁ (x₀=0.1)",
          eu: "Emaitzak f₁-erako (x₀=0.1)",
          en: "Results for f₁ (x₀=0.1)"
        },
        blocks: [
          {
            kind: "table",
            head: {
              es: ["Método", "iter", "$|f(x_{k+1})|$", "$|x_{k+1}-x_k|$", "ACOC"],
              eu: ["Metodoa", "iter", "$|f(x_{k+1})|$", "$|x_{k+1}-x_k|$", "ACOC"],
              en: ["Method", "iter", "$|f(x_{k+1})|$", "$|x_{k+1}-x_k|$", "ACOC"]
            },
            rows: [
              ["Newton", "8", "6.5531·10⁻²⁰⁵", "1.0865·10⁻¹⁰²", "2.0000"],
              ["Halley", "6", "0", "5.3661·10⁻¹⁸⁷", "3.0000"],
              ["Ostrowski", "5", "1.2716·10⁻⁴⁰⁸", "6.7766·10⁻¹⁹⁹", "4.0000"],
              ["Traub", "6", "1.2716·10⁻⁴⁰⁸", "9.3924·10⁻¹⁶⁶", "3.0000"],
              ["Punto medio", "6", "1.2716·10⁻⁴⁰⁸", "2.9422·10⁻¹⁹²", "3.0000"],
              ["Jarratt", "5", "1.2716·10⁻⁴⁰⁸", "5.1327·10⁻¹⁹⁸", "4.0000"],
              ["Newton doble", "5", "1.2716·10⁻⁴⁰⁸", "4.7250·10⁻²⁰⁵", "4.0000"]
            ],
            caption: {
              es: "Resultados para $f_1(x)=\\sin x-e^{-x}$ con $x_0=0.1$.",
              eu: "Emaitzak $f_1(x)=\\sin x-e^{-x}$-rako, $x_0=0.1$ izanik.",
              en: "Results for $f_1(x)=\\sin x-e^{-x}$ with $x_0=0.1$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Resultados para f₃ (x₀=1.5)",
          eu: "Emaitzak f₃-rako (x₀=1.5)",
          en: "Results for f₃ (x₀=1.5)"
        },
        blocks: [
          {
            kind: "table",
            head: {
              es: ["Método", "iter", "$|f(x_{k+1})|$", "$|x_{k+1}-x_k|$", "ACOC"],
              eu: ["Metodoa", "iter", "$|f(x_{k+1})|$", "$|x_{k+1}-x_k|$", "ACOC"],
              en: ["Method", "iter", "$|f(x_{k+1})|$", "$|x_{k+1}-x_k|$", "ACOC"]
            },
            rows: [
              ["Newton", "11", "2.8174·10⁻³⁵⁹", "3.0646·10⁻¹⁸⁰", "2.0000"],
              ["Halley", "7", "0", "1.7850·10⁻²¹⁴", "3.0000"],
              ["Ostrowski", "6", "0", "7.3471·10⁻²³⁹", "4.0000"],
              ["Traub", "58", "1.2798·10⁻³⁹³", "5.9750·10⁻¹³²", "3.0000"],
              ["Punto medio", "7", "2.1994·10⁻³⁹⁹", "9.2824·10⁻¹³⁴", "3.0000"],
              ["Jarratt", "6", "0", "7.3471·10⁻²³⁹", "4.0000"],
              ["Newton doble", "6", "0", "3.0646·10⁻¹⁸⁰", "4.0000"]
            ],
            caption: {
              es: "Resultados para $f_3(x)=(x-1)^3-1$ con $x_0=1.5$.",
              eu: "Emaitzak $f_3(x)=(x-1)^3-1$-erako, $x_0=1.5$ izanik.",
              en: "Results for $f_3(x)=(x-1)^3-1$ with $x_0=1.5$."
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
              es: "El ACOC reproduce en todos los casos el orden teórico. Los métodos de orden 4 (Ostrowski, Jarratt, Newton doble) convergen en menos iteraciones, y los óptimos lo hacen con menos evaluaciones. El caso de Traub con $f_3$ (58 iteraciones frente a las 6-7 del resto) muestra que la convergencia es local: un método excelente puede arrancar mal con cierta función y punto inicial.",
              eu: "ACOC-ek kasu guztietan ordena teorikoa erreproduzitzen du. 4. ordenako metodoek (Ostrowski, Jarratt, Newton bikoitza) iterazio gutxiagotan konbergitzen dute, eta optimoek ebaluazio gutxiagorekin. Traub-en kasuak $f_3$-rekin (58 iterazio, besteen 6-7en aldean) erakusten du konbergentzia lokala dela: metodo bikain batek gaizki abia daiteke funtzio eta hasierako puntu jakin batekin.",
              en: "The ACOC reproduces the theoretical order in every case. The order-4 methods (Ostrowski, Jarratt, double Newton) converge in fewer iterations, and the optimal ones do so with fewer evaluations. Traub's case with $f_3$ (58 iterations versus 6-7 for the rest) shows that convergence is local: an excellent method can start badly with a particular function and initial point."
            }
          },
          {
            kind: "callout",
            variant: "warning",
            title: {
              es: "Alcance de las conclusiones",
              eu: "Ondorioen irismena",
              en: "Scope of the conclusions"
            },
            text: {
              es: "Una comparativa numérica solo caracteriza a los métodos sobre las funciones de prueba y puntos iniciales usados. Para generalizar hay que comprobar que el comportamiento se mantiene sobre baterías amplias de problemas.",
              eu: "Konparatiba numeriko batek erabilitako proba-funtzioen eta hasierako puntuen gainean bakarrik karakterizatzen ditu metodoak. Orokortzeko, portaera problema-sorta zabaletan mantentzen dela egiaztatu behar da.",
              en: "A numerical comparison only characterizes the methods on the test functions and initial points used. To generalize, one must check that the behaviour holds over broad batteries of problems."
            }
          }
        ]
      }
    ]
  }
];
