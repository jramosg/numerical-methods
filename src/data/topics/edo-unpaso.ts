import type { ContentEntry } from "../content";

/**
 * One-step ODE methods (initial value problems I): the IVP itself, Euler
 * (explicit and implicit), Heun, classical Runge-Kutta, convergence and
 * numerical order estimation. Category "EDO" is shared with the multistep
 * methods (edo-multipaso.ts). All worked numbers verified by recomputation.
 */

export const edoUnpasoArticles: ContentEntry[] = [
  {
    slug: "edo-problemas-valor-inicial",
    category: "EDO",
    level: "base",
    searchIntent: "problema valor inicial PVI EDO Lipschitz sistemas orden superior",
    title: {
      es: "Problemas de valor inicial",
      eu: "Hasierako balioko problemak",
      en: "Initial value problems"
    },
    description: {
      es: "Qué es un PVI, cuándo tiene solución única (condición de Lipschitz), cómo se discretiza, y cómo los sistemas y las ecuaciones de orden superior se reducen al mismo esquema.",
      eu: "Zer den PVI bat, noiz duen soluzio bakarra (Lipschitz baldintza), nola diskretizatzen den, eta sistemak eta ordena handiagoko ekuazioak nola murrizten diren eskema berera.",
      en: "What an IVP is, when it has a unique solution (Lipschitz condition), how it is discretized, and how systems and higher-order equations reduce to the same scheme."
    },
    keywords: ["PVI", "problema de valor inicial", "Lipschitz", "sistemas de EDO", "orden superior"],
    prerequisites: ["fundamentos-taylor-truncamiento"],
    related: [
      "edo-metodo-euler",
      "edo-metodo-heun",
      "edo-metodo-runge-kutta",
      "edo-convergencia-orden",
      "edo-adams-bashforth"
    ],
    sections: [
      {
        heading: {
          es: "Qué es un problema de valor inicial",
          eu: "Zer den hasierako balioko problema bat",
          en: "What an initial value problem is"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Las ecuaciones diferenciales modelan sistemas dinámicos: la trayectoria de una partícula, la evolución de una temperatura, un circuito eléctrico o el crecimiento de una población. Un problema de valor inicial (PVI) combina la ecuación diferencial con el estado del sistema en el instante inicial:",
              eu: "Ekuazio diferentzialek sistema dinamikoak modelatzen dituzte: partikula baten ibilbidea, tenperatura baten bilakaera, zirkuitu elektriko bat edo populazio baten hazkundea. Hasierako balioko problema (PVI) batek ekuazio diferentziala eta sistemak hasierako unean duen egoera konbinatzen ditu:",
              en: "Differential equations model dynamical systems: the trajectory of a particle, the evolution of a temperature, an electrical circuit or the growth of a population. An initial value problem (IVP) combines the differential equation with the state of the system at the initial time:"
            }
          },
          {
            kind: "formula",
            tex: "y'(t)=f(t,y(t)),\\qquad t\\in[a,b],\\qquad y(a)=y_a"
          },
          {
            kind: "paragraph",
            text: {
              es: "Un ejemplo clásico es el modelo de Malthus para poblaciones, $y'(t)=k\\,y(t)$: la velocidad de crecimiento es proporcional al número de individuos (con $k<0$ describe desintegración o decaimiento). El modelo logístico o de Verhulst añade un término no lineal que frena el crecimiento cuando los recursos son limitados: $y'(t)=k\\,y(t)-p\\,y(t)^2$. Este último aparece como ejemplo recurrente en los métodos de esta sección.",
              eu: "Adibide klasiko bat populazioetarako Malthus eredua da, $y'(t)=k\\,y(t)$: hazkunde-abiadura banako kopuruaren proportzionala da ($k<0$ balioarekin desintegrazioa edo gainbehera deskribatzen du). Eredu logistikoak edo Verhulst-enak gai ez-lineal bat gehitzen du, baliabideak mugatuak direnean hazkundea balaztatzeko: $y'(t)=k\\,y(t)-p\\,y(t)^2$. Azken hori behin eta berriz agertuko da atal honetako metodoetan adibide gisa.",
              en: "A classic example is the Malthus population model, $y'(t)=k\\,y(t)$: the growth rate is proportional to the number of individuals (with $k<0$ it describes decay). The logistic or Verhulst model adds a nonlinear term that slows growth when resources are limited: $y'(t)=k\\,y(t)-p\\,y(t)^2$. The latter appears as a recurring example in the methods of this section."
            }
          }
        ]
      },
      {
        heading: {
          es: "Existencia y unicidad de solución",
          eu: "Soluzioaren existentzia eta bakartasuna",
          en: "Existence and uniqueness of the solution"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Antes de aproximar una solución conviene saber que existe y que es única. La condición clave es que $f$ no cambie demasiado deprisa respecto de $y$:",
              eu: "Soluzio bat hurbildu aurretik, komeni da jakitea existitzen dela eta bakarra dela. Funtsezko baldintza da $f$ ez aldatzea azkarregi $y$-rekiko:",
              en: "Before approximating a solution it helps to know that one exists and is unique. The key condition is that $f$ does not change too quickly with respect to $y$:"
            }
          },
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Existencia y unicidad (condición de Lipschitz)",
              eu: "Existentzia eta bakartasuna (Lipschitz baldintza)",
              en: "Existence and uniqueness (Lipschitz condition)"
            },
            text: {
              es: "Sea $D=\\{(t,y): t\\in[a,b],\\ y\\in\\mathbb{R}\\}$ y sea $f(t,y)$ continua en $D$. Si existe una constante $L>0$ tal que $|f(t,y_1)-f(t,y_2)|\\le L\\,|y_1-y_2|$ para todo par de puntos de $D$, entonces el PVI $y'=f(t,y)$, $y(a)=y_a$ tiene una solución única $y(t)$ en $[a,b]$.",
              eu: "Izan bedi $D=\\{(t,y): t\\in[a,b],\\ y\\in\\mathbb{R}\\}$ eta izan bedi $f(t,y)$ jarraitua $D$-n. Baldin badago $L>0$ konstante bat non $|f(t,y_1)-f(t,y_2)|\\le L\\,|y_1-y_2|$ betetzen den $D$-ko edozein puntu-bikoterentzat, orduan $y'=f(t,y)$, $y(a)=y_a$ PVIak soluzio bakarra du $[a,b]$-n.",
              en: "Let $D=\\{(t,y): t\\in[a,b],\\ y\\in\\mathbb{R}\\}$ and let $f(t,y)$ be continuous on $D$. If there is a constant $L>0$ such that $|f(t,y_1)-f(t,y_2)|\\le L\\,|y_1-y_2|$ for every pair of points in $D$, then the IVP $y'=f(t,y)$, $y(a)=y_a$ has a unique solution $y(t)$ on $[a,b]$."
            }
          }
        ]
      },
      {
        heading: {
          es: "De la solución continua a la solución discreta",
          eu: "Soluzio jarraitutik soluzio diskretura",
          en: "From the continuous to the discrete solution"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Las técnicas analíticas obtienen la solución continua $y(t)$, pero solo funcionan en familias concretas de ecuaciones. Los métodos numéricos aproximan la solución cuando el cálculo analítico no es posible o es demasiado costoso: producen una solución discreta $y_k\\approx y(t_k)$ sobre los nodos de una partición del intervalo.",
              eu: "Teknika analitikoek soluzio jarraitua $y(t)$ lortzen dute, baina ekuazio-familia jakinetan bakarrik funtzionatzen dute. Metodo numerikoek soluzioa hurbiltzen dute kalkulu analitikoa ezinezkoa edo garestiegia denean: soluzio diskretu bat $y_k\\approx y(t_k)$ sortzen dute tartearen partiketa baten nodoen gainean.",
              en: "Analytic techniques produce the continuous solution $y(t)$, but they only work for specific families of equations. Numerical methods approximate the solution when the analytic computation is impossible or too costly: they produce a discrete solution $y_k\\approx y(t_k)$ on the nodes of a partition of the interval."
            }
          },
          {
            kind: "formula",
            tex: "t_k=a+kh,\\qquad k=0,1,\\dots,N,\\qquad h=\\frac{b-a}{N}",
            caption: {
              es: "Discretización equiespaciada de $[a,b]$ en $N$ subintervalos de paso $h$.",
              eu: "$[a,b]$ tartearen diskretizazio ekiespaziatua, $h$ pausoko $N$ azpitartetan.",
              en: "Equally spaced discretization of $[a,b]$ into $N$ subintervals of step $h$."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Todos los métodos de esta área ([[edo-metodo-euler|Euler]], [[edo-metodo-heun|Heun]], [[edo-metodo-runge-kutta|Runge-Kutta]] y los [[edo-adams-bashforth|multipaso de Adams]]) siguen este esquema: parten de $y_0=y_a$ y avanzan nodo a nodo construyendo $y_{k+1}$ a partir de la información disponible.",
              eu: "Arlo honetako metodo guztiek ([[edo-metodo-euler|Euler]], [[edo-metodo-heun|Heun]], [[edo-metodo-runge-kutta|Runge-Kutta]] eta [[edo-adams-bashforth|Adams-en urrats anitzekoak]]) eskema honi jarraitzen diote: $y_0=y_a$-tik abiatu eta nodoz nodo aurrera egiten dute, eskuragarri dagoen informaziotik $y_{k+1}$ eraikiz.",
              en: "Every method in this area ([[edo-metodo-euler|Euler]], [[edo-metodo-heun|Heun]], [[edo-metodo-runge-kutta|Runge-Kutta]] and the [[edo-adams-bashforth|Adams multistep methods]]) follows this scheme: start from $y_0=y_a$ and advance node by node, building $y_{k+1}$ from the available information."
            }
          }
        ]
      },
      {
        heading: {
          es: "Sistemas de ecuaciones de primer orden",
          eu: "Lehen ordenako ekuazio-sistemak",
          en: "Systems of first-order equations"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Cuando varias magnitudes evolucionan acopladas (por ejemplo, poblaciones que interactúan), el PVI se formula con $m$ funciones incógnita $y_1,\\dots,y_m$ y una ecuación por cada una. Con notación vectorial $Y(t)=[y_1(t),\\dots,y_m(t)]^T$ el sistema se escribe exactamente igual que el caso escalar:",
              eu: "Hainbat magnitude elkarrekin lotuta eboluzionatzen dutenean (adibidez, elkarreragiten duten populazioak), PVIa $m$ funtzio ezezagunekin ($y_1,\\dots,y_m$) eta bakoitzeko ekuazio banarekin formulatzen da. $Y(t)=[y_1(t),\\dots,y_m(t)]^T$ bektore-notazioarekin sistema kasu eskalarraren berdin-berdin idazten da:",
              en: "When several quantities evolve together (for instance interacting populations), the IVP is stated with $m$ unknown functions $y_1,\\dots,y_m$ and one equation for each. With vector notation $Y(t)=[y_1(t),\\dots,y_m(t)]^T$ the system reads exactly like the scalar case:"
            }
          },
          {
            kind: "formula",
            tex: "Y'(t)=F\\bigl(t,Y(t)\\bigr),\\qquad Y(a)=\\bigl[y_{1,a},\\dots,y_{m,a}\\bigr]^T"
          },
          {
            kind: "paragraph",
            text: {
              es: "Esta notación no es solo estética: los métodos de un paso se aplican al sistema componente a componente sin ningún cambio conceptual, como muestra el [[ejercicio-sir-sistema|ejercicio del modelo epidémico SIR]].",
              eu: "Notazio hori ez da estetika hutsa: urrats bakarreko metodoak sistemari osagaiz osagai aplikatzen zaizkio inolako aldaketa kontzeptualik gabe, [[ejercicio-sir-sistema|SIR eredu epidemikoaren ariketak]] erakusten duen bezala.",
              en: "This notation is not just cosmetic: one-step methods apply to the system component by component with no conceptual change, as the [[ejercicio-sir-sistema|SIR epidemic model exercise]] shows."
            }
          }
        ]
      },
      {
        heading: {
          es: "Ecuaciones de orden superior",
          eu: "Ordena handiagoko ekuazioak",
          en: "Higher-order equations"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Una ecuación de orden $m$, $y^{(m)}(t)=f\\bigl(t,y,y',\\dots,y^{(m-1)}\\bigr)$, define un PVI si se conocen $y$ y sus derivadas hasta orden $m-1$ en el instante inicial. Para resolverla numéricamente se convierte en un sistema de primer orden:",
              eu: "$m$ ordenako ekuazio batek, $y^{(m)}(t)=f\\bigl(t,y,y',\\dots,y^{(m-1)}\\bigr)$, PVI bat definitzen du hasierako unean $y$ eta haren deribatuak $m-1$ ordenaraino ezagutzen badira. Numerikoki ebazteko, lehen ordenako sistema bihurtzen da:",
              en: "An order-$m$ equation, $y^{(m)}(t)=f\\bigl(t,y,y',\\dots,y^{(m-1)}\\bigr)$, defines an IVP when $y$ and its derivatives up to order $m-1$ are known at the initial time. To solve it numerically, convert it into a first-order system:"
            }
          },
          {
            kind: "steps",
            title: {
              es: "Reducción a sistema de primer orden",
              eu: "Lehen ordenako sistemara murriztea",
              en: "Reduction to a first-order system"
            },
            steps: [
              {
                text: {
                  es: "Se introducen variables nuevas: la función y sus derivadas sucesivas.",
                  eu: "Aldagai berriak sartzen dira: funtzioa eta haren deribatu jarraituak.",
                  en: "Introduce new variables: the function and its successive derivatives."
                },
                formula: "y_1(t)=y(t),\\quad y_2(t)=y'(t),\\quad \\dots,\\quad y_m(t)=y^{(m-1)}(t)"
              },
              {
                text: {
                  es: "Derivando cada variable nueva aparece la siguiente, y la última recoge la ecuación original.",
                  eu: "Aldagai berri bakoitza deribatzean hurrengoa agertzen da, eta azkenak jatorrizko ekuazioa jasotzen du.",
                  en: "Differentiating each new variable yields the next one, and the last one carries the original equation."
                },
                formula: "y_1'=y_2,\\quad y_2'=y_3,\\quad \\dots,\\quad y_m'=f\\bigl(t,y_1,\\dots,y_m\\bigr)"
              },
              {
                text: {
                  es: "Las condiciones iniciales de la ecuación se traducen directamente en las del sistema: $y_1(a)=y(a)$, $y_2(a)=y'(a)$, etcétera. La solución buscada es la primera componente, $y(t)=y_1(t)$.",
                  eu: "Ekuazioaren hasierako baldintzak zuzenean bihurtzen dira sistemarenak: $y_1(a)=y(a)$, $y_2(a)=y'(a)$, eta abar. Bilatzen den soluzioa lehen osagaia da, $y(t)=y_1(t)$.",
                  en: "The initial conditions of the equation translate directly into those of the system: $y_1(a)=y(a)$, $y_2(a)=y'(a)$, and so on. The sought solution is the first component, $y(t)=y_1(t)$."
                }
              }
            ]
          },
          {
            kind: "example",
            title: {
              es: "El péndulo como sistema",
              eu: "Pendulua sistema gisa",
              en: "The pendulum as a system"
            },
            statement: {
              es: "Escribir como sistema de primer orden la ecuación de un péndulo de longitud $L$, $\\theta''(t)-\\frac{g}{L}\\sin\\theta(t)=0$, con ángulo inicial $\\theta(0)=\\pi/6$ y velocidad angular inicial $\\theta'(0)=0$.",
              eu: "Idatzi lehen ordenako sistema gisa $L$ luzerako pendulu baten ekuazioa, $\\theta''(t)-\\frac{g}{L}\\sin\\theta(t)=0$, hasierako angelua $\\theta(0)=\\pi/6$ eta hasierako abiadura angeluarra $\\theta'(0)=0$ direla.",
              en: "Write as a first-order system the equation of a pendulum of length $L$, $\\theta''(t)-\\frac{g}{L}\\sin\\theta(t)=0$, with initial angle $\\theta(0)=\\pi/6$ and initial angular velocity $\\theta'(0)=0$."
            },
            steps: [
              {
                text: {
                  es: "Con $y_1=\\theta$ e $y_2=\\theta'$, la ecuación de segundo orden se convierte en dos ecuaciones de primer orden:",
                  eu: "$y_1=\\theta$ eta $y_2=\\theta'$ hartuta, bigarren ordenako ekuazioa lehen ordenako bi ekuazio bihurtzen da:",
                  en: "With $y_1=\\theta$ and $y_2=\\theta'$, the second-order equation becomes two first-order equations:"
                },
                formula: "\\begin{bmatrix} y_1' \\\\ y_2' \\end{bmatrix}=\\begin{bmatrix} y_2 \\\\ \\tfrac{g}{L}\\sin y_1 \\end{bmatrix}"
              }
            ],
            result: {
              text: {
                es: "Las condiciones iniciales del sistema son $y_1(0)=\\pi/6$, $y_2(0)=0$, y cualquier método de un paso puede integrarlo en forma vectorial.",
                eu: "Sistemaren hasierako baldintzak $y_1(0)=\\pi/6$ eta $y_2(0)=0$ dira, eta urrats bakarreko edozein metodok integra dezake bektore-forman.",
                en: "The initial conditions of the system are $y_1(0)=\\pi/6$, $y_2(0)=0$, and any one-step method can integrate it in vector form."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "edo-metodo-euler",
    category: "EDO",
    level: "medio",
    searchIntent: "método de Euler explícito implícito deducción orden ejemplo",
    title: {
      es: "Método de Euler",
      eu: "Euler-en metodoa",
      en: "Euler's method"
    },
    description: {
      es: "El método de un paso más simple: avanzar con la pendiente del nodo actual. Deducción completa por tres caminos (Taylor, cociente incremental e integración), orden, ejemplo a mano y la variante implícita.",
      eu: "Urrats bakarreko metodorik sinpleena: uneko nodoaren maldarekin aurrera egitea. Dedukzio osoa hiru bidetatik (Taylor, zatidura inkrementala eta integrazioa), ordena, eskuzko adibidea eta aldaera inplizitua.",
      en: "The simplest one-step method: advance with the slope at the current node. Full derivation along three routes (Taylor, incremental quotient and integration), order, a worked example and the implicit variant."
    },
    keywords: ["Euler", "Euler explícito", "Euler implícito", "PVI", "orden 1"],
    prerequisites: ["edo-problemas-valor-inicial", "fundamentos-taylor-truncamiento"],
    related: [
      "deduccion-euler",
      "deduccion-euler-implicito",
      "edo-metodo-heun",
      "edo-convergencia-orden",
      "ejercicio-edo-a-mano-euler-rk4",
      "ejercicio-euler-implicito-estabilidad",
      "ejercicio-orden-numerico-un-paso"
    ],
    sections: [
      {
        heading: {
          es: "La idea: avanzar con la pendiente actual",
          eu: "Ideia: uneko maldarekin aurrera egin",
          en: "The idea: advance with the current slope"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "En el nodo $t_k$ conocemos la aproximación $y_k$ y, con ella, la pendiente $f(t_k,y_k)$ que la ecuación asigna a la solución en ese punto. El método de Euler avanza en línea recta con esa pendiente durante todo el subintervalo:",
              eu: "$t_k$ nodoan $y_k$ hurbilketa ezagutzen dugu eta, harekin, ekuazioak puntu horretan soluzioari esleitzen dion $f(t_k,y_k)$ malda. Euler-en metodoak malda horrekin lerro zuzenean egiten du aurrera azpitarte osoan zehar:",
              en: "At node $t_k$ we know the approximation $y_k$ and, with it, the slope $f(t_k,y_k)$ that the equation assigns to the solution at that point. Euler's method advances in a straight line with that slope across the whole subinterval:"
            }
          },
          {
            kind: "formula",
            tex: "y_{k+1}=y_k+h\\,f(t_k,y_k),\\qquad k=0,1,\\dots,N-1",
            caption: {
              es: "Método de Euler explícito.",
              eu: "Euler-en metodo esplizitua.",
              en: "Explicit Euler method."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Es un método explícito: $y_{k+1}$ se calcula directamente a partir de $y_k$. Su interés no es la precisión (es el método de orden más bajo) sino que condensa las tres técnicas con las que se diseñan casi todos los métodos: desarrollos de Taylor, aproximación de la derivada y cuadraturas.",
              eu: "Metodo esplizitua da: $y_{k+1}$ zuzenean kalkulatzen da $y_k$-tik. Bere interesa ez da doitasuna (ordena baxueneko metodoa da), baizik eta ia metodo guztiak diseinatzeko erabiltzen diren hiru teknikak biltzen dituela: Taylor-en garapenak, deribatuaren hurbilketa eta kuadraturak.",
              en: "It is an explicit method: $y_{k+1}$ is computed directly from $y_k$. Its interest is not accuracy (it is the lowest-order method) but that it condenses the three techniques used to design almost every method: Taylor expansions, derivative approximation and quadrature."
            }
          }
        ]
      },
      {
        heading: {
          es: "Deducción",
          eu: "Dedukzioa",
          en: "Derivation"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La deducción completa, por los tres caminos y con el análisis del error que fija el orden del método, es la siguiente:",
              eu: "Dedukzio osoa, hiru bideetatik eta metodoaren ordena finkatzen duen errore-analisiarekin, honako hau da:",
              en: "The complete derivation, along all three routes and with the error analysis that fixes the order of the method, is the following:"
            }
          },
          { kind: "derivation", slug: "deduccion-euler" }
        ]
      },
      {
        heading: {
          es: "Orden del método",
          eu: "Metodoaren ordena",
          en: "Order of the method"
        },
        blocks: [
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Orden de Euler",
              eu: "Euler-en ordena",
              en: "Order of Euler"
            },
            text: {
              es: "Si $y\\in\\mathcal{C}^2[a,b]$, el error local del método de Euler es $\\mathcal{O}(h^2)$ y el error global es $E(h)=\\mathcal{O}(h)$: es un método de orden 1. Al duplicar el número de subintervalos, el error máximo se reduce aproximadamente a la mitad.",
              eu: "$y\\in\\mathcal{C}^2[a,b]$ bada, Euler-en metodoaren errore lokala $\\mathcal{O}(h^2)$ da eta errore globala $E(h)=\\mathcal{O}(h)$: 1. ordenako metodoa da. Azpitarte kopurua bikoiztean, errore maximoa gutxi gorabehera erdira murrizten da.",
              en: "If $y\\in\\mathcal{C}^2[a,b]$, the local error of Euler's method is $\\mathcal{O}(h^2)$ and the global error is $E(h)=\\mathcal{O}(h)$: it is a first-order method. Doubling the number of subintervals roughly halves the maximum error."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "El error global siempre pierde una unidad respecto al local: se cometen $N=\\frac{b-a}{h}$ errores locales, y su acumulación multiplica por un factor proporcional a $1/h$. La definición precisa de ambos errores y la estimación numérica del orden se tratan en [[edo-convergencia-orden]].",
              eu: "Errore globalak beti unitate bat galtzen du lokalaren aldean: $N=\\frac{b-a}{h}$ errore lokal egiten dira, eta haien metaketak $1/h$-ren proportzionala den faktore batez biderkatzen du. Bi erroreen definizio zehatza eta ordenaren estimazio numerikoa [[edo-convergencia-orden]] orrian lantzen dira.",
              en: "The global error always loses one unit with respect to the local one: $N=\\frac{b-a}{h}$ local errors are committed, and their accumulation multiplies by a factor proportional to $1/h$. The precise definition of both errors and the numerical estimation of the order are covered in [[edo-convergencia-orden]]."
            }
          }
        ]
      },
      {
        heading: {
          es: "Ejemplo a mano",
          eu: "Eskuzko adibidea",
          en: "Worked example"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Dos pasos de Euler en el modelo de Verhulst",
              eu: "Euler-en bi pauso Verhulst ereduan",
              en: "Two Euler steps on the Verhulst model"
            },
            statement: {
              es: "Aproximar con dos pasos de Euler la solución de $y'(t)=(3-0.1\\,y(t))\\,y(t)$ en $[0,2]$ con $y(0)=10$, cuya solución exacta es $y(t)=\\frac{30}{1+2e^{-3t}}$.",
              eu: "Hurbildu Euler-en bi pausorekin $y'(t)=(3-0.1\\,y(t))\\,y(t)$ ekuazioaren soluzioa $[0,2]$ tartean, $y(0)=10$ izanik; soluzio zehatza $y(t)=\\frac{30}{1+2e^{-3t}}$ da.",
              en: "Approximate with two Euler steps the solution of $y'(t)=(3-0.1\\,y(t))\\,y(t)$ on $[0,2]$ with $y(0)=10$, whose exact solution is $y(t)=\\frac{30}{1+2e^{-3t}}$."
            },
            steps: [
              {
                text: {
                  es: "Con $N=2$ el paso es $h=1$. Primer paso, desde $t_0=0$, $y_0=10$: la pendiente es $f(0,10)=(3-1)\\cdot 10=20$.",
                  eu: "$N=2$ hartuta pausoa $h=1$ da. Lehen pausoa, $t_0=0$, $y_0=10$-etik: malda $f(0,10)=(3-1)\\cdot 10=20$ da.",
                  en: "With $N=2$ the step is $h=1$. First step, from $t_0=0$, $y_0=10$: the slope is $f(0,10)=(3-1)\\cdot 10=20$."
                },
                formula: "y_1=y_0+h\\,f(t_0,y_0)=10+1\\cdot 20=30"
              },
              {
                text: {
                  es: "Segundo paso, desde $t_1=1$, $y_1=30$: ahora $f(1,30)=(3-3)\\cdot 30=0$, así que la solución numérica no se mueve.",
                  eu: "Bigarren pausoa, $t_1=1$, $y_1=30$-etik: orain $f(1,30)=(3-3)\\cdot 30=0$, beraz soluzio numerikoa ez da mugitzen.",
                  en: "Second step, from $t_1=1$, $y_1=30$: now $f(1,30)=(3-3)\\cdot 30=0$, so the numerical solution does not move."
                },
                formula: "y_2=y_1+h\\,f(t_1,y_1)=30+0=30"
              }
            ],
            result: {
              text: {
                es: "Comparando con la solución exacta, $y(1)=27.2833$ e $y(2)=29.8517$, el error máximo es $|27.2833-30|=2.7167$: exactamente la primera fila de la tabla del [[ejercicio-orden-numerico-un-paso|ejercicio de estimación del orden]].",
                eu: "Soluzio zehatzarekin alderatuta, $y(1)=27.2833$ eta $y(2)=29.8517$, errore maximoa $|27.2833-30|=2.7167$ da: [[ejercicio-orden-numerico-un-paso|ordena estimatzeko ariketako]] taularen lehen errenkada, hain zuzen.",
                en: "Comparing with the exact solution, $y(1)=27.2833$ and $y(2)=29.8517$, the maximum error is $|27.2833-30|=2.7167$: exactly the first row of the table in the [[ejercicio-orden-numerico-un-paso|order estimation exercise]]."
              }
            }
          }
        ]
      },
      {
        heading: {
          es: "Euler implícito",
          eu: "Euler inplizitua",
          en: "Implicit Euler"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Si en lugar de la pendiente al inicio del subintervalo se usa la pendiente al final, se obtiene el método de Euler implícito:",
              eu: "Azpitartearen hasierako malda erabili beharrean amaierakoa erabiltzen bada, Euler-en metodo inplizitua lortzen da:",
              en: "If instead of the slope at the start of the subinterval one uses the slope at the end, the implicit Euler method is obtained:"
            }
          },
          {
            kind: "formula",
            tex: "y_{k+1}=y_k+h\\,f(t_{k+1},y_{k+1})",
            caption: {
              es: "Método de Euler implícito.",
              eu: "Euler-en metodo inplizitua.",
              en: "Implicit Euler method."
            }
          },
          { kind: "derivation", slug: "deduccion-euler-implicito" },
          {
            kind: "paragraph",
            text: {
              es: "Como $y_{k+1}$ aparece en ambos lados, cada paso exige resolver la ecuación $g(y_{k+1})=y_{k+1}-y_k-h\\,f(t_{k+1},y_{k+1})=0$, normalmente con el [[no-lineales-newton-raphson|método de Newton-Raphson]]. A cambio, el método es mucho más estable: funciona con pasos grandes donde el explícito estalla, como muestra el [[ejercicio-euler-implicito-estabilidad|ejercicio de estabilidad]] y se estudia en general en [[edo-problemas-rigidos]].",
              eu: "$y_{k+1}$ bi aldeetan agertzen denez, pauso bakoitzak $g(y_{k+1})=y_{k+1}-y_k-h\\,f(t_{k+1},y_{k+1})=0$ ekuazioa ebaztea eskatzen du, normalean [[no-lineales-newton-raphson|Newton-Raphson metodoarekin]]. Trukean, metodoa askoz egonkorragoa da: pauso handiekin funtzionatzen du esplizitua lehertzen den lekuan, [[ejercicio-euler-implicito-estabilidad|egonkortasun-ariketak]] erakusten duen bezala eta [[edo-problemas-rigidos]] orrian orokorrean aztertzen den bezala.",
              en: "Since $y_{k+1}$ appears on both sides, each step requires solving the equation $g(y_{k+1})=y_{k+1}-y_k-h\\,f(t_{k+1},y_{k+1})=0$, usually with the [[no-lineales-newton-raphson|Newton-Raphson method]]. In exchange, the method is far more stable: it works with large steps where the explicit one blows up, as the [[ejercicio-euler-implicito-estabilidad|stability exercise]] shows and as studied in general in [[edo-problemas-rigidos]]."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "edo-metodo-heun",
    category: "EDO",
    level: "medio",
    searchIntent: "método de Heun deducción Taylor orden 2 trapecio predictor corrector",
    title: {
      es: "Método de Heun",
      eu: "Heun-en metodoa",
      en: "Heun's method"
    },
    description: {
      es: "Promediar la pendiente inicial y una pendiente predicha da un método de orden 2. Deducción completa por Taylor de orden dos y por la regla del trapecio con predicción de Euler.",
      eu: "Hasierako malda eta iragarritako malda bat batez bestekotzeak 2. ordenako metodoa ematen du. Dedukzio osoa bigarren ordenako Taylor bidez eta trapezio-erregelaren bidez, Euler-en iragarpenarekin.",
      en: "Averaging the initial slope and a predicted slope yields a second-order method. Full derivation via second-order Taylor and via the trapezoidal rule with an Euler prediction."
    },
    keywords: ["Heun", "Runge-Kutta 2", "orden 2", "trapecio", "predictor"],
    prerequisites: ["edo-metodo-euler"],
    related: [
      "deduccion-heun",
      "edo-metodo-runge-kutta",
      "edo-predictor-corrector",
      "ejercicio-orden-numerico-un-paso"
    ],
    sections: [
      {
        heading: {
          es: "Promediar dos pendientes",
          eu: "Bi malda batez bestekotu",
          en: "Averaging two slopes"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Euler usa solo la pendiente al inicio del subintervalo, y por eso se desvía en cuanto la solución se curva. El método de Heun corrige ese sesgo promediando la pendiente inicial con la pendiente en el punto al que llegaría Euler:",
              eu: "Euler-ek azpitartearen hasierako malda bakarrik erabiltzen du, eta horregatik desbideratzen da soluzioa kurbatu bezain laster. Heun-en metodoak alborapen hori zuzentzen du hasierako malda eta Euler-ek iritsiko litzatekeen puntuko malda batez bestekotuz:",
              en: "Euler uses only the slope at the start of the subinterval, which is why it drifts as soon as the solution curves. Heun's method corrects that bias by averaging the initial slope with the slope at the point Euler would reach:"
            }
          },
          {
            kind: "formula",
            tex: "y_{k+1}=y_k+\\frac{1}{2}k_1+\\frac{1}{2}k_2,\\qquad \\begin{aligned} k_1&=h\\,f(t_k,y_k)\\\\ k_2&=h\\,f(t_{k+1},\\,y_k+k_1) \\end{aligned}",
            caption: {
              es: "Método de Heun, orden 2.",
              eu: "Heun-en metodoa, 2. ordena.",
              en: "Heun's method, order 2."
            }
          }
        ]
      },
      {
        heading: {
          es: "Deducción",
          eu: "Dedukzioa",
          en: "Derivation"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Hay dos formas naturales de llegar a la fórmula: forzar que el esquema reproduzca el desarrollo de Taylor hasta orden dos, o aproximar la forma integral del PVI con la [[deduccion-integracion-trapecio|regla del trapecio]] y predecir el valor desconocido con Euler.",
              eu: "Bi bide natural daude formulara iristeko: eskemak Taylor-en garapena bigarren ordenaraino erreproduzitzera behartzea, edo PVIaren forma integrala [[deduccion-integracion-trapecio|trapezio-erregelarekin]] hurbiltzea eta balio ezezaguna Euler-ekin iragartzea.",
              en: "There are two natural routes to the formula: force the scheme to reproduce the Taylor expansion up to second order, or approximate the integral form of the IVP with the [[deduccion-integracion-trapecio|trapezoidal rule]] and predict the unknown value with Euler."
            }
          },
          { kind: "derivation", slug: "deduccion-heun" }
        ]
      },
      {
        heading: {
          es: "Orden y relación con otros métodos",
          eu: "Ordena eta beste metodoekiko lotura",
          en: "Order and relation to other methods"
        },
        blocks: [
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Orden de Heun",
              eu: "Heun-en ordena",
              en: "Order of Heun"
            },
            text: {
              es: "Si $y\\in\\mathcal{C}^3[a,b]$, el error local del método de Heun es $\\mathcal{O}(h^3)$ y el global es $E(h)=\\mathcal{O}(h^2)$: es un método de orden 2. Al duplicar $N$, el error se divide aproximadamente entre 4.",
              eu: "$y\\in\\mathcal{C}^3[a,b]$ bada, Heun-en metodoaren errore lokala $\\mathcal{O}(h^3)$ da eta globala $E(h)=\\mathcal{O}(h^2)$: 2. ordenako metodoa da. $N$ bikoiztean, errorea gutxi gorabehera 4z zatitzen da.",
              en: "If $y\\in\\mathcal{C}^3[a,b]$, the local error of Heun's method is $\\mathcal{O}(h^3)$ and the global one is $E(h)=\\mathcal{O}(h^2)$: it is a second-order method. Doubling $N$ divides the error roughly by 4."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Visto desde la segunda deducción, Heun es el par predictor-corrector más simple: predice con Euler y corrige con la regla del trapecio. Es la misma idea que, con métodos multipaso, produce los pares [[edo-predictor-corrector|Adams-Bashforth-Moulton]]. También es el miembro más popular de la familia de métodos de Runge-Kutta de dos etapas, y el paso natural hacia [[edo-metodo-runge-kutta|el Runge-Kutta clásico de orden 4]].",
              eu: "Bigarren dedukziotik begiratuta, Heun iragarle-zuzentzaile bikoterik sinpleena da: Euler-ekin iragartzen du eta trapezio-erregelarekin zuzentzen. Ideia bera da, urrats anitzeko metodoekin, [[edo-predictor-corrector|Adams-Bashforth-Moulton]] bikoteak sortzen dituena. Bi etapako Runge-Kutta metodoen familiako kide ezagunena ere bada, eta [[edo-metodo-runge-kutta|4. ordenako Runge-Kutta klasikorako]] bide naturala.",
              en: "Seen from the second derivation, Heun is the simplest predictor-corrector pair: it predicts with Euler and corrects with the trapezoidal rule. It is the same idea that, with multistep methods, produces the [[edo-predictor-corrector|Adams-Bashforth-Moulton]] pairs. It is also the best-known member of the two-stage Runge-Kutta family, and the natural step towards [[edo-metodo-runge-kutta|the classical fourth-order Runge-Kutta]]."
            }
          },
          {
            kind: "example",
            title: {
              es: "Un paso de Heun",
              eu: "Heun-en pauso bat",
              en: "One Heun step"
            },
            statement: {
              es: "Dar un paso de Heun con $h=1$ para $y'=(3-0.1y)y$, $y(0)=10$.",
              eu: "Eman Heun-en pauso bat $h=1$ hartuta, $y'=(3-0.1y)y$, $y(0)=10$ problemarako.",
              en: "Take one Heun step with $h=1$ for $y'=(3-0.1y)y$, $y(0)=10$."
            },
            steps: [
              {
                text: {
                  es: "Pendiente inicial: $k_1=h\\,f(0,10)=1\\cdot(3-1)\\cdot 10=20$.",
                  eu: "Hasierako malda: $k_1=h\\,f(0,10)=1\\cdot(3-1)\\cdot 10=20$.",
                  en: "Initial slope: $k_1=h\\,f(0,10)=1\\cdot(3-1)\\cdot 10=20$."
                }
              },
              {
                text: {
                  es: "Pendiente predicha en el punto de llegada de Euler, $y_0+k_1=30$: $k_2=h\\,f(1,30)=(3-3)\\cdot 30=0$.",
                  eu: "Iragarritako malda Euler-en iritsiera-puntuan, $y_0+k_1=30$: $k_2=h\\,f(1,30)=(3-3)\\cdot 30=0$.",
                  en: "Predicted slope at Euler's arrival point, $y_0+k_1=30$: $k_2=h\\,f(1,30)=(3-3)\\cdot 30=0$."
                }
              },
              {
                text: {
                  es: "Promedio de ambas pendientes:",
                  eu: "Bi malden batez bestekoa:",
                  en: "Average of both slopes:"
                },
                formula: "y_1=10+\\tfrac{1}{2}\\cdot 20+\\tfrac{1}{2}\\cdot 0=20"
              }
            ],
            result: {
              text: {
                es: "El valor exacto es $y(1)=27.2833$: con un solo paso el error sigue siendo grande, pero la tabla del [[ejercicio-orden-numerico-un-paso|ejercicio del orden]] muestra que al refinar la malla el error de Heun cae con $h^2$, mucho más deprisa que el de Euler.",
                eu: "Balio zehatza $y(1)=27.2833$ da: pauso bakarrarekin errorea handia da oraindik, baina [[ejercicio-orden-numerico-un-paso|ordenaren ariketako]] taulak erakusten du sarea findean Heun-en errorea $h^2$-rekin jaisten dela, Euler-ena baino askoz azkarrago.",
                en: "The exact value is $y(1)=27.2833$: with a single step the error is still large, but the table in the [[ejercicio-orden-numerico-un-paso|order exercise]] shows that as the mesh is refined Heun's error falls like $h^2$, much faster than Euler's."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "edo-metodo-runge-kutta",
    category: "EDO",
    level: "medio",
    searchIntent: "Runge-Kutta 4 RK4 deducción Simpson orden 4 sistemas",
    title: {
      es: "Método de Runge-Kutta (RK4)",
      eu: "Runge-Kutta metodoa (RK4)",
      en: "Runge-Kutta method (RK4)"
    },
    description: {
      es: "El Runge-Kutta clásico combina cuatro pendientes por paso para alcanzar orden 4. Deducción completa a partir de la regla de Simpson y extensión directa a sistemas de EDO.",
      eu: "Runge-Kutta klasikoak lau malda konbinatzen ditu pauso bakoitzeko, 4. ordena lortzeko. Dedukzio osoa Simpson-en erregelatik abiatuta eta EDO sistemetarako hedapen zuzena.",
      en: "The classical Runge-Kutta combines four slopes per step to reach order 4. Full derivation from Simpson's rule and direct extension to ODE systems."
    },
    keywords: ["Runge-Kutta", "RK4", "orden 4", "Simpson", "sistemas de EDO"],
    prerequisites: ["edo-metodo-heun"],
    related: [
      "deduccion-runge-kutta",
      "edo-adams-bashforth",
      "ejercicio-orden-numerico-un-paso",
      "ejercicio-sir-sistema",
      "ejercicio-edo-sistema-a-mano"
    ],
    sections: [
      {
        heading: {
          es: "Cuatro pendientes por paso",
          eu: "Lau malda pauso bakoitzeko",
          en: "Four slopes per step"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "El método de Runge-Kutta clásico de cuarto orden evalúa la pendiente $f$ cuatro veces por paso: una al inicio, dos en el punto medio y una al final, cada una usando la anterior para estimar dónde evaluar:",
              eu: "Laugarren ordenako Runge-Kutta metodo klasikoak $f$ malda lau aldiz ebaluatzen du pauso bakoitzeko: behin hasieran, bitan erdiko puntuan eta behin amaieran, bakoitzak aurrekoa erabiliz non ebaluatu estimatzeko:",
              en: "The classical fourth-order Runge-Kutta method evaluates the slope $f$ four times per step: once at the start, twice at the midpoint and once at the end, each using the previous one to estimate where to evaluate:"
            }
          },
          {
            kind: "formula",
            tex: "\\begin{aligned} k_1&=f(t_k,\\,y_k)\\\\ k_2&=f\\!\\left(t_k+\\tfrac{h}{2},\\,y_k+\\tfrac{h}{2}k_1\\right)\\\\ k_3&=f\\!\\left(t_k+\\tfrac{h}{2},\\,y_k+\\tfrac{h}{2}k_2\\right)\\\\ k_4&=f(t_k+h,\\,y_k+h\\,k_3) \\end{aligned}"
          },
          {
            kind: "formula",
            tex: "y_{k+1}=y_k+\\frac{h}{6}\\bigl(k_1+2k_2+2k_3+k_4\\bigr)",
            caption: {
              es: "Runge-Kutta clásico de orden 4 (RK4).",
              eu: "4. ordenako Runge-Kutta klasikoa (RK4).",
              en: "Classical fourth-order Runge-Kutta (RK4)."
            }
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Sobre la notación",
              eu: "Notazioari buruz",
              en: "About the notation"
            },
            text: {
              es: "Aquí las $k_i$ son pendientes (valores de $f$); en [[edo-metodo-heun]] se definieron como incrementos ($h$ por la pendiente). Ambos convenios aparecen en la literatura: basta comprobar si la fórmula final multiplica por $h$ o no.",
              eu: "Hemen $k_i$-ak maldak dira ($f$-ren balioak); [[edo-metodo-heun]] orrian inkrementu gisa definitu ziren ($h$ bider malda). Bi hitzarmenak agertzen dira literaturan: nahikoa da egiaztatzea azken formulak $h$-z biderkatzen duen ala ez.",
              en: "Here the $k_i$ are slopes (values of $f$); in [[edo-metodo-heun]] they were defined as increments ($h$ times the slope). Both conventions appear in the literature: just check whether the final formula multiplies by $h$ or not."
            }
          }
        ]
      },
      {
        heading: {
          es: "Deducción",
          eu: "Dedukzioa",
          en: "Derivation"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La estructura $1,2,2,1$ con denominador $6$ no es casual: son exactamente los pesos de la [[deduccion-integracion-simpson|regla de Simpson]] aplicada a la forma integral del PVI.",
              eu: "$1,2,2,1$ egitura $6$ izendatzailearekin ez da kasualitatea: [[deduccion-integracion-simpson|Simpson-en erregelaren]] pisuak dira, hain zuzen, PVIaren forma integralari aplikatuta.",
              en: "The $1,2,2,1$ structure with denominator $6$ is no accident: they are exactly the weights of [[deduccion-integracion-simpson|Simpson's rule]] applied to the integral form of the IVP."
            }
          },
          { kind: "derivation", slug: "deduccion-runge-kutta" }
        ]
      },
      {
        heading: {
          es: "Orden 4 y coste",
          eu: "4. ordena eta kostua",
          en: "Order 4 and cost"
        },
        blocks: [
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Orden de RK4",
              eu: "RK4-ren ordena",
              en: "Order of RK4"
            },
            text: {
              es: "Si $y\\in\\mathcal{C}^5[a,b]$, el error local de RK4 es $\\mathcal{O}(h^5)$ y el global es $E(h)=\\mathcal{O}(h^4)$. Al duplicar $N$, el error máximo se divide aproximadamente entre $2^4=16$.",
              eu: "$y\\in\\mathcal{C}^5[a,b]$ bada, RK4-ren errore lokala $\\mathcal{O}(h^5)$ da eta globala $E(h)=\\mathcal{O}(h^4)$. $N$ bikoiztean, errore maximoa gutxi gorabehera $2^4=16$-z zatitzen da.",
              en: "If $y\\in\\mathcal{C}^5[a,b]$, the local error of RK4 is $\\mathcal{O}(h^5)$ and the global one is $E(h)=\\mathcal{O}(h^4)$. Doubling $N$ divides the maximum error roughly by $2^4=16$."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "El precio del orden 4 son cuatro evaluaciones de $f$ por paso, frente a una de Euler. Cuando evaluar $f$ es caro, los métodos multipaso como [[edo-adams-bashforth|Adams-Bashforth]] reutilizan pendientes ya calculadas y logran orden alto con una única evaluación nueva por paso; a cambio necesitan que un método de un paso (habitualmente RK4) les proporcione los valores de arranque.",
              eu: "4. ordenaren prezioa $f$-ren lau ebaluazio dira pauso bakoitzeko, Euler-en bakarraren aldean. $f$ ebaluatzea garestia denean, [[edo-adams-bashforth|Adams-Bashforth]] bezalako urrats anitzeko metodoek dagoeneko kalkulatutako maldak berrerabiltzen dituzte eta ordena altua lortzen dute pauso bakoitzeko ebaluazio berri bakarrarekin; trukean, urrats bakarreko metodo batek (normalean RK4-k) abio-balioak eman behar dizkie.",
              en: "The price of order 4 is four evaluations of $f$ per step, versus one for Euler. When evaluating $f$ is expensive, multistep methods like [[edo-adams-bashforth|Adams-Bashforth]] reuse already-computed slopes and reach high order with a single new evaluation per step; in exchange they need a one-step method (usually RK4) to provide their starting values."
            }
          }
        ]
      },
      {
        heading: {
          es: "Sistemas de EDO",
          eu: "EDO sistemak",
          en: "ODE systems"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La extensión a [[edo-problemas-valor-inicial|sistemas de primer orden]] es inmediata: se sustituyen $y_k$ y $f$ por sus versiones vectoriales $Y_k$ y $F$, y las cuatro pendientes $K_1,\\dots,K_4$ pasan a ser vectores. Con Euler, por ejemplo, $Y_{k+1}=Y_k+h\\,F(t_k,Y_k)$. El [[ejercicio-sir-sistema|ejercicio del modelo SIR]] compara Euler, Heun y RK4 sobre el mismo sistema, y el [[ejercicio-edo-sistema-a-mano|ejercicio a mano]] integra una ecuación de segundo orden reducida a sistema.",
              eu: "[[edo-problemas-valor-inicial|Lehen ordenako sistemetarako]] hedapena berehalakoa da: $y_k$ eta $f$ beren bertsio bektorialekin ($Y_k$ eta $F$) ordezkatzen dira, eta lau maldak ($K_1,\\dots,K_4$) bektore bihurtzen dira. Euler-ekin, adibidez, $Y_{k+1}=Y_k+h\\,F(t_k,Y_k)$. [[ejercicio-sir-sistema|SIR ereduaren ariketak]] Euler, Heun eta RK4 alderatzen ditu sistema beraren gainean, eta [[ejercicio-edo-sistema-a-mano|eskuzko ariketak]] sistema bihurtutako bigarren ordenako ekuazio bat integratzen du.",
              en: "The extension to [[edo-problemas-valor-inicial|first-order systems]] is immediate: replace $y_k$ and $f$ by their vector versions $Y_k$ and $F$, and the four slopes $K_1,\\dots,K_4$ become vectors. With Euler, for instance, $Y_{k+1}=Y_k+h\\,F(t_k,Y_k)$. The [[ejercicio-sir-sistema|SIR model exercise]] compares Euler, Heun and RK4 on the same system, and the [[ejercicio-edo-sistema-a-mano|hand-computation exercise]] integrates a second-order equation reduced to a system."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "edo-convergencia-orden",
    category: "EDO",
    level: "avanzado",
    searchIntent: "convergencia consistencia error truncamiento local global orden numérico EDO",
    title: {
      es: "Convergencia, consistencia y orden",
      eu: "Konbergentzia, kontsistentzia eta ordena",
      en: "Convergence, consistency and order"
    },
    description: {
      es: "Errores de truncamiento local y global, definición de convergencia y consistencia, órdenes teóricos de los métodos de un paso y cómo estimar el orden numéricamente, con o sin solución exacta.",
      eu: "Trunkamendu-errore lokala eta globala, konbergentziaren eta kontsistentziaren definizioa, urrats bakarreko metodoen ordena teorikoak eta ordena numerikoki nola estimatu, soluzio zehatzarekin edo gabe.",
      en: "Local and global truncation errors, the definition of convergence and consistency, theoretical orders of the one-step methods and how to estimate the order numerically, with or without an exact solution."
    },
    keywords: ["convergencia", "consistencia", "error de truncamiento", "orden", "estimación numérica"],
    prerequisites: ["edo-metodo-euler", "fundamentos-errores"],
    related: [
      "edo-metodo-heun",
      "edo-metodo-runge-kutta",
      "ejercicio-orden-numerico-un-paso",
      "ejercicio-euler-implicito-estabilidad"
    ],
    sections: [
      {
        heading: {
          es: "Errores en la resolución numérica",
          eu: "Erroreak ebazpen numerikoan",
          en: "Errors in the numerical solution"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Al reemplazar un proceso infinito (el desarrollo de Taylor completo, la integral exacta) por uno finito, cada paso comete un error de truncamiento local $L_k(h)$. El error de truncamiento global acumula los $N$ errores locales:",
              eu: "Prozesu infinitu bat (Taylor-en garapen osoa, integral zehatza) prozesu finitu batez ordezkatzean, pauso bakoitzak $L_k(h)$ trunkamendu-errore lokala egiten du. Trunkamendu-errore globalak $N$ errore lokalak metatzen ditu:",
              en: "When an infinite process (the full Taylor expansion, the exact integral) is replaced by a finite one, each step commits a local truncation error $L_k(h)$. The global truncation error accumulates the $N$ local errors:"
            }
          },
          {
            kind: "formula",
            tex: "L(h)=\\frac{1}{h}\\max_{1\\le k\\le N}|L_k(h)|",
            caption: {
              es: "El error global pierde una potencia de $h$ respecto al local: acumular $N\\propto 1/h$ pasos multiplica por ese factor.",
              eu: "Errore globalak $h$-ren potentzia bat galtzen du lokalaren aldean: $N\\propto 1/h$ pauso metatzeak faktore horrez biderkatzen du.",
              en: "The global error loses one power of $h$ with respect to the local one: accumulating $N\\propto 1/h$ steps multiplies by that factor."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "A este error se suma el [[fundamentos-errores|error de redondeo]] de la aritmética finita. Si se conoce la solución exacta, el error total en cada nodo es $e_k=y(t_k)-y_k$.",
              eu: "Errore horri aritmetika finituaren [[fundamentos-errores|biribiltze-errorea]] gehitzen zaio. Soluzio zehatza ezagutzen bada, nodo bakoitzeko errore totala $e_k=y(t_k)-y_k$ da.",
              en: "To this error one adds the [[fundamentos-errores|round-off error]] of finite arithmetic. If the exact solution is known, the total error at each node is $e_k=y(t_k)-y_k$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Convergencia y consistencia",
          eu: "Konbergentzia eta kontsistentzia",
          en: "Convergence and consistency"
        },
        blocks: [
          {
            kind: "callout",
            variant: "definition",
            title: {
              es: "Convergencia y consistencia",
              eu: "Konbergentzia eta kontsistentzia",
              en: "Convergence and consistency"
            },
            text: {
              es: "Sea $y(t)$ la solución exacta del PVI e $y_k\\approx y(t_k)$ la solución discreta. El método converge si $\\lim_{h\\to 0}|e_k|=0$ para todos los nodos, y es consistente si $\\lim_{h\\to 0}\\max_{1\\le k\\le N}|L_k(h)|=0$: la fórmula reproduce la ecuación cuando el paso tiende a cero.",
              eu: "Izan bedi $y(t)$ PVIaren soluzio zehatza eta $y_k\\approx y(t_k)$ soluzio diskretua. Metodoa konbergentea da $\\lim_{h\\to 0}|e_k|=0$ bada nodo guztietan, eta kontsistentea da $\\lim_{h\\to 0}\\max_{1\\le k\\le N}|L_k(h)|=0$ bada: formulak ekuazioa erreproduzitzen du pausoa zerorantz doanean.",
              en: "Let $y(t)$ be the exact solution of the IVP and $y_k\\approx y(t_k)$ the discrete solution. The method converges if $\\lim_{h\\to 0}|e_k|=0$ at every node, and it is consistent if $\\lim_{h\\to 0}\\max_{1\\le k\\le N}|L_k(h)|=0$: the formula reproduces the equation as the step tends to zero.",
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "La consistencia mira un solo paso; la convergencia, el proceso completo. Para que un método consistente converja hace falta además estabilidad: que los errores no se amplifiquen al propagarse, cosa que puede fallar con pasos grandes incluso en métodos consistentes, como muestra el [[ejercicio-euler-implicito-estabilidad|ejercicio de estabilidad de Euler]].",
              eu: "Kontsistentziak pauso bakar bati begiratzen dio; konbergentziak, prozesu osoari. Metodo kontsistente batek konbergitzeko, gainera, egonkortasuna behar da: erroreak hedatzean ez handitzea. Hori huts egin dezake pauso handiekin, metodo kontsistenteetan ere, [[ejercicio-euler-implicito-estabilidad|Euler-en egonkortasun-ariketak]] erakusten duen bezala.",
              en: "Consistency looks at a single step; convergence, at the whole process. For a consistent method to converge, stability is also needed: errors must not be amplified as they propagate, which can fail with large steps even for consistent methods, as the [[ejercicio-euler-implicito-estabilidad|Euler stability exercise]] shows."
            }
          }
        ]
      },
      {
        heading: {
          es: "Órdenes teóricos",
          eu: "Ordena teorikoak",
          en: "Theoretical orders"
        },
        blocks: [
          {
            kind: "table",
            head: {
              es: ["Método", "Error local", "Error global (orden)"],
              eu: ["Metodoa", "Errore lokala", "Errore globala (ordena)"],
              en: ["Method", "Local error", "Global error (order)"]
            },
            rows: [
              ["[[edo-metodo-euler|Euler]]", "$\\mathcal{O}(h^2)$", "$\\mathcal{O}(h)$"],
              ["[[edo-metodo-euler|Euler implícito]]", "$\\mathcal{O}(h^2)$", "$\\mathcal{O}(h)$"],
              ["[[edo-metodo-heun|Heun]]", "$\\mathcal{O}(h^3)$", "$\\mathcal{O}(h^2)$"],
              ["[[edo-metodo-runge-kutta|RK4]]", "$\\mathcal{O}(h^5)$", "$\\mathcal{O}(h^4)$"]
            ],
            caption: {
              es: "Órdenes de los métodos de un paso (con $y$ suficientemente regular).",
              eu: "Urrats bakarreko metodoen ordenak ($y$ nahikoa erregularra izanik).",
              en: "Orders of the one-step methods (with $y$ sufficiently smooth)."
            }
          }
        ]
      },
      {
        heading: {
          es: "Estimación numérica del orden",
          eu: "Ordenaren estimazio numerikoa",
          en: "Numerical estimation of the order"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Si se conoce la solución exacta, se calcula el error máximo $E_N=\\max_{1\\le k\\le N}|y(t_k)-y_k|$ para varios valores de $N$, duplicando cada vez. El orden aparece como límite del cociente logarítmico:",
              eu: "Soluzio zehatza ezagutzen bada, errore maximoa $E_N=\\max_{1\\le k\\le N}|y(t_k)-y_k|$ kalkulatzen da $N$-ren hainbat baliotarako, aldiro bikoiztuz. Ordena zatidura logaritmikoaren limite gisa agertzen da:",
              en: "If the exact solution is known, compute the maximum error $E_N=\\max_{1\\le k\\le N}|y(t_k)-y_k|$ for several values of $N$, doubling each time. The order appears as the limit of the logarithmic ratio:"
            }
          },
          {
            kind: "formula",
            tex: "\\text{orden}\\;\\approx\\;\\log_2\\!\\left(\\frac{E_{N/2}}{E_N}\\right)"
          },
          {
            kind: "paragraph",
            text: {
              es: "Si no se conoce la solución exacta, se comparan dos soluciones discretas consecutivas: la de $N$ subintervalos contra la de $2N$ evaluada en los mismos nodos, $\\varepsilon_N=\\max_k\\bigl|y^{(N)}_k-y^{(2N)}_{2k}\\bigr|$, y se aplica el mismo cociente logarítmico a los $\\varepsilon_N$. El [[ejercicio-orden-numerico-un-paso|ejercicio de estimación del orden]] aplica ambas técnicas a Euler, Heun y RK4.",
              eu: "Soluzio zehatza ezagutzen ez bada, ondoz ondoko bi soluzio diskretu alderatzen dira: $N$ azpitartekoa eta $2N$-koa nodo berberetan ebaluatuta, $\\varepsilon_N=\\max_k\\bigl|y^{(N)}_k-y^{(2N)}_{2k}\\bigr|$, eta zatidura logaritmiko bera aplikatzen zaie $\\varepsilon_N$-ei. [[ejercicio-orden-numerico-un-paso|Ordena estimatzeko ariketak]] bi teknikak aplikatzen dizkie Euler, Heun eta RK4-ri.",
              en: "If the exact solution is unknown, compare two consecutive discrete solutions: the one with $N$ subintervals against the one with $2N$ evaluated at the same nodes, $\\varepsilon_N=\\max_k\\bigl|y^{(N)}_k-y^{(2N)}_{2k}\\bigr|$, and apply the same logarithmic ratio to the $\\varepsilon_N$. The [[ejercicio-orden-numerico-un-paso|order estimation exercise]] applies both techniques to Euler, Heun and RK4."
            }
          }
        ]
      }
    ]
  }
];

