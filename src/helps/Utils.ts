class Util {
  // Fromat ms
  public static ms(val: string | number, options?: { long: boolean }) {
    let s = 1000;
    let m = s * 60;
    let h = m * 60;
    let d = h * 24;
    let w = d * 7;
    let y = d * 365.25;

    let parse = (str) => {
      str = String(str);
      if (str.length > 100) return;
      let match = /^(-?(?:\d+)?\.?\d+) *(ms|s|m|h|d|w|y)?$/i.exec(str);
      if (!match) return;
      let n = parseFloat(match[1]);
      let type = (match[2] || 'ms').toLowerCase();
      switch (type) {
        case 'y':
          return n * y;
        case 'w':
          return n * w;
        case 'd':
          return n * d;
        case 'h':
          return n * h;
        case 'm':
          return n * m;
        case 's':
          return n * s;
        case 'ms':
          return n;
        default:
          return undefined;
      }
    };

    let fmtLong = (ms) => {
      let msAbs = Math.abs(ms);
      if (msAbs >= d) return plural(ms, msAbs, d, 'ngày');
      if (msAbs >= h) return plural(ms, msAbs, h, 'giờ');
      if (msAbs >= m) return plural(ms, msAbs, m, 'phút');
      if (msAbs >= s) return plural(ms, msAbs, s, 'giây');
      return ms + ' ms';
    };

    let fmtShort = (ms) => {
      let msAbs = Math.abs(ms);
      if (msAbs >= d) return Math.round(ms / d) + 'd';
      if (msAbs >= h) return Math.round(ms / h) + 'h';
      if (msAbs >= m) return Math.round(ms / m) + 'm';
      if (msAbs >= s) return Math.round(ms / s) + 's';
      return ms + 'ms';
    };

    let plural = (ms, msAbs, n, name) => {
      let isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + ' ' + name;
    };

    let type = typeof val;
    if (type === 'string') return parse(val);
    else if (type === 'number')
      return options && options.long ? fmtLong(val) : fmtShort(val);
  }

  public static toNumber(str: string) {
    let s = str.replace(/[.,a-zA-Zđ\s]/g, '');
    return parseInt(s) || undefined;
  }

  public static omit(value: Object[] | Object, key: string[]) {
    if (typeof value != 'object' || !Array.isArray(value)) {
      return value;
    }

    const omitObject = (value: Object, key: string[]) => {
      // Clone object
      let clone = JSON.parse(JSON.stringify(value));
      let keys = Object.keys(clone);
      // Delete key on key input
      for (let k = 0; k <= key.length; k++) {
        for (let e = 0; e <= keys.length; e++) {
          if (keys[e] == key[k]) {
            delete clone[keys[e]];
          }
        }
      }
      return clone;
    };

    if (Array.isArray(value)) {
      let result = [];
      value.map((element) => result.push(omitObject(element, key)));
      return result;
    } else {
      return omitObject(value, key);
    }
  }
}

export default Util;
