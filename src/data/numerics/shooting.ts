/**
 * Small build-time numerics used to draw the boundary-value-problem plots.
 * Every curve in the "Problemas de frontera" area is computed here with the
 * same RK4 + shooting algorithms the articles describe, so the figures and
 * the verified numbers in the text come from one implementation.
 */

export type Point = [number, number];
type Vec = number[];
type System = (x: number, u: Vec) => Vec;

const axpy = (u: Vec, h: number, k: Vec): Vec => u.map((ui, i) => ui + h * k[i]);

/** Classical RK4 for u' = F(x, u) on n equal steps from a to b (b < a allowed). */
export function rk4(F: System, a: number, b: number, u0: Vec, n: number) {
  const h = (b - a) / n;
  const xs = [a];
  const us = [u0];
  let u = u0;
  for (let i = 0; i < n; i++) {
    const x = a + i * h;
    const k1 = F(x, u);
    const k2 = F(x + h / 2, axpy(u, h / 2, k1));
    const k3 = F(x + h / 2, axpy(u, h / 2, k2));
    const k4 = F(x + h, axpy(u, h, k3));
    u = u.map((ui, j) => ui + (h / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]));
    xs.push(a + (i + 1) * h);
    us.push(u);
  }
  return { xs, us };
}

/** Component `j` of an RK4 trajectory as plot points. */
export const trace = (run: { xs: number[]; us: Vec[] }, j = 0): Point[] =>
  run.xs.map((x, i) => [x, run.us[i][j]]);

/** Samples a closed-form function on [a, b]. */
export function sample(f: (x: number) => number, a: number, b: number, n = 80): Point[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const x = a + ((b - a) * i) / n;
    return [x, f(x)] as Point;
  });
}

/* ------------------------------------------------------------------------ */
/* Reference problems                                                       */
/* ------------------------------------------------------------------------ */

/** y'' = (32 + 2x^3 - y y')/8, y(1) = 17, y(3) = 43/3; exact y = x^2 + 16/x. */
const fNonlinear = (x: number, y: number, yp: number) => (32 + 2 * x ** 3 - y * yp) / 8;
const nonlinearIvp: System = (x, u) => [u[1], fNonlinear(x, u[0], u[1])];
const nonlinearBeta = 43 / 3;

const shootNonlinear = (t: number, n = 20) => rk4(nonlinearIvp, 1, 3, [17, t], n);
const missNonlinear = (t: number) => {
  const run = shootNonlinear(t);
  return run.us[run.us.length - 1][0] - nonlinearBeta;
};

/** Fan of shots y(t, x) for several initial slopes t. */
export const nonlinearFan = [0, -6, -14.000192, -22].map((t) => ({
  t,
  points: trace(shootNonlinear(t, 40))
}));

export const nonlinearExact = sample((x) => x * x + 16 / x, 1, 3);

/** Miss function F(t) = y(t, 3) - 43/3. */
export const nonlinearMiss: Point[] = Array.from({ length: 71 }, (_, i) => {
  const t = -30 + (35 * i) / 70;
  return [t, missNonlinear(t)] as Point;
});

/** Secant iterates (t_k, F(t_k)) starting from t0 = 0, t1 = (beta - alpha)/(b - a). */
export const secantIterates: Point[] = (() => {
  let t0 = 0;
  let t1 = (nonlinearBeta - 17) / 2;
  let f0 = missNonlinear(t0);
  let f1 = missNonlinear(t1);
  const out: Point[] = [
    [t0, f0],
    [t1, f1]
  ];
  for (let k = 0; k < 6 && Math.abs(f1) > 1e-5; k++) {
    const t = t1 - (f1 * (t1 - t0)) / (f1 - f0);
    [t0, f0, t1, f1] = [t1, f1, t, missNonlinear(t)];
    out.push([t1, f1]);
  }
  return out;
})();

/** |F(t_k)| per iteration for secant and Newton on the same problem. */
export const convergenceHistory = (() => {
  const newtonIvp: System = (x, u) => [
    u[1],
    fNonlinear(x, u[0], u[1]),
    u[3],
    (-u[1] / 8) * u[2] + (-u[0] / 8) * u[3]
  ];
  const newton: Point[] = [];
  let t = 0;
  for (let k = 0; k < 6; k++) {
    const run = rk4(newtonIvp, 1, 3, [17, t, 0, 1], 20);
    const end = run.us[run.us.length - 1];
    const miss = end[0] - nonlinearBeta;
    newton.push([k, Math.abs(miss)]);
    if (Math.abs(miss) < 1e-8) break;
    t -= miss / end[2];
  }
  const secant = secantIterates.map(([, f], k) => [k, Math.abs(f)] as Point);
  return { newton, secant };
})();

/**
 * Linear Dirichlet shooting on y'' = -2/x y' + 2/x^2 y + sin(ln x)/x^2,
 * y(1) = 1, y(2) = 2: the two auxiliary IVPs and their combination.
 */
