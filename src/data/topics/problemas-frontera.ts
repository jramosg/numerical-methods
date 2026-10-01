import type { CodeLink, ContentEntry } from "../content";
import {
  beamDeflection,
  convergenceHistory,
  linearOrder,
  linearShooting,
  nonlinearExact,
  nonlinearFan,
  nonlinearMiss,
  nonUniqueFamily,
  secantIterates,
  thirdOrderExact,
  thirdOrderNodes
} from "../numerics/shooting";

/**
 * One-dimensional boundary value problems and shooting methods: linear
 * shooting (Dirichlet and general linear conditions), nonlinear shooting with
 * secant and Newton (variational equation), higher-order problems.
 *
 * Every number was recomputed with RK4 (see src/data/numerics/shooting.ts).
 * Source corrections: the "λ1·y1 + λ2·y2" construction for Robin conditions
 * only holds when r(x) ≡ 0, so the general construction y1 + s·y2 is used;
 * table value y(1.7) = 1.6850 (not 1.5850); the Newton/Robin code restarts
 * with the Dirichlet initial data; the inconsistent third-order exercise with
 * exact solution x² + 16/x was dropped.
 */

const shootingColors = ["blue", "gold", "accent", "red"] as const;

const shootingRepo = "https://github.com/jramosg/shooting-methods-python";
const shootingNotebook = (name: string) =>
  `${shootingRepo}/blob/main/notebooks/${name}.ipynb`;

/** Python companion code, listed in the sidebar of the shooting articles. */
const repoLink: CodeLink = {
  href: shootingRepo,
  label: {
    es: "Repositorio: métodos de disparo en Python",
    eu: "Biltegia: jaurtiketa-metodoak Python-en",
    en: "Repository: shooting methods in Python"
  }
};
const linearNotebook: CodeLink = {
  href: shootingNotebook("01_disparo_lineal"),
  label: {
    es: "Cuaderno: disparo lineal",
    eu: "Koadernoa: jaurtiketa lineala (gaztelaniaz)",
    en: "Notebook: linear shooting (in Spanish)"
  }
};
const nonlinearNotebook: CodeLink = {
  href: shootingNotebook("02_disparo_no_lineal"),
  label: {
    es: "Cuaderno: disparo con secante y Newton",
    eu: "Koadernoa: jaurtiketa sekantearekin eta Newtonekin (gaztelaniaz)",
    en: "Notebook: secant and Newton shooting (in Spanish)"
  }
};
const convergenceNotebook: CodeLink = {
  href: shootingNotebook("03_convergencia"),
  label: {
    es: "Cuaderno: convergencia y comparación con solve_bvp",
    eu: "Koadernoa: konbergentzia eta solve_bvp-rekin alderaketa (gaztelaniaz)",
    en: "Notebook: convergence and comparison with solve_bvp (in Spanish)"
  }
};

