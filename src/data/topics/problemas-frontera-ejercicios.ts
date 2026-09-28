import type { ContentEntry } from "../content";
import { beamDeflection, sensitiveFan } from "../numerics/shooting";

/**
 * Solved boundary-value exercises. All figures recomputed with fixed-step RK4
 * (src/data/numerics/shooting.ts and a standalone check script), so they
 * differ slightly from adaptive-solver tables but agree to the stated digits.
 */

const fanTones = ["blue", "gold", "accent", "red"] as const;

export const fronteraExercises: ContentEntry[] = [
  {
    slug: "ejercicio-disparo-lineal-a-mano",
    category: "Problemas de frontera",
    level: "base",
    searchIntent: "ejercicio resuelto disparo lineal a mano runge kutta sistema",
    title: {
      es: "Ejercicio: disparo lineal a mano con RK4",
      eu: "Ariketa: jaurtiketa lineala eskuz RK4rekin",
      en: "Exercise: linear shooting by hand with RK4"
    },
    description: {
      es: "El problema $y''=y$, $y(0)=1$, $y(1)=2$ resuelto con dos PVI y RK4 con $h=0.5$, cada etapa $K_j$ a mano, y comparado con la solución exacta por superposición.",
      eu: "$y''=y$, $y(0)=1$, $y(1)=2$ problema bi HBPrekin eta RK4rekin ebatzita, $h=0.5$ hartuta, $K_j$ etapa bakoitza eskuz, eta gainezarpen bidezko soluzio zehatzarekin alderatuta.",
      en: "The problem $y''=y$, $y(0)=1$, $y(1)=2$ solved with two IVPs and RK4 with $h=0.5$, every stage $K_j$ by hand, and compared with the exact solution by superposition."
    },
    keywords: ["ejercicio", "disparo lineal", "a mano", "RK4", "sistemas"],
    prerequisites: ["frontera-disparo-lineal"],
    related: ["ejercicio-disparo-lineal-rk4", "ejercicio-edo-sistema-a-mano"],
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
              es: "Planteamiento y solución exacta",
              eu: "Planteamendua eta soluzio zehatza",
              en: "Setting and exact solution"
            },
            statement: {
              es: "Resolver $y''=y$, $x\\in[0,1]$, $y(0)=1$, $y(1)=2$ por disparo lineal. Aquí $p=0$, $q=1>0$, $r=0$: por el [[frontera-introduccion|teorema de existencia]] hay solución única.",
              eu: "Ebatzi $y''=y$, $x\\in[0,1]$, $y(0)=1$, $y(1)=2$ jaurtiketa linealaren bidez. Hemen $p=0$, $q=1>0$, $r=0$: [[frontera-introduccion|existentzia-teoremaren]] arabera soluzio bakarra dago.",
              en: "Solve $y''=y$, $x\\in[0,1]$, $y(0)=1$, $y(1)=2$ by linear shooting. Here $p=0$, $q=1>0$, $r=0$: by the [[frontera-introduccion|existence theorem]] there is a unique solution."
            },
            steps: [
              {
                text: {
                  es: "Los PVI auxiliares son $y_1''=y_1$, $y_1(0)=1$, $y_1'(0)=0$ e $y_2''=y_2$, $y_2(0)=0$, $y_2'(0)=1$. Sus soluciones exactas son conocidas:",
                  eu: "HBP laguntzaileak $y_1''=y_1$, $y_1(0)=1$, $y_1'(0)=0$ eta $y_2''=y_2$, $y_2(0)=0$, $y_2'(0)=1$ dira. Haien soluzio zehatzak ezagunak dira:",
                  en: "The auxiliary IVPs are $y_1''=y_1$, $y_1(0)=1$, $y_1'(0)=0$ and $y_2''=y_2$, $y_2(0)=0$, $y_2'(0)=1$. Their exact solutions are known:"
                },
                formula: "y_1(x)=\\cosh x,\\qquad y_2(x)=\\sinh x"
              },
              {
                text: {
                  es: "Constante exacta:",
                  eu: "Konstante zehatza:",
                  en: "Exact constant:"
                },
                formula: "C=\\frac{2-\\cosh 1}{\\sinh 1}=\\frac{2-1.5430806}{1.1752012}=0.38880097"
              }
            ],
            result: {
              text: {
                es: "Solución exacta: $y(x)=\\cosh x+0.38880097\\,\\sinh x$, con $y(0.5)=1.33022833$ e $y'(0)=C=0.38880097$.",
                eu: "Soluzio zehatza: $y(x)=\\cosh x+0.38880097\\,\\sinh x$, $y(0.5)=1.33022833$ eta $y'(0)=C=0.38880097$ izanik.",
                en: "Exact solution: $y(x)=\\cosh x+0.38880097\\,\\sinh x$, with $y(0.5)=1.33022833$ and $y'(0)=C=0.38880097$."
              }
            }
          },
          {
            kind: "example",
            title: {
              es: "Primer PVI con RK4, $h=0.5$",
              eu: "Lehen HBPa RK4rekin, $h=0.5$",
              en: "First IVP with RK4, $h=0.5$"
            },
            statement: {
              es: "Con $u_1=y_1$, $u_2=y_1'$ el sistema es $\\bar u'=F(\\bar u)=(u_2,\\,u_1)$ con $\\bar u(0)=(1,0)$. Damos el primer paso de $x_0=0$ a $x_1=0.5$.",
              eu: "$u_1=y_1$, $u_2=y_1'$ eginda, sistema $\\bar u'=F(\\bar u)=(u_2,\\,u_1)$ da, $\\bar u(0)=(1,0)$ izanik. Lehen urratsa ematen dugu $x_0=0$-tik $x_1=0.5$-era.",
              en: "With $u_1=y_1$, $u_2=y_1'$ the system is $\\bar u'=F(\\bar u)=(u_2,\\,u_1)$ with $\\bar u(0)=(1,0)$. We take the first step from $x_0=0$ to $x_1=0.5$."
            },
            steps: [
              {
                text: {
                  es: "Primera etapa, en el punto de partida:",
                  eu: "Lehen etapa, abiapuntuan:",
                  en: "First stage, at the starting point:"
                },
                formula: "K_1=F(1,\\,0)=(0,\\;1)"
              },
              {
                text: {
                  es: "Segunda etapa, con $\\bar u+\\frac h2K_1=(1,0)+0.25\\,(0,1)=(1,\\,0.25)$:",
                  eu: "Bigarren etapa, $\\bar u+\\frac h2K_1=(1,0)+0.25\\,(0,1)=(1,\\,0.25)$ erabiliz:",
                  en: "Second stage, with $\\bar u+\\frac h2K_1=(1,0)+0.25\\,(0,1)=(1,\\,0.25)$:"
                },
                formula: "K_2=F(1,\\,0.25)=(0.25,\\;1)"
              },
              {
                text: {
                  es: "Tercera etapa, con $\\bar u+\\frac h2K_2=(1.0625,\\,0.25)$:",
                  eu: "Hirugarren etapa, $\\bar u+\\frac h2K_2=(1.0625,\\,0.25)$ erabiliz:",
                  en: "Third stage, with $\\bar u+\\frac h2K_2=(1.0625,\\,0.25)$:"
                },
                formula: "K_3=F(1.0625,\\,0.25)=(0.25,\\;1.0625)"
              },
              {
                text: {
                  es: "Cuarta etapa, con $\\bar u+hK_3=(1.125,\\,0.53125)$:",
                  eu: "Laugarren etapa, $\\bar u+hK_3=(1.125,\\,0.53125)$ erabiliz:",
                  en: "Fourth stage, with $\\bar u+hK_3=(1.125,\\,0.53125)$:"
                },
                formula: "K_4=F(1.125,\\,0.53125)=(0.53125,\\;1.125)"
              },
              {
                text: {
                  es: "Combinación con pesos $1,2,2,1$: la suma es $(0+0.5+0.5+0.53125,\\;1+2+2.125+1.125)=(1.53125,\\,6.25)$ y se multiplica por $\\frac h6=\\frac1{12}$:",
                  eu: "$1,2,2,1$ pisuekin konbinatu: batura $(0+0.5+0.5+0.53125,\\;1+2+2.125+1.125)=(1.53125,\\,6.25)$ da, eta $\\frac h6=\\frac1{12}$-rekin biderkatzen da:",
                  en: "Combine with weights $1,2,2,1$: the sum is $(0+0.5+0.5+0.53125,\\;1+2+2.125+1.125)=(1.53125,\\,6.25)$, multiplied by $\\frac h6=\\frac1{12}$:"
                },
                formula: "\\bar u(0.5)\\approx(1,0)+\\tfrac1{12}(1.53125,\\,6.25)=(1.12760417,\\;0.52083333)"
              },
              {
                text: {
                  es: "El segundo paso ($0.5\\to1$) repite las cuentas desde $(1.12760417,\\,0.52083333)$:",
                  eu: "Bigarren urratsak ($0.5\\to1$) kontuak errepikatzen ditu $(1.12760417,\\,0.52083333)$-tik:",
                  en: "The second step ($0.5\\to1$) repeats the computation from $(1.12760417,\\,0.52083333)$:"
                },
                formula: "\\bar u(1)\\approx(u_{1N},\\,u_{2N})=(1.54275852,\\;1.17458767)"
              }
            ],
            result: {
              text: {
                es: "Compara: $\\cosh 0.5=1.12762597$ y $\\cosh 1=1.54308063$. Un paso de RK4 con $h=0.5$ ya da cuatro cifras.",
                eu: "Alderatu: $\\cosh 0.5=1.12762597$ eta $\\cosh 1=1.54308063$. $h=0.5$-eko RK4 urrats batek lau zifra ematen ditu jada.",
                en: "Compare: $\\cosh 0.5=1.12762597$ and $\\cosh 1=1.54308063$. One RK4 step with $h=0.5$ already gives four digits."
              }
            }
          },
          {
            kind: "example",
            title: {
              es: "Segundo PVI y combinación",
              eu: "Bigarren HBPa eta konbinazioa",
              en: "Second IVP and combination"
            },
            statement: {
              es: "El segundo PVI tiene el mismo sistema con $\\bar v(0)=(0,1)$. Como $F$ solo intercambia las componentes, las etapas son las del primero con las componentes intercambiadas.",
              eu: "Bigarren HBPak sistema bera du, $\\bar v(0)=(0,1)$ izanik. $F$-k osagaiak trukatu besterik ez duenez, etapak lehenengoarenak dira osagaiak trukatuta.",
              en: "The second IVP has the same system with $\\bar v(0)=(0,1)$. Since $F$ only swaps components, its stages are those of the first with the components swapped."
            },
            steps: [
              {
                text: {
                  es: "Resultados de RK4 para el segundo PVI:",
                  eu: "RK4ren emaitzak bigarren HBPrako:",
                  en: "RK4 results for the second IVP:"
                },
                formula: "\\bar v(0.5)\\approx(0.52083333,\\;1.12760417),\\qquad \\bar v(1)\\approx(v_{1N},\\,v_{2N})=(1.17458767,\\;1.54275852)"
              },
              {
                text: {
                  es: "Constante con los valores del último nodo:",
                  eu: "Konstantea azken nodoko balioekin:",
                  en: "Constant from the last-node values:"
                },
                formula: "C_h=\\frac{\\beta-u_{1N}}{v_{1N}}=\\frac{2-1.54275852}{1.17458767}=0.38927829"
              },
              {
                text: {
                  es: "Valor en el nodo interior:",
                  eu: "Barne-nodoko balioa:",
                  en: "Value at the interior node:"
                },
                formula: "y(0.5)\\approx u_{11}+C_h\\,v_{11}=1.12760417+0.38927829\\cdot0.52083333=1.33035328"
              },
              {
                text: {
                  es: "Y la derivada, gratis: $y'(0.5)\\approx u_{21}+C_hv_{21}=0.52083333+0.38927829\\cdot1.12760417=0.95978516$ (exacta $0.95951738$).",
                  eu: "Eta deribatua, doan: $y'(0.5)\\approx u_{21}+C_hv_{21}=0.52083333+0.38927829\\cdot1.12760417=0.95978516$ (zehatza $0.95951738$).",
                  en: "And the derivative, for free: $y'(0.5)\\approx u_{21}+C_hv_{21}=0.52083333+0.38927829\\cdot1.12760417=0.95978516$ (exact $0.95951738$)."
                }
              }
            ],
            result: {
              text: {
                es: "$y(0.5)\\approx1.33035328$ frente al exacto $1.33022833$: error $1.25\\cdot10^{-4}$ con solo dos pasos. La pendiente inicial estimada $C_h=0.38928$ difiere de la exacta $0.38880$ en $4.8\\cdot10^{-4}$. En $x=0$ y $x=1$ el error es nulo por construcción.",
                eu: "$y(0.5)\\approx1.33035328$, zehatza $1.33022833$ izanik: $1.25\\cdot10^{-4}$-ko errorea bi urratsekin bakarrik. Estimatutako hasierako malda $C_h=0.38928$ zehatzetik ($0.38880$) $4.8\\cdot10^{-4}$ aldentzen da. $x=0$ eta $x=1$ puntuetan errorea nulua da eraikuntzaz.",
                en: "$y(0.5)\\approx1.33035328$ versus the exact $1.33022833$: error $1.25\\cdot10^{-4}$ with just two steps. The estimated initial slope $C_h=0.38928$ differs from the exact $0.38880$ by $4.8\\cdot10^{-4}$. At $x=0$ and $x=1$ the error is zero by construction."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-disparo-lineal-rk4",
    category: "Problemas de frontera",
    level: "medio",
    searchIntent: "ejercicio disparo lineal tabla error solucion exacta sin ln x",
    title: {
      es: "Ejercicio: disparo lineal con RK4 y error exacto",
      eu: "Ariketa: jaurtiketa lineala RK4rekin eta errore zehatza",
      en: "Exercise: linear shooting with RK4 and exact error"
    },
    description: {
      es: "$y''=-\\frac2xy'+\\frac2{x^2}y+\\frac{\\sin(\\ln x)}{x^2}$, $y(1)=1$, $y(2)=2$ con $h=0.1$: los dos PVI nodo a nodo, la constante $C$ y la tabla de errores frente a la solución exacta.",
      eu: "$y''=-\\frac2xy'+\\frac2{x^2}y+\\frac{\\sin(\\ln x)}{x^2}$, $y(1)=1$, $y(2)=2$, $h=0.1$ hartuta: bi HBPak nodoz nodo, $C$ konstantea eta errore-taula soluzio zehatzarekiko.",
      en: "$y''=-\\frac2xy'+\\frac2{x^2}y+\\frac{\\sin(\\ln x)}{x^2}$, $y(1)=1$, $y(2)=2$ with $h=0.1$: both IVPs node by node, the constant $C$ and the error table against the exact solution."
    },
    keywords: ["ejercicio", "disparo lineal", "RK4", "error exacto"],
    prerequisites: ["frontera-disparo-lineal"],
    related: ["ejercicio-disparo-lineal-a-mano", "deduccion-disparo-lineal-error"],
    sections: [
      {
        heading: {
          es: "Enunciado",
          eu: "Enuntziatua",
          en: "Statement"
        },
        blocks: [
          {
            kind: "formula",
            tex: "y''=-\\frac2x\\,y'+\\frac2{x^2}\\,y+\\frac{\\sin(\\ln x)}{x^2},\\qquad x\\in[1,2],\\qquad y(1)=1,\\quad y(2)=2"
          },
          {
            kind: "paragraph",
            text: {
              es: "Aproximar la solución con disparo lineal, RK4 y $N=10$ ($h=0.1$), y comparar con la solución exacta",
              eu: "Hurbildu soluzioa jaurtiketa linealarekin, RK4rekin eta $N=10$ hartuta ($h=0.1$), eta alderatu soluzio zehatzarekin:",
              en: "Approximate the solution with linear shooting, RK4 and $N=10$ ($h=0.1$), and compare with the exact solution"
            }
          },
          {
            kind: "formula",
            tex: "y(x)=c_1x+\\frac{c_2}{x^2}-\\frac3{10}\\sin(\\ln x)-\\frac1{10}\\cos(\\ln x),\\qquad c_2=\\frac{8-12\\sin(\\ln2)-4\\cos(\\ln2)}{70},\\quad c_1=\\frac{11}{10}-c_2"
          }
        ]
      },
      {
        heading: {
          es: "Resolución",
          eu: "Ebazpena",
          en: "Solution"
        },
        blocks: [
          {
            kind: "example",
            statement: {
              es: "Identificamos $p(x)=-\\frac2x$, $q(x)=\\frac2{x^2}$, $r(x)=\\frac{\\sin(\\ln x)}{x^2}$. Como $q>0$ y todo es continuo en $[1,2]$, la solución es única.",
              eu: "$p(x)=-\\frac2x$, $q(x)=\\frac2{x^2}$, $r(x)=\\frac{\\sin(\\ln x)}{x^2}$ identifikatzen ditugu. $q>0$ denez eta dena jarraitua denez $[1,2]$-n, soluzioa bakarra da.",
              en: "We identify $p(x)=-\\frac2x$, $q(x)=\\frac2{x^2}$, $r(x)=\\frac{\\sin(\\ln x)}{x^2}$. Since $q>0$ and everything is continuous on $[1,2]$, the solution is unique."
            },
            steps: [
              {
                text: {
                  es: "Primer PVI en forma de sistema:",
                  eu: "Lehen HBPa sistema moduan:",
                  en: "First IVP as a system:"
                },
                formula: "u_1'=u_2,\\quad u_2'=-\\frac2xu_2+\\frac2{x^2}u_1+\\frac{\\sin(\\ln x)}{x^2},\\qquad u_1(1)=1,\\; u_2(1)=0"
              },
              {
                text: {
                  es: "Segundo PVI (homogéneo):",
                  eu: "Bigarren HBPa (homogeneoa):",
                  en: "Second IVP (homogeneous):"
                },
                formula: "v_1'=v_2,\\quad v_2'=-\\frac2xv_2+\\frac2{x^2}v_1,\\qquad v_1(1)=0,\\; v_2(1)=1"
              },
              {
                text: {
                  es: "Tras 10 pasos de RK4 cada uno, en $x=2$: $u_{1,10}=1.46472815$ y $v_{1,10}=0.58332538$. Constante:",
                  eu: "Bakoitzak RK4ko 10 urrats eman ondoren, $x=2$-n: $u_{1,10}=1.46472815$ eta $v_{1,10}=0.58332538$. Konstantea:",
                  en: "After 10 RK4 steps each, at $x=2$: $u_{1,10}=1.46472815$ and $v_{1,10}=0.58332538$. Constant:"
                },
                formula: "C=\\frac{2-1.46472815}{0.58332538}=0.91762140"
              },
              {
                text: {
                  es: "Combinamos $y_i=u_{1i}+0.91762140\\,v_{1i}$ en cada nodo:",
                  eu: "Nodo bakoitzean $y_i=u_{1i}+0.91762140\\,v_{1i}$ konbinatzen dugu:",
                  en: "Combine $y_i=u_{1i}+0.91762140\\,v_{1i}$ at every node:"
                }
              }
            ]
          },
          {
            kind: "table",
            head: {
              es: ["$x_i$", "$u_{1i}$", "$v_{1i}$", "$y_i$", "$y(x_i)$", "$|y_i-y(x_i)|$"],
              eu: ["$x_i$", "$u_{1i}$", "$v_{1i}$", "$y_i$", "$y(x_i)$", "$|y_i-y(x_i)|$"],
              en: ["$x_i$", "$u_{1i}$", "$v_{1i}$", "$y_i$", "$y(x_i)$", "$|y_i-y(x_i)|$"]
            },
            rows: [
              ["1.0", "1.00000000", "0.00000000", "1.00000000", "1.00000000", "0"],
              ["1.1", "1.00896058", "0.09117986", "1.09262916", "1.09262930", "$1.34\\cdot10^{-7}$"],
              ["1.2", "1.03245472", "0.16851175", "1.18708471", "1.18708484", "$1.34\\cdot10^{-7}$"],
              ["1.3", "1.06674375", "0.23608704", "1.28338227", "1.28338236", "$9.78\\cdot10^{-8}$"],
              ["1.4", "1.10928795", "0.29659067", "1.38144589", "1.38144595", "$6.02\\cdot10^{-8}$"],
              ["1.5", "1.15830000", "0.35184379", "1.48115939", "1.48115942", "$3.06\\cdot10^{-8}$"],
              ["1.6", "1.21248371", "0.40311695", "1.58239245", "1.58239246", "$1.08\\cdot10^{-8}$"],
              ["1.7", "1.27087454", "0.45131840", "1.68501396", "1.68501396", "$5.44\\cdot10^{-10}$"],
              ["1.8", "1.33273851", "0.49711137", "1.78889854", "1.78889853", "$5.05\\cdot10^{-9}$"],
              ["1.9", "1.39750618", "0.54098928", "1.89392951", "1.89392951", "$4.41\\cdot10^{-9}$"],
              ["2.0", "1.46472815", "0.58332538", "2.00000000", "2.00000000", "0"]
            ],
            caption: {
              es: "Error máximo $1.34\\cdot10^{-7}$ cerca de $x=1$. La pendiente inicial calculada, $C=0.91762140$, coincide con la exacta $y'(1)=0.91762104$ en seis cifras.",
              eu: "Errore maximoa $1.34\\cdot10^{-7}$ da, $x=1$-etik hurbil. Kalkulatutako hasierako malda, $C=0.91762140$, zehatzarekin ($y'(1)=0.91762104$) bat dator sei zifratan.",
              en: "Maximum error $1.34\\cdot10^{-7}$ near $x=1$. The computed initial slope, $C=0.91762140$, matches the exact $y'(1)=0.91762104$ to six digits."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Repitiendo con $N=5,20,40$ el error máximo es $2.74\\cdot10^{-6}$, $7.74\\cdot10^{-9}$ y $4.48\\cdot10^{-10}$: cocientes próximos a 16, el orden 4 de RK4 que predice la [[deduccion-disparo-lineal-error|cota de error]]. La gráfica de $y_1$, $Cy_2$ e $y$ está en [[frontera-disparo-lineal]].",
              eu: "$N=5,20,40$ hartuta errepikatuz, errore maximoa $2.74\\cdot10^{-6}$, $7.74\\cdot10^{-9}$ eta $4.48\\cdot10^{-10}$ da: 16tik hurbileko zatidurak, [[deduccion-disparo-lineal-error|errore-bornak]] aurreikusten duen RK4ren 4. ordena. $y_1$, $Cy_2$ eta $y$-ren grafikoa [[frontera-disparo-lineal]] orrian dago.",
              en: "Repeating with $N=5,20,40$ the maximum error is $2.74\\cdot10^{-6}$, $7.74\\cdot10^{-9}$ and $4.48\\cdot10^{-10}$: ratios close to 16, the order 4 of RK4 predicted by the [[deduccion-disparo-lineal-error|error bound]]. The plot of $y_1$, $Cy_2$ and $y$ is in [[frontera-disparo-lineal]]."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-disparo-potencial-esferas",
    category: "Problemas de frontera",
    level: "base",
    searchIntent: "ejercicio potencial electrico esferas concentricas problema de frontera disparo",
    title: {
      es: "Ejercicio: potencial entre dos esferas concéntricas",
      eu: "Ariketa: bi esfera zentrokideren arteko potentziala",
      en: "Exercise: potential between two concentric spheres"
    },
    description: {
      es: "$V''+\\frac2rV'=0$ con $V(2)=110$, $V(4)=0$: disparo lineal con RK4 y $h=0.2$, potencial en $r=3$ y comparación con $V=110\\frac{4-r}{r}$.",
      eu: "$V''+\\frac2rV'=0$, $V(2)=110$, $V(4)=0$ baldintzekin: jaurtiketa lineala RK4rekin eta $h=0.2$ hartuta, potentziala $r=3$-n eta $V=110\\frac{4-r}{r}$-rekin alderaketa.",
      en: "$V''+\\frac2rV'=0$ with $V(2)=110$, $V(4)=0$: linear shooting with RK4 and $h=0.2$, potential at $r=3$ and comparison with $V=110\\frac{4-r}{r}$."
    },
    keywords: ["ejercicio", "potencial eléctrico", "esferas concéntricas", "disparo lineal"],
    prerequisites: ["frontera-disparo-lineal"],
    related: ["frontera-introduccion", "ejercicio-disparo-lineal-rk4"],
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
            statement: {
              es: "Dos esferas conductoras concéntricas de radios $R_1=2$ y $R_2=4$ (mm) están a $V_1=110$ V y $V_2=0$ V. El potencial cumple $V''+\\frac2rV'=0$. Aproximar $V$ en los nodos $r_i=2+0.2i$ y en particular $V(3)$.",
              eu: "$R_1=2$ eta $R_2=4$ (mm) erradioko bi esfera eroale zentrokide $V_1=110$ V eta $V_2=0$ V-tan daude. Potentzialak $V''+\\frac2rV'=0$ betetzen du. Hurbildu $V$ $r_i=2+0.2i$ nodoetan eta bereziki $V(3)$.",
              en: "Two concentric conducting spheres of radii $R_1=2$ and $R_2=4$ (mm) are held at $V_1=110$ V and $V_2=0$ V. The potential satisfies $V''+\\frac2rV'=0$. Approximate $V$ at the nodes $r_i=2+0.2i$ and in particular $V(3)$."
            },
            steps: [
              {
                text: {
                  es: "Forma lineal: $V''=-\\frac2rV'$, con $p=-\\frac2r$, $q=0$, $r\\equiv0$. Primer PVI: $V(2)=110$, $V'(2)=0$. Su solución es la constante $y_1\\equiv110$ (si $V'=0$ al inicio, $V''=0$ siempre), y RK4 la reproduce exactamente: $u_{1N}=110$.",
                  eu: "Forma lineala: $V''=-\\frac2rV'$, $p=-\\frac2r$, $q=0$, $r\\equiv0$ izanik. Lehen HBPa: $V(2)=110$, $V'(2)=0$. Haren soluzioa $y_1\\equiv110$ konstantea da (hasieran $V'=0$ bada, $V''=0$ beti), eta RK4k zehazki erreproduzitzen du: $u_{1N}=110$.",
                  en: "Linear form: $V''=-\\frac2rV'$, with $p=-\\frac2r$, $q=0$, $r\\equiv0$. First IVP: $V(2)=110$, $V'(2)=0$. Its solution is the constant $y_1\\equiv110$ (if $V'=0$ initially, $V''=0$ forever), and RK4 reproduces it exactly: $u_{1N}=110$."
                }
              },
              {
                text: {
                  es: "Segundo PVI: $V(2)=0$, $V'(2)=1$. Como $(r^2V')'=0$, $V'=\\frac4{r^2}$ y la solución exacta es $y_2=2-\\frac4r$, con $y_2(4)=1$. RK4 con $h=0.2$ da $v_{1N}=0.99999341$.",
                  eu: "Bigarren HBPa: $V(2)=0$, $V'(2)=1$. $(r^2V')'=0$ denez, $V'=\\frac4{r^2}$ eta soluzio zehatza $y_2=2-\\frac4r$ da, $y_2(4)=1$ izanik. $h=0.2$-ko RK4k $v_{1N}=0.99999341$ ematen du.",
                  en: "Second IVP: $V(2)=0$, $V'(2)=1$. Since $(r^2V')'=0$, $V'=\\frac4{r^2}$ and the exact solution is $y_2=2-\\frac4r$, with $y_2(4)=1$. RK4 with $h=0.2$ gives $v_{1N}=0.99999341$."
                }
              },
              {
                text: {
                  es: "Constante (pendiente inicial del potencial, en V/mm):",
                  eu: "Konstantea (potentzialaren hasierako malda, V/mm-tan):",
                  en: "Constant (initial slope of the potential, in V/mm):"
                },
                formula: "C=\\frac{0-110}{0.99999341}=-110.00072504\\qquad(\\text{exacta}: -110)"
              },
              {
                text: {
                  es: "En $r=3$ (nodo $i=5$): $v_{15}=0.66665910$, así que",
                  eu: "$r=3$-n ($i=5$ nodoa): $v_{15}=0.66665910$; beraz,",
                  en: "At $r=3$ (node $i=5$): $v_{15}=0.66665910$, so"
                },
                formula: "V(3)\\approx110+(-110.00072504)(0.66665910)=36.667015"
              }
            ],
            result: {
              text: {
                es: "El exacto es $V(3)=110\\cdot\\frac{4-3}{3}=36.666667$ V: error $3.5\\cdot10^{-4}$ V. El error máximo en los nodos es $4.5\\cdot10^{-4}$ V (en $r=2.6$) y baja 16 veces al dividir $h$ entre 2.",
                eu: "Zehatza $V(3)=110\\cdot\\frac{4-3}{3}=36.666667$ V da: $3.5\\cdot10^{-4}$ V-ko errorea. Nodoetako errore maximoa $4.5\\cdot10^{-4}$ V da ($r=2.6$-n) eta 16 aldiz txikitzen da $h$ bitan zatitzean.",
                en: "The exact value is $V(3)=110\\cdot\\frac{4-3}{3}=36.666667$ V: error $3.5\\cdot10^{-4}$ V. The maximum nodal error is $4.5\\cdot10^{-4}$ V (at $r=2.6$) and drops 16-fold when $h$ is halved."
              }
            }
          },
          {
            kind: "table",
            head: {
              es: ["$r_i$", "$V_i$", "$V(r_i)$", "Error"],
              eu: ["$r_i$", "$V_i$", "$V(r_i)$", "Errorea"],
              en: ["$r_i$", "$V_i$", "$V(r_i)$", "Error"]
            },
            rows: [
              ["2.0", "110.000000", "110.000000", "0"],
              ["2.4", "73.333768", "73.333333", "$4.34\\cdot10^{-4}$"],
              ["2.8", "47.143266", "47.142857", "$4.09\\cdot10^{-4}$"],
              ["3.0", "36.667015", "36.666667", "$3.48\\cdot10^{-4}$"],
              ["3.2", "27.500278", "27.500000", "$2.78\\cdot10^{-4}$"],
              ["3.6", "12.222356", "12.222222", "$1.34\\cdot10^{-4}$"],
              ["4.0", "0.000000", "0.000000", "0"]
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-disparo-robin-lineal",
    category: "Problemas de frontera",
    level: "medio",
    searchIntent: "ejercicio disparo lineal condicion mixta robin secante una iteracion",
    title: {
      es: "Ejercicio: condición mixta, por superposición y por secante",
      eu: "Ariketa: baldintza mistoa, gainezarpenez eta sekantez",
      en: "Exercise: mixed condition, by superposition and by secant"
    },
    description: {
      es: "$ru''+u'=-4r$ con $u(1)=\\ln\\frac13-1$, $u(3)-u'(3)=\\frac{\\ln3-7}{2}$: la misma respuesta con $y_1+s\\,y_2$ y con la secante, que acierta en una sola iteración.",
      eu: "$ru''+u'=-4r$, $u(1)=\\ln\\frac13-1$, $u(3)-u'(3)=\\frac{\\ln3-7}{2}$ baldintzekin: erantzun bera $y_1+s\\,y_2$-rekin eta sekantearekin, iterazio bakarrean asmatzen duena.",
      en: "$ru''+u'=-4r$ with $u(1)=\\ln\\frac13-1$, $u(3)-u'(3)=\\frac{\\ln3-7}{2}$: the same answer with $y_1+s\\,y_2$ and with the secant, which hits in a single iteration."
    },
    keywords: ["ejercicio", "condición mixta", "Robin", "secante", "disparo lineal"],
    prerequisites: ["frontera-disparo-lineal-condiciones-generales"],
    related: ["frontera-disparo-no-lineal", "ejercicio-disparo-condiciones-acopladas"],
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
              es: "Por superposición",
              eu: "Gainezarpenez",
              en: "By superposition"
            },
            statement: {
              es: "Resolver $ru''+u'=-4r$, $r\\in[1,3]$, con $u(1)=\\ln\\frac13-1=-2.0986123$ y $u(3)-u'(3)=\\frac{\\ln3-7}{2}=-2.9506939$, con RK4 y 10 subintervalos. Solución exacta: $u=\\ln\\frac r3+\\frac12\\ln r-r^2$.",
              eu: "Ebatzi $ru''+u'=-4r$, $r\\in[1,3]$, $u(1)=\\ln\\frac13-1=-2.0986123$ eta $u(3)-u'(3)=\\frac{\\ln3-7}{2}=-2.9506939$ baldintzekin, RK4 eta 10 azpitarterekin. Soluzio zehatza: $u=\\ln\\frac r3+\\frac12\\ln r-r^2$.",
              en: "Solve $ru''+u'=-4r$, $r\\in[1,3]$, with $u(1)=\\ln\\frac13-1=-2.0986123$ and $u(3)-u'(3)=\\frac{\\ln3-7}{2}=-2.9506939$, with RK4 and 10 subintervals. Exact solution: $u=\\ln\\frac r3+\\frac12\\ln r-r^2$."
            },
            steps: [
              {
                text: {
                  es: "Forma lineal: $u''=-\\frac1ru'-4$. La condición en $r=1$ es Dirichlet, así que los PVI son los habituales: $y_1$ con $(u,u')(1)=(\\alpha,0)$ e $y_2$ homogéneo con $(0,1)$. Solo cambia la condición final: $\\mathcal B(u)=u(3)-u'(3)$.",
                  eu: "Forma lineala: $u''=-\\frac1ru'-4$. $r=1$-eko baldintza Dirichlet motakoa da; beraz, HBPak ohikoak dira: $y_1$, $(u,u')(1)=(\\alpha,0)$ datuekin, eta $y_2$ homogeneoa $(0,1)$ datuekin. Azken baldintza bakarrik aldatzen da: $\\mathcal B(u)=u(3)-u'(3)$.",
                  en: "Linear form: $u''=-\\frac1ru'-4$. The condition at $r=1$ is Dirichlet, so the IVPs are the usual ones: $y_1$ with $(u,u')(1)=(\\alpha,0)$ and $y_2$ homogeneous with $(0,1)$. Only the final condition changes: $\\mathcal B(u)=u(3)-u'(3)$."
                }
              },
              {
                text: {
                  es: "RK4 en $r=3$: $y_1(3)=-7.90141613$, $y_1'(3)=-5.33333333$; $y_2(3)=1.09859808$, $y_2'(3)=0.33333333$. (Los exactos son $\\ln3-9$, $-\\frac{16}3$, $\\ln3$ y $\\frac13$.)",
                  eu: "RK4 $r=3$-n: $y_1(3)=-7.90141613$, $y_1'(3)=-5.33333333$; $y_2(3)=1.09859808$, $y_2'(3)=0.33333333$. (Zehatzak $\\ln3-9$, $-\\frac{16}3$, $\\ln3$ eta $\\frac13$ dira.)",
                  en: "RK4 at $r=3$: $y_1(3)=-7.90141613$, $y_1'(3)=-5.33333333$; $y_2(3)=1.09859808$, $y_2'(3)=0.33333333$. (The exact values are $\\ln3-9$, $-\\frac{16}3$, $\\ln3$ and $\\frac13$.)"
                }
              },
              {
                text: {
                  es: "Aplicamos $\\mathcal B$: $\\mathcal B(y_1)=-2.56808280$ y $\\mathcal B(y_2)=0.76526475$. Entonces",
                  eu: "$\\mathcal B$ aplikatzen dugu: $\\mathcal B(y_1)=-2.56808280$ eta $\\mathcal B(y_2)=0.76526475$. Orduan",
                  en: "Apply $\\mathcal B$: $\\mathcal B(y_1)=-2.56808280$ and $\\mathcal B(y_2)=0.76526475$. Then"
                },
                formula: "s=\\frac{-2.95069386-(-2.56808280)}{0.76526475}=-0.49997215"
              },
              {
                text: {
                  es: "Con los valores exactos la cuenta da $s=\\frac{\\frac16-\\frac12\\ln3}{\\ln3-\\frac13}=-\\frac12$ exactamente, que es $u'(1)$ de la solución exacta.",
                  eu: "Balio zehatzekin kontuak $s=\\frac{\\frac16-\\frac12\\ln3}{\\ln3-\\frac13}=-\\frac12$ ematen du zehazki, soluzio zehatzaren $u'(1)$ dena.",
                  en: "With the exact values the computation gives $s=\\frac{\\frac16-\\frac12\\ln3}{\\ln3-\\frac13}=-\\frac12$ exactly, which is $u'(1)$ of the exact solution."
                }
              }
            ],
            result: {
              text: {
                es: "La solución es $u=y_1-0.49997215\\,y_2$; el error máximo en los nodos es $9.3\\cdot10^{-6}$ (en $r=3$).",
                eu: "Soluzioa $u=y_1-0.49997215\\,y_2$ da; nodoetako errore maximoa $9.3\\cdot10^{-6}$ da ($r=3$-n).",
                en: "The solution is $u=y_1-0.49997215\\,y_2$; the maximum nodal error is $9.3\\cdot10^{-6}$ (at $r=3$)."
              }
            }
          },
          {
            kind: "example",
            title: {
              es: "Por secante",
              eu: "Sekantez",
              en: "By secant"
            },
            statement: {
              es: "Disparamos con $u(1)=\\alpha$, $u'(1)=t$ y buscamos un cero de $F(t)=u(3,t)-u'(3,t)-\\beta$, con $t_0=1$ y $t_1=2$.",
              eu: "$u(1)=\\alpha$, $u'(1)=t$ hartuta jaurtitzen dugu eta $F(t)=u(3,t)-u'(3,t)-\\beta$-ren zero bat bilatzen dugu, $t_0=1$ eta $t_1=2$ izanik.",
              en: "Shoot with $u(1)=\\alpha$, $u'(1)=t$ and look for a zero of $F(t)=u(3,t)-u'(3,t)-\\beta$, with $t_0=1$ and $t_1=2$."
            },
            steps: [
              {
                text: {
                  es: "Dos disparos: $F(1)=1.14787581$ y $F(2)=1.91314056$. La pendiente de la secante es $0.76526475$: exactamente $\\mathcal B(y_2)$, porque $F(t)=\\mathcal B(y_1)-\\beta+t\\,\\mathcal B(y_2)$ es una recta.",
                  eu: "Bi jaurtiketa: $F(1)=1.14787581$ eta $F(2)=1.91314056$. Sekantearen malda $0.76526475$ da: zehazki $\\mathcal B(y_2)$, $F(t)=\\mathcal B(y_1)-\\beta+t\\,\\mathcal B(y_2)$ zuzen bat delako.",
                  en: "Two shots: $F(1)=1.14787581$ and $F(2)=1.91314056$. The secant slope is $0.76526475$: exactly $\\mathcal B(y_2)$, because $F(t)=\\mathcal B(y_1)-\\beta+t\\,\\mathcal B(y_2)$ is a straight line."
                }
              },
              {
                text: {
                  es: "Una iteración:",
                  eu: "Iterazio bat:",
                  en: "One iteration:"
                },
                formula: "t_2=2-\\frac{1.91314056\\,(2-1)}{1.91314056-1.14787581}=-0.49997215,\\qquad F(t_2)\\approx3\\cdot10^{-15}"
              }
            ],
            result: {
              text: {
                es: "Mismo valor que por superposición, en una iteración: para ecuaciones lineales la secante es exacta (salvo redondeo).",
                eu: "Gainezarpenez lortutako balio bera, iterazio batean: ekuazio linealetarako sekantea zehatza da (biribiltzea kenduta).",
                en: "Same value as by superposition, in one iteration: for linear equations the secant is exact (up to rounding)."
              }
            }
          },
          {
            kind: "table",
            head: {
              es: ["$r_i$", "$u_i$", "$u(r_i)$", "Error"],
              eu: ["$r_i$", "$u_i$", "$u(r_i)$", "Errorea"],
              en: ["$r_i$", "$u_i$", "$u(r_i)$", "Error"]
            },
            rows: [
              ["1.0", "−2.0986123", "−2.0986123", "0"],
              ["1.4", "−2.5539106", "−2.5539039", "$6.67\\cdot10^{-6}$"],
              ["1.8", "−3.4569355", "−3.4569323", "$3.20\\cdot10^{-6}$"],
              ["2.2", "−4.7559250", "−4.7559262", "$1.28\\cdot10^{-6}$"],
              ["2.6", "−6.4253396", "−6.4253451", "$5.50\\cdot10^{-6}$"],
              ["3.0", "−8.4506846", "−8.4506939", "$9.28\\cdot10^{-6}$"]
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-disparo-condiciones-acopladas",
    category: "Problemas de frontera",
    level: "avanzado",
    searchIntent: "ejercicio disparo lineal condiciones acopladas sistema 2x2 superposicion",
    title: {
      es: "Ejercicio: condiciones que acoplan los dos extremos",
      eu: "Ariketa: bi muturrak akoplatzen dituzten baldintzak",
      en: "Exercise: conditions coupling both ends"
    },
    description: {
      es: "$y''=-(x+1)y'+2y+(1-x^2)e^{-x}$ con $2y(0)+y'(0)+y(1)+y'(1)=\\frac1e$ e $y(0)+y'(0)-y(1)=1$: tres PVI y un sistema $2\\times2$. La solución resulta ser $(x-1)e^{-x}$.",
      eu: "$y''=-(x+1)y'+2y+(1-x^2)e^{-x}$, $2y(0)+y'(0)+y(1)+y'(1)=\\frac1e$ eta $y(0)+y'(0)-y(1)=1$ baldintzekin: hiru HBP eta $2\\times2$ sistema bat. Soluzioa $(x-1)e^{-x}$ da.",
      en: "$y''=-(x+1)y'+2y+(1-x^2)e^{-x}$ with $2y(0)+y'(0)+y(1)+y'(1)=\\frac1e$ and $y(0)+y'(0)-y(1)=1$: three IVPs and a $2\\times2$ system. The solution turns out to be $(x-1)e^{-x}$."
    },
    keywords: ["ejercicio", "condiciones acopladas", "superposición", "sistema lineal"],
    prerequisites: ["frontera-disparo-lineal-condiciones-generales"],
    related: ["ejercicio-disparo-robin-lineal", "sistemas-lineales-conceptos"],
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
            statement: {
              es: "Resolver con 10 subintervalos. Ninguna condición fija por separado $y(0)$ o $y'(0)$ y ambas mezclan los dos extremos, así que usamos $y=y_p+s_1\\varphi_1+s_2\\varphi_2$ con $s_1=y(0)$, $s_2=y'(0)$.",
              eu: "Ebatzi 10 azpitarterekin. Baldintza batek ere ez ditu bereiz finkatzen $y(0)$ edo $y'(0)$, eta biek bi muturrak nahasten dituzte; beraz, $y=y_p+s_1\\varphi_1+s_2\\varphi_2$ erabiltzen dugu, $s_1=y(0)$, $s_2=y'(0)$ izanik.",
              en: "Solve with 10 subintervals. Neither condition fixes $y(0)$ or $y'(0)$ on its own and both mix the two ends, so we use $y=y_p+s_1\\varphi_1+s_2\\varphi_2$ with $s_1=y(0)$, $s_2=y'(0)$."
            },
            steps: [
              {
                text: {
                  es: "Tres PVI con RK4, $h=0.1$. Valores $(y,y')$ en $x=1$: $y_p$ (completa, datos $(0,0)$): $(0.23632870,\\,0.28918205)$; $\\varphi_1$ (homogénea, $(1,0)$): $(1.74544371,\\,1.30709147)$; $\\varphi_2$ (homogénea, $(0,1)$): $(0.75455658,\\,0.69290252)$.",
                  eu: "Hiru HBP RK4rekin, $h=0.1$. $(y,y')$ balioak $x=1$-n: $y_p$ (osoa, $(0,0)$ datuak): $(0.23632870,\\,0.28918205)$; $\\varphi_1$ (homogeneoa, $(1,0)$): $(1.74544371,\\,1.30709147)$; $\\varphi_2$ (homogeneoa, $(0,1)$): $(0.75455658,\\,0.69290252)$.",
                  en: "Three IVPs with RK4, $h=0.1$. Values $(y,y')$ at $x=1$: $y_p$ (full, data $(0,0)$): $(0.23632870,\\,0.28918205)$; $\\varphi_1$ (homogeneous, $(1,0)$): $(1.74544371,\\,1.30709147)$; $\\varphi_2$ (homogeneous, $(0,1)$): $(0.75455658,\\,0.69290252)$."
                }
              },
              {
                text: {
                  es: "Aplicamos cada condición $\\mathcal B_1(y)=2y(0)+y'(0)+y(1)+y'(1)$, $\\mathcal B_2(y)=y(0)+y'(0)-y(1)$ a cada función (usando también sus datos en $x=0$). Por ejemplo $\\mathcal B_1(\\varphi_1)=2+0+1.74544371+1.30709147=5.05253518$.",
                  eu: "Baldintza bakoitza, $\\mathcal B_1(y)=2y(0)+y'(0)+y(1)+y'(1)$ eta $\\mathcal B_2(y)=y(0)+y'(0)-y(1)$, funtzio bakoitzari aplikatzen diogu (haren $x=0$-ko datuak ere erabiliz). Adibidez, $\\mathcal B_1(\\varphi_1)=2+0+1.74544371+1.30709147=5.05253518$.",
                  en: "Apply each condition $\\mathcal B_1(y)=2y(0)+y'(0)+y(1)+y'(1)$, $\\mathcal B_2(y)=y(0)+y'(0)-y(1)$ to each function (also using its data at $x=0$). For instance $\\mathcal B_1(\\varphi_1)=2+0+1.74544371+1.30709147=5.05253518$."
                }
              },
              {
                text: {
                  es: "Sistema $\\mathcal B_k(\\varphi_1)s_1+\\mathcal B_k(\\varphi_2)s_2=c_k-\\mathcal B_k(y_p)$, con $\\mathcal B_1(y_p)=0.52551075$, $\\mathcal B_2(y_p)=-0.23632870$:",
                  eu: "$\\mathcal B_k(\\varphi_1)s_1+\\mathcal B_k(\\varphi_2)s_2=c_k-\\mathcal B_k(y_p)$ sistema, $\\mathcal B_1(y_p)=0.52551075$, $\\mathcal B_2(y_p)=-0.23632870$ izanik:",
                  en: "System $\\mathcal B_k(\\varphi_1)s_1+\\mathcal B_k(\\varphi_2)s_2=c_k-\\mathcal B_k(y_p)$, with $\\mathcal B_1(y_p)=0.52551075$, $\\mathcal B_2(y_p)=-0.23632870$:"
                },
                formula: "\\begin{pmatrix}5.05253518 & 2.44745910\\\\ -0.74544371 & 0.24544342\\end{pmatrix}\\begin{pmatrix}s_1\\\\s_2\\end{pmatrix}=\\begin{pmatrix}e^{-1}-0.52551075\\\\ 1+0.23632870\\end{pmatrix}=\\begin{pmatrix}-0.15763131\\\\1.23632870\\end{pmatrix}"
              },
              {
                text: {
                  es: "Resolviendo (por ejemplo con Cramer, determinante $3.0645$):",
                  eu: "Ebatziz (adibidez Cramerrekin, determinantea $3.0645$):",
                  en: "Solving (e.g. with Cramer, determinant $3.0645$):"
                },
                formula: "s_1=y(0)\\approx-0.99999966,\\qquad s_2=y'(0)\\approx1.99999345"
              },
              {
                text: {
                  es: "Estos valores sugieren $y(0)=-1$, $y'(0)=2$ e $y(1)\\approx0$. Probamos $y=(x-1)e^{-x}$: $y'=(2-x)e^{-x}$, $y''=(x-3)e^{-x}$ y el lado derecho vale $\\bigl[-(x+1)(2-x)+2(x-1)+1-x^2\\bigr]e^{-x}=(x-3)e^{-x}$. Cumple la ecuación y $\\mathcal B_1=-2+2+0+e^{-1}$, $\\mathcal B_2=-1+2-0=1$.",
                  eu: "Balio hauek $y(0)=-1$, $y'(0)=2$ eta $y(1)\\approx0$ iradokitzen dute. $y=(x-1)e^{-x}$ probatzen dugu: $y'=(2-x)e^{-x}$, $y''=(x-3)e^{-x}$ eta eskuineko aldea $\\bigl[-(x+1)(2-x)+2(x-1)+1-x^2\\bigr]e^{-x}=(x-3)e^{-x}$ da. Ekuazioa betetzen du, eta $\\mathcal B_1=-2+2+0+e^{-1}$, $\\mathcal B_2=-1+2-0=1$.",
                  en: "These values suggest $y(0)=-1$, $y'(0)=2$ and $y(1)\\approx0$. Try $y=(x-1)e^{-x}$: $y'=(2-x)e^{-x}$, $y''=(x-3)e^{-x}$ and the right-hand side is $\\bigl[-(x+1)(2-x)+2(x-1)+1-x^2\\bigr]e^{-x}=(x-3)e^{-x}$. It satisfies the equation and $\\mathcal B_1=-2+2+0+e^{-1}$, $\\mathcal B_2=-1+2-0=1$."
                }
              }
            ],
            result: {
              text: {
                es: "La solución exacta es $y=(x-1)e^{-x}$ y la aproximación $y_p+s_1\\varphi_1+s_2\\varphi_2$ tiene error máximo $6.4\\cdot10^{-6}$ en los nodos. Con 20 y 40 subintervalos, $s_2$ vale $1.99999964$ y $1.99999998$.",
                eu: "Soluzio zehatza $y=(x-1)e^{-x}$ da, eta $y_p+s_1\\varphi_1+s_2\\varphi_2$ hurbilketaren errore maximoa $6.4\\cdot10^{-6}$ da nodoetan. 20 eta 40 azpitarterekin, $s_2$-k $1.99999964$ eta $1.99999998$ balio ditu.",
                en: "The exact solution is $y=(x-1)e^{-x}$ and the approximation $y_p+s_1\\varphi_1+s_2\\varphi_2$ has maximum nodal error $6.4\\cdot10^{-6}$. With 20 and 40 subintervals, $s_2$ equals $1.99999964$ and $1.99999998$."
              }
            }
          },
          {
            kind: "table",
            head: {
              es: ["$x_i$", "$y_i$", "$(x_i-1)e^{-x_i}$", "Error"],
              eu: ["$x_i$", "$y_i$", "$(x_i-1)e^{-x_i}$", "Errorea"],
              en: ["$x_i$", "$y_i$", "$(x_i-1)e^{-x_i}$", "Error"]
            },
            rows: [
              ["0.0", "−0.99999966", "−1.00000000", "$3.40\\cdot10^{-7}$"],
              ["0.2", "−0.65498805", "−0.65498460", "$3.45\\cdot10^{-6}$"],
              ["0.4", "−0.40219748", "−0.40219203", "$5.45\\cdot10^{-6}$"],
              ["0.6", "−0.21953095", "−0.21952465", "$6.30\\cdot10^{-6}$"],
              ["0.8", "−0.08987224", "−0.08986579", "$6.44\\cdot10^{-6}$"],
              ["1.0", "−0.00000621", "0.00000000", "$6.21\\cdot10^{-6}$"]
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-disparo-secante",
    category: "Problemas de frontera",
    level: "medio",
    searchIntent: "ejercicio resuelto disparo no lineal secante iteraciones y=x^2+16/x",
    title: {
      es: "Ejercicio: disparo no lineal con secante",
      eu: "Ariketa: jaurtiketa ez-lineala sekantearekin",
      en: "Exercise: nonlinear shooting with the secant"
    },
    description: {
      es: "$y''=\\frac18(32+2x^3-yy')$, $y(1)=17$, $y(3)=\\frac{43}3$ con RK4, $h=0.1$ y tolerancia $10^{-5}$: cada iteración de la secante, el valor final de $t$ y los errores frente a $x^2+\\frac{16}x$.",
      eu: "$y''=\\frac18(32+2x^3-yy')$, $y(1)=17$, $y(3)=\\frac{43}3$, RK4, $h=0.1$ eta $10^{-5}$ tolerantzia erabiliz: sekantearen iterazio bakoitza, $t$-ren azken balioa eta erroreak $x^2+\\frac{16}x$-rekiko.",
      en: "$y''=\\frac18(32+2x^3-yy')$, $y(1)=17$, $y(3)=\\frac{43}3$ with RK4, $h=0.1$ and tolerance $10^{-5}$: each secant iteration, the final $t$ and the errors against $x^2+\\frac{16}x$."
    },
    keywords: ["ejercicio", "disparo no lineal", "secante", "RK4"],
    prerequisites: ["frontera-disparo-no-lineal"],
    related: ["ejercicio-disparo-newton", "ejercicio-secante-a-mano"],
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
            statement: {
              es: "Resolver $y''=\\frac18(32+2x^3-yy')$, $x\\in[1,3]$, $y(1)=17$, $y(3)=\\frac{43}3$ por disparo con secante, $h=0.1$ (20 subintervalos) y $\\text{tol}=10^{-5}$. Solución exacta: $y=x^2+\\frac{16}x$.",
              eu: "Ebatzi $y''=\\frac18(32+2x^3-yy')$, $x\\in[1,3]$, $y(1)=17$, $y(3)=\\frac{43}3$ sekantedun jaurtiketaz, $h=0.1$ (20 azpitarte) eta $\\text{tol}=10^{-5}$ hartuta. Soluzio zehatza: $y=x^2+\\frac{16}x$.",
              en: "Solve $y''=\\frac18(32+2x^3-yy')$, $x\\in[1,3]$, $y(1)=17$, $y(3)=\\frac{43}3$ by secant shooting, $h=0.1$ (20 subintervals) and $\\text{tol}=10^{-5}$. Exact solution: $y=x^2+\\frac{16}x$."
            },
            steps: [
              {
                text: {
                  es: "PVI con parámetro, en forma de sistema: $y_1'=y_2$, $y_2'=\\frac18(32+2x^3-y_1y_2)$, $y_1(1)=17$, $y_2(1)=t$.",
                  eu: "Parametrodun HBPa, sistema moduan: $y_1'=y_2$, $y_2'=\\frac18(32+2x^3-y_1y_2)$, $y_1(1)=17$, $y_2(1)=t$.",
                  en: "Parametrized IVP as a system: $y_1'=y_2$, $y_2'=\\frac18(32+2x^3-y_1y_2)$, $y_1(1)=17$, $y_2(1)=t$."
                }
              },
              {
                text: {
                  es: "Disparos iniciales: $t_0=0$ da $y(t_0,3)=21.018500$ y $t_1=\\frac{43/3-17}{2}=-1.333333$ da $y(t_1,3)=20.479202$. Ambos se pasan del objetivo $14.333333$.",
                  eu: "Hasierako jaurtiketak: $t_0=0$-k $y(t_0,3)=21.018500$ ematen du eta $t_1=\\frac{43/3-17}{2}=-1.333333$-k $y(t_1,3)=20.479202$. Biek gainditzen dute $14.333333$ helburua.",
                  en: "Initial shots: $t_0=0$ gives $y(t_0,3)=21.018500$ and $t_1=\\frac{43/3-17}{2}=-1.333333$ gives $y(t_1,3)=20.479202$. Both overshoot the target $14.333333$."
                }
              },
              {
                text: {
                  es: "Primera secante (extrapola, porque ambos $F$ son positivos):",
                  eu: "Lehen sekantea (estrapolatu egiten du, bi $F$-ak positiboak direlako):",
                  en: "First secant (it extrapolates, since both $F$ are positive):"
                },
                formula: "t_2=-1.333333-\\frac{(20.479202-14.333333)(-1.333333-0)}{20.479202-21.018500}=-1.333333-15.194751=-16.528084"
              },
              {
                text: {
                  es: "$y(t_2,3)=12.768939$: ahora se queda corto. Las siguientes iteraciones encierran la raíz:",
                  eu: "$y(t_2,3)=12.768939$: orain motz geratzen da. Hurrengo iterazioek erroa inguratzen dute:",
                  en: "$y(t_2,3)=12.768939$: now it falls short. The next iterations close in on the root:"
                }
              }
            ],
            result: {
              text: {
                es: "Tras 6 iteraciones, $t_6=-14.000192$ con $|F(t_6)|=8.9\\cdot10^{-8}<10^{-5}$. La pendiente exacta es $y'(1)=2-16=-14$; la diferencia $1.9\\cdot10^{-4}$ es error de RK4, no de la secante.",
                eu: "6 iterazioren ondoren, $t_6=-14.000192$, $|F(t_6)|=8.9\\cdot10^{-8}<10^{-5}$ izanik. Malda zehatza $y'(1)=2-16=-14$ da; $1.9\\cdot10^{-4}$-ko aldea RK4ren errorea da, ez sekantearena.",
                en: "After 6 iterations, $t_6=-14.000192$ with $|F(t_6)|=8.9\\cdot10^{-8}<10^{-5}$. The exact slope is $y'(1)=2-16=-14$; the $1.9\\cdot10^{-4}$ difference is RK4 error, not secant error."
              }
            }
          },
          {
            kind: "table",
            head: {
              es: ["$k$", "$t_k$", "$y(t_k,3)$", "$F(t_k)$"],
              eu: ["$k$", "$t_k$", "$y(t_k,3)$", "$F(t_k)$"],
              en: ["$k$", "$t_k$", "$y(t_k,3)$", "$F(t_k)$"]
            },
            rows: [
              ["0", "0", "21.018500", "6.685167"],
              ["1", "−1.333333", "20.479202", "6.145869"],
              ["2", "−16.528084", "12.768939", "−1.564395"],
              ["3", "−13.445105", "14.656332", "0.322998"],
              ["4", "−13.972710", "14.349485", "0.016152"],
              ["5", "−14.000481", "14.333163", "$-1.70\\cdot10^{-4}$"],
              ["6", "−14.000192", "14.333333", "$8.93\\cdot10^{-8}$"]
            ]
          },
          {
            kind: "table",
            head: {
              es: ["$x_i$", "$y_i$", "$y(x_i)$", "Error"],
              eu: ["$x_i$", "$y_i$", "$y(x_i)$", "Errorea"],
              en: ["$x_i$", "$y_i$", "$y(x_i)$", "Error"]
            },
            rows: [
              ["1.0", "17.000000", "17.000000", "0"],
              ["1.2", "14.773391", "14.773333", "$5.79\\cdot10^{-5}$"],
              ["1.4", "13.388632", "13.388571", "$6.04\\cdot10^{-5}$"],
              ["1.6", "12.560051", "12.560000", "$5.07\\cdot10^{-5}$"],
              ["1.8", "12.128928", "12.128889", "$3.93\\cdot10^{-5}$"],
              ["2.0", "12.000029", "12.000000", "$2.90\\cdot10^{-5}$"],
              ["2.2", "12.112748", "12.112727", "$2.03\\cdot10^{-5}$"],
              ["2.4", "12.426680", "12.426667", "$1.33\\cdot10^{-5}$"],
              ["2.6", "12.913854", "12.913846", "$7.72\\cdot10^{-6}$"],
              ["2.8", "13.554289", "13.554286", "$3.38\\cdot10^{-6}$"],
              ["3.0", "14.333333", "14.333333", "$8.93\\cdot10^{-8}$"]
            ],
            caption: {
              es: "Error máximo $6.2\\cdot10^{-5}$. La gráfica de $F(t)$ con los iterados está en [[frontera-disparo-no-lineal]].",
              eu: "Errore maximoa $6.2\\cdot10^{-5}$. $F(t)$-ren grafikoa iteratuekin [[frontera-disparo-no-lineal]] orrian dago.",
              en: "Maximum error $6.2\\cdot10^{-5}$. The plot of $F(t)$ with the iterates is in [[frontera-disparo-no-lineal]]."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-disparo-newton",
    category: "Problemas de frontera",
    level: "avanzado",
    searchIntent: "ejercicio resuelto disparo newton ecuacion variacional iteraciones",
    title: {
      es: "Ejercicio: disparo con Newton y ecuación variacional",
      eu: "Ariketa: jaurtiketa Newtonekin eta ekuazio bariazionalarekin",
      en: "Exercise: Newton shooting with the variational equation"
    },
    description: {
      es: "El mismo problema $y''=\\frac18(32+2x^3-yy')$ resuelto con Newton: la ecuación variacional, el sistema de cuatro EDO, cada iteración y la comparación con la secante.",
      eu: "$y''=\\frac18(32+2x^3-yy')$ problema bera Newtonekin ebatzita: ekuazio bariazionala, lau EDOko sistema, iterazio bakoitza eta sekantearekiko alderaketa.",
      en: "The same problem $y''=\\frac18(32+2x^3-yy')$ solved with Newton: the variational equation, the four-ODE system, each iteration and the comparison with the secant."
    },
    keywords: ["ejercicio", "disparo Newton", "ecuación variacional", "convergencia cuadrática"],
    prerequisites: ["frontera-disparo-newton"],
    related: ["ejercicio-disparo-secante", "deduccion-ecuacion-variacional"],
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
            statement: {
              es: "Resolver $y''=\\frac18(32+2x^3-yy')$, $y(1)=17$, $y(3)=\\frac{43}3$ por disparo con Newton, $h=0.1$, $t_0=0$ y tolerancia $10^{-8}$.",
              eu: "Ebatzi $y''=\\frac18(32+2x^3-yy')$, $y(1)=17$, $y(3)=\\frac{43}3$ Newtondun jaurtiketaz, $h=0.1$, $t_0=0$ eta $10^{-8}$ tolerantzia hartuta.",
              en: "Solve $y''=\\frac18(32+2x^3-yy')$, $y(1)=17$, $y(3)=\\frac{43}3$ by Newton shooting, $h=0.1$, $t_0=0$ and tolerance $10^{-8}$."
            },
            steps: [
              {
                text: {
                  es: "Derivadas parciales de $f(x,y,y')=\\frac18(32+2x^3-yy')$:",
                  eu: "$f(x,y,y')=\\frac18(32+2x^3-yy')$-ren deribatu partzialak:",
                  en: "Partial derivatives of $f(x,y,y')=\\frac18(32+2x^3-yy')$:"
                },
                formula: "f_y=-\\frac{y'}8,\\qquad f_{y'}=-\\frac y8\\qquad\\Longrightarrow\\qquad z''=-\\frac18\\bigl(y'\\,z+y\\,z'\\bigr),\\quad z(1)=0,\\; z'(1)=1"
              },
              {
                text: {
                  es: "Sistema de cuatro ecuaciones con $(y_1,y_2,y_3,y_4)=(y,y',z,z')$:",
                  eu: "Lau ekuazioko sistema, $(y_1,y_2,y_3,y_4)=(y,y',z,z')$ izanik:",
                  en: "Four-equation system with $(y_1,y_2,y_3,y_4)=(y,y',z,z')$:"
                },
                formula: "y_1'=y_2,\\quad y_2'=\\tfrac18(32+2x^3-y_1y_2),\\quad y_3'=y_4,\\quad y_4'=-\\tfrac18(y_2y_3+y_1y_4)"
              },
              {
                text: {
                  es: "Iteración 0, con datos $(17,0,0,1)$: $y_1(3)=21.018500$, así que $F(t_0)=6.685167$, y $y_3(3)=0.398936$. Paso de Newton:",
                  eu: "0. iterazioa, $(17,0,0,1)$ datuekin: $y_1(3)=21.018500$; beraz, $F(t_0)=6.685167$, eta $y_3(3)=0.398936$. Newtonen urratsa:",
                  en: "Iteration 0, with data $(17,0,0,1)$: $y_1(3)=21.018500$, so $F(t_0)=6.685167$, and $y_3(3)=0.398936$. Newton step:"
                },
                formula: "t_1=0-\\frac{6.685167}{0.398936}=-16.757472"
              },
              {
                text: {
                  es: "El resto de iteraciones sigue el mismo esquema; $z(3)=F'(t)$ se estabiliza en $0.588017$ (una diferencia finita de $F$ en $t=-14$ da $0.588012$, confirmando la ecuación variacional).",
                  eu: "Gainerako iterazioek eskema berari jarraitzen diote; $z(3)=F'(t)$ $0.588017$-n egonkortzen da ($F$-ren diferentzia finitu batek $t=-14$-n $0.588012$ ematen du, ekuazio bariazionala baieztatuz).",
                  en: "The remaining iterations follow the same pattern; $z(3)=F'(t)$ settles at $0.588017$ (a finite difference of $F$ at $t=-14$ gives $0.588012$, confirming the variational equation)."
                }
              }
            ],
            result: {
              text: {
                es: "En 4 iteraciones $t_4=-14.000192$ con $|F(t_4)|=2.4\\cdot10^{-9}$. Los valores nodales coinciden con los de la secante en seis cifras (error máximo $6.0\\cdot10^{-5}$, dominado por RK4).",
                eu: "4 iteraziotan $t_4=-14.000192$, $|F(t_4)|=2.4\\cdot10^{-9}$ izanik. Nodoetako balioak sekantearenekin bat datoz sei zifratan (errore maximoa $6.0\\cdot10^{-5}$, RK4k menderatua).",
                en: "In 4 iterations $t_4=-14.000192$ with $|F(t_4)|=2.4\\cdot10^{-9}$. The nodal values agree with the secant's to six digits (maximum error $6.0\\cdot10^{-5}$, dominated by RK4)."
              }
            }
          },
          {
            kind: "table",
            head: {
              es: ["$k$", "$t_k$", "$F(t_k)$", "$z(t_k,3)$"],
              eu: ["$k$", "$t_k$", "$F(t_k)$", "$z(t_k,3)$"],
              en: ["$k$", "$t_k$", "$F(t_k)$", "$z(t_k,3)$"]
            },
            rows: [
              ["0", "0", "6.685167", "0.398936"],
              ["1", "−16.757472", "−1.714803", "0.659053"],
              ["2", "−14.155553", "−0.091627", "0.591532"],
              ["3", "−14.000655", "$-2.72\\cdot10^{-4}$", "0.588027"],
              ["4", "−14.000192", "$-2.41\\cdot10^{-9}$", "0.588017"]
            ],
            caption: {
              es: "De $10^{-4}$ a $10^{-9}$ en una iteración: el número de cifras correctas se duplica (convergencia cuadrática). Comparación gráfica con la secante en [[frontera-disparo-newton]].",
              eu: "$10^{-4}$-tik $10^{-9}$-ra iterazio batean: zifra zuzenen kopurua bikoizten da (konbergentzia koadratikoa). Sekantearekiko alderaketa grafikoa: [[frontera-disparo-newton]].",
              en: "From $10^{-4}$ to $10^{-9}$ in one iteration: the number of correct digits doubles (quadratic convergence). Graphical comparison with the secant in [[frontera-disparo-newton]]."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-disparo-newton-robin",
    category: "Problemas de frontera",
    level: "avanzado",
    searchIntent: "ejercicio temperatura anillo condiciones robin disparo newton",
    title: {
      es: "Ejercicio: temperatura en un anillo (Newton, condiciones naturales)",
      eu: "Ariketa: eraztun bateko tenperatura (Newton, baldintza naturalak)",
      en: "Exercise: temperature in an annulus (Newton, natural conditions)"
    },
    description: {
      es: "$ru''+u'=0$ con $u(1)+u'(1)=1-\\frac1{2\\ln3}$ y $u(3)+u'(3)=\\frac12-\\frac1{6\\ln3}$: parametrización $u(1)=t$, datos de la ecuación variacional y convergencia en una iteración.",
      eu: "$ru''+u'=0$, $u(1)+u'(1)=1-\\frac1{2\\ln3}$ eta $u(3)+u'(3)=\\frac12-\\frac1{6\\ln3}$ baldintzekin: $u(1)=t$ parametrizazioa, ekuazio bariazionalaren datuak eta konbergentzia iterazio batean.",
      en: "$ru''+u'=0$ with $u(1)+u'(1)=1-\\frac1{2\\ln3}$ and $u(3)+u'(3)=\\frac12-\\frac1{6\\ln3}$: parametrization $u(1)=t$, variational-equation data and convergence in one iteration."
    },
    keywords: ["ejercicio", "condiciones de Robin", "disparo Newton", "temperatura", "anillo"],
    prerequisites: ["frontera-disparo-newton"],
    related: ["frontera-disparo-lineal-condiciones-generales", "ejercicio-disparo-robin-lineal"],
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
            statement: {
              es: "La temperatura en un anillo de radios 1 y 3 cumple $ru''+u'=0$ con $u(1)+u'(1)=\\alpha$ y $u(3)+u'(3)=\\beta$, donde $\\alpha=1-\\frac1{2\\ln3}=0.54488039$ y $\\beta=\\frac12-\\frac1{6\\ln3}=0.34829346$. Resolver con Newton, 10 subintervalos y tolerancia $10^{-7}$. Exacta: $u=1-\\frac{\\ln r}{2\\ln3}$.",
              eu: "1 eta 3 erradioko eraztun bateko tenperaturak $ru''+u'=0$ betetzen du, $u(1)+u'(1)=\\alpha$ eta $u(3)+u'(3)=\\beta$ baldintzekin, non $\\alpha=1-\\frac1{2\\ln3}=0.54488039$ eta $\\beta=\\frac12-\\frac1{6\\ln3}=0.34829346$. Ebatzi Newtonekin, 10 azpitarterekin eta $10^{-7}$ tolerantziarekin. Zehatza: $u=1-\\frac{\\ln r}{2\\ln3}$.",
              en: "The temperature in an annulus of radii 1 and 3 satisfies $ru''+u'=0$ with $u(1)+u'(1)=\\alpha$ and $u(3)+u'(3)=\\beta$, where $\\alpha=1-\\frac1{2\\ln3}=0.54488039$ and $\\beta=\\frac12-\\frac1{6\\ln3}=0.34829346$. Solve with Newton, 10 subintervals and tolerance $10^{-7}$. Exact: $u=1-\\frac{\\ln r}{2\\ln3}$."
            },
            steps: [
              {
                text: {
                  es: "Parametrización que cumple la condición izquierda para todo $t$: $u(1)=t$, $u'(1)=\\alpha-t$. La ecuación es $u''=-\\frac1ru'$.",
                  eu: "Ezkerreko baldintza $t$ guztietarako betetzen duen parametrizazioa: $u(1)=t$, $u'(1)=\\alpha-t$. Ekuazioa $u''=-\\frac1ru'$ da.",
                  en: "Parametrization satisfying the left condition for every $t$: $u(1)=t$, $u'(1)=\\alpha-t$. The equation is $u''=-\\frac1ru'$."
                }
              },
              {
                text: {
                  es: "Ecuación variacional: $f_u=0$ y $f_{u'}=-\\frac1r$, luego $z''=-\\frac1rz'$. Datos: derivadas de $(t,\\,\\alpha-t)$ respecto de $t$, es decir $z(1)=1$, $z'(1)=-1$.",
                  eu: "Ekuazio bariazionala: $f_u=0$ eta $f_{u'}=-\\frac1r$; beraz, $z''=-\\frac1rz'$. Datuak: $(t,\\,\\alpha-t)$-ren deribatuak $t$-rekiko, hau da, $z(1)=1$, $z'(1)=-1$.",
                  en: "Variational equation: $f_u=0$ and $f_{u'}=-\\frac1r$, so $z''=-\\frac1rz'$. Data: $t$-derivatives of $(t,\\,\\alpha-t)$, i.e. $z(1)=1$, $z'(1)=-1$."
                }
              },
              {
                text: {
                  es: "Función de fallo y su derivada:",
                  eu: "Huts-funtzioa eta haren deribatua:",
                  en: "Miss function and its derivative:"
                },
                formula: "F(t)=u(3,t)+u'(3,t)-\\beta,\\qquad F'(t)=z(3,t)+z'(3,t)"
              },
              {
                text: {
                  es: "Con $t_0=\\frac{\\beta-\\alpha}{b-a}=-0.09829346$, RK4 da $u(3)=0.60829609$, $u'(3)=0.21439128$, $z(3)=-0.09859808$, $z'(3)=-0.33333333$. Así $F(t_0)=0.47439391$ y $F'(t_0)=-0.43193141$:",
                  eu: "$t_0=\\frac{\\beta-\\alpha}{b-a}=-0.09829346$ hartuta, RK4k $u(3)=0.60829609$, $u'(3)=0.21439128$, $z(3)=-0.09859808$, $z'(3)=-0.33333333$ ematen ditu. Beraz, $F(t_0)=0.47439391$ eta $F'(t_0)=-0.43193141$:",
                  en: "With $t_0=\\frac{\\beta-\\alpha}{b-a}=-0.09829346$, RK4 gives $u(3)=0.60829609$, $u'(3)=0.21439128$, $z(3)=-0.09859808$, $z'(3)=-0.33333333$. Thus $F(t_0)=0.47439391$ and $F'(t_0)=-0.43193141$:"
                },
                formula: "t_1=-0.09829346-\\frac{0.47439391}{-0.43193141}=1.00001497"
              },
              {
                text: {
                  es: "En $t_1$ el residuo es $|F(t_1)|\\approx6\\cdot10^{-17}$: la ecuación es lineal, $F$ es afín y un paso de Newton basta.",
                  eu: "$t_1$-en hondarra $|F(t_1)|\\approx6\\cdot10^{-17}$ da: ekuazioa lineala da, $F$ afina da eta Newtonen urrats bat nahikoa da.",
                  en: "At $t_1$ the residual is $|F(t_1)|\\approx6\\cdot10^{-17}$: the equation is linear, $F$ is affine and one Newton step suffices."
                }
              }
            ],
            result: {
              text: {
                es: "$u(1)\\approx1.0000150$ (exacto $1$). Error máximo en los nodos $1.6\\cdot10^{-5}$ con $h=0.2$.",
                eu: "$u(1)\\approx1.0000150$ (zehatza $1$). Nodoetako errore maximoa $1.6\\cdot10^{-5}$, $h=0.2$ izanik.",
                en: "$u(1)\\approx1.0000150$ (exact $1$). Maximum nodal error $1.6\\cdot10^{-5}$ with $h=0.2$."
              }
            }
          },
          {
            kind: "table",
            head: {
              es: ["$r_i$", "$u_i$", "$u(r_i)$", "Error"],
              eu: ["$r_i$", "$u_i$", "$u(r_i)$", "Errorea"],
              en: ["$r_i$", "$u_i$", "$u(r_i)$", "Error"]
            },
            rows: [
              ["1.0", "1.0000150", "1.0000000", "$1.50\\cdot10^{-5}$"],
              ["1.4", "0.8468797", "0.8468649", "$1.48\\cdot10^{-5}$"],
              ["1.8", "0.7324989", "0.7324868", "$1.21\\cdot10^{-5}$"],
              ["2.2", "0.6411670", "0.6411576", "$9.44\\cdot10^{-6}$"],
              ["2.6", "0.5651351", "0.5651280", "$7.07\\cdot10^{-6}$"],
              ["3.0", "0.5000050", "0.5000000", "$4.99\\cdot10^{-6}$"]
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-disparo-no-lineal-tres-problemas",
    category: "Problemas de frontera",
    level: "medio",
    searchIntent: "ejercicios disparo no lineal newton secante ln x 1/(x+1) x+1/x",
    title: {
      es: "Ejercicio: tres problemas no lineales con Newton y secante",
      eu: "Ariketa: hiru problema ez-lineal Newtonekin eta sekantearekin",
      en: "Exercise: three nonlinear problems with Newton and secant"
    },
    description: {
      es: "Tres problemas de frontera no lineales en $[1,2]$ con 20 subintervalos: iteraciones, pendiente final y error máximo. El tercero muestra por qué un mal $t_0$ puede costar muchas iteraciones.",
      eu: "Hiru muga-problema ez-lineal $[1,2]$-n, 20 azpitarterekin: iterazioak, azken malda eta errore maximoa. Hirugarrenak erakusten du zergatik $t_0$ txar batek iterazio asko kosta ditzakeen.",
      en: "Three nonlinear boundary value problems on $[1,2]$ with 20 subintervals: iterations, final slope and maximum error. The third shows why a poor $t_0$ can cost many iterations."
    },
    keywords: ["ejercicio", "disparo no lineal", "Newton", "secante", "comparativa"],
    prerequisites: ["frontera-disparo-newton"],
    related: ["ejercicio-disparo-secante", "ejercicio-disparo-newton"],
    sections: [
      {
        heading: {
          es: "Enunciados",
          eu: "Enuntziatuak",
          en: "Statements"
        },
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: {
              es: [
                "$y''=-(y')^2-y+\\ln x$, $y(1)=0$, $y(2)=\\ln2$. Exacta: $y=\\ln x$.",
                "$y''=y^3-yy'$, $y(1)=\\frac12$, $y(2)=\\frac13$. Exacta: $y=\\frac1{x+1}$.",
                "$y''=2y^3-6y-2x^3$, $y(1)=2$, $y(2)=\\frac52$. Exacta: $y=x+\\frac1x$."
              ],
              eu: [
                "$y''=-(y')^2-y+\\ln x$, $y(1)=0$, $y(2)=\\ln2$. Zehatza: $y=\\ln x$.",
                "$y''=y^3-yy'$, $y(1)=\\frac12$, $y(2)=\\frac13$. Zehatza: $y=\\frac1{x+1}$.",
                "$y''=2y^3-6y-2x^3$, $y(1)=2$, $y(2)=\\frac52$. Zehatza: $y=x+\\frac1x$."
              ],
              en: [
                "$y''=-(y')^2-y+\\ln x$, $y(1)=0$, $y(2)=\\ln2$. Exact: $y=\\ln x$.",
                "$y''=y^3-yy'$, $y(1)=\\frac12$, $y(2)=\\frac13$. Exact: $y=\\frac1{x+1}$.",
                "$y''=2y^3-6y-2x^3$, $y(1)=2$, $y(2)=\\frac52$. Exact: $y=x+\\frac1x$."
              ]
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Resolver cada uno con RK4, $h=0.05$, Newton desde $t_0=\\frac{\\beta-\\alpha}{b-a}$ y secante desde $t_0=0$, $t_1=\\frac{\\beta-\\alpha}{b-a}$, con tolerancia $10^{-10}$.",
              eu: "Ebatzi bakoitza RK4rekin, $h=0.05$, Newton $t_0=\\frac{\\beta-\\alpha}{b-a}$-tik eta sekantea $t_0=0$, $t_1=\\frac{\\beta-\\alpha}{b-a}$-tik abiatuta, $10^{-10}$ tolerantziarekin.",
              en: "Solve each with RK4, $h=0.05$, Newton from $t_0=\\frac{\\beta-\\alpha}{b-a}$ and secant from $t_0=0$, $t_1=\\frac{\\beta-\\alpha}{b-a}$, with tolerance $10^{-10}$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Resolución",
          eu: "Ebazpena",
          en: "Solution"
        },
        blocks: [
          {
            kind: "example",
            statement: {
              es: "Derivadas para la ecuación variacional $z''=f_yz+f_{y'}z'$ de cada problema:",
              eu: "Problema bakoitzaren $z''=f_yz+f_{y'}z'$ ekuazio bariazionalerako deribatuak:",
              en: "Derivatives for each problem's variational equation $z''=f_yz+f_{y'}z'$:"
            },
            steps: [
              {
                text: {
                  es: "(1) $f=-(y')^2-y+\\ln x$: $f_y=-1$, $f_{y'}=-2y'$.",
                  eu: "(1) $f=-(y')^2-y+\\ln x$: $f_y=-1$, $f_{y'}=-2y'$.",
                  en: "(1) $f=-(y')^2-y+\\ln x$: $f_y=-1$, $f_{y'}=-2y'$."
                }
              },
              {
                text: {
                  es: "(2) $f=y^3-yy'$: $f_y=3y^2-y'$, $f_{y'}=-y$.",
                  eu: "(2) $f=y^3-yy'$: $f_y=3y^2-y'$, $f_{y'}=-y$.",
                  en: "(2) $f=y^3-yy'$: $f_y=3y^2-y'$, $f_{y'}=-y$."
                }
              },
              {
                text: {
                  es: "(3) $f=2y^3-6y-2x^3$: $f_y=6y^2-6$, $f_{y'}=0$.",
                  eu: "(3) $f=2y^3-6y-2x^3$: $f_y=6y^2-6$, $f_{y'}=0$.",
                  en: "(3) $f=2y^3-6y-2x^3$: $f_y=6y^2-6$, $f_{y'}=0$."
                }
              },
              {
                text: {
                  es: "En el problema (3), $t_0=\\frac{5/2-2}{1}=0.5$ da $F(t_0)=1779.13$: el término $2y^3$ hace que una pendiente un poco alta dispare la trayectoria. Newton avanza con pasos cortos ($0.5\\to0.486\\to0.468\\to\\dots$) hasta entrar en la zona de convergencia rápida, y necesita 12 iteraciones. La secante empieza en $t_0=0$, que ya está cerca de la raíz, y converge en 4.",
                  eu: "(3) problemaren kasuan, $t_0=\\frac{5/2-2}{1}=0.5$-ek $F(t_0)=1779.13$ ematen du: $2y^3$ gaiaren eraginez, malda pixka bat altuegi batek ibilbidea jaurti egiten du. Newtonek urrats laburrekin egiten du aurrera ($0.5\\to0.486\\to0.468\\to\\dots$) konbergentzia azkarreko eremuan sartu arte, eta 12 iterazio behar ditu. Sekantea $t_0=0$-tik hasten da, errotik hurbil dagoena, eta 4tan konbergitzen du.",
                  en: "In problem (3), $t_0=\\frac{5/2-2}{1}=0.5$ gives $F(t_0)=1779.13$: the $2y^3$ term makes a slightly too high slope shoot the trajectory up. Newton advances with short steps ($0.5\\to0.486\\to0.468\\to\\dots$) until it enters the fast-convergence zone, and needs 12 iterations. The secant starts at $t_0=0$, which is already near the root, and converges in 4."
                }
              }
            ],
            result: {
              text: {
                es: "Moraleja: el orden 2 de Newton es **local**. Lejos de la raíz lo que manda es la calidad del valor inicial.",
                eu: "Ondorioa: Newtonen 2. ordena **lokala** da. Errotik urrun, hasierako balioaren kalitatea da nagusi.",
                en: "Moral: Newton's order 2 is **local**. Far from the root, the quality of the starting value is what matters."
              }
            }
          },
          {
            kind: "table",
            head: {
              es: ["", "$t_0$ Newton", "Iter. Newton", "Iter. secante", "$t^*$", "$y'(1)$ exacta", "Error máx."],
              eu: ["", "$t_0$ Newton", "Newton iter.", "Sekante iter.", "$t^*$", "$y'(1)$ zehatza", "Errore max."],
              en: ["", "Newton $t_0$", "Newton iter.", "Secant iter.", "$t^*$", "Exact $y'(1)$", "Max. error"]
            },
            rows: [
              ["(1)", "0.693147", "4", "5", "1.0000001", "1", "$1.30\\cdot10^{-8}$"],
              ["(2)", "−0.166667", "3", "4", "−0.2500000", "$-\\frac14$", "$3.06\\cdot10^{-9}$"],
              ["(3)", "0.5", "12", "4", "$2.2\\cdot10^{-6}$", "0", "$1.03\\cdot10^{-6}$"]
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-disparo-sensibilidad",
    category: "Problemas de frontera",
    level: "avanzado",
    searchIntent: "ejercicio disparo newton diverge sensibilidad condiciones robin no lineal sin x",
    title: {
      es: "Ejercicio: cuando el disparo explota (sensibilidad)",
      eu: "Ariketa: jaurtiketak eztanda egiten duenean (sentikortasuna)",
      en: "Exercise: when the shot blows up (sensitivity)"
    },
    description: {
      es: "$y''-xyy'+x\\cos(x)\\,y+\\sin x=0$ con $y(0)+y'(0)=1$, $y(\\pi)-2y'(\\pi)=2$: Newton desde $t_0=0$ diverge porque los disparos con pendiente algo mayor que 1 explotan; con un buen $t_0$ converge a $y=\\sin x$.",
      eu: "$y''-xyy'+x\\cos(x)\\,y+\\sin x=0$, $y(0)+y'(0)=1$, $y(\\pi)-2y'(\\pi)=2$ baldintzekin: Newton $t_0=0$-tik dibergentea da, 1 baino apur bat handiagoko maldako jaurtiketek eztanda egiten dutelako; $t_0$ on batekin $y=\\sin x$-ra konbergitzen du.",
      en: "$y''-xyy'+x\\cos(x)\\,y+\\sin x=0$ with $y(0)+y'(0)=1$, $y(\\pi)-2y'(\\pi)=2$: Newton from $t_0=0$ diverges because shots with slope slightly above 1 blow up; with a good $t_0$ it converges to $y=\\sin x$."
    },
    keywords: ["ejercicio", "sensibilidad", "divergencia", "disparo Newton", "Robin"],
    prerequisites: ["frontera-disparo-newton"],
    related: ["frontera-disparo-no-lineal", "frontera-disparo-orden-superior"],
    sections: [
      {
        heading: {
          es: "Planteamiento",
          eu: "Planteamendua",
          en: "Setting"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Despejando, $y''=f(x,y,y')=xyy'-x\\cos(x)\\,y-\\sin x$, en $[0,\\pi]$. Tomamos $t=y'(0)$ e $y(0)=1-t$ (así $y(0)+y'(0)=1$ siempre). Entonces:",
              eu: "Askatuz, $y''=f(x,y,y')=xyy'-x\\cos(x)\\,y-\\sin x$, $[0,\\pi]$-n. $t=y'(0)$ eta $y(0)=1-t$ hartzen ditugu (horrela $y(0)+y'(0)=1$ beti). Orduan:",
              en: "Solving for $y''$, $y''=f(x,y,y')=xyy'-x\\cos(x)\\,y-\\sin x$, on $[0,\\pi]$. Take $t=y'(0)$ and $y(0)=1-t$ (so $y(0)+y'(0)=1$ always). Then:"
            }
          },
          {
            kind: "formula",
            tex: "f_y=xy'-x\\cos x,\\quad f_{y'}=xy,\\quad z(0)=-1,\\; z'(0)=1,\\qquad F(t)=y(\\pi)-2y'(\\pi)-2,\\quad F'(t)=z(\\pi)-2z'(\\pi)"
          },
          {
            kind: "paragraph",
            text: {
              es: "Comprobación de la solución exacta $y=\\sin x$: $-\\sin x-x\\sin x\\cos x+x\\cos x\\sin x+\\sin x=0$, $y(0)+y'(0)=0+1$, $y(\\pi)-2y'(\\pi)=0+2$. La raíz buscada es $t^*=y'(0)=1$.",
              eu: "$y=\\sin x$ soluzio zehatzaren egiaztapena: $-\\sin x-x\\sin x\\cos x+x\\cos x\\sin x+\\sin x=0$, $y(0)+y'(0)=0+1$, $y(\\pi)-2y'(\\pi)=0+2$. Bilatzen den erroa $t^*=y'(0)=1$ da.",
              en: "Check of the exact solution $y=\\sin x$: $-\\sin x-x\\sin x\\cos x+x\\cos x\\sin x+\\sin x=0$, $y(0)+y'(0)=0+1$, $y(\\pi)-2y'(\\pi)=0+2$. The root we want is $t^*=y'(0)=1$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Lo que pasa con $t_0=0$",
          eu: "Zer gertatzen den $t_0=0$-rekin",
          en: "What happens with $t_0=0$"
        },
        blocks: [
          {
            kind: "table",
            head: {
              es: ["$t$", "0", "0.5", "0.75", "1", "1.25", "1.5"],
              eu: ["$t$", "0", "0.5", "0.75", "1", "1.25", "1.5"],
              en: ["$t$", "0", "0.5", "0.75", "1", "1.25", "1.5"]
            },
            rows: [
              ["$F(t)$", "−2.228", "−1.666", "−1.111", "$7.9\\cdot10^{-4}$", "$-6.5\\cdot10^{40}$", "$-9.3\\cdot10^{182}$"],
              ["$F'(t)$", "0.900", "1.546", "3.350", "−26.3", "$-5.6\\cdot10^{43}$", "$-1.6\\cdot10^{186}$"]
            ],
            caption: {
              es: "Función de fallo con RK4 y $h=\\pi/10$. A la izquierda de $t^*=1$ es suave; a la derecha, el término $xyy'$ realimenta el crecimiento y la solución del PVI explota antes de $x=\\pi$.",
              eu: "Huts-funtzioa RK4rekin eta $h=\\pi/10$ hartuta. $t^*=1$-en ezkerrean leuna da; eskuinean, $xyy'$ gaiak hazkundea elikatzen du eta HBParen soluzioak eztanda egiten du $x=\\pi$ baino lehen.",
              en: "Miss function with RK4 and $h=\\pi/10$. Left of $t^*=1$ it is smooth; to the right, the $xyy'$ term feeds the growth and the IVP solution blows up before $x=\\pi$."
            }
          },
          {
            kind: "plot",
            xLabel: "x",
            yLabel: "y(t, x)",
            yDomain: [-2, 4],
            series: sensitiveFan.map((shot, i) => ({
              label: {
                es: `$t=${shot.t}$`,
                eu: `$t=${shot.t}$`,
                en: `$t=${shot.t}$`
              },
              points: shot.points,
              tone: fanTones[i]
            })),
            caption: {
              es: "Disparos con $y(0)=1-t$, $y'(0)=t$ ($h=\\pi/160$). Con $t=1$ se obtiene $\\sin x$; con $t=1.05$ la curva ya se separa y termina en $y(\\pi)\\approx2.96$; con $t=1.1$, un 10 % más, explota hacia $x\\approx2.8$.",
              eu: "Jaurtiketak $y(0)=1-t$, $y'(0)=t$ datuekin ($h=\\pi/160$). $t=1$-ekin $\\sin x$ lortzen da; $t=1.05$-ekin kurba bereizten hasten da eta $y(\\pi)\\approx2.96$-n amaitzen da; $t=1.1$-ekin, % 10 gehiago, eztanda egiten du $x\\approx2.8$ inguruan.",
              en: "Shots with $y(0)=1-t$, $y'(0)=t$ ($h=\\pi/160$). With $t=1$ we get $\\sin x$; with $t=1.05$ the curve already peels away and ends at $y(\\pi)\\approx2.96$; with $t=1.1$, 10% more, it blows up around $x\\approx2.8$."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Newton desde $t_0=0$: $F(0)=-2.228$, $F'(0)=0.900$, así que $t_1=0+\\frac{2.228}{0.900}=2.475$. Con esa pendiente el PVI desborda la aritmética de coma flotante y el método se rompe. La secante tiene el mismo problema si un iterado cae a la derecha de 1.",
              eu: "Newton $t_0=0$-tik: $F(0)=-2.228$, $F'(0)=0.900$; beraz, $t_1=0+\\frac{2.228}{0.900}=2.475$. Malda horrekin HBPak koma higikorreko aritmetika gainezkatzen du eta metodoa hautsi egiten da. Sekanteak arazo bera du iteratu bat 1en eskuinera erortzen bada.",
              en: "Newton from $t_0=0$: $F(0)=-2.228$, $F'(0)=0.900$, so $t_1=0+\\frac{2.228}{0.900}=2.475$. With that slope the IVP overflows floating-point arithmetic and the method breaks down. The secant has the same problem if an iterate lands to the right of 1."
            }
          }
        ]
      },
      {
        heading: {
          es: "Cómo salvarlo",
          eu: "Nola salbatu",
          en: "How to rescue it"
        },
        blocks: [
          {
            kind: "example",
            statement: {
              es: "Tabulando $F$ se ve que la raíz está cerca de $t=1$ y que conviene acercarse desde la izquierda. Tomamos $t_0=0.8$.",
              eu: "$F$ taulan jarriz, erroa $t=1$-etik hurbil dagoela eta ezkerretik hurbiltzea komeni dela ikusten da. $t_0=0.8$ hartzen dugu.",
              en: "Tabulating $F$ shows that the root is near $t=1$ and that it is best approached from the left. Take $t_0=0.8$."
            },
            steps: [
              {
                text: {
                  es: "Iterados de Newton ($h=\\pi/10$): $0.8\\to1.016043\\to1.007138\\to1.001807\\to1.000164\\to1.0000309\\to1.0000301$, con $|F|$ bajando $0.92,\\;0.90,\\;0.26,\\;0.051,\\;3.6\\cdot10^{-3},\\;2.2\\cdot10^{-5},\\;8\\cdot10^{-10}$.",
                  eu: "Newtonen iteratuak ($h=\\pi/10$): $0.8\\to1.016043\\to1.007138\\to1.001807\\to1.000164\\to1.0000309\\to1.0000301$, $|F|$ jaisten doalarik: $0.92,\\;0.90,\\;0.26,\\;0.051,\\;3.6\\cdot10^{-3},\\;2.2\\cdot10^{-5},\\;8\\cdot10^{-10}$.",
                  en: "Newton iterates ($h=\\pi/10$): $0.8\\to1.016043\\to1.007138\\to1.001807\\to1.000164\\to1.0000309\\to1.0000301$, with $|F|$ falling $0.92,\\;0.90,\\;0.26,\\;0.051,\\;3.6\\cdot10^{-3},\\;2.2\\cdot10^{-5},\\;8\\cdot10^{-10}$."
                }
              },
              {
                text: {
                  es: "El primer paso cae justo a la derecha de 1, pero tan cerca que el disparo no llega a explotar; a partir de ahí la convergencia es cuadrática.",
                  eu: "Lehen urratsa 1en eskuinaldean erortzen da, baina hain hurbil non jaurtiketak ez duen eztanda egiten; hortik aurrera konbergentzia koadratikoa da.",
                  en: "The first step lands just right of 1, but so close that the shot does not blow up; from there on convergence is quadratic."
                }
              }
            ],
            result: {
              text: {
                es: "6 iteraciones, $t=1.0000301$. El error máximo es $3.2\\cdot10^{-4}$ (en $x=\\pi$): mucho mayor que en problemas estables con el mismo $h$, porque la inestabilidad amplifica el error de RK4 al avanzar.",
                eu: "6 iterazio, $t=1.0000301$. Errore maximoa $3.2\\cdot10^{-4}$ da ($x=\\pi$-n): $h$ bereko problema egonkorretan baino askoz handiagoa, ezegonkortasunak RK4ren errorea handitzen baitu aurrera egin ahala.",
                en: "6 iterations, $t=1.0000301$. The maximum error is $3.2\\cdot10^{-4}$ (at $x=\\pi$): much larger than for stable problems with the same $h$, because the instability amplifies the RK4 error as we march."
              }
            }
          },
          {
            kind: "table",
            head: {
              es: ["$N$", "$t^*$", "Error máx.", "Cociente"],
              eu: ["$N$", "$t^*$", "Errore max.", "Zatidura"],
              en: ["$N$", "$t^*$", "Max. error", "Ratio"]
            },
            rows: [
              ["10", "1.0000301", "$3.20\\cdot10^{-4}$", "—"],
              ["20", "1.0000024", "$1.89\\cdot10^{-5}$", "16.9"],
              ["40", "1.0000002", "$1.15\\cdot10^{-6}$", "16.5"],
              ["80", "1.00000001", "$7.03\\cdot10^{-8}$", "16.3"]
            ],
            caption: {
              es: "Refinando la malla el orden 4 se mantiene. Si el problema fuera aún más sensible, el remedio sería el disparo múltiple o las diferencias finitas ([[frontera-disparo-orden-superior]]).",
              eu: "Sarea finduz, 4. ordena mantentzen da. Problema are sentikorragoa balitz, konponbidea jaurtiketa anizkoitza edo diferentzia finituak lirateke ([[frontera-disparo-orden-superior]]).",
              en: "Refining the grid, order 4 is preserved. If the problem were even more sensitive, the remedy would be multiple shooting or finite differences ([[frontera-disparo-orden-superior]])."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-disparo-tercer-orden",
    category: "Problemas de frontera",
    level: "avanzado",
    searchIntent: "ejercicio disparo tercer orden newton x e^x",
    title: {
      es: "Ejercicio: disparo con Newton para una ecuación de tercer orden",
      eu: "Ariketa: Newtondun jaurtiketa hirugarren ordenako ekuazio baterako",
      en: "Exercise: Newton shooting for a third-order equation"
    },
    description: {
      es: "$\\frac1{3+x}y'''+y'y+e^{-x}y''=e^x+x+e^{2x}(x+x^2)+2$ con $y(0)=0$, $y'(0)+y''(0)=3$, $y''(1)=3e$: sistema de seis EDO, iteraciones y error frente a $xe^x$.",
      eu: "$\\frac1{3+x}y'''+y'y+e^{-x}y''=e^x+x+e^{2x}(x+x^2)+2$, $y(0)=0$, $y'(0)+y''(0)=3$, $y''(1)=3e$ baldintzekin: sei EDOko sistema, iterazioak eta errorea $xe^x$-rekiko.",
      en: "$\\frac1{3+x}y'''+y'y+e^{-x}y''=e^x+x+e^{2x}(x+x^2)+2$ with $y(0)=0$, $y'(0)+y''(0)=3$, $y''(1)=3e$: six-ODE system, iterations and error against $xe^x$."
    },
    keywords: ["ejercicio", "tercer orden", "disparo Newton", "ecuación variacional"],
    prerequisites: ["frontera-disparo-orden-superior"],
    related: ["ejercicio-disparo-hacia-atras-richardson", "deduccion-ecuacion-variacional"],
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
            statement: {
              es: "Aproximar la solución en $x=0.1,0.2,\\dots,1$ con Newton y 20 subintervalos, y compararla con $y=xe^x$.",
              eu: "Hurbildu soluzioa $x=0.1,0.2,\\dots,1$ puntuetan Newtonekin eta 20 azpitarterekin, eta alderatu $y=xe^x$-rekin.",
              en: "Approximate the solution at $x=0.1,0.2,\\dots,1$ with Newton and 20 subintervals, and compare with $y=xe^x$."
            },
            steps: [
              {
                text: {
                  es: "Despejando $y'''$, con $g(x)=e^x+x+e^{2x}(x+x^2)+2$:",
                  eu: "$y'''$ askatuz, $g(x)=e^x+x+e^{2x}(x+x^2)+2$ izanik:",
                  en: "Solving for $y'''$, with $g(x)=e^x+x+e^{2x}(x+x^2)+2$:"
                },
                formula: "y'''=f(x,y,y',y'')=(3+x)\\bigl(g(x)-y\\,y'-e^{-x}y''\\bigr)"
              },
              {
                text: {
                  es: "Parámetro: $t=y'(0)$ e $y''(0)=3-t$. Derivadas parciales: $f_y=-(3+x)y'$, $f_{y'}=-(3+x)y$, $f_{y''}=-(3+x)e^{-x}$. Datos variacionales: $z(0)=0$, $z'(0)=1$, $z''(0)=-1$.",
                  eu: "Parametroa: $t=y'(0)$ eta $y''(0)=3-t$. Deribatu partzialak: $f_y=-(3+x)y'$, $f_{y'}=-(3+x)y$, $f_{y''}=-(3+x)e^{-x}$. Datu bariazionalak: $z(0)=0$, $z'(0)=1$, $z''(0)=-1$.",
                  en: "Parameter: $t=y'(0)$ and $y''(0)=3-t$. Partial derivatives: $f_y=-(3+x)y'$, $f_{y'}=-(3+x)y$, $f_{y''}=-(3+x)e^{-x}$. Variational data: $z(0)=0$, $z'(0)=1$, $z''(0)=-1$."
                }
              },
              {
                text: {
                  es: "Función de fallo: $F(t)=y''(1)-3e$, con $F'(t)=z''(1)$. Iteraciones desde $t_0=0$:",
                  eu: "Huts-funtzioa: $F(t)=y''(1)-3e$, $F'(t)=z''(1)$ izanik. Iterazioak $t_0=0$-tik:",
                  en: "Miss function: $F(t)=y''(1)-3e$, with $F'(t)=z''(1)$. Iterations from $t_0=0$:"
                },
                formula: "\\begin{array}{c|c|c|c} k & t_k & F(t_k) & F'(t_k)\\\\ \\hline 0 & 0 & 3.18506 & -3.32751\\\\ 1 & 0.957190 & 0.128859 & -3.02006\\\\ 2 & 0.999858 & 3.93\\cdot10^{-4} & -3.00159\\\\ 3 & 0.99998900 & 3.7\\cdot10^{-9} & -3.00153\\\\ 4 & 0.99998900 & 5\\cdot10^{-15} & \\end{array}"
              }
            ],
            result: {
              text: {
                es: "$t=y'(0)\\approx0.999989$ (exacto $1$). Error máximo en $x=0.1,\\dots,1$: $4.05\\cdot10^{-6}$ en $x=0.7$. La gráfica de la solución está en [[frontera-disparo-orden-superior]].",
                eu: "$t=y'(0)\\approx0.999989$ (zehatza $1$). Errore maximoa $x=0.1,\\dots,1$ puntuetan: $4.05\\cdot10^{-6}$, $x=0.7$-n. Soluzioaren grafikoa [[frontera-disparo-orden-superior]] orrian dago.",
                en: "$t=y'(0)\\approx0.999989$ (exact $1$). Maximum error at $x=0.1,\\dots,1$: $4.05\\cdot10^{-6}$ at $x=0.7$. The solution plot is in [[frontera-disparo-orden-superior]]."
              }
            }
          },
          {
            kind: "table",
            head: {
              es: ["$x_i$", "$y_i$", "$x_ie^{x_i}$", "Error"],
              eu: ["$x_i$", "$y_i$", "$x_ie^{x_i}$", "Errorea"],
              en: ["$x_i$", "$y_i$", "$x_ie^{x_i}$", "Error"]
            },
            rows: [
              ["0.1", "0.11051617", "0.11051709", "$9.23\\cdot10^{-7}$"],
              ["0.3", "0.40495514", "0.40495764", "$2.50\\cdot10^{-6}$"],
              ["0.5", "0.82435699", "0.82436064", "$3.64\\cdot10^{-6}$"],
              ["0.7", "1.40962285", "1.40962690", "$4.05\\cdot10^{-6}$"],
              ["0.9", "2.21363961", "2.21364280", "$3.19\\cdot10^{-6}$"],
              ["1.0", "2.71827974", "2.71828183", "$2.09\\cdot10^{-6}$"]
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-disparo-hacia-atras-richardson",
    category: "Problemas de frontera",
    level: "avanzado",
    searchIntent: "ejercicio disparo hacia atras tercer orden richardson extrapolacion",
    title: {
      es: "Ejercicio: disparo hacia atrás y extrapolación de Richardson",
      eu: "Ariketa: atzerako jaurtiketa eta Richardsonen estrapolazioa",
      en: "Exercise: backward shooting and Richardson extrapolation"
    },
    description: {
      es: "$y'''=-6(y')^2-y''+2y^3$ con $y(-1)=\\frac12$, $y(0)=\\frac13$, $y'(0)=-\\frac19$: disparando desde $x=0$ basta un parámetro; Newton y mejora con Richardson para $h=0.1,0.05,0.025$.",
      eu: "$y'''=-6(y')^2-y''+2y^3$, $y(-1)=\\frac12$, $y(0)=\\frac13$, $y'(0)=-\\frac19$ baldintzekin: $x=0$-tik jaurtiz parametro bat nahikoa da; Newton eta Richardsonekin hobekuntza $h=0.1,0.05,0.025$ hartuta.",
      en: "$y'''=-6(y')^2-y''+2y^3$ with $y(-1)=\\frac12$, $y(0)=\\frac13$, $y'(0)=-\\frac19$: shooting from $x=0$ needs a single parameter; Newton and Richardson improvement for $h=0.1,0.05,0.025$."
    },
    keywords: ["ejercicio", "disparo hacia atrás", "Richardson", "tercer orden", "Newton"],
    prerequisites: ["frontera-disparo-orden-superior", "diferenciacion-richardson"],
    related: ["ejercicio-disparo-tercer-orden", "deduccion-richardson-orden"],
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
              es: "Newton desde el extremo derecho",
              eu: "Newton eskuineko muturretik",
              en: "Newton from the right end"
            },
            statement: {
              es: "En $x=0$ conocemos $y$ e $y'$; falta $y''(0)=t$. Integramos de $0$ a $-1$ con paso $-h$ y buscamos $F(t)=y(t,-1)-\\frac12=0$. Solución exacta: $y=\\frac1{x+3}$.",
              eu: "$x=0$-n $y$ eta $y'$ ezagutzen ditugu; $y''(0)=t$ falta da. $0$-tik $-1$-era integratzen dugu $-h$ pausoarekin eta $F(t)=y(t,-1)-\\frac12=0$ bilatzen dugu. Soluzio zehatza: $y=\\frac1{x+3}$.",
              en: "At $x=0$ we know $y$ and $y'$; $y''(0)=t$ is missing. Integrate from $0$ to $-1$ with step $-h$ and look for $F(t)=y(t,-1)-\\frac12=0$. Exact solution: $y=\\frac1{x+3}$."
            },
            steps: [
              {
                text: {
                  es: "Comprobación de la exacta: $y'=-(x+3)^{-2}$, $y''=2(x+3)^{-3}$, $y'''=-6(x+3)^{-4}$, y el lado derecho es $-6(x+3)^{-4}-2(x+3)^{-3}+2(x+3)^{-3}$. Luego $t^*=y''(0)=\\frac2{27}=0.0740741$.",
                  eu: "Zehatzaren egiaztapena: $y'=-(x+3)^{-2}$, $y''=2(x+3)^{-3}$, $y'''=-6(x+3)^{-4}$, eta eskuineko aldea $-6(x+3)^{-4}-2(x+3)^{-3}+2(x+3)^{-3}$ da. Beraz, $t^*=y''(0)=\\frac2{27}=0.0740741$.",
                  en: "Check of the exact solution: $y'=-(x+3)^{-2}$, $y''=2(x+3)^{-3}$, $y'''=-6(x+3)^{-4}$, and the right-hand side is $-6(x+3)^{-4}-2(x+3)^{-3}+2(x+3)^{-3}$. Hence $t^*=y''(0)=\\frac2{27}=0.0740741$."
                }
              },
              {
                text: {
                  es: "Ecuación variacional: $f_y=6y^2$, $f_{y'}=-12y'$, $f_{y''}=-1$, así que $z'''=6y^2z-12y'z'-z''$ con $z(0)=z'(0)=0$, $z''(0)=1$.",
                  eu: "Ekuazio bariazionala: $f_y=6y^2$, $f_{y'}=-12y'$, $f_{y''}=-1$; beraz, $z'''=6y^2z-12y'z'-z''$, $z(0)=z'(0)=0$, $z''(0)=1$ izanik.",
                  en: "Variational equation: $f_y=6y^2$, $f_{y'}=-12y'$, $f_{y''}=-1$, so $z'''=6y^2z-12y'z'-z''$ with $z(0)=z'(0)=0$, $z''(0)=1$."
                }
              },
              {
                text: {
                  es: "Newton con $h=0.1$ desde $t_0=0$: $F(0)=-0.0600792$, $z(-1)=0.793711$, $t_1=0.0756941$; después $t_2=0.0740757$ y $t_3=0.0740749$ con $|F|=1.4\\cdot10^{-13}$.",
                  eu: "Newton $h=0.1$-ekin $t_0=0$-tik: $F(0)=-0.0600792$, $z(-1)=0.793711$, $t_1=0.0756941$; ondoren $t_2=0.0740757$ eta $t_3=0.0740749$, $|F|=1.4\\cdot10^{-13}$ izanik.",
                  en: "Newton with $h=0.1$ from $t_0=0$: $F(0)=-0.0600792$, $z(-1)=0.793711$, $t_1=0.0756941$; then $t_2=0.0740757$ and $t_3=0.0740749$ with $|F|=1.4\\cdot10^{-13}$."
                }
              }
            ],
            result: {
              text: {
                es: "Error máximo en los nodos: $2.55\\cdot10^{-8}$ con $h=0.1$, $1.79\\cdot10^{-9}$ con $h=0.05$ y $1.19\\cdot10^{-10}$ con $h=0.025$ (cocientes $\\approx15$: orden 4).",
                eu: "Nodoetako errore maximoa: $2.55\\cdot10^{-8}$ $h=0.1$-ekin, $1.79\\cdot10^{-9}$ $h=0.05$-ekin eta $1.19\\cdot10^{-10}$ $h=0.025$-ekin (zatidurak $\\approx15$: 4. ordena).",
                en: "Maximum nodal error: $2.55\\cdot10^{-8}$ with $h=0.1$, $1.79\\cdot10^{-9}$ with $h=0.05$ and $1.19\\cdot10^{-10}$ with $h=0.025$ (ratios $\\approx15$: order 4)."
              }
            }
          },
          {
            kind: "example",
            title: {
              es: "Extrapolación de Richardson",
              eu: "Richardsonen estrapolazioa",
              en: "Richardson extrapolation"
            },
            statement: {
              es: "Como el error es $\\approx Kh^4$ en cada nodo común, la [[diferenciacion-richardson|extrapolación de Richardson]] combina dos mallas para cancelar el término principal.",
              eu: "Errorea nodo komun bakoitzean $\\approx Kh^4$ denez, [[diferenciacion-richardson|Richardsonen estrapolazioak]] bi sare konbinatzen ditu gai nagusia ezeztatzeko.",
              en: "Since the error is $\\approx Kh^4$ at each common node, [[diferenciacion-richardson|Richardson extrapolation]] combines two grids to cancel the leading term."
            },
            steps: [
              {
                text: {
                  es: "Si $y_h=y+Kh^4+\\dots$ e $y_{h/2}=y+K\\frac{h^4}{16}+\\dots$, eliminando $K$:",
                  eu: "$y_h=y+Kh^4+\\dots$ eta $y_{h/2}=y+K\\frac{h^4}{16}+\\dots$ badira, $K$ ezabatuz:",
                  en: "If $y_h=y+Kh^4+\\dots$ and $y_{h/2}=y+K\\frac{h^4}{16}+\\dots$, eliminating $K$:"
                },
                formula: "R=\\frac{16\\,y_{h/2}-y_h}{15}"
              },
              {
                text: {
                  es: "Con $h=0.1$ y $0.05$ en los nodos $x=0,-0.1,\\dots,-1$: el error máximo pasa de $1.79\\cdot10^{-9}$ (malla fina) a $2.11\\cdot10^{-10}$. Con $h=0.05$ y $0.025$: de $1.19\\cdot10^{-10}$ a $7.2\\cdot10^{-12}$.",
                  eu: "$h=0.1$ eta $0.05$ hartuta $x=0,-0.1,\\dots,-1$ nodoetan: errore maximoa $1.79\\cdot10^{-9}$-tik (sare fina) $2.11\\cdot10^{-10}$-ra jaisten da. $h=0.05$ eta $0.025$ hartuta: $1.19\\cdot10^{-10}$-etik $7.2\\cdot10^{-12}$-ra.",
                  en: "With $h=0.1$ and $0.05$ at the nodes $x=0,-0.1,\\dots,-1$: the maximum error drops from $1.79\\cdot10^{-9}$ (fine grid) to $2.11\\cdot10^{-10}$. With $h=0.05$ and $0.025$: from $1.19\\cdot10^{-10}$ to $7.2\\cdot10^{-12}$."
                }
              }
            ],
            result: {
              text: {
                es: "Richardson gana más de una cifra por combinación sin resolver ningún PVI nuevo. En $x=-0.8$, por ejemplo: $y_{0.1}$ tiene error $2.55\\cdot10^{-8}$ y $R(0.05,0.025)$ solo $7.2\\cdot10^{-12}$.",
                eu: "Richardsonek zifra bat baino gehiago irabazten du konbinazio bakoitzeko, HBP berririk ebatzi gabe. $x=-0.8$-n, adibidez: $y_{0.1}$-ek $2.55\\cdot10^{-8}$-ko errorea du eta $R(0.05,0.025)$-ek $7.2\\cdot10^{-12}$ bakarrik.",
                en: "Richardson gains more than one digit per combination without solving any new IVP. At $x=-0.8$, for instance: $y_{0.1}$ has error $2.55\\cdot10^{-8}$ and $R(0.05,0.025)$ only $7.2\\cdot10^{-12}$."
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: "ejercicio-disparo-viga",
    category: "Problemas de frontera",
    level: "avanzado",
    searchIntent: "ejercicio deformacion viga cuarto orden disparo superposicion",
    title: {
      es: "Ejercicio: deformación de una viga (orden 4)",
      eu: "Ariketa: habe baten deformazioa (4. ordena)",
      en: "Exercise: deflection of a beam (order 4)"
    },
    description: {
      es: "$EIw^{(4)}=p(x)-kw$ con $w=w''=0$ en $x=0$ y $x=L$: dos parámetros, tres PVI de cuarto orden y un sistema $2\\times2$. Flecha en el centro con 40 subintervalos.",
      eu: "$EIw^{(4)}=p(x)-kw$, $w=w''=0$ $x=0$ eta $x=L$ puntuetan: bi parametro, laugarren ordenako hiru HBP eta $2\\times2$ sistema bat. Gezia erdian 40 azpitarterekin.",
      en: "$EIw^{(4)}=p(x)-kw$ with $w=w''=0$ at $x=0$ and $x=L$: two parameters, three fourth-order IVPs and a $2\\times2$ system. Mid-span deflection with 40 subintervals."
    },
    keywords: ["ejercicio", "viga", "cuarto orden", "superposición", "flecha"],
    prerequisites: ["frontera-disparo-orden-superior"],
    related: ["frontera-disparo-lineal-condiciones-generales", "frontera-introduccion"],
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
            statement: {
              es: "Viga apoyada de longitud $L=10$ m con $E=30\\cdot10^6$, $I=2$, $k=1000$ y carga $p(x)=100\\left(1-\\frac{x}{36}\\right)$. Determinar $w(5)$ con disparo, RK4 y 40 subintervalos.",
              eu: "$L=10$ m luzerako habe bermatua, $E=30\\cdot10^6$, $I=2$, $k=1000$ eta $p(x)=100\\left(1-\\frac{x}{36}\\right)$ karga izanik. Zehaztu $w(5)$ jaurtiketaz, RK4rekin eta 40 azpitarterekin.",
              en: "Supported beam of length $L=10$ m with $E=30\\cdot10^6$, $I=2$, $k=1000$ and load $p(x)=100\\left(1-\\frac{x}{36}\\right)$. Find $w(5)$ by shooting, RK4 and 40 subintervals."
            },
            steps: [
              {
                text: {
                  es: "Sistema de primer orden con $(w_1,w_2,w_3,w_4)=(w,w',w'',w''')$: $w_1'=w_2$, $w_2'=w_3$, $w_3'=w_4$, $w_4'=\\frac{p(x)-kw_1}{EI}$, con $EI=6\\cdot10^7$. En $x=0$ conocemos $w_1=w_3=0$; faltan $s_1=w'(0)$ y $s_2=w'''(0)$.",
                  eu: "Lehen ordenako sistema, $(w_1,w_2,w_3,w_4)=(w,w',w'',w''')$ izanik: $w_1'=w_2$, $w_2'=w_3$, $w_3'=w_4$, $w_4'=\\frac{p(x)-kw_1}{EI}$, $EI=6\\cdot10^7$ izanik. $x=0$-n $w_1=w_3=0$ ezagutzen ditugu; $s_1=w'(0)$ eta $s_2=w'''(0)$ falta dira.",
                  en: "First-order system with $(w_1,w_2,w_3,w_4)=(w,w',w'',w''')$: $w_1'=w_2$, $w_2'=w_3$, $w_3'=w_4$, $w_4'=\\frac{p(x)-kw_1}{EI}$, with $EI=6\\cdot10^7$. At $x=0$ we know $w_1=w_3=0$; $s_1=w'(0)$ and $s_2=w'''(0)$ are missing."
                }
              },
              {
                text: {
                  es: "Tres PVI: $w_p$ (con carga, datos $(0,0,0,0)$), $\\varphi_1$ (sin carga, $(0,1,0,0)$) y $\\varphi_2$ (sin carga, $(0,0,0,1)$). Imponiendo $w(10)=0$ y $w''(10)=0$:",
                  eu: "Hiru HBP: $w_p$ (kargarekin, $(0,0,0,0)$ datuak), $\\varphi_1$ (kargarik gabe, $(0,1,0,0)$) eta $\\varphi_2$ (kargarik gabe, $(0,0,0,1)$). $w(10)=0$ eta $w''(10)=0$ ezarriz:",
                  en: "Three IVPs: $w_p$ (loaded, data $(0,0,0,0)$), $\\varphi_1$ (unloaded, $(0,1,0,0)$) and $\\varphi_2$ (unloaded, $(0,0,0,1)$). Imposing $w(10)=0$ and $w''(10)=0$:"
                },
                formula: "\\begin{pmatrix}9.98611188 & 166.633599\\\\ -2.77722665\\cdot10^{-3} & 9.98611188\\end{pmatrix}\\begin{pmatrix}s_1\\\\s_2\\end{pmatrix}=\\begin{pmatrix}6.55797448\\cdot10^{-4}\\\\ 7.55802360\\cdot10^{-5}\\end{pmatrix}"
              },
              {
                text: {
                  es: "Solución del sistema: $s_1=w'(0)=6.03416\\cdot10^{-5}$ y $s_2=w'''(0)=-7.55175\\cdot10^{-6}$. Con ellos $w=w_p+s_1\\varphi_1+s_2\\varphi_2$ en los 41 nodos.",
                  eu: "Sistemaren soluzioa: $s_1=w'(0)=6.03416\\cdot10^{-5}$ eta $s_2=w'''(0)=-7.55175\\cdot10^{-6}$. Haiekin $w=w_p+s_1\\varphi_1+s_2\\varphi_2$ 41 nodoetan.",
                  en: "Solution of the system: $s_1=w'(0)=6.03416\\cdot10^{-5}$ and $s_2=w'''(0)=-7.55175\\cdot10^{-6}$. With them, $w=w_p+s_1\\varphi_1+s_2\\varphi_2$ at the 41 nodes."
                }
              },
              {
                text: {
                  es: "Control de plausibilidad: sin el término $kw$, la flecha central de una viga apoyada con carga lineal coincide con la de una carga uniforme igual a la media, $\\bar p=p(5)=86.11$: $\\frac{5\\bar pL^4}{384EI}=1.8687\\cdot10^{-4}$ m. El apoyo elástico $kw$ la reduce ligeramente.",
                  eu: "Sinesgarritasun-kontrola: $kw$ gairik gabe, karga linealeko habe bermatu baten erdiko gezia batez besteko karga uniformearena bera da, $\\bar p=p(5)=86.11$: $\\frac{5\\bar pL^4}{384EI}=1.8687\\cdot10^{-4}$ m. $kw$ euskarri elastikoak apur bat txikitzen du.",
                  en: "Plausibility check: without the $kw$ term, the mid-span deflection of a supported beam under a linear load equals that of a uniform load equal to the mean, $\\bar p=p(5)=86.11$: $\\frac{5\\bar pL^4}{384EI}=1.8687\\cdot10^{-4}$ m. The elastic support $kw$ lowers it slightly."
                }
              }
            ],
            result: {
              text: {
                es: "$w(5)\\approx1.86553\\cdot10^{-4}$ m $\\approx0.187$ mm. Con 80 subintervalos cambia en menos de $10^{-12}$ m: el resultado es estable.",
                eu: "$w(5)\\approx1.86553\\cdot10^{-4}$ m $\\approx0.187$ mm. 80 azpitarterekin $10^{-12}$ m baino gutxiago aldatzen da: emaitza egonkorra da.",
                en: "$w(5)\\approx1.86553\\cdot10^{-4}$ m $\\approx0.187$ mm. With 80 subintervals it changes by less than $10^{-12}$ m: the result is stable."
              }
            }
          },
          {
            kind: "plot",
            xLabel: "x (m)",
            yLabel: "w (mm)",
            series: [
              {
                label: { es: "flecha $w(x)$", eu: "gezia $w(x)$", en: "deflection $w(x)$" },
                points: beamDeflection,
                tone: "accent",
                style: "line-points"
              }
            ],
            caption: {
              es: "Flecha a lo largo de la viga (40 subintervalos). La carga decrece hacia la derecha, pero la asimetría es tan pequeña que el máximo queda prácticamente en el centro.",
              eu: "Habearen gezia luzeran zehar (40 azpitarte). Karga eskuinerantz txikitzen da, baina asimetria hain txikia da non maximoa ia erdian geratzen den.",
              en: "Deflection along the beam (40 subintervals). The load decreases to the right, but the asymmetry is so small that the maximum stays practically at the centre."
            }
          }
        ]
      }
    ]
  }
];
