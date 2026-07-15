import type { ContentEntry } from "../content";

/**
 * Numerical differentiation area, authored from the "Diferenciación numérica"
 * chapter: finite-difference formulas for the first and higher derivatives,
 * their order, and Richardson extrapolation. Worked numbers reproduce the
 * f(x)=x^2 e^{-x} comparison and the ln(x) Richardson example. Notation f_i=f(x_i).
 */

export const diferenciacionArticles: ContentEntry[] = [
  {
    slug: "diferenciacion-primera-derivada",
    category: "Diferenciación",
    level: "medio",
    searchIntent: "diferencias finitas primera derivada progresiva regresiva central orden",
    title: {
      es: "Diferencias finitas: la primera derivada",
      eu: "Diferentzia finituak: lehen deribatua",
      en: "Finite differences: the first derivative"
    },
    description: {
      es: "Fórmulas progresiva, regresiva y central para la primera derivada, sus versiones de tres y cinco puntos, el orden del error y una comparación numérica que sorprende.",
      eu: "Lehen deribatuaren formula progresiboa, erregresiboa eta zentrala, hiru eta bost puntuko bertsioak, errorearen ordena eta harritzen duen konparazio numeriko bat.",
      en: "Forward, backward and central formulas for the first derivative, their three- and five-point versions, the order of the error and a surprising numerical comparison."
    },
    keywords: ["diferencias finitas", "progresiva", "regresiva", "central", "orden"],
    prerequisites: ["fundamentos-taylor-truncamiento"],
    related: ["diferenciacion-derivadas-superiores", "diferenciacion-richardson", "deduccion-diferencia-progresiva-tres-puntos", "ejercicio-derivada-comparativa"],
    sections: [
      {
        heading: {
          es: "Las tres fórmulas básicas",
          eu: "Oinarrizko hiru formulak",
          en: "The three basic formulas"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Con nodos equiespaciados de paso h, la primera derivada se aproxima mirando hacia delante (progresiva), hacia atrás (regresiva) o a ambos lados (central). La central es más precisa porque cancela el término par del desarrollo de Taylor.",
              eu: "h pausuko nodo ekidistanteekin, lehen deribatua aurrera begiratuz (progresiboa), atzera begiratuz (erregresiboa) edo bi aldeetara (zentrala) hurbiltzen da. Zentrala zehatzagoa da Taylor-en garapeneko termino bikoitia ezabatzen duelako.",
              en: "With equally spaced nodes of step h, the first derivative is approximated looking forward (forward), backward (backward) or both sides (central). The central one is more accurate because it cancels the even term of the Taylor expansion."
            }
          },
          {
            kind: "formula",
            tex: "f'(x_i)\\approx\\frac{f_{i+1}-f_i}{h}+\\mathcal{O}(h)",
            caption: { es: "Progresiva, orden 1.", eu: "Progresiboa, 1. ordena.", en: "Forward, order 1." }
          },
          {
            kind: "formula",
            tex: "f'(x_i)\\approx\\frac{f_i-f_{i-1}}{h}+\\mathcal{O}(h)",
            caption: { es: "Regresiva, orden 1.", eu: "Erregresiboa, 1. ordena.", en: "Backward, order 1." }
          },
          {
            kind: "formula",
            tex: "f'(x_i)\\approx\\frac{f_{i+1}-f_{i-1}}{2h}+\\mathcal{O}(h^2)",
            caption: { es: "Central, orden 2.", eu: "Zentrala, 2. ordena.", en: "Central, order 2." }
          }
        ]
      },
      {
        heading: {
          es: "Fórmulas de mayor orden",
          eu: "Ordena handiagoko formulak",
          en: "Higher-order formulas"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Usando más nodos se sube el orden. Las de tres puntos alcanzan $\\mathcal{O}(h^2)$ con información solo a un lado; la central de cinco puntos llega a $\\mathcal{O}(h^4)$.",
              eu: "Nodo gehiago erabiliz ordena igotzen da. Hiru puntukoek $\\mathcal{O}(h^2)$ lortzen dute alde bakarreko informazioarekin; bost puntuko zentralak $\\mathcal{O}(h^4)$ lortzen du.",
              en: "Using more nodes raises the order. The three-point ones reach $\\mathcal{O}(h^2)$ with information on only one side; the five-point central one reaches $\\mathcal{O}(h^4)$."
            }
          },
          {
            kind: "formula",
            tex: "f'(x_i)\\approx\\frac{-f_{i+2}+4f_{i+1}-3f_i}{2h}+\\mathcal{O}(h^2)",
            caption: { es: "Progresiva de tres puntos.", eu: "Hiru puntuko progresiboa.", en: "Three-point forward." }
          },
          {
            kind: "formula",
            tex: "f'(x_i)\\approx\\frac{3f_i-4f_{i-1}+f_{i-2}}{2h}+\\mathcal{O}(h^2)",
            caption: { es: "Regresiva de tres puntos.", eu: "Hiru puntuko erregresiboa.", en: "Three-point backward." }
          },
          {
            kind: "formula",
            tex: "f'(x_i)\\approx\\frac{-f_{i+2}+8f_{i+1}-8f_{i-1}+f_{i-2}}{12h}+\\mathcal{O}(h^4)",
            caption: { es: "Central de cinco puntos.", eu: "Bost puntuko zentrala.", en: "Five-point central." }
          },
          {
            kind: "callout",
            variant: "warning",
            title: { es: "Mayor orden no garantiza menor error", eu: "Ordena handiagoak ez du errore txikiagoa bermatzen", en: "Higher order does not guarantee smaller error" },
            text: {
              es: "El orden describe cómo decrece el error cuando $h\\to 0$, no garantiza el menor error para un $h$ concreto. Cerca de los extremos o con $h$ no pequeño, una fórmula de mayor orden puede dar más error, como se ve en el [[ejercicio-derivada-comparativa|ejercicio comparativo]].",
              eu: "Ordenak errorea $h\\to 0$ denean nola txikitzen den deskribatzen du, ez du $h$ zehatz baterako errore txikiena bermatzen. Muturretatik hurbil edo $h$ txikia ez denean, ordena handiagoko formula batek errore handiagoa eman dezake, [[ejercicio-derivada-comparativa|ariketa konparatiboan]] ikusten den bezala.",
              en: "The order describes how the error decreases as $h\\to 0$; it does not guarantee the smallest error for a concrete $h$. Near the ends or with non-small $h$, a higher-order formula can give more error, as the [[ejercicio-derivada-comparativa|comparison exercise]] shows."
            }
          }
        ]
      },
      {
        heading: {
          es: "Deducción de la progresiva de tres puntos",
          eu: "Hiru puntuko progresiboaren dedukzioa",
          en: "Derivation of the three-point forward formula"
        },
        blocks: [
          { kind: "derivation", slug: "deduccion-diferencia-progresiva-tres-puntos" }
        ]
      }
    ]
  },
  {
    slug: "diferenciacion-derivadas-superiores",
    category: "Diferenciación",
    level: "medio",
    searchIntent: "segunda derivada diferencias finitas central progresiva regresiva orden",
    title: {
      es: "Derivadas de orden superior",
      eu: "Ordena handiagoko deribatuak",
      en: "Higher-order derivatives"
    },
    description: {
      es: "Aproximaciones de la segunda (y tercera) derivada por diferencias finitas progresivas, regresivas y centrales, con su orden de error.",
      eu: "Bigarren (eta hirugarren) deribatuaren hurbilketak diferentzia finitu progresibo, erregresibo eta zentralen bidez, beren errore-ordenarekin.",
      en: "Approximations of the second (and third) derivative by forward, backward and central finite differences, with their error order."
    },
    keywords: ["segunda derivada", "tercera derivada", "diferencias finitas", "central"],
    prerequisites: ["diferenciacion-primera-derivada"],
    related: ["diferenciacion-primera-derivada", "diferenciacion-richardson"],
    sections: [
      {
        heading: {
          es: "Segunda derivada",
          eu: "Bigarren deribatua",
          en: "Second derivative"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La fórmula más usada es la central, que combina el nodo y sus dos vecinos y ya tiene orden 2. La de cinco puntos sube a orden 4.",
              eu: "Erabiliena zentrala da, nodoa eta bere bi auzokideak konbinatzen dituena eta jada 2. ordena duena. Bost puntukoak 4. ordenera igotzen du.",
              en: "The most used is the central one, combining the node and its two neighbours and already of order 2. The five-point one rises to order 4."
            }
          },
          {
            kind: "formula",
            tex: "f''(x_i)\\approx\\frac{f_{i+1}-2f_i+f_{i-1}}{h^2}+\\mathcal{O}(h^2)",
            caption: { es: "Central, orden 2.", eu: "Zentrala, 2. ordena.", en: "Central, order 2." }
          },
          {
            kind: "formula",
            tex: "f''(x_i)\\approx\\frac{-f_{i+2}+16f_{i+1}-30f_i+16f_{i-1}-f_{i-2}}{12h^2}+\\mathcal{O}(h^4)",
            caption: { es: "Central de cinco puntos, orden 4.", eu: "Bost puntuko zentrala, 4. ordena.", en: "Five-point central, order 4." }
          },
          {
            kind: "list",
            items: {
              es: [
                "Progresiva O(h): (f_{i+2}−2f_{i+1}+f_i)/h²",
                "Progresiva O(h²): (−f_{i+3}+4f_{i+2}−5f_{i+1}+2f_i)/h²",
                "Regresiva O(h): (f_i−2f_{i−1}+f_{i−2})/h²",
                "Regresiva O(h²): (2f_i−5f_{i−1}+4f_{i−2}−f_{i−3})/h²"
              ],
              eu: [
                "Progresiboa O(h): (f_{i+2}−2f_{i+1}+f_i)/h²",
                "Progresiboa O(h²): (−f_{i+3}+4f_{i+2}−5f_{i+1}+2f_i)/h²",
                "Erregresiboa O(h): (f_i−2f_{i−1}+f_{i−2})/h²",
                "Erregresiboa O(h²): (2f_i−5f_{i−1}+4f_{i−2}−f_{i−3})/h²"
              ],
              en: [
                "Forward O(h): (f_{i+2}−2f_{i+1}+f_i)/h²",
                "Forward O(h²): (−f_{i+3}+4f_{i+2}−5f_{i+1}+2f_i)/h²",
                "Backward O(h): (f_i−2f_{i−1}+f_{i−2})/h²",
                "Backward O(h²): (2f_i−5f_{i−1}+4f_{i−2}−f_{i−3})/h²"
              ]
            }
          },
          {
            kind: "callout",
            variant: "note",
            title: { es: "Tercera derivada", eu: "Hirugarren deribatua", en: "Third derivative" },
            text: {
              es: "El mismo esquema da la tercera derivada; la central de orden 2 es (f_{i+2}−2f_{i+1}+2f_{i−1}−f_{i−2})/(2h³).",
              eu: "Eskema berak hirugarren deribatua ematen du; 2. ordenako zentrala (f_{i+2}−2f_{i+1}+2f_{i−1}−f_{i−2})/(2h³) da.",
              en: "The same scheme gives the third derivative; the order-2 central one is (f_{i+2}−2f_{i+1}+2f_{i−1}−f_{i−2})/(2h³)."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "diferenciacion-richardson",
    category: "Diferenciación",
    level: "avanzado",
    searchIntent: "extrapolación de Richardson orden error potencias pares diferenciación",
    title: {
      es: "Extrapolación de Richardson",
      eu: "Richardson-en estrapolazioa",
      en: "Richardson extrapolation"
    },
    description: {
      es: "Cómo combinar dos aproximaciones con pasos $h$ y $h/2$ para cancelar el término de error dominante y subir el orden, con las fórmulas para todos los términos y para potencias pares.",
      eu: "Nola konbinatu bi hurbilketa $h$ eta $h/2$ pausuekin errore-termino nagusia ezabatzeko eta ordena igotzeko, termino guztietarako eta berretura bikoitietarako formulekin.",
      en: "How to combine two approximations with steps $h$ and $h/2$ to cancel the dominant error term and raise the order, with the formulas for all terms and for even powers."
    },
    keywords: ["Richardson", "extrapolación", "orden", "potencias pares"],
    prerequisites: ["diferenciacion-primera-derivada"],
    related: ["diferenciacion-primera-derivada", "deduccion-richardson-orden", "ejercicio-richardson-logaritmo"],
    sections: [
      {
        heading: {
          es: "La idea: cancelar el error dominante",
          eu: "Ideia: errore nagusia ezabatu",
          en: "The idea: cancel the dominant error"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Si conocemos la forma del error de una aproximación $N_1(h)$ del valor exacto $M$, podemos combinar $N_1(h)$ y $N_1(h/2)$ para eliminar el primer término del error. Repetir el proceso sube el orden cada vez.",
              eu: "$M$ balio zehatzaren $N_1(h)$ hurbilketa baten errore-forma ezagutzen badugu, $N_1(h)$ eta $N_1(h/2)$ konbina ditzakegu errorearen lehen terminoa ezabatzeko. Prozesua errepikatzeak ordena igotzen du aldiro.",
              en: "If we know the error form of an approximation $N_1(h)$ of the exact value $M$, we can combine $N_1(h)$ and $N_1(h/2)$ to remove the first error term. Repeating raises the order each time."
            }
          },
          {
            kind: "formula",
            tex: "M=N_1(h)+k_1 h+k_2 h^2+k_3 h^3+\\cdots\\quad(\\mathcal{O}(h))"
          }
        ]
      },
      {
        heading: {
          es: "Caso general y potencias pares",
          eu: "Kasu orokorra eta berretura bikoitiak",
          en: "General case and even powers"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Cuando el error tiene todas las potencias de h, cada paso gana un orden. Si por simetría solo hay potencias pares (como en la central), cada paso gana dos órdenes y los pesos cambian.",
              eu: "Erroreak h-ren berretura guztiak dituenean, urrats bakoitzak ordena bat irabazten du. Simetriaz berretura bikoitiak soilik badaude (zentralarena bezala), urrats bakoitzak bi ordena irabazten ditu eta pisuak aldatzen dira.",
              en: "When the error has all powers of h, each step gains one order. If by symmetry only even powers appear (as in the central formula), each step gains two orders and the weights change."
            }
          },
          {
            kind: "callout",
            variant: "definition",
            title: { es: "Todos los términos", eu: "Termino guztiak", en: "All terms" },
            text: {
              es: "Partiendo de una aproximación $\\mathcal{O}(h)$, cada extrapolación sube un orden:",
              eu: "$\\mathcal{O}(h)$ hurbilketa batetik abiatuta, estrapolazio bakoitzak ordena bat igotzen du:",
              en: "Starting from an $\\mathcal{O}(h)$ approximation, each extrapolation raises one order:"
            },
            formula: "N_2(h)=N_1\\!\\left(\\tfrac{h}{2}\\right)+\\left[N_1\\!\\left(\\tfrac{h}{2}\\right)-N_1(h)\\right],\\quad N_3(h)=N_2\\!\\left(\\tfrac{h}{2}\\right)+\\tfrac{1}{3}\\left[N_2\\!\\left(\\tfrac{h}{2}\\right)-N_2(h)\\right]"
          },
          {
            kind: "callout",
            variant: "definition",
            title: { es: "Solo potencias pares", eu: "Berretura bikoitiak soilik", en: "Even powers only" },
            text: {
              es: "Partiendo de una aproximación $\\mathcal{O}(h^2)$, cada extrapolación sube dos órdenes:",
              eu: "$\\mathcal{O}(h^2)$ hurbilketa batetik abiatuta, estrapolazio bakoitzak bi ordena igotzen ditu:",
              en: "Starting from an $\\mathcal{O}(h^2)$ approximation, each extrapolation raises two orders:"
            },
            formula: "N_2(h)=N_1\\!\\left(\\tfrac{h}{2}\\right)+\\tfrac{1}{3}\\left[N_1\\!\\left(\\tfrac{h}{2}\\right)-N_1(h)\\right],\\quad N_3(h)=N_2\\!\\left(\\tfrac{h}{2}\\right)+\\tfrac{1}{15}\\left[N_2\\!\\left(\\tfrac{h}{2}\\right)-N_2(h)\\right]"
          },
          { kind: "derivation", slug: "deduccion-richardson-orden" }
        ]
      }
    ]
  }
];