export const linearShooting = (() => {
  const p = (x: number) => -2 / x;
  const q = (x: number) => 2 / (x * x);
  const r = (x: number) => Math.sin(Math.log(x)) / (x * x);
  const ivp1: System = (x, u) => [u[1], p(x) * u[1] + q(x) * u[0] + r(x)];
  const ivp2: System = (x, v) => [v[1], p(x) * v[1] + q(x) * v[0]];
  const n = 40;
  const u = rk4(ivp1, 1, 2, [1, 0], n);
  const v = rk4(ivp2, 1, 2, [0, 1], n);
  const c = (2 - u.us[n][0]) / v.us[n][0];
  const y1 = trace(u);
  const y2 = trace(v);
  const y = y1.map(([x, value], i) => [x, value + c * y2[i][1]] as Point);
  const cy2 = y2.map(([x, value]) => [x, c * value] as Point);
  return { y1, y2, cy2, y, c };
})();

/** Max nodal error of the linear example versus N (log-log order plot). */
export const linearOrder: Point[] = (() => {
  const c2 = (8 - 12 * Math.sin(Math.log(2)) - 4 * Math.cos(Math.log(2))) / 70;
  const c1 = 11 / 10 - c2;
  const exact = (x: number) =>
    c1 * x + c2 / (x * x) - 0.3 * Math.sin(Math.log(x)) - 0.1 * Math.cos(Math.log(x));
  const ivp1: System = (x, u) => [
    u[1],
    (-2 / x) * u[1] + (2 / (x * x)) * u[0] + Math.sin(Math.log(x)) / (x * x)
  ];
  const ivp2: System = (x, v) => [v[1], (-2 / x) * v[1] + (2 / (x * x)) * v[0]];
  return [5, 10, 20, 40, 80].map((n) => {
    const u = rk4(ivp1, 1, 2, [1, 0], n);
    const v = rk4(ivp2, 1, 2, [0, 1], n);
    const c = (2 - u.us[n][0]) / v.us[n][0];
    const err = Math.max(...u.xs.map((x, i) => Math.abs(u.us[i][0] + c * v.us[i][0] - exact(x))));
    return [1 / n, err] as Point;
  });
})();

/**
 * Sensitive Robin problem y'' = x y y' - x cos(x) y - sin x,
 * y(0) + y'(0) = 1, y(pi) - 2y'(pi) = 2, parametrized by t = y'(0).
 */
export const sensitiveFan = [0.5, 1, 1.05, 1.1].map((t) => {
  const ivp: System = (x, u) => [u[1], x * u[0] * u[1] - x * Math.cos(x) * u[0] - Math.sin(x)];
  const run = rk4(ivp, 0, Math.PI, [1 - t, t], 160);
  return { t, points: trace(run) };
});

/** Simply supported beam EI w'''' = p(x) - k w, deflection in millimetres. */
export const beamDeflection: Point[] = (() => {
  const L = 10;
  const EI = 30e6 * 2;
  const k = 1000;
  const load = (x: number) => 100 * (1 - x / 36);
  const forced: System = (x, w) => [w[1], w[2], w[3], (load(x) - k * w[0]) / EI];
  const free: System = (_x, w) => [w[1], w[2], w[3], (-k * w[0]) / EI];
  const n = 40;
  const wp = rk4(forced, 0, L, [0, 0, 0, 0], n);
  const a = rk4(free, 0, L, [0, 1, 0, 0], n);
  const b = rk4(free, 0, L, [0, 0, 0, 1], n);
  // Solve the 2x2 system imposing w(L) = 0 and w''(L) = 0 (Cramer is fine for 2x2).
  const [m11, m12, m21, m22] = [a.us[n][0], b.us[n][0], a.us[n][2], b.us[n][2]];
  const [r1, r2] = [-wp.us[n][0], -wp.us[n][2]];
  const det = m11 * m22 - m12 * m21;
  const s1 = (r1 * m22 - m12 * r2) / det;
  const s2 = (m11 * r2 - m21 * r1) / det;
  return wp.xs.map(
    (x, i) => [x, 1000 * (wp.us[i][0] + s1 * a.us[i][0] + s2 * b.us[i][0])] as Point
  );
})();

/** Third-order problem with exact solution x e^x: RK4 nodes (h = 0.05). */
export const thirdOrderNodes: Point[] = (() => {
  const rhs = (x: number) => Math.exp(x) + x + Math.exp(2 * x) * (x + x * x) + 2;
  const ivp: System = (x, u) => [
    u[1],
    u[2],
    (3 + x) * (rhs(x) - u[1] * u[0] - Math.exp(-x) * u[2])
  ];
  const t = 0.999989004779;
  return trace(rk4(ivp, 0, 1, [0, t, 3 - t], 20)).filter((_, i) => i % 2 === 0);
})();

export const thirdOrderExact = sample((x) => x * Math.exp(x), 0, 1);

/** y'' + y = 0 on [0, pi]: the family y = C sin x all meet y(0) = y(pi) = 0. */
export const nonUniqueFamily = [-1, -0.5, 0.5, 1].map((c) => ({
  c,
  points: sample((x) => c * Math.sin(x), 0, Math.PI, 60)
}));
