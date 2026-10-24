import type { ContentEntry } from "../content";
import { cubicPoints, exactPoints, lastNodes, refinementRows } from "../numerics/finite-difference";

export const finiteDifferenceArticles: ContentEntry[] = [
  {
    "slug": "frontera-diferencias-finitas",
    "category": "Problemas de frontera",
    "level": "medio",
    "searchIntent": "Diferencias finitas para problemas de frontera finite differences boundary value problems Python Robin Newton Crout",
    "title": {
      "es": "Diferencias finitas para problemas de frontera",
      "eu": "Diferentzia finituak muga-problemetarako",
      "en": "Finite differences for boundary value problems"
    },
    "description": {
      "es": "Discretiza una EDO de segundo orden, elimina nodos ficticios para condiciones Robin y construye el sistema tridiagonal. Deducción, error y código Python.",
      "eu": "Diskretizatu bigarren ordenako EDA bat, ezabatu Robin baldintzen fikziozko nodoak eta eraiki sistema tridiagonala. Frogapena, errorea eta Python kodea.",
      "en": "Discretize a second-order ODE, eliminate ghost nodes for Robin conditions and construct the tridiagonal system. Derivation, error and Python code."
    },
    "keywords": [
      "diferencias finitas",
      "finite differences",
      "boundary value problems",
      "Robin",
      "Newton",
      "Crout",
      "Python"
    ],
    "prerequisites": [
      "frontera-introduccion",
      "diferenciacion-derivadas-superiores"
    ],
    "related": [
      "frontera-diferencias-finitas-newton",
      "frontera-crout",
      "frontera-disparo-lineal"
    ],
    "code": [
      {
        "href": "https://github.com/jramosg/boundary-value-methods-python",
        "label": {
          "es": "Código Python y cuadernos",
          "eu": "Python kodea eta koadernoak",
          "en": "Python code and notebooks"
        }
      },
      {
        "href": "https://github.com/jramosg/boundary-value-methods-python/blob/main/notebooks/04_finite_differences.ipynb",
        "label": {
          "es": "Cuaderno de diferencias finitas (inglés)",
          "eu": "Diferentzia finituen koadernoa (ingelesez)",
          "en": "Finite-difference notebook"
        }
      }
    ],
    "sections": [
      {
        "heading": {
          "es": "Del intervalo a la malla",
          "eu": "Tartetik sarera",
          "en": "From the interval to the mesh"
        },
        "blocks": [
          {
            "kind": "paragraph",
            "text": {
              "es": "El [[frontera-disparo-lineal|disparo]] ajusta datos iniciales e integra un PVI. Con diferencias finitas buscamos los valores de la función en todos los nodos mediante un sistema algebraico. Esto permite tratar condiciones en ambos extremos sin integrar desde uno de ellos.",
              "eu": "[[frontera-disparo-lineal|Jaurtiketak]] hasierako datuak doitzen ditu eta HBPa integratzen du. Diferentzia finituekin funtzioaren balioak nodo guztietan bilatzen ditugu sistema aljebraiko baten bidez. Bi muturretako baldintzak erabiltzen ditugu mutur batetik integratu gabe.",
              "en": "[[frontera-disparo-lineal|Shooting]] adjusts initial data and integrates an IVP. Finite differences find function values at all nodes through an algebraic system, incorporating both boundary conditions without integrating from one end."
            }
          },
          {
            "kind": "formula",
            "tex": "x_i=a+ih,\\quad h=\\frac{b-a}{n},\\quad i=0,\\ldots,n,\\qquad y_i\\approx y(x_i)"
          },
          {
            "kind": "paragraph",
            "text": {
              "es": "Hay $n$ subintervalos y $n+1$ nodos. Con condiciones Robin los valores de los extremos son incógnitas. La implementación conserva los $n+1$ valores; para Dirichlet fija el extremo con una fila de restricción.",
              "eu": "$n$ azpitarte eta $n+1$ nodo daude. Robin baldintzekin muturretako balioak ezezagunak dira. Inplementazioak $n+1$ balioak gordetzen ditu; Dirichlet kasuan murriztapen-errenkada batek muturreko balioa finkatzen du.",
              "en": "There are $n$ subintervals and $n+1$ nodes. Robin endpoint values remain unknown. The implementation retains all $n+1$ values and constrains Dirichlet endpoints with their own rows."
            }
          }
        ]
      },
      {
        "heading": {
          "es": "Ecuaciones interiores del caso lineal",
          "eu": "Kasu linealaren barne-ekuazioak",
          "en": "Interior equations for the linear case"
        },
        "blocks": [
          {
            "kind": "formula",
            "tex": "y''=p(x)y'+q(x)y+r(x)"
          },
          {
            "kind": "formula",
            "tex": "(-1-\\tfrac h2p_i)y_{i-1}+(2+h^2q_i)y_i+(-1+\\tfrac h2p_i)y_{i+1}=-h^2r_i"
          },
          {
            "kind": "paragraph",
            "text": {
              "es": "En cada fila aparecen tres nodos vecinos. Resolvemos el sistema con [[frontera-crout|Crout]] o una factorización LU general. Los signos corresponden a llevar $-y^{\\prime\\prime}+p y^{\\prime}+q y+r$ al primer miembro y multiplicar por $h^2$.",
              "eu": "Errenkada bakoitzean hiru nodo auzokide agertzen dira. Sistema [[frontera-crout|Crout]] edo LU faktorizazio orokorrarekin ebazten dugu. Zeinuak $-y^{\\prime\\prime}+p y^{\\prime}+q y+r$ lehen atalera eraman eta $h^2$-z biderkatzetik datoz.",
              "en": "Each row involves three neighboring nodes. Solve with [[frontera-crout|Crout]] or general LU. The signs come from moving $-y^{\\prime\\prime}+p y^{\\prime}+q y+r$ to the left and multiplying by $h^2$."
            }
          }
        ]
      },
      {
        "heading": {
          "es": "Deducción y condiciones Robin",
          "eu": "Frogapena eta Robin baldintzak",
          "en": "Derivation and Robin conditions"
        },
        "blocks": [
          {
            "kind": "derivation",
            "slug": "deduccion-frontera-diferencias-finitas"
          }
        ]
      },
      {
        "heading": {
          "es": "Error y estabilidad",
          "eu": "Errorea eta egonkortasuna",
          "en": "Error and stability"
        },
        "blocks": [
          {
            "kind": "paragraph",
            "text": {
              "es": "Las fórmulas centrales de derivación tienen error $O(h^2)$ para funciones suaves. El orden global requiere estabilidad del problema discretizado. Tras eliminar un nodo ficticio, el residuo local de la EDO en el extremo puede ser $O(h)$; no basta con mirar una fila para deducir el error global. Comprueba la convergencia con soluciones conocidas y mallas refinadas.",
              "eu": "Deribazio-formula zentralek $O(h^2)$ errorea dute funtzio leunetarako. Ordena globalak diskretizatutako problemaren egonkortasuna behar du. Fikziozko nodoa ezabatu ondoren, muturreko EDAren hondar lokala $O(h)$ izan daiteke; errenkada bakarrak ez du errore globala zehazten. Egiaztatu konbergentzia soluzio ezagunekin eta sare finagoekin.",
              "en": "Central derivative formulas have $O(h^2)$ error for smooth functions. Global order also requires stability of the discrete problem. After ghost elimination the endpoint ODE residual can be $O(h)$; one row alone does not determine global error. Check convergence against known solutions on refined meshes."
            }
          },
          {
            "kind": "formula",
            "tex": "E_h=\\max_i|y_i-y(x_i)|,\\qquad p_{\\rm obs}=\\log_2(E_h/E_{h/2})"
          },
          {
            "kind": "paragraph",
            "text": {
              "es": "Las condiciones Neumann puras pueden dejar una constante sin determinar o ser incompatibles. Una matriz singular no se arregla cambiando de solver. Para EDO no lineales continúa con [[frontera-diferencias-finitas-newton|Newton y la jacobiana]].",
              "eu": "Neumann baldintza hutsek konstante bat zehaztu gabe utz dezakete edo bateraezinak izan daitezke. Solverra aldatzeak ez du matrize singularra konpontzen. EDA ez-linealetarako jarraitu [[frontera-diferencias-finitas-newton|Newton eta jakobiarrarekin]].",
              "en": "Pure Neumann data may leave an undetermined constant or be incompatible. Changing solvers does not fix a singular problem. For nonlinear ODEs continue with [[frontera-diferencias-finitas-newton|Newton and the Jacobian]]."
            }
          }
        ]
      },
      {
        "heading": {
          "es": "Ejemplo lineal con solución conocida",
          "eu": "Soluzio ezaguneko adibide lineala",
          "en": "Linear example with a known solution"
        },
        "blocks": [
          {
            "kind": "example",
            "statement": {
              "es": "Resuelve $y^{\\prime\\prime}=y$ en $[0,1]$, con $y^{\\prime}(0)+y(0)=2$ y $-y^{\\prime}(1)+2y(1)=e$.",
              "eu": "Ebatzi $y^{\\prime\\prime}=y$ ekuazioa $[0,1]$ tartean, $y^{\\prime}(0)+y(0)=2$ eta $-y^{\\prime}(1)+2y(1)=e$ baldintzekin.",
              "en": "Solve $y^{\\prime\\prime}=y$ on $[0,1]$ with $y^{\\prime}(0)+y(0)=2$ and $-y^{\\prime}(1)+2y(1)=e$."
            },
            "steps": [
              {
                "text": {
                  "es": "Identifica $p=0$, $q=1$, $r=0$. La fila interior tiene coeficientes $-1,2+h^2,-1$.",
                  "eu": "Identifikatu $p=0$, $q=1$, $r=0$. Barne-errenkadaren koefizienteak $-1,2+h^2,-1$ dira.",
                  "en": "Identify $p=0$, $q=1$, $r=0$. Interior coefficients are $-1,2+h^2,-1$."
                }
              },
              {
                "text": {
                  "es": "En la izquierda, el nodo ficticio es $y_{-1}=y_1+2hy_0-4h$. En la derecha, $y_{n+1}=y_{n-1}+4hy_n-2he$.",
                  "eu": "Ezkerrean fikziozko nodoa $y_{-1}=y_1+2hy_0-4h$ da. Eskuinean $y_{n+1}=y_{n-1}+4hy_n-2he$.",
                  "en": "At the left, the ghost is $y_{-1}=y_1+2hy_0-4h$. At the right, $y_{n+1}=y_{n-1}+4hy_n-2he$."
                }
              },
              {
                "text": {
                  "es": "Sustituye en las dos filas de extremo y resuelve el sistema. Comprueba contra $y=e^x$, que satisface la EDO y ambas condiciones.",
                  "eu": "Ordezkatu muturretako bi errenkadetan eta ebatzi sistema. Alderatu $y=e^x$ soluzioarekin: EDA eta bi baldintzak betetzen ditu.",
                  "en": "Substitute into both endpoint rows and solve. Check against $y=e^x$, which satisfies the ODE and both conditions."
                }
              }
            ],
            "result": {
              "text": {
                "es": "El cuaderno Python repite el cálculo al refinar la malla; el cociente de errores debe aproximarse a cuatro.",
                "eu": "Python koadernoak kalkulua sare finagoekin errepikatzen du; erroreen zatidura laura hurbildu behar da.",
                "en": "The Python notebook repeats the solve on refined meshes; the error ratio should approach four."
              }
            }
          }
        ]
      }
    ]
  },
  {
    "slug": "frontera-crout",
    "category": "Problemas de frontera",
    "level": "medio",
    "searchIntent": "Crout para sistemas tridiagonales finite differences boundary value problems Python Robin Newton Crout",
    "title": {
      "es": "Crout para sistemas tridiagonales",
      "eu": "Crout sistema tridiagonaletan",
      "en": "Crout for tridiagonal systems"
    },
    "description": {
      "es": "Factorización LU tridiagonal, sustituciones, coste lineal y límites del algoritmo sin pivoteo. Aplicación a diferencias finitas.",
      "eu": "LU faktorizazio tridiagonala, ordezkapenak, kostu lineala eta pibotaziorik gabeko algoritmoaren mugak. Diferentzia finituen aplikazioa.",
      "en": "Tridiagonal LU factorization, substitutions, linear cost and the limits of an unpivoted algorithm. Applied to finite differences."
    },
    "keywords": [
      "diferencias finitas",
      "finite differences",
      "boundary value problems",
      "Robin",
      "Newton",
      "Crout",
      "Python"
    ],
    "prerequisites": [
      "frontera-introduccion",
      "diferenciacion-derivadas-superiores"
    ],
    "related": [
      "frontera-diferencias-finitas",
      "frontera-diferencias-finitas-newton",
      "sistemas-lineales-conceptos"
    ],
    "code": [
      {
        "href": "https://github.com/jramosg/boundary-value-methods-python",
        "label": {
          "es": "Código Python y cuadernos",
          "eu": "Python kodea eta koadernoak",
          "en": "Python code and notebooks"
        }
      },
      {
        "href": "https://github.com/jramosg/boundary-value-methods-python/blob/main/notebooks/04_finite_differences.ipynb",
        "label": {
          "es": "Cuaderno de diferencias finitas (inglés)",
          "eu": "Diferentzia finituen koadernoa (ingelesez)",
          "en": "Finite-difference notebook"
        }
      }
    ],
    "sections": [
      {
        "heading": {
          "es": "Tres diagonales",
          "eu": "Hiru diagonal",
          "en": "Three diagonals"
        },
        "blocks": [
          {
            "kind": "paragraph",
            "text": {
              "es": "Guardamos la diagonal principal $a_i$, la superior $b_i$ y la inferior $c_i$. La estructura aparece en [[frontera-diferencias-finitas|diferencias finitas lineales]] y en cada paso de [[frontera-diferencias-finitas-newton|Newton no lineal]].",
              "eu": "Diagonal nagusia $a_i$, goikoa $b_i$ eta behekoa $c_i$ gordetzen ditugu. Egitura [[frontera-diferencias-finitas|diferentzia finitu linealetan]] eta [[frontera-diferencias-finitas-newton|Newton ez-linealaren]] urrats bakoitzean agertzen da.",
              "en": "Store the main diagonal $a_i$, upper diagonal $b_i$ and lower diagonal $c_i$. This structure appears in [[frontera-diferencias-finitas|linear finite differences]] and every [[frontera-diferencias-finitas-newton|nonlinear Newton]] step."
            }
          },
          {
            "kind": "formula",
            "tex": "A=LU,\\qquad L_{ii}=l_i,\\quad L_{i+1,i}=c_i,\\quad U_{ii}=1,\\quad U_{i,i+1}=u_i"
          }
        ]
      },
      {
        "heading": {
          "es": "Deducción y sustituciones",
          "eu": "Frogapena eta ordezkapenak",
          "en": "Derivation and substitutions"
        },
        "blocks": [
          {
            "kind": "derivation",
            "slug": "deduccion-frontera-crout"
          }
        ]
      },
      {
        "heading": {
          "es": "Coste y pivotes",
          "eu": "Kostua eta piboteak",
          "en": "Cost and pivots"
        },
        "blocks": [
          {
            "kind": "paragraph",
            "text": {
              "es": "Cada bucle recorre las diagonales una vez: el coste y la memoria son $O(m)$ para $m$ incógnitas. Una LU densa requiere memoria $O(m^2)$ y trabajo $O(m^3)$ si no explota la banda. Para tamaños pequeños una rutina compilada puede superar a un bucle Python; el coste asintótico no sustituye una medición.",
              "eu": "Begizta bakoitzak diagonalak behin zeharkatzen ditu: kostua eta memoria $O(m)$ dira $m$ ezezagunetarako. LU dentsoak $O(m^2)$ memoria eta $O(m^3)$ lana behar ditu banda aprobetxatzen ez badu. Tamaina txikietan errutina konpilatu batek Python begizta gaindi dezake; kostu asintotikoak ez du neurketa ordezkatzen.",
              "en": "Each loop traverses the diagonals once: work and storage are $O(m)$ for $m$ unknowns. Dense LU needs $O(m^2)$ storage and $O(m^3)$ work when it does not exploit the band. A compiled routine may outperform a Python loop at small sizes; asymptotic cost does not replace measurement."
            }
          },
          {
            "kind": "callout",
            "variant": "warning",
            "title": {
              "es": "Sin pivoteo",
              "eu": "Pibotaziorik gabe",
              "en": "Without pivoting"
            },
            "text": {
              "es": "Una matriz invertible puede tener un pivote inicial nulo. Crout sin intercambios de filas falla en ese caso; usa un solver con pivoteo o una factorización de banda adecuada.",
              "eu": "Matrize alderanzgarri batek hasierako pibote nulua izan dezake. Errenkadak trukatzen ez dituen Croutek huts egiten du orduan; erabili pibotazioko solverra edo banda-faktorizazio egokia.",
              "en": "An invertible matrix can have a zero initial pivot. Crout without row exchanges fails in that case; use a pivoted solver or an appropriate band factorization."
            },
            "formula": "A=\\begin{pmatrix}0&1\\\\1&1\\end{pmatrix},\\qquad\\det A=-1,\\qquad l_0=0"
          },
          {
            "kind": "paragraph",
            "text": {
              "es": "Comprueba el residuo $Ax-d$ y la [[sistemas-lineales-conceptos|condición del sistema]]. Un residuo pequeño no asegura un error pequeño si la matriz está mal condicionada.",
              "eu": "Egiaztatu $Ax-d$ hondarra eta [[sistemas-lineales-conceptos|sistemaren baldintzapena]]. Hondar txikiak ez du errore txikia ziurtatzen matrizea gaizki baldintzatuta badago.",
              "en": "Check $Ax-d$ and the [[sistemas-lineales-conceptos|conditioning of the system]]. A small residual need not imply a small error for an ill-conditioned matrix."
            }
          }
        ]
      }
    ]
  },
  {
    "slug": "frontera-diferencias-finitas-newton",
    "category": "Problemas de frontera",
    "level": "avanzado",
    "searchIntent": "Diferencias finitas no lineales con Newton y jacobiana finite differences boundary value problems Python Robin Newton Crout",
    "title": {
      "es": "Diferencias finitas no lineales con Newton y jacobiana",
      "eu": "Diferentzia finitu ez-linealak Newtonekin eta jakobiarrarekin",
      "en": "Nonlinear finite differences with Newton and a Jacobian"
    },
    "description": {
      "es": "Construye el residuo no lineal, deriva las filas Robin y resuelve con Newton y Crout. Ejemplo de 81 nodos y convergencia de orden dos.",
      "eu": "Eraiki hondar ez-lineala, deribatu Robin errenkadak eta ebatzi Newton eta Crout erabiliz. 81 nodoko adibidea eta bigarren ordenako konbergentzia.",
      "en": "Build the nonlinear residual, differentiate Robin rows and solve with Newton and Crout. An 81-node example and second-order convergence."
    },
    "keywords": [
      "diferencias finitas",
      "finite differences",
      "boundary value problems",
      "Robin",
      "Newton",
      "Crout",
      "Python"
    ],
    "prerequisites": [
      "frontera-introduccion",
      "diferenciacion-derivadas-superiores"
    ],
    "related": [
      "frontera-diferencias-finitas",
      "frontera-crout",
      "frontera-disparo-newton"
    ],
    "code": [
      {
        "href": "https://github.com/jramosg/boundary-value-methods-python",
        "label": {
          "es": "Código Python y cuadernos",
          "eu": "Python kodea eta koadernoak",
          "en": "Python code and notebooks"
        }
      },
      {
        "href": "https://github.com/jramosg/boundary-value-methods-python/blob/main/notebooks/04_finite_differences.ipynb",
        "label": {
          "es": "Cuaderno de diferencias finitas (inglés)",
          "eu": "Diferentzia finituen koadernoa (ingelesez)",
          "en": "Finite-difference notebook"
        }
      }
    ],
    "sections": [
      {
        "heading": {
          "es": "Un vector de incógnitas",
          "eu": "Ezezagunen bektorea",
          "en": "A vector of unknowns"
        },
        "blocks": [
          {
            "kind": "paragraph",
            "text": {
              "es": "Buscamos una raíz de $F(y)=0$. A diferencia del [[frontera-disparo-newton|Newton de disparo]], que ajusta un parámetro inicial, aquí corregimos todos los valores de la malla. Evaluamos $f$, $f_y$ y $f_{y^{\\prime}}$ en cada iteración.",
              "eu": "$F(y)=0$ ekuazioaren erro bat bilatzen dugu. Hasierako parametro bat doitzen duen [[frontera-disparo-newton|jaurtiketako Newtonek]] ez bezala, sareko balio guztiak zuzentzen ditugu. Iterazio bakoitzean $f$, $f_y$ eta $f_{y^{\\prime}}$ ebaluatzen ditugu.",
              "en": "We seek a root of $F(y)=0$. Unlike [[frontera-disparo-newton|shooting Newton]], which adjusts an initial parameter, here we correct every mesh value. Evaluate $f$, $f_y$ and $f_{y^{\\prime}}$ at each iteration."
            }
          },
          {
            "kind": "formula",
            "tex": "F_i=2y_i-y_{i-1}-y_{i+1}+h^2 f\\left(x_i,y_i,\\frac{y_{i+1}-y_{i-1}}{2h}\\right)"
          },
          {
            "kind": "formula",
            "tex": "J(y^{(k)})\\Delta y^{(k)}=-F(y^{(k)}),\\qquad y^{(k+1)}=y^{(k)}+\\Delta y^{(k)}"
          },
          {
            "kind": "paragraph",
            "text": {
              "es": "Usamos [[sistemas-no-lineales-newton|Newton para sistemas]] sin formar una inversa. La jacobiana es tridiagonal y [[frontera-crout|Crout]] resuelve cada corrección.",
              "eu": "[[sistemas-no-lineales-newton|Sistemetarako Newton]] erabiltzen dugu alderantzizko matrizerik osatu gabe. Jakobiarra tridiagonala da eta [[frontera-crout|Croutek]] zuzenketa bakoitza ebazten du.",
              "en": "Use [[sistemas-no-lineales-newton|Newton for systems]] without forming an inverse. The Jacobian is tridiagonal and [[frontera-crout|Crout]] solves each correction."
            }
          }
        ]
      },
      {
        "heading": {
          "es": "Derivar antes de programar",
          "eu": "Deribatu programatu aurretik",
          "en": "Differentiate before coding"
        },
        "blocks": [
          {
            "kind": "derivation",
            "slug": "deduccion-frontera-jacobiana-robin"
          }
        ]
      },
      {
        "heading": {
          "es": "Ejemplo no lineal y solución exacta",
          "eu": "Adibide ez-lineala eta soluzio zehatza",
          "en": "Nonlinear example and exact solution"
        },
        "blocks": [
          {
            "kind": "formula",
            "tex": "y''=xyy'-3y^2+6x,\\quad 3y(0)-2y'(0)=0,\\quad 2y(1)-y'(1)/3=1"
          },
          {
            "kind": "paragraph",
            "text": {
              "es": "La función $y=x^3$ cumple la EDO porque $6x-3x^6+3x^6=6x$ y cumple las dos condiciones. La reservamos para comprobar el error. Iniciamos Newton con $g(x)=3x^2/4$, que cumple las condiciones Robin pero no la EDO. Con $n=80$ calculamos 81 incógnitas.",
              "eu": "$y=x^3$ funtzioak EDA betetzen du, $6x-3x^6+3x^6=6x$ delako, baita bi baldintzak ere. Errorea egiaztatzeko erabiltzen dugu. Newton $g(x)=3x^2/4$ funtzioarekin hasten dugu; Robin baldintzak betetzen ditu baina EDA ez. $n=80$ denean 81 ezezagun kalkulatzen ditugu.",
              "en": "$y=x^3$ satisfies the ODE since $6x-3x^6+3x^6=6x$ and meets both boundary conditions. Reserve it for error checking. Start Newton from $g(x)=3x^2/4$, which meets the Robin conditions but not the ODE. With $n=80$ there are 81 unknowns."
            }
          },
          {
            "kind": "formula",
            "tex": "F_0=(2+3h)y_0-2y_1-3h^2y_0^2"
          },
          {
            "kind": "formula",
            "tex": "F_n=-2y_{n-1}+(2-12h)y_n+3h^2y_n^2-3h^2y_n+6h+6h^2"
          },
          {
            "kind": "plot",
            "xLabel": "x",
            "yLabel": "y",
            "caption": {
              "es": "Aproximación con 80 subintervalos y solución exacta. Los puntos se recalculan durante la compilación.",
              "eu": "80 azpitarteko hurbilketa eta soluzio zehatza. Puntuak eraikitzean berriz kalkulatzen dira.",
              "en": "Approximation with 80 subintervals and exact solution. Points are recomputed at build time."
            },
            "series": [
              {
                "label": {
                  "es": "Diferencias finitas",
                  "eu": "Diferentzia finituak",
                  "en": "Finite differences"
                },
                "points": cubicPoints,
                "style": "points",
                "tone": "accent"
              },
              {
                "label": {
                  "es": "Exacta",
                  "eu": "Zehatza",
                  "en": "Exact"
                },
                "points": exactPoints,
                "tone": "ink"
              }
            ]
          },
          {
            "kind": "table",
            "head": {
              "es": [
                "i",
                "x",
                "Aproximación",
                "Error absoluto"
              ],
              "eu": [
                "i",
                "x",
                "Hurbilketa",
                "Errore absolutua"
              ],
              "en": [
                "i",
                "x",
                "Approximation",
                "Absolute error"
              ]
            },
            "rows": lastNodes
          }
        ]
      },
      {
        "heading": {
          "es": "Residuo, error y refinamiento",
          "eu": "Hondarra, errorea eta fintzea",
          "en": "Residual, error and refinement"
        },
        "blocks": [
          {
            "kind": "paragraph",
            "text": {
              "es": "Paramos cuando el incremento es pequeño y $\\|F\\|_\\infty/h^2$ baja de la tolerancia. El factor $h^2$ procede de la escala elegida para las ecuaciones. El residuo mide el sistema discreto; el error compara con la solución continua. En este ejemplo Newton necesita cuatro iteraciones y el error máximo con 80 subintervalos ronda $7.024513\\cdot10^{-5}$.",
              "eu": "Inkrementua txikia denean eta $\\|F\\|_\\infty/h^2$ tolerantziatik behera dagoenean gelditzen gara. $h^2$ faktorea ekuazioen eskalatik dator. Hondarrak sistema diskretua neurtzen du; erroreak soluzio jarraituarekin alderatzen du. Adibide honetan Newtonek lau iterazio behar ditu eta 80 azpitarteko gehieneko errorea $7.024513\\cdot10^{-5}$ ingurukoa da.",
              "en": "Stop when the correction is small and $\\|F\\|_\\infty/h^2$ is below tolerance. The $h^2$ factor comes from equation scaling. The residual measures the discrete system; the error compares with the continuous solution. Here Newton takes four iterations and the maximum error with 80 subintervals is about $7.024513\\cdot10^{-5}$."
            }
          },
          {
            "kind": "table",
            "head": {
              "es": [
                "Subintervalos",
                "Nodos",
                "Error máximo",
                "Iteraciones"
              ],
              "eu": [
                "Azpitarteak",
                "Nodoak",
                "Gehieneko errorea",
                "Iterazioak"
              ],
              "en": [
                "Subintervals",
                "Nodes",
                "Maximum error",
                "Iterations"
              ]
            },
            "rows": refinementRows
          },
          {
            "kind": "paragraph",
            "text": {
              "es": "Al dividir $h$ por dos observamos un error próximo a la cuarta parte. Newton es un método local: otro vector inicial puede conducir a otra raíz o fallar. No deducimos unicidad de la convergencia.",
              "eu": "$h$ erdira murriztean errorea laurdenaren ingurura jaisten dela ikusten dugu. Newton metodo lokala da: hasierako beste bektore batek beste erro batera eraman dezake edo huts egin. Konbergentziak ez du bakartasuna frogatzen.",
              "en": "Halving $h$ gives about a quarter of the error. Newton is local: another starting vector may reach a different root or fail. Convergence does not prove uniqueness."
            }
          }
        ]
      },
      {
        "heading": {
          "es": "Comparar algoritmos con criterio",
          "eu": "Algoritmoak irizpidez alderatzea",
          "en": "Comparing algorithms fairly"
        },
        "blocks": [
          {
            "kind": "paragraph",
            "text": {
              "es": "Para comparar Crout y LU densa usamos el mismo residuo, inicio y tolerancias. Medimos preparación y resolución completa, excluimos calentamiento y gráficas, y repetimos para obtener mediana y cuartiles. El cuaderno de comparación incluye disparo RK4 y solve_bvp: igualar la malla inicial no iguala precisión ni trabajo, porque el último adapta sus nodos y usa otro control de error.",
              "eu": "Crout eta LU dentsoa alderatzeko hondar, hasiera eta tolerantzia berak erabiltzen ditugu. Prestaketa eta ebazpen osoa neurtzen ditugu, beroketa eta grafikoak kanpo utzita; errepikapenek mediana eta kuartilak ematen dituzte. Konparazio-koadernoak RK4 jaurtiketa eta solve_bvp ere baditu: hasierako sare bera izateak ez du doitasun edo lan bera esan nahi, azkenak nodoak egokitzen eta beste errore-kontrol bat erabiltzen duelako.",
              "en": "Compare Crout and dense LU with the same residual, start and tolerances. Time setup and complete solves, exclude warm-up and plotting, and repeat for medians and quartiles. The comparison notebook includes RK4 shooting and solve_bvp: equal initial meshes do not mean equal accuracy or work, because the latter adapts nodes and uses a different error control."
            }
          }
        ]
      }
    ]
  }
];

