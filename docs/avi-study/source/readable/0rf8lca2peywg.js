(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 90072, 8560, (e) => {
  "use strict";
  let t, i, n, r, a, s = "attached", o = "srgb", l = "srgb-linear", h = "linear", c = "srgb", u = "300 es";
  class d {
    addEventListener(e10, t10) {
      void 0 === this._listeners && (this._listeners = {});
      let i10 = this._listeners;
      void 0 === i10[e10] && (i10[e10] = []), -1 === i10[e10].indexOf(t10) && i10[e10].push(t10);
    }
    hasEventListener(e10, t10) {
      let i10 = this._listeners;
      return void 0 !== i10 && void 0 !== i10[e10] && -1 !== i10[e10].indexOf(t10);
    }
    removeEventListener(e10, t10) {
      let i10 = this._listeners;
      if (void 0 === i10) return;
      let n10 = i10[e10];
      if (void 0 !== n10) {
        let e11 = n10.indexOf(t10);
        -1 !== e11 && n10.splice(e11, 1);
      }
    }
    dispatchEvent(e10) {
      let t10 = this._listeners;
      if (void 0 === t10) return;
      let i10 = t10[e10.type];
      if (void 0 !== i10) {
        e10.target = this;
        let t11 = i10.slice(0);
        for (let i11 = 0, n10 = t11.length; i11 < n10; i11++) t11[i11].call(this, e10);
        e10.target = null;
      }
    }
  }
  let p = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], f = 1234567, m = Math.PI / 180, g = 180 / Math.PI;
  function _() {
    let e10 = 4294967295 * Math.random() | 0, t10 = 4294967295 * Math.random() | 0, i10 = 4294967295 * Math.random() | 0, n10 = 4294967295 * Math.random() | 0;
    return (p[255 & e10] + p[e10 >> 8 & 255] + p[e10 >> 16 & 255] + p[e10 >> 24 & 255] + "-" + p[255 & t10] + p[t10 >> 8 & 255] + "-" + p[t10 >> 16 & 15 | 64] + p[t10 >> 24 & 255] + "-" + p[63 & i10 | 128] + p[i10 >> 8 & 255] + "-" + p[i10 >> 16 & 255] + p[i10 >> 24 & 255] + p[255 & n10] + p[n10 >> 8 & 255] + p[n10 >> 16 & 255] + p[n10 >> 24 & 255]).toLowerCase();
  }
  function v(e10, t10, i10) {
    return Math.max(t10, Math.min(i10, e10));
  }
  function x(e10, t10) {
    return (e10 % t10 + t10) % t10;
  }
  function y(e10, t10, i10) {
    return (1 - i10) * e10 + i10 * t10;
  }
  function M(e10, t10) {
    switch (t10.constructor) {
      case Float32Array:
        return e10;
      case Uint32Array:
        return e10 / 4294967295;
      case Uint16Array:
        return e10 / 65535;
      case Uint8Array:
        return e10 / 255;
      case Int32Array:
        return Math.max(e10 / 2147483647, -1);
      case Int16Array:
        return Math.max(e10 / 32767, -1);
      case Int8Array:
        return Math.max(e10 / 127, -1);
      default:
        throw Error("Invalid component type.");
    }
  }
  function S(e10, t10) {
    switch (t10.constructor) {
      case Float32Array:
        return e10;
      case Uint32Array:
        return Math.round(4294967295 * e10);
      case Uint16Array:
        return Math.round(65535 * e10);
      case Uint8Array:
        return Math.round(255 * e10);
      case Int32Array:
        return Math.round(2147483647 * e10);
      case Int16Array:
        return Math.round(32767 * e10);
      case Int8Array:
        return Math.round(127 * e10);
      default:
        throw Error("Invalid component type.");
    }
  }
  class E {
    constructor(e10 = 0, t10 = 0) {
      E.prototype.isVector2 = true, this.x = e10, this.y = t10;
    }
    get width() {
      return this.x;
    }
    set width(e10) {
      this.x = e10;
    }
    get height() {
      return this.y;
    }
    set height(e10) {
      this.y = e10;
    }
    set(e10, t10) {
      return this.x = e10, this.y = t10, this;
    }
    setScalar(e10) {
      return this.x = e10, this.y = e10, this;
    }
    setX(e10) {
      return this.x = e10, this;
    }
    setY(e10) {
      return this.y = e10, this;
    }
    setComponent(e10, t10) {
      switch (e10) {
        case 0:
          this.x = t10;
          break;
        case 1:
          this.y = t10;
          break;
        default:
          throw Error("index is out of range: " + e10);
      }
      return this;
    }
    getComponent(e10) {
      switch (e10) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        default:
          throw Error("index is out of range: " + e10);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y);
    }
    copy(e10) {
      return this.x = e10.x, this.y = e10.y, this;
    }
    add(e10) {
      return this.x += e10.x, this.y += e10.y, this;
    }
    addScalar(e10) {
      return this.x += e10, this.y += e10, this;
    }
    addVectors(e10, t10) {
      return this.x = e10.x + t10.x, this.y = e10.y + t10.y, this;
    }
    addScaledVector(e10, t10) {
      return this.x += e10.x * t10, this.y += e10.y * t10, this;
    }
    sub(e10) {
      return this.x -= e10.x, this.y -= e10.y, this;
    }
    subScalar(e10) {
      return this.x -= e10, this.y -= e10, this;
    }
    subVectors(e10, t10) {
      return this.x = e10.x - t10.x, this.y = e10.y - t10.y, this;
    }
    multiply(e10) {
      return this.x *= e10.x, this.y *= e10.y, this;
    }
    multiplyScalar(e10) {
      return this.x *= e10, this.y *= e10, this;
    }
    divide(e10) {
      return this.x /= e10.x, this.y /= e10.y, this;
    }
    divideScalar(e10) {
      return this.multiplyScalar(1 / e10);
    }
    applyMatrix3(e10) {
      let t10 = this.x, i10 = this.y, n10 = e10.elements;
      return this.x = n10[0] * t10 + n10[3] * i10 + n10[6], this.y = n10[1] * t10 + n10[4] * i10 + n10[7], this;
    }
    min(e10) {
      return this.x = Math.min(this.x, e10.x), this.y = Math.min(this.y, e10.y), this;
    }
    max(e10) {
      return this.x = Math.max(this.x, e10.x), this.y = Math.max(this.y, e10.y), this;
    }
    clamp(e10, t10) {
      return this.x = v(this.x, e10.x, t10.x), this.y = v(this.y, e10.y, t10.y), this;
    }
    clampScalar(e10, t10) {
      return this.x = v(this.x, e10, t10), this.y = v(this.y, e10, t10), this;
    }
    clampLength(e10, t10) {
      let i10 = this.length();
      return this.divideScalar(i10 || 1).multiplyScalar(v(i10, e10, t10));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this;
    }
    dot(e10) {
      return this.x * e10.x + this.y * e10.y;
    }
    cross(e10) {
      return this.x * e10.y - this.y * e10.x;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI;
    }
    angleTo(e10) {
      let t10 = Math.sqrt(this.lengthSq() * e10.lengthSq());
      return 0 === t10 ? Math.PI / 2 : Math.acos(v(this.dot(e10) / t10, -1, 1));
    }
    distanceTo(e10) {
      return Math.sqrt(this.distanceToSquared(e10));
    }
    distanceToSquared(e10) {
      let t10 = this.x - e10.x, i10 = this.y - e10.y;
      return t10 * t10 + i10 * i10;
    }
    manhattanDistanceTo(e10) {
      return Math.abs(this.x - e10.x) + Math.abs(this.y - e10.y);
    }
    setLength(e10) {
      return this.normalize().multiplyScalar(e10);
    }
    lerp(e10, t10) {
      return this.x += (e10.x - this.x) * t10, this.y += (e10.y - this.y) * t10, this;
    }
    lerpVectors(e10, t10, i10) {
      return this.x = e10.x + (t10.x - e10.x) * i10, this.y = e10.y + (t10.y - e10.y) * i10, this;
    }
    equals(e10) {
      return e10.x === this.x && e10.y === this.y;
    }
    fromArray(e10, t10 = 0) {
      return this.x = e10[t10], this.y = e10[t10 + 1], this;
    }
    toArray(e10 = [], t10 = 0) {
      return e10[t10] = this.x, e10[t10 + 1] = this.y, e10;
    }
    fromBufferAttribute(e10, t10) {
      return this.x = e10.getX(t10), this.y = e10.getY(t10), this;
    }
    rotateAround(e10, t10) {
      let i10 = Math.cos(t10), n10 = Math.sin(t10), r10 = this.x - e10.x, a10 = this.y - e10.y;
      return this.x = r10 * i10 - a10 * n10 + e10.x, this.y = r10 * n10 + a10 * i10 + e10.y, this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y;
    }
  }
  class T {
    constructor(e10 = 0, t10 = 0, i10 = 0, n10 = 1) {
      this.isQuaternion = true, this._x = e10, this._y = t10, this._z = i10, this._w = n10;
    }
    static slerpFlat(e10, t10, i10, n10, r10, a10, s2) {
      let o2 = i10[n10 + 0], l2 = i10[n10 + 1], h2 = i10[n10 + 2], c2 = i10[n10 + 3], u2 = r10[a10 + 0], d2 = r10[a10 + 1], p2 = r10[a10 + 2], f2 = r10[a10 + 3];
      if (0 === s2) {
        e10[t10 + 0] = o2, e10[t10 + 1] = l2, e10[t10 + 2] = h2, e10[t10 + 3] = c2;
        return;
      }
      if (1 === s2) {
        e10[t10 + 0] = u2, e10[t10 + 1] = d2, e10[t10 + 2] = p2, e10[t10 + 3] = f2;
        return;
      }
      if (c2 !== f2 || o2 !== u2 || l2 !== d2 || h2 !== p2) {
        let e11 = 1 - s2, t11 = o2 * u2 + l2 * d2 + h2 * p2 + c2 * f2, i11 = t11 >= 0 ? 1 : -1, n11 = 1 - t11 * t11;
        if (n11 > Number.EPSILON) {
          let r12 = Math.sqrt(n11), a11 = Math.atan2(r12, t11 * i11);
          e11 = Math.sin(e11 * a11) / r12, s2 = Math.sin(s2 * a11) / r12;
        }
        let r11 = s2 * i11;
        if (o2 = o2 * e11 + u2 * r11, l2 = l2 * e11 + d2 * r11, h2 = h2 * e11 + p2 * r11, c2 = c2 * e11 + f2 * r11, e11 === 1 - s2) {
          let e12 = 1 / Math.sqrt(o2 * o2 + l2 * l2 + h2 * h2 + c2 * c2);
          o2 *= e12, l2 *= e12, h2 *= e12, c2 *= e12;
        }
      }
      e10[t10] = o2, e10[t10 + 1] = l2, e10[t10 + 2] = h2, e10[t10 + 3] = c2;
    }
    static multiplyQuaternionsFlat(e10, t10, i10, n10, r10, a10) {
      let s2 = i10[n10], o2 = i10[n10 + 1], l2 = i10[n10 + 2], h2 = i10[n10 + 3], c2 = r10[a10], u2 = r10[a10 + 1], d2 = r10[a10 + 2], p2 = r10[a10 + 3];
      return e10[t10] = s2 * p2 + h2 * c2 + o2 * d2 - l2 * u2, e10[t10 + 1] = o2 * p2 + h2 * u2 + l2 * c2 - s2 * d2, e10[t10 + 2] = l2 * p2 + h2 * d2 + s2 * u2 - o2 * c2, e10[t10 + 3] = h2 * p2 - s2 * c2 - o2 * u2 - l2 * d2, e10;
    }
    get x() {
      return this._x;
    }
    set x(e10) {
      this._x = e10, this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(e10) {
      this._y = e10, this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(e10) {
      this._z = e10, this._onChangeCallback();
    }
    get w() {
      return this._w;
    }
    set w(e10) {
      this._w = e10, this._onChangeCallback();
    }
    set(e10, t10, i10, n10) {
      return this._x = e10, this._y = t10, this._z = i10, this._w = n10, this._onChangeCallback(), this;
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(e10) {
      return this._x = e10.x, this._y = e10.y, this._z = e10.z, this._w = e10.w, this._onChangeCallback(), this;
    }
    setFromEuler(e10, t10 = true) {
      let i10 = e10._x, n10 = e10._y, r10 = e10._z, a10 = e10._order, s2 = Math.cos, o2 = Math.sin, l2 = s2(i10 / 2), h2 = s2(n10 / 2), c2 = s2(r10 / 2), u2 = o2(i10 / 2), d2 = o2(n10 / 2), p2 = o2(r10 / 2);
      switch (a10) {
        case "XYZ":
          this._x = u2 * h2 * c2 + l2 * d2 * p2, this._y = l2 * d2 * c2 - u2 * h2 * p2, this._z = l2 * h2 * p2 + u2 * d2 * c2, this._w = l2 * h2 * c2 - u2 * d2 * p2;
          break;
        case "YXZ":
          this._x = u2 * h2 * c2 + l2 * d2 * p2, this._y = l2 * d2 * c2 - u2 * h2 * p2, this._z = l2 * h2 * p2 - u2 * d2 * c2, this._w = l2 * h2 * c2 + u2 * d2 * p2;
          break;
        case "ZXY":
          this._x = u2 * h2 * c2 - l2 * d2 * p2, this._y = l2 * d2 * c2 + u2 * h2 * p2, this._z = l2 * h2 * p2 + u2 * d2 * c2, this._w = l2 * h2 * c2 - u2 * d2 * p2;
          break;
        case "ZYX":
          this._x = u2 * h2 * c2 - l2 * d2 * p2, this._y = l2 * d2 * c2 + u2 * h2 * p2, this._z = l2 * h2 * p2 - u2 * d2 * c2, this._w = l2 * h2 * c2 + u2 * d2 * p2;
          break;
        case "YZX":
          this._x = u2 * h2 * c2 + l2 * d2 * p2, this._y = l2 * d2 * c2 + u2 * h2 * p2, this._z = l2 * h2 * p2 - u2 * d2 * c2, this._w = l2 * h2 * c2 - u2 * d2 * p2;
          break;
        case "XZY":
          this._x = u2 * h2 * c2 - l2 * d2 * p2, this._y = l2 * d2 * c2 - u2 * h2 * p2, this._z = l2 * h2 * p2 + u2 * d2 * c2, this._w = l2 * h2 * c2 + u2 * d2 * p2;
          break;
        default:
          console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a10);
      }
      return true === t10 && this._onChangeCallback(), this;
    }
    setFromAxisAngle(e10, t10) {
      let i10 = t10 / 2, n10 = Math.sin(i10);
      return this._x = e10.x * n10, this._y = e10.y * n10, this._z = e10.z * n10, this._w = Math.cos(i10), this._onChangeCallback(), this;
    }
    setFromRotationMatrix(e10) {
      let t10 = e10.elements, i10 = t10[0], n10 = t10[4], r10 = t10[8], a10 = t10[1], s2 = t10[5], o2 = t10[9], l2 = t10[2], h2 = t10[6], c2 = t10[10], u2 = i10 + s2 + c2;
      if (u2 > 0) {
        let e11 = 0.5 / Math.sqrt(u2 + 1);
        this._w = 0.25 / e11, this._x = (h2 - o2) * e11, this._y = (r10 - l2) * e11, this._z = (a10 - n10) * e11;
      } else if (i10 > s2 && i10 > c2) {
        let e11 = 2 * Math.sqrt(1 + i10 - s2 - c2);
        this._w = (h2 - o2) / e11, this._x = 0.25 * e11, this._y = (n10 + a10) / e11, this._z = (r10 + l2) / e11;
      } else if (s2 > c2) {
        let e11 = 2 * Math.sqrt(1 + s2 - i10 - c2);
        this._w = (r10 - l2) / e11, this._x = (n10 + a10) / e11, this._y = 0.25 * e11, this._z = (o2 + h2) / e11;
      } else {
        let e11 = 2 * Math.sqrt(1 + c2 - i10 - s2);
        this._w = (a10 - n10) / e11, this._x = (r10 + l2) / e11, this._y = (o2 + h2) / e11, this._z = 0.25 * e11;
      }
      return this._onChangeCallback(), this;
    }
    setFromUnitVectors(e10, t10) {
      let i10 = e10.dot(t10) + 1;
      return i10 < 1e-8 ? (i10 = 0, Math.abs(e10.x) > Math.abs(e10.z) ? (this._x = -e10.y, this._y = e10.x, this._z = 0) : (this._x = 0, this._y = -e10.z, this._z = e10.y)) : (this._x = e10.y * t10.z - e10.z * t10.y, this._y = e10.z * t10.x - e10.x * t10.z, this._z = e10.x * t10.y - e10.y * t10.x), this._w = i10, this.normalize();
    }
    angleTo(e10) {
      return 2 * Math.acos(Math.abs(v(this.dot(e10), -1, 1)));
    }
    rotateTowards(e10, t10) {
      let i10 = this.angleTo(e10);
      if (0 === i10) return this;
      let n10 = Math.min(1, t10 / i10);
      return this.slerp(e10, n10), this;
    }
    identity() {
      return this.set(0, 0, 0, 1);
    }
    invert() {
      return this.conjugate();
    }
    conjugate() {
      return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
    }
    dot(e10) {
      return this._x * e10._x + this._y * e10._y + this._z * e10._z + this._w * e10._w;
    }
    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    normalize() {
      let e10 = this.length();
      return 0 === e10 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e10 = 1 / e10, this._x = this._x * e10, this._y = this._y * e10, this._z = this._z * e10, this._w = this._w * e10), this._onChangeCallback(), this;
    }
    multiply(e10) {
      return this.multiplyQuaternions(this, e10);
    }
    premultiply(e10) {
      return this.multiplyQuaternions(e10, this);
    }
    multiplyQuaternions(e10, t10) {
      let i10 = e10._x, n10 = e10._y, r10 = e10._z, a10 = e10._w, s2 = t10._x, o2 = t10._y, l2 = t10._z, h2 = t10._w;
      return this._x = i10 * h2 + a10 * s2 + n10 * l2 - r10 * o2, this._y = n10 * h2 + a10 * o2 + r10 * s2 - i10 * l2, this._z = r10 * h2 + a10 * l2 + i10 * o2 - n10 * s2, this._w = a10 * h2 - i10 * s2 - n10 * o2 - r10 * l2, this._onChangeCallback(), this;
    }
    slerp(e10, t10) {
      if (0 === t10) return this;
      if (1 === t10) return this.copy(e10);
      let i10 = this._x, n10 = this._y, r10 = this._z, a10 = this._w, s2 = a10 * e10._w + i10 * e10._x + n10 * e10._y + r10 * e10._z;
      if (s2 < 0 ? (this._w = -e10._w, this._x = -e10._x, this._y = -e10._y, this._z = -e10._z, s2 = -s2) : this.copy(e10), s2 >= 1) return this._w = a10, this._x = i10, this._y = n10, this._z = r10, this;
      let o2 = 1 - s2 * s2;
      if (o2 <= Number.EPSILON) {
        let e11 = 1 - t10;
        return this._w = e11 * a10 + t10 * this._w, this._x = e11 * i10 + t10 * this._x, this._y = e11 * n10 + t10 * this._y, this._z = e11 * r10 + t10 * this._z, this.normalize(), this;
      }
      let l2 = Math.sqrt(o2), h2 = Math.atan2(l2, s2), c2 = Math.sin((1 - t10) * h2) / l2, u2 = Math.sin(t10 * h2) / l2;
      return this._w = a10 * c2 + this._w * u2, this._x = i10 * c2 + this._x * u2, this._y = n10 * c2 + this._y * u2, this._z = r10 * c2 + this._z * u2, this._onChangeCallback(), this;
    }
    slerpQuaternions(e10, t10, i10) {
      return this.copy(e10).slerp(t10, i10);
    }
    random() {
      let e10 = 2 * Math.PI * Math.random(), t10 = 2 * Math.PI * Math.random(), i10 = Math.random(), n10 = Math.sqrt(1 - i10), r10 = Math.sqrt(i10);
      return this.set(n10 * Math.sin(e10), n10 * Math.cos(e10), r10 * Math.sin(t10), r10 * Math.cos(t10));
    }
    equals(e10) {
      return e10._x === this._x && e10._y === this._y && e10._z === this._z && e10._w === this._w;
    }
    fromArray(e10, t10 = 0) {
      return this._x = e10[t10], this._y = e10[t10 + 1], this._z = e10[t10 + 2], this._w = e10[t10 + 3], this._onChangeCallback(), this;
    }
    toArray(e10 = [], t10 = 0) {
      return e10[t10] = this._x, e10[t10 + 1] = this._y, e10[t10 + 2] = this._z, e10[t10 + 3] = this._w, e10;
    }
    fromBufferAttribute(e10, t10) {
      return this._x = e10.getX(t10), this._y = e10.getY(t10), this._z = e10.getZ(t10), this._w = e10.getW(t10), this._onChangeCallback(), this;
    }
    toJSON() {
      return this.toArray();
    }
    _onChange(e10) {
      return this._onChangeCallback = e10, this;
    }
    _onChangeCallback() {
    }
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._w;
    }
  }
  class b {
    constructor(e10 = 0, t10 = 0, i10 = 0) {
      b.prototype.isVector3 = true, this.x = e10, this.y = t10, this.z = i10;
    }
    set(e10, t10, i10) {
      return void 0 === i10 && (i10 = this.z), this.x = e10, this.y = t10, this.z = i10, this;
    }
    setScalar(e10) {
      return this.x = e10, this.y = e10, this.z = e10, this;
    }
    setX(e10) {
      return this.x = e10, this;
    }
    setY(e10) {
      return this.y = e10, this;
    }
    setZ(e10) {
      return this.z = e10, this;
    }
    setComponent(e10, t10) {
      switch (e10) {
        case 0:
          this.x = t10;
          break;
        case 1:
          this.y = t10;
          break;
        case 2:
          this.z = t10;
          break;
        default:
          throw Error("index is out of range: " + e10);
      }
      return this;
    }
    getComponent(e10) {
      switch (e10) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw Error("index is out of range: " + e10);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    copy(e10) {
      return this.x = e10.x, this.y = e10.y, this.z = e10.z, this;
    }
    add(e10) {
      return this.x += e10.x, this.y += e10.y, this.z += e10.z, this;
    }
    addScalar(e10) {
      return this.x += e10, this.y += e10, this.z += e10, this;
    }
    addVectors(e10, t10) {
      return this.x = e10.x + t10.x, this.y = e10.y + t10.y, this.z = e10.z + t10.z, this;
    }
    addScaledVector(e10, t10) {
      return this.x += e10.x * t10, this.y += e10.y * t10, this.z += e10.z * t10, this;
    }
    sub(e10) {
      return this.x -= e10.x, this.y -= e10.y, this.z -= e10.z, this;
    }
    subScalar(e10) {
      return this.x -= e10, this.y -= e10, this.z -= e10, this;
    }
    subVectors(e10, t10) {
      return this.x = e10.x - t10.x, this.y = e10.y - t10.y, this.z = e10.z - t10.z, this;
    }
    multiply(e10) {
      return this.x *= e10.x, this.y *= e10.y, this.z *= e10.z, this;
    }
    multiplyScalar(e10) {
      return this.x *= e10, this.y *= e10, this.z *= e10, this;
    }
    multiplyVectors(e10, t10) {
      return this.x = e10.x * t10.x, this.y = e10.y * t10.y, this.z = e10.z * t10.z, this;
    }
    applyEuler(e10) {
      return this.applyQuaternion(w.setFromEuler(e10));
    }
    applyAxisAngle(e10, t10) {
      return this.applyQuaternion(w.setFromAxisAngle(e10, t10));
    }
    applyMatrix3(e10) {
      let t10 = this.x, i10 = this.y, n10 = this.z, r10 = e10.elements;
      return this.x = r10[0] * t10 + r10[3] * i10 + r10[6] * n10, this.y = r10[1] * t10 + r10[4] * i10 + r10[7] * n10, this.z = r10[2] * t10 + r10[5] * i10 + r10[8] * n10, this;
    }
    applyNormalMatrix(e10) {
      return this.applyMatrix3(e10).normalize();
    }
    applyMatrix4(e10) {
      let t10 = this.x, i10 = this.y, n10 = this.z, r10 = e10.elements, a10 = 1 / (r10[3] * t10 + r10[7] * i10 + r10[11] * n10 + r10[15]);
      return this.x = (r10[0] * t10 + r10[4] * i10 + r10[8] * n10 + r10[12]) * a10, this.y = (r10[1] * t10 + r10[5] * i10 + r10[9] * n10 + r10[13]) * a10, this.z = (r10[2] * t10 + r10[6] * i10 + r10[10] * n10 + r10[14]) * a10, this;
    }
    applyQuaternion(e10) {
      let t10 = this.x, i10 = this.y, n10 = this.z, r10 = e10.x, a10 = e10.y, s2 = e10.z, o2 = e10.w, l2 = 2 * (a10 * n10 - s2 * i10), h2 = 2 * (s2 * t10 - r10 * n10), c2 = 2 * (r10 * i10 - a10 * t10);
      return this.x = t10 + o2 * l2 + a10 * c2 - s2 * h2, this.y = i10 + o2 * h2 + s2 * l2 - r10 * c2, this.z = n10 + o2 * c2 + r10 * h2 - a10 * l2, this;
    }
    project(e10) {
      return this.applyMatrix4(e10.matrixWorldInverse).applyMatrix4(e10.projectionMatrix);
    }
    unproject(e10) {
      return this.applyMatrix4(e10.projectionMatrixInverse).applyMatrix4(e10.matrixWorld);
    }
    transformDirection(e10) {
      let t10 = this.x, i10 = this.y, n10 = this.z, r10 = e10.elements;
      return this.x = r10[0] * t10 + r10[4] * i10 + r10[8] * n10, this.y = r10[1] * t10 + r10[5] * i10 + r10[9] * n10, this.z = r10[2] * t10 + r10[6] * i10 + r10[10] * n10, this.normalize();
    }
    divide(e10) {
      return this.x /= e10.x, this.y /= e10.y, this.z /= e10.z, this;
    }
    divideScalar(e10) {
      return this.multiplyScalar(1 / e10);
    }
    min(e10) {
      return this.x = Math.min(this.x, e10.x), this.y = Math.min(this.y, e10.y), this.z = Math.min(this.z, e10.z), this;
    }
    max(e10) {
      return this.x = Math.max(this.x, e10.x), this.y = Math.max(this.y, e10.y), this.z = Math.max(this.z, e10.z), this;
    }
    clamp(e10, t10) {
      return this.x = v(this.x, e10.x, t10.x), this.y = v(this.y, e10.y, t10.y), this.z = v(this.z, e10.z, t10.z), this;
    }
    clampScalar(e10, t10) {
      return this.x = v(this.x, e10, t10), this.y = v(this.y, e10, t10), this.z = v(this.z, e10, t10), this;
    }
    clampLength(e10, t10) {
      let i10 = this.length();
      return this.divideScalar(i10 || 1).multiplyScalar(v(i10, e10, t10));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
    }
    dot(e10) {
      return this.x * e10.x + this.y * e10.y + this.z * e10.z;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(e10) {
      return this.normalize().multiplyScalar(e10);
    }
    lerp(e10, t10) {
      return this.x += (e10.x - this.x) * t10, this.y += (e10.y - this.y) * t10, this.z += (e10.z - this.z) * t10, this;
    }
    lerpVectors(e10, t10, i10) {
      return this.x = e10.x + (t10.x - e10.x) * i10, this.y = e10.y + (t10.y - e10.y) * i10, this.z = e10.z + (t10.z - e10.z) * i10, this;
    }
    cross(e10) {
      return this.crossVectors(this, e10);
    }
    crossVectors(e10, t10) {
      let i10 = e10.x, n10 = e10.y, r10 = e10.z, a10 = t10.x, s2 = t10.y, o2 = t10.z;
      return this.x = n10 * o2 - r10 * s2, this.y = r10 * a10 - i10 * o2, this.z = i10 * s2 - n10 * a10, this;
    }
    projectOnVector(e10) {
      let t10 = e10.lengthSq();
      if (0 === t10) return this.set(0, 0, 0);
      let i10 = e10.dot(this) / t10;
      return this.copy(e10).multiplyScalar(i10);
    }
    projectOnPlane(e10) {
      return A.copy(this).projectOnVector(e10), this.sub(A);
    }
    reflect(e10) {
      return this.sub(A.copy(e10).multiplyScalar(2 * this.dot(e10)));
    }
    angleTo(e10) {
      let t10 = Math.sqrt(this.lengthSq() * e10.lengthSq());
      return 0 === t10 ? Math.PI / 2 : Math.acos(v(this.dot(e10) / t10, -1, 1));
    }
    distanceTo(e10) {
      return Math.sqrt(this.distanceToSquared(e10));
    }
    distanceToSquared(e10) {
      let t10 = this.x - e10.x, i10 = this.y - e10.y, n10 = this.z - e10.z;
      return t10 * t10 + i10 * i10 + n10 * n10;
    }
    manhattanDistanceTo(e10) {
      return Math.abs(this.x - e10.x) + Math.abs(this.y - e10.y) + Math.abs(this.z - e10.z);
    }
    setFromSpherical(e10) {
      return this.setFromSphericalCoords(e10.radius, e10.phi, e10.theta);
    }
    setFromSphericalCoords(e10, t10, i10) {
      let n10 = Math.sin(t10) * e10;
      return this.x = n10 * Math.sin(i10), this.y = Math.cos(t10) * e10, this.z = n10 * Math.cos(i10), this;
    }
    setFromCylindrical(e10) {
      return this.setFromCylindricalCoords(e10.radius, e10.theta, e10.y);
    }
    setFromCylindricalCoords(e10, t10, i10) {
      return this.x = e10 * Math.sin(t10), this.y = i10, this.z = e10 * Math.cos(t10), this;
    }
    setFromMatrixPosition(e10) {
      let t10 = e10.elements;
      return this.x = t10[12], this.y = t10[13], this.z = t10[14], this;
    }
    setFromMatrixScale(e10) {
      let t10 = this.setFromMatrixColumn(e10, 0).length(), i10 = this.setFromMatrixColumn(e10, 1).length(), n10 = this.setFromMatrixColumn(e10, 2).length();
      return this.x = t10, this.y = i10, this.z = n10, this;
    }
    setFromMatrixColumn(e10, t10) {
      return this.fromArray(e10.elements, 4 * t10);
    }
    setFromMatrix3Column(e10, t10) {
      return this.fromArray(e10.elements, 3 * t10);
    }
    setFromEuler(e10) {
      return this.x = e10._x, this.y = e10._y, this.z = e10._z, this;
    }
    setFromColor(e10) {
      return this.x = e10.r, this.y = e10.g, this.z = e10.b, this;
    }
    equals(e10) {
      return e10.x === this.x && e10.y === this.y && e10.z === this.z;
    }
    fromArray(e10, t10 = 0) {
      return this.x = e10[t10], this.y = e10[t10 + 1], this.z = e10[t10 + 2], this;
    }
    toArray(e10 = [], t10 = 0) {
      return e10[t10] = this.x, e10[t10 + 1] = this.y, e10[t10 + 2] = this.z, e10;
    }
    fromBufferAttribute(e10, t10) {
      return this.x = e10.getX(t10), this.y = e10.getY(t10), this.z = e10.getZ(t10), this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
    }
    randomDirection() {
      let e10 = Math.random() * Math.PI * 2, t10 = 2 * Math.random() - 1, i10 = Math.sqrt(1 - t10 * t10);
      return this.x = i10 * Math.cos(e10), this.y = t10, this.z = i10 * Math.sin(e10), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z;
    }
  }
  let A = new b(), w = new T();
  class R {
    constructor(e10, t10, i10, n10, r10, a10, s2, o2, l2) {
      R.prototype.isMatrix3 = true, this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], void 0 !== e10 && this.set(e10, t10, i10, n10, r10, a10, s2, o2, l2);
    }
    set(e10, t10, i10, n10, r10, a10, s2, o2, l2) {
      let h2 = this.elements;
      return h2[0] = e10, h2[1] = n10, h2[2] = s2, h2[3] = t10, h2[4] = r10, h2[5] = o2, h2[6] = i10, h2[7] = a10, h2[8] = l2, this;
    }
    identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
    }
    copy(e10) {
      let t10 = this.elements, i10 = e10.elements;
      return t10[0] = i10[0], t10[1] = i10[1], t10[2] = i10[2], t10[3] = i10[3], t10[4] = i10[4], t10[5] = i10[5], t10[6] = i10[6], t10[7] = i10[7], t10[8] = i10[8], this;
    }
    extractBasis(e10, t10, i10) {
      return e10.setFromMatrix3Column(this, 0), t10.setFromMatrix3Column(this, 1), i10.setFromMatrix3Column(this, 2), this;
    }
    setFromMatrix4(e10) {
      let t10 = e10.elements;
      return this.set(t10[0], t10[4], t10[8], t10[1], t10[5], t10[9], t10[2], t10[6], t10[10]), this;
    }
    multiply(e10) {
      return this.multiplyMatrices(this, e10);
    }
    premultiply(e10) {
      return this.multiplyMatrices(e10, this);
    }
    multiplyMatrices(e10, t10) {
      let i10 = e10.elements, n10 = t10.elements, r10 = this.elements, a10 = i10[0], s2 = i10[3], o2 = i10[6], l2 = i10[1], h2 = i10[4], c2 = i10[7], u2 = i10[2], d2 = i10[5], p2 = i10[8], f2 = n10[0], m2 = n10[3], g2 = n10[6], _2 = n10[1], v2 = n10[4], x2 = n10[7], y2 = n10[2], M2 = n10[5], S2 = n10[8];
      return r10[0] = a10 * f2 + s2 * _2 + o2 * y2, r10[3] = a10 * m2 + s2 * v2 + o2 * M2, r10[6] = a10 * g2 + s2 * x2 + o2 * S2, r10[1] = l2 * f2 + h2 * _2 + c2 * y2, r10[4] = l2 * m2 + h2 * v2 + c2 * M2, r10[7] = l2 * g2 + h2 * x2 + c2 * S2, r10[2] = u2 * f2 + d2 * _2 + p2 * y2, r10[5] = u2 * m2 + d2 * v2 + p2 * M2, r10[8] = u2 * g2 + d2 * x2 + p2 * S2, this;
    }
    multiplyScalar(e10) {
      let t10 = this.elements;
      return t10[0] *= e10, t10[3] *= e10, t10[6] *= e10, t10[1] *= e10, t10[4] *= e10, t10[7] *= e10, t10[2] *= e10, t10[5] *= e10, t10[8] *= e10, this;
    }
    determinant() {
      let e10 = this.elements, t10 = e10[0], i10 = e10[1], n10 = e10[2], r10 = e10[3], a10 = e10[4], s2 = e10[5], o2 = e10[6], l2 = e10[7], h2 = e10[8];
      return t10 * a10 * h2 - t10 * s2 * l2 - i10 * r10 * h2 + i10 * s2 * o2 + n10 * r10 * l2 - n10 * a10 * o2;
    }
    invert() {
      let e10 = this.elements, t10 = e10[0], i10 = e10[1], n10 = e10[2], r10 = e10[3], a10 = e10[4], s2 = e10[5], o2 = e10[6], l2 = e10[7], h2 = e10[8], c2 = h2 * a10 - s2 * l2, u2 = s2 * o2 - h2 * r10, d2 = l2 * r10 - a10 * o2, p2 = t10 * c2 + i10 * u2 + n10 * d2;
      if (0 === p2) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      let f2 = 1 / p2;
      return e10[0] = c2 * f2, e10[1] = (n10 * l2 - h2 * i10) * f2, e10[2] = (s2 * i10 - n10 * a10) * f2, e10[3] = u2 * f2, e10[4] = (h2 * t10 - n10 * o2) * f2, e10[5] = (n10 * r10 - s2 * t10) * f2, e10[6] = d2 * f2, e10[7] = (i10 * o2 - l2 * t10) * f2, e10[8] = (a10 * t10 - i10 * r10) * f2, this;
    }
    transpose() {
      let e10, t10 = this.elements;
      return e10 = t10[1], t10[1] = t10[3], t10[3] = e10, e10 = t10[2], t10[2] = t10[6], t10[6] = e10, e10 = t10[5], t10[5] = t10[7], t10[7] = e10, this;
    }
    getNormalMatrix(e10) {
      return this.setFromMatrix4(e10).invert().transpose();
    }
    transposeIntoArray(e10) {
      let t10 = this.elements;
      return e10[0] = t10[0], e10[1] = t10[3], e10[2] = t10[6], e10[3] = t10[1], e10[4] = t10[4], e10[5] = t10[7], e10[6] = t10[2], e10[7] = t10[5], e10[8] = t10[8], this;
    }
    setUvTransform(e10, t10, i10, n10, r10, a10, s2) {
      let o2 = Math.cos(r10), l2 = Math.sin(r10);
      return this.set(i10 * o2, i10 * l2, -i10 * (o2 * a10 + l2 * s2) + a10 + e10, -n10 * l2, n10 * o2, -n10 * (-l2 * a10 + o2 * s2) + s2 + t10, 0, 0, 1), this;
    }
    scale(e10, t10) {
      return this.premultiply(C.makeScale(e10, t10)), this;
    }
    rotate(e10) {
      return this.premultiply(C.makeRotation(-e10)), this;
    }
    translate(e10, t10) {
      return this.premultiply(C.makeTranslation(e10, t10)), this;
    }
    makeTranslation(e10, t10) {
      return e10.isVector2 ? this.set(1, 0, e10.x, 0, 1, e10.y, 0, 0, 1) : this.set(1, 0, e10, 0, 1, t10, 0, 0, 1), this;
    }
    makeRotation(e10) {
      let t10 = Math.cos(e10), i10 = Math.sin(e10);
      return this.set(t10, -i10, 0, i10, t10, 0, 0, 0, 1), this;
    }
    makeScale(e10, t10) {
      return this.set(e10, 0, 0, 0, t10, 0, 0, 0, 1), this;
    }
    equals(e10) {
      let t10 = this.elements, i10 = e10.elements;
      for (let e11 = 0; e11 < 9; e11++) if (t10[e11] !== i10[e11]) return false;
      return true;
    }
    fromArray(e10, t10 = 0) {
      for (let i10 = 0; i10 < 9; i10++) this.elements[i10] = e10[i10 + t10];
      return this;
    }
    toArray(e10 = [], t10 = 0) {
      let i10 = this.elements;
      return e10[t10] = i10[0], e10[t10 + 1] = i10[1], e10[t10 + 2] = i10[2], e10[t10 + 3] = i10[3], e10[t10 + 4] = i10[4], e10[t10 + 5] = i10[5], e10[t10 + 6] = i10[6], e10[t10 + 7] = i10[7], e10[t10 + 8] = i10[8], e10;
    }
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
  }
  let C = new R();
  function P(e10) {
    for (let t10 = e10.length - 1; t10 >= 0; --t10) if (e10[t10] >= 65535) return true;
    return false;
  }
  function I(e10) {
    return document.createElementNS("http://www.w3.org/1999/xhtml", e10);
  }
  function L() {
    let e10 = I("canvas");
    return e10.style.display = "block", e10;
  }
  Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array;
  let U = {};
  function D(e10) {
    e10 in U || (U[e10] = true, console.warn(e10));
  }
  function N(e10, t10, i10) {
    return new Promise(function(n10, r10) {
      setTimeout(function a10() {
        switch (e10.clientWaitSync(t10, e10.SYNC_FLUSH_COMMANDS_BIT, 0)) {
          case e10.WAIT_FAILED:
            r10();
            break;
          case e10.TIMEOUT_EXPIRED:
            setTimeout(a10, i10);
            break;
          default:
            n10();
        }
      }, i10);
    });
  }
  let O = new R().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), F = new R().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715), B = (n = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], r = [0.2126, 0.7152, 0.0722], a = [0.3127, 0.329], (i = { enabled: true, workingColorSpace: l, spaces: {}, convert: function(e10, t10, i10) {
    return false !== this.enabled && t10 !== i10 && t10 && i10 && (this.spaces[t10].transfer === c && (e10.r = z(e10.r), e10.g = z(e10.g), e10.b = z(e10.b)), this.spaces[t10].primaries !== this.spaces[i10].primaries && (e10.applyMatrix3(this.spaces[t10].toXYZ), e10.applyMatrix3(this.spaces[i10].fromXYZ)), this.spaces[i10].transfer === c && (e10.r = V(e10.r), e10.g = V(e10.g), e10.b = V(e10.b))), e10;
  }, workingToColorSpace: function(e10, t10) {
    return this.convert(e10, this.workingColorSpace, t10);
  }, colorSpaceToWorking: function(e10, t10) {
    return this.convert(e10, t10, this.workingColorSpace);
  }, getPrimaries: function(e10) {
    return this.spaces[e10].primaries;
  }, getTransfer: function(e10) {
    return "" === e10 ? h : this.spaces[e10].transfer;
  }, getToneMappingMode: function(e10) {
    return this.spaces[e10].outputColorSpaceConfig.toneMappingMode || "standard";
  }, getLuminanceCoefficients: function(e10, t10 = this.workingColorSpace) {
    return e10.fromArray(this.spaces[t10].luminanceCoefficients);
  }, define: function(e10) {
    Object.assign(this.spaces, e10);
  }, _getMatrix: function(e10, t10, i10) {
    return e10.copy(this.spaces[t10].toXYZ).multiply(this.spaces[i10].fromXYZ);
  }, _getDrawingBufferColorSpace: function(e10) {
    return this.spaces[e10].outputColorSpaceConfig.drawingBufferColorSpace;
  }, _getUnpackColorSpace: function(e10 = this.workingColorSpace) {
    return this.spaces[e10].workingColorSpaceConfig.unpackColorSpace;
  }, fromWorkingColorSpace: function(e10, t10) {
    return D("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), i.workingToColorSpace(e10, t10);
  }, toWorkingColorSpace: function(e10, t10) {
    return D("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), i.colorSpaceToWorking(e10, t10);
  } }).define({ [l]: { primaries: n, whitePoint: a, transfer: h, toXYZ: O, fromXYZ: F, luminanceCoefficients: r, workingColorSpaceConfig: { unpackColorSpace: o }, outputColorSpaceConfig: { drawingBufferColorSpace: o } }, [o]: { primaries: n, whitePoint: a, transfer: c, toXYZ: O, fromXYZ: F, luminanceCoefficients: r, outputColorSpaceConfig: { drawingBufferColorSpace: o } } }), i);
  function z(e10) {
    return e10 < 0.04045 ? 0.0773993808 * e10 : Math.pow(0.9478672986 * e10 + 0.0521327014, 2.4);
  }
  function V(e10) {
    return e10 < 31308e-7 ? 12.92 * e10 : 1.055 * Math.pow(e10, 0.41666) - 0.055;
  }
  class H {
    static getDataURL(e10, i10 = "image/png") {
      let n10;
      if (/^data:/i.test(e10.src) || "u" < typeof HTMLCanvasElement) return e10.src;
      if (e10 instanceof HTMLCanvasElement) n10 = e10;
      else {
        void 0 === t && (t = I("canvas")), t.width = e10.width, t.height = e10.height;
        let i11 = t.getContext("2d");
        e10 instanceof ImageData ? i11.putImageData(e10, 0, 0) : i11.drawImage(e10, 0, 0, e10.width, e10.height), n10 = t;
      }
      return n10.toDataURL(i10);
    }
    static sRGBToLinear(e10) {
      if ("u" > typeof HTMLImageElement && e10 instanceof HTMLImageElement || "u" > typeof HTMLCanvasElement && e10 instanceof HTMLCanvasElement || "u" > typeof ImageBitmap && e10 instanceof ImageBitmap) {
        let t10 = I("canvas");
        t10.width = e10.width, t10.height = e10.height;
        let i10 = t10.getContext("2d");
        i10.drawImage(e10, 0, 0, e10.width, e10.height);
        let n10 = i10.getImageData(0, 0, e10.width, e10.height), r10 = n10.data;
        for (let e11 = 0; e11 < r10.length; e11++) r10[e11] = 255 * z(r10[e11] / 255);
        return i10.putImageData(n10, 0, 0), t10;
      }
      if (!e10.data) return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e10;
      {
        let t10 = e10.data.slice(0);
        for (let e11 = 0; e11 < t10.length; e11++) t10 instanceof Uint8Array || t10 instanceof Uint8ClampedArray ? t10[e11] = Math.floor(255 * z(t10[e11] / 255)) : t10[e11] = z(t10[e11]);
        return { data: t10, width: e10.width, height: e10.height };
      }
    }
  }
  let k = 0;
  class G {
    constructor(e10 = null) {
      this.isSource = true, Object.defineProperty(this, "id", { value: k++ }), this.uuid = _(), this.data = e10, this.dataReady = true, this.version = 0;
    }
    getSize(e10) {
      let t10 = this.data;
      return "u" > typeof HTMLVideoElement && t10 instanceof HTMLVideoElement ? e10.set(t10.videoWidth, t10.videoHeight, 0) : t10 instanceof VideoFrame ? e10.set(t10.displayHeight, t10.displayWidth, 0) : null !== t10 ? e10.set(t10.width, t10.height, t10.depth || 0) : e10.set(0, 0, 0), e10;
    }
    set needsUpdate(e10) {
      true === e10 && this.version++;
    }
    toJSON(e10) {
      let t10 = void 0 === e10 || "string" == typeof e10;
      if (!t10 && void 0 !== e10.images[this.uuid]) return e10.images[this.uuid];
      let i10 = { uuid: this.uuid, url: "" }, n10 = this.data;
      if (null !== n10) {
        let e11;
        if (Array.isArray(n10)) {
          e11 = [];
          for (let t11 = 0, i11 = n10.length; t11 < i11; t11++) n10[t11].isDataTexture ? e11.push(W(n10[t11].image)) : e11.push(W(n10[t11]));
        } else e11 = W(n10);
        i10.url = e11;
      }
      return t10 || (e10.images[this.uuid] = i10), i10;
    }
  }
  function W(e10) {
    return "u" > typeof HTMLImageElement && e10 instanceof HTMLImageElement || "u" > typeof HTMLCanvasElement && e10 instanceof HTMLCanvasElement || "u" > typeof ImageBitmap && e10 instanceof ImageBitmap ? H.getDataURL(e10) : e10.data ? { data: Array.from(e10.data), width: e10.width, height: e10.height, type: e10.data.constructor.name } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
  }
  let X = 0, j = new b();
  class q extends d {
    constructor(e10 = q.DEFAULT_IMAGE, t10 = q.DEFAULT_MAPPING, i10 = 1001, n10 = 1001, r10 = 1006, a10 = 1008, s2 = 1023, o2 = 1009, l2 = q.DEFAULT_ANISOTROPY, h2 = "") {
      super(), this.isTexture = true, Object.defineProperty(this, "id", { value: X++ }), this.uuid = _(), this.name = "", this.source = new G(e10), this.mipmaps = [], this.mapping = t10, this.channel = 0, this.wrapS = i10, this.wrapT = n10, this.magFilter = r10, this.minFilter = a10, this.anisotropy = l2, this.format = s2, this.internalFormat = null, this.type = o2, this.offset = new E(0, 0), this.repeat = new E(1, 1), this.center = new E(0, 0), this.rotation = 0, this.matrixAutoUpdate = true, this.matrix = new R(), this.generateMipmaps = true, this.premultiplyAlpha = false, this.flipY = true, this.unpackAlignment = 4, this.colorSpace = h2, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = false, this.isArrayTexture = !!e10 && !!e10.depth && e10.depth > 1, this.pmremVersion = 0;
    }
    get width() {
      return this.source.getSize(j).x;
    }
    get height() {
      return this.source.getSize(j).y;
    }
    get depth() {
      return this.source.getSize(j).z;
    }
    get image() {
      return this.source.data;
    }
    set image(e10 = null) {
      this.source.data = e10;
    }
    updateMatrix() {
      this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
    }
    addUpdateRange(e10, t10) {
      this.updateRanges.push({ start: e10, count: t10 });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e10) {
      return this.name = e10.name, this.source = e10.source, this.mipmaps = e10.mipmaps.slice(0), this.mapping = e10.mapping, this.channel = e10.channel, this.wrapS = e10.wrapS, this.wrapT = e10.wrapT, this.magFilter = e10.magFilter, this.minFilter = e10.minFilter, this.anisotropy = e10.anisotropy, this.format = e10.format, this.internalFormat = e10.internalFormat, this.type = e10.type, this.offset.copy(e10.offset), this.repeat.copy(e10.repeat), this.center.copy(e10.center), this.rotation = e10.rotation, this.matrixAutoUpdate = e10.matrixAutoUpdate, this.matrix.copy(e10.matrix), this.generateMipmaps = e10.generateMipmaps, this.premultiplyAlpha = e10.premultiplyAlpha, this.flipY = e10.flipY, this.unpackAlignment = e10.unpackAlignment, this.colorSpace = e10.colorSpace, this.renderTarget = e10.renderTarget, this.isRenderTargetTexture = e10.isRenderTargetTexture, this.isArrayTexture = e10.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e10.userData)), this.needsUpdate = true, this;
    }
    setValues(e10) {
      for (let t10 in e10) {
        let i10 = e10[t10];
        if (void 0 === i10) {
          console.warn(`THREE.Texture.setValues(): parameter '${t10}' has value of undefined.`);
          continue;
        }
        let n10 = this[t10];
        if (void 0 === n10) {
          console.warn(`THREE.Texture.setValues(): property '${t10}' does not exist.`);
          continue;
        }
        n10 && i10 && n10.isVector2 && i10.isVector2 || n10 && i10 && n10.isVector3 && i10.isVector3 || n10 && i10 && n10.isMatrix3 && i10.isMatrix3 ? n10.copy(i10) : this[t10] = i10;
      }
    }
    toJSON(e10) {
      let t10 = void 0 === e10 || "string" == typeof e10;
      if (!t10 && void 0 !== e10.textures[this.uuid]) return e10.textures[this.uuid];
      let i10 = { metadata: { version: 4.7, type: "Texture", generator: "Texture.toJSON" }, uuid: this.uuid, name: this.name, image: this.source.toJSON(e10).uuid, mapping: this.mapping, channel: this.channel, repeat: [this.repeat.x, this.repeat.y], offset: [this.offset.x, this.offset.y], center: [this.center.x, this.center.y], rotation: this.rotation, wrap: [this.wrapS, this.wrapT], format: this.format, internalFormat: this.internalFormat, type: this.type, colorSpace: this.colorSpace, minFilter: this.minFilter, magFilter: this.magFilter, anisotropy: this.anisotropy, flipY: this.flipY, generateMipmaps: this.generateMipmaps, premultiplyAlpha: this.premultiplyAlpha, unpackAlignment: this.unpackAlignment };
      return Object.keys(this.userData).length > 0 && (i10.userData = this.userData), t10 || (e10.textures[this.uuid] = i10), i10;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    transformUv(e10) {
      if (300 !== this.mapping) return e10;
      if (e10.applyMatrix3(this.matrix), e10.x < 0 || e10.x > 1) switch (this.wrapS) {
        case 1e3:
          e10.x = e10.x - Math.floor(e10.x);
          break;
        case 1001:
          e10.x = e10.x < 0 ? 0 : 1;
          break;
        case 1002:
          1 === Math.abs(Math.floor(e10.x) % 2) ? e10.x = Math.ceil(e10.x) - e10.x : e10.x = e10.x - Math.floor(e10.x);
      }
      if (e10.y < 0 || e10.y > 1) switch (this.wrapT) {
        case 1e3:
          e10.y = e10.y - Math.floor(e10.y);
          break;
        case 1001:
          e10.y = e10.y < 0 ? 0 : 1;
          break;
        case 1002:
          1 === Math.abs(Math.floor(e10.y) % 2) ? e10.y = Math.ceil(e10.y) - e10.y : e10.y = e10.y - Math.floor(e10.y);
      }
      return this.flipY && (e10.y = 1 - e10.y), e10;
    }
    set needsUpdate(e10) {
      true === e10 && (this.version++, this.source.needsUpdate = true);
    }
    set needsPMREMUpdate(e10) {
      true === e10 && this.pmremVersion++;
    }
  }
  q.DEFAULT_IMAGE = null, q.DEFAULT_MAPPING = 300, q.DEFAULT_ANISOTROPY = 1;
  class Y {
    constructor(e10 = 0, t10 = 0, i10 = 0, n10 = 1) {
      Y.prototype.isVector4 = true, this.x = e10, this.y = t10, this.z = i10, this.w = n10;
    }
    get width() {
      return this.z;
    }
    set width(e10) {
      this.z = e10;
    }
    get height() {
      return this.w;
    }
    set height(e10) {
      this.w = e10;
    }
    set(e10, t10, i10, n10) {
      return this.x = e10, this.y = t10, this.z = i10, this.w = n10, this;
    }
    setScalar(e10) {
      return this.x = e10, this.y = e10, this.z = e10, this.w = e10, this;
    }
    setX(e10) {
      return this.x = e10, this;
    }
    setY(e10) {
      return this.y = e10, this;
    }
    setZ(e10) {
      return this.z = e10, this;
    }
    setW(e10) {
      return this.w = e10, this;
    }
    setComponent(e10, t10) {
      switch (e10) {
        case 0:
          this.x = t10;
          break;
        case 1:
          this.y = t10;
          break;
        case 2:
          this.z = t10;
          break;
        case 3:
          this.w = t10;
          break;
        default:
          throw Error("index is out of range: " + e10);
      }
      return this;
    }
    getComponent(e10) {
      switch (e10) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw Error("index is out of range: " + e10);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(e10) {
      return this.x = e10.x, this.y = e10.y, this.z = e10.z, this.w = void 0 !== e10.w ? e10.w : 1, this;
    }
    add(e10) {
      return this.x += e10.x, this.y += e10.y, this.z += e10.z, this.w += e10.w, this;
    }
    addScalar(e10) {
      return this.x += e10, this.y += e10, this.z += e10, this.w += e10, this;
    }
    addVectors(e10, t10) {
      return this.x = e10.x + t10.x, this.y = e10.y + t10.y, this.z = e10.z + t10.z, this.w = e10.w + t10.w, this;
    }
    addScaledVector(e10, t10) {
      return this.x += e10.x * t10, this.y += e10.y * t10, this.z += e10.z * t10, this.w += e10.w * t10, this;
    }
    sub(e10) {
      return this.x -= e10.x, this.y -= e10.y, this.z -= e10.z, this.w -= e10.w, this;
    }
    subScalar(e10) {
      return this.x -= e10, this.y -= e10, this.z -= e10, this.w -= e10, this;
    }
    subVectors(e10, t10) {
      return this.x = e10.x - t10.x, this.y = e10.y - t10.y, this.z = e10.z - t10.z, this.w = e10.w - t10.w, this;
    }
    multiply(e10) {
      return this.x *= e10.x, this.y *= e10.y, this.z *= e10.z, this.w *= e10.w, this;
    }
    multiplyScalar(e10) {
      return this.x *= e10, this.y *= e10, this.z *= e10, this.w *= e10, this;
    }
    applyMatrix4(e10) {
      let t10 = this.x, i10 = this.y, n10 = this.z, r10 = this.w, a10 = e10.elements;
      return this.x = a10[0] * t10 + a10[4] * i10 + a10[8] * n10 + a10[12] * r10, this.y = a10[1] * t10 + a10[5] * i10 + a10[9] * n10 + a10[13] * r10, this.z = a10[2] * t10 + a10[6] * i10 + a10[10] * n10 + a10[14] * r10, this.w = a10[3] * t10 + a10[7] * i10 + a10[11] * n10 + a10[15] * r10, this;
    }
    divide(e10) {
      return this.x /= e10.x, this.y /= e10.y, this.z /= e10.z, this.w /= e10.w, this;
    }
    divideScalar(e10) {
      return this.multiplyScalar(1 / e10);
    }
    setAxisAngleFromQuaternion(e10) {
      this.w = 2 * Math.acos(e10.w);
      let t10 = Math.sqrt(1 - e10.w * e10.w);
      return t10 < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e10.x / t10, this.y = e10.y / t10, this.z = e10.z / t10), this;
    }
    setAxisAngleFromRotationMatrix(e10) {
      let t10, i10, n10, r10, a10 = e10.elements, s2 = a10[0], o2 = a10[4], l2 = a10[8], h2 = a10[1], c2 = a10[5], u2 = a10[9], d2 = a10[2], p2 = a10[6], f2 = a10[10];
      if (0.01 > Math.abs(o2 - h2) && 0.01 > Math.abs(l2 - d2) && 0.01 > Math.abs(u2 - p2)) {
        if (0.1 > Math.abs(o2 + h2) && 0.1 > Math.abs(l2 + d2) && 0.1 > Math.abs(u2 + p2) && 0.1 > Math.abs(s2 + c2 + f2 - 3)) return this.set(1, 0, 0, 0), this;
        t10 = Math.PI;
        let e11 = (s2 + 1) / 2, a11 = (c2 + 1) / 2, m3 = (f2 + 1) / 2, g2 = (o2 + h2) / 4, _2 = (l2 + d2) / 4, v2 = (u2 + p2) / 4;
        return e11 > a11 && e11 > m3 ? e11 < 0.01 ? (i10 = 0, n10 = 0.707106781, r10 = 0.707106781) : (n10 = g2 / (i10 = Math.sqrt(e11)), r10 = _2 / i10) : a11 > m3 ? a11 < 0.01 ? (i10 = 0.707106781, n10 = 0, r10 = 0.707106781) : (i10 = g2 / (n10 = Math.sqrt(a11)), r10 = v2 / n10) : m3 < 0.01 ? (i10 = 0.707106781, n10 = 0.707106781, r10 = 0) : (i10 = _2 / (r10 = Math.sqrt(m3)), n10 = v2 / r10), this.set(i10, n10, r10, t10), this;
      }
      let m2 = Math.sqrt((p2 - u2) * (p2 - u2) + (l2 - d2) * (l2 - d2) + (h2 - o2) * (h2 - o2));
      return 1e-3 > Math.abs(m2) && (m2 = 1), this.x = (p2 - u2) / m2, this.y = (l2 - d2) / m2, this.z = (h2 - o2) / m2, this.w = Math.acos((s2 + c2 + f2 - 1) / 2), this;
    }
    setFromMatrixPosition(e10) {
      let t10 = e10.elements;
      return this.x = t10[12], this.y = t10[13], this.z = t10[14], this.w = t10[15], this;
    }
    min(e10) {
      return this.x = Math.min(this.x, e10.x), this.y = Math.min(this.y, e10.y), this.z = Math.min(this.z, e10.z), this.w = Math.min(this.w, e10.w), this;
    }
    max(e10) {
      return this.x = Math.max(this.x, e10.x), this.y = Math.max(this.y, e10.y), this.z = Math.max(this.z, e10.z), this.w = Math.max(this.w, e10.w), this;
    }
    clamp(e10, t10) {
      return this.x = v(this.x, e10.x, t10.x), this.y = v(this.y, e10.y, t10.y), this.z = v(this.z, e10.z, t10.z), this.w = v(this.w, e10.w, t10.w), this;
    }
    clampScalar(e10, t10) {
      return this.x = v(this.x, e10, t10), this.y = v(this.y, e10, t10), this.z = v(this.z, e10, t10), this.w = v(this.w, e10, t10), this;
    }
    clampLength(e10, t10) {
      let i10 = this.length();
      return this.divideScalar(i10 || 1).multiplyScalar(v(i10, e10, t10));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
    }
    dot(e10) {
      return this.x * e10.x + this.y * e10.y + this.z * e10.z + this.w * e10.w;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(e10) {
      return this.normalize().multiplyScalar(e10);
    }
    lerp(e10, t10) {
      return this.x += (e10.x - this.x) * t10, this.y += (e10.y - this.y) * t10, this.z += (e10.z - this.z) * t10, this.w += (e10.w - this.w) * t10, this;
    }
    lerpVectors(e10, t10, i10) {
      return this.x = e10.x + (t10.x - e10.x) * i10, this.y = e10.y + (t10.y - e10.y) * i10, this.z = e10.z + (t10.z - e10.z) * i10, this.w = e10.w + (t10.w - e10.w) * i10, this;
    }
    equals(e10) {
      return e10.x === this.x && e10.y === this.y && e10.z === this.z && e10.w === this.w;
    }
    fromArray(e10, t10 = 0) {
      return this.x = e10[t10], this.y = e10[t10 + 1], this.z = e10[t10 + 2], this.w = e10[t10 + 3], this;
    }
    toArray(e10 = [], t10 = 0) {
      return e10[t10] = this.x, e10[t10 + 1] = this.y, e10[t10 + 2] = this.z, e10[t10 + 3] = this.w, e10;
    }
    fromBufferAttribute(e10, t10) {
      return this.x = e10.getX(t10), this.y = e10.getY(t10), this.z = e10.getZ(t10), this.w = e10.getW(t10), this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z, yield this.w;
    }
  }
  class K extends d {
    constructor(e10 = 1, t10 = 1, i10 = {}) {
      super(), i10 = Object.assign({ generateMipmaps: false, internalFormat: null, minFilter: 1006, depthBuffer: true, stencilBuffer: false, resolveDepthBuffer: true, resolveStencilBuffer: true, depthTexture: null, samples: 0, count: 1, depth: 1, multiview: false }, i10), this.isRenderTarget = true, this.width = e10, this.height = t10, this.depth = i10.depth, this.scissor = new Y(0, 0, e10, t10), this.scissorTest = false, this.viewport = new Y(0, 0, e10, t10);
      const n10 = new q({ width: e10, height: t10, depth: i10.depth });
      this.textures = [];
      const r10 = i10.count;
      for (let e11 = 0; e11 < r10; e11++) this.textures[e11] = n10.clone(), this.textures[e11].isRenderTargetTexture = true, this.textures[e11].renderTarget = this;
      this._setTextureOptions(i10), this.depthBuffer = i10.depthBuffer, this.stencilBuffer = i10.stencilBuffer, this.resolveDepthBuffer = i10.resolveDepthBuffer, this.resolveStencilBuffer = i10.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = i10.depthTexture, this.samples = i10.samples, this.multiview = i10.multiview;
    }
    _setTextureOptions(e10 = {}) {
      let t10 = { minFilter: 1006, generateMipmaps: false, flipY: false, internalFormat: null };
      void 0 !== e10.mapping && (t10.mapping = e10.mapping), void 0 !== e10.wrapS && (t10.wrapS = e10.wrapS), void 0 !== e10.wrapT && (t10.wrapT = e10.wrapT), void 0 !== e10.wrapR && (t10.wrapR = e10.wrapR), void 0 !== e10.magFilter && (t10.magFilter = e10.magFilter), void 0 !== e10.minFilter && (t10.minFilter = e10.minFilter), void 0 !== e10.format && (t10.format = e10.format), void 0 !== e10.type && (t10.type = e10.type), void 0 !== e10.anisotropy && (t10.anisotropy = e10.anisotropy), void 0 !== e10.colorSpace && (t10.colorSpace = e10.colorSpace), void 0 !== e10.flipY && (t10.flipY = e10.flipY), void 0 !== e10.generateMipmaps && (t10.generateMipmaps = e10.generateMipmaps), void 0 !== e10.internalFormat && (t10.internalFormat = e10.internalFormat);
      for (let e11 = 0; e11 < this.textures.length; e11++) this.textures[e11].setValues(t10);
    }
    get texture() {
      return this.textures[0];
    }
    set texture(e10) {
      this.textures[0] = e10;
    }
    set depthTexture(e10) {
      null !== this._depthTexture && (this._depthTexture.renderTarget = null), null !== e10 && (e10.renderTarget = this), this._depthTexture = e10;
    }
    get depthTexture() {
      return this._depthTexture;
    }
    setSize(e10, t10, i10 = 1) {
      if (this.width !== e10 || this.height !== t10 || this.depth !== i10) {
        this.width = e10, this.height = t10, this.depth = i10;
        for (let n10 = 0, r10 = this.textures.length; n10 < r10; n10++) this.textures[n10].image.width = e10, this.textures[n10].image.height = t10, this.textures[n10].image.depth = i10, this.textures[n10].isArrayTexture = this.textures[n10].image.depth > 1;
        this.dispose();
      }
      this.viewport.set(0, 0, e10, t10), this.scissor.set(0, 0, e10, t10);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e10) {
      this.width = e10.width, this.height = e10.height, this.depth = e10.depth, this.scissor.copy(e10.scissor), this.scissorTest = e10.scissorTest, this.viewport.copy(e10.viewport), this.textures.length = 0;
      for (let t10 = 0, i10 = e10.textures.length; t10 < i10; t10++) {
        this.textures[t10] = e10.textures[t10].clone(), this.textures[t10].isRenderTargetTexture = true, this.textures[t10].renderTarget = this;
        let i11 = Object.assign({}, e10.textures[t10].image);
        this.textures[t10].source = new G(i11);
      }
      return this.depthBuffer = e10.depthBuffer, this.stencilBuffer = e10.stencilBuffer, this.resolveDepthBuffer = e10.resolveDepthBuffer, this.resolveStencilBuffer = e10.resolveStencilBuffer, null !== e10.depthTexture && (this.depthTexture = e10.depthTexture.clone()), this.samples = e10.samples, this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  }
  class J extends K {
    constructor(e10 = 1, t10 = 1, i10 = {}) {
      super(e10, t10, i10), this.isWebGLRenderTarget = true;
    }
  }
  class Z extends q {
    constructor(e10 = null, t10 = 1, i10 = 1, n10 = 1) {
      super(null), this.isDataArrayTexture = true, this.image = { data: e10, width: t10, height: i10, depth: n10 }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
    }
    addLayerUpdate(e10) {
      this.layerUpdates.add(e10);
    }
    clearLayerUpdates() {
      this.layerUpdates.clear();
    }
  }
  class $ extends q {
    constructor(e10 = null, t10 = 1, i10 = 1, n10 = 1) {
      super(null), this.isData3DTexture = true, this.image = { data: e10, width: t10, height: i10, depth: n10 }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
    }
  }
  class Q {
    constructor(e10 = new b(Infinity, Infinity, Infinity), t10 = new b(-1 / 0, -1 / 0, -1 / 0)) {
      this.isBox3 = true, this.min = e10, this.max = t10;
    }
    set(e10, t10) {
      return this.min.copy(e10), this.max.copy(t10), this;
    }
    setFromArray(e10) {
      this.makeEmpty();
      for (let t10 = 0, i10 = e10.length; t10 < i10; t10 += 3) this.expandByPoint(et.fromArray(e10, t10));
      return this;
    }
    setFromBufferAttribute(e10) {
      this.makeEmpty();
      for (let t10 = 0, i10 = e10.count; t10 < i10; t10++) this.expandByPoint(et.fromBufferAttribute(e10, t10));
      return this;
    }
    setFromPoints(e10) {
      this.makeEmpty();
      for (let t10 = 0, i10 = e10.length; t10 < i10; t10++) this.expandByPoint(e10[t10]);
      return this;
    }
    setFromCenterAndSize(e10, t10) {
      let i10 = et.copy(t10).multiplyScalar(0.5);
      return this.min.copy(e10).sub(i10), this.max.copy(e10).add(i10), this;
    }
    setFromObject(e10, t10 = false) {
      return this.makeEmpty(), this.expandByObject(e10, t10);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e10) {
      return this.min.copy(e10.min), this.max.copy(e10.max), this;
    }
    makeEmpty() {
      return this.min.x = this.min.y = this.min.z = Infinity, this.max.x = this.max.y = this.max.z = -1 / 0, this;
    }
    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
    getCenter(e10) {
      return this.isEmpty() ? e10.set(0, 0, 0) : e10.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    getSize(e10) {
      return this.isEmpty() ? e10.set(0, 0, 0) : e10.subVectors(this.max, this.min);
    }
    expandByPoint(e10) {
      return this.min.min(e10), this.max.max(e10), this;
    }
    expandByVector(e10) {
      return this.min.sub(e10), this.max.add(e10), this;
    }
    expandByScalar(e10) {
      return this.min.addScalar(-e10), this.max.addScalar(e10), this;
    }
    expandByObject(e10, t10 = false) {
      e10.updateWorldMatrix(false, false);
      let i10 = e10.geometry;
      if (void 0 !== i10) {
        let n11 = i10.getAttribute("position");
        if (true === t10 && void 0 !== n11 && true !== e10.isInstancedMesh) for (let t11 = 0, i11 = n11.count; t11 < i11; t11++) true === e10.isMesh ? e10.getVertexPosition(t11, et) : et.fromBufferAttribute(n11, t11), et.applyMatrix4(e10.matrixWorld), this.expandByPoint(et);
        else void 0 !== e10.boundingBox ? (null === e10.boundingBox && e10.computeBoundingBox(), ei.copy(e10.boundingBox)) : (null === i10.boundingBox && i10.computeBoundingBox(), ei.copy(i10.boundingBox)), ei.applyMatrix4(e10.matrixWorld), this.union(ei);
      }
      let n10 = e10.children;
      for (let e11 = 0, i11 = n10.length; e11 < i11; e11++) this.expandByObject(n10[e11], t10);
      return this;
    }
    containsPoint(e10) {
      return e10.x >= this.min.x && e10.x <= this.max.x && e10.y >= this.min.y && e10.y <= this.max.y && e10.z >= this.min.z && e10.z <= this.max.z;
    }
    containsBox(e10) {
      return this.min.x <= e10.min.x && e10.max.x <= this.max.x && this.min.y <= e10.min.y && e10.max.y <= this.max.y && this.min.z <= e10.min.z && e10.max.z <= this.max.z;
    }
    getParameter(e10, t10) {
      return t10.set((e10.x - this.min.x) / (this.max.x - this.min.x), (e10.y - this.min.y) / (this.max.y - this.min.y), (e10.z - this.min.z) / (this.max.z - this.min.z));
    }
    intersectsBox(e10) {
      return e10.max.x >= this.min.x && e10.min.x <= this.max.x && e10.max.y >= this.min.y && e10.min.y <= this.max.y && e10.max.z >= this.min.z && e10.min.z <= this.max.z;
    }
    intersectsSphere(e10) {
      return this.clampPoint(e10.center, et), et.distanceToSquared(e10.center) <= e10.radius * e10.radius;
    }
    intersectsPlane(e10) {
      let t10, i10;
      return e10.normal.x > 0 ? (t10 = e10.normal.x * this.min.x, i10 = e10.normal.x * this.max.x) : (t10 = e10.normal.x * this.max.x, i10 = e10.normal.x * this.min.x), e10.normal.y > 0 ? (t10 += e10.normal.y * this.min.y, i10 += e10.normal.y * this.max.y) : (t10 += e10.normal.y * this.max.y, i10 += e10.normal.y * this.min.y), e10.normal.z > 0 ? (t10 += e10.normal.z * this.min.z, i10 += e10.normal.z * this.max.z) : (t10 += e10.normal.z * this.max.z, i10 += e10.normal.z * this.min.z), t10 <= -e10.constant && i10 >= -e10.constant;
    }
    intersectsTriangle(e10) {
      if (this.isEmpty()) return false;
      this.getCenter(eh), ec.subVectors(this.max, eh), en.subVectors(e10.a, eh), er.subVectors(e10.b, eh), ea.subVectors(e10.c, eh), es.subVectors(er, en), eo.subVectors(ea, er), el.subVectors(en, ea);
      let t10 = [0, -es.z, es.y, 0, -eo.z, eo.y, 0, -el.z, el.y, es.z, 0, -es.x, eo.z, 0, -eo.x, el.z, 0, -el.x, -es.y, es.x, 0, -eo.y, eo.x, 0, -el.y, el.x, 0];
      return !!ep(t10, en, er, ea, ec) && !!ep(t10 = [1, 0, 0, 0, 1, 0, 0, 0, 1], en, er, ea, ec) && (eu.crossVectors(es, eo), ep(t10 = [eu.x, eu.y, eu.z], en, er, ea, ec));
    }
    clampPoint(e10, t10) {
      return t10.copy(e10).clamp(this.min, this.max);
    }
    distanceToPoint(e10) {
      return this.clampPoint(e10, et).distanceTo(e10);
    }
    getBoundingSphere(e10) {
      return this.isEmpty() ? e10.makeEmpty() : (this.getCenter(e10.center), e10.radius = 0.5 * this.getSize(et).length()), e10;
    }
    intersect(e10) {
      return this.min.max(e10.min), this.max.min(e10.max), this.isEmpty() && this.makeEmpty(), this;
    }
    union(e10) {
      return this.min.min(e10.min), this.max.max(e10.max), this;
    }
    applyMatrix4(e10) {
      return this.isEmpty() || (ee[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e10), ee[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e10), ee[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e10), ee[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e10), ee[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e10), ee[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e10), ee[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e10), ee[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e10), this.setFromPoints(ee)), this;
    }
    translate(e10) {
      return this.min.add(e10), this.max.add(e10), this;
    }
    equals(e10) {
      return e10.min.equals(this.min) && e10.max.equals(this.max);
    }
    toJSON() {
      return { min: this.min.toArray(), max: this.max.toArray() };
    }
    fromJSON(e10) {
      return this.min.fromArray(e10.min), this.max.fromArray(e10.max), this;
    }
  }
  let ee = [new b(), new b(), new b(), new b(), new b(), new b(), new b(), new b()], et = new b(), ei = new Q(), en = new b(), er = new b(), ea = new b(), es = new b(), eo = new b(), el = new b(), eh = new b(), ec = new b(), eu = new b(), ed = new b();
  function ep(e10, t10, i10, n10, r10) {
    for (let a10 = 0, s2 = e10.length - 3; a10 <= s2; a10 += 3) {
      ed.fromArray(e10, a10);
      let s3 = r10.x * Math.abs(ed.x) + r10.y * Math.abs(ed.y) + r10.z * Math.abs(ed.z), o2 = t10.dot(ed), l2 = i10.dot(ed), h2 = n10.dot(ed);
      if (Math.max(-Math.max(o2, l2, h2), Math.min(o2, l2, h2)) > s3) return false;
    }
    return true;
  }
  let ef = new Q(), em = new b(), eg = new b();
  class e_ {
    constructor(e10 = new b(), t10 = -1) {
      this.isSphere = true, this.center = e10, this.radius = t10;
    }
    set(e10, t10) {
      return this.center.copy(e10), this.radius = t10, this;
    }
    setFromPoints(e10, t10) {
      let i10 = this.center;
      void 0 !== t10 ? i10.copy(t10) : ef.setFromPoints(e10).getCenter(i10);
      let n10 = 0;
      for (let t11 = 0, r10 = e10.length; t11 < r10; t11++) n10 = Math.max(n10, i10.distanceToSquared(e10[t11]));
      return this.radius = Math.sqrt(n10), this;
    }
    copy(e10) {
      return this.center.copy(e10.center), this.radius = e10.radius, this;
    }
    isEmpty() {
      return this.radius < 0;
    }
    makeEmpty() {
      return this.center.set(0, 0, 0), this.radius = -1, this;
    }
    containsPoint(e10) {
      return e10.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(e10) {
      return e10.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(e10) {
      let t10 = this.radius + e10.radius;
      return e10.center.distanceToSquared(this.center) <= t10 * t10;
    }
    intersectsBox(e10) {
      return e10.intersectsSphere(this);
    }
    intersectsPlane(e10) {
      return Math.abs(e10.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(e10, t10) {
      let i10 = this.center.distanceToSquared(e10);
      return t10.copy(e10), i10 > this.radius * this.radius && (t10.sub(this.center).normalize(), t10.multiplyScalar(this.radius).add(this.center)), t10;
    }
    getBoundingBox(e10) {
      return this.isEmpty() ? e10.makeEmpty() : (e10.set(this.center, this.center), e10.expandByScalar(this.radius)), e10;
    }
    applyMatrix4(e10) {
      return this.center.applyMatrix4(e10), this.radius = this.radius * e10.getMaxScaleOnAxis(), this;
    }
    translate(e10) {
      return this.center.add(e10), this;
    }
    expandByPoint(e10) {
      if (this.isEmpty()) return this.center.copy(e10), this.radius = 0, this;
      em.subVectors(e10, this.center);
      let t10 = em.lengthSq();
      if (t10 > this.radius * this.radius) {
        let e11 = Math.sqrt(t10), i10 = (e11 - this.radius) * 0.5;
        this.center.addScaledVector(em, i10 / e11), this.radius += i10;
      }
      return this;
    }
    union(e10) {
      return e10.isEmpty() || (this.isEmpty() ? this.copy(e10) : true === this.center.equals(e10.center) ? this.radius = Math.max(this.radius, e10.radius) : (eg.subVectors(e10.center, this.center).setLength(e10.radius), this.expandByPoint(em.copy(e10.center).add(eg)), this.expandByPoint(em.copy(e10.center).sub(eg)))), this;
    }
    equals(e10) {
      return e10.center.equals(this.center) && e10.radius === this.radius;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    toJSON() {
      return { radius: this.radius, center: this.center.toArray() };
    }
    fromJSON(e10) {
      return this.radius = e10.radius, this.center.fromArray(e10.center), this;
    }
  }
  let ev = new b(), ex = new b(), ey = new b(), eM = new b(), eS = new b(), eE = new b(), eT = new b();
  class eb {
    constructor(e10 = new b(), t10 = new b(0, 0, -1)) {
      this.origin = e10, this.direction = t10;
    }
    set(e10, t10) {
      return this.origin.copy(e10), this.direction.copy(t10), this;
    }
    copy(e10) {
      return this.origin.copy(e10.origin), this.direction.copy(e10.direction), this;
    }
    at(e10, t10) {
      return t10.copy(this.origin).addScaledVector(this.direction, e10);
    }
    lookAt(e10) {
      return this.direction.copy(e10).sub(this.origin).normalize(), this;
    }
    recast(e10) {
      return this.origin.copy(this.at(e10, ev)), this;
    }
    closestPointToPoint(e10, t10) {
      t10.subVectors(e10, this.origin);
      let i10 = t10.dot(this.direction);
      return i10 < 0 ? t10.copy(this.origin) : t10.copy(this.origin).addScaledVector(this.direction, i10);
    }
    distanceToPoint(e10) {
      return Math.sqrt(this.distanceSqToPoint(e10));
    }
    distanceSqToPoint(e10) {
      let t10 = ev.subVectors(e10, this.origin).dot(this.direction);
      return t10 < 0 ? this.origin.distanceToSquared(e10) : (ev.copy(this.origin).addScaledVector(this.direction, t10), ev.distanceToSquared(e10));
    }
    distanceSqToSegment(e10, t10, i10, n10) {
      let r10, a10, s2, o2;
      ex.copy(e10).add(t10).multiplyScalar(0.5), ey.copy(t10).sub(e10).normalize(), eM.copy(this.origin).sub(ex);
      let l2 = 0.5 * e10.distanceTo(t10), h2 = -this.direction.dot(ey), c2 = eM.dot(this.direction), u2 = -eM.dot(ey), d2 = eM.lengthSq(), p2 = Math.abs(1 - h2 * h2);
      if (p2 > 0) if (r10 = h2 * u2 - c2, a10 = h2 * c2 - u2, o2 = l2 * p2, r10 >= 0) if (a10 >= -o2) if (a10 <= o2) {
        let e11 = 1 / p2;
        r10 *= e11, a10 *= e11, s2 = r10 * (r10 + h2 * a10 + 2 * c2) + a10 * (h2 * r10 + a10 + 2 * u2) + d2;
      } else s2 = -(r10 = Math.max(0, -(h2 * (a10 = l2) + c2))) * r10 + a10 * (a10 + 2 * u2) + d2;
      else s2 = -(r10 = Math.max(0, -(h2 * (a10 = -l2) + c2))) * r10 + a10 * (a10 + 2 * u2) + d2;
      else a10 <= -o2 ? (a10 = (r10 = Math.max(0, -(-h2 * l2 + c2))) > 0 ? -l2 : Math.min(Math.max(-l2, -u2), l2), s2 = -r10 * r10 + a10 * (a10 + 2 * u2) + d2) : a10 <= o2 ? (r10 = 0, s2 = (a10 = Math.min(Math.max(-l2, -u2), l2)) * (a10 + 2 * u2) + d2) : (a10 = (r10 = Math.max(0, -(h2 * l2 + c2))) > 0 ? l2 : Math.min(Math.max(-l2, -u2), l2), s2 = -r10 * r10 + a10 * (a10 + 2 * u2) + d2);
      else a10 = h2 > 0 ? -l2 : l2, s2 = -(r10 = Math.max(0, -(h2 * a10 + c2))) * r10 + a10 * (a10 + 2 * u2) + d2;
      return i10 && i10.copy(this.origin).addScaledVector(this.direction, r10), n10 && n10.copy(ex).addScaledVector(ey, a10), s2;
    }
    intersectSphere(e10, t10) {
      ev.subVectors(e10.center, this.origin);
      let i10 = ev.dot(this.direction), n10 = ev.dot(ev) - i10 * i10, r10 = e10.radius * e10.radius;
      if (n10 > r10) return null;
      let a10 = Math.sqrt(r10 - n10), s2 = i10 - a10, o2 = i10 + a10;
      return o2 < 0 ? null : s2 < 0 ? this.at(o2, t10) : this.at(s2, t10);
    }
    intersectsSphere(e10) {
      return !(e10.radius < 0) && this.distanceSqToPoint(e10.center) <= e10.radius * e10.radius;
    }
    distanceToPlane(e10) {
      let t10 = e10.normal.dot(this.direction);
      if (0 === t10) return 0 === e10.distanceToPoint(this.origin) ? 0 : null;
      let i10 = -(this.origin.dot(e10.normal) + e10.constant) / t10;
      return i10 >= 0 ? i10 : null;
    }
    intersectPlane(e10, t10) {
      let i10 = this.distanceToPlane(e10);
      return null === i10 ? null : this.at(i10, t10);
    }
    intersectsPlane(e10) {
      let t10 = e10.distanceToPoint(this.origin);
      return !!(0 === t10 || e10.normal.dot(this.direction) * t10 < 0);
    }
    intersectBox(e10, t10) {
      let i10, n10, r10, a10, s2, o2, l2 = 1 / this.direction.x, h2 = 1 / this.direction.y, c2 = 1 / this.direction.z, u2 = this.origin;
      return (l2 >= 0 ? (i10 = (e10.min.x - u2.x) * l2, n10 = (e10.max.x - u2.x) * l2) : (i10 = (e10.max.x - u2.x) * l2, n10 = (e10.min.x - u2.x) * l2), h2 >= 0 ? (r10 = (e10.min.y - u2.y) * h2, a10 = (e10.max.y - u2.y) * h2) : (r10 = (e10.max.y - u2.y) * h2, a10 = (e10.min.y - u2.y) * h2), i10 > a10 || r10 > n10 || ((r10 > i10 || isNaN(i10)) && (i10 = r10), (a10 < n10 || isNaN(n10)) && (n10 = a10), c2 >= 0 ? (s2 = (e10.min.z - u2.z) * c2, o2 = (e10.max.z - u2.z) * c2) : (s2 = (e10.max.z - u2.z) * c2, o2 = (e10.min.z - u2.z) * c2), i10 > o2 || s2 > n10 || ((s2 > i10 || i10 != i10) && (i10 = s2), (o2 < n10 || n10 != n10) && (n10 = o2), n10 < 0))) ? null : this.at(i10 >= 0 ? i10 : n10, t10);
    }
    intersectsBox(e10) {
      return null !== this.intersectBox(e10, ev);
    }
    intersectTriangle(e10, t10, i10, n10, r10) {
      let a10;
      eS.subVectors(t10, e10), eE.subVectors(i10, e10), eT.crossVectors(eS, eE);
      let s2 = this.direction.dot(eT);
      if (s2 > 0) {
        if (n10) return null;
        a10 = 1;
      } else {
        if (!(s2 < 0)) return null;
        a10 = -1, s2 = -s2;
      }
      eM.subVectors(this.origin, e10);
      let o2 = a10 * this.direction.dot(eE.crossVectors(eM, eE));
      if (o2 < 0) return null;
      let l2 = a10 * this.direction.dot(eS.cross(eM));
      if (l2 < 0 || o2 + l2 > s2) return null;
      let h2 = -a10 * eM.dot(eT);
      return h2 < 0 ? null : this.at(h2 / s2, r10);
    }
    applyMatrix4(e10) {
      return this.origin.applyMatrix4(e10), this.direction.transformDirection(e10), this;
    }
    equals(e10) {
      return e10.origin.equals(this.origin) && e10.direction.equals(this.direction);
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  class eA {
    constructor(e10, t10, i10, n10, r10, a10, s2, o2, l2, h2, c2, u2, d2, p2, f2, m2) {
      eA.prototype.isMatrix4 = true, this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], void 0 !== e10 && this.set(e10, t10, i10, n10, r10, a10, s2, o2, l2, h2, c2, u2, d2, p2, f2, m2);
    }
    set(e10, t10, i10, n10, r10, a10, s2, o2, l2, h2, c2, u2, d2, p2, f2, m2) {
      let g2 = this.elements;
      return g2[0] = e10, g2[4] = t10, g2[8] = i10, g2[12] = n10, g2[1] = r10, g2[5] = a10, g2[9] = s2, g2[13] = o2, g2[2] = l2, g2[6] = h2, g2[10] = c2, g2[14] = u2, g2[3] = d2, g2[7] = p2, g2[11] = f2, g2[15] = m2, this;
    }
    identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    clone() {
      return new eA().fromArray(this.elements);
    }
    copy(e10) {
      let t10 = this.elements, i10 = e10.elements;
      return t10[0] = i10[0], t10[1] = i10[1], t10[2] = i10[2], t10[3] = i10[3], t10[4] = i10[4], t10[5] = i10[5], t10[6] = i10[6], t10[7] = i10[7], t10[8] = i10[8], t10[9] = i10[9], t10[10] = i10[10], t10[11] = i10[11], t10[12] = i10[12], t10[13] = i10[13], t10[14] = i10[14], t10[15] = i10[15], this;
    }
    copyPosition(e10) {
      let t10 = this.elements, i10 = e10.elements;
      return t10[12] = i10[12], t10[13] = i10[13], t10[14] = i10[14], this;
    }
    setFromMatrix3(e10) {
      let t10 = e10.elements;
      return this.set(t10[0], t10[3], t10[6], 0, t10[1], t10[4], t10[7], 0, t10[2], t10[5], t10[8], 0, 0, 0, 0, 1), this;
    }
    extractBasis(e10, t10, i10) {
      return e10.setFromMatrixColumn(this, 0), t10.setFromMatrixColumn(this, 1), i10.setFromMatrixColumn(this, 2), this;
    }
    makeBasis(e10, t10, i10) {
      return this.set(e10.x, t10.x, i10.x, 0, e10.y, t10.y, i10.y, 0, e10.z, t10.z, i10.z, 0, 0, 0, 0, 1), this;
    }
    extractRotation(e10) {
      let t10 = this.elements, i10 = e10.elements, n10 = 1 / ew.setFromMatrixColumn(e10, 0).length(), r10 = 1 / ew.setFromMatrixColumn(e10, 1).length(), a10 = 1 / ew.setFromMatrixColumn(e10, 2).length();
      return t10[0] = i10[0] * n10, t10[1] = i10[1] * n10, t10[2] = i10[2] * n10, t10[3] = 0, t10[4] = i10[4] * r10, t10[5] = i10[5] * r10, t10[6] = i10[6] * r10, t10[7] = 0, t10[8] = i10[8] * a10, t10[9] = i10[9] * a10, t10[10] = i10[10] * a10, t10[11] = 0, t10[12] = 0, t10[13] = 0, t10[14] = 0, t10[15] = 1, this;
    }
    makeRotationFromEuler(e10) {
      let t10 = this.elements, i10 = e10.x, n10 = e10.y, r10 = e10.z, a10 = Math.cos(i10), s2 = Math.sin(i10), o2 = Math.cos(n10), l2 = Math.sin(n10), h2 = Math.cos(r10), c2 = Math.sin(r10);
      if ("XYZ" === e10.order) {
        let e11 = a10 * h2, i11 = a10 * c2, n11 = s2 * h2, r11 = s2 * c2;
        t10[0] = o2 * h2, t10[4] = -o2 * c2, t10[8] = l2, t10[1] = i11 + n11 * l2, t10[5] = e11 - r11 * l2, t10[9] = -s2 * o2, t10[2] = r11 - e11 * l2, t10[6] = n11 + i11 * l2, t10[10] = a10 * o2;
      } else if ("YXZ" === e10.order) {
        let e11 = o2 * h2, i11 = o2 * c2, n11 = l2 * h2, r11 = l2 * c2;
        t10[0] = e11 + r11 * s2, t10[4] = n11 * s2 - i11, t10[8] = a10 * l2, t10[1] = a10 * c2, t10[5] = a10 * h2, t10[9] = -s2, t10[2] = i11 * s2 - n11, t10[6] = r11 + e11 * s2, t10[10] = a10 * o2;
      } else if ("ZXY" === e10.order) {
        let e11 = o2 * h2, i11 = o2 * c2, n11 = l2 * h2, r11 = l2 * c2;
        t10[0] = e11 - r11 * s2, t10[4] = -a10 * c2, t10[8] = n11 + i11 * s2, t10[1] = i11 + n11 * s2, t10[5] = a10 * h2, t10[9] = r11 - e11 * s2, t10[2] = -a10 * l2, t10[6] = s2, t10[10] = a10 * o2;
      } else if ("ZYX" === e10.order) {
        let e11 = a10 * h2, i11 = a10 * c2, n11 = s2 * h2, r11 = s2 * c2;
        t10[0] = o2 * h2, t10[4] = n11 * l2 - i11, t10[8] = e11 * l2 + r11, t10[1] = o2 * c2, t10[5] = r11 * l2 + e11, t10[9] = i11 * l2 - n11, t10[2] = -l2, t10[6] = s2 * o2, t10[10] = a10 * o2;
      } else if ("YZX" === e10.order) {
        let e11 = a10 * o2, i11 = a10 * l2, n11 = s2 * o2, r11 = s2 * l2;
        t10[0] = o2 * h2, t10[4] = r11 - e11 * c2, t10[8] = n11 * c2 + i11, t10[1] = c2, t10[5] = a10 * h2, t10[9] = -s2 * h2, t10[2] = -l2 * h2, t10[6] = i11 * c2 + n11, t10[10] = e11 - r11 * c2;
      } else if ("XZY" === e10.order) {
        let e11 = a10 * o2, i11 = a10 * l2, n11 = s2 * o2, r11 = s2 * l2;
        t10[0] = o2 * h2, t10[4] = -c2, t10[8] = l2 * h2, t10[1] = e11 * c2 + r11, t10[5] = a10 * h2, t10[9] = i11 * c2 - n11, t10[2] = n11 * c2 - i11, t10[6] = s2 * h2, t10[10] = r11 * c2 + e11;
      }
      return t10[3] = 0, t10[7] = 0, t10[11] = 0, t10[12] = 0, t10[13] = 0, t10[14] = 0, t10[15] = 1, this;
    }
    makeRotationFromQuaternion(e10) {
      return this.compose(eC, e10, eP);
    }
    lookAt(e10, t10, i10) {
      let n10 = this.elements;
      return eU.subVectors(e10, t10), 0 === eU.lengthSq() && (eU.z = 1), eU.normalize(), eI.crossVectors(i10, eU), 0 === eI.lengthSq() && (1 === Math.abs(i10.z) ? eU.x += 1e-4 : eU.z += 1e-4, eU.normalize(), eI.crossVectors(i10, eU)), eI.normalize(), eL.crossVectors(eU, eI), n10[0] = eI.x, n10[4] = eL.x, n10[8] = eU.x, n10[1] = eI.y, n10[5] = eL.y, n10[9] = eU.y, n10[2] = eI.z, n10[6] = eL.z, n10[10] = eU.z, this;
    }
    multiply(e10) {
      return this.multiplyMatrices(this, e10);
    }
    premultiply(e10) {
      return this.multiplyMatrices(e10, this);
    }
    multiplyMatrices(e10, t10) {
      let i10 = e10.elements, n10 = t10.elements, r10 = this.elements, a10 = i10[0], s2 = i10[4], o2 = i10[8], l2 = i10[12], h2 = i10[1], c2 = i10[5], u2 = i10[9], d2 = i10[13], p2 = i10[2], f2 = i10[6], m2 = i10[10], g2 = i10[14], _2 = i10[3], v2 = i10[7], x2 = i10[11], y2 = i10[15], M2 = n10[0], S2 = n10[4], E2 = n10[8], T2 = n10[12], b2 = n10[1], A2 = n10[5], w2 = n10[9], R2 = n10[13], C2 = n10[2], P2 = n10[6], I2 = n10[10], L2 = n10[14], U2 = n10[3], D2 = n10[7], N2 = n10[11], O2 = n10[15];
      return r10[0] = a10 * M2 + s2 * b2 + o2 * C2 + l2 * U2, r10[4] = a10 * S2 + s2 * A2 + o2 * P2 + l2 * D2, r10[8] = a10 * E2 + s2 * w2 + o2 * I2 + l2 * N2, r10[12] = a10 * T2 + s2 * R2 + o2 * L2 + l2 * O2, r10[1] = h2 * M2 + c2 * b2 + u2 * C2 + d2 * U2, r10[5] = h2 * S2 + c2 * A2 + u2 * P2 + d2 * D2, r10[9] = h2 * E2 + c2 * w2 + u2 * I2 + d2 * N2, r10[13] = h2 * T2 + c2 * R2 + u2 * L2 + d2 * O2, r10[2] = p2 * M2 + f2 * b2 + m2 * C2 + g2 * U2, r10[6] = p2 * S2 + f2 * A2 + m2 * P2 + g2 * D2, r10[10] = p2 * E2 + f2 * w2 + m2 * I2 + g2 * N2, r10[14] = p2 * T2 + f2 * R2 + m2 * L2 + g2 * O2, r10[3] = _2 * M2 + v2 * b2 + x2 * C2 + y2 * U2, r10[7] = _2 * S2 + v2 * A2 + x2 * P2 + y2 * D2, r10[11] = _2 * E2 + v2 * w2 + x2 * I2 + y2 * N2, r10[15] = _2 * T2 + v2 * R2 + x2 * L2 + y2 * O2, this;
    }
    multiplyScalar(e10) {
      let t10 = this.elements;
      return t10[0] *= e10, t10[4] *= e10, t10[8] *= e10, t10[12] *= e10, t10[1] *= e10, t10[5] *= e10, t10[9] *= e10, t10[13] *= e10, t10[2] *= e10, t10[6] *= e10, t10[10] *= e10, t10[14] *= e10, t10[3] *= e10, t10[7] *= e10, t10[11] *= e10, t10[15] *= e10, this;
    }
    determinant() {
      let e10 = this.elements, t10 = e10[0], i10 = e10[4], n10 = e10[8], r10 = e10[12], a10 = e10[1], s2 = e10[5], o2 = e10[9], l2 = e10[13], h2 = e10[2], c2 = e10[6], u2 = e10[10], d2 = e10[14];
      return e10[3] * (r10 * o2 * c2 - n10 * l2 * c2 - r10 * s2 * u2 + i10 * l2 * u2 + n10 * s2 * d2 - i10 * o2 * d2) + e10[7] * (t10 * o2 * d2 - t10 * l2 * u2 + r10 * a10 * u2 - n10 * a10 * d2 + n10 * l2 * h2 - r10 * o2 * h2) + e10[11] * (t10 * l2 * c2 - t10 * s2 * d2 - r10 * a10 * c2 + i10 * a10 * d2 + r10 * s2 * h2 - i10 * l2 * h2) + e10[15] * (-n10 * s2 * h2 - t10 * o2 * c2 + t10 * s2 * u2 + n10 * a10 * c2 - i10 * a10 * u2 + i10 * o2 * h2);
    }
    transpose() {
      let e10, t10 = this.elements;
      return e10 = t10[1], t10[1] = t10[4], t10[4] = e10, e10 = t10[2], t10[2] = t10[8], t10[8] = e10, e10 = t10[6], t10[6] = t10[9], t10[9] = e10, e10 = t10[3], t10[3] = t10[12], t10[12] = e10, e10 = t10[7], t10[7] = t10[13], t10[13] = e10, e10 = t10[11], t10[11] = t10[14], t10[14] = e10, this;
    }
    setPosition(e10, t10, i10) {
      let n10 = this.elements;
      return e10.isVector3 ? (n10[12] = e10.x, n10[13] = e10.y, n10[14] = e10.z) : (n10[12] = e10, n10[13] = t10, n10[14] = i10), this;
    }
    invert() {
      let e10 = this.elements, t10 = e10[0], i10 = e10[1], n10 = e10[2], r10 = e10[3], a10 = e10[4], s2 = e10[5], o2 = e10[6], l2 = e10[7], h2 = e10[8], c2 = e10[9], u2 = e10[10], d2 = e10[11], p2 = e10[12], f2 = e10[13], m2 = e10[14], g2 = e10[15], _2 = c2 * m2 * l2 - f2 * u2 * l2 + f2 * o2 * d2 - s2 * m2 * d2 - c2 * o2 * g2 + s2 * u2 * g2, v2 = p2 * u2 * l2 - h2 * m2 * l2 - p2 * o2 * d2 + a10 * m2 * d2 + h2 * o2 * g2 - a10 * u2 * g2, x2 = h2 * f2 * l2 - p2 * c2 * l2 + p2 * s2 * d2 - a10 * f2 * d2 - h2 * s2 * g2 + a10 * c2 * g2, y2 = p2 * c2 * o2 - h2 * f2 * o2 - p2 * s2 * u2 + a10 * f2 * u2 + h2 * s2 * m2 - a10 * c2 * m2, M2 = t10 * _2 + i10 * v2 + n10 * x2 + r10 * y2;
      if (0 === M2) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      let S2 = 1 / M2;
      return e10[0] = _2 * S2, e10[1] = (f2 * u2 * r10 - c2 * m2 * r10 - f2 * n10 * d2 + i10 * m2 * d2 + c2 * n10 * g2 - i10 * u2 * g2) * S2, e10[2] = (s2 * m2 * r10 - f2 * o2 * r10 + f2 * n10 * l2 - i10 * m2 * l2 - s2 * n10 * g2 + i10 * o2 * g2) * S2, e10[3] = (c2 * o2 * r10 - s2 * u2 * r10 - c2 * n10 * l2 + i10 * u2 * l2 + s2 * n10 * d2 - i10 * o2 * d2) * S2, e10[4] = v2 * S2, e10[5] = (h2 * m2 * r10 - p2 * u2 * r10 + p2 * n10 * d2 - t10 * m2 * d2 - h2 * n10 * g2 + t10 * u2 * g2) * S2, e10[6] = (p2 * o2 * r10 - a10 * m2 * r10 - p2 * n10 * l2 + t10 * m2 * l2 + a10 * n10 * g2 - t10 * o2 * g2) * S2, e10[7] = (a10 * u2 * r10 - h2 * o2 * r10 + h2 * n10 * l2 - t10 * u2 * l2 - a10 * n10 * d2 + t10 * o2 * d2) * S2, e10[8] = x2 * S2, e10[9] = (p2 * c2 * r10 - h2 * f2 * r10 - p2 * i10 * d2 + t10 * f2 * d2 + h2 * i10 * g2 - t10 * c2 * g2) * S2, e10[10] = (a10 * f2 * r10 - p2 * s2 * r10 + p2 * i10 * l2 - t10 * f2 * l2 - a10 * i10 * g2 + t10 * s2 * g2) * S2, e10[11] = (h2 * s2 * r10 - a10 * c2 * r10 - h2 * i10 * l2 + t10 * c2 * l2 + a10 * i10 * d2 - t10 * s2 * d2) * S2, e10[12] = y2 * S2, e10[13] = (h2 * f2 * n10 - p2 * c2 * n10 + p2 * i10 * u2 - t10 * f2 * u2 - h2 * i10 * m2 + t10 * c2 * m2) * S2, e10[14] = (p2 * s2 * n10 - a10 * f2 * n10 - p2 * i10 * o2 + t10 * f2 * o2 + a10 * i10 * m2 - t10 * s2 * m2) * S2, e10[15] = (a10 * c2 * n10 - h2 * s2 * n10 + h2 * i10 * o2 - t10 * c2 * o2 - a10 * i10 * u2 + t10 * s2 * u2) * S2, this;
    }
    scale(e10) {
      let t10 = this.elements, i10 = e10.x, n10 = e10.y, r10 = e10.z;
      return t10[0] *= i10, t10[4] *= n10, t10[8] *= r10, t10[1] *= i10, t10[5] *= n10, t10[9] *= r10, t10[2] *= i10, t10[6] *= n10, t10[10] *= r10, t10[3] *= i10, t10[7] *= n10, t10[11] *= r10, this;
    }
    getMaxScaleOnAxis() {
      let e10 = this.elements;
      return Math.sqrt(Math.max(e10[0] * e10[0] + e10[1] * e10[1] + e10[2] * e10[2], e10[4] * e10[4] + e10[5] * e10[5] + e10[6] * e10[6], e10[8] * e10[8] + e10[9] * e10[9] + e10[10] * e10[10]));
    }
    makeTranslation(e10, t10, i10) {
      return e10.isVector3 ? this.set(1, 0, 0, e10.x, 0, 1, 0, e10.y, 0, 0, 1, e10.z, 0, 0, 0, 1) : this.set(1, 0, 0, e10, 0, 1, 0, t10, 0, 0, 1, i10, 0, 0, 0, 1), this;
    }
    makeRotationX(e10) {
      let t10 = Math.cos(e10), i10 = Math.sin(e10);
      return this.set(1, 0, 0, 0, 0, t10, -i10, 0, 0, i10, t10, 0, 0, 0, 0, 1), this;
    }
    makeRotationY(e10) {
      let t10 = Math.cos(e10), i10 = Math.sin(e10);
      return this.set(t10, 0, i10, 0, 0, 1, 0, 0, -i10, 0, t10, 0, 0, 0, 0, 1), this;
    }
    makeRotationZ(e10) {
      let t10 = Math.cos(e10), i10 = Math.sin(e10);
      return this.set(t10, -i10, 0, 0, i10, t10, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    makeRotationAxis(e10, t10) {
      let i10 = Math.cos(t10), n10 = Math.sin(t10), r10 = 1 - i10, a10 = e10.x, s2 = e10.y, o2 = e10.z, l2 = r10 * a10, h2 = r10 * s2;
      return this.set(l2 * a10 + i10, l2 * s2 - n10 * o2, l2 * o2 + n10 * s2, 0, l2 * s2 + n10 * o2, h2 * s2 + i10, h2 * o2 - n10 * a10, 0, l2 * o2 - n10 * s2, h2 * o2 + n10 * a10, r10 * o2 * o2 + i10, 0, 0, 0, 0, 1), this;
    }
    makeScale(e10, t10, i10) {
      return this.set(e10, 0, 0, 0, 0, t10, 0, 0, 0, 0, i10, 0, 0, 0, 0, 1), this;
    }
    makeShear(e10, t10, i10, n10, r10, a10) {
      return this.set(1, i10, r10, 0, e10, 1, a10, 0, t10, n10, 1, 0, 0, 0, 0, 1), this;
    }
    compose(e10, t10, i10) {
      let n10 = this.elements, r10 = t10._x, a10 = t10._y, s2 = t10._z, o2 = t10._w, l2 = r10 + r10, h2 = a10 + a10, c2 = s2 + s2, u2 = r10 * l2, d2 = r10 * h2, p2 = r10 * c2, f2 = a10 * h2, m2 = a10 * c2, g2 = s2 * c2, _2 = o2 * l2, v2 = o2 * h2, x2 = o2 * c2, y2 = i10.x, M2 = i10.y, S2 = i10.z;
      return n10[0] = (1 - (f2 + g2)) * y2, n10[1] = (d2 + x2) * y2, n10[2] = (p2 - v2) * y2, n10[3] = 0, n10[4] = (d2 - x2) * M2, n10[5] = (1 - (u2 + g2)) * M2, n10[6] = (m2 + _2) * M2, n10[7] = 0, n10[8] = (p2 + v2) * S2, n10[9] = (m2 - _2) * S2, n10[10] = (1 - (u2 + f2)) * S2, n10[11] = 0, n10[12] = e10.x, n10[13] = e10.y, n10[14] = e10.z, n10[15] = 1, this;
    }
    decompose(e10, t10, i10) {
      let n10 = this.elements, r10 = ew.set(n10[0], n10[1], n10[2]).length(), a10 = ew.set(n10[4], n10[5], n10[6]).length(), s2 = ew.set(n10[8], n10[9], n10[10]).length();
      0 > this.determinant() && (r10 = -r10), e10.x = n10[12], e10.y = n10[13], e10.z = n10[14], eR.copy(this);
      let o2 = 1 / r10, l2 = 1 / a10, h2 = 1 / s2;
      return eR.elements[0] *= o2, eR.elements[1] *= o2, eR.elements[2] *= o2, eR.elements[4] *= l2, eR.elements[5] *= l2, eR.elements[6] *= l2, eR.elements[8] *= h2, eR.elements[9] *= h2, eR.elements[10] *= h2, t10.setFromRotationMatrix(eR), i10.x = r10, i10.y = a10, i10.z = s2, this;
    }
    makePerspective(e10, t10, i10, n10, r10, a10, s2 = 2e3, o2 = false) {
      let l2, h2, c2 = this.elements;
      if (o2) l2 = r10 / (a10 - r10), h2 = a10 * r10 / (a10 - r10);
      else if (2e3 === s2) l2 = -(a10 + r10) / (a10 - r10), h2 = -2 * a10 * r10 / (a10 - r10);
      else if (2001 === s2) l2 = -a10 / (a10 - r10), h2 = -a10 * r10 / (a10 - r10);
      else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + s2);
      return c2[0] = 2 * r10 / (t10 - e10), c2[4] = 0, c2[8] = (t10 + e10) / (t10 - e10), c2[12] = 0, c2[1] = 0, c2[5] = 2 * r10 / (i10 - n10), c2[9] = (i10 + n10) / (i10 - n10), c2[13] = 0, c2[2] = 0, c2[6] = 0, c2[10] = l2, c2[14] = h2, c2[3] = 0, c2[7] = 0, c2[11] = -1, c2[15] = 0, this;
    }
    makeOrthographic(e10, t10, i10, n10, r10, a10, s2 = 2e3, o2 = false) {
      let l2, h2, c2 = this.elements;
      if (o2) l2 = 1 / (a10 - r10), h2 = a10 / (a10 - r10);
      else if (2e3 === s2) l2 = -2 / (a10 - r10), h2 = -(a10 + r10) / (a10 - r10);
      else if (2001 === s2) l2 = -1 / (a10 - r10), h2 = -r10 / (a10 - r10);
      else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + s2);
      return c2[0] = 2 / (t10 - e10), c2[4] = 0, c2[8] = 0, c2[12] = -(t10 + e10) / (t10 - e10), c2[1] = 0, c2[5] = 2 / (i10 - n10), c2[9] = 0, c2[13] = -(i10 + n10) / (i10 - n10), c2[2] = 0, c2[6] = 0, c2[10] = l2, c2[14] = h2, c2[3] = 0, c2[7] = 0, c2[11] = 0, c2[15] = 1, this;
    }
    equals(e10) {
      let t10 = this.elements, i10 = e10.elements;
      for (let e11 = 0; e11 < 16; e11++) if (t10[e11] !== i10[e11]) return false;
      return true;
    }
    fromArray(e10, t10 = 0) {
      for (let i10 = 0; i10 < 16; i10++) this.elements[i10] = e10[i10 + t10];
      return this;
    }
    toArray(e10 = [], t10 = 0) {
      let i10 = this.elements;
      return e10[t10] = i10[0], e10[t10 + 1] = i10[1], e10[t10 + 2] = i10[2], e10[t10 + 3] = i10[3], e10[t10 + 4] = i10[4], e10[t10 + 5] = i10[5], e10[t10 + 6] = i10[6], e10[t10 + 7] = i10[7], e10[t10 + 8] = i10[8], e10[t10 + 9] = i10[9], e10[t10 + 10] = i10[10], e10[t10 + 11] = i10[11], e10[t10 + 12] = i10[12], e10[t10 + 13] = i10[13], e10[t10 + 14] = i10[14], e10[t10 + 15] = i10[15], e10;
    }
  }
  let ew = new b(), eR = new eA(), eC = new b(0, 0, 0), eP = new b(1, 1, 1), eI = new b(), eL = new b(), eU = new b(), eD = new eA(), eN = new T();
  class eO {
    constructor(e10 = 0, t10 = 0, i10 = 0, n10 = eO.DEFAULT_ORDER) {
      this.isEuler = true, this._x = e10, this._y = t10, this._z = i10, this._order = n10;
    }
    get x() {
      return this._x;
    }
    set x(e10) {
      this._x = e10, this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(e10) {
      this._y = e10, this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(e10) {
      this._z = e10, this._onChangeCallback();
    }
    get order() {
      return this._order;
    }
    set order(e10) {
      this._order = e10, this._onChangeCallback();
    }
    set(e10, t10, i10, n10 = this._order) {
      return this._x = e10, this._y = t10, this._z = i10, this._order = n10, this._onChangeCallback(), this;
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(e10) {
      return this._x = e10._x, this._y = e10._y, this._z = e10._z, this._order = e10._order, this._onChangeCallback(), this;
    }
    setFromRotationMatrix(e10, t10 = this._order, i10 = true) {
      let n10 = e10.elements, r10 = n10[0], a10 = n10[4], s2 = n10[8], o2 = n10[1], l2 = n10[5], h2 = n10[9], c2 = n10[2], u2 = n10[6], d2 = n10[10];
      switch (t10) {
        case "XYZ":
          this._y = Math.asin(v(s2, -1, 1)), 0.9999999 > Math.abs(s2) ? (this._x = Math.atan2(-h2, d2), this._z = Math.atan2(-a10, r10)) : (this._x = Math.atan2(u2, l2), this._z = 0);
          break;
        case "YXZ":
          this._x = Math.asin(-v(h2, -1, 1)), 0.9999999 > Math.abs(h2) ? (this._y = Math.atan2(s2, d2), this._z = Math.atan2(o2, l2)) : (this._y = Math.atan2(-c2, r10), this._z = 0);
          break;
        case "ZXY":
          this._x = Math.asin(v(u2, -1, 1)), 0.9999999 > Math.abs(u2) ? (this._y = Math.atan2(-c2, d2), this._z = Math.atan2(-a10, l2)) : (this._y = 0, this._z = Math.atan2(o2, r10));
          break;
        case "ZYX":
          this._y = Math.asin(-v(c2, -1, 1)), 0.9999999 > Math.abs(c2) ? (this._x = Math.atan2(u2, d2), this._z = Math.atan2(o2, r10)) : (this._x = 0, this._z = Math.atan2(-a10, l2));
          break;
        case "YZX":
          this._z = Math.asin(v(o2, -1, 1)), 0.9999999 > Math.abs(o2) ? (this._x = Math.atan2(-h2, l2), this._y = Math.atan2(-c2, r10)) : (this._x = 0, this._y = Math.atan2(s2, d2));
          break;
        case "XZY":
          this._z = Math.asin(-v(a10, -1, 1)), 0.9999999 > Math.abs(a10) ? (this._x = Math.atan2(u2, l2), this._y = Math.atan2(s2, r10)) : (this._x = Math.atan2(-h2, d2), this._y = 0);
          break;
        default:
          console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t10);
      }
      return this._order = t10, true === i10 && this._onChangeCallback(), this;
    }
    setFromQuaternion(e10, t10, i10) {
      return eD.makeRotationFromQuaternion(e10), this.setFromRotationMatrix(eD, t10, i10);
    }
    setFromVector3(e10, t10 = this._order) {
      return this.set(e10.x, e10.y, e10.z, t10);
    }
    reorder(e10) {
      return eN.setFromEuler(this), this.setFromQuaternion(eN, e10);
    }
    equals(e10) {
      return e10._x === this._x && e10._y === this._y && e10._z === this._z && e10._order === this._order;
    }
    fromArray(e10) {
      return this._x = e10[0], this._y = e10[1], this._z = e10[2], void 0 !== e10[3] && (this._order = e10[3]), this._onChangeCallback(), this;
    }
    toArray(e10 = [], t10 = 0) {
      return e10[t10] = this._x, e10[t10 + 1] = this._y, e10[t10 + 2] = this._z, e10[t10 + 3] = this._order, e10;
    }
    _onChange(e10) {
      return this._onChangeCallback = e10, this;
    }
    _onChangeCallback() {
    }
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._order;
    }
  }
  eO.DEFAULT_ORDER = "XYZ";
  class eF {
    constructor() {
      this.mask = 1;
    }
    set(e10) {
      this.mask = 1 << e10 >>> 0;
    }
    enable(e10) {
      this.mask |= 1 << e10;
    }
    enableAll() {
      this.mask = -1;
    }
    toggle(e10) {
      this.mask ^= 1 << e10;
    }
    disable(e10) {
      this.mask &= ~(1 << e10);
    }
    disableAll() {
      this.mask = 0;
    }
    test(e10) {
      return (this.mask & e10.mask) != 0;
    }
    isEnabled(e10) {
      return (this.mask & 1 << e10) != 0;
    }
  }
  let eB = 0, ez = new b(), eV = new T(), eH = new eA(), ek = new b(), eG = new b(), eW = new b(), eX = new T(), ej = new b(1, 0, 0), eq = new b(0, 1, 0), eY = new b(0, 0, 1), eK = { type: "added" }, eJ = { type: "removed" }, eZ = { type: "childadded", child: null }, e$ = { type: "childremoved", child: null };
  class eQ extends d {
    constructor() {
      super(), this.isObject3D = true, Object.defineProperty(this, "id", { value: eB++ }), this.uuid = _(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = eQ.DEFAULT_UP.clone();
      const e10 = new b(), t10 = new eO(), i10 = new T(), n10 = new b(1, 1, 1);
      t10._onChange(function() {
        i10.setFromEuler(t10, false);
      }), i10._onChange(function() {
        t10.setFromQuaternion(i10, void 0, false);
      }), Object.defineProperties(this, { position: { configurable: true, enumerable: true, value: e10 }, rotation: { configurable: true, enumerable: true, value: t10 }, quaternion: { configurable: true, enumerable: true, value: i10 }, scale: { configurable: true, enumerable: true, value: n10 }, modelViewMatrix: { value: new eA() }, normalMatrix: { value: new R() } }), this.matrix = new eA(), this.matrixWorld = new eA(), this.matrixAutoUpdate = eQ.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = eQ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = false, this.layers = new eF(), this.visible = true, this.castShadow = false, this.receiveShadow = false, this.frustumCulled = true, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.userData = {};
    }
    onBeforeShadow() {
    }
    onAfterShadow() {
    }
    onBeforeRender() {
    }
    onAfterRender() {
    }
    applyMatrix4(e10) {
      this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e10), this.matrix.decompose(this.position, this.quaternion, this.scale);
    }
    applyQuaternion(e10) {
      return this.quaternion.premultiply(e10), this;
    }
    setRotationFromAxisAngle(e10, t10) {
      this.quaternion.setFromAxisAngle(e10, t10);
    }
    setRotationFromEuler(e10) {
      this.quaternion.setFromEuler(e10, true);
    }
    setRotationFromMatrix(e10) {
      this.quaternion.setFromRotationMatrix(e10);
    }
    setRotationFromQuaternion(e10) {
      this.quaternion.copy(e10);
    }
    rotateOnAxis(e10, t10) {
      return eV.setFromAxisAngle(e10, t10), this.quaternion.multiply(eV), this;
    }
    rotateOnWorldAxis(e10, t10) {
      return eV.setFromAxisAngle(e10, t10), this.quaternion.premultiply(eV), this;
    }
    rotateX(e10) {
      return this.rotateOnAxis(ej, e10);
    }
    rotateY(e10) {
      return this.rotateOnAxis(eq, e10);
    }
    rotateZ(e10) {
      return this.rotateOnAxis(eY, e10);
    }
    translateOnAxis(e10, t10) {
      return ez.copy(e10).applyQuaternion(this.quaternion), this.position.add(ez.multiplyScalar(t10)), this;
    }
    translateX(e10) {
      return this.translateOnAxis(ej, e10);
    }
    translateY(e10) {
      return this.translateOnAxis(eq, e10);
    }
    translateZ(e10) {
      return this.translateOnAxis(eY, e10);
    }
    localToWorld(e10) {
      return this.updateWorldMatrix(true, false), e10.applyMatrix4(this.matrixWorld);
    }
    worldToLocal(e10) {
      return this.updateWorldMatrix(true, false), e10.applyMatrix4(eH.copy(this.matrixWorld).invert());
    }
    lookAt(e10, t10, i10) {
      e10.isVector3 ? ek.copy(e10) : ek.set(e10, t10, i10);
      let n10 = this.parent;
      this.updateWorldMatrix(true, false), eG.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? eH.lookAt(eG, ek, this.up) : eH.lookAt(ek, eG, this.up), this.quaternion.setFromRotationMatrix(eH), n10 && (eH.extractRotation(n10.matrixWorld), eV.setFromRotationMatrix(eH), this.quaternion.premultiply(eV.invert()));
    }
    add(e10) {
      if (arguments.length > 1) {
        for (let e11 = 0; e11 < arguments.length; e11++) this.add(arguments[e11]);
        return this;
      }
      return e10 === this ? console.error("THREE.Object3D.add: object can't be added as a child of itself.", e10) : e10 && e10.isObject3D ? (e10.removeFromParent(), e10.parent = this, this.children.push(e10), e10.dispatchEvent(eK), eZ.child = e10, this.dispatchEvent(eZ), eZ.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e10), this;
    }
    remove(e10) {
      if (arguments.length > 1) {
        for (let e11 = 0; e11 < arguments.length; e11++) this.remove(arguments[e11]);
        return this;
      }
      let t10 = this.children.indexOf(e10);
      return -1 !== t10 && (e10.parent = null, this.children.splice(t10, 1), e10.dispatchEvent(eJ), e$.child = e10, this.dispatchEvent(e$), e$.child = null), this;
    }
    removeFromParent() {
      let e10 = this.parent;
      return null !== e10 && e10.remove(this), this;
    }
    clear() {
      return this.remove(...this.children);
    }
    attach(e10) {
      return this.updateWorldMatrix(true, false), eH.copy(this.matrixWorld).invert(), null !== e10.parent && (e10.parent.updateWorldMatrix(true, false), eH.multiply(e10.parent.matrixWorld)), e10.applyMatrix4(eH), e10.removeFromParent(), e10.parent = this, this.children.push(e10), e10.updateWorldMatrix(false, true), e10.dispatchEvent(eK), eZ.child = e10, this.dispatchEvent(eZ), eZ.child = null, this;
    }
    getObjectById(e10) {
      return this.getObjectByProperty("id", e10);
    }
    getObjectByName(e10) {
      return this.getObjectByProperty("name", e10);
    }
    getObjectByProperty(e10, t10) {
      if (this[e10] === t10) return this;
      for (let i10 = 0, n10 = this.children.length; i10 < n10; i10++) {
        let n11 = this.children[i10].getObjectByProperty(e10, t10);
        if (void 0 !== n11) return n11;
      }
    }
    getObjectsByProperty(e10, t10, i10 = []) {
      this[e10] === t10 && i10.push(this);
      let n10 = this.children;
      for (let r10 = 0, a10 = n10.length; r10 < a10; r10++) n10[r10].getObjectsByProperty(e10, t10, i10);
      return i10;
    }
    getWorldPosition(e10) {
      return this.updateWorldMatrix(true, false), e10.setFromMatrixPosition(this.matrixWorld);
    }
    getWorldQuaternion(e10) {
      return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(eG, e10, eW), e10;
    }
    getWorldScale(e10) {
      return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(eG, eX, e10), e10;
    }
    getWorldDirection(e10) {
      this.updateWorldMatrix(true, false);
      let t10 = this.matrixWorld.elements;
      return e10.set(t10[8], t10[9], t10[10]).normalize();
    }
    raycast() {
    }
    traverse(e10) {
      e10(this);
      let t10 = this.children;
      for (let i10 = 0, n10 = t10.length; i10 < n10; i10++) t10[i10].traverse(e10);
    }
    traverseVisible(e10) {
      if (false === this.visible) return;
      e10(this);
      let t10 = this.children;
      for (let i10 = 0, n10 = t10.length; i10 < n10; i10++) t10[i10].traverseVisible(e10);
    }
    traverseAncestors(e10) {
      let t10 = this.parent;
      null !== t10 && (e10(t10), t10.traverseAncestors(e10));
    }
    updateMatrix() {
      this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = true;
    }
    updateMatrixWorld(e10) {
      this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e10) && (true === this.matrixWorldAutoUpdate && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = false, e10 = true);
      let t10 = this.children;
      for (let i10 = 0, n10 = t10.length; i10 < n10; i10++) t10[i10].updateMatrixWorld(e10);
    }
    updateWorldMatrix(e10, t10) {
      let i10 = this.parent;
      if (true === e10 && null !== i10 && i10.updateWorldMatrix(true, false), this.matrixAutoUpdate && this.updateMatrix(), true === this.matrixWorldAutoUpdate && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), true === t10) {
        let e11 = this.children;
        for (let t11 = 0, i11 = e11.length; t11 < i11; t11++) e11[t11].updateWorldMatrix(false, true);
      }
    }
    toJSON(e10) {
      let t10 = void 0 === e10 || "string" == typeof e10, i10 = {};
      t10 && (e10 = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {}, skeletons: {}, animations: {}, nodes: {} }, i10.metadata = { version: 4.7, type: "Object", generator: "Object3D.toJSON" });
      let n10 = {};
      function r10(t11, i11) {
        return void 0 === t11[i11.uuid] && (t11[i11.uuid] = i11.toJSON(e10)), i11.uuid;
      }
      if (n10.uuid = this.uuid, n10.type = this.type, "" !== this.name && (n10.name = this.name), true === this.castShadow && (n10.castShadow = true), true === this.receiveShadow && (n10.receiveShadow = true), false === this.visible && (n10.visible = false), false === this.frustumCulled && (n10.frustumCulled = false), 0 !== this.renderOrder && (n10.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (n10.userData = this.userData), n10.layers = this.layers.mask, n10.matrix = this.matrix.toArray(), n10.up = this.up.toArray(), false === this.matrixAutoUpdate && (n10.matrixAutoUpdate = false), this.isInstancedMesh && (n10.type = "InstancedMesh", n10.count = this.count, n10.instanceMatrix = this.instanceMatrix.toJSON(), null !== this.instanceColor && (n10.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (n10.type = "BatchedMesh", n10.perObjectFrustumCulled = this.perObjectFrustumCulled, n10.sortObjects = this.sortObjects, n10.drawRanges = this._drawRanges, n10.reservedRanges = this._reservedRanges, n10.geometryInfo = this._geometryInfo.map((e11) => ({ ...e11, boundingBox: e11.boundingBox ? e11.boundingBox.toJSON() : void 0, boundingSphere: e11.boundingSphere ? e11.boundingSphere.toJSON() : void 0 })), n10.instanceInfo = this._instanceInfo.map((e11) => ({ ...e11 })), n10.availableInstanceIds = this._availableInstanceIds.slice(), n10.availableGeometryIds = this._availableGeometryIds.slice(), n10.nextIndexStart = this._nextIndexStart, n10.nextVertexStart = this._nextVertexStart, n10.geometryCount = this._geometryCount, n10.maxInstanceCount = this._maxInstanceCount, n10.maxVertexCount = this._maxVertexCount, n10.maxIndexCount = this._maxIndexCount, n10.geometryInitialized = this._geometryInitialized, n10.matricesTexture = this._matricesTexture.toJSON(e10), n10.indirectTexture = this._indirectTexture.toJSON(e10), null !== this._colorsTexture && (n10.colorsTexture = this._colorsTexture.toJSON(e10)), null !== this.boundingSphere && (n10.boundingSphere = this.boundingSphere.toJSON()), null !== this.boundingBox && (n10.boundingBox = this.boundingBox.toJSON())), this.isScene) this.background && (this.background.isColor ? n10.background = this.background.toJSON() : this.background.isTexture && (n10.background = this.background.toJSON(e10).uuid)), this.environment && this.environment.isTexture && true !== this.environment.isRenderTargetTexture && (n10.environment = this.environment.toJSON(e10).uuid);
      else if (this.isMesh || this.isLine || this.isPoints) {
        n10.geometry = r10(e10.geometries, this.geometry);
        let t11 = this.geometry.parameters;
        if (void 0 !== t11 && void 0 !== t11.shapes) {
          let i11 = t11.shapes;
          if (Array.isArray(i11)) for (let t12 = 0, n11 = i11.length; t12 < n11; t12++) {
            let n12 = i11[t12];
            r10(e10.shapes, n12);
          }
          else r10(e10.shapes, i11);
        }
      }
      if (this.isSkinnedMesh && (n10.bindMode = this.bindMode, n10.bindMatrix = this.bindMatrix.toArray(), void 0 !== this.skeleton && (r10(e10.skeletons, this.skeleton), n10.skeleton = this.skeleton.uuid)), void 0 !== this.material) if (Array.isArray(this.material)) {
        let t11 = [];
        for (let i11 = 0, n11 = this.material.length; i11 < n11; i11++) t11.push(r10(e10.materials, this.material[i11]));
        n10.material = t11;
      } else n10.material = r10(e10.materials, this.material);
      if (this.children.length > 0) {
        n10.children = [];
        for (let t11 = 0; t11 < this.children.length; t11++) n10.children.push(this.children[t11].toJSON(e10).object);
      }
      if (this.animations.length > 0) {
        n10.animations = [];
        for (let t11 = 0; t11 < this.animations.length; t11++) {
          let i11 = this.animations[t11];
          n10.animations.push(r10(e10.animations, i11));
        }
      }
      if (t10) {
        let t11 = a10(e10.geometries), n11 = a10(e10.materials), r11 = a10(e10.textures), s2 = a10(e10.images), o2 = a10(e10.shapes), l2 = a10(e10.skeletons), h2 = a10(e10.animations), c2 = a10(e10.nodes);
        t11.length > 0 && (i10.geometries = t11), n11.length > 0 && (i10.materials = n11), r11.length > 0 && (i10.textures = r11), s2.length > 0 && (i10.images = s2), o2.length > 0 && (i10.shapes = o2), l2.length > 0 && (i10.skeletons = l2), h2.length > 0 && (i10.animations = h2), c2.length > 0 && (i10.nodes = c2);
      }
      return i10.object = n10, i10;
      function a10(e11) {
        let t11 = [];
        for (let i11 in e11) {
          let n11 = e11[i11];
          delete n11.metadata, t11.push(n11);
        }
        return t11;
      }
    }
    clone(e10) {
      return new this.constructor().copy(this, e10);
    }
    copy(e10, t10 = true) {
      if (this.name = e10.name, this.up.copy(e10.up), this.position.copy(e10.position), this.rotation.order = e10.rotation.order, this.quaternion.copy(e10.quaternion), this.scale.copy(e10.scale), this.matrix.copy(e10.matrix), this.matrixWorld.copy(e10.matrixWorld), this.matrixAutoUpdate = e10.matrixAutoUpdate, this.matrixWorldAutoUpdate = e10.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e10.matrixWorldNeedsUpdate, this.layers.mask = e10.layers.mask, this.visible = e10.visible, this.castShadow = e10.castShadow, this.receiveShadow = e10.receiveShadow, this.frustumCulled = e10.frustumCulled, this.renderOrder = e10.renderOrder, this.animations = e10.animations.slice(), this.userData = JSON.parse(JSON.stringify(e10.userData)), true === t10) for (let t11 = 0; t11 < e10.children.length; t11++) {
        let i10 = e10.children[t11];
        this.add(i10.clone());
      }
      return this;
    }
  }
  eQ.DEFAULT_UP = new b(0, 1, 0), eQ.DEFAULT_MATRIX_AUTO_UPDATE = true, eQ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
  let e0 = new b(), e1 = new b(), e2 = new b(), e3 = new b(), e4 = new b(), e5 = new b(), e6 = new b(), e8 = new b(), e9 = new b(), e7 = new b(), te = new Y(), tt = new Y(), ti = new Y();
  class tn {
    constructor(e10 = new b(), t10 = new b(), i10 = new b()) {
      this.a = e10, this.b = t10, this.c = i10;
    }
    static getNormal(e10, t10, i10, n10) {
      n10.subVectors(i10, t10), e0.subVectors(e10, t10), n10.cross(e0);
      let r10 = n10.lengthSq();
      return r10 > 0 ? n10.multiplyScalar(1 / Math.sqrt(r10)) : n10.set(0, 0, 0);
    }
    static getBarycoord(e10, t10, i10, n10, r10) {
      e0.subVectors(n10, t10), e1.subVectors(i10, t10), e2.subVectors(e10, t10);
      let a10 = e0.dot(e0), s2 = e0.dot(e1), o2 = e0.dot(e2), l2 = e1.dot(e1), h2 = e1.dot(e2), c2 = a10 * l2 - s2 * s2;
      if (0 === c2) return r10.set(0, 0, 0), null;
      let u2 = 1 / c2, d2 = (l2 * o2 - s2 * h2) * u2, p2 = (a10 * h2 - s2 * o2) * u2;
      return r10.set(1 - d2 - p2, p2, d2);
    }
    static containsPoint(e10, t10, i10, n10) {
      return null !== this.getBarycoord(e10, t10, i10, n10, e3) && e3.x >= 0 && e3.y >= 0 && e3.x + e3.y <= 1;
    }
    static getInterpolation(e10, t10, i10, n10, r10, a10, s2, o2) {
      return null === this.getBarycoord(e10, t10, i10, n10, e3) ? (o2.x = 0, o2.y = 0, "z" in o2 && (o2.z = 0), "w" in o2 && (o2.w = 0), null) : (o2.setScalar(0), o2.addScaledVector(r10, e3.x), o2.addScaledVector(a10, e3.y), o2.addScaledVector(s2, e3.z), o2);
    }
    static getInterpolatedAttribute(e10, t10, i10, n10, r10, a10) {
      return te.setScalar(0), tt.setScalar(0), ti.setScalar(0), te.fromBufferAttribute(e10, t10), tt.fromBufferAttribute(e10, i10), ti.fromBufferAttribute(e10, n10), a10.setScalar(0), a10.addScaledVector(te, r10.x), a10.addScaledVector(tt, r10.y), a10.addScaledVector(ti, r10.z), a10;
    }
    static isFrontFacing(e10, t10, i10, n10) {
      return e0.subVectors(i10, t10), e1.subVectors(e10, t10), 0 > e0.cross(e1).dot(n10);
    }
    set(e10, t10, i10) {
      return this.a.copy(e10), this.b.copy(t10), this.c.copy(i10), this;
    }
    setFromPointsAndIndices(e10, t10, i10, n10) {
      return this.a.copy(e10[t10]), this.b.copy(e10[i10]), this.c.copy(e10[n10]), this;
    }
    setFromAttributeAndIndices(e10, t10, i10, n10) {
      return this.a.fromBufferAttribute(e10, t10), this.b.fromBufferAttribute(e10, i10), this.c.fromBufferAttribute(e10, n10), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e10) {
      return this.a.copy(e10.a), this.b.copy(e10.b), this.c.copy(e10.c), this;
    }
    getArea() {
      return e0.subVectors(this.c, this.b), e1.subVectors(this.a, this.b), 0.5 * e0.cross(e1).length();
    }
    getMidpoint(e10) {
      return e10.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
    }
    getNormal(e10) {
      return tn.getNormal(this.a, this.b, this.c, e10);
    }
    getPlane(e10) {
      return e10.setFromCoplanarPoints(this.a, this.b, this.c);
    }
    getBarycoord(e10, t10) {
      return tn.getBarycoord(e10, this.a, this.b, this.c, t10);
    }
    getInterpolation(e10, t10, i10, n10, r10) {
      return tn.getInterpolation(e10, this.a, this.b, this.c, t10, i10, n10, r10);
    }
    containsPoint(e10) {
      return tn.containsPoint(e10, this.a, this.b, this.c);
    }
    isFrontFacing(e10) {
      return tn.isFrontFacing(this.a, this.b, this.c, e10);
    }
    intersectsBox(e10) {
      return e10.intersectsTriangle(this);
    }
    closestPointToPoint(e10, t10) {
      let i10, n10, r10 = this.a, a10 = this.b, s2 = this.c;
      e4.subVectors(a10, r10), e5.subVectors(s2, r10), e8.subVectors(e10, r10);
      let o2 = e4.dot(e8), l2 = e5.dot(e8);
      if (o2 <= 0 && l2 <= 0) return t10.copy(r10);
      e9.subVectors(e10, a10);
      let h2 = e4.dot(e9), c2 = e5.dot(e9);
      if (h2 >= 0 && c2 <= h2) return t10.copy(a10);
      let u2 = o2 * c2 - h2 * l2;
      if (u2 <= 0 && o2 >= 0 && h2 <= 0) return i10 = o2 / (o2 - h2), t10.copy(r10).addScaledVector(e4, i10);
      e7.subVectors(e10, s2);
      let d2 = e4.dot(e7), p2 = e5.dot(e7);
      if (p2 >= 0 && d2 <= p2) return t10.copy(s2);
      let f2 = d2 * l2 - o2 * p2;
      if (f2 <= 0 && l2 >= 0 && p2 <= 0) return n10 = l2 / (l2 - p2), t10.copy(r10).addScaledVector(e5, n10);
      let m2 = h2 * p2 - d2 * c2;
      if (m2 <= 0 && c2 - h2 >= 0 && d2 - p2 >= 0) return e6.subVectors(s2, a10), n10 = (c2 - h2) / (c2 - h2 + (d2 - p2)), t10.copy(a10).addScaledVector(e6, n10);
      let g2 = 1 / (m2 + f2 + u2);
      return i10 = f2 * g2, n10 = u2 * g2, t10.copy(r10).addScaledVector(e4, i10).addScaledVector(e5, n10);
    }
    equals(e10) {
      return e10.a.equals(this.a) && e10.b.equals(this.b) && e10.c.equals(this.c);
    }
  }
  let tr = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 }, ta = { h: 0, s: 0, l: 0 }, ts = { h: 0, s: 0, l: 0 };
  function to(e10, t10, i10) {
    return (i10 < 0 && (i10 += 1), i10 > 1 && (i10 -= 1), i10 < 1 / 6) ? e10 + (t10 - e10) * 6 * i10 : i10 < 0.5 ? t10 : i10 < 2 / 3 ? e10 + (t10 - e10) * 6 * (2 / 3 - i10) : e10;
  }
  class tl {
    constructor(e10, t10, i10) {
      return this.isColor = true, this.r = 1, this.g = 1, this.b = 1, this.set(e10, t10, i10);
    }
    set(e10, t10, i10) {
      return void 0 === t10 && void 0 === i10 ? e10 && e10.isColor ? this.copy(e10) : "number" == typeof e10 ? this.setHex(e10) : "string" == typeof e10 && this.setStyle(e10) : this.setRGB(e10, t10, i10), this;
    }
    setScalar(e10) {
      return this.r = e10, this.g = e10, this.b = e10, this;
    }
    setHex(e10, t10 = o) {
      return e10 = Math.floor(e10), this.r = (e10 >> 16 & 255) / 255, this.g = (e10 >> 8 & 255) / 255, this.b = (255 & e10) / 255, B.colorSpaceToWorking(this, t10), this;
    }
    setRGB(e10, t10, i10, n10 = B.workingColorSpace) {
      return this.r = e10, this.g = t10, this.b = i10, B.colorSpaceToWorking(this, n10), this;
    }
    setHSL(e10, t10, i10, n10 = B.workingColorSpace) {
      if (e10 = x(e10, 1), t10 = v(t10, 0, 1), i10 = v(i10, 0, 1), 0 === t10) this.r = this.g = this.b = i10;
      else {
        let n11 = i10 <= 0.5 ? i10 * (1 + t10) : i10 + t10 - i10 * t10, r10 = 2 * i10 - n11;
        this.r = to(r10, n11, e10 + 1 / 3), this.g = to(r10, n11, e10), this.b = to(r10, n11, e10 - 1 / 3);
      }
      return B.colorSpaceToWorking(this, n10), this;
    }
    setStyle(e10, t10 = o) {
      let i10;
      function n10(t11) {
        void 0 !== t11 && 1 > parseFloat(t11) && console.warn("THREE.Color: Alpha component of " + e10 + " will be ignored.");
      }
      if (i10 = /^(\w+)\(([^\)]*)\)/.exec(e10)) {
        let r10, a10 = i10[1], s2 = i10[2];
        switch (a10) {
          case "rgb":
          case "rgba":
            if (r10 = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s2)) return n10(r10[4]), this.setRGB(Math.min(255, parseInt(r10[1], 10)) / 255, Math.min(255, parseInt(r10[2], 10)) / 255, Math.min(255, parseInt(r10[3], 10)) / 255, t10);
            if (r10 = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s2)) return n10(r10[4]), this.setRGB(Math.min(100, parseInt(r10[1], 10)) / 100, Math.min(100, parseInt(r10[2], 10)) / 100, Math.min(100, parseInt(r10[3], 10)) / 100, t10);
            break;
          case "hsl":
          case "hsla":
            if (r10 = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s2)) return n10(r10[4]), this.setHSL(parseFloat(r10[1]) / 360, parseFloat(r10[2]) / 100, parseFloat(r10[3]) / 100, t10);
            break;
          default:
            console.warn("THREE.Color: Unknown color model " + e10);
        }
      } else if (i10 = /^\#([A-Fa-f\d]+)$/.exec(e10)) {
        let n11 = i10[1], r10 = n11.length;
        if (3 === r10) return this.setRGB(parseInt(n11.charAt(0), 16) / 15, parseInt(n11.charAt(1), 16) / 15, parseInt(n11.charAt(2), 16) / 15, t10);
        if (6 === r10) return this.setHex(parseInt(n11, 16), t10);
        console.warn("THREE.Color: Invalid hex color " + e10);
      } else if (e10 && e10.length > 0) return this.setColorName(e10, t10);
      return this;
    }
    setColorName(e10, t10 = o) {
      let i10 = tr[e10.toLowerCase()];
      return void 0 !== i10 ? this.setHex(i10, t10) : console.warn("THREE.Color: Unknown color " + e10), this;
    }
    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
    copy(e10) {
      return this.r = e10.r, this.g = e10.g, this.b = e10.b, this;
    }
    copySRGBToLinear(e10) {
      return this.r = z(e10.r), this.g = z(e10.g), this.b = z(e10.b), this;
    }
    copyLinearToSRGB(e10) {
      return this.r = V(e10.r), this.g = V(e10.g), this.b = V(e10.b), this;
    }
    convertSRGBToLinear() {
      return this.copySRGBToLinear(this), this;
    }
    convertLinearToSRGB() {
      return this.copyLinearToSRGB(this), this;
    }
    getHex(e10 = o) {
      return B.workingToColorSpace(th.copy(this), e10), 65536 * Math.round(v(255 * th.r, 0, 255)) + 256 * Math.round(v(255 * th.g, 0, 255)) + Math.round(v(255 * th.b, 0, 255));
    }
    getHexString(e10 = o) {
      return ("000000" + this.getHex(e10).toString(16)).slice(-6);
    }
    getHSL(e10, t10 = B.workingColorSpace) {
      let i10, n10;
      B.workingToColorSpace(th.copy(this), t10);
      let r10 = th.r, a10 = th.g, s2 = th.b, o2 = Math.max(r10, a10, s2), l2 = Math.min(r10, a10, s2), h2 = (l2 + o2) / 2;
      if (l2 === o2) i10 = 0, n10 = 0;
      else {
        let e11 = o2 - l2;
        switch (n10 = h2 <= 0.5 ? e11 / (o2 + l2) : e11 / (2 - o2 - l2), o2) {
          case r10:
            i10 = (a10 - s2) / e11 + 6 * (a10 < s2);
            break;
          case a10:
            i10 = (s2 - r10) / e11 + 2;
            break;
          case s2:
            i10 = (r10 - a10) / e11 + 4;
        }
        i10 /= 6;
      }
      return e10.h = i10, e10.s = n10, e10.l = h2, e10;
    }
    getRGB(e10, t10 = B.workingColorSpace) {
      return B.workingToColorSpace(th.copy(this), t10), e10.r = th.r, e10.g = th.g, e10.b = th.b, e10;
    }
    getStyle(e10 = o) {
      B.workingToColorSpace(th.copy(this), e10);
      let t10 = th.r, i10 = th.g, n10 = th.b;
      return e10 !== o ? `color(${e10} ${t10.toFixed(3)} ${i10.toFixed(3)} ${n10.toFixed(3)})` : `rgb(${Math.round(255 * t10)},${Math.round(255 * i10)},${Math.round(255 * n10)})`;
    }
    offsetHSL(e10, t10, i10) {
      return this.getHSL(ta), this.setHSL(ta.h + e10, ta.s + t10, ta.l + i10);
    }
    add(e10) {
      return this.r += e10.r, this.g += e10.g, this.b += e10.b, this;
    }
    addColors(e10, t10) {
      return this.r = e10.r + t10.r, this.g = e10.g + t10.g, this.b = e10.b + t10.b, this;
    }
    addScalar(e10) {
      return this.r += e10, this.g += e10, this.b += e10, this;
    }
    sub(e10) {
      return this.r = Math.max(0, this.r - e10.r), this.g = Math.max(0, this.g - e10.g), this.b = Math.max(0, this.b - e10.b), this;
    }
    multiply(e10) {
      return this.r *= e10.r, this.g *= e10.g, this.b *= e10.b, this;
    }
    multiplyScalar(e10) {
      return this.r *= e10, this.g *= e10, this.b *= e10, this;
    }
    lerp(e10, t10) {
      return this.r += (e10.r - this.r) * t10, this.g += (e10.g - this.g) * t10, this.b += (e10.b - this.b) * t10, this;
    }
    lerpColors(e10, t10, i10) {
      return this.r = e10.r + (t10.r - e10.r) * i10, this.g = e10.g + (t10.g - e10.g) * i10, this.b = e10.b + (t10.b - e10.b) * i10, this;
    }
    lerpHSL(e10, t10) {
      this.getHSL(ta), e10.getHSL(ts);
      let i10 = y(ta.h, ts.h, t10), n10 = y(ta.s, ts.s, t10), r10 = y(ta.l, ts.l, t10);
      return this.setHSL(i10, n10, r10), this;
    }
    setFromVector3(e10) {
      return this.r = e10.x, this.g = e10.y, this.b = e10.z, this;
    }
    applyMatrix3(e10) {
      let t10 = this.r, i10 = this.g, n10 = this.b, r10 = e10.elements;
      return this.r = r10[0] * t10 + r10[3] * i10 + r10[6] * n10, this.g = r10[1] * t10 + r10[4] * i10 + r10[7] * n10, this.b = r10[2] * t10 + r10[5] * i10 + r10[8] * n10, this;
    }
    equals(e10) {
      return e10.r === this.r && e10.g === this.g && e10.b === this.b;
    }
    fromArray(e10, t10 = 0) {
      return this.r = e10[t10], this.g = e10[t10 + 1], this.b = e10[t10 + 2], this;
    }
    toArray(e10 = [], t10 = 0) {
      return e10[t10] = this.r, e10[t10 + 1] = this.g, e10[t10 + 2] = this.b, e10;
    }
    fromBufferAttribute(e10, t10) {
      return this.r = e10.getX(t10), this.g = e10.getY(t10), this.b = e10.getZ(t10), this;
    }
    toJSON() {
      return this.getHex();
    }
    *[Symbol.iterator]() {
      yield this.r, yield this.g, yield this.b;
    }
  }
  let th = new tl();
  tl.NAMES = tr;
  let tc = 0;
  class tu extends d {
    constructor() {
      super(), this.isMaterial = true, Object.defineProperty(this, "id", { value: tc++ }), this.uuid = _(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = false, this.opacity = 1, this.transparent = false, this.alphaHash = false, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new tl(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = true, this.depthWrite = true, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = false, this.clippingPlanes = null, this.clipIntersection = false, this.clipShadows = false, this.shadowSide = null, this.colorWrite = true, this.precision = null, this.polygonOffset = false, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = false, this.alphaToCoverage = false, this.premultipliedAlpha = false, this.forceSinglePass = false, this.allowOverride = true, this.visible = true, this.toneMapped = true, this.userData = {}, this.version = 0, this._alphaTest = 0;
    }
    get alphaTest() {
      return this._alphaTest;
    }
    set alphaTest(e10) {
      this._alphaTest > 0 != e10 > 0 && this.version++, this._alphaTest = e10;
    }
    onBeforeRender() {
    }
    onBeforeCompile() {
    }
    customProgramCacheKey() {
      return this.onBeforeCompile.toString();
    }
    setValues(e10) {
      if (void 0 !== e10) for (let t10 in e10) {
        let i10 = e10[t10];
        if (void 0 === i10) {
          console.warn(`THREE.Material: parameter '${t10}' has value of undefined.`);
          continue;
        }
        let n10 = this[t10];
        if (void 0 === n10) {
          console.warn(`THREE.Material: '${t10}' is not a property of THREE.${this.type}.`);
          continue;
        }
        n10 && n10.isColor ? n10.set(i10) : n10 && n10.isVector3 && i10 && i10.isVector3 ? n10.copy(i10) : this[t10] = i10;
      }
    }
    toJSON(e10) {
      let t10 = void 0 === e10 || "string" == typeof e10;
      t10 && (e10 = { textures: {}, images: {} });
      let i10 = { metadata: { version: 4.7, type: "Material", generator: "Material.toJSON" } };
      function n10(e11) {
        let t11 = [];
        for (let i11 in e11) {
          let n11 = e11[i11];
          delete n11.metadata, t11.push(n11);
        }
        return t11;
      }
      if (i10.uuid = this.uuid, i10.type = this.type, "" !== this.name && (i10.name = this.name), this.color && this.color.isColor && (i10.color = this.color.getHex()), void 0 !== this.roughness && (i10.roughness = this.roughness), void 0 !== this.metalness && (i10.metalness = this.metalness), void 0 !== this.sheen && (i10.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (i10.sheenColor = this.sheenColor.getHex()), void 0 !== this.sheenRoughness && (i10.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (i10.emissive = this.emissive.getHex()), void 0 !== this.emissiveIntensity && 1 !== this.emissiveIntensity && (i10.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (i10.specular = this.specular.getHex()), void 0 !== this.specularIntensity && (i10.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (i10.specularColor = this.specularColor.getHex()), void 0 !== this.shininess && (i10.shininess = this.shininess), void 0 !== this.clearcoat && (i10.clearcoat = this.clearcoat), void 0 !== this.clearcoatRoughness && (i10.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (i10.clearcoatMap = this.clearcoatMap.toJSON(e10).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (i10.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e10).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (i10.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e10).uuid, i10.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (i10.sheenColorMap = this.sheenColorMap.toJSON(e10).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (i10.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e10).uuid), void 0 !== this.dispersion && (i10.dispersion = this.dispersion), void 0 !== this.iridescence && (i10.iridescence = this.iridescence), void 0 !== this.iridescenceIOR && (i10.iridescenceIOR = this.iridescenceIOR), void 0 !== this.iridescenceThicknessRange && (i10.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (i10.iridescenceMap = this.iridescenceMap.toJSON(e10).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (i10.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e10).uuid), void 0 !== this.anisotropy && (i10.anisotropy = this.anisotropy), void 0 !== this.anisotropyRotation && (i10.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (i10.anisotropyMap = this.anisotropyMap.toJSON(e10).uuid), this.map && this.map.isTexture && (i10.map = this.map.toJSON(e10).uuid), this.matcap && this.matcap.isTexture && (i10.matcap = this.matcap.toJSON(e10).uuid), this.alphaMap && this.alphaMap.isTexture && (i10.alphaMap = this.alphaMap.toJSON(e10).uuid), this.lightMap && this.lightMap.isTexture && (i10.lightMap = this.lightMap.toJSON(e10).uuid, i10.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (i10.aoMap = this.aoMap.toJSON(e10).uuid, i10.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (i10.bumpMap = this.bumpMap.toJSON(e10).uuid, i10.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (i10.normalMap = this.normalMap.toJSON(e10).uuid, i10.normalMapType = this.normalMapType, i10.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (i10.displacementMap = this.displacementMap.toJSON(e10).uuid, i10.displacementScale = this.displacementScale, i10.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (i10.roughnessMap = this.roughnessMap.toJSON(e10).uuid), this.metalnessMap && this.metalnessMap.isTexture && (i10.metalnessMap = this.metalnessMap.toJSON(e10).uuid), this.emissiveMap && this.emissiveMap.isTexture && (i10.emissiveMap = this.emissiveMap.toJSON(e10).uuid), this.specularMap && this.specularMap.isTexture && (i10.specularMap = this.specularMap.toJSON(e10).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (i10.specularIntensityMap = this.specularIntensityMap.toJSON(e10).uuid), this.specularColorMap && this.specularColorMap.isTexture && (i10.specularColorMap = this.specularColorMap.toJSON(e10).uuid), this.envMap && this.envMap.isTexture && (i10.envMap = this.envMap.toJSON(e10).uuid, void 0 !== this.combine && (i10.combine = this.combine)), void 0 !== this.envMapRotation && (i10.envMapRotation = this.envMapRotation.toArray()), void 0 !== this.envMapIntensity && (i10.envMapIntensity = this.envMapIntensity), void 0 !== this.reflectivity && (i10.reflectivity = this.reflectivity), void 0 !== this.refractionRatio && (i10.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (i10.gradientMap = this.gradientMap.toJSON(e10).uuid), void 0 !== this.transmission && (i10.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (i10.transmissionMap = this.transmissionMap.toJSON(e10).uuid), void 0 !== this.thickness && (i10.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (i10.thicknessMap = this.thicknessMap.toJSON(e10).uuid), void 0 !== this.attenuationDistance && this.attenuationDistance !== 1 / 0 && (i10.attenuationDistance = this.attenuationDistance), void 0 !== this.attenuationColor && (i10.attenuationColor = this.attenuationColor.getHex()), void 0 !== this.size && (i10.size = this.size), null !== this.shadowSide && (i10.shadowSide = this.shadowSide), void 0 !== this.sizeAttenuation && (i10.sizeAttenuation = this.sizeAttenuation), 1 !== this.blending && (i10.blending = this.blending), 0 !== this.side && (i10.side = this.side), true === this.vertexColors && (i10.vertexColors = true), this.opacity < 1 && (i10.opacity = this.opacity), true === this.transparent && (i10.transparent = true), 204 !== this.blendSrc && (i10.blendSrc = this.blendSrc), 205 !== this.blendDst && (i10.blendDst = this.blendDst), 100 !== this.blendEquation && (i10.blendEquation = this.blendEquation), null !== this.blendSrcAlpha && (i10.blendSrcAlpha = this.blendSrcAlpha), null !== this.blendDstAlpha && (i10.blendDstAlpha = this.blendDstAlpha), null !== this.blendEquationAlpha && (i10.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (i10.blendColor = this.blendColor.getHex()), 0 !== this.blendAlpha && (i10.blendAlpha = this.blendAlpha), 3 !== this.depthFunc && (i10.depthFunc = this.depthFunc), false === this.depthTest && (i10.depthTest = this.depthTest), false === this.depthWrite && (i10.depthWrite = this.depthWrite), false === this.colorWrite && (i10.colorWrite = this.colorWrite), 255 !== this.stencilWriteMask && (i10.stencilWriteMask = this.stencilWriteMask), 519 !== this.stencilFunc && (i10.stencilFunc = this.stencilFunc), 0 !== this.stencilRef && (i10.stencilRef = this.stencilRef), 255 !== this.stencilFuncMask && (i10.stencilFuncMask = this.stencilFuncMask), 7680 !== this.stencilFail && (i10.stencilFail = this.stencilFail), 7680 !== this.stencilZFail && (i10.stencilZFail = this.stencilZFail), 7680 !== this.stencilZPass && (i10.stencilZPass = this.stencilZPass), true === this.stencilWrite && (i10.stencilWrite = this.stencilWrite), void 0 !== this.rotation && 0 !== this.rotation && (i10.rotation = this.rotation), true === this.polygonOffset && (i10.polygonOffset = true), 0 !== this.polygonOffsetFactor && (i10.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (i10.polygonOffsetUnits = this.polygonOffsetUnits), void 0 !== this.linewidth && 1 !== this.linewidth && (i10.linewidth = this.linewidth), void 0 !== this.dashSize && (i10.dashSize = this.dashSize), void 0 !== this.gapSize && (i10.gapSize = this.gapSize), void 0 !== this.scale && (i10.scale = this.scale), true === this.dithering && (i10.dithering = true), this.alphaTest > 0 && (i10.alphaTest = this.alphaTest), true === this.alphaHash && (i10.alphaHash = true), true === this.alphaToCoverage && (i10.alphaToCoverage = true), true === this.premultipliedAlpha && (i10.premultipliedAlpha = true), true === this.forceSinglePass && (i10.forceSinglePass = true), true === this.wireframe && (i10.wireframe = true), this.wireframeLinewidth > 1 && (i10.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (i10.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (i10.wireframeLinejoin = this.wireframeLinejoin), true === this.flatShading && (i10.flatShading = true), false === this.visible && (i10.visible = false), false === this.toneMapped && (i10.toneMapped = false), false === this.fog && (i10.fog = false), Object.keys(this.userData).length > 0 && (i10.userData = this.userData), t10) {
        let t11 = n10(e10.textures), r10 = n10(e10.images);
        t11.length > 0 && (i10.textures = t11), r10.length > 0 && (i10.images = r10);
      }
      return i10;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e10) {
      this.name = e10.name, this.blending = e10.blending, this.side = e10.side, this.vertexColors = e10.vertexColors, this.opacity = e10.opacity, this.transparent = e10.transparent, this.blendSrc = e10.blendSrc, this.blendDst = e10.blendDst, this.blendEquation = e10.blendEquation, this.blendSrcAlpha = e10.blendSrcAlpha, this.blendDstAlpha = e10.blendDstAlpha, this.blendEquationAlpha = e10.blendEquationAlpha, this.blendColor.copy(e10.blendColor), this.blendAlpha = e10.blendAlpha, this.depthFunc = e10.depthFunc, this.depthTest = e10.depthTest, this.depthWrite = e10.depthWrite, this.stencilWriteMask = e10.stencilWriteMask, this.stencilFunc = e10.stencilFunc, this.stencilRef = e10.stencilRef, this.stencilFuncMask = e10.stencilFuncMask, this.stencilFail = e10.stencilFail, this.stencilZFail = e10.stencilZFail, this.stencilZPass = e10.stencilZPass, this.stencilWrite = e10.stencilWrite;
      let t10 = e10.clippingPlanes, i10 = null;
      if (null !== t10) {
        let e11 = t10.length;
        i10 = Array(e11);
        for (let n10 = 0; n10 !== e11; ++n10) i10[n10] = t10[n10].clone();
      }
      return this.clippingPlanes = i10, this.clipIntersection = e10.clipIntersection, this.clipShadows = e10.clipShadows, this.shadowSide = e10.shadowSide, this.colorWrite = e10.colorWrite, this.precision = e10.precision, this.polygonOffset = e10.polygonOffset, this.polygonOffsetFactor = e10.polygonOffsetFactor, this.polygonOffsetUnits = e10.polygonOffsetUnits, this.dithering = e10.dithering, this.alphaTest = e10.alphaTest, this.alphaHash = e10.alphaHash, this.alphaToCoverage = e10.alphaToCoverage, this.premultipliedAlpha = e10.premultipliedAlpha, this.forceSinglePass = e10.forceSinglePass, this.visible = e10.visible, this.toneMapped = e10.toneMapped, this.userData = JSON.parse(JSON.stringify(e10.userData)), this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    set needsUpdate(e10) {
      true === e10 && this.version++;
    }
  }
  class td extends tu {
    constructor(e10) {
      super(), this.isMeshBasicMaterial = true, this.type = "MeshBasicMaterial", this.color = new tl(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new eO(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = true, this.setValues(e10);
    }
    copy(e10) {
      return super.copy(e10), this.color.copy(e10.color), this.map = e10.map, this.lightMap = e10.lightMap, this.lightMapIntensity = e10.lightMapIntensity, this.aoMap = e10.aoMap, this.aoMapIntensity = e10.aoMapIntensity, this.specularMap = e10.specularMap, this.alphaMap = e10.alphaMap, this.envMap = e10.envMap, this.envMapRotation.copy(e10.envMapRotation), this.combine = e10.combine, this.reflectivity = e10.reflectivity, this.refractionRatio = e10.refractionRatio, this.wireframe = e10.wireframe, this.wireframeLinewidth = e10.wireframeLinewidth, this.wireframeLinecap = e10.wireframeLinecap, this.wireframeLinejoin = e10.wireframeLinejoin, this.fog = e10.fog, this;
    }
  }
  let tp = new b(), tf = new E(), tm = 0;
  class tg {
    constructor(e10, t10, i10 = false) {
      if (Array.isArray(e10)) throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");
      this.isBufferAttribute = true, Object.defineProperty(this, "id", { value: tm++ }), this.name = "", this.array = e10, this.itemSize = t10, this.count = void 0 !== e10 ? e10.length / t10 : 0, this.normalized = i10, this.usage = 35044, this.updateRanges = [], this.gpuType = 1015, this.version = 0;
    }
    onUploadCallback() {
    }
    set needsUpdate(e10) {
      true === e10 && this.version++;
    }
    setUsage(e10) {
      return this.usage = e10, this;
    }
    addUpdateRange(e10, t10) {
      this.updateRanges.push({ start: e10, count: t10 });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    copy(e10) {
      return this.name = e10.name, this.array = new e10.array.constructor(e10.array), this.itemSize = e10.itemSize, this.count = e10.count, this.normalized = e10.normalized, this.usage = e10.usage, this.gpuType = e10.gpuType, this;
    }
    copyAt(e10, t10, i10) {
      e10 *= this.itemSize, i10 *= t10.itemSize;
      for (let n10 = 0, r10 = this.itemSize; n10 < r10; n10++) this.array[e10 + n10] = t10.array[i10 + n10];
      return this;
    }
    copyArray(e10) {
      return this.array.set(e10), this;
    }
    applyMatrix3(e10) {
      if (2 === this.itemSize) for (let t10 = 0, i10 = this.count; t10 < i10; t10++) tf.fromBufferAttribute(this, t10), tf.applyMatrix3(e10), this.setXY(t10, tf.x, tf.y);
      else if (3 === this.itemSize) for (let t10 = 0, i10 = this.count; t10 < i10; t10++) tp.fromBufferAttribute(this, t10), tp.applyMatrix3(e10), this.setXYZ(t10, tp.x, tp.y, tp.z);
      return this;
    }
    applyMatrix4(e10) {
      for (let t10 = 0, i10 = this.count; t10 < i10; t10++) tp.fromBufferAttribute(this, t10), tp.applyMatrix4(e10), this.setXYZ(t10, tp.x, tp.y, tp.z);
      return this;
    }
    applyNormalMatrix(e10) {
      for (let t10 = 0, i10 = this.count; t10 < i10; t10++) tp.fromBufferAttribute(this, t10), tp.applyNormalMatrix(e10), this.setXYZ(t10, tp.x, tp.y, tp.z);
      return this;
    }
    transformDirection(e10) {
      for (let t10 = 0, i10 = this.count; t10 < i10; t10++) tp.fromBufferAttribute(this, t10), tp.transformDirection(e10), this.setXYZ(t10, tp.x, tp.y, tp.z);
      return this;
    }
    set(e10, t10 = 0) {
      return this.array.set(e10, t10), this;
    }
    getComponent(e10, t10) {
      let i10 = this.array[e10 * this.itemSize + t10];
      return this.normalized && (i10 = M(i10, this.array)), i10;
    }
    setComponent(e10, t10, i10) {
      return this.normalized && (i10 = S(i10, this.array)), this.array[e10 * this.itemSize + t10] = i10, this;
    }
    getX(e10) {
      let t10 = this.array[e10 * this.itemSize];
      return this.normalized && (t10 = M(t10, this.array)), t10;
    }
    setX(e10, t10) {
      return this.normalized && (t10 = S(t10, this.array)), this.array[e10 * this.itemSize] = t10, this;
    }
    getY(e10) {
      let t10 = this.array[e10 * this.itemSize + 1];
      return this.normalized && (t10 = M(t10, this.array)), t10;
    }
    setY(e10, t10) {
      return this.normalized && (t10 = S(t10, this.array)), this.array[e10 * this.itemSize + 1] = t10, this;
    }
    getZ(e10) {
      let t10 = this.array[e10 * this.itemSize + 2];
      return this.normalized && (t10 = M(t10, this.array)), t10;
    }
    setZ(e10, t10) {
      return this.normalized && (t10 = S(t10, this.array)), this.array[e10 * this.itemSize + 2] = t10, this;
    }
    getW(e10) {
      let t10 = this.array[e10 * this.itemSize + 3];
      return this.normalized && (t10 = M(t10, this.array)), t10;
    }
    setW(e10, t10) {
      return this.normalized && (t10 = S(t10, this.array)), this.array[e10 * this.itemSize + 3] = t10, this;
    }
    setXY(e10, t10, i10) {
      return e10 *= this.itemSize, this.normalized && (t10 = S(t10, this.array), i10 = S(i10, this.array)), this.array[e10 + 0] = t10, this.array[e10 + 1] = i10, this;
    }
    setXYZ(e10, t10, i10, n10) {
      return e10 *= this.itemSize, this.normalized && (t10 = S(t10, this.array), i10 = S(i10, this.array), n10 = S(n10, this.array)), this.array[e10 + 0] = t10, this.array[e10 + 1] = i10, this.array[e10 + 2] = n10, this;
    }
    setXYZW(e10, t10, i10, n10, r10) {
      return e10 *= this.itemSize, this.normalized && (t10 = S(t10, this.array), i10 = S(i10, this.array), n10 = S(n10, this.array), r10 = S(r10, this.array)), this.array[e10 + 0] = t10, this.array[e10 + 1] = i10, this.array[e10 + 2] = n10, this.array[e10 + 3] = r10, this;
    }
    onUpload(e10) {
      return this.onUploadCallback = e10, this;
    }
    clone() {
      return new this.constructor(this.array, this.itemSize).copy(this);
    }
    toJSON() {
      let e10 = { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized };
      return "" !== this.name && (e10.name = this.name), 35044 !== this.usage && (e10.usage = this.usage), e10;
    }
  }
  class t_ extends tg {
    constructor(e10, t10, i10) {
      super(new Uint16Array(e10), t10, i10);
    }
  }
  class tv extends tg {
    constructor(e10, t10, i10) {
      super(new Uint32Array(e10), t10, i10);
    }
  }
  class tx extends tg {
    constructor(e10, t10, i10) {
      super(new Float32Array(e10), t10, i10);
    }
  }
  let ty = 0, tM = new eA(), tS = new eQ(), tE = new b(), tT = new Q(), tb = new Q(), tA = new b();
  class tw extends d {
    constructor() {
      super(), this.isBufferGeometry = true, Object.defineProperty(this, "id", { value: ty++ }), this.uuid = _(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = false, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
    }
    getIndex() {
      return this.index;
    }
    setIndex(e10) {
      return Array.isArray(e10) ? this.index = new (P(e10) ? tv : t_)(e10, 1) : this.index = e10, this;
    }
    setIndirect(e10) {
      return this.indirect = e10, this;
    }
    getIndirect() {
      return this.indirect;
    }
    getAttribute(e10) {
      return this.attributes[e10];
    }
    setAttribute(e10, t10) {
      return this.attributes[e10] = t10, this;
    }
    deleteAttribute(e10) {
      return delete this.attributes[e10], this;
    }
    hasAttribute(e10) {
      return void 0 !== this.attributes[e10];
    }
    addGroup(e10, t10, i10 = 0) {
      this.groups.push({ start: e10, count: t10, materialIndex: i10 });
    }
    clearGroups() {
      this.groups = [];
    }
    setDrawRange(e10, t10) {
      this.drawRange.start = e10, this.drawRange.count = t10;
    }
    applyMatrix4(e10) {
      let t10 = this.attributes.position;
      void 0 !== t10 && (t10.applyMatrix4(e10), t10.needsUpdate = true);
      let i10 = this.attributes.normal;
      if (void 0 !== i10) {
        let t11 = new R().getNormalMatrix(e10);
        i10.applyNormalMatrix(t11), i10.needsUpdate = true;
      }
      let n10 = this.attributes.tangent;
      return void 0 !== n10 && (n10.transformDirection(e10), n10.needsUpdate = true), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this;
    }
    applyQuaternion(e10) {
      return tM.makeRotationFromQuaternion(e10), this.applyMatrix4(tM), this;
    }
    rotateX(e10) {
      return tM.makeRotationX(e10), this.applyMatrix4(tM), this;
    }
    rotateY(e10) {
      return tM.makeRotationY(e10), this.applyMatrix4(tM), this;
    }
    rotateZ(e10) {
      return tM.makeRotationZ(e10), this.applyMatrix4(tM), this;
    }
    translate(e10, t10, i10) {
      return tM.makeTranslation(e10, t10, i10), this.applyMatrix4(tM), this;
    }
    scale(e10, t10, i10) {
      return tM.makeScale(e10, t10, i10), this.applyMatrix4(tM), this;
    }
    lookAt(e10) {
      return tS.lookAt(e10), tS.updateMatrix(), this.applyMatrix4(tS.matrix), this;
    }
    center() {
      return this.computeBoundingBox(), this.boundingBox.getCenter(tE).negate(), this.translate(tE.x, tE.y, tE.z), this;
    }
    setFromPoints(e10) {
      let t10 = this.getAttribute("position");
      if (void 0 === t10) {
        let t11 = [];
        for (let i10 = 0, n10 = e10.length; i10 < n10; i10++) {
          let n11 = e10[i10];
          t11.push(n11.x, n11.y, n11.z || 0);
        }
        this.setAttribute("position", new tx(t11, 3));
      } else {
        let i10 = Math.min(e10.length, t10.count);
        for (let n10 = 0; n10 < i10; n10++) {
          let i11 = e10[n10];
          t10.setXYZ(n10, i11.x, i11.y, i11.z || 0);
        }
        e10.length > t10.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t10.needsUpdate = true;
      }
      return this;
    }
    computeBoundingBox() {
      null === this.boundingBox && (this.boundingBox = new Q());
      let e10 = this.attributes.position, t10 = this.morphAttributes.position;
      if (e10 && e10.isGLBufferAttribute) {
        console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new b(-1 / 0, -1 / 0, -1 / 0), new b(Infinity, Infinity, Infinity));
        return;
      }
      if (void 0 !== e10) {
        if (this.boundingBox.setFromBufferAttribute(e10), t10) for (let e11 = 0, i10 = t10.length; e11 < i10; e11++) {
          let i11 = t10[e11];
          tT.setFromBufferAttribute(i11), this.morphTargetsRelative ? (tA.addVectors(this.boundingBox.min, tT.min), this.boundingBox.expandByPoint(tA), tA.addVectors(this.boundingBox.max, tT.max), this.boundingBox.expandByPoint(tA)) : (this.boundingBox.expandByPoint(tT.min), this.boundingBox.expandByPoint(tT.max));
        }
      } else this.boundingBox.makeEmpty();
      (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
    }
    computeBoundingSphere() {
      null === this.boundingSphere && (this.boundingSphere = new e_());
      let e10 = this.attributes.position, t10 = this.morphAttributes.position;
      if (e10 && e10.isGLBufferAttribute) {
        console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new b(), 1 / 0);
        return;
      }
      if (e10) {
        let i10 = this.boundingSphere.center;
        if (tT.setFromBufferAttribute(e10), t10) for (let e11 = 0, i11 = t10.length; e11 < i11; e11++) {
          let i12 = t10[e11];
          tb.setFromBufferAttribute(i12), this.morphTargetsRelative ? (tA.addVectors(tT.min, tb.min), tT.expandByPoint(tA), tA.addVectors(tT.max, tb.max), tT.expandByPoint(tA)) : (tT.expandByPoint(tb.min), tT.expandByPoint(tb.max));
        }
        tT.getCenter(i10);
        let n10 = 0;
        for (let t11 = 0, r10 = e10.count; t11 < r10; t11++) tA.fromBufferAttribute(e10, t11), n10 = Math.max(n10, i10.distanceToSquared(tA));
        if (t10) for (let r10 = 0, a10 = t10.length; r10 < a10; r10++) {
          let a11 = t10[r10], s2 = this.morphTargetsRelative;
          for (let t11 = 0, r11 = a11.count; t11 < r11; t11++) tA.fromBufferAttribute(a11, t11), s2 && (tE.fromBufferAttribute(e10, t11), tA.add(tE)), n10 = Math.max(n10, i10.distanceToSquared(tA));
        }
        this.boundingSphere.radius = Math.sqrt(n10), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
      }
    }
    computeTangents() {
      let e10 = this.index, t10 = this.attributes;
      if (null === e10 || void 0 === t10.position || void 0 === t10.normal || void 0 === t10.uv) return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      let i10 = t10.position, n10 = t10.normal, r10 = t10.uv;
      false === this.hasAttribute("tangent") && this.setAttribute("tangent", new tg(new Float32Array(4 * i10.count), 4));
      let a10 = this.getAttribute("tangent"), s2 = [], o2 = [];
      for (let e11 = 0; e11 < i10.count; e11++) s2[e11] = new b(), o2[e11] = new b();
      let l2 = new b(), h2 = new b(), c2 = new b(), u2 = new E(), d2 = new E(), p2 = new E(), f2 = new b(), m2 = new b(), g2 = this.groups;
      0 === g2.length && (g2 = [{ start: 0, count: e10.count }]);
      for (let t11 = 0, n11 = g2.length; t11 < n11; ++t11) {
        let n12 = g2[t11], a11 = n12.start, _3 = n12.count;
        for (let t12 = a11, n13 = a11 + _3; t12 < n13; t12 += 3) !(function(e11, t13, n14) {
          l2.fromBufferAttribute(i10, e11), h2.fromBufferAttribute(i10, t13), c2.fromBufferAttribute(i10, n14), u2.fromBufferAttribute(r10, e11), d2.fromBufferAttribute(r10, t13), p2.fromBufferAttribute(r10, n14), h2.sub(l2), c2.sub(l2), d2.sub(u2), p2.sub(u2);
          let a12 = 1 / (d2.x * p2.y - p2.x * d2.y);
          isFinite(a12) && (f2.copy(h2).multiplyScalar(p2.y).addScaledVector(c2, -d2.y).multiplyScalar(a12), m2.copy(c2).multiplyScalar(d2.x).addScaledVector(h2, -p2.x).multiplyScalar(a12), s2[e11].add(f2), s2[t13].add(f2), s2[n14].add(f2), o2[e11].add(m2), o2[t13].add(m2), o2[n14].add(m2));
        })(e10.getX(t12 + 0), e10.getX(t12 + 1), e10.getX(t12 + 2));
      }
      let _2 = new b(), v2 = new b(), x2 = new b(), y2 = new b();
      function M2(e11) {
        x2.fromBufferAttribute(n10, e11), y2.copy(x2);
        let t11 = s2[e11];
        _2.copy(t11), _2.sub(x2.multiplyScalar(x2.dot(t11))).normalize(), v2.crossVectors(y2, t11);
        let i11 = v2.dot(o2[e11]);
        a10.setXYZW(e11, _2.x, _2.y, _2.z, i11 < 0 ? -1 : 1);
      }
      for (let t11 = 0, i11 = g2.length; t11 < i11; ++t11) {
        let i12 = g2[t11], n11 = i12.start, r11 = i12.count;
        for (let t12 = n11, i13 = n11 + r11; t12 < i13; t12 += 3) M2(e10.getX(t12 + 0)), M2(e10.getX(t12 + 1)), M2(e10.getX(t12 + 2));
      }
    }
    computeVertexNormals() {
      let e10 = this.index, t10 = this.getAttribute("position");
      if (void 0 !== t10) {
        let i10 = this.getAttribute("normal");
        if (void 0 === i10) i10 = new tg(new Float32Array(3 * t10.count), 3), this.setAttribute("normal", i10);
        else for (let e11 = 0, t11 = i10.count; e11 < t11; e11++) i10.setXYZ(e11, 0, 0, 0);
        let n10 = new b(), r10 = new b(), a10 = new b(), s2 = new b(), o2 = new b(), l2 = new b(), h2 = new b(), c2 = new b();
        if (e10) for (let u2 = 0, d2 = e10.count; u2 < d2; u2 += 3) {
          let d3 = e10.getX(u2 + 0), p2 = e10.getX(u2 + 1), f2 = e10.getX(u2 + 2);
          n10.fromBufferAttribute(t10, d3), r10.fromBufferAttribute(t10, p2), a10.fromBufferAttribute(t10, f2), h2.subVectors(a10, r10), c2.subVectors(n10, r10), h2.cross(c2), s2.fromBufferAttribute(i10, d3), o2.fromBufferAttribute(i10, p2), l2.fromBufferAttribute(i10, f2), s2.add(h2), o2.add(h2), l2.add(h2), i10.setXYZ(d3, s2.x, s2.y, s2.z), i10.setXYZ(p2, o2.x, o2.y, o2.z), i10.setXYZ(f2, l2.x, l2.y, l2.z);
        }
        else for (let e11 = 0, s3 = t10.count; e11 < s3; e11 += 3) n10.fromBufferAttribute(t10, e11 + 0), r10.fromBufferAttribute(t10, e11 + 1), a10.fromBufferAttribute(t10, e11 + 2), h2.subVectors(a10, r10), c2.subVectors(n10, r10), h2.cross(c2), i10.setXYZ(e11 + 0, h2.x, h2.y, h2.z), i10.setXYZ(e11 + 1, h2.x, h2.y, h2.z), i10.setXYZ(e11 + 2, h2.x, h2.y, h2.z);
        this.normalizeNormals(), i10.needsUpdate = true;
      }
    }
    normalizeNormals() {
      let e10 = this.attributes.normal;
      for (let t10 = 0, i10 = e10.count; t10 < i10; t10++) tA.fromBufferAttribute(e10, t10), tA.normalize(), e10.setXYZ(t10, tA.x, tA.y, tA.z);
    }
    toNonIndexed() {
      function e10(e11, t11) {
        let i11 = e11.array, n11 = e11.itemSize, r11 = e11.normalized, a11 = new i11.constructor(t11.length * n11), s2 = 0, o2 = 0;
        for (let r12 = 0, l2 = t11.length; r12 < l2; r12++) {
          s2 = e11.isInterleavedBufferAttribute ? t11[r12] * e11.data.stride + e11.offset : t11[r12] * n11;
          for (let e12 = 0; e12 < n11; e12++) a11[o2++] = i11[s2++];
        }
        return new tg(a11, n11, r11);
      }
      if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
      let t10 = new tw(), i10 = this.index.array, n10 = this.attributes;
      for (let r11 in n10) {
        let a11 = e10(n10[r11], i10);
        t10.setAttribute(r11, a11);
      }
      let r10 = this.morphAttributes;
      for (let n11 in r10) {
        let a11 = [], s2 = r10[n11];
        for (let t11 = 0, n12 = s2.length; t11 < n12; t11++) {
          let n13 = e10(s2[t11], i10);
          a11.push(n13);
        }
        t10.morphAttributes[n11] = a11;
      }
      t10.morphTargetsRelative = this.morphTargetsRelative;
      let a10 = this.groups;
      for (let e11 = 0, i11 = a10.length; e11 < i11; e11++) {
        let i12 = a10[e11];
        t10.addGroup(i12.start, i12.count, i12.materialIndex);
      }
      return t10;
    }
    toJSON() {
      let e10 = { metadata: { version: 4.7, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } };
      if (e10.uuid = this.uuid, e10.type = this.type, "" !== this.name && (e10.name = this.name), Object.keys(this.userData).length > 0 && (e10.userData = this.userData), void 0 !== this.parameters) {
        let t11 = this.parameters;
        for (let i11 in t11) void 0 !== t11[i11] && (e10[i11] = t11[i11]);
        return e10;
      }
      e10.data = { attributes: {} };
      let t10 = this.index;
      null !== t10 && (e10.data.index = { type: t10.array.constructor.name, array: Array.prototype.slice.call(t10.array) });
      let i10 = this.attributes;
      for (let t11 in i10) {
        let n11 = i10[t11];
        e10.data.attributes[t11] = n11.toJSON(e10.data);
      }
      let n10 = {}, r10 = false;
      for (let t11 in this.morphAttributes) {
        let i11 = this.morphAttributes[t11], a11 = [];
        for (let t12 = 0, n11 = i11.length; t12 < n11; t12++) {
          let n12 = i11[t12];
          a11.push(n12.toJSON(e10.data));
        }
        a11.length > 0 && (n10[t11] = a11, r10 = true);
      }
      r10 && (e10.data.morphAttributes = n10, e10.data.morphTargetsRelative = this.morphTargetsRelative);
      let a10 = this.groups;
      a10.length > 0 && (e10.data.groups = JSON.parse(JSON.stringify(a10)));
      let s2 = this.boundingSphere;
      return null !== s2 && (e10.data.boundingSphere = s2.toJSON()), e10;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e10) {
      this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
      let t10 = {};
      this.name = e10.name;
      let i10 = e10.index;
      null !== i10 && this.setIndex(i10.clone());
      let n10 = e10.attributes;
      for (let e11 in n10) {
        let i11 = n10[e11];
        this.setAttribute(e11, i11.clone(t10));
      }
      let r10 = e10.morphAttributes;
      for (let e11 in r10) {
        let i11 = [], n11 = r10[e11];
        for (let e12 = 0, r11 = n11.length; e12 < r11; e12++) i11.push(n11[e12].clone(t10));
        this.morphAttributes[e11] = i11;
      }
      this.morphTargetsRelative = e10.morphTargetsRelative;
      let a10 = e10.groups;
      for (let e11 = 0, t11 = a10.length; e11 < t11; e11++) {
        let t12 = a10[e11];
        this.addGroup(t12.start, t12.count, t12.materialIndex);
      }
      let s2 = e10.boundingBox;
      null !== s2 && (this.boundingBox = s2.clone());
      let o2 = e10.boundingSphere;
      return null !== o2 && (this.boundingSphere = o2.clone()), this.drawRange.start = e10.drawRange.start, this.drawRange.count = e10.drawRange.count, this.userData = e10.userData, this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  }
  let tR = new eA(), tC = new eb(), tP = new e_(), tI = new b(), tL = new b(), tU = new b(), tD = new b(), tN = new b(), tO = new b(), tF = new b(), tB = new b();
  class tz extends eQ {
    constructor(e10 = new tw(), t10 = new td()) {
      super(), this.isMesh = true, this.type = "Mesh", this.geometry = e10, this.material = t10, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
    }
    copy(e10, t10) {
      return super.copy(e10, t10), void 0 !== e10.morphTargetInfluences && (this.morphTargetInfluences = e10.morphTargetInfluences.slice()), void 0 !== e10.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, e10.morphTargetDictionary)), this.material = Array.isArray(e10.material) ? e10.material.slice() : e10.material, this.geometry = e10.geometry, this;
    }
    updateMorphTargets() {
      let e10 = this.geometry.morphAttributes, t10 = Object.keys(e10);
      if (t10.length > 0) {
        let i10 = e10[t10[0]];
        if (void 0 !== i10) {
          this.morphTargetInfluences = [], this.morphTargetDictionary = {};
          for (let e11 = 0, t11 = i10.length; e11 < t11; e11++) {
            let t12 = i10[e11].name || String(e11);
            this.morphTargetInfluences.push(0), this.morphTargetDictionary[t12] = e11;
          }
        }
      }
    }
    getVertexPosition(e10, t10) {
      let i10 = this.geometry, n10 = i10.attributes.position, r10 = i10.morphAttributes.position, a10 = i10.morphTargetsRelative;
      t10.fromBufferAttribute(n10, e10);
      let s2 = this.morphTargetInfluences;
      if (r10 && s2) {
        tO.set(0, 0, 0);
        for (let i11 = 0, n11 = r10.length; i11 < n11; i11++) {
          let n12 = s2[i11], o2 = r10[i11];
          0 !== n12 && (tN.fromBufferAttribute(o2, e10), a10 ? tO.addScaledVector(tN, n12) : tO.addScaledVector(tN.sub(t10), n12));
        }
        t10.add(tO);
      }
      return t10;
    }
    raycast(e10, t10) {
      let i10 = this.geometry, n10 = this.material, r10 = this.matrixWorld;
      void 0 === n10 || (null === i10.boundingSphere && i10.computeBoundingSphere(), tP.copy(i10.boundingSphere), tP.applyMatrix4(r10), tC.copy(e10.ray).recast(e10.near), false === tP.containsPoint(tC.origin) && (null === tC.intersectSphere(tP, tI) || tC.origin.distanceToSquared(tI) > (e10.far - e10.near) ** 2) || (tR.copy(r10).invert(), tC.copy(e10.ray).applyMatrix4(tR), (null === i10.boundingBox || false !== tC.intersectsBox(i10.boundingBox)) && this._computeIntersections(e10, t10, tC)));
    }
    _computeIntersections(e10, t10, i10) {
      let n10, r10 = this.geometry, a10 = this.material, s2 = r10.index, o2 = r10.attributes.position, l2 = r10.attributes.uv, h2 = r10.attributes.uv1, c2 = r10.attributes.normal, u2 = r10.groups, d2 = r10.drawRange;
      if (null !== s2) if (Array.isArray(a10)) for (let r11 = 0, o3 = u2.length; r11 < o3; r11++) {
        let o4 = u2[r11], p2 = a10[o4.materialIndex], f2 = Math.max(o4.start, d2.start), m2 = Math.min(s2.count, Math.min(o4.start + o4.count, d2.start + d2.count));
        for (let r12 = f2; r12 < m2; r12 += 3) (n10 = tV(this, p2, e10, i10, l2, h2, c2, s2.getX(r12), s2.getX(r12 + 1), s2.getX(r12 + 2))) && (n10.faceIndex = Math.floor(r12 / 3), n10.face.materialIndex = o4.materialIndex, t10.push(n10));
      }
      else {
        let r11 = Math.max(0, d2.start), o3 = Math.min(s2.count, d2.start + d2.count);
        for (let u3 = r11; u3 < o3; u3 += 3) (n10 = tV(this, a10, e10, i10, l2, h2, c2, s2.getX(u3), s2.getX(u3 + 1), s2.getX(u3 + 2))) && (n10.faceIndex = Math.floor(u3 / 3), t10.push(n10));
      }
      else if (void 0 !== o2) if (Array.isArray(a10)) for (let r11 = 0, s3 = u2.length; r11 < s3; r11++) {
        let s4 = u2[r11], p2 = a10[s4.materialIndex], f2 = Math.max(s4.start, d2.start), m2 = Math.min(o2.count, Math.min(s4.start + s4.count, d2.start + d2.count));
        for (let r12 = f2; r12 < m2; r12 += 3) (n10 = tV(this, p2, e10, i10, l2, h2, c2, r12, r12 + 1, r12 + 2)) && (n10.faceIndex = Math.floor(r12 / 3), n10.face.materialIndex = s4.materialIndex, t10.push(n10));
      }
      else {
        let r11 = Math.max(0, d2.start), s3 = Math.min(o2.count, d2.start + d2.count);
        for (let o3 = r11; o3 < s3; o3 += 3) (n10 = tV(this, a10, e10, i10, l2, h2, c2, o3, o3 + 1, o3 + 2)) && (n10.faceIndex = Math.floor(o3 / 3), t10.push(n10));
      }
    }
  }
  function tV(e10, t10, i10, n10, r10, a10, s2, o2, l2, h2) {
    e10.getVertexPosition(o2, tL), e10.getVertexPosition(l2, tU), e10.getVertexPosition(h2, tD);
    let c2 = (function(e11, t11, i11, n11, r11, a11, s3, o3) {
      if (null === (1 === t11.side ? n11.intersectTriangle(s3, a11, r11, true, o3) : n11.intersectTriangle(r11, a11, s3, 0 === t11.side, o3))) return null;
      tB.copy(o3), tB.applyMatrix4(e11.matrixWorld);
      let l3 = i11.ray.origin.distanceTo(tB);
      return l3 < i11.near || l3 > i11.far ? null : { distance: l3, point: tB.clone(), object: e11 };
    })(e10, t10, i10, n10, tL, tU, tD, tF);
    if (c2) {
      let e11 = new b();
      tn.getBarycoord(tF, tL, tU, tD, e11), r10 && (c2.uv = tn.getInterpolatedAttribute(r10, o2, l2, h2, e11, new E())), a10 && (c2.uv1 = tn.getInterpolatedAttribute(a10, o2, l2, h2, e11, new E())), s2 && (c2.normal = tn.getInterpolatedAttribute(s2, o2, l2, h2, e11, new b()), c2.normal.dot(n10.direction) > 0 && c2.normal.multiplyScalar(-1));
      let t11 = { a: o2, b: l2, c: h2, normal: new b(), materialIndex: 0 };
      tn.getNormal(tL, tU, tD, t11.normal), c2.face = t11, c2.barycoord = e11;
    }
    return c2;
  }
  class tH extends tw {
    constructor(e10 = 1, t10 = 1, i10 = 1, n10 = 1, r10 = 1, a10 = 1) {
      super(), this.type = "BoxGeometry", this.parameters = { width: e10, height: t10, depth: i10, widthSegments: n10, heightSegments: r10, depthSegments: a10 };
      const s2 = this;
      n10 = Math.floor(n10), r10 = Math.floor(r10);
      const o2 = [], l2 = [], h2 = [], c2 = [];
      let u2 = 0, d2 = 0;
      function p2(e11, t11, i11, n11, r11, a11, p3, f2, m2, g2, _2) {
        let v2 = a11 / m2, x2 = p3 / g2, y2 = a11 / 2, M2 = p3 / 2, S2 = f2 / 2, E2 = m2 + 1, T2 = g2 + 1, A2 = 0, w2 = 0, R2 = new b();
        for (let a12 = 0; a12 < T2; a12++) {
          let s3 = a12 * x2 - M2;
          for (let o3 = 0; o3 < E2; o3++) {
            let u3 = o3 * v2 - y2;
            R2[e11] = u3 * n11, R2[t11] = s3 * r11, R2[i11] = S2, l2.push(R2.x, R2.y, R2.z), R2[e11] = 0, R2[t11] = 0, R2[i11] = f2 > 0 ? 1 : -1, h2.push(R2.x, R2.y, R2.z), c2.push(o3 / m2), c2.push(1 - a12 / g2), A2 += 1;
          }
        }
        for (let e12 = 0; e12 < g2; e12++) for (let t12 = 0; t12 < m2; t12++) {
          let i12 = u2 + t12 + E2 * e12, n12 = u2 + t12 + E2 * (e12 + 1), r12 = u2 + (t12 + 1) + E2 * (e12 + 1), a12 = u2 + (t12 + 1) + E2 * e12;
          o2.push(i12, n12, a12), o2.push(n12, r12, a12), w2 += 6;
        }
        s2.addGroup(d2, w2, _2), d2 += w2, u2 += A2;
      }
      p2("z", "y", "x", -1, -1, i10, t10, e10, a10 = Math.floor(a10), r10, 0), p2("z", "y", "x", 1, -1, i10, t10, -e10, a10, r10, 1), p2("x", "z", "y", 1, 1, e10, i10, t10, n10, a10, 2), p2("x", "z", "y", 1, -1, e10, i10, -t10, n10, a10, 3), p2("x", "y", "z", 1, -1, e10, t10, i10, n10, r10, 4), p2("x", "y", "z", -1, -1, e10, t10, -i10, n10, r10, 5), this.setIndex(o2), this.setAttribute("position", new tx(l2, 3)), this.setAttribute("normal", new tx(h2, 3)), this.setAttribute("uv", new tx(c2, 2));
    }
    copy(e10) {
      return super.copy(e10), this.parameters = Object.assign({}, e10.parameters), this;
    }
    static fromJSON(e10) {
      return new tH(e10.width, e10.height, e10.depth, e10.widthSegments, e10.heightSegments, e10.depthSegments);
    }
  }
  function tk(e10) {
    let t10 = {};
    for (let i10 in e10) for (let n10 in t10[i10] = {}, e10[i10]) {
      let r10 = e10[i10][n10];
      r10 && (r10.isColor || r10.isMatrix3 || r10.isMatrix4 || r10.isVector2 || r10.isVector3 || r10.isVector4 || r10.isTexture || r10.isQuaternion) ? r10.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t10[i10][n10] = null) : t10[i10][n10] = r10.clone() : Array.isArray(r10) ? t10[i10][n10] = r10.slice() : t10[i10][n10] = r10;
    }
    return t10;
  }
  function tG(e10) {
    let t10 = {};
    for (let i10 = 0; i10 < e10.length; i10++) {
      let n10 = tk(e10[i10]);
      for (let e11 in n10) t10[e11] = n10[e11];
    }
    return t10;
  }
  function tW(e10) {
    let t10 = e10.getRenderTarget();
    return null === t10 ? e10.outputColorSpace : true === t10.isXRRenderTarget ? t10.texture.colorSpace : B.workingColorSpace;
  }
  let tX = { clone: tk, merge: tG };
  class tj extends tu {
    constructor(e10) {
      super(), this.isShaderMaterial = true, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.linewidth = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.fog = false, this.lights = false, this.clipping = false, this.forceSinglePass = true, this.extensions = { clipCullDistance: false, multiDraw: false }, this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = false, this.glslVersion = null, void 0 !== e10 && this.setValues(e10);
    }
    copy(e10) {
      return super.copy(e10), this.fragmentShader = e10.fragmentShader, this.vertexShader = e10.vertexShader, this.uniforms = tk(e10.uniforms), this.uniformsGroups = (function(e11) {
        let t10 = [];
        for (let i10 = 0; i10 < e11.length; i10++) t10.push(e11[i10].clone());
        return t10;
      })(e10.uniformsGroups), this.defines = Object.assign({}, e10.defines), this.wireframe = e10.wireframe, this.wireframeLinewidth = e10.wireframeLinewidth, this.fog = e10.fog, this.lights = e10.lights, this.clipping = e10.clipping, this.extensions = Object.assign({}, e10.extensions), this.glslVersion = e10.glslVersion, this;
    }
    toJSON(e10) {
      let t10 = super.toJSON(e10);
      for (let i11 in t10.glslVersion = this.glslVersion, t10.uniforms = {}, this.uniforms) {
        let n10 = this.uniforms[i11].value;
        n10 && n10.isTexture ? t10.uniforms[i11] = { type: "t", value: n10.toJSON(e10).uuid } : n10 && n10.isColor ? t10.uniforms[i11] = { type: "c", value: n10.getHex() } : n10 && n10.isVector2 ? t10.uniforms[i11] = { type: "v2", value: n10.toArray() } : n10 && n10.isVector3 ? t10.uniforms[i11] = { type: "v3", value: n10.toArray() } : n10 && n10.isVector4 ? t10.uniforms[i11] = { type: "v4", value: n10.toArray() } : n10 && n10.isMatrix3 ? t10.uniforms[i11] = { type: "m3", value: n10.toArray() } : n10 && n10.isMatrix4 ? t10.uniforms[i11] = { type: "m4", value: n10.toArray() } : t10.uniforms[i11] = { value: n10 };
      }
      Object.keys(this.defines).length > 0 && (t10.defines = this.defines), t10.vertexShader = this.vertexShader, t10.fragmentShader = this.fragmentShader, t10.lights = this.lights, t10.clipping = this.clipping;
      let i10 = {};
      for (let e11 in this.extensions) true === this.extensions[e11] && (i10[e11] = true);
      return Object.keys(i10).length > 0 && (t10.extensions = i10), t10;
    }
  }
  class tq extends eQ {
    constructor() {
      super(), this.isCamera = true, this.type = "Camera", this.matrixWorldInverse = new eA(), this.projectionMatrix = new eA(), this.projectionMatrixInverse = new eA(), this.coordinateSystem = 2e3, this._reversedDepth = false;
    }
    get reversedDepth() {
      return this._reversedDepth;
    }
    copy(e10, t10) {
      return super.copy(e10, t10), this.matrixWorldInverse.copy(e10.matrixWorldInverse), this.projectionMatrix.copy(e10.projectionMatrix), this.projectionMatrixInverse.copy(e10.projectionMatrixInverse), this.coordinateSystem = e10.coordinateSystem, this;
    }
    getWorldDirection(e10) {
      return super.getWorldDirection(e10).negate();
    }
    updateMatrixWorld(e10) {
      super.updateMatrixWorld(e10), this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    updateWorldMatrix(e10, t10) {
      super.updateWorldMatrix(e10, t10), this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  let tY = new b(), tK = new E(), tJ = new E();
  class tZ extends tq {
    constructor(e10 = 50, t10 = 1, i10 = 0.1, n10 = 2e3) {
      super(), this.isPerspectiveCamera = true, this.type = "PerspectiveCamera", this.fov = e10, this.zoom = 1, this.near = i10, this.far = n10, this.focus = 10, this.aspect = t10, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
    }
    copy(e10, t10) {
      return super.copy(e10, t10), this.fov = e10.fov, this.zoom = e10.zoom, this.near = e10.near, this.far = e10.far, this.focus = e10.focus, this.aspect = e10.aspect, this.view = null === e10.view ? null : Object.assign({}, e10.view), this.filmGauge = e10.filmGauge, this.filmOffset = e10.filmOffset, this;
    }
    setFocalLength(e10) {
      let t10 = 0.5 * this.getFilmHeight() / e10;
      this.fov = 2 * g * Math.atan(t10), this.updateProjectionMatrix();
    }
    getFocalLength() {
      let e10 = Math.tan(0.5 * m * this.fov);
      return 0.5 * this.getFilmHeight() / e10;
    }
    getEffectiveFOV() {
      return 2 * g * Math.atan(Math.tan(0.5 * m * this.fov) / this.zoom);
    }
    getFilmWidth() {
      return this.filmGauge * Math.min(this.aspect, 1);
    }
    getFilmHeight() {
      return this.filmGauge / Math.max(this.aspect, 1);
    }
    getViewBounds(e10, t10, i10) {
      tY.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t10.set(tY.x, tY.y).multiplyScalar(-e10 / tY.z), tY.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), i10.set(tY.x, tY.y).multiplyScalar(-e10 / tY.z);
    }
    getViewSize(e10, t10) {
      return this.getViewBounds(e10, tK, tJ), t10.subVectors(tJ, tK);
    }
    setViewOffset(e10, t10, i10, n10, r10, a10) {
      this.aspect = e10 / t10, null === this.view && (this.view = { enabled: true, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = true, this.view.fullWidth = e10, this.view.fullHeight = t10, this.view.offsetX = i10, this.view.offsetY = n10, this.view.width = r10, this.view.height = a10, this.updateProjectionMatrix();
    }
    clearViewOffset() {
      null !== this.view && (this.view.enabled = false), this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      let e10 = this.near, t10 = e10 * Math.tan(0.5 * m * this.fov) / this.zoom, i10 = 2 * t10, n10 = this.aspect * i10, r10 = -0.5 * n10, a10 = this.view;
      if (null !== this.view && this.view.enabled) {
        let e11 = a10.fullWidth, s3 = a10.fullHeight;
        r10 += a10.offsetX * n10 / e11, t10 -= a10.offsetY * i10 / s3, n10 *= a10.width / e11, i10 *= a10.height / s3;
      }
      let s2 = this.filmOffset;
      0 !== s2 && (r10 += e10 * s2 / this.getFilmWidth()), this.projectionMatrix.makePerspective(r10, r10 + n10, t10, t10 - i10, e10, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(e10) {
      let t10 = super.toJSON(e10);
      return t10.object.fov = this.fov, t10.object.zoom = this.zoom, t10.object.near = this.near, t10.object.far = this.far, t10.object.focus = this.focus, t10.object.aspect = this.aspect, null !== this.view && (t10.object.view = Object.assign({}, this.view)), t10.object.filmGauge = this.filmGauge, t10.object.filmOffset = this.filmOffset, t10;
    }
  }
  class t$ extends eQ {
    constructor(e10, t10, i10) {
      super(), this.type = "CubeCamera", this.renderTarget = i10, this.coordinateSystem = null, this.activeMipmapLevel = 0;
      const n10 = new tZ(-90, 1, e10, t10);
      n10.layers = this.layers, this.add(n10);
      const r10 = new tZ(-90, 1, e10, t10);
      r10.layers = this.layers, this.add(r10);
      const a10 = new tZ(-90, 1, e10, t10);
      a10.layers = this.layers, this.add(a10);
      const s2 = new tZ(-90, 1, e10, t10);
      s2.layers = this.layers, this.add(s2);
      const o2 = new tZ(-90, 1, e10, t10);
      o2.layers = this.layers, this.add(o2);
      const l2 = new tZ(-90, 1, e10, t10);
      l2.layers = this.layers, this.add(l2);
    }
    updateCoordinateSystem() {
      let e10 = this.coordinateSystem, t10 = this.children.concat(), [i10, n10, r10, a10, s2, o2] = t10;
      for (let e11 of t10) this.remove(e11);
      if (2e3 === e10) i10.up.set(0, 1, 0), i10.lookAt(1, 0, 0), n10.up.set(0, 1, 0), n10.lookAt(-1, 0, 0), r10.up.set(0, 0, -1), r10.lookAt(0, 1, 0), a10.up.set(0, 0, 1), a10.lookAt(0, -1, 0), s2.up.set(0, 1, 0), s2.lookAt(0, 0, 1), o2.up.set(0, 1, 0), o2.lookAt(0, 0, -1);
      else if (2001 === e10) i10.up.set(0, -1, 0), i10.lookAt(-1, 0, 0), n10.up.set(0, -1, 0), n10.lookAt(1, 0, 0), r10.up.set(0, 0, 1), r10.lookAt(0, 1, 0), a10.up.set(0, 0, -1), a10.lookAt(0, -1, 0), s2.up.set(0, -1, 0), s2.lookAt(0, 0, 1), o2.up.set(0, -1, 0), o2.lookAt(0, 0, -1);
      else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e10);
      for (let e11 of t10) this.add(e11), e11.updateMatrixWorld();
    }
    update(e10, t10) {
      null === this.parent && this.updateMatrixWorld();
      let { renderTarget: i10, activeMipmapLevel: n10 } = this;
      this.coordinateSystem !== e10.coordinateSystem && (this.coordinateSystem = e10.coordinateSystem, this.updateCoordinateSystem());
      let [r10, a10, s2, o2, l2, h2] = this.children, c2 = e10.getRenderTarget(), u2 = e10.getActiveCubeFace(), d2 = e10.getActiveMipmapLevel(), p2 = e10.xr.enabled;
      e10.xr.enabled = false;
      let f2 = i10.texture.generateMipmaps;
      i10.texture.generateMipmaps = false, e10.setRenderTarget(i10, 0, n10), e10.render(t10, r10), e10.setRenderTarget(i10, 1, n10), e10.render(t10, a10), e10.setRenderTarget(i10, 2, n10), e10.render(t10, s2), e10.setRenderTarget(i10, 3, n10), e10.render(t10, o2), e10.setRenderTarget(i10, 4, n10), e10.render(t10, l2), i10.texture.generateMipmaps = f2, e10.setRenderTarget(i10, 5, n10), e10.render(t10, h2), e10.setRenderTarget(c2, u2, d2), e10.xr.enabled = p2, i10.texture.needsPMREMUpdate = true;
    }
  }
  class tQ extends q {
    constructor(e10 = [], t10 = 301, i10, n10, r10, a10, s2, o2, l2, h2) {
      super(e10, t10, i10, n10, r10, a10, s2, o2, l2, h2), this.isCubeTexture = true, this.flipY = false;
    }
    get images() {
      return this.image;
    }
    set images(e10) {
      this.image = e10;
    }
  }
  class t0 extends J {
    constructor(e10 = 1, t10 = {}) {
      super(e10, e10, t10), this.isWebGLCubeRenderTarget = true;
      const i10 = { width: e10, height: e10, depth: 1 };
      this.texture = new tQ([i10, i10, i10, i10, i10, i10]), this._setTextureOptions(t10), this.texture.isRenderTargetTexture = true;
    }
    fromEquirectangularTexture(e10, t10) {
      this.texture.type = t10.type, this.texture.colorSpace = t10.colorSpace, this.texture.generateMipmaps = t10.generateMipmaps, this.texture.minFilter = t10.minFilter, this.texture.magFilter = t10.magFilter;
      let i10 = { uniforms: { tEquirect: { value: null } }, vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`, fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			` }, n10 = new tH(5, 5, 5), r10 = new tj({ name: "CubemapFromEquirect", uniforms: tk(i10.uniforms), vertexShader: i10.vertexShader, fragmentShader: i10.fragmentShader, side: 1, blending: 0 });
      r10.uniforms.tEquirect.value = t10;
      let a10 = new tz(n10, r10), s2 = t10.minFilter;
      return 1008 === t10.minFilter && (t10.minFilter = 1006), new t$(1, 10, this).update(e10, a10), t10.minFilter = s2, a10.geometry.dispose(), a10.material.dispose(), this;
    }
    clear(e10, t10 = true, i10 = true, n10 = true) {
      let r10 = e10.getRenderTarget();
      for (let r11 = 0; r11 < 6; r11++) e10.setRenderTarget(this, r11), e10.clear(t10, i10, n10);
      e10.setRenderTarget(r10);
    }
  }
  class t1 extends eQ {
    constructor() {
      super(), this.isGroup = true, this.type = "Group";
    }
  }
  let t2 = { type: "move" };
  class t3 {
    constructor() {
      this._targetRay = null, this._grip = null, this._hand = null;
    }
    getHandSpace() {
      return null === this._hand && (this._hand = new t1(), this._hand.matrixAutoUpdate = false, this._hand.visible = false, this._hand.joints = {}, this._hand.inputState = { pinching: false }), this._hand;
    }
    getTargetRaySpace() {
      return null === this._targetRay && (this._targetRay = new t1(), this._targetRay.matrixAutoUpdate = false, this._targetRay.visible = false, this._targetRay.hasLinearVelocity = false, this._targetRay.linearVelocity = new b(), this._targetRay.hasAngularVelocity = false, this._targetRay.angularVelocity = new b()), this._targetRay;
    }
    getGripSpace() {
      return null === this._grip && (this._grip = new t1(), this._grip.matrixAutoUpdate = false, this._grip.visible = false, this._grip.hasLinearVelocity = false, this._grip.linearVelocity = new b(), this._grip.hasAngularVelocity = false, this._grip.angularVelocity = new b()), this._grip;
    }
    dispatchEvent(e10) {
      return null !== this._targetRay && this._targetRay.dispatchEvent(e10), null !== this._grip && this._grip.dispatchEvent(e10), null !== this._hand && this._hand.dispatchEvent(e10), this;
    }
    connect(e10) {
      if (e10 && e10.hand) {
        let t10 = this._hand;
        if (t10) for (let i10 of e10.hand.values()) this._getHandJoint(t10, i10);
      }
      return this.dispatchEvent({ type: "connected", data: e10 }), this;
    }
    disconnect(e10) {
      return this.dispatchEvent({ type: "disconnected", data: e10 }), null !== this._targetRay && (this._targetRay.visible = false), null !== this._grip && (this._grip.visible = false), null !== this._hand && (this._hand.visible = false), this;
    }
    update(e10, t10, i10) {
      let n10 = null, r10 = null, a10 = null, s2 = this._targetRay, o2 = this._grip, l2 = this._hand;
      if (e10 && "visible-blurred" !== t10.session.visibilityState) {
        if (l2 && e10.hand) {
          for (let n12 of (a10 = true, e10.hand.values())) {
            let e11 = t10.getJointPose(n12, i10), r12 = this._getHandJoint(l2, n12);
            null !== e11 && (r12.matrix.fromArray(e11.transform.matrix), r12.matrix.decompose(r12.position, r12.rotation, r12.scale), r12.matrixWorldNeedsUpdate = true, r12.jointRadius = e11.radius), r12.visible = null !== e11;
          }
          let n11 = l2.joints["index-finger-tip"], r11 = l2.joints["thumb-tip"], s3 = n11.position.distanceTo(r11.position);
          l2.inputState.pinching && s3 > 0.025 ? (l2.inputState.pinching = false, this.dispatchEvent({ type: "pinchend", handedness: e10.handedness, target: this })) : !l2.inputState.pinching && s3 <= 0.015 && (l2.inputState.pinching = true, this.dispatchEvent({ type: "pinchstart", handedness: e10.handedness, target: this }));
        } else null !== o2 && e10.gripSpace && null !== (r10 = t10.getPose(e10.gripSpace, i10)) && (o2.matrix.fromArray(r10.transform.matrix), o2.matrix.decompose(o2.position, o2.rotation, o2.scale), o2.matrixWorldNeedsUpdate = true, r10.linearVelocity ? (o2.hasLinearVelocity = true, o2.linearVelocity.copy(r10.linearVelocity)) : o2.hasLinearVelocity = false, r10.angularVelocity ? (o2.hasAngularVelocity = true, o2.angularVelocity.copy(r10.angularVelocity)) : o2.hasAngularVelocity = false);
        null !== s2 && (null === (n10 = t10.getPose(e10.targetRaySpace, i10)) && null !== r10 && (n10 = r10), null !== n10 && (s2.matrix.fromArray(n10.transform.matrix), s2.matrix.decompose(s2.position, s2.rotation, s2.scale), s2.matrixWorldNeedsUpdate = true, n10.linearVelocity ? (s2.hasLinearVelocity = true, s2.linearVelocity.copy(n10.linearVelocity)) : s2.hasLinearVelocity = false, n10.angularVelocity ? (s2.hasAngularVelocity = true, s2.angularVelocity.copy(n10.angularVelocity)) : s2.hasAngularVelocity = false, this.dispatchEvent(t2)));
      }
      return null !== s2 && (s2.visible = null !== n10), null !== o2 && (o2.visible = null !== r10), null !== l2 && (l2.visible = null !== a10), this;
    }
    _getHandJoint(e10, t10) {
      if (void 0 === e10.joints[t10.jointName]) {
        let i10 = new t1();
        i10.matrixAutoUpdate = false, i10.visible = false, e10.joints[t10.jointName] = i10, e10.add(i10);
      }
      return e10.joints[t10.jointName];
    }
  }
  let t4 = new b(), t5 = new b(), t6 = new Y(), t8 = new Y(), t9 = new b(), t7 = new eA(), ie = new b(), it = new e_(), ii = new eA(), ir = new eb();
  class ia extends eQ {
    constructor() {
      super(), this.isBone = true, this.type = "Bone";
    }
  }
  class is extends q {
    constructor(e10 = null, t10 = 1, i10 = 1, n10, r10, a10, s2, o2, l2 = 1003, h2 = 1003, c2, u2) {
      super(null, a10, s2, o2, l2, h2, n10, r10, c2, u2), this.isDataTexture = true, this.image = { data: e10, width: t10, height: i10 }, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
    }
  }
  let io = new eA(), il = new eA();
  class ih extends tg {
    constructor(e10, t10, i10, n10 = 1) {
      super(e10, t10, i10), this.isInstancedBufferAttribute = true, this.meshPerAttribute = n10;
    }
    copy(e10) {
      return super.copy(e10), this.meshPerAttribute = e10.meshPerAttribute, this;
    }
    toJSON() {
      let e10 = super.toJSON();
      return e10.meshPerAttribute = this.meshPerAttribute, e10.isInstancedBufferAttribute = true, e10;
    }
  }
  let ic = new eA(), iu = new eA(), id = [], ip = new Q(), im = new eA(), ig = new tz(), i_ = new e_(), iv = new b(), ix = new b(), iy = new R();
  class iM {
    constructor(e10 = new b(1, 0, 0), t10 = 0) {
      this.isPlane = true, this.normal = e10, this.constant = t10;
    }
    set(e10, t10) {
      return this.normal.copy(e10), this.constant = t10, this;
    }
    setComponents(e10, t10, i10, n10) {
      return this.normal.set(e10, t10, i10), this.constant = n10, this;
    }
    setFromNormalAndCoplanarPoint(e10, t10) {
      return this.normal.copy(e10), this.constant = -t10.dot(this.normal), this;
    }
    setFromCoplanarPoints(e10, t10, i10) {
      let n10 = iv.subVectors(i10, t10).cross(ix.subVectors(e10, t10)).normalize();
      return this.setFromNormalAndCoplanarPoint(n10, e10), this;
    }
    copy(e10) {
      return this.normal.copy(e10.normal), this.constant = e10.constant, this;
    }
    normalize() {
      let e10 = 1 / this.normal.length();
      return this.normal.multiplyScalar(e10), this.constant *= e10, this;
    }
    negate() {
      return this.constant *= -1, this.normal.negate(), this;
    }
    distanceToPoint(e10) {
      return this.normal.dot(e10) + this.constant;
    }
    distanceToSphere(e10) {
      return this.distanceToPoint(e10.center) - e10.radius;
    }
    projectPoint(e10, t10) {
      return t10.copy(e10).addScaledVector(this.normal, -this.distanceToPoint(e10));
    }
    intersectLine(e10, t10) {
      let i10 = e10.delta(iv), n10 = this.normal.dot(i10);
      if (0 === n10) return 0 === this.distanceToPoint(e10.start) ? t10.copy(e10.start) : null;
      let r10 = -(e10.start.dot(this.normal) + this.constant) / n10;
      return r10 < 0 || r10 > 1 ? null : t10.copy(e10.start).addScaledVector(i10, r10);
    }
    intersectsLine(e10) {
      let t10 = this.distanceToPoint(e10.start), i10 = this.distanceToPoint(e10.end);
      return t10 < 0 && i10 > 0 || i10 < 0 && t10 > 0;
    }
    intersectsBox(e10) {
      return e10.intersectsPlane(this);
    }
    intersectsSphere(e10) {
      return e10.intersectsPlane(this);
    }
    coplanarPoint(e10) {
      return e10.copy(this.normal).multiplyScalar(-this.constant);
    }
    applyMatrix4(e10, t10) {
      let i10 = t10 || iy.getNormalMatrix(e10), n10 = this.coplanarPoint(iv).applyMatrix4(e10), r10 = this.normal.applyMatrix3(i10).normalize();
      return this.constant = -n10.dot(r10), this;
    }
    translate(e10) {
      return this.constant -= e10.dot(this.normal), this;
    }
    equals(e10) {
      return e10.normal.equals(this.normal) && e10.constant === this.constant;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  let iS = new e_(), iE = new E(0.5, 0.5), iT = new b();
  class ib {
    constructor(e10 = new iM(), t10 = new iM(), i10 = new iM(), n10 = new iM(), r10 = new iM(), a10 = new iM()) {
      this.planes = [e10, t10, i10, n10, r10, a10];
    }
    set(e10, t10, i10, n10, r10, a10) {
      let s2 = this.planes;
      return s2[0].copy(e10), s2[1].copy(t10), s2[2].copy(i10), s2[3].copy(n10), s2[4].copy(r10), s2[5].copy(a10), this;
    }
    copy(e10) {
      let t10 = this.planes;
      for (let i10 = 0; i10 < 6; i10++) t10[i10].copy(e10.planes[i10]);
      return this;
    }
    setFromProjectionMatrix(e10, t10 = 2e3, i10 = false) {
      let n10 = this.planes, r10 = e10.elements, a10 = r10[0], s2 = r10[1], o2 = r10[2], l2 = r10[3], h2 = r10[4], c2 = r10[5], u2 = r10[6], d2 = r10[7], p2 = r10[8], f2 = r10[9], m2 = r10[10], g2 = r10[11], _2 = r10[12], v2 = r10[13], x2 = r10[14], y2 = r10[15];
      if (n10[0].setComponents(l2 - a10, d2 - h2, g2 - p2, y2 - _2).normalize(), n10[1].setComponents(l2 + a10, d2 + h2, g2 + p2, y2 + _2).normalize(), n10[2].setComponents(l2 + s2, d2 + c2, g2 + f2, y2 + v2).normalize(), n10[3].setComponents(l2 - s2, d2 - c2, g2 - f2, y2 - v2).normalize(), i10) n10[4].setComponents(o2, u2, m2, x2).normalize(), n10[5].setComponents(l2 - o2, d2 - u2, g2 - m2, y2 - x2).normalize();
      else if (n10[4].setComponents(l2 - o2, d2 - u2, g2 - m2, y2 - x2).normalize(), 2e3 === t10) n10[5].setComponents(l2 + o2, d2 + u2, g2 + m2, y2 + x2).normalize();
      else if (2001 === t10) n10[5].setComponents(o2, u2, m2, x2).normalize();
      else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t10);
      return this;
    }
    intersectsObject(e10) {
      if (void 0 !== e10.boundingSphere) null === e10.boundingSphere && e10.computeBoundingSphere(), iS.copy(e10.boundingSphere).applyMatrix4(e10.matrixWorld);
      else {
        let t10 = e10.geometry;
        null === t10.boundingSphere && t10.computeBoundingSphere(), iS.copy(t10.boundingSphere).applyMatrix4(e10.matrixWorld);
      }
      return this.intersectsSphere(iS);
    }
    intersectsSprite(e10) {
      return iS.center.set(0, 0, 0), iS.radius = 0.7071067811865476 + iE.distanceTo(e10.center), iS.applyMatrix4(e10.matrixWorld), this.intersectsSphere(iS);
    }
    intersectsSphere(e10) {
      let t10 = this.planes, i10 = e10.center, n10 = -e10.radius;
      for (let e11 = 0; e11 < 6; e11++) if (t10[e11].distanceToPoint(i10) < n10) return false;
      return true;
    }
    intersectsBox(e10) {
      let t10 = this.planes;
      for (let i10 = 0; i10 < 6; i10++) {
        let n10 = t10[i10];
        if (iT.x = n10.normal.x > 0 ? e10.max.x : e10.min.x, iT.y = n10.normal.y > 0 ? e10.max.y : e10.min.y, iT.z = n10.normal.z > 0 ? e10.max.z : e10.min.z, 0 > n10.distanceToPoint(iT)) return false;
      }
      return true;
    }
    containsPoint(e10) {
      let t10 = this.planes;
      for (let i10 = 0; i10 < 6; i10++) if (0 > t10[i10].distanceToPoint(e10)) return false;
      return true;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  class iA extends tu {
    constructor(e10) {
      super(), this.isLineBasicMaterial = true, this.type = "LineBasicMaterial", this.color = new tl(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = true, this.setValues(e10);
    }
    copy(e10) {
      return super.copy(e10), this.color.copy(e10.color), this.map = e10.map, this.linewidth = e10.linewidth, this.linecap = e10.linecap, this.linejoin = e10.linejoin, this.fog = e10.fog, this;
    }
  }
  let iw = new b(), iR = new b(), iC = new eA(), iP = new eb(), iI = new e_(), iL = new b(), iU = new b();
  class iD extends eQ {
    constructor(e10 = new tw(), t10 = new iA()) {
      super(), this.isLine = true, this.type = "Line", this.geometry = e10, this.material = t10, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
    }
    copy(e10, t10) {
      return super.copy(e10, t10), this.material = Array.isArray(e10.material) ? e10.material.slice() : e10.material, this.geometry = e10.geometry, this;
    }
    computeLineDistances() {
      let e10 = this.geometry;
      if (null === e10.index) {
        let t10 = e10.attributes.position, i10 = [0];
        for (let e11 = 1, n10 = t10.count; e11 < n10; e11++) iw.fromBufferAttribute(t10, e11 - 1), iR.fromBufferAttribute(t10, e11), i10[e11] = i10[e11 - 1], i10[e11] += iw.distanceTo(iR);
        e10.setAttribute("lineDistance", new tx(i10, 1));
      } else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
      return this;
    }
    raycast(e10, t10) {
      let i10 = this.geometry, n10 = this.matrixWorld, r10 = e10.params.Line.threshold, a10 = i10.drawRange;
      if (null === i10.boundingSphere && i10.computeBoundingSphere(), iI.copy(i10.boundingSphere), iI.applyMatrix4(n10), iI.radius += r10, false === e10.ray.intersectsSphere(iI)) return;
      iC.copy(n10).invert(), iP.copy(e10.ray).applyMatrix4(iC);
      let s2 = r10 / ((this.scale.x + this.scale.y + this.scale.z) / 3), o2 = s2 * s2, l2 = this.isLineSegments ? 2 : 1, h2 = i10.index, c2 = i10.attributes.position;
      if (null !== h2) {
        let i11 = Math.max(0, a10.start), n11 = Math.min(h2.count, a10.start + a10.count);
        for (let r11 = i11, a11 = n11 - 1; r11 < a11; r11 += l2) {
          let i12 = iN(this, e10, iP, o2, h2.getX(r11), h2.getX(r11 + 1), r11);
          i12 && t10.push(i12);
        }
        if (this.isLineLoop) {
          let r11 = iN(this, e10, iP, o2, h2.getX(n11 - 1), h2.getX(i11), n11 - 1);
          r11 && t10.push(r11);
        }
      } else {
        let i11 = Math.max(0, a10.start), n11 = Math.min(c2.count, a10.start + a10.count);
        for (let r11 = i11, a11 = n11 - 1; r11 < a11; r11 += l2) {
          let i12 = iN(this, e10, iP, o2, r11, r11 + 1, r11);
          i12 && t10.push(i12);
        }
        if (this.isLineLoop) {
          let r11 = iN(this, e10, iP, o2, n11 - 1, i11, n11 - 1);
          r11 && t10.push(r11);
        }
      }
    }
    updateMorphTargets() {
      let e10 = this.geometry.morphAttributes, t10 = Object.keys(e10);
      if (t10.length > 0) {
        let i10 = e10[t10[0]];
        if (void 0 !== i10) {
          this.morphTargetInfluences = [], this.morphTargetDictionary = {};
          for (let e11 = 0, t11 = i10.length; e11 < t11; e11++) {
            let t12 = i10[e11].name || String(e11);
            this.morphTargetInfluences.push(0), this.morphTargetDictionary[t12] = e11;
          }
        }
      }
    }
  }
  function iN(e10, t10, i10, n10, r10, a10, s2) {
    let o2 = e10.geometry.attributes.position;
    if (iw.fromBufferAttribute(o2, r10), iR.fromBufferAttribute(o2, a10), i10.distanceSqToSegment(iw, iR, iL, iU) > n10) return;
    iL.applyMatrix4(e10.matrixWorld);
    let l2 = t10.ray.origin.distanceTo(iL);
    if (!(l2 < t10.near) && !(l2 > t10.far)) return { distance: l2, point: iU.clone().applyMatrix4(e10.matrixWorld), index: s2, face: null, faceIndex: null, barycoord: null, object: e10 };
  }
  let iO = new b(), iF = new b();
  class iB extends tu {
    constructor(e10) {
      super(), this.isPointsMaterial = true, this.type = "PointsMaterial", this.color = new tl(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = true, this.fog = true, this.setValues(e10);
    }
    copy(e10) {
      return super.copy(e10), this.color.copy(e10.color), this.map = e10.map, this.alphaMap = e10.alphaMap, this.size = e10.size, this.sizeAttenuation = e10.sizeAttenuation, this.fog = e10.fog, this;
    }
  }
  let iz = new eA(), iV = new eb(), iH = new e_(), ik = new b();
  function iG(e10, t10, i10, n10, r10, a10, s2) {
    let o2 = iV.distanceSqToPoint(e10);
    if (o2 < i10) {
      let i11 = new b();
      iV.closestPointToPoint(e10, i11), i11.applyMatrix4(n10);
      let l2 = r10.ray.origin.distanceTo(i11);
      if (l2 < r10.near || l2 > r10.far) return;
      a10.push({ distance: l2, distanceToRay: Math.sqrt(o2), point: i11, index: t10, face: null, faceIndex: null, barycoord: null, object: s2 });
    }
  }
  class iW extends q {
    constructor(e10, t10, i10 = 1014, n10, r10, a10, s2 = 1003, o2 = 1003, l2, h2 = 1026, c2 = 1) {
      if (1026 !== h2 && 1027 !== h2) throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
      super({ width: e10, height: t10, depth: c2 }, n10, r10, a10, s2, o2, h2, i10, l2), this.isDepthTexture = true, this.flipY = false, this.generateMipmaps = false, this.compareFunction = null;
    }
    copy(e10) {
      return super.copy(e10), this.source = new G(Object.assign({}, e10.image)), this.compareFunction = e10.compareFunction, this;
    }
    toJSON(e10) {
      let t10 = super.toJSON(e10);
      return null !== this.compareFunction && (t10.compareFunction = this.compareFunction), t10;
    }
  }
  class iX extends q {
    constructor(e10 = null) {
      super(), this.sourceTexture = e10, this.isExternalTexture = true;
    }
    copy(e10) {
      return super.copy(e10), this.sourceTexture = e10.sourceTexture, this;
    }
  }
  class ij {
    constructor() {
      this.type = "Curve", this.arcLengthDivisions = 200, this.needsUpdate = false, this.cacheArcLengths = null;
    }
    getPoint() {
      console.warn("THREE.Curve: .getPoint() not implemented.");
    }
    getPointAt(e10, t10) {
      let i10 = this.getUtoTmapping(e10);
      return this.getPoint(i10, t10);
    }
    getPoints(e10 = 5) {
      let t10 = [];
      for (let i10 = 0; i10 <= e10; i10++) t10.push(this.getPoint(i10 / e10));
      return t10;
    }
    getSpacedPoints(e10 = 5) {
      let t10 = [];
      for (let i10 = 0; i10 <= e10; i10++) t10.push(this.getPointAt(i10 / e10));
      return t10;
    }
    getLength() {
      let e10 = this.getLengths();
      return e10[e10.length - 1];
    }
    getLengths(e10 = this.arcLengthDivisions) {
      if (this.cacheArcLengths && this.cacheArcLengths.length === e10 + 1 && !this.needsUpdate) return this.cacheArcLengths;
      this.needsUpdate = false;
      let t10 = [], i10, n10 = this.getPoint(0), r10 = 0;
      t10.push(0);
      for (let a10 = 1; a10 <= e10; a10++) t10.push(r10 += (i10 = this.getPoint(a10 / e10)).distanceTo(n10)), n10 = i10;
      return this.cacheArcLengths = t10, t10;
    }
    updateArcLengths() {
      this.needsUpdate = true, this.getLengths();
    }
    getUtoTmapping(e10, t10 = null) {
      let i10, n10 = this.getLengths(), r10 = 0, a10 = n10.length;
      i10 = t10 || e10 * n10[a10 - 1];
      let s2 = 0, o2 = a10 - 1, l2;
      for (; s2 <= o2; ) if ((l2 = n10[r10 = Math.floor(s2 + (o2 - s2) / 2)] - i10) < 0) s2 = r10 + 1;
      else if (l2 > 0) o2 = r10 - 1;
      else {
        o2 = r10;
        break;
      }
      if (n10[r10 = o2] === i10) return r10 / (a10 - 1);
      let h2 = n10[r10], c2 = n10[r10 + 1];
      return (r10 + (i10 - h2) / (c2 - h2)) / (a10 - 1);
    }
    getTangent(e10, t10) {
      let i10 = e10 - 1e-4, n10 = e10 + 1e-4;
      i10 < 0 && (i10 = 0), n10 > 1 && (n10 = 1);
      let r10 = this.getPoint(i10), a10 = this.getPoint(n10), s2 = t10 || (r10.isVector2 ? new E() : new b());
      return s2.copy(a10).sub(r10).normalize(), s2;
    }
    getTangentAt(e10, t10) {
      let i10 = this.getUtoTmapping(e10);
      return this.getTangent(i10, t10);
    }
    computeFrenetFrames(e10, t10 = false) {
      let i10 = new b(), n10 = [], r10 = [], a10 = [], s2 = new b(), o2 = new eA();
      for (let t11 = 0; t11 <= e10; t11++) {
        let i11 = t11 / e10;
        n10[t11] = this.getTangentAt(i11, new b());
      }
      r10[0] = new b(), a10[0] = new b();
      let l2 = Number.MAX_VALUE, h2 = Math.abs(n10[0].x), c2 = Math.abs(n10[0].y), u2 = Math.abs(n10[0].z);
      h2 <= l2 && (l2 = h2, i10.set(1, 0, 0)), c2 <= l2 && (l2 = c2, i10.set(0, 1, 0)), u2 <= l2 && i10.set(0, 0, 1), s2.crossVectors(n10[0], i10).normalize(), r10[0].crossVectors(n10[0], s2), a10[0].crossVectors(n10[0], r10[0]);
      for (let t11 = 1; t11 <= e10; t11++) {
        if (r10[t11] = r10[t11 - 1].clone(), a10[t11] = a10[t11 - 1].clone(), s2.crossVectors(n10[t11 - 1], n10[t11]), s2.length() > Number.EPSILON) {
          s2.normalize();
          let e11 = Math.acos(v(n10[t11 - 1].dot(n10[t11]), -1, 1));
          r10[t11].applyMatrix4(o2.makeRotationAxis(s2, e11));
        }
        a10[t11].crossVectors(n10[t11], r10[t11]);
      }
      if (true === t10) {
        let t11 = Math.acos(v(r10[0].dot(r10[e10]), -1, 1));
        t11 /= e10, n10[0].dot(s2.crossVectors(r10[0], r10[e10])) > 0 && (t11 = -t11);
        for (let i11 = 1; i11 <= e10; i11++) r10[i11].applyMatrix4(o2.makeRotationAxis(n10[i11], t11 * i11)), a10[i11].crossVectors(n10[i11], r10[i11]);
      }
      return { tangents: n10, normals: r10, binormals: a10 };
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e10) {
      return this.arcLengthDivisions = e10.arcLengthDivisions, this;
    }
    toJSON() {
      let e10 = { metadata: { version: 4.7, type: "Curve", generator: "Curve.toJSON" } };
      return e10.arcLengthDivisions = this.arcLengthDivisions, e10.type = this.type, e10;
    }
    fromJSON(e10) {
      return this.arcLengthDivisions = e10.arcLengthDivisions, this;
    }
  }
  class iq extends ij {
    constructor(e10 = 0, t10 = 0, i10 = 1, n10 = 1, r10 = 0, a10 = 2 * Math.PI, s2 = false, o2 = 0) {
      super(), this.isEllipseCurve = true, this.type = "EllipseCurve", this.aX = e10, this.aY = t10, this.xRadius = i10, this.yRadius = n10, this.aStartAngle = r10, this.aEndAngle = a10, this.aClockwise = s2, this.aRotation = o2;
    }
    getPoint(e10, t10 = new E()) {
      let i10 = 2 * Math.PI, n10 = this.aEndAngle - this.aStartAngle, r10 = Math.abs(n10) < Number.EPSILON;
      for (; n10 < 0; ) n10 += i10;
      for (; n10 > i10; ) n10 -= i10;
      n10 < Number.EPSILON && (n10 = r10 ? 0 : i10), true !== this.aClockwise || r10 || (n10 === i10 ? n10 = -i10 : n10 -= i10);
      let a10 = this.aStartAngle + e10 * n10, s2 = this.aX + this.xRadius * Math.cos(a10), o2 = this.aY + this.yRadius * Math.sin(a10);
      if (0 !== this.aRotation) {
        let e11 = Math.cos(this.aRotation), t11 = Math.sin(this.aRotation), i11 = s2 - this.aX, n11 = o2 - this.aY;
        s2 = i11 * e11 - n11 * t11 + this.aX, o2 = i11 * t11 + n11 * e11 + this.aY;
      }
      return t10.set(s2, o2);
    }
    copy(e10) {
      return super.copy(e10), this.aX = e10.aX, this.aY = e10.aY, this.xRadius = e10.xRadius, this.yRadius = e10.yRadius, this.aStartAngle = e10.aStartAngle, this.aEndAngle = e10.aEndAngle, this.aClockwise = e10.aClockwise, this.aRotation = e10.aRotation, this;
    }
    toJSON() {
      let e10 = super.toJSON();
      return e10.aX = this.aX, e10.aY = this.aY, e10.xRadius = this.xRadius, e10.yRadius = this.yRadius, e10.aStartAngle = this.aStartAngle, e10.aEndAngle = this.aEndAngle, e10.aClockwise = this.aClockwise, e10.aRotation = this.aRotation, e10;
    }
    fromJSON(e10) {
      return super.fromJSON(e10), this.aX = e10.aX, this.aY = e10.aY, this.xRadius = e10.xRadius, this.yRadius = e10.yRadius, this.aStartAngle = e10.aStartAngle, this.aEndAngle = e10.aEndAngle, this.aClockwise = e10.aClockwise, this.aRotation = e10.aRotation, this;
    }
  }
  function iY() {
    let e10 = 0, t10 = 0, i10 = 0, n10 = 0;
    function r10(r11, a10, s2, o2) {
      e10 = r11, t10 = s2, i10 = -3 * r11 + 3 * a10 - 2 * s2 - o2, n10 = 2 * r11 - 2 * a10 + s2 + o2;
    }
    return { initCatmullRom: function(e11, t11, i11, n11, a10) {
      r10(t11, i11, a10 * (i11 - e11), a10 * (n11 - t11));
    }, initNonuniformCatmullRom: function(e11, t11, i11, n11, a10, s2, o2) {
      let l2 = (t11 - e11) / a10 - (i11 - e11) / (a10 + s2) + (i11 - t11) / s2, h2 = (i11 - t11) / s2 - (n11 - t11) / (s2 + o2) + (n11 - i11) / o2;
      r10(t11, i11, l2 *= s2, h2 *= s2);
    }, calc: function(r11) {
      let a10 = r11 * r11;
      return e10 + t10 * r11 + i10 * a10 + a10 * r11 * n10;
    } };
  }
  let iK = new b(), iJ = new iY(), iZ = new iY(), i$ = new iY();
  function iQ(e10, t10, i10, n10, r10) {
    let a10 = (n10 - t10) * 0.5, s2 = (r10 - i10) * 0.5, o2 = e10 * e10;
    return e10 * o2 * (2 * i10 - 2 * n10 + a10 + s2) + (-3 * i10 + 3 * n10 - 2 * a10 - s2) * o2 + a10 * e10 + i10;
  }
  function i0(e10, t10, i10, n10) {
    let r10;
    return (r10 = 1 - e10) * r10 * t10 + 2 * (1 - e10) * e10 * i10 + e10 * e10 * n10;
  }
  function i1(e10, t10, i10, n10, r10) {
    let a10, s2;
    return (a10 = 1 - e10) * a10 * a10 * t10 + 3 * (s2 = 1 - e10) * s2 * e10 * i10 + 3 * (1 - e10) * e10 * e10 * n10 + e10 * e10 * e10 * r10;
  }
  class i2 extends ij {
    constructor(e10 = new E(), t10 = new E(), i10 = new E(), n10 = new E()) {
      super(), this.isCubicBezierCurve = true, this.type = "CubicBezierCurve", this.v0 = e10, this.v1 = t10, this.v2 = i10, this.v3 = n10;
    }
    getPoint(e10, t10 = new E()) {
      let i10 = this.v0, n10 = this.v1, r10 = this.v2, a10 = this.v3;
      return t10.set(i1(e10, i10.x, n10.x, r10.x, a10.x), i1(e10, i10.y, n10.y, r10.y, a10.y)), t10;
    }
    copy(e10) {
      return super.copy(e10), this.v0.copy(e10.v0), this.v1.copy(e10.v1), this.v2.copy(e10.v2), this.v3.copy(e10.v3), this;
    }
    toJSON() {
      let e10 = super.toJSON();
      return e10.v0 = this.v0.toArray(), e10.v1 = this.v1.toArray(), e10.v2 = this.v2.toArray(), e10.v3 = this.v3.toArray(), e10;
    }
    fromJSON(e10) {
      return super.fromJSON(e10), this.v0.fromArray(e10.v0), this.v1.fromArray(e10.v1), this.v2.fromArray(e10.v2), this.v3.fromArray(e10.v3), this;
    }
  }
  class i3 extends ij {
    constructor(e10 = new E(), t10 = new E()) {
      super(), this.isLineCurve = true, this.type = "LineCurve", this.v1 = e10, this.v2 = t10;
    }
    getPoint(e10, t10 = new E()) {
      return 1 === e10 ? t10.copy(this.v2) : (t10.copy(this.v2).sub(this.v1), t10.multiplyScalar(e10).add(this.v1)), t10;
    }
    getPointAt(e10, t10) {
      return this.getPoint(e10, t10);
    }
    getTangent(e10, t10 = new E()) {
      return t10.subVectors(this.v2, this.v1).normalize();
    }
    getTangentAt(e10, t10) {
      return this.getTangent(e10, t10);
    }
    copy(e10) {
      return super.copy(e10), this.v1.copy(e10.v1), this.v2.copy(e10.v2), this;
    }
    toJSON() {
      let e10 = super.toJSON();
      return e10.v1 = this.v1.toArray(), e10.v2 = this.v2.toArray(), e10;
    }
    fromJSON(e10) {
      return super.fromJSON(e10), this.v1.fromArray(e10.v1), this.v2.fromArray(e10.v2), this;
    }
  }
  class i4 extends ij {
    constructor(e10 = new E(), t10 = new E(), i10 = new E()) {
      super(), this.isQuadraticBezierCurve = true, this.type = "QuadraticBezierCurve", this.v0 = e10, this.v1 = t10, this.v2 = i10;
    }
    getPoint(e10, t10 = new E()) {
      let i10 = this.v0, n10 = this.v1, r10 = this.v2;
      return t10.set(i0(e10, i10.x, n10.x, r10.x), i0(e10, i10.y, n10.y, r10.y)), t10;
    }
    copy(e10) {
      return super.copy(e10), this.v0.copy(e10.v0), this.v1.copy(e10.v1), this.v2.copy(e10.v2), this;
    }
    toJSON() {
      let e10 = super.toJSON();
      return e10.v0 = this.v0.toArray(), e10.v1 = this.v1.toArray(), e10.v2 = this.v2.toArray(), e10;
    }
    fromJSON(e10) {
      return super.fromJSON(e10), this.v0.fromArray(e10.v0), this.v1.fromArray(e10.v1), this.v2.fromArray(e10.v2), this;
    }
  }
  class i5 extends ij {
    constructor(e10 = []) {
      super(), this.isSplineCurve = true, this.type = "SplineCurve", this.points = e10;
    }
    getPoint(e10, t10 = new E()) {
      let i10 = this.points, n10 = (i10.length - 1) * e10, r10 = Math.floor(n10), a10 = n10 - r10, s2 = i10[0 === r10 ? r10 : r10 - 1], o2 = i10[r10], l2 = i10[r10 > i10.length - 2 ? i10.length - 1 : r10 + 1], h2 = i10[r10 > i10.length - 3 ? i10.length - 1 : r10 + 2];
      return t10.set(iQ(a10, s2.x, o2.x, l2.x, h2.x), iQ(a10, s2.y, o2.y, l2.y, h2.y)), t10;
    }
    copy(e10) {
      super.copy(e10), this.points = [];
      for (let t10 = 0, i10 = e10.points.length; t10 < i10; t10++) {
        let i11 = e10.points[t10];
        this.points.push(i11.clone());
      }
      return this;
    }
    toJSON() {
      let e10 = super.toJSON();
      e10.points = [];
      for (let t10 = 0, i10 = this.points.length; t10 < i10; t10++) {
        let i11 = this.points[t10];
        e10.points.push(i11.toArray());
      }
      return e10;
    }
    fromJSON(e10) {
      super.fromJSON(e10), this.points = [];
      for (let t10 = 0, i10 = e10.points.length; t10 < i10; t10++) {
        let i11 = e10.points[t10];
        this.points.push(new E().fromArray(i11));
      }
      return this;
    }
  }
  class i6 extends tw {
    constructor(e10 = 1, t10 = 1, i10 = 1, n10 = 1) {
      super(), this.type = "PlaneGeometry", this.parameters = { width: e10, height: t10, widthSegments: i10, heightSegments: n10 };
      const r10 = e10 / 2, a10 = t10 / 2, s2 = Math.floor(i10), o2 = Math.floor(n10), l2 = s2 + 1, h2 = o2 + 1, c2 = e10 / s2, u2 = t10 / o2, d2 = [], p2 = [], f2 = [], m2 = [];
      for (let e11 = 0; e11 < h2; e11++) {
        const t11 = e11 * u2 - a10;
        for (let i11 = 0; i11 < l2; i11++) {
          const n11 = i11 * c2 - r10;
          p2.push(n11, -t11, 0), f2.push(0, 0, 1), m2.push(i11 / s2), m2.push(1 - e11 / o2);
        }
      }
      for (let e11 = 0; e11 < o2; e11++) for (let t11 = 0; t11 < s2; t11++) {
        const i11 = t11 + l2 * e11, n11 = t11 + l2 * (e11 + 1), r11 = t11 + 1 + l2 * (e11 + 1), a11 = t11 + 1 + l2 * e11;
        d2.push(i11, n11, a11), d2.push(n11, r11, a11);
      }
      this.setIndex(d2), this.setAttribute("position", new tx(p2, 3)), this.setAttribute("normal", new tx(f2, 3)), this.setAttribute("uv", new tx(m2, 2));
    }
    copy(e10) {
      return super.copy(e10), this.parameters = Object.assign({}, e10.parameters), this;
    }
    static fromJSON(e10) {
      return new i6(e10.width, e10.height, e10.widthSegments, e10.heightSegments);
    }
  }
  class i8 extends tu {
    constructor(e10) {
      super(), this.isMeshStandardMaterial = true, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new tl(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new tl(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new E(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new eO(), this.envMapIntensity = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = false, this.fog = true, this.setValues(e10);
    }
    copy(e10) {
      return super.copy(e10), this.defines = { STANDARD: "" }, this.color.copy(e10.color), this.roughness = e10.roughness, this.metalness = e10.metalness, this.map = e10.map, this.lightMap = e10.lightMap, this.lightMapIntensity = e10.lightMapIntensity, this.aoMap = e10.aoMap, this.aoMapIntensity = e10.aoMapIntensity, this.emissive.copy(e10.emissive), this.emissiveMap = e10.emissiveMap, this.emissiveIntensity = e10.emissiveIntensity, this.bumpMap = e10.bumpMap, this.bumpScale = e10.bumpScale, this.normalMap = e10.normalMap, this.normalMapType = e10.normalMapType, this.normalScale.copy(e10.normalScale), this.displacementMap = e10.displacementMap, this.displacementScale = e10.displacementScale, this.displacementBias = e10.displacementBias, this.roughnessMap = e10.roughnessMap, this.metalnessMap = e10.metalnessMap, this.alphaMap = e10.alphaMap, this.envMap = e10.envMap, this.envMapRotation.copy(e10.envMapRotation), this.envMapIntensity = e10.envMapIntensity, this.wireframe = e10.wireframe, this.wireframeLinewidth = e10.wireframeLinewidth, this.wireframeLinecap = e10.wireframeLinecap, this.wireframeLinejoin = e10.wireframeLinejoin, this.flatShading = e10.flatShading, this.fog = e10.fog, this;
    }
  }
  class i9 extends tu {
    constructor(e10) {
      super(), this.isMeshDepthMaterial = true, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = false, this.wireframeLinewidth = 1, this.setValues(e10);
    }
    copy(e10) {
      return super.copy(e10), this.depthPacking = e10.depthPacking, this.map = e10.map, this.alphaMap = e10.alphaMap, this.displacementMap = e10.displacementMap, this.displacementScale = e10.displacementScale, this.displacementBias = e10.displacementBias, this.wireframe = e10.wireframe, this.wireframeLinewidth = e10.wireframeLinewidth, this;
    }
  }
  class i7 extends tu {
    constructor(e10) {
      super(), this.isMeshDistanceMaterial = true, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e10);
    }
    copy(e10) {
      return super.copy(e10), this.map = e10.map, this.alphaMap = e10.alphaMap, this.displacementMap = e10.displacementMap, this.displacementScale = e10.displacementScale, this.displacementBias = e10.displacementBias, this;
    }
  }
  function ne(e10, t10) {
    return e10 && e10.constructor !== t10 ? "number" == typeof t10.BYTES_PER_ELEMENT ? new t10(e10) : Array.prototype.slice.call(e10) : e10;
  }
  function nt(e10, t10, i10) {
    let n10 = e10.length, r10 = new e10.constructor(n10);
    for (let a10 = 0, s2 = 0; s2 !== n10; ++a10) {
      let n11 = i10[a10] * t10;
      for (let i11 = 0; i11 !== t10; ++i11) r10[s2++] = e10[n11 + i11];
    }
    return r10;
  }
  function ni(e10, t10, i10, n10) {
    let r10 = 1, a10 = e10[0];
    for (; void 0 !== a10 && void 0 === a10[n10]; ) a10 = e10[r10++];
    if (void 0 === a10) return;
    let s2 = a10[n10];
    if (void 0 !== s2) if (Array.isArray(s2)) do
      void 0 !== (s2 = a10[n10]) && (t10.push(a10.time), i10.push(...s2)), a10 = e10[r10++];
    while (void 0 !== a10);
    else if (void 0 !== s2.toArray) do
      void 0 !== (s2 = a10[n10]) && (t10.push(a10.time), s2.toArray(i10, i10.length)), a10 = e10[r10++];
    while (void 0 !== a10);
    else do
      void 0 !== (s2 = a10[n10]) && (t10.push(a10.time), i10.push(s2)), a10 = e10[r10++];
    while (void 0 !== a10);
  }
  class nn {
    constructor(e10, t10, i10, n10) {
      this.parameterPositions = e10, this._cachedIndex = 0, this.resultBuffer = void 0 !== n10 ? n10 : new t10.constructor(i10), this.sampleValues = t10, this.valueSize = i10, this.settings = null, this.DefaultSettings_ = {};
    }
    evaluate(e10) {
      let t10 = this.parameterPositions, i10 = this._cachedIndex, n10 = t10[i10], r10 = t10[i10 - 1];
      e: {
        t: {
          let a10;
          i: {
            n: if (!(e10 < n10)) {
              for (let a11 = i10 + 2; ; ) {
                if (void 0 === n10) {
                  if (e10 < r10) break n;
                  return i10 = t10.length, this._cachedIndex = i10, this.copySampleValue_(i10 - 1);
                }
                if (i10 === a11) break;
                if (r10 = n10, e10 < (n10 = t10[++i10])) break t;
              }
              a10 = t10.length;
              break i;
            }
            if (!(e10 >= r10)) {
              let s2 = t10[1];
              e10 < s2 && (i10 = 2, r10 = s2);
              for (let a11 = i10 - 2; ; ) {
                if (void 0 === r10) return this._cachedIndex = 0, this.copySampleValue_(0);
                if (i10 === a11) break;
                if (n10 = r10, e10 >= (r10 = t10[--i10 - 1])) break t;
              }
              a10 = i10, i10 = 0;
              break i;
            }
            break e;
          }
          for (; i10 < a10; ) {
            let n11 = i10 + a10 >>> 1;
            e10 < t10[n11] ? a10 = n11 : i10 = n11 + 1;
          }
          if (n10 = t10[i10], void 0 === (r10 = t10[i10 - 1])) return this._cachedIndex = 0, this.copySampleValue_(0);
          if (void 0 === n10) return i10 = t10.length, this._cachedIndex = i10, this.copySampleValue_(i10 - 1);
        }
        this._cachedIndex = i10, this.intervalChanged_(i10, r10, n10);
      }
      return this.interpolate_(i10, r10, e10, n10);
    }
    getSettings_() {
      return this.settings || this.DefaultSettings_;
    }
    copySampleValue_(e10) {
      let t10 = this.resultBuffer, i10 = this.sampleValues, n10 = this.valueSize, r10 = e10 * n10;
      for (let e11 = 0; e11 !== n10; ++e11) t10[e11] = i10[r10 + e11];
      return t10;
    }
    interpolate_() {
      throw Error("call to abstract method");
    }
    intervalChanged_() {
    }
  }
  class nr extends nn {
    constructor(e10, t10, i10, n10) {
      super(e10, t10, i10, n10), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = { endingStart: 2400, endingEnd: 2400 };
    }
    intervalChanged_(e10, t10, i10) {
      let n10 = this.parameterPositions, r10 = e10 - 2, a10 = e10 + 1, s2 = n10[r10], o2 = n10[a10];
      if (void 0 === s2) switch (this.getSettings_().endingStart) {
        case 2401:
          r10 = e10, s2 = 2 * t10 - i10;
          break;
        case 2402:
          r10 = n10.length - 2, s2 = t10 + n10[r10] - n10[r10 + 1];
          break;
        default:
          r10 = e10, s2 = i10;
      }
      if (void 0 === o2) switch (this.getSettings_().endingEnd) {
        case 2401:
          a10 = e10, o2 = 2 * i10 - t10;
          break;
        case 2402:
          a10 = 1, o2 = i10 + n10[1] - n10[0];
          break;
        default:
          a10 = e10 - 1, o2 = t10;
      }
      let l2 = (i10 - t10) * 0.5, h2 = this.valueSize;
      this._weightPrev = l2 / (t10 - s2), this._weightNext = l2 / (o2 - i10), this._offsetPrev = r10 * h2, this._offsetNext = a10 * h2;
    }
    interpolate_(e10, t10, i10, n10) {
      let r10 = this.resultBuffer, a10 = this.sampleValues, s2 = this.valueSize, o2 = e10 * s2, l2 = o2 - s2, h2 = this._offsetPrev, c2 = this._offsetNext, u2 = this._weightPrev, d2 = this._weightNext, p2 = (i10 - t10) / (n10 - t10), f2 = p2 * p2, m2 = f2 * p2, g2 = -u2 * m2 + 2 * u2 * f2 - u2 * p2, _2 = (1 + u2) * m2 + (-1.5 - 2 * u2) * f2 + (-0.5 + u2) * p2 + 1, v2 = (-1 - d2) * m2 + (1.5 + d2) * f2 + 0.5 * p2, x2 = d2 * m2 - d2 * f2;
      for (let e11 = 0; e11 !== s2; ++e11) r10[e11] = g2 * a10[h2 + e11] + _2 * a10[l2 + e11] + v2 * a10[o2 + e11] + x2 * a10[c2 + e11];
      return r10;
    }
  }
  class na extends nn {
    constructor(e10, t10, i10, n10) {
      super(e10, t10, i10, n10);
    }
    interpolate_(e10, t10, i10, n10) {
      let r10 = this.resultBuffer, a10 = this.sampleValues, s2 = this.valueSize, o2 = e10 * s2, l2 = o2 - s2, h2 = (i10 - t10) / (n10 - t10), c2 = 1 - h2;
      for (let e11 = 0; e11 !== s2; ++e11) r10[e11] = a10[l2 + e11] * c2 + a10[o2 + e11] * h2;
      return r10;
    }
  }
  class ns extends nn {
    constructor(e10, t10, i10, n10) {
      super(e10, t10, i10, n10);
    }
    interpolate_(e10) {
      return this.copySampleValue_(e10 - 1);
    }
  }
  class no {
    constructor(e10, t10, i10, n10) {
      if (void 0 === e10) throw Error("THREE.KeyframeTrack: track name is undefined");
      if (void 0 === t10 || 0 === t10.length) throw Error("THREE.KeyframeTrack: no keyframes in track named " + e10);
      this.name = e10, this.times = ne(t10, this.TimeBufferType), this.values = ne(i10, this.ValueBufferType), this.setInterpolation(n10 || this.DefaultInterpolation);
    }
    static toJSON(e10) {
      let t10, i10 = e10.constructor;
      if (i10.toJSON !== this.toJSON) t10 = i10.toJSON(e10);
      else {
        t10 = { name: e10.name, times: ne(e10.times, Array), values: ne(e10.values, Array) };
        let i11 = e10.getInterpolation();
        i11 !== e10.DefaultInterpolation && (t10.interpolation = i11);
      }
      return t10.type = e10.ValueTypeName, t10;
    }
    InterpolantFactoryMethodDiscrete(e10) {
      return new ns(this.times, this.values, this.getValueSize(), e10);
    }
    InterpolantFactoryMethodLinear(e10) {
      return new na(this.times, this.values, this.getValueSize(), e10);
    }
    InterpolantFactoryMethodSmooth(e10) {
      return new nr(this.times, this.values, this.getValueSize(), e10);
    }
    setInterpolation(e10) {
      let t10;
      switch (e10) {
        case 2300:
          t10 = this.InterpolantFactoryMethodDiscrete;
          break;
        case 2301:
          t10 = this.InterpolantFactoryMethodLinear;
          break;
        case 2302:
          t10 = this.InterpolantFactoryMethodSmooth;
      }
      if (void 0 === t10) {
        let t11 = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
        if (void 0 === this.createInterpolant) if (e10 !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
        else throw Error(t11);
        return console.warn("THREE.KeyframeTrack:", t11), this;
      }
      return this.createInterpolant = t10, this;
    }
    getInterpolation() {
      switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
          return 2300;
        case this.InterpolantFactoryMethodLinear:
          return 2301;
        case this.InterpolantFactoryMethodSmooth:
          return 2302;
      }
    }
    getValueSize() {
      return this.values.length / this.times.length;
    }
    shift(e10) {
      if (0 !== e10) {
        let t10 = this.times;
        for (let i10 = 0, n10 = t10.length; i10 !== n10; ++i10) t10[i10] += e10;
      }
      return this;
    }
    scale(e10) {
      if (1 !== e10) {
        let t10 = this.times;
        for (let i10 = 0, n10 = t10.length; i10 !== n10; ++i10) t10[i10] *= e10;
      }
      return this;
    }
    trim(e10, t10) {
      let i10 = this.times, n10 = i10.length, r10 = 0, a10 = n10 - 1;
      for (; r10 !== n10 && i10[r10] < e10; ) ++r10;
      for (; -1 !== a10 && i10[a10] > t10; ) --a10;
      if (++a10, 0 !== r10 || a10 !== n10) {
        r10 >= a10 && (r10 = (a10 = Math.max(a10, 1)) - 1);
        let e11 = this.getValueSize();
        this.times = i10.slice(r10, a10), this.values = this.values.slice(r10 * e11, a10 * e11);
      }
      return this;
    }
    validate() {
      var e10;
      let t10 = true, i10 = this.getValueSize();
      i10 - Math.floor(i10) != 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), t10 = false);
      let n10 = this.times, r10 = this.values, a10 = n10.length;
      0 === a10 && (console.error("THREE.KeyframeTrack: Track is empty.", this), t10 = false);
      let s2 = null;
      for (let e11 = 0; e11 !== a10; e11++) {
        let i11 = n10[e11];
        if ("number" == typeof i11 && isNaN(i11)) {
          console.error("THREE.KeyframeTrack: Time is not a valid number.", this, e11, i11), t10 = false;
          break;
        }
        if (null !== s2 && s2 > i11) {
          console.error("THREE.KeyframeTrack: Out of order keys.", this, e11, i11, s2), t10 = false;
          break;
        }
        s2 = i11;
      }
      if (void 0 !== r10 && ArrayBuffer.isView(e10 = r10) && !(e10 instanceof DataView)) for (let e11 = 0, i11 = r10.length; e11 !== i11; ++e11) {
        let i12 = r10[e11];
        if (isNaN(i12)) {
          console.error("THREE.KeyframeTrack: Value is not a valid number.", this, e11, i12), t10 = false;
          break;
        }
      }
      return t10;
    }
    optimize() {
      let e10 = this.times.slice(), t10 = this.values.slice(), i10 = this.getValueSize(), n10 = 2302 === this.getInterpolation(), r10 = e10.length - 1, a10 = 1;
      for (let s2 = 1; s2 < r10; ++s2) {
        let r11 = false, o2 = e10[s2];
        if (o2 !== e10[s2 + 1] && (1 !== s2 || o2 !== e10[0])) if (n10) r11 = true;
        else {
          let e11 = s2 * i10, n11 = e11 - i10, a11 = e11 + i10;
          for (let s3 = 0; s3 !== i10; ++s3) {
            let i11 = t10[e11 + s3];
            if (i11 !== t10[n11 + s3] || i11 !== t10[a11 + s3]) {
              r11 = true;
              break;
            }
          }
        }
        if (r11) {
          if (s2 !== a10) {
            e10[a10] = e10[s2];
            let n11 = s2 * i10, r12 = a10 * i10;
            for (let e11 = 0; e11 !== i10; ++e11) t10[r12 + e11] = t10[n11 + e11];
          }
          ++a10;
        }
      }
      if (r10 > 0) {
        e10[a10] = e10[r10];
        for (let e11 = r10 * i10, n11 = a10 * i10, s2 = 0; s2 !== i10; ++s2) t10[n11 + s2] = t10[e11 + s2];
        ++a10;
      }
      return a10 !== e10.length ? (this.times = e10.slice(0, a10), this.values = t10.slice(0, a10 * i10)) : (this.times = e10, this.values = t10), this;
    }
    clone() {
      let e10 = this.times.slice(), t10 = this.values.slice(), i10 = new this.constructor(this.name, e10, t10);
      return i10.createInterpolant = this.createInterpolant, i10;
    }
  }
  no.prototype.ValueTypeName = "", no.prototype.TimeBufferType = Float32Array, no.prototype.ValueBufferType = Float32Array, no.prototype.DefaultInterpolation = 2301;
  class nl extends no {
    constructor(e10, t10, i10) {
      super(e10, t10, i10);
    }
  }
  nl.prototype.ValueTypeName = "bool", nl.prototype.ValueBufferType = Array, nl.prototype.DefaultInterpolation = 2300, nl.prototype.InterpolantFactoryMethodLinear = void 0, nl.prototype.InterpolantFactoryMethodSmooth = void 0;
  class nh extends no {
    constructor(e10, t10, i10, n10) {
      super(e10, t10, i10, n10);
    }
  }
  nh.prototype.ValueTypeName = "color";
  class nc extends no {
    constructor(e10, t10, i10, n10) {
      super(e10, t10, i10, n10);
    }
  }
  nc.prototype.ValueTypeName = "number";
  class nu extends nn {
    constructor(e10, t10, i10, n10) {
      super(e10, t10, i10, n10);
    }
    interpolate_(e10, t10, i10, n10) {
      let r10 = this.resultBuffer, a10 = this.sampleValues, s2 = this.valueSize, o2 = (i10 - t10) / (n10 - t10), l2 = e10 * s2;
      for (let e11 = l2 + s2; l2 !== e11; l2 += 4) T.slerpFlat(r10, 0, a10, l2 - s2, a10, l2, o2);
      return r10;
    }
  }
  class nd extends no {
    constructor(e10, t10, i10, n10) {
      super(e10, t10, i10, n10);
    }
    InterpolantFactoryMethodLinear(e10) {
      return new nu(this.times, this.values, this.getValueSize(), e10);
    }
  }
  nd.prototype.ValueTypeName = "quaternion", nd.prototype.InterpolantFactoryMethodSmooth = void 0;
  class np extends no {
    constructor(e10, t10, i10) {
      super(e10, t10, i10);
    }
  }
  np.prototype.ValueTypeName = "string", np.prototype.ValueBufferType = Array, np.prototype.DefaultInterpolation = 2300, np.prototype.InterpolantFactoryMethodLinear = void 0, np.prototype.InterpolantFactoryMethodSmooth = void 0;
  class nf extends no {
    constructor(e10, t10, i10, n10) {
      super(e10, t10, i10, n10);
    }
  }
  nf.prototype.ValueTypeName = "vector";
  class nm {
    constructor(e10 = "", t10 = -1, i10 = [], n10 = 2500) {
      this.name = e10, this.tracks = i10, this.duration = t10, this.blendMode = n10, this.uuid = _(), this.userData = {}, this.duration < 0 && this.resetDuration();
    }
    static parse(e10) {
      let t10 = [], i10 = e10.tracks, n10 = 1 / (e10.fps || 1);
      for (let e11 = 0, r11 = i10.length; e11 !== r11; ++e11) t10.push((function(e12) {
        if (void 0 === e12.type) throw Error("THREE.KeyframeTrack: track type undefined, can not parse");
        let t11 = (function(e13) {
          switch (e13.toLowerCase()) {
            case "scalar":
            case "double":
            case "float":
            case "number":
            case "integer":
              return nc;
            case "vector":
            case "vector2":
            case "vector3":
            case "vector4":
              return nf;
            case "color":
              return nh;
            case "quaternion":
              return nd;
            case "bool":
            case "boolean":
              return nl;
            case "string":
              return np;
          }
          throw Error("THREE.KeyframeTrack: Unsupported typeName: " + e13);
        })(e12.type);
        if (void 0 === e12.times) {
          let t12 = [], i11 = [];
          ni(e12.keys, t12, i11, "value"), e12.times = t12, e12.values = i11;
        }
        return void 0 !== t11.parse ? t11.parse(e12) : new t11(e12.name, e12.times, e12.values, e12.interpolation);
      })(i10[e11]).scale(n10));
      let r10 = new this(e10.name, e10.duration, t10, e10.blendMode);
      return r10.uuid = e10.uuid, r10.userData = JSON.parse(e10.userData || "{}"), r10;
    }
    static toJSON(e10) {
      let t10 = [], i10 = e10.tracks, n10 = { name: e10.name, duration: e10.duration, tracks: t10, uuid: e10.uuid, blendMode: e10.blendMode, userData: JSON.stringify(e10.userData) };
      for (let e11 = 0, n11 = i10.length; e11 !== n11; ++e11) t10.push(no.toJSON(i10[e11]));
      return n10;
    }
    static CreateFromMorphTargetSequence(e10, t10, i10, n10) {
      let r10 = t10.length, a10 = [];
      for (let e11 = 0; e11 < r10; e11++) {
        let s2 = [], o2 = [];
        s2.push((e11 + r10 - 1) % r10, e11, (e11 + 1) % r10), o2.push(0, 1, 0);
        let l2 = (function(e12) {
          let t11 = e12.length, i11 = Array(t11);
          for (let e13 = 0; e13 !== t11; ++e13) i11[e13] = e13;
          return i11.sort(function(t12, i12) {
            return e12[t12] - e12[i12];
          }), i11;
        })(s2);
        s2 = nt(s2, 1, l2), o2 = nt(o2, 1, l2), n10 || 0 !== s2[0] || (s2.push(r10), o2.push(o2[0])), a10.push(new nc(".morphTargetInfluences[" + t10[e11].name + "]", s2, o2).scale(1 / i10));
      }
      return new this(e10, -1, a10);
    }
    static findByName(e10, t10) {
      let i10 = e10;
      Array.isArray(e10) || (i10 = e10.geometry && e10.geometry.animations || e10.animations);
      for (let e11 = 0; e11 < i10.length; e11++) if (i10[e11].name === t10) return i10[e11];
      return null;
    }
    static CreateClipsFromMorphTargetSequences(e10, t10, i10) {
      let n10 = {}, r10 = /^([\w-]*?)([\d]+)$/;
      for (let t11 = 0, i11 = e10.length; t11 < i11; t11++) {
        let i12 = e10[t11], a11 = i12.name.match(r10);
        if (a11 && a11.length > 1) {
          let e11 = a11[1], t12 = n10[e11];
          t12 || (n10[e11] = t12 = []), t12.push(i12);
        }
      }
      let a10 = [];
      for (let e11 in n10) a10.push(this.CreateFromMorphTargetSequence(e11, n10[e11], t10, i10));
      return a10;
    }
    static parseAnimation(e10, t10) {
      if (console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"), !e10) return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null;
      let i10 = function(e11, t11, i11, n11, r11) {
        if (0 !== i11.length) {
          let a11 = [], s3 = [];
          ni(i11, a11, s3, n11), 0 !== a11.length && r11.push(new e11(t11, a11, s3));
        }
      }, n10 = [], r10 = e10.name || "default", a10 = e10.fps || 30, s2 = e10.blendMode, o2 = e10.length || -1, l2 = e10.hierarchy || [];
      for (let e11 = 0; e11 < l2.length; e11++) {
        let r11 = l2[e11].keys;
        if (r11 && 0 !== r11.length) if (r11[0].morphTargets) {
          let e12, t11 = {};
          for (e12 = 0; e12 < r11.length; e12++) if (r11[e12].morphTargets) for (let i11 = 0; i11 < r11[e12].morphTargets.length; i11++) t11[r11[e12].morphTargets[i11]] = -1;
          for (let i11 in t11) {
            let t12 = [], a11 = [];
            for (let n11 = 0; n11 !== r11[e12].morphTargets.length; ++n11) {
              let n12 = r11[e12];
              t12.push(n12.time), a11.push(+(n12.morphTarget === i11));
            }
            n10.push(new nc(".morphTargetInfluence[" + i11 + "]", t12, a11));
          }
          o2 = t11.length * a10;
        } else {
          let a11 = ".bones[" + t10[e11].name + "]";
          i10(nf, a11 + ".position", r11, "pos", n10), i10(nd, a11 + ".quaternion", r11, "rot", n10), i10(nf, a11 + ".scale", r11, "scl", n10);
        }
      }
      return 0 === n10.length ? null : new this(r10, o2, n10, s2);
    }
    resetDuration() {
      let e10 = this.tracks, t10 = 0;
      for (let i10 = 0, n10 = e10.length; i10 !== n10; ++i10) {
        let e11 = this.tracks[i10];
        t10 = Math.max(t10, e11.times[e11.times.length - 1]);
      }
      return this.duration = t10, this;
    }
    trim() {
      for (let e10 = 0; e10 < this.tracks.length; e10++) this.tracks[e10].trim(0, this.duration);
      return this;
    }
    validate() {
      let e10 = true;
      for (let t10 = 0; t10 < this.tracks.length; t10++) e10 = e10 && this.tracks[t10].validate();
      return e10;
    }
    optimize() {
      for (let e10 = 0; e10 < this.tracks.length; e10++) this.tracks[e10].optimize();
      return this;
    }
    clone() {
      let e10 = [];
      for (let t11 = 0; t11 < this.tracks.length; t11++) e10.push(this.tracks[t11].clone());
      let t10 = new this.constructor(this.name, this.duration, e10, this.blendMode);
      return t10.userData = JSON.parse(JSON.stringify(this.userData)), t10;
    }
    toJSON() {
      return this.constructor.toJSON(this);
    }
  }
  let ng = { enabled: false, files: {}, add: function(e10, t10) {
    false !== this.enabled && (this.files[e10] = t10);
  }, get: function(e10) {
    if (false !== this.enabled) return this.files[e10];
  }, remove: function(e10) {
    delete this.files[e10];
  }, clear: function() {
    this.files = {};
  } }, n_ = new class {
    constructor(e10, t10, i10) {
      let n10;
      const r10 = this;
      let a10 = false, s2 = 0, o2 = 0;
      const l2 = [];
      this.onStart = void 0, this.onLoad = e10, this.onProgress = t10, this.onError = i10, this.abortController = new AbortController(), this.itemStart = function(e11) {
        o2++, false === a10 && void 0 !== r10.onStart && r10.onStart(e11, s2, o2), a10 = true;
      }, this.itemEnd = function(e11) {
        s2++, void 0 !== r10.onProgress && r10.onProgress(e11, s2, o2), s2 === o2 && (a10 = false, void 0 !== r10.onLoad && r10.onLoad());
      }, this.itemError = function(e11) {
        void 0 !== r10.onError && r10.onError(e11);
      }, this.resolveURL = function(e11) {
        return n10 ? n10(e11) : e11;
      }, this.setURLModifier = function(e11) {
        return n10 = e11, this;
      }, this.addHandler = function(e11, t11) {
        return l2.push(e11, t11), this;
      }, this.removeHandler = function(e11) {
        let t11 = l2.indexOf(e11);
        return -1 !== t11 && l2.splice(t11, 2), this;
      }, this.getHandler = function(e11) {
        for (let t11 = 0, i11 = l2.length; t11 < i11; t11 += 2) {
          let i12 = l2[t11], n11 = l2[t11 + 1];
          if (i12.global && (i12.lastIndex = 0), i12.test(e11)) return n11;
        }
        return null;
      }, this.abort = function() {
        return this.abortController.abort(), this.abortController = new AbortController(), this;
      };
    }
  }();
  class nv {
    constructor(e10) {
      this.manager = void 0 !== e10 ? e10 : n_, this.crossOrigin = "anonymous", this.withCredentials = false, this.path = "", this.resourcePath = "", this.requestHeader = {};
    }
    load() {
    }
    loadAsync(e10, t10) {
      let i10 = this;
      return new Promise(function(n10, r10) {
        i10.load(e10, n10, t10, r10);
      });
    }
    parse() {
    }
    setCrossOrigin(e10) {
      return this.crossOrigin = e10, this;
    }
    setWithCredentials(e10) {
      return this.withCredentials = e10, this;
    }
    setPath(e10) {
      return this.path = e10, this;
    }
    setResourcePath(e10) {
      return this.resourcePath = e10, this;
    }
    setRequestHeader(e10) {
      return this.requestHeader = e10, this;
    }
    abort() {
      return this;
    }
  }
  nv.DEFAULT_MATERIAL_NAME = "__DEFAULT";
  let nx = {};
  class ny extends Error {
    constructor(e10, t10) {
      super(e10), this.response = t10;
    }
  }
  let nM = /* @__PURE__ */ new WeakMap();
  class nS extends nv {
    constructor(e10) {
      super(e10);
    }
    load(e10, t10, i10, n10) {
      void 0 !== this.path && (e10 = this.path + e10), e10 = this.manager.resolveURL(e10);
      let r10 = this, a10 = ng.get(`image:${e10}`);
      if (void 0 !== a10) {
        if (true === a10.complete) r10.manager.itemStart(e10), setTimeout(function() {
          t10 && t10(a10), r10.manager.itemEnd(e10);
        }, 0);
        else {
          let e11 = nM.get(a10);
          void 0 === e11 && (e11 = [], nM.set(a10, e11)), e11.push({ onLoad: t10, onError: n10 });
        }
        return a10;
      }
      let s2 = I("img");
      function o2() {
        h2(), t10 && t10(this);
        let i11 = nM.get(this) || [];
        for (let e11 = 0; e11 < i11.length; e11++) {
          let t11 = i11[e11];
          t11.onLoad && t11.onLoad(this);
        }
        nM.delete(this), r10.manager.itemEnd(e10);
      }
      function l2(t11) {
        h2(), n10 && n10(t11), ng.remove(`image:${e10}`);
        let i11 = nM.get(this) || [];
        for (let e11 = 0; e11 < i11.length; e11++) {
          let n11 = i11[e11];
          n11.onError && n11.onError(t11);
        }
        nM.delete(this), r10.manager.itemError(e10), r10.manager.itemEnd(e10);
      }
      function h2() {
        s2.removeEventListener("load", o2, false), s2.removeEventListener("error", l2, false);
      }
      return s2.addEventListener("load", o2, false), s2.addEventListener("error", l2, false), "data:" !== e10.slice(0, 5) && void 0 !== this.crossOrigin && (s2.crossOrigin = this.crossOrigin), ng.add(`image:${e10}`, s2), r10.manager.itemStart(e10), s2.src = e10, s2;
    }
  }
  class nE extends eQ {
    constructor(e10, t10 = 1) {
      super(), this.isLight = true, this.type = "Light", this.color = new tl(e10), this.intensity = t10;
    }
    dispose() {
    }
    copy(e10, t10) {
      return super.copy(e10, t10), this.color.copy(e10.color), this.intensity = e10.intensity, this;
    }
    toJSON(e10) {
      let t10 = super.toJSON(e10);
      return t10.object.color = this.color.getHex(), t10.object.intensity = this.intensity, void 0 !== this.groundColor && (t10.object.groundColor = this.groundColor.getHex()), void 0 !== this.distance && (t10.object.distance = this.distance), void 0 !== this.angle && (t10.object.angle = this.angle), void 0 !== this.decay && (t10.object.decay = this.decay), void 0 !== this.penumbra && (t10.object.penumbra = this.penumbra), void 0 !== this.shadow && (t10.object.shadow = this.shadow.toJSON()), void 0 !== this.target && (t10.object.target = this.target.uuid), t10;
    }
  }
  let nT = new eA(), nb = new b(), nA = new b();
  class nw {
    constructor(e10) {
      this.camera = e10, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new E(512, 512), this.mapType = 1009, this.map = null, this.mapPass = null, this.matrix = new eA(), this.autoUpdate = true, this.needsUpdate = false, this._frustum = new ib(), this._frameExtents = new E(1, 1), this._viewportCount = 1, this._viewports = [new Y(0, 0, 1, 1)];
    }
    getViewportCount() {
      return this._viewportCount;
    }
    getFrustum() {
      return this._frustum;
    }
    updateMatrices(e10) {
      let t10 = this.camera, i10 = this.matrix;
      nb.setFromMatrixPosition(e10.matrixWorld), t10.position.copy(nb), nA.setFromMatrixPosition(e10.target.matrixWorld), t10.lookAt(nA), t10.updateMatrixWorld(), nT.multiplyMatrices(t10.projectionMatrix, t10.matrixWorldInverse), this._frustum.setFromProjectionMatrix(nT, t10.coordinateSystem, t10.reversedDepth), t10.reversedDepth ? i10.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 1, 0, 0, 0, 0, 1) : i10.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), i10.multiply(nT);
    }
    getViewport(e10) {
      return this._viewports[e10];
    }
    getFrameExtents() {
      return this._frameExtents;
    }
    dispose() {
      this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
    }
    copy(e10) {
      return this.camera = e10.camera.clone(), this.intensity = e10.intensity, this.bias = e10.bias, this.radius = e10.radius, this.autoUpdate = e10.autoUpdate, this.needsUpdate = e10.needsUpdate, this.normalBias = e10.normalBias, this.blurSamples = e10.blurSamples, this.mapSize.copy(e10.mapSize), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    toJSON() {
      let e10 = {};
      return 1 !== this.intensity && (e10.intensity = this.intensity), 0 !== this.bias && (e10.bias = this.bias), 0 !== this.normalBias && (e10.normalBias = this.normalBias), 1 !== this.radius && (e10.radius = this.radius), (512 !== this.mapSize.x || 512 !== this.mapSize.y) && (e10.mapSize = this.mapSize.toArray()), e10.camera = this.camera.toJSON(false).object, delete e10.camera.matrix, e10;
    }
  }
  class nR extends nw {
    constructor() {
      super(new tZ(50, 1, 0.5, 500)), this.isSpotLightShadow = true, this.focus = 1, this.aspect = 1;
    }
    updateMatrices(e10) {
      let t10 = this.camera, i10 = 2 * g * e10.angle * this.focus, n10 = this.mapSize.width / this.mapSize.height * this.aspect, r10 = e10.distance || t10.far;
      (i10 !== t10.fov || n10 !== t10.aspect || r10 !== t10.far) && (t10.fov = i10, t10.aspect = n10, t10.far = r10, t10.updateProjectionMatrix()), super.updateMatrices(e10);
    }
    copy(e10) {
      return super.copy(e10), this.focus = e10.focus, this;
    }
  }
  let nC = new eA(), nP = new b(), nI = new b();
  class nL extends nw {
    constructor() {
      super(new tZ(90, 1, 0.5, 500)), this.isPointLightShadow = true, this._frameExtents = new E(4, 2), this._viewportCount = 6, this._viewports = [new Y(2, 1, 1, 1), new Y(0, 1, 1, 1), new Y(3, 1, 1, 1), new Y(1, 1, 1, 1), new Y(3, 0, 1, 1), new Y(1, 0, 1, 1)], this._cubeDirections = [new b(1, 0, 0), new b(-1, 0, 0), new b(0, 0, 1), new b(0, 0, -1), new b(0, 1, 0), new b(0, -1, 0)], this._cubeUps = [new b(0, 1, 0), new b(0, 1, 0), new b(0, 1, 0), new b(0, 1, 0), new b(0, 0, 1), new b(0, 0, -1)];
    }
    updateMatrices(e10, t10 = 0) {
      let i10 = this.camera, n10 = this.matrix, r10 = e10.distance || i10.far;
      r10 !== i10.far && (i10.far = r10, i10.updateProjectionMatrix()), nP.setFromMatrixPosition(e10.matrixWorld), i10.position.copy(nP), nI.copy(i10.position), nI.add(this._cubeDirections[t10]), i10.up.copy(this._cubeUps[t10]), i10.lookAt(nI), i10.updateMatrixWorld(), n10.makeTranslation(-nP.x, -nP.y, -nP.z), nC.multiplyMatrices(i10.projectionMatrix, i10.matrixWorldInverse), this._frustum.setFromProjectionMatrix(nC, i10.coordinateSystem, i10.reversedDepth);
    }
  }
  class nU extends tq {
    constructor(e10 = -1, t10 = 1, i10 = 1, n10 = -1, r10 = 0.1, a10 = 2e3) {
      super(), this.isOrthographicCamera = true, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e10, this.right = t10, this.top = i10, this.bottom = n10, this.near = r10, this.far = a10, this.updateProjectionMatrix();
    }
    copy(e10, t10) {
      return super.copy(e10, t10), this.left = e10.left, this.right = e10.right, this.top = e10.top, this.bottom = e10.bottom, this.near = e10.near, this.far = e10.far, this.zoom = e10.zoom, this.view = null === e10.view ? null : Object.assign({}, e10.view), this;
    }
    setViewOffset(e10, t10, i10, n10, r10, a10) {
      null === this.view && (this.view = { enabled: true, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = true, this.view.fullWidth = e10, this.view.fullHeight = t10, this.view.offsetX = i10, this.view.offsetY = n10, this.view.width = r10, this.view.height = a10, this.updateProjectionMatrix();
    }
    clearViewOffset() {
      null !== this.view && (this.view.enabled = false), this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      let e10 = (this.right - this.left) / (2 * this.zoom), t10 = (this.top - this.bottom) / (2 * this.zoom), i10 = (this.right + this.left) / 2, n10 = (this.top + this.bottom) / 2, r10 = i10 - e10, a10 = i10 + e10, s2 = n10 + t10, o2 = n10 - t10;
      if (null !== this.view && this.view.enabled) {
        let e11 = (this.right - this.left) / this.view.fullWidth / this.zoom, t11 = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
        r10 += e11 * this.view.offsetX, a10 = r10 + e11 * this.view.width, s2 -= t11 * this.view.offsetY, o2 = s2 - t11 * this.view.height;
      }
      this.projectionMatrix.makeOrthographic(r10, a10, s2, o2, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(e10) {
      let t10 = super.toJSON(e10);
      return t10.object.zoom = this.zoom, t10.object.left = this.left, t10.object.right = this.right, t10.object.top = this.top, t10.object.bottom = this.bottom, t10.object.near = this.near, t10.object.far = this.far, null !== this.view && (t10.object.view = Object.assign({}, this.view)), t10;
    }
  }
  class nD extends nw {
    constructor() {
      super(new nU(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = true;
    }
  }
  let nN = /* @__PURE__ */ new WeakMap();
  class nO extends tZ {
    constructor(e10 = []) {
      super(), this.isArrayCamera = true, this.isMultiViewCamera = false, this.cameras = e10;
    }
  }
  class nF {
    constructor(e10, t10, i10) {
      let n10, r10, a10;
      switch (this.binding = e10, this.valueSize = i10, t10) {
        case "quaternion":
          n10 = this._slerp, r10 = this._slerpAdditive, a10 = this._setAdditiveIdentityQuaternion, this.buffer = new Float64Array(6 * i10), this._workIndex = 5;
          break;
        case "string":
        case "bool":
          n10 = this._select, r10 = this._select, a10 = this._setAdditiveIdentityOther, this.buffer = Array(5 * i10);
          break;
        default:
          n10 = this._lerp, r10 = this._lerpAdditive, a10 = this._setAdditiveIdentityNumeric, this.buffer = new Float64Array(5 * i10);
      }
      this._mixBufferRegion = n10, this._mixBufferRegionAdditive = r10, this._setIdentity = a10, this._origIndex = 3, this._addIndex = 4, this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, this.useCount = 0, this.referenceCount = 0;
    }
    accumulate(e10, t10) {
      let i10 = this.buffer, n10 = this.valueSize, r10 = e10 * n10 + n10, a10 = this.cumulativeWeight;
      if (0 === a10) {
        for (let e11 = 0; e11 !== n10; ++e11) i10[r10 + e11] = i10[e11];
        a10 = t10;
      } else {
        a10 += t10;
        let e11 = t10 / a10;
        this._mixBufferRegion(i10, r10, 0, e11, n10);
      }
      this.cumulativeWeight = a10;
    }
    accumulateAdditive(e10) {
      let t10 = this.buffer, i10 = this.valueSize, n10 = i10 * this._addIndex;
      0 === this.cumulativeWeightAdditive && this._setIdentity(), this._mixBufferRegionAdditive(t10, n10, 0, e10, i10), this.cumulativeWeightAdditive += e10;
    }
    apply(e10) {
      let t10 = this.valueSize, i10 = this.buffer, n10 = e10 * t10 + t10, r10 = this.cumulativeWeight, a10 = this.cumulativeWeightAdditive, s2 = this.binding;
      if (this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, r10 < 1) {
        let e11 = t10 * this._origIndex;
        this._mixBufferRegion(i10, n10, e11, 1 - r10, t10);
      }
      a10 > 0 && this._mixBufferRegionAdditive(i10, n10, this._addIndex * t10, 1, t10);
      for (let e11 = t10, r11 = t10 + t10; e11 !== r11; ++e11) if (i10[e11] !== i10[e11 + t10]) {
        s2.setValue(i10, n10);
        break;
      }
    }
    saveOriginalState() {
      let e10 = this.binding, t10 = this.buffer, i10 = this.valueSize, n10 = i10 * this._origIndex;
      e10.getValue(t10, n10);
      for (let e11 = i10; e11 !== n10; ++e11) t10[e11] = t10[n10 + e11 % i10];
      this._setIdentity(), this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0;
    }
    restoreOriginalState() {
      let e10 = 3 * this.valueSize;
      this.binding.setValue(this.buffer, e10);
    }
    _setAdditiveIdentityNumeric() {
      let e10 = this._addIndex * this.valueSize, t10 = e10 + this.valueSize;
      for (let i10 = e10; i10 < t10; i10++) this.buffer[i10] = 0;
    }
    _setAdditiveIdentityQuaternion() {
      this._setAdditiveIdentityNumeric(), this.buffer[this._addIndex * this.valueSize + 3] = 1;
    }
    _setAdditiveIdentityOther() {
      let e10 = this._origIndex * this.valueSize, t10 = this._addIndex * this.valueSize;
      for (let i10 = 0; i10 < this.valueSize; i10++) this.buffer[t10 + i10] = this.buffer[e10 + i10];
    }
    _select(e10, t10, i10, n10, r10) {
      if (n10 >= 0.5) for (let n11 = 0; n11 !== r10; ++n11) e10[t10 + n11] = e10[i10 + n11];
    }
    _slerp(e10, t10, i10, n10) {
      T.slerpFlat(e10, t10, e10, t10, e10, i10, n10);
    }
    _slerpAdditive(e10, t10, i10, n10, r10) {
      let a10 = this._workIndex * r10;
      T.multiplyQuaternionsFlat(e10, a10, e10, t10, e10, i10), T.slerpFlat(e10, t10, e10, t10, e10, a10, n10);
    }
    _lerp(e10, t10, i10, n10, r10) {
      let a10 = 1 - n10;
      for (let s2 = 0; s2 !== r10; ++s2) {
        let r11 = t10 + s2;
        e10[r11] = e10[r11] * a10 + e10[i10 + s2] * n10;
      }
    }
    _lerpAdditive(e10, t10, i10, n10, r10) {
      for (let a10 = 0; a10 !== r10; ++a10) {
        let r11 = t10 + a10;
        e10[r11] = e10[r11] + e10[i10 + a10] * n10;
      }
    }
  }
  let nB = "\\[\\]\\.:\\/", nz = RegExp("[" + nB + "]", "g"), nV = "[^" + nB + "]", nH = "[^" + nB.replace("\\.", "") + "]", nk = RegExp("^" + /((?:WC+[\/:])*)/.source.replace("WC", nV) + /(WCOD+)?/.source.replace("WCOD", nH) + /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", nV) + /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", nV) + "$"), nG = ["material", "materials", "bones", "map"];
  class nW {
    constructor(e10, t10, i10) {
      this.path = t10, this.parsedPath = i10 || nW.parseTrackName(t10), this.node = nW.findNode(e10, this.parsedPath.nodeName), this.rootNode = e10, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
    }
    static create(e10, t10, i10) {
      return e10 && e10.isAnimationObjectGroup ? new nW.Composite(e10, t10, i10) : new nW(e10, t10, i10);
    }
    static sanitizeNodeName(e10) {
      return e10.replace(/\s/g, "_").replace(nz, "");
    }
    static parseTrackName(e10) {
      let t10 = nk.exec(e10);
      if (null === t10) throw Error("PropertyBinding: Cannot parse trackName: " + e10);
      let i10 = { nodeName: t10[2], objectName: t10[3], objectIndex: t10[4], propertyName: t10[5], propertyIndex: t10[6] }, n10 = i10.nodeName && i10.nodeName.lastIndexOf(".");
      if (void 0 !== n10 && -1 !== n10) {
        let e11 = i10.nodeName.substring(n10 + 1);
        -1 !== nG.indexOf(e11) && (i10.nodeName = i10.nodeName.substring(0, n10), i10.objectName = e11);
      }
      if (null === i10.propertyName || 0 === i10.propertyName.length) throw Error("PropertyBinding: can not parse propertyName from trackName: " + e10);
      return i10;
    }
    static findNode(e10, t10) {
      if (void 0 === t10 || "" === t10 || "." === t10 || -1 === t10 || t10 === e10.name || t10 === e10.uuid) return e10;
      if (e10.skeleton) {
        let i10 = e10.skeleton.getBoneByName(t10);
        if (void 0 !== i10) return i10;
      }
      if (e10.children) {
        let i10 = function(e11) {
          for (let n11 = 0; n11 < e11.length; n11++) {
            let r10 = e11[n11];
            if (r10.name === t10 || r10.uuid === t10) return r10;
            let a10 = i10(r10.children);
            if (a10) return a10;
          }
          return null;
        }, n10 = i10(e10.children);
        if (n10) return n10;
      }
      return null;
    }
    _getValue_unavailable() {
    }
    _setValue_unavailable() {
    }
    _getValue_direct(e10, t10) {
      e10[t10] = this.targetObject[this.propertyName];
    }
    _getValue_array(e10, t10) {
      let i10 = this.resolvedProperty;
      for (let n10 = 0, r10 = i10.length; n10 !== r10; ++n10) e10[t10++] = i10[n10];
    }
    _getValue_arrayElement(e10, t10) {
      e10[t10] = this.resolvedProperty[this.propertyIndex];
    }
    _getValue_toArray(e10, t10) {
      this.resolvedProperty.toArray(e10, t10);
    }
    _setValue_direct(e10, t10) {
      this.targetObject[this.propertyName] = e10[t10];
    }
    _setValue_direct_setNeedsUpdate(e10, t10) {
      this.targetObject[this.propertyName] = e10[t10], this.targetObject.needsUpdate = true;
    }
    _setValue_direct_setMatrixWorldNeedsUpdate(e10, t10) {
      this.targetObject[this.propertyName] = e10[t10], this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_array(e10, t10) {
      let i10 = this.resolvedProperty;
      for (let n10 = 0, r10 = i10.length; n10 !== r10; ++n10) i10[n10] = e10[t10++];
    }
    _setValue_array_setNeedsUpdate(e10, t10) {
      let i10 = this.resolvedProperty;
      for (let n10 = 0, r10 = i10.length; n10 !== r10; ++n10) i10[n10] = e10[t10++];
      this.targetObject.needsUpdate = true;
    }
    _setValue_array_setMatrixWorldNeedsUpdate(e10, t10) {
      let i10 = this.resolvedProperty;
      for (let n10 = 0, r10 = i10.length; n10 !== r10; ++n10) i10[n10] = e10[t10++];
      this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_arrayElement(e10, t10) {
      this.resolvedProperty[this.propertyIndex] = e10[t10];
    }
    _setValue_arrayElement_setNeedsUpdate(e10, t10) {
      this.resolvedProperty[this.propertyIndex] = e10[t10], this.targetObject.needsUpdate = true;
    }
    _setValue_arrayElement_setMatrixWorldNeedsUpdate(e10, t10) {
      this.resolvedProperty[this.propertyIndex] = e10[t10], this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_fromArray(e10, t10) {
      this.resolvedProperty.fromArray(e10, t10);
    }
    _setValue_fromArray_setNeedsUpdate(e10, t10) {
      this.resolvedProperty.fromArray(e10, t10), this.targetObject.needsUpdate = true;
    }
    _setValue_fromArray_setMatrixWorldNeedsUpdate(e10, t10) {
      this.resolvedProperty.fromArray(e10, t10), this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _getValue_unbound(e10, t10) {
      this.bind(), this.getValue(e10, t10);
    }
    _setValue_unbound(e10, t10) {
      this.bind(), this.setValue(e10, t10);
    }
    bind() {
      let e10 = this.node, t10 = this.parsedPath, i10 = t10.objectName, n10 = t10.propertyName, r10 = t10.propertyIndex;
      if (e10 || (e10 = nW.findNode(this.rootNode, t10.nodeName), this.node = e10), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !e10) return void console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
      if (i10) {
        let n11 = t10.objectIndex;
        switch (i10) {
          case "materials":
            if (!e10.material) return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            if (!e10.material.materials) return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            e10 = e10.material.materials;
            break;
          case "bones":
            if (!e10.skeleton) return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            e10 = e10.skeleton.bones;
            for (let t11 = 0; t11 < e10.length; t11++) if (e10[t11].name === n11) {
              n11 = t11;
              break;
            }
            break;
          case "map":
            if ("map" in e10) {
              e10 = e10.map;
              break;
            }
            if (!e10.material) return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            if (!e10.material.map) return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            e10 = e10.material.map;
            break;
          default:
            if (void 0 === e10[i10]) return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
            e10 = e10[i10];
        }
        if (void 0 !== n11) {
          if (void 0 === e10[n11]) return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e10);
          e10 = e10[n11];
        }
      }
      let a10 = e10[n10];
      if (void 0 === a10) return void console.error("THREE.PropertyBinding: Trying to update property for track: " + t10.nodeName + "." + n10 + " but it wasn't found.", e10);
      let s2 = this.Versioning.None;
      this.targetObject = e10, true === e10.isMaterial ? s2 = this.Versioning.NeedsUpdate : true === e10.isObject3D && (s2 = this.Versioning.MatrixWorldNeedsUpdate);
      let o2 = this.BindingType.Direct;
      if (void 0 !== r10) {
        if ("morphTargetInfluences" === n10) {
          if (!e10.geometry) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          if (!e10.geometry.morphAttributes) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          void 0 !== e10.morphTargetDictionary[r10] && (r10 = e10.morphTargetDictionary[r10]);
        }
        o2 = this.BindingType.ArrayElement, this.resolvedProperty = a10, this.propertyIndex = r10;
      } else void 0 !== a10.fromArray && void 0 !== a10.toArray ? (o2 = this.BindingType.HasFromToArray, this.resolvedProperty = a10) : Array.isArray(a10) ? (o2 = this.BindingType.EntireArray, this.resolvedProperty = a10) : this.propertyName = n10;
      this.getValue = this.GetterByBindingType[o2], this.setValue = this.SetterByBindingTypeAndVersioning[o2][s2];
    }
    unbind() {
      this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
    }
  }
  nW.Composite = class {
    constructor(e10, t10, i10) {
      const n10 = i10 || nW.parseTrackName(t10);
      this._targetGroup = e10, this._bindings = e10.subscribe_(t10, n10);
    }
    getValue(e10, t10) {
      this.bind();
      let i10 = this._targetGroup.nCachedObjects_, n10 = this._bindings[i10];
      void 0 !== n10 && n10.getValue(e10, t10);
    }
    setValue(e10, t10) {
      let i10 = this._bindings;
      for (let n10 = this._targetGroup.nCachedObjects_, r10 = i10.length; n10 !== r10; ++n10) i10[n10].setValue(e10, t10);
    }
    bind() {
      let e10 = this._bindings;
      for (let t10 = this._targetGroup.nCachedObjects_, i10 = e10.length; t10 !== i10; ++t10) e10[t10].bind();
    }
    unbind() {
      let e10 = this._bindings;
      for (let t10 = this._targetGroup.nCachedObjects_, i10 = e10.length; t10 !== i10; ++t10) e10[t10].unbind();
    }
  }, nW.prototype.BindingType = { Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3 }, nW.prototype.Versioning = { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 }, nW.prototype.GetterByBindingType = [nW.prototype._getValue_direct, nW.prototype._getValue_array, nW.prototype._getValue_arrayElement, nW.prototype._getValue_toArray], nW.prototype.SetterByBindingTypeAndVersioning = [[nW.prototype._setValue_direct, nW.prototype._setValue_direct_setNeedsUpdate, nW.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [nW.prototype._setValue_array, nW.prototype._setValue_array_setNeedsUpdate, nW.prototype._setValue_array_setMatrixWorldNeedsUpdate], [nW.prototype._setValue_arrayElement, nW.prototype._setValue_arrayElement_setNeedsUpdate, nW.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [nW.prototype._setValue_fromArray, nW.prototype._setValue_fromArray_setNeedsUpdate, nW.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
  class nX {
    constructor(e10, t10, i10 = null, n10 = t10.blendMode) {
      this._mixer = e10, this._clip = t10, this._localRoot = i10, this.blendMode = n10;
      const r10 = t10.tracks, a10 = r10.length, s2 = Array(a10), o2 = { endingStart: 2400, endingEnd: 2400 };
      for (let e11 = 0; e11 !== a10; ++e11) {
        const t11 = r10[e11].createInterpolant(null);
        s2[e11] = t11, t11.settings = o2;
      }
      this._interpolantSettings = o2, this._interpolants = s2, this._propertyBindings = Array(a10), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._weightInterpolant = null, this.loop = 2201, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = 1 / 0, this.paused = false, this.enabled = true, this.clampWhenFinished = false, this.zeroSlopeAtStart = true, this.zeroSlopeAtEnd = true;
    }
    play() {
      return this._mixer._activateAction(this), this;
    }
    stop() {
      return this._mixer._deactivateAction(this), this.reset();
    }
    reset() {
      return this.paused = false, this.enabled = true, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping();
    }
    isRunning() {
      return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this);
    }
    isScheduled() {
      return this._mixer._isActiveAction(this);
    }
    startAt(e10) {
      return this._startTime = e10, this;
    }
    setLoop(e10, t10) {
      return this.loop = e10, this.repetitions = t10, this;
    }
    setEffectiveWeight(e10) {
      return this.weight = e10, this._effectiveWeight = this.enabled ? e10 : 0, this.stopFading();
    }
    getEffectiveWeight() {
      return this._effectiveWeight;
    }
    fadeIn(e10) {
      return this._scheduleFading(e10, 0, 1);
    }
    fadeOut(e10) {
      return this._scheduleFading(e10, 1, 0);
    }
    crossFadeFrom(e10, t10, i10 = false) {
      if (e10.fadeOut(t10), this.fadeIn(t10), true === i10) {
        let i11 = this._clip.duration, n10 = e10._clip.duration;
        e10.warp(1, n10 / i11, t10), this.warp(i11 / n10, 1, t10);
      }
      return this;
    }
    crossFadeTo(e10, t10, i10 = false) {
      return e10.crossFadeFrom(this, t10, i10);
    }
    stopFading() {
      let e10 = this._weightInterpolant;
      return null !== e10 && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(e10)), this;
    }
    setEffectiveTimeScale(e10) {
      return this.timeScale = e10, this._effectiveTimeScale = this.paused ? 0 : e10, this.stopWarping();
    }
    getEffectiveTimeScale() {
      return this._effectiveTimeScale;
    }
    setDuration(e10) {
      return this.timeScale = this._clip.duration / e10, this.stopWarping();
    }
    syncWith(e10) {
      return this.time = e10.time, this.timeScale = e10.timeScale, this.stopWarping();
    }
    halt(e10) {
      return this.warp(this._effectiveTimeScale, 0, e10);
    }
    warp(e10, t10, i10) {
      let n10 = this._mixer, r10 = n10.time, a10 = this.timeScale, s2 = this._timeScaleInterpolant;
      null === s2 && (s2 = n10._lendControlInterpolant(), this._timeScaleInterpolant = s2);
      let o2 = s2.parameterPositions, l2 = s2.sampleValues;
      return o2[0] = r10, o2[1] = r10 + i10, l2[0] = e10 / a10, l2[1] = t10 / a10, this;
    }
    stopWarping() {
      let e10 = this._timeScaleInterpolant;
      return null !== e10 && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(e10)), this;
    }
    getMixer() {
      return this._mixer;
    }
    getClip() {
      return this._clip;
    }
    getRoot() {
      return this._localRoot || this._mixer._root;
    }
    _update(e10, t10, i10, n10) {
      if (!this.enabled) return void this._updateWeight(e10);
      let r10 = this._startTime;
      if (null !== r10) {
        let n11 = (e10 - r10) * i10;
        n11 < 0 || 0 === i10 ? t10 = 0 : (this._startTime = null, t10 = i10 * n11);
      }
      t10 *= this._updateTimeScale(e10);
      let a10 = this._updateTime(t10), s2 = this._updateWeight(e10);
      if (s2 > 0) {
        let e11 = this._interpolants, t11 = this._propertyBindings;
        if (2501 === this.blendMode) for (let i11 = 0, n11 = e11.length; i11 !== n11; ++i11) e11[i11].evaluate(a10), t11[i11].accumulateAdditive(s2);
        else for (let i11 = 0, r11 = e11.length; i11 !== r11; ++i11) e11[i11].evaluate(a10), t11[i11].accumulate(n10, s2);
      }
    }
    _updateWeight(e10) {
      let t10 = 0;
      if (this.enabled) {
        t10 = this.weight;
        let i10 = this._weightInterpolant;
        if (null !== i10) {
          let n10 = i10.evaluate(e10)[0];
          t10 *= n10, e10 > i10.parameterPositions[1] && (this.stopFading(), 0 === n10 && (this.enabled = false));
        }
      }
      return this._effectiveWeight = t10, t10;
    }
    _updateTimeScale(e10) {
      let t10 = 0;
      if (!this.paused) {
        t10 = this.timeScale;
        let i10 = this._timeScaleInterpolant;
        null !== i10 && (t10 *= i10.evaluate(e10)[0], e10 > i10.parameterPositions[1] && (this.stopWarping(), 0 === t10 ? this.paused = true : this.timeScale = t10));
      }
      return this._effectiveTimeScale = t10, t10;
    }
    _updateTime(e10) {
      let t10 = this._clip.duration, i10 = this.loop, n10 = this.time + e10, r10 = this._loopCount, a10 = 2202 === i10;
      if (0 === e10) return -1 === r10 ? n10 : a10 && (1 & r10) == 1 ? t10 - n10 : n10;
      if (2200 === i10) {
        -1 === r10 && (this._loopCount = 0, this._setEndings(true, true, false));
        r: {
          if (n10 >= t10) n10 = t10;
          else if (n10 < 0) n10 = 0;
          else {
            this.time = n10;
            break r;
          }
          this.clampWhenFinished ? this.paused = true : this.enabled = false, this.time = n10, this._mixer.dispatchEvent({ type: "finished", action: this, direction: e10 < 0 ? -1 : 1 });
        }
      } else {
        if (-1 === r10 && (e10 >= 0 ? (r10 = 0, this._setEndings(true, 0 === this.repetitions, a10)) : this._setEndings(0 === this.repetitions, true, a10)), n10 >= t10 || n10 < 0) {
          let i11 = Math.floor(n10 / t10);
          n10 -= t10 * i11, r10 += Math.abs(i11);
          let s2 = this.repetitions - r10;
          if (s2 <= 0) this.clampWhenFinished ? this.paused = true : this.enabled = false, n10 = e10 > 0 ? t10 : 0, this.time = n10, this._mixer.dispatchEvent({ type: "finished", action: this, direction: e10 > 0 ? 1 : -1 });
          else {
            if (1 === s2) {
              let t11 = e10 < 0;
              this._setEndings(t11, !t11, a10);
            } else this._setEndings(false, false, a10);
            this._loopCount = r10, this.time = n10, this._mixer.dispatchEvent({ type: "loop", action: this, loopDelta: i11 });
          }
        } else this.time = n10;
        if (a10 && (1 & r10) == 1) return t10 - n10;
      }
      return n10;
    }
    _setEndings(e10, t10, i10) {
      let n10 = this._interpolantSettings;
      i10 ? (n10.endingStart = 2401, n10.endingEnd = 2401) : (e10 ? n10.endingStart = this.zeroSlopeAtStart ? 2401 : 2400 : n10.endingStart = 2402, t10 ? n10.endingEnd = this.zeroSlopeAtEnd ? 2401 : 2400 : n10.endingEnd = 2402);
    }
    _scheduleFading(e10, t10, i10) {
      let n10 = this._mixer, r10 = n10.time, a10 = this._weightInterpolant;
      null === a10 && (a10 = n10._lendControlInterpolant(), this._weightInterpolant = a10);
      let s2 = a10.parameterPositions, o2 = a10.sampleValues;
      return s2[0] = r10, o2[0] = t10, s2[1] = r10 + e10, o2[1] = i10, this;
    }
  }
  let nj = new Float32Array(1), nq = new eA();
  function nY(e10, t10) {
    return e10.distance - t10.distance;
  }
  function nK(e10, t10, i10, n10) {
    let r10 = true;
    if (e10.layers.test(t10.layers) && false === e10.raycast(t10, i10) && (r10 = false), true === r10 && true === n10) {
      let n11 = e10.children;
      for (let e11 = 0, r11 = n11.length; e11 < r11; e11++) nK(n11[e11], t10, i10, true);
    }
  }
  function nJ(e10, t10, i10, n10) {
    let r10 = (function(e11) {
      switch (e11) {
        case 1009:
        case 1010:
          return { byteLength: 1, components: 1 };
        case 1012:
        case 1011:
        case 1016:
          return { byteLength: 2, components: 1 };
        case 1017:
        case 1018:
          return { byteLength: 2, components: 4 };
        case 1014:
        case 1013:
        case 1015:
          return { byteLength: 4, components: 1 };
        case 35902:
        case 35899:
          return { byteLength: 4, components: 3 };
      }
      throw Error(`Unknown texture type ${e11}.`);
    })(n10);
    switch (i10) {
      case 1021:
        return e10 * t10;
      case 1028:
      case 1029:
        return e10 * t10 / r10.components * r10.byteLength;
      case 1030:
      case 1031:
        return e10 * t10 * 2 / r10.components * r10.byteLength;
      case 1022:
        return e10 * t10 * 3 / r10.components * r10.byteLength;
      case 1023:
      case 1033:
        return e10 * t10 * 4 / r10.components * r10.byteLength;
      case 33776:
      case 33777:
      case 36196:
      case 37492:
        return Math.floor((e10 + 3) / 4) * Math.floor((t10 + 3) / 4) * 8;
      case 33778:
      case 33779:
      case 37496:
      case 37808:
        return Math.floor((e10 + 3) / 4) * Math.floor((t10 + 3) / 4) * 16;
      case 35841:
      case 35843:
        return Math.max(e10, 16) * Math.max(t10, 8) / 4;
      case 35840:
      case 35842:
        return Math.max(e10, 8) * Math.max(t10, 8) / 2;
      case 37809:
        return Math.floor((e10 + 4) / 5) * Math.floor((t10 + 3) / 4) * 16;
      case 37810:
        return Math.floor((e10 + 4) / 5) * Math.floor((t10 + 4) / 5) * 16;
      case 37811:
        return Math.floor((e10 + 5) / 6) * Math.floor((t10 + 4) / 5) * 16;
      case 37812:
        return Math.floor((e10 + 5) / 6) * Math.floor((t10 + 5) / 6) * 16;
      case 37813:
        return Math.floor((e10 + 7) / 8) * Math.floor((t10 + 4) / 5) * 16;
      case 37814:
        return Math.floor((e10 + 7) / 8) * Math.floor((t10 + 5) / 6) * 16;
      case 37815:
        return Math.floor((e10 + 7) / 8) * Math.floor((t10 + 7) / 8) * 16;
      case 37816:
        return Math.floor((e10 + 9) / 10) * Math.floor((t10 + 4) / 5) * 16;
      case 37817:
        return Math.floor((e10 + 9) / 10) * Math.floor((t10 + 5) / 6) * 16;
      case 37818:
        return Math.floor((e10 + 9) / 10) * Math.floor((t10 + 7) / 8) * 16;
      case 37819:
        return Math.floor((e10 + 9) / 10) * Math.floor((t10 + 9) / 10) * 16;
      case 37820:
        return Math.floor((e10 + 11) / 12) * Math.floor((t10 + 9) / 10) * 16;
      case 37821:
        return Math.floor((e10 + 11) / 12) * Math.floor((t10 + 11) / 12) * 16;
      case 36492:
      case 36494:
      case 36495:
      case 36285:
      case 36286:
        return Math.ceil(e10 / 4) * Math.ceil(t10 / 4) * 16;
      case 36283:
      case 36284:
        return Math.ceil(e10 / 4) * Math.ceil(t10 / 4) * 8;
    }
    throw Error(`Unable to determine texture byte length for ${i10} format.`);
  }
  function nZ() {
    let e10 = null, t10 = false, i10 = null, n10 = null;
    function r10(t11, a10) {
      i10(t11, a10), n10 = e10.requestAnimationFrame(r10);
    }
    return { start: function() {
      true === t10 || null !== i10 && (n10 = e10.requestAnimationFrame(r10), t10 = true);
    }, stop: function() {
      e10.cancelAnimationFrame(n10), t10 = false;
    }, setAnimationLoop: function(e11) {
      i10 = e11;
    }, setContext: function(t11) {
      e10 = t11;
    } };
  }
  function n$(e10) {
    let t10 = /* @__PURE__ */ new WeakMap();
    return { get: function(e11) {
      return e11.isInterleavedBufferAttribute && (e11 = e11.data), t10.get(e11);
    }, remove: function(i10) {
      i10.isInterleavedBufferAttribute && (i10 = i10.data);
      let n10 = t10.get(i10);
      n10 && (e10.deleteBuffer(n10.buffer), t10.delete(i10));
    }, update: function(i10, n10) {
      if (i10.isInterleavedBufferAttribute && (i10 = i10.data), i10.isGLBufferAttribute) {
        let e11 = t10.get(i10);
        (!e11 || e11.version < i10.version) && t10.set(i10, { buffer: i10.buffer, type: i10.type, bytesPerElement: i10.elementSize, version: i10.version });
        return;
      }
      let r10 = t10.get(i10);
      if (void 0 === r10) t10.set(i10, (function(t11, i11) {
        let n11, r11 = t11.array, a10 = t11.usage, s2 = r11.byteLength, o2 = e10.createBuffer();
        if (e10.bindBuffer(i11, o2), e10.bufferData(i11, r11, a10), t11.onUploadCallback(), r11 instanceof Float32Array) n11 = e10.FLOAT;
        else if ("u" > typeof Float16Array && r11 instanceof Float16Array) n11 = e10.HALF_FLOAT;
        else if (r11 instanceof Uint16Array) n11 = t11.isFloat16BufferAttribute ? e10.HALF_FLOAT : e10.UNSIGNED_SHORT;
        else if (r11 instanceof Int16Array) n11 = e10.SHORT;
        else if (r11 instanceof Uint32Array) n11 = e10.UNSIGNED_INT;
        else if (r11 instanceof Int32Array) n11 = e10.INT;
        else if (r11 instanceof Int8Array) n11 = e10.BYTE;
        else if (r11 instanceof Uint8Array) n11 = e10.UNSIGNED_BYTE;
        else if (r11 instanceof Uint8ClampedArray) n11 = e10.UNSIGNED_BYTE;
        else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: " + r11);
        return { buffer: o2, type: n11, bytesPerElement: r11.BYTES_PER_ELEMENT, version: t11.version, size: s2 };
      })(i10, n10));
      else if (r10.version < i10.version) {
        if (r10.size !== i10.array.byteLength) throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
        !(function(t11, i11, n11) {
          let r11 = i11.array, a10 = i11.updateRanges;
          if (e10.bindBuffer(n11, t11), 0 === a10.length) e10.bufferSubData(n11, 0, r11);
          else {
            a10.sort((e11, t13) => e11.start - t13.start);
            let t12 = 0;
            for (let e11 = 1; e11 < a10.length; e11++) {
              let i12 = a10[t12], n12 = a10[e11];
              n12.start <= i12.start + i12.count + 1 ? i12.count = Math.max(i12.count, n12.start + n12.count - i12.start) : a10[++t12] = n12;
            }
            a10.length = t12 + 1;
            for (let t13 = 0, i12 = a10.length; t13 < i12; t13++) {
              let i13 = a10[t13];
              e10.bufferSubData(n11, i13.start * r11.BYTES_PER_ELEMENT, r11, i13.start, i13.count);
            }
            i11.clearUpdateRanges();
          }
          i11.onUploadCallback();
        })(r10.buffer, i10, n10), r10.version = i10.version;
      }
    } };
  }
  "u" > typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "180" } })), "u" > typeof window && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "180"), e.s(["ACESFilmicToneMapping", 0, 4, "AddEquation", 0, 100, "AddOperation", 0, 2, "AdditiveBlending", 0, 2, "AgXToneMapping", 0, 6, "AlphaFormat", 0, 1021, "AlwaysCompare", 0, 519, "AlwaysDepth", 0, 1, "AnimationClip", 0, nm, "AnimationMixer", 0, class extends d {
    constructor(e10) {
      super(), this._root = e10, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1;
    }
    _bindAction(e10, t10) {
      let i10 = e10._localRoot || this._root, n10 = e10._clip.tracks, r10 = n10.length, a10 = e10._propertyBindings, s2 = e10._interpolants, o2 = i10.uuid, l2 = this._bindingsByRootAndName, h2 = l2[o2];
      void 0 === h2 && (h2 = {}, l2[o2] = h2);
      for (let e11 = 0; e11 !== r10; ++e11) {
        let r11 = n10[e11], l3 = r11.name, c2 = h2[l3];
        if (void 0 !== c2) ++c2.referenceCount, a10[e11] = c2;
        else {
          if (void 0 !== (c2 = a10[e11])) {
            null === c2._cacheIndex && (++c2.referenceCount, this._addInactiveBinding(c2, o2, l3));
            continue;
          }
          let n11 = t10 && t10._propertyBindings[e11].binding.parsedPath;
          c2 = new nF(nW.create(i10, l3, n11), r11.ValueTypeName, r11.getValueSize()), ++c2.referenceCount, this._addInactiveBinding(c2, o2, l3), a10[e11] = c2;
        }
        s2[e11].resultBuffer = c2.buffer;
      }
    }
    _activateAction(e10) {
      if (!this._isActiveAction(e10)) {
        if (null === e10._cacheIndex) {
          let t11 = (e10._localRoot || this._root).uuid, i10 = e10._clip.uuid, n10 = this._actionsByClip[i10];
          this._bindAction(e10, n10 && n10.knownActions[0]), this._addInactiveAction(e10, i10, t11);
        }
        let t10 = e10._propertyBindings;
        for (let e11 = 0, i10 = t10.length; e11 !== i10; ++e11) {
          let i11 = t10[e11];
          0 == i11.useCount++ && (this._lendBinding(i11), i11.saveOriginalState());
        }
        this._lendAction(e10);
      }
    }
    _deactivateAction(e10) {
      if (this._isActiveAction(e10)) {
        let t10 = e10._propertyBindings;
        for (let e11 = 0, i10 = t10.length; e11 !== i10; ++e11) {
          let i11 = t10[e11];
          0 == --i11.useCount && (i11.restoreOriginalState(), this._takeBackBinding(i11));
        }
        this._takeBackAction(e10);
      }
    }
    _initMemoryManager() {
      this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0;
      let e10 = this;
      this.stats = { actions: { get total() {
        return e10._actions.length;
      }, get inUse() {
        return e10._nActiveActions;
      } }, bindings: { get total() {
        return e10._bindings.length;
      }, get inUse() {
        return e10._nActiveBindings;
      } }, controlInterpolants: { get total() {
        return e10._controlInterpolants.length;
      }, get inUse() {
        return e10._nActiveControlInterpolants;
      } } };
    }
    _isActiveAction(e10) {
      let t10 = e10._cacheIndex;
      return null !== t10 && t10 < this._nActiveActions;
    }
    _addInactiveAction(e10, t10, i10) {
      let n10 = this._actions, r10 = this._actionsByClip, a10 = r10[t10];
      if (void 0 === a10) a10 = { knownActions: [e10], actionByRoot: {} }, e10._byClipCacheIndex = 0, r10[t10] = a10;
      else {
        let t11 = a10.knownActions;
        e10._byClipCacheIndex = t11.length, t11.push(e10);
      }
      e10._cacheIndex = n10.length, n10.push(e10), a10.actionByRoot[i10] = e10;
    }
    _removeInactiveAction(e10) {
      let t10 = this._actions, i10 = t10[t10.length - 1], n10 = e10._cacheIndex;
      i10._cacheIndex = n10, t10[n10] = i10, t10.pop(), e10._cacheIndex = null;
      let r10 = e10._clip.uuid, a10 = this._actionsByClip, s2 = a10[r10], o2 = s2.knownActions, l2 = o2[o2.length - 1], h2 = e10._byClipCacheIndex;
      l2._byClipCacheIndex = h2, o2[h2] = l2, o2.pop(), e10._byClipCacheIndex = null;
      let c2 = s2.actionByRoot, u2 = (e10._localRoot || this._root).uuid;
      delete c2[u2], 0 === o2.length && delete a10[r10], this._removeInactiveBindingsForAction(e10);
    }
    _removeInactiveBindingsForAction(e10) {
      let t10 = e10._propertyBindings;
      for (let e11 = 0, i10 = t10.length; e11 !== i10; ++e11) {
        let i11 = t10[e11];
        0 == --i11.referenceCount && this._removeInactiveBinding(i11);
      }
    }
    _lendAction(e10) {
      let t10 = this._actions, i10 = e10._cacheIndex, n10 = this._nActiveActions++, r10 = t10[n10];
      e10._cacheIndex = n10, t10[n10] = e10, r10._cacheIndex = i10, t10[i10] = r10;
    }
    _takeBackAction(e10) {
      let t10 = this._actions, i10 = e10._cacheIndex, n10 = --this._nActiveActions, r10 = t10[n10];
      e10._cacheIndex = n10, t10[n10] = e10, r10._cacheIndex = i10, t10[i10] = r10;
    }
    _addInactiveBinding(e10, t10, i10) {
      let n10 = this._bindingsByRootAndName, r10 = this._bindings, a10 = n10[t10];
      void 0 === a10 && (a10 = {}, n10[t10] = a10), a10[i10] = e10, e10._cacheIndex = r10.length, r10.push(e10);
    }
    _removeInactiveBinding(e10) {
      let t10 = this._bindings, i10 = e10.binding, n10 = i10.rootNode.uuid, r10 = i10.path, a10 = this._bindingsByRootAndName, s2 = a10[n10], o2 = t10[t10.length - 1], l2 = e10._cacheIndex;
      o2._cacheIndex = l2, t10[l2] = o2, t10.pop(), delete s2[r10], 0 === Object.keys(s2).length && delete a10[n10];
    }
    _lendBinding(e10) {
      let t10 = this._bindings, i10 = e10._cacheIndex, n10 = this._nActiveBindings++, r10 = t10[n10];
      e10._cacheIndex = n10, t10[n10] = e10, r10._cacheIndex = i10, t10[i10] = r10;
    }
    _takeBackBinding(e10) {
      let t10 = this._bindings, i10 = e10._cacheIndex, n10 = --this._nActiveBindings, r10 = t10[n10];
      e10._cacheIndex = n10, t10[n10] = e10, r10._cacheIndex = i10, t10[i10] = r10;
    }
    _lendControlInterpolant() {
      let e10 = this._controlInterpolants, t10 = this._nActiveControlInterpolants++, i10 = e10[t10];
      return void 0 === i10 && ((i10 = new na(new Float32Array(2), new Float32Array(2), 1, nj)).__cacheIndex = t10, e10[t10] = i10), i10;
    }
    _takeBackControlInterpolant(e10) {
      let t10 = this._controlInterpolants, i10 = e10.__cacheIndex, n10 = --this._nActiveControlInterpolants, r10 = t10[n10];
      e10.__cacheIndex = n10, t10[n10] = e10, r10.__cacheIndex = i10, t10[i10] = r10;
    }
    clipAction(e10, t10, i10) {
      let n10 = t10 || this._root, r10 = n10.uuid, a10 = "string" == typeof e10 ? nm.findByName(n10, e10) : e10, s2 = null !== a10 ? a10.uuid : e10, o2 = this._actionsByClip[s2], l2 = null;
      if (void 0 === i10 && (i10 = null !== a10 ? a10.blendMode : 2500), void 0 !== o2) {
        let e11 = o2.actionByRoot[r10];
        if (void 0 !== e11 && e11.blendMode === i10) return e11;
        l2 = o2.knownActions[0], null === a10 && (a10 = l2._clip);
      }
      if (null === a10) return null;
      let h2 = new nX(this, a10, t10, i10);
      return this._bindAction(h2, l2), this._addInactiveAction(h2, s2, r10), h2;
    }
    existingAction(e10, t10) {
      let i10 = t10 || this._root, n10 = i10.uuid, r10 = "string" == typeof e10 ? nm.findByName(i10, e10) : e10, a10 = r10 ? r10.uuid : e10, s2 = this._actionsByClip[a10];
      return void 0 !== s2 && s2.actionByRoot[n10] || null;
    }
    stopAllAction() {
      let e10 = this._actions, t10 = this._nActiveActions;
      for (let i10 = t10 - 1; i10 >= 0; --i10) e10[i10].stop();
      return this;
    }
    update(e10) {
      e10 *= this.timeScale;
      let t10 = this._actions, i10 = this._nActiveActions, n10 = this.time += e10, r10 = Math.sign(e10), a10 = this._accuIndex ^= 1;
      for (let s3 = 0; s3 !== i10; ++s3) t10[s3]._update(n10, e10, r10, a10);
      let s2 = this._bindings, o2 = this._nActiveBindings;
      for (let e11 = 0; e11 !== o2; ++e11) s2[e11].apply(a10);
      return this;
    }
    setTime(e10) {
      this.time = 0;
      for (let e11 = 0; e11 < this._actions.length; e11++) this._actions[e11].time = 0;
      return this.update(e10);
    }
    getRoot() {
      return this._root;
    }
    uncacheClip(e10) {
      let t10 = this._actions, i10 = e10.uuid, n10 = this._actionsByClip, r10 = n10[i10];
      if (void 0 !== r10) {
        let e11 = r10.knownActions;
        for (let i11 = 0, n11 = e11.length; i11 !== n11; ++i11) {
          let n12 = e11[i11];
          this._deactivateAction(n12);
          let r11 = n12._cacheIndex, a10 = t10[t10.length - 1];
          n12._cacheIndex = null, n12._byClipCacheIndex = null, a10._cacheIndex = r11, t10[r11] = a10, t10.pop(), this._removeInactiveBindingsForAction(n12);
        }
        delete n10[i10];
      }
    }
    uncacheRoot(e10) {
      let t10 = e10.uuid, i10 = this._actionsByClip;
      for (let e11 in i10) {
        let n11 = i10[e11].actionByRoot[t10];
        void 0 !== n11 && (this._deactivateAction(n11), this._removeInactiveAction(n11));
      }
      let n10 = this._bindingsByRootAndName[t10];
      if (void 0 !== n10) for (let e11 in n10) {
        let t11 = n10[e11];
        t11.restoreOriginalState(), this._removeInactiveBinding(t11);
      }
    }
    uncacheAction(e10, t10) {
      let i10 = this.existingAction(e10, t10);
      null !== i10 && (this._deactivateAction(i10), this._removeInactiveAction(i10));
    }
  }, "ArrayCamera", 0, nO, "BackSide", 0, 1, "Bone", 0, ia, "Box3", 0, Q, "BoxGeometry", 0, tH, "BufferAttribute", 0, tg, "BufferGeometry", 0, tw, "ByteType", 0, 1010, "CanvasTexture", 0, class extends q {
    constructor(e10, t10, i10, n10, r10, a10, s2, o2, l2) {
      super(e10, t10, i10, n10, r10, a10, s2, o2, l2), this.isCanvasTexture = true, this.needsUpdate = true;
    }
  }, "CineonToneMapping", 0, 3, "ClampToEdgeWrapping", 0, 1001, "Color", 0, tl, "ColorManagement", 0, B, "ConstantAlphaFactor", 0, 213, "ConstantColorFactor", 0, 211, "CubeReflectionMapping", 0, 301, "CubeRefractionMapping", 0, 302, "CubeTexture", 0, tQ, "CubeUVReflectionMapping", 0, 306, "CullFaceBack", 0, 1, "CullFaceFront", 0, 2, "CullFaceNone", 0, 0, "CustomBlending", 0, 5, "CustomToneMapping", 0, 5, "Data3DTexture", 0, $, "DataArrayTexture", 0, Z, "DepthFormat", 0, 1026, "DepthStencilFormat", 0, 1027, "DepthTexture", 0, iW, "DirectionalLight", 0, class extends nE {
    constructor(e10, t10) {
      super(e10, t10), this.isDirectionalLight = true, this.type = "DirectionalLight", this.position.copy(eQ.DEFAULT_UP), this.updateMatrix(), this.target = new eQ(), this.shadow = new nD();
    }
    dispose() {
      this.shadow.dispose();
    }
    copy(e10) {
      return super.copy(e10), this.target = e10.target.clone(), this.shadow = e10.shadow.clone(), this;
    }
  }, "DoubleSide", 0, 2, "DstAlphaFactor", 0, 206, "DstColorFactor", 0, 208, "EqualCompare", 0, 514, "EqualDepth", 0, 4, "EquirectangularReflectionMapping", 0, 303, "EquirectangularRefractionMapping", 0, 304, "Euler", 0, eO, "EventDispatcher", 0, d, "ExternalTexture", 0, iX, "FileLoader", 0, class extends nv {
    constructor(e10) {
      super(e10), this.mimeType = "", this.responseType = "", this._abortController = new AbortController();
    }
    load(e10, t10, i10, n10) {
      void 0 === e10 && (e10 = ""), void 0 !== this.path && (e10 = this.path + e10), e10 = this.manager.resolveURL(e10);
      let r10 = ng.get(`file:${e10}`);
      if (void 0 !== r10) return this.manager.itemStart(e10), setTimeout(() => {
        t10 && t10(r10), this.manager.itemEnd(e10);
      }, 0), r10;
      if (void 0 !== nx[e10]) return void nx[e10].push({ onLoad: t10, onProgress: i10, onError: n10 });
      nx[e10] = [], nx[e10].push({ onLoad: t10, onProgress: i10, onError: n10 });
      let a10 = new Request(e10, { headers: new Headers(this.requestHeader), credentials: this.withCredentials ? "include" : "same-origin", signal: "function" == typeof AbortSignal.any ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal }), s2 = this.mimeType, o2 = this.responseType;
      fetch(a10).then((t11) => {
        if (200 === t11.status || 0 === t11.status) {
          if (0 === t11.status && console.warn("THREE.FileLoader: HTTP Status 0 received."), "u" < typeof ReadableStream || void 0 === t11.body || void 0 === t11.body.getReader) return t11;
          let i11 = nx[e10], n11 = t11.body.getReader(), r11 = t11.headers.get("X-File-Size") || t11.headers.get("Content-Length"), a11 = r11 ? parseInt(r11) : 0, s3 = 0 !== a11, o3 = 0;
          return new Response(new ReadableStream({ start(e11) {
            !(function t12() {
              n11.read().then(({ done: n12, value: r12 }) => {
                if (n12) e11.close();
                else {
                  let n13 = new ProgressEvent("progress", { lengthComputable: s3, loaded: o3 += r12.byteLength, total: a11 });
                  for (let e12 = 0, t13 = i11.length; e12 < t13; e12++) {
                    let t14 = i11[e12];
                    t14.onProgress && t14.onProgress(n13);
                  }
                  e11.enqueue(r12), t12();
                }
              }, (t13) => {
                e11.error(t13);
              });
            })();
          } }));
        }
        throw new ny(`fetch for "${t11.url}" responded with ${t11.status}: ${t11.statusText}`, t11);
      }).then((e11) => {
        switch (o2) {
          case "arraybuffer":
            return e11.arrayBuffer();
          case "blob":
            return e11.blob();
          case "document":
            return e11.text().then((e12) => new DOMParser().parseFromString(e12, s2));
          case "json":
            return e11.json();
          default:
            if ("" === s2) return e11.text();
            {
              let t11 = /charset="?([^;"\s]*)"?/i.exec(s2), i11 = new TextDecoder(t11 && t11[1] ? t11[1].toLowerCase() : void 0);
              return e11.arrayBuffer().then((e12) => i11.decode(e12));
            }
        }
      }).then((t11) => {
        ng.add(`file:${e10}`, t11);
        let i11 = nx[e10];
        delete nx[e10];
        for (let e11 = 0, n11 = i11.length; e11 < n11; e11++) {
          let n12 = i11[e11];
          n12.onLoad && n12.onLoad(t11);
        }
      }).catch((t11) => {
        let i11 = nx[e10];
        if (void 0 === i11) throw this.manager.itemError(e10), t11;
        delete nx[e10];
        for (let e11 = 0, n11 = i11.length; e11 < n11; e11++) {
          let n12 = i11[e11];
          n12.onError && n12.onError(t11);
        }
        this.manager.itemError(e10);
      }).finally(() => {
        this.manager.itemEnd(e10);
      }), this.manager.itemStart(e10);
    }
    setResponseType(e10) {
      return this.responseType = e10, this;
    }
    setMimeType(e10) {
      return this.mimeType = e10, this;
    }
    abort() {
      return this._abortController.abort(), this._abortController = new AbortController(), this;
    }
  }, "Float32BufferAttribute", 0, tx, "FloatType", 0, 1015, "FrontSide", 0, 0, "Frustum", 0, ib, "GLSL3", 0, u, "GreaterCompare", 0, 516, "GreaterDepth", 0, 6, "GreaterEqualCompare", 0, 518, "GreaterEqualDepth", 0, 5, "Group", 0, t1, "HalfFloatType", 0, 1016, "ImageBitmapLoader", 0, class extends nv {
    constructor(e10) {
      super(e10), this.isImageBitmapLoader = true, "u" < typeof createImageBitmap && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), "u" < typeof fetch && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), this.options = { premultiplyAlpha: "none" }, this._abortController = new AbortController();
    }
    setOptions(e10) {
      return this.options = e10, this;
    }
    load(e10, t10, i10, n10) {
      void 0 === e10 && (e10 = ""), void 0 !== this.path && (e10 = this.path + e10), e10 = this.manager.resolveURL(e10);
      let r10 = this, a10 = ng.get(`image-bitmap:${e10}`);
      if (void 0 !== a10) return (r10.manager.itemStart(e10), a10.then) ? void a10.then((i11) => {
        if (true !== nN.has(a10)) return t10 && t10(i11), r10.manager.itemEnd(e10), i11;
        n10 && n10(nN.get(a10)), r10.manager.itemError(e10), r10.manager.itemEnd(e10);
      }) : (setTimeout(function() {
        t10 && t10(a10), r10.manager.itemEnd(e10);
      }, 0), a10);
      let s2 = {};
      s2.credentials = "anonymous" === this.crossOrigin ? "same-origin" : "include", s2.headers = this.requestHeader, s2.signal = "function" == typeof AbortSignal.any ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal;
      let o2 = fetch(e10, s2).then(function(e11) {
        return e11.blob();
      }).then(function(e11) {
        return createImageBitmap(e11, Object.assign(r10.options, { colorSpaceConversion: "none" }));
      }).then(function(i11) {
        return ng.add(`image-bitmap:${e10}`, i11), t10 && t10(i11), r10.manager.itemEnd(e10), i11;
      }).catch(function(t11) {
        n10 && n10(t11), nN.set(o2, t11), ng.remove(`image-bitmap:${e10}`), r10.manager.itemError(e10), r10.manager.itemEnd(e10);
      });
      ng.add(`image-bitmap:${e10}`, o2), r10.manager.itemStart(e10);
    }
    abort() {
      return this._abortController.abort(), this._abortController = new AbortController(), this;
    }
  }, "InstancedBufferAttribute", 0, ih, "InstancedMesh", 0, class extends tz {
    constructor(e10, t10, i10) {
      super(e10, t10), this.isInstancedMesh = true, this.instanceMatrix = new ih(new Float32Array(16 * i10), 16), this.instanceColor = null, this.morphTexture = null, this.count = i10, this.boundingBox = null, this.boundingSphere = null;
      for (let e11 = 0; e11 < i10; e11++) this.setMatrixAt(e11, im);
    }
    computeBoundingBox() {
      let e10 = this.geometry, t10 = this.count;
      null === this.boundingBox && (this.boundingBox = new Q()), null === e10.boundingBox && e10.computeBoundingBox(), this.boundingBox.makeEmpty();
      for (let i10 = 0; i10 < t10; i10++) this.getMatrixAt(i10, ic), ip.copy(e10.boundingBox).applyMatrix4(ic), this.boundingBox.union(ip);
    }
    computeBoundingSphere() {
      let e10 = this.geometry, t10 = this.count;
      null === this.boundingSphere && (this.boundingSphere = new e_()), null === e10.boundingSphere && e10.computeBoundingSphere(), this.boundingSphere.makeEmpty();
      for (let i10 = 0; i10 < t10; i10++) this.getMatrixAt(i10, ic), i_.copy(e10.boundingSphere).applyMatrix4(ic), this.boundingSphere.union(i_);
    }
    copy(e10, t10) {
      return super.copy(e10, t10), this.instanceMatrix.copy(e10.instanceMatrix), null !== e10.morphTexture && (this.morphTexture = e10.morphTexture.clone()), null !== e10.instanceColor && (this.instanceColor = e10.instanceColor.clone()), this.count = e10.count, null !== e10.boundingBox && (this.boundingBox = e10.boundingBox.clone()), null !== e10.boundingSphere && (this.boundingSphere = e10.boundingSphere.clone()), this;
    }
    getColorAt(e10, t10) {
      t10.fromArray(this.instanceColor.array, 3 * e10);
    }
    getMatrixAt(e10, t10) {
      t10.fromArray(this.instanceMatrix.array, 16 * e10);
    }
    getMorphAt(e10, t10) {
      let i10 = t10.morphTargetInfluences, n10 = this.morphTexture.source.data.data, r10 = e10 * (i10.length + 1) + 1;
      for (let e11 = 0; e11 < i10.length; e11++) i10[e11] = n10[r10 + e11];
    }
    raycast(e10, t10) {
      let i10 = this.matrixWorld, n10 = this.count;
      if ((ig.geometry = this.geometry, ig.material = this.material, void 0 !== ig.material) && (null === this.boundingSphere && this.computeBoundingSphere(), i_.copy(this.boundingSphere), i_.applyMatrix4(i10), false !== e10.ray.intersectsSphere(i_))) for (let r10 = 0; r10 < n10; r10++) {
        this.getMatrixAt(r10, ic), iu.multiplyMatrices(i10, ic), ig.matrixWorld = iu, ig.raycast(e10, id);
        for (let e11 = 0, i11 = id.length; e11 < i11; e11++) {
          let i12 = id[e11];
          i12.instanceId = r10, i12.object = this, t10.push(i12);
        }
        id.length = 0;
      }
    }
    setColorAt(e10, t10) {
      null === this.instanceColor && (this.instanceColor = new ih(new Float32Array(3 * this.instanceMatrix.count).fill(1), 3)), t10.toArray(this.instanceColor.array, 3 * e10);
    }
    setMatrixAt(e10, t10) {
      t10.toArray(this.instanceMatrix.array, 16 * e10);
    }
    setMorphAt(e10, t10) {
      let i10 = t10.morphTargetInfluences, n10 = i10.length + 1;
      null === this.morphTexture && (this.morphTexture = new is(new Float32Array(n10 * this.count), n10, this.count, 1028, 1015));
      let r10 = this.morphTexture.source.data.data, a10 = 0;
      for (let e11 = 0; e11 < i10.length; e11++) a10 += i10[e11];
      let s2 = this.geometry.morphTargetsRelative ? 1 : 1 - a10, o2 = n10 * e10;
      r10[o2] = s2, r10.set(i10, o2 + 1);
    }
    updateMorphTargets() {
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" }), null !== this.morphTexture && (this.morphTexture.dispose(), this.morphTexture = null);
    }
  }, "IntType", 0, 1013, "InterleavedBuffer", 0, class {
    constructor(e10, t10) {
      this.isInterleavedBuffer = true, this.array = e10, this.stride = t10, this.count = void 0 !== e10 ? e10.length / t10 : 0, this.usage = 35044, this.updateRanges = [], this.version = 0, this.uuid = _();
    }
    onUploadCallback() {
    }
    set needsUpdate(e10) {
      true === e10 && this.version++;
    }
    setUsage(e10) {
      return this.usage = e10, this;
    }
    addUpdateRange(e10, t10) {
      this.updateRanges.push({ start: e10, count: t10 });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    copy(e10) {
      return this.array = new e10.array.constructor(e10.array), this.count = e10.count, this.stride = e10.stride, this.usage = e10.usage, this;
    }
    copyAt(e10, t10, i10) {
      e10 *= this.stride, i10 *= t10.stride;
      for (let n10 = 0, r10 = this.stride; n10 < r10; n10++) this.array[e10 + n10] = t10.array[i10 + n10];
      return this;
    }
    set(e10, t10 = 0) {
      return this.array.set(e10, t10), this;
    }
    clone(e10) {
      void 0 === e10.arrayBuffers && (e10.arrayBuffers = {}), void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = _()), void 0 === e10.arrayBuffers[this.array.buffer._uuid] && (e10.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
      let t10 = new this.array.constructor(e10.arrayBuffers[this.array.buffer._uuid]), i10 = new this.constructor(t10, this.stride);
      return i10.setUsage(this.usage), i10;
    }
    onUpload(e10) {
      return this.onUploadCallback = e10, this;
    }
    toJSON(e10) {
      return void 0 === e10.arrayBuffers && (e10.arrayBuffers = {}), void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = _()), void 0 === e10.arrayBuffers[this.array.buffer._uuid] && (e10.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), { uuid: this.uuid, buffer: this.array.buffer._uuid, type: this.array.constructor.name, stride: this.stride };
    }
  }, "InterleavedBufferAttribute", 0, class e10 {
    constructor(e11, t10, i10, n10 = false) {
      this.isInterleavedBufferAttribute = true, this.name = "", this.data = e11, this.itemSize = t10, this.offset = i10, this.normalized = n10;
    }
    get count() {
      return this.data.count;
    }
    get array() {
      return this.data.array;
    }
    set needsUpdate(e11) {
      this.data.needsUpdate = e11;
    }
    applyMatrix4(e11) {
      for (let t10 = 0, i10 = this.data.count; t10 < i10; t10++) t4.fromBufferAttribute(this, t10), t4.applyMatrix4(e11), this.setXYZ(t10, t4.x, t4.y, t4.z);
      return this;
    }
    applyNormalMatrix(e11) {
      for (let t10 = 0, i10 = this.count; t10 < i10; t10++) t4.fromBufferAttribute(this, t10), t4.applyNormalMatrix(e11), this.setXYZ(t10, t4.x, t4.y, t4.z);
      return this;
    }
    transformDirection(e11) {
      for (let t10 = 0, i10 = this.count; t10 < i10; t10++) t4.fromBufferAttribute(this, t10), t4.transformDirection(e11), this.setXYZ(t10, t4.x, t4.y, t4.z);
      return this;
    }
    getComponent(e11, t10) {
      let i10 = this.array[e11 * this.data.stride + this.offset + t10];
      return this.normalized && (i10 = M(i10, this.array)), i10;
    }
    setComponent(e11, t10, i10) {
      return this.normalized && (i10 = S(i10, this.array)), this.data.array[e11 * this.data.stride + this.offset + t10] = i10, this;
    }
    setX(e11, t10) {
      return this.normalized && (t10 = S(t10, this.array)), this.data.array[e11 * this.data.stride + this.offset] = t10, this;
    }
    setY(e11, t10) {
      return this.normalized && (t10 = S(t10, this.array)), this.data.array[e11 * this.data.stride + this.offset + 1] = t10, this;
    }
    setZ(e11, t10) {
      return this.normalized && (t10 = S(t10, this.array)), this.data.array[e11 * this.data.stride + this.offset + 2] = t10, this;
    }
    setW(e11, t10) {
      return this.normalized && (t10 = S(t10, this.array)), this.data.array[e11 * this.data.stride + this.offset + 3] = t10, this;
    }
    getX(e11) {
      let t10 = this.data.array[e11 * this.data.stride + this.offset];
      return this.normalized && (t10 = M(t10, this.array)), t10;
    }
    getY(e11) {
      let t10 = this.data.array[e11 * this.data.stride + this.offset + 1];
      return this.normalized && (t10 = M(t10, this.array)), t10;
    }
    getZ(e11) {
      let t10 = this.data.array[e11 * this.data.stride + this.offset + 2];
      return this.normalized && (t10 = M(t10, this.array)), t10;
    }
    getW(e11) {
      let t10 = this.data.array[e11 * this.data.stride + this.offset + 3];
      return this.normalized && (t10 = M(t10, this.array)), t10;
    }
    setXY(e11, t10, i10) {
      return e11 = e11 * this.data.stride + this.offset, this.normalized && (t10 = S(t10, this.array), i10 = S(i10, this.array)), this.data.array[e11 + 0] = t10, this.data.array[e11 + 1] = i10, this;
    }
    setXYZ(e11, t10, i10, n10) {
      return e11 = e11 * this.data.stride + this.offset, this.normalized && (t10 = S(t10, this.array), i10 = S(i10, this.array), n10 = S(n10, this.array)), this.data.array[e11 + 0] = t10, this.data.array[e11 + 1] = i10, this.data.array[e11 + 2] = n10, this;
    }
    setXYZW(e11, t10, i10, n10, r10) {
      return e11 = e11 * this.data.stride + this.offset, this.normalized && (t10 = S(t10, this.array), i10 = S(i10, this.array), n10 = S(n10, this.array), r10 = S(r10, this.array)), this.data.array[e11 + 0] = t10, this.data.array[e11 + 1] = i10, this.data.array[e11 + 2] = n10, this.data.array[e11 + 3] = r10, this;
    }
    clone(t10) {
      if (void 0 !== t10) return void 0 === t10.interleavedBuffers && (t10.interleavedBuffers = {}), void 0 === t10.interleavedBuffers[this.data.uuid] && (t10.interleavedBuffers[this.data.uuid] = this.data.clone(t10)), new e10(t10.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
      {
        console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
        let e11 = [];
        for (let t11 = 0; t11 < this.count; t11++) {
          let i10 = t11 * this.data.stride + this.offset;
          for (let t12 = 0; t12 < this.itemSize; t12++) e11.push(this.data.array[i10 + t12]);
        }
        return new tg(new this.array.constructor(e11), this.itemSize, this.normalized);
      }
    }
    toJSON(e11) {
      if (void 0 !== e11) return void 0 === e11.interleavedBuffers && (e11.interleavedBuffers = {}), void 0 === e11.interleavedBuffers[this.data.uuid] && (e11.interleavedBuffers[this.data.uuid] = this.data.toJSON(e11)), { isInterleavedBufferAttribute: true, itemSize: this.itemSize, data: this.data.uuid, offset: this.offset, normalized: this.normalized };
      {
        console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
        let e12 = [];
        for (let t10 = 0; t10 < this.count; t10++) {
          let i10 = t10 * this.data.stride + this.offset;
          for (let t11 = 0; t11 < this.itemSize; t11++) e12.push(this.data.array[i10 + t11]);
        }
        return { itemSize: this.itemSize, type: this.array.constructor.name, array: e12, normalized: this.normalized };
      }
    }
  }, "Interpolant", 0, nn, "InterpolateDiscrete", 0, 2300, "InterpolateLinear", 0, 2301, "Layers", 0, eF, "LessCompare", 0, 513, "LessDepth", 0, 2, "LessEqualCompare", 0, 515, "LessEqualDepth", 0, 3, "Line", 0, iD, "LineBasicMaterial", 0, iA, "LineLoop", 0, class extends iD {
    constructor(e10, t10) {
      super(e10, t10), this.isLineLoop = true, this.type = "LineLoop";
    }
  }, "LineSegments", 0, class extends iD {
    constructor(e10, t10) {
      super(e10, t10), this.isLineSegments = true, this.type = "LineSegments";
    }
    computeLineDistances() {
      let e10 = this.geometry;
      if (null === e10.index) {
        let t10 = e10.attributes.position, i10 = [];
        for (let e11 = 0, n10 = t10.count; e11 < n10; e11 += 2) iO.fromBufferAttribute(t10, e11), iF.fromBufferAttribute(t10, e11 + 1), i10[e11] = 0 === e11 ? 0 : i10[e11 - 1], i10[e11 + 1] = i10[e11] + iO.distanceTo(iF);
        e10.setAttribute("lineDistance", new tx(i10, 1));
      } else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
      return this;
    }
  }, "LinearFilter", 0, 1006, "LinearMipmapLinearFilter", 0, 1008, "LinearMipmapNearestFilter", 0, 1007, "LinearSRGBColorSpace", 0, l, "LinearToneMapping", 0, 1, "LinearTransfer", 0, h, "Loader", 0, nv, "LoaderUtils", 0, class {
    static extractUrlBase(e10) {
      let t10 = e10.lastIndexOf("/");
      return -1 === t10 ? "./" : e10.slice(0, t10 + 1);
    }
    static resolveURL(e10, t10) {
      return "string" != typeof e10 || "" === e10 ? "" : (/^https?:\/\//i.test(t10) && /^\//.test(e10) && (t10 = t10.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e10) || /^data:.*,.*$/i.test(e10) || /^blob:.*$/i.test(e10)) ? e10 : t10 + e10;
    }
  }, "Material", 0, tu, "MathUtils", 0, { DEG2RAD: m, RAD2DEG: g, generateUUID: _, clamp: v, euclideanModulo: x, mapLinear: function(e10, t10, i10, n10, r10) {
    return n10 + (e10 - t10) * (r10 - n10) / (i10 - t10);
  }, inverseLerp: function(e10, t10, i10) {
    return e10 !== t10 ? (i10 - e10) / (t10 - e10) : 0;
  }, lerp: y, damp: function(e10, t10, i10, n10) {
    return y(e10, t10, 1 - Math.exp(-i10 * n10));
  }, pingpong: function(e10, t10 = 1) {
    return t10 - Math.abs(x(e10, 2 * t10) - t10);
  }, smoothstep: function(e10, t10, i10) {
    return e10 <= t10 ? 0 : e10 >= i10 ? 1 : (e10 = (e10 - t10) / (i10 - t10)) * e10 * (3 - 2 * e10);
  }, smootherstep: function(e10, t10, i10) {
    return e10 <= t10 ? 0 : e10 >= i10 ? 1 : (e10 = (e10 - t10) / (i10 - t10)) * e10 * e10 * (e10 * (6 * e10 - 15) + 10);
  }, randInt: function(e10, t10) {
    return e10 + Math.floor(Math.random() * (t10 - e10 + 1));
  }, randFloat: function(e10, t10) {
    return e10 + Math.random() * (t10 - e10);
  }, randFloatSpread: function(e10) {
    return e10 * (0.5 - Math.random());
  }, seededRandom: function(e10) {
    void 0 !== e10 && (f = e10);
    let t10 = f += 1831565813;
    return t10 = Math.imul(t10 ^ t10 >>> 15, 1 | t10), (((t10 ^= t10 + Math.imul(t10 ^ t10 >>> 7, 61 | t10)) ^ t10 >>> 14) >>> 0) / 4294967296;
  }, degToRad: function(e10) {
    return e10 * m;
  }, radToDeg: function(e10) {
    return e10 * g;
  }, isPowerOfTwo: function(e10) {
    return (e10 & e10 - 1) == 0 && 0 !== e10;
  }, ceilPowerOfTwo: function(e10) {
    return Math.pow(2, Math.ceil(Math.log(e10) / Math.LN2));
  }, floorPowerOfTwo: function(e10) {
    return Math.pow(2, Math.floor(Math.log(e10) / Math.LN2));
  }, setQuaternionFromProperEuler: function(e10, t10, i10, n10, r10) {
    let a10 = Math.cos, s2 = Math.sin, o2 = a10(i10 / 2), l2 = s2(i10 / 2), h2 = a10((t10 + n10) / 2), c2 = s2((t10 + n10) / 2), u2 = a10((t10 - n10) / 2), d2 = s2((t10 - n10) / 2), p2 = a10((n10 - t10) / 2), f2 = s2((n10 - t10) / 2);
    switch (r10) {
      case "XYX":
        e10.set(o2 * c2, l2 * u2, l2 * d2, o2 * h2);
        break;
      case "YZY":
        e10.set(l2 * d2, o2 * c2, l2 * u2, o2 * h2);
        break;
      case "ZXZ":
        e10.set(l2 * u2, l2 * d2, o2 * c2, o2 * h2);
        break;
      case "XZX":
        e10.set(o2 * c2, l2 * f2, l2 * p2, o2 * h2);
        break;
      case "YXY":
        e10.set(l2 * p2, o2 * c2, l2 * f2, o2 * h2);
        break;
      case "ZYZ":
        e10.set(l2 * f2, l2 * p2, o2 * c2, o2 * h2);
        break;
      default:
        console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + r10);
    }
  }, normalize: S, denormalize: M }, "Matrix3", 0, R, "Matrix4", 0, eA, "MaxEquation", 0, 104, "Mesh", 0, tz, "MeshBasicMaterial", 0, td, "MeshDepthMaterial", 0, i9, "MeshDistanceMaterial", 0, i7, "MeshLambertMaterial", 0, class extends tu {
    constructor(e10) {
      super(), this.isMeshLambertMaterial = true, this.type = "MeshLambertMaterial", this.color = new tl(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new tl(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new E(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new eO(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = false, this.fog = true, this.setValues(e10);
    }
    copy(e10) {
      return super.copy(e10), this.color.copy(e10.color), this.map = e10.map, this.lightMap = e10.lightMap, this.lightMapIntensity = e10.lightMapIntensity, this.aoMap = e10.aoMap, this.aoMapIntensity = e10.aoMapIntensity, this.emissive.copy(e10.emissive), this.emissiveMap = e10.emissiveMap, this.emissiveIntensity = e10.emissiveIntensity, this.bumpMap = e10.bumpMap, this.bumpScale = e10.bumpScale, this.normalMap = e10.normalMap, this.normalMapType = e10.normalMapType, this.normalScale.copy(e10.normalScale), this.displacementMap = e10.displacementMap, this.displacementScale = e10.displacementScale, this.displacementBias = e10.displacementBias, this.specularMap = e10.specularMap, this.alphaMap = e10.alphaMap, this.envMap = e10.envMap, this.envMapRotation.copy(e10.envMapRotation), this.combine = e10.combine, this.reflectivity = e10.reflectivity, this.refractionRatio = e10.refractionRatio, this.wireframe = e10.wireframe, this.wireframeLinewidth = e10.wireframeLinewidth, this.wireframeLinecap = e10.wireframeLinecap, this.wireframeLinejoin = e10.wireframeLinejoin, this.flatShading = e10.flatShading, this.fog = e10.fog, this;
    }
  }, "MeshPhysicalMaterial", 0, class extends i8 {
    constructor(e10) {
      super(), this.isMeshPhysicalMaterial = true, this.defines = { STANDARD: "", PHYSICAL: "" }, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new E(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", { get: function() {
        return v(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      }, set: function(e11) {
        this.ior = (1 + 0.4 * e11) / (1 - 0.4 * e11);
      } }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new tl(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new tl(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new tl(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(e10);
    }
    get anisotropy() {
      return this._anisotropy;
    }
    set anisotropy(e10) {
      this._anisotropy > 0 != e10 > 0 && this.version++, this._anisotropy = e10;
    }
    get clearcoat() {
      return this._clearcoat;
    }
    set clearcoat(e10) {
      this._clearcoat > 0 != e10 > 0 && this.version++, this._clearcoat = e10;
    }
    get iridescence() {
      return this._iridescence;
    }
    set iridescence(e10) {
      this._iridescence > 0 != e10 > 0 && this.version++, this._iridescence = e10;
    }
    get dispersion() {
      return this._dispersion;
    }
    set dispersion(e10) {
      this._dispersion > 0 != e10 > 0 && this.version++, this._dispersion = e10;
    }
    get sheen() {
      return this._sheen;
    }
    set sheen(e10) {
      this._sheen > 0 != e10 > 0 && this.version++, this._sheen = e10;
    }
    get transmission() {
      return this._transmission;
    }
    set transmission(e10) {
      this._transmission > 0 != e10 > 0 && this.version++, this._transmission = e10;
    }
    copy(e10) {
      return super.copy(e10), this.defines = { STANDARD: "", PHYSICAL: "" }, this.anisotropy = e10.anisotropy, this.anisotropyRotation = e10.anisotropyRotation, this.anisotropyMap = e10.anisotropyMap, this.clearcoat = e10.clearcoat, this.clearcoatMap = e10.clearcoatMap, this.clearcoatRoughness = e10.clearcoatRoughness, this.clearcoatRoughnessMap = e10.clearcoatRoughnessMap, this.clearcoatNormalMap = e10.clearcoatNormalMap, this.clearcoatNormalScale.copy(e10.clearcoatNormalScale), this.dispersion = e10.dispersion, this.ior = e10.ior, this.iridescence = e10.iridescence, this.iridescenceMap = e10.iridescenceMap, this.iridescenceIOR = e10.iridescenceIOR, this.iridescenceThicknessRange = [...e10.iridescenceThicknessRange], this.iridescenceThicknessMap = e10.iridescenceThicknessMap, this.sheen = e10.sheen, this.sheenColor.copy(e10.sheenColor), this.sheenColorMap = e10.sheenColorMap, this.sheenRoughness = e10.sheenRoughness, this.sheenRoughnessMap = e10.sheenRoughnessMap, this.transmission = e10.transmission, this.transmissionMap = e10.transmissionMap, this.thickness = e10.thickness, this.thicknessMap = e10.thicknessMap, this.attenuationDistance = e10.attenuationDistance, this.attenuationColor.copy(e10.attenuationColor), this.specularIntensity = e10.specularIntensity, this.specularIntensityMap = e10.specularIntensityMap, this.specularColor.copy(e10.specularColor), this.specularColorMap = e10.specularColorMap, this;
    }
  }, "MeshStandardMaterial", 0, i8, "MinEquation", 0, 103, "MirroredRepeatWrapping", 0, 1002, "MixOperation", 0, 1, "MultiplyBlending", 0, 4, "MultiplyOperation", 0, 0, "NearestFilter", 0, 1003, "NearestMipmapLinearFilter", 0, 1005, "NearestMipmapNearestFilter", 0, 1004, "NeutralToneMapping", 0, 7, "NeverCompare", 0, 512, "NeverDepth", 0, 0, "NoBlending", 0, 0, "NoColorSpace", 0, "", "NoToneMapping", 0, 0, "NormalBlending", 0, 1, "NotEqualCompare", 0, 517, "NotEqualDepth", 0, 7, "NumberKeyframeTrack", 0, nc, "Object3D", 0, eQ, "ObjectSpaceNormalMap", 0, 1, "OneFactor", 0, 201, "OneMinusConstantAlphaFactor", 0, 214, "OneMinusConstantColorFactor", 0, 212, "OneMinusDstAlphaFactor", 0, 207, "OneMinusDstColorFactor", 0, 209, "OneMinusSrcAlphaFactor", 0, 205, "OneMinusSrcColorFactor", 0, 203, "OrthographicCamera", 0, nU, "PCFShadowMap", 0, 1, "PCFSoftShadowMap", 0, 2, "PerspectiveCamera", 0, tZ, "Plane", 0, iM, "PlaneGeometry", 0, i6, "PointLight", 0, class extends nE {
    constructor(e10, t10, i10 = 0, n10 = 2) {
      super(e10, t10), this.isPointLight = true, this.type = "PointLight", this.distance = i10, this.decay = n10, this.shadow = new nL();
    }
    get power() {
      return 4 * this.intensity * Math.PI;
    }
    set power(e10) {
      this.intensity = e10 / (4 * Math.PI);
    }
    dispose() {
      this.shadow.dispose();
    }
    copy(e10, t10) {
      return super.copy(e10, t10), this.distance = e10.distance, this.decay = e10.decay, this.shadow = e10.shadow.clone(), this;
    }
  }, "Points", 0, class extends eQ {
    constructor(e10 = new tw(), t10 = new iB()) {
      super(), this.isPoints = true, this.type = "Points", this.geometry = e10, this.material = t10, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
    }
    copy(e10, t10) {
      return super.copy(e10, t10), this.material = Array.isArray(e10.material) ? e10.material.slice() : e10.material, this.geometry = e10.geometry, this;
    }
    raycast(e10, t10) {
      let i10 = this.geometry, n10 = this.matrixWorld, r10 = e10.params.Points.threshold, a10 = i10.drawRange;
      if (null === i10.boundingSphere && i10.computeBoundingSphere(), iH.copy(i10.boundingSphere), iH.applyMatrix4(n10), iH.radius += r10, false === e10.ray.intersectsSphere(iH)) return;
      iz.copy(n10).invert(), iV.copy(e10.ray).applyMatrix4(iz);
      let s2 = r10 / ((this.scale.x + this.scale.y + this.scale.z) / 3), o2 = s2 * s2, l2 = i10.index, h2 = i10.attributes.position;
      if (null !== l2) {
        let i11 = Math.max(0, a10.start), r11 = Math.min(l2.count, a10.start + a10.count);
        for (let a11 = i11; a11 < r11; a11++) {
          let i12 = l2.getX(a11);
          ik.fromBufferAttribute(h2, i12), iG(ik, i12, o2, n10, e10, t10, this);
        }
      } else {
        let i11 = Math.max(0, a10.start), r11 = Math.min(h2.count, a10.start + a10.count);
        for (let a11 = i11; a11 < r11; a11++) ik.fromBufferAttribute(h2, a11), iG(ik, a11, o2, n10, e10, t10, this);
      }
    }
    updateMorphTargets() {
      let e10 = this.geometry.morphAttributes, t10 = Object.keys(e10);
      if (t10.length > 0) {
        let i10 = e10[t10[0]];
        if (void 0 !== i10) {
          this.morphTargetInfluences = [], this.morphTargetDictionary = {};
          for (let e11 = 0, t11 = i10.length; e11 < t11; e11++) {
            let t12 = i10[e11].name || String(e11);
            this.morphTargetInfluences.push(0), this.morphTargetDictionary[t12] = e11;
          }
        }
      }
    }
  }, "PointsMaterial", 0, iB, "PropertyBinding", 0, nW, "Quaternion", 0, T, "QuaternionKeyframeTrack", 0, nd, "RAD2DEG", 0, g, "RED_GREEN_RGTC2_Format", 0, 36285, "RED_RGTC1_Format", 0, 36283, "REVISION", 0, "180", "RGBADepthPacking", 0, 3201, "RGBAFormat", 0, 1023, "RGBAIntegerFormat", 0, 1033, "RGBA_ASTC_10x10_Format", 0, 37819, "RGBA_ASTC_10x5_Format", 0, 37816, "RGBA_ASTC_10x6_Format", 0, 37817, "RGBA_ASTC_10x8_Format", 0, 37818, "RGBA_ASTC_12x10_Format", 0, 37820, "RGBA_ASTC_12x12_Format", 0, 37821, "RGBA_ASTC_4x4_Format", 0, 37808, "RGBA_ASTC_5x4_Format", 0, 37809, "RGBA_ASTC_5x5_Format", 0, 37810, "RGBA_ASTC_6x5_Format", 0, 37811, "RGBA_ASTC_6x6_Format", 0, 37812, "RGBA_ASTC_8x5_Format", 0, 37813, "RGBA_ASTC_8x6_Format", 0, 37814, "RGBA_ASTC_8x8_Format", 0, 37815, "RGBA_BPTC_Format", 0, 36492, "RGBA_ETC2_EAC_Format", 0, 37496, "RGBA_PVRTC_2BPPV1_Format", 0, 35843, "RGBA_PVRTC_4BPPV1_Format", 0, 35842, "RGBA_S3TC_DXT1_Format", 0, 33777, "RGBA_S3TC_DXT3_Format", 0, 33778, "RGBA_S3TC_DXT5_Format", 0, 33779, "RGBFormat", 0, 1022, "RGB_BPTC_SIGNED_Format", 0, 36494, "RGB_BPTC_UNSIGNED_Format", 0, 36495, "RGB_ETC1_Format", 0, 36196, "RGB_ETC2_Format", 0, 37492, "RGB_PVRTC_2BPPV1_Format", 0, 35841, "RGB_PVRTC_4BPPV1_Format", 0, 35840, "RGB_S3TC_DXT1_Format", 0, 33776, "RGFormat", 0, 1030, "RGIntegerFormat", 0, 1031, "Raycaster", 0, class {
    constructor(e10, t10, i10 = 0, n10 = 1 / 0) {
      this.ray = new eb(e10, t10), this.near = i10, this.far = n10, this.camera = null, this.layers = new eF(), this.params = { Mesh: {}, Line: { threshold: 1 }, LOD: {}, Points: { threshold: 1 }, Sprite: {} };
    }
    set(e10, t10) {
      this.ray.set(e10, t10);
    }
    setFromCamera(e10, t10) {
      t10.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t10.matrixWorld), this.ray.direction.set(e10.x, e10.y, 0.5).unproject(t10).sub(this.ray.origin).normalize(), this.camera = t10) : t10.isOrthographicCamera ? (this.ray.origin.set(e10.x, e10.y, (t10.near + t10.far) / (t10.near - t10.far)).unproject(t10), this.ray.direction.set(0, 0, -1).transformDirection(t10.matrixWorld), this.camera = t10) : console.error("THREE.Raycaster: Unsupported camera type: " + t10.type);
    }
    setFromXRController(e10) {
      return nq.identity().extractRotation(e10.matrixWorld), this.ray.origin.setFromMatrixPosition(e10.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(nq), this;
    }
    intersectObject(e10, t10 = true, i10 = []) {
      return nK(e10, this, i10, t10), i10.sort(nY), i10;
    }
    intersectObjects(e10, t10 = true, i10 = []) {
      for (let n10 = 0, r10 = e10.length; n10 < r10; n10++) nK(e10[n10], this, i10, t10);
      return i10.sort(nY), i10;
    }
  }, "RedFormat", 0, 1028, "RedIntegerFormat", 0, 1029, "ReinhardToneMapping", 0, 2, "RepeatWrapping", 0, 1e3, "ReverseSubtractEquation", 0, 102, "SIGNED_RED_GREEN_RGTC2_Format", 0, 36286, "SIGNED_RED_RGTC1_Format", 0, 36284, "SRGBColorSpace", 0, o, "SRGBTransfer", 0, c, "Scene", 0, class extends eQ {
    constructor() {
      super(), this.isScene = true, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new eO(), this.environmentIntensity = 1, this.environmentRotation = new eO(), this.overrideMaterial = null, "u" > typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
    }
    copy(e10, t10) {
      return super.copy(e10, t10), null !== e10.background && (this.background = e10.background.clone()), null !== e10.environment && (this.environment = e10.environment.clone()), null !== e10.fog && (this.fog = e10.fog.clone()), this.backgroundBlurriness = e10.backgroundBlurriness, this.backgroundIntensity = e10.backgroundIntensity, this.backgroundRotation.copy(e10.backgroundRotation), this.environmentIntensity = e10.environmentIntensity, this.environmentRotation.copy(e10.environmentRotation), null !== e10.overrideMaterial && (this.overrideMaterial = e10.overrideMaterial.clone()), this.matrixAutoUpdate = e10.matrixAutoUpdate, this;
    }
    toJSON(e10) {
      let t10 = super.toJSON(e10);
      return null !== this.fog && (t10.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t10.object.backgroundBlurriness = this.backgroundBlurriness), 1 !== this.backgroundIntensity && (t10.object.backgroundIntensity = this.backgroundIntensity), t10.object.backgroundRotation = this.backgroundRotation.toArray(), 1 !== this.environmentIntensity && (t10.object.environmentIntensity = this.environmentIntensity), t10.object.environmentRotation = this.environmentRotation.toArray(), t10;
    }
  }, "ShaderMaterial", 0, tj, "ShortType", 0, 1011, "Skeleton", 0, class e10 {
    constructor(e11 = [], t10 = []) {
      this.uuid = _(), this.bones = e11.slice(0), this.boneInverses = t10, this.boneMatrices = null, this.boneTexture = null, this.init();
    }
    init() {
      let e11 = this.bones, t10 = this.boneInverses;
      if (this.boneMatrices = new Float32Array(16 * e11.length), 0 === t10.length) this.calculateInverses();
      else if (e11.length !== t10.length) {
        console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = [];
        for (let e12 = 0, t11 = this.bones.length; e12 < t11; e12++) this.boneInverses.push(new eA());
      }
    }
    calculateInverses() {
      this.boneInverses.length = 0;
      for (let e11 = 0, t10 = this.bones.length; e11 < t10; e11++) {
        let t11 = new eA();
        this.bones[e11] && t11.copy(this.bones[e11].matrixWorld).invert(), this.boneInverses.push(t11);
      }
    }
    pose() {
      for (let e11 = 0, t10 = this.bones.length; e11 < t10; e11++) {
        let t11 = this.bones[e11];
        t11 && t11.matrixWorld.copy(this.boneInverses[e11]).invert();
      }
      for (let e11 = 0, t10 = this.bones.length; e11 < t10; e11++) {
        let t11 = this.bones[e11];
        t11 && (t11.parent && t11.parent.isBone ? (t11.matrix.copy(t11.parent.matrixWorld).invert(), t11.matrix.multiply(t11.matrixWorld)) : t11.matrix.copy(t11.matrixWorld), t11.matrix.decompose(t11.position, t11.quaternion, t11.scale));
      }
    }
    update() {
      let e11 = this.bones, t10 = this.boneInverses, i10 = this.boneMatrices, n10 = this.boneTexture;
      for (let n11 = 0, r10 = e11.length; n11 < r10; n11++) {
        let r11 = e11[n11] ? e11[n11].matrixWorld : il;
        io.multiplyMatrices(r11, t10[n11]), io.toArray(i10, 16 * n11);
      }
      null !== n10 && (n10.needsUpdate = true);
    }
    clone() {
      return new e10(this.bones, this.boneInverses);
    }
    computeBoneTexture() {
      let e11 = Math.sqrt(4 * this.bones.length), t10 = new Float32Array((e11 = Math.max(e11 = 4 * Math.ceil(e11 / 4), 4)) * e11 * 4);
      t10.set(this.boneMatrices);
      let i10 = new is(t10, e11, e11, 1023, 1015);
      return i10.needsUpdate = true, this.boneMatrices = t10, this.boneTexture = i10, this;
    }
    getBoneByName(e11) {
      for (let t10 = 0, i10 = this.bones.length; t10 < i10; t10++) {
        let i11 = this.bones[t10];
        if (i11.name === e11) return i11;
      }
    }
    dispose() {
      null !== this.boneTexture && (this.boneTexture.dispose(), this.boneTexture = null);
    }
    fromJSON(e11, t10) {
      this.uuid = e11.uuid;
      for (let i10 = 0, n10 = e11.bones.length; i10 < n10; i10++) {
        let n11 = e11.bones[i10], r10 = t10[n11];
        void 0 === r10 && (console.warn("THREE.Skeleton: No bone found with UUID:", n11), r10 = new ia()), this.bones.push(r10), this.boneInverses.push(new eA().fromArray(e11.boneInverses[i10]));
      }
      return this.init(), this;
    }
    toJSON() {
      let e11 = { metadata: { version: 4.7, type: "Skeleton", generator: "Skeleton.toJSON" }, bones: [], boneInverses: [] };
      e11.uuid = this.uuid;
      let t10 = this.bones, i10 = this.boneInverses;
      for (let n10 = 0, r10 = t10.length; n10 < r10; n10++) {
        let r11 = t10[n10];
        e11.bones.push(r11.uuid);
        let a10 = i10[n10];
        e11.boneInverses.push(a10.toArray());
      }
      return e11;
    }
  }, "SkinnedMesh", 0, class extends tz {
    constructor(e10, t10) {
      super(e10, t10), this.isSkinnedMesh = true, this.type = "SkinnedMesh", this.bindMode = s, this.bindMatrix = new eA(), this.bindMatrixInverse = new eA(), this.boundingBox = null, this.boundingSphere = null;
    }
    computeBoundingBox() {
      let e10 = this.geometry;
      null === this.boundingBox && (this.boundingBox = new Q()), this.boundingBox.makeEmpty();
      let t10 = e10.getAttribute("position");
      for (let e11 = 0; e11 < t10.count; e11++) this.getVertexPosition(e11, ie), this.boundingBox.expandByPoint(ie);
    }
    computeBoundingSphere() {
      let e10 = this.geometry;
      null === this.boundingSphere && (this.boundingSphere = new e_()), this.boundingSphere.makeEmpty();
      let t10 = e10.getAttribute("position");
      for (let e11 = 0; e11 < t10.count; e11++) this.getVertexPosition(e11, ie), this.boundingSphere.expandByPoint(ie);
    }
    copy(e10, t10) {
      return super.copy(e10, t10), this.bindMode = e10.bindMode, this.bindMatrix.copy(e10.bindMatrix), this.bindMatrixInverse.copy(e10.bindMatrixInverse), this.skeleton = e10.skeleton, null !== e10.boundingBox && (this.boundingBox = e10.boundingBox.clone()), null !== e10.boundingSphere && (this.boundingSphere = e10.boundingSphere.clone()), this;
    }
    raycast(e10, t10) {
      let i10 = this.material, n10 = this.matrixWorld;
      void 0 === i10 || (null === this.boundingSphere && this.computeBoundingSphere(), it.copy(this.boundingSphere), it.applyMatrix4(n10), false === e10.ray.intersectsSphere(it) || (ii.copy(n10).invert(), ir.copy(e10.ray).applyMatrix4(ii), (null === this.boundingBox || false !== ir.intersectsBox(this.boundingBox)) && this._computeIntersections(e10, t10, ir)));
    }
    getVertexPosition(e10, t10) {
      return super.getVertexPosition(e10, t10), this.applyBoneTransform(e10, t10), t10;
    }
    bind(e10, t10) {
      this.skeleton = e10, void 0 === t10 && (this.updateMatrixWorld(true), this.skeleton.calculateInverses(), t10 = this.matrixWorld), this.bindMatrix.copy(t10), this.bindMatrixInverse.copy(t10).invert();
    }
    pose() {
      this.skeleton.pose();
    }
    normalizeSkinWeights() {
      let e10 = new Y(), t10 = this.geometry.attributes.skinWeight;
      for (let i10 = 0, n10 = t10.count; i10 < n10; i10++) {
        e10.fromBufferAttribute(t10, i10);
        let n11 = 1 / e10.manhattanLength();
        n11 !== 1 / 0 ? e10.multiplyScalar(n11) : e10.set(1, 0, 0, 0), t10.setXYZW(i10, e10.x, e10.y, e10.z, e10.w);
      }
    }
    updateMatrixWorld(e10) {
      super.updateMatrixWorld(e10), this.bindMode === s ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : "detached" === this.bindMode ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
    }
    applyBoneTransform(e10, t10) {
      let i10 = this.skeleton, n10 = this.geometry;
      t6.fromBufferAttribute(n10.attributes.skinIndex, e10), t8.fromBufferAttribute(n10.attributes.skinWeight, e10), t5.copy(t10).applyMatrix4(this.bindMatrix), t10.set(0, 0, 0);
      for (let e11 = 0; e11 < 4; e11++) {
        let n11 = t8.getComponent(e11);
        if (0 !== n11) {
          let r10 = t6.getComponent(e11);
          t7.multiplyMatrices(i10.bones[r10].matrixWorld, i10.boneInverses[r10]), t10.addScaledVector(t9.copy(t5).applyMatrix4(t7), n11);
        }
      }
      return t10.applyMatrix4(this.bindMatrixInverse);
    }
  }, "Sphere", 0, e_, "SpotLight", 0, class extends nE {
    constructor(e10, t10, i10 = 0, n10 = Math.PI / 3, r10 = 0, a10 = 2) {
      super(e10, t10), this.isSpotLight = true, this.type = "SpotLight", this.position.copy(eQ.DEFAULT_UP), this.updateMatrix(), this.target = new eQ(), this.distance = i10, this.angle = n10, this.penumbra = r10, this.decay = a10, this.map = null, this.shadow = new nR();
    }
    get power() {
      return this.intensity * Math.PI;
    }
    set power(e10) {
      this.intensity = e10 / Math.PI;
    }
    dispose() {
      this.shadow.dispose();
    }
    copy(e10, t10) {
      return super.copy(e10, t10), this.distance = e10.distance, this.angle = e10.angle, this.penumbra = e10.penumbra, this.decay = e10.decay, this.target = e10.target.clone(), this.shadow = e10.shadow.clone(), this;
    }
  }, "SrcAlphaFactor", 0, 204, "SrcAlphaSaturateFactor", 0, 210, "SrcColorFactor", 0, 202, "SubtractEquation", 0, 101, "SubtractiveBlending", 0, 3, "TangentSpaceNormalMap", 0, 0, "Texture", 0, q, "TextureLoader", 0, class extends nv {
    constructor(e10) {
      super(e10);
    }
    load(e10, t10, i10, n10) {
      let r10 = new q(), a10 = new nS(this.manager);
      return a10.setCrossOrigin(this.crossOrigin), a10.setPath(this.path), a10.load(e10, function(e11) {
        r10.image = e11, r10.needsUpdate = true, void 0 !== t10 && t10(r10);
      }, i10, n10), r10;
    }
  }, "TriangleFanDrawMode", 0, 2, "TriangleStripDrawMode", 0, 1, "TrianglesDrawMode", 0, 0, "Uint16BufferAttribute", 0, t_, "Uint32BufferAttribute", 0, tv, "UniformsUtils", 0, tX, "UnsignedByteType", 0, 1009, "UnsignedInt101111Type", 0, 35899, "UnsignedInt248Type", 0, 1020, "UnsignedInt5999Type", 0, 35902, "UnsignedIntType", 0, 1014, "UnsignedShort4444Type", 0, 1017, "UnsignedShort5551Type", 0, 1018, "UnsignedShortType", 0, 1012, "VSMShadowMap", 0, 3, "Vector2", 0, E, "Vector3", 0, b, "Vector4", 0, Y, "VectorKeyframeTrack", 0, nf, "VideoTexture", 0, class extends q {
    constructor(e10, t10, i10, n10, r10 = 1006, a10 = 1006, s2, o2, l2) {
      super(e10, t10, i10, n10, r10, a10, s2, o2, l2), this.isVideoTexture = true, this.generateMipmaps = false, this._requestVideoFrameCallbackId = 0;
      const h2 = this;
      "requestVideoFrameCallback" in e10 && (this._requestVideoFrameCallbackId = e10.requestVideoFrameCallback(function t11() {
        h2.needsUpdate = true, h2._requestVideoFrameCallbackId = e10.requestVideoFrameCallback(t11);
      }));
    }
    clone() {
      return new this.constructor(this.image).copy(this);
    }
    update() {
      let e10 = this.image;
      false == "requestVideoFrameCallback" in e10 && e10.readyState >= e10.HAVE_CURRENT_DATA && (this.needsUpdate = true);
    }
    dispose() {
      0 !== this._requestVideoFrameCallbackId && this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId), super.dispose();
    }
  }, "WebGLCoordinateSystem", 0, 2e3, "WebGLCubeRenderTarget", 0, t0, "WebGLRenderTarget", 0, J, "WebXRController", 0, t3, "ZeroFactor", 0, 200, "arrayNeedsUint32", 0, P, "cloneUniforms", 0, tk, "createCanvasElement", 0, L, "createElementNS", 0, I, "getByteLength", 0, nJ, "getUnlitUniformColorSpace", 0, tW, "mergeUniforms", 0, tG, "probeAsync", 0, N, "warnOnce", 0, D], 90072);
  let nQ = { alphahash_fragment: "#ifdef USE_ALPHAHASH\n	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif", alphahash_pars_fragment: "#ifdef USE_ALPHAHASH\n	const float ALPHA_HASH_SCALE = 0.05;\n	float hash2D( vec2 value ) {\n		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n	}\n	float hash3D( vec3 value ) {\n		return hash2D( vec2( hash2D( value.xy ), value.z ) );\n	}\n	float getAlphaHashThreshold( vec3 position ) {\n		float maxDeriv = max(\n			length( dFdx( position.xyz ) ),\n			length( dFdy( position.xyz ) )\n		);\n		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n		vec2 pixScales = vec2(\n			exp2( floor( log2( pixScale ) ) ),\n			exp2( ceil( log2( pixScale ) ) )\n		);\n		vec2 alpha = vec2(\n			hash3D( floor( pixScales.x * position.xyz ) ),\n			hash3D( floor( pixScales.y * position.xyz ) )\n		);\n		float lerpFactor = fract( log2( pixScale ) );\n		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n		float a = min( lerpFactor, 1.0 - lerpFactor );\n		vec3 cases = vec3(\n			x * x / ( 2.0 * a * ( 1.0 - a ) ),\n			( x - 0.5 * a ) / ( 1.0 - a ),\n			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n		);\n		float threshold = ( x < ( 1.0 - a ) )\n			? ( ( x < a ) ? cases.x : cases.y )\n			: cases.z;\n		return clamp( threshold , 1.0e-6, 1.0 );\n	}\n#endif", alphamap_fragment: "#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif", alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif", alphatest_fragment: "#ifdef USE_ALPHATEST\n	#ifdef ALPHA_TO_COVERAGE\n	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n	if ( diffuseColor.a == 0.0 ) discard;\n	#else\n	if ( diffuseColor.a < alphaTest ) discard;\n	#endif\n#endif", alphatest_pars_fragment: "#ifdef USE_ALPHATEST\n	uniform float alphaTest;\n#endif", aomap_fragment: "#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_CLEARCOAT ) \n		clearcoatSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_SHEEN ) \n		sheenSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD )\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n	#endif\n#endif", aomap_pars_fragment: "#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif", batching_pars_vertex: "#ifdef USE_BATCHING\n	#if ! defined( GL_ANGLE_multi_draw )\n	#define gl_DrawID _gl_DrawID\n	uniform int _gl_DrawID;\n	#endif\n	uniform highp sampler2D batchingTexture;\n	uniform highp usampler2D batchingIdTexture;\n	mat4 getBatchingMatrix( const in float i ) {\n		int size = textureSize( batchingTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n	float getIndirectIndex( const in int i ) {\n		int size = textureSize( batchingIdTexture, 0 ).x;\n		int x = i % size;\n		int y = i / size;\n		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n	}\n#endif\n#ifdef USE_BATCHING_COLOR\n	uniform sampler2D batchingColorTexture;\n	vec3 getBatchingColor( const in float i ) {\n		int size = textureSize( batchingColorTexture, 0 ).x;\n		int j = int( i );\n		int x = j % size;\n		int y = j / size;\n		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;\n	}\n#endif", batching_vertex: "#ifdef USE_BATCHING\n	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif", begin_vertex: "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n	vPosition = vec3( position );\n#endif", beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n	vec3 objectTangent = vec3( tangent.xyz );\n#endif", bsdfs: "float G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( specularColor, 1.0, dotVH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n} // validated", iridescence_fragment: "#ifdef USE_IRIDESCENCE\n	const mat3 XYZ_TO_REC709 = mat3(\n		 3.2404542, -0.9692660,  0.0556434,\n		-1.5371385,  1.8760108, -0.2040259,\n		-0.4985314,  0.0415560,  1.0572252\n	);\n	vec3 Fresnel0ToIor( vec3 fresnel0 ) {\n		vec3 sqrtF0 = sqrt( fresnel0 );\n		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n	}\n	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n	}\n	float IorToFresnel0( float transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n	}\n	vec3 evalSensitivity( float OPD, vec3 shift ) {\n		float phase = 2.0 * PI * OPD * 1.0e-9;\n		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n		xyz /= 1.0685e-7;\n		vec3 rgb = XYZ_TO_REC709 * xyz;\n		return rgb;\n	}\n	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n		vec3 I;\n		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n		float cosTheta2Sq = 1.0 - sinTheta2Sq;\n		if ( cosTheta2Sq < 0.0 ) {\n			return vec3( 1.0 );\n		}\n		float cosTheta2 = sqrt( cosTheta2Sq );\n		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n		float R12 = F_Schlick( R0, 1.0, cosTheta1 );\n		float T121 = 1.0 - R12;\n		float phi12 = 0.0;\n		if ( iridescenceIOR < outsideIOR ) phi12 = PI;\n		float phi21 = PI - phi12;\n		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n		vec3 phi23 = vec3( 0.0 );\n		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n		vec3 phi = vec3( phi21 ) + phi23;\n		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n		vec3 r123 = sqrt( R123 );\n		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n		vec3 C0 = R12 + Rs;\n		I = C0;\n		vec3 Cm = Rs - T121;\n		for ( int m = 1; m <= 2; ++ m ) {\n			Cm *= r123;\n			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n			I += Cm * Sm;\n		}\n		return max( I, vec3( 0.0 ) );\n	}\n#endif", bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vBumpMapUv );\n		vec2 dSTdy = dFdy( vBumpMapUv );\n		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 ) * faceDirection;\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif", clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n	vec4 plane;\n	#ifdef ALPHA_TO_COVERAGE\n		float distanceToPlane, distanceGradient;\n		float clipOpacity = 1.0;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n			distanceGradient = fwidth( distanceToPlane ) / 2.0;\n			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			if ( clipOpacity == 0.0 ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			float unionClipOpacity = 1.0;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n				distanceGradient = fwidth( distanceToPlane ) / 2.0;\n				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			}\n			#pragma unroll_loop_end\n			clipOpacity *= 1.0 - unionClipOpacity;\n		#endif\n		diffuseColor.a *= clipOpacity;\n		if ( diffuseColor.a == 0.0 ) discard;\n	#else\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			bool clipped = true;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n			}\n			#pragma unroll_loop_end\n			if ( clipped ) discard;\n		#endif\n	#endif\n#endif", clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif", clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n#endif", clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n	vClipPosition = - mvPosition.xyz;\n#endif", color_fragment: "#if defined( USE_COLOR_ALPHA )\n	diffuseColor *= vColor;\n#elif defined( USE_COLOR )\n	diffuseColor.rgb *= vColor;\n#endif", color_pars_fragment: "#if defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#elif defined( USE_COLOR )\n	varying vec3 vColor;\n#endif", color_pars_vertex: "#if defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	varying vec3 vColor;\n#endif", color_vertex: "#if defined( USE_COLOR_ALPHA )\n	vColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	vColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n	vColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n	vColor.xyz *= instanceColor.xyz;\n#endif\n#ifdef USE_BATCHING_COLOR\n	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );\n	vColor.xyz *= batchingColor.xyz;\n#endif", common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n	float precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n	float precisionSafeLength( vec3 v ) {\n		float maxComponent = max3( abs( v ) );\n		return length( v / maxComponent ) * maxComponent;\n	}\n#endif\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n	varying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n	mat3 tmp;\n	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n	return tmp;\n}\nbool isPerspectiveMatrix( mat4 m ) {\n	return m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n	return vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated", cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n	#define cubeUV_minMipLevel 4.0\n	#define cubeUV_minTileSize 16.0\n	float getFace( vec3 direction ) {\n		vec3 absDirection = abs( direction );\n		float face = - 1.0;\n		if ( absDirection.x > absDirection.z ) {\n			if ( absDirection.x > absDirection.y )\n				face = direction.x > 0.0 ? 0.0 : 3.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		} else {\n			if ( absDirection.z > absDirection.y )\n				face = direction.z > 0.0 ? 2.0 : 5.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		}\n		return face;\n	}\n	vec2 getUV( vec3 direction, float face ) {\n		vec2 uv;\n		if ( face == 0.0 ) {\n			uv = vec2( direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 1.0 ) {\n			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n		} else if ( face == 2.0 ) {\n			uv = vec2( - direction.x, direction.y ) / abs( direction.z );\n		} else if ( face == 3.0 ) {\n			uv = vec2( - direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 4.0 ) {\n			uv = vec2( - direction.x, direction.z ) / abs( direction.y );\n		} else {\n			uv = vec2( direction.x, direction.y ) / abs( direction.z );\n		}\n		return 0.5 * ( uv + 1.0 );\n	}\n	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n		float face = getFace( direction );\n		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n		mipInt = max( mipInt, cubeUV_minMipLevel );\n		float faceSize = exp2( mipInt );\n		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n		if ( face > 2.0 ) {\n			uv.y += faceSize;\n			face -= 3.0;\n		}\n		uv.x += face * faceSize;\n		uv.x += filterInt * 3.0 * cubeUV_minTileSize;\n		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n		uv.x *= CUBEUV_TEXEL_WIDTH;\n		uv.y *= CUBEUV_TEXEL_HEIGHT;\n		#ifdef texture2DGradEXT\n			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n		#else\n			return texture2D( envMap, uv ).rgb;\n		#endif\n	}\n	#define cubeUV_r0 1.0\n	#define cubeUV_m0 - 2.0\n	#define cubeUV_r1 0.8\n	#define cubeUV_m1 - 1.0\n	#define cubeUV_r4 0.4\n	#define cubeUV_m4 2.0\n	#define cubeUV_r5 0.305\n	#define cubeUV_m5 3.0\n	#define cubeUV_r6 0.21\n	#define cubeUV_m6 4.0\n	float roughnessToMip( float roughness ) {\n		float mip = 0.0;\n		if ( roughness >= cubeUV_r1 ) {\n			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n		} else if ( roughness >= cubeUV_r4 ) {\n			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n		} else if ( roughness >= cubeUV_r5 ) {\n			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n		} else if ( roughness >= cubeUV_r6 ) {\n			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n		} else {\n			mip = - 2.0 * log2( 1.16 * roughness );		}\n		return mip;\n	}\n	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n		float mipF = fract( mip );\n		float mipInt = floor( mip );\n		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n		if ( mipF == 0.0 ) {\n			return vec4( color0, 1.0 );\n		} else {\n			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n			return vec4( mix( color0, color1, mipF ), 1.0 );\n		}\n	}\n#endif", defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n	vec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n	mat3 bm = mat3( batchingMatrix );\n	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n	transformedNormal = bm * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = bm * transformedTangent;\n	#endif\n#endif\n#ifdef USE_INSTANCING\n	mat3 im = mat3( instanceMatrix );\n	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n	transformedNormal = im * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = im * transformedTangent;\n	#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n	transformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n	#ifdef FLIP_SIDED\n		transformedTangent = - transformedTangent;\n	#endif\n#endif", displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif", displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif", emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n		emissiveColor = sRGBTransferEOTF( emissiveColor );\n	#endif\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif", emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif", colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );", colorspace_pars_fragment: "vec4 LinearTransferOETF( in vec4 value ) {\n	return value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}", envmap_fragment: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vec3 cameraToFrag;\n		if ( isOrthographic ) {\n			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToFrag = normalize( vWorldPosition - cameraPosition );\n		}\n		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToFrag, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n	#else\n		vec4 envColor = vec4( 0.0 );\n	#endif\n	#ifdef ENVMAP_BLENDING_MULTIPLY\n		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n	#elif defined( ENVMAP_BLENDING_MIX )\n		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n	#elif defined( ENVMAP_BLENDING_ADD )\n		outgoingLight += envColor.xyz * specularStrength * reflectivity;\n	#endif\n#endif", envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float envMapIntensity;\n	uniform float flipEnvMap;\n	uniform mat3 envMapRotation;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n	\n#endif", envmap_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		varying vec3 vWorldPosition;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif", envmap_pars_vertex: "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif", envmap_physical_pars_fragment: "#ifdef USE_ENVMAP\n	vec3 getIBLIrradiance( const in vec3 normal ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );\n			return PI * envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 reflectVec = reflect( - viewDir, normal );\n			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );\n			return envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	#ifdef USE_ANISOTROPY\n		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n			#ifdef ENVMAP_TYPE_CUBE_UV\n				vec3 bentNormal = cross( bitangent, viewDir );\n				bentNormal = normalize( cross( bentNormal, bitangent ) );\n				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n				return getIBLRadiance( viewDir, bentNormal, roughness );\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n	#endif\n#endif", envmap_vertex: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex;\n		if ( isOrthographic ) {\n			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		}\n		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif", fog_vertex: "#ifdef USE_FOG\n	vFogDepth = - mvPosition.z;\n#endif", fog_pars_vertex: "#ifdef USE_FOG\n	varying float vFogDepth;\n#endif", fog_fragment: "#ifdef USE_FOG\n	#ifdef FOG_EXP2\n		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif", fog_pars_fragment: "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	varying float vFogDepth;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif", gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\n	uniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n	float dotNL = dot( normal, lightDirection );\n	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n	#ifdef USE_GRADIENTMAP\n		return vec3( texture2D( gradientMap, coord ).r );\n	#else\n		vec2 fw = fwidth( coord ) * 0.5;\n		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n	#endif\n}", lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif", lights_lambert_fragment: "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;", lights_lambert_pars_fragment: "varying vec3 vViewPosition;\nstruct LambertMaterial {\n	vec3 diffuseColor;\n	float specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Lambert\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert", lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n	uniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n	float x = normal.x, y = normal.y, z = normal.z;\n	vec3 result = shCoefficients[ 0 ] * 0.886227;\n	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n	return result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n	return irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	return irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n	if ( cutoffDistance > 0.0 ) {\n		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n	}\n	return distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n	return smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n		light.color = directionalLight.color;\n		light.direction = directionalLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = pointLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		light.color = pointLight.color;\n		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n		light.visible = ( light.color != vec3( 0.0 ) );\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = spotLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float angleCos = dot( light.direction, spotLight.direction );\n		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n		if ( spotAttenuation > 0.0 ) {\n			float lightDistance = length( lVector );\n			light.color = spotLight.color * spotAttenuation;\n			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n			light.visible = ( light.color != vec3( 0.0 ) );\n		} else {\n			light.color = vec3( 0.0 );\n			light.visible = false;\n		}\n	}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n	struct RectAreaLight {\n		vec3 color;\n		vec3 position;\n		vec3 halfWidth;\n		vec3 halfHeight;\n	};\n	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;\n	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n		float dotNL = dot( normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		return irradiance;\n	}\n#endif", lights_toon_fragment: "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;", lights_toon_pars_fragment: "varying vec3 vViewPosition;\nstruct ToonMaterial {\n	vec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Toon\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon", lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;", lights_phong_pars_fragment: "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n	vec3 diffuseColor;\n	vec3 specularColor;\n	float specularShininess;\n	float specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong", lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n	material.ior = ior;\n	#ifdef USE_SPECULAR\n		float specularIntensityFactor = specularIntensity;\n		vec3 specularColorFactor = specularColor;\n		#ifdef USE_SPECULAR_COLORMAP\n			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n		#endif\n		#ifdef USE_SPECULAR_INTENSITYMAP\n			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n		#endif\n		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n	#else\n		float specularIntensityFactor = 1.0;\n		vec3 specularColorFactor = vec3( 1.0 );\n		material.specularF90 = 1.0;\n	#endif\n	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n	material.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n	material.clearcoat = clearcoat;\n	material.clearcoatRoughness = clearcoatRoughness;\n	material.clearcoatF0 = vec3( 0.04 );\n	material.clearcoatF90 = 1.0;\n	#ifdef USE_CLEARCOATMAP\n		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n	#endif\n	#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n	#endif\n	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n	material.clearcoatRoughness += geometryRoughness;\n	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n	material.dispersion = dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n	material.iridescence = iridescence;\n	material.iridescenceIOR = iridescenceIOR;\n	#ifdef USE_IRIDESCENCEMAP\n		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n	#endif\n	#ifdef USE_IRIDESCENCE_THICKNESSMAP\n		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n	#else\n		material.iridescenceThickness = iridescenceThicknessMaximum;\n	#endif\n#endif\n#ifdef USE_SHEEN\n	material.sheenColor = sheenColor;\n	#ifdef USE_SHEEN_COLORMAP\n		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n	#endif\n	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	#ifdef USE_ANISOTROPYMAP\n		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n	#else\n		vec2 anisotropyV = anisotropyVector;\n	#endif\n	material.anisotropy = length( anisotropyV );\n	if( material.anisotropy == 0.0 ) {\n		anisotropyV = vec2( 1.0, 0.0 );\n	} else {\n		anisotropyV /= material.anisotropy;\n		material.anisotropy = saturate( material.anisotropy );\n	}\n	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif", lights_physical_pars_fragment: "struct PhysicalMaterial {\n	vec3 diffuseColor;\n	float roughness;\n	vec3 specularColor;\n	float specularF90;\n	float dispersion;\n	#ifdef USE_CLEARCOAT\n		float clearcoat;\n		float clearcoatRoughness;\n		vec3 clearcoatF0;\n		float clearcoatF90;\n	#endif\n	#ifdef USE_IRIDESCENCE\n		float iridescence;\n		float iridescenceIOR;\n		float iridescenceThickness;\n		vec3 iridescenceFresnel;\n		vec3 iridescenceF0;\n	#endif\n	#ifdef USE_SHEEN\n		vec3 sheenColor;\n		float sheenRoughness;\n	#endif\n	#ifdef IOR\n		float ior;\n	#endif\n	#ifdef USE_TRANSMISSION\n		float transmission;\n		float transmissionAlpha;\n		float thickness;\n		float attenuationDistance;\n		vec3 attenuationColor;\n	#endif\n	#ifdef USE_ANISOTROPY\n		float anisotropy;\n		float alphaT;\n		vec3 anisotropyT;\n		vec3 anisotropyB;\n	#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n		float v = 0.5 / ( gv + gl );\n		return saturate(v);\n	}\n	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n		float a2 = alphaT * alphaB;\n		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n		highp float v2 = dot( v, v );\n		float w2 = a2 / v2;\n		return RECIPROCAL_PI * a2 * pow2 ( w2 );\n	}\n#endif\n#ifdef USE_CLEARCOAT\n	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n		vec3 f0 = material.clearcoatF0;\n		float f90 = material.clearcoatF90;\n		float roughness = material.clearcoatRoughness;\n		float alpha = pow2( roughness );\n		vec3 halfDir = normalize( lightDir + viewDir );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float dotNH = saturate( dot( normal, halfDir ) );\n		float dotVH = saturate( dot( viewDir, halfDir ) );\n		vec3 F = F_Schlick( f0, f90, dotVH );\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n		return F * ( V * D );\n	}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 f0 = material.specularColor;\n	float f90 = material.specularF90;\n	float roughness = material.roughness;\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( f0, f90, dotVH );\n	#ifdef USE_IRIDESCENCE\n		F = mix( F, material.iridescenceFresnel, material.iridescence );\n	#endif\n	#ifdef USE_ANISOTROPY\n		float dotTL = dot( material.anisotropyT, lightDir );\n		float dotTV = dot( material.anisotropyT, viewDir );\n		float dotTH = dot( material.anisotropyT, halfDir );\n		float dotBL = dot( material.anisotropyB, lightDir );\n		float dotBV = dot( material.anisotropyB, viewDir );\n		float dotBH = dot( material.anisotropyB, halfDir );\n		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n	#else\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n	#endif\n	return F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n	const float LUT_SIZE = 64.0;\n	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n	const float LUT_BIAS = 0.5 / LUT_SIZE;\n	float dotNV = saturate( dot( N, V ) );\n	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n	uv = uv * LUT_SCALE + LUT_BIAS;\n	return uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n	float l = length( f );\n	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n	float x = dot( v1, v2 );\n	float y = abs( x );\n	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n	float b = 3.4175940 + ( 4.1616724 + y ) * y;\n	float v = a / b;\n	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n	return cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n	vec3 lightNormal = cross( v1, v2 );\n	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n	vec3 T1, T2;\n	T1 = normalize( V - N * dot( V, N ) );\n	T2 = - cross( N, T1 );\n	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n	vec3 coords[ 4 ];\n	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n	coords[ 0 ] = normalize( coords[ 0 ] );\n	coords[ 1 ] = normalize( coords[ 1 ] );\n	coords[ 2 ] = normalize( coords[ 2 ] );\n	coords[ 3 ] = normalize( coords[ 3 ] );\n	vec3 vectorFormFactor = vec3( 0.0 );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n	return vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n	float alpha = pow2( roughness );\n	float invAlpha = 1.0 / alpha;\n	float cos2h = dotNH * dotNH;\n	float sin2h = max( 1.0 - cos2h, 0.0078125 );\n	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float D = D_Charlie( sheenRoughness, dotNH );\n	float V = V_Neubelt( dotNV, dotNL );\n	return sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float r2 = roughness * roughness;\n	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n	return saturate( DG * RECIPROCAL_PI );\n}\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n	vec4 r = roughness * c0 + c1;\n	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n	return fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n	vec2 fab = DFGApprox( normal, viewDir, roughness );\n	return specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n	vec2 fab = DFGApprox( normal, viewDir, roughness );\n	#ifdef USE_IRIDESCENCE\n		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n	#else\n		vec3 Fr = specularColor;\n	#endif\n	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n	float Ess = fab.x + fab.y;\n	float Ems = 1.0 - Ess;\n	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n	singleScatter += FssEss;\n	multiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n		vec3 normal = geometryNormal;\n		vec3 viewDir = geometryViewDir;\n		vec3 position = geometryPosition;\n		vec3 lightPos = rectAreaLight.position;\n		vec3 halfWidth = rectAreaLight.halfWidth;\n		vec3 halfHeight = rectAreaLight.halfHeight;\n		vec3 lightColor = rectAreaLight.color;\n		float roughness = material.roughness;\n		vec3 rectCoords[ 4 ];\n		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n		vec2 uv = LTC_Uv( normal, viewDir, roughness );\n		vec4 t1 = texture2D( ltc_1, uv );\n		vec4 t2 = texture2D( ltc_2, uv );\n		mat3 mInv = mat3(\n			vec3( t1.x, 0, t1.y ),\n			vec3(    0, 1,    0 ),\n			vec3( t1.z, 0, t1.w )\n		);\n		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n	}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifdef USE_CLEARCOAT\n		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n		vec3 ccIrradiance = dotNLcc * directLight.color;\n		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n	#endif\n	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n	#ifdef USE_CLEARCOAT\n		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n	#endif\n	vec3 singleScattering = vec3( 0.0 );\n	vec3 multiScattering = vec3( 0.0 );\n	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n	#else\n		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n	#endif\n	vec3 totalScattering = singleScattering + multiScattering;\n	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n	reflectedLight.indirectSpecular += radiance * singleScattering;\n	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_Direct_RectArea		RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}", lights_fragment_begin: "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n	geometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n	float dotNVi = saturate( dot( normal, geometryViewDir ) );\n	if ( material.iridescenceThickness == 0.0 ) {\n		material.iridescence = 0.0;\n	} else {\n		material.iridescence = saturate( material.iridescence );\n	}\n	if ( material.iridescence > 0.0 ) {\n		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n	}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointLightInfo( pointLight, geometryPosition, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n		pointLightShadow = pointLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	vec4 spotColor;\n	vec3 spotLightCoord;\n	bool inSpotLightMap;\n	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotLightInfo( spotLight, geometryPosition, directLight );\n		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n		#else\n		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#endif\n		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n		#endif\n		#undef SPOT_LIGHT_MAP_INDEX\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		spotLightShadow = spotLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalLightInfo( directionalLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n		directionalLightShadow = directionalLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n	RectAreaLight rectAreaLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n		rectAreaLight = rectAreaLights[ i ];\n		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 iblIrradiance = vec3( 0.0 );\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	#if defined( USE_LIGHT_PROBES )\n		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n	#endif\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if defined( RE_IndirectSpecular )\n	vec3 radiance = vec3( 0.0 );\n	vec3 clearcoatRadiance = vec3( 0.0 );\n#endif", lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n		irradiance += lightMapIrradiance;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n		iblIrradiance += getIBLIrradiance( geometryNormal );\n	#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	#ifdef USE_ANISOTROPY\n		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n	#else\n		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n	#endif\n	#ifdef USE_CLEARCOAT\n		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n	#endif\n#endif", lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif", logdepthbuf_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif", logdepthbuf_pars_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	uniform float logDepthBufFC;\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif", logdepthbuf_pars_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif", logdepthbuf_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	vFragDepth = 1.0 + gl_Position.w;\n	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif", map_fragment: "#ifdef USE_MAP\n	vec4 sampledDiffuseColor = texture2D( map, vMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n	#endif\n	diffuseColor *= sampledDiffuseColor;\n#endif", map_pars_fragment: "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif", map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n	#if defined( USE_POINTS_UV )\n		vec2 uv = vUv;\n	#else\n		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n	#endif\n#endif\n#ifdef USE_MAP\n	diffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif", map_particle_pars_fragment: "#if defined( USE_POINTS_UV )\n	varying vec2 vUv;\n#else\n	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n		uniform mat3 uvTransform;\n	#endif\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif", metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n	metalnessFactor *= texelMetalness.b;\n#endif", metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif", morphinstance_vertex: "#ifdef USE_INSTANCING_MORPH\n	float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n	}\n#endif", morphcolor_vertex: "#if defined( USE_MORPHCOLORS )\n	vColor *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		#if defined( USE_COLOR_ALPHA )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n		#elif defined( USE_COLOR )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n		#endif\n	}\n#endif", morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n	objectNormal *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif", morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n	#ifndef USE_INSTANCING_MORPH\n		uniform float morphTargetBaseInfluence;\n		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	#endif\n	uniform sampler2DArray morphTargetsTexture;\n	uniform ivec2 morphTargetsTextureSize;\n	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n		int y = texelIndex / morphTargetsTextureSize.x;\n		int x = texelIndex - y * morphTargetsTextureSize.x;\n		ivec3 morphUV = ivec3( x, y, morphTargetIndex );\n		return texelFetch( morphTargetsTexture, morphUV, 0 );\n	}\n#endif", morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n	transformed *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif", normal_fragment_begin: "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal *= faceDirection;\n	#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n	#ifdef USE_TANGENT\n		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn = getTangentFrame( - vViewPosition, normal,\n		#if defined( USE_NORMALMAP )\n			vNormalMapUv\n		#elif defined( USE_CLEARCOAT_NORMALMAP )\n			vClearcoatNormalMapUv\n		#else\n			vUv\n		#endif\n		);\n	#endif\n	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n		tbn[0] *= faceDirection;\n		tbn[1] *= faceDirection;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	#ifdef USE_TANGENT\n		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n	#endif\n	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n		tbn2[0] *= faceDirection;\n		tbn2[1] *= faceDirection;\n	#endif\n#endif\nvec3 nonPerturbedNormal = normal;", normal_fragment_maps: "#ifdef USE_NORMALMAP_OBJECTSPACE\n	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#ifdef FLIP_SIDED\n		normal = - normal;\n	#endif\n	#ifdef DOUBLE_SIDED\n		normal = normal * faceDirection;\n	#endif\n	normal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	mapN.xy *= normalScale;\n	normal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif", normal_pars_fragment: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif", normal_pars_vertex: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif", normal_vertex: "#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n	#ifdef USE_TANGENT\n		vTangent = normalize( transformedTangent );\n		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n	#endif\n#endif", normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n	uniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( uv.st );\n		vec2 st1 = dFdy( uv.st );\n		vec3 N = surf_norm;\n		vec3 q1perp = cross( q1, N );\n		vec3 q0perp = cross( N, q0 );\n		vec3 T = q1perp * st0.x + q0perp * st1.x;\n		vec3 B = q1perp * st0.y + q0perp * st1.y;\n		float det = max( dot( T, T ), dot( B, B ) );\n		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n		return mat3( T * scale, B * scale, N );\n	}\n#endif", clearcoat_normal_fragment_begin: "#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal = nonPerturbedNormal;\n#endif", clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\n	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n	clearcoatMapN.xy *= clearcoatNormalScale;\n	clearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif", clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\n	uniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform sampler2D clearcoatNormalMap;\n	uniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform sampler2D clearcoatRoughnessMap;\n#endif", iridescence_pars_fragment: "#ifdef USE_IRIDESCENCEMAP\n	uniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform sampler2D iridescenceThicknessMap;\n#endif", opaque_fragment: "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );", packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n	return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n	return 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n	if( v <= 0.0 )\n		return vec4( 0., 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec4( 1., 1., 1., 1. );\n	float vuf;\n	float af = modf( v * PackFactors.a, vuf );\n	float bf = modf( vuf * ShiftRight8, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n	if( v <= 0.0 )\n		return vec3( 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec3( 1., 1., 1. );\n	float vuf;\n	float bf = modf( v * PackFactors.b, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n	if( v <= 0.0 )\n		return vec2( 0., 0. );\n	if( v >= 1.0 )\n		return vec2( 1., 1. );\n	float vuf;\n	float gf = modf( v * 256., vuf );\n	return vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n	return dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	return depth * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	return ( near * far ) / ( ( far - near ) * depth - far );\n}", premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif", project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n	mvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n	mvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;", dithering_fragment: "#ifdef DITHERING\n	gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif", dithering_pars_fragment: "#ifdef DITHERING\n	vec3 dithering( vec3 color ) {\n		float grid_position = rand( gl_FragCoord.xy );\n		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n		return color + dither_shift_RGB;\n	}\n#endif", roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n	roughnessFactor *= texelRoughness.g;\n#endif", roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif", shadowmap_pars_fragment: "#if NUM_SPOT_LIGHT_COORDS > 0\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );\n		#ifdef USE_REVERSED_DEPTH_BUFFER\n			return step( depth, compare );\n		#else\n			return step( compare, depth );\n		#endif\n	}\n	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n		return unpackRGBATo2Half( texture2D( shadow, uv ) );\n	}\n	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {\n		float occlusion = 1.0;\n		vec2 distribution = texture2DDistribution( shadow, uv );\n		#ifdef USE_REVERSED_DEPTH_BUFFER\n			float hard_shadow = step( distribution.x, compare );\n		#else\n			float hard_shadow = step( compare, distribution.x );\n		#endif\n		if ( hard_shadow != 1.0 ) {\n			float distance = compare - distribution.x;\n			float variance = max( 0.00000, distribution.y * distribution.y );\n			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n		}\n		return occlusion;\n	}\n	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n		float shadow = 1.0;\n		shadowCoord.xyz /= shadowCoord.w;\n		shadowCoord.z += shadowBias;\n		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n		if ( frustumTest ) {\n		#if defined( SHADOWMAP_TYPE_PCF )\n			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n			float dx0 = - texelSize.x * shadowRadius;\n			float dy0 = - texelSize.y * shadowRadius;\n			float dx1 = + texelSize.x * shadowRadius;\n			float dy1 = + texelSize.y * shadowRadius;\n			float dx2 = dx0 / 2.0;\n			float dy2 = dy0 / 2.0;\n			float dx3 = dx1 / 2.0;\n			float dy3 = dy1 / 2.0;\n			shadow = (\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n			) * ( 1.0 / 17.0 );\n		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n			float dx = texelSize.x;\n			float dy = texelSize.y;\n			vec2 uv = shadowCoord.xy;\n			vec2 f = fract( uv * shadowMapSize + 0.5 );\n			uv -= f * texelSize;\n			shadow = (\n				texture2DCompare( shadowMap, uv, shadowCoord.z ) +\n				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n					 f.x ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n					 f.x ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n					 f.y ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n					 f.y ) +\n				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),\n						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n						  f.x ),\n					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),\n						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n						  f.x ),\n					 f.y )\n			) * ( 1.0 / 9.0 );\n		#elif defined( SHADOWMAP_TYPE_VSM )\n			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n		#else\n			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n		#endif\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	vec2 cubeToUV( vec3 v, float texelSizeY ) {\n		vec3 absV = abs( v );\n		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n		absV *= scaleToCube;\n		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n		vec2 planar = v.xy;\n		float almostATexel = 1.5 * texelSizeY;\n		float almostOne = 1.0 - almostATexel;\n		if ( absV.z >= almostOne ) {\n			if ( v.z > 0.0 )\n				planar.x = 4.0 - v.x;\n		} else if ( absV.x >= almostOne ) {\n			float signX = sign( v.x );\n			planar.x = v.z * signX + 2.0 * signX;\n		} else if ( absV.y >= almostOne ) {\n			float signY = sign( v.y );\n			planar.x = v.x + 2.0 * signY + 2.0;\n			planar.y = v.z * signY - 2.0;\n		}\n		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n	}\n	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		\n		float lightToPositionLength = length( lightToPosition );\n		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {\n			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;\n			vec3 bd3D = normalize( lightToPosition );\n			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n				shadow = (\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n				) * ( 1.0 / 9.0 );\n			#else\n				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n			#endif\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n#endif", shadowmap_pars_vertex: "#if NUM_SPOT_LIGHT_COORDS > 0\n	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n#endif", shadowmap_vertex: "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n	vec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n		shadowWorldPosition = worldPosition;\n		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n		#endif\n		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n#endif", shadowmask_pars_fragment: "float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n		directionalLight = directionalLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		spotLight = spotLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		pointLight = pointLightShadows[ i ];\n		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#endif\n	return shadow;\n}", skinbase_vertex: "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif", skinning_pars_vertex: "#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	uniform highp sampler2D boneTexture;\n	mat4 getBoneMatrix( const in float i ) {\n		int size = textureSize( boneTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n#endif", skinning_vertex: "#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	transformed = ( bindMatrixInverse * skinned ).xyz;\n#endif", skinnormal_vertex: "#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n	#ifdef USE_TANGENT\n		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#endif\n#endif", specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif", specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif", tonemapping_fragment: "#if defined( TONE_MAPPING )\n	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif", tonemapping_pars_fragment: "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n	return saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	return saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	color = max( vec3( 0.0 ), color - 0.004 );\n	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n	return a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n	const mat3 ACESInputMat = mat3(\n		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),\n		vec3( 0.04823, 0.01566, 0.83777 )\n	);\n	const mat3 ACESOutputMat = mat3(\n		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),\n		vec3( -0.07367, -0.00605,  1.07602 )\n	);\n	color *= toneMappingExposure / 0.6;\n	color = ACESInputMat * color;\n	color = RRTAndODTFit( color );\n	color = ACESOutputMat * color;\n	return saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n	vec3( 1.6605, - 0.1246, - 0.0182 ),\n	vec3( - 0.5876, 1.1329, - 0.1006 ),\n	vec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n	vec3( 0.6274, 0.0691, 0.0164 ),\n	vec3( 0.3293, 0.9195, 0.0880 ),\n	vec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n	vec3 x2 = x * x;\n	vec3 x4 = x2 * x2;\n	return + 15.5 * x4 * x2\n		- 40.14 * x4 * x\n		+ 31.96 * x4\n		- 6.868 * x2 * x\n		+ 0.4298 * x2\n		+ 0.1191 * x\n		- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n	const mat3 AgXInsetMatrix = mat3(\n		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n	);\n	const mat3 AgXOutsetMatrix = mat3(\n		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n	);\n	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;\n	color *= toneMappingExposure;\n	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n	color = AgXInsetMatrix * color;\n	color = max( color, 1e-10 );	color = log2( color );\n	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n	color = clamp( color, 0.0, 1.0 );\n	color = agxDefaultContrastApprox( color );\n	color = AgXOutsetMatrix * color;\n	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n	color = clamp( color, 0.0, 1.0 );\n	return color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n	const float StartCompression = 0.8 - 0.04;\n	const float Desaturation = 0.15;\n	color *= toneMappingExposure;\n	float x = min( color.r, min( color.g, color.b ) );\n	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n	color -= offset;\n	float peak = max( color.r, max( color.g, color.b ) );\n	if ( peak < StartCompression ) return color;\n	float d = 1. - StartCompression;\n	float newPeak = 1. - d * d / ( peak + d - StartCompression );\n	color *= newPeak / peak;\n	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n	return mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }", transmission_fragment: "#ifdef USE_TRANSMISSION\n	material.transmission = transmission;\n	material.transmissionAlpha = 1.0;\n	material.thickness = thickness;\n	material.attenuationDistance = attenuationDistance;\n	material.attenuationColor = attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n	#endif\n	vec3 pos = vWorldPosition;\n	vec3 v = normalize( cameraPosition - pos );\n	vec3 n = inverseTransformDirection( normal, viewMatrix );\n	vec4 transmitted = getIBLVolumeRefraction(\n		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,\n		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n		material.attenuationColor, material.attenuationDistance );\n	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif", transmission_pars_fragment: "#ifdef USE_TRANSMISSION\n	uniform float transmission;\n	uniform float thickness;\n	uniform float attenuationDistance;\n	uniform vec3 attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		uniform sampler2D transmissionMap;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		uniform sampler2D thicknessMap;\n	#endif\n	uniform vec2 transmissionSamplerSize;\n	uniform sampler2D transmissionSamplerMap;\n	uniform mat4 modelMatrix;\n	uniform mat4 projectionMatrix;\n	varying vec3 vWorldPosition;\n	float w0( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n	}\n	float w1( float a ) {\n		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n	}\n	float w2( float a ){\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n	}\n	float w3( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * a * a );\n	}\n	float g0( float a ) {\n		return w0( a ) + w1( a );\n	}\n	float g1( float a ) {\n		return w2( a ) + w3( a );\n	}\n	float h0( float a ) {\n		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n	}\n	float h1( float a ) {\n		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n	}\n	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n		uv = uv * texelSize.zw + 0.5;\n		vec2 iuv = floor( uv );\n		vec2 fuv = fract( uv );\n		float g0x = g0( fuv.x );\n		float g1x = g1( fuv.x );\n		float h0x = h0( fuv.x );\n		float h1x = h1( fuv.x );\n		float h0y = h0( fuv.y );\n		float h1y = h1( fuv.y );\n		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n	}\n	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n		vec2 fLodSizeInv = 1.0 / fLodSize;\n		vec2 cLodSizeInv = 1.0 / cLodSize;\n		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n		return mix( fSample, cSample, fract( lod ) );\n	}\n	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n		vec3 modelScale;\n		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n		return normalize( refractionVector ) * thickness * modelScale;\n	}\n	float applyIorToRoughness( const in float roughness, const in float ior ) {\n		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n	}\n	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n	}\n	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n		if ( isinf( attenuationDistance ) ) {\n			return vec3( 1.0 );\n		} else {\n			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;\n		}\n	}\n	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n		const in vec3 attenuationColor, const in float attenuationDistance ) {\n		vec4 transmittedLight;\n		vec3 transmittance;\n		#ifdef USE_DISPERSION\n			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n			for ( int i = 0; i < 3; i ++ ) {\n				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n				vec3 refractedRayExit = position + transmissionRay;\n				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n				vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n				refractionCoords += 1.0;\n				refractionCoords /= 2.0;\n				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n				transmittedLight[ i ] = transmissionSample[ i ];\n				transmittedLight.a += transmissionSample.a;\n				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n			}\n			transmittedLight.a /= 3.0;\n		#else\n			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n			vec3 refractedRayExit = position + transmissionRay;\n			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n			vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n			refractionCoords += 1.0;\n			refractionCoords /= 2.0;\n			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n		#endif\n		vec3 attenuatedColor = transmittance * transmittedLight.rgb;\n		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n	}\n#endif", uv_pars_fragment: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif", uv_pars_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform mat3 mapTransform;\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform mat3 alphaMapTransform;\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	uniform mat3 lightMapTransform;\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	uniform mat3 aoMapTransform;\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	uniform mat3 bumpMapTransform;\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	uniform mat3 normalMapTransform;\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	uniform mat3 displacementMapTransform;\n	varying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	uniform mat3 emissiveMapTransform;\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	uniform mat3 metalnessMapTransform;\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	uniform mat3 roughnessMapTransform;\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	uniform mat3 anisotropyMapTransform;\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	uniform mat3 clearcoatMapTransform;\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform mat3 clearcoatNormalMapTransform;\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform mat3 clearcoatRoughnessMapTransform;\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	uniform mat3 sheenColorMapTransform;\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	uniform mat3 sheenRoughnessMapTransform;\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	uniform mat3 iridescenceMapTransform;\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform mat3 iridescenceThicknessMapTransform;\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	uniform mat3 specularMapTransform;\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	uniform mat3 specularColorMapTransform;\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	uniform mat3 specularIntensityMapTransform;\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif", uv_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	vUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif", worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n	vec4 worldPosition = vec4( transformed, 1.0 );\n	#ifdef USE_BATCHING\n		worldPosition = batchingMatrix * worldPosition;\n	#endif\n	#ifdef USE_INSTANCING\n		worldPosition = instanceMatrix * worldPosition;\n	#endif\n	worldPosition = modelMatrix * worldPosition;\n#endif", background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	gl_Position = vec4( position.xy, 1.0, 1.0 );\n}", background_frag: "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n	vec4 texColor = texture2D( t2D, vUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}", backgroundCube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}", backgroundCube_frag: "#ifdef ENVMAP_TYPE_CUBE\n	uniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n	uniform sampler2D envMap;\n#endif\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n	#elif defined( ENVMAP_TYPE_CUBE_UV )\n		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n	#else\n		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}", cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}", cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n	gl_FragColor = texColor;\n	gl_FragColor.a *= opacity;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}", depth_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vHighPrecisionZW = gl_Position.zw;\n}", depth_frag: "#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <logdepthbuf_fragment>\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n	#else\n		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n	#endif\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( fragCoordZ );\n	#elif DEPTH_PACKING == 3202\n		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n	#elif DEPTH_PACKING == 3203\n		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n	#endif\n}", distanceRGBA_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition.xyz;\n}", distanceRGBA_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	float dist = length( vWorldPosition - referencePosition );\n	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n	dist = saturate( dist );\n	gl_FragColor = packDepthToRGBA( dist );\n}", equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n}", equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vec3 direction = normalize( vWorldDirection );\n	vec2 sampleUV = equirectUv( direction );\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}", linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vLineDistance = scale * lineDistance;\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}", linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}", meshbasic_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}", meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}", meshlambert_vert: "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}", meshlambert_frag: "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_lambert_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}", meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n	vViewPosition = - mvPosition.xyz;\n}", meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	vec3 viewDir = normalize( vViewPosition );\n	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n	vec3 y = cross( viewDir, x );\n	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n	#ifdef USE_MATCAP\n		vec4 matcapColor = texture2D( matcap, uv );\n	#else\n		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n	#endif\n	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}", meshnormal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	vViewPosition = - mvPosition.xyz;\n#endif\n}", meshnormal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}", meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}", meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}", meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n	varying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n	vWorldPosition = worldPosition.xyz;\n#endif\n}", meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n	#define IOR\n	#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n	uniform float ior;\n#endif\n#ifdef USE_SPECULAR\n	uniform float specularIntensity;\n	uniform vec3 specularColor;\n	#ifdef USE_SPECULAR_COLORMAP\n		uniform sampler2D specularColorMap;\n	#endif\n	#ifdef USE_SPECULAR_INTENSITYMAP\n		uniform sampler2D specularIntensityMap;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT\n	uniform float clearcoat;\n	uniform float clearcoatRoughness;\n#endif\n#ifdef USE_DISPERSION\n	uniform float dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n	uniform float iridescence;\n	uniform float iridescenceIOR;\n	uniform float iridescenceThicknessMinimum;\n	uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n	uniform vec3 sheenColor;\n	uniform float sheenRoughness;\n	#ifdef USE_SHEEN_COLORMAP\n		uniform sampler2D sheenColorMap;\n	#endif\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		uniform sampler2D sheenRoughnessMap;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	uniform vec2 anisotropyVector;\n	#ifdef USE_ANISOTROPYMAP\n		uniform sampler2D anisotropyMap;\n	#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <clearcoat_normal_fragment_begin>\n	#include <clearcoat_normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n	#include <transmission_fragment>\n	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n	#ifdef USE_SHEEN\n		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;\n	#endif\n	#ifdef USE_CLEARCOAT\n		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n	#endif\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}", meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}", meshtoon_frag: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_toon_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}", points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n	varying vec2 vUv;\n	uniform mat3 uvTransform;\n#endif\nvoid main() {\n	#ifdef USE_POINTS_UV\n		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	#endif\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	gl_PointSize = size;\n	#ifdef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n}", points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}", shadow_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}", shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	#include <logdepthbuf_fragment>\n	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}", sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	vec4 mvPosition = modelViewMatrix[ 3 ];\n	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n	#ifndef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) scale *= - mvPosition.z;\n	#endif\n	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n	vec2 rotatedPosition;\n	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n	mvPosition.xy += rotatedPosition;\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}", sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}" }, n0 = { common: { diffuse: { value: new tl(16777215) }, opacity: { value: 1 }, map: { value: null }, mapTransform: { value: new R() }, alphaMap: { value: null }, alphaMapTransform: { value: new R() }, alphaTest: { value: 0 } }, specularmap: { specularMap: { value: null }, specularMapTransform: { value: new R() } }, envmap: { envMap: { value: null }, envMapRotation: { value: new R() }, flipEnvMap: { value: -1 }, reflectivity: { value: 1 }, ior: { value: 1.5 }, refractionRatio: { value: 0.98 } }, aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new R() } }, lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 }, lightMapTransform: { value: new R() } }, bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new R() }, bumpScale: { value: 1 } }, normalmap: { normalMap: { value: null }, normalMapTransform: { value: new R() }, normalScale: { value: new E(1, 1) } }, displacementmap: { displacementMap: { value: null }, displacementMapTransform: { value: new R() }, displacementScale: { value: 1 }, displacementBias: { value: 0 } }, emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new R() } }, metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new R() } }, roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new R() } }, gradientmap: { gradientMap: { value: null } }, fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new tl(16777215) } }, lights: { ambientLightColor: { value: [] }, lightProbe: { value: [] }, directionalLights: { value: [], properties: { direction: {}, color: {} } }, directionalLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, directionalShadowMap: { value: [] }, directionalShadowMatrix: { value: [] }, spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } }, spotLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, spotLightMap: { value: [] }, spotShadowMap: { value: [] }, spotLightMatrix: { value: [] }, pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } }, pointLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} } }, pointShadowMap: { value: [] }, pointShadowMatrix: { value: [] }, hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } }, rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } }, ltc_1: { value: null }, ltc_2: { value: null } }, points: { diffuse: { value: new tl(16777215) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, alphaMap: { value: null }, alphaMapTransform: { value: new R() }, alphaTest: { value: 0 }, uvTransform: { value: new R() } }, sprite: { diffuse: { value: new tl(16777215) }, opacity: { value: 1 }, center: { value: new E(0.5, 0.5) }, rotation: { value: 0 }, map: { value: null }, mapTransform: { value: new R() }, alphaMap: { value: null }, alphaMapTransform: { value: new R() }, alphaTest: { value: 0 } } }, n1 = { basic: { uniforms: tG([n0.common, n0.specularmap, n0.envmap, n0.aomap, n0.lightmap, n0.fog]), vertexShader: nQ.meshbasic_vert, fragmentShader: nQ.meshbasic_frag }, lambert: { uniforms: tG([n0.common, n0.specularmap, n0.envmap, n0.aomap, n0.lightmap, n0.emissivemap, n0.bumpmap, n0.normalmap, n0.displacementmap, n0.fog, n0.lights, { emissive: { value: new tl(0) } }]), vertexShader: nQ.meshlambert_vert, fragmentShader: nQ.meshlambert_frag }, phong: { uniforms: tG([n0.common, n0.specularmap, n0.envmap, n0.aomap, n0.lightmap, n0.emissivemap, n0.bumpmap, n0.normalmap, n0.displacementmap, n0.fog, n0.lights, { emissive: { value: new tl(0) }, specular: { value: new tl(1118481) }, shininess: { value: 30 } }]), vertexShader: nQ.meshphong_vert, fragmentShader: nQ.meshphong_frag }, standard: { uniforms: tG([n0.common, n0.envmap, n0.aomap, n0.lightmap, n0.emissivemap, n0.bumpmap, n0.normalmap, n0.displacementmap, n0.roughnessmap, n0.metalnessmap, n0.fog, n0.lights, { emissive: { value: new tl(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } }]), vertexShader: nQ.meshphysical_vert, fragmentShader: nQ.meshphysical_frag }, toon: { uniforms: tG([n0.common, n0.aomap, n0.lightmap, n0.emissivemap, n0.bumpmap, n0.normalmap, n0.displacementmap, n0.gradientmap, n0.fog, n0.lights, { emissive: { value: new tl(0) } }]), vertexShader: nQ.meshtoon_vert, fragmentShader: nQ.meshtoon_frag }, matcap: { uniforms: tG([n0.common, n0.bumpmap, n0.normalmap, n0.displacementmap, n0.fog, { matcap: { value: null } }]), vertexShader: nQ.meshmatcap_vert, fragmentShader: nQ.meshmatcap_frag }, points: { uniforms: tG([n0.points, n0.fog]), vertexShader: nQ.points_vert, fragmentShader: nQ.points_frag }, dashed: { uniforms: tG([n0.common, n0.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: nQ.linedashed_vert, fragmentShader: nQ.linedashed_frag }, depth: { uniforms: tG([n0.common, n0.displacementmap]), vertexShader: nQ.depth_vert, fragmentShader: nQ.depth_frag }, normal: { uniforms: tG([n0.common, n0.bumpmap, n0.normalmap, n0.displacementmap, { opacity: { value: 1 } }]), vertexShader: nQ.meshnormal_vert, fragmentShader: nQ.meshnormal_frag }, sprite: { uniforms: tG([n0.sprite, n0.fog]), vertexShader: nQ.sprite_vert, fragmentShader: nQ.sprite_frag }, background: { uniforms: { uvTransform: { value: new R() }, t2D: { value: null }, backgroundIntensity: { value: 1 } }, vertexShader: nQ.background_vert, fragmentShader: nQ.background_frag }, backgroundCube: { uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 }, backgroundBlurriness: { value: 0 }, backgroundIntensity: { value: 1 }, backgroundRotation: { value: new R() } }, vertexShader: nQ.backgroundCube_vert, fragmentShader: nQ.backgroundCube_frag }, cube: { uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } }, vertexShader: nQ.cube_vert, fragmentShader: nQ.cube_frag }, equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: nQ.equirect_vert, fragmentShader: nQ.equirect_frag }, distanceRGBA: { uniforms: tG([n0.common, n0.displacementmap, { referencePosition: { value: new b() }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]), vertexShader: nQ.distanceRGBA_vert, fragmentShader: nQ.distanceRGBA_frag }, shadow: { uniforms: tG([n0.lights, n0.fog, { color: { value: new tl(0) }, opacity: { value: 1 } }]), vertexShader: nQ.shadow_vert, fragmentShader: nQ.shadow_frag } };
  n1.physical = { uniforms: tG([n1.standard.uniforms, { clearcoat: { value: 0 }, clearcoatMap: { value: null }, clearcoatMapTransform: { value: new R() }, clearcoatNormalMap: { value: null }, clearcoatNormalMapTransform: { value: new R() }, clearcoatNormalScale: { value: new E(1, 1) }, clearcoatRoughness: { value: 0 }, clearcoatRoughnessMap: { value: null }, clearcoatRoughnessMapTransform: { value: new R() }, dispersion: { value: 0 }, iridescence: { value: 0 }, iridescenceMap: { value: null }, iridescenceMapTransform: { value: new R() }, iridescenceIOR: { value: 1.3 }, iridescenceThicknessMinimum: { value: 100 }, iridescenceThicknessMaximum: { value: 400 }, iridescenceThicknessMap: { value: null }, iridescenceThicknessMapTransform: { value: new R() }, sheen: { value: 0 }, sheenColor: { value: new tl(0) }, sheenColorMap: { value: null }, sheenColorMapTransform: { value: new R() }, sheenRoughness: { value: 1 }, sheenRoughnessMap: { value: null }, sheenRoughnessMapTransform: { value: new R() }, transmission: { value: 0 }, transmissionMap: { value: null }, transmissionMapTransform: { value: new R() }, transmissionSamplerSize: { value: new E() }, transmissionSamplerMap: { value: null }, thickness: { value: 0 }, thicknessMap: { value: null }, thicknessMapTransform: { value: new R() }, attenuationDistance: { value: 0 }, attenuationColor: { value: new tl(0) }, specularColor: { value: new tl(1, 1, 1) }, specularColorMap: { value: null }, specularColorMapTransform: { value: new R() }, specularIntensity: { value: 1 }, specularIntensityMap: { value: null }, specularIntensityMapTransform: { value: new R() }, anisotropyVector: { value: new E() }, anisotropyMap: { value: null }, anisotropyMapTransform: { value: new R() } }]), vertexShader: nQ.meshphysical_vert, fragmentShader: nQ.meshphysical_frag };
  let n2 = { r: 0, b: 0, g: 0 }, n3 = new eO(), n4 = new eA();
  function n5(e10, t10, i10, n10, r10, a10, s2) {
    let o2, l2, h2 = new tl(0), u2 = +(true !== a10), d2 = null, p2 = 0, f2 = null;
    function m2(e11) {
      let n11 = true === e11.isScene ? e11.background : null;
      return n11 && n11.isTexture && (n11 = (e11.backgroundBlurriness > 0 ? i10 : t10).get(n11)), n11;
    }
    function g2(t11, i11) {
      t11.getRGB(n2, tW(e10)), n10.buffers.color.setClear(n2.r, n2.g, n2.b, i11, s2);
    }
    return { getClearColor: function() {
      return h2;
    }, setClearColor: function(e11, t11 = 1) {
      h2.set(e11), g2(h2, u2 = t11);
    }, getClearAlpha: function() {
      return u2;
    }, setClearAlpha: function(e11) {
      g2(h2, u2 = e11);
    }, render: function(t11) {
      let i11 = false, r11 = m2(t11);
      null === r11 ? g2(h2, u2) : r11 && r11.isColor && (g2(r11, 1), i11 = true);
      let a11 = e10.xr.getEnvironmentBlendMode();
      "additive" === a11 ? n10.buffers.color.setClear(0, 0, 0, 1, s2) : "alpha-blend" === a11 && n10.buffers.color.setClear(0, 0, 0, 0, s2), (e10.autoClear || i11) && (n10.buffers.depth.setTest(true), n10.buffers.depth.setMask(true), n10.buffers.color.setMask(true), e10.clear(e10.autoClearColor, e10.autoClearDepth, e10.autoClearStencil));
    }, addToRenderList: function(t11, i11) {
      let n11 = m2(i11);
      n11 && (n11.isCubeTexture || 306 === n11.mapping) ? (void 0 === l2 && ((l2 = new tz(new tH(1, 1, 1), new tj({ name: "BackgroundCubeMaterial", uniforms: tk(n1.backgroundCube.uniforms), vertexShader: n1.backgroundCube.vertexShader, fragmentShader: n1.backgroundCube.fragmentShader, side: 1, depthTest: false, depthWrite: false, fog: false, allowOverride: false }))).geometry.deleteAttribute("normal"), l2.geometry.deleteAttribute("uv"), l2.onBeforeRender = function(e11, t12, i12) {
        this.matrixWorld.copyPosition(i12.matrixWorld);
      }, Object.defineProperty(l2.material, "envMap", { get: function() {
        return this.uniforms.envMap.value;
      } }), r10.update(l2)), n3.copy(i11.backgroundRotation), n3.x *= -1, n3.y *= -1, n3.z *= -1, n11.isCubeTexture && false === n11.isRenderTargetTexture && (n3.y *= -1, n3.z *= -1), l2.material.uniforms.envMap.value = n11, l2.material.uniforms.flipEnvMap.value = n11.isCubeTexture && false === n11.isRenderTargetTexture ? -1 : 1, l2.material.uniforms.backgroundBlurriness.value = i11.backgroundBlurriness, l2.material.uniforms.backgroundIntensity.value = i11.backgroundIntensity, l2.material.uniforms.backgroundRotation.value.setFromMatrix4(n4.makeRotationFromEuler(n3)), l2.material.toneMapped = B.getTransfer(n11.colorSpace) !== c, (d2 !== n11 || p2 !== n11.version || f2 !== e10.toneMapping) && (l2.material.needsUpdate = true, d2 = n11, p2 = n11.version, f2 = e10.toneMapping), l2.layers.enableAll(), t11.unshift(l2, l2.geometry, l2.material, 0, 0, null)) : n11 && n11.isTexture && (void 0 === o2 && ((o2 = new tz(new i6(2, 2), new tj({ name: "BackgroundMaterial", uniforms: tk(n1.background.uniforms), vertexShader: n1.background.vertexShader, fragmentShader: n1.background.fragmentShader, side: 0, depthTest: false, depthWrite: false, fog: false, allowOverride: false }))).geometry.deleteAttribute("normal"), Object.defineProperty(o2.material, "map", { get: function() {
        return this.uniforms.t2D.value;
      } }), r10.update(o2)), o2.material.uniforms.t2D.value = n11, o2.material.uniforms.backgroundIntensity.value = i11.backgroundIntensity, o2.material.toneMapped = B.getTransfer(n11.colorSpace) !== c, true === n11.matrixAutoUpdate && n11.updateMatrix(), o2.material.uniforms.uvTransform.value.copy(n11.matrix), (d2 !== n11 || p2 !== n11.version || f2 !== e10.toneMapping) && (o2.material.needsUpdate = true, d2 = n11, p2 = n11.version, f2 = e10.toneMapping), o2.layers.enableAll(), t11.unshift(o2, o2.geometry, o2.material, 0, 0, null));
    }, dispose: function() {
      void 0 !== l2 && (l2.geometry.dispose(), l2.material.dispose(), l2 = void 0), void 0 !== o2 && (o2.geometry.dispose(), o2.material.dispose(), o2 = void 0);
    } };
  }
  function n6(e10, t10) {
    let i10 = e10.getParameter(e10.MAX_VERTEX_ATTRIBS), n10 = {}, r10 = h2(null), a10 = r10, s2 = false;
    function o2(t11) {
      return e10.bindVertexArray(t11);
    }
    function l2(t11) {
      return e10.deleteVertexArray(t11);
    }
    function h2(e11) {
      let t11 = [], n11 = [], r11 = [];
      for (let e12 = 0; e12 < i10; e12++) t11[e12] = 0, n11[e12] = 0, r11[e12] = 0;
      return { geometry: null, program: null, wireframe: false, newAttributes: t11, enabledAttributes: n11, attributeDivisors: r11, object: e11, attributes: {}, index: null };
    }
    function c2() {
      let e11 = a10.newAttributes;
      for (let t11 = 0, i11 = e11.length; t11 < i11; t11++) e11[t11] = 0;
    }
    function u2(e11) {
      d2(e11, 0);
    }
    function d2(t11, i11) {
      let n11 = a10.newAttributes, r11 = a10.enabledAttributes, s3 = a10.attributeDivisors;
      n11[t11] = 1, 0 === r11[t11] && (e10.enableVertexAttribArray(t11), r11[t11] = 1), s3[t11] !== i11 && (e10.vertexAttribDivisor(t11, i11), s3[t11] = i11);
    }
    function p2() {
      let t11 = a10.newAttributes, i11 = a10.enabledAttributes;
      for (let n11 = 0, r11 = i11.length; n11 < r11; n11++) i11[n11] !== t11[n11] && (e10.disableVertexAttribArray(n11), i11[n11] = 0);
    }
    function f2(t11, i11, n11, r11, a11, s3, o3) {
      true === o3 ? e10.vertexAttribIPointer(t11, i11, n11, a11, s3) : e10.vertexAttribPointer(t11, i11, n11, r11, a11, s3);
    }
    function m2() {
      g2(), s2 = true, a10 !== r10 && o2((a10 = r10).object);
    }
    function g2() {
      r10.geometry = null, r10.program = null, r10.wireframe = false;
    }
    return { setup: function(i11, r11, l3, m3, g3) {
      var _2, v2;
      let x2, y2, M2, S2, E2 = false, T2 = (_2 = m3, v2 = l3, x2 = true === r11.wireframe, void 0 === (y2 = n10[_2.id]) && (y2 = {}, n10[_2.id] = y2), void 0 === (M2 = y2[v2.id]) && (M2 = {}, y2[v2.id] = M2), void 0 === (S2 = M2[x2]) && (S2 = h2(e10.createVertexArray()), M2[x2] = S2), S2);
      a10 !== T2 && o2((a10 = T2).object), (E2 = (function(e11, t11, i12, n11) {
        let r12 = a10.attributes, s3 = t11.attributes, o3 = 0, l4 = i12.getAttributes();
        for (let t12 in l4) if (l4[t12].location >= 0) {
          let i13 = r12[t12], n12 = s3[t12];
          if (void 0 === n12 && ("instanceMatrix" === t12 && e11.instanceMatrix && (n12 = e11.instanceMatrix), "instanceColor" === t12 && e11.instanceColor && (n12 = e11.instanceColor)), void 0 === i13 || i13.attribute !== n12 || n12 && i13.data !== n12.data) return true;
          o3++;
        }
        return a10.attributesNum !== o3 || a10.index !== n11;
      })(i11, m3, l3, g3)) && (function(e11, t11, i12, n11) {
        let r12 = {}, s3 = t11.attributes, o3 = 0, l4 = i12.getAttributes();
        for (let t12 in l4) if (l4[t12].location >= 0) {
          let i13 = s3[t12];
          void 0 === i13 && ("instanceMatrix" === t12 && e11.instanceMatrix && (i13 = e11.instanceMatrix), "instanceColor" === t12 && e11.instanceColor && (i13 = e11.instanceColor));
          let n12 = {};
          n12.attribute = i13, i13 && i13.data && (n12.data = i13.data), r12[t12] = n12, o3++;
        }
        a10.attributes = r12, a10.attributesNum = o3, a10.index = n11;
      })(i11, m3, l3, g3), null !== g3 && t10.update(g3, e10.ELEMENT_ARRAY_BUFFER), (E2 || s2) && (s2 = false, (function(i12, n11, r12, a11) {
        c2();
        let s3 = a11.attributes, o3 = r12.getAttributes(), l4 = n11.defaultAttributeValues;
        for (let n12 in o3) {
          let r13 = o3[n12];
          if (r13.location >= 0) {
            let o4 = s3[n12];
            if (void 0 === o4 && ("instanceMatrix" === n12 && i12.instanceMatrix && (o4 = i12.instanceMatrix), "instanceColor" === n12 && i12.instanceColor && (o4 = i12.instanceColor)), void 0 !== o4) {
              let n13 = o4.normalized, s4 = o4.itemSize, l5 = t10.get(o4);
              if (void 0 === l5) continue;
              let h3 = l5.buffer, c3 = l5.type, p3 = l5.bytesPerElement, m4 = c3 === e10.INT || c3 === e10.UNSIGNED_INT || 1013 === o4.gpuType;
              if (o4.isInterleavedBufferAttribute) {
                let t11 = o4.data, l6 = t11.stride, g4 = o4.offset;
                if (t11.isInstancedInterleavedBuffer) {
                  for (let e11 = 0; e11 < r13.locationSize; e11++) d2(r13.location + e11, t11.meshPerAttribute);
                  true !== i12.isInstancedMesh && void 0 === a11._maxInstanceCount && (a11._maxInstanceCount = t11.meshPerAttribute * t11.count);
                } else for (let e11 = 0; e11 < r13.locationSize; e11++) u2(r13.location + e11);
                e10.bindBuffer(e10.ARRAY_BUFFER, h3);
                for (let e11 = 0; e11 < r13.locationSize; e11++) f2(r13.location + e11, s4 / r13.locationSize, c3, n13, l6 * p3, (g4 + s4 / r13.locationSize * e11) * p3, m4);
              } else {
                if (o4.isInstancedBufferAttribute) {
                  for (let e11 = 0; e11 < r13.locationSize; e11++) d2(r13.location + e11, o4.meshPerAttribute);
                  true !== i12.isInstancedMesh && void 0 === a11._maxInstanceCount && (a11._maxInstanceCount = o4.meshPerAttribute * o4.count);
                } else for (let e11 = 0; e11 < r13.locationSize; e11++) u2(r13.location + e11);
                e10.bindBuffer(e10.ARRAY_BUFFER, h3);
                for (let e11 = 0; e11 < r13.locationSize; e11++) f2(r13.location + e11, s4 / r13.locationSize, c3, n13, s4 * p3, s4 / r13.locationSize * e11 * p3, m4);
              }
            } else if (void 0 !== l4) {
              let t11 = l4[n12];
              if (void 0 !== t11) switch (t11.length) {
                case 2:
                  e10.vertexAttrib2fv(r13.location, t11);
                  break;
                case 3:
                  e10.vertexAttrib3fv(r13.location, t11);
                  break;
                case 4:
                  e10.vertexAttrib4fv(r13.location, t11);
                  break;
                default:
                  e10.vertexAttrib1fv(r13.location, t11);
              }
            }
          }
        }
        p2();
      })(i11, r11, l3, m3), null !== g3 && e10.bindBuffer(e10.ELEMENT_ARRAY_BUFFER, t10.get(g3).buffer));
    }, reset: m2, resetDefaultState: g2, dispose: function() {
      for (let e11 in m2(), n10) {
        let t11 = n10[e11];
        for (let e12 in t11) {
          let i11 = t11[e12];
          for (let e13 in i11) l2(i11[e13].object), delete i11[e13];
          delete t11[e12];
        }
        delete n10[e11];
      }
    }, releaseStatesOfGeometry: function(e11) {
      if (void 0 === n10[e11.id]) return;
      let t11 = n10[e11.id];
      for (let e12 in t11) {
        let i11 = t11[e12];
        for (let e13 in i11) l2(i11[e13].object), delete i11[e13];
        delete t11[e12];
      }
      delete n10[e11.id];
    }, releaseStatesOfProgram: function(e11) {
      for (let t11 in n10) {
        let i11 = n10[t11];
        if (void 0 === i11[e11.id]) continue;
        let r11 = i11[e11.id];
        for (let e12 in r11) l2(r11[e12].object), delete r11[e12];
        delete i11[e11.id];
      }
    }, initAttributes: c2, enableAttribute: u2, disableUnusedAttributes: p2 };
  }
  function n8(e10, t10, i10) {
    let n10;
    function r10(t11, r11, a10) {
      0 !== a10 && (e10.drawArraysInstanced(n10, t11, r11, a10), i10.update(r11, n10, a10));
    }
    this.setMode = function(e11) {
      n10 = e11;
    }, this.render = function(t11, r11) {
      e10.drawArrays(n10, t11, r11), i10.update(r11, n10, 1);
    }, this.renderInstances = r10, this.renderMultiDraw = function(e11, r11, a10) {
      if (0 === a10) return;
      t10.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n10, e11, 0, r11, 0, a10);
      let s2 = 0;
      for (let e12 = 0; e12 < a10; e12++) s2 += r11[e12];
      i10.update(s2, n10, 1);
    }, this.renderMultiDrawInstances = function(e11, a10, s2, o2) {
      if (0 === s2) return;
      let l2 = t10.get("WEBGL_multi_draw");
      if (null === l2) for (let t11 = 0; t11 < e11.length; t11++) r10(e11[t11], a10[t11], o2[t11]);
      else {
        l2.multiDrawArraysInstancedWEBGL(n10, e11, 0, a10, 0, o2, 0, s2);
        let t11 = 0;
        for (let e12 = 0; e12 < s2; e12++) t11 += a10[e12] * o2[e12];
        i10.update(t11, n10, 1);
      }
    };
  }
  function n9(e10, t10, i10, n10) {
    let r10;
    function a10(t11) {
      if ("highp" === t11) {
        if (e10.getShaderPrecisionFormat(e10.VERTEX_SHADER, e10.HIGH_FLOAT).precision > 0 && e10.getShaderPrecisionFormat(e10.FRAGMENT_SHADER, e10.HIGH_FLOAT).precision > 0) return "highp";
        t11 = "mediump";
      }
      return "mediump" === t11 && e10.getShaderPrecisionFormat(e10.VERTEX_SHADER, e10.MEDIUM_FLOAT).precision > 0 && e10.getShaderPrecisionFormat(e10.FRAGMENT_SHADER, e10.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
    }
    let s2 = void 0 !== i10.precision ? i10.precision : "highp", o2 = a10(s2);
    o2 !== s2 && (console.warn("THREE.WebGLRenderer:", s2, "not supported, using", o2, "instead."), s2 = o2);
    let l2 = true === i10.logarithmicDepthBuffer, h2 = true === i10.reversedDepthBuffer && t10.has("EXT_clip_control"), c2 = e10.getParameter(e10.MAX_TEXTURE_IMAGE_UNITS), u2 = e10.getParameter(e10.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    return { isWebGL2: true, getMaxAnisotropy: function() {
      if (void 0 !== r10) return r10;
      if (true === t10.has("EXT_texture_filter_anisotropic")) {
        let i11 = t10.get("EXT_texture_filter_anisotropic");
        r10 = e10.getParameter(i11.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      } else r10 = 0;
      return r10;
    }, getMaxPrecision: a10, textureFormatReadable: function(t11) {
      return 1023 === t11 || n10.convert(t11) === e10.getParameter(e10.IMPLEMENTATION_COLOR_READ_FORMAT);
    }, textureTypeReadable: function(i11) {
      let r11 = 1016 === i11 && (t10.has("EXT_color_buffer_half_float") || t10.has("EXT_color_buffer_float"));
      return 1009 === i11 || n10.convert(i11) === e10.getParameter(e10.IMPLEMENTATION_COLOR_READ_TYPE) || 1015 === i11 || !!r11;
    }, precision: s2, logarithmicDepthBuffer: l2, reversedDepthBuffer: h2, maxTextures: c2, maxVertexTextures: u2, maxTextureSize: e10.getParameter(e10.MAX_TEXTURE_SIZE), maxCubemapSize: e10.getParameter(e10.MAX_CUBE_MAP_TEXTURE_SIZE), maxAttributes: e10.getParameter(e10.MAX_VERTEX_ATTRIBS), maxVertexUniforms: e10.getParameter(e10.MAX_VERTEX_UNIFORM_VECTORS), maxVaryings: e10.getParameter(e10.MAX_VARYING_VECTORS), maxFragmentUniforms: e10.getParameter(e10.MAX_FRAGMENT_UNIFORM_VECTORS), vertexTextures: u2 > 0, maxSamples: e10.getParameter(e10.MAX_SAMPLES) };
  }
  function n7(e10) {
    let t10 = this, i10 = null, n10 = 0, r10 = false, a10 = false, s2 = new iM(), o2 = new R(), l2 = { value: null, needsUpdate: false };
    function h2(e11, i11, n11, r11) {
      let a11 = null !== e11 ? e11.length : 0, h3 = null;
      if (0 !== a11) {
        if (h3 = l2.value, true !== r11 || null === h3) {
          let t11 = n11 + 4 * a11, r12 = i11.matrixWorldInverse;
          o2.getNormalMatrix(r12), (null === h3 || h3.length < t11) && (h3 = new Float32Array(t11));
          for (let t12 = 0, i12 = n11; t12 !== a11; ++t12, i12 += 4) s2.copy(e11[t12]).applyMatrix4(r12, o2), s2.normal.toArray(h3, i12), h3[i12 + 3] = s2.constant;
        }
        l2.value = h3, l2.needsUpdate = true;
      }
      return t10.numPlanes = a11, t10.numIntersection = 0, h3;
    }
    this.uniform = l2, this.numPlanes = 0, this.numIntersection = 0, this.init = function(e11, t11) {
      let i11 = 0 !== e11.length || t11 || 0 !== n10 || r10;
      return r10 = t11, n10 = e11.length, i11;
    }, this.beginShadows = function() {
      a10 = true, h2(null);
    }, this.endShadows = function() {
      a10 = false;
    }, this.setGlobalState = function(e11, t11) {
      i10 = h2(e11, t11, 0);
    }, this.setState = function(s3, o3, c2) {
      let u2 = s3.clippingPlanes, d2 = s3.clipIntersection, p2 = s3.clipShadows, f2 = e10.get(s3);
      if (r10 && null !== u2 && 0 !== u2.length && (!a10 || p2)) {
        let e11 = a10 ? 0 : n10, t11 = 4 * e11, r11 = f2.clippingState || null;
        l2.value = r11, r11 = h2(u2, o3, t11, c2);
        for (let e12 = 0; e12 !== t11; ++e12) r11[e12] = i10[e12];
        f2.clippingState = r11, this.numIntersection = d2 ? this.numPlanes : 0, this.numPlanes += e11;
      } else a10 ? h2(null) : (l2.value !== i10 && (l2.value = i10, l2.needsUpdate = n10 > 0), t10.numPlanes = n10, t10.numIntersection = 0);
    };
  }
  function re(e10) {
    let t10 = /* @__PURE__ */ new WeakMap();
    function i10(e11, t11) {
      return 303 === t11 ? e11.mapping = 301 : 304 === t11 && (e11.mapping = 302), e11;
    }
    function n10(e11) {
      let i11 = e11.target;
      i11.removeEventListener("dispose", n10);
      let r10 = t10.get(i11);
      void 0 !== r10 && (t10.delete(i11), r10.dispose());
    }
    return { get: function(r10) {
      if (r10 && r10.isTexture) {
        let a10 = r10.mapping;
        if (303 === a10 || 304 === a10) if (t10.has(r10)) return i10(t10.get(r10).texture, r10.mapping);
        else {
          let a11 = r10.image;
          if (!a11 || !(a11.height > 0)) return null;
          {
            let s2 = new t0(a11.height);
            return s2.fromEquirectangularTexture(e10, r10), t10.set(r10, s2), r10.addEventListener("dispose", n10), i10(s2.texture, r10.mapping);
          }
        }
      }
      return r10;
    }, dispose: function() {
      t10 = /* @__PURE__ */ new WeakMap();
    } };
  }
  let rt = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], ri = new nU(), rn = new tl(), rr = null, ra = 0, rs = 0, ro = false, rl = (1 + Math.sqrt(5)) / 2, rh = 1 / rl, rc = [new b(-rl, rh, 0), new b(rl, rh, 0), new b(-rh, 0, rl), new b(rh, 0, rl), new b(0, rl, -rh), new b(0, rl, rh), new b(-1, 1, -1), new b(1, 1, -1), new b(-1, 1, 1), new b(1, 1, 1)], ru = new b();
  class rd {
    constructor(e10) {
      this._renderer = e10, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
    }
    fromScene(e10, t10 = 0, i10 = 0.1, n10 = 100, r10 = {}) {
      let { size: a10 = 256, position: s2 = ru } = r10;
      rr = this._renderer.getRenderTarget(), ra = this._renderer.getActiveCubeFace(), rs = this._renderer.getActiveMipmapLevel(), ro = this._renderer.xr.enabled, this._renderer.xr.enabled = false, this._setSize(a10);
      let o2 = this._allocateTargets();
      return o2.depthBuffer = true, this._sceneToCubeUV(e10, i10, n10, o2, s2), t10 > 0 && this._blur(o2, 0, 0, t10), this._applyPMREM(o2), this._cleanup(o2), o2;
    }
    fromEquirectangular(e10, t10 = null) {
      return this._fromTexture(e10, t10);
    }
    fromCubemap(e10, t10 = null) {
      return this._fromTexture(e10, t10);
    }
    compileCubemapShader() {
      null === this._cubemapMaterial && (this._cubemapMaterial = rg(), this._compileMaterial(this._cubemapMaterial));
    }
    compileEquirectangularShader() {
      null === this._equirectMaterial && (this._equirectMaterial = rm(), this._compileMaterial(this._equirectMaterial));
    }
    dispose() {
      this._dispose(), null !== this._cubemapMaterial && this._cubemapMaterial.dispose(), null !== this._equirectMaterial && this._equirectMaterial.dispose();
    }
    _setSize(e10) {
      this._lodMax = Math.floor(Math.log2(e10)), this._cubeSize = Math.pow(2, this._lodMax);
    }
    _dispose() {
      null !== this._blurMaterial && this._blurMaterial.dispose(), null !== this._pingPongRenderTarget && this._pingPongRenderTarget.dispose();
      for (let e10 = 0; e10 < this._lodPlanes.length; e10++) this._lodPlanes[e10].dispose();
    }
    _cleanup(e10) {
      this._renderer.setRenderTarget(rr, ra, rs), this._renderer.xr.enabled = ro, e10.scissorTest = false, rf(e10, 0, 0, e10.width, e10.height);
    }
    _fromTexture(e10, t10) {
      301 === e10.mapping || 302 === e10.mapping ? this._setSize(0 === e10.image.length ? 16 : e10.image[0].width || e10.image[0].image.width) : this._setSize(e10.image.width / 4), rr = this._renderer.getRenderTarget(), ra = this._renderer.getActiveCubeFace(), rs = this._renderer.getActiveMipmapLevel(), ro = this._renderer.xr.enabled, this._renderer.xr.enabled = false;
      let i10 = t10 || this._allocateTargets();
      return this._textureToCubeUV(e10, i10), this._applyPMREM(i10), this._cleanup(i10), i10;
    }
    _allocateTargets() {
      let e10 = 3 * Math.max(this._cubeSize, 112), t10 = 4 * this._cubeSize, i10 = { magFilter: 1006, minFilter: 1006, generateMipmaps: false, type: 1016, format: 1023, colorSpace: l, depthBuffer: false }, n10 = rp(e10, t10, i10);
      if (null === this._pingPongRenderTarget || this._pingPongRenderTarget.width !== e10 || this._pingPongRenderTarget.height !== t10) {
        var r10;
        null !== this._pingPongRenderTarget && this._dispose(), this._pingPongRenderTarget = rp(e10, t10, i10);
        let { _lodMax: n11 } = this;
        ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = (function(e11) {
          let t11 = [], i11 = [], n12 = [], r11 = e11, a10 = e11 - 4 + 1 + rt.length;
          for (let s2 = 0; s2 < a10; s2++) {
            let a11 = Math.pow(2, r11);
            i11.push(a11);
            let o2 = 1 / a11;
            s2 > e11 - 4 ? o2 = rt[s2 - e11 + 4 - 1] : 0 === s2 && (o2 = 0), n12.push(o2);
            let l2 = 1 / (a11 - 2), h2 = -l2, c2 = 1 + l2, u2 = [h2, h2, c2, h2, c2, c2, h2, h2, c2, c2, h2, c2], d2 = new Float32Array(108), p2 = new Float32Array(72), f2 = new Float32Array(36);
            for (let e12 = 0; e12 < 6; e12++) {
              let t12 = e12 % 3 * 2 / 3 - 1, i12 = e12 > 2 ? 0 : -1, n13 = [t12, i12, 0, t12 + 2 / 3, i12, 0, t12 + 2 / 3, i12 + 1, 0, t12, i12, 0, t12 + 2 / 3, i12 + 1, 0, t12, i12 + 1, 0];
              d2.set(n13, 18 * e12), p2.set(u2, 12 * e12);
              let r12 = [e12, e12, e12, e12, e12, e12];
              f2.set(r12, 6 * e12);
            }
            let m2 = new tw();
            m2.setAttribute("position", new tg(d2, 3)), m2.setAttribute("uv", new tg(p2, 2)), m2.setAttribute("faceIndex", new tg(f2, 1)), t11.push(m2), r11 > 4 && r11--;
          }
          return { lodPlanes: t11, sizeLods: i11, sigmas: n12 };
        })(n11)), this._blurMaterial = (r10 = n11, new tj({ name: "SphericalGaussianBlur", defines: { n: 20, CUBEUV_TEXEL_WIDTH: 1 / e10, CUBEUV_TEXEL_HEIGHT: 1 / t10, CUBEUV_MAX_MIP: `${r10}.0` }, uniforms: { envMap: { value: null }, samples: { value: 1 }, weights: { value: new Float32Array(20) }, latitudinal: { value: false }, dTheta: { value: 0 }, mipInt: { value: 0 }, poleAxis: { value: new b(0, 1, 0) } }, vertexShader: r_(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`, blending: 0, depthTest: false, depthWrite: false }));
      }
      return n10;
    }
    _compileMaterial(e10) {
      let t10 = new tz(this._lodPlanes[0], e10);
      this._renderer.compile(t10, ri);
    }
    _sceneToCubeUV(e10, t10, i10, n10, r10) {
      let a10 = new tZ(90, 1, t10, i10), s2 = [1, -1, 1, 1, 1, 1], o2 = [1, 1, 1, -1, -1, -1], l2 = this._renderer, h2 = l2.autoClear, c2 = l2.toneMapping;
      l2.getClearColor(rn), l2.toneMapping = 0, l2.autoClear = false, l2.state.buffers.depth.getReversed() && (l2.setRenderTarget(n10), l2.clearDepth(), l2.setRenderTarget(null));
      let u2 = new td({ name: "PMREM.Background", side: 1, depthWrite: false, depthTest: false }), d2 = new tz(new tH(), u2), p2 = false, f2 = e10.background;
      f2 ? f2.isColor && (u2.color.copy(f2), e10.background = null, p2 = true) : (u2.color.copy(rn), p2 = true);
      for (let t11 = 0; t11 < 6; t11++) {
        let i11 = t11 % 3;
        0 === i11 ? (a10.up.set(0, s2[t11], 0), a10.position.set(r10.x, r10.y, r10.z), a10.lookAt(r10.x + o2[t11], r10.y, r10.z)) : 1 === i11 ? (a10.up.set(0, 0, s2[t11]), a10.position.set(r10.x, r10.y, r10.z), a10.lookAt(r10.x, r10.y + o2[t11], r10.z)) : (a10.up.set(0, s2[t11], 0), a10.position.set(r10.x, r10.y, r10.z), a10.lookAt(r10.x, r10.y, r10.z + o2[t11]));
        let h3 = this._cubeSize;
        rf(n10, i11 * h3, t11 > 2 ? h3 : 0, h3, h3), l2.setRenderTarget(n10), p2 && l2.render(d2, a10), l2.render(e10, a10);
      }
      d2.geometry.dispose(), d2.material.dispose(), l2.toneMapping = c2, l2.autoClear = h2, e10.background = f2;
    }
    _textureToCubeUV(e10, t10) {
      let i10 = this._renderer, n10 = 301 === e10.mapping || 302 === e10.mapping;
      n10 ? (null === this._cubemapMaterial && (this._cubemapMaterial = rg()), this._cubemapMaterial.uniforms.flipEnvMap.value = false === e10.isRenderTargetTexture ? -1 : 1) : null === this._equirectMaterial && (this._equirectMaterial = rm());
      let r10 = n10 ? this._cubemapMaterial : this._equirectMaterial, a10 = new tz(this._lodPlanes[0], r10);
      r10.uniforms.envMap.value = e10;
      let s2 = this._cubeSize;
      rf(t10, 0, 0, 3 * s2, 2 * s2), i10.setRenderTarget(t10), i10.render(a10, ri);
    }
    _applyPMREM(e10) {
      let t10 = this._renderer, i10 = t10.autoClear;
      t10.autoClear = false;
      let n10 = this._lodPlanes.length;
      for (let t11 = 1; t11 < n10; t11++) {
        let i11 = Math.sqrt(this._sigmas[t11] * this._sigmas[t11] - this._sigmas[t11 - 1] * this._sigmas[t11 - 1]), r10 = rc[(n10 - t11 - 1) % rc.length];
        this._blur(e10, t11 - 1, t11, i11, r10);
      }
      t10.autoClear = i10;
    }
    _blur(e10, t10, i10, n10, r10) {
      let a10 = this._pingPongRenderTarget;
      this._halfBlur(e10, a10, t10, i10, n10, "latitudinal", r10), this._halfBlur(a10, e10, i10, i10, n10, "longitudinal", r10);
    }
    _halfBlur(e10, t10, i10, n10, r10, a10, s2) {
      let o2 = this._renderer, l2 = this._blurMaterial;
      "latitudinal" !== a10 && "longitudinal" !== a10 && console.error("blur direction must be either latitudinal or longitudinal!");
      let h2 = new tz(this._lodPlanes[n10], l2), c2 = l2.uniforms, u2 = this._sizeLods[i10] - 1, d2 = isFinite(r10) ? Math.PI / (2 * u2) : 2 * Math.PI / 39, p2 = r10 / d2, f2 = isFinite(r10) ? 1 + Math.floor(3 * p2) : 20;
      f2 > 20 && console.warn(`sigmaRadians, ${r10}, is too large and will clip, as it requested ${f2} samples when the maximum is set to 20`);
      let m2 = [], g2 = 0;
      for (let e11 = 0; e11 < 20; ++e11) {
        let t11 = e11 / p2, i11 = Math.exp(-t11 * t11 / 2);
        m2.push(i11), 0 === e11 ? g2 += i11 : e11 < f2 && (g2 += 2 * i11);
      }
      for (let e11 = 0; e11 < m2.length; e11++) m2[e11] = m2[e11] / g2;
      c2.envMap.value = e10.texture, c2.samples.value = f2, c2.weights.value = m2, c2.latitudinal.value = "latitudinal" === a10, s2 && (c2.poleAxis.value = s2);
      let { _lodMax: _2 } = this;
      c2.dTheta.value = d2, c2.mipInt.value = _2 - i10;
      let v2 = this._sizeLods[n10], x2 = 4 * (this._cubeSize - v2);
      rf(t10, 3 * v2 * (n10 > _2 - 4 ? n10 - _2 + 4 : 0), x2, 3 * v2, 2 * v2), o2.setRenderTarget(t10), o2.render(h2, ri);
    }
  }
  function rp(e10, t10, i10) {
    let n10 = new J(e10, t10, i10);
    return n10.texture.mapping = 306, n10.texture.name = "PMREM.cubeUv", n10.scissorTest = true, n10;
  }
  function rf(e10, t10, i10, n10, r10) {
    e10.viewport.set(t10, i10, n10, r10), e10.scissor.set(t10, i10, n10, r10);
  }
  function rm() {
    return new tj({ name: "EquirectangularToCubeUV", uniforms: { envMap: { value: null } }, vertexShader: r_(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`, blending: 0, depthTest: false, depthWrite: false });
  }
  function rg() {
    return new tj({ name: "CubemapToCubeUV", uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } }, vertexShader: r_(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`, blending: 0, depthTest: false, depthWrite: false });
  }
  function r_() {
    return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
  }
  function rv(e10) {
    let t10 = /* @__PURE__ */ new WeakMap(), i10 = null;
    function n10(e11) {
      let i11 = e11.target;
      i11.removeEventListener("dispose", n10);
      let r10 = t10.get(i11);
      void 0 !== r10 && (t10.delete(i11), r10.dispose());
    }
    return { get: function(r10) {
      if (r10 && r10.isTexture) {
        let a10 = r10.mapping, s2 = 303 === a10 || 304 === a10, o2 = 301 === a10 || 302 === a10;
        if (s2 || o2) {
          let a11 = t10.get(r10), l2 = void 0 !== a11 ? a11.texture.pmremVersion : 0;
          if (r10.isRenderTargetTexture && r10.pmremVersion !== l2) return null === i10 && (i10 = new rd(e10)), (a11 = s2 ? i10.fromEquirectangular(r10, a11) : i10.fromCubemap(r10, a11)).texture.pmremVersion = r10.pmremVersion, t10.set(r10, a11), a11.texture;
          {
            if (void 0 !== a11) return a11.texture;
            let l3 = r10.image;
            return s2 && l3 && l3.height > 0 || o2 && l3 && (function(e11) {
              let t11 = 0;
              for (let i11 = 0; i11 < 6; i11++) void 0 !== e11[i11] && t11++;
              return 6 === t11;
            })(l3) ? (null === i10 && (i10 = new rd(e10)), (a11 = s2 ? i10.fromEquirectangular(r10) : i10.fromCubemap(r10)).texture.pmremVersion = r10.pmremVersion, t10.set(r10, a11), r10.addEventListener("dispose", n10), a11.texture) : null;
          }
        }
      }
      return r10;
    }, dispose: function() {
      t10 = /* @__PURE__ */ new WeakMap(), null !== i10 && (i10.dispose(), i10 = null);
    } };
  }
  function rx(e10) {
    let t10 = {};
    function i10(i11) {
      let n10;
      if (void 0 !== t10[i11]) return t10[i11];
      switch (i11) {
        case "WEBGL_depth_texture":
          n10 = e10.getExtension("WEBGL_depth_texture") || e10.getExtension("MOZ_WEBGL_depth_texture") || e10.getExtension("WEBKIT_WEBGL_depth_texture");
          break;
        case "EXT_texture_filter_anisotropic":
          n10 = e10.getExtension("EXT_texture_filter_anisotropic") || e10.getExtension("MOZ_EXT_texture_filter_anisotropic") || e10.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
          break;
        case "WEBGL_compressed_texture_s3tc":
          n10 = e10.getExtension("WEBGL_compressed_texture_s3tc") || e10.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e10.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
          break;
        case "WEBGL_compressed_texture_pvrtc":
          n10 = e10.getExtension("WEBGL_compressed_texture_pvrtc") || e10.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
          break;
        default:
          n10 = e10.getExtension(i11);
      }
      return t10[i11] = n10, n10;
    }
    return { has: function(e11) {
      return null !== i10(e11);
    }, init: function() {
      i10("EXT_color_buffer_float"), i10("WEBGL_clip_cull_distance"), i10("OES_texture_float_linear"), i10("EXT_color_buffer_half_float"), i10("WEBGL_multisampled_render_to_texture"), i10("WEBGL_render_shared_exponent");
    }, get: function(e11) {
      let t11 = i10(e11);
      return null === t11 && D("THREE.WebGLRenderer: " + e11 + " extension not supported."), t11;
    } };
  }
  function ry(e10, t10, i10, n10) {
    let r10 = {}, a10 = /* @__PURE__ */ new WeakMap();
    function s2(e11) {
      let o3 = e11.target;
      for (let e12 in null !== o3.index && t10.remove(o3.index), o3.attributes) t10.remove(o3.attributes[e12]);
      o3.removeEventListener("dispose", s2), delete r10[o3.id];
      let l2 = a10.get(o3);
      l2 && (t10.remove(l2), a10.delete(o3)), n10.releaseStatesOfGeometry(o3), true === o3.isInstancedBufferGeometry && delete o3._maxInstanceCount, i10.memory.geometries--;
    }
    function o2(e11) {
      let i11 = [], n11 = e11.index, r11 = e11.attributes.position, s3 = 0;
      if (null !== n11) {
        let e12 = n11.array;
        s3 = n11.version;
        for (let t11 = 0, n12 = e12.length; t11 < n12; t11 += 3) {
          let n13 = e12[t11 + 0], r12 = e12[t11 + 1], a11 = e12[t11 + 2];
          i11.push(n13, r12, r12, a11, a11, n13);
        }
      } else {
        if (void 0 === r11) return;
        let e12 = r11.array;
        s3 = r11.version;
        for (let t11 = 0, n12 = e12.length / 3 - 1; t11 < n12; t11 += 3) {
          let e13 = t11 + 0, n13 = t11 + 1, r12 = t11 + 2;
          i11.push(e13, n13, n13, r12, r12, e13);
        }
      }
      let o3 = new (P(i11) ? tv : t_)(i11, 1);
      o3.version = s3;
      let l2 = a10.get(e11);
      l2 && t10.remove(l2), a10.set(e11, o3);
    }
    return { get: function(e11, t11) {
      return true === r10[t11.id] || (t11.addEventListener("dispose", s2), r10[t11.id] = true, i10.memory.geometries++), t11;
    }, update: function(i11) {
      let n11 = i11.attributes;
      for (let i12 in n11) t10.update(n11[i12], e10.ARRAY_BUFFER);
    }, getWireframeAttribute: function(e11) {
      let t11 = a10.get(e11);
      if (t11) {
        let i11 = e11.index;
        null !== i11 && t11.version < i11.version && o2(e11);
      } else o2(e11);
      return a10.get(e11);
    } };
  }
  function rM(e10, t10, i10) {
    let n10, r10, a10;
    function s2(t11, s3, o2) {
      0 !== o2 && (e10.drawElementsInstanced(n10, s3, r10, t11 * a10, o2), i10.update(s3, n10, o2));
    }
    this.setMode = function(e11) {
      n10 = e11;
    }, this.setIndex = function(e11) {
      r10 = e11.type, a10 = e11.bytesPerElement;
    }, this.render = function(t11, s3) {
      e10.drawElements(n10, s3, r10, t11 * a10), i10.update(s3, n10, 1);
    }, this.renderInstances = s2, this.renderMultiDraw = function(e11, a11, s3) {
      if (0 === s3) return;
      t10.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n10, a11, 0, r10, e11, 0, s3);
      let o2 = 0;
      for (let e12 = 0; e12 < s3; e12++) o2 += a11[e12];
      i10.update(o2, n10, 1);
    }, this.renderMultiDrawInstances = function(e11, o2, l2, h2) {
      if (0 === l2) return;
      let c2 = t10.get("WEBGL_multi_draw");
      if (null === c2) for (let t11 = 0; t11 < e11.length; t11++) s2(e11[t11] / a10, o2[t11], h2[t11]);
      else {
        c2.multiDrawElementsInstancedWEBGL(n10, o2, 0, r10, e11, 0, h2, 0, l2);
        let t11 = 0;
        for (let e12 = 0; e12 < l2; e12++) t11 += o2[e12] * h2[e12];
        i10.update(t11, n10, 1);
      }
    };
  }
  function rS(e10) {
    let t10 = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
    return { memory: { geometries: 0, textures: 0 }, render: t10, programs: null, autoReset: true, reset: function() {
      t10.calls = 0, t10.triangles = 0, t10.points = 0, t10.lines = 0;
    }, update: function(i10, n10, r10) {
      switch (t10.calls++, n10) {
        case e10.TRIANGLES:
          t10.triangles += i10 / 3 * r10;
          break;
        case e10.LINES:
          t10.lines += i10 / 2 * r10;
          break;
        case e10.LINE_STRIP:
          t10.lines += r10 * (i10 - 1);
          break;
        case e10.LINE_LOOP:
          t10.lines += r10 * i10;
          break;
        case e10.POINTS:
          t10.points += r10 * i10;
          break;
        default:
          console.error("THREE.WebGLInfo: Unknown draw mode:", n10);
      }
    } };
  }
  function rE(e10, t10, i10) {
    let n10 = /* @__PURE__ */ new WeakMap(), r10 = new Y();
    return { update: function(a10, s2, o2) {
      let l2 = a10.morphTargetInfluences, h2 = s2.morphAttributes.position || s2.morphAttributes.normal || s2.morphAttributes.color, c2 = void 0 !== h2 ? h2.length : 0, u2 = n10.get(s2);
      if (void 0 === u2 || u2.count !== c2) {
        void 0 !== u2 && u2.texture.dispose();
        let e11 = void 0 !== s2.morphAttributes.position, i11 = void 0 !== s2.morphAttributes.normal, a11 = void 0 !== s2.morphAttributes.color, o3 = s2.morphAttributes.position || [], l3 = s2.morphAttributes.normal || [], h3 = s2.morphAttributes.color || [], d2 = 0;
        true === e11 && (d2 = 1), true === i11 && (d2 = 2), true === a11 && (d2 = 3);
        let p2 = s2.attributes.position.count * d2, f2 = 1;
        p2 > t10.maxTextureSize && (f2 = Math.ceil(p2 / t10.maxTextureSize), p2 = t10.maxTextureSize);
        let m2 = new Float32Array(p2 * f2 * 4 * c2), g2 = new Z(m2, p2, f2, c2);
        g2.type = 1015, g2.needsUpdate = true;
        let _2 = 4 * d2;
        for (let t11 = 0; t11 < c2; t11++) {
          let n11 = o3[t11], s3 = l3[t11], c3 = h3[t11], u3 = p2 * f2 * 4 * t11;
          for (let t12 = 0; t12 < n11.count; t12++) {
            let o4 = t12 * _2;
            true === e11 && (r10.fromBufferAttribute(n11, t12), m2[u3 + o4 + 0] = r10.x, m2[u3 + o4 + 1] = r10.y, m2[u3 + o4 + 2] = r10.z, m2[u3 + o4 + 3] = 0), true === i11 && (r10.fromBufferAttribute(s3, t12), m2[u3 + o4 + 4] = r10.x, m2[u3 + o4 + 5] = r10.y, m2[u3 + o4 + 6] = r10.z, m2[u3 + o4 + 7] = 0), true === a11 && (r10.fromBufferAttribute(c3, t12), m2[u3 + o4 + 8] = r10.x, m2[u3 + o4 + 9] = r10.y, m2[u3 + o4 + 10] = r10.z, m2[u3 + o4 + 11] = 4 === c3.itemSize ? r10.w : 1);
          }
        }
        u2 = { count: c2, texture: g2, size: new E(p2, f2) }, n10.set(s2, u2), s2.addEventListener("dispose", function e12() {
          g2.dispose(), n10.delete(s2), s2.removeEventListener("dispose", e12);
        });
      }
      if (true === a10.isInstancedMesh && null !== a10.morphTexture) o2.getUniforms().setValue(e10, "morphTexture", a10.morphTexture, i10);
      else {
        let t11 = 0;
        for (let e11 = 0; e11 < l2.length; e11++) t11 += l2[e11];
        let i11 = s2.morphTargetsRelative ? 1 : 1 - t11;
        o2.getUniforms().setValue(e10, "morphTargetBaseInfluence", i11), o2.getUniforms().setValue(e10, "morphTargetInfluences", l2);
      }
      o2.getUniforms().setValue(e10, "morphTargetsTexture", u2.texture, i10), o2.getUniforms().setValue(e10, "morphTargetsTextureSize", u2.size);
    } };
  }
  function rT(e10, t10, i10, n10) {
    let r10 = /* @__PURE__ */ new WeakMap();
    function a10(e11) {
      let t11 = e11.target;
      t11.removeEventListener("dispose", a10), i10.remove(t11.instanceMatrix), null !== t11.instanceColor && i10.remove(t11.instanceColor);
    }
    return { update: function(s2) {
      let o2 = n10.render.frame, l2 = s2.geometry, h2 = t10.get(s2, l2);
      if (r10.get(h2) !== o2 && (t10.update(h2), r10.set(h2, o2)), s2.isInstancedMesh && (false === s2.hasEventListener("dispose", a10) && s2.addEventListener("dispose", a10), r10.get(s2) !== o2 && (i10.update(s2.instanceMatrix, e10.ARRAY_BUFFER), null !== s2.instanceColor && i10.update(s2.instanceColor, e10.ARRAY_BUFFER), r10.set(s2, o2))), s2.isSkinnedMesh) {
        let e11 = s2.skeleton;
        r10.get(e11) !== o2 && (e11.update(), r10.set(e11, o2));
      }
      return h2;
    }, dispose: function() {
      r10 = /* @__PURE__ */ new WeakMap();
    } };
  }
  let rb = new q(), rA = new iW(1, 1), rw = new Z(), rR = new $(), rC = new tQ(), rP = [], rI = [], rL = new Float32Array(16), rU = new Float32Array(9), rD = new Float32Array(4);
  function rN(e10, t10, i10) {
    let n10 = e10[0];
    if (n10 <= 0 || n10 > 0) return e10;
    let r10 = t10 * i10, a10 = rP[r10];
    if (void 0 === a10 && (a10 = new Float32Array(r10), rP[r10] = a10), 0 !== t10) {
      n10.toArray(a10, 0);
      for (let n11 = 1, r11 = 0; n11 !== t10; ++n11) r11 += i10, e10[n11].toArray(a10, r11);
    }
    return a10;
  }
  function rO(e10, t10) {
    if (e10.length !== t10.length) return false;
    for (let i10 = 0, n10 = e10.length; i10 < n10; i10++) if (e10[i10] !== t10[i10]) return false;
    return true;
  }
  function rF(e10, t10) {
    for (let i10 = 0, n10 = t10.length; i10 < n10; i10++) e10[i10] = t10[i10];
  }
  function rB(e10, t10) {
    let i10 = rI[t10];
    void 0 === i10 && (i10 = new Int32Array(t10), rI[t10] = i10);
    for (let n10 = 0; n10 !== t10; ++n10) i10[n10] = e10.allocateTextureUnit();
    return i10;
  }
  function rz(e10, t10) {
    let i10 = this.cache;
    i10[0] !== t10 && (e10.uniform1f(this.addr, t10), i10[0] = t10);
  }
  function rV(e10, t10) {
    let i10 = this.cache;
    if (void 0 !== t10.x) (i10[0] !== t10.x || i10[1] !== t10.y) && (e10.uniform2f(this.addr, t10.x, t10.y), i10[0] = t10.x, i10[1] = t10.y);
    else {
      if (rO(i10, t10)) return;
      e10.uniform2fv(this.addr, t10), rF(i10, t10);
    }
  }
  function rH(e10, t10) {
    let i10 = this.cache;
    if (void 0 !== t10.x) (i10[0] !== t10.x || i10[1] !== t10.y || i10[2] !== t10.z) && (e10.uniform3f(this.addr, t10.x, t10.y, t10.z), i10[0] = t10.x, i10[1] = t10.y, i10[2] = t10.z);
    else if (void 0 !== t10.r) (i10[0] !== t10.r || i10[1] !== t10.g || i10[2] !== t10.b) && (e10.uniform3f(this.addr, t10.r, t10.g, t10.b), i10[0] = t10.r, i10[1] = t10.g, i10[2] = t10.b);
    else {
      if (rO(i10, t10)) return;
      e10.uniform3fv(this.addr, t10), rF(i10, t10);
    }
  }
  function rk(e10, t10) {
    let i10 = this.cache;
    if (void 0 !== t10.x) (i10[0] !== t10.x || i10[1] !== t10.y || i10[2] !== t10.z || i10[3] !== t10.w) && (e10.uniform4f(this.addr, t10.x, t10.y, t10.z, t10.w), i10[0] = t10.x, i10[1] = t10.y, i10[2] = t10.z, i10[3] = t10.w);
    else {
      if (rO(i10, t10)) return;
      e10.uniform4fv(this.addr, t10), rF(i10, t10);
    }
  }
  function rG(e10, t10) {
    let i10 = this.cache, n10 = t10.elements;
    if (void 0 === n10) {
      if (rO(i10, t10)) return;
      e10.uniformMatrix2fv(this.addr, false, t10), rF(i10, t10);
    } else {
      if (rO(i10, n10)) return;
      rD.set(n10), e10.uniformMatrix2fv(this.addr, false, rD), rF(i10, n10);
    }
  }
  function rW(e10, t10) {
    let i10 = this.cache, n10 = t10.elements;
    if (void 0 === n10) {
      if (rO(i10, t10)) return;
      e10.uniformMatrix3fv(this.addr, false, t10), rF(i10, t10);
    } else {
      if (rO(i10, n10)) return;
      rU.set(n10), e10.uniformMatrix3fv(this.addr, false, rU), rF(i10, n10);
    }
  }
  function rX(e10, t10) {
    let i10 = this.cache, n10 = t10.elements;
    if (void 0 === n10) {
      if (rO(i10, t10)) return;
      e10.uniformMatrix4fv(this.addr, false, t10), rF(i10, t10);
    } else {
      if (rO(i10, n10)) return;
      rL.set(n10), e10.uniformMatrix4fv(this.addr, false, rL), rF(i10, n10);
    }
  }
  function rj(e10, t10) {
    let i10 = this.cache;
    i10[0] !== t10 && (e10.uniform1i(this.addr, t10), i10[0] = t10);
  }
  function rq(e10, t10) {
    let i10 = this.cache;
    if (void 0 !== t10.x) (i10[0] !== t10.x || i10[1] !== t10.y) && (e10.uniform2i(this.addr, t10.x, t10.y), i10[0] = t10.x, i10[1] = t10.y);
    else {
      if (rO(i10, t10)) return;
      e10.uniform2iv(this.addr, t10), rF(i10, t10);
    }
  }
  function rY(e10, t10) {
    let i10 = this.cache;
    if (void 0 !== t10.x) (i10[0] !== t10.x || i10[1] !== t10.y || i10[2] !== t10.z) && (e10.uniform3i(this.addr, t10.x, t10.y, t10.z), i10[0] = t10.x, i10[1] = t10.y, i10[2] = t10.z);
    else {
      if (rO(i10, t10)) return;
      e10.uniform3iv(this.addr, t10), rF(i10, t10);
    }
  }
  function rK(e10, t10) {
    let i10 = this.cache;
    if (void 0 !== t10.x) (i10[0] !== t10.x || i10[1] !== t10.y || i10[2] !== t10.z || i10[3] !== t10.w) && (e10.uniform4i(this.addr, t10.x, t10.y, t10.z, t10.w), i10[0] = t10.x, i10[1] = t10.y, i10[2] = t10.z, i10[3] = t10.w);
    else {
      if (rO(i10, t10)) return;
      e10.uniform4iv(this.addr, t10), rF(i10, t10);
    }
  }
  function rJ(e10, t10) {
    let i10 = this.cache;
    i10[0] !== t10 && (e10.uniform1ui(this.addr, t10), i10[0] = t10);
  }
  function rZ(e10, t10) {
    let i10 = this.cache;
    if (void 0 !== t10.x) (i10[0] !== t10.x || i10[1] !== t10.y) && (e10.uniform2ui(this.addr, t10.x, t10.y), i10[0] = t10.x, i10[1] = t10.y);
    else {
      if (rO(i10, t10)) return;
      e10.uniform2uiv(this.addr, t10), rF(i10, t10);
    }
  }
  function r$(e10, t10) {
    let i10 = this.cache;
    if (void 0 !== t10.x) (i10[0] !== t10.x || i10[1] !== t10.y || i10[2] !== t10.z) && (e10.uniform3ui(this.addr, t10.x, t10.y, t10.z), i10[0] = t10.x, i10[1] = t10.y, i10[2] = t10.z);
    else {
      if (rO(i10, t10)) return;
      e10.uniform3uiv(this.addr, t10), rF(i10, t10);
    }
  }
  function rQ(e10, t10) {
    let i10 = this.cache;
    if (void 0 !== t10.x) (i10[0] !== t10.x || i10[1] !== t10.y || i10[2] !== t10.z || i10[3] !== t10.w) && (e10.uniform4ui(this.addr, t10.x, t10.y, t10.z, t10.w), i10[0] = t10.x, i10[1] = t10.y, i10[2] = t10.z, i10[3] = t10.w);
    else {
      if (rO(i10, t10)) return;
      e10.uniform4uiv(this.addr, t10), rF(i10, t10);
    }
  }
  function r0(e10, t10, i10) {
    let n10, r10 = this.cache, a10 = i10.allocateTextureUnit();
    r10[0] !== a10 && (e10.uniform1i(this.addr, a10), r10[0] = a10), this.type === e10.SAMPLER_2D_SHADOW ? (rA.compareFunction = 515, n10 = rA) : n10 = rb, i10.setTexture2D(t10 || n10, a10);
  }
  function r1(e10, t10, i10) {
    let n10 = this.cache, r10 = i10.allocateTextureUnit();
    n10[0] !== r10 && (e10.uniform1i(this.addr, r10), n10[0] = r10), i10.setTexture3D(t10 || rR, r10);
  }
  function r2(e10, t10, i10) {
    let n10 = this.cache, r10 = i10.allocateTextureUnit();
    n10[0] !== r10 && (e10.uniform1i(this.addr, r10), n10[0] = r10), i10.setTextureCube(t10 || rC, r10);
  }
  function r3(e10, t10, i10) {
    let n10 = this.cache, r10 = i10.allocateTextureUnit();
    n10[0] !== r10 && (e10.uniform1i(this.addr, r10), n10[0] = r10), i10.setTexture2DArray(t10 || rw, r10);
  }
  function r4(e10, t10) {
    e10.uniform1fv(this.addr, t10);
  }
  function r5(e10, t10) {
    let i10 = rN(t10, this.size, 2);
    e10.uniform2fv(this.addr, i10);
  }
  function r6(e10, t10) {
    let i10 = rN(t10, this.size, 3);
    e10.uniform3fv(this.addr, i10);
  }
  function r8(e10, t10) {
    let i10 = rN(t10, this.size, 4);
    e10.uniform4fv(this.addr, i10);
  }
  function r9(e10, t10) {
    let i10 = rN(t10, this.size, 4);
    e10.uniformMatrix2fv(this.addr, false, i10);
  }
  function r7(e10, t10) {
    let i10 = rN(t10, this.size, 9);
    e10.uniformMatrix3fv(this.addr, false, i10);
  }
  function ae(e10, t10) {
    let i10 = rN(t10, this.size, 16);
    e10.uniformMatrix4fv(this.addr, false, i10);
  }
  function at(e10, t10) {
    e10.uniform1iv(this.addr, t10);
  }
  function ai(e10, t10) {
    e10.uniform2iv(this.addr, t10);
  }
  function an(e10, t10) {
    e10.uniform3iv(this.addr, t10);
  }
  function ar(e10, t10) {
    e10.uniform4iv(this.addr, t10);
  }
  function aa(e10, t10) {
    e10.uniform1uiv(this.addr, t10);
  }
  function as(e10, t10) {
    e10.uniform2uiv(this.addr, t10);
  }
  function ao(e10, t10) {
    e10.uniform3uiv(this.addr, t10);
  }
  function al(e10, t10) {
    e10.uniform4uiv(this.addr, t10);
  }
  function ah(e10, t10, i10) {
    let n10 = this.cache, r10 = t10.length, a10 = rB(i10, r10);
    rO(n10, a10) || (e10.uniform1iv(this.addr, a10), rF(n10, a10));
    for (let e11 = 0; e11 !== r10; ++e11) i10.setTexture2D(t10[e11] || rb, a10[e11]);
  }
  function ac(e10, t10, i10) {
    let n10 = this.cache, r10 = t10.length, a10 = rB(i10, r10);
    rO(n10, a10) || (e10.uniform1iv(this.addr, a10), rF(n10, a10));
    for (let e11 = 0; e11 !== r10; ++e11) i10.setTexture3D(t10[e11] || rR, a10[e11]);
  }
  function au(e10, t10, i10) {
    let n10 = this.cache, r10 = t10.length, a10 = rB(i10, r10);
    rO(n10, a10) || (e10.uniform1iv(this.addr, a10), rF(n10, a10));
    for (let e11 = 0; e11 !== r10; ++e11) i10.setTextureCube(t10[e11] || rC, a10[e11]);
  }
  function ad(e10, t10, i10) {
    let n10 = this.cache, r10 = t10.length, a10 = rB(i10, r10);
    rO(n10, a10) || (e10.uniform1iv(this.addr, a10), rF(n10, a10));
    for (let e11 = 0; e11 !== r10; ++e11) i10.setTexture2DArray(t10[e11] || rw, a10[e11]);
  }
  class ap {
    constructor(e10, t10, i10) {
      this.id = e10, this.addr = i10, this.cache = [], this.type = t10.type, this.setValue = (function(e11) {
        switch (e11) {
          case 5126:
            return rz;
          case 35664:
            return rV;
          case 35665:
            return rH;
          case 35666:
            return rk;
          case 35674:
            return rG;
          case 35675:
            return rW;
          case 35676:
            return rX;
          case 5124:
          case 35670:
            return rj;
          case 35667:
          case 35671:
            return rq;
          case 35668:
          case 35672:
            return rY;
          case 35669:
          case 35673:
            return rK;
          case 5125:
            return rJ;
          case 36294:
            return rZ;
          case 36295:
            return r$;
          case 36296:
            return rQ;
          case 35678:
          case 36198:
          case 36298:
          case 36306:
          case 35682:
            return r0;
          case 35679:
          case 36299:
          case 36307:
            return r1;
          case 35680:
          case 36300:
          case 36308:
          case 36293:
            return r2;
          case 36289:
          case 36303:
          case 36311:
          case 36292:
            return r3;
        }
      })(t10.type);
    }
  }
  class af {
    constructor(e10, t10, i10) {
      this.id = e10, this.addr = i10, this.cache = [], this.type = t10.type, this.size = t10.size, this.setValue = (function(e11) {
        switch (e11) {
          case 5126:
            return r4;
          case 35664:
            return r5;
          case 35665:
            return r6;
          case 35666:
            return r8;
          case 35674:
            return r9;
          case 35675:
            return r7;
          case 35676:
            return ae;
          case 5124:
          case 35670:
            return at;
          case 35667:
          case 35671:
            return ai;
          case 35668:
          case 35672:
            return an;
          case 35669:
          case 35673:
            return ar;
          case 5125:
            return aa;
          case 36294:
            return as;
          case 36295:
            return ao;
          case 36296:
            return al;
          case 35678:
          case 36198:
          case 36298:
          case 36306:
          case 35682:
            return ah;
          case 35679:
          case 36299:
          case 36307:
            return ac;
          case 35680:
          case 36300:
          case 36308:
          case 36293:
            return au;
          case 36289:
          case 36303:
          case 36311:
          case 36292:
            return ad;
        }
      })(t10.type);
    }
  }
  class am {
    constructor(e10) {
      this.id = e10, this.seq = [], this.map = {};
    }
    setValue(e10, t10, i10) {
      let n10 = this.seq;
      for (let r10 = 0, a10 = n10.length; r10 !== a10; ++r10) {
        let a11 = n10[r10];
        a11.setValue(e10, t10[a11.id], i10);
      }
    }
  }
  let ag = /(\w+)(\])?(\[|\.)?/g;
  function a_(e10, t10) {
    e10.seq.push(t10), e10.map[t10.id] = t10;
  }
  class av {
    constructor(e10, t10) {
      this.seq = [], this.map = {};
      const i10 = e10.getProgramParameter(t10, e10.ACTIVE_UNIFORMS);
      for (let n10 = 0; n10 < i10; ++n10) {
        const i11 = e10.getActiveUniform(t10, n10), r10 = e10.getUniformLocation(t10, i11.name);
        !(function(e11, t11, i12) {
          let n11 = e11.name, r11 = n11.length;
          for (ag.lastIndex = 0; ; ) {
            let a10 = ag.exec(n11), s2 = ag.lastIndex, o2 = a10[1], l2 = "]" === a10[2], h2 = a10[3];
            if (l2 && (o2 |= 0), void 0 === h2 || "[" === h2 && s2 + 2 === r11) {
              a_(i12, void 0 === h2 ? new ap(o2, e11, t11) : new af(o2, e11, t11));
              break;
            }
            {
              let e12 = i12.map[o2];
              void 0 === e12 && a_(i12, e12 = new am(o2)), i12 = e12;
            }
          }
        })(i11, r10, this);
      }
    }
    setValue(e10, t10, i10, n10) {
      let r10 = this.map[t10];
      void 0 !== r10 && r10.setValue(e10, i10, n10);
    }
    setOptional(e10, t10, i10) {
      let n10 = t10[i10];
      void 0 !== n10 && this.setValue(e10, i10, n10);
    }
    static upload(e10, t10, i10, n10) {
      for (let r10 = 0, a10 = t10.length; r10 !== a10; ++r10) {
        let a11 = t10[r10], s2 = i10[a11.id];
        false !== s2.needsUpdate && a11.setValue(e10, s2.value, n10);
      }
    }
    static seqWithValue(e10, t10) {
      let i10 = [];
      for (let n10 = 0, r10 = e10.length; n10 !== r10; ++n10) {
        let r11 = e10[n10];
        r11.id in t10 && i10.push(r11);
      }
      return i10;
    }
  }
  function ax(e10, t10, i10) {
    let n10 = e10.createShader(t10);
    return e10.shaderSource(n10, i10), e10.compileShader(n10), n10;
  }
  let ay = 0, aM = new R();
  function aS(e10, t10, i10) {
    let n10 = e10.getShaderParameter(t10, e10.COMPILE_STATUS), r10 = (e10.getShaderInfoLog(t10) || "").trim();
    if (n10 && "" === r10) return "";
    let a10 = /ERROR: 0:(\d+)/.exec(r10);
    if (!a10) return r10;
    {
      let n11 = parseInt(a10[1]);
      return i10.toUpperCase() + "\n\n" + r10 + "\n\n" + (function(e11, t11) {
        let i11 = e11.split("\n"), n12 = [], r11 = Math.max(t11 - 6, 0), a11 = Math.min(t11 + 6, i11.length);
        for (let e12 = r11; e12 < a11; e12++) {
          let r12 = e12 + 1;
          n12.push(`${r12 === t11 ? ">" : " "} ${r12}: ${i11[e12]}`);
        }
        return n12.join("\n");
      })(e10.getShaderSource(t10), n11);
    }
  }
  let aE = new b();
  function aT(e10) {
    return "" !== e10;
  }
  function ab(e10, t10) {
    let i10 = t10.numSpotLightShadows + t10.numSpotLightMaps - t10.numSpotLightShadowsWithMaps;
    return e10.replace(/NUM_DIR_LIGHTS/g, t10.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t10.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t10.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, i10).replace(/NUM_RECT_AREA_LIGHTS/g, t10.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t10.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t10.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t10.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t10.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t10.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t10.numPointLightShadows);
  }
  function aA(e10, t10) {
    return e10.replace(/NUM_CLIPPING_PLANES/g, t10.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t10.numClippingPlanes - t10.numClipIntersection);
  }
  let aw = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function aR(e10) {
    return e10.replace(aw, aP);
  }
  let aC = /* @__PURE__ */ new Map();
  function aP(e10, t10) {
    let i10 = nQ[t10];
    if (void 0 === i10) {
      let e11 = aC.get(t10);
      if (void 0 !== e11) i10 = nQ[e11], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t10, e11);
      else throw Error("Can not resolve #include <" + t10 + ">");
    }
    return aR(i10);
  }
  let aI = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
  function aL(e10) {
    return e10.replace(aI, aU);
  }
  function aU(e10, t10, i10, n10) {
    let r10 = "";
    for (let e11 = parseInt(t10); e11 < parseInt(i10); e11++) r10 += n10.replace(/\[\s*i\s*\]/g, "[ " + e11 + " ]").replace(/UNROLLED_LOOP_INDEX/g, e11);
    return r10;
  }
  function aD(e10) {
    let t10 = `precision ${e10.precision} float;
	precision ${e10.precision} int;
	precision ${e10.precision} sampler2D;
	precision ${e10.precision} samplerCube;
	precision ${e10.precision} sampler3D;
	precision ${e10.precision} sampler2DArray;
	precision ${e10.precision} sampler2DShadow;
	precision ${e10.precision} samplerCubeShadow;
	precision ${e10.precision} sampler2DArrayShadow;
	precision ${e10.precision} isampler2D;
	precision ${e10.precision} isampler3D;
	precision ${e10.precision} isamplerCube;
	precision ${e10.precision} isampler2DArray;
	precision ${e10.precision} usampler2D;
	precision ${e10.precision} usampler3D;
	precision ${e10.precision} usamplerCube;
	precision ${e10.precision} usampler2DArray;
	`;
    return "highp" === e10.precision ? t10 += "\n#define HIGH_PRECISION" : "mediump" === e10.precision ? t10 += "\n#define MEDIUM_PRECISION" : "lowp" === e10.precision && (t10 += "\n#define LOW_PRECISION"), t10;
  }
  function aN(e10, t10, i10, n10) {
    let r10, a10, s2, o2, l2, d2, p2 = e10.getContext(), f2 = i10.defines, m2 = i10.vertexShader, g2 = i10.fragmentShader, _2 = (l2 = "SHADOWMAP_TYPE_BASIC", 1 === i10.shadowMapType ? l2 = "SHADOWMAP_TYPE_PCF" : 2 === i10.shadowMapType ? l2 = "SHADOWMAP_TYPE_PCF_SOFT" : 3 === i10.shadowMapType && (l2 = "SHADOWMAP_TYPE_VSM"), l2), v2 = (function(e11) {
      let t11 = "ENVMAP_TYPE_CUBE";
      if (e11.envMap) switch (e11.envMapMode) {
        case 301:
        case 302:
          t11 = "ENVMAP_TYPE_CUBE";
          break;
        case 306:
          t11 = "ENVMAP_TYPE_CUBE_UV";
      }
      return t11;
    })(i10), x2 = (d2 = "ENVMAP_MODE_REFLECTION", i10.envMap && 302 === i10.envMapMode && (d2 = "ENVMAP_MODE_REFRACTION"), d2), y2 = (function(e11) {
      let t11 = "ENVMAP_BLENDING_NONE";
      if (e11.envMap) switch (e11.combine) {
        case 0:
          t11 = "ENVMAP_BLENDING_MULTIPLY";
          break;
        case 1:
          t11 = "ENVMAP_BLENDING_MIX";
          break;
        case 2:
          t11 = "ENVMAP_BLENDING_ADD";
      }
      return t11;
    })(i10), M2 = (function(e11) {
      let t11 = e11.envMapCubeUVHeight;
      if (null === t11) return null;
      let i11 = Math.log2(t11) - 2;
      return { texelWidth: 1 / (3 * Math.max(Math.pow(2, i11), 112)), texelHeight: 1 / t11, maxMip: i11 };
    })(i10), S2 = [i10.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", i10.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(aT).join("\n"), E2 = (function(e11) {
      let t11 = [];
      for (let i11 in e11) {
        let n11 = e11[i11];
        false !== n11 && t11.push("#define " + i11 + " " + n11);
      }
      return t11.join("\n");
    })(f2), T2 = p2.createProgram(), b2 = i10.glslVersion ? "#version " + i10.glslVersion + "\n" : "";
    if (i10.isRawShaderMaterial) (r10 = ["#define SHADER_TYPE " + i10.shaderType, "#define SHADER_NAME " + i10.shaderName, E2].filter(aT).join("\n")).length > 0 && (r10 += "\n"), (a10 = ["#define SHADER_TYPE " + i10.shaderType, "#define SHADER_NAME " + i10.shaderName, E2].filter(aT).join("\n")).length > 0 && (a10 += "\n");
    else {
      let e11, t11, n11, s3;
      r10 = [aD(i10), "#define SHADER_TYPE " + i10.shaderType, "#define SHADER_NAME " + i10.shaderName, E2, i10.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "", i10.batching ? "#define USE_BATCHING" : "", i10.batchingColor ? "#define USE_BATCHING_COLOR" : "", i10.instancing ? "#define USE_INSTANCING" : "", i10.instancingColor ? "#define USE_INSTANCING_COLOR" : "", i10.instancingMorph ? "#define USE_INSTANCING_MORPH" : "", i10.useFog && i10.fog ? "#define USE_FOG" : "", i10.useFog && i10.fogExp2 ? "#define FOG_EXP2" : "", i10.map ? "#define USE_MAP" : "", i10.envMap ? "#define USE_ENVMAP" : "", i10.envMap ? "#define " + x2 : "", i10.lightMap ? "#define USE_LIGHTMAP" : "", i10.aoMap ? "#define USE_AOMAP" : "", i10.bumpMap ? "#define USE_BUMPMAP" : "", i10.normalMap ? "#define USE_NORMALMAP" : "", i10.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", i10.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", i10.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", i10.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i10.anisotropy ? "#define USE_ANISOTROPY" : "", i10.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", i10.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", i10.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", i10.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", i10.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", i10.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", i10.specularMap ? "#define USE_SPECULARMAP" : "", i10.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", i10.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", i10.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i10.metalnessMap ? "#define USE_METALNESSMAP" : "", i10.alphaMap ? "#define USE_ALPHAMAP" : "", i10.alphaHash ? "#define USE_ALPHAHASH" : "", i10.transmission ? "#define USE_TRANSMISSION" : "", i10.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", i10.thicknessMap ? "#define USE_THICKNESSMAP" : "", i10.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", i10.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", i10.mapUv ? "#define MAP_UV " + i10.mapUv : "", i10.alphaMapUv ? "#define ALPHAMAP_UV " + i10.alphaMapUv : "", i10.lightMapUv ? "#define LIGHTMAP_UV " + i10.lightMapUv : "", i10.aoMapUv ? "#define AOMAP_UV " + i10.aoMapUv : "", i10.emissiveMapUv ? "#define EMISSIVEMAP_UV " + i10.emissiveMapUv : "", i10.bumpMapUv ? "#define BUMPMAP_UV " + i10.bumpMapUv : "", i10.normalMapUv ? "#define NORMALMAP_UV " + i10.normalMapUv : "", i10.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + i10.displacementMapUv : "", i10.metalnessMapUv ? "#define METALNESSMAP_UV " + i10.metalnessMapUv : "", i10.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + i10.roughnessMapUv : "", i10.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + i10.anisotropyMapUv : "", i10.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + i10.clearcoatMapUv : "", i10.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + i10.clearcoatNormalMapUv : "", i10.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + i10.clearcoatRoughnessMapUv : "", i10.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + i10.iridescenceMapUv : "", i10.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + i10.iridescenceThicknessMapUv : "", i10.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + i10.sheenColorMapUv : "", i10.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + i10.sheenRoughnessMapUv : "", i10.specularMapUv ? "#define SPECULARMAP_UV " + i10.specularMapUv : "", i10.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + i10.specularColorMapUv : "", i10.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + i10.specularIntensityMapUv : "", i10.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + i10.transmissionMapUv : "", i10.thicknessMapUv ? "#define THICKNESSMAP_UV " + i10.thicknessMapUv : "", i10.vertexTangents && false === i10.flatShading ? "#define USE_TANGENT" : "", i10.vertexColors ? "#define USE_COLOR" : "", i10.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", i10.vertexUv1s ? "#define USE_UV1" : "", i10.vertexUv2s ? "#define USE_UV2" : "", i10.vertexUv3s ? "#define USE_UV3" : "", i10.pointsUvs ? "#define USE_POINTS_UV" : "", i10.flatShading ? "#define FLAT_SHADED" : "", i10.skinning ? "#define USE_SKINNING" : "", i10.morphTargets ? "#define USE_MORPHTARGETS" : "", i10.morphNormals && false === i10.flatShading ? "#define USE_MORPHNORMALS" : "", i10.morphColors ? "#define USE_MORPHCOLORS" : "", i10.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + i10.morphTextureStride : "", i10.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + i10.morphTargetsCount : "", i10.doubleSided ? "#define DOUBLE_SIDED" : "", i10.flipSided ? "#define FLIP_SIDED" : "", i10.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i10.shadowMapEnabled ? "#define " + _2 : "", i10.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", i10.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", i10.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "", i10.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "#ifdef USE_INSTANCING_MORPH", "	uniform sampler2D morphTexture;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", "\n"].filter(aT).join("\n"), a10 = [aD(i10), "#define SHADER_TYPE " + i10.shaderType, "#define SHADER_NAME " + i10.shaderName, E2, i10.useFog && i10.fog ? "#define USE_FOG" : "", i10.useFog && i10.fogExp2 ? "#define FOG_EXP2" : "", i10.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "", i10.map ? "#define USE_MAP" : "", i10.matcap ? "#define USE_MATCAP" : "", i10.envMap ? "#define USE_ENVMAP" : "", i10.envMap ? "#define " + v2 : "", i10.envMap ? "#define " + x2 : "", i10.envMap ? "#define " + y2 : "", M2 ? "#define CUBEUV_TEXEL_WIDTH " + M2.texelWidth : "", M2 ? "#define CUBEUV_TEXEL_HEIGHT " + M2.texelHeight : "", M2 ? "#define CUBEUV_MAX_MIP " + M2.maxMip + ".0" : "", i10.lightMap ? "#define USE_LIGHTMAP" : "", i10.aoMap ? "#define USE_AOMAP" : "", i10.bumpMap ? "#define USE_BUMPMAP" : "", i10.normalMap ? "#define USE_NORMALMAP" : "", i10.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", i10.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", i10.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i10.anisotropy ? "#define USE_ANISOTROPY" : "", i10.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", i10.clearcoat ? "#define USE_CLEARCOAT" : "", i10.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", i10.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", i10.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", i10.dispersion ? "#define USE_DISPERSION" : "", i10.iridescence ? "#define USE_IRIDESCENCE" : "", i10.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", i10.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", i10.specularMap ? "#define USE_SPECULARMAP" : "", i10.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", i10.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", i10.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i10.metalnessMap ? "#define USE_METALNESSMAP" : "", i10.alphaMap ? "#define USE_ALPHAMAP" : "", i10.alphaTest ? "#define USE_ALPHATEST" : "", i10.alphaHash ? "#define USE_ALPHAHASH" : "", i10.sheen ? "#define USE_SHEEN" : "", i10.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", i10.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", i10.transmission ? "#define USE_TRANSMISSION" : "", i10.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", i10.thicknessMap ? "#define USE_THICKNESSMAP" : "", i10.vertexTangents && false === i10.flatShading ? "#define USE_TANGENT" : "", i10.vertexColors || i10.instancingColor || i10.batchingColor ? "#define USE_COLOR" : "", i10.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", i10.vertexUv1s ? "#define USE_UV1" : "", i10.vertexUv2s ? "#define USE_UV2" : "", i10.vertexUv3s ? "#define USE_UV3" : "", i10.pointsUvs ? "#define USE_POINTS_UV" : "", i10.gradientMap ? "#define USE_GRADIENTMAP" : "", i10.flatShading ? "#define FLAT_SHADED" : "", i10.doubleSided ? "#define DOUBLE_SIDED" : "", i10.flipSided ? "#define FLIP_SIDED" : "", i10.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i10.shadowMapEnabled ? "#define " + _2 : "", i10.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", i10.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", i10.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", i10.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "", i10.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "", i10.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", 0 !== i10.toneMapping ? "#define TONE_MAPPING" : "", 0 !== i10.toneMapping ? nQ.tonemapping_pars_fragment : "", 0 !== i10.toneMapping ? (function(e12, t12) {
        let i11;
        switch (t12) {
          case 1:
            i11 = "Linear";
            break;
          case 2:
            i11 = "Reinhard";
            break;
          case 3:
            i11 = "Cineon";
            break;
          case 4:
            i11 = "ACESFilmic";
            break;
          case 6:
            i11 = "AgX";
            break;
          case 7:
            i11 = "Neutral";
            break;
          case 5:
            i11 = "Custom";
            break;
          default:
            console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t12), i11 = "Linear";
        }
        return "vec3 " + e12 + "( vec3 color ) { return " + i11 + "ToneMapping( color ); }";
      })("toneMapping", i10.toneMapping) : "", i10.dithering ? "#define DITHERING" : "", i10.opaque ? "#define OPAQUE" : "", nQ.colorspace_pars_fragment, (e11 = (function(e12) {
        B._getMatrix(aM, B.workingColorSpace, e12);
        let t12 = `mat3( ${aM.elements.map((e13) => e13.toFixed(4))} )`;
        switch (B.getTransfer(e12)) {
          case h:
            return [t12, "LinearTransferOETF"];
          case c:
            return [t12, "sRGBTransferOETF"];
          default:
            return console.warn("THREE.WebGLProgram: Unsupported color space: ", e12), [t12, "LinearTransferOETF"];
        }
      })(i10.outputColorSpace), `vec4 linearToOutputTexel( vec4 value ) {
	return ${e11[1]}( vec4( value.rgb * ${e11[0]}, value.a ) );
}`), (B.getLuminanceCoefficients(aE), t11 = aE.x.toFixed(4), n11 = aE.y.toFixed(4), s3 = aE.z.toFixed(4), `float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( ${t11}, ${n11}, ${s3} );
	return dot( weights, rgb );
}`), i10.useDepthPacking ? "#define DEPTH_PACKING " + i10.depthPacking : "", "\n"].filter(aT).join("\n");
    }
    m2 = aA(m2 = ab(m2 = aR(m2), i10), i10), g2 = aA(g2 = ab(g2 = aR(g2), i10), i10), m2 = aL(m2), g2 = aL(g2), true !== i10.isRawShaderMaterial && (b2 = "#version 300 es\n", r10 = [S2, "#define attribute in\n#define varying out\n#define texture2D texture"].join("\n") + "\n" + r10, a10 = ["#define varying in", i10.glslVersion === u ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", i10.glslVersion === u ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth\n#define texture2D texture\n#define textureCube texture\n#define texture2DProj textureProj\n#define texture2DLodEXT textureLod\n#define texture2DProjLodEXT textureProjLod\n#define textureCubeLodEXT textureLod\n#define texture2DGradEXT textureGrad\n#define texture2DProjGradEXT textureProjGrad\n#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + a10);
    let A2 = b2 + r10 + m2, w2 = b2 + a10 + g2, R2 = ax(p2, p2.VERTEX_SHADER, A2), C2 = ax(p2, p2.FRAGMENT_SHADER, w2);
    function P2(t11) {
      if (e10.debug.checkShaderErrors) {
        let i11 = p2.getProgramInfoLog(T2) || "", n11 = p2.getShaderInfoLog(R2) || "", s3 = p2.getShaderInfoLog(C2) || "", o3 = i11.trim(), l3 = n11.trim(), h2 = s3.trim(), c2 = true, u2 = true;
        if (false === p2.getProgramParameter(T2, p2.LINK_STATUS)) if (c2 = false, "function" == typeof e10.debug.onShaderError) e10.debug.onShaderError(p2, T2, R2, C2);
        else {
          let e11 = aS(p2, R2, "vertex"), i12 = aS(p2, C2, "fragment");
          console.error("THREE.WebGLProgram: Shader Error " + p2.getError() + " - VALIDATE_STATUS " + p2.getProgramParameter(T2, p2.VALIDATE_STATUS) + "\n\nMaterial Name: " + t11.name + "\nMaterial Type: " + t11.type + "\n\nProgram Info Log: " + o3 + "\n" + e11 + "\n" + i12);
        }
        else "" !== o3 ? console.warn("THREE.WebGLProgram: Program Info Log:", o3) : ("" === l3 || "" === h2) && (u2 = false);
        u2 && (t11.diagnostics = { runnable: c2, programLog: o3, vertexShader: { log: l3, prefix: r10 }, fragmentShader: { log: h2, prefix: a10 } });
      }
      p2.deleteShader(R2), p2.deleteShader(C2), s2 = new av(p2, T2), o2 = (function(e11, t12) {
        let i11 = {}, n11 = e11.getProgramParameter(t12, e11.ACTIVE_ATTRIBUTES);
        for (let r11 = 0; r11 < n11; r11++) {
          let n12 = e11.getActiveAttrib(t12, r11), a11 = n12.name, s3 = 1;
          n12.type === e11.FLOAT_MAT2 && (s3 = 2), n12.type === e11.FLOAT_MAT3 && (s3 = 3), n12.type === e11.FLOAT_MAT4 && (s3 = 4), i11[a11] = { type: n12.type, location: e11.getAttribLocation(t12, a11), locationSize: s3 };
        }
        return i11;
      })(p2, T2);
    }
    p2.attachShader(T2, R2), p2.attachShader(T2, C2), void 0 !== i10.index0AttributeName ? p2.bindAttribLocation(T2, 0, i10.index0AttributeName) : true === i10.morphTargets && p2.bindAttribLocation(T2, 0, "position"), p2.linkProgram(T2), this.getUniforms = function() {
      return void 0 === s2 && P2(this), s2;
    }, this.getAttributes = function() {
      return void 0 === o2 && P2(this), o2;
    };
    let I2 = false === i10.rendererExtensionParallelShaderCompile;
    return this.isReady = function() {
      return false === I2 && (I2 = p2.getProgramParameter(T2, 37297)), I2;
    }, this.destroy = function() {
      n10.releaseStatesOfProgram(this), p2.deleteProgram(T2), this.program = void 0;
    }, this.type = i10.shaderType, this.name = i10.shaderName, this.id = ay++, this.cacheKey = t10, this.usedTimes = 1, this.program = T2, this.vertexShader = R2, this.fragmentShader = C2, this;
  }
  let aO = 0;
  class aF {
    constructor() {
      this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
    }
    update(e10) {
      let t10 = e10.vertexShader, i10 = e10.fragmentShader, n10 = this._getShaderStage(t10), r10 = this._getShaderStage(i10), a10 = this._getShaderCacheForMaterial(e10);
      return false === a10.has(n10) && (a10.add(n10), n10.usedTimes++), false === a10.has(r10) && (a10.add(r10), r10.usedTimes++), this;
    }
    remove(e10) {
      for (let t10 of this.materialCache.get(e10)) t10.usedTimes--, 0 === t10.usedTimes && this.shaderCache.delete(t10.code);
      return this.materialCache.delete(e10), this;
    }
    getVertexShaderID(e10) {
      return this._getShaderStage(e10.vertexShader).id;
    }
    getFragmentShaderID(e10) {
      return this._getShaderStage(e10.fragmentShader).id;
    }
    dispose() {
      this.shaderCache.clear(), this.materialCache.clear();
    }
    _getShaderCacheForMaterial(e10) {
      let t10 = this.materialCache, i10 = t10.get(e10);
      return void 0 === i10 && (i10 = /* @__PURE__ */ new Set(), t10.set(e10, i10)), i10;
    }
    _getShaderStage(e10) {
      let t10 = this.shaderCache, i10 = t10.get(e10);
      return void 0 === i10 && (i10 = new aB(e10), t10.set(e10, i10)), i10;
    }
  }
  class aB {
    constructor(e10) {
      this.id = aO++, this.code = e10, this.usedTimes = 0;
    }
  }
  function az(e10, t10, i10, n10, r10, a10, s2) {
    let o2 = new eF(), h2 = new aF(), u2 = /* @__PURE__ */ new Set(), d2 = [], p2 = r10.logarithmicDepthBuffer, f2 = r10.vertexTextures, m2 = r10.precision, g2 = { MeshDepthMaterial: "depth", MeshDistanceMaterial: "distanceRGBA", MeshNormalMaterial: "normal", MeshBasicMaterial: "basic", MeshLambertMaterial: "lambert", MeshPhongMaterial: "phong", MeshToonMaterial: "toon", MeshStandardMaterial: "physical", MeshPhysicalMaterial: "physical", MeshMatcapMaterial: "matcap", LineBasicMaterial: "basic", LineDashedMaterial: "dashed", PointsMaterial: "points", ShadowMaterial: "shadow", SpriteMaterial: "sprite" };
    function _2(e11) {
      return (u2.add(e11), 0 === e11) ? "uv" : `uv${e11}`;
    }
    return { getParameters: function(a11, o3, d3, v2, x2) {
      let y2, M2, S2, E2, T2 = v2.fog, b2 = x2.geometry, A2 = a11.isMeshStandardMaterial ? v2.environment : null, w2 = (a11.isMeshStandardMaterial ? i10 : t10).get(a11.envMap || A2), R2 = w2 && 306 === w2.mapping ? w2.image.height : null, C2 = g2[a11.type];
      null !== a11.precision && (m2 = r10.getMaxPrecision(a11.precision)) !== a11.precision && console.warn("THREE.WebGLProgram.getParameters:", a11.precision, "not supported, using", m2, "instead.");
      let P2 = b2.morphAttributes.position || b2.morphAttributes.normal || b2.morphAttributes.color, I2 = void 0 !== P2 ? P2.length : 0, L2 = 0;
      if (void 0 !== b2.morphAttributes.position && (L2 = 1), void 0 !== b2.morphAttributes.normal && (L2 = 2), void 0 !== b2.morphAttributes.color && (L2 = 3), C2) {
        let e11 = n1[C2];
        y2 = e11.vertexShader, M2 = e11.fragmentShader;
      } else y2 = a11.vertexShader, M2 = a11.fragmentShader, h2.update(a11), S2 = h2.getVertexShaderID(a11), E2 = h2.getFragmentShaderID(a11);
      let U2 = e10.getRenderTarget(), D2 = e10.state.buffers.depth.getReversed(), N2 = true === x2.isInstancedMesh, O2 = true === x2.isBatchedMesh, F2 = !!a11.map, z2 = !!a11.matcap, V2 = !!w2, H2 = !!a11.aoMap, k2 = !!a11.lightMap, G2 = !!a11.bumpMap, W2 = !!a11.normalMap, X2 = !!a11.displacementMap, j2 = !!a11.emissiveMap, q2 = !!a11.metalnessMap, Y2 = !!a11.roughnessMap, K2 = a11.anisotropy > 0, J2 = a11.clearcoat > 0, Z2 = a11.dispersion > 0, $2 = a11.iridescence > 0, Q2 = a11.sheen > 0, ee2 = a11.transmission > 0, et2 = K2 && !!a11.anisotropyMap, ei2 = J2 && !!a11.clearcoatMap, en2 = J2 && !!a11.clearcoatNormalMap, er2 = J2 && !!a11.clearcoatRoughnessMap, ea2 = $2 && !!a11.iridescenceMap, es2 = $2 && !!a11.iridescenceThicknessMap, eo2 = Q2 && !!a11.sheenColorMap, el2 = Q2 && !!a11.sheenRoughnessMap, eh2 = !!a11.specularMap, ec2 = !!a11.specularColorMap, eu2 = !!a11.specularIntensityMap, ed2 = ee2 && !!a11.transmissionMap, ep2 = ee2 && !!a11.thicknessMap, ef2 = !!a11.gradientMap, em2 = !!a11.alphaMap, eg2 = a11.alphaTest > 0, e_2 = !!a11.alphaHash, ev2 = !!a11.extensions, ex2 = 0;
      a11.toneMapped && (null === U2 || true === U2.isXRRenderTarget) && (ex2 = e10.toneMapping);
      let ey2 = { shaderID: C2, shaderType: a11.type, shaderName: a11.name, vertexShader: y2, fragmentShader: M2, defines: a11.defines, customVertexShaderID: S2, customFragmentShaderID: E2, isRawShaderMaterial: true === a11.isRawShaderMaterial, glslVersion: a11.glslVersion, precision: m2, batching: O2, batchingColor: O2 && null !== x2._colorsTexture, instancing: N2, instancingColor: N2 && null !== x2.instanceColor, instancingMorph: N2 && null !== x2.morphTexture, supportsVertexTextures: f2, outputColorSpace: null === U2 ? e10.outputColorSpace : true === U2.isXRRenderTarget ? U2.texture.colorSpace : l, alphaToCoverage: !!a11.alphaToCoverage, map: F2, matcap: z2, envMap: V2, envMapMode: V2 && w2.mapping, envMapCubeUVHeight: R2, aoMap: H2, lightMap: k2, bumpMap: G2, normalMap: W2, displacementMap: f2 && X2, emissiveMap: j2, normalMapObjectSpace: W2 && 1 === a11.normalMapType, normalMapTangentSpace: W2 && 0 === a11.normalMapType, metalnessMap: q2, roughnessMap: Y2, anisotropy: K2, anisotropyMap: et2, clearcoat: J2, clearcoatMap: ei2, clearcoatNormalMap: en2, clearcoatRoughnessMap: er2, dispersion: Z2, iridescence: $2, iridescenceMap: ea2, iridescenceThicknessMap: es2, sheen: Q2, sheenColorMap: eo2, sheenRoughnessMap: el2, specularMap: eh2, specularColorMap: ec2, specularIntensityMap: eu2, transmission: ee2, transmissionMap: ed2, thicknessMap: ep2, gradientMap: ef2, opaque: false === a11.transparent && 1 === a11.blending && false === a11.alphaToCoverage, alphaMap: em2, alphaTest: eg2, alphaHash: e_2, combine: a11.combine, mapUv: F2 && _2(a11.map.channel), aoMapUv: H2 && _2(a11.aoMap.channel), lightMapUv: k2 && _2(a11.lightMap.channel), bumpMapUv: G2 && _2(a11.bumpMap.channel), normalMapUv: W2 && _2(a11.normalMap.channel), displacementMapUv: X2 && _2(a11.displacementMap.channel), emissiveMapUv: j2 && _2(a11.emissiveMap.channel), metalnessMapUv: q2 && _2(a11.metalnessMap.channel), roughnessMapUv: Y2 && _2(a11.roughnessMap.channel), anisotropyMapUv: et2 && _2(a11.anisotropyMap.channel), clearcoatMapUv: ei2 && _2(a11.clearcoatMap.channel), clearcoatNormalMapUv: en2 && _2(a11.clearcoatNormalMap.channel), clearcoatRoughnessMapUv: er2 && _2(a11.clearcoatRoughnessMap.channel), iridescenceMapUv: ea2 && _2(a11.iridescenceMap.channel), iridescenceThicknessMapUv: es2 && _2(a11.iridescenceThicknessMap.channel), sheenColorMapUv: eo2 && _2(a11.sheenColorMap.channel), sheenRoughnessMapUv: el2 && _2(a11.sheenRoughnessMap.channel), specularMapUv: eh2 && _2(a11.specularMap.channel), specularColorMapUv: ec2 && _2(a11.specularColorMap.channel), specularIntensityMapUv: eu2 && _2(a11.specularIntensityMap.channel), transmissionMapUv: ed2 && _2(a11.transmissionMap.channel), thicknessMapUv: ep2 && _2(a11.thicknessMap.channel), alphaMapUv: em2 && _2(a11.alphaMap.channel), vertexTangents: !!b2.attributes.tangent && (W2 || K2), vertexColors: a11.vertexColors, vertexAlphas: true === a11.vertexColors && !!b2.attributes.color && 4 === b2.attributes.color.itemSize, pointsUvs: true === x2.isPoints && !!b2.attributes.uv && (F2 || em2), fog: !!T2, useFog: true === a11.fog, fogExp2: !!T2 && T2.isFogExp2, flatShading: true === a11.flatShading && false === a11.wireframe, sizeAttenuation: true === a11.sizeAttenuation, logarithmicDepthBuffer: p2, reversedDepthBuffer: D2, skinning: true === x2.isSkinnedMesh, morphTargets: void 0 !== b2.morphAttributes.position, morphNormals: void 0 !== b2.morphAttributes.normal, morphColors: void 0 !== b2.morphAttributes.color, morphTargetsCount: I2, morphTextureStride: L2, numDirLights: o3.directional.length, numPointLights: o3.point.length, numSpotLights: o3.spot.length, numSpotLightMaps: o3.spotLightMap.length, numRectAreaLights: o3.rectArea.length, numHemiLights: o3.hemi.length, numDirLightShadows: o3.directionalShadowMap.length, numPointLightShadows: o3.pointShadowMap.length, numSpotLightShadows: o3.spotShadowMap.length, numSpotLightShadowsWithMaps: o3.numSpotLightShadowsWithMaps, numLightProbes: o3.numLightProbes, numClippingPlanes: s2.numPlanes, numClipIntersection: s2.numIntersection, dithering: a11.dithering, shadowMapEnabled: e10.shadowMap.enabled && d3.length > 0, shadowMapType: e10.shadowMap.type, toneMapping: ex2, decodeVideoTexture: F2 && true === a11.map.isVideoTexture && B.getTransfer(a11.map.colorSpace) === c, decodeVideoTextureEmissive: j2 && true === a11.emissiveMap.isVideoTexture && B.getTransfer(a11.emissiveMap.colorSpace) === c, premultipliedAlpha: a11.premultipliedAlpha, doubleSided: 2 === a11.side, flipSided: 1 === a11.side, useDepthPacking: a11.depthPacking >= 0, depthPacking: a11.depthPacking || 0, index0AttributeName: a11.index0AttributeName, extensionClipCullDistance: ev2 && true === a11.extensions.clipCullDistance && n10.has("WEBGL_clip_cull_distance"), extensionMultiDraw: (ev2 && true === a11.extensions.multiDraw || O2) && n10.has("WEBGL_multi_draw"), rendererExtensionParallelShaderCompile: n10.has("KHR_parallel_shader_compile"), customProgramCacheKey: a11.customProgramCacheKey() };
      return ey2.vertexUv1s = u2.has(1), ey2.vertexUv2s = u2.has(2), ey2.vertexUv3s = u2.has(3), u2.clear(), ey2;
    }, getProgramCacheKey: function(t11) {
      var i11, n11, r11, a11;
      let s3 = [];
      if (t11.shaderID ? s3.push(t11.shaderID) : (s3.push(t11.customVertexShaderID), s3.push(t11.customFragmentShaderID)), void 0 !== t11.defines) for (let e11 in t11.defines) s3.push(e11), s3.push(t11.defines[e11]);
      return false === t11.isRawShaderMaterial && (i11 = s3, n11 = t11, i11.push(n11.precision), i11.push(n11.outputColorSpace), i11.push(n11.envMapMode), i11.push(n11.envMapCubeUVHeight), i11.push(n11.mapUv), i11.push(n11.alphaMapUv), i11.push(n11.lightMapUv), i11.push(n11.aoMapUv), i11.push(n11.bumpMapUv), i11.push(n11.normalMapUv), i11.push(n11.displacementMapUv), i11.push(n11.emissiveMapUv), i11.push(n11.metalnessMapUv), i11.push(n11.roughnessMapUv), i11.push(n11.anisotropyMapUv), i11.push(n11.clearcoatMapUv), i11.push(n11.clearcoatNormalMapUv), i11.push(n11.clearcoatRoughnessMapUv), i11.push(n11.iridescenceMapUv), i11.push(n11.iridescenceThicknessMapUv), i11.push(n11.sheenColorMapUv), i11.push(n11.sheenRoughnessMapUv), i11.push(n11.specularMapUv), i11.push(n11.specularColorMapUv), i11.push(n11.specularIntensityMapUv), i11.push(n11.transmissionMapUv), i11.push(n11.thicknessMapUv), i11.push(n11.combine), i11.push(n11.fogExp2), i11.push(n11.sizeAttenuation), i11.push(n11.morphTargetsCount), i11.push(n11.morphAttributeCount), i11.push(n11.numDirLights), i11.push(n11.numPointLights), i11.push(n11.numSpotLights), i11.push(n11.numSpotLightMaps), i11.push(n11.numHemiLights), i11.push(n11.numRectAreaLights), i11.push(n11.numDirLightShadows), i11.push(n11.numPointLightShadows), i11.push(n11.numSpotLightShadows), i11.push(n11.numSpotLightShadowsWithMaps), i11.push(n11.numLightProbes), i11.push(n11.shadowMapType), i11.push(n11.toneMapping), i11.push(n11.numClippingPlanes), i11.push(n11.numClipIntersection), i11.push(n11.depthPacking), r11 = s3, a11 = t11, o2.disableAll(), a11.supportsVertexTextures && o2.enable(0), a11.instancing && o2.enable(1), a11.instancingColor && o2.enable(2), a11.instancingMorph && o2.enable(3), a11.matcap && o2.enable(4), a11.envMap && o2.enable(5), a11.normalMapObjectSpace && o2.enable(6), a11.normalMapTangentSpace && o2.enable(7), a11.clearcoat && o2.enable(8), a11.iridescence && o2.enable(9), a11.alphaTest && o2.enable(10), a11.vertexColors && o2.enable(11), a11.vertexAlphas && o2.enable(12), a11.vertexUv1s && o2.enable(13), a11.vertexUv2s && o2.enable(14), a11.vertexUv3s && o2.enable(15), a11.vertexTangents && o2.enable(16), a11.anisotropy && o2.enable(17), a11.alphaHash && o2.enable(18), a11.batching && o2.enable(19), a11.dispersion && o2.enable(20), a11.batchingColor && o2.enable(21), a11.gradientMap && o2.enable(22), r11.push(o2.mask), o2.disableAll(), a11.fog && o2.enable(0), a11.useFog && o2.enable(1), a11.flatShading && o2.enable(2), a11.logarithmicDepthBuffer && o2.enable(3), a11.reversedDepthBuffer && o2.enable(4), a11.skinning && o2.enable(5), a11.morphTargets && o2.enable(6), a11.morphNormals && o2.enable(7), a11.morphColors && o2.enable(8), a11.premultipliedAlpha && o2.enable(9), a11.shadowMapEnabled && o2.enable(10), a11.doubleSided && o2.enable(11), a11.flipSided && o2.enable(12), a11.useDepthPacking && o2.enable(13), a11.dithering && o2.enable(14), a11.transmission && o2.enable(15), a11.sheen && o2.enable(16), a11.opaque && o2.enable(17), a11.pointsUvs && o2.enable(18), a11.decodeVideoTexture && o2.enable(19), a11.decodeVideoTextureEmissive && o2.enable(20), a11.alphaToCoverage && o2.enable(21), r11.push(o2.mask), s3.push(e10.outputColorSpace)), s3.push(t11.customProgramCacheKey), s3.join();
    }, getUniforms: function(e11) {
      let t11, i11 = g2[e11.type];
      if (i11) {
        let e12 = n1[i11];
        t11 = tX.clone(e12.uniforms);
      } else t11 = e11.uniforms;
      return t11;
    }, acquireProgram: function(t11, i11) {
      let n11;
      for (let e11 = 0, t12 = d2.length; e11 < t12; e11++) {
        let t13 = d2[e11];
        if (t13.cacheKey === i11) {
          n11 = t13, ++n11.usedTimes;
          break;
        }
      }
      return void 0 === n11 && (n11 = new aN(e10, i11, t11, a10), d2.push(n11)), n11;
    }, releaseProgram: function(e11) {
      if (0 == --e11.usedTimes) {
        let t11 = d2.indexOf(e11);
        d2[t11] = d2[d2.length - 1], d2.pop(), e11.destroy();
      }
    }, releaseShaderCache: function(e11) {
      h2.remove(e11);
    }, programs: d2, dispose: function() {
      h2.dispose();
    } };
  }
  function aV() {
    let e10 = /* @__PURE__ */ new WeakMap();
    return { has: function(t10) {
      return e10.has(t10);
    }, get: function(t10) {
      let i10 = e10.get(t10);
      return void 0 === i10 && (i10 = {}, e10.set(t10, i10)), i10;
    }, remove: function(t10) {
      e10.delete(t10);
    }, update: function(t10, i10, n10) {
      e10.get(t10)[i10] = n10;
    }, dispose: function() {
      e10 = /* @__PURE__ */ new WeakMap();
    } };
  }
  function aH(e10, t10) {
    return e10.groupOrder !== t10.groupOrder ? e10.groupOrder - t10.groupOrder : e10.renderOrder !== t10.renderOrder ? e10.renderOrder - t10.renderOrder : e10.material.id !== t10.material.id ? e10.material.id - t10.material.id : e10.z !== t10.z ? e10.z - t10.z : e10.id - t10.id;
  }
  function ak(e10, t10) {
    return e10.groupOrder !== t10.groupOrder ? e10.groupOrder - t10.groupOrder : e10.renderOrder !== t10.renderOrder ? e10.renderOrder - t10.renderOrder : e10.z !== t10.z ? t10.z - e10.z : e10.id - t10.id;
  }
  function aG() {
    let e10 = [], t10 = 0, i10 = [], n10 = [], r10 = [];
    function a10(i11, n11, r11, a11, s2, o2) {
      let l2 = e10[t10];
      return void 0 === l2 ? (l2 = { id: i11.id, object: i11, geometry: n11, material: r11, groupOrder: a11, renderOrder: i11.renderOrder, z: s2, group: o2 }, e10[t10] = l2) : (l2.id = i11.id, l2.object = i11, l2.geometry = n11, l2.material = r11, l2.groupOrder = a11, l2.renderOrder = i11.renderOrder, l2.z = s2, l2.group = o2), t10++, l2;
    }
    return { opaque: i10, transmissive: n10, transparent: r10, init: function() {
      t10 = 0, i10.length = 0, n10.length = 0, r10.length = 0;
    }, push: function(e11, t11, s2, o2, l2, h2) {
      let c2 = a10(e11, t11, s2, o2, l2, h2);
      s2.transmission > 0 ? n10.push(c2) : true === s2.transparent ? r10.push(c2) : i10.push(c2);
    }, unshift: function(e11, t11, s2, o2, l2, h2) {
      let c2 = a10(e11, t11, s2, o2, l2, h2);
      s2.transmission > 0 ? n10.unshift(c2) : true === s2.transparent ? r10.unshift(c2) : i10.unshift(c2);
    }, finish: function() {
      for (let i11 = t10, n11 = e10.length; i11 < n11; i11++) {
        let t11 = e10[i11];
        if (null === t11.id) break;
        t11.id = null, t11.object = null, t11.geometry = null, t11.material = null, t11.group = null;
      }
    }, sort: function(e11, t11) {
      i10.length > 1 && i10.sort(e11 || aH), n10.length > 1 && n10.sort(t11 || ak), r10.length > 1 && r10.sort(t11 || ak);
    } };
  }
  function aW() {
    let e10 = /* @__PURE__ */ new WeakMap();
    return { get: function(t10, i10) {
      let n10, r10 = e10.get(t10);
      return void 0 === r10 ? (n10 = new aG(), e10.set(t10, [n10])) : i10 >= r10.length ? (n10 = new aG(), r10.push(n10)) : n10 = r10[i10], n10;
    }, dispose: function() {
      e10 = /* @__PURE__ */ new WeakMap();
    } };
  }
  function aX() {
    let e10 = {};
    return { get: function(t10) {
      let i10;
      if (void 0 !== e10[t10.id]) return e10[t10.id];
      switch (t10.type) {
        case "DirectionalLight":
          i10 = { direction: new b(), color: new tl() };
          break;
        case "SpotLight":
          i10 = { position: new b(), direction: new b(), color: new tl(), distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 };
          break;
        case "PointLight":
          i10 = { position: new b(), color: new tl(), distance: 0, decay: 0 };
          break;
        case "HemisphereLight":
          i10 = { direction: new b(), skyColor: new tl(), groundColor: new tl() };
          break;
        case "RectAreaLight":
          i10 = { color: new tl(), position: new b(), halfWidth: new b(), halfHeight: new b() };
      }
      return e10[t10.id] = i10, i10;
    } };
  }
  let aj = 0;
  function aq(e10, t10) {
    return 2 * !!t10.castShadow - 2 * !!e10.castShadow + +!!t10.map - !!e10.map;
  }
  function aY(e10) {
    let t10, i10 = new aX(), n10 = (t10 = {}, { get: function(e11) {
      let i11;
      if (void 0 !== t10[e11.id]) return t10[e11.id];
      switch (e11.type) {
        case "DirectionalLight":
        case "SpotLight":
          i11 = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new E() };
          break;
        case "PointLight":
          i11 = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new E(), shadowCameraNear: 1, shadowCameraFar: 1e3 };
      }
      return t10[e11.id] = i11, i11;
    } }), r10 = { version: 0, hash: { directionalLength: -1, pointLength: -1, spotLength: -1, rectAreaLength: -1, hemiLength: -1, numDirectionalShadows: -1, numPointShadows: -1, numSpotShadows: -1, numSpotMaps: -1, numLightProbes: -1 }, ambient: [0, 0, 0], probe: [], directional: [], directionalShadow: [], directionalShadowMap: [], directionalShadowMatrix: [], spot: [], spotLightMap: [], spotShadow: [], spotShadowMap: [], spotLightMatrix: [], rectArea: [], rectAreaLTC1: null, rectAreaLTC2: null, point: [], pointShadow: [], pointShadowMap: [], pointShadowMatrix: [], hemi: [], numSpotLightShadowsWithMaps: 0, numLightProbes: 0 };
    for (let e11 = 0; e11 < 9; e11++) r10.probe.push(new b());
    let a10 = new b(), s2 = new eA(), o2 = new eA();
    return { setup: function(t11) {
      let a11 = 0, s3 = 0, o3 = 0;
      for (let e11 = 0; e11 < 9; e11++) r10.probe[e11].set(0, 0, 0);
      let l2 = 0, h2 = 0, c2 = 0, u2 = 0, d2 = 0, p2 = 0, f2 = 0, m2 = 0, g2 = 0, _2 = 0, v2 = 0;
      t11.sort(aq);
      for (let e11 = 0, x3 = t11.length; e11 < x3; e11++) {
        let x4 = t11[e11], y2 = x4.color, M2 = x4.intensity, S2 = x4.distance, E2 = x4.shadow && x4.shadow.map ? x4.shadow.map.texture : null;
        if (x4.isAmbientLight) a11 += y2.r * M2, s3 += y2.g * M2, o3 += y2.b * M2;
        else if (x4.isLightProbe) {
          for (let e12 = 0; e12 < 9; e12++) r10.probe[e12].addScaledVector(x4.sh.coefficients[e12], M2);
          v2++;
        } else if (x4.isDirectionalLight) {
          let e12 = i10.get(x4);
          if (e12.color.copy(x4.color).multiplyScalar(x4.intensity), x4.castShadow) {
            let e13 = x4.shadow, t12 = n10.get(x4);
            t12.shadowIntensity = e13.intensity, t12.shadowBias = e13.bias, t12.shadowNormalBias = e13.normalBias, t12.shadowRadius = e13.radius, t12.shadowMapSize = e13.mapSize, r10.directionalShadow[l2] = t12, r10.directionalShadowMap[l2] = E2, r10.directionalShadowMatrix[l2] = x4.shadow.matrix, p2++;
          }
          r10.directional[l2] = e12, l2++;
        } else if (x4.isSpotLight) {
          let e12 = i10.get(x4);
          e12.position.setFromMatrixPosition(x4.matrixWorld), e12.color.copy(y2).multiplyScalar(M2), e12.distance = S2, e12.coneCos = Math.cos(x4.angle), e12.penumbraCos = Math.cos(x4.angle * (1 - x4.penumbra)), e12.decay = x4.decay, r10.spot[c2] = e12;
          let t12 = x4.shadow;
          if (x4.map && (r10.spotLightMap[g2] = x4.map, g2++, t12.updateMatrices(x4), x4.castShadow && _2++), r10.spotLightMatrix[c2] = t12.matrix, x4.castShadow) {
            let e13 = n10.get(x4);
            e13.shadowIntensity = t12.intensity, e13.shadowBias = t12.bias, e13.shadowNormalBias = t12.normalBias, e13.shadowRadius = t12.radius, e13.shadowMapSize = t12.mapSize, r10.spotShadow[c2] = e13, r10.spotShadowMap[c2] = E2, m2++;
          }
          c2++;
        } else if (x4.isRectAreaLight) {
          let e12 = i10.get(x4);
          e12.color.copy(y2).multiplyScalar(M2), e12.halfWidth.set(0.5 * x4.width, 0, 0), e12.halfHeight.set(0, 0.5 * x4.height, 0), r10.rectArea[u2] = e12, u2++;
        } else if (x4.isPointLight) {
          let e12 = i10.get(x4);
          if (e12.color.copy(x4.color).multiplyScalar(x4.intensity), e12.distance = x4.distance, e12.decay = x4.decay, x4.castShadow) {
            let e13 = x4.shadow, t12 = n10.get(x4);
            t12.shadowIntensity = e13.intensity, t12.shadowBias = e13.bias, t12.shadowNormalBias = e13.normalBias, t12.shadowRadius = e13.radius, t12.shadowMapSize = e13.mapSize, t12.shadowCameraNear = e13.camera.near, t12.shadowCameraFar = e13.camera.far, r10.pointShadow[h2] = t12, r10.pointShadowMap[h2] = E2, r10.pointShadowMatrix[h2] = x4.shadow.matrix, f2++;
          }
          r10.point[h2] = e12, h2++;
        } else if (x4.isHemisphereLight) {
          let e12 = i10.get(x4);
          e12.skyColor.copy(x4.color).multiplyScalar(M2), e12.groundColor.copy(x4.groundColor).multiplyScalar(M2), r10.hemi[d2] = e12, d2++;
        }
      }
      u2 > 0 && (true === e10.has("OES_texture_float_linear") ? (r10.rectAreaLTC1 = n0.LTC_FLOAT_1, r10.rectAreaLTC2 = n0.LTC_FLOAT_2) : (r10.rectAreaLTC1 = n0.LTC_HALF_1, r10.rectAreaLTC2 = n0.LTC_HALF_2)), r10.ambient[0] = a11, r10.ambient[1] = s3, r10.ambient[2] = o3;
      let x2 = r10.hash;
      (x2.directionalLength !== l2 || x2.pointLength !== h2 || x2.spotLength !== c2 || x2.rectAreaLength !== u2 || x2.hemiLength !== d2 || x2.numDirectionalShadows !== p2 || x2.numPointShadows !== f2 || x2.numSpotShadows !== m2 || x2.numSpotMaps !== g2 || x2.numLightProbes !== v2) && (r10.directional.length = l2, r10.spot.length = c2, r10.rectArea.length = u2, r10.point.length = h2, r10.hemi.length = d2, r10.directionalShadow.length = p2, r10.directionalShadowMap.length = p2, r10.pointShadow.length = f2, r10.pointShadowMap.length = f2, r10.spotShadow.length = m2, r10.spotShadowMap.length = m2, r10.directionalShadowMatrix.length = p2, r10.pointShadowMatrix.length = f2, r10.spotLightMatrix.length = m2 + g2 - _2, r10.spotLightMap.length = g2, r10.numSpotLightShadowsWithMaps = _2, r10.numLightProbes = v2, x2.directionalLength = l2, x2.pointLength = h2, x2.spotLength = c2, x2.rectAreaLength = u2, x2.hemiLength = d2, x2.numDirectionalShadows = p2, x2.numPointShadows = f2, x2.numSpotShadows = m2, x2.numSpotMaps = g2, x2.numLightProbes = v2, r10.version = aj++);
    }, setupView: function(e11, t11) {
      let i11 = 0, n11 = 0, l2 = 0, h2 = 0, c2 = 0, u2 = t11.matrixWorldInverse;
      for (let t12 = 0, d2 = e11.length; t12 < d2; t12++) {
        let d3 = e11[t12];
        if (d3.isDirectionalLight) {
          let e12 = r10.directional[i11];
          e12.direction.setFromMatrixPosition(d3.matrixWorld), a10.setFromMatrixPosition(d3.target.matrixWorld), e12.direction.sub(a10), e12.direction.transformDirection(u2), i11++;
        } else if (d3.isSpotLight) {
          let e12 = r10.spot[l2];
          e12.position.setFromMatrixPosition(d3.matrixWorld), e12.position.applyMatrix4(u2), e12.direction.setFromMatrixPosition(d3.matrixWorld), a10.setFromMatrixPosition(d3.target.matrixWorld), e12.direction.sub(a10), e12.direction.transformDirection(u2), l2++;
        } else if (d3.isRectAreaLight) {
          let e12 = r10.rectArea[h2];
          e12.position.setFromMatrixPosition(d3.matrixWorld), e12.position.applyMatrix4(u2), o2.identity(), s2.copy(d3.matrixWorld), s2.premultiply(u2), o2.extractRotation(s2), e12.halfWidth.set(0.5 * d3.width, 0, 0), e12.halfHeight.set(0, 0.5 * d3.height, 0), e12.halfWidth.applyMatrix4(o2), e12.halfHeight.applyMatrix4(o2), h2++;
        } else if (d3.isPointLight) {
          let e12 = r10.point[n11];
          e12.position.setFromMatrixPosition(d3.matrixWorld), e12.position.applyMatrix4(u2), n11++;
        } else if (d3.isHemisphereLight) {
          let e12 = r10.hemi[c2];
          e12.direction.setFromMatrixPosition(d3.matrixWorld), e12.direction.transformDirection(u2), c2++;
        }
      }
    }, state: r10 };
  }
  function aK(e10) {
    let t10 = new aY(e10), i10 = [], n10 = [], r10 = { lightsArray: i10, shadowsArray: n10, camera: null, lights: t10, transmissionRenderTarget: {} };
    return { init: function(e11) {
      r10.camera = e11, i10.length = 0, n10.length = 0;
    }, state: r10, setupLights: function() {
      t10.setup(i10);
    }, setupLightsView: function(e11) {
      t10.setupView(i10, e11);
    }, pushLight: function(e11) {
      i10.push(e11);
    }, pushShadow: function(e11) {
      n10.push(e11);
    } };
  }
  function aJ(e10) {
    let t10 = /* @__PURE__ */ new WeakMap();
    return { get: function(i10, n10 = 0) {
      let r10, a10 = t10.get(i10);
      return void 0 === a10 ? (r10 = new aK(e10), t10.set(i10, [r10])) : n10 >= a10.length ? (r10 = new aK(e10), a10.push(r10)) : r10 = a10[n10], r10;
    }, dispose: function() {
      t10 = /* @__PURE__ */ new WeakMap();
    } };
  }
  function aZ(e10, t10, i10) {
    let n10 = new ib(), r10 = new E(), a10 = new E(), s2 = new Y(), o2 = new i9({ depthPacking: 3201 }), l2 = new i7(), h2 = {}, c2 = i10.maxTextureSize, u2 = { 0: 1, 1: 0, 2: 2 }, d2 = new tj({ defines: { VSM_SAMPLES: 8 }, uniforms: { shadow_pass: { value: null }, resolution: { value: new E() }, radius: { value: 4 } }, vertexShader: "void main() {\n	gl_Position = vec4( position, 1.0 );\n}", fragmentShader: "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n	const float samples = float( VSM_SAMPLES );\n	float mean = 0.0;\n	float squared_mean = 0.0;\n	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n	for ( float i = 0.0; i < samples; i ++ ) {\n		float uvOffset = uvStart + i * uvStride;\n		#ifdef HORIZONTAL_PASS\n			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n			mean += distribution.x;\n			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n		#else\n			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n			mean += depth;\n			squared_mean += depth * depth;\n		#endif\n	}\n	mean = mean / samples;\n	squared_mean = squared_mean / samples;\n	float std_dev = sqrt( squared_mean - mean * mean );\n	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}" }), p2 = d2.clone();
    p2.defines.HORIZONTAL_PASS = 1;
    let f2 = new tw();
    f2.setAttribute("position", new tg(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
    let m2 = new tz(f2, d2), g2 = this;
    this.enabled = false, this.autoUpdate = true, this.needsUpdate = false, this.type = 1;
    let _2 = this.type;
    function v2(t11, i11, n11, r11) {
      let a11 = null, s3 = true === n11.isPointLight ? t11.customDistanceMaterial : t11.customDepthMaterial;
      if (void 0 !== s3) a11 = s3;
      else if (a11 = true === n11.isPointLight ? l2 : o2, e10.localClippingEnabled && true === i11.clipShadows && Array.isArray(i11.clippingPlanes) && 0 !== i11.clippingPlanes.length || i11.displacementMap && 0 !== i11.displacementScale || i11.alphaMap && i11.alphaTest > 0 || i11.map && i11.alphaTest > 0 || true === i11.alphaToCoverage) {
        let e11 = a11.uuid, t12 = i11.uuid, n12 = h2[e11];
        void 0 === n12 && (n12 = {}, h2[e11] = n12);
        let r12 = n12[t12];
        void 0 === r12 && (r12 = a11.clone(), n12[t12] = r12, i11.addEventListener("dispose", x2)), a11 = r12;
      }
      return a11.visible = i11.visible, a11.wireframe = i11.wireframe, 3 === r11 ? a11.side = null !== i11.shadowSide ? i11.shadowSide : i11.side : a11.side = null !== i11.shadowSide ? i11.shadowSide : u2[i11.side], a11.alphaMap = i11.alphaMap, a11.alphaTest = true === i11.alphaToCoverage ? 0.5 : i11.alphaTest, a11.map = i11.map, a11.clipShadows = i11.clipShadows, a11.clippingPlanes = i11.clippingPlanes, a11.clipIntersection = i11.clipIntersection, a11.displacementMap = i11.displacementMap, a11.displacementScale = i11.displacementScale, a11.displacementBias = i11.displacementBias, a11.wireframeLinewidth = i11.wireframeLinewidth, a11.linewidth = i11.linewidth, true === n11.isPointLight && true === a11.isMeshDistanceMaterial && (e10.properties.get(a11).light = n11), a11;
    }
    function x2(e11) {
      for (let t11 in e11.target.removeEventListener("dispose", x2), h2) {
        let i11 = h2[t11], n11 = e11.target.uuid;
        n11 in i11 && (i11[n11].dispose(), delete i11[n11]);
      }
    }
    this.render = function(i11, o3, l3) {
      if (false === g2.enabled || false === g2.autoUpdate && false === g2.needsUpdate || 0 === i11.length) return;
      let h3 = e10.getRenderTarget(), u3 = e10.getActiveCubeFace(), f3 = e10.getActiveMipmapLevel(), x3 = e10.state;
      x3.setBlending(0), true === x3.buffers.depth.getReversed() ? x3.buffers.color.setClear(0, 0, 0, 0) : x3.buffers.color.setClear(1, 1, 1, 1), x3.buffers.depth.setTest(true), x3.setScissorTest(false);
      let y2 = 3 !== _2 && 3 === this.type, M2 = 3 === _2 && 3 !== this.type;
      for (let h4 = 0, u4 = i11.length; h4 < u4; h4++) {
        let u5 = i11[h4], f4 = u5.shadow;
        if (void 0 === f4) {
          console.warn("THREE.WebGLShadowMap:", u5, "has no shadow.");
          continue;
        }
        if (false === f4.autoUpdate && false === f4.needsUpdate) continue;
        r10.copy(f4.mapSize);
        let g3 = f4.getFrameExtents();
        if (r10.multiply(g3), a10.copy(f4.mapSize), (r10.x > c2 || r10.y > c2) && (r10.x > c2 && (a10.x = Math.floor(c2 / g3.x), r10.x = a10.x * g3.x, f4.mapSize.x = a10.x), r10.y > c2 && (a10.y = Math.floor(c2 / g3.y), r10.y = a10.y * g3.y, f4.mapSize.y = a10.y)), null === f4.map || true === y2 || true === M2) {
          let e11 = 3 !== this.type ? { minFilter: 1003, magFilter: 1003 } : {};
          null !== f4.map && f4.map.dispose(), f4.map = new J(r10.x, r10.y, e11), f4.map.texture.name = u5.name + ".shadowMap", f4.camera.updateProjectionMatrix();
        }
        e10.setRenderTarget(f4.map), e10.clear();
        let _3 = f4.getViewportCount();
        for (let i12 = 0; i12 < _3; i12++) {
          let r11 = f4.getViewport(i12);
          s2.set(a10.x * r11.x, a10.y * r11.y, a10.x * r11.z, a10.y * r11.w), x3.viewport(s2), f4.updateMatrices(u5, i12), n10 = f4.getFrustum(), (function i13(r12, a11, s3, o4, l4) {
            if (false === r12.visible) return;
            if (r12.layers.test(a11.layers) && (r12.isMesh || r12.isLine || r12.isPoints) && (r12.castShadow || r12.receiveShadow && 3 === l4) && (!r12.frustumCulled || n10.intersectsObject(r12))) {
              r12.modelViewMatrix.multiplyMatrices(s3.matrixWorldInverse, r12.matrixWorld);
              let i14 = t10.update(r12), n11 = r12.material;
              if (Array.isArray(n11)) {
                let t11 = i14.groups;
                for (let h6 = 0, c3 = t11.length; h6 < c3; h6++) {
                  let c4 = t11[h6], u6 = n11[c4.materialIndex];
                  if (u6 && u6.visible) {
                    let t12 = v2(r12, u6, o4, l4);
                    r12.onBeforeShadow(e10, r12, a11, s3, i14, t12, c4), e10.renderBufferDirect(s3, null, i14, t12, r12, c4), r12.onAfterShadow(e10, r12, a11, s3, i14, t12, c4);
                  }
                }
              } else if (n11.visible) {
                let t11 = v2(r12, n11, o4, l4);
                r12.onBeforeShadow(e10, r12, a11, s3, i14, t11, null), e10.renderBufferDirect(s3, null, i14, t11, r12, null), r12.onAfterShadow(e10, r12, a11, s3, i14, t11, null);
              }
            }
            let h5 = r12.children;
            for (let e11 = 0, t11 = h5.length; e11 < t11; e11++) i13(h5[e11], a11, s3, o4, l4);
          })(o3, l3, f4.camera, u5, this.type);
        }
        true !== f4.isPointLightShadow && 3 === this.type && (function(i12, n11) {
          let a11 = t10.update(m2);
          d2.defines.VSM_SAMPLES !== i12.blurSamples && (d2.defines.VSM_SAMPLES = i12.blurSamples, p2.defines.VSM_SAMPLES = i12.blurSamples, d2.needsUpdate = true, p2.needsUpdate = true), null === i12.mapPass && (i12.mapPass = new J(r10.x, r10.y)), d2.uniforms.shadow_pass.value = i12.map.texture, d2.uniforms.resolution.value = i12.mapSize, d2.uniforms.radius.value = i12.radius, e10.setRenderTarget(i12.mapPass), e10.clear(), e10.renderBufferDirect(n11, null, a11, d2, m2, null), p2.uniforms.shadow_pass.value = i12.mapPass.texture, p2.uniforms.resolution.value = i12.mapSize, p2.uniforms.radius.value = i12.radius, e10.setRenderTarget(i12.map), e10.clear(), e10.renderBufferDirect(n11, null, a11, p2, m2, null);
        })(f4, l3), f4.needsUpdate = false;
      }
      _2 = this.type, g2.needsUpdate = false, e10.setRenderTarget(h3, u3, f3);
    };
  }
  let a$ = { 0: 1, 2: 6, 4: 7, 3: 5, 1: 0, 6: 2, 7: 4, 5: 3 };
  function aQ(e10, t10) {
    let i10 = new function() {
      let t11 = false, i11 = new Y(), n11 = null, r11 = new Y(0, 0, 0, 0);
      return { setMask: function(i12) {
        n11 === i12 || t11 || (e10.colorMask(i12, i12, i12, i12), n11 = i12);
      }, setLocked: function(e11) {
        t11 = e11;
      }, setClear: function(t12, n12, a11, s3, o3) {
        true === o3 && (t12 *= s3, n12 *= s3, a11 *= s3), i11.set(t12, n12, a11, s3), false === r11.equals(i11) && (e10.clearColor(t12, n12, a11, s3), r11.copy(i11));
      }, reset: function() {
        t11 = false, n11 = null, r11.set(-1, 0, 0, 0);
      } };
    }(), n10 = new function() {
      let i11 = false, n11 = false, r11 = null, a11 = null, s3 = null;
      return { setReversed: function(e11) {
        if (n11 !== e11) {
          let i12 = t10.get("EXT_clip_control");
          e11 ? i12.clipControlEXT(i12.LOWER_LEFT_EXT, i12.ZERO_TO_ONE_EXT) : i12.clipControlEXT(i12.LOWER_LEFT_EXT, i12.NEGATIVE_ONE_TO_ONE_EXT), n11 = e11;
          let r12 = s3;
          s3 = null, this.setClear(r12);
        }
      }, getReversed: function() {
        return n11;
      }, setTest: function(t11) {
        t11 ? z2(e10.DEPTH_TEST) : V2(e10.DEPTH_TEST);
      }, setMask: function(t11) {
        r11 === t11 || i11 || (e10.depthMask(t11), r11 = t11);
      }, setFunc: function(t11) {
        if (n11 && (t11 = a$[t11]), a11 !== t11) {
          switch (t11) {
            case 0:
              e10.depthFunc(e10.NEVER);
              break;
            case 1:
              e10.depthFunc(e10.ALWAYS);
              break;
            case 2:
              e10.depthFunc(e10.LESS);
              break;
            case 3:
            default:
              e10.depthFunc(e10.LEQUAL);
              break;
            case 4:
              e10.depthFunc(e10.EQUAL);
              break;
            case 5:
              e10.depthFunc(e10.GEQUAL);
              break;
            case 6:
              e10.depthFunc(e10.GREATER);
              break;
            case 7:
              e10.depthFunc(e10.NOTEQUAL);
          }
          a11 = t11;
        }
      }, setLocked: function(e11) {
        i11 = e11;
      }, setClear: function(t11) {
        s3 !== t11 && (n11 && (t11 = 1 - t11), e10.clearDepth(t11), s3 = t11);
      }, reset: function() {
        i11 = false, r11 = null, a11 = null, s3 = null, n11 = false;
      } };
    }(), r10 = new function() {
      let t11 = false, i11 = null, n11 = null, r11 = null, a11 = null, s3 = null, o3 = null, l3 = null, h3 = null;
      return { setTest: function(i12) {
        t11 || (i12 ? z2(e10.STENCIL_TEST) : V2(e10.STENCIL_TEST));
      }, setMask: function(n12) {
        i11 === n12 || t11 || (e10.stencilMask(n12), i11 = n12);
      }, setFunc: function(t12, i12, s4) {
        (n11 !== t12 || r11 !== i12 || a11 !== s4) && (e10.stencilFunc(t12, i12, s4), n11 = t12, r11 = i12, a11 = s4);
      }, setOp: function(t12, i12, n12) {
        (s3 !== t12 || o3 !== i12 || l3 !== n12) && (e10.stencilOp(t12, i12, n12), s3 = t12, o3 = i12, l3 = n12);
      }, setLocked: function(e11) {
        t11 = e11;
      }, setClear: function(t12) {
        h3 !== t12 && (e10.clearStencil(t12), h3 = t12);
      }, reset: function() {
        t11 = false, i11 = null, n11 = null, r11 = null, a11 = null, s3 = null, o3 = null, l3 = null, h3 = null;
      } };
    }(), a10 = /* @__PURE__ */ new WeakMap(), s2 = /* @__PURE__ */ new WeakMap(), o2 = {}, l2 = {}, h2 = /* @__PURE__ */ new WeakMap(), c2 = [], u2 = null, d2 = false, p2 = null, f2 = null, m2 = null, g2 = null, _2 = null, v2 = null, x2 = null, y2 = new tl(0, 0, 0), M2 = 0, S2 = false, E2 = null, T2 = null, b2 = null, A2 = null, w2 = null, R2 = e10.getParameter(e10.MAX_COMBINED_TEXTURE_IMAGE_UNITS), C2 = false, P2 = e10.getParameter(e10.VERSION);
    -1 !== P2.indexOf("WebGL") ? C2 = parseFloat(/^WebGL (\d)/.exec(P2)[1]) >= 1 : -1 !== P2.indexOf("OpenGL ES") && (C2 = parseFloat(/^OpenGL ES (\d)/.exec(P2)[1]) >= 2);
    let I2 = null, L2 = {}, U2 = e10.getParameter(e10.SCISSOR_BOX), D2 = e10.getParameter(e10.VIEWPORT), N2 = new Y().fromArray(U2), O2 = new Y().fromArray(D2);
    function F2(t11, i11, n11, r11) {
      let a11 = new Uint8Array(4), s3 = e10.createTexture();
      e10.bindTexture(t11, s3), e10.texParameteri(t11, e10.TEXTURE_MIN_FILTER, e10.NEAREST), e10.texParameteri(t11, e10.TEXTURE_MAG_FILTER, e10.NEAREST);
      for (let s4 = 0; s4 < n11; s4++) t11 === e10.TEXTURE_3D || t11 === e10.TEXTURE_2D_ARRAY ? e10.texImage3D(i11, 0, e10.RGBA, 1, 1, r11, 0, e10.RGBA, e10.UNSIGNED_BYTE, a11) : e10.texImage2D(i11 + s4, 0, e10.RGBA, 1, 1, 0, e10.RGBA, e10.UNSIGNED_BYTE, a11);
      return s3;
    }
    let B2 = {};
    function z2(t11) {
      true !== o2[t11] && (e10.enable(t11), o2[t11] = true);
    }
    function V2(t11) {
      false !== o2[t11] && (e10.disable(t11), o2[t11] = false);
    }
    B2[e10.TEXTURE_2D] = F2(e10.TEXTURE_2D, e10.TEXTURE_2D, 1), B2[e10.TEXTURE_CUBE_MAP] = F2(e10.TEXTURE_CUBE_MAP, e10.TEXTURE_CUBE_MAP_POSITIVE_X, 6), B2[e10.TEXTURE_2D_ARRAY] = F2(e10.TEXTURE_2D_ARRAY, e10.TEXTURE_2D_ARRAY, 1, 1), B2[e10.TEXTURE_3D] = F2(e10.TEXTURE_3D, e10.TEXTURE_3D, 1, 1), i10.setClear(0, 0, 0, 1), n10.setClear(1), r10.setClear(0), z2(e10.DEPTH_TEST), n10.setFunc(3), W2(false), X2(1), z2(e10.CULL_FACE), G2(0);
    let H2 = { 100: e10.FUNC_ADD, 101: e10.FUNC_SUBTRACT, 102: e10.FUNC_REVERSE_SUBTRACT };
    H2[103] = e10.MIN, H2[104] = e10.MAX;
    let k2 = { 200: e10.ZERO, 201: e10.ONE, 202: e10.SRC_COLOR, 204: e10.SRC_ALPHA, 210: e10.SRC_ALPHA_SATURATE, 208: e10.DST_COLOR, 206: e10.DST_ALPHA, 203: e10.ONE_MINUS_SRC_COLOR, 205: e10.ONE_MINUS_SRC_ALPHA, 209: e10.ONE_MINUS_DST_COLOR, 207: e10.ONE_MINUS_DST_ALPHA, 211: e10.CONSTANT_COLOR, 212: e10.ONE_MINUS_CONSTANT_COLOR, 213: e10.CONSTANT_ALPHA, 214: e10.ONE_MINUS_CONSTANT_ALPHA };
    function G2(t11, i11, n11, r11, a11, s3, o3, l3, h3, c3) {
      if (0 === t11) {
        true === d2 && (V2(e10.BLEND), d2 = false);
        return;
      }
      if (false === d2 && (z2(e10.BLEND), d2 = true), 5 !== t11) {
        if (t11 !== p2 || c3 !== S2) {
          if ((100 !== f2 || 100 !== _2) && (e10.blendEquation(e10.FUNC_ADD), f2 = 100, _2 = 100), c3) switch (t11) {
            case 1:
              e10.blendFuncSeparate(e10.ONE, e10.ONE_MINUS_SRC_ALPHA, e10.ONE, e10.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              e10.blendFunc(e10.ONE, e10.ONE);
              break;
            case 3:
              e10.blendFuncSeparate(e10.ZERO, e10.ONE_MINUS_SRC_COLOR, e10.ZERO, e10.ONE);
              break;
            case 4:
              e10.blendFuncSeparate(e10.DST_COLOR, e10.ONE_MINUS_SRC_ALPHA, e10.ZERO, e10.ONE);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", t11);
          }
          else switch (t11) {
            case 1:
              e10.blendFuncSeparate(e10.SRC_ALPHA, e10.ONE_MINUS_SRC_ALPHA, e10.ONE, e10.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              e10.blendFuncSeparate(e10.SRC_ALPHA, e10.ONE, e10.ONE, e10.ONE);
              break;
            case 3:
              console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
              break;
            case 4:
              console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", t11);
          }
          m2 = null, g2 = null, v2 = null, x2 = null, y2.set(0, 0, 0), M2 = 0, p2 = t11, S2 = c3;
        }
        return;
      }
      a11 = a11 || i11, s3 = s3 || n11, o3 = o3 || r11, (i11 !== f2 || a11 !== _2) && (e10.blendEquationSeparate(H2[i11], H2[a11]), f2 = i11, _2 = a11), (n11 !== m2 || r11 !== g2 || s3 !== v2 || o3 !== x2) && (e10.blendFuncSeparate(k2[n11], k2[r11], k2[s3], k2[o3]), m2 = n11, g2 = r11, v2 = s3, x2 = o3), (false === l3.equals(y2) || h3 !== M2) && (e10.blendColor(l3.r, l3.g, l3.b, h3), y2.copy(l3), M2 = h3), p2 = t11, S2 = false;
    }
    function W2(t11) {
      E2 !== t11 && (t11 ? e10.frontFace(e10.CW) : e10.frontFace(e10.CCW), E2 = t11);
    }
    function X2(t11) {
      0 !== t11 ? (z2(e10.CULL_FACE), t11 !== T2 && (1 === t11 ? e10.cullFace(e10.BACK) : 2 === t11 ? e10.cullFace(e10.FRONT) : e10.cullFace(e10.FRONT_AND_BACK))) : V2(e10.CULL_FACE), T2 = t11;
    }
    function j2(t11, i11, n11) {
      t11 ? (z2(e10.POLYGON_OFFSET_FILL), (A2 !== i11 || w2 !== n11) && (e10.polygonOffset(i11, n11), A2 = i11, w2 = n11)) : V2(e10.POLYGON_OFFSET_FILL);
    }
    return { buffers: { color: i10, depth: n10, stencil: r10 }, enable: z2, disable: V2, bindFramebuffer: function(t11, i11) {
      return l2[t11] !== i11 && (e10.bindFramebuffer(t11, i11), l2[t11] = i11, t11 === e10.DRAW_FRAMEBUFFER && (l2[e10.FRAMEBUFFER] = i11), t11 === e10.FRAMEBUFFER && (l2[e10.DRAW_FRAMEBUFFER] = i11), true);
    }, drawBuffers: function(t11, i11) {
      let n11 = c2, r11 = false;
      if (t11) {
        void 0 === (n11 = h2.get(i11)) && (n11 = [], h2.set(i11, n11));
        let a11 = t11.textures;
        if (n11.length !== a11.length || n11[0] !== e10.COLOR_ATTACHMENT0) {
          for (let t12 = 0, i12 = a11.length; t12 < i12; t12++) n11[t12] = e10.COLOR_ATTACHMENT0 + t12;
          n11.length = a11.length, r11 = true;
        }
      } else n11[0] !== e10.BACK && (n11[0] = e10.BACK, r11 = true);
      r11 && e10.drawBuffers(n11);
    }, useProgram: function(t11) {
      return u2 !== t11 && (e10.useProgram(t11), u2 = t11, true);
    }, setBlending: G2, setMaterial: function(t11, a11) {
      2 === t11.side ? V2(e10.CULL_FACE) : z2(e10.CULL_FACE);
      let s3 = 1 === t11.side;
      a11 && (s3 = !s3), W2(s3), 1 === t11.blending && false === t11.transparent ? G2(0) : G2(t11.blending, t11.blendEquation, t11.blendSrc, t11.blendDst, t11.blendEquationAlpha, t11.blendSrcAlpha, t11.blendDstAlpha, t11.blendColor, t11.blendAlpha, t11.premultipliedAlpha), n10.setFunc(t11.depthFunc), n10.setTest(t11.depthTest), n10.setMask(t11.depthWrite), i10.setMask(t11.colorWrite);
      let o3 = t11.stencilWrite;
      r10.setTest(o3), o3 && (r10.setMask(t11.stencilWriteMask), r10.setFunc(t11.stencilFunc, t11.stencilRef, t11.stencilFuncMask), r10.setOp(t11.stencilFail, t11.stencilZFail, t11.stencilZPass)), j2(t11.polygonOffset, t11.polygonOffsetFactor, t11.polygonOffsetUnits), true === t11.alphaToCoverage ? z2(e10.SAMPLE_ALPHA_TO_COVERAGE) : V2(e10.SAMPLE_ALPHA_TO_COVERAGE);
    }, setFlipSided: W2, setCullFace: X2, setLineWidth: function(t11) {
      t11 !== b2 && (C2 && e10.lineWidth(t11), b2 = t11);
    }, setPolygonOffset: j2, setScissorTest: function(t11) {
      t11 ? z2(e10.SCISSOR_TEST) : V2(e10.SCISSOR_TEST);
    }, activeTexture: function(t11) {
      void 0 === t11 && (t11 = e10.TEXTURE0 + R2 - 1), I2 !== t11 && (e10.activeTexture(t11), I2 = t11);
    }, bindTexture: function(t11, i11, n11) {
      void 0 === n11 && (n11 = null === I2 ? e10.TEXTURE0 + R2 - 1 : I2);
      let r11 = L2[n11];
      void 0 === r11 && (r11 = { type: void 0, texture: void 0 }, L2[n11] = r11), (r11.type !== t11 || r11.texture !== i11) && (I2 !== n11 && (e10.activeTexture(n11), I2 = n11), e10.bindTexture(t11, i11 || B2[t11]), r11.type = t11, r11.texture = i11);
    }, unbindTexture: function() {
      let t11 = L2[I2];
      void 0 !== t11 && void 0 !== t11.type && (e10.bindTexture(t11.type, null), t11.type = void 0, t11.texture = void 0);
    }, compressedTexImage2D: function() {
      try {
        e10.compressedTexImage2D(...arguments);
      } catch (e11) {
        console.error("THREE.WebGLState:", e11);
      }
    }, compressedTexImage3D: function() {
      try {
        e10.compressedTexImage3D(...arguments);
      } catch (e11) {
        console.error("THREE.WebGLState:", e11);
      }
    }, texImage2D: function() {
      try {
        e10.texImage2D(...arguments);
      } catch (e11) {
        console.error("THREE.WebGLState:", e11);
      }
    }, texImage3D: function() {
      try {
        e10.texImage3D(...arguments);
      } catch (e11) {
        console.error("THREE.WebGLState:", e11);
      }
    }, updateUBOMapping: function(t11, i11) {
      let n11 = s2.get(i11);
      void 0 === n11 && (n11 = /* @__PURE__ */ new WeakMap(), s2.set(i11, n11));
      let r11 = n11.get(t11);
      void 0 === r11 && (r11 = e10.getUniformBlockIndex(i11, t11.name), n11.set(t11, r11));
    }, uniformBlockBinding: function(t11, i11) {
      let n11 = s2.get(i11).get(t11);
      a10.get(i11) !== n11 && (e10.uniformBlockBinding(i11, n11, t11.__bindingPointIndex), a10.set(i11, n11));
    }, texStorage2D: function() {
      try {
        e10.texStorage2D(...arguments);
      } catch (e11) {
        console.error("THREE.WebGLState:", e11);
      }
    }, texStorage3D: function() {
      try {
        e10.texStorage3D(...arguments);
      } catch (e11) {
        console.error("THREE.WebGLState:", e11);
      }
    }, texSubImage2D: function() {
      try {
        e10.texSubImage2D(...arguments);
      } catch (e11) {
        console.error("THREE.WebGLState:", e11);
      }
    }, texSubImage3D: function() {
      try {
        e10.texSubImage3D(...arguments);
      } catch (e11) {
        console.error("THREE.WebGLState:", e11);
      }
    }, compressedTexSubImage2D: function() {
      try {
        e10.compressedTexSubImage2D(...arguments);
      } catch (e11) {
        console.error("THREE.WebGLState:", e11);
      }
    }, compressedTexSubImage3D: function() {
      try {
        e10.compressedTexSubImage3D(...arguments);
      } catch (e11) {
        console.error("THREE.WebGLState:", e11);
      }
    }, scissor: function(t11) {
      false === N2.equals(t11) && (e10.scissor(t11.x, t11.y, t11.z, t11.w), N2.copy(t11));
    }, viewport: function(t11) {
      false === O2.equals(t11) && (e10.viewport(t11.x, t11.y, t11.z, t11.w), O2.copy(t11));
    }, reset: function() {
      e10.disable(e10.BLEND), e10.disable(e10.CULL_FACE), e10.disable(e10.DEPTH_TEST), e10.disable(e10.POLYGON_OFFSET_FILL), e10.disable(e10.SCISSOR_TEST), e10.disable(e10.STENCIL_TEST), e10.disable(e10.SAMPLE_ALPHA_TO_COVERAGE), e10.blendEquation(e10.FUNC_ADD), e10.blendFunc(e10.ONE, e10.ZERO), e10.blendFuncSeparate(e10.ONE, e10.ZERO, e10.ONE, e10.ZERO), e10.blendColor(0, 0, 0, 0), e10.colorMask(true, true, true, true), e10.clearColor(0, 0, 0, 0), e10.depthMask(true), e10.depthFunc(e10.LESS), n10.setReversed(false), e10.clearDepth(1), e10.stencilMask(4294967295), e10.stencilFunc(e10.ALWAYS, 0, 4294967295), e10.stencilOp(e10.KEEP, e10.KEEP, e10.KEEP), e10.clearStencil(0), e10.cullFace(e10.BACK), e10.frontFace(e10.CCW), e10.polygonOffset(0, 0), e10.activeTexture(e10.TEXTURE0), e10.bindFramebuffer(e10.FRAMEBUFFER, null), e10.bindFramebuffer(e10.DRAW_FRAMEBUFFER, null), e10.bindFramebuffer(e10.READ_FRAMEBUFFER, null), e10.useProgram(null), e10.lineWidth(1), e10.scissor(0, 0, e10.canvas.width, e10.canvas.height), e10.viewport(0, 0, e10.canvas.width, e10.canvas.height), o2 = {}, I2 = null, L2 = {}, l2 = {}, h2 = /* @__PURE__ */ new WeakMap(), c2 = [], u2 = null, d2 = false, p2 = null, f2 = null, m2 = null, g2 = null, _2 = null, v2 = null, x2 = null, y2 = new tl(0, 0, 0), M2 = 0, S2 = false, E2 = null, T2 = null, b2 = null, A2 = null, w2 = null, N2.set(0, 0, e10.canvas.width, e10.canvas.height), O2.set(0, 0, e10.canvas.width, e10.canvas.height), i10.reset(), n10.reset(), r10.reset();
    } };
  }
  function a0(e10, t10, i10, n10, r10, a10, s2) {
    let o2, u2 = t10.has("WEBGL_multisampled_render_to_texture") ? t10.get("WEBGL_multisampled_render_to_texture") : null, d2 = "u" > typeof navigator && /OculusBrowser/g.test(navigator.userAgent), p2 = new E(), f2 = /* @__PURE__ */ new WeakMap(), m2 = /* @__PURE__ */ new WeakMap(), g2 = false;
    try {
      g2 = "u" > typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext("2d");
    } catch (e11) {
    }
    function _2(e11, t11) {
      return g2 ? new OffscreenCanvas(e11, t11) : I("canvas");
    }
    function v2(e11, t11, i11) {
      let n11 = 1, r11 = Y2(e11);
      if ((r11.width > i11 || r11.height > i11) && (n11 = i11 / Math.max(r11.width, r11.height)), n11 < 1) if ("u" > typeof HTMLImageElement && e11 instanceof HTMLImageElement || "u" > typeof HTMLCanvasElement && e11 instanceof HTMLCanvasElement || "u" > typeof ImageBitmap && e11 instanceof ImageBitmap || "u" > typeof VideoFrame && e11 instanceof VideoFrame) {
        let i12 = Math.floor(n11 * r11.width), a11 = Math.floor(n11 * r11.height);
        void 0 === o2 && (o2 = _2(i12, a11));
        let s3 = t11 ? _2(i12, a11) : o2;
        return s3.width = i12, s3.height = a11, s3.getContext("2d").drawImage(e11, 0, 0, i12, a11), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + r11.width + "x" + r11.height + ") to (" + i12 + "x" + a11 + ")."), s3;
      } else "data" in e11 && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + r11.width + "x" + r11.height + ").");
      return e11;
    }
    function x2(e11) {
      return e11.generateMipmaps;
    }
    function y2(t11) {
      e10.generateMipmap(t11);
    }
    function M2(i11, n11, r11, a11, s3 = false) {
      if (null !== i11) {
        if (void 0 !== e10[i11]) return e10[i11];
        console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + i11 + "'");
      }
      let o3 = n11;
      if (n11 === e10.RED && (r11 === e10.FLOAT && (o3 = e10.R32F), r11 === e10.HALF_FLOAT && (o3 = e10.R16F), r11 === e10.UNSIGNED_BYTE && (o3 = e10.R8)), n11 === e10.RED_INTEGER && (r11 === e10.UNSIGNED_BYTE && (o3 = e10.R8UI), r11 === e10.UNSIGNED_SHORT && (o3 = e10.R16UI), r11 === e10.UNSIGNED_INT && (o3 = e10.R32UI), r11 === e10.BYTE && (o3 = e10.R8I), r11 === e10.SHORT && (o3 = e10.R16I), r11 === e10.INT && (o3 = e10.R32I)), n11 === e10.RG && (r11 === e10.FLOAT && (o3 = e10.RG32F), r11 === e10.HALF_FLOAT && (o3 = e10.RG16F), r11 === e10.UNSIGNED_BYTE && (o3 = e10.RG8)), n11 === e10.RG_INTEGER && (r11 === e10.UNSIGNED_BYTE && (o3 = e10.RG8UI), r11 === e10.UNSIGNED_SHORT && (o3 = e10.RG16UI), r11 === e10.UNSIGNED_INT && (o3 = e10.RG32UI), r11 === e10.BYTE && (o3 = e10.RG8I), r11 === e10.SHORT && (o3 = e10.RG16I), r11 === e10.INT && (o3 = e10.RG32I)), n11 === e10.RGB_INTEGER && (r11 === e10.UNSIGNED_BYTE && (o3 = e10.RGB8UI), r11 === e10.UNSIGNED_SHORT && (o3 = e10.RGB16UI), r11 === e10.UNSIGNED_INT && (o3 = e10.RGB32UI), r11 === e10.BYTE && (o3 = e10.RGB8I), r11 === e10.SHORT && (o3 = e10.RGB16I), r11 === e10.INT && (o3 = e10.RGB32I)), n11 === e10.RGBA_INTEGER && (r11 === e10.UNSIGNED_BYTE && (o3 = e10.RGBA8UI), r11 === e10.UNSIGNED_SHORT && (o3 = e10.RGBA16UI), r11 === e10.UNSIGNED_INT && (o3 = e10.RGBA32UI), r11 === e10.BYTE && (o3 = e10.RGBA8I), r11 === e10.SHORT && (o3 = e10.RGBA16I), r11 === e10.INT && (o3 = e10.RGBA32I)), n11 === e10.RGB && (r11 === e10.UNSIGNED_INT_5_9_9_9_REV && (o3 = e10.RGB9_E5), r11 === e10.UNSIGNED_INT_10F_11F_11F_REV && (o3 = e10.R11F_G11F_B10F)), n11 === e10.RGBA) {
        let t11 = s3 ? h : B.getTransfer(a11);
        r11 === e10.FLOAT && (o3 = e10.RGBA32F), r11 === e10.HALF_FLOAT && (o3 = e10.RGBA16F), r11 === e10.UNSIGNED_BYTE && (o3 = t11 === c ? e10.SRGB8_ALPHA8 : e10.RGBA8), r11 === e10.UNSIGNED_SHORT_4_4_4_4 && (o3 = e10.RGBA4), r11 === e10.UNSIGNED_SHORT_5_5_5_1 && (o3 = e10.RGB5_A1);
      }
      return (o3 === e10.R16F || o3 === e10.R32F || o3 === e10.RG16F || o3 === e10.RG32F || o3 === e10.RGBA16F || o3 === e10.RGBA32F) && t10.get("EXT_color_buffer_float"), o3;
    }
    function S2(t11, i11) {
      let n11;
      return t11 ? null === i11 || 1014 === i11 || 1020 === i11 ? n11 = e10.DEPTH24_STENCIL8 : 1015 === i11 ? n11 = e10.DEPTH32F_STENCIL8 : 1012 === i11 && (n11 = e10.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : null === i11 || 1014 === i11 || 1020 === i11 ? n11 = e10.DEPTH_COMPONENT24 : 1015 === i11 ? n11 = e10.DEPTH_COMPONENT32F : 1012 === i11 && (n11 = e10.DEPTH_COMPONENT16), n11;
    }
    function T2(e11, t11) {
      return true === x2(e11) || e11.isFramebufferTexture && 1003 !== e11.minFilter && 1006 !== e11.minFilter ? Math.log2(Math.max(t11.width, t11.height)) + 1 : void 0 !== e11.mipmaps && e11.mipmaps.length > 0 ? e11.mipmaps.length : e11.isCompressedTexture && Array.isArray(e11.image) ? t11.mipmaps.length : 1;
    }
    function b2(e11) {
      let t11 = e11.target;
      t11.removeEventListener("dispose", b2), (function(e12) {
        let t12 = n10.get(e12);
        if (void 0 === t12.__webglInit) return;
        let i11 = e12.source, r11 = m2.get(i11);
        if (r11) {
          let n11 = r11[t12.__cacheKey];
          n11.usedTimes--, 0 === n11.usedTimes && w2(e12), 0 === Object.keys(r11).length && m2.delete(i11);
        }
        n10.remove(e12);
      })(t11), t11.isVideoTexture && f2.delete(t11);
    }
    function A2(t11) {
      let i11 = t11.target;
      i11.removeEventListener("dispose", A2), (function(t12) {
        let i12 = n10.get(t12);
        if (t12.depthTexture && (t12.depthTexture.dispose(), n10.remove(t12.depthTexture)), t12.isWebGLCubeRenderTarget) for (let t13 = 0; t13 < 6; t13++) {
          if (Array.isArray(i12.__webglFramebuffer[t13])) for (let n11 = 0; n11 < i12.__webglFramebuffer[t13].length; n11++) e10.deleteFramebuffer(i12.__webglFramebuffer[t13][n11]);
          else e10.deleteFramebuffer(i12.__webglFramebuffer[t13]);
          i12.__webglDepthbuffer && e10.deleteRenderbuffer(i12.__webglDepthbuffer[t13]);
        }
        else {
          if (Array.isArray(i12.__webglFramebuffer)) for (let t13 = 0; t13 < i12.__webglFramebuffer.length; t13++) e10.deleteFramebuffer(i12.__webglFramebuffer[t13]);
          else e10.deleteFramebuffer(i12.__webglFramebuffer);
          if (i12.__webglDepthbuffer && e10.deleteRenderbuffer(i12.__webglDepthbuffer), i12.__webglMultisampledFramebuffer && e10.deleteFramebuffer(i12.__webglMultisampledFramebuffer), i12.__webglColorRenderbuffer) for (let t13 = 0; t13 < i12.__webglColorRenderbuffer.length; t13++) i12.__webglColorRenderbuffer[t13] && e10.deleteRenderbuffer(i12.__webglColorRenderbuffer[t13]);
          i12.__webglDepthRenderbuffer && e10.deleteRenderbuffer(i12.__webglDepthRenderbuffer);
        }
        let r11 = t12.textures;
        for (let t13 = 0, i13 = r11.length; t13 < i13; t13++) {
          let i14 = n10.get(r11[t13]);
          i14.__webglTexture && (e10.deleteTexture(i14.__webglTexture), s2.memory.textures--), n10.remove(r11[t13]);
        }
        n10.remove(t12);
      })(i11);
    }
    function w2(t11) {
      let i11 = n10.get(t11);
      e10.deleteTexture(i11.__webglTexture);
      let r11 = t11.source, a11 = m2.get(r11);
      delete a11[i11.__cacheKey], s2.memory.textures--;
    }
    let R2 = 0;
    function C2(t11, r11) {
      var a11;
      let o3, l2 = n10.get(t11);
      if (t11.isVideoTexture && (a11 = t11, o3 = s2.render.frame, f2.get(a11) !== o3 && (f2.set(a11, o3), a11.update())), false === t11.isRenderTargetTexture && true !== t11.isExternalTexture && t11.version > 0 && l2.__version !== t11.version) {
        let e11 = t11.image;
        if (null === e11) console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
        else {
          if (false !== e11.complete) return void F2(l2, t11, r11);
          console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
        }
      } else t11.isExternalTexture && (l2.__webglTexture = t11.sourceTexture ? t11.sourceTexture : null);
      i10.bindTexture(e10.TEXTURE_2D, l2.__webglTexture, e10.TEXTURE0 + r11);
    }
    let P2 = { 1e3: e10.REPEAT, 1001: e10.CLAMP_TO_EDGE, 1002: e10.MIRRORED_REPEAT }, L2 = { 1003: e10.NEAREST, 1004: e10.NEAREST_MIPMAP_NEAREST, 1005: e10.NEAREST_MIPMAP_LINEAR, 1006: e10.LINEAR, 1007: e10.LINEAR_MIPMAP_NEAREST, 1008: e10.LINEAR_MIPMAP_LINEAR }, U2 = { 512: e10.NEVER, 519: e10.ALWAYS, 513: e10.LESS, 515: e10.LEQUAL, 514: e10.EQUAL, 518: e10.GEQUAL, 516: e10.GREATER, 517: e10.NOTEQUAL };
    function D2(i11, a11) {
      if ((1015 === a11.type && false === t10.has("OES_texture_float_linear") && (1006 === a11.magFilter || 1007 === a11.magFilter || 1005 === a11.magFilter || 1008 === a11.magFilter || 1006 === a11.minFilter || 1007 === a11.minFilter || 1005 === a11.minFilter || 1008 === a11.minFilter) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e10.texParameteri(i11, e10.TEXTURE_WRAP_S, P2[a11.wrapS]), e10.texParameteri(i11, e10.TEXTURE_WRAP_T, P2[a11.wrapT]), (i11 === e10.TEXTURE_3D || i11 === e10.TEXTURE_2D_ARRAY) && e10.texParameteri(i11, e10.TEXTURE_WRAP_R, P2[a11.wrapR]), e10.texParameteri(i11, e10.TEXTURE_MAG_FILTER, L2[a11.magFilter]), e10.texParameteri(i11, e10.TEXTURE_MIN_FILTER, L2[a11.minFilter]), a11.compareFunction && (e10.texParameteri(i11, e10.TEXTURE_COMPARE_MODE, e10.COMPARE_REF_TO_TEXTURE), e10.texParameteri(i11, e10.TEXTURE_COMPARE_FUNC, U2[a11.compareFunction])), true === t10.has("EXT_texture_filter_anisotropic")) && 1003 !== a11.magFilter && (1005 === a11.minFilter || 1008 === a11.minFilter) && (1015 !== a11.type || false !== t10.has("OES_texture_float_linear")) && (a11.anisotropy > 1 || n10.get(a11).__currentAnisotropy)) {
        let s3 = t10.get("EXT_texture_filter_anisotropic");
        e10.texParameterf(i11, s3.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a11.anisotropy, r10.getMaxAnisotropy())), n10.get(a11).__currentAnisotropy = a11.anisotropy;
      }
    }
    function N2(t11, i11) {
      let n11, r11 = false;
      void 0 === t11.__webglInit && (t11.__webglInit = true, i11.addEventListener("dispose", b2));
      let a11 = i11.source, o3 = m2.get(a11);
      void 0 === o3 && (o3 = {}, m2.set(a11, o3));
      let l2 = ((n11 = []).push(i11.wrapS), n11.push(i11.wrapT), n11.push(i11.wrapR || 0), n11.push(i11.magFilter), n11.push(i11.minFilter), n11.push(i11.anisotropy), n11.push(i11.internalFormat), n11.push(i11.format), n11.push(i11.type), n11.push(i11.generateMipmaps), n11.push(i11.premultiplyAlpha), n11.push(i11.flipY), n11.push(i11.unpackAlignment), n11.push(i11.colorSpace), n11.join());
      if (l2 !== t11.__cacheKey) {
        void 0 === o3[l2] && (o3[l2] = { texture: e10.createTexture(), usedTimes: 0 }, s2.memory.textures++, r11 = true), o3[l2].usedTimes++;
        let n12 = o3[t11.__cacheKey];
        void 0 !== n12 && (o3[t11.__cacheKey].usedTimes--, 0 === n12.usedTimes && w2(i11)), t11.__cacheKey = l2, t11.__webglTexture = o3[l2].texture;
      }
      return r11;
    }
    function O2(e11, t11, i11) {
      return Math.floor(Math.floor(e11 / i11) / t11);
    }
    function F2(t11, s3, o3) {
      let l2 = e10.TEXTURE_2D;
      (s3.isDataArrayTexture || s3.isCompressedArrayTexture) && (l2 = e10.TEXTURE_2D_ARRAY), s3.isData3DTexture && (l2 = e10.TEXTURE_3D);
      let h2 = N2(t11, s3), c2 = s3.source;
      i10.bindTexture(l2, t11.__webglTexture, e10.TEXTURE0 + o3);
      let u3 = n10.get(c2);
      if (c2.version !== u3.__version || true === h2) {
        let t12;
        i10.activeTexture(e10.TEXTURE0 + o3);
        let n11 = B.getPrimaries(B.workingColorSpace), d3 = "" === s3.colorSpace ? null : B.getPrimaries(s3.colorSpace), p3 = "" === s3.colorSpace || n11 === d3 ? e10.NONE : e10.BROWSER_DEFAULT_WEBGL;
        e10.pixelStorei(e10.UNPACK_FLIP_Y_WEBGL, s3.flipY), e10.pixelStorei(e10.UNPACK_PREMULTIPLY_ALPHA_WEBGL, s3.premultiplyAlpha), e10.pixelStorei(e10.UNPACK_ALIGNMENT, s3.unpackAlignment), e10.pixelStorei(e10.UNPACK_COLORSPACE_CONVERSION_WEBGL, p3);
        let f3 = v2(s3.image, false, r10.maxTextureSize);
        f3 = q2(s3, f3);
        let m3 = a10.convert(s3.format, s3.colorSpace), g3 = a10.convert(s3.type), _3 = M2(s3.internalFormat, m3, g3, s3.colorSpace, s3.isVideoTexture);
        D2(l2, s3);
        let E2 = s3.mipmaps, b3 = true !== s3.isVideoTexture, A3 = void 0 === u3.__version || true === h2, w3 = c2.dataReady, R3 = T2(s3, f3);
        if (s3.isDepthTexture) _3 = S2(1027 === s3.format, s3.type), A3 && (b3 ? i10.texStorage2D(e10.TEXTURE_2D, 1, _3, f3.width, f3.height) : i10.texImage2D(e10.TEXTURE_2D, 0, _3, f3.width, f3.height, 0, m3, g3, null));
        else if (s3.isDataTexture) if (E2.length > 0) {
          b3 && A3 && i10.texStorage2D(e10.TEXTURE_2D, R3, _3, E2[0].width, E2[0].height);
          for (let n12 = 0, r11 = E2.length; n12 < r11; n12++) t12 = E2[n12], b3 ? w3 && i10.texSubImage2D(e10.TEXTURE_2D, n12, 0, 0, t12.width, t12.height, m3, g3, t12.data) : i10.texImage2D(e10.TEXTURE_2D, n12, _3, t12.width, t12.height, 0, m3, g3, t12.data);
          s3.generateMipmaps = false;
        } else b3 ? (A3 && i10.texStorage2D(e10.TEXTURE_2D, R3, _3, f3.width, f3.height), w3 && (function(t13, n12, r11, a11) {
          let s4 = t13.updateRanges;
          if (0 === s4.length) i10.texSubImage2D(e10.TEXTURE_2D, 0, 0, 0, n12.width, n12.height, r11, a11, n12.data);
          else {
            s4.sort((e11, t14) => e11.start - t14.start);
            let o4 = 0;
            for (let e11 = 1; e11 < s4.length; e11++) {
              let t14 = s4[o4], i11 = s4[e11], r12 = t14.start + t14.count, a12 = O2(i11.start, n12.width, 4), l4 = O2(t14.start, n12.width, 4);
              i11.start <= r12 + 1 && a12 === l4 && O2(i11.start + i11.count - 1, n12.width, 4) === a12 ? t14.count = Math.max(t14.count, i11.start + i11.count - t14.start) : s4[++o4] = i11;
            }
            s4.length = o4 + 1;
            let l3 = e10.getParameter(e10.UNPACK_ROW_LENGTH), h3 = e10.getParameter(e10.UNPACK_SKIP_PIXELS), c3 = e10.getParameter(e10.UNPACK_SKIP_ROWS);
            e10.pixelStorei(e10.UNPACK_ROW_LENGTH, n12.width);
            for (let t14 = 0, o5 = s4.length; t14 < o5; t14++) {
              let o6 = s4[t14], l4 = Math.floor(o6.start / 4), h4 = Math.ceil(o6.count / 4), c4 = l4 % n12.width, u4 = Math.floor(l4 / n12.width);
              e10.pixelStorei(e10.UNPACK_SKIP_PIXELS, c4), e10.pixelStorei(e10.UNPACK_SKIP_ROWS, u4), i10.texSubImage2D(e10.TEXTURE_2D, 0, c4, u4, h4, 1, r11, a11, n12.data);
            }
            t13.clearUpdateRanges(), e10.pixelStorei(e10.UNPACK_ROW_LENGTH, l3), e10.pixelStorei(e10.UNPACK_SKIP_PIXELS, h3), e10.pixelStorei(e10.UNPACK_SKIP_ROWS, c3);
          }
        })(s3, f3, m3, g3)) : i10.texImage2D(e10.TEXTURE_2D, 0, _3, f3.width, f3.height, 0, m3, g3, f3.data);
        else if (s3.isCompressedTexture) if (s3.isCompressedArrayTexture) {
          b3 && A3 && i10.texStorage3D(e10.TEXTURE_2D_ARRAY, R3, _3, E2[0].width, E2[0].height, f3.depth);
          for (let n12 = 0, r11 = E2.length; n12 < r11; n12++) if (t12 = E2[n12], 1023 !== s3.format) if (null !== m3) if (b3) {
            if (w3) if (s3.layerUpdates.size > 0) {
              let r12 = nJ(t12.width, t12.height, s3.format, s3.type);
              for (let a11 of s3.layerUpdates) {
                let s4 = t12.data.subarray(a11 * r12 / t12.data.BYTES_PER_ELEMENT, (a11 + 1) * r12 / t12.data.BYTES_PER_ELEMENT);
                i10.compressedTexSubImage3D(e10.TEXTURE_2D_ARRAY, n12, 0, 0, a11, t12.width, t12.height, 1, m3, s4);
              }
              s3.clearLayerUpdates();
            } else i10.compressedTexSubImage3D(e10.TEXTURE_2D_ARRAY, n12, 0, 0, 0, t12.width, t12.height, f3.depth, m3, t12.data);
          } else i10.compressedTexImage3D(e10.TEXTURE_2D_ARRAY, n12, _3, t12.width, t12.height, f3.depth, 0, t12.data, 0, 0);
          else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          else b3 ? w3 && i10.texSubImage3D(e10.TEXTURE_2D_ARRAY, n12, 0, 0, 0, t12.width, t12.height, f3.depth, m3, g3, t12.data) : i10.texImage3D(e10.TEXTURE_2D_ARRAY, n12, _3, t12.width, t12.height, f3.depth, 0, m3, g3, t12.data);
        } else {
          b3 && A3 && i10.texStorage2D(e10.TEXTURE_2D, R3, _3, E2[0].width, E2[0].height);
          for (let n12 = 0, r11 = E2.length; n12 < r11; n12++) t12 = E2[n12], 1023 !== s3.format ? null !== m3 ? b3 ? w3 && i10.compressedTexSubImage2D(e10.TEXTURE_2D, n12, 0, 0, t12.width, t12.height, m3, t12.data) : i10.compressedTexImage2D(e10.TEXTURE_2D, n12, _3, t12.width, t12.height, 0, t12.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : b3 ? w3 && i10.texSubImage2D(e10.TEXTURE_2D, n12, 0, 0, t12.width, t12.height, m3, g3, t12.data) : i10.texImage2D(e10.TEXTURE_2D, n12, _3, t12.width, t12.height, 0, m3, g3, t12.data);
        }
        else if (s3.isDataArrayTexture) if (b3) {
          if (A3 && i10.texStorage3D(e10.TEXTURE_2D_ARRAY, R3, _3, f3.width, f3.height, f3.depth), w3) if (s3.layerUpdates.size > 0) {
            let t13 = nJ(f3.width, f3.height, s3.format, s3.type);
            for (let n12 of s3.layerUpdates) {
              let r11 = f3.data.subarray(n12 * t13 / f3.data.BYTES_PER_ELEMENT, (n12 + 1) * t13 / f3.data.BYTES_PER_ELEMENT);
              i10.texSubImage3D(e10.TEXTURE_2D_ARRAY, 0, 0, 0, n12, f3.width, f3.height, 1, m3, g3, r11);
            }
            s3.clearLayerUpdates();
          } else i10.texSubImage3D(e10.TEXTURE_2D_ARRAY, 0, 0, 0, 0, f3.width, f3.height, f3.depth, m3, g3, f3.data);
        } else i10.texImage3D(e10.TEXTURE_2D_ARRAY, 0, _3, f3.width, f3.height, f3.depth, 0, m3, g3, f3.data);
        else if (s3.isData3DTexture) b3 ? (A3 && i10.texStorage3D(e10.TEXTURE_3D, R3, _3, f3.width, f3.height, f3.depth), w3 && i10.texSubImage3D(e10.TEXTURE_3D, 0, 0, 0, 0, f3.width, f3.height, f3.depth, m3, g3, f3.data)) : i10.texImage3D(e10.TEXTURE_3D, 0, _3, f3.width, f3.height, f3.depth, 0, m3, g3, f3.data);
        else if (s3.isFramebufferTexture) {
          if (A3) if (b3) i10.texStorage2D(e10.TEXTURE_2D, R3, _3, f3.width, f3.height);
          else {
            let t13 = f3.width, n12 = f3.height;
            for (let r11 = 0; r11 < R3; r11++) i10.texImage2D(e10.TEXTURE_2D, r11, _3, t13, n12, 0, m3, g3, null), t13 >>= 1, n12 >>= 1;
          }
        } else if (E2.length > 0) {
          if (b3 && A3) {
            let t13 = Y2(E2[0]);
            i10.texStorage2D(e10.TEXTURE_2D, R3, _3, t13.width, t13.height);
          }
          for (let n12 = 0, r11 = E2.length; n12 < r11; n12++) t12 = E2[n12], b3 ? w3 && i10.texSubImage2D(e10.TEXTURE_2D, n12, 0, 0, m3, g3, t12) : i10.texImage2D(e10.TEXTURE_2D, n12, _3, m3, g3, t12);
          s3.generateMipmaps = false;
        } else if (b3) {
          if (A3) {
            let t13 = Y2(f3);
            i10.texStorage2D(e10.TEXTURE_2D, R3, _3, t13.width, t13.height);
          }
          w3 && i10.texSubImage2D(e10.TEXTURE_2D, 0, 0, 0, m3, g3, f3);
        } else i10.texImage2D(e10.TEXTURE_2D, 0, _3, m3, g3, f3);
        x2(s3) && y2(l2), u3.__version = c2.version, s3.onUpdate && s3.onUpdate(s3);
      }
      t11.__version = s3.version;
    }
    function z2(t11, r11, s3, o3, l2, h2) {
      let c2 = a10.convert(s3.format, s3.colorSpace), d3 = a10.convert(s3.type), p3 = M2(s3.internalFormat, c2, d3, s3.colorSpace), f3 = n10.get(r11), m3 = n10.get(s3);
      if (m3.__renderTarget = r11, !f3.__hasExternalTextures) {
        let t12 = Math.max(1, r11.width >> h2), n11 = Math.max(1, r11.height >> h2);
        l2 === e10.TEXTURE_3D || l2 === e10.TEXTURE_2D_ARRAY ? i10.texImage3D(l2, h2, p3, t12, n11, r11.depth, 0, c2, d3, null) : i10.texImage2D(l2, h2, p3, t12, n11, 0, c2, d3, null);
      }
      i10.bindFramebuffer(e10.FRAMEBUFFER, t11), j2(r11) ? u2.framebufferTexture2DMultisampleEXT(e10.FRAMEBUFFER, o3, l2, m3.__webglTexture, 0, X2(r11)) : (l2 === e10.TEXTURE_2D || l2 >= e10.TEXTURE_CUBE_MAP_POSITIVE_X && l2 <= e10.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e10.framebufferTexture2D(e10.FRAMEBUFFER, o3, l2, m3.__webglTexture, h2), i10.bindFramebuffer(e10.FRAMEBUFFER, null);
    }
    function V2(t11, i11, n11) {
      if (e10.bindRenderbuffer(e10.RENDERBUFFER, t11), i11.depthBuffer) {
        let r11 = i11.depthTexture, a11 = r11 && r11.isDepthTexture ? r11.type : null, s3 = S2(i11.stencilBuffer, a11), o3 = i11.stencilBuffer ? e10.DEPTH_STENCIL_ATTACHMENT : e10.DEPTH_ATTACHMENT, l2 = X2(i11);
        j2(i11) ? u2.renderbufferStorageMultisampleEXT(e10.RENDERBUFFER, l2, s3, i11.width, i11.height) : n11 ? e10.renderbufferStorageMultisample(e10.RENDERBUFFER, l2, s3, i11.width, i11.height) : e10.renderbufferStorage(e10.RENDERBUFFER, s3, i11.width, i11.height), e10.framebufferRenderbuffer(e10.FRAMEBUFFER, o3, e10.RENDERBUFFER, t11);
      } else {
        let t12 = i11.textures;
        for (let r11 = 0; r11 < t12.length; r11++) {
          let s3 = t12[r11], o3 = a10.convert(s3.format, s3.colorSpace), l2 = a10.convert(s3.type), h2 = M2(s3.internalFormat, o3, l2, s3.colorSpace), c2 = X2(i11);
          n11 && false === j2(i11) ? e10.renderbufferStorageMultisample(e10.RENDERBUFFER, c2, h2, i11.width, i11.height) : j2(i11) ? u2.renderbufferStorageMultisampleEXT(e10.RENDERBUFFER, c2, h2, i11.width, i11.height) : e10.renderbufferStorage(e10.RENDERBUFFER, h2, i11.width, i11.height);
        }
      }
      e10.bindRenderbuffer(e10.RENDERBUFFER, null);
    }
    function H2(t11, r11) {
      if (r11 && r11.isWebGLCubeRenderTarget) throw Error("Depth Texture with cube render targets is not supported");
      if (i10.bindFramebuffer(e10.FRAMEBUFFER, t11), !(r11.depthTexture && r11.depthTexture.isDepthTexture)) throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
      let a11 = n10.get(r11.depthTexture);
      a11.__renderTarget = r11, a11.__webglTexture && r11.depthTexture.image.width === r11.width && r11.depthTexture.image.height === r11.height || (r11.depthTexture.image.width = r11.width, r11.depthTexture.image.height = r11.height, r11.depthTexture.needsUpdate = true), C2(r11.depthTexture, 0);
      let s3 = a11.__webglTexture, o3 = X2(r11);
      if (1026 === r11.depthTexture.format) j2(r11) ? u2.framebufferTexture2DMultisampleEXT(e10.FRAMEBUFFER, e10.DEPTH_ATTACHMENT, e10.TEXTURE_2D, s3, 0, o3) : e10.framebufferTexture2D(e10.FRAMEBUFFER, e10.DEPTH_ATTACHMENT, e10.TEXTURE_2D, s3, 0);
      else if (1027 === r11.depthTexture.format) j2(r11) ? u2.framebufferTexture2DMultisampleEXT(e10.FRAMEBUFFER, e10.DEPTH_STENCIL_ATTACHMENT, e10.TEXTURE_2D, s3, 0, o3) : e10.framebufferTexture2D(e10.FRAMEBUFFER, e10.DEPTH_STENCIL_ATTACHMENT, e10.TEXTURE_2D, s3, 0);
      else throw Error("Unknown depthTexture format");
    }
    function k2(t11) {
      let r11 = n10.get(t11), a11 = true === t11.isWebGLCubeRenderTarget;
      if (r11.__boundDepthTexture !== t11.depthTexture) {
        let e11 = t11.depthTexture;
        if (r11.__depthDisposeCallback && r11.__depthDisposeCallback(), e11) {
          let t12 = () => {
            delete r11.__boundDepthTexture, delete r11.__depthDisposeCallback, e11.removeEventListener("dispose", t12);
          };
          e11.addEventListener("dispose", t12), r11.__depthDisposeCallback = t12;
        }
        r11.__boundDepthTexture = e11;
      }
      if (t11.depthTexture && !r11.__autoAllocateDepthBuffer) {
        if (a11) throw Error("target.depthTexture not supported in Cube render targets");
        let e11 = t11.texture.mipmaps;
        e11 && e11.length > 0 ? H2(r11.__webglFramebuffer[0], t11) : H2(r11.__webglFramebuffer, t11);
      } else if (a11) {
        r11.__webglDepthbuffer = [];
        for (let n11 = 0; n11 < 6; n11++) if (i10.bindFramebuffer(e10.FRAMEBUFFER, r11.__webglFramebuffer[n11]), void 0 === r11.__webglDepthbuffer[n11]) r11.__webglDepthbuffer[n11] = e10.createRenderbuffer(), V2(r11.__webglDepthbuffer[n11], t11, false);
        else {
          let i11 = t11.stencilBuffer ? e10.DEPTH_STENCIL_ATTACHMENT : e10.DEPTH_ATTACHMENT, a12 = r11.__webglDepthbuffer[n11];
          e10.bindRenderbuffer(e10.RENDERBUFFER, a12), e10.framebufferRenderbuffer(e10.FRAMEBUFFER, i11, e10.RENDERBUFFER, a12);
        }
      } else {
        let n11 = t11.texture.mipmaps;
        if (n11 && n11.length > 0 ? i10.bindFramebuffer(e10.FRAMEBUFFER, r11.__webglFramebuffer[0]) : i10.bindFramebuffer(e10.FRAMEBUFFER, r11.__webglFramebuffer), void 0 === r11.__webglDepthbuffer) r11.__webglDepthbuffer = e10.createRenderbuffer(), V2(r11.__webglDepthbuffer, t11, false);
        else {
          let i11 = t11.stencilBuffer ? e10.DEPTH_STENCIL_ATTACHMENT : e10.DEPTH_ATTACHMENT, n12 = r11.__webglDepthbuffer;
          e10.bindRenderbuffer(e10.RENDERBUFFER, n12), e10.framebufferRenderbuffer(e10.FRAMEBUFFER, i11, e10.RENDERBUFFER, n12);
        }
      }
      i10.bindFramebuffer(e10.FRAMEBUFFER, null);
    }
    let G2 = [], W2 = [];
    function X2(e11) {
      return Math.min(r10.maxSamples, e11.samples);
    }
    function j2(e11) {
      let i11 = n10.get(e11);
      return e11.samples > 0 && true === t10.has("WEBGL_multisampled_render_to_texture") && false !== i11.__useRenderToTexture;
    }
    function q2(e11, t11) {
      let i11 = e11.colorSpace, n11 = e11.format, r11 = e11.type;
      return true === e11.isCompressedTexture || true === e11.isVideoTexture || i11 !== l && "" !== i11 && (B.getTransfer(i11) === c ? (1023 !== n11 || 1009 !== r11) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", i11)), t11;
    }
    function Y2(e11) {
      return "u" > typeof HTMLImageElement && e11 instanceof HTMLImageElement ? (p2.width = e11.naturalWidth || e11.width, p2.height = e11.naturalHeight || e11.height) : "u" > typeof VideoFrame && e11 instanceof VideoFrame ? (p2.width = e11.displayWidth, p2.height = e11.displayHeight) : (p2.width = e11.width, p2.height = e11.height), p2;
    }
    this.allocateTextureUnit = function() {
      let e11 = R2;
      return e11 >= r10.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + e11 + " texture units while this GPU supports only " + r10.maxTextures), R2 += 1, e11;
    }, this.resetTextureUnits = function() {
      R2 = 0;
    }, this.setTexture2D = C2, this.setTexture2DArray = function(t11, r11) {
      let a11 = n10.get(t11);
      false === t11.isRenderTargetTexture && t11.version > 0 && a11.__version !== t11.version ? F2(a11, t11, r11) : i10.bindTexture(e10.TEXTURE_2D_ARRAY, a11.__webglTexture, e10.TEXTURE0 + r11);
    }, this.setTexture3D = function(t11, r11) {
      let a11 = n10.get(t11);
      false === t11.isRenderTargetTexture && t11.version > 0 && a11.__version !== t11.version ? F2(a11, t11, r11) : i10.bindTexture(e10.TEXTURE_3D, a11.__webglTexture, e10.TEXTURE0 + r11);
    }, this.setTextureCube = function(t11, s3) {
      let o3 = n10.get(t11);
      t11.version > 0 && o3.__version !== t11.version ? (function(t12, s4, o4) {
        if (6 !== s4.image.length) return;
        let l2 = N2(t12, s4), h2 = s4.source;
        i10.bindTexture(e10.TEXTURE_CUBE_MAP, t12.__webglTexture, e10.TEXTURE0 + o4);
        let c2 = n10.get(h2);
        if (h2.version !== c2.__version || true === l2) {
          let t13;
          i10.activeTexture(e10.TEXTURE0 + o4);
          let n11 = B.getPrimaries(B.workingColorSpace), u3 = "" === s4.colorSpace ? null : B.getPrimaries(s4.colorSpace), d3 = "" === s4.colorSpace || n11 === u3 ? e10.NONE : e10.BROWSER_DEFAULT_WEBGL;
          e10.pixelStorei(e10.UNPACK_FLIP_Y_WEBGL, s4.flipY), e10.pixelStorei(e10.UNPACK_PREMULTIPLY_ALPHA_WEBGL, s4.premultiplyAlpha), e10.pixelStorei(e10.UNPACK_ALIGNMENT, s4.unpackAlignment), e10.pixelStorei(e10.UNPACK_COLORSPACE_CONVERSION_WEBGL, d3);
          let p3 = s4.isCompressedTexture || s4.image[0].isCompressedTexture, f3 = s4.image[0] && s4.image[0].isDataTexture, m3 = [];
          for (let e11 = 0; e11 < 6; e11++) p3 || f3 ? m3[e11] = f3 ? s4.image[e11].image : s4.image[e11] : m3[e11] = v2(s4.image[e11], true, r10.maxCubemapSize), m3[e11] = q2(s4, m3[e11]);
          let g3 = m3[0], _3 = a10.convert(s4.format, s4.colorSpace), S3 = a10.convert(s4.type), E2 = M2(s4.internalFormat, _3, S3, s4.colorSpace), b3 = true !== s4.isVideoTexture, A3 = void 0 === c2.__version || true === l2, w3 = h2.dataReady, R3 = T2(s4, g3);
          if (D2(e10.TEXTURE_CUBE_MAP, s4), p3) {
            b3 && A3 && i10.texStorage2D(e10.TEXTURE_CUBE_MAP, R3, E2, g3.width, g3.height);
            for (let n12 = 0; n12 < 6; n12++) {
              t13 = m3[n12].mipmaps;
              for (let r11 = 0; r11 < t13.length; r11++) {
                let a11 = t13[r11];
                1023 !== s4.format ? null !== _3 ? b3 ? w3 && i10.compressedTexSubImage2D(e10.TEXTURE_CUBE_MAP_POSITIVE_X + n12, r11, 0, 0, a11.width, a11.height, _3, a11.data) : i10.compressedTexImage2D(e10.TEXTURE_CUBE_MAP_POSITIVE_X + n12, r11, E2, a11.width, a11.height, 0, a11.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : b3 ? w3 && i10.texSubImage2D(e10.TEXTURE_CUBE_MAP_POSITIVE_X + n12, r11, 0, 0, a11.width, a11.height, _3, S3, a11.data) : i10.texImage2D(e10.TEXTURE_CUBE_MAP_POSITIVE_X + n12, r11, E2, a11.width, a11.height, 0, _3, S3, a11.data);
              }
            }
          } else {
            if (t13 = s4.mipmaps, b3 && A3) {
              t13.length > 0 && R3++;
              let n12 = Y2(m3[0]);
              i10.texStorage2D(e10.TEXTURE_CUBE_MAP, R3, E2, n12.width, n12.height);
            }
            for (let n12 = 0; n12 < 6; n12++) if (f3) {
              b3 ? w3 && i10.texSubImage2D(e10.TEXTURE_CUBE_MAP_POSITIVE_X + n12, 0, 0, 0, m3[n12].width, m3[n12].height, _3, S3, m3[n12].data) : i10.texImage2D(e10.TEXTURE_CUBE_MAP_POSITIVE_X + n12, 0, E2, m3[n12].width, m3[n12].height, 0, _3, S3, m3[n12].data);
              for (let r11 = 0; r11 < t13.length; r11++) {
                let a11 = t13[r11].image[n12].image;
                b3 ? w3 && i10.texSubImage2D(e10.TEXTURE_CUBE_MAP_POSITIVE_X + n12, r11 + 1, 0, 0, a11.width, a11.height, _3, S3, a11.data) : i10.texImage2D(e10.TEXTURE_CUBE_MAP_POSITIVE_X + n12, r11 + 1, E2, a11.width, a11.height, 0, _3, S3, a11.data);
              }
            } else {
              b3 ? w3 && i10.texSubImage2D(e10.TEXTURE_CUBE_MAP_POSITIVE_X + n12, 0, 0, 0, _3, S3, m3[n12]) : i10.texImage2D(e10.TEXTURE_CUBE_MAP_POSITIVE_X + n12, 0, E2, _3, S3, m3[n12]);
              for (let r11 = 0; r11 < t13.length; r11++) {
                let a11 = t13[r11];
                b3 ? w3 && i10.texSubImage2D(e10.TEXTURE_CUBE_MAP_POSITIVE_X + n12, r11 + 1, 0, 0, _3, S3, a11.image[n12]) : i10.texImage2D(e10.TEXTURE_CUBE_MAP_POSITIVE_X + n12, r11 + 1, E2, _3, S3, a11.image[n12]);
              }
            }
          }
          x2(s4) && y2(e10.TEXTURE_CUBE_MAP), c2.__version = h2.version, s4.onUpdate && s4.onUpdate(s4);
        }
        t12.__version = s4.version;
      })(o3, t11, s3) : i10.bindTexture(e10.TEXTURE_CUBE_MAP, o3.__webglTexture, e10.TEXTURE0 + s3);
    }, this.rebindTextures = function(t11, i11, r11) {
      let a11 = n10.get(t11);
      void 0 !== i11 && z2(a11.__webglFramebuffer, t11, t11.texture, e10.COLOR_ATTACHMENT0, e10.TEXTURE_2D, 0), void 0 !== r11 && k2(t11);
    }, this.setupRenderTarget = function(t11) {
      let r11 = t11.texture, o3 = n10.get(t11), l2 = n10.get(r11);
      t11.addEventListener("dispose", A2);
      let h2 = t11.textures, c2 = true === t11.isWebGLCubeRenderTarget, u3 = h2.length > 1;
      if (!u3 && (void 0 === l2.__webglTexture && (l2.__webglTexture = e10.createTexture()), l2.__version = r11.version, s2.memory.textures++), c2) {
        o3.__webglFramebuffer = [];
        for (let t12 = 0; t12 < 6; t12++) if (r11.mipmaps && r11.mipmaps.length > 0) {
          o3.__webglFramebuffer[t12] = [];
          for (let i11 = 0; i11 < r11.mipmaps.length; i11++) o3.__webglFramebuffer[t12][i11] = e10.createFramebuffer();
        } else o3.__webglFramebuffer[t12] = e10.createFramebuffer();
      } else {
        if (r11.mipmaps && r11.mipmaps.length > 0) {
          o3.__webglFramebuffer = [];
          for (let t12 = 0; t12 < r11.mipmaps.length; t12++) o3.__webglFramebuffer[t12] = e10.createFramebuffer();
        } else o3.__webglFramebuffer = e10.createFramebuffer();
        if (u3) for (let t12 = 0, i11 = h2.length; t12 < i11; t12++) {
          let i12 = n10.get(h2[t12]);
          void 0 === i12.__webglTexture && (i12.__webglTexture = e10.createTexture(), s2.memory.textures++);
        }
        if (t11.samples > 0 && false === j2(t11)) {
          o3.__webglMultisampledFramebuffer = e10.createFramebuffer(), o3.__webglColorRenderbuffer = [], i10.bindFramebuffer(e10.FRAMEBUFFER, o3.__webglMultisampledFramebuffer);
          for (let i11 = 0; i11 < h2.length; i11++) {
            let n11 = h2[i11];
            o3.__webglColorRenderbuffer[i11] = e10.createRenderbuffer(), e10.bindRenderbuffer(e10.RENDERBUFFER, o3.__webglColorRenderbuffer[i11]);
            let r12 = a10.convert(n11.format, n11.colorSpace), s3 = a10.convert(n11.type), l3 = M2(n11.internalFormat, r12, s3, n11.colorSpace, true === t11.isXRRenderTarget), c3 = X2(t11);
            e10.renderbufferStorageMultisample(e10.RENDERBUFFER, c3, l3, t11.width, t11.height), e10.framebufferRenderbuffer(e10.FRAMEBUFFER, e10.COLOR_ATTACHMENT0 + i11, e10.RENDERBUFFER, o3.__webglColorRenderbuffer[i11]);
          }
          e10.bindRenderbuffer(e10.RENDERBUFFER, null), t11.depthBuffer && (o3.__webglDepthRenderbuffer = e10.createRenderbuffer(), V2(o3.__webglDepthRenderbuffer, t11, true)), i10.bindFramebuffer(e10.FRAMEBUFFER, null);
        }
      }
      if (c2) {
        i10.bindTexture(e10.TEXTURE_CUBE_MAP, l2.__webglTexture), D2(e10.TEXTURE_CUBE_MAP, r11);
        for (let i11 = 0; i11 < 6; i11++) if (r11.mipmaps && r11.mipmaps.length > 0) for (let n11 = 0; n11 < r11.mipmaps.length; n11++) z2(o3.__webglFramebuffer[i11][n11], t11, r11, e10.COLOR_ATTACHMENT0, e10.TEXTURE_CUBE_MAP_POSITIVE_X + i11, n11);
        else z2(o3.__webglFramebuffer[i11], t11, r11, e10.COLOR_ATTACHMENT0, e10.TEXTURE_CUBE_MAP_POSITIVE_X + i11, 0);
        x2(r11) && y2(e10.TEXTURE_CUBE_MAP), i10.unbindTexture();
      } else if (u3) {
        for (let r12 = 0, a11 = h2.length; r12 < a11; r12++) {
          let a12 = h2[r12], s3 = n10.get(a12), l3 = e10.TEXTURE_2D;
          (t11.isWebGL3DRenderTarget || t11.isWebGLArrayRenderTarget) && (l3 = t11.isWebGL3DRenderTarget ? e10.TEXTURE_3D : e10.TEXTURE_2D_ARRAY), i10.bindTexture(l3, s3.__webglTexture), D2(l3, a12), z2(o3.__webglFramebuffer, t11, a12, e10.COLOR_ATTACHMENT0 + r12, l3, 0), x2(a12) && y2(l3);
        }
        i10.unbindTexture();
      } else {
        let n11 = e10.TEXTURE_2D;
        if ((t11.isWebGL3DRenderTarget || t11.isWebGLArrayRenderTarget) && (n11 = t11.isWebGL3DRenderTarget ? e10.TEXTURE_3D : e10.TEXTURE_2D_ARRAY), i10.bindTexture(n11, l2.__webglTexture), D2(n11, r11), r11.mipmaps && r11.mipmaps.length > 0) for (let i11 = 0; i11 < r11.mipmaps.length; i11++) z2(o3.__webglFramebuffer[i11], t11, r11, e10.COLOR_ATTACHMENT0, n11, i11);
        else z2(o3.__webglFramebuffer, t11, r11, e10.COLOR_ATTACHMENT0, n11, 0);
        x2(r11) && y2(n11), i10.unbindTexture();
      }
      t11.depthBuffer && k2(t11);
    }, this.updateRenderTargetMipmap = function(t11) {
      let r11 = t11.textures;
      for (let a11 = 0, s3 = r11.length; a11 < s3; a11++) {
        let s4 = r11[a11];
        if (x2(s4)) {
          let r12 = t11.isWebGLCubeRenderTarget ? e10.TEXTURE_CUBE_MAP : t11.isWebGL3DRenderTarget ? e10.TEXTURE_3D : t11.isWebGLArrayRenderTarget || t11.isCompressedArrayTexture ? e10.TEXTURE_2D_ARRAY : e10.TEXTURE_2D, a12 = n10.get(s4).__webglTexture;
          i10.bindTexture(r12, a12), y2(r12), i10.unbindTexture();
        }
      }
    }, this.updateMultisampleRenderTarget = function(t11) {
      if (t11.samples > 0) {
        if (false === j2(t11)) {
          let r11 = t11.textures, a11 = t11.width, s3 = t11.height, o3 = e10.COLOR_BUFFER_BIT, l2 = t11.stencilBuffer ? e10.DEPTH_STENCIL_ATTACHMENT : e10.DEPTH_ATTACHMENT, h2 = n10.get(t11), c2 = r11.length > 1;
          if (c2) for (let t12 = 0; t12 < r11.length; t12++) i10.bindFramebuffer(e10.FRAMEBUFFER, h2.__webglMultisampledFramebuffer), e10.framebufferRenderbuffer(e10.FRAMEBUFFER, e10.COLOR_ATTACHMENT0 + t12, e10.RENDERBUFFER, null), i10.bindFramebuffer(e10.FRAMEBUFFER, h2.__webglFramebuffer), e10.framebufferTexture2D(e10.DRAW_FRAMEBUFFER, e10.COLOR_ATTACHMENT0 + t12, e10.TEXTURE_2D, null, 0);
          i10.bindFramebuffer(e10.READ_FRAMEBUFFER, h2.__webglMultisampledFramebuffer);
          let u3 = t11.texture.mipmaps;
          u3 && u3.length > 0 ? i10.bindFramebuffer(e10.DRAW_FRAMEBUFFER, h2.__webglFramebuffer[0]) : i10.bindFramebuffer(e10.DRAW_FRAMEBUFFER, h2.__webglFramebuffer);
          for (let i11 = 0; i11 < r11.length; i11++) {
            if (t11.resolveDepthBuffer && (t11.depthBuffer && (o3 |= e10.DEPTH_BUFFER_BIT), t11.stencilBuffer && t11.resolveStencilBuffer && (o3 |= e10.STENCIL_BUFFER_BIT)), c2) {
              e10.framebufferRenderbuffer(e10.READ_FRAMEBUFFER, e10.COLOR_ATTACHMENT0, e10.RENDERBUFFER, h2.__webglColorRenderbuffer[i11]);
              let t12 = n10.get(r11[i11]).__webglTexture;
              e10.framebufferTexture2D(e10.DRAW_FRAMEBUFFER, e10.COLOR_ATTACHMENT0, e10.TEXTURE_2D, t12, 0);
            }
            e10.blitFramebuffer(0, 0, a11, s3, 0, 0, a11, s3, o3, e10.NEAREST), true === d2 && (G2.length = 0, W2.length = 0, G2.push(e10.COLOR_ATTACHMENT0 + i11), t11.depthBuffer && false === t11.resolveDepthBuffer && (G2.push(l2), W2.push(l2), e10.invalidateFramebuffer(e10.DRAW_FRAMEBUFFER, W2)), e10.invalidateFramebuffer(e10.READ_FRAMEBUFFER, G2));
          }
          if (i10.bindFramebuffer(e10.READ_FRAMEBUFFER, null), i10.bindFramebuffer(e10.DRAW_FRAMEBUFFER, null), c2) for (let t12 = 0; t12 < r11.length; t12++) {
            i10.bindFramebuffer(e10.FRAMEBUFFER, h2.__webglMultisampledFramebuffer), e10.framebufferRenderbuffer(e10.FRAMEBUFFER, e10.COLOR_ATTACHMENT0 + t12, e10.RENDERBUFFER, h2.__webglColorRenderbuffer[t12]);
            let a12 = n10.get(r11[t12]).__webglTexture;
            i10.bindFramebuffer(e10.FRAMEBUFFER, h2.__webglFramebuffer), e10.framebufferTexture2D(e10.DRAW_FRAMEBUFFER, e10.COLOR_ATTACHMENT0 + t12, e10.TEXTURE_2D, a12, 0);
          }
          i10.bindFramebuffer(e10.DRAW_FRAMEBUFFER, h2.__webglMultisampledFramebuffer);
        } else if (t11.depthBuffer && false === t11.resolveDepthBuffer && d2) {
          let i11 = t11.stencilBuffer ? e10.DEPTH_STENCIL_ATTACHMENT : e10.DEPTH_ATTACHMENT;
          e10.invalidateFramebuffer(e10.DRAW_FRAMEBUFFER, [i11]);
        }
      }
    }, this.setupDepthRenderbuffer = k2, this.setupFrameBufferTexture = z2, this.useMultisampledRTT = j2;
  }
  function a1(e10, t10) {
    return { convert: function(i10, n10 = "") {
      let r10, a10 = B.getTransfer(n10);
      if (1009 === i10) return e10.UNSIGNED_BYTE;
      if (1017 === i10) return e10.UNSIGNED_SHORT_4_4_4_4;
      if (1018 === i10) return e10.UNSIGNED_SHORT_5_5_5_1;
      if (35902 === i10) return e10.UNSIGNED_INT_5_9_9_9_REV;
      if (35899 === i10) return e10.UNSIGNED_INT_10F_11F_11F_REV;
      if (1010 === i10) return e10.BYTE;
      if (1011 === i10) return e10.SHORT;
      if (1012 === i10) return e10.UNSIGNED_SHORT;
      if (1013 === i10) return e10.INT;
      if (1014 === i10) return e10.UNSIGNED_INT;
      if (1015 === i10) return e10.FLOAT;
      if (1016 === i10) return e10.HALF_FLOAT;
      if (1021 === i10) return e10.ALPHA;
      if (1022 === i10) return e10.RGB;
      if (1023 === i10) return e10.RGBA;
      if (1026 === i10) return e10.DEPTH_COMPONENT;
      if (1027 === i10) return e10.DEPTH_STENCIL;
      if (1028 === i10) return e10.RED;
      if (1029 === i10) return e10.RED_INTEGER;
      if (1030 === i10) return e10.RG;
      if (1031 === i10) return e10.RG_INTEGER;
      if (1033 === i10) return e10.RGBA_INTEGER;
      if (33776 === i10 || 33777 === i10 || 33778 === i10 || 33779 === i10) if (a10 === c) {
        if (null === (r10 = t10.get("WEBGL_compressed_texture_s3tc_srgb"))) return null;
        if (33776 === i10) return r10.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (33777 === i10) return r10.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (33778 === i10) return r10.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (33779 === i10) return r10.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
      } else {
        if (null === (r10 = t10.get("WEBGL_compressed_texture_s3tc"))) return null;
        if (33776 === i10) return r10.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (33777 === i10) return r10.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (33778 === i10) return r10.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (33779 === i10) return r10.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      }
      if (35840 === i10 || 35841 === i10 || 35842 === i10 || 35843 === i10) {
        if (null === (r10 = t10.get("WEBGL_compressed_texture_pvrtc"))) return null;
        if (35840 === i10) return r10.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (35841 === i10) return r10.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (35842 === i10) return r10.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (35843 === i10) return r10.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      }
      if (36196 === i10 || 37492 === i10 || 37496 === i10) {
        if (null === (r10 = t10.get("WEBGL_compressed_texture_etc"))) return null;
        if (36196 === i10 || 37492 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ETC2 : r10.COMPRESSED_RGB8_ETC2;
        if (37496 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r10.COMPRESSED_RGBA8_ETC2_EAC;
      }
      if (37808 === i10 || 37809 === i10 || 37810 === i10 || 37811 === i10 || 37812 === i10 || 37813 === i10 || 37814 === i10 || 37815 === i10 || 37816 === i10 || 37817 === i10 || 37818 === i10 || 37819 === i10 || 37820 === i10 || 37821 === i10) {
        if (null === (r10 = t10.get("WEBGL_compressed_texture_astc"))) return null;
        if (37808 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r10.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (37809 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r10.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (37810 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r10.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (37811 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r10.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (37812 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r10.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (37813 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r10.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (37814 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r10.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (37815 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r10.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (37816 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r10.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (37817 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r10.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (37818 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r10.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (37819 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r10.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (37820 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r10.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (37821 === i10) return a10 === c ? r10.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r10.COMPRESSED_RGBA_ASTC_12x12_KHR;
      }
      if (36492 === i10 || 36494 === i10 || 36495 === i10) {
        if (null === (r10 = t10.get("EXT_texture_compression_bptc"))) return null;
        if (36492 === i10) return a10 === c ? r10.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r10.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (36494 === i10) return r10.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (36495 === i10) return r10.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      }
      if (36283 === i10 || 36284 === i10 || 36285 === i10 || 36286 === i10) {
        if (null === (r10 = t10.get("EXT_texture_compression_rgtc"))) return null;
        if (36283 === i10) return r10.COMPRESSED_RED_RGTC1_EXT;
        if (36284 === i10) return r10.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (36285 === i10) return r10.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (36286 === i10) return r10.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      }
      return 1020 === i10 ? e10.UNSIGNED_INT_24_8 : void 0 !== e10[i10] ? e10[i10] : null;
    } };
  }
  let a2 = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, a3 = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
  class a4 {
    constructor() {
      this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
    }
    init(e10, t10) {
      if (null === this.texture) {
        let i10 = new iX(e10.texture);
        (e10.depthNear !== t10.depthNear || e10.depthFar !== t10.depthFar) && (this.depthNear = e10.depthNear, this.depthFar = e10.depthFar), this.texture = i10;
      }
    }
    getMesh(e10) {
      if (null !== this.texture && null === this.mesh) {
        let t10 = e10.cameras[0].viewport, i10 = new tj({ vertexShader: a2, fragmentShader: a3, uniforms: { depthColor: { value: this.texture }, depthWidth: { value: t10.z }, depthHeight: { value: t10.w } } });
        this.mesh = new tz(new i6(20, 20), i10);
      }
      return this.mesh;
    }
    reset() {
      this.texture = null, this.mesh = null;
    }
    getDepthTexture() {
      return this.texture;
    }
  }
  class a5 extends d {
    constructor(e10, t10) {
      super();
      const i10 = this;
      let n10 = null, r10 = 1, a10 = null, s2 = "local-floor", o2 = 1, l2 = null, h2 = null, c2 = null, u2 = null, d2 = null, p2 = null;
      const f2 = "u" > typeof XRWebGLBinding, m2 = new a4(), _2 = {}, v2 = t10.getContextAttributes();
      let x2 = null, y2 = null;
      const M2 = [], S2 = [], T2 = new E();
      let A2 = null;
      const w2 = new tZ();
      w2.viewport = new Y();
      const R2 = new tZ();
      R2.viewport = new Y();
      const C2 = [w2, R2], P2 = new nO();
      let I2 = null, L2 = null;
      function U2(e11) {
        let t11 = S2.indexOf(e11.inputSource);
        if (-1 === t11) return;
        let i11 = M2[t11];
        void 0 !== i11 && (i11.update(e11.inputSource, e11.frame, l2 || a10), i11.dispatchEvent({ type: e11.type, data: e11.inputSource }));
      }
      function D2() {
        n10.removeEventListener("select", U2), n10.removeEventListener("selectstart", U2), n10.removeEventListener("selectend", U2), n10.removeEventListener("squeeze", U2), n10.removeEventListener("squeezestart", U2), n10.removeEventListener("squeezeend", U2), n10.removeEventListener("end", D2), n10.removeEventListener("inputsourceschange", N2);
        for (let e11 = 0; e11 < M2.length; e11++) {
          let t11 = S2[e11];
          null !== t11 && (S2[e11] = null, M2[e11].disconnect(t11));
        }
        for (let e11 in I2 = null, L2 = null, m2.reset(), _2) delete _2[e11];
        e10.setRenderTarget(x2), d2 = null, u2 = null, c2 = null, n10 = null, y2 = null, V2.stop(), i10.isPresenting = false, e10.setPixelRatio(A2), e10.setSize(T2.width, T2.height, false), i10.dispatchEvent({ type: "sessionend" });
      }
      function N2(e11) {
        for (let t11 = 0; t11 < e11.removed.length; t11++) {
          let i11 = e11.removed[t11], n11 = S2.indexOf(i11);
          n11 >= 0 && (S2[n11] = null, M2[n11].disconnect(i11));
        }
        for (let t11 = 0; t11 < e11.added.length; t11++) {
          let i11 = e11.added[t11], n11 = S2.indexOf(i11);
          if (-1 === n11) {
            for (let e12 = 0; e12 < M2.length; e12++) if (e12 >= S2.length) {
              S2.push(i11), n11 = e12;
              break;
            } else if (null === S2[e12]) {
              S2[e12] = i11, n11 = e12;
              break;
            }
            if (-1 === n11) break;
          }
          let r11 = M2[n11];
          r11 && r11.connect(i11);
        }
      }
      this.cameraAutoUpdate = true, this.enabled = false, this.isPresenting = false, this.getController = function(e11) {
        let t11 = M2[e11];
        return void 0 === t11 && (t11 = new t3(), M2[e11] = t11), t11.getTargetRaySpace();
      }, this.getControllerGrip = function(e11) {
        let t11 = M2[e11];
        return void 0 === t11 && (t11 = new t3(), M2[e11] = t11), t11.getGripSpace();
      }, this.getHand = function(e11) {
        let t11 = M2[e11];
        return void 0 === t11 && (t11 = new t3(), M2[e11] = t11), t11.getHandSpace();
      }, this.setFramebufferScaleFactor = function(e11) {
        r10 = e11, true === i10.isPresenting && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
      }, this.setReferenceSpaceType = function(e11) {
        s2 = e11, true === i10.isPresenting && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
      }, this.getReferenceSpace = function() {
        return l2 || a10;
      }, this.setReferenceSpace = function(e11) {
        l2 = e11;
      }, this.getBaseLayer = function() {
        return null !== u2 ? u2 : d2;
      }, this.getBinding = function() {
        return null === c2 && f2 && (c2 = new XRWebGLBinding(n10, t10)), c2;
      }, this.getFrame = function() {
        return p2;
      }, this.getSession = function() {
        return n10;
      }, this.setSession = async function(h3) {
        if (null !== (n10 = h3)) {
          if (x2 = e10.getRenderTarget(), n10.addEventListener("select", U2), n10.addEventListener("selectstart", U2), n10.addEventListener("selectend", U2), n10.addEventListener("squeeze", U2), n10.addEventListener("squeezestart", U2), n10.addEventListener("squeezeend", U2), n10.addEventListener("end", D2), n10.addEventListener("inputsourceschange", N2), true !== v2.xrCompatible && await t10.makeXRCompatible(), A2 = e10.getPixelRatio(), e10.getSize(T2), f2 && "createProjectionLayer" in XRWebGLBinding.prototype) {
            let i11 = null, a11 = null, s3 = null;
            v2.depth && (s3 = v2.stencil ? t10.DEPTH24_STENCIL8 : t10.DEPTH_COMPONENT24, i11 = v2.stencil ? 1027 : 1026, a11 = v2.stencil ? 1020 : 1014);
            let o3 = { colorFormat: t10.RGBA8, depthFormat: s3, scaleFactor: r10 };
            u2 = (c2 = this.getBinding()).createProjectionLayer(o3), n10.updateRenderState({ layers: [u2] }), e10.setPixelRatio(1), e10.setSize(u2.textureWidth, u2.textureHeight, false), y2 = new J(u2.textureWidth, u2.textureHeight, { format: 1023, type: 1009, depthTexture: new iW(u2.textureWidth, u2.textureHeight, a11, void 0, void 0, void 0, void 0, void 0, void 0, i11), stencilBuffer: v2.stencil, colorSpace: e10.outputColorSpace, samples: 4 * !!v2.antialias, resolveDepthBuffer: false === u2.ignoreDepthValues, resolveStencilBuffer: false === u2.ignoreDepthValues });
          } else {
            let i11 = { antialias: v2.antialias, alpha: true, depth: v2.depth, stencil: v2.stencil, framebufferScaleFactor: r10 };
            d2 = new XRWebGLLayer(n10, t10, i11), n10.updateRenderState({ baseLayer: d2 }), e10.setPixelRatio(1), e10.setSize(d2.framebufferWidth, d2.framebufferHeight, false), y2 = new J(d2.framebufferWidth, d2.framebufferHeight, { format: 1023, type: 1009, colorSpace: e10.outputColorSpace, stencilBuffer: v2.stencil, resolveDepthBuffer: false === d2.ignoreDepthValues, resolveStencilBuffer: false === d2.ignoreDepthValues });
          }
          y2.isXRRenderTarget = true, this.setFoveation(o2), l2 = null, a10 = await n10.requestReferenceSpace(s2), V2.setContext(n10), V2.start(), i10.isPresenting = true, i10.dispatchEvent({ type: "sessionstart" });
        }
      }, this.getEnvironmentBlendMode = function() {
        if (null !== n10) return n10.environmentBlendMode;
      }, this.getDepthTexture = function() {
        return m2.getDepthTexture();
      };
      const O2 = new b(), F2 = new b();
      function B2(e11, t11) {
        null === t11 ? e11.matrixWorld.copy(e11.matrix) : e11.matrixWorld.multiplyMatrices(t11.matrixWorld, e11.matrix), e11.matrixWorldInverse.copy(e11.matrixWorld).invert();
      }
      this.updateCamera = function(e11) {
        var t11, i11, r11;
        if (null === n10) return;
        let a11 = e11.near, s3 = e11.far;
        null !== m2.texture && (m2.depthNear > 0 && (a11 = m2.depthNear), m2.depthFar > 0 && (s3 = m2.depthFar)), P2.near = R2.near = w2.near = a11, P2.far = R2.far = w2.far = s3, (I2 !== P2.near || L2 !== P2.far) && (n10.updateRenderState({ depthNear: P2.near, depthFar: P2.far }), I2 = P2.near, L2 = P2.far), P2.layers.mask = 6 | e11.layers.mask, w2.layers.mask = 3 & P2.layers.mask, R2.layers.mask = 5 & P2.layers.mask;
        let o3 = e11.parent, l3 = P2.cameras;
        B2(P2, o3);
        for (let e12 = 0; e12 < l3.length; e12++) B2(l3[e12], o3);
        2 === l3.length ? (function(e12, t12, i12) {
          O2.setFromMatrixPosition(t12.matrixWorld), F2.setFromMatrixPosition(i12.matrixWorld);
          let n11 = O2.distanceTo(F2), r12 = t12.projectionMatrix.elements, a12 = i12.projectionMatrix.elements, s4 = r12[14] / (r12[10] - 1), o4 = r12[14] / (r12[10] + 1), l4 = (r12[9] + 1) / r12[5], h3 = (r12[9] - 1) / r12[5], c3 = (r12[8] - 1) / r12[0], u3 = (a12[8] + 1) / a12[0], d3 = n11 / (-c3 + u3), p3 = -(d3 * c3);
          if (t12.matrixWorld.decompose(e12.position, e12.quaternion, e12.scale), e12.translateX(p3), e12.translateZ(d3), e12.matrixWorld.compose(e12.position, e12.quaternion, e12.scale), e12.matrixWorldInverse.copy(e12.matrixWorld).invert(), -1 === r12[10]) e12.projectionMatrix.copy(t12.projectionMatrix), e12.projectionMatrixInverse.copy(t12.projectionMatrixInverse);
          else {
            let t13 = s4 + d3, i13 = o4 + d3;
            e12.projectionMatrix.makePerspective(s4 * c3 - p3, s4 * u3 + (n11 - p3), l4 * o4 / i13 * t13, h3 * o4 / i13 * t13, t13, i13), e12.projectionMatrixInverse.copy(e12.projectionMatrix).invert();
          }
        })(P2, w2, R2) : P2.projectionMatrix.copy(w2.projectionMatrix), t11 = e11, i11 = P2, null === (r11 = o3) ? t11.matrix.copy(i11.matrixWorld) : (t11.matrix.copy(r11.matrixWorld), t11.matrix.invert(), t11.matrix.multiply(i11.matrixWorld)), t11.matrix.decompose(t11.position, t11.quaternion, t11.scale), t11.updateMatrixWorld(true), t11.projectionMatrix.copy(i11.projectionMatrix), t11.projectionMatrixInverse.copy(i11.projectionMatrixInverse), t11.isPerspectiveCamera && (t11.fov = 2 * g * Math.atan(1 / t11.projectionMatrix.elements[5]), t11.zoom = 1);
      }, this.getCamera = function() {
        return P2;
      }, this.getFoveation = function() {
        if (null !== u2 || null !== d2) return o2;
      }, this.setFoveation = function(e11) {
        o2 = e11, null !== u2 && (u2.fixedFoveation = e11), null !== d2 && void 0 !== d2.fixedFoveation && (d2.fixedFoveation = e11);
      }, this.hasDepthSensing = function() {
        return null !== m2.texture;
      }, this.getDepthSensingMesh = function() {
        return m2.getMesh(P2);
      }, this.getCameraTexture = function(e11) {
        return _2[e11];
      };
      let z2 = null;
      const V2 = new nZ();
      V2.setAnimationLoop(function(t11, r11) {
        if (h2 = r11.getViewerPose(l2 || a10), p2 = r11, null !== h2) {
          let t12 = h2.views;
          null !== d2 && (e10.setRenderTargetFramebuffer(y2, d2.framebuffer), e10.setRenderTarget(y2));
          let r12 = false;
          t12.length !== P2.cameras.length && (P2.cameras.length = 0, r12 = true);
          for (let i11 = 0; i11 < t12.length; i11++) {
            let n11 = t12[i11], a12 = null;
            if (null !== d2) a12 = d2.getViewport(n11);
            else {
              let t13 = c2.getViewSubImage(u2, n11);
              a12 = t13.viewport, 0 === i11 && (e10.setRenderTargetTextures(y2, t13.colorTexture, t13.depthStencilTexture), e10.setRenderTarget(y2));
            }
            let s3 = C2[i11];
            void 0 === s3 && ((s3 = new tZ()).layers.enable(i11), s3.viewport = new Y(), C2[i11] = s3), s3.matrix.fromArray(n11.transform.matrix), s3.matrix.decompose(s3.position, s3.quaternion, s3.scale), s3.projectionMatrix.fromArray(n11.projectionMatrix), s3.projectionMatrixInverse.copy(s3.projectionMatrix).invert(), s3.viewport.set(a12.x, a12.y, a12.width, a12.height), 0 === i11 && (P2.matrix.copy(s3.matrix), P2.matrix.decompose(P2.position, P2.quaternion, P2.scale)), true === r12 && P2.cameras.push(s3);
          }
          let a11 = n10.enabledFeatures;
          if (a11 && a11.includes("depth-sensing") && "gpu-optimized" == n10.depthUsage && f2) {
            let e11 = (c2 = i10.getBinding()).getDepthInformation(t12[0]);
            e11 && e11.isValid && e11.texture && m2.init(e11, n10.renderState);
          }
          if (a11 && a11.includes("camera-access") && f2) {
            e10.state.unbindTexture(), c2 = i10.getBinding();
            for (let e11 = 0; e11 < t12.length; e11++) {
              let i11 = t12[e11].camera;
              if (i11) {
                let e12 = _2[i11];
                e12 || (e12 = new iX(), _2[i11] = e12);
                let t13 = c2.getCameraImage(i11);
                e12.sourceTexture = t13;
              }
            }
          }
        }
        for (let e11 = 0; e11 < M2.length; e11++) {
          let t12 = S2[e11], i11 = M2[e11];
          null !== t12 && void 0 !== i11 && i11.update(t12, r11, l2 || a10);
        }
        z2 && z2(t11, r11), r11.detectedPlanes && i10.dispatchEvent({ type: "planesdetected", data: r11 }), p2 = null;
      }), this.setAnimationLoop = function(e11) {
        z2 = e11;
      }, this.dispose = function() {
      };
    }
  }
  let a6 = new eO(), a8 = new eA();
  function a9(e10, t10) {
    function i10(e11, t11) {
      true === e11.matrixAutoUpdate && e11.updateMatrix(), t11.value.copy(e11.matrix);
    }
    function n10(e11, n11) {
      e11.opacity.value = n11.opacity, n11.color && e11.diffuse.value.copy(n11.color), n11.emissive && e11.emissive.value.copy(n11.emissive).multiplyScalar(n11.emissiveIntensity), n11.map && (e11.map.value = n11.map, i10(n11.map, e11.mapTransform)), n11.alphaMap && (e11.alphaMap.value = n11.alphaMap, i10(n11.alphaMap, e11.alphaMapTransform)), n11.bumpMap && (e11.bumpMap.value = n11.bumpMap, i10(n11.bumpMap, e11.bumpMapTransform), e11.bumpScale.value = n11.bumpScale, 1 === n11.side && (e11.bumpScale.value *= -1)), n11.normalMap && (e11.normalMap.value = n11.normalMap, i10(n11.normalMap, e11.normalMapTransform), e11.normalScale.value.copy(n11.normalScale), 1 === n11.side && e11.normalScale.value.negate()), n11.displacementMap && (e11.displacementMap.value = n11.displacementMap, i10(n11.displacementMap, e11.displacementMapTransform), e11.displacementScale.value = n11.displacementScale, e11.displacementBias.value = n11.displacementBias), n11.emissiveMap && (e11.emissiveMap.value = n11.emissiveMap, i10(n11.emissiveMap, e11.emissiveMapTransform)), n11.specularMap && (e11.specularMap.value = n11.specularMap, i10(n11.specularMap, e11.specularMapTransform)), n11.alphaTest > 0 && (e11.alphaTest.value = n11.alphaTest);
      let r10 = t10.get(n11), a10 = r10.envMap, s2 = r10.envMapRotation;
      a10 && (e11.envMap.value = a10, a6.copy(s2), a6.x *= -1, a6.y *= -1, a6.z *= -1, a10.isCubeTexture && false === a10.isRenderTargetTexture && (a6.y *= -1, a6.z *= -1), e11.envMapRotation.value.setFromMatrix4(a8.makeRotationFromEuler(a6)), e11.flipEnvMap.value = a10.isCubeTexture && false === a10.isRenderTargetTexture ? -1 : 1, e11.reflectivity.value = n11.reflectivity, e11.ior.value = n11.ior, e11.refractionRatio.value = n11.refractionRatio), n11.lightMap && (e11.lightMap.value = n11.lightMap, e11.lightMapIntensity.value = n11.lightMapIntensity, i10(n11.lightMap, e11.lightMapTransform)), n11.aoMap && (e11.aoMap.value = n11.aoMap, e11.aoMapIntensity.value = n11.aoMapIntensity, i10(n11.aoMap, e11.aoMapTransform));
    }
    return { refreshFogUniforms: function(t11, i11) {
      i11.color.getRGB(t11.fogColor.value, tW(e10)), i11.isFog ? (t11.fogNear.value = i11.near, t11.fogFar.value = i11.far) : i11.isFogExp2 && (t11.fogDensity.value = i11.density);
    }, refreshMaterialUniforms: function(e11, r10, a10, s2, o2) {
      var l2, h2, c2, u2, d2, p2, f2, m2, g2, _2, v2, x2, y2, M2, S2, E2, T2, b2, A2, w2, R2, C2, P2;
      let I2;
      r10.isMeshBasicMaterial || r10.isMeshLambertMaterial ? n10(e11, r10) : r10.isMeshToonMaterial ? (n10(e11, r10), l2 = e11, (h2 = r10).gradientMap && (l2.gradientMap.value = h2.gradientMap)) : r10.isMeshPhongMaterial ? (n10(e11, r10), c2 = e11, u2 = r10, c2.specular.value.copy(u2.specular), c2.shininess.value = Math.max(u2.shininess, 1e-4)) : r10.isMeshStandardMaterial ? (n10(e11, r10), d2 = e11, p2 = r10, d2.metalness.value = p2.metalness, p2.metalnessMap && (d2.metalnessMap.value = p2.metalnessMap, i10(p2.metalnessMap, d2.metalnessMapTransform)), d2.roughness.value = p2.roughness, p2.roughnessMap && (d2.roughnessMap.value = p2.roughnessMap, i10(p2.roughnessMap, d2.roughnessMapTransform)), p2.envMap && (d2.envMapIntensity.value = p2.envMapIntensity), r10.isMeshPhysicalMaterial && (f2 = e11, m2 = r10, g2 = o2, f2.ior.value = m2.ior, m2.sheen > 0 && (f2.sheenColor.value.copy(m2.sheenColor).multiplyScalar(m2.sheen), f2.sheenRoughness.value = m2.sheenRoughness, m2.sheenColorMap && (f2.sheenColorMap.value = m2.sheenColorMap, i10(m2.sheenColorMap, f2.sheenColorMapTransform)), m2.sheenRoughnessMap && (f2.sheenRoughnessMap.value = m2.sheenRoughnessMap, i10(m2.sheenRoughnessMap, f2.sheenRoughnessMapTransform))), m2.clearcoat > 0 && (f2.clearcoat.value = m2.clearcoat, f2.clearcoatRoughness.value = m2.clearcoatRoughness, m2.clearcoatMap && (f2.clearcoatMap.value = m2.clearcoatMap, i10(m2.clearcoatMap, f2.clearcoatMapTransform)), m2.clearcoatRoughnessMap && (f2.clearcoatRoughnessMap.value = m2.clearcoatRoughnessMap, i10(m2.clearcoatRoughnessMap, f2.clearcoatRoughnessMapTransform)), m2.clearcoatNormalMap && (f2.clearcoatNormalMap.value = m2.clearcoatNormalMap, i10(m2.clearcoatNormalMap, f2.clearcoatNormalMapTransform), f2.clearcoatNormalScale.value.copy(m2.clearcoatNormalScale), 1 === m2.side && f2.clearcoatNormalScale.value.negate())), m2.dispersion > 0 && (f2.dispersion.value = m2.dispersion), m2.iridescence > 0 && (f2.iridescence.value = m2.iridescence, f2.iridescenceIOR.value = m2.iridescenceIOR, f2.iridescenceThicknessMinimum.value = m2.iridescenceThicknessRange[0], f2.iridescenceThicknessMaximum.value = m2.iridescenceThicknessRange[1], m2.iridescenceMap && (f2.iridescenceMap.value = m2.iridescenceMap, i10(m2.iridescenceMap, f2.iridescenceMapTransform)), m2.iridescenceThicknessMap && (f2.iridescenceThicknessMap.value = m2.iridescenceThicknessMap, i10(m2.iridescenceThicknessMap, f2.iridescenceThicknessMapTransform))), m2.transmission > 0 && (f2.transmission.value = m2.transmission, f2.transmissionSamplerMap.value = g2.texture, f2.transmissionSamplerSize.value.set(g2.width, g2.height), m2.transmissionMap && (f2.transmissionMap.value = m2.transmissionMap, i10(m2.transmissionMap, f2.transmissionMapTransform)), f2.thickness.value = m2.thickness, m2.thicknessMap && (f2.thicknessMap.value = m2.thicknessMap, i10(m2.thicknessMap, f2.thicknessMapTransform)), f2.attenuationDistance.value = m2.attenuationDistance, f2.attenuationColor.value.copy(m2.attenuationColor)), m2.anisotropy > 0 && (f2.anisotropyVector.value.set(m2.anisotropy * Math.cos(m2.anisotropyRotation), m2.anisotropy * Math.sin(m2.anisotropyRotation)), m2.anisotropyMap && (f2.anisotropyMap.value = m2.anisotropyMap, i10(m2.anisotropyMap, f2.anisotropyMapTransform))), f2.specularIntensity.value = m2.specularIntensity, f2.specularColor.value.copy(m2.specularColor), m2.specularColorMap && (f2.specularColorMap.value = m2.specularColorMap, i10(m2.specularColorMap, f2.specularColorMapTransform)), m2.specularIntensityMap && (f2.specularIntensityMap.value = m2.specularIntensityMap, i10(m2.specularIntensityMap, f2.specularIntensityMapTransform)))) : r10.isMeshMatcapMaterial ? (n10(e11, r10), _2 = e11, (v2 = r10).matcap && (_2.matcap.value = v2.matcap)) : r10.isMeshDepthMaterial ? n10(e11, r10) : r10.isMeshDistanceMaterial ? (n10(e11, r10), x2 = e11, y2 = r10, I2 = t10.get(y2).light, x2.referencePosition.value.setFromMatrixPosition(I2.matrixWorld), x2.nearDistance.value = I2.shadow.camera.near, x2.farDistance.value = I2.shadow.camera.far) : r10.isMeshNormalMaterial ? n10(e11, r10) : r10.isLineBasicMaterial ? (M2 = e11, S2 = r10, M2.diffuse.value.copy(S2.color), M2.opacity.value = S2.opacity, S2.map && (M2.map.value = S2.map, i10(S2.map, M2.mapTransform)), r10.isLineDashedMaterial && (E2 = e11, T2 = r10, E2.dashSize.value = T2.dashSize, E2.totalSize.value = T2.dashSize + T2.gapSize, E2.scale.value = T2.scale)) : r10.isPointsMaterial ? (b2 = e11, A2 = r10, w2 = a10, R2 = s2, b2.diffuse.value.copy(A2.color), b2.opacity.value = A2.opacity, b2.size.value = A2.size * w2, b2.scale.value = 0.5 * R2, A2.map && (b2.map.value = A2.map, i10(A2.map, b2.uvTransform)), A2.alphaMap && (b2.alphaMap.value = A2.alphaMap, i10(A2.alphaMap, b2.alphaMapTransform)), A2.alphaTest > 0 && (b2.alphaTest.value = A2.alphaTest)) : r10.isSpriteMaterial ? (C2 = e11, P2 = r10, C2.diffuse.value.copy(P2.color), C2.opacity.value = P2.opacity, C2.rotation.value = P2.rotation, P2.map && (C2.map.value = P2.map, i10(P2.map, C2.mapTransform)), P2.alphaMap && (C2.alphaMap.value = P2.alphaMap, i10(P2.alphaMap, C2.alphaMapTransform)), P2.alphaTest > 0 && (C2.alphaTest.value = P2.alphaTest)) : r10.isShadowMaterial ? (e11.color.value.copy(r10.color), e11.opacity.value = r10.opacity) : r10.isShaderMaterial && (r10.uniformsNeedUpdate = false);
    } };
  }
  function a7(e10, t10, i10, n10) {
    let r10 = {}, a10 = {}, s2 = [], o2 = e10.getParameter(e10.MAX_UNIFORM_BUFFER_BINDINGS);
    function l2(e11) {
      let t11 = { boundary: 0, storage: 0 };
      return "number" == typeof e11 || "boolean" == typeof e11 ? (t11.boundary = 4, t11.storage = 4) : e11.isVector2 ? (t11.boundary = 8, t11.storage = 8) : e11.isVector3 || e11.isColor ? (t11.boundary = 16, t11.storage = 12) : e11.isVector4 ? (t11.boundary = 16, t11.storage = 16) : e11.isMatrix3 ? (t11.boundary = 48, t11.storage = 48) : e11.isMatrix4 ? (t11.boundary = 64, t11.storage = 64) : e11.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", e11), t11;
    }
    function h2(t11) {
      let i11 = t11.target;
      i11.removeEventListener("dispose", h2);
      let n11 = s2.indexOf(i11.__bindingPointIndex);
      s2.splice(n11, 1), e10.deleteBuffer(r10[i11.id]), delete r10[i11.id], delete a10[i11.id];
    }
    return { bind: function(e11, t11) {
      let i11 = t11.program;
      n10.uniformBlockBinding(e11, i11);
    }, update: function(i11, c2) {
      var u2;
      let d2, p2, f2, m2, g2 = r10[i11.id];
      void 0 === g2 && ((function(e11) {
        let t11 = e11.uniforms, i12 = 0;
        for (let e12 = 0, n12 = t11.length; e12 < n12; e12++) {
          let n13 = Array.isArray(t11[e12]) ? t11[e12] : [t11[e12]];
          for (let e13 = 0, t12 = n13.length; e13 < t12; e13++) {
            let t13 = n13[e13], r11 = Array.isArray(t13.value) ? t13.value : [t13.value];
            for (let e14 = 0, n14 = r11.length; e14 < n14; e14++) {
              let n15 = l2(r11[e14]), a11 = i12 % 16, s3 = a11 % n15.boundary, o3 = a11 + s3;
              i12 += s3, 0 !== o3 && 16 - o3 < n15.storage && (i12 += 16 - o3), t13.__data = new Float32Array(n15.storage / Float32Array.BYTES_PER_ELEMENT), t13.__offset = i12, i12 += n15.storage;
            }
          }
        }
        let n11 = i12 % 16;
        n11 > 0 && (i12 += 16 - n11), e11.__size = i12, e11.__cache = {};
      })(i11), (u2 = i11).__bindingPointIndex = d2 = (function() {
        for (let e11 = 0; e11 < o2; e11++) if (-1 === s2.indexOf(e11)) return s2.push(e11), e11;
        return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
      })(), p2 = e10.createBuffer(), f2 = u2.__size, m2 = u2.usage, e10.bindBuffer(e10.UNIFORM_BUFFER, p2), e10.bufferData(e10.UNIFORM_BUFFER, f2, m2), e10.bindBuffer(e10.UNIFORM_BUFFER, null), e10.bindBufferBase(e10.UNIFORM_BUFFER, d2, p2), g2 = p2, r10[i11.id] = g2, i11.addEventListener("dispose", h2));
      let _2 = c2.program;
      n10.updateUBOMapping(i11, _2);
      let v2 = t10.render.frame;
      a10[i11.id] !== v2 && ((function(t11) {
        let i12 = r10[t11.id], n11 = t11.uniforms, a11 = t11.__cache;
        e10.bindBuffer(e10.UNIFORM_BUFFER, i12);
        for (let t12 = 0, i13 = n11.length; t12 < i13; t12++) {
          let i14 = Array.isArray(n11[t12]) ? n11[t12] : [n11[t12]];
          for (let n12 = 0, r11 = i14.length; n12 < r11; n12++) {
            let r12 = i14[n12];
            if (true === (function(e11, t13, i15, n13) {
              let r13 = e11.value, a12 = t13 + "_" + i15;
              if (void 0 === n13[a12]) return "number" == typeof r13 || "boolean" == typeof r13 ? n13[a12] = r13 : n13[a12] = r13.clone(), true;
              {
                let e12 = n13[a12];
                if ("number" == typeof r13 || "boolean" == typeof r13) {
                  if (e12 !== r13) return n13[a12] = r13, true;
                } else if (false === e12.equals(r13)) return e12.copy(r13), true;
              }
              return false;
            })(r12, t12, n12, a11)) {
              let t13 = r12.__offset, i15 = Array.isArray(r12.value) ? r12.value : [r12.value], n13 = 0;
              for (let a12 = 0; a12 < i15.length; a12++) {
                let s3 = i15[a12], o3 = l2(s3);
                "number" == typeof s3 || "boolean" == typeof s3 ? (r12.__data[0] = s3, e10.bufferSubData(e10.UNIFORM_BUFFER, t13 + n13, r12.__data)) : s3.isMatrix3 ? (r12.__data[0] = s3.elements[0], r12.__data[1] = s3.elements[1], r12.__data[2] = s3.elements[2], r12.__data[3] = 0, r12.__data[4] = s3.elements[3], r12.__data[5] = s3.elements[4], r12.__data[6] = s3.elements[5], r12.__data[7] = 0, r12.__data[8] = s3.elements[6], r12.__data[9] = s3.elements[7], r12.__data[10] = s3.elements[8], r12.__data[11] = 0) : (s3.toArray(r12.__data, n13), n13 += o3.storage / Float32Array.BYTES_PER_ELEMENT);
              }
              e10.bufferSubData(e10.UNIFORM_BUFFER, t13, r12.__data);
            }
          }
        }
        e10.bindBuffer(e10.UNIFORM_BUFFER, null);
      })(i11), a10[i11.id] = v2);
    }, dispose: function() {
      for (let t11 in r10) e10.deleteBuffer(r10[t11]);
      s2 = [], r10 = {}, a10 = {};
    } };
  }
  e.s(["PMREMGenerator", 0, rd, "WebGLRenderer", 0, class {
    constructor(e10 = {}) {
      let t10, i10, n10, r10, a10, s2, h2, c2, u2, d2, p2, f2, m2, g2, _2, v2, x2, y2, M2, S2, E2, T2, A2, w2, R2;
      const { canvas: C2 = L(), context: P2 = null, depth: I2 = true, stencil: U2 = false, alpha: O2 = false, antialias: F2 = false, premultipliedAlpha: z2 = true, preserveDrawingBuffer: V2 = false, powerPreference: H2 = "default", failIfMajorPerformanceCaveat: k2 = false, reversedDepthBuffer: G2 = false } = e10;
      if (this.isWebGLRenderer = true, null !== P2) {
        if ("u" > typeof WebGLRenderingContext && P2 instanceof WebGLRenderingContext) throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
        t10 = P2.getContextAttributes().alpha;
      } else t10 = O2;
      const W2 = new Uint32Array(4), X2 = new Int32Array(4);
      let j2 = null, q2 = null;
      const K2 = [], Z2 = [];
      this.domElement = C2, this.debug = { checkShaderErrors: true, onShaderError: null }, this.autoClear = true, this.autoClearColor = true, this.autoClearDepth = true, this.autoClearStencil = true, this.sortObjects = true, this.clippingPlanes = [], this.localClippingEnabled = false, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
      const $2 = this;
      let Q2 = false;
      this._outputColorSpace = o;
      let ee2 = 0, et2 = 0, ei2 = null, en2 = -1, er2 = null;
      const ea2 = new Y(), es2 = new Y();
      let eo2 = null;
      const el2 = new tl(0);
      let eh2 = 0, ec2 = C2.width, eu2 = C2.height, ed2 = 1, ep2 = null, ef2 = null;
      const em2 = new Y(0, 0, ec2, eu2), eg2 = new Y(0, 0, ec2, eu2);
      let e_2 = false;
      const ev2 = new ib();
      let ex2 = false, ey2 = false;
      const eM2 = new eA(), eS2 = new b(), eE2 = new Y(), eT2 = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: true };
      let eb2 = false;
      function ew2() {
        return null === ei2 ? ed2 : 1;
      }
      let eR2 = P2;
      function eC2(e11, t11) {
        return C2.getContext(e11, t11);
      }
      try {
        if ("setAttribute" in C2 && C2.setAttribute("data-engine", "three.js r180"), C2.addEventListener("webglcontextlost", eL2, false), C2.addEventListener("webglcontextrestored", eU2, false), C2.addEventListener("webglcontextcreationerror", eD2, false), null === eR2) {
          const e11 = "webgl2";
          if (eR2 = eC2(e11, { alpha: true, depth: I2, stencil: U2, antialias: F2, premultipliedAlpha: z2, preserveDrawingBuffer: V2, powerPreference: H2, failIfMajorPerformanceCaveat: k2 }), null === eR2) if (eC2(e11)) throw Error("Error creating WebGL context with your selected attributes.");
          else throw Error("Error creating WebGL context.");
        }
      } catch (e11) {
        throw console.error("THREE.WebGLRenderer: " + e11.message), e11;
      }
      function eP2() {
        (i10 = new rx(eR2)).init(), A2 = new a1(eR2, i10), n10 = new n9(eR2, i10, e10, A2), r10 = new aQ(eR2, i10), n10.reversedDepthBuffer && G2 && r10.buffers.depth.setReversed(true), a10 = new rS(eR2), s2 = new aV(), h2 = new a0(eR2, i10, r10, s2, n10, A2, a10), c2 = new re($2), u2 = new rv($2), d2 = new n$(eR2), w2 = new n6(eR2, d2), p2 = new ry(eR2, d2, a10, w2), f2 = new rT(eR2, p2, d2, a10), S2 = new rE(eR2, n10, h2), x2 = new n7(s2), m2 = new az($2, c2, u2, i10, n10, w2, x2), g2 = new a9($2, s2), _2 = new aW(), v2 = new aJ(i10), M2 = new n5($2, c2, u2, r10, f2, t10, z2), y2 = new aZ($2, f2, n10), R2 = new a7(eR2, a10, n10, r10), E2 = new n8(eR2, i10, a10), T2 = new rM(eR2, i10, a10), a10.programs = m2.programs, $2.capabilities = n10, $2.extensions = i10, $2.properties = s2, $2.renderLists = _2, $2.shadowMap = y2, $2.state = r10, $2.info = a10;
      }
      eP2();
      const eI2 = new a5($2, eR2);
      function eL2(e11) {
        e11.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), Q2 = true;
      }
      function eU2() {
        console.log("THREE.WebGLRenderer: Context Restored."), Q2 = false;
        let e11 = a10.autoReset, t11 = y2.enabled, i11 = y2.autoUpdate, n11 = y2.needsUpdate, r11 = y2.type;
        eP2(), a10.autoReset = e11, y2.enabled = t11, y2.autoUpdate = i11, y2.needsUpdate = n11, y2.type = r11;
      }
      function eD2(e11) {
        console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", e11.statusMessage);
      }
      function eN2(e11) {
        var t11, i11;
        let n11, r11 = e11.target;
        r11.removeEventListener("dispose", eN2), i11 = t11 = r11, void 0 !== (n11 = s2.get(i11).programs) && (n11.forEach(function(e12) {
          m2.releaseProgram(e12);
        }), i11.isShaderMaterial && m2.releaseShaderCache(i11)), s2.remove(t11);
      }
      function eO2(e11, t11, i11) {
        true === e11.transparent && 2 === e11.side && false === e11.forceSinglePass ? (e11.side = 1, e11.needsUpdate = true, ej2(e11, t11, i11), e11.side = 0, e11.needsUpdate = true, ej2(e11, t11, i11), e11.side = 2) : ej2(e11, t11, i11);
      }
      this.xr = eI2, this.getContext = function() {
        return eR2;
      }, this.getContextAttributes = function() {
        return eR2.getContextAttributes();
      }, this.forceContextLoss = function() {
        let e11 = i10.get("WEBGL_lose_context");
        e11 && e11.loseContext();
      }, this.forceContextRestore = function() {
        let e11 = i10.get("WEBGL_lose_context");
        e11 && e11.restoreContext();
      }, this.getPixelRatio = function() {
        return ed2;
      }, this.setPixelRatio = function(e11) {
        void 0 !== e11 && (ed2 = e11, this.setSize(ec2, eu2, false));
      }, this.getSize = function(e11) {
        return e11.set(ec2, eu2);
      }, this.setSize = function(e11, t11, i11 = true) {
        eI2.isPresenting ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : (ec2 = e11, eu2 = t11, C2.width = Math.floor(e11 * ed2), C2.height = Math.floor(t11 * ed2), true === i11 && (C2.style.width = e11 + "px", C2.style.height = t11 + "px"), this.setViewport(0, 0, e11, t11));
      }, this.getDrawingBufferSize = function(e11) {
        return e11.set(ec2 * ed2, eu2 * ed2).floor();
      }, this.setDrawingBufferSize = function(e11, t11, i11) {
        ec2 = e11, eu2 = t11, ed2 = i11, C2.width = Math.floor(e11 * i11), C2.height = Math.floor(t11 * i11), this.setViewport(0, 0, e11, t11);
      }, this.getCurrentViewport = function(e11) {
        return e11.copy(ea2);
      }, this.getViewport = function(e11) {
        return e11.copy(em2);
      }, this.setViewport = function(e11, t11, i11, n11) {
        e11.isVector4 ? em2.set(e11.x, e11.y, e11.z, e11.w) : em2.set(e11, t11, i11, n11), r10.viewport(ea2.copy(em2).multiplyScalar(ed2).round());
      }, this.getScissor = function(e11) {
        return e11.copy(eg2);
      }, this.setScissor = function(e11, t11, i11, n11) {
        e11.isVector4 ? eg2.set(e11.x, e11.y, e11.z, e11.w) : eg2.set(e11, t11, i11, n11), r10.scissor(es2.copy(eg2).multiplyScalar(ed2).round());
      }, this.getScissorTest = function() {
        return e_2;
      }, this.setScissorTest = function(e11) {
        r10.setScissorTest(e_2 = e11);
      }, this.setOpaqueSort = function(e11) {
        ep2 = e11;
      }, this.setTransparentSort = function(e11) {
        ef2 = e11;
      }, this.getClearColor = function(e11) {
        return e11.copy(M2.getClearColor());
      }, this.setClearColor = function() {
        M2.setClearColor(...arguments);
      }, this.getClearAlpha = function() {
        return M2.getClearAlpha();
      }, this.setClearAlpha = function() {
        M2.setClearAlpha(...arguments);
      }, this.clear = function(e11 = true, t11 = true, i11 = true) {
        let n11 = 0;
        if (e11) {
          let e12 = false;
          if (null !== ei2) {
            let t12 = ei2.texture.format;
            e12 = 1033 === t12 || 1031 === t12 || 1029 === t12;
          }
          if (e12) {
            let e13 = ei2.texture.type, t12 = 1009 === e13 || 1014 === e13 || 1012 === e13 || 1020 === e13 || 1017 === e13 || 1018 === e13, i12 = M2.getClearColor(), n12 = M2.getClearAlpha(), r11 = i12.r, a11 = i12.g, s3 = i12.b;
            t12 ? (W2[0] = r11, W2[1] = a11, W2[2] = s3, W2[3] = n12, eR2.clearBufferuiv(eR2.COLOR, 0, W2)) : (X2[0] = r11, X2[1] = a11, X2[2] = s3, X2[3] = n12, eR2.clearBufferiv(eR2.COLOR, 0, X2));
          } else n11 |= eR2.COLOR_BUFFER_BIT;
        }
        t11 && (n11 |= eR2.DEPTH_BUFFER_BIT), i11 && (n11 |= eR2.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), eR2.clear(n11);
      }, this.clearColor = function() {
        this.clear(true, false, false);
      }, this.clearDepth = function() {
        this.clear(false, true, false);
      }, this.clearStencil = function() {
        this.clear(false, false, true);
      }, this.dispose = function() {
        C2.removeEventListener("webglcontextlost", eL2, false), C2.removeEventListener("webglcontextrestored", eU2, false), C2.removeEventListener("webglcontextcreationerror", eD2, false), M2.dispose(), _2.dispose(), v2.dispose(), s2.dispose(), c2.dispose(), u2.dispose(), f2.dispose(), w2.dispose(), R2.dispose(), m2.dispose(), eI2.dispose(), eI2.removeEventListener("sessionstart", eB2), eI2.removeEventListener("sessionend", ez2), eV2.stop();
      }, this.renderBufferDirect = function(e11, t11, a11, o2, f3, m3) {
        let _3;
        null === t11 && (t11 = eT2);
        let v3 = f3.isMesh && 0 > f3.matrixWorld.determinant(), y3 = (function(e12, t12, i11, a12, o3) {
          var d3, p3;
          true !== t12.isScene && (t12 = eT2), h2.resetTextureUnits();
          let f4 = t12.fog, m4 = a12.isMeshStandardMaterial ? t12.environment : null, _4 = null === ei2 ? $2.outputColorSpace : true === ei2.isXRRenderTarget ? ei2.texture.colorSpace : l, v4 = (a12.isMeshStandardMaterial ? u2 : c2).get(a12.envMap || m4), y4 = true === a12.vertexColors && !!i11.attributes.color && 4 === i11.attributes.color.itemSize, M4 = !!i11.attributes.tangent && (!!a12.normalMap || a12.anisotropy > 0), E3 = !!i11.morphAttributes.position, T3 = !!i11.morphAttributes.normal, b3 = !!i11.morphAttributes.color, A4 = 0;
          a12.toneMapped && (null === ei2 || true === ei2.isXRRenderTarget) && (A4 = $2.toneMapping);
          let w3 = i11.morphAttributes.position || i11.morphAttributes.normal || i11.morphAttributes.color, C4 = void 0 !== w3 ? w3.length : 0, P4 = s2.get(a12), I4 = q2.state.lights;
          if (true === ex2 && (true === ey2 || e12 !== er2)) {
            let t13 = e12 === er2 && a12.id === en2;
            x2.setState(a12, e12, t13);
          }
          let L3 = false;
          a12.version === P4.__version ? P4.needsLights && P4.lightsStateVersion !== I4.state.version || P4.outputColorSpace !== _4 || o3.isBatchedMesh && false === P4.batching ? L3 = true : o3.isBatchedMesh || true !== P4.batching ? o3.isBatchedMesh && true === P4.batchingColor && null === o3.colorTexture || o3.isBatchedMesh && false === P4.batchingColor && null !== o3.colorTexture || o3.isInstancedMesh && false === P4.instancing ? L3 = true : o3.isInstancedMesh || true !== P4.instancing ? o3.isSkinnedMesh && false === P4.skinning ? L3 = true : o3.isSkinnedMesh || true !== P4.skinning ? o3.isInstancedMesh && true === P4.instancingColor && null === o3.instanceColor || o3.isInstancedMesh && false === P4.instancingColor && null !== o3.instanceColor || o3.isInstancedMesh && true === P4.instancingMorph && null === o3.morphTexture || o3.isInstancedMesh && false === P4.instancingMorph && null !== o3.morphTexture || P4.envMap !== v4 || true === a12.fog && P4.fog !== f4 || void 0 !== P4.numClippingPlanes && (P4.numClippingPlanes !== x2.numPlanes || P4.numIntersection !== x2.numIntersection) || P4.vertexAlphas !== y4 || P4.vertexTangents !== M4 || P4.morphTargets !== E3 || P4.morphNormals !== T3 || P4.morphColors !== b3 || P4.toneMapping !== A4 ? L3 = true : P4.morphTargetsCount !== C4 && (L3 = true) : L3 = true : L3 = true : L3 = true : (L3 = true, P4.__version = a12.version);
          let U4 = P4.currentProgram;
          true === L3 && (U4 = ej2(a12, t12, o3));
          let D2 = false, N2 = false, O3 = false, F3 = U4.getUniforms(), B2 = P4.uniforms;
          if (r10.useProgram(U4.program) && (D2 = true, N2 = true, O3 = true), a12.id !== en2 && (en2 = a12.id, N2 = true), D2 || er2 !== e12) {
            r10.buffers.depth.getReversed() && true !== e12.reversedDepth && (e12._reversedDepth = true, e12.updateProjectionMatrix()), F3.setValue(eR2, "projectionMatrix", e12.projectionMatrix), F3.setValue(eR2, "viewMatrix", e12.matrixWorldInverse);
            let t13 = F3.map.cameraPosition;
            void 0 !== t13 && t13.setValue(eR2, eS2.setFromMatrixPosition(e12.matrixWorld)), n10.logarithmicDepthBuffer && F3.setValue(eR2, "logDepthBufFC", 2 / (Math.log(e12.far + 1) / Math.LN2)), (a12.isMeshPhongMaterial || a12.isMeshToonMaterial || a12.isMeshLambertMaterial || a12.isMeshBasicMaterial || a12.isMeshStandardMaterial || a12.isShaderMaterial) && F3.setValue(eR2, "isOrthographic", true === e12.isOrthographicCamera), er2 !== e12 && (er2 = e12, N2 = true, O3 = true);
          }
          if (o3.isSkinnedMesh) {
            F3.setOptional(eR2, o3, "bindMatrix"), F3.setOptional(eR2, o3, "bindMatrixInverse");
            let e13 = o3.skeleton;
            e13 && (null === e13.boneTexture && e13.computeBoneTexture(), F3.setValue(eR2, "boneTexture", e13.boneTexture, h2));
          }
          o3.isBatchedMesh && (F3.setOptional(eR2, o3, "batchingTexture"), F3.setValue(eR2, "batchingTexture", o3._matricesTexture, h2), F3.setOptional(eR2, o3, "batchingIdTexture"), F3.setValue(eR2, "batchingIdTexture", o3._indirectTexture, h2), F3.setOptional(eR2, o3, "batchingColorTexture"), null !== o3._colorsTexture && F3.setValue(eR2, "batchingColorTexture", o3._colorsTexture, h2));
          let z3 = i11.morphAttributes;
          if ((void 0 !== z3.position || void 0 !== z3.normal || void 0 !== z3.color) && S2.update(o3, i11, U4), (N2 || P4.receiveShadow !== o3.receiveShadow) && (P4.receiveShadow = o3.receiveShadow, F3.setValue(eR2, "receiveShadow", o3.receiveShadow)), a12.isMeshGouraudMaterial && null !== a12.envMap && (B2.envMap.value = v4, B2.flipEnvMap.value = v4.isCubeTexture && false === v4.isRenderTargetTexture ? -1 : 1), a12.isMeshStandardMaterial && null === a12.envMap && null !== t12.environment && (B2.envMapIntensity.value = t12.environmentIntensity), N2 && (F3.setValue(eR2, "toneMappingExposure", $2.toneMappingExposure), P4.needsLights && (d3 = B2, p3 = O3, d3.ambientLightColor.needsUpdate = p3, d3.lightProbe.needsUpdate = p3, d3.directionalLights.needsUpdate = p3, d3.directionalLightShadows.needsUpdate = p3, d3.pointLights.needsUpdate = p3, d3.pointLightShadows.needsUpdate = p3, d3.spotLights.needsUpdate = p3, d3.spotLightShadows.needsUpdate = p3, d3.rectAreaLights.needsUpdate = p3, d3.hemisphereLights.needsUpdate = p3), f4 && true === a12.fog && g2.refreshFogUniforms(B2, f4), g2.refreshMaterialUniforms(B2, a12, ed2, eu2, q2.state.transmissionRenderTarget[e12.id]), av.upload(eR2, eq2(P4), B2, h2)), a12.isShaderMaterial && true === a12.uniformsNeedUpdate && (av.upload(eR2, eq2(P4), B2, h2), a12.uniformsNeedUpdate = false), a12.isSpriteMaterial && F3.setValue(eR2, "center", o3.center), F3.setValue(eR2, "modelViewMatrix", o3.modelViewMatrix), F3.setValue(eR2, "normalMatrix", o3.normalMatrix), F3.setValue(eR2, "modelMatrix", o3.matrixWorld), a12.isShaderMaterial || a12.isRawShaderMaterial) {
            let e13 = a12.uniformsGroups;
            for (let t13 = 0, i12 = e13.length; t13 < i12; t13++) {
              let i13 = e13[t13];
              R2.update(i13, U4), R2.bind(i13, U4);
            }
          }
          return U4;
        })(e11, t11, a11, o2, f3);
        r10.setMaterial(o2, v3);
        let M3 = a11.index, b2 = 1;
        if (true === o2.wireframe) {
          if (void 0 === (M3 = p2.getWireframeAttribute(a11))) return;
          b2 = 2;
        }
        let A3 = a11.drawRange, C3 = a11.attributes.position, P3 = A3.start * b2, I3 = (A3.start + A3.count) * b2;
        null !== m3 && (P3 = Math.max(P3, m3.start * b2), I3 = Math.min(I3, (m3.start + m3.count) * b2)), null !== M3 ? (P3 = Math.max(P3, 0), I3 = Math.min(I3, M3.count)) : null != C3 && (P3 = Math.max(P3, 0), I3 = Math.min(I3, C3.count));
        let L2 = I3 - P3;
        if (L2 < 0 || L2 === 1 / 0) return;
        w2.setup(f3, o2, y3, a11, M3);
        let U3 = E2;
        if (null !== M3 && (_3 = d2.get(M3), (U3 = T2).setIndex(_3)), f3.isMesh) true === o2.wireframe ? (r10.setLineWidth(o2.wireframeLinewidth * ew2()), U3.setMode(eR2.LINES)) : U3.setMode(eR2.TRIANGLES);
        else if (f3.isLine) {
          let e12 = o2.linewidth;
          void 0 === e12 && (e12 = 1), r10.setLineWidth(e12 * ew2()), f3.isLineSegments ? U3.setMode(eR2.LINES) : f3.isLineLoop ? U3.setMode(eR2.LINE_LOOP) : U3.setMode(eR2.LINE_STRIP);
        } else f3.isPoints ? U3.setMode(eR2.POINTS) : f3.isSprite && U3.setMode(eR2.TRIANGLES);
        if (f3.isBatchedMesh) if (null !== f3._multiDrawInstances) D("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."), U3.renderMultiDrawInstances(f3._multiDrawStarts, f3._multiDrawCounts, f3._multiDrawCount, f3._multiDrawInstances);
        else if (i10.get("WEBGL_multi_draw")) U3.renderMultiDraw(f3._multiDrawStarts, f3._multiDrawCounts, f3._multiDrawCount);
        else {
          let e12 = f3._multiDrawStarts, t12 = f3._multiDrawCounts, i11 = f3._multiDrawCount, n11 = M3 ? d2.get(M3).bytesPerElement : 1, r11 = s2.get(o2).currentProgram.getUniforms();
          for (let a12 = 0; a12 < i11; a12++) r11.setValue(eR2, "_gl_DrawID", a12), U3.render(e12[a12] / n11, t12[a12]);
        }
        else if (f3.isInstancedMesh) U3.renderInstances(P3, L2, f3.count);
        else if (a11.isInstancedBufferGeometry) {
          let e12 = void 0 !== a11._maxInstanceCount ? a11._maxInstanceCount : 1 / 0, t12 = Math.min(a11.instanceCount, e12);
          U3.renderInstances(P3, L2, t12);
        } else U3.render(P3, L2);
      }, this.compile = function(e11, t11, i11 = null) {
        null === i11 && (i11 = e11), (q2 = v2.get(i11)).init(t11), Z2.push(q2), i11.traverseVisible(function(e12) {
          e12.isLight && e12.layers.test(t11.layers) && (q2.pushLight(e12), e12.castShadow && q2.pushShadow(e12));
        }), e11 !== i11 && e11.traverseVisible(function(e12) {
          e12.isLight && e12.layers.test(t11.layers) && (q2.pushLight(e12), e12.castShadow && q2.pushShadow(e12));
        }), q2.setupLights();
        let n11 = /* @__PURE__ */ new Set();
        return e11.traverse(function(e12) {
          if (!(e12.isMesh || e12.isPoints || e12.isLine || e12.isSprite)) return;
          let t12 = e12.material;
          if (t12) if (Array.isArray(t12)) for (let r11 = 0; r11 < t12.length; r11++) {
            let a11 = t12[r11];
            eO2(a11, i11, e12), n11.add(a11);
          }
          else eO2(t12, i11, e12), n11.add(t12);
        }), q2 = Z2.pop(), n11;
      }, this.compileAsync = function(e11, t11, n11 = null) {
        let r11 = this.compile(e11, t11, n11);
        return new Promise((t12) => {
          function n12() {
            (r11.forEach(function(e12) {
              s2.get(e12).currentProgram.isReady() && r11.delete(e12);
            }), 0 === r11.size) ? t12(e11) : setTimeout(n12, 10);
          }
          null !== i10.get("KHR_parallel_shader_compile") ? n12() : setTimeout(n12, 10);
        });
      };
      let eF2 = null;
      function eB2() {
        eV2.stop();
      }
      function ez2() {
        eV2.start();
      }
      const eV2 = new nZ();
      function eH2(e11, t11, i11, n11) {
        if (false === e11.visible) return;
        if (e11.layers.test(t11.layers)) {
          if (e11.isGroup) i11 = e11.renderOrder;
          else if (e11.isLOD) true === e11.autoUpdate && e11.update(t11);
          else if (e11.isLight) q2.pushLight(e11), e11.castShadow && q2.pushShadow(e11);
          else if (e11.isSprite) {
            if (!e11.frustumCulled || ev2.intersectsSprite(e11)) {
              n11 && eE2.setFromMatrixPosition(e11.matrixWorld).applyMatrix4(eM2);
              let t12 = f2.update(e11), r12 = e11.material;
              r12.visible && j2.push(e11, t12, r12, i11, eE2.z, null);
            }
          } else if ((e11.isMesh || e11.isLine || e11.isPoints) && (!e11.frustumCulled || ev2.intersectsObject(e11))) {
            let t12 = f2.update(e11), r12 = e11.material;
            if (n11 && (void 0 !== e11.boundingSphere ? (null === e11.boundingSphere && e11.computeBoundingSphere(), eE2.copy(e11.boundingSphere.center)) : (null === t12.boundingSphere && t12.computeBoundingSphere(), eE2.copy(t12.boundingSphere.center)), eE2.applyMatrix4(e11.matrixWorld).applyMatrix4(eM2)), Array.isArray(r12)) {
              let n12 = t12.groups;
              for (let a11 = 0, s3 = n12.length; a11 < s3; a11++) {
                let s4 = n12[a11], o2 = r12[s4.materialIndex];
                o2 && o2.visible && j2.push(e11, t12, o2, i11, eE2.z, s4);
              }
            } else r12.visible && j2.push(e11, t12, r12, i11, eE2.z, null);
          }
        }
        let r11 = e11.children;
        for (let e12 = 0, a11 = r11.length; e12 < a11; e12++) eH2(r11[e12], t11, i11, n11);
      }
      function ek2(e11, t11, i11, n11) {
        let a11 = e11.opaque, s3 = e11.transmissive, o2 = e11.transparent;
        q2.setupLightsView(i11), true === ex2 && x2.setGlobalState($2.clippingPlanes, i11), n11 && r10.viewport(ea2.copy(n11)), a11.length > 0 && eW2(a11, t11, i11), s3.length > 0 && eW2(s3, t11, i11), o2.length > 0 && eW2(o2, t11, i11), r10.buffers.depth.setTest(true), r10.buffers.depth.setMask(true), r10.buffers.color.setMask(true), r10.setPolygonOffset(false);
      }
      function eG2(e11, t11, n11, r11) {
        if (null !== (true === n11.isScene ? n11.overrideMaterial : null)) return;
        void 0 === q2.state.transmissionRenderTarget[r11.id] && (q2.state.transmissionRenderTarget[r11.id] = new J(1, 1, { generateMipmaps: true, type: i10.has("EXT_color_buffer_half_float") || i10.has("EXT_color_buffer_float") ? 1016 : 1009, minFilter: 1008, samples: 4, stencilBuffer: U2, resolveDepthBuffer: false, resolveStencilBuffer: false, colorSpace: B.workingColorSpace }));
        let a11 = q2.state.transmissionRenderTarget[r11.id], s3 = r11.viewport || ea2;
        a11.setSize(s3.z * $2.transmissionResolutionScale, s3.w * $2.transmissionResolutionScale);
        let o2 = $2.getRenderTarget(), l2 = $2.getActiveCubeFace(), c3 = $2.getActiveMipmapLevel();
        $2.setRenderTarget(a11), $2.getClearColor(el2), (eh2 = $2.getClearAlpha()) < 1 && $2.setClearColor(16777215, 0.5), $2.clear(), eb2 && M2.render(n11);
        let u3 = $2.toneMapping;
        $2.toneMapping = 0;
        let d3 = r11.viewport;
        if (void 0 !== r11.viewport && (r11.viewport = void 0), q2.setupLightsView(r11), true === ex2 && x2.setGlobalState($2.clippingPlanes, r11), eW2(e11, n11, r11), h2.updateMultisampleRenderTarget(a11), h2.updateRenderTargetMipmap(a11), false === i10.has("WEBGL_multisampled_render_to_texture")) {
          let e12 = false;
          for (let i11 = 0, a12 = t11.length; i11 < a12; i11++) {
            let a13 = t11[i11], s4 = a13.object, o3 = a13.geometry, l3 = a13.material, h3 = a13.group;
            if (2 === l3.side && s4.layers.test(r11.layers)) {
              let t12 = l3.side;
              l3.side = 1, l3.needsUpdate = true, eX2(s4, n11, r11, o3, l3, h3), l3.side = t12, l3.needsUpdate = true, e12 = true;
            }
          }
          true === e12 && (h2.updateMultisampleRenderTarget(a11), h2.updateRenderTargetMipmap(a11));
        }
        $2.setRenderTarget(o2, l2, c3), $2.setClearColor(el2, eh2), void 0 !== d3 && (r11.viewport = d3), $2.toneMapping = u3;
      }
      function eW2(e11, t11, i11) {
        let n11 = true === t11.isScene ? t11.overrideMaterial : null;
        for (let r11 = 0, a11 = e11.length; r11 < a11; r11++) {
          let a12 = e11[r11], s3 = a12.object, o2 = a12.geometry, l2 = a12.group, h3 = a12.material;
          true === h3.allowOverride && null !== n11 && (h3 = n11), s3.layers.test(i11.layers) && eX2(s3, t11, i11, o2, h3, l2);
        }
      }
      function eX2(e11, t11, i11, n11, r11, a11) {
        e11.onBeforeRender($2, t11, i11, n11, r11, a11), e11.modelViewMatrix.multiplyMatrices(i11.matrixWorldInverse, e11.matrixWorld), e11.normalMatrix.getNormalMatrix(e11.modelViewMatrix), r11.onBeforeRender($2, t11, i11, n11, e11, a11), true === r11.transparent && 2 === r11.side && false === r11.forceSinglePass ? (r11.side = 1, r11.needsUpdate = true, $2.renderBufferDirect(i11, t11, n11, r11, e11, a11), r11.side = 0, r11.needsUpdate = true, $2.renderBufferDirect(i11, t11, n11, r11, e11, a11), r11.side = 2) : $2.renderBufferDirect(i11, t11, n11, r11, e11, a11), e11.onAfterRender($2, t11, i11, n11, r11, a11);
      }
      function ej2(e11, t11, i11) {
        var n11;
        true !== t11.isScene && (t11 = eT2);
        let r11 = s2.get(e11), a11 = q2.state.lights, o2 = q2.state.shadowsArray, l2 = a11.state.version, h3 = m2.getParameters(e11, a11.state, o2, t11, i11), d3 = m2.getProgramCacheKey(h3), p3 = r11.programs;
        r11.environment = e11.isMeshStandardMaterial ? t11.environment : null, r11.fog = t11.fog, r11.envMap = (e11.isMeshStandardMaterial ? u2 : c2).get(e11.envMap || r11.environment), r11.envMapRotation = null !== r11.environment && null === e11.envMap ? t11.environmentRotation : e11.envMapRotation, void 0 === p3 && (e11.addEventListener("dispose", eN2), r11.programs = p3 = /* @__PURE__ */ new Map());
        let f3 = p3.get(d3);
        if (void 0 !== f3) {
          if (r11.currentProgram === f3 && r11.lightsStateVersion === l2) return eY2(e11, h3), f3;
        } else h3.uniforms = m2.getUniforms(e11), e11.onBeforeCompile(h3, $2), f3 = m2.acquireProgram(h3, d3), p3.set(d3, f3), r11.uniforms = h3.uniforms;
        let g3 = r11.uniforms;
        return (e11.isShaderMaterial || e11.isRawShaderMaterial) && true !== e11.clipping || (g3.clippingPlanes = x2.uniform), eY2(e11, h3), r11.needsLights = (n11 = e11).isMeshLambertMaterial || n11.isMeshToonMaterial || n11.isMeshPhongMaterial || n11.isMeshStandardMaterial || n11.isShadowMaterial || n11.isShaderMaterial && true === n11.lights, r11.lightsStateVersion = l2, r11.needsLights && (g3.ambientLightColor.value = a11.state.ambient, g3.lightProbe.value = a11.state.probe, g3.directionalLights.value = a11.state.directional, g3.directionalLightShadows.value = a11.state.directionalShadow, g3.spotLights.value = a11.state.spot, g3.spotLightShadows.value = a11.state.spotShadow, g3.rectAreaLights.value = a11.state.rectArea, g3.ltc_1.value = a11.state.rectAreaLTC1, g3.ltc_2.value = a11.state.rectAreaLTC2, g3.pointLights.value = a11.state.point, g3.pointLightShadows.value = a11.state.pointShadow, g3.hemisphereLights.value = a11.state.hemi, g3.directionalShadowMap.value = a11.state.directionalShadowMap, g3.directionalShadowMatrix.value = a11.state.directionalShadowMatrix, g3.spotShadowMap.value = a11.state.spotShadowMap, g3.spotLightMatrix.value = a11.state.spotLightMatrix, g3.spotLightMap.value = a11.state.spotLightMap, g3.pointShadowMap.value = a11.state.pointShadowMap, g3.pointShadowMatrix.value = a11.state.pointShadowMatrix), r11.currentProgram = f3, r11.uniformsList = null, f3;
      }
      function eq2(e11) {
        if (null === e11.uniformsList) {
          let t11 = e11.currentProgram.getUniforms();
          e11.uniformsList = av.seqWithValue(t11.seq, e11.uniforms);
        }
        return e11.uniformsList;
      }
      function eY2(e11, t11) {
        let i11 = s2.get(e11);
        i11.outputColorSpace = t11.outputColorSpace, i11.batching = t11.batching, i11.batchingColor = t11.batchingColor, i11.instancing = t11.instancing, i11.instancingColor = t11.instancingColor, i11.instancingMorph = t11.instancingMorph, i11.skinning = t11.skinning, i11.morphTargets = t11.morphTargets, i11.morphNormals = t11.morphNormals, i11.morphColors = t11.morphColors, i11.morphTargetsCount = t11.morphTargetsCount, i11.numClippingPlanes = t11.numClippingPlanes, i11.numIntersection = t11.numClipIntersection, i11.vertexAlphas = t11.vertexAlphas, i11.vertexTangents = t11.vertexTangents, i11.toneMapping = t11.toneMapping;
      }
      eV2.setAnimationLoop(function(e11) {
        eF2 && eF2(e11);
      }), "u" > typeof self && eV2.setContext(self), this.setAnimationLoop = function(e11) {
        eF2 = e11, eI2.setAnimationLoop(e11), null === e11 ? eV2.stop() : eV2.start();
      }, eI2.addEventListener("sessionstart", eB2), eI2.addEventListener("sessionend", ez2), this.render = function(e11, t11) {
        if (void 0 !== t11 && true !== t11.isCamera) return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        if (true === Q2) return;
        if (true === e11.matrixWorldAutoUpdate && e11.updateMatrixWorld(), null === t11.parent && true === t11.matrixWorldAutoUpdate && t11.updateMatrixWorld(), true === eI2.enabled && true === eI2.isPresenting && (true === eI2.cameraAutoUpdate && eI2.updateCamera(t11), t11 = eI2.getCamera()), true === e11.isScene && e11.onBeforeRender($2, e11, t11, ei2), (q2 = v2.get(e11, Z2.length)).init(t11), Z2.push(q2), eM2.multiplyMatrices(t11.projectionMatrix, t11.matrixWorldInverse), ev2.setFromProjectionMatrix(eM2, 2e3, t11.reversedDepth), ey2 = this.localClippingEnabled, ex2 = x2.init(this.clippingPlanes, ey2), (j2 = _2.get(e11, K2.length)).init(), K2.push(j2), true === eI2.enabled && true === eI2.isPresenting) {
          let e12 = $2.xr.getDepthSensingMesh();
          null !== e12 && eH2(e12, t11, -1 / 0, $2.sortObjects);
        }
        eH2(e11, t11, 0, $2.sortObjects), j2.finish(), true === $2.sortObjects && j2.sort(ep2, ef2), (eb2 = false === eI2.enabled || false === eI2.isPresenting || false === eI2.hasDepthSensing()) && M2.addToRenderList(j2, e11), this.info.render.frame++, true === ex2 && x2.beginShadows();
        let i11 = q2.state.shadowsArray;
        y2.render(i11, e11, t11), true === ex2 && x2.endShadows(), true === this.info.autoReset && this.info.reset();
        let n11 = j2.opaque, r11 = j2.transmissive;
        if (q2.setupLights(), t11.isArrayCamera) {
          let i12 = t11.cameras;
          if (r11.length > 0) for (let t12 = 0, a11 = i12.length; t12 < a11; t12++) eG2(n11, r11, e11, i12[t12]);
          eb2 && M2.render(e11);
          for (let t12 = 0, n12 = i12.length; t12 < n12; t12++) {
            let n13 = i12[t12];
            ek2(j2, e11, n13, n13.viewport);
          }
        } else r11.length > 0 && eG2(n11, r11, e11, t11), eb2 && M2.render(e11), ek2(j2, e11, t11);
        null !== ei2 && 0 === et2 && (h2.updateMultisampleRenderTarget(ei2), h2.updateRenderTargetMipmap(ei2)), true === e11.isScene && e11.onAfterRender($2, e11, t11), w2.resetDefaultState(), en2 = -1, er2 = null, Z2.pop(), Z2.length > 0 ? (q2 = Z2[Z2.length - 1], true === ex2 && x2.setGlobalState($2.clippingPlanes, q2.state.camera)) : q2 = null, K2.pop(), j2 = K2.length > 0 ? K2[K2.length - 1] : null;
      }, this.getActiveCubeFace = function() {
        return ee2;
      }, this.getActiveMipmapLevel = function() {
        return et2;
      }, this.getRenderTarget = function() {
        return ei2;
      }, this.setRenderTargetTextures = function(e11, t11, i11) {
        let n11 = s2.get(e11);
        n11.__autoAllocateDepthBuffer = false === e11.resolveDepthBuffer, false === n11.__autoAllocateDepthBuffer && (n11.__useRenderToTexture = false), s2.get(e11.texture).__webglTexture = t11, s2.get(e11.depthTexture).__webglTexture = n11.__autoAllocateDepthBuffer ? void 0 : i11, n11.__hasExternalTextures = true;
      }, this.setRenderTargetFramebuffer = function(e11, t11) {
        let i11 = s2.get(e11);
        i11.__webglFramebuffer = t11, i11.__useDefaultFramebuffer = void 0 === t11;
      };
      const eK2 = eR2.createFramebuffer();
      this.setRenderTarget = function(e11, t11 = 0, i11 = 0) {
        ei2 = e11, ee2 = t11, et2 = i11;
        let n11 = true, a11 = null, o2 = false, l2 = false;
        if (e11) {
          let c3 = s2.get(e11);
          if (void 0 !== c3.__useDefaultFramebuffer) r10.bindFramebuffer(eR2.FRAMEBUFFER, null), n11 = false;
          else if (void 0 === c3.__webglFramebuffer) h2.setupRenderTarget(e11);
          else if (c3.__hasExternalTextures) h2.rebindTextures(e11, s2.get(e11.texture).__webglTexture, s2.get(e11.depthTexture).__webglTexture);
          else if (e11.depthBuffer) {
            let t12 = e11.depthTexture;
            if (c3.__boundDepthTexture !== t12) {
              if (null !== t12 && s2.has(t12) && (e11.width !== t12.image.width || e11.height !== t12.image.height)) throw Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
              h2.setupDepthRenderbuffer(e11);
            }
          }
          let u3 = e11.texture;
          (u3.isData3DTexture || u3.isDataArrayTexture || u3.isCompressedArrayTexture) && (l2 = true);
          let d3 = s2.get(e11).__webglFramebuffer;
          e11.isWebGLCubeRenderTarget ? (a11 = Array.isArray(d3[t11]) ? d3[t11][i11] : d3[t11], o2 = true) : a11 = e11.samples > 0 && false === h2.useMultisampledRTT(e11) ? s2.get(e11).__webglMultisampledFramebuffer : Array.isArray(d3) ? d3[i11] : d3, ea2.copy(e11.viewport), es2.copy(e11.scissor), eo2 = e11.scissorTest;
        } else ea2.copy(em2).multiplyScalar(ed2).floor(), es2.copy(eg2).multiplyScalar(ed2).floor(), eo2 = e_2;
        if (0 !== i11 && (a11 = eK2), r10.bindFramebuffer(eR2.FRAMEBUFFER, a11) && n11 && r10.drawBuffers(e11, a11), r10.viewport(ea2), r10.scissor(es2), r10.setScissorTest(eo2), o2) {
          let n12 = s2.get(e11.texture);
          eR2.framebufferTexture2D(eR2.FRAMEBUFFER, eR2.COLOR_ATTACHMENT0, eR2.TEXTURE_CUBE_MAP_POSITIVE_X + t11, n12.__webglTexture, i11);
        } else if (l2) for (let n12 = 0; n12 < e11.textures.length; n12++) {
          let r11 = s2.get(e11.textures[n12]);
          eR2.framebufferTextureLayer(eR2.FRAMEBUFFER, eR2.COLOR_ATTACHMENT0 + n12, r11.__webglTexture, i11, t11);
        }
        else if (null !== e11 && 0 !== i11) {
          let t12 = s2.get(e11.texture);
          eR2.framebufferTexture2D(eR2.FRAMEBUFFER, eR2.COLOR_ATTACHMENT0, eR2.TEXTURE_2D, t12.__webglTexture, i11);
        }
        en2 = -1;
      }, this.readRenderTargetPixels = function(e11, t11, i11, a11, o2, l2, h3, c3 = 0) {
        if (!(e11 && e11.isWebGLRenderTarget)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        let u3 = s2.get(e11).__webglFramebuffer;
        if (e11.isWebGLCubeRenderTarget && void 0 !== h3 && (u3 = u3[h3]), u3) {
          r10.bindFramebuffer(eR2.FRAMEBUFFER, u3);
          try {
            let r11 = e11.textures[c3], s3 = r11.format, h4 = r11.type;
            if (!n10.textureFormatReadable(s3)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            if (!n10.textureTypeReadable(h4)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            t11 >= 0 && t11 <= e11.width - a11 && i11 >= 0 && i11 <= e11.height - o2 && (e11.textures.length > 1 && eR2.readBuffer(eR2.COLOR_ATTACHMENT0 + c3), eR2.readPixels(t11, i11, a11, o2, A2.convert(s3), A2.convert(h4), l2));
          } finally {
            let e12 = null !== ei2 ? s2.get(ei2).__webglFramebuffer : null;
            r10.bindFramebuffer(eR2.FRAMEBUFFER, e12);
          }
        }
      }, this.readRenderTargetPixelsAsync = async function(e11, t11, i11, a11, o2, l2, h3, c3 = 0) {
        if (!(e11 && e11.isWebGLRenderTarget)) throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        let u3 = s2.get(e11).__webglFramebuffer;
        if (e11.isWebGLCubeRenderTarget && void 0 !== h3 && (u3 = u3[h3]), u3) if (t11 >= 0 && t11 <= e11.width - a11 && i11 >= 0 && i11 <= e11.height - o2) {
          r10.bindFramebuffer(eR2.FRAMEBUFFER, u3);
          let h4 = e11.textures[c3], d3 = h4.format, p3 = h4.type;
          if (!n10.textureFormatReadable(d3)) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
          if (!n10.textureTypeReadable(p3)) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
          let f3 = eR2.createBuffer();
          eR2.bindBuffer(eR2.PIXEL_PACK_BUFFER, f3), eR2.bufferData(eR2.PIXEL_PACK_BUFFER, l2.byteLength, eR2.STREAM_READ), e11.textures.length > 1 && eR2.readBuffer(eR2.COLOR_ATTACHMENT0 + c3), eR2.readPixels(t11, i11, a11, o2, A2.convert(d3), A2.convert(p3), 0);
          let m3 = null !== ei2 ? s2.get(ei2).__webglFramebuffer : null;
          r10.bindFramebuffer(eR2.FRAMEBUFFER, m3);
          let g3 = eR2.fenceSync(eR2.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return eR2.flush(), await N(eR2, g3, 4), eR2.bindBuffer(eR2.PIXEL_PACK_BUFFER, f3), eR2.getBufferSubData(eR2.PIXEL_PACK_BUFFER, 0, l2), eR2.deleteBuffer(f3), eR2.deleteSync(g3), l2;
        } else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }, this.copyFramebufferToTexture = function(e11, t11 = null, i11 = 0) {
        let n11 = Math.pow(2, -i11), a11 = Math.floor(e11.image.width * n11), s3 = Math.floor(e11.image.height * n11), o2 = null !== t11 ? t11.x : 0, l2 = null !== t11 ? t11.y : 0;
        h2.setTexture2D(e11, 0), eR2.copyTexSubImage2D(eR2.TEXTURE_2D, i11, 0, 0, o2, l2, a11, s3), r10.unbindTexture();
      };
      const eJ2 = eR2.createFramebuffer(), eZ2 = eR2.createFramebuffer();
      this.copyTextureToTexture = function(e11, t11, i11 = null, n11 = null, a11 = 0, o2 = null) {
        let l2, c3, u3, d3, p3, f3, m3, g3, _3, v3;
        null === o2 && (0 !== a11 ? (D("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."), o2 = a11, a11 = 0) : o2 = 0);
        let x3 = e11.isCompressedTexture ? e11.mipmaps[o2] : e11.image;
        if (null !== i11) l2 = i11.max.x - i11.min.x, c3 = i11.max.y - i11.min.y, u3 = i11.isBox3 ? i11.max.z - i11.min.z : 1, d3 = i11.min.x, p3 = i11.min.y, f3 = i11.isBox3 ? i11.min.z : 0;
        else {
          let t12 = Math.pow(2, -a11);
          l2 = Math.floor(x3.width * t12), c3 = Math.floor(x3.height * t12), u3 = e11.isDataArrayTexture ? x3.depth : e11.isData3DTexture ? Math.floor(x3.depth * t12) : 1, d3 = 0, p3 = 0, f3 = 0;
        }
        null !== n11 ? (m3 = n11.x, g3 = n11.y, _3 = n11.z) : (m3 = 0, g3 = 0, _3 = 0);
        let y3 = A2.convert(t11.format), M3 = A2.convert(t11.type);
        t11.isData3DTexture ? (h2.setTexture3D(t11, 0), v3 = eR2.TEXTURE_3D) : t11.isDataArrayTexture || t11.isCompressedArrayTexture ? (h2.setTexture2DArray(t11, 0), v3 = eR2.TEXTURE_2D_ARRAY) : (h2.setTexture2D(t11, 0), v3 = eR2.TEXTURE_2D), eR2.pixelStorei(eR2.UNPACK_FLIP_Y_WEBGL, t11.flipY), eR2.pixelStorei(eR2.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t11.premultiplyAlpha), eR2.pixelStorei(eR2.UNPACK_ALIGNMENT, t11.unpackAlignment);
        let S3 = eR2.getParameter(eR2.UNPACK_ROW_LENGTH), E3 = eR2.getParameter(eR2.UNPACK_IMAGE_HEIGHT), T3 = eR2.getParameter(eR2.UNPACK_SKIP_PIXELS), b2 = eR2.getParameter(eR2.UNPACK_SKIP_ROWS), w3 = eR2.getParameter(eR2.UNPACK_SKIP_IMAGES);
        eR2.pixelStorei(eR2.UNPACK_ROW_LENGTH, x3.width), eR2.pixelStorei(eR2.UNPACK_IMAGE_HEIGHT, x3.height), eR2.pixelStorei(eR2.UNPACK_SKIP_PIXELS, d3), eR2.pixelStorei(eR2.UNPACK_SKIP_ROWS, p3), eR2.pixelStorei(eR2.UNPACK_SKIP_IMAGES, f3);
        let R3 = e11.isDataArrayTexture || e11.isData3DTexture, C3 = t11.isDataArrayTexture || t11.isData3DTexture;
        if (e11.isDepthTexture) {
          let i12 = s2.get(e11), n12 = s2.get(t11), h3 = s2.get(i12.__renderTarget), v4 = s2.get(n12.__renderTarget);
          r10.bindFramebuffer(eR2.READ_FRAMEBUFFER, h3.__webglFramebuffer), r10.bindFramebuffer(eR2.DRAW_FRAMEBUFFER, v4.__webglFramebuffer);
          for (let i13 = 0; i13 < u3; i13++) R3 && (eR2.framebufferTextureLayer(eR2.READ_FRAMEBUFFER, eR2.COLOR_ATTACHMENT0, s2.get(e11).__webglTexture, a11, f3 + i13), eR2.framebufferTextureLayer(eR2.DRAW_FRAMEBUFFER, eR2.COLOR_ATTACHMENT0, s2.get(t11).__webglTexture, o2, _3 + i13)), eR2.blitFramebuffer(d3, p3, l2, c3, m3, g3, l2, c3, eR2.DEPTH_BUFFER_BIT, eR2.NEAREST);
          r10.bindFramebuffer(eR2.READ_FRAMEBUFFER, null), r10.bindFramebuffer(eR2.DRAW_FRAMEBUFFER, null);
        } else if (0 !== a11 || e11.isRenderTargetTexture || s2.has(e11)) {
          let i12 = s2.get(e11), n12 = s2.get(t11);
          r10.bindFramebuffer(eR2.READ_FRAMEBUFFER, eJ2), r10.bindFramebuffer(eR2.DRAW_FRAMEBUFFER, eZ2);
          for (let e12 = 0; e12 < u3; e12++) R3 ? eR2.framebufferTextureLayer(eR2.READ_FRAMEBUFFER, eR2.COLOR_ATTACHMENT0, i12.__webglTexture, a11, f3 + e12) : eR2.framebufferTexture2D(eR2.READ_FRAMEBUFFER, eR2.COLOR_ATTACHMENT0, eR2.TEXTURE_2D, i12.__webglTexture, a11), C3 ? eR2.framebufferTextureLayer(eR2.DRAW_FRAMEBUFFER, eR2.COLOR_ATTACHMENT0, n12.__webglTexture, o2, _3 + e12) : eR2.framebufferTexture2D(eR2.DRAW_FRAMEBUFFER, eR2.COLOR_ATTACHMENT0, eR2.TEXTURE_2D, n12.__webglTexture, o2), 0 !== a11 ? eR2.blitFramebuffer(d3, p3, l2, c3, m3, g3, l2, c3, eR2.COLOR_BUFFER_BIT, eR2.NEAREST) : C3 ? eR2.copyTexSubImage3D(v3, o2, m3, g3, _3 + e12, d3, p3, l2, c3) : eR2.copyTexSubImage2D(v3, o2, m3, g3, d3, p3, l2, c3);
          r10.bindFramebuffer(eR2.READ_FRAMEBUFFER, null), r10.bindFramebuffer(eR2.DRAW_FRAMEBUFFER, null);
        } else C3 ? e11.isDataTexture || e11.isData3DTexture ? eR2.texSubImage3D(v3, o2, m3, g3, _3, l2, c3, u3, y3, M3, x3.data) : t11.isCompressedArrayTexture ? eR2.compressedTexSubImage3D(v3, o2, m3, g3, _3, l2, c3, u3, y3, x3.data) : eR2.texSubImage3D(v3, o2, m3, g3, _3, l2, c3, u3, y3, M3, x3) : e11.isDataTexture ? eR2.texSubImage2D(eR2.TEXTURE_2D, o2, m3, g3, l2, c3, y3, M3, x3.data) : e11.isCompressedTexture ? eR2.compressedTexSubImage2D(eR2.TEXTURE_2D, o2, m3, g3, x3.width, x3.height, y3, x3.data) : eR2.texSubImage2D(eR2.TEXTURE_2D, o2, m3, g3, l2, c3, y3, M3, x3);
        eR2.pixelStorei(eR2.UNPACK_ROW_LENGTH, S3), eR2.pixelStorei(eR2.UNPACK_IMAGE_HEIGHT, E3), eR2.pixelStorei(eR2.UNPACK_SKIP_PIXELS, T3), eR2.pixelStorei(eR2.UNPACK_SKIP_ROWS, b2), eR2.pixelStorei(eR2.UNPACK_SKIP_IMAGES, w3), 0 === o2 && t11.generateMipmaps && eR2.generateMipmap(v3), r10.unbindTexture();
      }, this.initRenderTarget = function(e11) {
        void 0 === s2.get(e11).__webglFramebuffer && h2.setupRenderTarget(e11);
      }, this.initTexture = function(e11) {
        e11.isCubeTexture ? h2.setTextureCube(e11, 0) : e11.isData3DTexture ? h2.setTexture3D(e11, 0) : e11.isDataArrayTexture || e11.isCompressedArrayTexture ? h2.setTexture2DArray(e11, 0) : h2.setTexture2D(e11, 0), r10.unbindTexture();
      }, this.resetState = function() {
        ee2 = 0, et2 = 0, ei2 = null, r10.reset(), w2.reset();
      }, "u" > typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
    }
    get coordinateSystem() {
      return 2e3;
    }
    get outputColorSpace() {
      return this._outputColorSpace;
    }
    set outputColorSpace(e10) {
      this._outputColorSpace = e10;
      let t10 = this.getContext();
      t10.drawingBufferColorSpace = B._getDrawingBufferColorSpace(e10), t10.unpackColorSpace = B._getUnpackColorSpace();
    }
  }], 8560);
}]);
