import type { ContentEntry } from "../content";

/**
 * Interpolation area, authored from the textbook chapter (Newton, Lagrange,
 * Hermite and cubic splines) with full derivations and worked examples.
 * Numbers in the worked examples reproduce the Spanish census dataset
 * (1971-2011) and the Bessel-function Hermite example.
 */

export const interpolacionArticles: ContentEntry[] = [
  {
    slug: "interpolacion-fundamentos",
    category: "Interpolación",
    level: "base",
    searchIntent: "qué es interpolación polinómica unicidad Weierstrass error",
    title: {
      es: "Interpolación: idea, existencia y error",
      eu: "Interpolazioa: ideia, existentzia eta errorea",
      en: "Interpolation: idea, existence and error"
    },
    description: {
      es: "Qué es interpolar, por qué se usan polinomios, el teorema de Weierstrass, la unicidad del polinomio interpolador y la cota de error común a Newton, Lagrange y Hermite.",
      eu: "Zer den interpolatzea, zergatik erabiltzen diren polinomioak, Weierstrass-en teorema, polinomio interpolatzailearen bakartasuna eta Newton, Lagrange eta Hermiterentzat komuna den errore-kota.",
      en: "What interpolation is, why polynomials are used, the Weierstrass theorem, uniqueness of the interpolating polynomial and the error bound shared by Newton, Lagrange and Hermite."
    },
    keywords: ["interpolación", "polinomio interpolador", "Weierstrass", "error", "unicidad"],
    related: ["interpolacion-newton", "interpolacion-lagrange", "interpolacion-hermite", "interpolacion-splines"],
    sections: [
      {
        heading: {
          es: "Qué problema resuelve la interpolación",
          eu: "Zer problema ebazten du interpolazioak",
          en: "What problem interpolation solves"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Partimos de una tabla de datos: conocemos el valor de una función en unos pocos puntos, pero no su expresión. Interpolar consiste en construir una función sencilla, a menudo un polinomio, que pase por esos puntos para estimar valores intermedios que no medimos.",
              eu: "Datu-taula batetik abiatzen gara: funtzio baten balioa puntu gutxi batzuetan ezagutzen dugu, baina ez haren adierazpena. Interpolatzea funtzio sinple bat, askotan polinomio bat, eraikitzea da, puntu horietatik pasatu eta neurtu ez ditugun tarteko balioak estimatzeko.",
              en: "We start from a data table: we know the value of a function at a few points, but not its formula. Interpolation builds a simple function, often a polynomial, through those points to estimate intermediate values we did not measure."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Si el punto que queremos estimar cae dentro del intervalo de los datos, hablamos de interpolación. Si cae fuera, hablamos de extrapolación, que es mucho menos fiable porque el polinomio no está controlado ahí.",
              eu: "Estimatu nahi dugun puntua datuen tartearen barruan badago, interpolazioaz ari gara. Kanpoan badago, estrapolazioaz ari gara, askoz fidagarritasun txikiagokoa, polinomioa han kontrolatu gabe dagoelako.",
              en: "If the point we want to estimate lies inside the data interval, we call it interpolation. If it lies outside, we call it extrapolation; the polynomial is less controlled there, so the estimate carries more risk."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Se usan polinomios porque sus derivadas e integrales vuelven a ser polinomios y son fáciles de evaluar. La siguiente forma genérica de grado $n$ es el objeto que buscamos:",
              eu: "Polinomioak erabiltzen dira haien deribatuak eta integralak berriro polinomioak direlako eta ebaluatzeko errazak direlako. Hurrengo $n$ graduko forma generikoa da bilatzen dugun objektua:",
              en: "Polynomials are used because their derivatives and integrals are again polynomials and they are easy to evaluate. The generic degree-$n$ form below is the object we are after:"
            }
          },
          {
            kind: "formula",
            tex: "p_n(x)=\\sum_{i=0}^{n} a_i x^i,\\qquad n\\ge 0,\\ a_i\\in\\mathbb{R}"
          }
        ]
      },
      {
        heading: {
          es: "Existencia y unicidad",
          eu: "Existentzia eta bakartasuna",
          en: "Existence and uniqueness"
        },
        blocks: [
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Teorema de aproximación de Weierstrass",
              eu: "Weierstrass-en hurbilketa-teorema",
              en: "Weierstrass approximation theorem"
            },
            text: {
              es: "Sea $f$ continua en $[a,b]$. Entonces, para todo $\\varepsilon>0$ existe un polinomio $p(x)$ tal que $|f(x)-p(x)|<\\varepsilon$ para todo $x$ del intervalo. Es decir, cualquier función continua puede aproximarse tanto como se quiera por un polinomio.",
              eu: "Izan bedi $f$ jarraitua $[a,b]$-n. Orduan, $\\varepsilon>0$ orori dagokionez badago $p(x)$ polinomio bat non $|f(x)-p(x)|<\\varepsilon$ den tarteko $x$ guztietarako. Hau da, edozein funtzio jarraitu nahi bezain hurbil hurbil daiteke polinomio baten bidez.",
              en: "Let $f$ be continuous on $[a,b]$. Then, for every $\\varepsilon>0$ there is a polynomial $p(x)$ with $|f(x)-p(x)|<\\varepsilon$ for all $x$ in the interval. In other words, any continuous function can be approximated as closely as we like by a polynomial."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "La interpolación usa un hecho más fuerte: dados $n+1$ puntos con abscisas distintas, existe un único polinomio de grado menor o igual que $n$ que pasa por todos ellos. Newton, Lagrange y Hermite no dan polinomios distintos: dan el mismo polinomio escrito de forma diferente, cada una cómoda para un propósito.",
              eu: "Interpolazioak gertaera indartsuago bat erabiltzen du: abzisa desberdineko $n+1$ puntu emanik, badago $n$ baino gradu txikiago edo berdineko polinomio bakar bat guztietatik pasatzen dena. Newtonek, Lagrangek eta Hermitek ez dituzte polinomio desberdinak ematen: polinomio bera ematen dute modu desberdinean idatzita, bakoitza helburu baterako erosoa.",
              en: "For interpolation a stronger fact is key: given $n+1$ points with distinct abscissas, there is a unique polynomial of degree at most $n$ through all of them. Newton, Lagrange and Hermite do not give different polynomials: they give the same polynomial written differently, each convenient for a purpose."
            }
          }
        ]
      },
      {
        heading: {
          es: "La cota de error",
          eu: "Errore-kota",
          en: "The error bound"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Todas las familias comparten la misma expresión de error. Si $f$ es suficientemente derivable en $[a,b]$ y $p_n$ interpola en $x_0<\\dots<x_n$, entonces para cada $x$ existe un $\\xi$ en el intervalo tal que:",
              eu: "Familia guztiek errore-adierazpen bera partekatzen dute. $f$ nahikoa deribagarria bada $[a,b]$-n eta $p_n$-k $x_0<\\dots<x_n$ puntuetan interpolatzen badu, orduan $x$ bakoitzarentzat badago $\\xi$ bat tartean non:",
              en: "All families share the same error expression. If $f$ is smooth enough on $[a,b]$ and $p_n$ interpolates at $x_0<\\dots<x_n$, then for each $x$ there is a $\\xi$ in the interval such that:"
            }
          },
          {
            kind: "formula",
            tex: "f(x)-p_n(x)=\\frac{f^{(n+1)}(\\xi)}{(n+1)!}\\prod_{i=0}^{n}(x-x_i)"
          },
          {
            kind: "paragraph",
            text: {
              es: "El error depende de dos cosas: la derivada de orden $n+1$ (propia de la función) y el producto de distancias a los nodos (propio de dónde evalúas). Cerca de los nodos el producto es pequeño; entre nodos muy separados o fuera del intervalo puede crecer mucho.",
              eu: "Errorea bi gauzaren araberakoa da: $n+1$ ordenako deribatua (funtzioarena) eta nodoetarako distantzien biderkadura (non ebaluatzen duzunarena). Nodoetatik hurbil biderkadura txikia da; oso urrunduta dauden nodoen artean edo tartetik kanpo asko haz daiteke.",
              en: "The error depends on two things: the $(n+1)$-th derivative (a property of the function) and the product of distances to the nodes (a property of where you evaluate). Near the nodes the product is small; between widely spaced nodes or outside the interval it can grow a lot."
            }
          },
          {
            kind: "callout",
            variant: "warning",
            title: { es: "Error común", eu: "Ohiko akatsa", en: "Common mistake" },
            text: {
              es: "$\\xi$ es desconocido y depende de $x$: no se puede despejar. Para acotar el error se sustituye $f^{(n+1)}(\\xi)$ por su máximo $M$ en el intervalo, lo que da una cota superior, no el error exacto.",
              eu: "$\\xi$ ezezaguna da eta $x$-ren araberakoa: ezin da askatu. Errorea kotatzeko, $f^{(n+1)}(\\xi)$ haren $M$ gehienekoaz ordezkatzen da tartean, goiko kota bat emanez, ez errore zehatza.",
              en: "$\\xi$ is unknown and depends on $x$: it cannot be solved for. To bound the error, replace $f^{(n+1)}(\\xi)$ by its maximum $M$ on the interval, which gives an upper bound, not the exact error."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "interpolacion-newton",
    category: "Interpolación",
    level: "medio",
    searchIntent: "interpolación Newton diferencias divididas tabla error",
    title: {
      es: "Interpolación de Newton y diferencias divididas",
      eu: "Newtonen interpolazioa eta diferentzia zatituak",
      en: "Newton interpolation and divided differences"
    },
    description: {
      es: "El polinomio de Newton construido por capas con diferencias divididas: forma lineal, cuadrática y general, tabla de diferencias, error y un ejemplo resuelto con datos reales.",
      eu: "Newtonen polinomioa geruzaka eraikia diferentzia zatituekin: forma lineala, koadratikoa eta orokorra, diferentzien taula, errorea eta datu errealekin ebatzitako adibide bat.",
      en: "The Newton polynomial built in layers with divided differences: linear, quadratic and general form, the difference table, the error and a worked example with real data."
    },
    keywords: ["Newton", "diferencias divididas", "tabla", "interpolación"],
    prerequisites: ["interpolacion-fundamentos"],
    related: ["interpolacion-lagrange", "interpolacion-hermite", "deduccion-diferencias-divididas-newton", "ejercicio-newton-censo"],
    sections: [
      {
        heading: {
          es: "La idea: un polinomio por capas",
          eu: "Ideia: polinomioa geruzaka",
          en: "The idea: a polynomial in layers"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Newton escribe el polinomio de forma que cada nodo nuevo añade un término sin obligar a rehacer lo anterior. En lugar de la base de potencias se usa la base de productos acumulados:",
              eu: "Newtonek polinomioa idazten du nodo berri bakoitzak termino bat gehitzen duen moduan, aurrekoa berregin gabe. Berreduren oinarriaren ordez, biderkadura metatuen oinarria erabiltzen da:",
              en: "Newton writes the polynomial so that each new node adds one term without forcing a rebuild of the previous work. Instead of the power basis, it uses a basis of accumulated products:"
            }
          },
          {
            kind: "formula",
            tex: "p_n(x)=b_0+b_1(x-x_0)+b_2(x-x_0)(x-x_1)+\\cdots+b_n(x-x_0)\\cdots(x-x_{n-1})"
          },
          {
            kind: "paragraph",
            text: {
              es: "Los coeficientes $b_i$ son las diferencias divididas de orden $i$. La forma lineal (dos puntos) fija la idea:",
              eu: "$b_i$ koefizienteak $i$ ordenako diferentzia zatituak dira. Forma linealak (bi puntu) ideia finkatzen du:",
              en: "The coefficients $b_i$ are the divided differences of order $i$. The linear form (two points) fixes the idea:"
            }
          },
          {
            kind: "formula",
            tex: "p_1(x)=f(x_0)+\\underbrace{\\frac{f(x_1)-f(x_0)}{x_1-x_0}}_{f[x_1,x_0]}(x-x_0)"
          }
        ]
      },
      {
        heading: {
          es: "Diferencias divididas",
          eu: "Diferentzia zatituak",
          en: "Divided differences"
        },
        blocks: [
          {
            kind: "callout",
            variant: "definition",
            title: { es: "Definición recursiva", eu: "Definizio errekurtsiboa", en: "Recursive definition" },
            text: {
              es: "La diferencia dividida de orden cero es el propio valor $f[x_i]=f(x_i)$. Las de orden superior se definen restando dos diferencias del orden anterior y dividiendo por la distancia entre los nodos extremos.",
              eu: "Zero ordenako diferentzia zatitua balioa bera da, $f[x_i]=f(x_i)$. Ordena altuagokoak aurreko ordenako bi diferentzia kenduz eta muturreko nodoen arteko distantziaz zatituz definitzen dira.",
              en: "The zero-order divided difference is the value itself, $f[x_i]=f(x_i)$. Higher orders are defined by subtracting two differences of the previous order and dividing by the distance between the extreme nodes."
            },
            formula: "f[x_n,\\dots,x_0]=\\frac{f[x_n,\\dots,x_1]-f[x_{n-1},\\dots,x_0]}{x_n-x_0}"
          },
          {
            kind: "paragraph",
            text: {
              es: "En la práctica se rellena una tabla triangular: la primera columna son los $f(x_i)$, la segunda las diferencias de primer orden, y así sucesivamente. Los coeficientes del polinomio son la diagonal superior.",
              eu: "Praktikan, taula triangeluar bat betetzen da: lehen zutabea $f(x_i)$ balioak dira, bigarrena lehen ordenako diferentziak, eta horrela hurrenez hurren. Polinomioaren koefizienteak goiko diagonala dira.",
              en: "In practice you fill a triangular table: the first column is the $f(x_i)$, the second the first-order differences, and so on. The polynomial coefficients are the upper diagonal."
            }
          },
          {
            kind: "callout",
            variant: "note",
            title: { es: "No confundir", eu: "Ez nahastu", en: "Do not confuse" },
            text: {
              es: "Las diferencias divididas no exigen nodos equiespaciados; las [[diferenciacion-primera-derivada|diferencias finitas]] sí suponen un paso $h$ constante. Son objetos distintos.",
              eu: "Diferentzia zatituek ez dute nodo ekidistanteen beharrik; [[diferenciacion-primera-derivada|diferentzia finituek]] $h$ pausu konstantea suposatzen dute. Objektu desberdinak dira.",
              en: "Divided differences do not require equally spaced nodes; [[diferenciacion-primera-derivada|finite differences]] do assume a constant step $h$. They are different objects."
            }
          }
        ]
      },
      {
        heading: {
          es: "Error del polinomio de Newton",
          eu: "Newtonen polinomioaren errorea",
          en: "Error of the Newton polynomial"
        },
        blocks: [
          {
            kind: "callout",
            variant: "theorem",
            title: { es: "Error de interpolación de Newton", eu: "Newtonen interpolazio-errorea", en: "Newton interpolation error" },
            text: {
              es: "Sean $a=x_0<x_1<\\dots<x_n=b$ y $f$ de clase $\\mathcal{C}^{n+1}$ en $[a,b]$. Entonces, para todo $x$ del intervalo existe $\\xi$ tal que se cumple la fórmula de abajo, con $p_n$ el polinomio de Newton de grado $n$.",
              eu: "Izan bitez $a=x_0<x_1<\\dots<x_n=b$ eta $f$, $\\mathcal{C}^{n+1}$ klasekoa $[a,b]$-n. Orduan, tarteko $x$ orori dagokionez badago $\\xi$ bat non beheko formula betetzen den, $p_n$ $n$ graduko Newtonen polinomioa izanik.",
              en: "Let $a=x_0<x_1<\\dots<x_n=b$ and $f$ be of class $\\mathcal{C}^{n+1}$ on $[a,b]$. Then for every $x$ in the interval there is a $\\xi$ such that the formula below holds, with $p_n$ the degree-$n$ Newton polynomial."
            },
            formula: "f(x)=p_n(x)+\\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-x_0)\\cdots(x-x_n)"
          }
        ]
      },
      {
        heading: {
          es: "Ejemplo resuelto",
          eu: "Ebatzitako adibidea",
          en: "Worked example"
        },
        blocks: [
          {
            kind: "example",
            title: { es: "Censo de población (grado 4)", eu: "Biztanleria-errolda (4. gradua)", en: "Population census (degree 4)" },
            statement: {
              es: "Con los datos de población de España (millones) en 1971, 1981, 1991, 2001 y 2011 (33.956, 37.743, 39.434, 40.847 y 46.816), estima la población en 2005 con el polinomio de Newton de mayor grado posible.",
              eu: "Espainiako biztanleriaren datuekin (milioika) 1971, 1981, 1991, 2001 eta 2011 urteetan (33.956, 37.743, 39.434, 40.847 eta 46.816), estimatu 2005eko biztanleria ahalik eta gradu handieneko Newtonen polinomioarekin.",
              en: "With Spain's population data (millions) in 1971, 1981, 1991, 2001 and 2011 (33.956, 37.743, 39.434, 40.847 and 46.816), estimate the 2005 population with the highest-degree Newton polynomial."
            },
            steps: [
              {
                text: {
                  es: "Con 5 datos el grado es 4. Calculamos las diferencias divididas (la diagonal superior de la tabla):",
                  eu: "5 daturekin gradua 4 da. Diferentzia zatituak kalkulatzen ditugu (taularen goiko diagonala):",
                  en: "With 5 data points the degree is 4. Compute the divided differences (the upper diagonal of the table):"
                },
                formula: "\\begin{aligned} f[x_0]&=33.956\\\\ f[x_1,x_0]&=0.3787\\\\ f[x_2,x_1,x_0]&=-0.01048\\\\ f[x_3,\\dots,x_0]&=0.000303\\\\ f[x_4,\\dots,x_0]&=0.0000127 \\end{aligned}"
                },
              {
                text: {
                  es: "Montamos el polinomio de Newton con esos coeficientes:",
                  eu: "Newtonen polinomioa muntatzen dugu koefiziente horiekin:",
                  en: "Assemble the Newton polynomial with those coefficients:"
                },
                formula: "\\begin{aligned} p_4(x)=\\ &33.956+0.3787\\,(x-1971)\\\\ &-0.01048\\,(x-1971)(x-1981)\\\\ &+0.000303\\,(x-1971)(x-1981)(x-1991)\\\\ &+0.0000127\\,(x-1971)(x-1981)(x-1991)(x-2001) \\end{aligned}"
              }
            ],
            result: {
              text: {
                es: "Evaluando en 2005 se obtiene la estimación:",
                eu: "2005ean ebaluatuz estimazioa lortzen da:",
                en: "Evaluating at 2005 gives the estimate:"
              },
              formula: "p_4(2005)\\approx 42.315\\ \\text{millones}"
            }
          }
        ]
      },
      {
        heading: {
          es: "Deducción de las diferencias divididas",
          eu: "Diferentzia zatituen dedukzioa",
          en: "Derivation of divided differences"
        },
        blocks: [
          { kind: "derivation", slug: "deduccion-diferencias-divididas-newton" }
        ]
      }
    ]
  },
  {
    slug: "interpolacion-lagrange",
    category: "Interpolación",
    level: "medio",
    searchIntent: "interpolación Lagrange funciones base polinomio error",
    title: {
      es: "Interpolación de Lagrange",
      eu: "Lagrangeren interpolazioa",
      en: "Lagrange interpolation"
    },
    description: {
      es: "Las funciones base de Lagrange, la propiedad cardinal que las define, el polinomio como combinación directa de los datos, su error y un ejemplo resuelto con los datos del censo.",
      eu: "Lagrangeren oinarri-funtzioak, definitzen dituen propietate kardinala, polinomioa datuen konbinazio zuzen gisa, haren errorea eta erroldako datuekin ebatzitako adibide bat.",
      en: "The Lagrange basis functions, the cardinal property that defines them, the polynomial as a direct combination of the data, its error and a worked example with the census data."
    },
    keywords: ["Lagrange", "funciones base", "interpolación", "polinomio"],
    prerequisites: ["interpolacion-fundamentos"],
    related: ["interpolacion-newton", "interpolacion-hermite", "deduccion-lagrange-base", "ejercicio-lagrange-censo"],
    sections: [
      {
        heading: {
          es: "Funciones base cardinales",
          eu: "Oinarri-funtzio kardinalak",
          en: "Cardinal basis functions"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Lagrange construye el mismo polinomio único en forma directa y simétrica. Las funciones $L_i(x)$ valen 1 en su nodo y 0 en los demás:",
              eu: "Lagrangek polinomio bakar bera eraikitzen du, baina modu zuzen eta simetrikoan. Gakoa $L_i(x)$ funtzioak dira, beren nodoan 1 eta gainerakoetan 0 balio dutenak:",
              en: "Lagrange builds the same unique polynomial in direct, symmetric form. The functions $L_i(x)$ equal 1 at their node and 0 at the others:"
            }
          },
          {
            kind: "formula",
            tex: "L_{i}(x_j)=\\begin{cases}1,& i=j\\\\[2pt] 0,& i\\ne j\\end{cases}\\qquad\\Longrightarrow\\qquad L_{i}(x)=\\prod_{\\substack{j=0\\\\ j\\ne i}}^{n}\\frac{x-x_j}{x_i-x_j}"
          },
          {
            kind: "paragraph",
            text: {
              es: "En el numerador aparecen todos los factores $(x-x_j)$ salvo $(x-x_i)$; en el denominador, todos los $(x_i-x_j)$ salvo $(x_i-x_i)$. Con estas funciones el polinomio es una combinación de los valores conocidos:",
              eu: "Zenbakitzailean $(x-x_j)$ faktore guztiak agertzen dira $(x-x_i)$ izan ezik; izendatzailean, $(x_i-x_j)$ guztiak $(x_i-x_i)$ izan ezik. Funtzio hauekin polinomioa balio ezagunen konbinazioa da:",
              en: "The numerator has all factors $(x-x_j)$ except $(x-x_i)$; the denominator has all $(x_i-x_j)$ except $(x_i-x_i)$. With these functions the polynomial is a combination of the known values:"
            }
          },
          {
            kind: "formula",
            tex: "p_n(x)=\\sum_{i=0}^{n} L_{i}(x)\\,f(x_i)"
          },
          {
            kind: "steps",
            title: {
              es: "Por qué el polinomio pasa por cada nodo",
              eu: "Zergatik igarotzen den polinomioa nodo bakoitzetik",
              en: "Why the polynomial passes through every node"
            },
            steps: [
              {
                text: {
                  es: "Para comprobarlo en un nodo concreto $x_k$, evaluamos el polinomio ahí:",
                  eu: "Nodo zehatz batean, $x_k$-n, egiaztatzeko, polinomioa han ebaluatzen dugu:",
                  en: "To check this at a specific node $x_k$, evaluate the polynomial there:"
                },
                formula: "p_n(x_k)=\\sum_{i=0}^{n} L_i(x_k)\\,f(x_i)"
              },
              {
                text: {
                  es: "La propiedad cardinal anula todas las bases salvo la que corresponde al propio nodo $x_k$:",
                  eu: "Propietate kardinalak oinarri guztiak anulatzen ditu, $x_k$ nodoari dagokiona izan ezik:",
                  en: "The cardinal property cancels all basis functions except the one attached to the node $x_k$:"
                },
                formula: "L_i(x_k)=\\begin{cases}0,& i\\ne k\\\\[2pt]1,& i=k\\end{cases}"
              },
              {
                text: {
                  es: "Así solo sobrevive el término $i=k$, y el interpolante reproduce el dato de ese nodo:",
                  eu: "Horrela $i=k$ terminoa bakarrik geratzen da, eta interpolatzaileak nodo horretako datua berreskuratzen du:",
                  en: "Only the term $i=k$ remains, and the interpolant reproduces the datum at that node:"
                },
                formula: "p_n(x_k)=L_k(x_k)\\,f(x_k)=f(x_k)"
              }
            ]
          }
        ]
      },
      {
        heading: {
          es: "Newton frente a Lagrange",
          eu: "Newton vs Lagrange",
          en: "Newton versus Lagrange"
        },
        blocks: [
          {
            kind: "list",
            items: {
              es: [
                "Lagrange es directo y simétrico: ideal para pocos nodos y para deducir reglas (cuadratura, diferenciación).",
                "Newton es incremental: añadir un nodo cuesta un término, no rehacer todo.",
                "Ambos dan el mismo polinomio y comparten la misma cota de error."
              ],
              eu: [
                "Lagrange zuzena eta simetrikoa da: nodo gutxirako eta erregelak deduzitzeko egokia (kuadratura, deribazioa).",
                "Newton inkrementala da: nodo bat gehitzea termino bat da, ez dena berregitea.",
                "Biek polinomio bera ematen dute eta errore-kota berbera partekatzen dute."
              ],
              en: [
                "Lagrange is direct and symmetric: ideal for few nodes and for deriving rules (quadrature, differentiation).",
                "Newton is incremental: adding a node costs one term, not a full rebuild.",
                "Both give the same polynomial and share the same error bound."
              ]
            }
          },
          {
            kind: "callout",
            variant: "theorem",
            title: { es: "Error de Lagrange", eu: "Lagrangeren errorea", en: "Lagrange error" },
            text: {
              es: "Idéntico al de Newton: para $f$ de clase $\\mathcal{C}^{n+1}$ y todo $x$ existe $\\xi$ con",
              eu: "Newtonenaren berdina: $\\mathcal{C}^{n+1}$ klaseko $f$-rako eta $x$ orori dagokionez badago $\\xi$ bat non",
              en: "Identical to Newton's: for $f$ of class $\\mathcal{C}^{n+1}$ and every $x$ there is a $\\xi$ with"
            },
            formula: "f(x)-p_n(x)=\\frac{f^{(n+1)}(\\xi)}{(n+1)!}\\prod_{i=0}^{n}(x-x_i)"
          }
        ]
      },
      {
        heading: {
          es: "Ejemplo resuelto",
          eu: "Ebatzitako adibidea",
          en: "Worked example"
        },
        blocks: [
          {
            kind: "example",
            title: { es: "Censo de población (grado 4)", eu: "Biztanleria-errolda (4. gradua)", en: "Population census (degree 4)" },
            statement: {
              es: "Con los mismos datos del censo (1971–2011), construye el polinomio de Lagrange de grado 4 y estima la población en 2005.",
              eu: "Erroldako datu berekin (1971–2011), eraiki 4. graduko Lagrangeren polinomioa eta estimatu 2005eko biztanleria.",
              en: "With the same census data (1971–2011), build the degree-4 Lagrange polynomial and estimate the 2005 population."
            },
            steps: [
              {
                text: {
                  es: "Cada $L_i$ tiene los cuatro factores de los otros nodos. Por ejemplo, para $x_0=1971$:",
                  eu: "$L_i$ bakoitzak beste nodoen lau faktoreak ditu. Adibidez, $x_0=1971$-erako:",
                  en: "Each $L_i$ has the four factors of the other nodes. For example, for $x_0=1971$:"
                },
                formula: "\\begin{aligned}L_0(x)&="
                  + "\\frac{(x-1981)(x-1991)(x-2001)(x-2011)}"
                  + "{(1971-1981)(1971-1991)(1971-2001)(1971-2011)}"
                  + "\\\\&=\\frac{(x-1981)(x-1991)(x-2001)(x-2011)}"
                  + "{240000}\\end{aligned}"
              },
              {
                text: {
                  es: "El polinomio suma cada $L_i$ por su valor $f(x_i)$:",
                  eu: "Polinomioak $L_i$ bakoitza bere $f(x_i)$ balioaz batzen du:",
                  en: "The polynomial sums each $L_i$ times its value $f(x_i)$:"
                },
                formula: "p_4(x)=\\sum_{i=0}^{4} L_i(x)\\,f(x_i)"
              }
            ],
            result: {
              text: {
                es: "El resultado coincide (salvo redondeo) con el de Newton, como debe ser por unicidad:",
                eu: "Emaitza bat dator (biribiltzea izan ezik) Newtonenarekin, bakartasunagatik izan behar duen bezala:",
                en: "The result matches (up to rounding) the Newton one, as uniqueness requires:"
              },
              formula: "p_4(2005)\\approx 42.316\\ \\text{millones}"
            }
          }
        ]
      },
      {
        heading: {
          es: "Deducción de la base de Lagrange",
          eu: "Lagrange oinarriaren dedukzioa",
          en: "Derivation of the Lagrange basis"
        },
        blocks: [
          { kind: "derivation", slug: "deduccion-lagrange-base" }
        ]
      }
    ]
  },
  {
    slug: "interpolacion-hermite",
    category: "Interpolación",
    level: "avanzado",
    searchIntent: "interpolación Hermite derivadas H_{2n+1} error nodos repetidos",
    title: {
      es: "Interpolación de Hermite",
      eu: "Hermiteren interpolazioa",
      en: "Hermite interpolation"
    },
    description: {
      es: "Interpolación que impone valor y derivada en cada nodo: el polinomio H_{2n+1}, su construcción a partir de las bases de Lagrange, el error, la vía práctica por diferencias divididas con nodos repetidos y un ejemplo con funciones de Bessel.",
      eu: "Nodo bakoitzean balioa eta deribatua inposatzen dituen interpolazioa: H_{2n+1} polinomioa, Lagrangeren oinarrietatik eraikia, errorea, nodo errepikatuen bidezko bide praktikoa eta Bessel funtzioekin adibide bat.",
      en: "Interpolation that imposes value and derivative at each node: the polynomial H_{2n+1}, its construction from the Lagrange bases, the error, the practical route via divided differences with repeated nodes and a Bessel-function example."
    },
    keywords: ["Hermite", "derivadas", "nodos repetidos", "interpolación"],
    prerequisites: ["interpolacion-lagrange", "interpolacion-newton"],
    related: ["interpolacion-lagrange", "ejercicio-hermite-bessel"],
    sections: [
      {
        heading: {
          es: "Qué añade Hermite",
          eu: "Hermitek zer gehitzen duen",
          en: "What Hermite adds"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Hasta ahora forzábamos que el polinomio pasara por los puntos. Si además conocemos la derivada de $f$ en esos puntos, podemos imponerla también: eso controla la pendiente y suele mejorar mucho la aproximación.",
              eu: "Orain arte polinomioa puntuetatik pasatzera behartzen genuen. Gainera puntu horietan $f$-ren deribatua ezagutzen badugu, hura ere inposa dezakegu: horrek malda kontrolatzen du eta hurbilketa asko hobetu ohi du.",
              en: "So far we forced the polynomial through the points. If we also know $f$'s derivative at those points, we can impose it too: this controls the slope and often improves the approximation."
            }
          },
          {
            kind: "callout",
            variant: "theorem",
            title: { es: "Teorema (polinomio de Hermite)", eu: "Teorema (Hermiteren polinomioa)", en: "Theorem (Hermite polynomial)" },
            text: {
              es: "Sea $f$ de clase $\\mathcal{C}^1$ y $x_0,\\dots,x_n$ en $[a,b]$. El único polinomio que coincide con $f$ y con $f'$ en esos nodos tiene grado $\\le 2n+1$ y se escribe con las bases de Lagrange $L_i$:",
              eu: "Izan bedi $f$, $\\mathcal{C}^1$ klasekoa eta $x_0,\\dots,x_n$ $[a,b]$-n. $f$ eta $f'$-rekin nodo horietan bat datorren polinomio bakarrak $\\le 2n+1$ gradua du eta Lagrangeren $L_i$ oinarriekin idazten da:",
              en: "Let $f$ be of class $\\mathcal{C}^1$ and $x_0,\\dots,x_n$ in $[a,b]$. The unique polynomial matching $f$ and $f'$ at those nodes has degree $\\le 2n+1$ and is written with the Lagrange bases $L_i$:"
            },
            formula: "H_{2n+1}(x)=\\sum_{i=0}^{n} f(x_i)\\,H_{i}(x)+f'(x_i)\\,\\hat H_{i}(x)"
          },
          {
            kind: "formula",
            tex: "H_{i}(x)=\\bigl[1-2(x-x_i)L_i'(x_i)\\bigr]L_i^2(x),\\qquad \\hat H_{i}(x)=(x-x_i)L_i^2(x)",
            caption: {
              es: "Bloques base construidos a partir de las funciones de Lagrange y sus derivadas.",
              eu: "Lagrangeren funtzioetatik eta haien deribatuetatik eraikitako oinarri-blokeak.",
              en: "Base blocks built from the Lagrange functions and their derivatives."
            }
          }
        ]
      },
      {
        heading: {
          es: "Procedimiento y error",
          eu: "Prozedura eta errorea",
          en: "Procedure and error"
        },
        blocks: [
          {
            kind: "steps",
            title: { es: "Cinco pasos", eu: "Bost urrats", en: "Five steps" },
            steps: [
              { text: { es: "Calcular las funciones de Lagrange $L_i(x)$.", eu: "Lagrangeren $L_i(x)$ funtzioak kalkulatu.", en: "Compute the Lagrange functions $L_i(x)$." } },
              { text: { es: "Derivarlas para obtener $L_i'(x)$.", eu: "Deribatu $L_i'(x)$ lortzeko.", en: "Differentiate them to obtain $L_i'(x)$." } },
              { text: { es: "Formar los bloques $H_i(x)$.", eu: "$H_i(x)$ blokeak osatu.", en: "Form the blocks $H_i(x)$." } },
              { text: { es: "Formar los bloques $\\hat H_i(x)$.", eu: "$\\hat H_i(x)$ blokeak osatu.", en: "Form the blocks $\\hat H_i(x)$." } },
              { text: { es: "Sumar todo para obtener $H_{2n+1}(x)$.", eu: "Dena batu $H_{2n+1}(x)$ lortzeko.", en: "Sum everything to obtain $H_{2n+1}(x)$." } }
            ]
          },
          {
            kind: "callout",
            variant: "theorem",
            title: { es: "Error de Hermite", eu: "Hermiteren errorea", en: "Hermite error" },
            text: {
              es: "Como cada nodo se cumple dos veces (valor y derivada), cada factor aparece al cuadrado y la derivada implicada es de orden $2n+2$:",
              eu: "Nodo bakoitza bi aldiz betetzen denez (balioa eta deribatua), faktore bakoitza karratuan agertzen da eta inplikatutako deribatua $2n+2$ ordenakoa da:",
              en: "Because each node is matched twice (value and derivative), each factor appears squared and the derivative involved is of order $2n+2$:"
            },
            formula: "f(x)-H_{2n+1}(x)=\\frac{f^{(2n+2)}(\\xi)}{(2n+2)!}\\,(x-x_0)^2\\cdots(x-x_n)^2"
          },
          {
            kind: "callout",
            variant: "note",
            title: { es: "Atajo práctico", eu: "Bide praktikoa", en: "Practical shortcut" },
            text: {
              es: "Hermite se puede montar como un Newton con nodos repetidos: se duplica cada nodo ($z_{2i}=z_{2i+1}=x_i$) y, cuando dos nodos coinciden, la diferencia dividida se sustituye por la derivada, $f[x_i,x_i]=f'(x_i)$.",
              eu: "Hermite Newton bat bezala munta daiteke nodo errepikatuekin: nodo bakoitza bikoiztu ($z_{2i}=z_{2i+1}=x_i$) eta, bi nodo bat datozenean, diferentzia zatitua deribatuaz ordezkatzen da, $f[x_i,x_i]=f'(x_i)$.",
              en: "Hermite can be assembled as a Newton with repeated nodes: duplicate each node ($z_{2i}=z_{2i+1}=x_i$) and, when two nodes coincide, replace the divided difference by the derivative, $f[x_i,x_i]=f'(x_i)$."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "interpolacion-splines",
    category: "Interpolación",
    level: "avanzado",
    searchIntent: "splines cúbicos naturales sistema tridiagonal condiciones continuidad",
    title: {
      es: "Splines cúbicos",
      eu: "Spline kubikoak",
      en: "Cubic splines"
    },
    description: {
      es: "Interpolación a trozos con un cúbico por tramo: las condiciones de continuidad, el sistema tridiagonal que determina los coeficientes, los splines naturales y su resolución.",
      eu: "Zatikako interpolazioa tarte bakoitzeko kubiko batekin: jarraitutasun-baldintzak, koefizienteak zehazten dituen sistema tridiagonala, spline naturalak eta haien ebazpena.",
      en: "Piecewise interpolation with one cubic per interval: the continuity conditions, the tridiagonal system that fixes the coefficients, natural splines and how to solve them."
    },
    keywords: ["splines", "cúbico", "tridiagonal", "natural", "interpolación a trozos"],
    prerequisites: ["interpolacion-fundamentos"],
    related: ["interpolacion-newton", "interpolacion-lagrange"],
    sections: [
      {
        heading: {
          es: "Por qué a trozos",
          eu: "Zergatik zatika",
          en: "Why piecewise"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Un único polinomio de grado alto oscila entre nodos (fenómeno de Runge). Los splines evitan ese problema usando un polinomio distinto, de grado bajo, en cada tramo, y pegándolos con suavidad. Los más usados son los cúbicos.",
              eu: "Gradu handiko polinomio bakar batek nodoen artean oszilatzen du (Runge fenomenoa). Splineek arazo hori saihesten dute tarte bakoitzean gradu txikiko polinomio desberdin bat erabiliz, eta leuntasunez elkartuz. Erabilienak kubikoak dira.",
              en: "A single high-degree polynomial oscillates between nodes (Runge phenomenon). Splines avoid this by using a different, low-degree polynomial on each interval, joined smoothly. The most used are cubic."
            }
          },
          {
            kind: "formula",
            tex: "S_i(x)=a_i+b_i(x-x_i)+c_i(x-x_i)^2+d_i(x-x_i)^3,\\qquad i=0,\\dots,n-1"
          }
        ]
      },
      {
        heading: {
          es: "Condiciones del spline cúbico",
          eu: "Spline kubikoaren baldintzak",
          en: "Cubic spline conditions"
        },
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: {
              es: [
                "Interpola: S(x_i)=f(x_i) en cada nodo.",
                "Es a trozos: S(x)=S_i(x) en [x_i, x_{i+1}].",
                "Continuidad de valor en los nodos compartidos: S_{i+1}(x_{i+1})=S_i(x_{i+1}).",
                "Continuidad de la primera derivada: S_{i+1}'(x_{i+1})=S_i'(x_{i+1}).",
                "Continuidad de la segunda derivada: S_{i+1}''(x_{i+1})=S_i''(x_{i+1}).",
                "Condiciones de contorno: naturales (S''=0 en los extremos) o restringidas (S' fijado en los extremos)."
              ],
              eu: [
                "Interpolatzen du: S(x_i)=f(x_i) nodo bakoitzean.",
                "Zatikakoa da: S(x)=S_i(x) [x_i, x_{i+1}]-n.",
                "Balioaren jarraitutasuna nodo partekatuetan: S_{i+1}(x_{i+1})=S_i(x_{i+1}).",
                "Lehen deribatuaren jarraitutasuna: S_{i+1}'(x_{i+1})=S_i'(x_{i+1}).",
                "Bigarren deribatuaren jarraitutasuna: S_{i+1}''(x_{i+1})=S_i''(x_{i+1}).",
                "Muga-baldintzak: naturalak (S''=0 muturretan) edo mugatuak (S' finkatua muturretan)."
              ],
              en: [
                "Interpolates: S(x_i)=f(x_i) at each node.",
                "Piecewise: S(x)=S_i(x) on [x_i, x_{i+1}].",
                "Value continuity at shared nodes: S_{i+1}(x_{i+1})=S_i(x_{i+1}).",
                "First-derivative continuity: S_{i+1}'(x_{i+1})=S_i'(x_{i+1}).",
                "Second-derivative continuity: S_{i+1}''(x_{i+1})=S_i''(x_{i+1}).",
                "Boundary conditions: natural (S''=0 at the ends) or clamped (S' fixed at the ends)."
              ]
            }
          }
        ]
      },
      {
        heading: {
          es: "El sistema tridiagonal",
          eu: "Sistema tridiagonala",
          en: "The tridiagonal system"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Imponer las condiciones convierte el cálculo de los $4n$ coeficientes en un sistema lineal para los $c_i$. Con $h_i=x_{i+1}-x_i$ y $a_i=f(x_i)$:",
              eu: "Baldintzak inposatzeak $4n$ koefizienteen kalkulua $c_i$-etarako sistema lineal bihurtzen du. $h_i=x_{i+1}-x_i$ eta $a_i=f(x_i)$ izanik:",
              en: "Imposing the conditions turns the computation of the $4n$ coefficients into a linear system for the $c_i$. With $h_i=x_{i+1}-x_i$ and $a_i=f(x_i)$:"
            }
          },
          {
            kind: "formula",
            tex: "h_{i-1}c_{i-1}+2(h_{i-1}+h_i)c_i+h_i c_{i+1}=\\frac{3}{h_i}(a_{i+1}-a_i)-\\frac{3}{h_{i-1}}(a_i-a_{i-1})"
          },
          {
            kind: "paragraph",
            text: {
              es: "Una vez resueltos los $c_i$, los demás coeficientes salen directamente:",
              eu: "$c_i$-ak ebatzi ondoren, gainerako koefizienteak zuzenean ateratzen dira:",
              en: "Once the $c_i$ are solved, the other coefficients follow directly:"
            }
          },
          {
            kind: "formula",
            tex: "b_i=\\frac{1}{h_i}(a_{i+1}-a_i)-\\frac{h_i}{3}(2c_i+c_{i+1}),\\qquad d_i=\\frac{c_{i+1}-c_i}{3h_i}"
          },
          {
            kind: "callout",
            variant: "theorem",
            title: { es: "Spline natural", eu: "Spline naturala", en: "Natural spline" },
            text: {
              es: "Toda función definida en los nodos tiene un único spline cúbico natural, el que cumple $S''(a)=S''(b)=0$. Esas condiciones fijan $c_0=c_n=0$ y dejan un [[sistemas-lineales-conceptos|sistema tridiagonal]], que se resuelve de forma eficiente por el algoritmo de Crout (factorización LU de una matriz tridiagonal).",
              eu: "Nodoetan definitutako funtzio orok spline kubiko natural bakar bat du, $S''(a)=S''(b)=0$ betetzen duena. Baldintza horiek $c_0=c_n=0$ finkatzen dituzte eta [[sistemas-lineales-conceptos|sistema tridiagonal]] bat uzten dute, Crout-en algoritmoaren bidez eraginkortasunez ebazten dena (matrize tridiagonal baten LU faktorizazioa).",
              en: "Every function defined on the nodes has a unique natural cubic spline, the one satisfying $S''(a)=S''(b)=0$. Those conditions fix $c_0=c_n=0$ and leave a [[sistemas-lineales-conceptos|tridiagonal system]], solved efficiently by the Crout algorithm (LU factorization of a tridiagonal matrix)."
            }
          }
        ]
      }
    ]
  }
];

