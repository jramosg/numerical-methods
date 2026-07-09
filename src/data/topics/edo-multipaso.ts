import type { ContentEntry } from "../content";

/**
 * Multistep ODE methods (IVP II): Adams-Bashforth, Adams-Moulton,
 * predictor-corrector and stiff problems. Category "EDO" is shared with the
 * one-step methods (edo-unpaso.ts). Derivations are embedded inline in their
 * articles and spelled out in full (Lagrange construction, change of
 * variable, computed integrals, error term). Worked numbers reproduce the
 * Verhulst examples and were verified by recomputation.
 */

export const edoMultipasoArticles: ContentEntry[] = [
  {
    slug: "edo-adams-bashforth",
    category: "EDO",
    level: "avanzado",
    searchIntent: "Adams-Bashforth AB2 AB3 AB4 multipaso explícito EDO orden",
    title: {
      es: "Métodos de Adams-Bashforth",
      eu: "Adams-Bashforth metodoak",
      en: "Adams-Bashforth methods",
    },
    description: {
      es: "Métodos multipaso explícitos que integran la EDO aproximando f por su polinomio de interpolación sobre nodos ya calculados: deducción completa de AB2 con Lagrange, las fórmulas AB3 y AB4, su orden y cómo arrancarlos.",
      eu: "EDO integratzen duten urrats anitzeko metodo esplizituak, f dagoeneko kalkulatutako nodoetako interpolazio-polinomioaz hurbilduz: AB2-ren dedukzio osoa Lagrangerekin, AB3 eta AB4 formulak, beren ordena eta nola abiarazi.",
      en: "Explicit multistep methods that integrate the ODE by approximating f with its interpolating polynomial over already-computed nodes: full derivation of AB2 with Lagrange, the AB3 and AB4 formulas, their order and how to start them.",
    },
    keywords: ["Adams-Bashforth", "AB2", "AB4", "multipaso", "explícito"],
    prerequisites: ["edo-metodo-euler", "interpolacion-lagrange"],
    related: [
      "edo-adams-moulton",
      "edo-predictor-corrector",
      "deduccion-ab2",
      "ejercicio-ab2-verhulst",
      "edo-metodo-runge-kutta",
    ],
    sections: [
      {
        heading: {
          es: "De un paso a multipaso",
          eu: "Urrats bakarretik urrats anitzera",
          en: "From one-step to multistep",
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Los [[edo-metodo-euler|métodos de un paso]] solo usan la información del nodo anterior; al pasar al siguiente subintervalo, tiran todo lo demás. Los métodos multipaso reutilizan las pendientes $f_j=f(t_j,y_j)$ de varios nodos ya calculados, así que aprovechan mejor el trabajo hecho: cada paso solo cuesta una evaluación nueva de $f$. Se parte de la forma integral del [[edo-problemas-valor-inicial|PVI]]:",
              eu: "[[edo-metodo-euler|Urrats bakarreko metodoek]] aurreko nodoaren informazioa soilik erabiltzen dute; hurrengo azpitartera pasatzean, gainerako guztia botatzen dute. Urrats anitzeko metodoek dagoeneko kalkulatutako hainbat nodotako $f_j=f(t_j,y_j)$ maldak berrerabiltzen dituzte, eta beraz hobeto aprobetxatzen dute egindako lana: pauso bakoitzak $f$-ren ebaluazio berri bakarra kostatzen du. [[edo-problemas-valor-inicial|PVIaren]] forma integraletik abiatzen da:",
              en: "[[edo-metodo-euler|One-step methods]] use only the previous node's information; moving to the next subinterval, they throw everything else away. Multistep methods reuse the slopes $f_j=f(t_j,y_j)$ of several already-computed nodes, making better use of the work done: each step costs only one new evaluation of $f$. Start from the integral form of the [[edo-problemas-valor-inicial|IVP]]:",
            },
          },
          {
            kind: "formula",
            tex: "y(t_{k+1})=y(t_k)+\\int_{t_k}^{t_{k+1}} f(\\tau,y(\\tau))\\,d\\tau",
          },
          {
            kind: "paragraph",
            text: {
              es: "La integral no se puede calcular porque el integrando depende de la solución desconocida. Adams-Bashforth sustituye $f$ por el [[interpolacion-lagrange|polinomio que la interpola]] en los nodos anteriores $t_k, t_{k-1},\\dots$, donde sus valores ya se conocen, e integra ese polinomio. Como solo usa valores ya calculados, el método resultante es explícito.",
              eu: "Integrala ezin da kalkulatu, integrakizuna soluzio ezezagunaren araberakoa delako. Adams-Bashforth-ek $f$ ordezkatzen du aurreko nodoetan ($t_k, t_{k-1},\\dots$) [[interpolacion-lagrange|interpolatzen duen polinomioaz]], non bere balioak dagoeneko ezagunak diren, eta polinomio hori integratzen du. Kalkulatutako balioak soilik erabiltzen dituenez, lortutako metodoa esplizitua da.",
              en: "The integral cannot be computed because the integrand depends on the unknown solution. Adams-Bashforth replaces $f$ by the [[interpolacion-lagrange|polynomial that interpolates it]] at the previous nodes $t_k, t_{k-1},\\dots$, where its values are known, and integrates that polynomial. Since it uses already-computed values, the resulting method is explicit.",
            },
          },
        ],
      },
      {
        heading: {
          es: "Deducción de AB2",
          eu: "AB2-ren dedukzioa",
          en: "Derivation of AB2",
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "El caso de dos pasos concentra toda la mecánica: interpolar $f$ linealmente en $t_{k-1}$ y $t_k$, integrar y leer los coeficientes.",
              eu: "Bi pausoko kasuak mekanika osoa biltzen du: $f$ linealki interpolatu $t_{k-1}$ eta $t_k$-n, integratu eta koefizienteak irakurri.",
              en: "The two-step case concentrates all the mechanics: interpolate $f$ linearly at $t_{k-1}$ and $t_k$, integrate and read off the coefficients.",
            },
          },
          {
            kind: "diagram",
            variant: "ab2-extrapolation",
            caption: {
              es: "AB2 interpola las pendientes conocidas $f_{k-1}$ y $f_k$ y extrapola esa recta sobre el intervalo nuevo $[t_k,t_{k+1}]$.",
              eu: "AB2-k $f_{k-1}$ eta $f_k$ malda ezagunak interpolatzen ditu, eta zuzen hori $[t_k,t_{k+1}]$ tarte berrira estrapolatzen du.",
              en: "AB2 interpolates the known slopes $f_{k-1}$ and $f_k$ and extrapolates that line over the new interval $[t_k,t_{k+1}]$.",
            },
          },
          { kind: "derivation", slug: "deduccion-ab2" },
        ],
      },
      {
        heading: {
          es: "AB2, AB3 y AB4",
          eu: "AB2, AB3 eta AB4",
          en: "AB2, AB3 and AB4",
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Interpolando $f$ con polinomios de grado 2 y 3 sobre tres y cuatro nodos anteriores (misma mecánica, integrales más largas) aparecen AB3 y AB4:",
              eu: "$f$ 2. eta 3. graduko polinomioekin interpolatuz aurreko hiru eta lau nodotan (mekanika bera, integral luzeagoak) AB3 eta AB4 agertzen dira:",
              en: "Interpolating $f$ with polynomials of degree 2 and 3 over three and four previous nodes (same mechanics, longer integrals) yields AB3 and AB4:",
            },
          },
          {
            kind: "formula",
            tex: "y_{k+1}=y_k+\\frac{h}{2}\\bigl(3f_k-f_{k-1}\\bigr)",
            caption: {
              es: "AB2, orden 2.",
              eu: "AB2, 2. ordena.",
              en: "AB2, order 2.",
            },
          },
          {
            kind: "formula",
            tex: "y_{k+1}=y_k+\\frac{h}{12}\\bigl(23f_k-16f_{k-1}+5f_{k-2}\\bigr)",
            caption: {
              es: "AB3, orden 3.",
              eu: "AB3, 3. ordena.",
              en: "AB3, order 3.",
            },
          },
          {
            kind: "formula",
            tex: "y_{k+1}=y_k+\\frac{h}{24}\\bigl(55f_k-59f_{k-1}+37f_{k-2}-9f_{k-3}\\bigr)",
            caption: {
              es: "AB4, orden 4.",
              eu: "AB4, 4. ordena.",
              en: "AB4, order 4.",
            },
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Regularidades útiles",
              eu: "Erregulartasun erabilgarriak",
              en: "Useful regularities",
            },
            text: {
              es: "En cada fórmula de Adams-Bashforth los coeficientes suman el denominador ($3-1=2$, $23-16+5=12$, $55-59+37-9=24$): la fórmula reproduce el caso $f$ constante. Un AB de $m$ pasos tiene orden $m$, y los signos alternan a partir del primer coeficiente.",
              eu: "Adams-Bashforth formula bakoitzean koefizienteek izendatzailea batzen dute ($3-1=2$, $23-16+5=12$, $55-59+37-9=24$): formulak $f$ konstantearen kasua erreproduzitzen du. $m$ pausoko AB batek $m$ ordena du, eta zeinuak txandakatu egiten dira lehen koefizientetik aurrera.",
              en: "In each Adams-Bashforth formula the coefficients sum to the denominator ($3-1=2$, $23-16+5=12$, $55-59+37-9=24$): the formula reproduces the constant-$f$ case. An $m$-step AB has order $m$, and the signs alternate from the first coefficient on.",
            },
          },
        ],
      },
      {
        heading: {
          es: "Arranque del método",
          eu: "Metodoaren abiaraztea",
          en: "Starting the method",
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Un método de $m$ pasos necesita $m$ valores iniciales, pero el PVI solo da $y_0$. Los valores $y_1,\\dots,y_{m-1}$ se calculan con un método de un paso del mismo orden, para no contaminar el error: AB2 se arranca con [[edo-metodo-heun|Heun]] (orden 2) y AB4 con [[edo-metodo-runge-kutta|RK4]] (orden 4). El [[ejercicio-ab2-verhulst|ejercicio de AB2]] muestra el arranque y confirma numéricamente el orden 2.",
              eu: "$m$ pausoko metodo batek $m$ hasierako balio behar ditu, baina PVIak $y_0$ bakarrik ematen du. $y_1,\\dots,y_{m-1}$ balioak ordena bereko urrats bakarreko metodo batekin kalkulatzen dira, errorea ez kutsatzeko: AB2 [[edo-metodo-heun|Heun]]-ekin abiarazten da (2. ordena) eta AB4 [[edo-metodo-runge-kutta|RK4]]-rekin (4. ordena). [[ejercicio-ab2-verhulst|AB2-ren ariketak]] abiaraztea erakusten du eta 2. ordena numerikoki baieztatzen du.",
              en: "An $m$-step method needs $m$ starting values, but the IVP only provides $y_0$. The values $y_1,\\dots,y_{m-1}$ are computed with a one-step method of the same order, so as not to pollute the error: AB2 is started with [[edo-metodo-heun|Heun]] (order 2) and AB4 with [[edo-metodo-runge-kutta|RK4]] (order 4). The [[ejercicio-ab2-verhulst|AB2 exercise]] shows the startup and numerically confirms order 2.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "edo-adams-moulton",
    category: "EDO",
    level: "avanzado",
    searchIntent: "Adams-Moulton AM2 implícito trapecio Newton EDO multipaso",
    title: {
      es: "Métodos de Adams-Moulton",
      eu: "Adams-Moulton metodoak",
      en: "Adams-Moulton methods",
    },
    description: {
      es: "Métodos multipaso implícitos que incluyen el nodo nuevo en la interpolación: deducción completa de AM2 (trapecio implícito), AM4, por qué exigen resolver una ecuación no lineal y qué ganan a cambio.",
      eu: "Interpolazioan nodo berria sartzen duten urrats anitzeko metodo inplizituak: AM2-ren dedukzio osoa (trapezio inplizitua), AM4, zergatik eskatzen duten ekuazio ez-lineal bat ebaztea eta zer irabazten duten trukean.",
      en: "Implicit multistep methods that include the new node in the interpolation: full derivation of AM2 (implicit trapezoid), AM4, why they require solving a nonlinear equation and what they gain in exchange.",
    },
    keywords: ["Adams-Moulton", "AM2", "implícito", "trapecio", "Newton"],
    prerequisites: ["edo-adams-bashforth"],
    related: [
      "edo-adams-bashforth",
      "edo-predictor-corrector",
      "deduccion-am2",
      "no-lineales-newton-raphson",
    ],
    sections: [
      {
        heading: {
          es: "Implícito: usar el nodo nuevo",
          eu: "Inplizitua: nodo berria erabili",
          en: "Implicit: using the new node",
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Adams-Moulton interpola $f$ incluyendo el punto nuevo $(t_{k+1},\\,y_{k+1})$, que todavía no conocemos. Con los mismos nodos, la interpolación es un grado más rica y el método gana un orden respecto al Adams-Bashforth correspondiente; a cambio, $y_{k+1}$ aparece dentro de $f$ y hay que resolver una ecuación en cada paso.",
              eu: "Adams-Moulton-ek $f$ interpolatzen du oraindik ezagutzen ez dugun puntu berria $(t_{k+1},\\,y_{k+1})$ barne hartuta. Nodo berberekin, interpolazioa gradu bat aberatsagoa da eta metodoak ordena bat irabazten dio dagokion Adams-Bashforth-i; trukean, $y_{k+1}$ $f$-ren barruan agertzen da eta pauso bakoitzean ekuazio bat ebatzi behar da.",
              en: "Adams-Moulton interpolates $f$ including the new point $(t_{k+1},\\,y_{k+1})$, which we do not yet know. With the same nodes, the interpolation is one degree richer and the method gains one order over the corresponding Adams-Bashforth; in exchange, $y_{k+1}$ appears inside $f$ and an equation must be solved at every step.",
            },
          },
        ],
      },
      {
        heading: {
          es: "Deducción de AM2",
          eu: "AM2-ren dedukzioa",
          en: "Derivation of AM2",
        },
        blocks: [
          {
            kind: "diagram",
            variant: "am2-implicit",
            caption: {
              es: "AM2 interpola $f$ en $t_k$ y en el nodo nuevo $t_{k+1}$. El área es trapezoidal, pero $f_{k+1}=f(t_{k+1},y_{k+1})$ depende de la incógnita.",
              eu: "AM2-k $f$ interpolatzen du $t_k$-n eta nodo berrian, $t_{k+1}$-n. Azalera trapezoidala da, baina $f_{k+1}=f(t_{k+1},y_{k+1})$ ezezagunaren araberakoa da.",
              en: "AM2 interpolates $f$ at $t_k$ and at the new node $t_{k+1}$. The area is trapezoidal, but $f_{k+1}=f(t_{k+1},y_{k+1})$ depends on the unknown.",
            },
          },
          { kind: "derivation", slug: "deduccion-am2" },
          {
            kind: "formula",
            tex: "y_{k+1}=y_k+\\frac{h}{24}\\bigl(9f_{k+1}+19f_k-5f_{k-1}+f_{k-2}\\bigr)",
            caption: {
              es: "AM4, orden 4: interpolación cúbica que incluye el nodo nuevo.",
              eu: "AM4, 4. ordena: nodo berria barne hartzen duen interpolazio kubikoa.",
              en: "AM4, order 4: cubic interpolation including the new node.",
            },
          },
        ],
      },
      {
        heading: {
          es: "Resolver la ecuación implícita",
          eu: "Ekuazio inplizitua ebatzi",
          en: "Solving the implicit equation",
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Como $y_{k+1}$ aparece en los dos lados, cada paso exige resolver una ecuación no lineal, a menudo con el [[no-lineales-newton-raphson|método de Newton-Raphson]]:",
              eu: "$y_{k+1}$ bi aldeetan agertzen denez, pauso bakoitzak ekuazio ez-lineal bat ebaztea eskatzen du, askotan [[no-lineales-newton-raphson|Newton-Raphson metodoarekin]]:",
              en: "Since $y_{k+1}$ appears on both sides, each step requires solving a nonlinear equation, often with the [[no-lineales-newton-raphson|Newton-Raphson method]]:",
            },
          },
          {
            kind: "formula",
            tex: "R(y_{k+1})=y_{k+1}-y_k-\\frac{h}{2}\\bigl(f(t_{k+1},y_{k+1})+f(t_k,y_k)\\bigr)=0",
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Qué se gana",
              eu: "Zer irabazten den",
              en: "What is gained",
            },
            text: {
              es: "Un Adams-Moulton de $m$ pasos tiene orden $m+1$: con los mismos nodos, un orden más que Adams-Bashforth y con constante de error menor. Además es mucho más estable, lo que resulta decisivo en [[edo-problemas-rigidos|problemas rígidos]]. También necesita arranque con un método de un paso. Para evitar el coste de Newton en cada paso se usan los pares [[edo-predictor-corrector|predictor-corrector]].",
              eu: "$m$ pausoko Adams-Moulton batek $m+1$ ordena du: nodo berberekin, Adams-Bashforth baino ordena bat gehiago eta errore-konstante txikiagoarekin. Gainera askoz egonkorragoa da, [[edo-problemas-rigidos|problema zurrunetan]] erabakigarria dena. Urrats bakarreko metodo batekin abiarazi behar da hau ere. Pauso bakoitzean Newton-en kostua saihesteko [[edo-predictor-corrector|iragarle-zuzentzaile]] bikoteak erabiltzen dira.",
              en: "An $m$-step Adams-Moulton has order $m+1$: with the same nodes, one order more than Adams-Bashforth and with a smaller error constant. Its larger stability region matters in [[edo-problemas-rigidos|stiff problems]]. It too needs startup with a one-step method. [[edo-predictor-corrector|Predictor-corrector]] pairs avoid Newton's cost at each step.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "edo-predictor-corrector",
    category: "EDO",
    level: "avanzado",
    searchIntent: "predictor corrector Adams-Bashforth-Moulton ABM2 ABM4 EDO",
    title: {
      es: "Métodos predictor-corrector",
      eu: "Iragarle-zuzentzaile metodoak",
      en: "Predictor-corrector methods",
    },
    description: {
      es: "Combinar un método explícito (predictor) con uno implícito del mismo orden (corrector) para tener la precisión y estabilidad del implícito sin resolver ecuaciones: ABM2 y ABM4.",
      eu: "Metodo esplizitu bat (iragarlea) ordena bereko inplizitu batekin (zuzentzailea) konbinatzea, inplizituaren doitasuna eta egonkortasuna izateko ekuaziorik ebatzi gabe: ABM2 eta ABM4.",
      en: "Combining an explicit method (predictor) with an implicit one of the same order (corrector) to get the accuracy and stability of the implicit without solving equations: ABM2 and ABM4.",
    },
    keywords: ["predictor-corrector", "ABM2", "ABM4", "Adams"],
    prerequisites: ["edo-adams-bashforth", "edo-adams-moulton"],
    related: [
      "edo-adams-bashforth",
      "edo-adams-moulton",
      "edo-metodo-heun",
      "ejercicio-predictor-corrector-comparativa",
    ],
    sections: [
      {
        heading: {
          es: "Predecir y corregir",
          eu: "Iragarri eta zuzendu",
          en: "Predict and correct",
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "En lugar de resolver la ecuación implícita de [[edo-adams-moulton|Adams-Moulton]], se predice $y_{k+1}$ con un método explícito y se usa esa predicción dentro del corrector implícito, que así se evalúa una sola vez. Con AB2 como predictor y AM2 como corrector se obtiene ABM2:",
              eu: "[[edo-adams-moulton|Adams-Moulton]]-en ekuazio inplizitua ebatzi beharrean, $y_{k+1}$ metodo esplizitu batekin iragartzen da eta iragarpen hori zuzentzaile inplizituaren barruan erabiltzen da, horrela behin bakarrik ebaluatzen delarik. AB2 iragarle gisa eta AM2 zuzentzaile gisa hartuta ABM2 lortzen da:",
              en: "Instead of solving the implicit equation of [[edo-adams-moulton|Adams-Moulton]], one predicts $y_{k+1}$ with an explicit method and uses that prediction inside the implicit corrector, which is thus evaluated only once. With AB2 as predictor and AM2 as corrector one obtains ABM2:",
            },
          },
          {
            kind: "formula",
            tex: "\\begin{aligned} \\text{Predictor (AB2):}\\quad & y_{k+1}^{(p)}=y_k+\\tfrac{h}{2}\\bigl(3f(t_k,y_k)-f(t_{k-1},y_{k-1})\\bigr)\\\\ \\text{Corrector (AM2):}\\quad & y_{k+1}=y_k+\\tfrac{h}{2}\\bigl(f(t_{k+1},y_{k+1}^{(p)})+f(t_k,y_k)\\bigr) \\end{aligned}",
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Por qué merece la pena",
              eu: "Zergatik merezi duen",
              en: "Why it pays off",
            },
            text: {
              es: "El corrector usa un valor ya evaluado, así que no hay que iterar con Newton. A cambio mejora claramente la precisión frente al explícito solo, como muestra la [[ejercicio-predictor-corrector-comparativa|comparativa]]. Es la misma idea que convierte a [[edo-metodo-heun|Heun]] en el par predictor-corrector de un paso: predecir con [[edo-metodo-euler|Euler]] y corregir con el trapecio.",
              eu: "Zuzentzaileak dagoeneko ebaluatutako balio bat erabiltzen du; beraz, ez da Newton-ekin iteratu behar. Trukean, doitasuna nabarmen hobetzen du esplizitu hutsaren aldean, [[ejercicio-predictor-corrector-comparativa|konparaketak]] erakusten duen bezala. Ideia bera da [[edo-metodo-heun|Heun]] urrats bakarreko iragarle-zuzentzaile bikote bihurtzen duena: [[edo-metodo-euler|Euler]]-ekin iragarri eta trapezioarekin zuzendu.",
              en: "The corrector uses an already-evaluated value, so no Newton iteration is needed. In exchange it clearly improves accuracy over the explicit method alone, as the [[ejercicio-predictor-corrector-comparativa|comparison]] shows. It is the same idea that makes [[edo-metodo-heun|Heun]] the one-step predictor-corrector pair: predict with [[edo-metodo-euler|Euler]] and correct with the trapezoid.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "edo-problemas-rigidos",
    category: "EDO",
    level: "avanzado",
    searchIntent:
      "problemas rígidos stiff estabilidad EDO paso adaptativo implícito",
    title: {
      es: "Problemas rígidos y estabilidad",
      eu: "Problema zurrunak eta egonkortasuna",
      en: "Stiff problems and stability",
    },
    description: {
      es: "Qué hace rígida a una EDO, por qué los métodos explícitos se vuelven inestables con pocos puntos, y por qué se prefieren métodos implícitos, de orden bajo y paso adaptativo.",
      eu: "Zerk egiten duen EDO bat zurrun, zergatik bihurtzen diren ezegonkor metodo esplizituak puntu gutxirekin, eta zergatik hobesten diren metodo inplizituak, ordena baxukoak eta pausu moldakorrekoak.",
      en: "What makes an ODE stiff, why explicit methods become unstable with few points, and why implicit, low-order and adaptive-step methods are preferred.",
    },
    keywords: [
      "rígido",
      "stiff",
      "estabilidad",
      "paso adaptativo",
      "implícito",
    ],
    prerequisites: ["edo-adams-moulton"],
    related: [
      "edo-adams-moulton",
      "edo-predictor-corrector",
      "ejercicio-euler-implicito-estabilidad",
    ],
    sections: [
      {
        heading: {
          es: "Qué es una ecuación rígida",
          eu: "Zer den ekuazio zurrun bat",
          en: "What a stiff equation is",
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Una EDO es rígida cuando su solución mezcla escalas de tiempo muy distintas: un transitorio rapidísimo seguido de un comportamiento lento y estable. Con paso constante, un método explícito necesita muchísimos puntos para no volverse inestable en el transitorio, aunque la parte lenta no los necesite. El [[ejercicio-euler-implicito-estabilidad|análisis del problema modelo]] $y'=\\lambda y$ cuantifica el fenómeno: el paso del método explícito queda limitado por $|1+h\\lambda|<1$, mientras que el implícito es estable con cualquier paso.",
              eu: "EDO bat zurruna da bere soluzioak oso denbora-eskala desberdinak nahasten dituenean: iragankor azkar-azkarra eta ondoren portaera geldo eta egonkorra. Pausu konstantearekin, metodo esplizitu batek puntu ugari behar ditu iragankorrean ezegonkor ez bihurtzeko, zati geldoak behar ez baditu ere. [[ejercicio-euler-implicito-estabilidad|Problema-ereduaren analisiak]] ($y'=\\lambda y$) fenomenoa kuantifikatzen du: metodo esplizituaren pausua $|1+h\\lambda|<1$ baldintzak mugatzen du, inplizitua edozein pausurekin egonkorra den bitartean.",
              en: "An ODE is stiff when its solution mixes very different time scales: a very fast transient followed by slow, stable behaviour. With a constant step, an explicit method needs a great many points to avoid becoming unstable in the transient, even though the slow part does not need them. The [[ejercicio-euler-implicito-estabilidad|model problem analysis]] of $y'=\\lambda y$ quantifies the phenomenon: the explicit method's step is limited by $|1+h\\lambda|<1$, while the implicit one is stable at any step.",
            },
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Qué funciona mejor",
              eu: "Zerk funtzionatzen duen hobeto",
              en: "What works better",
            },
            text: {
              es: "En problemas rígidos, los métodos implícitos superan a los explícitos y los de orden bajo suelen comportarse mejor. En la práctica se usan métodos de paso adaptativo, que concentran puntos donde la solución cambia deprisa; las bibliotecas numéricas ofrecen integradores específicos para problemas rígidos basados en fórmulas implícitas.",
              eu: "Problema zurrunetan, metodo inplizituek esplizituak gainditzen dituzte eta ordena baxukoek hobeto jokatu ohi dute. Praktikan pausu moldakorreko metodoak erabiltzen dira, soluzioa azkar aldatzen den lekuan puntuak pilatzen dituztenak; liburutegi numerikoek formula inplizituetan oinarritutako integratzaile bereziak eskaintzen dituzte problema zurrunetarako.",
              en: "In stiff problems, implicit methods beat explicit ones and low-order ones often behave better. In practice, adaptive-step methods concentrate points where the solution changes fast; numerical libraries provide dedicated stiff integrators based on implicit formulas.",
            },
          },
        ],
      },
    ],
  },
];

