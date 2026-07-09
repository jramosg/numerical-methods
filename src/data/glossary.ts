import type { Lang } from "./site";

type LocalizedText = Record<Lang, string>;

export type GlossaryTerm = {
  slug: string;
  term: LocalizedText;
  shortDefinition: LocalizedText;
  definition: LocalizedText;
  usage: LocalizedText;
  related: string[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "consistencia",
    term: {
      es: "Consistencia",
      eu: "Konsistentzia",
      en: "Consistency"
    },
    shortDefinition: {
      es: "Un método es consistente si el error local tiende a cero al hacer el paso pequeño.",
      eu: "Metodo bat konsistentea da errore lokala zerora badoa pausoa txikitzean.",
      en: "A method is consistent if its local error tends to zero as the step size shrinks."
    },
    definition: {
      es: "La consistencia compara la ecuación exacta con el esquema numérico en un solo paso. En EDO, significa que al sustituir la solución exacta en el método, el defecto local desaparece cuando $h\\to0$.",
      eu: "Konsistentziak ekuazio zehatza eta eskema numerikoa pauso bakarrean alderatzen ditu. EDOetan, soluzio zehatza metodoan ordezkatzean sortzen den akats lokala desagertu egiten da $h\\to0$ denean.",
      en: "Consistency compares the exact equation with the numerical scheme over one step. For ODEs, substituting the exact solution into the method leaves a local defect that vanishes as $h\\to0$."
    },
    usage: {
      es: "Úsala para separar errores de modelado del comportamiento iterado: un método inconsistente no puede converger a la solución correcta aunque sea estable.",
      eu: "Erabili modelatze-akatsak eta iterazioaren portaera bereizteko: metodo inkonsistente batek ezin du soluzio zuzenera konbergitu, egonkorra izan arren.",
      en: "Use it to separate modelling error from iteration behaviour: an inconsistent method cannot converge to the correct solution even if it is stable."
    },
    related: ["edo-convergencia-orden", "fundamentos-taylor-truncamiento"]
  },
  {
    slug: "estabilidad",
    term: {
      es: "Estabilidad",
      eu: "Egonkortasuna",
      en: "Stability"
    },
    shortDefinition: {
      es: "Control de cómo se amplifican errores pequeños durante el cálculo.",
      eu: "Kalkuluan zehar akats txikiak nola handitzen diren kontrolatzea.",
      en: "Control over how small errors are amplified during the computation."
    },
    definition: {
      es: "La estabilidad mide si perturbaciones pequeñas en datos, redondeo o pasos anteriores permanecen acotadas. En EDO rígidas, la región de estabilidad decide si un paso $h$ hace que el método explote o amortigüe el error.",
      eu: "Egonkortasunak neurtzen du datuetan, biribiltzean edo aurreko pausoetan dauden perturbazio txikiak bornatuta mantentzen diren. EDO zurrunetan, egonkortasun-eremuak erabakitzen du $h$ pauso batek metodoa leherrarazten duen edo errorea moteltzen duen.",
      en: "Stability measures whether small perturbations in data, rounding or previous steps remain bounded. For stiff ODEs, the stability region decides whether a step $h$ makes the method blow up or damp the error."
    },
    usage: {
      es: "Aparece cuando dos métodos tienen el mismo orden pero toleran pasos muy distintos, por ejemplo Euler explícito frente a Euler implícito.",
      eu: "Bi metodok ordena bera izan baina oso pauso desberdinak onartzen dituztenean agertzen da, adibidez Euler esplizitua eta Euler inplizitua alderatzean.",
      en: "It matters when two methods have the same order but tolerate very different steps, such as explicit Euler versus implicit Euler."
    },
    related: ["edo-problemas-rigidos", "ejercicio-euler-implicito-estabilidad"]
  },
  {
    slug: "convergencia",
    term: {
      es: "Convergencia",
      eu: "Konbergentzia",
      en: "Convergence"
    },
    shortDefinition: {
      es: "Propiedad de que las aproximaciones se acercan al valor buscado.",
      eu: "Hurbilketak bilatutako baliora gerturatzen direla adierazten duen propietatea.",
      en: "The property that approximations approach the target value."
    },
    definition: {
      es: "Una sucesión numérica, una malla refinada o una iteración converge cuando sus aproximaciones se acercan a la solución exacta. En métodos iterativos se expresa como $x_k\\to\\alpha$; en discretizaciones, como error global que tiende a cero al refinar.",
      eu: "Segida numeriko bat, sare fintze bat edo iterazio bat konbergentea da bere hurbilketak soluzio zehatzera gerturatzen direnean. Metodo iteratiboetan $x_k\\to\\alpha$ idazten da; diskretizazioetan, errore globala zerora doa fintzean.",
      en: "A numerical sequence, refined mesh or iteration converges when its approximations approach the exact solution. For iterative methods this is $x_k\\to\\alpha$; for discretizations, the global error tends to zero under refinement."
    },
    usage: {
      es: "No basta con que el residuo sea pequeño: conviene comprobar hipótesis de convergencia, orden y estabilidad según el tipo de método.",
      eu: "Ez da nahikoa hondarra txikia izatea: metodo motaren arabera konbergentzia, ordena eta egonkortasun hipotesiak egiaztatu behar dira.",
      en: "A small residual is not enough: check convergence hypotheses, order and stability according to the method family."
    },
    related: [
      "no-lineales-orden-eficiencia",
      "sistemas-lineales-convergencia",
      "edo-convergencia-orden"
    ]
  },
  {
    slug: "orden",
    term: {
      es: "Orden",
      eu: "Ordena",
      en: "Order"
    },
    shortDefinition: {
      es: "Velocidad asintótica con la que disminuye el error.",
      eu: "Errorea asintotikoki zenbateko abiaduraz txikitzen den.",
      en: "The asymptotic rate at which the error decreases."
    },
    definition: {
      es: "El orden resume la potencia dominante del error. Si un método de paso tiene error global $\\mathcal{O}(h^p)$, al dividir $h$ por dos el error cae aproximadamente por $2^p$. En raíces, $e_{k+1}\\approx C e_k^p$ define el orden iterativo.",
      eu: "Ordenak errorearen potentzia nagusia laburbiltzen du. Pausoko metodo batek errore globala $\\mathcal{O}(h^p)$ badu, $h$ erdira murriztean errorea gutxi gorabehera $2^p$ aldiz jaisten da. Erroetan, $e_{k+1}\\approx C e_k^p$ da ordena iteratiboaren definizioa.",
      en: "Order summarizes the dominant power of the error. If a step method has global error $\\mathcal{O}(h^p)$, halving $h$ reduces the error by about $2^p$. For root finding, $e_{k+1}\\approx C e_k^p$ defines iterative order."
    },
    usage: {
      es: "Sirve para comparar refinamientos, pero no sustituye al coste: RK4 tiene orden 4, aunque consume cuatro evaluaciones de $f$ por paso.",
      eu: "Fintzeak alderatzeko balio du, baina ez du kostua ordezkatzen: RK4 4. ordenakoa da, baina pauso bakoitzeko $f$-ren lau ebaluazio behar ditu.",
      en: "Use it to compare refinements, but not as a replacement for cost: RK4 is fourth order, yet uses four evaluations of $f$ per step."
    },
    related: ["edo-convergencia-orden", "no-lineales-orden-eficiencia"]
  },
  {
    slug: "condicionamiento",
    term: {
      es: "Condicionamiento",
      eu: "Baldintzapena",
      en: "Conditioning"
    },
    shortDefinition: {
      es: "Sensibilidad del problema exacto ante perturbaciones en los datos.",
      eu: "Problema zehatzak datuetako perturbazioekiko duen sentikortasuna.",
      en: "Sensitivity of the exact problem to perturbations in the data."
    },
    definition: {
      es: "El condicionamiento pertenece al problema, no al algoritmo. En sistemas lineales lo mide $\\kappa(A)=\\|A\\|\\,\\|A^{-1}\\|$: si es grande, pequeños errores en $A$ o $b$ pueden producir grandes errores en $x$.",
      eu: "Baldintzapena problemarena da, ez algoritmoarena. Sistema linealetan $\\kappa(A)=\\|A\\|\\,\\|A^{-1}\\|$ bidez neurtzen da: handia bada, $A$ edo $b$-ko akats txikiek $x$-en akats handiak sor ditzakete.",
      en: "Conditioning belongs to the problem, not to the algorithm. In linear systems it is measured by $\\kappa(A)=\\|A\\|\\,\\|A^{-1}\\|$: if large, small errors in $A$ or $b$ can cause large errors in $x$."
    },
    usage: {
      es: "Distingue un mal algoritmo de un problema intrínsecamente sensible: cambiar de método no elimina un mal condicionamiento.",
      eu: "Algoritmo txarra eta berez sentikorra den problema bereizten ditu: metodoa aldatzeak ez du baldintzapen txarra ezabatzen.",
      en: "It separates a poor algorithm from an intrinsically sensitive problem: changing algorithms does not remove ill-conditioning."
    },
    related: ["sistemas-lineales-conceptos", "fundamentos-errores"]
  },
  {
    slug: "residuo",
    term: {
      es: "Residuo",
      eu: "Hondarra",
      en: "Residual"
    },
    shortDefinition: {
      es: "Defecto que queda al sustituir la aproximación en la ecuación original.",
      eu: "Hurbilketa jatorrizko ekuazioan ordezkatzean geratzen den akatsa.",
      en: "The defect left after substituting an approximation into the original equation."
    },
    definition: {
      es: "El residuo mide cuánto incumple la ecuación una aproximación. Para $f(x)=0$ es $|f(x_k)|$; para $Ax=b$ suele ser $r=b-Ax_k$. Un residuo pequeño no siempre implica error pequeño si el problema está mal condicionado.",
      eu: "Hondarrak hurbilketa batek ekuazioa zenbateraino ez duen betetzen neurtzen du. $f(x)=0$ kasuan $|f(x_k)|$ da; $Ax=b$ sistemetan, normalean $r=b-Ax_k$. Hondar txikiak ez du beti errore txikia bermatzen problema gaizki baldintzatuta badago.",
      en: "The residual measures how much an approximation fails to satisfy the equation. For $f(x)=0$ it is $|f(x_k)|$; for $Ax=b$ it is often $r=b-Ax_k$. A small residual does not always imply a small error when the problem is ill-conditioned."
    },
    usage: {
      es: "Es un criterio de parada práctico porque se calcula sin conocer la solución exacta, pero debe leerse junto al condicionamiento.",
      eu: "Gelditzeko irizpide praktikoa da, soluzio zehatza jakin gabe kalkulatzen delako, baina baldintzapenarekin batera interpretatu behar da.",
      en: "It is a practical stopping criterion because it can be computed without the exact solution, but it should be read together with conditioning."
    },
    related: ["no-lineales-introduccion", "sistemas-lineales-conceptos"]
  },
  {
    slug: "error-truncamiento",
    term: {
      es: "Error de truncamiento",
      eu: "Trunkatze-errorea",
      en: "Truncation error"
    },
    shortDefinition: {
      es: "Error introducido al cortar una expansión o sustituir un objeto continuo por uno discreto.",
      eu: "Garapen bat moztean edo objektu jarraitu bat diskretu batez ordeztean sartzen den errorea.",
      en: "Error introduced by cutting off an expansion or replacing a continuous object with a discrete one."
    },
    definition: {
      es: "El error de truncamiento aparece al detener una serie de Taylor, una interpolación o una cuadratura tras un número finito de términos. Es la fuente principal de las potencias $h^p$ en diferenciación, integración y EDO.",
      eu: "Trunkatze-errorea Taylor serie bat, interpolazio bat edo kuadratura bat termino kopuru finitu baten ondoren gelditzean agertzen da. Diferentziazioan, integrazioan eta EDOetan $h^p$ potentzien iturri nagusia da.",
      en: "Truncation error appears when a Taylor series, interpolation or quadrature is stopped after finitely many terms. It is the main source of the powers $h^p$ in differentiation, integration and ODEs."
    },
    usage: {
      es: "Bajar $h$ reduce el truncamiento, pero puede aumentar el redondeo; por eso las fórmulas de diferencias finitas tienen un paso óptimo práctico.",
      eu: "$h$ txikitzeak trunkatzea murrizten du, baina biribiltzea handitu dezake; horregatik diferentzia finituen formulek pauso optimo praktikoa dute.",
      en: "Reducing $h$ lowers truncation error, but can increase rounding error; this is why finite-difference formulas have a practical optimal step."
    },
    related: ["fundamentos-taylor-truncamiento", "diferenciacion-primera-derivada"]
  },
  {
    slug: "error-absoluto-relativo",
    term: {
      es: "Error absoluto y relativo",
      eu: "Errore absolutua eta erlatiboa",
      en: "Absolute and relative error"
    },
    shortDefinition: {
      es: "Las dos medidas básicas de la distancia entre un valor exacto y su aproximación.",
      eu: "Balio zehatzaren eta bere hurbilketaren arteko distantziaren bi oinarrizko neurriak.",
      en: "The two basic measures of the distance between an exact value and its approximation."
    },
    definition: {
      es: "Si $\\tilde{x}$ aproxima a $x$, el error absoluto es $E_a=|x-\\tilde{x}|$ y el error relativo es $E_r=|x-\\tilde{x}|/|x|$ (con $x\\neq0$). El relativo es adimensional y compara errores entre magnitudes de tamaños muy distintos.",
      eu: "$\\tilde{x}$-k $x$ hurbiltzen badu, errore absolutua $E_a=|x-\\tilde{x}|$ da eta errore erlatiboa $E_r=|x-\\tilde{x}|/|x|$ (non $x\\neq0$). Erlatiboa dimentsiorik gabea da eta tamaina oso desberdineko magnitudeen erroreak alderatzen ditu.",
      en: "If $\\tilde{x}$ approximates $x$, the absolute error is $E_a=|x-\\tilde{x}|$ and the relative error is $E_r=|x-\\tilde{x}|/|x|$ (with $x\\neq0$). The relative error is dimensionless and lets you compare errors across very different magnitudes."
    },
    usage: {
      es: "Usa el error relativo para hablar de precisión (cifras correctas) y el absoluto cuando la escala del problema es fija, como una tolerancia en metros.",
      eu: "Erabili errore erlatiboa doitasunaz hitz egiteko (zifra zuzenak) eta absolutua problemaren eskala finkoa denean, adibidez metrotan emandako tolerantzia bat.",
      en: "Use relative error to talk about accuracy (correct digits) and absolute error when the problem's scale is fixed, such as a tolerance in metres."
    },
    related: ["fundamentos-errores", "fundamentos-cifras-significativas"]
  },
  {
    slug: "error-redondeo",
    term: {
      es: "Error de redondeo",
      eu: "Biribiltze-errorea",
      en: "Rounding error"
    },
    shortDefinition: {
      es: "Error que aparece por representar y operar números con precisión finita.",
      eu: "Zenbakiak doitasun finituarekin adierazi eta eragiteagatik sortzen den errorea.",
      en: "Error caused by representing and operating on numbers with finite precision."
    },
    definition: {
      es: "El ordenador guarda los reales en coma flotante con un número fijo de dígitos, así que casi cada dato y cada operación introducen un pequeño error. Estos errores pueden acumularse o amplificarse, sobre todo al restar números casi iguales (cancelación).",
      eu: "Ordenagailuak zenbaki errealak koma higikorrean gordetzen ditu digitu kopuru finkoarekin; beraz, ia datu eta eragiketa bakoitzak errore txiki bat sartzen du. Errore horiek metatu edo handitu daitezke, batez ere ia berdinak diren zenbakiak kentzean (ezeztapena).",
      en: "Computers store real numbers in floating point with a fixed number of digits, so almost every datum and operation introduces a small error. These errors can accumulate or be amplified, especially when subtracting nearly equal numbers (cancellation)."
    },
    usage: {
      es: "Es la otra cara del truncamiento: al reducir el paso $h$, el truncamiento baja pero el redondeo relativo crece, lo que impone un paso óptimo en diferencias finitas.",
      eu: "Trunkatzearen beste aldea da: $h$ pausoa txikitzean trunkatzea jaisten da baina biribiltze erlatiboa hazten da, eta horrek pauso optimo bat ezartzen du diferentzia finituetan.",
      en: "It is the flip side of truncation: as the step $h$ shrinks, truncation decreases but relative rounding grows, which imposes an optimal step in finite differences."
    },
    related: ["fundamentos-errores", "diferenciacion-primera-derivada"]
  },
  {
    slug: "epsilon-maquina",
    term: {
      es: "Épsilon de máquina",
      eu: "Makina-epsilona",
      en: "Machine epsilon"
    },
    shortDefinition: {
      es: "La unidad de redondeo del sistema de coma flotante: el error relativo máximo al representar un número.",
      eu: "Koma higikorreko sistemaren biribiltze-unitatea: zenbaki bat adieraztean gerta daitekeen errore erlatibo maximoa.",
      en: "The rounding unit of the floating-point system: the maximum relative error of representing a number."
    },
    definition: {
      es: "Es la distancia entre $1$ y el siguiente número representable en coma flotante. En doble precisión (IEEE 754) vale $2^{-52}\\approx2.22\\times10^{-16}$, lo que se traduce en unas 15–16 cifras decimales significativas.",
      eu: "$1$-en eta koma higikorrean adieraz daitekeen hurrengo zenbakiaren arteko distantzia da. Doitasun bikoitzean (IEEE 754) $2^{-52}\\approx2.22\\times10^{-16}$ balio du, hau da, 15–16 zifra hamartar esangarri inguru.",
      en: "It is the gap between $1$ and the next representable floating-point number. In double precision (IEEE 754) it equals $2^{-52}\\approx2.22\\times10^{-16}$, which translates into about 15–16 significant decimal digits."
    },
    usage: {
      es: "Marca el suelo de cualquier tolerancia razonable: pedir un error relativo por debajo del épsilon de máquina no tiene sentido numérico.",
      eu: "Edozein tolerantzia zentzuzkoren zorua ezartzen du: makina-epsilonaren azpiko errore erlatiboa eskatzeak ez du zentzu numerikorik.",
      en: "It sets the floor for any reasonable tolerance: asking for a relative error below machine epsilon makes no numerical sense."
    },
    related: ["fundamentos-errores", "fundamentos-cifras-significativas"]
  },
  {
    slug: "cifras-significativas",
    term: {
      es: "Cifras significativas",
      eu: "Zifra esangarriak",
      en: "Significant figures"
    },
    shortDefinition: {
      es: "Los dígitos de una aproximación que aportan información fiable sobre el valor exacto.",
      eu: "Balio zehatzari buruzko informazio fidagarria ematen duten hurbilketa baten digituak.",
      en: "The digits of an approximation that carry reliable information about the exact value."
    },
    definition: {
      es: "Cuentan cuántos dígitos de $\\tilde{x}$ coinciden de forma fiable con los de $x$, medidos a través del error relativo. Cada cifra significativa ganada equivale aproximadamente a dividir el error relativo por diez.",
      eu: "$\\tilde{x}$-ren zenbat digitu datozen bat modu fidagarrian $x$-renekin zenbatzen dute, errore erlatiboaren bidez neurtuta. Irabazitako zifra esangarri bakoitza errore erlatiboa hamarrez zatitzearen parekoa da gutxi gorabehera.",
      en: "They count how many digits of $\\tilde{x}$ reliably agree with those of $x$, measured through the relative error. Each significant figure gained roughly corresponds to dividing the relative error by ten."
    },
    usage: {
      es: "La cancelación al restar números próximos destruye cifras significativas de golpe: reformular la expresión suele recuperarlas.",
      eu: "Hurbileko zenbakiak kentzean gertatzen den ezeztapenak zifra esangarriak kolpetik suntsitzen ditu: adierazpena birformulatuz berreskuratu ohi dira.",
      en: "Cancellation when subtracting nearby numbers destroys significant figures at once: reformulating the expression usually recovers them."
    },
    related: ["fundamentos-cifras-significativas", "fundamentos-errores"]
  },
  {
    slug: "polinomio-taylor",
    term: {
      es: "Polinomio de Taylor",
      eu: "Taylor polinomioa",
      en: "Taylor polynomial"
    },
    shortDefinition: {
      es: "La aproximación polinómica local de una función a partir de sus derivadas en un punto.",
      eu: "Funtzio baten hurbilketa polinomiko lokala, puntu bateko deribatuetatik eraikia.",
      en: "The local polynomial approximation of a function built from its derivatives at a point."
    },
    definition: {
      es: "Es $P_n(x)=\\sum_{k=0}^{n}\\frac{f^{(k)}(a)}{k!}(x-a)^k$, y el resto de Lagrange $R_n=\\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-a)^{n+1}$ mide lo que falta. Casi todas las fórmulas de diferenciación, integración y EDO nacen de truncar esta expansión.",
      eu: "$P_n(x)=\\sum_{k=0}^{n}\\frac{f^{(k)}(a)}{k!}(x-a)^k$ da, eta Lagrangeren hondarrak, $R_n=\\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-a)^{n+1}$, falta dena neurtzen du. Diferentziazio, integrazio eta EDOetako ia formula guztiak garapen hau trunkatzetik datoz.",
      en: "It is $P_n(x)=\\sum_{k=0}^{n}\\frac{f^{(k)}(a)}{k!}(x-a)^k$, and the Lagrange remainder $R_n=\\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-a)^{n+1}$ measures what is missing. Almost every differentiation, integration and ODE formula comes from truncating this expansion."
    },
    usage: {
      es: "Es la herramienta estándar para deducir fórmulas y calcular su orden: el primer término despreciado dicta la potencia $h^p$ del error.",
      eu: "Formulak deduzitzeko eta haien ordena kalkulatzeko tresna estandarra da: baztertutako lehen terminoak errorearen $h^p$ potentzia agintzen du.",
      en: "It is the standard tool for deriving formulas and computing their order: the first neglected term dictates the $h^p$ power of the error."
    },
    related: ["fundamentos-taylor-truncamiento", "deduccion-diferencias-finitas-taylor"]
  },
  {
    slug: "nodos",
    term: {
      es: "Nodos",
      eu: "Nodoak",
      en: "Nodes"
    },
    shortDefinition: {
      es: "Los puntos del dominio donde se conoce o se evalúa la función.",
      eu: "Funtzioa ezagutzen edo ebaluatzen den domeinuko puntuak.",
      en: "The points of the domain where the function is known or evaluated."
    },
    definition: {
      es: "En interpolación son los puntos $(x_i, f(x_i))$ por los que pasa el polinomio; en cuadratura, las abscisas donde se evalúa el integrando. Su número y su colocación (equiespaciados, de Chebyshev, de Gauss) determinan la precisión alcanzable.",
      eu: "Interpolazioan, polinomioa igarotzen den $(x_i, f(x_i))$ puntuak dira; kuadraturan, integrakizuna ebaluatzen den abszisak. Haien kopuruak eta kokapenak (ekidistanteak, Chebyshevrenak, Gaussenak) lor daitekeen doitasuna zehazten dute.",
      en: "In interpolation they are the points $(x_i, f(x_i))$ the polynomial passes through; in quadrature, the abscissas where the integrand is evaluated. Their number and placement (equispaced, Chebyshev, Gauss) determine the achievable accuracy."
    },
    usage: {
      es: "Ante datos tabulados, los nodos vienen dados; cuando puedes elegirlos, colocarlos bien (Gauss, Chebyshev) compra órdenes de precisión extra.",
      eu: "Datu tabulatuekin nodoak emanda datoz; aukeratu ditzakezunean, ondo kokatzeak (Gauss, Chebyshev) doitasun-orden gehigarriak erosten ditu.",
      en: "With tabulated data the nodes are given; when you can choose them, placing them well (Gauss, Chebyshev) buys extra orders of accuracy."
    },
    related: ["interpolacion-fundamentos", "integracion-gauss"]
  },
  {
    slug: "diferencias-divididas",
    term: {
      es: "Diferencias divididas",
      eu: "Diferentzia zatituak",
      en: "Divided differences"
    },
    shortDefinition: {
      es: "Los coeficientes recursivos que construyen el polinomio interpolador en forma de Newton.",
      eu: "Newton formako polinomio interpolatzailea eraikitzen duten koefiziente errekurtsiboak.",
      en: "The recursive coefficients that build the interpolating polynomial in Newton form."
    },
    definition: {
      es: "Se definen por $f[x_i]=f(x_i)$ y $f[x_i,\\dots,x_{i+k}]=\\frac{f[x_{i+1},\\dots,x_{i+k}]-f[x_i,\\dots,x_{i+k-1}]}{x_{i+k}-x_i}$. Son los coeficientes de la forma de Newton y se organizan en una tabla triangular fácil de ampliar.",
      eu: "Honela definitzen dira: $f[x_i]=f(x_i)$ eta $f[x_i,\\dots,x_{i+k}]=\\frac{f[x_{i+1},\\dots,x_{i+k}]-f[x_i,\\dots,x_{i+k-1}]}{x_{i+k}-x_i}$. Newton formaren koefizienteak dira eta hedatzeko erraza den taula triangeluar batean antolatzen dira.",
      en: "They are defined by $f[x_i]=f(x_i)$ and $f[x_i,\\dots,x_{i+k}]=\\frac{f[x_{i+1},\\dots,x_{i+k}]-f[x_i,\\dots,x_{i+k-1}]}{x_{i+k}-x_i}$. They are the coefficients of the Newton form and sit in a triangular table that is easy to extend."
    },
    usage: {
      es: "Su gran ventaja práctica: añadir un nodo nuevo solo cuesta una diagonal más de la tabla, sin rehacer el polinomio entero.",
      eu: "Abantaila praktiko handia: nodo berri bat gehitzeak taularen diagonal bat gehiago baino ez du kostatzen, polinomio osoa berregin gabe.",
      en: "Their big practical advantage: adding a new node only costs one more diagonal of the table, without rebuilding the whole polynomial."
    },
    related: ["interpolacion-newton", "deduccion-diferencias-divididas-newton"]
  },
  {
    slug: "spline",
    term: {
      es: "Spline",
      eu: "Splinea",
      en: "Spline"
    },
    shortDefinition: {
      es: "Interpolante polinómico a trozos con condiciones de suavidad en las uniones.",
      eu: "Zatika polinomikoa den interpolatzailea, loturetan leuntasun-baldintzekin.",
      en: "A piecewise-polynomial interpolant with smoothness conditions at the joints."
    },
    definition: {
      es: "En vez de un único polinomio de grado alto, un spline usa un polinomio de grado bajo en cada subintervalo y exige continuidad de la función y de sus derivadas en los nodos. El spline cúbico natural es $C^2$ y es el estándar práctico.",
      eu: "Gradu handiko polinomio bakarra erabili beharrean, spline batek gradu txikiko polinomio bat erabiltzen du azpitarte bakoitzean, eta funtzioaren eta bere deribatuen jarraitutasuna eskatzen du nodoetan. Spline kubiko naturala $C^2$ da eta estandar praktikoa da.",
      en: "Instead of one high-degree polynomial, a spline uses a low-degree polynomial on each subinterval and enforces continuity of the function and its derivatives at the nodes. The natural cubic spline is $C^2$ and is the practical standard."
    },
    usage: {
      es: "Es la respuesta estándar al fenómeno de Runge: con muchos nodos equiespaciados, interpola a trozos en lugar de subir el grado.",
      eu: "Runge fenomenoari erantzun estandarra da: nodo ekidistante askorekin, interpolatu zatika, gradua igo beharrean.",
      en: "It is the standard answer to the Runge phenomenon: with many equispaced nodes, interpolate piecewise instead of raising the degree."
    },
    related: ["interpolacion-splines", "interpolacion-fundamentos"]
  },
  {
    slug: "fenomeno-runge",
    term: {
      es: "Fenómeno de Runge",
      eu: "Runge fenomenoa",
      en: "Runge phenomenon"
    },
    shortDefinition: {
      es: "Oscilaciones crecientes cerca de los extremos al interpolar con grado alto en nodos equiespaciados.",
      eu: "Muturretatik gertu hazten diren oszilazioak, nodo ekidistanteetan gradu handiarekin interpolatzean.",
      en: "Growing oscillations near the endpoints when interpolating with high degree at equispaced nodes."
    },
    definition: {
      es: "Al aumentar el grado del interpolador sobre nodos equiespaciados, el error puede crecer sin límite cerca de los extremos del intervalo, como muestra el ejemplo clásico $f(x)=1/(1+25x^2)$ en $[-1,1]$. Más nodos no significa mejor aproximación.",
      eu: "Nodo ekidistanteen gainean interpolatzailearen gradua handitzean, errorea mugarik gabe hazi daiteke tartearen muturretatik gertu, $f(x)=1/(1+25x^2)$ adibide klasikoak $[-1,1]$-en erakusten duen bezala. Nodo gehiagok ez du esan nahi hurbilketa hobea.",
      en: "As the interpolant's degree grows over equispaced nodes, the error can grow without bound near the ends of the interval, as the classic example $f(x)=1/(1+25x^2)$ on $[-1,1]$ shows. More nodes does not mean a better approximation."
    },
    usage: {
      es: "Es el aviso de que el grado alto equiespaciado es peligroso: usa splines o nodos de Chebyshev, que concentran puntos en los extremos.",
      eu: "Gradu handia nodo ekidistanteekin arriskutsua dela ohartarazten du: erabili splineak edo Chebyshev nodoak, puntuak muturretan biltzen dituztenak.",
      en: "It is the warning that high degree on equispaced nodes is dangerous: use splines or Chebyshev nodes, which cluster points near the endpoints."
    },
    related: ["interpolacion-fundamentos", "interpolacion-splines"]
  },
  {
    slug: "cuadratura",
    term: {
      es: "Cuadratura",
      eu: "Kuadratura",
      en: "Quadrature"
    },
    shortDefinition: {
      es: "Aproximar una integral definida por una suma ponderada de valores de la función.",
      eu: "Integral definitu bat funtzioaren balioen batura haztatu batez hurbiltzea.",
      en: "Approximating a definite integral by a weighted sum of function values."
    },
    definition: {
      es: "Una fórmula de cuadratura tiene la forma $\\int_a^b f(x)\\,dx\\approx\\sum_{i=0}^{n} w_i f(x_i)$, con nodos $x_i$ y pesos $w_i$. Newton-Cotes usa nodos equiespaciados; Gauss elige nodos y pesos a la vez para maximizar el grado de precisión.",
      eu: "Kuadratura formula batek forma hau du: $\\int_a^b f(x)\\,dx\\approx\\sum_{i=0}^{n} w_i f(x_i)$, $x_i$ nodoekin eta $w_i$ pisuekin. Newton-Cotesek nodo ekidistanteak erabiltzen ditu; Gaussek nodoak eta pisuak batera aukeratzen ditu doitasun-gradua maximizatzeko.",
      en: "A quadrature formula has the form $\\int_a^b f(x)\\,dx\\approx\\sum_{i=0}^{n} w_i f(x_i)$, with nodes $x_i$ and weights $w_i$. Newton-Cotes uses equispaced nodes; Gauss chooses nodes and weights together to maximize the degree of precision."
    },
    usage: {
      es: "Con datos tabulados usa trapecios o Simpson compuestos; si puedes evaluar $f$ donde quieras, Gauss da más precisión con menos evaluaciones.",
      eu: "Datu tabulatuekin erabili trapezio edo Simpson konposatuak; $f$ nahi duzun tokian ebaluatu badezakezu, Gaussek doitasun handiagoa ematen du ebaluazio gutxiagorekin.",
      en: "With tabulated data use composite trapezoid or Simpson; if you can evaluate $f$ anywhere, Gauss gives more accuracy with fewer evaluations."
    },
    related: ["integracion-cuadratura-lagrange", "integracion-newton-cotes-cerradas", "integracion-gauss"]
  },
  {
    slug: "grado-precision",
    term: {
      es: "Grado de precisión",
      eu: "Doitasun-gradua",
      en: "Degree of precision"
    },
    shortDefinition: {
      es: "El mayor grado de polinomio que una fórmula de cuadratura integra de forma exacta.",
      eu: "Kuadratura formula batek zehatz integratzen duen polinomio-gradu handiena.",
      en: "The highest polynomial degree that a quadrature formula integrates exactly."
    },
    definition: {
      es: "Una fórmula tiene grado de precisión $m$ si integra exactamente todo polinomio de grado $\\le m$ y falla para alguno de grado $m+1$. Simpson alcanza grado 3 con solo tres nodos; Gauss-Legendre con $n$ nodos llega a $2n-1$, el máximo posible.",
      eu: "Formula batek $m$ doitasun-gradua du $\\le m$ graduko polinomio guztiak zehatz integratzen baditu eta $m+1$ graduko batenbat huts egiten badu. Simpsonek 3. gradua lortzen du hiru nodorekin bakarrik; Gauss-Legendrek $n$ nodorekin $2n-1$ lortzen du, ahalik eta handiena.",
      en: "A formula has degree of precision $m$ if it integrates every polynomial of degree $\\le m$ exactly and fails for some polynomial of degree $m+1$. Simpson reaches degree 3 with only three nodes; Gauss-Legendre with $n$ nodes reaches $2n-1$, the maximum possible."
    },
    usage: {
      es: "Se comprueba integrando monomios $1, x, x^2,\\dots$ y es la forma rápida de comparar fórmulas antes de mirar constantes de error.",
      eu: "$1, x, x^2,\\dots$ monomioak integratuz egiaztatzen da, eta formulak alderatzeko bide azkarra da errore-konstanteei begiratu aurretik.",
      en: "You check it by integrating the monomials $1, x, x^2,\\dots$, and it is the quick way to compare formulas before looking at error constants."
    },
    related: ["integracion-newton-cotes-cerradas", "deduccion-integracion-gauss-legendre-dos-puntos"]
  },
  {
    slug: "extrapolacion-richardson",
    term: {
      es: "Extrapolación de Richardson",
      eu: "Richardson estrapolazioa",
      en: "Richardson extrapolation"
    },
    shortDefinition: {
      es: "Combinar dos aproximaciones con pasos distintos para cancelar el término dominante del error.",
      eu: "Pauso desberdineko bi hurbilketa konbinatzea errorearen termino nagusia ezeztatzeko.",
      en: "Combining two approximations with different steps to cancel the leading error term."
    },
    definition: {
      es: "Si $A(h)=A+Ch^p+\\mathcal{O}(h^q)$, la combinación $\\frac{2^p A(h/2)-A(h)}{2^p-1}$ elimina el término $h^p$ y sube el orden a $q$. Aplicada en cascada genera métodos como la integración de Romberg.",
      eu: "$A(h)=A+Ch^p+\\mathcal{O}(h^q)$ bada, $\\frac{2^p A(h/2)-A(h)}{2^p-1}$ konbinazioak $h^p$ terminoa ezabatzen du eta ordena $q$-ra igotzen du. Kaskadan aplikatuta, Romberg integrazioa bezalako metodoak sortzen ditu.",
      en: "If $A(h)=A+Ch^p+\\mathcal{O}(h^q)$, the combination $\\frac{2^p A(h/2)-A(h)}{2^p-1}$ removes the $h^p$ term and raises the order to $q$. Applied repeatedly it generates methods such as Romberg integration."
    },
    usage: {
      es: "Es precisión casi gratis cuando ya tienes que calcular con dos pasos; además, comparar $A(h)$ y $A(h/2)$ da una estimación práctica del error.",
      eu: "Ia doako doitasuna da bi pausorekin kalkulatu behar duzunean; gainera, $A(h)$ eta $A(h/2)$ alderatzeak errorearen estimazio praktikoa ematen du.",
      en: "It is nearly free accuracy when you already compute with two steps; moreover, comparing $A(h)$ and $A(h/2)$ gives a practical error estimate."
    },
    related: ["diferenciacion-richardson", "deduccion-richardson-orden", "ejercicio-richardson-logaritmo"]
  },
  {
    slug: "paso",
    term: {
      es: "Paso ($h$)",
      eu: "Pausoa ($h$)",
      en: "Step size ($h$)"
    },
    shortDefinition: {
      es: "La distancia entre puntos consecutivos de la discretización.",
      eu: "Diskretizazioko puntu jarraikien arteko distantzia.",
      en: "The distance between consecutive points of the discretization."
    },
    definition: {
      es: "El paso $h$ controla la resolución de una malla o de una integración de EDO. El error de truncamiento se escribe como potencias de $h$, y el coste computacional crece al reducirlo: elegir $h$ es un compromiso entre precisión, coste y estabilidad.",
      eu: "$h$ pausoak sare baten edo EDO integrazio baten bereizmena kontrolatzen du. Trunkatze-errorea $h$-ren potentzia gisa idazten da, eta kostu konputazionala hazten da txikitzean: $h$ aukeratzea doitasunaren, kostuaren eta egonkortasunaren arteko oreka da.",
      en: "The step $h$ controls the resolution of a mesh or of an ODE integration. Truncation error is written as powers of $h$, and computational cost grows as it shrinks: choosing $h$ is a trade-off between accuracy, cost and stability."
    },
    usage: {
      es: "En problemas rígidos no manda la precisión sino la estabilidad: el paso admisible puede ser mucho menor de lo que sugiere el error de truncamiento.",
      eu: "Problema zurrunetan ez du doitasunak agintzen, egonkortasunak baizik: pauso onargarria trunkatze-erroreak iradokitzen duena baino askoz txikiagoa izan daiteke.",
      en: "In stiff problems stability rules rather than accuracy: the admissible step can be far smaller than the truncation error suggests."
    },
    related: ["edo-metodo-euler", "edo-problemas-rigidos", "diferenciacion-primera-derivada"]
  },
  {
    slug: "explicito-implicito",
    term: {
      es: "Método explícito e implícito",
      eu: "Metodo esplizitua eta inplizitua",
      en: "Explicit and implicit methods"
    },
    shortDefinition: {
      es: "Distinción entre calcular el paso nuevo directamente o resolviendo una ecuación que lo contiene.",
      eu: "Pauso berria zuzenean kalkulatu edo hura barnean duen ekuazio bat ebatzi behar izatearen arteko bereizketa.",
      en: "The distinction between computing the new step directly or by solving an equation that contains it."
    },
    definition: {
      es: "Un método explícito da $y_{n+1}$ con una fórmula cerrada en valores ya conocidos, como Euler explícito $y_{n+1}=y_n+hf(t_n,y_n)$. Uno implícito hace aparecer $y_{n+1}$ en ambos lados, como Euler implícito $y_{n+1}=y_n+hf(t_{n+1},y_{n+1})$, y exige resolver una ecuación en cada paso.",
      eu: "Metodo esplizitu batek $y_{n+1}$ formula itxi batez ematen du, dagoeneko ezagunak diren balioekin, Euler esplizituak bezala: $y_{n+1}=y_n+hf(t_n,y_n)$. Inplizitu batean $y_{n+1}$ bi aldeetan agertzen da, Euler inplizituan bezala: $y_{n+1}=y_n+hf(t_{n+1},y_{n+1})$, eta pauso bakoitzean ekuazio bat ebatzi behar da.",
      en: "An explicit method gives $y_{n+1}$ by a closed formula in already-known values, like explicit Euler $y_{n+1}=y_n+hf(t_n,y_n)$. An implicit one has $y_{n+1}$ on both sides, like implicit Euler $y_{n+1}=y_n+hf(t_{n+1},y_{n+1})$, and requires solving an equation at every step."
    },
    usage: {
      es: "Pagas el paso implícito (resolver una ecuación) a cambio de estabilidad: en problemas rígidos, esa compra sale muy rentable.",
      eu: "Pauso inplizitua (ekuazio bat ebaztea) ordaintzen duzu egonkortasunaren truke: problema zurrunetan, erosketa hori oso errentagarria da.",
      en: "You pay for the implicit step (solving an equation) in exchange for stability: in stiff problems, that trade is very profitable."
    },
    related: ["deduccion-euler-implicito", "edo-adams-moulton", "edo-problemas-rigidos"]
  },
  {
    slug: "rigidez",
    term: {
      es: "Rigidez",
      eu: "Zurruntasuna",
      en: "Stiffness"
    },
    shortDefinition: {
      es: "Propiedad de una EDO que obliga a los métodos explícitos a usar pasos minúsculos por estabilidad.",
      eu: "EDO baten propietatea, metodo esplizituak egonkortasunagatik pauso txiki-txikiak erabiltzera behartzen dituena.",
      en: "A property of an ODE that forces explicit methods to take tiny steps for stability."
    },
    definition: {
      es: "Un problema es rígido cuando conviven escalas de tiempo muy distintas: componentes rápidas ya amortiguadas siguen limitando el paso de los métodos explícitos, aunque la solución visible sea suave. La precisión permitiría un paso grande; la estabilidad lo prohíbe.",
      eu: "Problema bat zurruna da oso denbora-eskala desberdinak elkarrekin bizi direnean: dagoeneko moteldutako osagai azkarrek metodo esplizituen pausoa mugatzen jarraitzen dute, ikusgai den soluzioa leuna izan arren. Doitasunak pauso handia onartuko luke; egonkortasunak debekatzen du.",
      en: "A problem is stiff when very different time scales coexist: fast components that have already decayed still limit the step of explicit methods, even though the visible solution is smooth. Accuracy would allow a large step; stability forbids it."
    },
    usage: {
      es: "La señal típica: RK4 explota salvo con pasos absurdamente pequeños mientras Euler implícito avanza tranquilo. Cambia a métodos implícitos o A-estables.",
      eu: "Seinale tipikoa: RK4 lehertu egiten da pauso absurdo txikiekin izan ezik, eta Euler inplizituak lasai aurrera egiten du. Aldatu metodo inplizituetara edo A-egonkorretara.",
      en: "The typical sign: RK4 blows up except with absurdly small steps while implicit Euler proceeds calmly. Switch to implicit or A-stable methods."
    },
    related: ["edo-problemas-rigidos", "ejercicio-euler-implicito-estabilidad"]
  },
  {
    slug: "region-estabilidad",
    term: {
      es: "Región de estabilidad absoluta",
      eu: "Egonkortasun absolutuko eremua",
      en: "Region of absolute stability"
    },
    shortDefinition: {
      es: "El conjunto de valores $h\\lambda$ para los que un método amortigua la ecuación de prueba.",
      eu: "Metodo batek proba-ekuazioa moteltzen duen $h\\lambda$ balioen multzoa.",
      en: "The set of $h\\lambda$ values for which a method damps the test equation."
    },
    definition: {
      es: "Se define aplicando el método a la ecuación de prueba $y'=\\lambda y$: la región contiene los $z=h\\lambda$ del plano complejo para los que la solución numérica permanece acotada. Euler explícito exige $|1+z|\\le1$; Euler implícito es estable en todo el semiplano $\\operatorname{Re}(z)\\le0$ (A-estable).",
      eu: "Metodoa $y'=\\lambda y$ proba-ekuazioari aplikatuz definitzen da: eremuak soluzio numerikoa bornatuta mantentzen duten plano konplexuko $z=h\\lambda$ balioak ditu. Euler esplizituak $|1+z|\\le1$ eskatzen du; Euler inplizitua $\\operatorname{Re}(z)\\le0$ erdiplano osoan egonkorra da (A-egonkorra).",
      en: "It is defined by applying the method to the test equation $y'=\\lambda y$: the region contains the complex values $z=h\\lambda$ for which the numerical solution stays bounded. Explicit Euler requires $|1+z|\\le1$; implicit Euler is stable on the whole half-plane $\\operatorname{Re}(z)\\le0$ (A-stable)."
    },
    usage: {
      es: "Traduce la rigidez a una condición de paso concreta: con $\\lambda<0$ real, Euler explícito necesita $h<2/|\\lambda|$ aunque la precisión pida menos.",
      eu: "Zurruntasuna pauso-baldintza zehatz batera itzultzen du: $\\lambda<0$ errealarekin, Euler esplizituak $h<2/|\\lambda|$ behar du, doitasunak gutxiago eskatu arren.",
      en: "It translates stiffness into a concrete step condition: with real $\\lambda<0$, explicit Euler needs $h<2/|\\lambda|$ even if accuracy asks for less."
    },
    related: ["edo-problemas-rigidos", "ejercicio-euler-implicito-estabilidad", "edo-convergencia-orden"]
  },
  {
    slug: "punto-fijo",
    term: {
      es: "Punto fijo",
      eu: "Puntu finkoa",
      en: "Fixed point"
    },
    shortDefinition: {
      es: "Un valor que la función de iteración deja invariante: $g(\\alpha)=\\alpha$.",
      eu: "Iterazio-funtzioak aldatzen ez duen balioa: $g(\\alpha)=\\alpha$.",
      en: "A value the iteration function leaves unchanged: $g(\\alpha)=\\alpha$."
    },
    definition: {
      es: "Reescribiendo $f(x)=0$ como $x=g(x)$, resolver la ecuación equivale a encontrar el punto fijo de $g$. La iteración $x_{k+1}=g(x_k)$ converge localmente si $|g'(\\alpha)|<1$, y cuanto menor es esa derivada, más rápido converge.",
      eu: "$f(x)=0$ ekuazioa $x=g(x)$ gisa berridatzita, ekuazioa ebaztea $g$-ren puntu finkoa aurkitzearen baliokidea da. $x_{k+1}=g(x_k)$ iterazioa lokalki konbergentea da $|g'(\\alpha)|<1$ bada, eta deribatu hori zenbat eta txikiagoa izan, orduan eta azkarrago konbergitzen du.",
      en: "Rewriting $f(x)=0$ as $x=g(x)$, solving the equation is equivalent to finding the fixed point of $g$. The iteration $x_{k+1}=g(x_k)$ converges locally if $|g'(\\alpha)|<1$, and the smaller that derivative, the faster the convergence."
    },
    usage: {
      es: "Una misma ecuación admite muchas $g$: elegir una con $|g'|$ pequeña cerca de la raíz separa una iteración útil de una divergente. Newton es un punto fijo con $g'(\\alpha)=0$.",
      eu: "Ekuazio berak $g$ asko onartzen ditu: errotik gertu $|g'|$ txikia duen bat aukeratzeak iterazio erabilgarria eta dibergentea bereizten ditu. Newton $g'(\\alpha)=0$ duen puntu finko bat da.",
      en: "The same equation admits many $g$'s: choosing one with small $|g'|$ near the root separates a useful iteration from a divergent one. Newton is a fixed point with $g'(\\alpha)=0$."
    },
    related: ["no-lineales-punto-fijo", "deduccion-punto-fijo-convergencia"]
  },
  {
    slug: "criterio-parada",
    term: {
      es: "Criterio de parada",
      eu: "Gelditze-irizpidea",
      en: "Stopping criterion"
    },
    shortDefinition: {
      es: "La regla que decide cuándo una iteración ha alcanzado precisión suficiente.",
      eu: "Iterazio batek nahikoa doitasun noiz lortu duen erabakitzen duen araua.",
      en: "The rule that decides when an iteration has reached sufficient accuracy."
    },
    definition: {
      es: "Los criterios habituales combinan el incremento $|x_{k+1}-x_k|$ (absoluto o relativo), el residuo $|f(x_k)|$ y un número máximo de iteraciones como red de seguridad. Cada uno puede engañar por separado: el incremento en iteraciones lentas, el residuo en problemas mal condicionados.",
      eu: "Ohiko irizpideek $|x_{k+1}-x_k|$ gehikuntza (absolutua edo erlatiboa), $|f(x_k)|$ hondarra eta gehienezko iterazio kopuru bat konbinatzen dituzte, segurtasun-sare gisa. Bakoitzak bere aldetik engaina dezake: gehikuntzak iterazio geldoetan, hondarrak gaizki baldintzatutako problemetan.",
      en: "The usual criteria combine the increment $|x_{k+1}-x_k|$ (absolute or relative), the residual $|f(x_k)|$ and a maximum number of iterations as a safety net. Each can mislead on its own: the increment in slow iterations, the residual in ill-conditioned problems."
    },
    usage: {
      es: "En la práctica se exige incremento y residuo pequeños a la vez, con tolerancias coherentes con el épsilon de máquina y con los datos.",
      eu: "Praktikan gehikuntza eta hondarra biak txikiak izatea eskatzen da, makina-epsilonarekin eta datuekin koherenteak diren tolerantziekin.",
      en: "In practice one requires both a small increment and a small residual, with tolerances consistent with machine epsilon and with the data."
    },
    related: ["no-lineales-introduccion", "sistemas-no-lineales-introduccion"]
  },
  {
    slug: "diagonal-dominante",
    term: {
      es: "Matriz diagonalmente dominante",
      eu: "Matrize diagonalki nagusia",
      en: "Diagonally dominant matrix"
    },
    shortDefinition: {
      es: "Matriz en la que cada elemento diagonal domina a la suma del resto de su fila.",
      eu: "Matrize bat non elementu diagonal bakoitzak bere errenkadako gainerakoen batura gainditzen duen.",
      en: "A matrix in which each diagonal element dominates the sum of the rest of its row."
    },
    definition: {
      es: "Es estrictamente diagonalmente dominante por filas si $|a_{ii}|>\\sum_{j\\neq i}|a_{ij}|$ para toda fila $i$. Esta condición garantiza que la matriz es invertible y que Jacobi y Gauss-Seidel convergen para cualquier punto de partida.",
      eu: "Errenkadaz estuki diagonalki nagusia da $|a_{ii}|>\\sum_{j\\neq i}|a_{ij}|$ betetzen bada errenkada guztietan. Baldintza honek matrizea alderanzgarria dela bermatzen du, eta Jacobi eta Gauss-Seidel edozein abiapuntutatik konbergitzen dutela.",
      en: "It is strictly diagonally dominant by rows if $|a_{ii}|>\\sum_{j\\neq i}|a_{ij}|$ for every row $i$. This condition guarantees the matrix is invertible and that Jacobi and Gauss-Seidel converge from any starting point."
    },
    usage: {
      es: "Es el test rápido antes de iterar: si la dominancia falla, reordena ecuaciones para conseguirla o revisa la convergencia con el radio espectral.",
      eu: "Iteratu aurreko proba azkarra da: nagusitasunak huts egiten badu, berrantolatu ekuazioak hura lortzeko edo aztertu konbergentzia erradio espektralarekin.",
      en: "It is the quick test before iterating: if dominance fails, reorder the equations to obtain it or check convergence via the spectral radius."
    },
    related: ["sistemas-lineales-jacobi", "sistemas-lineales-convergencia"]
  },
  {
    slug: "radio-espectral",
    term: {
      es: "Radio espectral",
      eu: "Erradio espektrala",
      en: "Spectral radius"
    },
    shortDefinition: {
      es: "El mayor valor absoluto de los autovalores de una matriz; decide la convergencia de las iteraciones lineales.",
      eu: "Matrize baten autobalioen balio absolutu handiena; iterazio linealen konbergentzia erabakitzen du.",
      en: "The largest absolute value of a matrix's eigenvalues; it decides the convergence of linear iterations."
    },
    definition: {
      es: "Para la matriz de iteración $B$, es $\\rho(B)=\\max_i|\\lambda_i|$. Una iteración estacionaria $x_{k+1}=Bx_k+c$ converge para cualquier inicio si y solo si $\\rho(B)<1$, y cuanto menor es $\\rho(B)$, más rápida es la convergencia.",
      eu: "$B$ iterazio-matrizearentzat, $\\rho(B)=\\max_i|\\lambda_i|$ da. $x_{k+1}=Bx_k+c$ iterazio egonkor bat edozein hasieratatik konbergentea da baldin eta soilik baldin $\\rho(B)<1$ bada, eta $\\rho(B)$ zenbat eta txikiagoa izan, orduan eta azkarragoa da konbergentzia.",
      en: "For the iteration matrix $B$, it is $\\rho(B)=\\max_i|\\lambda_i|$. A stationary iteration $x_{k+1}=Bx_k+c$ converges from any start if and only if $\\rho(B)<1$, and the smaller $\\rho(B)$, the faster the convergence."
    },
    usage: {
      es: "Compara métodos sobre el mismo sistema: entre Jacobi, Gauss-Seidel y SOR gana el de menor radio espectral, y $-\\ln\\rho(B)$ estima la velocidad.",
      eu: "Sistema beraren gaineko metodoak alderatzen ditu: Jacobi, Gauss-Seidel eta SOR artean erradio espektral txikienekoak irabazten du, eta $-\\ln\\rho(B)$-k abiadura estimatzen du.",
      en: "Use it to compare methods on the same system: among Jacobi, Gauss-Seidel and SOR the smallest spectral radius wins, and $-\\ln\\rho(B)$ estimates the speed."
    },
    related: ["sistemas-lineales-convergencia", "ejercicio-convergencia-radio-espectral", "deduccion-jacobi-matriz-iteracion"]
  },
  {
    slug: "matriz-jacobiana",
    term: {
      es: "Matriz jacobiana",
      eu: "Matrize jakobiarra",
      en: "Jacobian matrix"
    },
    shortDefinition: {
      es: "La matriz de derivadas parciales que generaliza $f'$ a sistemas de varias variables.",
      eu: "$f'$ aldagai anitzeko sistemetara orokortzen duen deribatu partzialen matrizea.",
      en: "The matrix of partial derivatives that generalizes $f'$ to systems of several variables."
    },
    definition: {
      es: "Para $F:\\mathbb{R}^n\\to\\mathbb{R}^n$ es $J_F(x)_{ij}=\\partial F_i/\\partial x_j$. En el método de Newton para sistemas sustituye a la derivada escalar: cada paso resuelve el sistema lineal $J_F(x_k)\\,\\Delta x=-F(x_k)$ y actualiza $x_{k+1}=x_k+\\Delta x$.",
      eu: "$F:\\mathbb{R}^n\\to\\mathbb{R}^n$ funtzioarentzat, $J_F(x)_{ij}=\\partial F_i/\\partial x_j$ da. Sistemetarako Newton metodoan deribatu eskalarra ordezkatzen du: pauso bakoitzak $J_F(x_k)\\,\\Delta x=-F(x_k)$ sistema lineala ebazten du eta $x_{k+1}=x_k+\\Delta x$ eguneratzen du.",
      en: "For $F:\\mathbb{R}^n\\to\\mathbb{R}^n$ it is $J_F(x)_{ij}=\\partial F_i/\\partial x_j$. In Newton's method for systems it replaces the scalar derivative: each step solves the linear system $J_F(x_k)\\,\\Delta x=-F(x_k)$ and updates $x_{k+1}=x_k+\\Delta x$."
    },
    usage: {
      es: "Su coste domina el método de Newton en sistemas: evaluar $n^2$ parciales y factorizar $J$ en cada paso es lo que las variantes cuasi-Newton intentan abaratar.",
      eu: "Bere kostuak Newton metodoa menderatzen du sistemetan: pauso bakoitzean $n^2$ partzial ebaluatzea eta $J$ faktorizatzea da kuasi-Newton aldaerek merkatu nahi dutena.",
      en: "Its cost dominates Newton's method for systems: evaluating $n^2$ partials and factorizing $J$ at each step is what quasi-Newton variants try to make cheaper."
    },
    related: ["sistemas-no-lineales-newton", "deduccion-newton-sistemas"]
  },
  {
    slug: "normas",
    term: {
      es: "Normas vectoriales y matriciales",
      eu: "Bektore- eta matrize-normak",
      en: "Vector and matrix norms"
    },
    shortDefinition: {
      es: "Las medidas de tamaño con las que se cuantifican errores y convergencia en varias dimensiones.",
      eu: "Dimentsio anitzetan erroreak eta konbergentzia kuantifikatzeko tamaina-neurriak.",
      en: "The size measures used to quantify errors and convergence in several dimensions."
    },
    definition: {
      es: "Las más usadas son $\\|x\\|_1=\\sum|x_i|$, $\\|x\\|_2=(\\sum x_i^2)^{1/2}$ y $\\|x\\|_\\infty=\\max|x_i|$. Cada una induce una norma matricial $\\|A\\|=\\max_{x\\neq0}\\|Ax\\|/\\|x\\|$, que aparece en las cotas de error y en el número de condición $\\kappa(A)$.",
      eu: "Erabilienak $\\|x\\|_1=\\sum|x_i|$, $\\|x\\|_2=(\\sum x_i^2)^{1/2}$ eta $\\|x\\|_\\infty=\\max|x_i|$ dira. Bakoitzak matrize-norma bat induzitzen du, $\\|A\\|=\\max_{x\\neq0}\\|Ax\\|/\\|x\\|$, errore-kotetan eta $\\kappa(A)$ baldintza-zenbakian agertzen dena.",
      en: "The most used are $\\|x\\|_1=\\sum|x_i|$, $\\|x\\|_2=(\\sum x_i^2)^{1/2}$ and $\\|x\\|_\\infty=\\max|x_i|$. Each induces a matrix norm $\\|A\\|=\\max_{x\\neq0}\\|Ax\\|/\\|x\\|$, which appears in error bounds and in the condition number $\\kappa(A)$."
    },
    usage: {
      es: "Fija la norma antes de comparar errores o tolerancias: un mismo vector puede pasar un criterio en $\\|\\cdot\\|_\\infty$ y fallarlo en $\\|\\cdot\\|_2$.",
      eu: "Finkatu norma erroreak edo tolerantziak alderatu aurretik: bektore berak irizpide bat gainditu dezake $\\|\\cdot\\|_\\infty$-n eta huts egin $\\|\\cdot\\|_2$-n.",
      en: "Fix the norm before comparing errors or tolerances: the same vector can pass a criterion in $\\|\\cdot\\|_\\infty$ and fail it in $\\|\\cdot\\|_2$."
    },
    related: ["sistemas-lineales-conceptos", "sistemas-lineales-convergencia"]
  }
];