export const interpolacionDerivations: ContentEntry[] = [
  {
    slug: "deduccion-diferencias-divididas-newton",
    category: "Interpolación",
    level: "medio",
    searchIntent: "deducir diferencias divididas Newton coeficientes b0 b1",
    title: {
      es: "Deducción: coeficientes de Newton por diferencias divididas",
      eu: "Frogapena: Newtonen koefizienteak diferentzia zatituen bidez",
      en: "Derivation: Newton coefficients via divided differences"
    },
    description: {
      es: "De dónde salen $b_0$ y $b_1$ al forzar que el polinomio pase por los puntos, y cómo la recursión genera todos los coeficientes de orden superior.",
      eu: "Nondik ateratzen diren $b_0$ eta $b_1$ polinomioa puntuetatik pasatzera behartzean, eta nola errekurtsioak ordena altuagoko koefiziente guztiak sortzen dituen.",
      en: "Where $b_0$ and $b_1$ come from when forcing the polynomial through the points, and how the recursion generates every higher-order coefficient."
    },
    keywords: ["deducción", "Newton", "diferencias divididas", "coeficientes"],
    prerequisites: ["interpolacion-newton"],
    related: ["interpolacion-newton"],
    sections: [
      {
        heading: {
          es: "Forzar que pase por dos puntos",
          eu: "Bi puntutatik pasatzera behartu",
          en: "Forcing it through two points"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Partimos de la forma lineal $p_1(x)=b_0+b_1(x-x_0)$ e imponemos que pase por $(x_0,f(x_0))$ y $(x_1,f(x_1))$:",
                  eu: "$p_1(x)=b_0+b_1(x-x_0)$ forma linealetik abiatzen gara eta $(x_0,f(x_0))$ eta $(x_1,f(x_1))$-tik pasatzera behartzen dugu:",
                  en: "Start from the linear form $p_1(x)=b_0+b_1(x-x_0)$ and require it to pass through $(x_0,f(x_0))$ and $(x_1,f(x_1))$:"
                },
                formula: "\\begin{cases} p_1(x_0)=f(x_0)=b_0\\\\ p_1(x_1)=f(x_1)=b_0+b_1(x_1-x_0) \\end{cases}"
              },
              {
                text: {
                  es: "De la primera ecuación $b_0=f(x_0)$. Sustituyendo en la segunda y despejando $b_1$:",
                  eu: "Lehen ekuaziotik $b_0=f(x_0)$. Bigarrenean ordezkatuz eta $b_1$ askatuz:",
                  en: "From the first equation $b_0=f(x_0)$. Substituting into the second and solving for $b_1$:"
                },
                formula: "b_1=\\frac{f(x_1)-f(x_0)}{x_1-x_0}=f[x_1,x_0]"
              }
            ]
          },
          {
            kind: "paragraph",
            text: {
              es: "A $b_1$ se le llama diferencia dividida de primer orden. Repetir el mismo argumento con tres puntos da la diferencia de segundo orden, y así se llega a la recursión general.",
              eu: "$b_1$-i lehen ordenako diferentzia zatitua deitzen zaio. Argudio bera hiru punturekin errepikatzeak bigarren ordenako diferentzia ematen du, eta horrela errekurtsio orokorrera iristen da.",
              en: "$b_1$ is called the first-order divided difference. Repeating the same argument with three points gives the second-order difference, and so we reach the general recursion."
            }
          },
          {
            kind: "formula",
            tex: "f[x_n,\\dots,x_0]=\\frac{f[x_n,\\dots,x_1]-f[x_{n-1},\\dots,x_0]}{x_n-x_0}"
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-lagrange-base",
    category: "Interpolación",
    level: "medio",
    searchIntent: "deducir funciones base Lagrange propiedad cardinal",
    title: {
      es: "Deducción: funciones base de Lagrange",
      eu: "Frogapena: Lagrangeren oinarri-funtzioak",
      en: "Derivation: Lagrange basis functions"
    },
    description: {
      es: "Cómo la exigencia de valer 1 en un nodo y 0 en los demás obliga a la forma de producto de las funciones $L_i$.",
      eu: "Nola nodo batean 1 eta gainerakoetan 0 balio izateko eskakizunak $L_i$ funtzioen biderkadura-forma behartzen duen.",
      en: "How the requirement to equal 1 at one node and 0 at the others forces the product form of the $L_i$ functions."
    },
    keywords: ["deducción", "Lagrange", "funciones base", "propiedad cardinal"],
    prerequisites: ["interpolacion-lagrange"],
    related: ["interpolacion-lagrange"],
    sections: [
      {
        heading: {
          es: "De la propiedad cardinal a la fórmula",
          eu: "Propietate kardinaletik formulara",
          en: "From the cardinal property to the formula"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Queremos $L_i(x)$ que valga 0 en todos los nodos salvo $x_i$. Para anularse en $x_j$ ($j\\ne i$) basta con incluir el factor $(x-x_j)$ por cada uno:",
                  eu: "$L_i(x)$ nahi dugu $x_i$ izan ezik nodo guztietan 0 balio duena. $x_j$-n ($j\\ne i$) anulatzeko, $(x-x_j)$ faktorea sartzea nahikoa da bakoitzeko:",
                  en: "We want $L_i(x)$ to vanish at every node except $x_i$. To vanish at $x_j$ ($j\\ne i$) it suffices to include the factor $(x-x_j)$ for each one:"
                },
                formula: "\\text{numerador}=\\prod_{\\substack{j=0\\\\ j\\ne i}}^{n}(x-x_j)"
              },
              {
                text: {
                  es: "Ese producto vale algo (no 1) en $x_i$. Para normalizarlo a 1 dividimos por su valor en $x_i$, que es el mismo producto evaluado ahí:",
                  eu: "Biderkadura horrek zerbait balio du (ez 1) $x_i$-n. 1era normalizatzeko, $x_i$-ko bere balioaz zatitzen dugu, hau da, han ebaluatutako biderkadura bera:",
                  en: "That product has some value (not 1) at $x_i$. To normalize it to 1 we divide by its value at $x_i$, i.e. the same product evaluated there:"
                },
                formula: "L_i(x)=\\prod_{\\substack{j=0\\\\ j\\ne i}}^{n}\\frac{x-x_j}{x_i-x_j}"
              },
              {
                text: {
                  es: "Así $L_i(x_i)=1$ y $L_i(x_j)=0$. La combinación $\\sum_i L_i(x)\\,f(x_i)$ reproduce cada dato, luego interpola.",
                  eu: "Horrela $L_i(x_i)=1$ eta $L_i(x_j)=0$. $\\sum_i L_i(x)\\,f(x_i)$ konbinazioak datu bakoitza berregiten du, beraz interpolatzen du.",
                  en: "Thus $L_i(x_i)=1$ and $L_i(x_j)=0$. The combination $\\sum_i L_i(x)\\,f(x_i)$ reproduces each datum, hence interpolates."
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

export const interpolacionExercises: ContentEntry[] = [
  {
    slug: "ejercicio-hermite-bessel",
    category: "Interpolación",
    level: "avanzado",
    searchIntent: "ejercicio Hermite Bessel J0 tres nodos H5 resuelto",
    title: {
      es: "Ejercicio: Hermite con la función de Bessel",
      eu: "Ariketa: Hermite Bessel funtzioarekin",
      en: "Exercise: Hermite with the Bessel function"
    },
    description: {
      es: "Construcción completa del polinomio de Hermite de grado 5 con tres nodos para aproximar $J_0(0.75)$, paso a paso.",
      eu: "5. graduko Hermite polinomioaren eraikuntza osoa hiru nodorekin $J_0(0.75)$ hurbiltzeko, urratsez urrats.",
      en: "Full construction of the degree-5 Hermite polynomial with three nodes to approximate $J_0(0.75)$, step by step."
    },
    keywords: ["Hermite", "Bessel", "ejercicio", "H5"],
    prerequisites: ["interpolacion-hermite"],
    related: ["interpolacion-hermite"],
    sections: [
      {
        heading: {
          es: "Enunciado y datos",
          eu: "Enuntziatua eta datuak",
          en: "Statement and data"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Las funciones de Bessel de primera especie cumplen $J_0'(x)=-J_1(x)$, así que la tabla nos da a la vez valor y derivada de $J_0$ en los nodos $0$, $0.5$ y $1$. Con $n=2$ el polinomio de Hermite tiene grado 5.",
              eu: "Lehen espeziearen Bessel funtzioek $J_0'(x)=-J_1(x)$ betetzen dute, beraz taulak $J_0$-ren balioa eta deribatua ematen dizkigu $0$, $0.5$ eta $1$ nodoetan. $n=2$ izanik, Hermite polinomioak 5 gradua du.",
              en: "The Bessel functions of the first kind satisfy $J_0'(x)=-J_1(x)$, so the table gives both value and derivative of $J_0$ at the nodes $0$, $0.5$ and $1$. With $n=2$ the Hermite polynomial has degree 5."
            }
          },
          {
            kind: "table",
            head: {
              es: ["$x$", "$J_0$ (valor)", "$J_0'=-J_1$ (derivada)"],
              eu: ["$x$", "$J_0$ (balioa)", "$J_0'=-J_1$ (deribatua)"],
              en: ["$x$", "$J_0$ (value)", "$J_0'=-J_1$ (derivative)"]
            },
            rows: [
              ["0", "1.0000", "0"],
              ["0.5", "0.9385", "−0.2423"],
              ["1", "0.7652", "−0.4401"]
            ]
          }
        ]
      },
      {
        heading: {
          es: "Construcción del polinomio",
          eu: "Polinomioaren eraikuntza",
          en: "Building the polynomial"
        },
        blocks: [
          {
            kind: "example",
            statement: {
              es: "Seguimos los cinco pasos: $L_i$, $L_i'$, $H_i$, $\\hat H_i$ y la suma final.",
              eu: "Bost urratsak jarraitzen ditugu: $L_i$, $L_i'$, $H_i$, $\\hat H_i$ eta azken batura.",
              en: "Follow the five steps: $L_i$, $L_i'$, $H_i$, $\\hat H_i$ and the final sum."
            },
            steps: [
              {
                text: { es: "Funciones de Lagrange y sus derivadas:", eu: "Lagrangeren funtzioak eta haien deribatuak:", en: "Lagrange functions and their derivatives:" },
                formula: "\\begin{aligned} L_0&=2x^2-3x+1, & L_0'&=4x-3\\\\ L_1&=-4x^2+4x, & L_1'&=-8x+4\\\\ L_2&=2x^2-x, & L_2'&=4x-1 \\end{aligned}"
              },
              {
                text: { es: "Bloques $H_i$ y $\\hat H_i$ (grado 5):", eu: "$H_i$ eta $\\hat H_i$ blokeak (5. gradua):", en: "Blocks $H_i$ and $\\hat H_i$ (degree 5):" },
                formula: "\\begin{aligned} H_0&=24x^5-68x^4+66x^3-23x^2+1\\\\ H_1&=16x^4-32x^3+16x^2\\\\ H_2&=-24x^5+52x^4-34x^3+7x^2 \\end{aligned}"
              },
              {
                text: { es: "Y los $\\hat H_i$:", eu: "Eta $\\hat H_i$-ak:", en: "And the $\\hat H_i$:" },
                formula: "\\begin{aligned} \\hat H_0&=4x^5-12x^4+13x^3-6x^2+x\\\\ \\hat H_1&=16x^5-40x^4+32x^3-8x^2\\\\ \\hat H_2&=4x^5-8x^4+5x^3-x^2 \\end{aligned}"
              },
              {
                text: { es: "Sumando f(x_i)H_i + f'(x_i)Ĥ_i se obtiene:", eu: "f(x_i)H_i + f'(x_i)Ĥ_i batuz lortzen da:", en: "Summing f(x_i)H_i + f'(x_i)Ĥ_i gives:" },
                formula: "H_5(x)=-0.002x^5+0.0192x^4-0.0029x^3-0.2491x^2+1"
              }
            ],
            result: {
              text: { es: "Evaluando en 0.75 aproximamos J_0(0.75):", eu: "0.75-ean ebaluatuz J_0(0.75) hurbiltzen dugu:", en: "Evaluating at 0.75 approximates J_0(0.75):" },
              formula: "J_0(0.75)\\approx H_5(0.75)=0.86426"
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-newton-censo",
    category: "Interpolación",
    level: "medio",
    searchIntent: "ejercicio Newton diferencias divididas censo población resuelto",
    title: {
      es: "Ejercicio: Newton con datos de población",
      eu: "Ariketa: Newton biztanleria-datuekin",
      en: "Exercise: Newton with population data"
    },
    description: {
      es: "Tabla de diferencias divididas completa para el censo 1971–2011 y estimación de la población en 2005 con el polinomio de Newton de grado 4.",
      eu: "1971–2011 erroldarako diferentzia zatituen taula osoa eta 2005eko biztanleriaren estimazioa 4. graduko Newton polinomioarekin.",
      en: "Full divided-difference table for the 1971–2011 census and estimate of the 2005 population with the degree-4 Newton polynomial."
    },
    keywords: ["Newton", "diferencias divididas", "censo", "ejercicio"],
    prerequisites: ["interpolacion-newton"],
    related: ["interpolacion-newton", "ejercicio-lagrange-censo"],
    sections: [
      {
        heading: { es: "Datos y tabla", eu: "Datuak eta taula", en: "Data and table" },
        blocks: [
          {
            kind: "table",
            head: {
              es: ["Año", "1971", "1981", "1991", "2001", "2011"],
              eu: ["Urtea", "1971", "1981", "1991", "2001", "2011"],
              en: ["Year", "1971", "1981", "1991", "2001", "2011"]
            },
            rows: [
              ["Población [M]", "33.956", "37.743", "39.434", "40.847", "46.816"]
            ]
          },
          {
            kind: "example",
            statement: {
              es: "Estima la población en 2005 con Newton de grado 4.",
              eu: "Estimatu 2005eko biztanleria 4. graduko Newtonekin.",
              en: "Estimate the 2005 population with degree-4 Newton."
            },
            steps: [
              {
                text: { es: "Diferencias divididas (diagonal superior):", eu: "Diferentzia zatituak (goiko diagonala):", en: "Divided differences (upper diagonal):" },
                formula: "b_0=33.956,\\ b_1=0.3787,\\ b_2=-0.01048,\\ b_3=0.000303,\\ b_4=0.0000127"
              },
              {
                text: { es: "Polinomio de Newton:", eu: "Newton polinomioa:", en: "Newton polynomial:" },
                formula: "\\begin{aligned} p_4(x)=\\ &33.956+0.3787(x-1971)-0.01048(x-1971)(x-1981)\\\\ &+0.000303(x-1971)(x-1981)(x-1991)\\\\ &+0.0000127(x-1971)(x-1981)(x-1991)(x-2001) \\end{aligned}"
              }
            ],
            result: {
              text: { es: "Estimación en 2005:", eu: "2005eko estimazioa:", en: "Estimate at 2005:" },
              formula: "p_4(2005)\\approx 42.315\\ \\text{millones}"
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-lagrange-censo",
    category: "Interpolación",
    level: "medio",
    searchIntent: "ejercicio Lagrange censo población funciones base resuelto",
    title: {
      es: "Ejercicio: Lagrange con datos de población",
      eu: "Ariketa: Lagrange biztanleria-datuekin",
      en: "Exercise: Lagrange with population data"
    },
    description: {
      es: "Construcción de las funciones base de Lagrange para el censo 1971–2011 y estimación de la población en 2005, comparada con Newton.",
      eu: "1971–2011 erroldarako Lagrangeren oinarri-funtzioen eraikuntza eta 2005eko biztanleriaren estimazioa, Newtonekin alderatuta.",
      en: "Building the Lagrange basis functions for the 1971–2011 census and estimating the 2005 population, compared with Newton."
    },
    keywords: ["Lagrange", "censo", "funciones base", "ejercicio"],
    prerequisites: ["interpolacion-lagrange"],
    related: ["interpolacion-lagrange", "ejercicio-newton-censo"],
    sections: [
      {
        heading: { es: "Funciones base y resultado", eu: "Oinarri-funtzioak eta emaitza", en: "Basis functions and result" },
        blocks: [
          {
            kind: "example",
            statement: {
              es: "Con los datos del censo, forma L_0 y L_4 y estima 2005.",
              eu: "Erroldako datuekin, osatu L_0 eta L_4 eta estimatu 2005.",
              en: "With the census data, form L_0 and L_4 and estimate 2005."
            },
            steps: [
              {
                text: { es: "Funciones extremas (denominadores 240000):", eu: "Muturreko funtzioak (240000 izendatzaileak):", en: "End functions (denominators 240000):" },
                formula: "\\begin{aligned} L_0(x)&=\\frac{(x-1981)(x-1991)(x-2001)(x-2011)}{240000}\\\\ L_4(x)&=\\frac{(x-1971)(x-1981)(x-1991)(x-2001)}{240000} \\end{aligned}"
              },
              {
                text: { es: "Polinomio como combinación de los datos:", eu: "Polinomioa datuen konbinazio gisa:", en: "Polynomial as a combination of the data:" },
                formula: "p_4(x)=\\sum_{i=0}^{4}L_i(x)\\,f(x_i)"
              }
            ],
            result: {
              text: { es: "Coincide con Newton salvo redondeo:", eu: "Newtonekin bat dator, biribiltzea izan ezik:", en: "Matches Newton up to rounding:" },
              formula: "p_4(2005)\\approx 42.316\\ \\text{millones}"
            }
          }
        ]
      }
    ]
  }
];