export const edoMultipasoDerivations: ContentEntry[] = [
  {
    slug: "deduccion-ab2",
    category: "EDO",
    level: "avanzado",
    searchIntent:
      "deducir AB2 Adams-Bashforth integrar polinomio Lagrange cambio variable error",
    title: {
      es: "Deducción: Adams-Bashforth de 2 pasos (AB2)",
      eu: "Dedukzioa: 2 pausoko Adams-Bashforth (AB2)",
      en: "Derivation: two-step Adams-Bashforth (AB2)",
    },
    description: {
      es: "Construcción completa de AB2: forma integral del PVI, interpolante de Lagrange de f en los dos nodos previos, cambio de variable, integrales calculadas término a término, error local y generalización a AB3 y AB4.",
      eu: "AB2-ren eraikuntza osoa: PVIaren forma integrala, f-ren Lagrange interpolatzailea aurreko bi nodoetan, aldagai-aldaketa, integralak gaiez gai kalkulatuta, errore lokala eta AB3 eta AB4-rako orokortzea.",
      en: "Full construction of AB2: integral form of the IVP, Lagrange interpolant of f at the two previous nodes, change of variable, integrals computed term by term, local error and generalization to AB3 and AB4.",
    },
    keywords: [
      "deducción",
      "AB2",
      "Adams-Bashforth",
      "Lagrange",
      "cambio de variable",
    ],
    prerequisites: ["interpolacion-lagrange", "edo-metodo-euler"],
    related: [
      "edo-adams-bashforth",
      "deduccion-am2",
      "deduccion-lagrange-base",
    ],
    sections: [
      {
        heading: {
          es: "Paso 1: la forma integral",
          eu: "1. pausoa: forma integrala",
          en: "Step 1: the integral form",
        },
        blocks: [
          {
            kind: "diagram",
            variant: "ab2-extrapolation",
            caption: {
              es: "La recta de Lagrange se construye con las pendientes ya calculadas y después se usa fuera de sus nodos: por eso Adams-Bashforth es explícito y extrapolador.",
              eu: "Lagrange-ren zuzena dagoeneko kalkulatutako maldekin eraikitzen da eta gero nodoetatik kanpo erabiltzen da: horregatik Adams-Bashforth esplizitua eta estrapolatzailea da.",
              en: "The Lagrange line is built from already-computed slopes and then used beyond its nodes: this is why Adams-Bashforth is explicit and extrapolatory.",
            },
          },
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Partimos del PVI $y'(t)=f(t,y(t))$. Integramos ambos lados entre $t_k$ y $t_{k+1}$:",
                  eu: "$y'(t)=f(t,y(t))$ PVI-tik abiatzen gara. Bi aldeak $t_k$ eta $t_{k+1}$ artean integratzen ditugu:",
                  en: "Start from the IVP $y'(t)=f(t,y(t))$. Integrate both sides between $t_k$ and $t_{k+1}$:",
                },
                formula:
                  "\\int_{t_k}^{t_{k+1}} y'(\\tau)\\,d\\tau=\\int_{t_k}^{t_{k+1}} f\\bigl(\\tau,y(\\tau)\\bigr)\\,d\\tau",
              },
              {
                text: {
                  es: "Aplicando el Teorema Fundamental del Cálculo al lado izquierdo se obtiene la forma integral exacta. Todavía no hay ninguna aproximación:",
                  eu: "Ezkerreko aldeari Kalkuluaren Oinarrizko Teorema aplikatuz forma integral zehatza lortzen da. Oraindik ez dago hurbilketarik:",
                  en: "Applying the Fundamental Theorem of Calculus to the left-hand side gives the exact integral form. There is still no approximation:",
                },
                formula:
                  "y(t_{k+1})=y(t_k)+\\int_{t_k}^{t_{k+1}} f\\bigl(\\tau,y(\\tau)\\bigr)\\,d\\tau",
              },
              {
                text: {
                  es: "El integrando completo es desconocido porque depende de la solución exacta, pero sus valores aproximados en los nodos anteriores sí se conocen: $f_{k-1}=f(t_{k-1},y_{k-1})$ y $f_k=f(t_k,y_k)$. AB2 nace de aproximar $f(\\tau,y(\\tau))$ con esos dos datos.",
                  eu: "Integrakizun osoa ezezaguna da soluzio zehatzaren araberakoa delako, baina aurreko nodoetako balio hurbilduak ezagunak dira: $f_{k-1}=f(t_{k-1},y_{k-1})$ eta $f_k=f(t_k,y_k)$. AB2 $f(\\tau,y(\\tau))$ bi datu horiekin hurbiltzetik sortzen da.",
                  en: "The full integrand is unknown because it depends on the exact solution, but its approximate values at previous nodes are known: $f_{k-1}=f(t_{k-1},y_{k-1})$ and $f_k=f(t_k,y_k)$. AB2 comes from approximating $f(\\tau,y(\\tau))$ with those two data points.",
                },
              },
            ],
          },
        ],
      },
      {
        heading: {
          es: "Paso 2: interpolar f con Lagrange",
          eu: "2. pausoa: f Lagrangerekin interpolatu",
          en: "Step 2: interpolate f with Lagrange",
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Construimos el polinomio de grado 1 que interpola los valores $f_{k-1}$ y $f_k$ usando la [[deduccion-lagrange-base|base de Lagrange]]. Como $t_k-t_{k-1}=h$ y $t_{k-1}-t_k=-h$, las bases quedan:",
                  eu: "$f_{k-1}$ eta $f_k$ balioak interpolatzen dituen 1. graduko polinomioa eraikitzen dugu, [[deduccion-lagrange-base|Lagrange oinarria]] erabiliz. $t_k-t_{k-1}=h$ eta $t_{k-1}-t_k=-h$ direnez, oinarriak honela geratzen dira:",
                  en: "Build the degree-1 polynomial interpolating the values $f_{k-1}$ and $f_k$ using the [[deduccion-lagrange-base|Lagrange basis]]. Since $t_k-t_{k-1}=h$ and $t_{k-1}-t_k=-h$, the bases are:",
                },
                formula:
                  "L_{k-1}(\\tau)=\\frac{\\tau-t_k}{t_{k-1}-t_k}=\\frac{t_k-\\tau}{h},\\qquad L_k(\\tau)=\\frac{\\tau-t_{k-1}}{t_k-t_{k-1}}=\\frac{\\tau-t_{k-1}}{h}",
              },
              {
                text: {
                  es: "El interpolante de [[interpolacion-lagrange|Lagrange]] es la combinación de los valores con su base. Es la recta que coincide con las pendientes conocidas en los dos nodos:",
                  eu: "[[interpolacion-lagrange|Lagrange]] interpolatzailea balioen eta oinarrien konbinazioa da. Bi nodoetan malda ezagunekin bat datorren zuzena da:",
                  en: "The [[interpolacion-lagrange|Lagrange]] interpolant is the combination of the values with their bases. It is the line that matches the known slopes at the two nodes:",
                },
                formula:
                  "p_1(\\tau)=f_{k-1}\\,\\frac{t_k-\\tau}{h}+f_k\\,\\frac{\\tau-t_{k-1}}{h}=f_k\\,\\frac{\\tau-t_{k-1}}{h}-f_{k-1}\\,\\frac{\\tau-t_k}{h}",
              },
              {
                text: {
                  es: "Los nodos de interpolación son $t_{k-1}$ y $t_k$, pero el intervalo de integración es $[t_k,\\,t_{k+1}]$. Al extrapolar el polinomio fuera de sus nodos, el método queda explícito.",
                  eu: "Interpolazio-nodoak $t_{k-1}$ eta $t_k$ dira, baina integrazio-tartea $[t_k,\\,t_{k+1}]$ da. Polinomioa bere nodoetatik kanpo estrapolatzean, metodoa esplizitua da.",
                  en: "The interpolation nodes are $t_{k-1}$ and $t_k$, but the integration interval is $[t_k,\\,t_{k+1}]$. Extrapolating the polynomial beyond its nodes makes the method explicit.",
                },
              },
            ],
          },
        ],
      },
      {
        heading: {
          es: "Paso 3: cambio de variable e integración",
          eu: "3. pausoa: aldagai-aldaketa eta integrazioa",
          en: "Step 3: change of variable and integration",
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Para integrar, hacemos el cambio que aparece en los apuntes: $s=\\tau-t_k$, es decir, $\\tau=t_k+s$ y $d\\tau=ds$. Cuando $\\tau=t_k$, $s=0$; cuando $\\tau=t_{k+1}$, $s=h$. Además:",
                  eu: "Integratzeko, apunteetako aldaketa egiten dugu: $s=\\tau-t_k$, hau da, $\\tau=t_k+s$ eta $d\\tau=ds$. $\\tau=t_k$ denean, $s=0$; $\\tau=t_{k+1}$ denean, $s=h$. Gainera:",
                  en: "To integrate, use the change of variable from the notes: $s=\\tau-t_k$, that is, $\\tau=t_k+s$ and $d\\tau=ds$. When $\\tau=t_k$, $s=0$; when $\\tau=t_{k+1}$, $s=h$. Also:",
                },
                formula:
                  "\\tau-t_{k-1}=s+h,\\qquad \\tau-t_k=s",
              },
              {
                text: {
                  es: "Sustituimos $f(\\tau,y(\\tau))$ por el interpolante $p_1$ en la integral. Con el cambio anterior, la recta queda escrita como:",
                  eu: "Integralean $f(\\tau,y(\\tau))$ interpolatzaileaz, $p_1$-ez, ordezkatzen dugu. Aurreko aldaketarekin, zuzena honela idazten da:",
                  en: "Replace $f(\\tau,y(\\tau))$ by the interpolant $p_1$ in the integral. With the previous change of variable, the line becomes:",
                },
                formula:
                  "p_1(t_k+s)=f_k\\,\\frac{s+h}{h}-f_{k-1}\\,\\frac{s}{h}",
              },
              {
                text: {
                  es: "Integramos las dos partes por separado. La parte de $f_k$ aporta $\\frac{3h}{2}$ y la de $f_{k-1}$ aporta $\\frac{h}{2}$ con signo negativo:",
                  eu: "Bi zatiak bereiz integratzen ditugu. $f_k$-ren zatiak $\\frac{3h}{2}$ ematen du, eta $f_{k-1}$-ren zatiak $\\frac{h}{2}$, zeinu negatiboarekin:",
                  en: "Integrate the two parts separately. The $f_k$ part contributes $\\frac{3h}{2}$ and the $f_{k-1}$ part contributes $\\frac{h}{2}$ with a negative sign:",
                },
                formula:
                  "\\begin{aligned} \\int_0^h f_k\\frac{s+h}{h}\\,ds&=f_k\\frac{1}{h}\\Bigl[\\frac{s^2}{2}+hs\\Bigr]_0^h=\\frac{3h}{2}f_k\\\\ \\int_0^h f_{k-1}\\frac{s}{h}\\,ds&=f_{k-1}\\frac{1}{h}\\Bigl[\\frac{s^2}{2}\\Bigr]_0^h=\\frac{h}{2}f_{k-1} \\end{aligned}",
              },
              {
                text: {
                  es: "Por tanto, la integral aproximada sobre el paso nuevo es:",
                  eu: "Beraz, pauso berriko integral hurbildua hau da:",
                  en: "Therefore, the approximate integral over the new step is:",
                },
                formula:
                  "\\int_{t_k}^{t_{k+1}} f\\bigl(\\tau,y(\\tau)\\bigr)\\,d\\tau\\approx\\int_{t_k}^{t_{k+1}} p_1(\\tau)\\,d\\tau=\\frac{h}{2}\\bigl(3f_k-f_{k-1}\\bigr)",
              },
              {
                text: {
                  es: "Sustituyendo en la forma integral exacta y usando $y(t_k)\\approx y_k$ aparece la fórmula de Adams-Bashforth de dos pasos:",
                  eu: "Forma integral zehatzean ordezkatuz eta $y(t_k)\\approx y_k$ erabiliz, bi pausoko Adams-Bashforth formula agertzen da:",
                  en: "Substituting into the exact integral form and using $y(t_k)\\approx y_k$ gives the two-step Adams-Bashforth formula:",
                },
                formula:
                  "y_{k+1}=y_k+\\frac{h}{2}\\bigl(3f_k-f_{k-1}\\bigr)",
              },
            ],
          },
        ],
      },
      {
        heading: {
          es: "Paso 4: error y orden",
          eu: "4. pausoa: errorea eta ordena",
          en: "Step 4: error and order",
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "El error local es la integral del [[interpolacion-fundamentos|error de interpolación]] de $p_1$. Para el interpolante lineal, $f(\\tau)-p_1(\\tau)=\\frac{f''(\\xi)}{2}(\\tau-t_{k-1})(\\tau-t_k)$; con el cambio de variable, $(\\tau-t_{k-1})(\\tau-t_k)=h^2\\,s(s+1)$ y $\\int_0^1 s(s+1)\\,ds=\\frac{5}{6}$:",
                  eu: "Errore lokala $p_1$-en [[interpolacion-fundamentos|interpolazio-errorearen]] integrala da. Interpolatzaile linealerako, $f(\\tau)-p_1(\\tau)=\\frac{f''(\\xi)}{2}(\\tau-t_{k-1})(\\tau-t_k)$; aldagai-aldaketarekin, $(\\tau-t_{k-1})(\\tau-t_k)=h^2\\,s(s+1)$ eta $\\int_0^1 s(s+1)\\,ds=\\frac{5}{6}$:",
                  en: "The local error is the integral of the [[interpolacion-fundamentos|interpolation error]] of $p_1$. For the linear interpolant, $f(\\tau)-p_1(\\tau)=\\frac{f''(\\xi)}{2}(\\tau-t_{k-1})(\\tau-t_k)$; with the change of variable, $(\\tau-t_{k-1})(\\tau-t_k)=h^2\\,s(s+1)$ and $\\int_0^1 s(s+1)\\,ds=\\frac{5}{6}$:",
                },
                formula:
                  "e_{k+1}=h\\cdot\\frac{y'''(\\xi)}{2}\\cdot h^2\\cdot\\frac{5}{6}=\\frac{5}{12}\\,h^3\\,y'''(\\xi)=\\mathcal{O}(h^3)",
              },
              {
                text: {
                  es: "El error global pierde una potencia al acumular $N\\propto 1/h$ pasos: AB2 es de orden 2, igual que [[edo-metodo-heun|Heun]], pero con una sola evaluación nueva de $f$ por paso. La [[ejercicio-ab2-verhulst|estimación numérica del orden]] lo confirma.",
                  eu: "Beti bezala, errore globalak potentzia bat galtzen du $N\\propto 1/h$ pauso metatzean: AB2 2. ordenakoa da, [[edo-metodo-heun|Heun]] bezala, baina pauso bakoitzeko $f$-ren ebaluazio berri bakarrarekin. [[ejercicio-ab2-verhulst|Ordenaren estimazio numerikoak]] baieztatzen du.",
                  en: "The global error loses one power when accumulating $N\\propto 1/h$ steps: AB2 is order 2, like [[edo-metodo-heun|Heun]], but with a single new evaluation of $f$ per step. The [[ejercicio-ab2-verhulst|numerical order estimation]] confirms it.",
                },
              },
            ],
          },
        ],
      },
      {
        heading: {
          es: "De AB2 a AB3 y AB4",
          eu: "AB2-tik AB3 eta AB4-ra",
          en: "From AB2 to AB3 and AB4",
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La misma receta con más nodos produce toda la familia: interpolar $f$ en $t_k,t_{k-1},t_{k-2}$ con un polinomio cuadrático y repetir los pasos 3-4 da [[edo-adams-bashforth|AB3]] (con integrales como $\\int_0^1\\frac{(s+1)(s+2)}{2}ds=\\frac{23}{12}$); con cuatro nodos y un cúbico sale [[edo-adams-bashforth|AB4]]. Cada nodo adicional sube el grado del interpolante y, con él, el orden del método.",
              eu: "Errezeta bera nodo gehiagorekin familia osoa sortzen du: $f$ interpolatzea $t_k,t_{k-1},t_{k-2}$-n polinomio koadratiko batekin eta 3-4 pausoak errepikatzea [[edo-adams-bashforth|AB3]] da ($\\int_0^1\\frac{(s+1)(s+2)}{2}ds=\\frac{23}{12}$ bezalako integralekin); lau nodorekin eta kubiko batekin [[edo-adams-bashforth|AB4]] ateratzen da. Nodo gehigarri bakoitzak interpolatzailearen gradua igotzen du eta, harekin, metodoaren ordena.",
              en: "The same recipe with more nodes produces the whole family: interpolating $f$ at $t_k,t_{k-1},t_{k-2}$ with a quadratic polynomial and repeating steps 3-4 gives [[edo-adams-bashforth|AB3]] (with integrals like $\\int_0^1\\frac{(s+1)(s+2)}{2}ds=\\frac{23}{12}$); with four nodes and a cubic, [[edo-adams-bashforth|AB4]] comes out. Each extra node raises the interpolant's degree and, with it, the method's order.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "deduccion-am2",
    category: "EDO",
    level: "avanzado",
    searchIntent:
      "deducir AM2 Adams-Moulton trapecio implícito Lagrange interpolación",
    title: {
      es: "Deducción: Adams-Moulton de un paso (AM2)",
      eu: "Dedukzioa: pauso bateko Adams-Moulton (AM2)",
      en: "Derivation: one-step Adams-Moulton (AM2)",
    },
    description: {
      es: "Construcción completa de AM2: interpolante de Lagrange que incluye el nodo nuevo, cambio de variable, pesos 1/2-1/2 calculados, conexión con la regla del trapecio y error local.",
      eu: "AM2-ren eraikuntza osoa: nodo berria barne hartzen duen Lagrange interpolatzailea, aldagai-aldaketa, 1/2-1/2 pisu kalkulatuak, trapezio-erregelarekiko lotura eta errore lokala.",
      en: "Full construction of AM2: Lagrange interpolant including the new node, change of variable, computed 1/2-1/2 weights, connection with the trapezoidal rule and local error.",
    },
    keywords: [
      "deducción",
      "AM2",
      "Adams-Moulton",
      "trapecio implícito",
      "Lagrange",
    ],
    prerequisites: ["deduccion-ab2"],
    related: [
      "edo-adams-moulton",
      "deduccion-ab2",
      "deduccion-integracion-trapecio",
    ],
    sections: [
      {
        heading: {
          es: "Paso 1: forma integral",
          eu: "1. pausoa: forma integrala",
          en: "Step 1: integral form",
        },
        blocks: [
          {
            kind: "diagram",
            variant: "am2-implicit",
            caption: {
              es: "AM2 usa el intervalo nuevo completo: interpola la pendiente entre $f_k$ y $f_{k+1}$ y por eso coincide con el trapecio implícito.",
              eu: "AM2-k tarte berri osoa erabiltzen du: malda $f_k$ eta $f_{k+1}$ artean interpolatzen du, eta horregatik trapezio inplizituarekin bat dator.",
              en: "AM2 uses the whole new interval: it interpolates the slope between $f_k$ and $f_{k+1}$, so it is the implicit trapezoidal rule.",
            },
          },
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Partimos del PVI $y'(t)=f(t,y(t))$. Integramos ambos lados entre $t_k$ y $t_{k+1}$:",
                  eu: "$y'(t)=f(t,y(t))$ PVI-tik abiatzen gara. Bi aldeak $t_k$ eta $t_{k+1}$ artean integratzen ditugu:",
                  en: "Start from the IVP $y'(t)=f(t,y(t))$. Integrate both sides between $t_k$ and $t_{k+1}$:",
                },
                formula:
                  "\\int_{t_k}^{t_{k+1}} y'(\\tau)\\,d\\tau=\\int_{t_k}^{t_{k+1}} f\\bigl(\\tau,y(\\tau)\\bigr)\\,d\\tau",
              },
              {
                text: {
                  es: "Por el Teorema Fundamental del Cálculo, el lado izquierdo es exacto. La única parte que habrá que aproximar es la integral de $f$:",
                  eu: "Kalkuluaren Oinarrizko Teoremaren arabera, ezkerreko aldea zehatza da. Hurbildu beharreko zati bakarra $f$-ren integrala da:",
                  en: "By the Fundamental Theorem of Calculus, the left-hand side is exact. The only part to approximate is the integral of $f$:",
                },
                formula:
                  "y(t_{k+1})=y(t_k)+\\int_{t_k}^{t_{k+1}} f\\bigl(\\tau,y(\\tau)\\bigr)\\,d\\tau",
              },
              {
                text: {
                  es: "En la fórmula numérica escribimos $y_k\\approx y(t_k)$ y $y_{k+1}\\approx y(t_{k+1})$:",
                  eu: "Formula numerikoan $y_k\\approx y(t_k)$ eta $y_{k+1}\\approx y(t_{k+1})$ idazten dugu:",
                  en: "In the numerical formula write $y_k\\approx y(t_k)$ and $y_{k+1}\\approx y(t_{k+1})$:",
                },
                formula:
                  "y_{k+1}=y_k+\\int_{t_k}^{t_{k+1}} f\\bigl(\\tau,y(\\tau)\\bigr)\\,d\\tau",
              },
            ],
          },
        ],
      },
      {
        heading: {
          es: "Paso 2: interpolar f en el intervalo nuevo",
          eu: "2. pausoa: f tarte berrian interpolatu",
          en: "Step 2: interpolate f on the new interval",
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "A diferencia de [[deduccion-ab2|AB2]], AM2 interpola en $t_k$ y $t_{k+1}$. Por tanto usa $f_k=f(t_k,y_k)$ y $f_{k+1}=f(t_{k+1},y_{k+1})$:",
                  eu: "[[deduccion-ab2|AB2]] ez bezala, AM2-k $t_k$ eta $t_{k+1}$ puntuetan interpolatzen du. Beraz $f_k=f(t_k,y_k)$ eta $f_{k+1}=f(t_{k+1},y_{k+1})$ erabiltzen ditu:",
                  en: "Unlike [[deduccion-ab2|AB2]], AM2 interpolates at $t_k$ and $t_{k+1}$. Thus it uses $f_k=f(t_k,y_k)$ and $f_{k+1}=f(t_{k+1},y_{k+1})$:",
                },
                formula:
                  "p_1(\\tau)=f_k L_k(\\tau)+f_{k+1}L_{k+1}(\\tau)",
              },
              {
                text: {
                  es: "Las funciones base de Lagrange son:",
                  eu: "Lagrangeren oinarri-funtzioak hauek dira:",
                  en: "The Lagrange basis functions are:",
                },
                formula:
                  "L_k(\\tau)=\\frac{\\tau-t_{k+1}}{t_k-t_{k+1}}=\\frac{t_{k+1}-\\tau}{h},\\qquad L_{k+1}(\\tau)=\\frac{\\tau-t_k}{t_{k+1}-t_k}=\\frac{\\tau-t_k}{h}",
              },
              {
                text: {
                  es: "Sustituyendo queda la recta que aproxima la pendiente dentro del subintervalo:",
                  eu: "Ordezkatuz, azpitarte barruko malda hurbiltzen duen zuzena geratzen da:",
                  en: "Substitution gives the line that approximates the slope inside the subinterval:",
                },
                formula:
                  "p_1(\\tau)=f_k\\,\\frac{t_{k+1}-\\tau}{h}+f_{k+1}\\,\\frac{\\tau-t_k}{h}=f_{k+1}\\frac{\\tau-t_k}{h}-f_k\\frac{\\tau-t_{k+1}}{h}",
              },
            ],
          },
        ],
      },
      {
        heading: {
          es: "Paso 3: cambio de variable e integrales",
          eu: "3. pausoa: aldagai-aldaketa eta integralak",
          en: "Step 3: change of variable and integrals",
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Para integrar usamos el mismo cambio que en tus apuntes: $s=\\tau-t_k$. Entonces $\\tau=t_k+s$, $d\\tau=ds$ y los extremos son $s=0$ y $s=h$.",
                  eu: "Integratzeko zure apunteetako aldaketa bera erabiltzen dugu: $s=\\tau-t_k$. Orduan $\\tau=t_k+s$, $d\\tau=ds$ eta muturrak $s=0$ eta $s=h$ dira.",
                  en: "To integrate, use the same change as in your notes: $s=\\tau-t_k$. Then $\\tau=t_k+s$, $d\\tau=ds$, and the limits are $s=0$ and $s=h$.",
                },
                formula:
                  "s=\\tau-t_k,\\qquad \\tau=t_k+s,\\qquad \\tau-t_{k+1}=s-h",
              },
              {
                text: {
                  es: "Con ese cambio, el interpolante se convierte en:",
                  eu: "Aldaketa horrekin, interpolatzailea honela bihurtzen da:",
                  en: "With this change, the interpolant becomes:",
                },
                formula:
                  "p_1(t_k+s)=f_{k+1}\\frac{s}{h}-f_k\\frac{s-h}{h}=f_{k+1}\\frac{s}{h}+f_k\\frac{h-s}{h}",
              },
              {
                text: {
                  es: "Integramos el término de $f_{k+1}$:",
                  eu: "$f_{k+1}$-ren gaia integratzen dugu:",
                  en: "Integrate the $f_{k+1}$ term:",
                },
                formula:
                  "\\int_0^h f_{k+1}\\frac{s}{h}\\,ds=f_{k+1}\\frac{1}{h}\\left[\\frac{s^2}{2}\\right]_0^h=\\frac{h}{2}f_{k+1}",
              },
              {
                text: {
                  es: "Integramos el término de $f_k$:",
                  eu: "$f_k$-ren gaia integratzen dugu:",
                  en: "Integrate the $f_k$ term:",
                },
                formula:
                  "\\int_0^h f_k\\frac{h-s}{h}\\,ds=f_k\\frac{1}{h}\\left[hs-\\frac{s^2}{2}\\right]_0^h=\\frac{h}{2}f_k",
              },
              {
                text: {
                  es: "Por tanto, la integral de la pendiente se aproxima por la suma de esos dos pesos:",
                  eu: "Beraz, maldaren integrala bi pisu horien baturaz hurbiltzen da:",
                  en: "Therefore the slope integral is approximated by the sum of those two weights:",
                },
                formula:
                  "\\int_{t_k}^{t_{k+1}} f\\bigl(\\tau,y(\\tau)\\bigr)\\,d\\tau\\approx \\int_{t_k}^{t_{k+1}}p_1(\\tau)\\,d\\tau=\\frac{h}{2}\\bigl(f_{k+1}+f_k\\bigr)",
              },
              {
                text: {
                  es: "Sustituyendo en la forma integral queda AM2:",
                  eu: "Forma integralean ordezkatuz AM2 lortzen da:",
                  en: "Substituting into the integral form gives AM2:",
                },
                formula:
                  "y_{k+1}=y_k+\\frac{h}{2}\\bigl(f_{k+1}+f_k\\bigr)",
              },
            ],
          },
        ],
      },
      {
        heading: {
          es: "Paso 4: por qué es implícito",
          eu: "4. pausoa: zergatik den inplizitua",
          en: "Step 4: why it is implicit",
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "El detalle clave es que $f_{k+1}$ no está calculado todavía:",
                  eu: "Xehetasun gakoa da $f_{k+1}$ oraindik kalkulatu gabe dagoela:",
                  en: "The key detail is that $f_{k+1}$ has not been computed yet:",
                },
                formula: "f_{k+1}=f(t_{k+1},y_{k+1})",
              },
              {
                text: {
                  es: "Así que la fórmula realmente es una ecuación para la incógnita $y_{k+1}$:",
                  eu: "Beraz formula, benetan, $y_{k+1}$ ezezagunarentzako ekuazio bat da:",
                  en: "So the formula is really an equation for the unknown $y_{k+1}$:",
                },
                formula:
                  "y_{k+1}=y_k+\\frac{h}{2}\\Bigl(f(t_{k+1},y_{k+1})+f(t_k,y_k)\\Bigr)",
              },
              {
                text: {
                  es: "Si se resuelve con Newton, conviene definir un residual $R(z)$, reservando $f$ solo para la función de la EDO:",
                  eu: "Newton-ekin ebazten bada, komeni da $R(z)$ hondarra definitzea, $f$ EDOaren funtziorako bakarrik utzita:",
                  en: "If solving with Newton, define a residual $R(z)$, keeping $f$ only for the ODE function:",
                },
                formula:
                  "R(z)=z-y_k-\\frac{h}{2}\\Bigl(f(t_{k+1},z)+f_k\\Bigr)",
              },
              {
                text: {
                  es: "Newton actualiza la aproximación hasta que $R(z)$ sea prácticamente cero:",
                  eu: "Newton-ek hurbilketa eguneratzen du $R(z)$ ia zero izan arte:",
                  en: "Newton updates the approximation until $R(z)$ is essentially zero:",
                },
                formula:
                  "z^{(m+1)}=z^{(m)}-\\frac{R(z^{(m)})}{R'(z^{(m)})},\\qquad R'(z)=1-\\frac{h}{2}\\,f_y(t_{k+1},z)",
              },
              {
                text: {
                  es: "En un par predictor-corrector se suele predecir $y_{k+1}$ con AB2 y usar esa predicción dentro de AM2:",
                  eu: "Iragarle-zuzentzaile bikote batean, normalean $y_{k+1}$ AB2-rekin iragartzen da eta iragarpen hori AM2 barruan erabiltzen da:",
                  en: "In a predictor-corrector pair, one usually predicts $y_{k+1}$ with AB2 and inserts that prediction into AM2:",
                },
                formula:
                  "y_{k+1}^{(p)}=y_k+\\frac{h}{2}(3f_k-f_{k-1}),\\qquad y_{k+1}^{(c)}=y_k+\\frac{h}{2}\\Bigl(f(t_{k+1},y_{k+1}^{(p)})+f_k\\Bigr)",
              },
            ],
          },
        ],
      },
      {
        heading: {
          es: "Paso 5: error y relación con el trapecio",
          eu: "5. pausoa: errorea eta trapezioarekiko lotura",
          en: "Step 5: error and link with the trapezoid",
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La fórmula obtenida es exactamente la [[deduccion-integracion-trapecio|regla del trapecio]] aplicada a la integral de la pendiente $y'(t)$. Como el trapecio tiene error local proporcional a la tercera derivada, se obtiene",
              eu: "Lortutako formula $y'(t)$ maldaren integralari aplikatutako [[deduccion-integracion-trapecio|trapezio-erregela]] da zehazki. Trapezioaren errore lokala hirugarren deribatuarekiko proportzionala denez, hau lortzen da",
              en: "The formula obtained is exactly the [[deduccion-integracion-trapecio|trapezoidal rule]] applied to the slope integral $y'(t)$. Since the trapezoid has local error proportional to the third derivative,",
            },
          },
          {
            kind: "formula",
            tex: "e_{k+1}=-\\frac{1}{12}h^3y'''(\\xi)=\\mathcal{O}(h^3)",
            caption: {
              es: "Error local de AM2; al acumular pasos, el error global es de orden 2.",
              eu: "AM2-ren errore lokala; pausoak metatzean, errore globala 2. ordenakoa da.",
              en: "Local error of AM2; after accumulating steps, the global error is order 2.",
            },
          },
          {
            kind: "paragraph",
            text: {
              es: "Por eso AM2 tiene el mismo orden global que AB2, pero una constante de error menor. La mejora se paga resolviendo la ecuación implícita o usando un corrector.",
              eu: "Horregatik AM2-k AB2-ren ordena global bera du, baina errore-konstante txikiagoa. Hobekuntza ekuazio inplizitua ebatzearen edo zuzentzaile bat erabiltzearen truke lortzen da.",
              en: "Thus AM2 has the same global order as AB2, but a smaller error constant. The improvement is paid for by solving the implicit equation or using a corrector.",
            },
          },
        ],
      },
    ],
  },
];

