import type { ContentEntry } from "../content";

/**
 * Numerical integration area. The formulas and worked values follow the
 * integration chapter: quadrature from Lagrange interpolation, closed and open
 * Newton-Cotes rules, Gaussian quadrature families, and double integrals.
 */

const category = "Integración";

export const integracionArticles: ContentEntry[] = [
  {
    slug: "integracion-cuadratura-lagrange",
    category,
    level: "base",
    searchIntent: "cuadratura numerica lagrange pesos error integracion",
    title: {
      es: "Cuadratura numérica desde Lagrange",
      eu: "Zenbakizko koadratura Lagrangetik",
      en: "Numerical quadrature from Lagrange"
    },
    description: {
      es: "La idea general de la integración numérica: aproximar una integral por una suma ponderada de valores de la función, deducida al integrar el polinomio de Lagrange.",
      eu: "Zenbakizko integrazioaren ideia orokorra: integrala funtzioaren balioen batura haztatu baten bidez hurbiltzea, Lagrangeren polinomioa integratuz lortua.",
      en: "The general idea of numerical integration: approximate an integral by a weighted sum of function values, obtained by integrating the Lagrange polynomial."
    },
    keywords: ["cuadratura", "Lagrange", "pesos", "error de cuadratura"],
    prerequisites: ["interpolacion-lagrange", "fundamentos-taylor-truncamiento"],
    related: [
      "integracion-newton-cotes-cerradas",
      "integracion-newton-cotes-abiertas",
      "integracion-gauss"
    ],
    sections: [
      {
        heading: {
          es: "Qué problema resuelve",
          eu: "Zer problema ebazten du",
          en: "What problem it solves"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Muchas integrales no se calculan a mano porque la función solo está tabulada o porque su primitiva no es manejable. La cuadratura numérica reemplaza el área exacta por una combinación de alturas medidas en nodos.",
              eu: "Integral asko ezin dira eskuz kalkulatu, funtzioa taulatuta bakarrik dagoelako edo haren primitiboa erabilgarria ez delako. Zenbakizko koadraturak azalera zehatza nodoetan neurtutako altueren konbinazio batez ordezkatzen du.",
              en: "Many integrals cannot be computed by hand because the function is only tabulated or because its antiderivative is not manageable. Numerical quadrature replaces the exact area by a combination of heights measured at nodes."
            }
          },
          {
            kind: "formula",
            tex: "I=\\int_a^b f(x)\\,dx\\approx\\sum_{i=0}^{n} a_i f(x_i)",
            caption: {
              es: "Forma general de una regla de cuadratura.",
              eu: "Koadratura-erregelaren forma orokorra.",
              en: "General form of a quadrature rule."
            }
          },
          {
            kind: "callout",
            variant: "definition",
            title: {
              es: "Nodos y pesos",
              eu: "Nodoak eta pisuak",
              en: "Nodes and weights"
            },
            text: {
              es: "Los nodos $x_i$ son los puntos donde se evalúa la función. Los pesos $a_i$ indican cuánta área aporta cada evaluación.",
              eu: "$x_i$ nodoak funtzioa ebaluatzen den puntuak dira. $a_i$ pisuek ebaluazio bakoitzak zenbat azalera ematen duen adierazten dute.",
              en: "The nodes $x_i$ are the points where the function is evaluated. The weights $a_i$ indicate how much area each evaluation contributes."
            }
          }
        ]
      },
      {
        heading: {
          es: "Deducción con el polinomio interpolador",
          eu: "Polinomio interpolatzailearekin dedukzioa",
          en: "Derivation with the interpolating polynomial"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Si interpolamos $f$ con el [[interpolacion-lagrange|polinomio de Lagrange]] $p_n$ y luego integramos, la integral de $f$ queda separada en una suma de valores $f(x_i)$ multiplicados por integrales de las bases $L_i$.",
              eu: "$f$ [[interpolacion-lagrange|Lagrangeren polinomioarekin]] ($p_n$) interpolatu eta gero integratzen badugu, $f$-ren integrala $f(x_i)$ balioen eta $L_i$ oinarrien integralen batura gisa banatzen da.",
              en: "If we interpolate $f$ with the [[interpolacion-lagrange|Lagrange polynomial]] $p_n$ and then integrate, the integral of $f$ separates into a sum of values $f(x_i)$ multiplied by integrals of the bases $L_i$."
            }
          },
          {
            kind: "formula",
            tex: "p_n(x)=\\sum_{i=0}^{n}L_i(x)f(x_i),\\qquad L_i(x)=\\prod_{j\\ne i}\\frac{x-x_j}{x_i-x_j}"
          },
          {
            kind: "formula",
            tex: "\\int_a^b f(x)\\,dx\\approx\\sum_{i=0}^{n} f(x_i)\\int_a^b L_i(x)\\,dx",
            caption: {
              es: "Los pesos son integrales de las bases de Lagrange.",
              eu: "Pisuak Lagrangeren oinarrien integralak dira.",
              en: "The weights are integrals of the Lagrange bases."
            }
          },
          {
            kind: "formula",
            tex: "E=\\frac{1}{(n+1)!}\\int_a^b f^{(n+1)}(\\xi(x))\\prod_{i=0}^{n}(x-x_i)\\,dx",
            caption: {
              es: "Error de cuadratura asociado al término de interpolación.",
              eu: "Interpolazio-terminoari lotutako koadratura-errorea.",
              en: "Quadrature error associated with the interpolation term."
            }
          }
        ]
      },
      {
        heading: {
          es: "Qué método elegir",
          eu: "Zein metodo aukeratu",
          en: "Which method to choose"
        },
        blocks: [
          {
            kind: "list",
            items: {
              es: [
                "Si los nodos son equiespaciados y se usan los extremos, aparecen las fórmulas cerradas de Newton-Cotes.",
                "Si los nodos son equiespaciados pero no se usan los extremos, aparecen las fórmulas abiertas de Newton-Cotes.",
                "Si se puede elegir dónde evaluar la función, la cuadratura de Gauss coloca nodos no equiespaciados para aumentar el grado de exactitud.",
                "En integrales dobles, las mismas reglas se aplican por producto: una dirección y luego la otra."
              ],
              eu: [
                "Nodoak ekidistanteak badira eta muturrak erabiltzen badira, Newton-Cotesen formula itxiak agertzen dira.",
                "Nodoak ekidistanteak badira baina muturrak ez badira erabiltzen, Newton-Cotesen formula irekiak agertzen dira.",
                "Funtzioa non ebaluatu aukeratu badaiteke, Gaussen koadraturak nodo ez-ekidistanteak kokatzen ditu zehaztasun-maila handitzeko.",
                "Integral bikoitzetan, erregela berak produktu bidez aplikatzen dira: norabide batean eta gero bestean."
              ],
              en: [
                "If the nodes are equally spaced and the endpoints are used, closed Newton-Cotes formulas appear.",
                "If the nodes are equally spaced but the endpoints are not used, open Newton-Cotes formulas appear.",
                "If the evaluation points can be chosen, Gaussian quadrature places non-equally spaced nodes to increase the degree of exactness.",
                "For double integrals, the same rules are applied as a product: one direction and then the other."
              ]
            }
          },
          {
            kind: "callout",
            variant: "warning",
            title: {
              es: "Error común",
              eu: "Ohiko akatsa",
              en: "Common mistake"
            },
            text: {
              es: "No basta memorizar pesos. Hay que saber si h representa todo el intervalo o el paso entre nodos; en Simpson simple, por ejemplo, h=(b-a)/2.",
              eu: "Ez da nahikoa pisuak buruz ikastea. h-k tarte osoa edo nodoen arteko pausoa adierazten duen jakin behar da; Simpson sinplean, adibidez, h=(b-a)/2 da.",
              en: "Memorising weights is not enough. You must know whether h denotes the whole interval or the spacing between nodes; in simple Simpson, for example, h=(b-a)/2."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "integracion-newton-cotes-cerradas",
    category,
    level: "medio",
    searchIntent: "newton cotes cerradas trapecio simpson simpson tres octavos milne error",
    title: {
      es: "Newton-Cotes cerradas: trapecio, Simpson y más",
      eu: "Newton-Cotes itxiak: trapezioa, Simpson eta gehiago",
      en: "Closed Newton-Cotes: trapezoid, Simpson and more"
    },
    description: {
      es: "Reglas cerradas para nodos equiespaciados que incluyen los extremos: trapecio, Simpson 1/3, Simpson 3/8, Milne y sus errores.",
      eu: "Muturrak barne hartzen dituzten nodo ekidistanteetarako erregela itxiak: trapezioa, Simpson 1/3, Simpson 3/8, Milne eta haien erroreak.",
      en: "Closed rules for equally spaced nodes that include the endpoints: trapezoid, Simpson 1/3, Simpson 3/8, Milne and their errors."
    },
    keywords: ["Newton-Cotes", "trapecio", "Simpson", "Simpson 3/8", "Milne"],
    prerequisites: ["integracion-cuadratura-lagrange"],
    related: [
      "deduccion-integracion-trapecio",
      "deduccion-integracion-trapecio-compuesto",
      "deduccion-integracion-simpson",
      "ejercicio-integracion-trapecio-simpson"
    ],
    sections: [
      {
        heading: {
          es: "Reglas simples",
          eu: "Erregela sinpleak",
          en: "Simple rules"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Las reglas cerradas interpolan usando nodos equiespaciados que incluyen a y b. Cuantos más nodos se usan, mayor puede ser el grado de exactitud, pero también aumenta la sensibilidad si la función oscila.",
              eu: "Erregela itxiek a eta b barne hartzen dituzten nodo ekidistanteak erabiliz interpolatzen dute. Zenbat eta nodo gehiago erabili, orduan eta handiagoa izan daiteke zehaztasun-maila, baina funtzioa oszilatzen bada sentikortasuna ere handitzen da.",
              en: "Closed rules interpolate using equally spaced nodes that include a and b. More nodes can give a higher degree of exactness, but sensitivity also increases if the function oscillates."
            }
          },
          {
            kind: "table",
            head: {
              es: ["Regla", "Aproximación simple", "Error principal"],
              eu: ["Erregela", "Hurbilketa sinplea", "Errore nagusia"],
              en: ["Rule", "Simple approximation", "Leading error"]
            },
            rows: [
              ["Trapecio", "h/2 [f(a)+f(b)]", "-h^3 f''(xi)/12"],
              ["Simpson 1/3", "h/3 [f(a)+4f((a+b)/2)+f(b)]", "-h^5 f^(4)(xi)/90"],
              ["Simpson 3/8", "3h/8 [f(a)+3f((2a+b)/3)+3f((a+2b)/3)+f(b)]", "-3h^5 f^(4)(xi)/80"],
              ["Milne", "2h/45 [7f(a)+32f((3a+b)/4)+12f((a+b)/2)+32f((a+3b)/4)+7f(b)]", "-8h^7 f^(6)(xi)/945"]
            ],
            caption: {
              es: "En cada fila, h es el paso entre nodos de esa regla simple.",
              eu: "Errenkada bakoitzean, h erregela sinple horretako nodoen arteko pausoa da.",
              en: "In each row, h is the spacing between the nodes of that simple rule."
            }
          },
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Patrón del error cerrado",
              eu: "Errore itxiaren eredua",
              en: "Closed-rule error pattern"
            },
            text: {
              es: "En Newton-Cotes cerrado, el término de error depende de la paridad del grado usado: para $n$ par aparece una derivada de orden $n+2$; para $n$ impar, una derivada de orden $n+1$.",
              eu: "Newton-Cotes itxian, errore-terminoa erabilitako graduaren paritatearen araberakoa da: $n$ bikoitia bada $n+2$ ordenako deribatua agertzen da; $n$ bakoitia bada $n+1$ ordenakoa.",
              en: "In closed Newton-Cotes, the error term depends on the parity of the degree used: for even $n$ a derivative of order $n+2$ appears; for odd $n$ a derivative of order $n+1$ appears."
            }
          }
        ]
      },
      {
        heading: {
          es: "Trapecio compuesto",
          eu: "Trapezio konposatua",
          en: "Composite trapezoid"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Para reducir el error se divide [a,b] en n subintervalos y se aplica el trapecio en cada uno. Los nodos interiores aparecen dos veces, por eso tienen peso 2.",
              eu: "Errorea txikitzeko [a,b] n azpitartetan banatzen da eta trapezioa bakoitzean aplikatzen da. Barruko nodoak bi aldiz agertzen dira, horregatik dute 2 pisua.",
              en: "To reduce the error, [a,b] is split into n subintervals and the trapezoid rule is applied on each one. Interior nodes appear twice, so they receive weight 2."
            }
          },
          {
            kind: "diagram",
            variant: "composite-trapezoid",
            caption: {
              es: "El trapecio compuesto suma trapecios simples. Cada nodo interior es extremo derecho de un subintervalo y extremo izquierdo del siguiente.",
              eu: "Trapezio konposatuak trapezio sinpleak batzen ditu. Barruko nodo bakoitza azpitarte baten eskuineko muturra eta hurrengoaren ezkerreko muturra da.",
              en: "The composite trapezoid rule sums simple trapezoids. Each interior node is the right endpoint of one subinterval and the left endpoint of the next."
            }
          },
          {
            kind: "steps",
            title: {
              es: "Deducción para n subintervalos",
              eu: "n azpitartetarako dedukzioa",
              en: "Derivation for n subintervals"
            },
            steps: [
              {
                text: {
                  es: "Dividimos el intervalo con $x_i=a+ih$ y $h=(b-a)/n$.",
                  eu: "Tartea $x_i=a+ih$ eta $h=(b-a)/n$ erabiliz banatzen dugu.",
                  en: "Split the interval with $x_i=a+ih$ and $h=(b-a)/n$."
                },
                formula: "a=x_0<x_1<\\cdots<x_n=b"
              },
              {
                text: {
                  es: "En cada subintervalo $[x_i,x_{i+1}]$ aplicamos el trapecio simple:",
                  eu: "$[x_i,x_{i+1}]$ azpitarte bakoitzean trapezio sinplea aplikatzen dugu:",
                  en: "Apply the simple trapezoid rule on each subinterval $[x_i,x_{i+1}]$:"
                },
                formula: "T_i=\\frac{h}{2}\\left[f(x_i)+f(x_{i+1})\\right]"
              },
              {
                text: {
                  es: "Sumamos todos los trapecios. Al expandir la suma, los nodos interiores aparecen dos veces:",
                  eu: "Trapezio guztiak batzen ditugu. Batura zabaltzean, barruko nodoak bi aldiz agertzen dira:",
                  en: "Sum all trapezoids. After expanding the sum, interior nodes appear twice:"
                },
                formula: "\\begin{aligned}T_n&=\\sum_{i=0}^{n-1}\\frac{h}{2}\\left[f(x_i)+f(x_{i+1})\\right]\\\\&=\\frac{h}{2}\\left[f(x_0)+2\\sum_{i=1}^{n-1}f(x_i)+f(x_n)\\right]\\end{aligned}"
              },
              {
                text: {
                  es: "El error global sale de sumar los errores locales $-h^3 f''(\\xi_i)/12$ y aplicar el teorema del valor medio:",
                  eu: "Errore globala $-h^3 f''(\\xi_i)/12$ errore lokalak batu eta batez besteko balioaren teorema aplikatuz lortzen da:",
                  en: "The global error comes from summing the local errors $-h^3 f''(\\xi_i)/12$ and applying the mean value theorem:"
                },
                formula: "E_T=-\\frac{h^3}{12}\\sum_{i=0}^{n-1}f''(\\xi_i)=-\\frac{b-a}{12}h^2 f''(\\xi)"
              }
            ]
          },
          {
            kind: "formula",
            tex: "I\\approx\\frac{h}{2}\\left[f(x_0)+2\\sum_{i=1}^{n-1}f(x_i)+f(x_n)\\right],\\qquad h=\\frac{b-a}{n}"
          },
          {
            kind: "formula",
            tex: "E_T=-\\frac{b-a}{12}h^2 f''(\\xi)",
            caption: {
              es: "Error global del trapecio compuesto.",
              eu: "Trapezio konposatuaren errore globala.",
              en: "Global error of the composite trapezoid rule."
            }
          }
        ]
      },
      {
        heading: {
          es: "Simpson compuesto",
          eu: "Simpson konposatua",
          en: "Composite Simpson"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Simpson 1/3 agrupa subintervalos de dos en dos, así que n debe ser par. Los pesos alternan 4 y 2: los nodos impares son puntos medios de cada parábola y los pares interiores unen bloques consecutivos.",
              eu: "Simpson 1/3 erregelak azpitartak binaka taldekatzen ditu; beraz, n bikoitia izan behar da. Pisuak 4 eta 2 txandakatzen dira: nodo bakoitiak parabola bakoitzaren erdiko puntuak dira, eta barruko bikoitiek bloke jarraituak lotzen dituzte.",
              en: "Simpson 1/3 groups subintervals in pairs, so n must be even. The weights alternate 4 and 2: odd nodes are midpoints of each parabola, while interior even nodes connect consecutive blocks."
            }
          },
          {
            kind: "formula",
            tex: "I\\approx\\frac{h}{3}\\left[f(x_0)+4\\sum_{i\\ \\mathrm{impar}}f(x_i)+2\\sum_{i\\ \\mathrm{par},\\ 0<i<n}f(x_i)+f(x_n)\\right]"
          },
          {
            kind: "formula",
            tex: "E_S=-\\frac{b-a}{180}h^4 f^{(4)}(\\xi)",
            caption: {
              es: "Error global de Simpson compuesto.",
              eu: "Simpson konposatuaren errore globala.",
              en: "Global error of composite Simpson."
            }
          },
          {
            kind: "callout",
            variant: "warning",
            title: {
              es: "Error común",
              eu: "Ohiko akatsa",
              en: "Common mistake"
            },
            text: {
              es: "No apliques Simpson compuesto con un número impar de subintervalos. Si n es impar, cambia n o combina Simpson con otra regla en el tramo restante.",
              eu: "Ez aplikatu Simpson konposatua azpitarten kopuru bakoitiarekin. n bakoitia bada, aldatu n edo konbinatu Simpson beste erregela batekin geratzen den zatian.",
              en: "Do not apply composite Simpson with an odd number of subintervals. If n is odd, change n or combine Simpson with another rule on the remaining part."
            }
          }
        ]
      },
      {
        heading: {
          es: "Deducciones",
          eu: "Dedukzioak",
          en: "Derivations"
        },
        blocks: [
          { kind: "derivation", slug: "deduccion-integracion-trapecio" },
          { kind: "derivation", slug: "deduccion-integracion-trapecio-compuesto" },
          { kind: "derivation", slug: "deduccion-integracion-simpson" }
        ]
      }
    ]
  },
  {
    slug: "integracion-newton-cotes-abiertas",
    category,
    level: "medio",
    searchIntent: "newton cotes abiertas punto medio error formula compuesta",
    title: {
      es: "Newton-Cotes abiertas y punto medio",
      eu: "Newton-Cotes irekiak eta erdiko puntua",
      en: "Open Newton-Cotes and midpoint"
    },
    description: {
      es: "Reglas abiertas que evitan los extremos del intervalo, con especial atención al punto medio simple y compuesto.",
      eu: "Tartearen muturrak saihesten dituzten erregela irekiak, erdiko puntu sinpleari eta konposatuari arreta berezia jarrita.",
      en: "Open rules that avoid the endpoints of the interval, with special attention to the simple and composite midpoint rule."
    },
    keywords: ["Newton-Cotes abiertas", "punto medio", "nodos interiores"],
    prerequisites: ["integracion-cuadratura-lagrange"],
    related: [
      "deduccion-integracion-punto-medio-simple",
      "deduccion-integracion-punto-medio-compuesto",
      "ejercicio-integracion-punto-medio",
      "integracion-newton-cotes-cerradas"
    ],
    sections: [
      {
        heading: {
          es: "Por qué son abiertas",
          eu: "Zergatik diren irekiak",
          en: "Why they are open"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Las fórmulas abiertas usan solo nodos interiores. Son útiles cuando los extremos no están definidos, son singulares o no se han medido.",
              eu: "Formula irekiek barruko nodoak bakarrik erabiltzen dituzte. Erabilgarriak dira muturrak definituta ez daudenean, singularrak direnean edo neurtu ez direnean.",
              en: "Open formulas use only interior nodes. They are useful when the endpoints are not defined, are singular, or have not been measured."
            }
          },
          {
            kind: "table",
            head: {
              es: ["Regla abierta", "Aproximación simple", "Error principal"],
              eu: ["Erregela irekia", "Hurbilketa sinplea", "Errore nagusia"],
              en: ["Open rule", "Simple approximation", "Leading error"]
            },
            rows: [
              ["Punto medio", "(b-a) f((a+b)/2)", "(b-a)^3 f''(xi)/24"],
              ["Dos nodos interiores", "(b-a)/2 [f((2a+b)/3)+f((a+2b)/3)]", "3h^3 f''(xi)/4, h=(b-a)/3"],
              ["Tres nodos interiores", "(b-a)/3 [2f((3a+b)/4)-f((a+b)/2)+2f((a+3b)/4)]", "14h^5 f^(4)(xi)/45, h=(b-a)/4"]
            ]
          }
        ]
      },
      {
        heading: {
          es: "Punto medio simple",
          eu: "Erdiko puntu sinplea",
          en: "Simple midpoint"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "El punto medio simple sustituye la curva por un rectángulo cuya altura se mide en el centro del intervalo. Usa un solo valor de la función, no los extremos.",
              eu: "Erdiko puntu sinpleak kurba laukizuzen batez ordezkatzen du, eta altuera tartearen erdian neurtzen da. Funtzioaren balio bakarra erabiltzen du, ez muturrak.",
              en: "The simple midpoint rule replaces the curve by a rectangle whose height is measured at the centre of the interval. It uses one function value, not the endpoints."
            }
          },
          {
            kind: "diagram",
            variant: "midpoint-simple",
            caption: {
              es: "La aproximación es el área del rectángulo de base $b-a$ y altura $f(m)$, con $m=(a+b)/2$.",
              eu: "Hurbilketa $b-a$ oinarriko eta $f(m)$ altuerako laukizuzenaren azalera da, $m=(a+b)/2$ izanik.",
              en: "The approximation is the area of the rectangle with base $b-a$ and height $f(m)$, where $m=(a+b)/2$."
            }
          },
          {
            kind: "steps",
            title: {
              es: "Deducción directa",
              eu: "Dedukzio zuzena",
              en: "Direct derivation"
            },
            steps: [
              {
                text: {
                  es: "Definimos el punto medio del intervalo:",
                  eu: "Tartearen erdiko puntua definitzen dugu:",
                  en: "Define the midpoint of the interval:"
                },
                formula: "m=\\frac{a+b}{2}"
              },
              {
                text: {
                  es: "Aproximamos $f(x)$ por la constante $f(m)$ en todo $[a,b]$:",
                  eu: "$f(x)$ konstante batez hurbiltzen dugu $[a,b]$ osoan: $f(m)$.",
                  en: "Approximate $f(x)$ by the constant $f(m)$ on all of $[a,b]$:"
                },
                formula: "\\int_a^b f(x)\\,dx\\approx\\int_a^b f(m)\\,dx"
              },
              {
                text: {
                  es: "Como $f(m)$ no depende de $x$, sale fuera de la integral y queda el área del rectángulo:",
                  eu: "$f(m)$ ez denez $x$-ren araberakoa, integraletik kanpora ateratzen da eta laukizuzenaren azalera geratzen da:",
                  en: "Since $f(m)$ does not depend on $x$, it factors out and leaves the rectangle area:"
                },
                formula: "M_1=(b-a)f\\!\\left(\\frac{a+b}{2}\\right)"
              },
              {
                text: {
                  es: "Si $f\\in\\mathcal{C}^2[a,b]$, el error exacto tiene signo positivo en la convención $E=I-M_1$:",
                  eu: "$f\\in\\mathcal{C}^2[a,b]$ bada, errore zehatzak zeinu positiboa du $E=I-M_1$ konbentzioan:",
                  en: "If $f\\in\\mathcal{C}^2[a,b]$, the exact error has positive sign under the convention $E=I-M_1$:"
                },
                formula: "E_M=\\int_a^b f(x)\\,dx-M_1=\\frac{(b-a)^3}{24}f''(\\xi)"
              }
            ]
          }
        ]
      },
      {
        heading: {
          es: "Punto medio compuesto",
          eu: "Erdiko puntu konposatua",
          en: "Composite midpoint"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Para usar punto medio en n subintervalos, se parte [a,b] con paso $h=(b-a)/n$ y se evalúa la función en el centro de cada subintervalo. Esta notación no obliga a que n sea par.",
              eu: "Erdiko puntua n azpitartetan erabiltzeko, [a,b] tartea $h=(b-a)/n$ pausoz banatzen da eta funtzioa azpitarte bakoitzaren erdian ebaluatzen da. Notazio honek ez du n bikoitia izatea eskatzen.",
              en: "To use midpoint on n subintervals, split [a,b] with step $h=(b-a)/n$ and evaluate the function at the centre of each subinterval. This notation does not require n to be even."
            }
          },
          {
            kind: "diagram",
            variant: "composite-midpoint",
            caption: {
              es: "El punto medio compuesto suma rectángulos de anchura $h$. Cada altura es $f(m_i)$, con $m_i$ en el centro de su subintervalo.",
              eu: "Erdiko puntu konposatuak $h$ zabalerako laukizuzenak batzen ditu. Altuera bakoitza $f(m_i)$ da, $m_i$ bere azpitartearen erdian dagoela.",
              en: "Composite midpoint sums rectangles of width $h$. Each height is $f(m_i)$, with $m_i$ at the centre of its subinterval."
            }
          },
          {
            kind: "steps",
            title: {
              es: "Deducción para n subintervalos",
              eu: "n azpitartetarako dedukzioa",
              en: "Derivation for n subintervals"
            },
            steps: [
              {
                text: {
                  es: "Tomamos los nodos de la partición y el centro de cada subintervalo:",
                  eu: "Partizioaren nodoak eta azpitarte bakoitzaren erdigunea hartzen ditugu:",
                  en: "Take the partition nodes and the centre of each subinterval:"
                },
                formula: "x_i=a+ih,\\qquad m_i=\\frac{x_i+x_{i+1}}{2}=a+\\left(i+\\frac12\\right)h"
              },
              {
                text: {
                  es: "En el subintervalo $[x_i,x_{i+1}]$ usamos punto medio simple:",
                  eu: "$[x_i,x_{i+1}]$ azpitartean erdiko puntu sinplea erabiltzen dugu:",
                  en: "On the subinterval $[x_i,x_{i+1}]$, use the simple midpoint rule:"
                },
                formula: "M_i=h f(m_i)"
              },
              {
                text: {
                  es: "La regla compuesta es la suma de todos los rectángulos:",
                  eu: "Erregela konposatua laukizuzen guztien batura da:",
                  en: "The composite rule is the sum of all rectangles:"
                },
                formula: "M_n=h\\sum_{i=0}^{n-1}f(m_i)=h\\sum_{i=0}^{n-1}f\\!\\left(a+\\left(i+\\frac12\\right)h\\right)"
              },
              {
                text: {
                  es: "Sumando los errores locales $h^3 f''(\\xi_i)/24$ se obtiene el error global:",
                  eu: "$h^3 f''(\\xi_i)/24$ errore lokalak batuz errore globala lortzen da:",
                  en: "Summing the local errors $h^3 f''(\\xi_i)/24$ gives the global error:"
                },
                formula: "E_M=\\frac{h^3}{24}\\sum_{i=0}^{n-1}f''(\\xi_i)=\\frac{b-a}{24}h^2f''(\\xi)"
              }
            ]
          },
          {
            kind: "callout",
            variant: "warning",
            title: {
              es: "No mezcles nodos",
              eu: "Ez nahasi nodoak",
              en: "Do not mix nodes"
            },
            text: {
              es: "En tablas, los valores de punto medio deben estar en los centros $m_i$, no en los extremos $x_i$. Si la tabla solo da extremos, trapecio o Simpson suelen encajar mejor.",
              eu: "Tauletan, erdiko puntuko balioek $m_i$ zentroetan egon behar dute, ez $x_i$ muturretan. Taulak muturrak bakarrik ematen baditu, trapezioa edo Simpson hobeto egokitzen dira normalean.",
              en: "With tabulated data, midpoint values must be at the centres $m_i$, not at the endpoints $x_i$. If the table only gives endpoints, trapezoid or Simpson usually fits better."
            }
          }
        ]
      },
      {
        heading: {
          es: "Deducciones",
          eu: "Dedukzioak",
          en: "Derivations"
        },
        blocks: [
          { kind: "derivation", slug: "deduccion-integracion-punto-medio-simple" },
          { kind: "derivation", slug: "deduccion-integracion-punto-medio-compuesto" }
        ]
      }
    ]
  },
  {
    slug: "integracion-gauss",
    category,
    level: "avanzado",
    searchIntent: "cuadratura de gauss legendre chebyshev laguerre hermite pesos nodos",
    title: {
      es: "Cuadraturas de Gauss",
      eu: "Gaussen koadraturak",
      en: "Gaussian quadrature"
    },
    description: {
      es: "Cómo las cuadraturas de Gauss eligen nodos y pesos óptimos mediante polinomios ortogonales: Legendre, Chebyshev, Laguerre y Hermite.",
      eu: "Gaussen koadraturek polinomio ortogonalen bidez nodo eta pisu optimoak nola aukeratzen dituzten: Legendre, Chebyshev, Laguerre eta Hermite.",
      en: "How Gaussian quadrature chooses optimal nodes and weights using orthogonal polynomials: Legendre, Chebyshev, Laguerre and Hermite."
    },
    keywords: ["Gauss", "Legendre", "Chebyshev", "Laguerre", "Hermite"],
    prerequisites: ["integracion-cuadratura-lagrange"],
    related: [
      "deduccion-integracion-gauss-legendre-dos-puntos",
      "ejercicio-integracion-gauss-legendre",
      "ejercicio-integracion-gauss-chebyshev"
    ],
    sections: [
      {
        heading: {
          es: "Idea general",
          eu: "Ideia orokorra",
          en: "General idea"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Newton-Cotes fija nodos equiespaciados. Gauss hace lo contrario: permite mover los nodos y calcula pesos para que la regla sea exacta para polinomios del mayor grado posible.",
              eu: "Newton-Cotesek nodo ekidistanteak finkatzen ditu. Gaussen metodoak alderantziz egiten du: nodoak mugitzen uzten du eta pisuak kalkulatzen ditu erregela ahalik eta gradu handieneko polinomioetarako zehatza izan dadin.",
              en: "Newton-Cotes fixes equally spaced nodes. Gauss does the opposite: it allows the nodes to move and computes weights so the rule is exact for polynomials of the highest possible degree."
            }
          },
          {
            kind: "formula",
            tex: "\\int_a^b w(x)f(x)\\,dx\\approx\\sum_{i=1}^{n} c_i f(x_i),\\qquad w(x)>0"
          },
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Nodos por ortogonalidad",
              eu: "Nodoak ortogonalitatez",
              en: "Nodes by orthogonality"
            },
            text: {
              es: "Si $p_n$ es el polinomio ortogonal de grado $n$ asociado al peso $w$, los nodos de la cuadratura son las raíces de $p_n$.",
              eu: "$p_n$ $w$ pisuari lotutako $n$ graduko polinomio ortogonala bada, koadraturaren nodoak $p_n$-ren erroak dira.",
              en: "If $p_n$ is the degree-$n$ orthogonal polynomial associated with the weight $w$, the quadrature nodes are the roots of $p_n$."
            }
          },
          {
            kind: "formula",
            tex: "E=\\frac{f^{(2n)}(\\xi)}{(2n)!}\\int_a^b p_n^2(x)w(x)\\,dx"
          }
        ]
      },
      {
        heading: {
          es: "Gauss-Legendre",
          eu: "Gauss-Legendre",
          en: "Gauss-Legendre"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Gauss-Legendre usa $w(x)=1$ en $[-1,1]$. Para aplicar la regla en $[a,b]$ se transforma el intervalo de integración y se multiplica por el jacobiano.",
              eu: "Gauss-Legendrek $w(x)=1$ erabiltzen du $[-1,1]$ tartean. Erregela $[a,b]$-n aplikatzeko, integrazio-tartea eraldatzen da eta jakobiarrarekin biderkatzen da.",
              en: "Gauss-Legendre uses $w(x)=1$ on $[-1,1]$. To apply the rule on $[a,b]$, the integration interval is transformed and multiplied by the Jacobian."
            }
          },
          {
            kind: "formula",
            tex: "x=\\frac{b-a}{2}y+\\frac{b+a}{2},\\qquad dx=\\frac{b-a}{2}\\,dy"
          },
          {
            kind: "formula",
            tex: "\\int_a^b f(x)\\,dx\\approx\\frac{b-a}{2}\\sum_{i=1}^{n}c_i f\\!\\left(\\frac{b-a}{2}x_i+\\frac{b+a}{2}\\right)"
          },
          {
            kind: "table",
            head: {
              es: ["n", "Nodos", "Pesos"],
              eu: ["n", "Nodoak", "Pisuak"],
              en: ["n", "Nodes", "Weights"]
            },
            rows: [
              ["2", "-0.577350, 0.577350", "1.000000, 1.000000"],
              ["3", "0.000000, -0.774597, 0.774597", "0.888889, 0.555556, 0.555556"],
              ["4", "-0.339981, -0.861136, 0.339981, 0.861136", "0.652145, 0.347855, 0.652145, 0.347855"],
              ["5", "0.000000, -0.538469, -0.906180, 0.538469, 0.906180", "0.568889, 0.478629, 0.236927, 0.478629, 0.236927"]
            ]
          }
        ]
      },
      {
        heading: {
          es: "Otras familias de Gauss",
          eu: "Gaussen beste familiak",
          en: "Other Gaussian families"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La familia se elige mirando el peso y el dominio. Si la integral ya contiene una singularidad o una exponencial, conviene no pelearse con ella: se incorpora al peso.",
              eu: "Familia pisuari eta eremuari begiratuz aukeratzen da. Integralak jada singularitate bat edo esponentzial bat badu, ez da haren aurka egin behar: pisuan sartzen da.",
              en: "The family is chosen by looking at the weight and the domain. If the integral already contains a singularity or an exponential, it is better not to fight it: include it in the weight."
            }
          },
          {
            kind: "table",
            head: {
              es: ["Familia", "Peso y dominio", "Polinomios"],
              eu: ["Familia", "Pisua eta eremua", "Polinomioak"],
              en: ["Family", "Weight and domain", "Polynomials"]
            },
            rows: [
              ["Legendre", "w(x)=1, [-1,1]", "p0=1, p1=x, recurrence by Legendre"],
              ["Chebyshev", "w(x)=1/sqrt(1-x^2), [-1,1]", "T0=1, T1=x, Tk=2xT(k-1)-T(k-2)"],
              ["Laguerre", "w(x)=e^(-x), [0,+infty)", "L0=1, L1=1-x, recurrence by Laguerre"],
              ["Hermite", "w(x)=e^(-x^2), (-infty,+infty)", "H0=1, H1=2x, H(k+2)=2xH(k+1)-2(k+1)Hk"]
            ]
          },
          {
            kind: "formula",
            tex: "\\int_{-1}^{1}\\frac{f(x)}{\\sqrt{1-x^2}}\\,dx\\approx\\frac{\\pi}{n}\\sum_{i=1}^{n}f(x_i),\\qquad x_i=\\cos\\!\\left(\\pi\\frac{2i-1}{2n}\\right)"
          },
          {
            kind: "callout",
            variant: "warning",
            title: {
              es: "Error común",
              eu: "Ohiko akatsa",
              en: "Common mistake"
            },
            text: {
              es: "No uses una tabla de Legendre en una integral de Chebyshev, Laguerre o Hermite: los pesos y el intervalo pertenecen a problemas distintos.",
              eu: "Ez erabili Legendreren taula Chebyshev, Laguerre edo Hermiteren integral batean: pisuak eta tartea problema desberdinei dagozkie.",
              en: "Do not use a Legendre table in a Chebyshev, Laguerre or Hermite integral: the weights and the interval belong to different problems."
            }
          }
        ]
      },
      {
        heading: {
          es: "Deducción de Gauss-Legendre con dos puntos",
          eu: "Bi puntuko Gauss-Legendreren dedukzioa",
          en: "Derivation of two-point Gauss-Legendre"
        },
        blocks: [
          { kind: "derivation", slug: "deduccion-integracion-gauss-legendre-dos-puntos" }
        ]
      }
    ]
  },
  {
    slug: "integracion-multiple",
    category,
    level: "avanzado",
    searchIntent: "integracion multiple doble trapecio simpson gauss legendre pesos producto",
    title: {
      es: "Integración múltiple numérica",
      eu: "Zenbakizko integrazio anizkoitza",
      en: "Numerical multiple integration"
    },
    description: {
      es: "Cómo extender trapecio, Simpson y Gauss-Legendre a integrales dobles mediante reglas de producto y cambios de variable.",
      eu: "Nola hedatzen diren trapezioa, Simpson eta Gauss-Legendre integral bikoitzetara produktu-erregelen eta aldaketa aldagaien bidez.",
      en: "How trapezoid, Simpson and Gauss-Legendre extend to double integrals through product rules and changes of variables."
    },
    keywords: ["integración doble", "trapecio doble", "Gauss-Legendre doble", "pesos producto"],
    prerequisites: ["integracion-newton-cotes-cerradas", "integracion-gauss"],
    related: ["ejercicio-integracion-doble-gauss", "ejercicio-integracion-superficie"],
    sections: [
      {
        heading: {
          es: "De una integral a dos",
          eu: "Integral batetik bietara",
          en: "From one integral to two"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "En un rectángulo R=[a,b]×[c,d], una integral doble puede verse como una integral exterior de integrales interiores. Eso permite aplicar una regla unidimensional en y y después otra en x.",
              eu: "R=[a,b]×[c,d] laukizuzenean, integral bikoitza barruko integralen kanpoko integral gisa ikus daiteke. Horrek y norabidean erregela dimentsio bakarrekoa eta gero x norabidean beste bat aplikatzea ahalbidetzen du.",
              en: "On a rectangle R=[a,b]×[c,d], a double integral can be seen as an outer integral of inner integrals. That lets us apply a one-dimensional rule in y and then another in x."
            }
          },
          {
            kind: "formula",
            tex: "\\iint_R f(x,y)\\,dA=\\int_a^b\\left(\\int_c^d f(x,y)\\,dy\\right)dx"
          }
        ]
      },
      {
        heading: {
          es: "Trapecio doble",
          eu: "Trapezio bikoitza",
          en: "Double trapezoid"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Si h=(b-a)/n y k=(d-c)/m, aplicar trapecio en ambas direcciones produce pesos producto: las esquinas pesan 1, los bordes 2 y los interiores 4, multiplicados por hk/4.",
              eu: "h=(b-a)/n eta k=(d-c)/m badira, trapezioa bi norabideetan aplikatzeak produktu-pisuak sortzen ditu: izkinek 1 pisatzen dute, ertzek 2 eta barrukoek 4, denak hk/4 faktorearekin.",
              en: "If h=(b-a)/n and k=(d-c)/m, applying trapezoid in both directions gives product weights: corners weigh 1, edges 2 and interiors 4, all multiplied by hk/4."
            }
          },
          {
            kind: "formula",
            tex: "I\\approx\\frac{hk}{4}\\sum_{i=0}^{n}\\sum_{j=0}^{m}\\alpha_i\\beta_j f(x_i,y_j)"
          },
          {
            kind: "table",
            head: {
              es: ["Tipo de nodo", "Peso alpha_i beta_j"],
              eu: ["Nodo mota", "alpha_i beta_j pisua"],
              en: ["Node type", "Weight alpha_i beta_j"]
            },
            rows: [
              ["Esquina / Izkina / Corner", "1"],
              ["Borde no esquina / Ertza ez izkina / Edge not corner", "2"],
              ["Interior / Barrukoa / Interior", "4"]
            ]
          }
        ]
      },
      {
        heading: {
          es: "Gauss-Legendre doble",
          eu: "Gauss-Legendre bikoitza",
          en: "Double Gauss-Legendre"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Para Gauss-Legendre se transforma cada variable a [-1,1]. En un rectángulo, el factor delante de la suma es el producto de los dos jacobianos.",
              eu: "Gauss-Legendrerako aldagai bakoitza [-1,1] tartera eraldatzen da. Laukizuzen batean, baturaren aurreko faktorea bi jakobiarren produktua da.",
              en: "For Gauss-Legendre, each variable is transformed to [-1,1]. On a rectangle, the factor in front of the sum is the product of both Jacobians."
            }
          },
          {
            kind: "formula",
            tex: "\\int_a^b\\int_c^d f(x,y)\\,dy\\,dx\\approx\\frac{b-a}{2}\\frac{d-c}{2}\\sum_{i=1}^{n}\\sum_{j=1}^{m}c_i c_j f(x_i^*,y_j^*)"
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Misma idea para Simpson",
              eu: "Ideia bera Simpsonentzat",
              en: "Same idea for Simpson"
            },
            text: {
              es: "En Simpson doble se multiplican los patrones 1-4-2-...-4-1 de cada dirección. Para n=m=8, los interiores alternan pesos 4, 8 y 16 antes del factor h k /9.",
              eu: "Simpson bikoitzean norabide bakoitzeko 1-4-2-...-4-1 ereduak biderkatzen dira. n=m=8 denean, barruko pisuak 4, 8 eta 16 artean txandakatzen dira h k /9 faktorearen aurretik.",
              en: "In double Simpson, the 1-4-2-...-4-1 patterns from each direction are multiplied. For n=m=8, interior weights alternate between 4, 8 and 16 before the h k /9 factor."
            }
          },
          {
            kind: "callout",
            variant: "warning",
            title: {
              es: "Error común",
              eu: "Ohiko akatsa",
              en: "Common mistake"
            },
            text: {
              es: "No olvides transformar también el diferencial: cambiar x e y sin multiplicar por los jacobianos cambia la escala de toda la integral.",
              eu: "Ez ahaztu diferentziala ere eraldatzea: x eta y aldatzea baina jakobiarrez ez biderkatzea integral osoaren eskala aldatzea da.",
              en: "Do not forget to transform the differential too: changing x and y without multiplying by the Jacobians changes the scale of the whole integral."
            }
          }
        ]
      }
    ]
  }
];