export const diferenciacionDerivations: ContentEntry[] = [
  {
    slug: "deduccion-diferencia-progresiva-tres-puntos",
    category: "Diferenciación",
    level: "avanzado",
    searchIntent: "deducir diferencia progresiva tres puntos Taylor orden dos primera derivada",
    title: {
      es: "Deducción: progresiva de tres puntos O(h²)",
      eu: "Frogapena: hiru puntuko progresiboa O(h²)",
      en: "Derivation: three-point forward O(h²)"
    },
    description: {
      es: "Cómo combinar dos desarrollos de Taylor para eliminar la segunda derivada y obtener una diferencia progresiva de orden 2 para la primera derivada.",
      eu: "Nola konbinatu bi Taylor-garapen bigarren deribatua ezabatzeko eta lehen deribatuaren 2. ordenako diferentzia progresiboa lortzeko.",
      en: "How to combine two Taylor expansions to eliminate the second derivative and get an order-2 forward difference for the first derivative."
    },
    keywords: ["deducción", "progresiva", "tres puntos", "Taylor", "orden 2"],
    prerequisites: ["diferenciacion-primera-derivada"],
    related: ["diferenciacion-primera-derivada"],
    sections: [
      {
        heading: {
          es: "Combinar dos desarrollos",
          eu: "Bi garapen konbinatu",
          en: "Combining two expansions"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Usamos tres puntos de la malla: $x_i$, $x_{i+1}=x_i+h$ y $x_{i+2}=x_i+2h$. Los dos últimos se desarrollan alrededor de $x_i$ y restamos $f_i=f(x_i)$ en ambos casos:",
                  eu: "Sareko hiru puntu erabiltzen ditugu: $x_i$, $x_{i+1}=x_i+h$ eta $x_{i+2}=x_i+2h$. Azken biak $x_i$-ren inguruan garatzen ditugu, eta bietan $f_i=f(x_i)$ kentzen dugu:",
                  en: "We use three grid points: $x_i$, $x_{i+1}=x_i+h$, and $x_{i+2}=x_i+2h$. Expand the last two around $x_i$ and subtract $f_i=f(x_i)$ in both cases:"
                },
                formula: "\\begin{aligned} (1)\\quad f_{i+1}-f_i&=hf'(x_i)+\\tfrac{h^2}{2}f''(x_i)+\\mathcal{O}(h^3),\\\\ (2)\\quad f_{i+2}-f_i&=2hf'(x_i)+2h^2f''(x_i)+\\mathcal{O}(h^3). \\end{aligned}"
                },
              {
                text: {
                  es: "Ahora calculamos $4\\cdot(1)-(2)$. Así se cancela directamente la segunda derivada, porque $4(h^2/2)-2h^2=0$:",
                  eu: "Orain $4\\cdot(1)-(2)$ kalkulatzen dugu. Horrela, bigarren deribatua zuzenean ezabatzen da, $4(h^2/2)-2h^2=0$ delako:",
                  en: "Now compute $4\\cdot(1)-(2)$. This cancels the second derivative directly because $4(h^2/2)-2h^2=0$:"
                },
                formula: "4(f_{i+1}-f_i)-(f_{i+2}-f_i)=2hf'(x_i)+\\mathcal{O}(h^3)"
              },
              {
                text: {
                  es: "Reordenamos los tres valores y dividimos entre $2h$. Al dividir el resto $\\mathcal{O}(h^3)$ entre $h$, el error final es $\\mathcal{O}(h^2)$:",
                  eu: "Hiru balioak berrantolatu eta $2h$-z zatitzen dugu. $\\mathcal{O}(h^3)$ hondarra $h$-z zatitzean, azken errorea $\\mathcal{O}(h^2)$ da:",
                  en: "Rearrange the three values and divide by $2h$. Dividing the $\\mathcal{O}(h^3)$ remainder by $h$ gives a final error of $\\mathcal{O}(h^2)$:"
                },
                formula: "f'(x_i)=\\frac{-f_{i+2}+4f_{i+1}-3f_i}{2h}+\\mathcal{O}(h^2)"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-richardson-orden",
    category: "Diferenciación",
    level: "avanzado",
    searchIntent: "deducir extrapolación Richardson N2 orden dos combinar h medios",
    title: {
      es: "Deducción: Richardson sube el orden",
      eu: "Frogapena: Richardson-ek ordena igotzen du",
      en: "Derivation: Richardson raises the order"
    },
    description: {
      es: "De la forma del error a la fórmula de extrapolación: por qué combinar $N_1(h)$ y $N_1(h/2)$ elimina el término $\\mathcal{O}(h)$.",
      eu: "Errore-formatik estrapolazio-formulara: zergatik $N_1(h)$ eta $N_1(h/2)$ konbinatzeak $\\mathcal{O}(h)$ terminoa ezabatzen duen.",
      en: "From the error form to the extrapolation formula: why combining $N_1(h)$ and $N_1(h/2)$ removes the $\\mathcal{O}(h)$ term."
    },
    keywords: ["deducción", "Richardson", "orden", "extrapolación"],
    prerequisites: ["diferenciacion-richardson"],
    related: ["diferenciacion-richardson"],
    sections: [
      {
        heading: {
          es: "Eliminar el término O(h)",
          eu: "O(h) terminoa ezabatu",
          en: "Eliminating the O(h) term"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Partimos del error con todas las potencias y evaluamos también con paso $h/2$:",
                  eu: "Berretura guztien errorearetik abiatzen gara eta $h/2$ pausuarekin ere ebaluatzen dugu:",
                  en: "Start from the all-powers error and also evaluate with step $h/2$:"
                },
                formula: "\\begin{aligned} M&=N_1(h)+k_1 h+k_2 h^2+\\cdots\\\\ M&=N_1\\!\\left(\\tfrac{h}{2}\\right)+k_1\\tfrac{h}{2}+k_2\\tfrac{h^2}{4}+\\cdots \\end{aligned}"
              },
              {
                text: {
                  es: "Hacemos $2\\cdot(\\text{segunda})-(\\text{primera})$. El término $k_1h$ se cancela y queda un error $\\mathcal{O}(h^2)$:",
                  eu: "$2\\cdot(\\text{bigarrena})-(\\text{lehena})$ egiten dugu. $k_1h$ terminoa ezabatu eta $\\mathcal{O}(h^2)$ errorea geratzen da:",
                  en: "Compute $2\\cdot(\\text{second})-(\\text{first})$. The $k_1h$ term cancels and an $\\mathcal{O}(h^2)$ error remains:"
                },
                formula: "M=N_1\\!\\left(\\tfrac{h}{2}\\right)+\\left[N_1\\!\\left(\\tfrac{h}{2}\\right)-N_1(h)\\right]-k_2\\tfrac{h^2}{2}-\\cdots"
              },
              {
                text: {
                  es: "Llamamos $N_2(h)$ a la parte conocida: es una aproximación de orden 2. Repetir con los pesos $\\tfrac13$, $\\tfrac{1}{15}$, … sube más el orden.",
                  eu: "Zati ezagunari $N_2(h)$ deitzen diogu: 2. ordenako hurbilketa da. $\\tfrac13$, $\\tfrac{1}{15}$, … pisuekin errepikatzeak ordena gehiago igotzen du.",
                  en: "Call the known part $N_2(h)$: it is an order-2 approximation. Repeating with weights $\\tfrac13$, $\\tfrac{1}{15}$, … raises the order further."
                },
                formula: "N_2(h)=N_1\\!\\left(\\tfrac{h}{2}\\right)+\\left[N_1\\!\\left(\\tfrac{h}{2}\\right)-N_1(h)\\right]"
              }
            ]
          }
        ]
      }
    ]
  }
];

