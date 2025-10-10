// simplex-noise.ts
/* eslint-disable no-bitwise */
/*!
 * simplex-noise.js: copyright 2012 Jonas Wagner, MIT.
 * Port TypeScript ES2016+ par ChatGPT.
 */
import { Vector3 } from "three";

export type RNG = () => number;

/** --- Simplex Noise ------------------------------------------------------ */

const F2_S = 0.5 * (Math.sqrt(3) - 1);
const G2_S = (3 - Math.sqrt(3)) / 6;
const F3_S = 1 / 3;
const G3_S = 1 / 6;
const F4_S = (Math.sqrt(5) - 1) / 4;
const G4_S = (5 - Math.sqrt(5)) / 20;

export class SimplexNoise {
  private p: Uint8Array;
  private perm: Uint8Array;
  private permMod12: Uint8Array;

  // gradients stockés comme triplets/quadruplets consécutifs
  private readonly grad3 = new Float32Array([
    1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 1, 0, -1, -1,
    0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
  ]);
  private readonly grad4 = new Float32Array([
    0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1,
    -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, -1, 1, 1, 0, -1, -1, 1,
    0, 1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0,
    1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1,
    -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,
    -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0,
  ]);

  constructor(random: RNG = Math.random) {
    this.p = new Uint8Array(256);
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);