export const edoMultipasoExercises: ContentEntry[] = [
  {
    slug: "ejercicio-ab2-verhulst",
    category: "EDO",
    level: "avanzado",
    searchIntent: "ejercicio AB2 Verhulst estimación orden numérico EDO",
    title: {
      es: "Ejercicio: AB2 y estimación del orden",
      eu: "Ariketa: AB2 eta ordenaren estimazioa",
      en: "Exercise: AB2 and order estimation",
    },
    description: {
      es: "Resolución de un PVI logístico (Verhulst) con AB2 arrancado con Heun y estimación numérica del orden duplicando el número de subintervalos.",
      eu: "PVI logistiko bat (Verhulst) AB2-rekin ebaztea, Heun-ekin abiarazita, eta ordenaren estimazio numerikoa azpitarte kopurua bikoiztuz.",
      en: "Solving a logistic IVP (Verhulst) with AB2 started with Heun and estimating the order numerically by doubling the number of subintervals.",
    },
    keywords: ["AB2", "Verhulst", "orden", "ejercicio"],
    prerequisites: ["edo-adams-bashforth"],
    related: ["edo-adams-bashforth", "ejercicio-orden-numerico-un-paso"],
    sections: [
      {
        heading: {
          es: "Estimar el orden",
          eu: "Ordena estimatu",
          en: "Estimating the order",
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Para el PVI $y'(t)=(3-0.1\\,y)\\,y$, $t\\in[0,2]$, $y(0)=10$ (modelo de Verhulst, el mismo del [[ejercicio-orden-numerico-un-paso|ejercicio de los métodos de un paso]]), se resuelve con AB2 para $N=\\{2,4,8,16,32,64\\}$ subintervalos, arrancando $y_1$ con [[edo-metodo-heun|Heun]], y se estima el orden con el cociente de errores máximos al duplicar $N$.",
              eu: "$y'(t)=(3-0.1\\,y)\\,y$, $t\\in[0,2]$, $y(0)=10$ PVIrako (Verhulst eredua, [[ejercicio-orden-numerico-un-paso|urrats bakarreko metodoen ariketakoa]] bera), AB2-rekin ebazten da $N=\\{2,4,8,16,32,64\\}$ azpitarterako, $y_1$ [[edo-metodo-heun|Heun]]-ekin abiarazita, eta ordena errore maximoen zatidurarekin estimatzen da $N$ bikoiztean.",
              en: "For the IVP $y'(t)=(3-0.1\\,y)\\,y$, $t\\in[0,2]$, $y(0)=10$ (Verhulst model, the same as in the [[ejercicio-orden-numerico-un-paso|one-step methods exercise]]), solve with AB2 for $N=\\{2,4,8,16,32,64\\}$ subintervals, starting $y_1$ with [[edo-metodo-heun|Heun]], and estimate the order from the ratio of maximum errors when doubling $N$.",
            },
          },
          {
            kind: "table",
            head: {
              es: ["N", "Error máximo $E_N$", "$\\log_2(E_{N/2}/E_N)$"],
              eu: ["N", "Errore maximoa $E_N$", "$\\log_2(E_{N/2}/E_N)$"],
              en: ["N", "Maximum error $E_N$", "$\\log_2(E_{N/2}/E_N)$"],
            },
            rows: [
              ["2", "10.1480", "n/a"],
              ["4", "4.5230", "1.1658"],
              ["8", "0.6324", "2.8384"],
              ["16", "0.1938", "1.7064"],
              ["32", "0.0543", "1.8365"],
              ["64", "0.0144", "1.9178"],
            ],
          },
          {
            kind: "callout",
            variant: "note",
            title: { es: "Conclusión", eu: "Ondorioa", en: "Conclusion" },
            text: {
              es: "La columna del orden tiende a 2 al aumentar $N$, confirmando que AB2 es de orden 2, tal y como predice el término de error $\\frac{5}{12}h^3y'''$ de la [[deduccion-ab2|deducción]].",
              eu: "Ordenaren zutabea 2ra hurbiltzen da $N$ handitzean, AB2 2. ordenakoa dela baieztatuz, [[deduccion-ab2|dedukzioko]] $\\frac{5}{12}h^3y'''$ errore-gaiak aurreikusten duen bezala.",
              en: "The order column tends to 2 as $N$ increases, confirming AB2 is order 2, as the error term $\\frac{5}{12}h^3y'''$ from the [[deduccion-ab2|derivation]] predicts.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "ejercicio-predictor-corrector-comparativa",
    category: "EDO",
    level: "avanzado",
    searchIntent:
      "ejercicio predictor corrector ABM2 ABM4 comparar error explícito",
    title: {
      es: "Ejercicio: explícitos frente a predictor-corrector",
      eu: "Ariketa: esplizituak vs iragarle-zuzentzaile",
      en: "Exercise: explicit versus predictor-corrector",
    },
    description: {
      es: "Comparación del error máximo de AB2, AB4 y los predictor-corrector ABM2 y ABM4 sobre el mismo PVI de Verhulst.",
      eu: "AB2, AB4 eta ABM2 eta ABM4 iragarle-zuzentzaileen errore maximoaren konparazioa Verhulst PVI beraren gainean.",
      en: "Comparing the maximum error of AB2, AB4 and the predictor-correctors ABM2 and ABM4 on the same Verhulst IVP.",
    },
    keywords: ["predictor-corrector", "ABM2", "ABM4", "comparación"],
    prerequisites: ["edo-predictor-corrector"],
    related: ["edo-predictor-corrector", "ejercicio-ab2-verhulst"],
    sections: [
      {
        heading: {
          es: "Comparación de errores",
          eu: "Erroreen konparazioa",
          en: "Error comparison",
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Sobre el PVI de Verhulst $y'(t)=(3-0.1\\,y)\\,y$, $y(0)=10$, se comparan los errores máximos frente a la solución analítica $y(t)=\\frac{30}{1+2e^{-3t}}$.",
              eu: "Verhulst PVIaren gainean, $y'(t)=(3-0.1\\,y)\\,y$, $y(0)=10$, errore maximoak alderatzen dira $y(t)=\\frac{30}{1+2e^{-3t}}$ soluzio analitikoaren aldean.",
              en: "On the Verhulst IVP $y'(t)=(3-0.1\\,y)\\,y$, $y(0)=10$, the maximum errors are compared against the analytic solution $y(t)=\\frac{30}{1+2e^{-3t}}$.",
            },
          },
          {
            kind: "table",
            head: {
              es: ["Método", "Error máximo"],
              eu: ["Metodoa", "Errore maximoa"],
              en: ["Method", "Maximum error"],
            },
            rows: [
              ["AB2 (explícito)", "0.0613"],
              ["ABM2 (predictor-corrector)", "0.0157"],
              ["AB4 (explícito)", "0.0029"],
              ["ABM4 (predictor-corrector)", "2.5127·10⁻⁴"],
            ],
          },
          {
            kind: "callout",
            variant: "note",
            title: { es: "Lectura", eu: "Irakurketa", en: "Reading" },
            text: {
              es: "Para el mismo orden, el predictor-corrector mejora al método explícito solo: ABM2 supera a AB2 (factor 4) y ABM4 a AB4 (factor 11). Es el reflejo de la constante de error menor del corrector de [[edo-adams-moulton|Adams-Moulton]].",
              eu: "Ordena bererako, iragarle-zuzentzaileak metodo esplizitu hutsa hobetzen du: ABM2-k AB2 gainditzen du (4 faktorea) eta ABM4-k AB4 (11 faktorea). [[edo-adams-moulton|Adams-Moulton]] zuzentzailearen errore-konstante txikiagoaren isla da.",
              en: "For the same order, the predictor-corrector improves on the explicit method alone: ABM2 beats AB2 (factor 4) and ABM4 beats AB4 (factor 11). It reflects the smaller error constant of the [[edo-adams-moulton|Adams-Moulton]] corrector.",
            },
          },
        ],
      },
    ],
  },
];