export const edoUnpasoDerivations: ContentEntry[] = [
  {
    slug: "deduccion-euler",
    category: "EDO",
    level: "medio",
    searchIntent: "deducción método Euler Taylor cociente incremental integración error",
    title: {
      es: "Deducción: método de Euler y su orden",
      eu: "Dedukzioa: Euler-en metodoa eta bere ordena",
      en: "Derivation: Euler's method and its order"
    },
    description: {
      es: "Tres caminos independientes llevan a la fórmula de Euler (Taylor, cociente incremental e integración), y el análisis del resto de Taylor demuestra que el método es de orden 1.",
      eu: "Hiru bide independentek Euler-en formulara eramaten dute (Taylor, zatidura inkrementala eta integrazioa), eta Taylor-en hondarraren analisiak metodoa 1. ordenakoa dela frogatzen du.",
      en: "Three independent routes lead to Euler's formula (Taylor, incremental quotient and integration), and the analysis of the Taylor remainder proves the method is first order."
    },
    keywords: ["deducción", "Euler", "Taylor", "error local", "orden 1"],
    prerequisites: ["fundamentos-taylor-truncamiento"],
    related: ["edo-metodo-euler", "deduccion-euler-implicito"],
    sections: [
      {
        heading: {
          es: "Camino 1: desarrollo de Taylor",
          eu: "1. bidea: Taylor-en garapena",
          en: "Route 1: Taylor expansion"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Desarrollamos la solución $y$ por [[fundamentos-taylor-truncamiento|Taylor]] alrededor de $t$, con el resto en forma de Lagrange ($\\xi$ entre $t$ y $t+h$):",
                  eu: "$y$ soluzioa [[fundamentos-taylor-truncamiento|Taylor]] bidez garatzen dugu $t$-ren inguruan, hondarra Lagrange eran idatzita ($\\xi$, $t$ eta $t+h$ artean):",
                  en: "Expand the solution $y$ by [[fundamentos-taylor-truncamiento|Taylor]] around $t$, with the Lagrange form of the remainder ($\\xi$ between $t$ and $t+h$):"
                },
                formula: "y(t+h)=y(t)+h\\,y'(t)+\\frac{h^2}{2}y''(\\xi)"
              },
              {
                text: {
                  es: "La ecuación diferencial nos da la derivada: $y'(t)=f(t,y(t))$. Sustituyendo:",
                  eu: "Ekuazio diferentzialak deribatua ematen digu: $y'(t)=f(t,y(t))$. Ordezkatuz:",
                  en: "The differential equation provides the derivative: $y'(t)=f(t,y(t))$. Substituting:"
                },
                formula: "y(t+h)=y(t)+h\\,f(t,y(t))+\\frac{h^2}{2}y''(\\xi)"
              },
              {
                text: {
                  es: "Descartamos el resto $\\frac{h^2}{2}y''(\\xi)$ (los términos de orden mayor o igual que 2) y evaluamos en los nodos $t=t_k$, con $y_k\\approx y(t_k)$: queda el esquema de Euler.",
                  eu: "Hondarra $\\frac{h^2}{2}y''(\\xi)$ baztertzen dugu (2. ordenako edo handiagoko gaiak) eta nodoetan ebaluatzen dugu, $t=t_k$ eta $y_k\\approx y(t_k)$ izanik: Euler-en eskema geratzen da.",
                  en: "Discard the remainder $\\frac{h^2}{2}y''(\\xi)$ (the terms of order at least 2) and evaluate at the nodes $t=t_k$, with $y_k\\approx y(t_k)$: Euler's scheme remains."
                },
                formula: "y_{k+1}=y_k+h\\,f(t_k,y_k)"
              }
            ]
          }
        ]
      },
      {
        heading: {
          es: "Camino 2: cociente incremental",
          eu: "2. bidea: zatidura inkrementala",
          en: "Route 2: incremental quotient"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "La derivada es el límite del cociente incremental; para $h$ pequeño, ese cociente la aproxima. Es exactamente la [[diferenciacion-primera-derivada|diferencia progresiva]] de primer orden:",
                  eu: "Deribatua zatidura inkrementalaren limitea da; $h$ txikirako, zatidura horrek hurbiltzen du. Lehen ordenako [[diferenciacion-primera-derivada|aurreranzko diferentzia]] da, hain zuzen:",
                  en: "The derivative is the limit of the incremental quotient; for small $h$, that quotient approximates it. This is exactly the first-order [[diferenciacion-primera-derivada|forward difference]]:"
                },
                formula: "y'(t)=\\lim_{h\\to 0}\\frac{y(t+h)-y(t)}{h}\\;\\Rightarrow\\; y'(t)\\approx\\frac{y(t+h)-y(t)}{h}"
              },
              {
                text: {
                  es: "Sustituyendo la aproximación en la ecuación $y'=f(t,y)$ y despejando $y(t+h)$ se recupera la misma fórmula:",
                  eu: "Hurbilketa $y'=f(t,y)$ ekuazioan ordezkatuz eta $y(t+h)$ askatuz, formula bera berreskuratzen da:",
                  en: "Substituting the approximation into the equation $y'=f(t,y)$ and solving for $y(t+h)$ recovers the same formula:"
                },
                formula: "\\frac{y(t+h)-y(t)}{h}\\approx f(t,y)\\;\\Rightarrow\\; y(t+h)\\approx y(t)+h\\,f(t,y)"
              }
            ]
          }
        ]
      },
      {
        heading: {
          es: "Camino 3: integración",
          eu: "3. bidea: integrazioa",
          en: "Route 3: integration"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Por el Teorema Fundamental del Cálculo, integrar la ecuación en $[t_k,t_{k+1}]$ da una igualdad exacta:",
                  eu: "Kalkuluaren Oinarrizko Teoremagatik, ekuazioa $[t_k,t_{k+1}]$-n integratzeak berdintza zehatza ematen du:",
                  en: "By the Fundamental Theorem of Calculus, integrating the equation over $[t_k,t_{k+1}]$ gives an exact identity:"
                },
                formula: "y(t_{k+1})=y(t_k)+\\int_{t_k}^{t_{k+1}} f\\bigl(\\tau,y(\\tau)\\bigr)\\,d\\tau"
              },
              {
                text: {
                  es: "Aproximamos el integrando por su valor en el extremo izquierdo — es decir, lo [[interpolacion-fundamentos|interpolamos]] con el polinomio constante $p_0(\\tau)=f(t_k,y(t_k))$ — e integramos ese rectángulo de base $h$:",
                  eu: "Integrakizuna ezkerreko muturreko balioaz hurbiltzen dugu — hau da, $p_0(\\tau)=f(t_k,y(t_k))$ polinomio konstantearekin [[interpolacion-fundamentos|interpolatzen]] dugu — eta $h$ oinarriko laukizuzen hori integratzen dugu:",
                  en: "Approximate the integrand by its value at the left endpoint — that is, [[interpolacion-fundamentos|interpolate]] it with the constant polynomial $p_0(\\tau)=f(t_k,y(t_k))$ — and integrate that rectangle of base $h$:"
                },
                formula: "\\int_{t_k}^{t_{k+1}} f\\bigl(\\tau,y(\\tau)\\bigr)\\,d\\tau\\;\\approx\\;(t_{k+1}-t_k)\\,f(t_k,y(t_k))=h\\,f(t_k,y(t_k))"
              },
              {
                text: {
                  es: "Sustituyendo en la igualdad integral aparece de nuevo el esquema de Euler. Aproximar el integrando con polinomios de grado mayor produce, por este mismo camino, [[edo-metodo-heun|Heun]] (trapecio), [[edo-metodo-runge-kutta|RK4]] (Simpson) y los métodos de [[edo-adams-bashforth|Adams]].",
                  eu: "Berdintza integralean ordezkatuz Euler-en eskema agertzen da berriro. Integrakizuna gradu handiagoko polinomioekin hurbiltzeak, bide beretik, [[edo-metodo-heun|Heun]] (trapezioa), [[edo-metodo-runge-kutta|RK4]] (Simpson) eta [[edo-adams-bashforth|Adams]] metodoak sortzen ditu.",
                  en: "Substituting into the integral identity yields Euler's scheme again. Approximating the integrand with higher-degree polynomials produces, along this same route, [[edo-metodo-heun|Heun]] (trapezoid), [[edo-metodo-runge-kutta|RK4]] (Simpson) and the [[edo-adams-bashforth|Adams]] methods."
                }
              }
            ]
          }
        ]
      },
      {
        heading: {
          es: "Error local, error global y orden",
          eu: "Errore lokala, errore globala eta ordena",
          en: "Local error, global error and order"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "El error local de un paso es exactamente el resto de Taylor descartado en el Camino 1 ($\\xi_k\\in\\,]t_k,t_{k+1}[$):",
                  eu: "Pauso baten errore lokala 1. bidean baztertutako Taylor-en hondarra da, hain zuzen ($\\xi_k\\in\\,]t_k,t_{k+1}[$):",
                  en: "The local error of one step is exactly the Taylor remainder discarded in Route 1 ($\\xi_k\\in\\,]t_k,t_{k+1}[$):"
                },
                formula: "e_{k+1}=y(t_{k+1})-\\bigl(y(t_k)+h\\,y'(t_k)\\bigr)=\\frac{h^2}{2}y''(\\xi_k)=\\mathcal{O}(h^2)"
              },
              {
                text: {
                  es: "Para el error global sumamos los $N$ errores locales. Como $y''$ es continua, el teorema del valor intermedio permite agrupar la suma en un único punto $\\xi\\in[a,b]$:",
                  eu: "Errore globalerako $N$ errore lokalak batzen ditugu. $y''$ jarraitua denez, tarteko balioaren teoremak batura puntu bakar batean biltzea ahalbidetzen du, $\\xi\\in[a,b]$:",
                  en: "For the global error, sum the $N$ local errors. Since $y''$ is continuous, the intermediate value theorem lets us collect the sum at a single point $\\xi\\in[a,b]$:"
                },
                formula: "\\sum_{k=0}^{N-1}\\frac{h^2}{2}y''(\\xi_k)=\\frac{h^2}{2}N\\,y''(\\xi)"
              },
              {
                text: {
                  es: "Con $N=\\frac{b-a}{h}$, una potencia de $h$ se cancela y queda el error global de orden 1: el método de Euler es de orden 1.",
                  eu: "$N=\\frac{b-a}{h}$ izanik, $h$-ren potentzia bat ezabatzen da eta 1. ordenako errore globala geratzen da: Euler-en metodoa 1. ordenakoa da.",
                  en: "With $N=\\frac{b-a}{h}$, one power of $h$ cancels and the first-order global error remains: Euler's method is first order."
                },
                formula: "\\frac{h^2}{2}\\,\\frac{b-a}{h}\\,y''(\\xi)=\\frac{b-a}{2}\\,y''(\\xi)\\,h=\\mathcal{O}(h)"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-euler-implicito",
    category: "EDO",
    level: "medio",
    searchIntent: "deducción Euler implícito diferencia regresiva ecuación no lineal",
    title: {
      es: "Deducción: Euler implícito",
      eu: "Dedukzioa: Euler inplizitua",
      en: "Derivation: implicit Euler"
    },
    description: {
      es: "Aproximar la derivada en el nodo nuevo con una diferencia regresiva produce el método de Euler implícito y la ecuación no lineal que hay que resolver en cada paso.",
      eu: "Nodo berriko deribatua atzeranzko diferentzia batez hurbiltzeak Euler-en metodo inplizitua eta pauso bakoitzean ebatzi beharreko ekuazio ez-lineala sortzen ditu.",
      en: "Approximating the derivative at the new node with a backward difference produces the implicit Euler method and the nonlinear equation to solve at each step."
    },
    keywords: ["deducción", "Euler implícito", "diferencia regresiva", "ecuación no lineal"],
    prerequisites: ["deduccion-euler"],
    related: ["edo-metodo-euler", "edo-problemas-rigidos"],
    sections: [
      {
        heading: {
          es: "Diferencia regresiva en el nodo nuevo",
          eu: "Atzeranzko diferentzia nodo berrian",
          en: "Backward difference at the new node"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "En lugar de aproximar la derivada en $t_k$ mirando hacia delante, la aproximamos en $t_{k+1}$ mirando hacia atrás, con la [[diferenciacion-primera-derivada|diferencia regresiva]]:",
                  eu: "Deribatua $t_k$-n aurrera begira hurbildu beharrean, $t_{k+1}$-en hurbiltzen dugu atzera begira, [[diferenciacion-primera-derivada|atzeranzko diferentziarekin]]:",
                  en: "Instead of approximating the derivative at $t_k$ looking forward, approximate it at $t_{k+1}$ looking backward, with the [[diferenciacion-primera-derivada|backward difference]]:"
                },
                formula: "y'(t_{k+1})\\approx\\frac{y(t_{k+1})-y(t_k)}{h}"
              },
              {
                text: {
                  es: "Sustituimos en la ecuación diferencial evaluada en el nodo nuevo, $y'(t_{k+1})=f\\bigl(t_{k+1},y(t_{k+1})\\bigr)$, y despejamos:",
                  eu: "Nodo berrian ebaluatutako ekuazio diferentzialean ordezkatzen dugu, $y'(t_{k+1})=f\\bigl(t_{k+1},y(t_{k+1})\\bigr)$, eta askatzen dugu:",
                  en: "Substitute into the differential equation evaluated at the new node, $y'(t_{k+1})=f\\bigl(t_{k+1},y(t_{k+1})\\bigr)$, and solve:"
                },
                formula: "y_{k+1}=y_k+h\\,f(t_{k+1},y_{k+1})"
              },
              {
                text: {
                  es: "El mismo esquema sale integrando la forma integral del PVI y aproximando el integrando por su valor en el extremo derecho (rectángulo por la derecha), en paralelo exacto al Camino 3 de la [[deduccion-euler|deducción del Euler explícito]].",
                  eu: "Eskema bera ateratzen da PVIaren forma integrala integratuz eta integrakizuna eskuineko muturreko balioaz hurbilduz (eskuineko laukizuzena), [[deduccion-euler|Euler esplizituaren dedukzioko]] 3. bidearen paralelo zehatzean.",
                  en: "The same scheme follows from the integral form of the IVP, approximating the integrand by its value at the right endpoint (right-hand rectangle), in exact parallel to Route 3 of the [[deduccion-euler|explicit Euler derivation]]."
                }
              },
              {
                text: {
                  es: "Como $y_{k+1}$ aparece dentro de $f$, cada paso exige resolver una ecuación (en general no lineal) en la incógnita $y_{k+1}$, por ejemplo con el [[no-lineales-newton-raphson|método de Newton-Raphson]]:",
                  eu: "$y_{k+1}$ $f$-ren barruan agertzen denez, pauso bakoitzak ekuazio bat (orokorrean ez-lineala) ebaztea eskatzen du $y_{k+1}$ ezezagunean, adibidez [[no-lineales-newton-raphson|Newton-Raphson metodoarekin]]:",
                  en: "Since $y_{k+1}$ appears inside $f$, each step requires solving an (in general nonlinear) equation in the unknown $y_{k+1}$, for instance with the [[no-lineales-newton-raphson|Newton-Raphson method]]:"
                },
                formula: "g(y_{k+1})=y_{k+1}-y_k-h\\,f(t_{k+1},y_{k+1})=0"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-heun",
    category: "EDO",
    level: "avanzado",
    searchIntent: "deducción Heun Taylor orden dos dos variables trapecio predictor",
    title: {
      es: "Deducción: método de Heun",
      eu: "Dedukzioa: Heun-en metodoa",
      en: "Derivation: Heun's method"
    },
    description: {
      es: "Deducción completa de Heun: por el desarrollo de Taylor hasta orden dos combinado con el Taylor en dos variables de f, y por la regla del trapecio con predicción de Euler.",
      eu: "Heun-en dedukzio osoa: bigarren ordenarainoko Taylor-en garapenaren bidez, f-ren bi aldagaiko Taylor-ekin konbinatuta, eta trapezio-erregelaren bidez Euler-en iragarpenarekin.",
      en: "Full derivation of Heun: via the Taylor expansion to second order combined with the two-variable Taylor of f, and via the trapezoidal rule with an Euler prediction."
    },
    keywords: ["deducción", "Heun", "Taylor dos variables", "trapecio", "predictor-corrector"],
    prerequisites: ["deduccion-euler", "fundamentos-taylor-truncamiento"],
    related: ["edo-metodo-heun", "deduccion-integracion-trapecio", "deduccion-am2"],
    sections: [
      {
        heading: {
          es: "Camino 1: Taylor hasta orden dos",
          eu: "1. bidea: Taylor bigarren ordenaraino",
          en: "Route 1: Taylor to second order"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Desarrollamos la solución por Taylor un orden más lejos que en Euler:",
                  eu: "Soluzioa Taylor bidez garatzen dugu Euler-en baino ordena bat urrunago:",
                  en: "Expand the solution by Taylor one order further than in Euler:"
                },
                formula: "y(t+h)=y(t)+h\\,y'(t)+\\frac{h^2}{2}y''(t)+\\mathcal{O}(h^3)"
              },
              {
                text: {
                  es: "Necesitamos $y''$. Derivando $y'(t)=f(t,y(t))$ con la regla de la cadena:",
                  eu: "$y''$ behar dugu. $y'(t)=f(t,y(t))$ kate-erregelarekin deribatuz:",
                  en: "We need $y''$. Differentiating $y'(t)=f(t,y(t))$ with the chain rule:"
                },
                formula: "y''(t)=\\frac{\\partial f}{\\partial t}(t,y)+\\frac{\\partial f}{\\partial y}(t,y)\\,y'(t)=f_t+f_y\\,f"
              },
              {
                text: {
                  es: "Sustituyendo $y'=f$ e $y''=f_t+f_y f$ en el desarrollo y agrupando mitad y mitad:",
                  eu: "$y'=f$ eta $y''=f_t+f_y f$ garapenean ordezkatuz eta erdi bana taldekatuz:",
                  en: "Substituting $y'=f$ and $y''=f_t+f_y f$ into the expansion and grouping half and half:"
                },
                formula: "y(t+h)=y(t)+\\frac{h}{2}f+\\frac{h}{2}\\Bigl(f+h\\,f_t+h\\,f\\,f_y\\Bigr)+\\mathcal{O}(h^3)"
              },
              {
                text: {
                  es: "El paréntesis coincide con un desarrollo de Taylor en dos variables de $f$. En general, $f(t+h,\\,y+k)=f+h\\,f_t+k\\,f_y+\\cdots$; eligiendo el incremento $k=h\\,f(t,y)$:",
                  eu: "Parentesia $f$-ren bi aldagaiko Taylor-en garapen batekin bat dator. Oro har, $f(t+h,\\,y+k)=f+h\\,f_t+k\\,f_y+\\cdots$; inkrementua $k=h\\,f(t,y)$ aukeratuz:",
                  en: "The bracket matches a two-variable Taylor expansion of $f$. In general, $f(t+h,\\,y+k)=f+h\\,f_t+k\\,f_y+\\cdots$; choosing the increment $k=h\\,f(t,y)$:"
                },
                formula: "f\\bigl(t+h,\\,y+h f(t,y)\\bigr)=f+h\\,f_t+h\\,f\\,f_y+\\mathcal{O}(h^2)"
              },
              {
                text: {
                  es: "Sustituyendo el paréntesis por esa evaluación (el error $h\\cdot\\mathcal{O}(h^2)$ se absorbe en $\\mathcal{O}(h^3)$):",
                  eu: "Parentesia ebaluazio horrekin ordezkatuz ($h\\cdot\\mathcal{O}(h^2)$ errorea $\\mathcal{O}(h^3)$-n xurgatzen da):",
                  en: "Replacing the bracket by that evaluation (the $h\\cdot\\mathcal{O}(h^2)$ error is absorbed into $\\mathcal{O}(h^3)$):"
                },
                formula: "y(t+h)=y(t)+\\frac{h}{2}f(t,y)+\\frac{h}{2}f\\bigl(t+h,\\,y+h f(t,y)\\bigr)+\\mathcal{O}(h^3)"
              },
              {
                text: {
                  es: "Evaluando en $t=t_k$ con $y_k\\approx y(t_k)$ y descartando $\\mathcal{O}(h^3)$ queda el método de Heun, con error local $\\mathcal{O}(h^3)$ y por tanto global $\\mathcal{O}(h^2)$:",
                  eu: "$t=t_k$-n ebaluatuz, $y_k\\approx y(t_k)$ izanik, eta $\\mathcal{O}(h^3)$ baztertuz Heun-en metodoa geratzen da, errore lokala $\\mathcal{O}(h^3)$ eta beraz globala $\\mathcal{O}(h^2)$ dituela:",
                  en: "Evaluating at $t=t_k$ with $y_k\\approx y(t_k)$ and discarding $\\mathcal{O}(h^3)$ yields Heun's method, with local error $\\mathcal{O}(h^3)$ and hence global error $\\mathcal{O}(h^2)$:"
                },
                formula: "y_{k+1}=y_k+\\frac{1}{2}\\underbrace{h f(t_k,y_k)}_{k_1}+\\frac{1}{2}\\underbrace{h f(t_{k+1},\\,y_k+k_1)}_{k_2}"
              }
            ]
          }
        ]
      },
      {
        heading: {
          es: "Camino 2: trapecio con predicción de Euler",
          eu: "2. bidea: trapezioa Euler-en iragarpenarekin",
          en: "Route 2: trapezoid with Euler prediction"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Partimos de la forma integral del PVI en un subintervalo y aproximamos la integral con la [[deduccion-integracion-trapecio|regla del trapecio]]:",
                  eu: "PVIaren forma integraletik abiatzen gara azpitarte batean eta integrala [[deduccion-integracion-trapecio|trapezio-erregelarekin]] hurbiltzen dugu:",
                  en: "Start from the integral form of the IVP on one subinterval and approximate the integral with the [[deduccion-integracion-trapecio|trapezoidal rule]]:"
                },
                formula: "y(t_{k+1})\\approx y_k+\\frac{h}{2}\\Bigl(f(t_k,y_k)+f\\bigl(t_{k+1},y(t_{k+1})\\bigr)\\Bigr)"
              },
              {
                text: {
                  es: "El valor $y(t_{k+1})$ del lado derecho es desconocido. En lugar de resolver la ecuación implícita (eso sería [[deduccion-am2|AM2, el trapecio implícito]]), lo predecimos con un paso de Euler:",
                  eu: "Eskuineko $y(t_{k+1})$ balioa ezezaguna da. Ekuazio inplizitua ebatzi beharrean (hori [[deduccion-am2|AM2, trapezio inplizitua]] litzateke), Euler-en pauso batekin iragartzen dugu:",
                  en: "The value $y(t_{k+1})$ on the right-hand side is unknown. Instead of solving the implicit equation (that would be [[deduccion-am2|AM2, the implicit trapezoid]]), predict it with one Euler step:"
                },
                formula: "\\bar y_{k+1}=y_k+h\\,f(t_k,y_k)"
              },
              {
                text: {
                  es: "Sustituyendo la predicción en el trapecio se obtiene exactamente la misma fórmula que por Taylor: Heun es un par predictor-corrector de un solo paso.",
                  eu: "Iragarpena trapezioan ordezkatuz Taylor bidez lortutako formula bera ateratzen da: Heun urrats bakarreko iragarle-zuzentzaile bikote bat da.",
                  en: "Substituting the prediction into the trapezoid gives exactly the same formula as via Taylor: Heun is a one-step predictor-corrector pair."
                },
                formula: "y_{k+1}=y_k+\\frac{h}{2}\\Bigl(f(t_k,y_k)+f(t_{k+1},\\bar y_{k+1})\\Bigr)"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-runge-kutta",
    category: "EDO",
    level: "avanzado",
    searchIntent: "deducción Runge-Kutta RK4 Simpson pendientes internas",
    title: {
      es: "Deducción: Runge-Kutta de orden 4",
      eu: "Dedukzioa: 4. ordenako Runge-Kutta",
      en: "Derivation: fourth-order Runge-Kutta"
    },
    description: {
      es: "Aplicar la regla de Simpson a la forma integral del PVI y aproximar las pendientes desconocidas con evaluaciones internas encadenadas produce el RK4 clásico y explica sus pesos 1, 2, 2, 1.",
      eu: "Simpson-en erregela PVIaren forma integralari aplikatzeak eta malda ezezagunak kateatutako barne-ebaluazioekin hurbiltzeak RK4 klasikoa sortzen du eta bere 1, 2, 2, 1 pisuak azaltzen ditu.",
      en: "Applying Simpson's rule to the integral form of the IVP and approximating the unknown slopes with chained internal evaluations produces the classical RK4 and explains its 1, 2, 2, 1 weights."
    },
    keywords: ["deducción", "Runge-Kutta", "RK4", "Simpson", "pesos"],
    prerequisites: ["deduccion-integracion-simpson", "deduccion-heun"],
    related: ["edo-metodo-runge-kutta", "deduccion-integracion-simpson"],
    sections: [
      {
        heading: {
          es: "Simpson sobre la forma integral",
          eu: "Simpson forma integralaren gainean",
          en: "Simpson on the integral form"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Integramos la ecuación diferencial en el subintervalo $[t_k,t_{k+1}]$:",
                  eu: "Ekuazio diferentziala $[t_k,t_{k+1}]$ azpitartean integratzen dugu:",
                  en: "Integrate the differential equation over the subinterval $[t_k,t_{k+1}]$:"
                },
                formula: "y(t_{k+1})=y(t_k)+\\int_{t_k}^{t_{k+1}} f\\bigl(\\tau,y(\\tau)\\bigr)\\,d\\tau"
              },
              {
                text: {
                  es: "Aproximamos la integral con la [[deduccion-integracion-simpson|regla de Simpson]], que usa los extremos y el punto medio $t_{k+\\frac12}=t_k+\\frac{h}{2}$:",
                  eu: "Integrala [[deduccion-integracion-simpson|Simpson-en erregelarekin]] hurbiltzen dugu, muturrak eta erdiko puntua $t_{k+\\frac12}=t_k+\\frac{h}{2}$ erabiltzen dituena:",
                  en: "Approximate the integral with [[deduccion-integracion-simpson|Simpson's rule]], which uses the endpoints and the midpoint $t_{k+\\frac12}=t_k+\\frac{h}{2}$:"
                },
                formula: "\\int_{t_k}^{t_{k+1}} f\\,d\\tau\\approx\\frac{h}{6}\\Bigl(f(t_k,y_k)+4f\\bigl(t_{k+\\frac12},y_{k+\\frac12}\\bigr)+f(t_{k+1},y_{k+1})\\Bigr)"
              },
              {
                text: {
                  es: "Problema: no conocemos ni $y_{k+\\frac12}$ ni $y_{k+1}$. La solución de Runge-Kutta es estimarlos con pendientes internas encadenadas, cada una construida avanzando con la anterior:",
                  eu: "Arazoa: ez dakigu ez $y_{k+\\frac12}$ ez $y_{k+1}$. Runge-Kuttaren irtenbidea kateatutako barne-maldekin estimatzea da, bakoitza aurrekoarekin aurrera eginez eraikia:",
                  en: "Problem: we know neither $y_{k+\\frac12}$ nor $y_{k+1}$. Runge-Kutta's solution is to estimate them with chained internal slopes, each built by advancing with the previous one:"
                },
                formula: "\\begin{aligned} k_1&=f(t_k,\\,y_k) && \\text{(pendiente en } t_k\\text{)}\\\\ k_2&=f\\bigl(t_k+\\tfrac{h}{2},\\,y_k+\\tfrac{h}{2}k_1\\bigr) && \\text{(1.ª estimación en el punto medio)}\\\\ k_3&=f\\bigl(t_k+\\tfrac{h}{2},\\,y_k+\\tfrac{h}{2}k_2\\bigr) && \\text{(2.ª estimación, reutilizando } k_2\\text{)}\\\\ k_4&=f(t_k+h,\\,y_k+h\\,k_3) && \\text{(estimación en } t_{k+1}\\text{)} \\end{aligned}"
              },
              {
                text: {
                  es: "La pendiente central de Simpson se aproxima promediando las dos estimaciones del punto medio, y la final con $k_4$:",
                  eu: "Simpson-en erdiko malda erdiko puntuko bi estimazioen batez bestekoaz hurbiltzen da, eta amaierakoa $k_4$-rekin:",
                  en: "Simpson's central slope is approximated by averaging the two midpoint estimates, and the final one by $k_4$:"
                },
                formula: "f\\bigl(t_{k+\\frac12},y_{k+\\frac12}\\bigr)\\approx\\frac{k_2+k_3}{2},\\qquad f(t_{k+1},y_{k+1})\\approx k_4"
              },
              {
                text: {
                  es: "Sustituyendo en Simpson, el peso $4$ del punto medio se reparte como $4\\cdot\\frac{k_2+k_3}{2}=2k_2+2k_3$, y aparece el RK4 clásico con sus pesos $1,2,2,1$:",
                  eu: "Simpson-en ordezkatuz, erdiko puntuaren $4$ pisua honela banatzen da: $4\\cdot\\frac{k_2+k_3}{2}=2k_2+2k_3$, eta RK4 klasikoa agertzen da bere $1,2,2,1$ pisuekin:",
                  en: "Substituting into Simpson, the midpoint weight $4$ splits as $4\\cdot\\frac{k_2+k_3}{2}=2k_2+2k_3$, and the classical RK4 appears with its $1,2,2,1$ weights:"
                },
                formula: "y_{k+1}=y_k+\\frac{h}{6}\\bigl(k_1+2k_2+2k_3+k_4\\bigr)"
              },
              {
                text: {
                  es: "Un análisis de Taylor análogo al de [[deduccion-heun|Heun]] (pero hasta orden cuatro) confirma que estas aproximaciones internas conservan el error local $\\mathcal{O}(h^5)$, de modo que el método es de orden 4.",
                  eu: "[[deduccion-heun|Heun-enaren]] antzeko Taylor-en analisi batek (baina laugarren ordenaraino) baieztatzen du barne-hurbilketa horiek $\\mathcal{O}(h^5)$ errore lokala mantentzen dutela, eta beraz metodoa 4. ordenakoa dela.",
                  en: "A Taylor analysis analogous to [[deduccion-heun|Heun's]] (but up to fourth order) confirms that these internal approximations preserve the $\\mathcal{O}(h^5)$ local error, so the method is fourth order."
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

export const edoUnpasoExercises: ContentEntry[] = [
  {
    slug: "ejercicio-edo-a-mano-euler-rk4",
    category: "EDO",
    level: "medio",
    searchIntent: "ejercicio resuelto Euler RK4 a mano EDO primer orden despejar",
    title: {
      es: "Ejercicio: Euler y RK4 a mano en una EDO de primer orden",
      eu: "Ariketa: Euler eta RK4 eskuz lehen ordenako EDO batean",
      en: "Exercise: Euler and RK4 by hand on a first-order ODE"
    },
    description: {
      es: "Despejar y'=f(t,y) en una EDO dada en forma implícita y aproximar y(3) con dos pasos de Euler y con un paso de RK4, comparando ambos resultados.",
      eu: "Forma inplizituan emandako EDO batean y'=f(t,y) askatu eta y(3) hurbildu Euler-en bi pausorekin eta RK4-ren pauso batekin, bi emaitzak alderatuz.",
      en: "Solve for y'=f(t,y) in an ODE given in implicit form and approximate y(3) with two Euler steps and one RK4 step, comparing both results."
    },
    keywords: ["ejercicio", "Euler", "RK4", "a mano", "EDO"],
    prerequisites: ["edo-metodo-euler", "edo-metodo-runge-kutta"],
    related: ["edo-metodo-euler", "edo-metodo-runge-kutta", "ejercicio-edo-sistema-a-mano"],
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
              es: "Se considera la EDO $y+(t^2y-t)\\,y'=0$ con $y(1)=2$, y se quiere aproximar $y(3)$. La ecuación no está en forma normal, así que primero se despeja $y'$:",
              eu: "$y+(t^2y-t)\\,y'=0$ EDOa hartzen da, $y(1)=2$ izanik, eta $y(3)$ hurbildu nahi da. Ekuazioa ez dago forma normalean, beraz lehenik $y'$ askatzen da:",
              en: "Consider the ODE $y+(t^2y-t)\\,y'=0$ with $y(1)=2$, and approximate $y(3)$. The equation is not in normal form, so first solve for $y'$:"
            }
          },
          {
            kind: "formula",
            tex: "y'=f(t,y)=\\frac{-y}{t^2y-t}"
          }
        ]
      },
      {
        heading: {
          es: "Dos pasos de Euler",
          eu: "Euler-en bi pauso",
          en: "Two Euler steps"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Euler con h=1",
              eu: "Euler h=1 hartuta",
              en: "Euler with h=1"
            },
            statement: {
              es: "Aplicar dos pasos del método de Euler explícito con $h=1$ desde $t_0=1$, $y_0=2$.",
              eu: "Aplikatu Euler esplizituaren bi pauso $h=1$ hartuta, $t_0=1$, $y_0=2$-tik abiatuta.",
              en: "Apply two steps of explicit Euler with $h=1$ from $t_0=1$, $y_0=2$."
            },
            steps: [
              {
                text: {
                  es: "Primer paso: en $(1,2)$ el denominador vale $1^2\\cdot 2-1=1$, así que $f(1,2)=-2/1=-2$.",
                  eu: "Lehen pausoa: $(1,2)$-n izendatzaileak $1^2\\cdot 2-1=1$ balio du, beraz $f(1,2)=-2/1=-2$.",
                  en: "First step: at $(1,2)$ the denominator is $1^2\\cdot 2-1=1$, so $f(1,2)=-2/1=-2$."
                },
                formula: "y_1=y_0+h\\,f(1,2)=2+1\\cdot(-2)=0"
              },
              {
                text: {
                  es: "Segundo paso: en $(2,0)$ el numerador es $-0=0$, luego $f(2,0)=0$ y la solución no cambia.",
                  eu: "Bigarren pausoa: $(2,0)$-n zenbakitzailea $-0=0$ da, beraz $f(2,0)=0$ eta soluzioa ez da aldatzen.",
                  en: "Second step: at $(2,0)$ the numerator is $-0=0$, hence $f(2,0)=0$ and the solution does not change."
                },
                formula: "y_2=y_1+h\\,f(2,0)=0+0=0"
              }
            ],
            result: {
              text: {
                es: "Euler con $h=1$ da $y(3)\\approx 0$. El paso es demasiado grande: el primer salto lleva la solución a $y=0$, un punto donde $f$ se anula y del que el método ya no sale.",
                eu: "Euler-ek $h=1$ hartuta $y(3)\\approx 0$ ematen du. Pausoa handiegia da: lehen jauziak soluzioa $y=0$-ra darama, non $f$ anulatzen den, eta metodoa ez da handik ateratzen.",
                en: "Euler with $h=1$ gives $y(3)\\approx 0$. The step is too large: the first jump takes the solution to $y=0$, a point where $f$ vanishes and from which the method never escapes."
              }
            }
          }
        ]
      },
      {
        heading: {
          es: "Un paso de Runge-Kutta",
          eu: "Runge-Kuttaren pauso bat",
          en: "One Runge-Kutta step"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "RK4 con h=2",
              eu: "RK4 h=2 hartuta",
              en: "RK4 with h=2"
            },
            statement: {
              es: "Aplicar un paso del método de Runge-Kutta clásico con $h=2$ desde $t_0=1$, $y_0=2$.",
              eu: "Aplikatu Runge-Kutta klasikoaren pauso bat $h=2$ hartuta, $t_0=1$, $y_0=2$-tik abiatuta.",
              en: "Apply one step of classical Runge-Kutta with $h=2$ from $t_0=1$, $y_0=2$."
            },
            steps: [
              {
                text: {
                  es: "Pendiente inicial: $k_1=f(1,2)=-2$.",
                  eu: "Hasierako malda: $k_1=f(1,2)=-2$.",
                  en: "Initial slope: $k_1=f(1,2)=-2$."
                }
              },
              {
                text: {
                  es: "Punto medio ($t=2$) avanzando con $k_1$: $y=2+1\\cdot(-2)=0$, luego $k_2=f(2,0)=0$.",
                  eu: "Erdiko puntua ($t=2$) $k_1$-ekin aurrera eginez: $y=2+1\\cdot(-2)=0$, beraz $k_2=f(2,0)=0$.",
                  en: "Midpoint ($t=2$) advancing with $k_1$: $y=2+1\\cdot(-2)=0$, so $k_2=f(2,0)=0$."
                }
              },
              {
                text: {
                  es: "Punto medio de nuevo, ahora con $k_2$: $y=2+1\\cdot 0=2$, luego $k_3=f(2,2)=\\frac{-2}{4\\cdot 2-2}=-\\frac{1}{3}$.",
                  eu: "Erdiko puntua berriro, orain $k_2$-rekin: $y=2+1\\cdot 0=2$, beraz $k_3=f(2,2)=\\frac{-2}{4\\cdot 2-2}=-\\frac{1}{3}$.",
                  en: "Midpoint again, now with $k_2$: $y=2+1\\cdot 0=2$, so $k_3=f(2,2)=\\frac{-2}{4\\cdot 2-2}=-\\frac{1}{3}$."
                }
              },
              {
                text: {
                  es: "Extremo final ($t=3$) con $k_3$: $y=2+2\\cdot(-\\tfrac13)=\\tfrac43$, luego $k_4=f\\bigl(3,\\tfrac43\\bigr)=\\frac{-4/3}{9\\cdot\\frac43-3}=-\\frac{4}{27}$.",
                  eu: "Amaierako muturra ($t=3$) $k_3$-rekin: $y=2+2\\cdot(-\\tfrac13)=\\tfrac43$, beraz $k_4=f\\bigl(3,\\tfrac43\\bigr)=\\frac{-4/3}{9\\cdot\\frac43-3}=-\\frac{4}{27}$.",
                  en: "Final endpoint ($t=3$) with $k_3$: $y=2+2\\cdot(-\\tfrac13)=\\tfrac43$, so $k_4=f\\bigl(3,\\tfrac43\\bigr)=\\frac{-4/3}{9\\cdot\\frac43-3}=-\\frac{4}{27}$."
                }
              },
              {
                text: {
                  es: "Combinación con pesos $1,2,2,1$:",
                  eu: "$1,2,2,1$ pisuekiko konbinazioa:",
                  en: "Combination with weights $1,2,2,1$:"
                },
                formula: "y_1=2+\\frac{2}{6}\\Bigl(-2+2\\cdot 0+2\\cdot\\bigl(-\\tfrac13\\bigr)-\\tfrac{4}{27}\\Bigr)=2-\\frac{76}{81}=\\frac{86}{81}"
              }
            ],
            result: {
              text: {
                es: "RK4 da $y(3)\\approx\\frac{86}{81}=1.0617$. Con el mismo número de evaluaciones que cuatro pasos de Euler, evita el colapso en $y=0$ y produce una aproximación razonable.",
                eu: "RK4-k $y(3)\\approx\\frac{86}{81}=1.0617$ ematen du. Euler-en lau pausoren ebaluazio kopuru berarekin, $y=0$-ko kolapsoa saihesten du eta hurbilketa arrazoizkoa ematen du.",
                en: "RK4 gives $y(3)\\approx\\frac{86}{81}=1.0617$. With the same number of evaluations as four Euler steps, it avoids the collapse at $y=0$ and produces a reasonable approximation."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-edo-sistema-a-mano",
    category: "EDO",
    level: "medio",
    searchIntent: "ejercicio resuelto EDO segundo orden sistema Euler RK4 a mano",
    title: {
      es: "Ejercicio: EDO de segundo orden como sistema, a mano",
      eu: "Ariketa: bigarren ordenako EDO sistema gisa, eskuz",
      en: "Exercise: second-order ODE as a system, by hand"
    },
    description: {
      es: "Reducir y''−sin y=0 a un sistema de primer orden y aproximar y(3) con dos pasos de Euler y con un paso de RK4 vectorial.",
      eu: "y''−sin y=0 lehen ordenako sistema batera murriztu eta y(3) hurbildu Euler-en bi pausorekin eta RK4 bektorialaren pauso batekin.",
      en: "Reduce y''−sin y=0 to a first-order system and approximate y(3) with two Euler steps and one vector RK4 step."
    },
    keywords: ["ejercicio", "segundo orden", "sistema", "Euler", "RK4"],
    prerequisites: ["edo-problemas-valor-inicial", "edo-metodo-runge-kutta"],
    related: ["edo-problemas-valor-inicial", "ejercicio-edo-a-mano-euler-rk4", "ejercicio-sir-sistema"],
    sections: [
      {
        heading: {
          es: "Reducción a sistema",
          eu: "Sistemara murriztea",
          en: "Reduction to a system"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Se considera $y''-\\sin y=0$ con $y(1)=2$ e $y'(1)=0$, y se quiere aproximar $y(3)$. Con las variables $y_1=y$, $y_2=y'$ de la [[edo-problemas-valor-inicial|reducción estándar]], el sistema y su condición inicial son:",
              eu: "$y''-\\sin y=0$ hartzen da, $y(1)=2$ eta $y'(1)=0$ izanik, eta $y(3)$ hurbildu nahi da. [[edo-problemas-valor-inicial|Murrizketa estandarreko]] $y_1=y$, $y_2=y'$ aldagaiekin, sistema eta hasierako baldintza hauek dira:",
              en: "Consider $y''-\\sin y=0$ with $y(1)=2$ and $y'(1)=0$, and approximate $y(3)$. With the variables $y_1=y$, $y_2=y'$ of the [[edo-problemas-valor-inicial|standard reduction]], the system and its initial condition are:"
            }
          },
          {
            kind: "formula",
            tex: "Y'=F(t,Y)=\\begin{bmatrix} y_2 \\\\ \\sin y_1 \\end{bmatrix},\\qquad Y(1)=\\begin{bmatrix} 2 \\\\ 0 \\end{bmatrix}"
          }
        ]
      },
      {
        heading: {
          es: "Dos pasos de Euler vectorial",
          eu: "Euler bektorialaren bi pauso",
          en: "Two vector Euler steps"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Euler con h=1",
              eu: "Euler h=1 hartuta",
              en: "Euler with h=1"
            },
            statement: {
              es: "Aplicar dos pasos de Euler explícito con $h=1$ al sistema, desde $Y_0=[2,0]^T$.",
              eu: "Aplikatu Euler esplizituaren bi pauso $h=1$ hartuta sistemari, $Y_0=[2,0]^T$-tik abiatuta.",
              en: "Apply two explicit Euler steps with $h=1$ to the system, from $Y_0=[2,0]^T$."
            },
            steps: [
              {
                text: {
                  es: "Primer paso: $F(1,[2,0]^T)=[0,\\ \\sin 2]^T=[0,\\ 0.9093]^T$.",
                  eu: "Lehen pausoa: $F(1,[2,0]^T)=[0,\\ \\sin 2]^T=[0,\\ 0.9093]^T$.",
                  en: "First step: $F(1,[2,0]^T)=[0,\\ \\sin 2]^T=[0,\\ 0.9093]^T$."
                },
                formula: "Y_1=\\begin{bmatrix}2\\\\0\\end{bmatrix}+1\\cdot\\begin{bmatrix}0\\\\0.9093\\end{bmatrix}=\\begin{bmatrix}2\\\\0.9093\\end{bmatrix}"
              },
              {
                text: {
                  es: "Segundo paso: $F(2,[2,\\ 0.9093]^T)=[0.9093,\\ \\sin 2]^T=[0.9093,\\ 0.9093]^T$.",
                  eu: "Bigarren pausoa: $F(2,[2,\\ 0.9093]^T)=[0.9093,\\ \\sin 2]^T=[0.9093,\\ 0.9093]^T$.",
                  en: "Second step: $F(2,[2,\\ 0.9093]^T)=[0.9093,\\ \\sin 2]^T=[0.9093,\\ 0.9093]^T$."
                },
                formula: "Y_2=\\begin{bmatrix}2\\\\0.9093\\end{bmatrix}+\\begin{bmatrix}0.9093\\\\0.9093\\end{bmatrix}=\\begin{bmatrix}2.9093\\\\1.8186\\end{bmatrix}"
              }
            ],
            result: {
              text: {
                es: "La primera componente aproxima la solución: $y(3)\\approx 2.9093$.",
                eu: "Lehen osagaiak soluzioa hurbiltzen du: $y(3)\\approx 2.9093$.",
                en: "The first component approximates the solution: $y(3)\\approx 2.9093$."
              }
            }
          }
        ]
      },
      {
        heading: {
          es: "Un paso de RK4 vectorial",
          eu: "RK4 bektorialaren pauso bat",
          en: "One vector RK4 step"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "RK4 con h=2",
              eu: "RK4 h=2 hartuta",
              en: "RK4 with h=2"
            },
            statement: {
              es: "Aplicar un paso de RK4 con $h=2$ al mismo sistema, desde $Y_0=[2,0]^T$ en $t_0=1$.",
              eu: "Aplikatu RK4-ren pauso bat $h=2$ hartuta sistema berari, $Y_0=[2,0]^T$-tik $t_0=1$-ean.",
              en: "Apply one RK4 step with $h=2$ to the same system, from $Y_0=[2,0]^T$ at $t_0=1$."
            },
            steps: [
              {
                text: {
                  es: "$K_1=F(1,[2,\\ 0]^T)=[0,\\ 0.9093]^T$.",
                  eu: "$K_1=F(1,[2,\\ 0]^T)=[0,\\ 0.9093]^T$.",
                  en: "$K_1=F(1,[2,\\ 0]^T)=[0,\\ 0.9093]^T$."
                }
              },
              {
                text: {
                  es: "$K_2=F\\bigl(2,\\ [2,0]^T+1\\cdot K_1\\bigr)=F(2,[2,\\ 0.9093]^T)=[0.9093,\\ 0.9093]^T$.",
                  eu: "$K_2=F\\bigl(2,\\ [2,0]^T+1\\cdot K_1\\bigr)=F(2,[2,\\ 0.9093]^T)=[0.9093,\\ 0.9093]^T$.",
                  en: "$K_2=F\\bigl(2,\\ [2,0]^T+1\\cdot K_1\\bigr)=F(2,[2,\\ 0.9093]^T)=[0.9093,\\ 0.9093]^T$."
                }
              },
              {
                text: {
                  es: "$K_3=F\\bigl(2,\\ [2,0]^T+1\\cdot K_2\\bigr)=F(2,[2.9093,\\ 0.9093]^T)=[0.9093,\\ 0.2302]^T$, porque $\\sin 2.9093=0.2302$.",
                  eu: "$K_3=F\\bigl(2,\\ [2,0]^T+1\\cdot K_2\\bigr)=F(2,[2.9093,\\ 0.9093]^T)=[0.9093,\\ 0.2302]^T$, $\\sin 2.9093=0.2302$ delako.",
                  en: "$K_3=F\\bigl(2,\\ [2,0]^T+1\\cdot K_2\\bigr)=F(2,[2.9093,\\ 0.9093]^T)=[0.9093,\\ 0.2302]^T$, because $\\sin 2.9093=0.2302$."
                }
              },
              {
                text: {
                  es: "$K_4=F\\bigl(3,\\ [2,0]^T+2\\cdot K_3\\bigr)=F(3,[3.8186,\\ 0.4604]^T)=[0.4604,\\ -0.6265]^T$.",
                  eu: "$K_4=F\\bigl(3,\\ [2,0]^T+2\\cdot K_3\\bigr)=F(3,[3.8186,\\ 0.4604]^T)=[0.4604,\\ -0.6265]^T$.",
                  en: "$K_4=F\\bigl(3,\\ [2,0]^T+2\\cdot K_3\\bigr)=F(3,[3.8186,\\ 0.4604]^T)=[0.4604,\\ -0.6265]^T$."
                }
              },
              {
                text: {
                  es: "Combinación final componente a componente:",
                  eu: "Amaierako konbinazioa osagaiz osagai:",
                  en: "Final combination component by component:"
                },
                formula: "Y_1=Y_0+\\frac{2}{6}\\bigl(K_1+2K_2+2K_3+K_4\\bigr)=\\begin{bmatrix}3.3659\\\\0.8540\\end{bmatrix}"
              }
            ],
            result: {
              text: {
                es: "RK4 da $y(3)\\approx 3.3659$ (y $y'(3)\\approx 0.8540$). De nuevo el método de orden alto corrige sustancialmente la estimación de Euler con el mismo coste en evaluaciones.",
                eu: "RK4-k $y(3)\\approx 3.3659$ ematen du (eta $y'(3)\\approx 0.8540$). Berriro ere, ordena altuko metodoak nabarmen zuzentzen du Euler-en estimazioa, ebaluazio-kostu berarekin.",
                en: "RK4 gives $y(3)\\approx 3.3659$ (and $y'(3)\\approx 0.8540$). Once more the high-order method substantially corrects Euler's estimate at the same evaluation cost."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-orden-numerico-un-paso",
    category: "EDO",
    level: "avanzado",
    searchIntent: "ejercicio estimar orden numérico Euler Heun RK4 Verhulst tabla errores",
    title: {
      es: "Ejercicio: estimación numérica del orden (Euler, Heun, RK4)",
      eu: "Ariketa: ordenaren estimazio numerikoa (Euler, Heun, RK4)",
      en: "Exercise: numerical order estimation (Euler, Heun, RK4)"
    },
    description: {
      es: "Sobre el mismo PVI logístico se estima el orden de Euler con la solución exacta, el de Heun comparando mallas sucesivas sin solución exacta, y el de RK4, confirmando los órdenes 1, 2 y 4.",
      eu: "PVI logistiko beraren gainean Euler-en ordena estimatzen da soluzio zehatzarekin, Heun-ena ondoz ondoko sareak alderatuz soluzio zehatzik gabe, eta RK4-rena, 1, 2 eta 4 ordenak baieztatuz.",
      en: "On the same logistic IVP, Euler's order is estimated with the exact solution, Heun's by comparing successive meshes without an exact solution, and RK4's, confirming orders 1, 2 and 4."
    },
    keywords: ["ejercicio", "orden numérico", "Euler", "Heun", "RK4", "Verhulst"],
    prerequisites: ["edo-convergencia-orden"],
    related: ["edo-convergencia-orden", "edo-metodo-euler", "edo-metodo-heun", "edo-metodo-runge-kutta", "ejercicio-ab2-verhulst"],
    sections: [
      {
        heading: {
          es: "El problema de referencia",
          eu: "Erreferentziazko problema",
          en: "The reference problem"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Se usa el PVI logístico (Verhulst) $y'(t)=(3-0.1\\,y)\\,y$ en $[0,2]$ con $y(0)=10$, cuya solución exacta se conoce y permite medir errores reales:",
              eu: "PVI logistikoa (Verhulst) erabiltzen da: $y'(t)=(3-0.1\\,y)\\,y$, $[0,2]$ tartean, $y(0)=10$ izanik; haren soluzio zehatza ezaguna da eta benetako erroreak neurtzea ahalbidetzen du:",
              en: "The logistic (Verhulst) IVP $y'(t)=(3-0.1\\,y)\\,y$ on $[0,2]$ with $y(0)=10$ is used; its exact solution is known and allows measuring true errors:"
            }
          },
          {
            kind: "formula",
            tex: "y(t)=\\frac{30}{1+2e^{-3t}}"
          },
          {
            kind: "paragraph",
            text: {
              es: "Cada método se ejecuta con $N=\\{2,4,8,16,32,64\\}$ subintervalos y se aplica el cociente logarítmico de [[edo-convergencia-orden]] a los errores máximos.",
              eu: "Metodo bakoitza $N=\\{2,4,8,16,32,64\\}$ azpitarterekin exekutatzen da eta [[edo-convergencia-orden]] orriko zatidura logaritmikoa aplikatzen zaie errore maximoei.",
              en: "Each method is run with $N=\\{2,4,8,16,32,64\\}$ subintervals and the logarithmic ratio from [[edo-convergencia-orden]] is applied to the maximum errors."
            }
          }
        ]
      },
      {
        heading: {
          es: "Euler, con solución exacta",
          eu: "Euler, soluzio zehatzarekin",
          en: "Euler, with the exact solution"
        },
        blocks: [
          {
            kind: "table",
            head: {
              es: ["N", "Error máximo $E_N$", "$\\log_2(E_{N/2}/E_N)$"],
              eu: ["N", "Errore maximoa $E_N$", "$\\log_2(E_{N/2}/E_N)$"],
              en: ["N", "Maximum error $E_N$", "$\\log_2(E_{N/2}/E_N)$"]
            },
            rows: [
              ["2", "2.7167", "—"],
              ["4", "2.7167", "0.0000"],
              ["8", "1.0659", "1.3497"],
              ["16", "0.4878", "1.1277"],
              ["32", "0.2361", "1.0467"],
              ["64", "0.1164", "1.0202"]
            ],
            caption: {
              es: "Errores de Euler frente a la solución exacta.",
              eu: "Euler-en erroreak soluzio zehatzaren aldean.",
              en: "Euler errors against the exact solution."
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
              es: "La columna del orden tiende a 1, el orden teórico de Euler. Las dos primeras filas (mallas muy gruesas) aún no están en régimen asintótico: la estimación solo es fiable cuando $h$ es suficientemente pequeño.",
              eu: "Ordenaren zutabea 1erantz doa, Euler-en ordena teorikoa. Lehen bi errenkadak (sare oso lodiak) oraindik ez daude erregimen asintotikoan: estimazioa fidagarria da soilik $h$ nahikoa txikia denean.",
              en: "The order column tends to 1, Euler's theoretical order. The first two rows (very coarse meshes) are not yet in the asymptotic regime: the estimate is only reliable once $h$ is small enough."
            }
          }
        ]
      },
      {
        heading: {
          es: "Heun, sin solución exacta",
          eu: "Heun, soluzio zehatzik gabe",
          en: "Heun, without the exact solution"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Para ilustrar la técnica que no necesita la solución exacta, con Heun se compara cada solución discreta con la de malla doble en los nodos comunes, $\\varepsilon_N=\\max_k|y^{(N)}_k-y^{(2N)}_{2k}|$:",
              eu: "Soluzio zehatzik behar ez duen teknika erakusteko, Heun-ekin soluzio diskretu bakoitza sare bikoitzekoarekin alderatzen da nodo komunetan, $\\varepsilon_N=\\max_k|y^{(N)}_k-y^{(2N)}_{2k}|$:",
              en: "To illustrate the technique that needs no exact solution, with Heun each discrete solution is compared with the double-mesh one at the common nodes, $\\varepsilon_N=\\max_k|y^{(N)}_k-y^{(2N)}_{2k}|$:"
            }
          },
          {
            kind: "table",
            head: {
              es: ["N", "$\\varepsilon_N$", "$\\log_2(\\varepsilon_{N/2}/\\varepsilon_N)$"],
              eu: ["N", "$\\varepsilon_N$", "$\\log_2(\\varepsilon_{N/2}/\\varepsilon_N)$"],
              en: ["N", "$\\varepsilon_N$", "$\\log_2(\\varepsilon_{N/2}/\\varepsilon_N)$"]
            },
            rows: [
              ["4", "18.2934", "—"],
              ["8", "1.9319", "3.2432"],
              ["16", "0.3288", "2.5549"],
              ["32", "0.0686", "2.2603"],
              ["64", "0.0158", "2.1154"]
            ],
            caption: {
              es: "Diferencias entre mallas sucesivas con Heun.",
              eu: "Ondoz ondoko sareen arteko diferentziak Heun-ekin.",
              en: "Differences between successive meshes with Heun."
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
              es: "La estimación tiende a 2, el orden de Heun, sin haber usado la solución exacta en ningún momento. Esta es la técnica disponible en problemas reales.",
              eu: "Estimazioa 2rantz doa, Heun-en ordena, soluzio zehatza inoiz erabili gabe. Hau da benetako problemetan eskuragarri dagoen teknika.",
              en: "The estimate tends to 2, Heun's order, without ever using the exact solution. This is the technique available in real problems."
            }
          }
        ]
      },
      {
        heading: {
          es: "Runge-Kutta 4",
          eu: "Runge-Kutta 4",
          en: "Runge-Kutta 4"
        },
        blocks: [
          {
            kind: "table",
            head: {
              es: ["N", "Error máximo $E_N$", "$\\log_2(E_{N/2}/E_N)$"],
              eu: ["N", "Errore maximoa $E_N$", "$\\log_2(E_{N/2}/E_N)$"],
              en: ["N", "Maximum error $E_N$", "$\\log_2(E_{N/2}/E_N)$"]
            },
            rows: [
              ["2", "4.7316", "—"],
              ["4", "0.1442", "5.0362"],
              ["8", "6.531·10⁻³", "4.4646"],
              ["16", "3.469·10⁻⁴", "4.2347"],
              ["32", "1.992·10⁻⁵", "4.1223"],
              ["64", "1.192·10⁻⁶", "4.0624"]
            ],
            caption: {
              es: "Errores de RK4 frente a la solución exacta.",
              eu: "RK4-ren erroreak soluzio zehatzaren aldean.",
              en: "RK4 errors against the exact solution."
            }
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Conclusión",
              eu: "Ondorioa",
              en: "Conclusion"
            },
            text: {
              es: "Los tres métodos confirman numéricamente sus órdenes teóricos: 1, 2 y 4. Obsérvese la escala: con $N=64$, Euler tiene un error de $0.1164$ y RK4 de $1.2\\cdot 10^{-6}$ — cinco órdenes de magnitud de diferencia con el mismo paso.",
              eu: "Hiru metodoek numerikoki baieztatzen dituzte beren ordena teorikoak: 1, 2 eta 4. Erreparatu eskalari: $N=64$-rekin, Euler-en errorea $0.1164$ da eta RK4-rena $1.2\\cdot 10^{-6}$ — bost magnitude-ordenako aldea pauso berarekin.",
              en: "All three methods numerically confirm their theoretical orders: 1, 2 and 4. Note the scale: with $N=64$, Euler's error is $0.1164$ and RK4's is $1.2\\cdot 10^{-6}$ — five orders of magnitude apart at the same step."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-euler-implicito-estabilidad",
    category: "EDO",
    level: "avanzado",
    searchIntent: "ejercicio estabilidad Euler explícito implícito Malthus factor amplificación",
    title: {
      es: "Ejercicio: estabilidad de Euler explícito e implícito",
      eu: "Ariketa: Euler esplizituaren eta inplizituaren egonkortasuna",
      en: "Exercise: stability of explicit and implicit Euler"
    },
    description: {
      es: "Análisis completo de y'=λy: factor de amplificación de cada método, condición de estabilidad h<−2/λ del explícito, estabilidad incondicional del implícito y comprobación numérica con λ=−10.",
      eu: "y'=λy-ren analisi osoa: metodo bakoitzaren anplifikazio-faktorea, esplizituaren h<−2/λ egonkortasun-baldintza, inplizituaren baldintzarik gabeko egonkortasuna eta λ=−10 balioarekin egiaztapen numerikoa.",
      en: "Full analysis of y'=λy: the amplification factor of each method, the explicit method's stability condition h<−2/λ, the unconditional stability of the implicit one and a numerical check with λ=−10."
    },
    keywords: ["ejercicio", "estabilidad", "Euler implícito", "factor de amplificación", "Malthus"],
    prerequisites: ["edo-metodo-euler", "edo-convergencia-orden"],
    related: ["edo-metodo-euler", "edo-problemas-rigidos", "edo-convergencia-orden"],
    sections: [
      {
        heading: {
          es: "Factor de amplificación",
          eu: "Anplifikazio-faktorea",
          en: "Amplification factor"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Se estudia el problema modelo $y'=\\lambda y$ con $\\lambda<0$ (modelo de Malthus con decaimiento): la solución exacta $y(t)=y_a e^{\\lambda t}$ tiende a cero, y un método razonable debería reproducir ese comportamiento.",
              eu: "$y'=\\lambda y$ problema-eredua aztertzen da, $\\lambda<0$ izanik (gainbeherako Malthus eredua): soluzio zehatza $y(t)=y_a e^{\\lambda t}$ zerorantz doa, eta metodo arrazoizko batek portaera hori erreproduzitu beharko luke.",
              en: "Study the model problem $y'=\\lambda y$ with $\\lambda<0$ (decaying Malthus model): the exact solution $y(t)=y_a e^{\\lambda t}$ tends to zero, and a reasonable method should reproduce that behaviour."
            }
          },
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Euler explícito aplicado a $f(t,y)=\\lambda y$ multiplica la solución por un factor constante en cada paso:",
                  eu: "$f(t,y)=\\lambda y$-ri aplikatutako Euler esplizituak soluzioa faktore konstante batez biderkatzen du pauso bakoitzean:",
                  en: "Explicit Euler applied to $f(t,y)=\\lambda y$ multiplies the solution by a constant factor at each step:"
                },
                formula: "y_{k+1}=y_k+h\\lambda y_k=(1+h\\lambda)\\,y_k\\;\\Rightarrow\\; y_k=(1+h\\lambda)^k\\,y_a"
              },
              {
                text: {
                  es: "La solución numérica decae si y solo si $|1+h\\lambda|<1$, es decir, si $h<-\\frac{2}{\\lambda}$. Con $h$ mayor, $(1+h\\lambda)^k$ oscila con amplitud creciente: el método es inestable aunque sea consistente.",
                  eu: "Soluzio numerikoa txikitzen da baldin eta soilik baldin $|1+h\\lambda|<1$ bada, hau da, $h<-\\frac{2}{\\lambda}$ bada. $h$ handiagoarekin, $(1+h\\lambda)^k$ anplitude gero eta handiagoz oszilatzen du: metodoa ezegonkorra da, kontsistentea izan arren.",
                  en: "The numerical solution decays if and only if $|1+h\\lambda|<1$, that is, if $h<-\\frac{2}{\\lambda}$. With larger $h$, $(1+h\\lambda)^k$ oscillates with growing amplitude: the method is unstable even though it is consistent."
                }
              },
              {
                text: {
                  es: "Euler implícito, en cambio, se puede despejar exactamente en este problema lineal:",
                  eu: "Euler inplizitua, aldiz, zehazki askatu daiteke problema lineal honetan:",
                  en: "Implicit Euler, by contrast, can be solved exactly in this linear problem:"
                },
                formula: "y_{k+1}=y_k+h\\lambda y_{k+1}\\;\\Rightarrow\\; y_{k+1}=\\frac{y_k}{1-h\\lambda}"
              },
              {
                text: {
                  es: "Como $\\lambda<0$, el denominador $1-h\\lambda=1+h|\\lambda|$ es mayor que 1 para todo $h>0$: el factor de amplificación es siempre menor que 1 y el método es incondicionalmente estable.",
                  eu: "$\\lambda<0$ denez, $1-h\\lambda=1+h|\\lambda|$ izendatzailea 1 baino handiagoa da $h>0$ guztietarako: anplifikazio-faktorea beti da 1 baino txikiagoa eta metodoa baldintzarik gabe egonkorra da.",
                  en: "Since $\\lambda<0$, the denominator $1-h\\lambda=1+h|\\lambda|$ exceeds 1 for every $h>0$: the amplification factor is always below 1 and the method is unconditionally stable."
                }
              }
            ]
          }
        ]
      },
      {
        heading: {
          es: "Comprobación numérica",
          eu: "Egiaztapen numerikoa",
          en: "Numerical check"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Con $\\lambda=-10$, $y(0)=1$ en $[0,2]$ (solución exacta $y=e^{-10t}$), la condición de estabilidad del explícito es $h<0.2$, es decir, $N>10$. La tabla muestra el error máximo de ambos métodos:",
              eu: "$\\lambda=-10$, $y(0)=1$ eta $[0,2]$ hartuta (soluzio zehatza $y=e^{-10t}$), esplizituaren egonkortasun-baldintza $h<0.2$ da, hau da, $N>10$. Taulak bi metodoen errore maximoa erakusten du:",
              en: "With $\\lambda=-10$, $y(0)=1$ on $[0,2]$ (exact solution $y=e^{-10t}$), the explicit method's stability condition is $h<0.2$, i.e. $N>10$. The table shows the maximum error of both methods:"
            }
          },
          {
            kind: "table",
            head: {
              es: ["N", "$E_N$ explícito", "$E_N$ implícito"],
              eu: ["N", "$E_N$ esplizitua", "$E_N$ inplizitua"],
              en: ["N", "$E_N$ explicit", "$E_N$ implicit"]
            },
            rows: [
              ["2", "81.0000", "0.0909"],
              ["4", "256.0000", "0.1599"],
              ["8", "25.6289", "0.2036"],
              ["16", "0.5365", "0.1579"],
              ["32", "0.1603", "0.0922"]
            ],
            caption: {
              es: "Error máximo frente a la solución exacta $y=e^{-10t}$ en $[0,2]$.",
              eu: "Errore maximoa $y=e^{-10t}$ soluzio zehatzaren aldean $[0,2]$-n.",
              en: "Maximum error against the exact solution $y=e^{-10t}$ on $[0,2]$."
            }
          },
          {
            kind: "callout",
            variant: "warning",
            title: {
              es: "Lectura",
              eu: "Irakurketa",
              en: "Reading"
            },
            text: {
              es: "Para $N\\le 8$ ($h\\ge 0.25>0.2$) el explícito estalla: con $N=4$, el factor es $1+h\\lambda=-4$ y los errores crecen como $4^k$. El implícito mantiene el error acotado con cualquier paso. Esta es la situación típica de los [[edo-problemas-rigidos|problemas rígidos]].",
              eu: "$N\\le 8$ denean ($h\\ge 0.25>0.2$) esplizitua lehertu egiten da: $N=4$-rekin, faktorea $1+h\\lambda=-4$ da eta erroreak $4^k$ bezala hazten dira. Inplizituak errorea bornatuta mantentzen du edozein pausorekin. Hau da [[edo-problemas-rigidos|problema zurrunen]] egoera tipikoa.",
              en: "For $N\\le 8$ ($h\\ge 0.25>0.2$) the explicit method blows up: with $N=4$, the factor is $1+h\\lambda=-4$ and errors grow like $4^k$. The implicit one keeps the error bounded at any step. This is the typical situation of [[edo-problemas-rigidos|stiff problems]]."
            }
          }
        ]
      },
      {
        heading: {
          es: "Resolver el paso implícito en un caso no lineal",
          eu: "Pauso inplizitua ebatzi kasu ez-lineal batean",
          en: "Solving the implicit step in a nonlinear case"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Euler implícito en la ecuación logística",
              eu: "Euler inplizitua ekuazio logistikoan",
              en: "Implicit Euler on the logistic equation"
            },
            statement: {
              es: "Plantear el paso de Euler implícito para $y'=y(1-y)$ y despejar $y_{k+1}$.",
              eu: "Planteatu Euler inplizituaren pausoa $y'=y(1-y)$ ekuaziorako eta askatu $y_{k+1}$.",
              en: "Set up the implicit Euler step for $y'=y(1-y)$ and solve for $y_{k+1}$."
            },
            steps: [
              {
                text: {
                  es: "El paso implícito es $y_{k+1}=y_k+h\\,y_{k+1}(1-y_{k+1})$. Reordenando queda una ecuación cuadrática en $y_{k+1}$:",
                  eu: "Pauso inplizitua $y_{k+1}=y_k+h\\,y_{k+1}(1-y_{k+1})$ da. Berrantolatuz, $y_{k+1}$-en ekuazio koadratiko bat geratzen da:",
                  en: "The implicit step is $y_{k+1}=y_k+h\\,y_{k+1}(1-y_{k+1})$. Rearranging yields a quadratic equation in $y_{k+1}$:"
                },
                formula: "h\\,y_{k+1}^2+(1-h)\\,y_{k+1}-y_k=0"
              },
              {
                text: {
                  es: "Para soluciones positivas se toma la raíz con signo más:",
                  eu: "Soluzio positiboetarako plus zeinuko erroa hartzen da:",
                  en: "For positive solutions take the plus-sign root:"
                },
                formula: "y_{k+1}=\\frac{-(1-h)+\\sqrt{(1-h)^2+4h\\,y_k}}{2h}"
              },
              {
                text: {
                  es: "Aquí la ecuación de cada paso tiene solución cerrada; en general no la hay y $g(y_{k+1})=0$ se resuelve con el [[no-lineales-newton-raphson|método de Newton-Raphson]].",
                  eu: "Hemen pauso bakoitzeko ekuazioak soluzio itxia du; orokorrean ez dago halakorik eta $g(y_{k+1})=0$ [[no-lineales-newton-raphson|Newton-Raphson metodoarekin]] ebazten da.",
                  en: "Here each step's equation has a closed-form solution; in general there is none and $g(y_{k+1})=0$ is solved with the [[no-lineales-newton-raphson|Newton-Raphson method]]."
                }
              }
            ],
            result: {
              text: {
                es: "El coste extra por paso (resolver una ecuación) es el precio de la estabilidad incondicional del método implícito.",
                eu: "Pauso bakoitzeko kostu gehigarria (ekuazio bat ebaztea) metodo inplizituaren baldintzarik gabeko egonkortasunaren prezioa da.",
                en: "The extra cost per step (solving an equation) is the price of the implicit method's unconditional stability."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-sir-sistema",
    category: "EDO",
    level: "avanzado",
    searchIntent: "ejercicio modelo SIR sistema EDO Euler Heun RK4 comparación",
    title: {
      es: "Ejercicio: el modelo SIR con Euler, Heun y RK4",
      eu: "Ariketa: SIR eredua Euler, Heun eta RK4-rekin",
      en: "Exercise: the SIR model with Euler, Heun and RK4"
    },
    description: {
      es: "Integración del sistema epidémico SIR con los tres métodos de un paso sobre la misma malla, comparando cómo el orden del método cambia visiblemente los resultados.",
      eu: "SIR sistema epidemikoaren integrazioa urrats bakarreko hiru metodoekin sare beraren gainean, metodoaren ordenak emaitzak nabarmen nola aldatzen dituen alderatuz.",
      en: "Integration of the SIR epidemic system with the three one-step methods on the same mesh, comparing how the method's order visibly changes the results."
    },
    keywords: ["ejercicio", "SIR", "sistema de EDO", "Euler", "Heun", "RK4"],
    prerequisites: ["edo-problemas-valor-inicial", "edo-metodo-runge-kutta"],
    related: ["edo-problemas-valor-inicial", "edo-metodo-runge-kutta", "ejercicio-edo-sistema-a-mano"],
    sections: [
      {
        heading: {
          es: "El modelo",
          eu: "Eredua",
          en: "The model"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "El modelo SIR describe la propagación de una enfermedad infecciosa dividiendo la población en susceptibles $S$, infectados $I$ y recuperados $R$:",
              eu: "SIR ereduak gaixotasun infekzioso baten hedapena deskribatzen du, populazioa hiru taldetan banatuz: suszeptibleak $S$, infektatuak $I$ eta sendatuak $R$:",
              en: "The SIR model describes the spread of an infectious disease by splitting the population into susceptible $S$, infected $I$ and recovered $R$:"
            }
          },
          {
            kind: "formula",
            tex: "\\begin{cases} S'(t)=-\\beta\\,S(t)\\,I(t)\\\\ I'(t)=\\beta\\,S(t)\\,I(t)-\\nu\\,I(t)\\\\ R'(t)=\\nu\\,I(t) \\end{cases}\\qquad \\beta,\\nu>0"
          },
          {
            kind: "paragraph",
            text: {
              es: "Se toma $\\beta=0.01$, $\\nu=0.5$, condiciones iniciales $S(0)=100$, $I(0)=32$, $R(0)=5$, y se estudia la evolución diaria durante 10 días: $N=10$ subintervalos en $[0,10]$ ($h=1$). Es un [[edo-problemas-valor-inicial|PVI vectorial]] de tres componentes que los tres métodos integran componente a componente.",
              eu: "$\\beta=0.01$, $\\nu=0.5$ hartzen dira, hasierako baldintzak $S(0)=100$, $I(0)=32$, $R(0)=5$, eta eguneko bilakaera aztertzen da 10 egunez: $N=10$ azpitarte $[0,10]$-en ($h=1$). Hiru osagaiko [[edo-problemas-valor-inicial|PVI bektoriala]] da, hiru metodoek osagaiz osagai integratzen dutena.",
              en: "Take $\\beta=0.01$, $\\nu=0.5$, initial conditions $S(0)=100$, $I(0)=32$, $R(0)=5$, and study the daily evolution over 10 days: $N=10$ subintervals on $[0,10]$ ($h=1$). It is a three-component [[edo-problemas-valor-inicial|vector IVP]] that all three methods integrate component by component."
            }
          }
        ]
      },
      {
        heading: {
          es: "Resultados",
          eu: "Emaitzak",
          en: "Results"
        },
        blocks: [
          {
            kind: "table",
            head: {
              es: ["t", "S (Euler)", "I (Euler)", "R (Euler)"],
              eu: ["t", "S (Euler)", "I (Euler)", "R (Euler)"],
              en: ["t", "S (Euler)", "I (Euler)", "R (Euler)"]
            },
            rows: [
              ["0", "100.00", "32.00", "5.00"],
              ["2", "35.36", "56.64", "45.00"],
              ["4", "7.92", "31.59", "97.49"],
              ["6", "4.43", "10.14", "122.43"],
              ["8", "3.76", "2.98", "130.26"],
              ["10", "3.59", "0.86", "132.55"]
            ],
            caption: {
              es: "Método de Euler ($h=1$).",
              eu: "Euler-en metodoa ($h=1$).",
              en: "Euler's method ($h=1$)."
            }
          },
          {
            kind: "table",
            head: {
              es: ["t", "S (Heun)", "I (Heun)", "R (Heun)"],
              eu: ["t", "S (Heun)", "I (Heun)", "R (Heun)"],
              en: ["t", "S (Heun)", "I (Heun)", "R (Heun)"]
            },
            rows: [
              ["0", "100.00", "32.00", "5.00"],
              ["2", "42.85", "45.03", "49.12"],
              ["4", "20.32", "28.97", "87.72"],
              ["6", "13.36", "14.86", "108.78"],
              ["8", "10.88", "7.09", "119.02"],
              ["10", "9.89", "3.30", "123.82"]
            ],
            caption: {
              es: "Método de Heun ($h=1$).",
              eu: "Heun-en metodoa ($h=1$).",
              en: "Heun's method ($h=1$)."
            }
          },
          {
            kind: "table",
            head: {
              es: ["t", "S (RK4)", "I (RK4)", "R (RK4)"],
              eu: ["t", "S (RK4)", "I (RK4)", "R (RK4)"],
              en: ["t", "S (RK4)", "I (RK4)", "R (RK4)"]
            },
            rows: [
              ["0", "100.00", "32.00", "5.00"],
              ["2", "42.40", "46.70", "47.89"],
              ["4", "19.27", "30.39", "87.34"],
              ["6", "12.38", "15.14", "109.48"],
              ["8", "10.02", "6.94", "120.03"],
              ["10", "9.11", "3.09", "124.80"]
            ],
            caption: {
              es: "Método de Runge-Kutta 4 ($h=1$).",
              eu: "Runge-Kutta 4 metodoa ($h=1$).",
              en: "Runge-Kutta 4 method ($h=1$)."
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
              es: "Tomando RK4 como referencia, Heun queda muy cerca (diferencias inferiores a 1.1 en todas las celdas), mientras que Euler se desvía gravemente: predice $S(10)=3.59$ frente al $9.11$ de RK4, un error superior al 60 %. Con la misma malla, el orden del método marca la diferencia entre una simulación útil y una engañosa.",
              eu: "RK4 erreferentziatzat hartuta, Heun oso gertu geratzen da (diferentziak 1.1 baino txikiagoak gelaxka guztietan); Euler, berriz, larriki desbideratzen da: $S(10)=3.59$ iragartzen du RK4-ren $9.11$-ren aldean, % 60tik gorako errorea. Sare berarekin, metodoaren ordenak simulazio erabilgarri baten eta engainagarri baten arteko aldea markatzen du.",
              en: "Taking RK4 as reference, Heun stays very close (differences below 1.1 in every cell), while Euler deviates badly: it predicts $S(10)=3.59$ versus RK4's $9.11$, an error above 60%. On the same mesh, the method's order makes the difference between a useful simulation and a misleading one."
            }
          }
        ]
      }
    ]
  }
];