    // table de permutation de base
    for (let i = 0; i < 256; i++) {
      this.p[i] = (random() * 256) | 0;
    }
    for (let i = 0; i < 512; i++) {
      const v = this.p[i & 255];
      this.perm[i] = v;
      this.permMod12[i] = v % 12;
    }
  }

  noise2D(xin: number, yin: number): number {
    let n0 = 0,
      n1 = 0,
      n2 = 0;

    const s = (xin + yin) * F2_S;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2_S;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;

    let i1: number, j1: number;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }

    const x1 = x0 - i1 + G2_S;
    const y1 = y0 - j1 + G2_S;
    const x2 = x0 - 1 + 2 * G2_S;
    const y2 = y0 - 1 + 2 * G2_S;

    const ii = i & 255;
    const jj = j & 255;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
      const gi0 = 3 * this.permMod12[ii + this.perm[jj]];
      t0 *= t0;
      n0 = t0 * t0 * (this.grad3[gi0] * x0 + this.grad3[gi0 + 1] * y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
      const gi1 = 3 * this.permMod12[ii + i1 + this.perm[jj + j1]];
      t1 *= t1;
      n1 = t1 * t1 * (this.grad3[gi1] * x1 + this.grad3[gi1 + 1] * y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
      const gi2 = 3 * this.permMod12[ii + 1 + this.perm[jj + 1]];
      t2 *= t2;
      n2 = t2 * t2 * (this.grad3[gi2] * x2 + this.grad3[gi2 + 1] * y2);
    }

    return 70 * (n0 + n1 + n2);
  }

  noise3D(xin: number, yin: number, zin: number): number {
    let n0 = 0,
      n1 = 0,
      n2 = 0,
      n3 = 0;

    const s = (xin + yin + zin) * F3_S;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    const t = (i + j + k) * G3_S;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    const z0 = zin - Z0;

    let i1: number, j1: number, k1: number;
    let i2: number, j2: number, k2: number;

    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      } else if (x0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      }
    } else {
      if (y0 < z0) {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else if (x0 < z0) {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      }
    }

    const x1 = x0 - i1 + G3_S;
    const y1 = y0 - j1 + G3_S;
    const z1 = z0 - k1 + G3_S;
    const x2 = x0 - i2 + 2 * G3_S;
    const y2 = y0 - j2 + 2 * G3_S;
    const z2 = z0 - k2 + 2 * G3_S;
    const x3 = x0 - 1 + 3 * G3_S;
    const y3 = y0 - 1 + 3 * G3_S;
    const z3 = z0 - 1 + 3 * G3_S;

    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 >= 0) {
      const gi0 = 3 * this.permMod12[ii + this.perm[jj + this.perm[kk]]];
      t0 *= t0;
      n0 =
        t0 *
        t0 *
        (this.grad3[gi0] * x0 +
          this.grad3[gi0 + 1] * y0 +
          this.grad3[gi0 + 2] * z0);
    }

    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 >= 0) {
      const gi1 =
        3 * this.permMod12[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]];
      t1 *= t1;
      n1 =
        t1 *
        t1 *
        (this.grad3[gi1] * x1 +
          this.grad3[gi1 + 1] * y1 +
          this.grad3[gi1 + 2] * z1);
    }

    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 >= 0) {
      const gi2 =
        3 * this.permMod12[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]];
      t2 *= t2;
      n2 =
        t2 *
        t2 *
        (this.grad3[gi2] * x2 +
          this.grad3[gi2 + 1] * y2 +
          this.grad3[gi2 + 2] * z2);
    }

    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 >= 0) {
      const gi3 =
        3 * this.permMod12[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]];
      t3 *= t3;
      n3 =
        t3 *
        t3 *
        (this.grad3[gi3] * x3 +
          this.grad3[gi3 + 1] * y3 +
          this.grad3[gi3 + 2] * z3);
    }

    return 32 * (n0 + n1 + n2 + n3);
  }

  noise4D(x: number, y: number, z: number, w: number): number {
    let n0 = 0,
      n1 = 0,
      n2 = 0,
      n3 = 0,
      n4 = 0;

    const s = (x + y + z + w) * F4_S;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const k = Math.floor(z + s);
    const l = Math.floor(w + s);
    const t = (i + j + k + l) * G4_S;

    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const W0 = l - t;

    const x0 = x - X0;
    const y0 = y - Y0;
    const z0 = z - Z0;
    const w0 = w - W0;

    // ranking
    let rankx = 0,
      ranky = 0,
      rankz = 0,
      rankw = 0;
    if (x0 > y0) rankx++;
    else ranky++;
    if (x0 > z0) rankx++;
    else rankz++;
    if (x0 > w0) rankx++;
    else rankw++;
    if (y0 > z0) ranky++;
    else rankz++;
    if (y0 > w0) ranky++;
    else rankw++;
    if (z0 > w0) rankz++;
    else rankw++;

    const i1 = rankx >= 3 ? 1 : 0;
    const j1 = ranky >= 3 ? 1 : 0;
    const k1 = rankz >= 3 ? 1 : 0;
    const l1 = rankw >= 3 ? 1 : 0;

    const i2 = rankx >= 2 ? 1 : 0;
    const j2 = ranky >= 2 ? 1 : 0;
    const k2 = rankz >= 2 ? 1 : 0;
    const l2 = rankw >= 2 ? 1 : 0;

    const i3 = rankx >= 1 ? 1 : 0;
    const j3 = ranky >= 1 ? 1 : 0;
    const k3 = rankz >= 1 ? 1 : 0;
    const l3 = rankw >= 1 ? 1 : 0;

    const x1 = x0 - i1 + G4_S;
    const y1 = y0 - j1 + G4_S;
    const z1 = z0 - k1 + G4_S;
    const w1 = w0 - l1 + G4_S;

    const x2 = x0 - i2 + 2 * G4_S;
    const y2 = y0 - j2 + 2 * G4_S;
    const z2 = z0 - k2 + 2 * G4_S;
    const w2 = w0 - l2 + 2 * G4_S;

    const x3 = x0 - i3 + 3 * G4_S;
    const y3 = y0 - j3 + 3 * G4_S;
    const z3 = z0 - k3 + 3 * G4_S;
    const w3 = w0 - l3 + 3 * G4_S;

    const x4 = x0 - 1 + 4 * G4_S;
    const y4 = y0 - 1 + 4 * G4_S;
    const z4 = z0 - 1 + 4 * G4_S;
    const w4 = w0 - 1 + 4 * G4_S;

    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;
    const ll = l & 255;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
    if (t0 >= 0) {
      const gi0 =
        (this.perm[ii + this.perm[jj + this.perm[kk + this.perm[ll]]]] % 32) *
        4;
      t0 *= t0;
      n0 =
        t0 *
        t0 *
        (this.grad4[gi0] * x0 +
          this.grad4[gi0 + 1] * y0 +
          this.grad4[gi0 + 2] * z0 +
          this.grad4[gi0 + 3] * w0);
    }

    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
    if (t1 >= 0) {
      const gi1 =
        (this.perm[
          ii + i1 + this.perm[jj + j1 + this.perm[kk + k1 + this.perm[ll + l1]]]
        ] %
          32) *
        4;
      t1 *= t1;
      n1 =
        t1 *
        t1 *
        (this.grad4[gi1] * x1 +
          this.grad4[gi1 + 1] * y1 +
          this.grad4[gi1 + 2] * z1 +
          this.grad4[gi1 + 3] * w1);
    }

    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
    if (t2 >= 0) {
      const gi2 =
        (this.perm[
          ii + i2 + this.perm[jj + j2 + this.perm[kk + k2 + this.perm[ll + l2]]]
        ] %
          32) *
        4;
      t2 *= t2;
      n2 =
        t2 *
        t2 *
        (this.grad4[gi2] * x2 +
          this.grad4[gi2 + 1] * y2 +
          this.grad4[gi2 + 2] * z2 +
          this.grad4[gi2 + 3] * w2);
    }

    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
    if (t3 >= 0) {
      const gi3 =
        (this.perm[
          ii + i3 + this.perm[jj + j3 + this.perm[kk + k3 + this.perm[ll + l3]]]
        ] %
          32) *
        4;
      t3 *= t3;
      n3 =
        t3 *
        t3 *
        (this.grad4[gi3] * x3 +
          this.grad4[gi3 + 1] * y3 +
          this.grad4[gi3 + 2] * z3 +
          this.grad4[gi3 + 3] * w3);
    }

    let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
    if (t4 >= 0) {
      const gi4 =
        (this.perm[
          ii + 1 + this.perm[jj + 1 + this.perm[kk + 1 + this.perm[ll + 1]]]
        ] %
          32) *
        4;
      t4 *= t4;
      n4 =
        t4 *
        t4 *
        (this.grad4[gi4] * x4 +
          this.grad4[gi4 + 1] * y4 +
          this.grad4[gi4 + 2] * z4 +
          this.grad4[gi4 + 3] * w4);
    }

    return 27 * (n0 + n1 + n2 + n3 + n4);
  }
}

