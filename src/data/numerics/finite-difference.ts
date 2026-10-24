/** Deterministic figures and tables, recomputed at build time. */
export function crout(a: number[], b: number[], c: number[], d: number[]) {
  const m = a.length;
  const l = new Array<number>(m);
  const u = new Array<number>(m - 1);
  const z = new Array<number>(m);
  for (let i = 0; i < m; i++) {
    l[i] = a[i] - (i ? c[i - 1] * u[i - 1] : 0);
    if (Math.abs(l[i]) < 1e-14) throw new Error('Unsafe Crout pivot');
    if (i < m - 1) u[i] = b[i] / l[i];
    z[i] = (d[i] - (i ? c[i - 1] * z[i - 1] : 0)) / l[i];
  }
  const y = z.slice();
  for (let i = m - 2; i >= 0; i--) y[i] -= u[i] * y[i + 1];
  return y;
}

function cubicSystem(y: number[]) {
  const n = y.length - 1, h = 1 / n;
  const F = new Array<number>(n + 1), a = new Array<number>(n + 1);
  const b = new Array<number>(n), c = new Array<number>(n);
  for (let i = 1; i < n; i++) {
    const x = i * h, delta = y[i + 1] - y[i - 1];
    F[i] = 2*y[i]-y[i-1]-y[i+1]+h*x/2*y[i]*delta-3*h*h*y[i]**2+6*h*h*x;
    a[i] = 2+h*x/2*delta-6*h*h*y[i];
    b[i] = -1+h*x/2*y[i];
    c[i-1] = -1-h*x/2*y[i];
  }
  F[0] = (2+3*h)*y[0]-2*y[1]-3*h*h*y[0]**2;
  a[0] = 2+3*h-6*h*h*y[0]; b[0] = -2;
  F[n] = -2*y[n-1]+(2-12*h)*y[n]+3*h*h*y[n]**2-3*h*h*y[n]+6*h+6*h*h;
  a[n] = 2-12*h+6*h*h*y[n]-3*h*h; c[n-1] = -2;
  return { F, a, b, c };
}

export function solveCubic(n = 80) {
  const h = 1 / n;
  const x = Array.from({ length: n + 1 }, (_, i) => i*h);
  let y = x.map(x => .75*x*x);
  for (let k = 1; k <= 50; k++) {
    const { F, a, b, c } = cubicSystem(y);
    const step = crout(a, b, c, F.map(v => -v));
    y = y.map((v, i) => v + step[i]);
    const residual = Math.max(...cubicSystem(y).F.map(Math.abs)) / h**2;
    if (Math.max(...step.map(Math.abs)) <= 1e-10*(1+Math.max(...y.map(Math.abs))) && residual <= 1e-9) {
      return { x, y, iterations: k, residual,
        error: Math.max(...y.map((v, i) => Math.abs(v-x[i]**3))) };
    }
  }
  throw new Error('Cubic Newton iteration did not converge');
}

export const cubic = solveCubic();
export const cubicPoints: [number, number][] = cubic.x.map((x, i) => [x, cubic.y[i]]);
export const exactPoints: [number, number][] = cubic.x.map(x => [x, x**3]);
export const errorPoints: [number, number][] = cubic.x.map((x, i) => [x, Math.abs(cubic.y[i]-x**3)]);
export const lastNodes = cubic.x.slice(-10).map((x, j) => {
  const i = cubic.x.length - 10 + j;
  return [String(i), x.toFixed(4), cubic.y[i].toFixed(10), Math.abs(cubic.y[i]-x**3).toExponential(3)];
});
export const refinementRows = [20, 40, 80, 160].map(n => {
  const sol = solveCubic(n);
  return [String(n), String(n+1), sol.error.toExponential(6), String(sol.iterations)];
});