export const fronteraArticles: ContentEntry[] = [
  {
    slug: "frontera-introduccion",
    category: "Problemas de frontera",
    level: "base",
    searchIntent: "problema de frontera contorno unidimensional valor inicial condiciones dirichlet naturales mixtas",
    title: {
      es: "Problemas de frontera unidimensionales",
      eu: "Dimentsio bakarreko muga-problemak",
      en: "One-dimensional boundary value problems"
    },
    description: {
      es: "Qué es un problema de contorno, en qué se diferencia de un problema de valor inicial, tipos de condiciones (Dirichlet, naturales, mixtas), linealidad, existencia y unicidad, y la idea del método de disparo.",
      eu: "Zer den muga-problema bat, hasierako balioko problematik zertan bereizten den, baldintza motak (Dirichlet, naturalak, mistoak), linealtasuna, existentzia eta bakartasuna, eta jaurtiketa-metodoaren ideia.",
      en: "What a boundary value problem is, how it differs from an initial value problem, types of conditions (Dirichlet, natural, mixed), linearity, existence and uniqueness, and the idea behind the shooting method."
    },
    keywords: [
      "problema de frontera",
      "problema de contorno",
      "boundary value problem",
      "condiciones Dirichlet",
      "condiciones de Robin",
      "método de disparo"
    ],
    prerequisites: ["edo-problemas-valor-inicial", "edo-metodo-runge-kutta"],
    related: [
      "frontera-disparo-lineal",
      "frontera-disparo-no-lineal",
      "frontera-disparo-newton",
      "frontera-disparo-orden-superior"
    ],
    code: [repoLink],
    sections: [
      {
        heading: {
          es: "Valor inicial frente a frontera",
          eu: "Hasierako balioa versus muga",
          en: "Initial value versus boundary value"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La incógnita de una ecuación diferencial no es un número sino una función completa $y(x)$ definida en un intervalo $[a,b]$. Una ecuación de segundo orden $y''=f(x,y,y')$ tiene una familia de soluciones con dos constantes libres, así que necesita **dos condiciones** para fijar una sola. Lo que distingue a los dos grandes tipos de problema es *dónde* se imponen esas condiciones.",
              eu: "Ekuazio diferentzial baten ezezaguna ez da zenbaki bat, $[a,b]$ tarte batean definitutako $y(x)$ funtzio osoa baizik. $y''=f(x,y,y')$ bigarren ordenako ekuazio batek bi konstante askeko soluzio-familia du; beraz, **bi baldintza** behar ditu soluzio bakarra finkatzeko. Bi problema mota nagusiak bereizten dituena baldintza horiek *non* ezartzen diren da.",
              en: "The unknown of a differential equation is not a number but a whole function $y(x)$ defined on an interval $[a,b]$. A second-order equation $y''=f(x,y,y')$ has a family of solutions with two free constants, so it needs **two conditions** to single one out. What separates the two big problem types is *where* those conditions are imposed."
            }
          },
          {
            kind: "formula",
            tex: "\\begin{cases} y''=f(x,y,y')\\\\ y(a)=\\alpha\\\\ y'(a)=s \\end{cases}\\qquad\\qquad \\begin{cases} y''=f(x,y,y')\\\\ y(a)=\\alpha\\\\ y(b)=\\beta \\end{cases}",
            caption: {
              es: "Izquierda: problema de valor inicial (PVI). Derecha: problema de valor en la frontera (PVF), también llamado problema de contorno.",
              eu: "Ezkerrean: hasierako balioko problema (HBP). Eskuinean: mugako balioko problema, muga-problema ere deitua.",
              en: "Left: initial value problem (IVP). Right: boundary value problem (BVP)."
            }
          },
          {
            kind: "callout",
            variant: "definition",
            title: {
              es: "Problema de frontera (o de contorno)",
              eu: "Muga-problema",
              en: "Boundary value problem"
            },
            text: {
              es: "Una ecuación diferencial cuyas condiciones están **repartidas entre los extremos** del intervalo donde varía la variable independiente. El número de condiciones coincide con el orden de la ecuación. El más sencillo es $y''=f(x,y,y')$, $x\\in[a,b]$, $y(a)=\\alpha$, $y(b)=\\beta$.",
              eu: "Aldagai independentea aldatzen den tartearen **muturren artean banatutako** baldintzak dituen ekuazio diferentziala. Baldintza kopurua ekuazioaren ordenaren berdina da. Sinpleena $y''=f(x,y,y')$, $x\\in[a,b]$, $y(a)=\\alpha$, $y(b)=\\beta$ da.",
              en: "A differential equation whose conditions are **split between the endpoints** of the interval where the independent variable lives. The number of conditions equals the order of the equation. The simplest one is $y''=f(x,y,y')$, $x\\in[a,b]$, $y(a)=\\alpha$, $y(b)=\\beta$."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "En un PVI sabemos dónde empieza la curva y con qué pendiente, y los métodos de [[edo-problemas-valor-inicial|valor inicial]] ([[edo-metodo-euler|Euler]], [[edo-metodo-runge-kutta|Runge-Kutta]], [[edo-adams-bashforth|Adams]]) avanzan paso a paso desde $x=a$. En un PVF conocemos los dos extremos $(a,\\alpha)$ y $(b,\\beta)$ pero **no la pendiente inicial**: la información de $x=b$ no se puede usar al arrancar, y ningún método de un paso sabe qué hacer con ella directamente.",
              eu: "HBP batean badakigu kurba non hasten den eta zein maldarekin, eta [[edo-problemas-valor-inicial|hasierako balioko]] metodoek ([[edo-metodo-euler|Euler]], [[edo-metodo-runge-kutta|Runge-Kutta]], [[edo-adams-bashforth|Adams]]) urratsez urrats egiten dute aurrera $x=a$-tik. Muga-problema batean bi muturrak ezagutzen ditugu, $(a,\\alpha)$ eta $(b,\\beta)$, baina **ez hasierako malda**: $x=b$-ko informazioa ezin da hasieran erabili, eta urrats bakarreko metodo batek ere ez daki zuzenean zer egin harekin.",
              en: "In an IVP we know where the curve starts and with what slope, and [[edo-problemas-valor-inicial|initial value]] methods ([[edo-metodo-euler|Euler]], [[edo-metodo-runge-kutta|Runge-Kutta]], [[edo-adams-bashforth|Adams]]) march step by step from $x=a$. In a BVP we know both endpoints $(a,\\alpha)$ and $(b,\\beta)$ but **not the initial slope**: the information at $x=b$ cannot be used when starting, and no one-step method knows what to do with it directly."
            }
          }
        ]
      },
      {
        heading: {
          es: "Orden y número de condiciones",
          eu: "Ordena eta baldintza kopurua",
          en: "Order and number of conditions"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "El orden de la ecuación es el de la derivada más alta. En $y''=x+y$ la derivada más alta es $y''$, orden 2: hacen falta dos condiciones. La deformación $w(x)$ de una viga apoyada en sus extremos obedece a una ecuación de orden 4 y lleva cuatro condiciones, dos en cada extremo:",
              eu: "Ekuazioaren ordena deribatu altuenarena da. $y''=x+y$ ekuazioan deribatu altuena $y''$ da, 2. ordena: bi baldintza behar dira. Muturretan bermatutako habe baten $w(x)$ deformazioak 4. ordenako ekuazio bat betetzen du eta lau baldintza ditu, bi mutur bakoitzean:",
              en: "The order of the equation is that of its highest derivative. In $y''=x+y$ the highest derivative is $y''$, order 2: two conditions are needed. The deflection $w(x)$ of a beam supported at both ends obeys a fourth-order equation with four conditions, two at each end:"
            }
          },
          {
            kind: "formula",
            tex: "EI\\,\\frac{d^4w}{dx^4}=p(x)-k\\,w,\\qquad w(0)=w''(0)=0,\\qquad w(L)=w''(L)=0",
            caption: {
              es: "$E$: módulo de Young; $I$: momento de inercia de la sección; $k$: rigidez del apoyo por unidad de longitud; $p$: carga.",
              eu: "$E$: Youngen modulua; $I$: sekzioaren inertzia-momentua; $k$: euskarriaren zurruntasuna luzera-unitateko; $p$: karga.",
              en: "$E$: Young's modulus; $I$: second moment of area; $k$: support stiffness per unit length; $p$: load."
            }
          }
        ]
      },
      {
        heading: {
          es: "Modelos que llevan a problemas de frontera",
          eu: "Muga-problemetara daramaten ereduak",
          en: "Models that lead to boundary value problems"
        },
        blocks: [
          {
            kind: "list",
            items: {
              es: [
                "**Potencial entre dos esferas concéntricas** de radios $R_1<R_2$ a tensiones $V_1$ y $V_2$: $V''+\\frac{2}{r}V'=0$, $V(R_1)=V_1$, $V(R_2)=V_2$. Lineal, Dirichlet. Resuelto en [[ejercicio-disparo-potencial-esferas]].",
                "**Deformación de una viga** apoyada: $EI\\,w^{(4)}=p(x)-kw$ con cuatro condiciones. Lineal, orden 4. Resuelto en [[ejercicio-disparo-viga]].",
                "**Temperatura en un anillo** de radios 1 y 3 que intercambia calor con el exterior: $ru''+u'=0$ con condiciones que mezclan $u$ y $u'$ en cada borde. Lineal, condiciones naturales. Resuelto en [[ejercicio-disparo-newton-robin]].",
                "**Ecuaciones no lineales** como $y''-xyy'+x\\cos(x)\\,y+\\sin x=0$ con $y(0)+y'(0)=1$, $y(\\pi)-2y'(\\pi)=2$: no tienen solución por fórmula sencilla y obligan a iterar. Resuelto en [[ejercicio-disparo-sensibilidad]]."
              ],
              eu: [
                "$R_1<R_2$ erradioko eta $V_1$ eta $V_2$ tentsioko **bi esfera zentrokideren arteko potentziala**: $V''+\\frac{2}{r}V'=0$, $V(R_1)=V_1$, $V(R_2)=V_2$. Lineala, Dirichlet. Ebatzita: [[ejercicio-disparo-potencial-esferas]].",
                "Bermatutako **habe baten deformazioa**: $EI\\,w^{(4)}=p(x)-kw$ lau baldintzarekin. Lineala, 4. ordena. Ebatzita: [[ejercicio-disparo-viga]].",
                "Kanpoaldearekin beroa trukatzen duen 1 eta 3 erradioko **eraztun bateko tenperatura**: $ru''+u'=0$, ertz bakoitzean $u$ eta $u'$ nahasten dituzten baldintzekin. Lineala, baldintza naturalak. Ebatzita: [[ejercicio-disparo-newton-robin]].",
                "**Ekuazio ez-linealak**, adibidez $y''-xyy'+x\\cos(x)\\,y+\\sin x=0$ $y(0)+y'(0)=1$ eta $y(\\pi)-2y'(\\pi)=2$ baldintzekin: ez dute formula errazeko soluziorik eta iteratzera behartzen dute. Ebatzita: [[ejercicio-disparo-sensibilidad]]."
              ],
              en: [
                "**Potential between two concentric spheres** of radii $R_1<R_2$ held at voltages $V_1$ and $V_2$: $V''+\\frac{2}{r}V'=0$, $V(R_1)=V_1$, $V(R_2)=V_2$. Linear, Dirichlet. Solved in [[ejercicio-disparo-potencial-esferas]].",
                "**Deflection of a supported beam**: $EI\\,w^{(4)}=p(x)-kw$ with four conditions. Linear, order 4. Solved in [[ejercicio-disparo-viga]].",
                "**Temperature in an annulus** of radii 1 and 3 exchanging heat with the outside: $ru''+u'=0$ with conditions mixing $u$ and $u'$ on each edge. Linear, natural conditions. Solved in [[ejercicio-disparo-newton-robin]].",
                "**Nonlinear equations** such as $y''-xyy'+x\\cos(x)\\,y+\\sin x=0$ with $y(0)+y'(0)=1$, $y(\\pi)-2y'(\\pi)=2$: no simple closed-form solution, so we must iterate. Solved in [[ejercicio-disparo-sensibilidad]]."
              ]
            }
          }
        ]
      },
      {
        heading: {
          es: "Tipos de condiciones de contorno",
          eu: "Muga-baldintza motak",
          en: "Types of boundary conditions"
        },
        blocks: [
          {
            kind: "list",
            items: {
              es: [
                "**Dirichlet**: se da el valor de la función, $y(a)=\\alpha$, $y(b)=\\beta$. Son **homogéneas** si $\\alpha=\\beta=0$ y no homogéneas si alguna no es nula. Ejemplo: $y(1)=17$, $y(3)=43/3$.",
                "**Naturales** (o de Robin): combinan función y derivada, $\\alpha_a y'(a)+\\beta_a y(a)=\\gamma_a$, $\\alpha_b y'(b)+\\beta_b y(b)=\\gamma_b$, con $\\alpha_a,\\alpha_b\\ne0$. Ejemplo: $u(1)+u'(1)=\\alpha$, $u(3)+u'(3)=\\beta$.",
                "**Mixtas**: un extremo con condición natural y el otro Dirichlet, $\\alpha_a y'(a)+\\beta_a y(a)=\\gamma_a$, $y(b)=\\gamma_b$. Ejemplo: $u(1)=\\ln\\frac13-1$, $u(3)-u'(3)=\\frac{\\ln 3-7}{2}$."
              ],
              eu: [
                "**Dirichlet**: funtzioaren balioa ematen da, $y(a)=\\alpha$, $y(b)=\\beta$. **Homogeneoak** dira $\\alpha=\\beta=0$ bada, eta ez-homogeneoak bietako bat ez-nulua bada. Adibidea: $y(1)=17$, $y(3)=43/3$.",
                "**Naturalak** (edo Robin motakoak): funtzioa eta deribatua konbinatzen dituzte, $\\alpha_a y'(a)+\\beta_a y(a)=\\gamma_a$, $\\alpha_b y'(b)+\\beta_b y(b)=\\gamma_b$, $\\alpha_a,\\alpha_b\\ne0$ izanik. Adibidea: $u(1)+u'(1)=\\alpha$, $u(3)+u'(3)=\\beta$.",
                "**Mistoak**: mutur batean baldintza naturala eta bestean Dirichlet, $\\alpha_a y'(a)+\\beta_a y(a)=\\gamma_a$, $y(b)=\\gamma_b$. Adibidea: $u(1)=\\ln\\frac13-1$, $u(3)-u'(3)=\\frac{\\ln 3-7}{2}$."
              ],
              en: [
                "**Dirichlet**: the value of the function is given, $y(a)=\\alpha$, $y(b)=\\beta$. They are **homogeneous** if $\\alpha=\\beta=0$ and nonhomogeneous otherwise. Example: $y(1)=17$, $y(3)=43/3$.",
                "**Natural** (or Robin): they combine function and derivative, $\\alpha_a y'(a)+\\beta_a y(a)=\\gamma_a$, $\\alpha_b y'(b)+\\beta_b y(b)=\\gamma_b$, with $\\alpha_a,\\alpha_b\\ne0$. Example: $u(1)+u'(1)=\\alpha$, $u(3)+u'(3)=\\beta$.",
                "**Mixed**: one end with a natural condition and the other Dirichlet, $\\alpha_a y'(a)+\\beta_a y(a)=\\gamma_a$, $y(b)=\\gamma_b$. Example: $u(1)=\\ln\\frac13-1$, $u(3)-u'(3)=\\frac{\\ln 3-7}{2}$."
              ]
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Con $\\beta_a=\\beta_b=0$ las condiciones naturales solo fijan la derivada (condiciones de Neumann). Una condición también puede acoplar los dos extremos, como $y(0)+y'(0)-y(1)=1$.",
              eu: "$\\beta_a=\\beta_b=0$ denean, baldintza naturalek deribatua bakarrik finkatzen dute (Neumann baldintzak). Baldintza batek bi muturrak akoplatu ere egin ditzake, adibidez $y(0)+y'(0)-y(1)=1$.",
              en: "With $\\beta_a=\\beta_b=0$ natural conditions only fix the derivative (Neumann conditions). A condition may also couple both ends, as in $y(0)+y'(0)-y(1)=1$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Lineal o no lineal",
          eu: "Lineala ala ez-lineala",
          en: "Linear or nonlinear"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La estrategia numérica depende de si $f$ es lineal en $y$ e $y'$. El problema lineal tiene la forma",
              eu: "Estrategia numerikoa $f$ $y$-rekiko eta $y'$-rekiko lineala den ala ez araberakoa da. Problema linealak forma hau du:",
              en: "The numerical strategy depends on whether $f$ is linear in $y$ and $y'$. The linear problem has the form"
            }
          },
          {
            kind: "formula",
            tex: "y''=p(x)\\,y'+q(x)\\,y+r(x),\\qquad x\\in[a,b]"
          },
          {
            kind: "paragraph",
            text: {
              es: "con $p$, $q$, $r$ funciones cualesquiera de $x$. Lo que importa es que $y$ e $y'$ aparezcan solo multiplicadas por funciones de $x$: ni elevadas a potencias, ni multiplicadas entre sí, ni dentro de senos o exponenciales.",
              eu: "non $p$, $q$, $r$ $x$-ren edozein funtzio diren. Garrantzitsua da $y$ eta $y'$ $x$-ren funtzioekin biderkatuta bakarrik agertzea: ez berretura gisa, ez elkarren artean biderkatuta, ez sinu edo esponentzialen barruan.",
              en: "with $p$, $q$, $r$ arbitrary functions of $x$. What matters is that $y$ and $y'$ appear only multiplied by functions of $x$: not raised to powers, not multiplied together, not inside sines or exponentials."
            }
          },
          {
            kind: "table",
            head: {
              es: ["Ecuación", "¿Lineal?", "Motivo"],
              eu: ["Ekuazioa", "Lineala?", "Arrazoia"],
              en: ["Equation", "Linear?", "Reason"]
            },
            rows: [
              ["$y''=x^2y'+\\sin(x)\\,y+e^x$", "✓", "$p=x^2,\\; q=\\sin x,\\; r=e^x$"],
              ["$ru''+u'=-4r$", "✓", "$u''=-\\frac1r u'-4$"],
              ["$y''=yy'+x$", "✗", "$yy'$"],
              ["$y''=y^2+\\sin(y')$", "✗", "$y^2,\\; \\sin(y')$"],
              ["$y''=\\frac18(32+2x^3-yy')$", "✗", "$yy'$"]
            ]
          },
          {
            kind: "paragraph",
            text: {
              es: "Si es lineal, basta resolver **dos** PVI y combinarlos: [[frontera-disparo-lineal]]. Si no lo es, hay que iterar sobre la pendiente inicial con [[frontera-disparo-no-lineal|secante]] o [[frontera-disparo-newton|Newton]].",
              eu: "Lineala bada, nahikoa da **bi** HBP ebaztea eta konbinatzea: [[frontera-disparo-lineal]]. Ez bada, hasierako maldaren gainean iteratu behar da [[frontera-disparo-no-lineal|sekantearekin]] edo [[frontera-disparo-newton|Newtonekin]].",
              en: "If it is linear, solving **two** IVPs and combining them is enough: [[frontera-disparo-lineal]]. Otherwise we iterate on the initial slope with [[frontera-disparo-no-lineal|secant]] or [[frontera-disparo-newton|Newton]]."
            }
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
            kind: "paragraph",
            text: {
              es: "A diferencia de los PVI, un problema de frontera puede no tener solución o tener infinitas aunque la ecuación sea perfectamente regular. Por eso conviene comprobar una condición suficiente antes de calcular.",
              eu: "HBPetan ez bezala, muga-problema batek soluziorik ez izan edo infinitu izan ditzake, ekuazioa guztiz erregularra izan arren. Horregatik, komeni da kalkulatu aurretik baldintza nahikoa bat egiaztatzea.",
              en: "Unlike IVPs, a boundary value problem may have no solution or infinitely many even when the equation is perfectly smooth. That is why a sufficient condition is worth checking before computing."
            }
          },
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Teorema (problema lineal con condiciones Dirichlet)",
              eu: "Teorema (problema lineala Dirichlet baldintzekin)",
              en: "Theorem (linear problem with Dirichlet conditions)"
            },
            text: {
              es: "Sea $y''=p(x)y'+q(x)y+r(x)$, $x\\in[a,b]$, $y(a)=\\alpha$, $y(b)=\\beta$. Si (i) $p$, $q$ y $r$ son continuas en $[a,b]$ y (ii) $q(x)>0$ para todo $x\\in[a,b]$, entonces el problema tiene solución única.",
              eu: "Izan bedi $y''=p(x)y'+q(x)y+r(x)$, $x\\in[a,b]$, $y(a)=\\alpha$, $y(b)=\\beta$. Baldin (i) $p$, $q$ eta $r$ jarraituak badira $[a,b]$-n eta (ii) $q(x)>0$ bada $x\\in[a,b]$ guztietarako, orduan problemak soluzio bakarra du.",
              en: "Let $y''=p(x)y'+q(x)y+r(x)$, $x\\in[a,b]$, $y(a)=\\alpha$, $y(b)=\\beta$. If (i) $p$, $q$ and $r$ are continuous on $[a,b]$ and (ii) $q(x)>0$ for all $x\\in[a,b]$, then the problem has a unique solution."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "La condición $q>0$ no es un adorno. En $y''=-y$ ($q=-1$) todas las funciones $y=C\\sin x$ cumplen $y(0)=0$ e $y(\\pi)=0$: **infinitas soluciones**. Y con $y(0)=0$, $y(\\pi)=1$ no hay **ninguna**, porque toda solución con $y(0)=0$ es $C\\sin x$ y vale $0$ en $\\pi$. El teorema es suficiente, no necesario: muchos problemas con $q\\le0$ también tienen solución única.",
              eu: "$q>0$ baldintza ez da apaingarri hutsa. $y''=-y$ ekuazioan ($q=-1$), $y=C\\sin x$ funtzio guztiek betetzen dituzte $y(0)=0$ eta $y(\\pi)=0$: **infinitu soluzio**. Eta $y(0)=0$, $y(\\pi)=1$ baldintzekin **bat ere ez** dago, $y(0)=0$ duen soluzio oro $C\\sin x$ delako eta $\\pi$-n $0$ balio duelako. Teorema nahikoa da, ez beharrezkoa: $q\\le0$ duten problema askok ere soluzio bakarra dute.",
              en: "The condition $q>0$ is not decoration. For $y''=-y$ ($q=-1$) every function $y=C\\sin x$ satisfies $y(0)=0$ and $y(\\pi)=0$: **infinitely many solutions**. And with $y(0)=0$, $y(\\pi)=1$ there is **none**, because every solution with $y(0)=0$ is $C\\sin x$, which vanishes at $\\pi$. The theorem is sufficient, not necessary: many problems with $q\\le0$ also have a unique solution."
            }
          },
          {
            kind: "plot",
            xLabel: "x",
            yLabel: "y",
            series: nonUniqueFamily.map((curve, i) => ({
              label: {
                es: `$C=${curve.c}$`,
                eu: `$C=${curve.c}$`,
                en: `$C=${curve.c}$`
              },
              points: curve.points,
              tone: shootingColors[i]
            })),
            markers: [
              { x: 0, y: 0, label: "y(0)=0", tone: "ink" },
              { x: Math.PI, y: 0, label: "y(π)=0", tone: "ink" }
            ],
            caption: {
              es: "$y''+y=0$ en $[0,\\pi]$: todas las curvas $C\\sin x$ pasan por los dos extremos. El problema con $y(0)=y(\\pi)=0$ no determina la solución.",
              eu: "$y''+y=0$ $[0,\\pi]$-n: $C\\sin x$ kurba guztiak bi muturretatik igarotzen dira. $y(0)=y(\\pi)=0$ problemak ez du soluzioa zehazten.",
              en: "$y''+y=0$ on $[0,\\pi]$: every curve $C\\sin x$ passes through both endpoints. The problem with $y(0)=y(\\pi)=0$ does not determine the solution."
            }
          }
        ]
      },
      {
        heading: {
          es: "Qué significa resolverlo numéricamente",
          eu: "Zer esan nahi du zenbakiz ebazteak",
          en: "What solving it numerically means"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "No buscamos una fórmula para $y(x)$ sino sus valores aproximados en una malla de nodos equiespaciados. Fijado un entero $N$,",
              eu: "Ez dugu $y(x)$-ren formula bat bilatzen, baizik eta haren balio hurbilduak nodo berdin banatuen sare batean. $N$ oso bat finkatuta,",
              en: "We are not after a formula for $y(x)$ but its approximate values on a grid of equally spaced nodes. For a fixed integer $N$,"
            }
          },
          {
            kind: "formula",
            tex: "h=\\frac{b-a}{N},\\qquad x_i=a+ih,\\quad i=0,1,\\dots,N,\\qquad x_0=a,\\; x_N=b,\\qquad y_i\\approx y(x_i)"
          }
        ]
      },
      {
        heading: {
          es: "La idea del disparo",
          eu: "Jaurtiketaren ideia",
          en: "The shooting idea"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Imagina lanzar una pelota desde $(a,\\alpha)$ para que caiga en $(b,\\beta)$. Conoces la posición inicial y el objetivo, pero no el ángulo de tiro, que es precisamente $y'(a)$. El **método de disparo** prueba una pendiente $t$, resuelve el PVI con $y(a)=\\alpha$, $y'(a)=t$ con cualquier método de valor inicial, mira dónde cae en $x=b$ y corrige $t$ hasta acertar. Transforma así el problema de frontera en uno o varios problemas de valor inicial.",
              eu: "Pentsa ezazu pilota bat $(a,\\alpha)$-tik jaurtitzen duzula $(b,\\beta)$-n eror dadin. Hasierako posizioa eta helburua ezagutzen dituzu, baina ez jaurtiketa-angelua, hain zuzen $y'(a)$. **Jaurtiketa-metodoak** $t$ malda bat probatzen du, $y(a)=\\alpha$, $y'(a)=t$ HBPa hasierako balioko edozein metodorekin ebazten du, $x=b$-n non erortzen den begiratzen du eta $t$ zuzentzen du asmatu arte. Horrela, muga-problema hasierako balioko problema batean edo gehiagotan bihurtzen du.",
              en: "Picture throwing a ball from $(a,\\alpha)$ so that it lands at $(b,\\beta)$. You know the starting position and the target but not the launch angle, which is exactly $y'(a)$. The **shooting method** tries a slope $t$, solves the IVP $y(a)=\\alpha$, $y'(a)=t$ with any initial value method, checks where it lands at $x=b$ and corrects $t$ until it hits. It thus turns the boundary value problem into one or several initial value problems."
            }
          },
          {
            kind: "plot",
            xLabel: "x",
            yLabel: "y(t, x)",
            yDomain: [4, 22],
            series: nonlinearFan.map((shot, i) => ({
              label: {
                es: `$t=${shot.t === -14.000192 ? "-14.0002" : shot.t}$`,
                eu: `$t=${shot.t === -14.000192 ? "-14.0002" : shot.t}$`,
                en: `$t=${shot.t === -14.000192 ? "-14.0002" : shot.t}$`
              },
              points: shot.points,
              tone: shootingColors[i]
            })),
            markers: [
              { x: 1, y: 17, label: "y(1)=17", tone: "ink" },
              { x: 3, y: 43 / 3, label: "y(3)=43/3", tone: "red" }
            ],
            caption: {
              es: "Disparos del problema $y''=\\frac18(32+2x^3-yy')$, $y(1)=17$, $y(3)=\\frac{43}{3}$ con distintas pendientes iniciales $t$. Solo $t\\approx-14$ alcanza el objetivo; esa trayectoria coincide con la solución exacta $x^2+16/x$.",
              eu: "$y''=\\frac18(32+2x^3-yy')$, $y(1)=17$, $y(3)=\\frac{43}{3}$ problemaren jaurtiketak hasierako $t$ malda desberdinekin. $t\\approx-14$-k bakarrik jotzen du helburua; ibilbide hori $x^2+16/x$ soluzio zehatzarekin bat dator.",
              en: "Shots for $y''=\\frac18(32+2x^3-yy')$, $y(1)=17$, $y(3)=\\frac{43}{3}$ with different initial slopes $t$. Only $t\\approx-14$ hits the target; that trajectory matches the exact solution $x^2+16/x$."
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "La otra gran familia, las **diferencias finitas**, sustituye las derivadas por [[diferenciacion-derivadas-superiores|cocientes de diferencias]] en todos los nodos a la vez y convierte el problema en un sistema de ecuaciones ([[sistemas-lineales-conceptos|lineal]] o [[sistemas-no-lineales-newton|no lineal]]). Esta área se centra en el disparo.",
              eu: "Beste familia handiak, **diferentzia finituek**, deribatuak [[diferenciacion-derivadas-superiores|diferentzia-zatidurekin]] ordezkatzen ditu nodo guztietan aldi berean, eta problema ekuazio-sistema bihurtzen du ([[sistemas-lineales-conceptos|lineala]] edo [[sistemas-no-lineales-newton|ez-lineala]]). Arlo hau jaurtiketan zentratzen da.",
              en: "The other big family, **finite differences**, replaces derivatives with [[diferenciacion-derivadas-superiores|difference quotients]] at all nodes at once and turns the problem into a system of equations ([[sistemas-lineales-conceptos|linear]] or [[sistemas-no-lineales-newton|nonlinear]]). This area focuses on shooting."
            }
          }
        ]
      },
      {
        heading: {
          es: "Mapa del área",
          eu: "Arloaren mapa",
          en: "Map of this area"
        },
        blocks: [
          {
            kind: "list",
            items: {
              es: [
                "**Lineal + Dirichlet**: dos PVI y $y=y_1+Cy_2$ → [[frontera-disparo-lineal]].",
                "**Lineal + condiciones naturales, mixtas o acopladas**: PVI con datos adaptados o un sistema lineal de $2\\times2$ → [[frontera-disparo-lineal-condiciones-generales]].",
                "**No lineal**: $F(t)=y(t,b)-\\beta=0$ con la secante → [[frontera-disparo-no-lineal]].",
                "**No lineal, convergencia rápida**: Newton con la ecuación variacional → [[frontera-disparo-newton]].",
                "**Orden 3 o 4, varios parámetros**: contar incógnitas, disparo hacia atrás, superposición con varios PVI → [[frontera-disparo-orden-superior]]."
              ],
              eu: [
                "**Lineala + Dirichlet**: bi HBP eta $y=y_1+Cy_2$ → [[frontera-disparo-lineal]].",
                "**Lineala + baldintza natural, misto edo akoplatuak**: datu egokituko HBPak edo $2\\times2$ sistema lineal bat → [[frontera-disparo-lineal-condiciones-generales]].",
                "**Ez-lineala**: $F(t)=y(t,b)-\\beta=0$ sekantearekin → [[frontera-disparo-no-lineal]].",
                "**Ez-lineala, konbergentzia azkarra**: Newton ekuazio bariazionalarekin → [[frontera-disparo-newton]].",
                "**3. edo 4. ordena, parametro anitz**: ezezagunak zenbatu, atzerako jaurtiketa, gainezarpena hainbat HBPrekin → [[frontera-disparo-orden-superior]]."
              ],
              en: [
                "**Linear + Dirichlet**: two IVPs and $y=y_1+Cy_2$ → [[frontera-disparo-lineal]].",
                "**Linear + natural, mixed or coupled conditions**: IVPs with adapted data or a $2\\times2$ linear system → [[frontera-disparo-lineal-condiciones-generales]].",
                "**Nonlinear**: $F(t)=y(t,b)-\\beta=0$ with the secant → [[frontera-disparo-no-lineal]].",
                "**Nonlinear, fast convergence**: Newton with the variational equation → [[frontera-disparo-newton]].",
                "**Order 3 or 4, several parameters**: count unknowns, shoot backwards, superpose several IVPs → [[frontera-disparo-orden-superior]]."
              ]
            }
          }
        ]
      }
    ]
  },
  {
    slug: "frontera-disparo-lineal",
    category: "Problemas de frontera",
    level: "medio",
    searchIntent: "metodo de disparo lineal problema de frontera dirichlet superposicion runge kutta",
    title: {
      es: "Método de disparo lineal",
      eu: "Jaurtiketa-metodo lineala",
      en: "Linear shooting method"
    },
    description: {
      es: "El problema lineal $y''=py'+qy+r$ con $y(a)=\\alpha$, $y(b)=\\beta$ se resuelve con solo dos problemas de valor inicial: $y=y_1+Cy_2$. Deducción, algoritmo, convergencia y cuándo falla.",
      eu: "$y''=py'+qy+r$ problema lineala $y(a)=\\alpha$, $y(b)=\\beta$ baldintzekin bi hasierako balioko problemarekin bakarrik ebazten da: $y=y_1+Cy_2$. Frogapena, algoritmoa, konbergentzia eta noiz huts egiten duen.",
      en: "The linear problem $y''=py'+qy+r$ with $y(a)=\\alpha$, $y(b)=\\beta$ is solved with just two initial value problems: $y=y_1+Cy_2$. Derivation, algorithm, convergence and when it fails."
    },
    keywords: ["disparo lineal", "linear shooting", "superposición", "Runge-Kutta", "problema de contorno"],
    prerequisites: ["frontera-introduccion", "edo-metodo-runge-kutta"],
    related: [
      "frontera-disparo-lineal-condiciones-generales",
      "frontera-disparo-no-lineal",
      "ejercicio-disparo-lineal-a-mano",
      "ejercicio-disparo-lineal-rk4"
    ],
    code: [linearNotebook, repoLink],
    sections: [
      {
        heading: {
          es: "Planteamiento",
          eu: "Planteamendua",
          en: "Setting"
        },
        blocks: [
          {
            kind: "formula",
            tex: "\\begin{cases} y''=p(x)\\,y'+q(x)\\,y+r(x), & x\\in[a,b]\\\\ y(a)=\\alpha\\\\ y(b)=\\beta \\end{cases}"
          },
          {
            kind: "paragraph",
            text: {
              es: "Sabemos $y(a)=\\alpha$ pero no $y'(a)$. Si por arte de magia conociéramos $y'(a)=s$, tendríamos un PVI que [[edo-metodo-runge-kutta|Runge-Kutta]] resuelve sin problemas. Todo el trabajo consiste, por tanto, en **encontrar la pendiente inicial correcta**. La linealidad permite hacerlo sin ensayo y error: basta resolver dos PVI auxiliares.",
              eu: "$y(a)=\\alpha$ ezagutzen dugu, baina ez $y'(a)$. Magiaz $y'(a)=s$ ezagutuko bagenu, [[edo-metodo-runge-kutta|Runge-Kutta]]k arazorik gabe ebazten duen HBP bat izango genuke. Lan guztia, beraz, **hasierako malda zuzena aurkitzea** da. Linealtasunari esker, saiakera-errorerik gabe egin daiteke: nahikoa da bi HBP laguntzaile ebaztea.",
              en: "We know $y(a)=\\alpha$ but not $y'(a)$. If we magically knew $y'(a)=s$, we would have an IVP that [[edo-metodo-runge-kutta|Runge-Kutta]] solves without trouble. All the work is therefore **finding the right initial slope**. Linearity lets us do it without trial and error: two auxiliary IVPs are enough."
            }
          }
        ]
      },
      {
        heading: {
          es: "Los dos problemas de valor inicial",
          eu: "Hasierako balioko bi problemak",
          en: "The two initial value problems"
        },
        blocks: [
          {
            kind: "formula",
            tex: "(P_1):\\;\\begin{cases} y_1''=p\\,y_1'+q\\,y_1+r\\\\ y_1(a)=\\alpha\\\\ y_1'(a)=0 \\end{cases}\\qquad\\qquad (P_2):\\;\\begin{cases} y_2''=p\\,y_2'+q\\,y_2\\\\ y_2(a)=0\\\\ y_2'(a)=1 \\end{cases}",
            caption: {
              es: "$(P_2)$ es la ecuación **homogénea** (sin $r$).",
              eu: "$(P_2)$ ekuazio **homogeneoa** da ($r$ gabe).",
              en: "$(P_2)$ is the **homogeneous** equation (no $r$)."
            }
          },
          {
            kind: "steps",
            title: {
              es: "Qué papel juega cada uno",
              eu: "Bakoitzak zer paper jokatzen duen",
              en: "The role of each one"
            },
            steps: [
              {
                text: {
                  es: "$y_1$ es un primer disparo: sale de $(a,\\alpha)$ con pendiente $0$. Resuelve la ecuación completa, pero en general falla el objetivo: $y_1(b)\\ne\\beta$.",
                  eu: "$y_1$ lehen jaurtiketa bat da: $(a,\\alpha)$-tik $0$ maldarekin irteten da. Ekuazio osoa ebazten du, baina oro har helburua huts egiten du: $y_1(b)\\ne\\beta$.",
                  en: "$y_1$ is a first shot: it leaves $(a,\\alpha)$ with slope $0$. It solves the full equation but usually misses the target: $y_1(b)\\ne\\beta$."
                }
              },
              {
                text: {
                  es: "$y_2$ es una corrección. Buscamos $y=y_1+Cy_2$. Como $y_2(a)=0$, sumar $Cy_2$ **no mueve el punto de partida**: $y(a)=\\alpha+C\\cdot0=\\alpha$ para cualquier $C$.",
                  eu: "$y_2$ zuzenketa bat da. $y=y_1+Cy_2$ bilatzen dugu. $y_2(a)=0$ denez, $Cy_2$ gehitzeak **ez du abiapuntua mugitzen**: $y(a)=\\alpha+C\\cdot0=\\alpha$ edozein $C$-rentzat.",
                  en: "$y_2$ is a correction. We look for $y=y_1+Cy_2$. Since $y_2(a)=0$, adding $Cy_2$ **does not move the starting point**: $y(a)=\\alpha+C\\cdot0=\\alpha$ for every $C$."
                },
                formula: "y(a)=y_1(a)+C\\,y_2(a)=\\alpha"
              },
              {
                text: {
                  es: "Como $y_1'(a)=0$ e $y_2'(a)=1$, la pendiente inicial de la combinación es exactamente $C$: **$C$ es la pendiente inicial que buscábamos**.",
                  eu: "$y_1'(a)=0$ eta $y_2'(a)=1$ direnez, konbinazioaren hasierako malda zehazki $C$ da: **$C$ bilatzen genuen hasierako malda da**.",
                  en: "Since $y_1'(a)=0$ and $y_2'(a)=1$, the initial slope of the combination is exactly $C$: **$C$ is the initial slope we were looking for**."
                },
                formula: "y'(a)=y_1'(a)+C\\,y_2'(a)=0+C\\cdot1=C"
              },
              {
                text: {
                  es: "Como $y_2$ resuelve la ecuación **homogénea**, $y_1+Cy_2$ sigue resolviendo la ecuación completa: el término $r$ lo aporta solo $y_1$.",
                  eu: "$y_2$-k ekuazio **homogeneoa** ebazten duenez, $y_1+Cy_2$-k ekuazio osoa ebazten jarraitzen du: $r$ gaia $y_1$-ek bakarrik ematen du.",
                  en: "Since $y_2$ solves the **homogeneous** equation, $y_1+Cy_2$ still solves the full equation: only $y_1$ carries the term $r$."
                }
              },
              {
                text: {
                  es: "Queda imponer el extremo derecho, $y(b)=y_1(b)+Cy_2(b)=\\beta$, y despejar $C$.",
                  eu: "Eskuineko muturra ezartzea falta da, $y(b)=y_1(b)+Cy_2(b)=\\beta$, eta $C$ askatzea.",
                  en: "It remains to impose the right endpoint, $y(b)=y_1(b)+Cy_2(b)=\\beta$, and solve for $C$."
                }
              }
            ]
          },
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Solución del disparo lineal",
              eu: "Jaurtiketa linealaren soluzioa",
              en: "Linear shooting solution"
            },
            text: {
              es: "Si $y_2(b)\\ne0$, la solución del problema de frontera es",
              eu: "$y_2(b)\\ne0$ bada, muga-problemaren soluzioa hau da:",
              en: "If $y_2(b)\\ne0$, the solution of the boundary value problem is"
            },
            formula: "y(x)=y_1(x)+\\frac{\\beta-y_1(b)}{y_2(b)}\\,y_2(x),\\qquad C=\\frac{\\beta-y_1(b)}{y_2(b)}=y'(a)"
          },
          { kind: "derivation", slug: "deduccion-disparo-lineal" },
          {
            kind: "example",
            title: {
              es: "Un cálculo de bolsillo",
              eu: "Poltsikoko kalkulu bat",
              en: "A back-of-the-envelope check"
            },
            statement: {
              es: "Supón $\\beta=10$ y que, tras resolver los dos PVI, obtienes $y_1(b)=6$ e $y_2(b)=2$.",
              eu: "Demagun $\\beta=10$ dela eta, bi HBPak ebatzi ondoren, $y_1(b)=6$ eta $y_2(b)=2$ lortzen dituzula.",
              en: "Suppose $\\beta=10$ and, after solving both IVPs, you get $y_1(b)=6$ and $y_2(b)=2$."
            },
            steps: [
              {
                text: {
                  es: "Constante de la combinación:",
                  eu: "Konbinazioaren konstantea:",
                  en: "Combination constant:"
                },
                formula: "C=\\frac{10-6}{2}=2"
              },
              {
                text: {
                  es: "Comprobación en el extremo derecho:",
                  eu: "Egiaztapena eskuineko muturrean:",
                  en: "Check at the right endpoint:"
                },
                formula: "y(b)=y_1(b)+2\\,y_2(b)=6+2\\cdot2=10=\\beta\\;\\checkmark"
              }
            ],
            result: {
              text: {
                es: "La solución es $y=y_1+2y_2$ y la pendiente inicial correcta era $y'(a)=C=2$.",
                eu: "Soluzioa $y=y_1+2y_2$ da, eta hasierako malda zuzena $y'(a)=C=2$ zen.",
                en: "The solution is $y=y_1+2y_2$ and the correct initial slope was $y'(a)=C=2$."
              }
            }
          }
        ]
      },
      {
        heading: {
          es: "Reducción a sistemas de primer orden",
          eu: "Lehen ordenako sistemetara murriztea",
          en: "Reduction to first-order systems"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Los métodos de valor inicial trabajan con [[edo-problemas-valor-inicial|sistemas de primer orden]]. Con $u_1=y_1$, $u_2=y_1'$ y $v_1=y_2$, $v_2=y_2'$ los dos PVI quedan:",
              eu: "Hasierako balioko metodoek [[edo-problemas-valor-inicial|lehen ordenako sistemekin]] lan egiten dute. $u_1=y_1$, $u_2=y_1'$ eta $v_1=y_2$, $v_2=y_2'$ eginda, bi HBPak honela geratzen dira:",
              en: "Initial value methods work with [[edo-problemas-valor-inicial|first-order systems]]. With $u_1=y_1$, $u_2=y_1'$ and $v_1=y_2$, $v_2=y_2'$ the two IVPs become:"
            }
          },
          {
            kind: "formula",
            tex: "\\begin{cases} u_1'=u_2\\\\ u_2'=p(x)u_2+q(x)u_1+r(x) \\end{cases}\\;\\begin{pmatrix}u_1(a)\\\\u_2(a)\\end{pmatrix}=\\begin{pmatrix}\\alpha\\\\0\\end{pmatrix}\\qquad \\begin{cases} v_1'=v_2\\\\ v_2'=p(x)v_2+q(x)v_1 \\end{cases}\\;\\begin{pmatrix}v_1(a)\\\\v_2(a)\\end{pmatrix}=\\begin{pmatrix}0\\\\1\\end{pmatrix}"
          },
          {
            kind: "paragraph",
            text: {
              es: "Un paso de [[deduccion-runge-kutta|RK4]] para el sistema $\\bar u'=F(x,\\bar u)$ es $\\bar u_{i+1}=\\bar u_i+\\frac h6(K_1+2K_2+2K_3+K_4)$ con $K_1=F(x_i,\\bar u_i)$, $K_2=F(x_i+\\frac h2,\\bar u_i+\\frac h2K_1)$, $K_3=F(x_i+\\frac h2,\\bar u_i+\\frac h2K_2)$, $K_4=F(x_{i+1},\\bar u_i+hK_3)$, aplicado a vectores. En [[ejercicio-disparo-lineal-a-mano]] se hacen estas cuentas a mano.",
              eu: "$\\bar u'=F(x,\\bar u)$ sistemarako [[deduccion-runge-kutta|RK4]] urrats bat $\\bar u_{i+1}=\\bar u_i+\\frac h6(K_1+2K_2+2K_3+K_4)$ da, $K_1=F(x_i,\\bar u_i)$, $K_2=F(x_i+\\frac h2,\\bar u_i+\\frac h2K_1)$, $K_3=F(x_i+\\frac h2,\\bar u_i+\\frac h2K_2)$, $K_4=F(x_{i+1},\\bar u_i+hK_3)$ izanik, bektoreei aplikatuta. [[ejercicio-disparo-lineal-a-mano]] ariketan kontu hauek eskuz egiten dira.",
              en: "One [[deduccion-runge-kutta|RK4]] step for the system $\\bar u'=F(x,\\bar u)$ is $\\bar u_{i+1}=\\bar u_i+\\frac h6(K_1+2K_2+2K_3+K_4)$ with $K_1=F(x_i,\\bar u_i)$, $K_2=F(x_i+\\frac h2,\\bar u_i+\\frac h2K_1)$, $K_3=F(x_i+\\frac h2,\\bar u_i+\\frac h2K_2)$, $K_4=F(x_{i+1},\\bar u_i+hK_3)$, applied to vectors. [[ejercicio-disparo-lineal-a-mano]] does these computations by hand."
            }
          }
        ]
      },
      {
        heading: {
          es: "Algoritmo",
          eu: "Algoritmoa",
          en: "Algorithm"
        },
        blocks: [
          {
            kind: "steps",
            title: {
              es: "Disparo lineal con condiciones Dirichlet",
              eu: "Jaurtiketa lineala Dirichlet baldintzekin",
              en: "Linear shooting with Dirichlet conditions"
            },
            steps: [
              {
                text: {
                  es: "**Entrada:** $p$, $q$, $r$; extremos $a$, $b$; condiciones $\\alpha$, $\\beta$; número de subintervalos $N$. **Salida:** $y_i\\approx y(x_i)$ y $z_i\\approx y'(x_i)$, $i=0,\\dots,N$.",
                  eu: "**Sarrera:** $p$, $q$, $r$; $a$, $b$ muturrak; $\\alpha$, $\\beta$ baldintzak; $N$ azpitarte kopurua. **Irteera:** $y_i\\approx y(x_i)$ eta $z_i\\approx y'(x_i)$, $i=0,\\dots,N$.",
                  en: "**Input:** $p$, $q$, $r$; endpoints $a$, $b$; conditions $\\alpha$, $\\beta$; number of subintervals $N$. **Output:** $y_i\\approx y(x_i)$ and $z_i\\approx y'(x_i)$, $i=0,\\dots,N$."
                }
              },
              {
                text: {
                  es: "Nodos: $h=(b-a)/N$, $x_i=a+ih$.",
                  eu: "Nodoak: $h=(b-a)/N$, $x_i=a+ih$.",
                  en: "Nodes: $h=(b-a)/N$, $x_i=a+ih$."
                }
              },
              {
                text: {
                  es: "Resolver $(P_1)$ con RK4 (u otro método): valores $u_{1i}\\approx y_1(x_i)$, $u_{2i}\\approx y_1'(x_i)$.",
                  eu: "$(P_1)$ ebatzi RK4rekin (edo beste metodo batekin): $u_{1i}\\approx y_1(x_i)$, $u_{2i}\\approx y_1'(x_i)$ balioak.",
                  en: "Solve $(P_1)$ with RK4 (or another method): values $u_{1i}\\approx y_1(x_i)$, $u_{2i}\\approx y_1'(x_i)$."
                }
              },
              {
                text: {
                  es: "Resolver $(P_2)$ con **el mismo método y los mismos nodos**: $v_{1i}\\approx y_2(x_i)$, $v_{2i}\\approx y_2'(x_i)$.",
                  eu: "$(P_2)$ ebatzi **metodo eta nodo berberekin**: $v_{1i}\\approx y_2(x_i)$, $v_{2i}\\approx y_2'(x_i)$.",
                  en: "Solve $(P_2)$ with **the same method and the same nodes**: $v_{1i}\\approx y_2(x_i)$, $v_{2i}\\approx y_2'(x_i)$."
                }
              },
              {
                text: {
                  es: "Constante con los valores del último nodo:",
                  eu: "Konstantea azken nodoko balioekin:",
                  en: "Constant from the last-node values:"
                },
                formula: "C=\\frac{\\beta-u_{1N}}{v_{1N}}"
              },
              {
                text: {
                  es: "Combinar en todos los nodos:",
                  eu: "Nodo guztietan konbinatu:",
                  en: "Combine at every node:"
                },
                formula: "y_i=u_{1i}+C\\,v_{1i},\\qquad z_i=u_{2i}+C\\,v_{2i},\\qquad i=0,\\dots,N"
              }
            ]
          },
          {
            kind: "callout",
            variant: "note",
            text: {
              es: "No hay iteración ni tolerancia: el único error es el del método de valor inicial. Por construcción $y_0=\\alpha$ e $y_N=\\beta$ exactamente, y la derivada $z_i$ sale gratis.",
              eu: "Ez dago iteraziorik ez tolerantziarik: errore bakarra hasierako balioko metodoarena da. Eraikuntzaz $y_0=\\alpha$ eta $y_N=\\beta$ dira zehazki, eta $z_i$ deribatua doan lortzen da.",
              en: "There is no iteration and no tolerance: the only error is that of the initial value method. By construction $y_0=\\alpha$ and $y_N=\\beta$ exactly, and the derivative $z_i$ comes for free."
            }
          },
          {
            kind: "plot",
            xLabel: "x",
            yLabel: "y",
            series: [
              {
                label: { es: "$y_1$ (pendiente 0)", eu: "$y_1$ (0 malda)", en: "$y_1$ (slope 0)" },
                points: linearShooting.y1,
                tone: "blue",
                style: "dashed"
              },
              {
                label: {
                  es: `$C\\,y_2$, $C=${linearShooting.c.toFixed(4)}$`,
                  eu: `$C\\,y_2$, $C=${linearShooting.c.toFixed(4)}$`,
                  en: `$C\\,y_2$, $C=${linearShooting.c.toFixed(4)}$`
                },
                points: linearShooting.cy2,
                tone: "gold",
                style: "dashed"
              },
              {
                label: { es: "$y=y_1+C\\,y_2$", eu: "$y=y_1+C\\,y_2$", en: "$y=y_1+C\\,y_2$" },
                points: linearShooting.y,
                tone: "accent"
              }
            ],
            markers: [
              { x: 1, y: 1, label: "y(1)=1", tone: "ink" },
              { x: 2, y: 2, label: "y(2)=2", tone: "red" }
            ],
            caption: {
              es: "Disparo lineal para $y''=-\\frac2x y'+\\frac2{x^2}y+\\frac{\\sin(\\ln x)}{x^2}$, $y(1)=1$, $y(2)=2$. El primer disparo $y_1$ se queda en $1.4647$; la corrección $C\\,y_2$ aporta justo lo que falta en $x=2$ sin tocar $x=1$.",
              eu: "Jaurtiketa lineala $y''=-\\frac2x y'+\\frac2{x^2}y+\\frac{\\sin(\\ln x)}{x^2}$, $y(1)=1$, $y(2)=2$ problemarako. Lehen jaurtiketa $y_1$ $1.4647$-n geratzen da; $C\\,y_2$ zuzenketak $x=2$-n falta dena ematen du, $x=1$ ukitu gabe.",
              en: "Linear shooting for $y''=-\\frac2x y'+\\frac2{x^2}y+\\frac{\\sin(\\ln x)}{x^2}$, $y(1)=1$, $y(2)=2$. The first shot $y_1$ ends at $1.4647$; the correction $C\\,y_2$ supplies exactly what is missing at $x=2$ without touching $x=1$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Convergencia",
          eu: "Konbergentzia",
          en: "Convergence"
        },
        blocks: [
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Orden del disparo lineal",
              eu: "Jaurtiketa linealaren ordena",
              en: "Order of linear shooting"
            },
            text: {
              es: "Si $u_{1i}$ y $v_{1i}$ son aproximaciones de orden $p$ de $y_1(x_i)$ e $y_2(x_i)$, entonces $y_i$ es una aproximación de orden $p$ de $y(x_i)$. En concreto, existe $K>0$ tal que",
              eu: "$u_{1i}$ eta $v_{1i}$ $y_1(x_i)$ eta $y_2(x_i)$-ren $p$ ordenako hurbilketak badira, orduan $y_i$ $y(x_i)$-ren $p$ ordenako hurbilketa da. Zehazki, badago $K>0$ non",
              en: "If $u_{1i}$ and $v_{1i}$ are order-$p$ approximations of $y_1(x_i)$ and $y_2(x_i)$, then $y_i$ is an order-$p$ approximation of $y(x_i)$. Specifically, there is $K>0$ such that"
            },
            formula: "|y_i-y(x_i)|\\le K\\,h^p\\left(1+\\left|\\frac{v_{1i}}{v_{1N}}\\right|\\right)"
          },
          { kind: "derivation", slug: "deduccion-disparo-lineal-error" },
          {
            kind: "paragraph",
            text: {
              es: "Con RK4, $p=4$: dividir $h$ entre 2 divide el error entre $2^4=16$. En el ejemplo de la gráfica anterior se observa exactamente eso:",
              eu: "RK4rekin $p=4$: $h$ bider 2 zatitzeak errorea $2^4=16$ aldiz txikitzen du. Aurreko grafikoko adibidean hori bera ikusten da:",
              en: "With RK4, $p=4$: halving $h$ divides the error by $2^4=16$. The example in the previous plot shows exactly that:"
            }
          },
          {
            kind: "table",
            head: {
              es: ["$N$", "$h$", "$\\max_i|y_i-y(x_i)|$", "Cociente"],
              eu: ["$N$", "$h$", "$\\max_i|y_i-y(x_i)|$", "Zatidura"],
              en: ["$N$", "$h$", "$\\max_i|y_i-y(x_i)|$", "Ratio"]
            },
            rows: [
              ["5", "0.2", "$2.74\\cdot10^{-6}$", "—"],
              ["10", "0.1", "$1.34\\cdot10^{-7}$", "20.4"],
              ["20", "0.05", "$7.74\\cdot10^{-9}$", "17.4"],
              ["40", "0.025", "$4.48\\cdot10^{-10}$", "17.3"]
            ],
            caption: {
              es: "Los cocientes tienden a 16: orden 4, el de RK4.",
              eu: "Zatidurak 16rantz doaz: 4. ordena, RK4rena.",
              en: "The ratios approach 16: order 4, that of RK4."
            }
          },
          {
            kind: "plot",
            xLabel: "h",
            yLabel: "max error",
            logX: true,
            logY: true,
            series: [
              {
                label: {
                  es: "error máximo nodal",
                  eu: "nodoko errore maximoa",
                  en: "maximum nodal error"
                },
                points: linearOrder,
                style: "line-points",
                tone: "accent"
              },
              {
                label: { es: "referencia $h^4$", eu: "$h^4$ erreferentzia", en: "reference $h^4$" },
                points: linearOrder.map(([h]) => [h, linearOrder[1][1] * (h / linearOrder[1][0]) ** 4]),
                style: "dashed",
                tone: "muted"
              }
            ],
            caption: {
              es: "En escala log-log el error es una recta de pendiente 4, paralela a $h^4$.",
              eu: "Eskala log-log-ean errorea 4 maldako zuzen bat da, $h^4$-ren paraleloa.",
              en: "On a log-log scale the error is a line of slope 4, parallel to $h^4$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Cuándo falla",
          eu: "Noiz huts egiten duen",
          en: "When it fails"
        },
        blocks: [
          {
            kind: "callout",
            variant: "warning",
            title: {
              es: "Denominador nulo",
              eu: "Izendatzaile nulua",
              en: "Zero denominator"
            },
            text: {
              es: "Si $y_2(b)=0$ no se puede despejar $C$. Es justo el caso sin solución única: en $y''=-\\pi^2y$ en $[0,1]$ se tiene $y_2=\\sin(\\pi x)/\\pi$ y $y_2(1)=0$, y el problema homogéneo tiene infinitas soluciones $C\\sin(\\pi x)$. Si $y_2(b)$ es **casi** cero, $C$ amplifica cualquier error de $y_1(b)$: el problema está mal condicionado.",
              eu: "$y_2(b)=0$ bada, ezin da $C$ askatu. Hain zuzen, soluzio bakarrik gabeko kasua da: $y''=-\\pi^2y$ ekuazioan $[0,1]$-n, $y_2=\\sin(\\pi x)/\\pi$ da eta $y_2(1)=0$, eta problema homogeneoak infinitu soluzio ditu, $C\\sin(\\pi x)$. $y_2(b)$ **ia** zero bada, $C$-k $y_1(b)$-ren edozein errore handitzen du: problema gaizki baldintzatuta dago.",
              en: "If $y_2(b)=0$, $C$ cannot be computed. This is precisely the case without a unique solution: for $y''=-\\pi^2y$ on $[0,1]$ we get $y_2=\\sin(\\pi x)/\\pi$ and $y_2(1)=0$, and the homogeneous problem has infinitely many solutions $C\\sin(\\pi x)$. If $y_2(b)$ is **almost** zero, $C$ amplifies any error in $y_1(b)$: the problem is ill-conditioned."
            }
          },
          {
            kind: "callout",
            variant: "warning",
            title: {
              es: "Cancelación por crecimiento exponencial",
              eu: "Hazkunde esponentzialak eragindako ezeztapena",
              en: "Cancellation from exponential growth"
            },
            text: {
              es: "En ecuaciones como $y''=100y$ en $[0,1]$, las soluciones de los PVI crecen como $e^{10x}$: $y_1(1)=\\alpha\\cosh 10\\approx 11013\\,\\alpha$. La solución buscada es la resta de dos cantidades enormes casi iguales, $y_1+Cy_2$, y se pierden [[fundamentos-cifras-significativas|cifras significativas]]. Remedios: disparar desde el otro extremo (hacia atrás), dividir el intervalo en tramos (disparo múltiple) o usar diferencias finitas.",
              eu: "$y''=100y$ bezalako ekuazioetan $[0,1]$-n, HBPen soluzioak $e^{10x}$ bezala hazten dira: $y_1(1)=\\alpha\\cosh 10\\approx 11013\\,\\alpha$. Bilatutako soluzioa ia berdinak diren bi kantitate izugarriren kenketa da, $y_1+Cy_2$, eta [[fundamentos-cifras-significativas|zifra esanguratsuak]] galtzen dira. Konponbideak: beste muturretik jaurtitzea (atzerantz), tartea zatitan banatzea (jaurtiketa anizkoitza) edo diferentzia finituak erabiltzea.",
              en: "In equations like $y''=100y$ on $[0,1]$, the IVP solutions grow like $e^{10x}$: $y_1(1)=\\alpha\\cosh 10\\approx 11013\\,\\alpha$. The wanted solution is the difference of two huge, nearly equal quantities, $y_1+Cy_2$, and [[fundamentos-cifras-significativas|significant figures]] are lost. Remedies: shoot from the other end (backwards), split the interval into pieces (multiple shooting) or use finite differences."
            }
          }
        ]
      },
      {
        heading: {
          es: "Ejercicios resueltos",
          eu: "Ebatzitako ariketak",
          en: "Solved exercises"
        },
        blocks: [
          {
            kind: "list",
            items: {
              es: [
                "[[ejercicio-disparo-lineal-a-mano]]: $y''=y$ con RK4 y $h=0.5$, cada $K$ a mano.",
                "[[ejercicio-disparo-lineal-rk4]]: tabla completa con $h=0.1$ y error frente a la solución exacta.",
                "[[ejercicio-disparo-potencial-esferas]]: potencial electrostático entre dos esferas."
              ],
              eu: [
                "[[ejercicio-disparo-lineal-a-mano]]: $y''=y$ RK4rekin eta $h=0.5$, $K$ bakoitza eskuz.",
                "[[ejercicio-disparo-lineal-rk4]]: taula osoa $h=0.1$-ekin eta errorea soluzio zehatzarekiko.",
                "[[ejercicio-disparo-potencial-esferas]]: bi esferen arteko potentzial elektrostatikoa."
              ],
              en: [
                "[[ejercicio-disparo-lineal-a-mano]]: $y''=y$ with RK4 and $h=0.5$, every $K$ by hand.",
                "[[ejercicio-disparo-lineal-rk4]]: full table with $h=0.1$ and error against the exact solution.",
                "[[ejercicio-disparo-potencial-esferas]]: electrostatic potential between two spheres."
              ]
            }
          }
        ]
      }
    ]
  },
  {
    slug: "frontera-disparo-lineal-condiciones-generales",
    category: "Problemas de frontera",
    level: "medio",
    searchIntent: "disparo lineal condiciones naturales robin mixtas neumann problema de contorno",
    title: {
      es: "Disparo lineal con condiciones naturales y mixtas",
      eu: "Jaurtiketa lineala baldintza natural eta mistoekin",
      en: "Linear shooting with natural and mixed conditions"
    },
    description: {
      es: "Cuando las condiciones mezclan $y$ e $y'$ ($\\alpha_a y'(a)+\\beta_a y(a)=\\gamma_a$) o acoplan los extremos, el disparo lineal se adapta eligiendo bien los datos iniciales o resolviendo un sistema lineal de $2\\times2$.",
      eu: "Baldintzek $y$ eta $y'$ nahasten dituztenean ($\\alpha_a y'(a)+\\beta_a y(a)=\\gamma_a$) edo muturrak akoplatzen dituztenean, jaurtiketa lineala egokitu egiten da hasierako datuak ondo aukeratuz edo $2\\times2$ sistema lineal bat ebatziz.",
      en: "When the conditions mix $y$ and $y'$ ($\\alpha_a y'(a)+\\beta_a y(a)=\\gamma_a$) or couple the endpoints, linear shooting adapts by choosing the initial data carefully or by solving a $2\\times2$ linear system."
    },
    keywords: ["condiciones de Robin", "condiciones naturales", "condiciones mixtas", "disparo lineal", "Neumann"],
    prerequisites: ["frontera-disparo-lineal"],
    related: [
      "frontera-disparo-no-lineal",
      "ejercicio-disparo-robin-lineal",
      "ejercicio-disparo-condiciones-acopladas"
    ],
    code: [linearNotebook, repoLink],
    sections: [
      {
        heading: {
          es: "Por qué no basta el algoritmo Dirichlet",
          eu: "Zergatik ez den nahikoa Dirichlet algoritmoa",
          en: "Why the Dirichlet algorithm is not enough"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Con una condición como $y(a)-y'(a)=\\alpha$ ya no conocemos $y(a)$, así que no podemos arrancar $(P_1)$ con $y_1(a)=\\alpha$ tranquilamente. La filosofía no cambia —combinar soluciones de PVI hasta cumplir las condiciones— pero hay que elegir los datos iniciales para que **la condición de la izquierda se cumpla sea cual sea el parámetro**.",
              eu: "$y(a)-y'(a)=\\alpha$ bezalako baldintza batekin ez dugu $y(a)$ ezagutzen; beraz, ezin dugu $(P_1)$ lasai abiarazi $y_1(a)=\\alpha$-rekin. Filosofia ez da aldatzen —HBPen soluzioak konbinatu baldintzak bete arte—, baina hasierako datuak aukeratu behar dira **ezkerreko baldintza parametroa edozein dela ere bete dadin**.",
              en: "With a condition such as $y(a)-y'(a)=\\alpha$ we no longer know $y(a)$, so we cannot simply start $(P_1)$ with $y_1(a)=\\alpha$. The philosophy is unchanged —combine IVP solutions until the conditions hold— but the initial data must be chosen so that **the left condition holds whatever the parameter**."
            }
          }
        ]
      },
      {
        heading: {
          es: "Condiciones naturales en ambos extremos",
          eu: "Baldintza naturalak bi muturretan",
          en: "Natural conditions at both ends"
        },
        blocks: [
          {
            kind: "formula",
            tex: "y''=p\\,y'+q\\,y+r,\\qquad \\alpha_a y'(a)+\\beta_a y(a)=\\gamma_a,\\qquad \\alpha_b y'(b)+\\beta_b y(b)=\\gamma_b"
          },
          {
            kind: "paragraph",
            text: {
              es: "Buscamos de nuevo $y=y_1+s\\,y_2$, con $y_1$ solución de la ecuación completa y $y_2$ de la homogénea, pero ahora con estos datos iniciales:",
              eu: "Berriro $y=y_1+s\\,y_2$ bilatzen dugu, $y_1$ ekuazio osoaren soluzioa eta $y_2$ homogeneoarena izanik, baina orain hasierako datu hauekin:",
              en: "Again we look for $y=y_1+s\\,y_2$, with $y_1$ solving the full equation and $y_2$ the homogeneous one, but now with these initial data:"
            }
          },
          {
            kind: "formula",
            tex: "(P_1):\\; y_1(a)=0,\\; y_1'(a)=\\frac{\\gamma_a}{\\alpha_a}\\qquad\\qquad (P_2):\\; y_2(a)=\\alpha_a,\\; y_2'(a)=-\\beta_a"
          },
          {
            kind: "paragraph",
            text: {
              es: "$y_1$ cumple la condición izquierda ($\\alpha_a\\frac{\\gamma_a}{\\alpha_a}+\\beta_a\\cdot0=\\gamma_a$) y $y_2$ cumple su versión homogénea ($\\alpha_a(-\\beta_a)+\\beta_a\\alpha_a=0$), así que toda combinación $y_1+s\\,y_2$ la cumple. El parámetro $s$ se fija con la condición derecha:",
              eu: "$y_1$-ek ezkerreko baldintza betetzen du ($\\alpha_a\\frac{\\gamma_a}{\\alpha_a}+\\beta_a\\cdot0=\\gamma_a$) eta $y_2$-k haren bertsio homogeneoa ($\\alpha_a(-\\beta_a)+\\beta_a\\alpha_a=0$); beraz, $y_1+s\\,y_2$ konbinazio orok betetzen du. $s$ parametroa eskuineko baldintzarekin finkatzen da:",
              en: "$y_1$ satisfies the left condition ($\\alpha_a\\frac{\\gamma_a}{\\alpha_a}+\\beta_a\\cdot0=\\gamma_a$) and $y_2$ its homogeneous version ($\\alpha_a(-\\beta_a)+\\beta_a\\alpha_a=0$), so every combination $y_1+s\\,y_2$ satisfies it. The parameter $s$ is fixed by the right condition:"
            }
          },
          {
            kind: "callout",
            variant: "theorem",
            title: {
              es: "Disparo lineal con condiciones naturales",
              eu: "Jaurtiketa lineala baldintza naturalekin",
              en: "Linear shooting with natural conditions"
            },
            text: {
              es: "Si el denominador no se anula, la solución es $y=y_1+s\\,y_2$ con",
              eu: "Izendatzailea anulatzen ez bada, soluzioa $y=y_1+s\\,y_2$ da, non",
              en: "If the denominator does not vanish, the solution is $y=y_1+s\\,y_2$ with"
            },
            formula: "s=\\frac{\\gamma_b-\\bigl(\\alpha_b y_1'(b)+\\beta_b y_1(b)\\bigr)}{\\alpha_b y_2'(b)+\\beta_b y_2(b)}"
          },
          { kind: "derivation", slug: "deduccion-disparo-condiciones-naturales" },
          {
            kind: "paragraph",
            text: {
              es: "Cualquier par de datos iniciales que cumpla la condición izquierda sirve para $y_1$, y cualquier par no nulo que cumpla su versión homogénea sirve para $y_2$. Por ejemplo, para $y(a)-y'(a)=\\alpha$, $y(b)+y'(b)=\\beta$ es cómodo tomar $y_1(a)=\\alpha$, $y_1'(a)=0$ e $y_2(a)=y_2'(a)=1$, de donde",
              eu: "Ezkerreko baldintza betetzen duen hasierako datu-pare orok balio du $y_1$-erako, eta haren bertsio homogeneoa betetzen duen pare ez-nulu orok $y_2$-rako. Adibidez, $y(a)-y'(a)=\\alpha$, $y(b)+y'(b)=\\beta$ kasurako erosoa da $y_1(a)=\\alpha$, $y_1'(a)=0$ eta $y_2(a)=y_2'(a)=1$ hartzea, eta hortik",
              en: "Any pair of initial data satisfying the left condition works for $y_1$, and any nonzero pair satisfying its homogeneous version works for $y_2$. For instance, for $y(a)-y'(a)=\\alpha$, $y(b)+y'(b)=\\beta$ it is convenient to take $y_1(a)=\\alpha$, $y_1'(a)=0$ and $y_2(a)=y_2'(a)=1$, which gives"
            }
          },
          {
            kind: "formula",
            tex: "s=\\frac{\\beta-\\bigl(y_1(b)+y_1'(b)\\bigr)}{y_2(b)+y_2'(b)}"
          },
          {
            kind: "callout",
            variant: "warning",
            title: {
              es: "Error frecuente: dos coeficientes libres con los PVI de Dirichlet",
              eu: "Ohiko akatsa: bi koefiziente aske Dirichleten HBPekin",
              en: "Common mistake: two free coefficients with the Dirichlet IVPs"
            },
            text: {
              es: "Es tentador reutilizar los $(P_1)$, $(P_2)$ del caso Dirichlet y buscar $y=\\lambda_1y_1+\\lambda_2y_2$ con dos coeficientes libres. Pero $\\lambda_1y_1$ resuelve la ecuación con término $\\lambda_1r$, no $r$: la combinación solo es solución si $\\lambda_1=1$ o si $r\\equiv0$. Para ecuaciones homogéneas ($r\\equiv0$) funciona y da $\\lambda_1=1+\\frac{\\beta-B_1}{B_1+\\alpha B_2}$, $\\lambda_2=\\alpha(\\lambda_1-1)$ con $B_j=y_j(b)+y_j'(b)$; en general hay que usar la construcción de arriba.",
              eu: "Tentagarria da Dirichlet kasuko $(P_1)$, $(P_2)$ berrerabiltzea eta $y=\\lambda_1y_1+\\lambda_2y_2$ bi koefiziente askerekin bilatzea. Baina $\\lambda_1y_1$-ek $\\lambda_1r$ gaia duen ekuazioa ebazten du, ez $r$ duena: konbinazioa soluzioa da soilik $\\lambda_1=1$ bada edo $r\\equiv0$ bada. Ekuazio homogeneoetarako ($r\\equiv0$) funtzionatzen du eta $\\lambda_1=1+\\frac{\\beta-B_1}{B_1+\\alpha B_2}$, $\\lambda_2=\\alpha(\\lambda_1-1)$ ematen ditu, $B_j=y_j(b)+y_j'(b)$ izanik; oro har, goiko eraikuntza erabili behar da.",
              en: "It is tempting to reuse the Dirichlet $(P_1)$, $(P_2)$ and look for $y=\\lambda_1y_1+\\lambda_2y_2$ with two free coefficients. But $\\lambda_1y_1$ solves the equation with forcing $\\lambda_1r$, not $r$: the combination is a solution only if $\\lambda_1=1$ or $r\\equiv0$. For homogeneous equations ($r\\equiv0$) it works and gives $\\lambda_1=1+\\frac{\\beta-B_1}{B_1+\\alpha B_2}$, $\\lambda_2=\\alpha(\\lambda_1-1)$ with $B_j=y_j(b)+y_j'(b)$; in general use the construction above."
            }
          }
        ]
      },
      {
        heading: {
          es: "Condiciones mixtas",
          eu: "Baldintza mistoak",
          en: "Mixed conditions"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Si la condición Dirichlet está en $a$ y la natural en $b$ (como en $u(1)=\\alpha$, $u(3)-u'(3)=\\beta$), se usan los PVI de siempre ($y_1(a)=\\alpha$, $y_1'(a)=0$; $y_2(a)=0$, $y_2'(a)=1$) y solo cambia la ecuación final: $s=\\frac{\\beta-(y_1(b)-y_1'(b))}{y_2(b)-y_2'(b)}$. Si la condición Dirichlet está en $b$, lo más cómodo es **disparar hacia atrás** desde $b$: integrar de $b$ a $a$ con paso negativo $-h$. Resuelto en [[ejercicio-disparo-robin-lineal]].",
              eu: "Dirichlet baldintza $a$-n eta naturala $b$-n badaude ($u(1)=\\alpha$, $u(3)-u'(3)=\\beta$ kasuan bezala), ohiko HBPak erabiltzen dira ($y_1(a)=\\alpha$, $y_1'(a)=0$; $y_2(a)=0$, $y_2'(a)=1$) eta azken ekuazioa bakarrik aldatzen da: $s=\\frac{\\beta-(y_1(b)-y_1'(b))}{y_2(b)-y_2'(b)}$. Dirichlet baldintza $b$-n badago, erosoena $b$-tik **atzerantz jaurtitzea** da: $b$-tik $a$-ra integratu $-h$ pauso negatiboarekin. Ebatzita: [[ejercicio-disparo-robin-lineal]].",
              en: "If the Dirichlet condition is at $a$ and the natural one at $b$ (as in $u(1)=\\alpha$, $u(3)-u'(3)=\\beta$), we use the usual IVPs ($y_1(a)=\\alpha$, $y_1'(a)=0$; $y_2(a)=0$, $y_2'(a)=1$) and only the final equation changes: $s=\\frac{\\beta-(y_1(b)-y_1'(b))}{y_2(b)-y_2'(b)}$. If the Dirichlet condition is at $b$, the easiest route is **shooting backwards** from $b$: integrate from $b$ to $a$ with negative step $-h$. Solved in [[ejercicio-disparo-robin-lineal]]."
            }
          }
        ]
      },
      {
        heading: {
          es: "Condiciones acopladas: un sistema de 2×2",
          eu: "Baldintza akoplatuak: 2×2 sistema bat",
          en: "Coupled conditions: a 2×2 system"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "La receta más general no intenta satisfacer ninguna condición de antemano. Toda solución de la ecuación lineal de segundo orden se escribe",
              eu: "Errezeta orokorrenak ez du aldez aurretik baldintzarik betetzen saiatzen. Bigarren ordenako ekuazio linealaren soluzio oro honela idazten da:",
              en: "The most general recipe does not try to satisfy any condition in advance. Every solution of the linear second-order equation can be written"
            }
          },
          {
            kind: "formula",
            tex: "y=y_p+s_1\\,\\varphi_1+s_2\\,\\varphi_2,\\qquad \\begin{aligned} &\\mathcal L[y_p]=r, && y_p(a)=0,\\ y_p'(a)=0\\\\ &\\mathcal L[\\varphi_1]=0, && \\varphi_1(a)=1,\\ \\varphi_1'(a)=0\\\\ &\\mathcal L[\\varphi_2]=0, && \\varphi_2(a)=0,\\ \\varphi_2'(a)=1 \\end{aligned}\\qquad \\mathcal L[y]:=y''-py'-qy"
          },
          {
            kind: "paragraph",
            text: {
              es: "Aquí $s_1=y(a)$ y $s_2=y'(a)$. Cada condición de contorno $\\mathcal B_k(y)=c_k$ es lineal, así que $\\mathcal B_k(y_p)+s_1\\mathcal B_k(\\varphi_1)+s_2\\mathcal B_k(\\varphi_2)=c_k$: dos ecuaciones lineales con dos incógnitas. Sirve incluso cuando una condición mezcla los dos extremos, como $y(0)+y'(0)-y(1)=1$. Cuesta tres PVI en lugar de dos. Resuelto en [[ejercicio-disparo-condiciones-acopladas]].",
              eu: "Hemen $s_1=y(a)$ eta $s_2=y'(a)$. Muga-baldintza bakoitza $\\mathcal B_k(y)=c_k$ lineala da; beraz, $\\mathcal B_k(y_p)+s_1\\mathcal B_k(\\varphi_1)+s_2\\mathcal B_k(\\varphi_2)=c_k$: bi ezezaguneko bi ekuazio lineal. Baldintza batek bi muturrak nahasten dituenean ere balio du, adibidez $y(0)+y'(0)-y(1)=1$. Hiru HBP behar dira, bi beharrean. Ebatzita: [[ejercicio-disparo-condiciones-acopladas]].",
              en: "Here $s_1=y(a)$ and $s_2=y'(a)$. Each boundary condition $\\mathcal B_k(y)=c_k$ is linear, so $\\mathcal B_k(y_p)+s_1\\mathcal B_k(\\varphi_1)+s_2\\mathcal B_k(\\varphi_2)=c_k$: two linear equations in two unknowns. It works even when a condition mixes both ends, such as $y(0)+y'(0)-y(1)=1$. It costs three IVPs instead of two. Solved in [[ejercicio-disparo-condiciones-acopladas]]."
            }
          }
        ]
      },
      {
        heading: {
          es: "Alternativa: el disparo no lineal también sirve",
          eu: "Aukera: jaurtiketa ez-linealak ere balio du",
          en: "Alternative: nonlinear shooting also works"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Se puede tratar cualquier problema lineal con el [[frontera-disparo-no-lineal|disparo no lineal]]: se dispara con un parámetro $t$ y se busca un cero de la función de fallo $F(t)$. Para una ecuación lineal, $F$ es **afín** en $t$ (una recta), así que la secante encuentra la raíz exacta en **una sola iteración** a partir de dos disparos cualesquiera. Es la misma cuenta que $y_1+s\\,y_2$ con otro nombre.",
              eu: "Edozein problema lineal [[frontera-disparo-no-lineal|jaurtiketa ez-linealarekin]] trata daiteke: $t$ parametro batekin jaurtitzen da eta $F(t)$ huts-funtzioaren zero bat bilatzen da. Ekuazio lineal baterako, $F$ **afina** da $t$-rekiko (zuzen bat); beraz, sekanteak erro zehatza aurkitzen du **iterazio bakar batean**, edozein bi jaurtiketatik abiatuta. $y_1+s\\,y_2$ kontu bera da, beste izen batekin.",
              en: "Any linear problem can be handled with [[frontera-disparo-no-lineal|nonlinear shooting]]: shoot with a parameter $t$ and look for a zero of the miss function $F(t)$. For a linear equation $F$ is **affine** in $t$ (a straight line), so the secant finds the exact root in **a single iteration** from any two shots. It is the same computation as $y_1+s\\,y_2$ under another name."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "frontera-disparo-no-lineal",
    category: "Problemas de frontera",
    level: "medio",
    searchIntent: "metodo de disparo no lineal secante problema de frontera pendiente inicial",
    title: {
      es: "Disparo no lineal con el método de la secante",
      eu: "Jaurtiketa ez-lineala sekantearen metodoarekin",
      en: "Nonlinear shooting with the secant method"
    },
    description: {
      es: "Para $y''=f(x,y,y')$ se dispara con pendiente $t$ y se resuelve la ecuación escalar $F(t)=y(t,b)-\\beta=0$ con la secante. Algoritmo, elección de disparos iniciales, gráficas y ejemplo completo.",
      eu: "$y''=f(x,y,y')$ kasurako $t$ maldarekin jaurtitzen da eta $F(t)=y(t,b)-\\beta=0$ ekuazio eskalarra sekantearekin ebazten da. Algoritmoa, hasierako jaurtiketen aukeraketa, grafikoak eta adibide osoa.",
      en: "For $y''=f(x,y,y')$ we shoot with slope $t$ and solve the scalar equation $F(t)=y(t,b)-\\beta=0$ with the secant method. Algorithm, choice of initial shots, plots and a complete example."
    },
    keywords: ["disparo no lineal", "nonlinear shooting", "secante", "problema de frontera no lineal"],
    prerequisites: ["frontera-disparo-lineal", "no-lineales-secante-steffensen"],
    related: ["frontera-disparo-newton", "ejercicio-disparo-secante", "ejercicio-disparo-no-lineal-tres-problemas"],
    code: [nonlinearNotebook, convergenceNotebook, repoLink],
    sections: [
      {
        heading: {
          es: "Por qué ya no vale la superposición",
          eu: "Zergatik ez duen gainezarpenak balio",
          en: "Why superposition no longer works"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "El truco $y=y_1+Cy_2$ se basa en que la suma de soluciones (de la homogénea) es solución. En $y''=yy'+x$ eso es falso: si $y_1$ e $y_2$ son soluciones, $(y_1+y_2)(y_1+y_2)'$ tiene términos cruzados $y_1y_2'+y_2y_1'$ que no se cancelan. Sin superposición hay que **iterar**: probar pendientes y corregirlas.",
              eu: "$y=y_1+Cy_2$ trikimailua (homogeneoaren) soluzioen batura soluzioa izatean oinarritzen da. $y''=yy'+x$ ekuazioan hori faltsua da: $y_1$ eta $y_2$ soluzioak badira, $(y_1+y_2)(y_1+y_2)'$ adierazpenak ezeztatzen ez diren $y_1y_2'+y_2y_1'$ gai gurutzatuak ditu. Gainezarpenik gabe, **iteratu** egin behar da: maldak probatu eta zuzendu.",
              en: "The $y=y_1+Cy_2$ trick relies on sums of (homogeneous) solutions being solutions. For $y''=yy'+x$ that is false: if $y_1$ and $y_2$ are solutions, $(y_1+y_2)(y_1+y_2)'$ has cross terms $y_1y_2'+y_2y_1'$ that do not cancel. Without superposition we must **iterate**: try slopes and correct them."
            }
          }
        ]
      },
      {
        heading: {
          es: "El PVI con parámetro y la función de fallo",
          eu: "Parametrodun HBPa eta huts-funtzioa",
          en: "The parametrized IVP and the miss function"
        },
        blocks: [
          {
            kind: "formula",
            tex: "\\begin{cases} y''=f(x,y,y'), & x\\in[a,b]\\\\ y(a)=\\alpha\\\\ y'(a)=t \\end{cases}\\qquad\\Longrightarrow\\qquad y(t,x)"
          },
          {
            kind: "paragraph",
            text: {
              es: "Cada valor de $t$ produce una trayectoria distinta. La única condición que no garantizamos es la del extremo derecho, así que definimos la **función de fallo** y el problema de frontera se convierte en una ecuación escalar:",
              eu: "$t$-ren balio bakoitzak ibilbide desberdin bat sortzen du. Bermatzen ez dugun baldintza bakarra eskuineko muturrekoa da; beraz, **huts-funtzioa** definitzen dugu, eta muga-problema ekuazio eskalar bihurtzen da:",
              en: "Each value of $t$ produces a different trajectory. The only condition we do not guarantee is the one at the right end, so we define the **miss function** and the boundary value problem becomes a scalar equation:"
            }
          },
          {
            kind: "formula",
            tex: "F(t):=y(t,b)-\\beta=0"
          },
          {
            kind: "paragraph",
            text: {
              es: "No tenemos fórmula para $F$: cada evaluación cuesta resolver un PVI completo. Por eso interesan métodos de [[no-lineales-introduccion|ecuaciones no lineales]] que necesiten pocas evaluaciones, como la [[no-lineales-secante-steffensen|secante]] o [[no-lineales-newton-raphson|Newton]].",
              eu: "Ez dugu $F$-ren formularik: ebaluazio bakoitzak HBP oso bat ebaztea eskatzen du. Horregatik, ebaluazio gutxi behar dituzten [[no-lineales-introduccion|ekuazio ez-linealetarako]] metodoak interesatzen zaizkigu, [[no-lineales-secante-steffensen|sekantea]] edo [[no-lineales-newton-raphson|Newton]] kasu.",
              en: "We have no formula for $F$: each evaluation costs a full IVP solve. That is why we want [[no-lineales-introduccion|nonlinear equation]] methods that need few evaluations, such as the [[no-lineales-secante-steffensen|secant]] or [[no-lineales-newton-raphson|Newton]]."
            }
          },
          {
            kind: "plot",
            xLabel: "t = y'(1)",
            yLabel: "F(t) = y(t, 3) − 43/3",
            series: [
              {
                label: { es: "$F(t)$", eu: "$F(t)$", en: "$F(t)$" },
                points: nonlinearMiss,
                tone: "accent"
              },
              {
                label: {
                  es: "iterados de la secante",
                  eu: "sekantearen iteratuak",
                  en: "secant iterates"
                },
                points: secantIterates.slice(0, 4),
                style: "points",
                tone: "red"
              }
            ],
            markers: [
              { x: secantIterates[0][0], y: secantIterates[0][1], label: "t₀", tone: "red" },
              { x: secantIterates[1][0], y: secantIterates[1][1], label: "t₁", tone: "red" },
              { x: secantIterates[2][0], y: secantIterates[2][1], label: "t₂", tone: "red" },
              { x: secantIterates[3][0], y: secantIterates[3][1], label: "t₃", tone: "red" }
            ],
            caption: {
              es: "Función de fallo de $y''=\\frac18(32+2x^3-yy')$, $y(1)=17$, $y(3)=\\frac{43}{3}$. Es suave y monótona, con una única raíz en $t^*\\approx-14$. La secante parte de $t_0=0$, $t_1=-\\frac43$ y salta a $t_2\\approx-16.53$.",
              eu: "$y''=\\frac18(32+2x^3-yy')$, $y(1)=17$, $y(3)=\\frac{43}{3}$ problemaren huts-funtzioa. Leuna eta monotonoa da, erro bakarrarekin $t^*\\approx-14$-n. Sekantea $t_0=0$, $t_1=-\\frac43$-tik abiatzen da eta $t_2\\approx-16.53$-ra jauzi egiten du.",
              en: "Miss function of $y''=\\frac18(32+2x^3-yy')$, $y(1)=17$, $y(3)=\\frac{43}{3}$. It is smooth and monotone, with a single root at $t^*\\approx-14$. The secant starts from $t_0=0$, $t_1=-\\frac43$ and jumps to $t_2\\approx-16.53$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Iteración de la secante",
          eu: "Sekantearen iterazioa",
          en: "Secant iteration"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "A partir de dos disparos $t_0$, $t_1$, la [[no-lineales-secante-steffensen|secante]] sustituye $F$ por la recta que pasa por $(t_{k-1},F(t_{k-1}))$ y $(t_k,F(t_k))$ y toma su corte con el eje. Como $F(t)=y(t,b)-\\beta$, la diferencia $F(t_k)-F(t_{k-1})$ es simplemente $y(t_k,b)-y(t_{k-1},b)$:",
              eu: "$t_0$, $t_1$ bi jaurtiketatik abiatuta, [[no-lineales-secante-steffensen|sekanteak]] $F$ ordezkatzen du $(t_{k-1},F(t_{k-1}))$ eta $(t_k,F(t_k))$ puntuetatik igarotzen den zuzenaz, eta ardatzarekiko ebakidura hartzen du. $F(t)=y(t,b)-\\beta$ denez, $F(t_k)-F(t_{k-1})$ diferentzia $y(t_k,b)-y(t_{k-1},b)$ besterik ez da:",
              en: "From two shots $t_0$, $t_1$, the [[no-lineales-secante-steffensen|secant]] replaces $F$ by the line through $(t_{k-1},F(t_{k-1}))$ and $(t_k,F(t_k))$ and takes its axis crossing. Since $F(t)=y(t,b)-\\beta$, the difference $F(t_k)-F(t_{k-1})$ is just $y(t_k,b)-y(t_{k-1},b)$:"
            }
          },
          {
            kind: "formula",
            tex: "t_{k+1}=t_k-\\frac{F(t_k)\\,(t_k-t_{k-1})}{F(t_k)-F(t_{k-1})}=t_k-\\frac{\\bigl(y(t_k,b)-\\beta\\bigr)(t_k-t_{k-1})}{y(t_k,b)-y(t_{k-1},b)},\\qquad k=1,2,\\dots"
          },
          {
            kind: "paragraph",
            text: {
              es: "Se para cuando $|y(t_k,b)-\\beta|<\\text{tol}$ o al agotar un máximo de iteraciones. Cada iteración cuesta **un** PVI nuevo, porque $y(t_{k-1},b)$ ya se había calculado.",
              eu: "$|y(t_k,b)-\\beta|<\\text{tol}$ denean edo iterazio kopuru maximoa agortzean gelditzen da. Iterazio bakoitzak HBP **bat** berri eskatzen du, $y(t_{k-1},b)$ lehendik kalkulatuta baitzegoen.",
              en: "Stop when $|y(t_k,b)-\\beta|<\\text{tol}$ or when a maximum number of iterations runs out. Each iteration costs **one** new IVP, since $y(t_{k-1},b)$ was already computed."
            }
          }
        ]
      },
      {
        heading: {
          es: "Algoritmo",
          eu: "Algoritmoa",
          en: "Algorithm"
        },
        blocks: [
          {
            kind: "steps",
            title: {
              es: "Disparo no lineal con secante (condiciones Dirichlet)",
              eu: "Jaurtiketa ez-lineala sekantearekin (Dirichlet baldintzak)",
              en: "Nonlinear shooting with secant (Dirichlet conditions)"
            },
            steps: [
              {
                text: {
                  es: "**Entrada:** $f$; $a$, $b$; $\\alpha$, $\\beta$; $N$; tolerancia $\\text{tol}$; máximo de iteraciones. **Salida:** $y_i\\approx y(x_i)$, $y'_i\\approx y'(x_i)$ o mensaje de fracaso.",
                  eu: "**Sarrera:** $f$; $a$, $b$; $\\alpha$, $\\beta$; $N$; $\\text{tol}$ tolerantzia; iterazio kopuru maximoa. **Irteera:** $y_i\\approx y(x_i)$, $y'_i\\approx y'(x_i)$ edo porrot-mezua.",
                  en: "**Input:** $f$; $a$, $b$; $\\alpha$, $\\beta$; $N$; tolerance $\\text{tol}$; maximum iterations. **Output:** $y_i\\approx y(x_i)$, $y'_i\\approx y'(x_i)$ or a failure message."
                }
              },
              {
                text: {
                  es: "Nodos $x_i=a+ih$, $h=(b-a)/N$. Dos pendientes iniciales, por ejemplo $t_0=0$ y $t_1=\\frac{\\beta-\\alpha}{b-a}$ (la pendiente de la recta que une los extremos).",
                  eu: "$x_i=a+ih$ nodoak, $h=(b-a)/N$. Hasierako bi malda, adibidez $t_0=0$ eta $t_1=\\frac{\\beta-\\alpha}{b-a}$ (muturrak lotzen dituen zuzenaren malda).",
                  en: "Nodes $x_i=a+ih$, $h=(b-a)/N$. Two initial slopes, e.g. $t_0=0$ and $t_1=\\frac{\\beta-\\alpha}{b-a}$ (slope of the line joining the endpoints)."
                }
              },
              {
                text: {
                  es: "Resolver el sistema $u_1'=u_2$, $u_2'=f(x,u_1,u_2)$ con $u_1(a)=\\alpha$, $u_2(a)=t_0$ y luego con $t_1$. Guardar $y(t_0,b)$ e $y(t_1,b)$ (último valor de la primera componente).",
                  eu: "$u_1'=u_2$, $u_2'=f(x,u_1,u_2)$ sistema ebatzi $u_1(a)=\\alpha$, $u_2(a)=t_0$ baldintzekin eta gero $t_1$-ekin. $y(t_0,b)$ eta $y(t_1,b)$ gorde (lehen osagaiaren azken balioa).",
                  en: "Solve the system $u_1'=u_2$, $u_2'=f(x,u_1,u_2)$ with $u_1(a)=\\alpha$, $u_2(a)=t_0$ and then with $t_1$. Store $y(t_0,b)$ and $y(t_1,b)$ (last value of the first component)."
                }
              },
              {
                text: {
                  es: "Mientras $|y(t_1,b)-\\beta|>\\text{tol}$ y no se supere el máximo: calcular $t$ con la fórmula de la secante, hacer $t_0\\leftarrow t_1$, $t_1\\leftarrow t$, resolver el PVI con $t_1$ y actualizar los valores en $b$.",
                  eu: "$|y(t_1,b)-\\beta|>\\text{tol}$ den bitartean eta maximoa gainditu gabe: $t$ kalkulatu sekantearen formularekin, $t_0\\leftarrow t_1$, $t_1\\leftarrow t$ egin, HBPa $t_1$-ekin ebatzi eta $b$-ko balioak eguneratu.",
                  en: "While $|y(t_1,b)-\\beta|>\\text{tol}$ and the maximum is not exceeded: compute $t$ with the secant formula, set $t_0\\leftarrow t_1$, $t_1\\leftarrow t$, solve the IVP with $t_1$ and update the values at $b$."
                }
              },
              {
                text: {
                  es: "Al salir, comprobar **por qué** se ha salido: si fue por tolerancia, la última trayectoria es la solución; si fue por el máximo de iteraciones, informar del fracaso (y probar otros $t_0$, $t_1$).",
                  eu: "Irtetean, egiaztatu **zergatik** irten den: tolerantziagatik izan bada, azken ibilbidea da soluzioa; iterazio maximoagatik izan bada, porrotaren berri eman (eta beste $t_0$, $t_1$ batzuk probatu).",
                  en: "On exit, check **why** the loop ended: if by tolerance, the last trajectory is the solution; if by the iteration cap, report failure (and try other $t_0$, $t_1$)."
                }
              }
            ]
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Dos fuentes de error",
              eu: "Bi errore-iturri",
              en: "Two sources of error"
            },
            text: {
              es: "El error final combina el del método de valor inicial ($\\mathcal O(h^4)$ con RK4) y el de la iteración, controlado por $\\text{tol}$. No tiene sentido pedir $\\text{tol}=10^{-12}$ si RK4 con ese $h$ solo da $10^{-5}$: conviene que ambas sean del mismo orden. Resolver todos los PVI con el mismo método permite conocer el orden de convergencia del conjunto.",
              eu: "Azken erroreak hasierako balioko metodoarena ($\\mathcal O(h^4)$ RK4rekin) eta iterazioarena konbinatzen ditu, azken hau $\\text{tol}$-ek kontrolatua. Ez du zentzurik $\\text{tol}=10^{-12}$ eskatzeak RK4k $h$ horrekin $10^{-5}$ bakarrik ematen badu: komeni da biak ordena berekoak izatea. HBP guztiak metodo berarekin ebazteak multzoaren konbergentzia-ordena ezagutzeko aukera ematen du.",
              en: "The final error combines that of the initial value method ($\\mathcal O(h^4)$ with RK4) and that of the iteration, controlled by $\\text{tol}$. There is no point asking for $\\text{tol}=10^{-12}$ if RK4 with that $h$ only gives $10^{-5}$: keep both of the same size. Solving all IVPs with the same method tells you the overall convergence order."
            }
          }
        ]
      },
      {
        heading: {
          es: "Ejemplo completo",
          eu: "Adibide osoa",
          en: "Complete example"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Para $y''=\\frac18(32+2x^3-yy')$, $x\\in[1,3]$, $y(1)=17$, $y(3)=\\frac{43}{3}$, con RK4, $h=0.1$ y $\\text{tol}=10^{-5}$, la secante converge así (detalle en [[ejercicio-disparo-secante]]):",
              eu: "$y''=\\frac18(32+2x^3-yy')$, $x\\in[1,3]$, $y(1)=17$, $y(3)=\\frac{43}{3}$ problemarako, RK4, $h=0.1$ eta $\\text{tol}=10^{-5}$ erabiliz, sekantea honela konbergitzen da (xehetasunak: [[ejercicio-disparo-secante]]):",
              en: "For $y''=\\frac18(32+2x^3-yy')$, $x\\in[1,3]$, $y(1)=17$, $y(3)=\\frac{43}{3}$, with RK4, $h=0.1$ and $\\text{tol}=10^{-5}$, the secant converges as follows (details in [[ejercicio-disparo-secante]]):"
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
              ["0", "0", "21.018500", "$6.685167$"],
              ["1", "−1.333333", "20.479202", "$6.145869$"],
              ["2", "−16.528084", "12.768939", "$-1.564395$"],
              ["3", "−13.445105", "14.656332", "$0.322998$"],
              ["4", "−13.972710", "14.349485", "$1.615\\cdot10^{-2}$"],
              ["5", "−14.000481", "14.333163", "$-1.702\\cdot10^{-4}$"],
              ["6", "−14.000192", "14.333333", "$8.93\\cdot10^{-8}$"]
            ]
          },
          {
            kind: "plot",
            xLabel: "x",
            yLabel: "y",
            series: [
              {
                label: { es: "exacta $x^2+16/x$", eu: "zehatza $x^2+16/x$", en: "exact $x^2+16/x$" },
                points: nonlinearExact,
                tone: "muted"
              },
              {
                label: {
                  es: "disparo final ($t_6$), nodos",
                  eu: "azken jaurtiketa ($t_6$), nodoak",
                  en: "final shot ($t_6$), nodes"
                },
                points: nonlinearFan[2].points.filter((_, i) => i % 2 === 0),
                style: "points",
                tone: "accent"
              }
            ],
            caption: {
              es: "La trayectoria del último disparo coincide con la solución exacta; el error máximo en los nodos es $6.2\\cdot10^{-5}$.",
              eu: "Azken jaurtiketaren ibilbidea soluzio zehatzarekin bat dator; nodoetako errore maximoa $6.2\\cdot10^{-5}$ da.",
              en: "The last shot's trajectory matches the exact solution; the maximum nodal error is $6.2\\cdot10^{-5}$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Elección de los disparos iniciales y peligros",
          eu: "Hasierako jaurtiketen aukeraketa eta arriskuak",
          en: "Choosing the initial shots and pitfalls"
        },
        blocks: [
          {
            kind: "list",
            items: {
              es: [
                "La elección de $t_0$, $t_1$ es libre. La pendiente de la cuerda $\\frac{\\beta-\\alpha}{b-a}$ es un buen punto de partida; si el proceso no converge, se cambian.",
                "Si la ecuación tiene términos como $y^3$ o $e^y$, un disparo con pendiente mala puede **explotar** antes de llegar a $b$: $F(t)$ deja de estar definida. Hay que acotar las pendientes o empezar cerca. Ver [[ejercicio-disparo-sensibilidad]].",
                "$F$ puede tener varias raíces (el problema de frontera tiene varias soluciones) o ninguna. Dibujar $F(t)$ en una malla de valores de $t$ antes de iterar es barato y aclara mucho.",
                "Si la ecuación es lineal, $F$ es una recta y la secante acierta en una iteración."
              ],
              eu: [
                "$t_0$, $t_1$ askatasunez aukeratzen dira. $\\frac{\\beta-\\alpha}{b-a}$ korda-malda abiapuntu ona da; prozesuak konbergitzen ez badu, aldatu egiten dira.",
                "Ekuazioak $y^3$ edo $e^y$ bezalako gaiak baditu, malda txarreko jaurtiketa batek **lehertu** egin dezake $b$-ra iritsi aurretik: $F(t)$ definitu gabe geratzen da. Maldak mugatu edo hurbiletik hasi behar da. Ikus [[ejercicio-disparo-sensibilidad]].",
                "$F$-k hainbat erro izan ditzake (muga-problemak hainbat soluzio ditu) edo bat ere ez. Iteratu aurretik $F(t)$ $t$ balio-sare batean marraztea merkea da eta asko argitzen du.",
                "Ekuazioa lineala bada, $F$ zuzen bat da eta sekanteak iterazio batean asmatzen du."
              ],
              en: [
                "The choice of $t_0$, $t_1$ is free. The chord slope $\\frac{\\beta-\\alpha}{b-a}$ is a good start; if the process does not converge, change them.",
                "If the equation has terms like $y^3$ or $e^y$, a shot with a bad slope may **blow up** before reaching $b$: $F(t)$ is then undefined. Bound the slopes or start close. See [[ejercicio-disparo-sensibilidad]].",
                "$F$ may have several roots (the BVP has several solutions) or none. Plotting $F(t)$ on a grid of $t$ values before iterating is cheap and very revealing.",
                "If the equation is linear, $F$ is a straight line and the secant hits in one iteration."
              ]
            }
          },
          {
            kind: "paragraph",
            text: {
              es: "Condiciones no Dirichlet: la idea se mantiene cambiando la función de fallo. Con $u(3)-u'(3)=\\beta$ se toma $F(t)=u(3,t)-u'(3,t)-\\beta$ y la secante usa esos valores. Con una condición natural en $a$, se parametriza de forma que se cumpla para todo $t$ (por ejemplo $u(1)=t$, $u'(1)=\\alpha-t$ para $u(1)+u'(1)=\\alpha$). La versión con derivada se ve en [[frontera-disparo-newton]].",
              eu: "Dirichlet ez diren baldintzak: ideia bera da, huts-funtzioa aldatuta. $u(3)-u'(3)=\\beta$ baldintzarekin $F(t)=u(3,t)-u'(3,t)-\\beta$ hartzen da eta sekanteak balio horiek erabiltzen ditu. $a$-n baldintza natural bat badago, $t$ guztietarako bete dadin parametrizatzen da (adibidez $u(1)=t$, $u'(1)=\\alpha-t$ $u(1)+u'(1)=\\alpha$ baldintzarako). Deribatudun bertsioa: [[frontera-disparo-newton]].",
              en: "Non-Dirichlet conditions: the idea stays, only the miss function changes. With $u(3)-u'(3)=\\beta$ take $F(t)=u(3,t)-u'(3,t)-\\beta$ and feed those values to the secant. With a natural condition at $a$, parametrize so that it holds for every $t$ (e.g. $u(1)=t$, $u'(1)=\\alpha-t$ for $u(1)+u'(1)=\\alpha$). The derivative-based version is in [[frontera-disparo-newton]]."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "frontera-disparo-newton",
    category: "Problemas de frontera",
    level: "avanzado",
    searchIntent: "metodo de disparo newton ecuacion variacional problema de frontera no lineal",
    title: {
      es: "Disparo no lineal con el método de Newton",
      eu: "Jaurtiketa ez-lineala Newtonen metodoarekin",
      en: "Nonlinear shooting with Newton's method"
    },
    description: {
      es: "Newton para $F(t)=y(t,b)-\\beta$: la derivada $F'(t)$ se obtiene resolviendo la ecuación variacional $z''=f_yz+f_{y'}z'$ junto al PVI, en un único sistema de cuatro ecuaciones. Convergencia cuadrática y condiciones no Dirichlet.",
      eu: "Newton $F(t)=y(t,b)-\\beta$ funtziorako: $F'(t)$ deribatua $z''=f_yz+f_{y'}z'$ ekuazio bariazionala HBParekin batera ebatziz lortzen da, lau ekuazioko sistema bakar batean. Konbergentzia koadratikoa eta Dirichlet ez diren baldintzak.",
      en: "Newton for $F(t)=y(t,b)-\\beta$: the derivative $F'(t)$ comes from solving the variational equation $z''=f_yz+f_{y'}z'$ alongside the IVP, in a single four-equation system. Quadratic convergence and non-Dirichlet conditions."
    },
    keywords: ["disparo Newton", "ecuación variacional", "sensibilidad", "shooting Newton", "problema de frontera"],
    prerequisites: ["frontera-disparo-no-lineal", "no-lineales-newton-raphson"],
    related: ["ejercicio-disparo-newton", "ejercicio-disparo-newton-robin", "frontera-disparo-orden-superior"],
    code: [nonlinearNotebook, convergenceNotebook, repoLink],
    sections: [
      {
        heading: {
          es: "Newton aplicado a la función de fallo",
          eu: "Newton huts-funtzioari aplikatuta",
          en: "Newton applied to the miss function"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "El método de [[no-lineales-newton-raphson|Newton]] para $F(t)=0$ parte de una sola aproximación $t_0$:",
              eu: "$F(t)=0$ ebazteko [[no-lineales-newton-raphson|Newtonen]] metodoa $t_0$ hurbilketa bakar batetik abiatzen da:",
              en: "[[no-lineales-newton-raphson|Newton's]] method for $F(t)=0$ starts from a single approximation $t_0$:"
            }
          },
          {
            kind: "formula",
            tex: "t_{k+1}=t_k-\\frac{F(t_k)}{F'(t_k)}=t_k-\\frac{y(t_k,b)-\\beta}{\\dfrac{\\partial y}{\\partial t}(t_k,b)},\\qquad k=0,1,\\dots"
          },
          {
            kind: "paragraph",
            text: {
              es: "El numerador sale del disparo. El denominador es el problema: no tenemos fórmula de $y(t,b)$ para derivarla. La solución es derivar **la ecuación diferencial** respecto de $t$.",
              eu: "Zenbakitzailea jaurtiketatik ateratzen da. Izendatzailea da arazoa: ez dugu $y(t,b)$-ren formularik deribatzeko. Irtenbidea **ekuazio diferentziala** $t$-rekiko deribatzea da.",
              en: "The numerator comes from the shot. The denominator is the problem: we have no formula for $y(t,b)$ to differentiate. The way out is to differentiate **the differential equation** with respect to $t$."
            }
          }
        ]
      },
      {
        heading: {
          es: "La ecuación variacional",
          eu: "Ekuazio bariazionala",
          en: "The variational equation"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Llamamos $z(t,x)=\\frac{\\partial y}{\\partial t}(t,x)$: cuánto se mueve la trayectoria en cada punto $x$ al cambiar un poco la pendiente inicial. Derivando el PVI respecto de $t$ se obtiene otro PVI, **lineal** en $z$:",
              eu: "$z(t,x)=\\frac{\\partial y}{\\partial t}(t,x)$ deitzen diogu: hasierako malda pixka bat aldatzean ibilbidea $x$ puntu bakoitzean zenbat mugitzen den. HBPa $t$-rekiko deribatuz beste HBP bat lortzen da, $z$-rekiko **lineala**:",
              en: "Let $z(t,x)=\\frac{\\partial y}{\\partial t}(t,x)$: how much the trajectory moves at each $x$ when the initial slope changes slightly. Differentiating the IVP with respect to $t$ gives another IVP, **linear** in $z$:"
            }
          },
          {
            kind: "formula",
            tex: "z''=f_y(x,y,y')\\,z+f_{y'}(x,y,y')\\,z',\\qquad z(a)=0,\\qquad z'(a)=1"
          },
          { kind: "derivation", slug: "deduccion-ecuacion-variacional" },
          {
            kind: "paragraph",
            text: {
              es: "Los coeficientes $f_y$ y $f_{y'}$ se evalúan sobre la trayectoria $y(t,x)$, así que ambos PVI se resuelven **a la vez**. Con $y_1=y$, $y_2=y'$, $y_3=z$, $y_4=z'$:",
              eu: "$f_y$ eta $f_{y'}$ koefizienteak $y(t,x)$ ibilbidean ebaluatzen dira; beraz, bi HBPak **aldi berean** ebazten dira. $y_1=y$, $y_2=y'$, $y_3=z$, $y_4=z'$ eginda:",
              en: "The coefficients $f_y$ and $f_{y'}$ are evaluated along the trajectory $y(t,x)$, so both IVPs are solved **together**. With $y_1=y$, $y_2=y'$, $y_3=z$, $y_4=z'$:"
            }
          },
          {
            kind: "formula",
            tex: "\\begin{cases} y_1'=y_2 & y_1(a)=\\alpha\\\\ y_2'=f(x,y_1,y_2) & y_2(a)=t\\\\ y_3'=y_4 & y_3(a)=0\\\\ y_4'=f_y(x,y_1,y_2)\\,y_3+f_{y'}(x,y_1,y_2)\\,y_4 & y_4(a)=1 \\end{cases}"
          },
          {
            kind: "paragraph",
            text: {
              es: "Al final, $F(t_k)=y_1(b)-\\beta$ y $F'(t_k)=y_3(b)$: el último valor de la primera y de la tercera componente.",
              eu: "Amaieran, $F(t_k)=y_1(b)-\\beta$ eta $F'(t_k)=y_3(b)$: lehen eta hirugarren osagaien azken balioak.",
              en: "At the end, $F(t_k)=y_1(b)-\\beta$ and $F'(t_k)=y_3(b)$: the last value of the first and third components."
            }
          }
        ]
      },
      {
        heading: {
          es: "Algoritmo",
          eu: "Algoritmoa",
          en: "Algorithm"
        },
        blocks: [
          {
            kind: "steps",
            title: {
              es: "Disparo no lineal con Newton",
              eu: "Jaurtiketa ez-lineala Newtonekin",
              en: "Nonlinear shooting with Newton"
            },
            steps: [
              {
                text: {
                  es: "**Entrada:** $f$, $f_y$, $f_{y'}$; $a$, $b$; $\\alpha$, $\\beta$; $N$; $\\text{tol}$; máximo de iteraciones. Nodos $x_i=a+ih$ y un valor inicial, por ejemplo $t_0=\\frac{\\beta-\\alpha}{b-a}$.",
                  eu: "**Sarrera:** $f$, $f_y$, $f_{y'}$; $a$, $b$; $\\alpha$, $\\beta$; $N$; $\\text{tol}$; iterazio maximoa. $x_i=a+ih$ nodoak eta hasierako balio bat, adibidez $t_0=\\frac{\\beta-\\alpha}{b-a}$.",
                  en: "**Input:** $f$, $f_y$, $f_{y'}$; $a$, $b$; $\\alpha$, $\\beta$; $N$; $\\text{tol}$; maximum iterations. Nodes $x_i=a+ih$ and a starting value, e.g. $t_0=\\frac{\\beta-\\alpha}{b-a}$."
                }
              },
              {
                text: {
                  es: "Resolver el sistema de cuatro ecuaciones con $(\\alpha,t_k,0,1)$. Tomar $y_b=y_1(b)$ y $z_b=y_3(b)$.",
                  eu: "Lau ekuazioko sistema ebatzi $(\\alpha,t_k,0,1)$ datuekin. $y_b=y_1(b)$ eta $z_b=y_3(b)$ hartu.",
                  en: "Solve the four-equation system with $(\\alpha,t_k,0,1)$. Take $y_b=y_1(b)$ and $z_b=y_3(b)$."
                }
              },
              {
                text: {
                  es: "Si $|y_b-\\beta|<\\text{tol}$, parar: las dos primeras componentes son $y_i$ e $y'_i$.",
                  eu: "$|y_b-\\beta|<\\text{tol}$ bada, gelditu: lehen bi osagaiak $y_i$ eta $y'_i$ dira.",
                  en: "If $|y_b-\\beta|<\\text{tol}$, stop: the first two components are $y_i$ and $y'_i$."
                }
              },
              {
                text: {
                  es: "Si no, actualizar y volver al paso 2:",
                  eu: "Bestela, eguneratu eta 2. urratsera itzuli:",
                  en: "Otherwise update and go back to step 2:"
                },
                formula: "t_{k+1}=t_k-\\frac{y_b-\\beta}{z_b}"
              },
              {
                text: {
                  es: "Si se agota el máximo de iteraciones, informar del fracaso y probar otro $t_0$.",
                  eu: "Iterazio maximoa agortzen bada, porrotaren berri eman eta beste $t_0$ bat probatu.",
                  en: "If the iteration cap is reached, report failure and try another $t_0$."
                }
              }
            ]
          }
        ]
      },
      {
        heading: {
          es: "Secante frente a Newton",
          eu: "Sekantea versus Newton",
          en: "Secant versus Newton"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Para el mismo problema $y''=\\frac18(32+2x^3-yy')$ (con $f_y=-\\frac{y'}8$, $f_{y'}=-\\frac y8$), $h=0.1$ y $t_0=0$, Newton llega a $|F|<10^{-8}$ en 4 iteraciones; la secante necesita 6 para $10^{-5}$. Ver [[ejercicio-disparo-newton]].",
              eu: "Problema bererako, $y''=\\frac18(32+2x^3-yy')$ ($f_y=-\\frac{y'}8$, $f_{y'}=-\\frac y8$ izanik), $h=0.1$ eta $t_0=0$, Newton $|F|<10^{-8}$-ra iristen da 4 iteraziotan; sekanteak 6 behar ditu $10^{-5}$-erako. Ikus [[ejercicio-disparo-newton]].",
              en: "For the same problem $y''=\\frac18(32+2x^3-yy')$ (with $f_y=-\\frac{y'}8$, $f_{y'}=-\\frac y8$), $h=0.1$ and $t_0=0$, Newton reaches $|F|<10^{-8}$ in 4 iterations; the secant needs 6 for $10^{-5}$. See [[ejercicio-disparo-newton]]."
            }
          },
          {
            kind: "plot",
            xLabel: "k",
            yLabel: "|F(tₖ)|",
            logY: true,
            series: [
              {
                label: { es: "secante", eu: "sekantea", en: "secant" },
                points: convergenceHistory.secant,
                style: "line-points",
                tone: "blue"
              },
              {
                label: { es: "Newton", eu: "Newton", en: "Newton" },
                points: convergenceHistory.newton,
                style: "line-points",
                tone: "red"
              }
            ],
            caption: {
              es: "Error en el extremo derecho por iteración (escala logarítmica). Cerca de la raíz Newton duplica las cifras correctas en cada paso (orden 2); la secante avanza con orden $\\approx1.618$.",
              eu: "Eskuineko muturreko errorea iterazioko (eskala logaritmikoa). Errotik hurbil, Newtonek urrats bakoitzean bikoizten ditu zifra zuzenak (2. ordena); sekanteak $\\approx1.618$ ordenarekin egiten du aurrera.",
              en: "Right-end error per iteration (log scale). Near the root Newton doubles the correct digits each step (order 2); the secant progresses with order $\\approx1.618$."
            }
          },
          {
            kind: "list",
            items: {
              es: [
                "**Orden local**: secante $\\frac{1+\\sqrt5}2\\approx1.618$; Newton $2$.",
                "**Valores iniciales**: secante necesita $t_0$ y $t_1$; Newton solo $t_0$.",
                "**Coste por iteración**: secante, un sistema de 2 EDO; Newton, un sistema de 4 EDO.",
                "**Información necesaria**: secante solo $f$; Newton también $f_y$ y $f_{y'}$.",
                "**[[no-lineales-orden-eficiencia|Eficiencia]]**: Newton cuesta el doble por iteración pero necesita menos iteraciones; con $f$ complicada, derivar $f_y$, $f_{y'}$ a mano es el verdadero coste."
              ],
              eu: [
                "**Ordena lokala**: sekantea $\\frac{1+\\sqrt5}2\\approx1.618$; Newton $2$.",
                "**Hasierako balioak**: sekanteak $t_0$ eta $t_1$ behar ditu; Newtonek $t_0$ bakarrik.",
                "**Iterazio bakoitzeko kostua**: sekantea, 2 EDOko sistema bat; Newton, 4 EDOko sistema bat.",
                "**Behar den informazioa**: sekanteak $f$ bakarrik; Newtonek $f_y$ eta $f_{y'}$ ere bai.",
                "**[[no-lineales-orden-eficiencia|Eraginkortasuna]]**: Newtonek iterazio bakoitzeko bikoitza kostatzen du, baina iterazio gutxiago behar ditu; $f$ korapilatsua bada, $f_y$, $f_{y'}$ eskuz deribatzea da benetako kostua."
              ],
              en: [
                "**Local order**: secant $\\frac{1+\\sqrt5}2\\approx1.618$; Newton $2$.",
                "**Starting values**: the secant needs $t_0$ and $t_1$; Newton only $t_0$.",
                "**Cost per iteration**: secant, a system of 2 ODEs; Newton, a system of 4 ODEs.",
                "**Information needed**: the secant only $f$; Newton also $f_y$ and $f_{y'}$.",
                "**[[no-lineales-orden-eficiencia|Efficiency]]**: Newton costs twice as much per iteration but needs fewer iterations; with a complicated $f$, deriving $f_y$, $f_{y'}$ by hand is the real cost."
              ]
            }
          }
        ]
      },
      {
        heading: {
          es: "Condiciones naturales con Newton",
          eu: "Baldintza naturalak Newtonekin",
          en: "Natural conditions with Newton"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Con condiciones que mezclan $y$ e $y'$, se parametriza el dato inicial para que la condición izquierda se cumpla para todo $t$ y se define $F$ con la condición derecha. Los datos iniciales de $z$ son **las derivadas respecto de $t$ de los datos iniciales de $y$**. Por ejemplo, para $u(1)+u'(1)=\\alpha$, $u(3)+u'(3)=\\beta$:",
              eu: "$y$ eta $y'$ nahasten dituzten baldintzekin, hasierako datua parametrizatzen da ezkerreko baldintza $t$ guztietarako bete dadin, eta $F$ eskuineko baldintzarekin definitzen da. $z$-ren hasierako datuak **$y$-ren hasierako datuen $t$-rekiko deribatuak** dira. Adibidez, $u(1)+u'(1)=\\alpha$, $u(3)+u'(3)=\\beta$ kasurako:",
              en: "With conditions mixing $y$ and $y'$, parametrize the initial data so that the left condition holds for every $t$ and define $F$ from the right condition. The initial data of $z$ are **the $t$-derivatives of the initial data of $y$**. For instance, for $u(1)+u'(1)=\\alpha$, $u(3)+u'(3)=\\beta$:"
            }
          },
          {
            kind: "formula",
            tex: "u(1)=t,\\; u'(1)=\\alpha-t\\;\\Rightarrow\\; z(1)=1,\\; z'(1)=-1;\\qquad F(t)=u(3,t)+u'(3,t)-\\beta,\\qquad F'(t)=z(3,t)+z'(3,t)"
          },
          {
            kind: "paragraph",
            text: {
              es: "El caso completo, temperatura en un anillo, se resuelve en [[ejercicio-disparo-newton-robin]]. Como allí la ecuación es lineal, $F$ es afín y Newton acierta en una iteración.",
              eu: "Kasu osoa, eraztun bateko tenperatura, [[ejercicio-disparo-newton-robin]] ariketan ebazten da. Han ekuazioa lineala denez, $F$ afina da eta Newtonek iterazio batean asmatzen du.",
              en: "The full case, temperature in an annulus, is solved in [[ejercicio-disparo-newton-robin]]. Since the equation there is linear, $F$ is affine and Newton hits in one iteration."
            }
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Sin derivadas analíticas",
              eu: "Deribatu analitikorik gabe",
              en: "Without analytic derivatives"
            },
            text: {
              es: "Si $f_y$, $f_{y'}$ son engorrosas, se puede aproximar $F'(t)\\approx\\frac{F(t+\\delta)-F(t)}{\\delta}$ con un $\\delta$ pequeño ([[diferenciacion-primera-derivada|diferencia progresiva]]). Cuesta un disparo extra por iteración y la convergencia deja de ser exactamente cuadrática, pero evita derivar a mano.",
              eu: "$f_y$, $f_{y'}$ astunak badira, $F'(t)\\approx\\frac{F(t+\\delta)-F(t)}{\\delta}$ hurbil daiteke $\\delta$ txiki batekin ([[diferenciacion-primera-derivada|diferentzia progresiboa]]). Iterazio bakoitzeko jaurtiketa bat gehiago kostatzen du eta konbergentzia ez da jada zehazki koadratikoa, baina eskuz deribatzea saihesten du.",
              en: "If $f_y$, $f_{y'}$ are messy, approximate $F'(t)\\approx\\frac{F(t+\\delta)-F(t)}{\\delta}$ with a small $\\delta$ ([[diferenciacion-primera-derivada|forward difference]]). It costs one extra shot per iteration and convergence is no longer exactly quadratic, but it avoids differentiating by hand."
            }
          }
        ]
      }
    ]
  },
  {
    slug: "frontera-disparo-orden-superior",
    category: "Problemas de frontera",
    level: "avanzado",
    searchIntent: "metodo de disparo tercer orden cuarto orden viga varios parametros disparo hacia atras",
    title: {
      es: "Disparo para ecuaciones de orden superior",
      eu: "Jaurtiketa ordena altuagoko ekuazioetarako",
      en: "Shooting for higher-order equations"
    },
    description: {
      es: "Problemas de frontera de orden 3 y 4: cuántos parámetros hay que buscar, disparo hacia atrás, Newton con sistemas de seis ecuaciones y superposición con varios PVI para la viga.",
      eu: "3. eta 4. ordenako muga-problemak: zenbat parametro bilatu behar diren, atzerako jaurtiketa, Newton sei ekuazioko sistemekin eta gainezarpena hainbat HBPrekin habearentzat.",
      en: "Third- and fourth-order boundary value problems: how many parameters to find, shooting backwards, Newton with six-equation systems and superposition with several IVPs for the beam."
    },
    keywords: ["disparo tercer orden", "viga", "disparo hacia atrás", "disparo múltiple", "Newton sistemas"],
    prerequisites: ["frontera-disparo-newton"],
    related: [
      "ejercicio-disparo-tercer-orden",
      "ejercicio-disparo-hacia-atras-richardson",
      "ejercicio-disparo-viga",
      "sistemas-no-lineales-newton"
    ],
    sections: [
      {
        heading: {
          es: "Contar incógnitas",
          eu: "Ezezagunak zenbatu",
          en: "Counting unknowns"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Una ecuación de orden $m$ se reescribe como sistema de $m$ ecuaciones de primer orden con incógnitas $y,y',\\dots,y^{(m-1)}$, y un PVI necesita las $m$ en el punto de salida. Si en el extremo de salida hay $k$ condiciones, quedan $m-k$ **parámetros** por buscar, que se fijan con las $m-k$ condiciones del otro extremo.",
              eu: "$m$ ordenako ekuazio bat $m$ lehen ordenako ekuazioko sistema gisa berridazten da, $y,y',\\dots,y^{(m-1)}$ ezezagunekin, eta HBP batek $m$ horiek behar ditu irteera-puntuan. Irteera-muturrean $k$ baldintza badaude, $m-k$ **parametro** geratzen dira bilatzeko, beste muturreko $m-k$ baldintzekin finkatzen direnak.",
              en: "An order-$m$ equation is rewritten as a system of $m$ first-order equations in $y,y',\\dots,y^{(m-1)}$, and an IVP needs all $m$ at the starting point. If the starting end carries $k$ conditions, there remain $m-k$ **parameters** to find, fixed by the $m-k$ conditions at the other end."
            }
          },
          {
            kind: "table",
            head: {
              es: ["Problema", "Salida", "Parámetros"],
              eu: ["Problema", "Irteera", "Parametroak"],
              en: ["Problem", "Start", "Parameters"]
            },
            rows: [
              ["$y'''=f$, $y(0)=0$, $y'(0)+y''(0)=3$, $y''(1)=3e$", "$x=0$", "$y'(0)=t$"],
              ["$y'''=f$, $y(-1)=\\frac12$, $y(0)=\\frac13$, $y'(0)=-\\frac19$", "$x=0\\to-1$", "$y''(0)=t$"],
              ["$EIw^{(4)}=p-kw$, $w(0)=w''(0)=w(L)=w''(L)=0$", "$x=0$", "$w'(0)=s_1$, $w'''(0)=s_2$"],
              ["$y^{(m)}=f(x,y,\\dots,y^{(m-1)})$", "$x=a$, $k$", "$m-k$"]
            ],
            caption: {
              es: "Los dos primeros tienen un solo parámetro y se resuelven con Newton escalar; la viga es lineal y basta superponer tres PVI; con dos o más parámetros no lineales se usa [[sistemas-no-lineales-newton|Newton para sistemas]].",
              eu: "Lehen biek parametro bakarra dute eta Newton eskalarrarekin ebazten dira; habea lineala da eta nahikoa da hiru HBP gainezartzea; bi parametro ez-lineal edo gehiagorekin [[sistemas-no-lineales-newton|sistemetarako Newton]] erabiltzen da.",
              en: "The first two have a single parameter and are solved with scalar Newton; the beam is linear and superposing three IVPs is enough; with two or more nonlinear parameters use [[sistemas-no-lineales-newton|Newton for systems]]."
            }
          }
        ]
      },
      {
        heading: {
          es: "Elegir el extremo de salida: disparo hacia atrás",
          eu: "Irteera-muturra aukeratu: atzerako jaurtiketa",
          en: "Choosing the starting end: shooting backwards"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Nada obliga a salir desde $a$. En $y'''=-6y'^2-y''+2y^3$, $y(-1)=\\frac12$, $y(0)=\\frac13$, $y'(0)=-\\frac19$, el extremo $x=0$ tiene dos condiciones y $x=-1$ solo una. Disparando **desde $0$ hacia $-1$** (paso $-h$) solo falta un parámetro, $y''(0)=t$, y el problema es escalar: $F(t)=y(t,-1)-\\frac12$. Disparando desde $-1$ harían falta dos. Resuelto en [[ejercicio-disparo-hacia-atras-richardson]].",
              eu: "Ezerk ez gaitu $a$-tik irtetera behartzen. $y'''=-6y'^2-y''+2y^3$, $y(-1)=\\frac12$, $y(0)=\\frac13$, $y'(0)=-\\frac19$ problemari begira, $x=0$ muturrak bi baldintza ditu eta $x=-1$-ek bakarra. **$0$-tik $-1$-era** jaurtiz ($-h$ pausoa) parametro bakarra falta da, $y''(0)=t$, eta problema eskalarra da: $F(t)=y(t,-1)-\\frac12$. $-1$-etik jaurtiz bi beharko lirateke. Ebatzita: [[ejercicio-disparo-hacia-atras-richardson]].",
              en: "Nothing forces us to start at $a$. In $y'''=-6y'^2-y''+2y^3$, $y(-1)=\\frac12$, $y(0)=\\frac13$, $y'(0)=-\\frac19$, the end $x=0$ carries two conditions and $x=-1$ only one. Shooting **from $0$ towards $-1$** (step $-h$) leaves a single parameter, $y''(0)=t$, and the problem is scalar: $F(t)=y(t,-1)-\\frac12$. Shooting from $-1$ would need two. Solved in [[ejercicio-disparo-hacia-atras-richardson]]."
            }
          },
          {
            kind: "callout",
            variant: "note",
            text: {
              es: "El sentido de integración también afecta a la estabilidad: si las soluciones crecen como $e^{\\lambda x}$ al avanzar, integrar en sentido contrario las hace decrecer y el disparo pierde menos precisión.",
              eu: "Integrazio-noranzkoak egonkortasunean ere eragiten du: soluzioak aurrera egitean $e^{\\lambda x}$ bezala hazten badira, kontrako noranzkoan integratzeak txikitu egiten ditu eta jaurtiketak zehaztasun gutxiago galtzen du.",
              en: "The direction of integration also affects stability: if solutions grow like $e^{\\lambda x}$ going forward, integrating the other way makes them decay and the shot loses less accuracy."
            }
          }
        ]
      },
      {
        heading: {
          es: "Newton para orden 3",
          eu: "Newton 3. ordenarako",
          en: "Newton for order 3"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Para $y'''=f(x,y,y',y'')$ con un solo parámetro $t$, la [[deduccion-ecuacion-variacional|ecuación variacional]] añade un término: $z'''=f_y z+f_{y'}z'+f_{y''}z''$. Con $y(0)=0$, $y'(0)=t$, $y''(0)=3-t$ (así se cumple $y'(0)+y''(0)=3$ para todo $t$), los datos de $z$ son las derivadas en $t$: $z(0)=0$, $z'(0)=1$, $z''(0)=-1$. El sistema tiene seis ecuaciones:",
              eu: "$y'''=f(x,y,y',y'')$ parametro bakarreko $t$-rekin, [[deduccion-ecuacion-variacional|ekuazio bariazionalak]] gai bat gehitzen du: $z'''=f_y z+f_{y'}z'+f_{y''}z''$. $y(0)=0$, $y'(0)=t$, $y''(0)=3-t$ eginda (horrela $y'(0)+y''(0)=3$ $t$ guztietarako betetzen da), $z$-ren datuak $t$-rekiko deribatuak dira: $z(0)=0$, $z'(0)=1$, $z''(0)=-1$. Sistemak sei ekuazio ditu:",
              en: "For $y'''=f(x,y,y',y'')$ with a single parameter $t$, the [[deduccion-ecuacion-variacional|variational equation]] gains a term: $z'''=f_y z+f_{y'}z'+f_{y''}z''$. With $y(0)=0$, $y'(0)=t$, $y''(0)=3-t$ (so $y'(0)+y''(0)=3$ for every $t$), the data for $z$ are the $t$-derivatives: $z(0)=0$, $z'(0)=1$, $z''(0)=-1$. The system has six equations:"
            }
          },
          {
            kind: "formula",
            tex: "\\begin{cases} y_1'=y_2,\\quad y_2'=y_3,\\quad y_3'=f(x,y_1,y_2,y_3)\\\\ y_4'=y_5,\\quad y_5'=y_6,\\quad y_6'=f_y\\,y_4+f_{y'}\\,y_5+f_{y''}\\,y_6 \\end{cases}\\qquad F(t)=y_3(1)-3e,\\quad F'(t)=y_6(1)"
          },
          {
            kind: "plot",
            xLabel: "x",
            yLabel: "y",
            series: [
              {
                label: { es: "exacta $xe^x$", eu: "zehatza $xe^x$", en: "exact $xe^x$" },
                points: thirdOrderExact,
                tone: "muted"
              },
              {
                label: {
                  es: "disparo con Newton, $h=0.05$",
                  eu: "Newtonekin jaurtiketa, $h=0.05$",
                  en: "Newton shooting, $h=0.05$"
                },
                points: thirdOrderNodes,
                style: "points",
                tone: "accent"
              }
            ],
            caption: {
              es: "$\\frac1{3+x}y'''+y'y+e^{-x}y''=e^x+x+e^{2x}(x+x^2)+2$ con $y(0)=0$, $y'(0)+y''(0)=3$, $y''(1)=3e$. Newton converge en 4 iteraciones a $t=y'(0)\\approx0.99999$; error máximo $4.0\\cdot10^{-6}$.",
              eu: "$\\frac1{3+x}y'''+y'y+e^{-x}y''=e^x+x+e^{2x}(x+x^2)+2$, $y(0)=0$, $y'(0)+y''(0)=3$, $y''(1)=3e$ baldintzekin. Newton 4 iteraziotan konbergitzen da $t=y'(0)\\approx0.99999$-ra; errore maximoa $4.0\\cdot10^{-6}$.",
              en: "$\\frac1{3+x}y'''+y'y+e^{-x}y''=e^x+x+e^{2x}(x+x^2)+2$ with $y(0)=0$, $y'(0)+y''(0)=3$, $y''(1)=3e$. Newton converges in 4 iterations to $t=y'(0)\\approx0.99999$; maximum error $4.0\\cdot10^{-6}$."
            }
          }
        ]
      },
      {
        heading: {
          es: "Orden 4 lineal: la viga",
          eu: "4. ordena lineala: habea",
          en: "Linear order 4: the beam"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "En $EIw^{(4)}=p(x)-kw$ con $w(0)=w''(0)=0$ faltan $w'(0)=s_1$ y $w'''(0)=s_2$. Por linealidad, $w=w_p+s_1\\varphi_1+s_2\\varphi_2$, donde $w_p$ resuelve la ecuación completa con datos nulos y $\\varphi_1$, $\\varphi_2$ la homogénea con $(w,w',w'',w''')(0)=(0,1,0,0)$ y $(0,0,0,1)$. Las dos condiciones en $x=L$ dan un sistema $2\\times2$:",
              eu: "$EIw^{(4)}=p(x)-kw$ ekuazioan, $w(0)=w''(0)=0$ izanik, $w'(0)=s_1$ eta $w'''(0)=s_2$ falta dira. Linealtasunagatik, $w=w_p+s_1\\varphi_1+s_2\\varphi_2$, non $w_p$-k ekuazio osoa ebazten duen datu nuluekin eta $\\varphi_1$, $\\varphi_2$-k homogeneoa $(w,w',w'',w''')(0)=(0,1,0,0)$ eta $(0,0,0,1)$ datuekin. $x=L$-ko bi baldintzek $2\\times2$ sistema bat ematen dute:",
              en: "In $EIw^{(4)}=p(x)-kw$ with $w(0)=w''(0)=0$ we are missing $w'(0)=s_1$ and $w'''(0)=s_2$. By linearity, $w=w_p+s_1\\varphi_1+s_2\\varphi_2$, where $w_p$ solves the full equation with zero data and $\\varphi_1$, $\\varphi_2$ the homogeneous one with $(w,w',w'',w''')(0)=(0,1,0,0)$ and $(0,0,0,1)$. The two conditions at $x=L$ give a $2\\times2$ system:"
            }
          },
          {
            kind: "formula",
            tex: "\\begin{pmatrix} \\varphi_1(L) & \\varphi_2(L)\\\\ \\varphi_1''(L) & \\varphi_2''(L) \\end{pmatrix}\\begin{pmatrix}s_1\\\\s_2\\end{pmatrix}=-\\begin{pmatrix}w_p(L)\\\\ w_p''(L)\\end{pmatrix}"
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
              es: "Viga de $L=10$ con $E=30\\cdot10^6$, $I=2$, $k=1000$ y $p(x)=100(1-\\frac{x}{36})$, resuelta con RK4 y 40 subintervalos. La flecha máxima, en el centro, es $w(5)\\approx0.1866$ mm. Detalle en [[ejercicio-disparo-viga]].",
              eu: "$L=10$ habea, $E=30\\cdot10^6$, $I=2$, $k=1000$ eta $p(x)=100(1-\\frac{x}{36})$ izanik, RK4 eta 40 azpitarterekin ebatzita. Gezi maximoa, erdian, $w(5)\\approx0.1866$ mm da. Xehetasunak: [[ejercicio-disparo-viga]].",
              en: "Beam with $L=10$, $E=30\\cdot10^6$, $I=2$, $k=1000$ and $p(x)=100(1-\\frac{x}{36})$, solved with RK4 and 40 subintervals. The maximum deflection, at the centre, is $w(5)\\approx0.1866$ mm. Details in [[ejercicio-disparo-viga]]."
            }
          }
        ]
      },
      {
        heading: {
          es: "Varios parámetros no lineales",
          eu: "Parametro ez-lineal anitz",
          en: "Several nonlinear parameters"
        },
        blocks: [
          {
            kind: "paragraph",
            text: {
              es: "Si la ecuación no es lineal y quedan dos o más parámetros $\\mathbf t=(t_1,\\dots,t_m)$, la función de fallo es vectorial, $\\mathbf F(\\mathbf t)=\\mathbf 0$, y se usa [[sistemas-no-lineales-newton|Newton para sistemas]]: $\\mathbf t^{(k+1)}=\\mathbf t^{(k)}-[\\mathbf F'(\\mathbf t^{(k)})]^{-1}\\mathbf F(\\mathbf t^{(k)})$. Cada columna del jacobiano sale de una ecuación variacional (derivando respecto de un $t_j$), de modo que cada iteración resuelve el PVI junto con $m$ PVI variacionales.",
              eu: "Ekuazioa lineala ez bada eta bi parametro edo gehiago geratzen badira, $\\mathbf t=(t_1,\\dots,t_m)$, huts-funtzioa bektoriala da, $\\mathbf F(\\mathbf t)=\\mathbf 0$, eta [[sistemas-no-lineales-newton|sistemetarako Newton]] erabiltzen da: $\\mathbf t^{(k+1)}=\\mathbf t^{(k)}-[\\mathbf F'(\\mathbf t^{(k)})]^{-1}\\mathbf F(\\mathbf t^{(k)})$. Jakobiarraren zutabe bakoitza ekuazio bariazional batetik ateratzen da ($t_j$ batekiko deribatuz); beraz, iterazio bakoitzak HBPa eta $m$ HBP bariazional ebazten ditu.",
              en: "If the equation is nonlinear and two or more parameters $\\mathbf t=(t_1,\\dots,t_m)$ remain, the miss function is a vector, $\\mathbf F(\\mathbf t)=\\mathbf 0$, and we use [[sistemas-no-lineales-newton|Newton for systems]]: $\\mathbf t^{(k+1)}=\\mathbf t^{(k)}-[\\mathbf F'(\\mathbf t^{(k)})]^{-1}\\mathbf F(\\mathbf t^{(k)})$. Each Jacobian column comes from a variational equation (differentiating with respect to one $t_j$), so each iteration solves the IVP together with $m$ variational IVPs."
            }
          },
          {
            kind: "callout",
            variant: "note",
            title: {
              es: "Disparo múltiple",
              eu: "Jaurtiketa anizkoitza",
              en: "Multiple shooting"
            },
            text: {
              es: "Cuando un único disparo a lo largo de todo $[a,b]$ es inestable, se divide el intervalo en tramos, se dispara en cada tramo con sus propios parámetros y se imponen, además de las condiciones de contorno, la continuidad de $y$ e $y'$ en las uniones. Resulta un sistema no lineal más grande pero mucho mejor condicionado.",
              eu: "$[a,b]$ osoan zeharreko jaurtiketa bakarra ezegonkorra denean, tartea zatitan banatzen da, zati bakoitzean bere parametroekin jaurtitzen da eta, muga-baldintzez gain, $y$ eta $y'$-ren jarraitutasuna ezartzen da juntaduretan. Sistema ez-lineal handiagoa baina askoz hobeto baldintzatua lortzen da.",
              en: "When a single shot across all of $[a,b]$ is unstable, split the interval into pieces, shoot on each piece with its own parameters and impose, besides the boundary conditions, continuity of $y$ and $y'$ at the joints. The result is a larger but much better conditioned nonlinear system."
            }
          }
        ]
      }
    ]
  }
];