/** --- Perlin/Simplex (style Gustavson/Eastman) -------------------------- */

class Grad {
  constructor(public x: number, public y: number, public z: number) {}
  dot2(x: number, y: number) {
    return this.x * x + this.y * y;
  }
  dot3(x: number, y: number, z: number) {
    return this.x * x + this.y * y + this.z * z;
  }
}

const grad3P = [
  new Grad(1, 1, 0),
  new Grad(-1, 1, 0),
  new Grad(1, -1, 0),
  new Grad(-1, -1, 0),
  new Grad(1, 0, 1),
  new Grad(-1, 0, 1),
  new Grad(1, 0, -1),
  new Grad(-1, 0, -1),
  new Grad(0, 1, 1),
  new Grad(0, -1, 1),
  new Grad(0, 1, -1),
  new Grad(0, -1, -1),
];

const pBase = [
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
  36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
  75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
  149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
  27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
  92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
  209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
  164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
  147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
  28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101,
  155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
  178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
  191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
  181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
  138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
  61, 156, 180,
];

interface NoisePerlin {
  seed(seed: number): void;
  simplex2(x: number, y: number): number;
  simplex3(x: number, y: number, z: number): number;
  perlin2(x: number, y: number): number;
  perlin3(x: number, y: number, z: number): number;
}