export const finiteDifferenceDerivations: ContentEntry[] = [
  {
    "slug": "deduccion-frontera-diferencias-finitas",
    "category": "Problemas de frontera",
    "level": "medio",
    "searchIntent": "Deducción de diferencias finitas con condiciones Robin finite differences boundary value problems Python Robin Newton Crout",
    "title": {
      "es": "Deducción de diferencias finitas con condiciones Robin",
      "eu": "Robin baldintzetako diferentzia finituen frogapena",
      "en": "Deriving finite differences with Robin conditions"
    },
    "description": {
      "es": "Taylor, ecuaciones interiores y eliminación de los dos nodos ficticios con signos explícitos.",
      "eu": "Taylor, barne-ekuazioak eta bi fikziozko nodoen ezabaketa, zeinuak azalduz.",
      "en": "Taylor, interior equations and elimination of both ghost nodes with explicit signs."
    },
    "keywords": [
      "diferencias finitas",
      "finite differences",
      "boundary value problems",
      "Robin",
      "Newton",
      "Crout",
      "Python"
    ],
    "prerequisites": [
      "frontera-introduccion",
      "diferenciacion-derivadas-superiores"
    ],
    "related": [
      "frontera-diferencias-finitas",
      "frontera-crout"
    ],
    "code": [
      {
        "href": "https://github.com/jramosg/boundary-value-methods-python",
        "label": {
          "es": "Código Python y cuadernos",
          "eu": "Python kodea eta koadernoak",
          "en": "Python code and notebooks"
        }
      },
      {
        "href": "https://github.com/jramosg/boundary-value-methods-python/blob/main/notebooks/04_finite_differences.ipynb",
        "label": {
          "es": "Cuaderno de diferencias finitas (inglés)",
          "eu": "Diferentzia finituen koadernoa (ingelesez)",
          "en": "Finite-difference notebook"
        }
      }
    ],
    "sections": [
      {
        "heading": {
          "es": "Derivación paso a paso",
          "eu": "Urratsez urratseko frogapena",
          "en": "Step-by-step derivation"
        },
        "blocks": [
          {
            "kind": "steps",
            "steps": [
              {
                "text": {
                  "es": "Desarrolla alrededor de un nodo, con cuatro derivadas continuas en su entorno.",
                  "eu": "Garatu nodoaren inguruan, inguruneko lau deribatu jarraitu erabiliz.",
                  "en": "Expand around a node with four continuous derivatives nearby."
                },
                "formula": "y(x\\pm h)=y(x)\\pm hy'(x)+\\frac{h^2}{2}y''(x)\\pm\\frac{h^3}{6}y'''(x)+O(h^4)"
              },
              {
                "text": {
                  "es": "Resta los desarrollos para aislar la primera derivada.",
                  "eu": "Kendu garapenak lehen deribatua isolatzeko.",
                  "en": "Subtract the expansions to isolate the first derivative."
                },
                "formula": "\\frac{y(x+h)-y(x-h)}{2h}=y'(x)+O(h^2)"
              },
              {
                "text": {
                  "es": "Suma: los términos impares se cancelan. Resta $2y(x)$ en ambos miembros y divide entre $h^2$.",
                  "eu": "Batu: gai bakoitiak ezeztatzen dira. Kendu $2y(x)$ bi ataletan eta zatitu $h^2$-z.",
                  "en": "Add: odd terms cancel. Subtract $2y(x)$ from both sides and divide by $h^2$."
                },
                "formula": "\\frac{y(x+h)-2y(x)+y(x-h)}{h^2}=y''(x)+O(h^2)"
              },
              {
                "text": {
                  "es": "Sustituye en $y^{\\prime\\prime}=p y^{\\prime}+q y+r$, multiplica por $h^2$ y agrupa cada incógnita.",
                  "eu": "Ordezkatu $y^{\\prime\\prime}=p y^{\\prime}+q y+r$ ekuazioan, biderkatu $h^2$-z eta bildu ezezagun bakoitza.",
                  "en": "Substitute in $y^{\\prime\\prime}=p y^{\\prime}+q y+r$, multiply by $h^2$ and collect each unknown."
                },
                "formula": "(-1-hp_i/2)y_{i-1}+(2+h^2q_i)y_i+(-1+hp_i/2)y_{i+1}=-h^2r_i"
              },
              {
                "text": {
                  "es": "En la izquierda aproxima la derivada con diferencia central y despeja el nodo exterior.",
                  "eu": "Ezkerrean hurbildu deribatua diferentzia zentralarekin eta askatu kanpoko nodoa.",
                  "en": "At the left approximate the derivative centrally and solve for the outside node."
                },
                "formula": "\\alpha_a\\frac{y_1-y_{-1}}{2h}+\\beta_a y_0=\\gamma_a\\ \\Longrightarrow\\ y_{-1}=y_1+\\frac{2h\\beta_a}{\\alpha_a}y_0-\\frac{2h\\gamma_a}{\\alpha_a}"
              },
              {
                "text": {
                  "es": "En la derecha el nodo exterior entra con signo positivo en la derivada; despeja con ese signo.",
                  "eu": "Eskuinean kanpoko nodoak zeinu positiboa du deribatuan; askatu zeinu hori zainduz.",
                  "en": "At the right the outside node enters the derivative with a positive sign; preserve that sign when rearranging."
                },
                "formula": "\\alpha_b\\frac{y_{n+1}-y_{n-1}}{2h}+\\beta_b y_n=\\gamma_b\\ \\Longrightarrow\\ y_{n+1}=y_{n-1}-\\frac{2h\\beta_b}{\\alpha_b}y_n+\\frac{2h\\gamma_b}{\\alpha_b}"
              },
              {
                "text": {
                  "es": "Sustituye los nodos ficticios en las ecuaciones de extremo. Cada una depende de su extremo y del vecino interior. Las diagonales siguen siendo tres.",
                  "eu": "Ordezkatu fikziozko nodoak muturretako ekuazioetan. Bakoitza bere muturraren eta barruko auzokidearen menpe dago. Hiru diagonal izaten jarraitzen dugu.",
                  "en": "Substitute ghosts into the endpoint equations. Each depends on its endpoint and its interior neighbor, preserving the three diagonals."
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "deduccion-frontera-crout",
    "category": "Problemas de frontera",
    "level": "medio",
    "searchIntent": "Deducción de Crout tridiagonal finite differences boundary value problems Python Robin Newton Crout",
    "title": {
      "es": "Deducción de Crout tridiagonal",
      "eu": "Crout tridiagonalaren frogapena",
      "en": "Deriving tridiagonal Crout"
    },
    "description": {
      "es": "Iguala las entradas de A y LU, calcula los pivotes y resuelve los dos sistemas triangulares.",
      "eu": "Berdindu A eta LU-ren sarrerak, kalkulatu piboteak eta ebatzi bi sistema triangeluarrak.",
      "en": "Match entries of A and LU, compute pivots and solve both triangular systems."
    },
    "keywords": [
      "diferencias finitas",
      "finite differences",
      "boundary value problems",
      "Robin",
      "Newton",
      "Crout",
      "Python"
    ],
    "prerequisites": [
      "frontera-introduccion",
      "diferenciacion-derivadas-superiores"
    ],
    "related": [
      "frontera-crout",
      "frontera-diferencias-finitas-newton"
    ],
    "code": [
      {
        "href": "https://github.com/jramosg/boundary-value-methods-python",
        "label": {
          "es": "Código Python y cuadernos",
          "eu": "Python kodea eta koadernoak",
          "en": "Python code and notebooks"
        }
      },
      {
        "href": "https://github.com/jramosg/boundary-value-methods-python/blob/main/notebooks/04_finite_differences.ipynb",
        "label": {
          "es": "Cuaderno de diferencias finitas (inglés)",
          "eu": "Diferentzia finituen koadernoa (ingelesez)",
          "en": "Finite-difference notebook"
        }
      }
    ],
    "sections": [
      {
        "heading": {
          "es": "Factorizar y resolver",
          "eu": "Faktorizatu eta ebatzi",
          "en": "Factor and solve"
        },
        "blocks": [
          {
            "kind": "steps",
            "steps": [
              {
                "text": {
                  "es": "La primera entrada diagonal fija el primer pivote. La primera entrada superior determina $u_0$.",
                  "eu": "Lehen sarrera diagonalak lehen pibotea finkatzen du. Lehen goiko sarrerak $u_0$ zehazten du.",
                  "en": "The first diagonal entry fixes the first pivot; the first upper entry determines $u_0$."
                },
                "formula": "l_0=a_0,\\qquad l_0u_0=b_0\\ \\Longrightarrow\\ u_0=b_0/l_0"
              },
              {
                "text": {
                  "es": "En una fila interior, el producto $LU$ suma la contribución de la fila anterior y la diagonal actual.",
                  "eu": "Barne-errenkada batean, $LU$ biderkadurak aurreko errenkadaren ekarpena eta uneko diagonala batzen ditu.",
                  "en": "In an interior row, the LU product adds the previous-row contribution and the current diagonal."
                },
                "formula": "a_i=c_{i-1}u_{i-1}+l_i\\ \\Longrightarrow\\ l_i=a_i-c_{i-1}u_{i-1},\\quad u_i=b_i/l_i"
              },
              {
                "text": {
                  "es": "En la última fila calcula el pivote; no existe otra superdiagonal.",
                  "eu": "Azken errenkadan kalkulatu pibotea; ez dago beste goiko diagonalik.",
                  "en": "In the last row compute the pivot; there is no further upper entry."
                },
                "formula": "l_{m-1}=a_{m-1}-c_{m-2}u_{m-2}"
              },
              {
                "text": {
                  "es": "Resuelve $Lz=d$ de izquierda a derecha.",
                  "eu": "Ebatzi $Lz=d$ ezkerretik eskuinera.",
                  "en": "Solve Lz=d in forward order."
                },
                "formula": "z_0=d_0/l_0,\\qquad z_i=(d_i-c_{i-1}z_{i-1})/l_i"
              },
              {
                "text": {
                  "es": "Resuelve $Uy=z$ desde la última componente. La diagonal de $U$ vale uno.",
                  "eu": "Ebatzi $Uy=z$ azken osagaitik hasita. $U$-ren diagonalak bat balio du.",
                  "en": "Solve Uy=z from the last component. The diagonal of U is one."
                },
                "formula": "y_{m-1}=z_{m-1},\\qquad y_i=z_i-u_i y_{i+1}"
              },
              {
                "text": {
                  "es": "Cada división necesita un pivote seguro. En Newton el vector $d$ es $-F$ y el resultado es el incremento, no la solución final.",
                  "eu": "Zatiketa bakoitzak pibote segurua behar du. Newtonen $d$ bektorea $-F$ da eta emaitza inkrementua da, ez azken soluzioa.",
                  "en": "Every division needs a safe pivot. In Newton d is -F and the result is the correction, not the final solution."
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "deduccion-frontera-jacobiana-robin",
    "category": "Problemas de frontera",
    "level": "avanzado",
    "searchIntent": "Deducción de la jacobiana con fronteras Robin finite differences boundary value problems Python Robin Newton Crout",
    "title": {
      "es": "Deducción de la jacobiana con fronteras Robin",
      "eu": "Robin mugetako jakobiarraren frogapena",
      "en": "Deriving the Jacobian with Robin boundaries"
    },
    "description": {
      "es": "Regla de la cadena en los nodos interiores y en las filas de extremo tras eliminar nodos ficticios.",
      "eu": "Katearen erregela barneko nodoetan eta fikziozko nodoak ezabatu ondoko muturreko errenkadetan.",
      "en": "Chain rule at interior nodes and endpoint rows after eliminating ghost nodes."
    },
    "keywords": [
      "diferencias finitas",
      "finite differences",
      "boundary value problems",
      "Robin",
      "Newton",
      "Crout",
      "Python"
    ],
    "prerequisites": [
      "frontera-introduccion",
      "diferenciacion-derivadas-superiores"
    ],
    "related": [
      "frontera-diferencias-finitas-newton",
      "frontera-diferencias-finitas"
    ],
    "code": [
      {
        "href": "https://github.com/jramosg/boundary-value-methods-python",
        "label": {
          "es": "Código Python y cuadernos",
          "eu": "Python kodea eta koadernoak",
          "en": "Python code and notebooks"
        }
      },
      {
        "href": "https://github.com/jramosg/boundary-value-methods-python/blob/main/notebooks/04_finite_differences.ipynb",
        "label": {
          "es": "Cuaderno de diferencias finitas (inglés)",
          "eu": "Diferentzia finituen koadernoa (ingelesez)",
          "en": "Finite-difference notebook"
        }
      }
    ],
    "sections": [
      {
        "heading": {
          "es": "Parciales interiores y de frontera",
          "eu": "Barneko eta mugako deribatu partzialak",
          "en": "Interior and boundary partial derivatives"
        },
        "blocks": [
          {
            "kind": "steps",
            "steps": [
              {
                "text": {
                  "es": "Define la pendiente discreta. Sus parciales respecto a los vecinos tienen signos opuestos.",
                  "eu": "Definitu malda diskretua. Auzokideekiko deribatu partzialek aurkako zeinuak dituzte.",
                  "en": "Define the discrete slope. Its neighbor partial derivatives have opposite signs."
                },
                "formula": "z_i=\\frac{y_{i+1}-y_{i-1}}{2h},\\quad \\partial_{y_{i-1}}z_i=-\\frac1{2h},\\quad\\partial_{y_{i+1}}z_i=\\frac1{2h}"
              },
              {
                "text": {
                  "es": "Aplica la regla de la cadena al residuo interior. Evalúa las parciales de $f$ en $(x_i,y_i,z_i)$.",
                  "eu": "Aplikatu katearen erregela barneko hondarrari. Ebaluatu $f$-ren deribatu partzialak $(x_i,y_i,z_i)$ puntuan.",
                  "en": "Apply the chain rule to the interior residual. Evaluate partial derivatives of $f$ at $(x_i,y_i,z_i)$."
                },
                "formula": "J_{i,i-1}=-1-\\frac h2 f_{y'},\\quad J_{i,i}=2+h^2f_y,\\quad J_{i,i+1}=-1+\\frac h2 f_{y'}"
              },
              {
                "text": {
                  "es": "En la izquierda define la pendiente a partir de Robin y elimina el nodo ficticio.",
                  "eu": "Ezkerrean definitu malda Robin baldintzatik eta ezabatu fikziozko nodoa.",
                  "en": "At the left define the slope from Robin data and eliminate the ghost."
                },
                "formula": "s_a=\\frac{\\gamma_a-\\beta_a y_0}{\\alpha_a},\\quad F_0=2y_0-2y_1+2hs_a+h^2f(a,y_0,s_a)"
              },
              {
                "text": {
                  "es": "La derivada de la pendiente es $-\\beta_a/\\alpha_a$. Incluye su contribución tanto en $2hs_a$ como dentro de $f$.",
                  "eu": "Maldaren deribatua $-\\beta_a/\\alpha_a$ da. Sartu ekarpena bai $2hs_a$ gaian bai $f$ barruan.",
                  "en": "The slope derivative is $-\\beta_a/\\alpha_a$. Include its contribution in both $2hs_a$ and inside $f$."
                },
                "formula": "J_{0,0}=2-2h\\frac{\\beta_a}{\\alpha_a}+h^2\\left(f_y-\\frac{\\beta_a}{\\alpha_a}f_{y'}\\right),\\quad J_{0,1}=-2"
              },
              {
                "text": {
                  "es": "En la derecha cambia el signo del término con la pendiente al eliminar el nodo exterior.",
                  "eu": "Eskuinean maldaren gaiaren zeinua aldatzen da kanpoko nodoa ezabatzean.",
                  "en": "At the right the slope term changes sign when eliminating the outside node."
                },
                "formula": "s_b=\\frac{\\gamma_b-\\beta_b y_n}{\\alpha_b},\\quad F_n=2y_n-2y_{n-1}-2hs_b+h^2 f(b,y_n,s_b)"
              },
              {
                "text": {
                  "es": "Deriva y conserva la estructura tridiagonal. Para Dirichlet impón la fila del valor conocido en lugar de dividir por $\\alpha=0$.",
                  "eu": "Deribatu eta mantendu egitura tridiagonala. Dirichlet kasuan ezarri balio ezagunaren errenkada $\\alpha=0$-z zatitu ordez.",
                  "en": "Differentiate and preserve tridiagonal structure. For Dirichlet impose the known-value row rather than divide by $\\alpha=0$."
                },
                "formula": "J_{n,n}=2+2h\\frac{\\beta_b}{\\alpha_b}+h^2\\left(f_y-\\frac{\\beta_b}{\\alpha_b}f_{y'}\\right),\\quad J_{n,n-1}=-2"
              }
            ]
          }
        ]
      }
    ]
  }
];