export const diferenciacionExercises: ContentEntry[] = [
  {
    slug: "ejercicio-derivada-comparativa",
    category: "Diferenciación",
    level: "medio",
    searchIntent: "ejercicio comparar fórmulas derivada progresiva central error x2 e-x",
    title: {
      es: "Ejercicio: comparar fórmulas de la derivada",
      eu: "Ariketa: deribatuaren formulak alderatu",
      en: "Exercise: comparing derivative formulas"
    },
    description: {
      es: "Cálculo de $f'(0.5)$ para $f(x)=x^2e^{-x}$ con las seis fórmulas de diferencias finitas y comparación de sus errores frente al valor exacto $0.4549$.",
      eu: "$f'(0.5)$-en kalkulua $f(x)=x^2e^{-x}$-rako sei diferentzia-finitu formulekin eta beren erroreen konparazioa $0.4549$ balio zehatzarekin.",
      en: "Computing $f'(0.5)$ for $f(x)=x^2e^{-x}$ with the six finite-difference formulas and comparing their errors against the exact value $0.4549$."
    },
    keywords: ["derivada", "comparación", "error", "diferencias finitas"],
    prerequisites: ["diferenciacion-primera-derivada"],
    related: ["diferenciacion-primera-derivada"],
    sections: [
      {
        heading: { es: "Datos y comparación", eu: "Datuak eta konparazioa", en: "Data and comparison" },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Con $f(x)=x^2e^{-x}$, paso $h=0.25$ y nodos $x=\\{0,\\,0.25,\\,0.5,\\,0.75,\\,1\\}$, se aproxima $f'(0.5)$. El valor analítico es $f'(0.5)=0.4549$. La tabla recoge cada aproximación y su error absoluto.",
              eu: "$f(x)=x^2e^{-x}$, $h=0.25$ pausua eta $x=\\{0,\\,0.25,\\,0.5,\\,0.75,\\,1\\}$ nodoekin, $f'(0.5)$ hurbiltzen da. Balio analitikoa $f'(0.5)=0.4549$ da. Taulak hurbilketa bakoitza eta bere errore absolutua biltzen ditu.",
              en: "With $f(x)=x^2e^{-x}$, step $h=0.25$ and nodes $x=\\{0,\\,0.25,\\,0.5,\\,0.75,\\,1\\}$, we approximate $f'(0.5)$. The analytic value is $f'(0.5)=0.4549$. The table gives each approximation and its absolute error."
            }
          },
          {
            kind: "table",
            head: {
              es: ["Fórmula", "f'(0.5)", "Error ε"],
              eu: ["Formula", "f'(0.5)", "Errorea ε"],
              en: ["Formula", "f'(0.5)", "Error ε"]
            },
            rows: [
              ["Progresiva O(h)", "0.4563", "0.0014"],
              ["Progresiva 3 puntos O(h²)", "0.4801", "0.0252"],
              ["Regresiva O(h)", "0.4118", "0.0431"],
              ["Regresiva 3 puntos O(h²)", "0.5204", "0.0655"],
              ["Central O(h²)", "0.4341", "0.0208"],
              ["Central 5 puntos O(h⁴)", "0.4561", "0.0012"]
            ]
          },
          {
            kind: "callout",
            variant: "note",
            title: { es: "Lectura", eu: "Irakurketa", en: "Reading" },
            text: {
              es: "La central de cinco puntos gana ($\\varepsilon=0.0012$), pero fíjate en que las de tres puntos $\\mathcal{O}(h^2)$ dan más error que la progresiva simple $\\mathcal{O}(h)$: con $h$ no pequeño y cerca del borde, un orden mayor no basta.",
              eu: "Bost puntuko zentralak irabazten du ($\\varepsilon=0.0012$), baina kontuan izan hiru puntuko $\\mathcal{O}(h^2)$-ek errore handiagoa ematen dutela progresiba sinple $\\mathcal{O}(h)$-ek baino: $h$ txikia ez denean eta ertzetik hurbil, ordena handiagoa ez da nahikoa.",
              en: "The five-point central wins ($\\varepsilon=0.0012$), but note the three-point $\\mathcal{O}(h^2)$ ones give more error than the simple forward $\\mathcal{O}(h)$: with non-small $h$ and near the boundary, a higher order is not enough."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-richardson-logaritmo",
    category: "Diferenciación",
    level: "avanzado",
    searchIntent: "ejercicio Richardson logaritmo derivada progresiva mejorar orden",
    title: {
      es: "Ejercicio: Richardson sobre ln(x)",
      eu: "Ariketa: Richardson ln(x)-ren gainean",
      en: "Exercise: Richardson on ln(x)"
    },
    description: {
      es: "Aproximación de $f'(1.8)$ para $f(x)=\\ln x$ con diferencias progresivas $\\mathcal{O}(h)$ y mejora a $\\mathcal{O}(h^2)$ mediante extrapolación de Richardson.",
      eu: "$f'(1.8)$-ren hurbilketa $f(x)=\\ln x$-rako $\\mathcal{O}(h)$ diferentzia progresiboekin eta $\\mathcal{O}(h^2)$-ra hobetzea Richardson-en estrapolazioaren bidez.",
      en: "Approximating $f'(1.8)$ for $f(x)=\\ln x$ with $\\mathcal{O}(h)$ forward differences and improving to $\\mathcal{O}(h^2)$ via Richardson extrapolation."
    },
    keywords: ["Richardson", "logaritmo", "derivada", "extrapolación"],
    prerequisites: ["diferenciacion-richardson"],
    related: ["diferenciacion-richardson"],
    sections: [
      {
        heading: { es: "Dos pasos y una extrapolación", eu: "Bi urrats eta estrapolazio bat", en: "Two steps and one extrapolation" },
        blocks: [
          {
            kind: "example",
            statement: {
              es: "Obtén $f'(1.8)$ para $f(x)=\\ln x$ con diferencias progresivas $\\mathcal{O}(h)$ y $h=0.1$, y mejora a $\\mathcal{O}(h^2)$ con Richardson. El valor exacto es $f'(1.8)=\\frac{1}{1.8}=0.5556$.",
              eu: "Lortu $f'(1.8)$ $f(x)=\\ln x$-rako $\\mathcal{O}(h)$ diferentzia progresiboekin eta $h=0.1$, eta hobetu $\\mathcal{O}(h^2)$-ra Richardson-ekin. Balio zehatza $f'(1.8)=\\frac{1}{1.8}=0.5556$ da.",
              en: "Find $f'(1.8)$ for $f(x)=\\ln x$ with $\\mathcal{O}(h)$ forward differences and $h=0.1$, and improve to $\\mathcal{O}(h^2)$ with Richardson. The exact value is $f'(1.8)=\\frac{1}{1.8}=0.5556$."
            },
            steps: [
              {
                text: { es: "Aproximación progresiva con $h$ y con $h/2$:", eu: "Hurbilketa progresiboa $h$ eta $h/2$-rekin:", en: "Forward approximation with $h$ and $h/2$:" },
                formula: "N_1(0.1)=\\frac{f(1.9)-f(1.8)}{0.1}=0.5407,\\qquad N_1(0.05)=\\frac{f(1.85)-f(1.8)}{0.05}=0.5480"
              },
              {
                text: { es: "Extrapolación de Richardson (caso todos los términos):", eu: "Richardson-en estrapolazioa (termino guztien kasua):", en: "Richardson extrapolation (all-terms case):" },
                formula: "N_2(0.1)=N_1(0.05)+\\left[N_1(0.05)-N_1(0.1)\\right]=0.5480+0.0073"
              }
            ],
            result: {
              text: { es: "El valor extrapolado es mucho más preciso:", eu: "Estrapolatutako balioa askoz zehatzagoa da:", en: "The extrapolated value is much more accurate:" },
              formula: "N_2(0.1)=0.5553\\ \\approx\\ 0.5556=f'(1.8)"
            }
          }
        ]
      }
    ]
  }
];