const permP: number[] = new Array(512).fill(0);
const gradP: Grad[] = new Array(512).fill(null as unknown as Grad);

// constantes dédiées à cette implémentation (évite conflit noms)
const F2_P = 0.5 * (Math.sqrt(3) - 1);
const G2_P = (3 - Math.sqrt(3)) / 6;
const F3_P = 1 / 3;
const G3_P = 1 / 6;

export const noisePerlin: NoisePerlin = {
  seed(seed: number) {
    let s = seed;
    if (s > 0 && s < 1) s *= 65536;
    s = Math.floor(s);
    if (s < 256) s |= s << 8;

    for (let i = 0; i < 256; i++) {
      const v = i & 1 ? pBase[i] ^ (s & 255) : pBase[i] ^ ((s >> 8) & 255);
      permP[i] = permP[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3P[v % 12];
    }
  },

  simplex2(xin: number, yin: number): number {
    let n0 = 0,
      n1 = 0,
      n2 = 0;
    const s = (xin + yin) * F2_P;
    let i = Math.floor(xin + s);
    let j = Math.floor(yin + s);
    const t = (i + j) * G2_P;
    const x0 = xin - i + t;
    const y0 = yin - j + t;

    let i1: number, j1: number;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }

    const x1 = x0 - i1 + G2_P;
    const y1 = y0 - j1 + G2_P;
    const x2 = x0 - 1 + 2 * G2_P;
    const y2 = y0 - 1 + 2 * G2_P;

    i &= 255;
    j &= 255;

    const gi0 = gradP[i + permP[j]];
    const gi1 = gradP[i + i1 + permP[j + j1]];
    const gi2 = gradP[i + 1 + permP[j + 1]];

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }

    return 70 * (n0 + n1 + n2);
  },

  simplex3(xin: number, yin: number, zin: number): number {
    let n0 = 0,
      n1 = 0,
      n2 = 0,
      n3 = 0;
    const s = (xin + yin + zin) * F3_P;
    let i = Math.floor(xin + s);
    let j = Math.floor(yin + s);
    let k = Math.floor(zin + s);

    const t = (i + j + k) * G3_P;
    const x0 = xin - i + t;
    const y0 = yin - j + t;
    const z0 = zin - k + t;

    let i1: number, j1: number, k1: number;
    let i2: number, j2: number, k2: number;

    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      } else if (x0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      }
    } else {
      if (y0 < z0) {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else if (x0 < z0) {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      }
    }

    const x1 = x0 - i1 + G3_P;
    const y1 = y0 - j1 + G3_P;
    const z1 = z0 - k1 + G3_P;
    const x2 = x0 - i2 + 2 * G3_P;
    const y2 = y0 - j2 + 2 * G3_P;
    const z2 = z0 - k2 + 2 * G3_P;
    const x3 = x0 - 1 + 3 * G3_P;
    const y3 = y0 - 1 + 3 * G3_P;
    const z3 = z0 - 1 + 3 * G3_P;

    i &= 255;
    j &= 255;
    k &= 255;

    const gi0 = gradP[i + permP[j + permP[k]]];
    const gi1 = gradP[i + i1 + permP[j + j1 + permP[k + k1]]];
    const gi2 = gradP[i + i2 + permP[j + j2 + permP[k + k2]]];
    const gi3 = gradP[i + 1 + permP[j + 1 + permP[k + 1]]];

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 >= 0) {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot3(x0, y0, z0);
    }

    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 >= 0) {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }

    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 >= 0) {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }

    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 >= 0) {
      t3 *= t3;
      n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    }

    return 32 * (n0 + n1 + n2 + n3);
  },

  perlin2(x: number, y: number): number {
    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b;

    let X = Math.floor(x);
    let Y = Math.floor(y);
    x -= X;
    y -= Y;
    X &= 255;
    Y &= 255;

    const n00 = gradP[X + permP[Y]].dot2(x, y);
    const n01 = gradP[X + permP[Y + 1]].dot2(x, y - 1);
    const n10 = gradP[X + 1 + permP[Y]].dot2(x - 1, y);
    const n11 = gradP[X + 1 + permP[Y + 1]].dot2(x - 1, y - 1);

    const u = fade(x);
    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
  },

  perlin3(x: number, y: number, z: number): number {
    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b;

    let X = Math.floor(x),
      Y = Math.floor(y),
      Z = Math.floor(z);
    x -= X;
    y -= Y;
    z -= Z;
    X &= 255;
    Y &= 255;
    Z &= 255;

    const n000 = gradP[X + permP[Y + permP[Z]]].dot3(x, y, z);
    const n001 = gradP[X + permP[Y + permP[Z + 1]]].dot3(x, y, z - 1);
    const n010 = gradP[X + permP[Y + 1 + permP[Z]]].dot3(x, y - 1, z);
    const n011 = gradP[X + permP[Y + 1 + permP[Z + 1]]].dot3(x, y - 1, z - 1);
    const n100 = gradP[X + 1 + permP[Y + permP[Z]]].dot3(x - 1, y, z);
    const n101 = gradP[X + 1 + permP[Y + permP[Z + 1]]].dot3(x - 1, y, z - 1);
    const n110 = gradP[X + 1 + permP[Y + 1 + permP[Z]]].dot3(x - 1, y - 1, z);
    const n111 = gradP[X + 1 + permP[Y + 1 + permP[Z + 1]]].dot3(
      x - 1,
      y - 1,
      z - 1
    );

    const u = fade(x),
      v = fade(y),
      w = fade(z);

    return (
      (n000 +
        (n100 - n000) * u +
        (n001 + (n101 - n001) * u - (n000 + (n100 - n000) * u)) * w) *
        (1 - v) +
      (n010 +
        (n110 - n010) * u +
        (n011 + (n111 - n011) * u - (n010 + (n110 - n010) * u)) * w) *
        v
    );
  },
};