export const integracionDerivations: ContentEntry[] = [
  {
    slug: "deduccion-integracion-trapecio",
    category,
    level: "medio",
    searchIntent: "deduccion regla trapecio lagrange integracion",
    title: {
      es: "Deducción: regla del trapecio",
      eu: "Frogapena: trapezioaren erregela",
      en: "Derivation: trapezoid rule"
    },
    description: {
      es: "Integrar el interpolante lineal de Lagrange en [a,b] para obtener la regla del trapecio y su interpretación geométrica.",
      eu: "[a,b] tartean Lagrangeren interpolatzaile lineala integratzea, trapezioaren erregela eta interpretazio geometrikoa lortzeko.",
      en: "Integrating the linear Lagrange interpolant on [a,b] to obtain the trapezoid rule and its geometric interpretation."
    },
    keywords: ["trapecio", "deducción", "Lagrange"],
    prerequisites: ["integracion-cuadratura-lagrange"],
    related: ["integracion-newton-cotes-cerradas", "ejercicio-integracion-trapecio-simpson"],
    sections: [
      {
        heading: {
          es: "Integrar la recta interpolante",
          eu: "Zuzen interpolatzailea integratu",
          en: "Integrating the interpolating line"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Queremos aproximar $\\int_a^b f(x)\\,dx$ usando solo los valores de la función en los extremos. La idea consiste en sustituir la curva por la recta que pasa por $(a,f(a))$ y $(b,f(b))$, e integrar esa recta.",
              eu: "$\\int_a^b f(x)\\,dx$ hurbildu nahi dugu funtzioaren muturretako balioak bakarrik erabiliz. Ideia kurba $(a,f(a))$ eta $(b,f(b))$ puntuetatik pasatzen den zuzenaz ordezkatzea da, eta zuzen hori integratzea.",
              en: "We want to approximate $\\int_a^b f(x)\\,dx$ using only the values of the function at the endpoints. Replace the curve by the line through $(a,f(a))$ and $(b,f(b))$, then integrate that line."
            }
          },
          {
            kind: "diagram",
            variant: "trapezoid-interpolant",
            caption: {
              es: "La curva se sustituye por la recta interpolante. El área bajo esa recta es la aproximación por trapecio.",
              eu: "Kurba zuzen interpolatzaileaz ordezkatzen da. Zuzen horren azpiko azalera da trapezio bidezko hurbilketa.",
              en: "The curve is replaced by the interpolating line. The area under that line is the trapezoid approximation."
            }
          },
          {
            kind: "steps",
            title: {
              es: "Deducción con Lagrange",
              eu: "Dedukzioa Lagrangerekin",
              en: "Derivation with Lagrange"
            },
            steps: [
              {
                text: {
                  es: "Tomamos los nodos extremos $x_0=a$ y $x_1=b$, con $h=b-a$. Las bases lineales de Lagrange valen 1 en su nodo y 0 en el otro:",
                  eu: "$x_0=a$ eta $x_1=b$ muturreko nodoak hartzen ditugu, $h=b-a$ izanik. Lagrangeren oinarri linealak 1 balio du bere nodoan eta 0 bestean:",
                  en: "Take the endpoint nodes $x_0=a$ and $x_1=b$, with $h=b-a$. The linear Lagrange bases equal 1 at their node and 0 at the other one:"
                },
                formula: "L_0(x)=\\frac{x-b}{a-b},\\qquad L_1(x)=\\frac{x-a}{b-a}"
              },
              {
                text: {
                  es: "El interpolante lineal queda como combinación de los valores conocidos:",
                  eu: "Interpolatzaile lineala balio ezagunen konbinazio gisa geratzen da:",
                  en: "The linear interpolant is the combination of the known values:"
                },
                formula: "p_1(x)=f(a)L_0(x)+f(b)L_1(x)"
              },
              {
                text: {
                  es: "Aproximamos la integral de $f$ por la integral de $p_1$. Los pesos de la fórmula son las integrales de las bases:",
                  eu: "$f$-ren integrala $p_1$-en integralaz hurbiltzen dugu. Formularen pisuak oinarrien integralak dira:",
                  en: "Approximate the integral of $f$ by the integral of $p_1$. The weights of the formula are the integrals of the bases:"
                },
                formula: "I\\approx f(a)\\int_a^b L_0(x)\\,dx+f(b)\\int_a^b L_1(x)\\,dx"
              },
              {
                text: {
                  es: "Calculamos el primer peso con el cambio $s=x-a$. Entonces $x-b=s-h$, $a-b=-h$, $dx=ds$ y los límites pasan de $x=a,b$ a $s=0,h$:",
                  eu: "Lehen pisua kalkulatzeko $s=x-a$ aldaketa egiten dugu. Orduan $x-b=s-h$, $a-b=-h$, $dx=ds$ eta mugak $x=a,b$-tik $s=0,h$-ra pasatzen dira:",
                  en: "Compute the first weight with the change $s=x-a$. Then $x-b=s-h$, $a-b=-h$, $dx=ds$, and the limits $x=a,b$ become $s=0,h$:"
                },
                formula: "\\begin{aligned}\\int_a^b L_0(x)\\,dx&=\\int_a^b\\frac{x-b}{a-b}\\,dx\\\\&=\\int_0^h\\frac{h-s}{h}\\,ds\\\\&=\\frac{1}{h}\\left[hs-\\frac{s^2}{2}\\right]_0^h=\\frac{h}{2}\\end{aligned}"
              },
              {
                text: {
                  es: "Calculamos el segundo peso con el mismo cambio. Ahora $x-a=s$ y $b-a=h$:",
                  eu: "Bigarren pisua aldaketa berarekin kalkulatzen dugu. Orain $x-a=s$ eta $b-a=h$ dira:",
                  en: "Compute the second weight with the same change. Now $x-a=s$ and $b-a=h$:"
                },
                formula: "\\begin{aligned}\\int_a^b L_1(x)\\,dx&=\\int_a^b\\frac{x-a}{b-a}\\,dx\\\\&=\\int_0^h\\frac{s}{h}\\,ds=\\frac{1}{h}\\left[\\frac{s^2}{2}\\right]_0^h=\\frac{h}{2}\\end{aligned}"
              },
              {
                text: {
                  es: "Los dos pesos son $h/2$. Al sustituirlos en la fórmula de cuadratura aparece la regla del trapecio simple:",
                  eu: "Bi pisuak $h/2$ dira. Koadratura-formulan ordezkatzean trapezio sinplearen erregela agertzen da:",
                  en: "Both weights are $h/2$. Substituting them in the quadrature formula gives the simple trapezoid rule:"
                },
                formula: "\\int_a^b f(x)\\,dx\\approx\\frac{h}{2}\\left[f(a)+f(b)\\right]"
              }
            ]
          },
          {
            kind: "diagram",
            variant: "lagrange-basis-areas",
            caption: {
              es: "Cada base de Lagrange tiene área $h/2$ en $[a,b]$. Por eso los dos extremos reciben el mismo peso.",
              eu: "Lagrangeren oinarri bakoitzak $h/2$ azalera du $[a,b]$ tartean. Horregatik bi muturrek pisu bera jasotzen dute.",
              en: "Each Lagrange basis has area $h/2$ on $[a,b]$. That gives the two endpoints the same weight."
            }
          },
          {
            kind: "steps",
            title: {
              es: "Lectura geométrica",
              eu: "Irakurketa geometrikoa",
              en: "Geometric reading"
            },
            steps: [
              {
                text: {
                  es: "La integral de $p_1$ es el área bajo una recta. Esa región es un trapecio de base $h=b-a$ y alturas paralelas $f(a)$ y $f(b)$.",
                  eu: "$p_1$-en integrala zuzen baten azpiko azalera da. Eskualde hori $h=b-a$ oinarriko trapezioa da, eta altuera paraleloak $f(a)$ eta $f(b)$ dira.",
                  en: "The integral of $p_1$ is the area under a line. That region is a trapezoid with base $h=b-a$ and parallel heights $f(a)$ and $f(b)$."
                },
                formula: "A_{\\text{trapecio}}=\\frac{\\text{base}}{2}\\left(\\text{altura}_1+\\text{altura}_2\\right)"
              },
              {
                text: {
                  es: "Al identificar base y alturas se obtiene la misma expresión que por Lagrange:",
                  eu: "Oinarria eta altuerak identifikatzean Lagrangerekin lortutako adierazpen bera ateratzen da:",
                  en: "Identifying the base and heights gives the same expression as the Lagrange derivation:"
                },
                formula: "A_{\\text{trapecio}}=\\frac{b-a}{2}\\left[f(a)+f(b)\\right]"
              }
            ]
          },
          {
            kind: "diagram",
            variant: "trapezoid-geometry",
            caption: {
              es: "La fórmula coincide con el área de un trapecio: base por la media de las dos alturas.",
              eu: "Formula trapezio baten azalerarekin bat dator: oinarria bider bi altueren batezbestekoa.",
              en: "The formula is the area of a trapezoid: base times the average of the two heights."
            }
          },
          {
            kind: "steps",
            title: {
              es: "Término de error",
              eu: "Errore-gaia",
              en: "Error term"
            },
            steps: [
              {
                text: {
                  es: "Si $f\\in\\mathcal{C}^2[a,b]$, el error de interpolación lineal en cada punto tiene esta forma:",
                  eu: "$f\\in\\mathcal{C}^2[a,b]$ bada, puntu bakoitzeko interpolazio linealaren erroreak forma hau du:",
                  en: "If $f\\in\\mathcal{C}^2[a,b]$, the linear interpolation error at each point has this form:"
                },
                formula: "f(x)-p_1(x)=\\frac{f''(\\xi_x)}{2}(x-a)(x-b)"
              },
              {
                text: {
                  es: "Integramos el producto que acompaña a $f''$. Con $s=x-a$ queda $(x-a)(x-b)=s(s-h)$:",
                  eu: "$f''$ biderkatzen duen produktua integratzen dugu. $s=x-a$ hartuta, $(x-a)(x-b)=s(s-h)$ geratzen da:",
                  en: "Integrate the product multiplying $f''$. With $s=x-a$, $(x-a)(x-b)=s(s-h)$:"
                },
                formula: "\\int_a^b(x-a)(x-b)\\,dx=\\int_0^h s(s-h)\\,ds=-\\frac{h^3}{6}"
              },
              {
                text: {
                  es: "Por el teorema del valor medio para integrales, existe $\\xi\\in(a,b)$ tal que:",
                  eu: "Integraletarako batez besteko balioaren teoremaren arabera, badago $\\xi\\in(a,b)$ non:",
                  en: "By the mean value theorem for integrals, there is $\\xi\\in(a,b)$ such that:"
                },
                formula: "\\int_a^b f(x)\\,dx-\\frac{h}{2}\\left[f(a)+f(b)\\right]=-\\frac{h^3}{12}f''(\\xi)"
              },
              {
                text: {
                  es: "La regla es de orden 2 local: el error depende de la curvatura de $f$ y crece como $(b-a)^3$ en un solo intervalo.",
                  eu: "Erregelak 2. ordena lokala du: errorea $f$-ren kurbaduraren araberakoa da eta tarte bakarrean $(b-a)^3$ bezala hazten da.",
                  en: "The rule has local order 2: the error depends on the curvature of $f$ and grows like $(b-a)^3$ on a single interval."
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-integracion-trapecio-compuesto",
    category,
    level: "medio",
    searchIntent: "deduccion trapecio compuesto n subintervalos error",
    title: {
      es: "Deducción: trapecio compuesto",
      eu: "Frogapena: trapezio konposatua",
      en: "Derivation: composite trapezoid"
    },
    description: {
      es: "De sumar trapecios simples en n subintervalos a los pesos 1,2,...,2,1 y al error global.",
      eu: "n azpitartetan trapezio sinpleak batuz 1,2,...,2,1 pisuetara eta errore globalera iristea.",
      en: "From summing simple trapezoids on n subintervals to the weights 1,2,...,2,1 and the global error."
    },
    keywords: ["trapecio compuesto", "deducción", "error"],
    prerequisites: ["deduccion-integracion-trapecio"],
    related: ["integracion-newton-cotes-cerradas", "ejercicio-integracion-punto-medio"],
    sections: [
      {
        heading: {
          es: "Sumar trapecios simples",
          eu: "Trapezio sinpleak batu",
          en: "Summing simple trapezoids"
        },
        blocks: [
          {
            kind: "diagram",
            variant: "composite-trapezoid",
            caption: {
              es: "Cada subintervalo aporta un trapecio. Los nodos interiores cuentan dos veces.",
              eu: "Azpitarte bakoitzak trapezio bat ematen du. Barruko nodoak bi aldiz zenbatzen dira.",
              en: "Each subinterval contributes one trapezoid. Interior nodes are counted twice."
            }
          },
          {
            kind: "steps",
            title: {
              es: "Fórmula para n subintervalos",
              eu: "n azpitartetarako formula",
              en: "Formula for n subintervals"
            },
            steps: [
              {
                text: {
                  es: "Partimos $[a,b]$ en n subintervalos iguales:",
                  eu: "$[a,b]$ n azpitarte berdinetan zatitzen dugu:",
                  en: "Split $[a,b]$ into n equal subintervals:"
                },
                formula: "x_i=a+ih,\\qquad h=\\frac{b-a}{n},\\qquad i=0,\\ldots,n"
              },
              {
                text: {
                  es: "En $[x_i,x_{i+1}]$ aplicamos el trapecio simple:",
                  eu: "$[x_i,x_{i+1}]$ tartean trapezio sinplea aplikatzen dugu:",
                  en: "On $[x_i,x_{i+1}]$, apply the simple trapezoid rule:"
                },
                formula: "T_i=\\frac{h}{2}\\left[f(x_i)+f(x_{i+1})\\right]"
              },
              {
                text: {
                  es: "La aproximación total es la suma de los n trapecios:",
                  eu: "Hurbilketa osoa n trapezioen batura da:",
                  en: "The total approximation is the sum of the n trapezoids:"
                },
                formula: "\\begin{aligned}T_n&=\\sum_{i=0}^{n-1}T_i\\\\&=\\frac{h}{2}\\sum_{i=0}^{n-1}\\left[f(x_i)+f(x_{i+1})\\right]\\end{aligned}"
              },
              {
                text: {
                  es: "Al escribir la suma completa, $f(x_0)$ y $f(x_n)$ aparecen una vez. Cada valor interior aparece dos veces:",
                  eu: "Batura osoa idaztean, $f(x_0)$ eta $f(x_n)$ behin agertzen dira. Barruko balio bakoitza bi aldiz agertzen da:",
                  en: "When the full sum is written out, $f(x_0)$ and $f(x_n)$ appear once. Every interior value appears twice:"
                },
                formula: "T_n=\\frac{h}{2}\\left[f(x_0)+2\\sum_{i=1}^{n-1}f(x_i)+f(x_n)\\right]"
              },
              {
                text: {
                  es: "El error global se obtiene sumando los errores locales del trapecio simple:",
                  eu: "Errore globala trapezio sinplearen errore lokalak batuz lortzen da:",
                  en: "The global error is obtained by summing the local errors of the simple trapezoid rule:"
                },
                formula: "\\begin{aligned}E_T&=-\\frac{h^3}{12}\\sum_{i=0}^{n-1}f''(\\xi_i)\\\\&=-\\frac{b-a}{12}h^2f''(\\xi)\\end{aligned}"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-integracion-punto-medio-simple",
    category,
    level: "medio",
    searchIntent: "deduccion punto medio simple integracion error",
    title: {
      es: "Deducción: punto medio simple",
      eu: "Frogapena: erdiko puntu sinplea",
      en: "Derivation: simple midpoint"
    },
    description: {
      es: "Sustituir la función por una altura central y obtener la regla del rectángulo centrado con su error.",
      eu: "Funtzioa erdiko altuera batez ordezkatzea eta laukizuzen zentratuaren erregela eta errorea lortzea.",
      en: "Replacing the function by a central height to obtain the centred rectangle rule and its error."
    },
    keywords: ["punto medio", "deducción", "Newton-Cotes abiertas"],
    prerequisites: ["integracion-newton-cotes-abiertas"],
    related: [
      "deduccion-integracion-punto-medio-compuesto",
      "ejercicio-integracion-punto-medio"
    ],
    sections: [
      {
        heading: {
          es: "Rectángulo centrado",
          eu: "Laukizuzen zentratua",
          en: "Centred rectangle"
        },
        blocks: [
          {
            kind: "diagram",
            variant: "midpoint-simple",
            caption: {
              es: "La base es $b-a$ y la altura se toma en $m=(a+b)/2$.",
              eu: "Oinarria $b-a$ da eta altuera $m=(a+b)/2$ puntuan hartzen da.",
              en: "The base is $b-a$ and the height is taken at $m=(a+b)/2$."
            }
          },
          {
            kind: "steps",
            title: {
              es: "Regla y error",
              eu: "Erregela eta errorea",
              en: "Rule and error"
            },
            steps: [
              {
                text: {
                  es: "Definimos el centro del intervalo:",
                  eu: "Tartearen zentroa definitzen dugu:",
                  en: "Define the centre of the interval:"
                },
                formula: "m=\\frac{a+b}{2}"
              },
              {
                text: {
                  es: "Aproximamos la función por la constante $f(m)$:",
                  eu: "Funtzioa $f(m)$ konstanteaz hurbiltzen dugu:",
                  en: "Approximate the function by the constant $f(m)$:"
                },
                formula: "\\int_a^b f(x)\\,dx\\approx\\int_a^b f(m)\\,dx"
              },
              {
                text: {
                  es: "Como $f(m)$ es constante respecto de $x$, la integral es base por altura:",
                  eu: "$f(m)$ konstantea denez $x$-rekiko, integrala oinarria bider altuera da:",
                  en: "Since $f(m)$ is constant with respect to $x$, the integral is base times height:"
                },
                formula: "M_1=(b-a)f(m)=(b-a)f\\!\\left(\\frac{a+b}{2}\\right)"
              },
              {
                text: {
                  es: "El término lineal de Taylor alrededor de $m$ no aporta área neta por simetría. El primer término que queda depende de $f''$:",
                  eu: "$m$ inguruko Taylorren gai linealak ez du azalera garbirik ematen simetriagatik. Geratzen den lehen gaia $f''$-ren araberakoa da:",
                  en: "The linear Taylor term around $m$ contributes no net area by symmetry. The first remaining term depends on $f''$:"
                },
                formula: "\\int_a^b f(x)\\,dx-M_1=\\frac{(b-a)^3}{24}f''(\\xi)"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-integracion-punto-medio-compuesto",
    category,
    level: "medio",
    searchIntent: "deduccion punto medio compuesto n subintervalos error",
    title: {
      es: "Deducción: punto medio compuesto",
      eu: "Frogapena: erdiko puntu konposatua",
      en: "Derivation: composite midpoint"
    },
    description: {
      es: "Generalizar el punto medio a n subintervalos usando los centros de cada bloque y sumar sus errores locales.",
      eu: "Erdiko puntua n azpitartetara orokortzea, bloke bakoitzaren zentroak erabiliz eta errore lokalak batuz.",
      en: "Generalising midpoint to n subintervals by using the centre of each block and summing local errors."
    },
    keywords: ["punto medio compuesto", "deducción", "error"],
    prerequisites: ["deduccion-integracion-punto-medio-simple"],
    related: ["integracion-newton-cotes-abiertas", "ejercicio-integracion-punto-medio"],
    sections: [
      {
        heading: {
          es: "Sumar rectángulos centrados",
          eu: "Laukizuzen zentratuak batu",
          en: "Summing centred rectangles"
        },
        blocks: [
          {
            kind: "diagram",
            variant: "composite-midpoint",
            caption: {
              es: "Cada rectángulo tiene anchura $h$ y altura $f(m_i)$.",
              eu: "Laukizuzen bakoitzak $h$ zabalera eta $f(m_i)$ altuera ditu.",
              en: "Each rectangle has width $h$ and height $f(m_i)$."
            }
          },
          {
            kind: "steps",
            title: {
              es: "Fórmula para n subintervalos",
              eu: "n azpitartetarako formula",
              en: "Formula for n subintervals"
            },
            steps: [
              {
                text: {
                  es: "Dividimos $[a,b]$ con paso $h$:",
                  eu: "$[a,b]$ tartea $h$ pausoz zatitzen dugu:",
                  en: "Split $[a,b]$ with step $h$:"
                },
                formula: "x_i=a+ih,\\qquad h=\\frac{b-a}{n}"
              },
              {
                text: {
                  es: "El centro del subintervalo $[x_i,x_{i+1}]$ es:",
                  eu: "$[x_i,x_{i+1}]$ azpitartearen zentroa hau da:",
                  en: "The centre of the subinterval $[x_i,x_{i+1}]$ is:"
                },
                formula: "m_i=\\frac{x_i+x_{i+1}}{2}=a+\\left(i+\\frac12\\right)h"
              },
              {
                text: {
                  es: "Aplicamos punto medio simple en cada subintervalo:",
                  eu: "Azpitarte bakoitzean erdiko puntu sinplea aplikatzen dugu:",
                  en: "Apply simple midpoint on each subinterval:"
                },
                formula: "M_i=h f(m_i)"
              },
              {
                text: {
                  es: "Sumamos todos los rectángulos:",
                  eu: "Laukizuzen guztiak batzen ditugu:",
                  en: "Sum all rectangles:"
                },
                formula: "M_n=h\\sum_{i=0}^{n-1}f(m_i)"
              },
              {
                text: {
                  es: "Sustituyendo la expresión de $m_i$ queda la forma computable:",
                  eu: "$m_i$-ren adierazpena ordezkatuz forma konputagarria geratzen da:",
                  en: "Substituting the expression for $m_i$ gives the computable form:"
                },
                formula: "M_n=h\\sum_{i=0}^{n-1}f\\!\\left(a+\\left(i+\\frac12\\right)h\\right)"
              },
              {
                text: {
                  es: "El error global se obtiene sumando los errores locales del punto medio simple:",
                  eu: "Errore globala erdiko puntu sinplearen errore lokalak batuz lortzen da:",
                  en: "The global error is obtained by summing the local errors of the simple midpoint rule:"
                },
                formula: "\\begin{aligned}E_M&=\\frac{h^3}{24}\\sum_{i=0}^{n-1}f''(\\xi_i)\\\\&=\\frac{b-a}{24}h^2f''(\\xi)\\end{aligned}"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-integracion-simpson",
    category,
    level: "avanzado",
    searchIntent: "deduccion simpson un tercio lagrange pesos 1 4 1",
    title: {
      es: "Deducción: Simpson 1/3",
      eu: "Frogapena: Simpson 1/3",
      en: "Derivation: Simpson 1/3"
    },
    description: {
      es: "De tres nodos equiespaciados a los pesos 1, 4, 1 de Simpson integrando el polinomio cuadrático de Lagrange.",
      eu: "Hiru nodo ekidistantetik Simpsonen 1, 4, 1 pisuetara, Lagrangeren bigarren graduko polinomioa integratuz.",
      en: "From three equally spaced nodes to Simpson's 1, 4, 1 weights by integrating the quadratic Lagrange polynomial."
    },
    keywords: ["Simpson", "deducción", "Lagrange", "pesos"],
    prerequisites: ["integracion-cuadratura-lagrange"],
    related: ["integracion-newton-cotes-cerradas", "ejercicio-integracion-trapecio-simpson"],
    sections: [
      {
        heading: {
          es: "Pesos de la parábola interpolante",
          eu: "Parabola interpolatzailearen pisuak",
          en: "Weights of the interpolating parabola"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Tomamos $x_0=a$, $x_1=\\frac{a+b}{2}$ y $x_2=b$. Escribimos $h=\\frac{b-a}{2}$ y usamos $t=\\frac{x-a}{h}$, de modo que $t$ recorre $[0,2]$.",
                  eu: "$x_0=a$, $x_1=\\frac{a+b}{2}$ eta $x_2=b$ hartzen ditugu. $h=\\frac{b-a}{2}$ idazten dugu eta $t=\\frac{x-a}{h}$ erabiltzen dugu; beraz, $t$-k $[0,2]$ zeharkatzen du.",
                  en: "Take $x_0=a$, $x_1=\\frac{a+b}{2}$ and $x_2=b$. Write $h=\\frac{b-a}{2}$ and use $t=\\frac{x-a}{h}$, so $t$ runs over $[0,2]$."
                },
                formula: "dx=h\\,dt"
              },
              {
                text: {
                  es: "Las bases cuadráticas en la variable t son:",
                  eu: "t aldagaiko bigarren graduko oinarriak hauek dira:",
                  en: "The quadratic bases in the variable t are:"
                },
                formula: "\\ell_0(t)=\\frac{(t-1)(t-2)}{2},\\quad \\ell_1(t)=-t(t-2),\\quad \\ell_2(t)=\\frac{t(t-1)}{2}"
              },
              {
                text: {
                  es: "Integramos cada base en [0,2] y multiplicamos por h:",
                  eu: "Oinarri bakoitza [0,2] tartean integratzen dugu eta h-rekin biderkatzen dugu:",
                  en: "Integrate each basis on [0,2] and multiply by h:"
                },
                formula: "h\\int_0^2\\ell_0(t)dt=\\frac{h}{3},\\quad h\\int_0^2\\ell_1(t)dt=\\frac{4h}{3},\\quad h\\int_0^2\\ell_2(t)dt=\\frac{h}{3}"
              },
              {
                text: {
                  es: "Al juntar los términos aparece Simpson 1/3:",
                  eu: "Terminoak elkartzean Simpson 1/3 agertzen da:",
                  en: "Collecting the terms gives Simpson 1/3:"
                },
                formula: "\\int_a^b f(x)\\,dx\\approx\\frac{h}{3}\\left[f(a)+4f\\!\\left(\\frac{a+b}{2}\\right)+f(b)\\right]"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-integracion-gauss-legendre-dos-puntos",
    category,
    level: "avanzado",
    searchIntent: "deduccion gauss legendre dos puntos nodos pesos",
    title: {
      es: "Deducción: Gauss-Legendre de dos puntos",
      eu: "Frogapena: bi puntuko Gauss-Legendre",
      en: "Derivation: two-point Gauss-Legendre"
    },
    description: {
      es: "Cómo imponer exactitud hasta grado 3 para obtener los nodos $\\pm 1/\\sqrt3$ y pesos 1 en $[-1,1]$.",
      eu: "Nola ezarri 3. gradurainoko zehaztasuna $[-1,1]$ tartean $\\pm 1/\\sqrt3$ nodoak eta 1 pisuak lortzeko.",
      en: "How imposing exactness up to degree 3 gives the nodes $\\pm 1/\\sqrt3$ and weights 1 on $[-1,1]$."
    },
    keywords: ["Gauss-Legendre", "dos puntos", "deducción"],
    prerequisites: ["integracion-gauss"],
    related: ["ejercicio-integracion-gauss-legendre", "integracion-gauss"],
    sections: [
      {
        heading: {
          es: "Exactitud para 1, x, x² y x³",
          eu: "Zehaztasuna 1, x, x² eta x³-rako",
          en: "Exactness for 1, x, x² and x³"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Buscamos una regla simétrica en $[-1,1]$ con nodos $-r$ y $r$ y pesos iguales $c$, porque el intervalo y el peso $w(x)=1$ son simétricos.",
                  eu: "$[-1,1]$ tartean $-r$ eta $r$ nodoak eta $c$ pisu berdinak dituen erregela simetrikoa bilatzen dugu, tartea eta $w(x)=1$ pisua simetrikoak direlako.",
                  en: "Seek a symmetric rule on $[-1,1]$ with nodes $-r$ and $r$ and equal weights $c$, because the interval and the weight $w(x)=1$ are symmetric."
                },
                formula: "\\int_{-1}^{1}f(x)dx\\approx c f(-r)+c f(r)"
              },
              {
                text: {
                  es: "Exigimos exactitud para $f(x)=1$:",
                  eu: "$f(x)=1$-erako zehaztasuna eskatzen dugu:",
                  en: "Impose exactness for $f(x)=1$:"
                },
                formula: "2=2c\\quad\\Longrightarrow\\quad c=1"
              },
              {
                text: {
                  es: "Las funciones impares $x$ y $x^3$ se satisfacen automáticamente por simetría. Exigimos exactitud para $f(x)=x^2$:",
                  eu: "$x$ eta $x^3$ funtzio bakoitiak automatikoki betetzen dira simetriagatik. $f(x)=x^2$-rako zehaztasuna eskatzen dugu:",
                  en: "The odd functions $x$ and $x^3$ are automatically exact by symmetry. Impose exactness for $f(x)=x^2$:"
                },
                formula: "\\int_{-1}^{1}x^2dx=\\frac{2}{3}=r^2+r^2=2r^2"
              },
              {
                text: {
                  es: "Despejando r aparece la regla de dos puntos:",
                  eu: "r askatuz bi puntuko erregela agertzen da:",
                  en: "Solving for r gives the two-point rule:"
                },
                formula: "r=\\frac{1}{\\sqrt{3}},\\qquad \\int_{-1}^{1}f(x)dx\\approx f\\!\\left(-\\frac{1}{\\sqrt{3}}\\right)+f\\!\\left(\\frac{1}{\\sqrt{3}}\\right)"
              }
            ]
          }
        ]
      }
    ]
  }
];

export const integracionExercises: ContentEntry[] = [
  {
    slug: "ejercicio-integracion-trapecio-simpson",
    category,
    level: "medio",
    searchIntent: "ejercicio trapecio simpson compuesto sin exp menos x",
    title: {
      es: "Ejercicio: trapecio y Simpson en una integral suave",
      eu: "Ariketa: trapezioa eta Simpson integral leun batean",
      en: "Exercise: trapezoid and Simpson on a smooth integral"
    },
    description: {
      es: "Aproximación de la integral de sin(x)e^{-x} entre 0 y π/2 con 4 y 8 subintervalos, comparando errores.",
      eu: "sin(x)e^{-x} funtzioaren integrala 0 eta π/2 artean 4 eta 8 azpitartetan hurbiltzea, erroreak alderatuz.",
      en: "Approximation of the integral of sin(x)e^{-x} from 0 to π/2 with 4 and 8 subintervals, comparing errors."
    },
    keywords: ["trapecio compuesto", "Simpson compuesto", "error"],
    prerequisites: ["integracion-newton-cotes-cerradas"],
    related: [
      "integracion-newton-cotes-cerradas",
      "deduccion-integracion-trapecio-compuesto",
      "deduccion-integracion-simpson"
    ],
    sections: [
      {
        heading: {
          es: "Cálculo y comparación",
          eu: "Kalkulua eta konparazioa",
          en: "Computation and comparison"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Integral de sin(x)e^{-x}",
              eu: "sin(x)e^{-x}-ren integrala",
              en: "Integral of sin(x)e^{-x}"
            },
            statement: {
              es: "Calcula I=∫_0^{π/2} sin(x)e^{-x} dx con trapecio y Simpson compuestos usando n=4 y n=8. El valor exacto es (1-e^{-π/2})/2.",
              eu: "Kalkulatu I=∫_0^{π/2} sin(x)e^{-x} dx trapezio eta Simpson konposatuekin, n=4 eta n=8 erabiliz. Balio zehatza (1-e^{-π/2})/2 da.",
              en: "Compute I=∫_0^{π/2} sin(x)e^{-x} dx with composite trapezoid and Simpson using n=4 and n=8. The exact value is (1-e^{-π/2})/2."
            },
            steps: [
              {
                text: {
                  es: "El valor exacto de referencia es:",
                  eu: "Erreferentziako balio zehatza hau da:",
                  en: "The exact reference value is:"
                },
                formula: "I=\\frac{1-e^{-\\pi/2}}{2}=0.396060211824619"
              },
              {
                text: {
                  es: "Con trapecio compuesto se obtienen estas aproximaciones:",
                  eu: "Trapezio konposatuarekin hurbilketa hauek lortzen dira:",
                  en: "Composite trapezoid gives these approximations:"
                },
                formula: "T_4=0.380590604382816,\\qquad T_8=0.392182862002726"
              },
              {
                text: {
                  es: "Con Simpson compuesto se obtienen:",
                  eu: "Simpson konposatuarekin hauek lortzen dira:",
                  en: "Composite Simpson gives:"
                },
                formula: "S_4=0.395839444235324,\\qquad S_8=0.396046947876029"
              },
              {
                text: {
                  es: "Los errores absolutos son:",
                  eu: "Errore absolutuak hauek dira:",
                  en: "The absolute errors are:"
                },
                formula: "|E|=(0.015469607441803,\\ 0.003877349821893,\\ 0.000220767589295,\\ 0.000013263948590)"
              }
            ],
            result: {
              text: {
                es: "Al reducir h mejora cada método; para el mismo n, Simpson es mucho más preciso por su error de orden h^4.",
                eu: "h txikitzean metodo bakoitza hobetzen da; n bera erabilita, Simpson askoz zehatzagoa da h^4 ordenako errorearengatik.",
                en: "Reducing h improves each method; for the same n, Simpson is much more accurate because its error is of order h^4."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-integracion-punto-medio",
    category,
    level: "medio",
    searchIntent: "ejercicio trapecio punto medio compuesto x cubo error",
    title: {
      es: "Ejercicio: trapecio y punto medio",
      eu: "Ariketa: trapezioa eta erdiko puntua",
      en: "Exercise: trapezoid and midpoint"
    },
    description: {
      es: "Comparación de trapecio compuesto, punto medio simple y punto medio compuesto, con errores absolutos y relativos.",
      eu: "Trapezio konposatua, erdiko puntu sinplea eta erdiko puntu konposatua alderatzea, errore absolutu eta erlatiboekin.",
      en: "Comparing composite trapezoid, simple midpoint and composite midpoint, with absolute and relative errors."
    },
    keywords: ["punto medio", "trapecio compuesto", "Newton-Cotes abiertas", "error"],
    prerequisites: ["integracion-newton-cotes-abiertas"],
    related: [
      "integracion-newton-cotes-abiertas",
      "integracion-newton-cotes-cerradas",
      "deduccion-integracion-punto-medio-simple",
      "deduccion-integracion-punto-medio-compuesto",
      "deduccion-integracion-trapecio-compuesto",
      "ejercicio-integracion-trapecio-simpson"
    ],
    sections: [
      {
        heading: {
          es: "Comparación en una integral corta",
          eu: "Konparazioa integral labur batean",
          en: "Comparison on a short integral"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Integral de x^3 en [0,1]",
              eu: "x^3-ren integrala [0,1]-en",
              en: "Integral of x^3 on [0,1]"
            },
            statement: {
              es: "Calcula $I=\\int_0^1 x^3\\,dx$. Compara trapecio compuesto con $n=2$, punto medio simple y punto medio compuesto con $n=2$.",
              eu: "Kalkulatu $I=\\int_0^1 x^3\\,dx$. Alderatu $n=2$ duen trapezio konposatua, erdiko puntu sinplea eta $n=2$ duen erdiko puntu konposatua.",
              en: "Compute $I=\\int_0^1 x^3\\,dx$. Compare composite trapezoid with $n=2$, simple midpoint and composite midpoint with $n=2$."
            },
            steps: [
              {
                text: {
                  es: "El valor exacto es:",
                  eu: "Balio zehatza hau da:",
                  en: "The exact value is:"
                },
                formula: "I=\\int_0^1x^3\\,dx=\\left[\\frac{x^4}{4}\\right]_0^1=\\frac14"
              },
              {
                text: {
                  es: "Para trapecio compuesto con $n=2$, $h=1/2$ y los nodos son $0,1/2,1$:",
                  eu: "$n=2$ duen trapezio konposatuan, $h=1/2$ eta nodoak $0,1/2,1$ dira:",
                  en: "For composite trapezoid with $n=2$, $h=1/2$ and the nodes are $0,1/2,1$:"
                },
                formula: "\\begin{aligned}T_2&=\\frac14\\left[f(0)+2f\\!\\left(\\frac12\\right)+f(1)\\right]\\\\&=\\frac14\\left[0+2\\cdot\\frac18+1\\right]=\\frac{5}{16}\\end{aligned}"
              },
              {
                text: {
                  es: "Para punto medio simple, el centro del intervalo completo es $m=1/2$:",
                  eu: "Erdiko puntu sinplean, tarte osoaren zentroa $m=1/2$ da:",
                  en: "For simple midpoint, the centre of the full interval is $m=1/2$:"
                },
                formula: "M_1=(1-0)f\\!\\left(\\frac12\\right)=\\frac18"
              },
              {
                text: {
                  es: "Para punto medio compuesto con $n=2$, los centros son $1/4$ y $3/4$:",
                  eu: "$n=2$ duen erdiko puntu konposatuan, zentroak $1/4$ eta $3/4$ dira:",
                  en: "For composite midpoint with $n=2$, the centres are $1/4$ and $3/4$:"
                },
                formula: "\\begin{aligned}M_2&=\\frac12\\left[f\\!\\left(\\frac14\\right)+f\\!\\left(\\frac34\\right)\\right]\\\\&=\\frac12\\left(\\frac{1}{64}+\\frac{27}{64}\\right)=\\frac{7}{32}\\end{aligned}"
              },
              {
                text: {
                  es: "Los errores absolutos y relativos son:",
                  eu: "Errore absolutu eta erlatiboak hauek dira:",
                  en: "The absolute and relative errors are:"
                },
                formula: "\\begin{array}{c|c|c} \\text{método} & |I-Q| & |I-Q|/I \\\\ \\hline T_2 & 1/16 & 25\\% \\\\ M_1 & 1/8 & 50\\% \\\\ M_2 & 1/32 & 12.5\\% \\end{array}"
              }
            ],
            result: {
              text: {
                es: "En este ejemplo, punto medio compuesto con dos subintervalos es el más preciso de los tres. La mejora viene de usar dos centros en lugar de un solo rectángulo para todo [0,1].",
                eu: "Adibide honetan, bi azpitartetako erdiko puntu konposatua da hiruretatik zehatzena. Hobekuntza bi zentro erabiltzetik dator, [0,1] osorako laukizuzen bakarra erabili beharrean.",
                en: "In this example, composite midpoint with two subintervals is the most accurate of the three. The improvement comes from using two centres instead of one rectangle for all of [0,1]."
              }
            }
          }
        ]
      },
      {
        heading: {
          es: "Usar solo puntos interiores",
          eu: "Barruko puntuak bakarrik erabili",
          en: "Using only interior points"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Punto medio con n=4 y n=8",
              eu: "Erdiko puntua n=4 eta n=8-rekin",
              en: "Midpoint with n=4 and n=8"
            },
            statement: {
              es: "Calcula I=∫_0^{π/2} sin(x)e^{-x} dx con punto medio compuesto usando n=4 y n=8.",
              eu: "Kalkulatu I=∫_0^{π/2} sin(x)e^{-x} dx erdiko puntu konposatuarekin, n=4 eta n=8 erabiliz.",
              en: "Compute I=∫_0^{π/2} sin(x)e^{-x} dx with composite midpoint using n=4 and n=8."
            },
            steps: [
              {
                text: {
                  es: "El valor exacto es el mismo del ejercicio anterior:",
                  eu: "Balio zehatza aurreko ariketako bera da:",
                  en: "The exact value is the same as in the previous exercise:"
                },
                formula: "I=0.396060211824619"
              },
              {
                text: {
                  es: "Las aproximaciones de punto medio son:",
                  eu: "Erdiko puntuaren hurbilketak hauek dira:",
                  en: "The midpoint approximations are:"
                },
                formula: "M_4=0.409710138362011,\\qquad M_8=0.401008515076530"
              },
              {
                text: {
                  es: "Sus errores absolutos son:",
                  eu: "Haien errore absolutuak hauek dira:",
                  en: "Their absolute errors are:"
                },
                formula: "|E_4|=0.013649926537392,\\qquad |E_8|=0.004948303251911"
              }
            ],
            result: {
              text: {
                es: "El error baja al aumentar el número de subintervalos, pero aquí sigue siendo mayor que Simpson para el mismo refinamiento.",
                eu: "Errorea jaisten da azpitarten kopurua handitzean, baina hemen Simpsonena baino handiagoa izaten jarraitzen du fintze bera erabilita.",
                en: "The error decreases when the number of subintervals increases, but here it remains larger than Simpson's for the same refinement."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-integracion-trabajo-tabulado",
    category,
    level: "medio",
    searchIntent: "ejercicio datos tabulados trapecio simpson punto medio trabajo fuerza coseno",
    title: {
      es: "Ejercicio: trabajo con datos tabulados",
      eu: "Ariketa: lana datu taulatuekin",
      en: "Exercise: work from tabulated data"
    },
    description: {
      es: "Cálculo del trabajo integrando F(x)cos(alpha(x)) a partir de una tabla, con trapecio, Simpson y punto medio.",
      eu: "F(x)cos(alpha(x)) integratuz lana kalkulatzea taula batetik, trapezioa, Simpson eta erdiko puntua erabiliz.",
      en: "Computing work by integrating F(x)cos(alpha(x)) from a table, using trapezoid, Simpson and midpoint."
    },
    keywords: ["datos tabulados", "trabajo", "trapecio", "Simpson", "punto medio"],
    prerequisites: ["integracion-newton-cotes-cerradas", "integracion-newton-cotes-abiertas"],
    related: ["ejercicio-integracion-trapecio-simpson", "ejercicio-integracion-punto-medio"],
    sections: [
      {
        heading: {
          es: "Integrar una tabla",
          eu: "Taula bat integratu",
          en: "Integrating a table"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Trabajo W",
              eu: "W lana",
              en: "Work W"
            },
            statement: {
              es: "Con paso 1.52 y datos F=[0,40.04,57.83,62.28,46.71,53.38,22.24], alpha=[0.5,1.4,0.75,0.9,1.3,1.48,1.5], calcula W=∫F(x)cos(alpha(x))dx.",
              eu: "1.52 pausua eta F=[0,40.04,57.83,62.28,46.71,53.38,22.24], alpha=[0.5,1.4,0.75,0.9,1.3,1.48,1.5] datuak erabiliz, kalkulatu W=∫F(x)cos(alpha(x))dx.",
              en: "With step 1.52 and data F=[0,40.04,57.83,62.28,46.71,53.38,22.24], alpha=[0.5,1.4,0.75,0.9,1.3,1.48,1.5], compute W=∫F(x)cos(alpha(x))dx."
            },
            steps: [
              {
                text: {
                  es: "Primero se construye el integrando tabulado multiplicando F por cos(alpha):",
                  eu: "Lehenik integrakizun taulatua eraikitzen da F cos(alpha)-rekin biderkatuz:",
                  en: "First build the tabulated integrand by multiplying F by cos(alpha):"
                },
                formula: "g_i=F_i\\cos(\\alpha_i)"
              },
              {
                text: {
                  es: "Aplicando trapecio y Simpson a los datos medidos se obtiene:",
                  eu: "Neurtutako datuei trapezioa eta Simpson aplikatuz, hau lortzen da:",
                  en: "Applying trapezoid and Simpson to the measured data gives:"
                },
                formula: "T=161.0507484870318,\\qquad S=158.3980289247424"
              },
              {
                text: {
                  es: "Para punto medio se interpretan los datos como alturas centrales y se usan nodos auxiliares de paso 1.52/2:",
                  eu: "Erdiko punturako, datuak erdiko altueratzat hartzen dira eta 1.52/2 pausuko nodo laguntzaileak erabiltzen dira:",
                  en: "For midpoint, interpret the data as central heights and use auxiliary nodes of step 1.52/2:"
                },
                formula: "M=162.24638"
              }
            ],
            result: {
              text: {
                es: "La regla debe adaptarse al significado de la tabla: en punto medio, los valores medidos son centros de rectángulos, no extremos.",
                eu: "Erregela taularen esanahira egokitu behar da: erdiko puntuan, neurtutako balioak laukizuzenen zentroak dira, ez muturrak.",
                en: "The rule must match the meaning of the table: in midpoint, the measured values are rectangle centres, not endpoints."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-integracion-gauss-legendre",
    category,
    level: "avanzado",
    searchIntent: "ejercicio gauss legendre e menos x cuadrado intervalo transformacion",
    title: {
      es: "Ejercicio: Gauss-Legendre en un intervalo general",
      eu: "Ariketa: Gauss-Legendre tarte orokor batean",
      en: "Exercise: Gauss-Legendre on a general interval"
    },
    description: {
      es: "Cambio de variable de [1,1.5] a [-1,1] y aplicación de Gauss-Legendre con n=2 y n=3.",
      eu: "[1,1.5] tartetik [-1,1] tartera aldaketa egin eta Gauss-Legendre n=2 eta n=3-rekin aplikatzea.",
      en: "Changing variables from [1,1.5] to [-1,1] and applying Gauss-Legendre with n=2 and n=3."
    },
    keywords: ["Gauss-Legendre", "cambio de variable", "nodos"],
    prerequisites: ["integracion-gauss", "deduccion-integracion-gauss-legendre-dos-puntos"],
    related: ["integracion-gauss", "ejercicio-integracion-doble-gauss"],
    sections: [
      {
        heading: {
          es: "Transformar y sumar",
          eu: "Eraldatu eta batu",
          en: "Transform and sum"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Integral de e^{-x²}",
              eu: "e^{-x²}-ren integrala",
              en: "Integral of e^{-x²}"
            },
            statement: {
              es: "Calcula $I=\\int_1^{1.5} e^{-x^2}\\,dx$ con Gauss-Legendre usando $n=2$ y $n=3$.",
              eu: "Kalkulatu $I=\\int_1^{1.5} e^{-x^2}\\,dx$ Gauss-Legendre erabiliz, $n=2$ eta $n=3$-rekin.",
              en: "Compute $I=\\int_1^{1.5} e^{-x^2}\\,dx$ with Gauss-Legendre using $n=2$ and $n=3$."
            },
            steps: [
              {
                text: {
                  es: "Transformamos [1,1.5] en [-1,1]:",
                  eu: "[1,1.5] tartea [-1,1] bihurtzen dugu:",
                  en: "Transform [1,1.5] into [-1,1]:"
                },
                formula: "x=\\frac{1}{4}y+\\frac{5}{4},\\qquad dx=\\frac{1}{4}dy"
              },
              {
                text: {
                  es: "La integral queda:",
                  eu: "Integrala honela geratzen da:",
                  en: "The integral becomes:"
                },
                formula: "I=\\frac{1}{4}\\int_{-1}^{1}e^{-(y+5)^2/16}\\,dy"
              },
              {
                text: {
                  es: "Con dos nodos, ±0.577350 y pesos 1:",
                  eu: "Bi nodorekin, ±0.577350 eta 1 pisuekin:",
                  en: "With two nodes, ±0.577350 and weights 1:"
                },
                formula: "I_2=0.109400"
              },
              {
                text: {
                  es: "Con tres nodos, 0 y ±0.774597, pesos 0.888889 y 0.555556:",
                  eu: "Hiru nodorekin, 0 eta ±0.774597, 0.888889 eta 0.555556 pisuekin:",
                  en: "With three nodes, 0 and ±0.774597, weights 0.888889 and 0.555556:"
                },
                formula: "I_3=0.109364"
              }
            ],
            result: {
              text: {
                es: "La transformación correcta incluye el factor 1/4; sin él, el resultado queda cuatro veces mayor.",
                eu: "Eraldaketa zuzenak 1/4 faktorea barne hartzen du; hori gabe, emaitza lau aldiz handiagoa geratzen da.",
                en: "The correct transformation includes the factor 1/4; without it, the result is four times too large."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-integracion-gauss-chebyshev",
    category,
    level: "avanzado",
    searchIntent: "ejercicio gauss chebyshev error seis decimales exponencial",
    title: {
      es: "Ejercicio: Gauss-Chebyshev y cota de error",
      eu: "Ariketa: Gauss-Chebyshev eta errore-borna",
      en: "Exercise: Gauss-Chebyshev and an error bound"
    },
    description: {
      es: "Determinar cuántos nodos garantizan seis decimales en una integral con peso de Chebyshev.",
      eu: "Chebyshev-en pisua duen integral batean sei dezimal bermatzeko zenbat nodo behar diren zehaztea.",
      en: "Determining how many nodes guarantee six decimals in an integral with Chebyshev weight."
    },
    keywords: ["Gauss-Chebyshev", "cota de error", "seis decimales"],
    prerequisites: ["integracion-gauss"],
    related: ["integracion-gauss", "ejercicio-integracion-gauss-legendre"],
    sections: [
      {
        heading: {
          es: "Elegir n antes de calcular",
          eu: "n aukeratu kalkulatu aurretik",
          en: "Choosing n before computing"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Integral con peso de Chebyshev",
              eu: "Chebyshev-en pisuko integrala",
              en: "Integral with Chebyshev weight"
            },
            statement: {
              es: "Calcula $\\int_{-1}^{1}\\frac{e^x}{\\sqrt{1-x^2}}\\,dx$ con seis decimales garantizados usando la cota del error.",
              eu: "Kalkulatu $\\int_{-1}^{1}\\frac{e^x}{\\sqrt{1-x^2}}\\,dx$ sei dezimal bermatuz, errore-bornaren bidez.",
              en: "Compute $\\int_{-1}^{1}\\frac{e^x}{\\sqrt{1-x^2}}\\,dx$ with six guaranteed decimals using the error bound."
            },
            steps: [
              {
                text: {
                  es: "La cota usada para Chebyshev queda acotada por e en (-1,1):",
                  eu: "Chebyshev-erako erabilitako borna e-rekin mugatzen da (-1,1) tartean:",
                  en: "The Chebyshev error bound is bounded by e on (-1,1):"
                },
                formula: "|E|\\le\\frac{2\\pi e}{2^{2n}(2n)!}"
              },
              {
                text: {
                  es: "Probando n=1,2,3,4,5 se obtienen las cotas:",
                  eu: "n=1,2,3,4,5 probatuta, borna hauek lortzen dira:",
                  en: "Testing n=1,2,3,4,5 gives the bounds:"
                },
                formula: "2.134933555,\\ 0.044477782,\\ 3.70648\\cdot10^{-4},\\ 1.65468\\cdot10^{-6},\\ 4.59633\\cdot10^{-9}"
              },
              {
                text: {
                  es: "El primer $n$ que garantiza error menor que $10^{-6}$ es $n=5$.",
                  eu: "$10^{-6}$ baino errore txikiagoa bermatzen duen lehen $n$ balioa $n=5$ da.",
                  en: "The first $n$ that guarantees error below $10^{-6}$ is $n=5$."
                },
                formula: "n=5"
              },
              {
                text: {
                  es: "Con los cinco nodos de Chebyshev, la suma ponderada da:",
                  eu: "Chebyshev-en bost nodoekin, batura haztatuak hau ematen du:",
                  en: "With the five Chebyshev nodes, the weighted sum gives:"
                },
                formula: "I\\approx\\frac{\\pi}{5}\\left(e^{-0.951057}+e^{-0.587785}+e^0+e^{0.587785}+e^{0.951057}\\right)=3.977463"
              }
            ],
            result: {
              text: {
                es: "La cota sirve para decidir n antes de confiar en los decimales del resultado.",
                eu: "Bornak n erabakitzen laguntzen du emaitzaren dezimaletan fidatu aurretik.",
                en: "The bound is used to decide n before trusting the decimals of the result."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-integracion-doble-gauss",
    category,
    level: "avanzado",
    searchIntent: "ejercicio integral doble gauss legendre ln x 2y",
    title: {
      es: "Ejercicio: integral doble con Gauss-Legendre",
      eu: "Ariketa: integral bikoitza Gauss-Legendrerekin",
      en: "Exercise: double integral with Gauss-Legendre"
    },
    description: {
      es: "Transformar un rectángulo a [-1,1]×[-1,1] y resolver una integral doble con n=m=3.",
      eu: "Laukizuzen bat [-1,1]×[-1,1] eremura eraldatu eta integral bikoitza n=m=3-rekin ebaztea.",
      en: "Transforming a rectangle to [-1,1]×[-1,1] and solving a double integral with n=m=3."
    },
    keywords: ["integral doble", "Gauss-Legendre", "cambio de variable"],
    prerequisites: ["integracion-multiple", "integracion-gauss"],
    related: ["integracion-multiple", "ejercicio-integracion-superficie"],
    sections: [
      {
        heading: {
          es: "Producto de pesos",
          eu: "Pisuen produktua",
          en: "Product of weights"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Integral de ln(x+2y)",
              eu: "ln(x+2y)-ren integrala",
              en: "Integral of ln(x+2y)"
            },
            statement: {
              es: "Calcula ∫_{1.4}^{2}∫_{1}^{1.5} ln(x+2y) dy dx con Gauss-Legendre y n=m=3.",
              eu: "Kalkulatu ∫_{1.4}^{2}∫_{1}^{1.5} ln(x+2y) dy dx Gauss-Legendre erabiliz eta n=m=3 izanik.",
              en: "Compute ∫_{1.4}^{2}∫_{1}^{1.5} ln(x+2y) dy dx with Gauss-Legendre and n=m=3."
            },
            steps: [
              {
                text: {
                  es: "Los cambios de variable son:",
                  eu: "Aldagai-aldaketak hauek dira:",
                  en: "The changes of variables are:"
                },
                formula: "x=0.3u+1.7,\\qquad y=0.25v+1.25"
              },
              {
                text: {
                  es: "El producto de jacobianos es $0.3\\cdot 0.25=0.075$:",
                  eu: "Jakobiarren produktua $0.3\\cdot 0.25=0.075$ da:",
                  en: "The product of Jacobians is $0.3\\cdot 0.25=0.075$:"
                },
                formula: "I=0.075\\int_{-1}^{1}\\int_{-1}^{1}\\ln(0.3u+0.5v+4.2)\\,dv\\,du"
              },
              {
                text: {
                  es: "Con nodos 0, ±0.774597 y pesos 0.888889, 0.555556, 0.555556:",
                  eu: "0, ±0.774597 nodoekin eta 0.888889, 0.555556, 0.555556 pisuekin:",
                  en: "With nodes 0, ±0.774597 and weights 0.888889, 0.555556, 0.555556:"
                },
                formula: "I\\approx0.075\\sum_{i=1}^{3}\\sum_{j=1}^{3}c_i c_j\\ln(0.3u_i+0.5v_j+4.2)"
              }
            ],
            result: {
              text: {
                es: "El resultado numérico es 0.429554959579526.",
                eu: "Emaitza numerikoa 0.429554959579526 da.",
                en: "The numerical result is 0.429554959579526."
              },
              formula: "I=0.429554959579526"
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-integracion-superficie",
    category,
    level: "avanzado",
    searchIntent: "ejercicio integral doble superficie semiesfera simpson gauss legendre",
    title: {
      es: "Ejercicio: integral doble de una superficie",
      eu: "Ariketa: gainazal baten integral bikoitza",
      en: "Exercise: double integral of a surface"
    },
    description: {
      es: "Comparación entre Simpson doble y Gauss-Legendre para una integral derivada de la semiesfera $x^2+y^2+f^2=9$.",
      eu: "Simpson bikoitzaren eta Gauss-Legendreren arteko konparazioa $x^2+y^2+f^2=9$ esfera-erdiari lotutako integral batean.",
      en: "Comparison between double Simpson and Gauss-Legendre for an integral derived from the hemisphere $x^2+y^2+f^2=9$."
    },
    keywords: ["Simpson doble", "Gauss-Legendre", "superficie", "semiesfera"],
    prerequisites: ["integracion-multiple", "integracion-newton-cotes-cerradas"],
    related: ["integracion-multiple", "ejercicio-integracion-doble-gauss"],
    sections: [
      {
        heading: {
          es: "Construir el integrando",
          eu: "Integrakizuna eraiki",
          en: "Building the integrand"
        },
        blocks: [
          {
            kind: "example",
            title: {
              es: "Semiesfera en el cuadrado unidad",
              eu: "Esfera-erdia unitate-karratuan",
              en: "Hemisphere on the unit square"
            },
            statement: {
              es: "Sea $f(x,y)=\\sqrt{9-x^2-y^2}$ y $R=[0,1]\\times[0,1]$. Calcula la integral de $\\sqrt{f_x^2+f_y^2}$ con Simpson $n=m=8$ y Gauss-Legendre $n=4$.",
              eu: "Izan bedi $f(x,y)=\\sqrt{9-x^2-y^2}$ eta $R=[0,1]\\times[0,1]$. Kalkulatu $\\sqrt{f_x^2+f_y^2}$-ren integrala Simpson $n=m=8$ eta Gauss-Legendre $n=4$ erabiliz.",
              en: "Let $f(x,y)=\\sqrt{9-x^2-y^2}$ and $R=[0,1]\\times[0,1]$. Compute the integral of $\\sqrt{f_x^2+f_y^2}$ with Simpson $n=m=8$ and Gauss-Legendre $n=4$."
            },
            steps: [
              {
                text: {
                  es: "Las derivadas parciales son:",
                  eu: "Deribatu partzialak hauek dira:",
                  en: "The partial derivatives are:"
                },
                formula: "\\frac{\\partial f}{\\partial x}=-\\frac{x}{\\sqrt{9-x^2-y^2}},\\qquad \\frac{\\partial f}{\\partial y}=-\\frac{y}{\\sqrt{9-x^2-y^2}}"
              },
              {
                text: {
                  es: "Por tanto, el integrando se simplifica a:",
                  eu: "Beraz, integrakizuna honela sinplifikatzen da:",
                  en: "Therefore, the integrand simplifies to:"
                },
                formula: "\\sqrt{\\left(\\frac{\\partial f}{\\partial x}\\right)^2+\\left(\\frac{\\partial f}{\\partial y}\\right)^2}=\\sqrt{\\frac{x^2+y^2}{9-x^2-y^2}}"
              },
              {
                text: {
                  es: "Con Simpson doble y n=m=8 se obtiene:",
                  eu: "Simpson bikoitzarekin eta n=m=8 erabilita, hau lortzen da:",
                  en: "With double Simpson and n=m=8, one obtains:"
                },
                formula: "I_S=0.267814255559730"
              },
              {
                text: {
                  es: "Con Gauss-Legendre $n=4$, tras transformar $x=\\frac{u+1}{2}$, $y=\\frac{v+1}{2}$, se obtiene:",
                  eu: "Gauss-Legendre $n=4$-rekin, $x=\\frac{u+1}{2}$ eta $y=\\frac{v+1}{2}$ eraldatu ondoren, hau lortzen da:",
                  en: "With Gauss-Legendre $n=4$, after transforming $x=\\frac{u+1}{2}$ and $y=\\frac{v+1}{2}$, one obtains:"
                },
                formula: "I_G=0.267770529696778"
              }
            ],
            result: {
              text: {
                es: "Los dos valores son muy próximos; Gauss-Legendre usa muchos menos puntos porque elige nodos no equiespaciados con pesos óptimos.",
                eu: "Bi balioak oso hurbil daude; Gauss-Legendrek puntu askoz gutxiago erabiltzen ditu, nodo ez-ekidistanteak eta pisu optimoak aukeratzen dituelako.",
                en: "The two values are very close; Gauss-Legendre uses far fewer points because it chooses non-equally spaced nodes with optimal weights."
              }
            }
          }
        ]
      }
    ]
  }
];