export const fronteraDerivations: ContentEntry[] = [
  {
    slug: "deduccion-disparo-lineal",
    category: "Problemas de frontera",
    level: "medio",
    searchIntent: "demostracion disparo lineal superposicion y1 + C y2",
    title: {
      es: "Deducción del disparo lineal",
      eu: "Jaurtiketa linealaren frogapena",
      en: "Derivation of linear shooting"
    },
    description: {
      es: "Prueba de que $y=y_1+\\frac{\\beta-y_1(b)}{y_2(b)}y_2$ resuelve el problema de frontera lineal con condiciones Dirichlet, y de que es la única combinación posible.",
      eu: "$y=y_1+\\frac{\\beta-y_1(b)}{y_2(b)}y_2$-k Dirichlet baldintzadun muga-problema lineala ebazten duela eta konbinazio posible bakarra dela frogatzea.",
      en: "Proof that $y=y_1+\\frac{\\beta-y_1(b)}{y_2(b)}y_2$ solves the linear Dirichlet boundary value problem, and that it is the only possible combination."
    },
    keywords: ["disparo lineal", "superposición", "demostración"],
    prerequisites: ["frontera-introduccion"],
    related: ["frontera-disparo-lineal"],
    sections: [
      {
        heading: {
          es: "Deducción",
          eu: "Frogapena",
          en: "Derivation"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Partimos de $y_1$, solución de $y_1''=py_1'+qy_1+r$ con $y_1(a)=\\alpha$, $y_1'(a)=0$, y de $y_2$, solución de $y_2''=py_2'+qy_2$ con $y_2(a)=0$, $y_2'(a)=1$. Para una constante $C$ cualquiera definimos $y=y_1+Cy_2$.",
                  eu: "$y_1$-etik abiatzen gara, $y_1''=py_1'+qy_1+r$-ren soluzioa $y_1(a)=\\alpha$, $y_1'(a)=0$ baldintzekin, eta $y_2$-tik, $y_2''=py_2'+qy_2$-ren soluzioa $y_2(a)=0$, $y_2'(a)=1$ baldintzekin. Edozein $C$ konstanterako $y=y_1+Cy_2$ definitzen dugu.",
                  en: "Start from $y_1$, the solution of $y_1''=py_1'+qy_1+r$ with $y_1(a)=\\alpha$, $y_1'(a)=0$, and $y_2$, the solution of $y_2''=py_2'+qy_2$ with $y_2(a)=0$, $y_2'(a)=1$. For any constant $C$ define $y=y_1+Cy_2$."
                }
              },
              {
                text: {
                  es: "Derivamos dos veces (la derivada es lineal):",
                  eu: "Bi aldiz deribatzen dugu (deribatua lineala da):",
                  en: "Differentiate twice (differentiation is linear):"
                },
                formula: "y'=y_1'+Cy_2',\\qquad y''=y_1''+Cy_2''"
              },
              {
                text: {
                  es: "Sustituimos las ecuaciones que cumplen $y_1$ e $y_2$:",
                  eu: "$y_1$-ek eta $y_2$-k betetzen dituzten ekuazioak ordezkatzen ditugu:",
                  en: "Substitute the equations satisfied by $y_1$ and $y_2$:"
                },
                formula: "y''=\\bigl(py_1'+qy_1+r\\bigr)+C\\bigl(py_2'+qy_2\\bigr)"
              },
              {
                text: {
                  es: "Agrupamos los términos de $p$ y los de $q$:",
                  eu: "$p$-ren gaiak eta $q$-renak multzokatzen ditugu:",
                  en: "Group the $p$ terms and the $q$ terms:"
                },
                formula: "y''=p\\bigl(y_1'+Cy_2'\\bigr)+q\\bigl(y_1+Cy_2\\bigr)+r=p\\,y'+q\\,y+r"
              },
              {
                text: {
                  es: "Así que $y$ resuelve la ecuación **para cualquier $C$**. Observa que $r$ aparece una sola vez: por eso $y_2$ debe resolver la ecuación homogénea. Si también $y_2$ llevara $r$, obtendríamos $(1+C)r$.",
                  eu: "Beraz, $y$-k ekuazioa ebazten du **edozein $C$-rentzat**. Kontuan izan $r$ behin bakarrik agertzen dela: horregatik $y_2$-k ekuazio homogeneoa ebatzi behar du. $y_2$-k ere $r$ izango balu, $(1+C)r$ lortuko genuke.",
                  en: "So $y$ solves the equation **for any $C$**. Note that $r$ appears only once: that is why $y_2$ must solve the homogeneous equation. If $y_2$ also carried $r$, we would get $(1+C)r$."
                }
              },
              {
                text: {
                  es: "Condición en $a$: se cumple sola, gracias a $y_2(a)=0$.",
                  eu: "$a$-ko baldintza: berez betetzen da, $y_2(a)=0$-ri esker.",
                  en: "Condition at $a$: it holds automatically, thanks to $y_2(a)=0$."
                },
                formula: "y(a)=y_1(a)+C\\,y_2(a)=\\alpha+C\\cdot0=\\alpha"
              },
              {
                text: {
                  es: "Condición en $b$: imponemos $y(b)=\\beta$ y despejamos, suponiendo $y_2(b)\\ne0$.",
                  eu: "$b$-ko baldintza: $y(b)=\\beta$ ezarri eta askatzen dugu, $y_2(b)\\ne0$ dela suposatuz.",
                  en: "Condition at $b$: impose $y(b)=\\beta$ and solve, assuming $y_2(b)\\ne0$."
                },
                formula: "y_1(b)+C\\,y_2(b)=\\beta\\;\\Longrightarrow\\; C=\\frac{\\beta-y_1(b)}{y_2(b)}"
              },
              {
                text: {
                  es: "Unicidad de $C$: la ecuación en $b$ es lineal en $C$ con coeficiente $y_2(b)\\ne0$, así que tiene una única solución. Además $y'(a)=y_1'(a)+Cy_2'(a)=C$, luego $C$ es la pendiente inicial de la solución.",
                  eu: "$C$-ren bakartasuna: $b$-ko ekuazioa $C$-rekiko lineala da $y_2(b)\\ne0$ koefizientearekin; beraz, soluzio bakarra du. Gainera, $y'(a)=y_1'(a)+Cy_2'(a)=C$; hortaz, $C$ soluzioaren hasierako malda da.",
                  en: "Uniqueness of $C$: the equation at $b$ is linear in $C$ with coefficient $y_2(b)\\ne0$, so it has a single solution. Moreover $y'(a)=y_1'(a)+Cy_2'(a)=C$, so $C$ is the initial slope of the solution."
                }
              }
            ]
          },
          {
            kind: "formula",
            tex: "\\boxed{\\,y(x)=y_1(x)+\\frac{\\beta-y_1(b)}{y_2(b)}\\,y_2(x)\\,}"
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-disparo-lineal-error",
    category: "Problemas de frontera",
    level: "avanzado",
    searchIntent: "error disparo lineal cota orden convergencia runge kutta",
    title: {
      es: "Cota de error del disparo lineal",
      eu: "Jaurtiketa linealaren errore-borna",
      en: "Error bound for linear shooting"
    },
    description: {
      es: "Por qué el disparo lineal hereda el orden $p$ del método de valor inicial, con la cota $|y_i-y(x_i)|\\le Kh^p(1+|v_{1i}/v_{1N}|)$.",
      eu: "Zergatik jasotzen duen jaurtiketa linealak hasierako balioko metodoaren $p$ ordena, $|y_i-y(x_i)|\\le Kh^p(1+|v_{1i}/v_{1N}|)$ bornarekin.",
      en: "Why linear shooting inherits the order $p$ of the initial value method, with the bound $|y_i-y(x_i)|\\le Kh^p(1+|v_{1i}/v_{1N}|)$."
    },
    keywords: ["error disparo", "orden de convergencia", "cota de error"],
    prerequisites: ["frontera-disparo-lineal", "edo-convergencia-orden"],
    related: ["frontera-disparo-lineal"],
    sections: [
      {
        heading: {
          es: "Deducción",
          eu: "Frogapena",
          en: "Derivation"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Llamamos $e_{1i}=u_{1i}-y_1(x_i)$ y $e_{2i}=v_{1i}-y_2(x_i)$ a los errores del método de valor inicial. Por hipótesis es de orden $p$: $|e_{1i}|,|e_{2i}|\\le K'h^p$.",
                  eu: "$e_{1i}=u_{1i}-y_1(x_i)$ eta $e_{2i}=v_{1i}-y_2(x_i)$ deitzen diegu hasierako balioko metodoaren erroreei. Hipotesiz $p$ ordenakoa da: $|e_{1i}|,|e_{2i}|\\le K'h^p$.",
                  en: "Call $e_{1i}=u_{1i}-y_1(x_i)$ and $e_{2i}=v_{1i}-y_2(x_i)$ the errors of the initial value method. By hypothesis it has order $p$: $|e_{1i}|,|e_{2i}|\\le K'h^p$."
                }
              },
              {
                text: {
                  es: "Sean $C=\\frac{\\beta-y_1(b)}{y_2(b)}$ la constante exacta y $C_h=\\frac{\\beta-u_{1N}}{v_{1N}}$ la calculada. El error nodal es",
                  eu: "Izan bitez $C=\\frac{\\beta-y_1(b)}{y_2(b)}$ konstante zehatza eta $C_h=\\frac{\\beta-u_{1N}}{v_{1N}}$ kalkulatua. Nodoko errorea hau da:",
                  en: "Let $C=\\frac{\\beta-y_1(b)}{y_2(b)}$ be the exact constant and $C_h=\\frac{\\beta-u_{1N}}{v_{1N}}$ the computed one. The nodal error is"
                },
                formula: "y_i-y(x_i)=\\bigl(u_{1i}+C_hv_{1i}\\bigr)-\\bigl(y_1(x_i)+Cy_2(x_i)\\bigr)"
              },
              {
                text: {
                  es: "Sumamos y restamos $Cv_{1i}$ para separar tres contribuciones:",
                  eu: "$Cv_{1i}$ gehitu eta kentzen dugu hiru ekarpen bereizteko:",
                  en: "Add and subtract $Cv_{1i}$ to split three contributions:"
                },
                formula: "y_i-y(x_i)=e_{1i}+C\\,e_{2i}+(C_h-C)\\,v_{1i}"
              },
              {
                text: {
                  es: "En $i=N$ el error es nulo, porque tanto $y_N=u_{1N}+C_hv_{1N}$ como $y(b)$ valen $\\beta$ por construcción. Eso permite despejar $C_h-C$:",
                  eu: "$i=N$-n errorea nulua da, $y_N=u_{1N}+C_hv_{1N}$ eta $y(b)$ biek $\\beta$ balio baitute eraikuntzaz. Horri esker $C_h-C$ aska daiteke:",
                  en: "At $i=N$ the error is zero, because both $y_N=u_{1N}+C_hv_{1N}$ and $y(b)$ equal $\\beta$ by construction. This lets us solve for $C_h-C$:"
                },
                formula: "0=e_{1N}+C\\,e_{2N}+(C_h-C)\\,v_{1N}\\;\\Longrightarrow\\; C_h-C=-\\frac{e_{1N}+C\\,e_{2N}}{v_{1N}}"
              },
              {
                text: {
                  es: "Sustituimos en el error nodal:",
                  eu: "Nodoko errorean ordezkatzen dugu:",
                  en: "Substitute into the nodal error:"
                },
                formula: "y_i-y(x_i)=\\bigl(e_{1i}+C\\,e_{2i}\\bigr)-\\bigl(e_{1N}+C\\,e_{2N}\\bigr)\\frac{v_{1i}}{v_{1N}}"
              },
              {
                text: {
                  es: "Acotamos cada paréntesis por $(1+|C|)K'h^p$ con la desigualdad triangular y llamamos $K=(1+|C|)K'$:",
                  eu: "Parentesi bakoitza $(1+|C|)K'h^p$-rekin bornatzen dugu desberdintza triangeluarraren bidez, eta $K=(1+|C|)K'$ deitzen diogu:",
                  en: "Bound each bracket by $(1+|C|)K'h^p$ with the triangle inequality and set $K=(1+|C|)K'$:"
                },
                formula: "|y_i-y(x_i)|\\le K\\,h^p\\left(1+\\left|\\frac{v_{1i}}{v_{1N}}\\right|\\right)"
              },
              {
                text: {
                  es: "Lectura: el orden es el del método de valor inicial, pero la constante empeora si $|v_{1N}|=|y_2(b)|$ es pequeño comparado con $|v_{1i}|$. Es la versión cuantitativa del aviso «$y_2(b)\\approx0$ es peligroso».",
                  eu: "Irakurketa: ordena hasierako balioko metodoarena da, baina konstantea okertu egiten da $|v_{1N}|=|y_2(b)|$ txikia bada $|v_{1i}|$-rekin alderatuta. «$y_2(b)\\approx0$ arriskutsua da» abisuaren bertsio kuantitatiboa da.",
                  en: "Reading: the order is that of the initial value method, but the constant deteriorates when $|v_{1N}|=|y_2(b)|$ is small compared with $|v_{1i}|$. It is the quantitative version of the warning “$y_2(b)\\approx0$ is dangerous”."
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-disparo-condiciones-naturales",
    category: "Problemas de frontera",
    level: "medio",
    searchIntent: "deduccion disparo lineal condiciones naturales robin",
    title: {
      es: "Deducción del disparo lineal con condiciones naturales",
      eu: "Jaurtiketa linealaren frogapena baldintza naturalekin",
      en: "Derivation of linear shooting with natural conditions"
    },
    description: {
      es: "Cómo elegir los datos iniciales de los dos PVI para que la condición $\\alpha_a y'(a)+\\beta_a y(a)=\\gamma_a$ se cumpla siempre, y fórmula del parámetro $s$.",
      eu: "Bi HBPen hasierako datuak nola aukeratu $\\alpha_a y'(a)+\\beta_a y(a)=\\gamma_a$ baldintza beti bete dadin, eta $s$ parametroaren formula.",
      en: "How to choose the initial data of the two IVPs so that $\\alpha_a y'(a)+\\beta_a y(a)=\\gamma_a$ always holds, and the formula for the parameter $s$."
    },
    keywords: ["condiciones naturales", "Robin", "disparo lineal", "deducción"],
    prerequisites: ["deduccion-disparo-lineal"],
    related: ["frontera-disparo-lineal-condiciones-generales"],
    sections: [
      {
        heading: {
          es: "Deducción",
          eu: "Frogapena",
          en: "Derivation"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "Llamamos $\\mathcal B_a(y)=\\alpha_a y'(a)+\\beta_a y(a)$ y $\\mathcal B_b(y)=\\alpha_b y'(b)+\\beta_b y(b)$. Ambos son **lineales**: $\\mathcal B(u+sv)=\\mathcal B(u)+s\\,\\mathcal B(v)$. El problema es $y''=py'+qy+r$, $\\mathcal B_a(y)=\\gamma_a$, $\\mathcal B_b(y)=\\gamma_b$, con $\\alpha_a\\ne0$.",
                  eu: "$\\mathcal B_a(y)=\\alpha_a y'(a)+\\beta_a y(a)$ eta $\\mathcal B_b(y)=\\alpha_b y'(b)+\\beta_b y(b)$ deitzen diegu. Biak **linealak** dira: $\\mathcal B(u+sv)=\\mathcal B(u)+s\\,\\mathcal B(v)$. Problema $y''=py'+qy+r$, $\\mathcal B_a(y)=\\gamma_a$, $\\mathcal B_b(y)=\\gamma_b$ da, $\\alpha_a\\ne0$ izanik.",
                  en: "Write $\\mathcal B_a(y)=\\alpha_a y'(a)+\\beta_a y(a)$ and $\\mathcal B_b(y)=\\alpha_b y'(b)+\\beta_b y(b)$. Both are **linear**: $\\mathcal B(u+sv)=\\mathcal B(u)+s\\,\\mathcal B(v)$. The problem is $y''=py'+qy+r$, $\\mathcal B_a(y)=\\gamma_a$, $\\mathcal B_b(y)=\\gamma_b$, with $\\alpha_a\\ne0$."
                }
              },
              {
                text: {
                  es: "Buscamos $y=y_1+s\\,y_2$ con $y_1$ solución de la completa e $y_2$ de la homogénea; como en [[deduccion-disparo-lineal]], $y$ resuelve la ecuación para cualquier $s$.",
                  eu: "$y=y_1+s\\,y_2$ bilatzen dugu, $y_1$ osoaren soluzioa eta $y_2$ homogeneoarena izanik; [[deduccion-disparo-lineal]] frogapenean bezala, $y$-k ekuazioa ebazten du edozein $s$-rentzat.",
                  en: "Look for $y=y_1+s\\,y_2$ with $y_1$ solving the full equation and $y_2$ the homogeneous one; as in [[deduccion-disparo-lineal]], $y$ solves the equation for every $s$."
                }
              },
              {
                text: {
                  es: "Queremos $\\mathcal B_a(y)=\\mathcal B_a(y_1)+s\\,\\mathcal B_a(y_2)=\\gamma_a$ **para todo $s$**. Eso exige dos cosas: $\\mathcal B_a(y_1)=\\gamma_a$ y $\\mathcal B_a(y_2)=0$.",
                  eu: "$\\mathcal B_a(y)=\\mathcal B_a(y_1)+s\\,\\mathcal B_a(y_2)=\\gamma_a$ nahi dugu **$s$ guztietarako**. Horrek bi gauza eskatzen ditu: $\\mathcal B_a(y_1)=\\gamma_a$ eta $\\mathcal B_a(y_2)=0$.",
                  en: "We want $\\mathcal B_a(y)=\\mathcal B_a(y_1)+s\\,\\mathcal B_a(y_2)=\\gamma_a$ **for every $s$**. That requires two things: $\\mathcal B_a(y_1)=\\gamma_a$ and $\\mathcal B_a(y_2)=0$."
                }
              },
              {
                text: {
                  es: "Datos para $y_1$: con $y_1(a)=0$ basta $\\alpha_a y_1'(a)=\\gamma_a$, es decir $y_1'(a)=\\gamma_a/\\alpha_a$ (posible porque $\\alpha_a\\ne0$).",
                  eu: "$y_1$-erako datuak: $y_1(a)=0$ eginda, nahikoa da $\\alpha_a y_1'(a)=\\gamma_a$, hau da, $y_1'(a)=\\gamma_a/\\alpha_a$ (posible da $\\alpha_a\\ne0$ delako).",
                  en: "Data for $y_1$: with $y_1(a)=0$ it is enough that $\\alpha_a y_1'(a)=\\gamma_a$, i.e. $y_1'(a)=\\gamma_a/\\alpha_a$ (possible since $\\alpha_a\\ne0$)."
                },
                formula: "\\mathcal B_a(y_1)=\\alpha_a\\frac{\\gamma_a}{\\alpha_a}+\\beta_a\\cdot0=\\gamma_a"
              },
              {
                text: {
                  es: "Datos para $y_2$: necesitamos $(y_2(a),y_2'(a))\\ne(0,0)$ con $\\alpha_a y_2'(a)+\\beta_a y_2(a)=0$. Sirve el vector perpendicular a $(\\beta_a,\\alpha_a)$:",
                  eu: "$y_2$-rako datuak: $(y_2(a),y_2'(a))\\ne(0,0)$ behar dugu, $\\alpha_a y_2'(a)+\\beta_a y_2(a)=0$ betetzen duena. $(\\beta_a,\\alpha_a)$-ren bektore perpendikularrak balio du:",
                  en: "Data for $y_2$: we need $(y_2(a),y_2'(a))\\ne(0,0)$ with $\\alpha_a y_2'(a)+\\beta_a y_2(a)=0$. The vector perpendicular to $(\\beta_a,\\alpha_a)$ works:"
                },
                formula: "y_2(a)=\\alpha_a,\\quad y_2'(a)=-\\beta_a\\;\\Longrightarrow\\;\\mathcal B_a(y_2)=\\alpha_a(-\\beta_a)+\\beta_a\\alpha_a=0"
              },
              {
                text: {
                  es: "Condición derecha, usando la linealidad de $\\mathcal B_b$:",
                  eu: "Eskuineko baldintza, $\\mathcal B_b$-ren linealtasuna erabiliz:",
                  en: "Right condition, using the linearity of $\\mathcal B_b$:"
                },
                formula: "\\mathcal B_b(y_1)+s\\,\\mathcal B_b(y_2)=\\gamma_b\\;\\Longrightarrow\\; s=\\frac{\\gamma_b-\\mathcal B_b(y_1)}{\\mathcal B_b(y_2)}=\\frac{\\gamma_b-\\bigl(\\alpha_by_1'(b)+\\beta_by_1(b)\\bigr)}{\\alpha_by_2'(b)+\\beta_by_2(b)}"
              },
              {
                text: {
                  es: "Si $\\mathcal B_b(y_2)=0$, la homogénea tiene una solución no nula que cumple las dos condiciones homogéneas y no hay unicidad (mismo papel que $y_2(b)=0$ en el caso Dirichlet). El caso Dirichlet es $\\alpha_a=0$, $\\beta_a=1$, que no está cubierto por esta elección; allí se usan $y_1(a)=\\gamma_a$, $y_1'(a)=0$, $y_2(a)=0$, $y_2'(a)=1$, que cumplen las mismas dos exigencias.",
                  eu: "$\\mathcal B_b(y_2)=0$ bada, homogeneoak bi baldintza homogeneoak betetzen dituen soluzio ez-nulu bat du eta ez dago bakartasunik (Dirichlet kasuko $y_2(b)=0$-ren paper bera). Dirichlet kasua $\\alpha_a=0$, $\\beta_a=1$ da, eta aukera honek ez du estaltzen; han $y_1(a)=\\gamma_a$, $y_1'(a)=0$, $y_2(a)=0$, $y_2'(a)=1$ erabiltzen dira, bi eskakizun berak betetzen dituztenak.",
                  en: "If $\\mathcal B_b(y_2)=0$, the homogeneous equation has a nonzero solution satisfying both homogeneous conditions and uniqueness fails (the same role as $y_2(b)=0$ in the Dirichlet case). The Dirichlet case is $\\alpha_a=0$, $\\beta_a=1$, not covered by this choice; there one uses $y_1(a)=\\gamma_a$, $y_1'(a)=0$, $y_2(a)=0$, $y_2'(a)=1$, which meet the same two requirements."
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "deduccion-ecuacion-variacional",
    category: "Problemas de frontera",
    level: "avanzado",
    searchIntent: "ecuacion variacional disparo newton derivada respecto parametro",
    title: {
      es: "Deducción de la ecuación variacional",
      eu: "Ekuazio bariazionalaren frogapena",
      en: "Derivation of the variational equation"
    },
    description: {
      es: "Derivando el PVI $y''=f(x,y,y')$, $y(a)=\\alpha$, $y'(a)=t$ respecto de $t$ se obtiene $z''=f_yz+f_{y'}z'$, $z(a)=0$, $z'(a)=1$, que da la derivada $F'(t)$ para Newton.",
      eu: "$y''=f(x,y,y')$, $y(a)=\\alpha$, $y'(a)=t$ HBPa $t$-rekiko deribatuz $z''=f_yz+f_{y'}z'$, $z(a)=0$, $z'(a)=1$ lortzen da, Newtonerako $F'(t)$ deribatua ematen duena.",
      en: "Differentiating the IVP $y''=f(x,y,y')$, $y(a)=\\alpha$, $y'(a)=t$ with respect to $t$ gives $z''=f_yz+f_{y'}z'$, $z(a)=0$, $z'(a)=1$, which yields the derivative $F'(t)$ for Newton."
    },
    keywords: ["ecuación variacional", "sensibilidad", "disparo Newton", "regla de la cadena"],
    prerequisites: ["frontera-disparo-no-lineal"],
    related: ["frontera-disparo-newton", "frontera-disparo-orden-superior"],
    sections: [
      {
        heading: {
          es: "Deducción",
          eu: "Frogapena",
          en: "Derivation"
        },
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                text: {
                  es: "La solución del PVI depende de $x$ y del parámetro $t$. Lo escribimos explícitamente:",
                  eu: "HBParen soluzioa $x$-ren eta $t$ parametroaren menpekoa da. Esplizituki idazten dugu:",
                  en: "The IVP solution depends on $x$ and on the parameter $t$. We write it explicitly:"
                },
                formula: "\\frac{\\partial^2 y}{\\partial x^2}(t,x)=f\\Bigl(x,\\,y(t,x),\\,\\frac{\\partial y}{\\partial x}(t,x)\\Bigr),\\qquad y(t,a)=\\alpha,\\qquad \\frac{\\partial y}{\\partial x}(t,a)=t"
              },
              {
                text: {
                  es: "Derivamos la ecuación respecto de $t$. En el lado izquierdo intercambiamos el orden de derivación (válido si $f$ es de clase $C^1$, lo que hace a $y$ suficientemente regular):",
                  eu: "Ekuazioa $t$-rekiko deribatzen dugu. Ezkerreko aldean deribazio-ordena trukatzen dugu (baliozkoa da $f$ $C^1$ klasekoa bada, horrek $y$ behar bezain erregularra egiten baitu):",
                  en: "Differentiate the equation with respect to $t$. On the left we swap the order of differentiation (valid if $f$ is $C^1$, which makes $y$ regular enough):"
                },
                formula: "\\frac{\\partial}{\\partial t}\\frac{\\partial^2 y}{\\partial x^2}=\\frac{\\partial^2}{\\partial x^2}\\frac{\\partial y}{\\partial t}=z'',\\qquad z=\\frac{\\partial y}{\\partial t}"
              },
              {
                text: {
                  es: "En el lado derecho aplicamos la regla de la cadena. $x$ no depende de $t$, así que solo contribuyen el segundo y tercer argumentos:",
                  eu: "Eskuineko aldean katearen erregela aplikatzen dugu. $x$ ez dago $t$-ren menpe; beraz, bigarren eta hirugarren argumentuek bakarrik egiten dute ekarpena:",
                  en: "On the right apply the chain rule. $x$ does not depend on $t$, so only the second and third arguments contribute:"
                },
                formula: "\\frac{\\partial}{\\partial t}f(x,y,y')=f_y(x,y,y')\\,\\frac{\\partial y}{\\partial t}+f_{y'}(x,y,y')\\,\\frac{\\partial y'}{\\partial t}=f_y\\,z+f_{y'}\\,z'"
              },
              {
                text: {
                  es: "Igualando ambos lados obtenemos la ecuación variacional. Es **lineal** en $z$, con coeficientes que dependen de la trayectoria $y(t,x)$:",
                  eu: "Bi aldeak berdinduz ekuazio bariazionala lortzen dugu. $z$-rekiko **lineala** da, $y(t,x)$ ibilbidearen menpeko koefizienteekin:",
                  en: "Equating both sides gives the variational equation. It is **linear** in $z$, with coefficients that depend on the trajectory $y(t,x)$:"
                },
                formula: "z''=f_y(x,y,y')\\,z+f_{y'}(x,y,y')\\,z'"
              },
              {
                text: {
                  es: "Condiciones iniciales: derivamos respecto de $t$ los datos iniciales. $y(t,a)=\\alpha$ no depende de $t$ y $y'(t,a)=t$ tiene derivada 1:",
                  eu: "Hasierako baldintzak: hasierako datuak $t$-rekiko deribatzen ditugu. $y(t,a)=\\alpha$ ez dago $t$-ren menpe eta $y'(t,a)=t$-ren deribatua 1 da:",
                  en: "Initial conditions: differentiate the initial data with respect to $t$. $y(t,a)=\\alpha$ does not depend on $t$ and $y'(t,a)=t$ has derivative 1:"
                },
                formula: "z(a)=\\frac{\\partial\\alpha}{\\partial t}=0,\\qquad z'(a)=\\frac{\\partial t}{\\partial t}=1"
              },
              {
                text: {
                  es: "Por último, la derivada de la función de fallo $F(t)=y(t,b)-\\beta$ es simplemente $z$ en $x=b$:",
                  eu: "Azkenik, $F(t)=y(t,b)-\\beta$ huts-funtzioaren deribatua $z$ da $x=b$-n:",
                  en: "Finally, the derivative of the miss function $F(t)=y(t,b)-\\beta$ is just $z$ at $x=b$:"
                },
                formula: "F'(t)=\\frac{\\partial y}{\\partial t}(t,b)=z(t,b)"
              },
              {
                text: {
                  es: "Generalizaciones: si la condición derecha es $\\mathcal B_b(y)=c_1y(b)+c_2y'(b)$, entonces $F'(t)=c_1z(b)+c_2z'(b)$. Si los datos iniciales dependen de $t$ de otra forma, los de $z$ son sus derivadas en $t$. Para orden 3 aparece además $f_{y''}z''$. Si la ecuación es lineal, $f_y=q$ y $f_{y'}=p$: la variacional es la ecuación homogénea y $z$ coincide con $y_2$ del [[frontera-disparo-lineal|disparo lineal]].",
                  eu: "Orokortzeak: eskuineko baldintza $\\mathcal B_b(y)=c_1y(b)+c_2y'(b)$ bada, $F'(t)=c_1z(b)+c_2z'(b)$. Hasierako datuak $t$-ren menpe beste modu batean badaude, $z$-renak haien $t$-rekiko deribatuak dira. 3. ordenan $f_{y''}z''$ ere agertzen da. Ekuazioa lineala bada, $f_y=q$ eta $f_{y'}=p$: bariazionala ekuazio homogeneoa da eta $z$ [[frontera-disparo-lineal|jaurtiketa linealeko]] $y_2$-rekin bat dator.",
                  en: "Generalizations: if the right condition is $\\mathcal B_b(y)=c_1y(b)+c_2y'(b)$, then $F'(t)=c_1z(b)+c_2z'(b)$. If the initial data depend on $t$ some other way, those of $z$ are their $t$-derivatives. For order 3 the term $f_{y''}z''$ also appears. If the equation is linear, $f_y=q$ and $f_{y'}=p$: the variational equation is the homogeneous equation and $z$ coincides with $y_2$ from [[frontera-disparo-lineal|linear shooting]]."
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