// seed par défaut
noisePerlin.seed(0);

/** --- Curl noise utilitaires -------------------------------------------- */

const EPS = 0.1;
const DIVISOR = 1.0 / (2.0 * EPS);

export const snoiseVec3 = (x: number, y: number, z: number): Vector3 => {
  return new Vector3(
    noisePerlin.simplex3(x, y, z),
    noisePerlin.simplex3(y - 19.1, z + 33.4, x + 47.2),
    noisePerlin.simplex3(z + 74.2, x - 124.5, y + 99.4)
  );
};

export const curlNoise3D = (p: Vector3): Vector3 => {
  const p_x0 = snoiseVec3(p.x - EPS, p.y, p.z);
  const p_x1 = snoiseVec3(p.x + EPS, p.y, p.z);
  const p_y0 = snoiseVec3(p.x, p.y - EPS, p.z); // corrigé: -EPS
  const p_y1 = snoiseVec3(p.x, p.y + EPS, p.z);
  const p_z0 = snoiseVec3(p.x, p.y, p.z - EPS);
  const p_z1 = snoiseVec3(p.x, p.y, p.z + EPS);

  return new Vector3(
    (p_y1.z - p_y0.z - p_z1.y + p_z0.y) * DIVISOR,
    (p_z1.x - p_z0.x - p_x1.z + p_x0.z) * DIVISOR,
    (p_x1.y - p_x0.y - p_y1.x + p_y0.x) * DIVISOR
  ).normalize();
};

/** --- Instance utilitaire & API ----------------------------------------- */

let _noise: SimplexNoise | null = null;

export function getNoise(): SimplexNoise {
  if (_noise == null) {
    _noise = new SimplexNoise(Math.random);
  }
  return _noise;
}

export const generate = (random: RNG = Math.random): void => {
  _noise = new SimplexNoise(random);
};

// export par défaut: getter d’instance
export default getNoise;

// Exports nommés supplémentaires : SimplexNoise, curlNoise3D, noisePerlin
