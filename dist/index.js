!(function (e) { const t = {}; function r(n) { if (t[n]) return t[n].exports; const o = t[n] = { i: n, l: !1, exports: {} }; return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports; }r.m = e, r.c = t, r.d = function (e, t, n) { r.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: n }); }, r.r = function (e) { Object.defineProperty(e, '__esModule', { value: !0 }); }, r.n = function (e) { const t = e && e.__esModule ? function () { return e.default; } : function () { return e; }; return r.d(t, 'a', t), t; }, r.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t); }, r.p = '', r(r.s = 12); }([function (e, t) {
  const r = (e, t, r = 'id', n = 'id') => ({
    type: e, foreignKey: r, localKey: n, targetModel: t,
  }); e.exports.hasOne = r.bind(null, 'one'), e.exports.hasMany = r.bind(null, 'many');
}, function (e, t) {
  e.exports = class {
    constructor(e, t, r, n) { this.name = e, this.path = t, this.service = r, this.idField = n.idField, this.relations = n.relations; } async query(e, t = []) {
      this.validateIncludedModels(t); const { query: r, endpoint: n } = this.service.getEndpointAndQuery(this.path, e),
        o = await this.service.get(`${n}`, r); if (t.length) { const e = await this._getIncludedEntities(o, t); this._mergeIncludedEntities(o, t, e); } return o;
    } async get(e, t = []) {
      const { query: r, endpoint: n } = this.service.getEndpointAndQuery(`${this.path}/:id`, e),
        o = await this.service.get(`${n}`, Object.assign({}, r)); if (t.length) { const e = await this._getIncludedEntities([o], t); this._mergeIncludedEntities([o], t, e); } return o;
    } async create(e, t = {}) { const { endpoint: r } = this.service.getEndpointAndQuery(this.path, e); return this.service.post(r, e, t); } async update(e, t) { const { query: r, endpoint: n } = this.service.getEndpointAndQuery(`${this.path}/:id`, e); return this.service.put(n, t, r); } async delete(e, t = {}) { const { query: r, endpoint: n } = this.service.getEndpointAndQuery(`${this.path}/:id`, e); return this.service.delete(n, t, r); } async _getIncludedEntities(e, t) {
      const r = []; t.forEach((t) => {
        const n = [],
          { foreignKey: o, targetModel: i, localKey: s } = this.getRelation(t); e.forEach((e) => { n.push(e[s]); }), r.push(this.service.getModel(i).query({ [`${o}[]`]: n }));
      }); const n = await Promise.all(r),
        o = {}; return t.forEach((e, t) => { o[e] = n[t]; }), o;
    }_mergeIncludedEntities(e, t, r) {
      const n = {}; Object.entries(r).forEach(([e, t]) => { const { foreignKey: r } = this.relations[e]; n[e] = (function (e, t) { const r = {}; return e.forEach((e) => { if (e[t]) { const n = e[t]; r[n] = r[n] || [], r[n].push(e); } }), r; }(t, r)); }), e.forEach((e) => {
        t.forEach((t) => {
          const { type: r, localKey: o } = this.relations[t],
            i = e[o],
            s = n[t][i] || []; e[t] = r === 'many' ? s : s[0] || null;
        });
      });
    }hasRelation(e) { return this.relations.hasOwnProperty(e); }getRelation(e) { const t = this.relations[e]; if (!t) throw new Error(`No relation defined with name "${e}". Please define hasOne|hasMany relation to "${this.name}" in model config of Model.`); return t; }validateIncludedModels(e) { e.forEach((e) => { if (!this.hasRelation(e)) throw new Error(`Trying to use relation with field "${e}" in query results of "${this.name}", but relation is not defined in modelConfig. Define using modelConfig.hasOne() or modelConfig.hasMany().`); const { targetModel: t } = this.getRelation(e); if (!this.service.hasModel(t)) throw new Error(`Undefined model "${t}". Please define model before using.`); }); }
  };
}, function (e, t) { const r = { models: {}, addModel(e, t) { return this.models[e] = t, t; } }; e.exports = r; }, function (e, t, r) {
  e.exports = async function (e, t) { e.json().then(t); };
}, function (e, t, r) {
  const n = function (e) { switch (typeof e) { case 'string': return e; case 'boolean': return e ? 'true' : 'false'; case 'number': return isFinite(e) ? e : ''; default: return ''; } }; e.exports = function (e, t, r, a) { return t = t || '&', r = r || '=', e === null && (e = void 0), typeof e === 'object' ? i(s(e), (s) => { const a = encodeURIComponent(n(s)) + r; return o(e[s]) ? i(e[s], e => a + encodeURIComponent(n(e))).join(t) : a + encodeURIComponent(n(e[s])); }).join(t) : a ? encodeURIComponent(n(a)) + r + encodeURIComponent(n(e)) : ''; }; var o = Array.isArray || function (e) { return Object.prototype.toString.call(e) === '[object Array]'; }; function i(e, t) { if (e.map) return e.map(t); for (var r = [], n = 0; n < e.length; n++)r.push(t(e[n], n)); return r; } var s = Object.keys || function (e) { const t = []; for (const r in e)Object.prototype.hasOwnProperty.call(e, r) && t.push(r); return t; };
}, function (e, t, r) {
  function n(e, t) { return Object.prototype.hasOwnProperty.call(e, t); }e.exports = function (e, t, r, i) {
    t = t || '&', r = r || '='; const s = {}; if (typeof e !== 'string' || e.length === 0) return s; const a = /\+/g; e = e.split(t); let u = 1e3; i && typeof i.maxKeys === 'number' && (u = i.maxKeys); let d = e.length; u > 0 && d > u && (d = u); for (let h = 0; h < d; ++h) {
      var c,
        l,
        f,
        p,
        y = e[h].replace(a, '%20'),
        b = y.indexOf(r); b >= 0 ? (c = y.substr(0, b), l = y.substr(b + 1)) : (c = y, l = ''), f = decodeURIComponent(c), p = decodeURIComponent(l), n(s, f) ? o(s[f]) ? s[f].push(p) : s[f] = [s[f], p] : s[f] = p;
    } return s;
  }; var o = Array.isArray || function (e) { return Object.prototype.toString.call(e) === '[object Array]'; };
}, function (e, t, r) {
  t.decode = t.parse = r(5), t.encode = t.stringify = r(4);
}, function (e, t) {
  !(function (e) {
    if (!e.fetch) {
      var t = {
        searchParams: 'URLSearchParams' in e, iterable: 'Symbol' in e && 'iterator' in Symbol, blob: 'FileReader' in e && 'Blob' in e && (function () { try { return new Blob(), !0; } catch (e) { return !1; } }()), formData: 'FormData' in e, arrayBuffer: 'ArrayBuffer' in e,
      }; if (t.arrayBuffer) {
        var r = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'],
          n = function (e) { return e && DataView.prototype.isPrototypeOf(e); },
          o = ArrayBuffer.isView || function (e) { return e && r.indexOf(Object.prototype.toString.call(e)) > -1; };
      } h.prototype.append = function (e, t) { e = a(e), t = u(t); const r = this.map[e]; this.map[e] = r ? `${r},${t}` : t; }, h.prototype.delete = function (e) { delete this.map[a(e)]; }, h.prototype.get = function (e) { return e = a(e), this.has(e) ? this.map[e] : null; }, h.prototype.has = function (e) { return this.map.hasOwnProperty(a(e)); }, h.prototype.set = function (e, t) { this.map[a(e)] = u(t); }, h.prototype.forEach = function (e, t) { for (const r in this.map) this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this); }, h.prototype.keys = function () { const e = []; return this.forEach((t, r) => { e.push(r); }), d(e); }, h.prototype.values = function () { const e = []; return this.forEach((t) => { e.push(t); }), d(e); }, h.prototype.entries = function () { const e = []; return this.forEach((t, r) => { e.push([r, t]); }), d(e); }, t.iterable && (h.prototype[Symbol.iterator] = h.prototype.entries); var i = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']; b.prototype.clone = function () { return new b(this, { body: this._bodyInit }); }, y.call(b.prototype), y.call(w.prototype), w.prototype.clone = function () {
        return new w(this._bodyInit, {
          status: this.status, statusText: this.statusText, headers: new h(this.headers), url: this.url,
        });
      }, w.error = function () { const e = new w(null, { status: 0, statusText: '' }); return e.type = 'error', e; }; const s = [301, 302, 303, 307, 308]; w.redirect = function (e, t) { if (s.indexOf(t) === -1) throw new RangeError('Invalid status code'); return new w(null, { status: t, headers: { location: e } }); }, e.Headers = h, e.Request = b, e.Response = w, e.fetch = function (e, r) {
        return new Promise(((n, o) => {
          let i = new b(e, r),
            s = new XMLHttpRequest(); s.onload = function () {
            let e,
              t,
              r = {
                status: s.status,
                statusText: s.statusText,
                headers: (e = s.getAllResponseHeaders() || '', t = new h(), e.split(/\r?\n/).forEach((e) => {
                  let r = e.split(':'),
                    n = r.shift().trim(); if (n) { const o = r.join(':').trim(); t.append(n, o); }
                }), t),
              }; r.url = 'responseURL' in s ? s.responseURL : r.headers.get('X-Request-URL'); const o = 'response' in s ? s.response : s.responseText; n(new w(o, r));
          }, s.onerror = function () { o(new TypeError('Network request failed')); }, s.ontimeout = function () { o(new TypeError('Network request failed')); }, s.open(i.method, i.url, !0), i.credentials === 'include' && (s.withCredentials = !0), 'responseType' in s && t.blob && (s.responseType = 'blob'), i.headers.forEach((e, t) => { s.setRequestHeader(t, e); }), s.send(void 0 === i._bodyInit ? null : i._bodyInit);
        }));
      }, e.fetch.polyfill = !0;
    } function a(e) { if (typeof e !== 'string' && (e = String(e)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError('Invalid character in header field name'); return e.toLowerCase(); } function u(e) { return typeof e !== 'string' && (e = String(e)), e; } function d(e) { const r = { next() { const t = e.shift(); return { done: void 0 === t, value: t }; } }; return t.iterable && (r[Symbol.iterator] = function () { return r; }), r; } function h(e) { this.map = {}, e instanceof h ? e.forEach(function (e, t) { this.append(t, e); }, this) : Array.isArray(e) ? e.forEach(function (e) { this.append(e[0], e[1]); }, this) : e && Object.getOwnPropertyNames(e).forEach(function (t) { this.append(t, e[t]); }, this); } function c(e) { if (e.bodyUsed) return Promise.reject(new TypeError('Already read')); e.bodyUsed = !0; } function l(e) { return new Promise(((t, r) => { e.onload = function () { t(e.result); }, e.onerror = function () { r(e.error); }; })); } function f(e) {
      let t = new FileReader(),
        r = l(t); return t.readAsArrayBuffer(e), r;
    } function p(e) { if (e.slice) return e.slice(0); const t = new Uint8Array(e.byteLength); return t.set(new Uint8Array(e)), t.buffer; } function y() {
      return this.bodyUsed = !1, this._initBody = function (e) { if (this._bodyInit = e, e) if (typeof e === 'string') this._bodyText = e; else if (t.blob && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e; else if (t.formData && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e; else if (t.searchParams && URLSearchParams.prototype.isPrototypeOf(e)) this._bodyText = e.toString(); else if (t.arrayBuffer && t.blob && n(e)) this._bodyArrayBuffer = p(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]); else { if (!t.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(e) && !o(e)) throw new Error('unsupported BodyInit type'); this._bodyArrayBuffer = p(e); } else this._bodyText = ''; this.headers.get('content-type') || (typeof e === 'string' ? this.headers.set('content-type', 'text/plain;charset=UTF-8') : this._bodyBlob && this._bodyBlob.type ? this.headers.set('content-type', this._bodyBlob.type) : t.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')); }, t.blob && (this.blob = function () { const e = c(this); if (e) return e; if (this._bodyBlob) return Promise.resolve(this._bodyBlob); if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer])); if (this._bodyFormData) throw new Error('could not read FormData body as blob'); return Promise.resolve(new Blob([this._bodyText])); }, this.arrayBuffer = function () { return this._bodyArrayBuffer ? c(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(f); }), this.text = function () {
        let e,
          t,
          r,
          n = c(this); if (n) return n; if (this._bodyBlob) return e = this._bodyBlob, t = new FileReader(), r = l(t), t.readAsText(e), r; if (this._bodyArrayBuffer) return Promise.resolve(function (e) { for (var t = new Uint8Array(e), r = new Array(t.length), n = 0; n < t.length; n++)r[n] = String.fromCharCode(t[n]); return r.join(''); }(this._bodyArrayBuffer)); if (this._bodyFormData) throw new Error('could not read FormData body as text'); return Promise.resolve(this._bodyText);
      }, t.formData && (this.formData = function () { return this.text().then(m); }), this.json = function () { return this.text().then(JSON.parse); }, this;
    } function b(e, t) {
      let r,
        n,
        o = (t = t || {}).body; if (e instanceof b) { if (e.bodyUsed) throw new TypeError('Already read'); this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new h(e.headers)), this.method = e.method, this.mode = e.mode, o || e._bodyInit == null || (o = e._bodyInit, e.bodyUsed = !0); } else this.url = String(e); if (this.credentials = t.credentials || this.credentials || 'omit', !t.headers && this.headers || (this.headers = new h(t.headers)), this.method = (r = t.method || this.method || 'GET', n = r.toUpperCase(), i.indexOf(n) > -1 ? n : r), this.mode = t.mode || this.mode || null, this.referrer = null, (this.method === 'GET' || this.method === 'HEAD') && o) throw new TypeError('Body not allowed for GET or HEAD requests'); this._initBody(o);
    } function m(e) {
      const t = new FormData(); return e.trim().split('&').forEach((e) => {
        if (e) {
          let r = e.split('='),
            n = r.shift().replace(/\+/g, ' '),
            o = r.join('=').replace(/\+/g, ' '); t.append(decodeURIComponent(n), decodeURIComponent(o));
        }
      }), t;
    } function w(e, t) { t || (t = {}), this.type = 'default', this.status = 'status' in t ? t.status : 200, this.ok = this.status >= 200 && this.status < 300, this.statusText = 'statusText' in t ? t.statusText : 'OK', this.headers = new h(t.headers), this.url = t.url || '', this._initBody(e); }
  }(typeof self !== 'undefined' ? self : this));
}, function (e, t, r) { r(7), e.exports = self.fetch.bind(self); }, function (e, t, r) {
  r(8); const n = r(6); e.exports = function ({
    method: e, url: t, query: r, payload: o, headers: i,
  }, s) { const a = Object.values(r).length > 0 ? `?${n.stringify(r)}` : ''; const u = { method: e, headers: i }; if (o) { const e = Object.values(o).length > 0 ? JSON.stringify(o) : ''; e && (u.body = e); }fetch(`${t}${a}`, u).then(s); };
}, function (e, t, r) { e.exports = { fetchRequest: r(9), fetchResponse: r(3) }; }, function (e, t, r) {
  const { fetchResponse: n, fetchRequest: o } = r(10),
    i = r(2),
    s = r(1),
    { hasOne: a, hasMany: u } = r(0); class d {constructor() { this.relations = {}, this.idField = 'id', this.actions = {}, this.skippedMethods = []; }hasOne(e, t, ...r) { return this.relations[t] = a(e, ...r), this; }hasMany(e, t, ...r) { return this.relations[t] = u(e, ...r), this; }customActions(e) { return this.actions = e, this; }} class h {
    constructor(e) { this.baseURL = e, this.middlewares = [o, n]; }reduceMiddlewares(e, t) { return new Promise((async (r, n) => { try { let o = e; for (let e = 0; e < t.length; e++)o = await new Promise(((r) => { t[e](o, r); })); r(o); } catch (e) { n(e); } })); }useMiddlewares(e) { this.middlewares = e; }get(e, t = {}, r = {}) {
      return this.reduceMiddlewares({
        method: 'GET', url: e, query: t, headers: r,
      }, this.middlewares);
    }post(e, t, r = {}, n = {}) {
      return this.reduceMiddlewares({
        method: 'POST', url: e, payload: t, query: r, headers: n,
      }, this.middlewares);
    }put(e, t, r = {}, n = {}) {
      return this.reduceMiddlewares({
        method: 'PUT', url: e, payload: t, query: r, headers: n,
      }, this.middlewares);
    }delete(e, t, r = {}, n = {}) {
      return this.reduceMiddlewares({
        method: 'DELETE', url: e, payload: t, query: r, headers: n,
      }, this.middlewares);
    }getEndpoint(e, t = {}) { return (function (e, t) { let r = e; return Object.entries(t).forEach(([e, t]) => { r = r.replace(`:${e}`, t); }), r; }(`${this.baseURL}${e}`, t)); }getEndpointAndQuery(e, t) { let r = `${this.baseURL}${e}`; const n = {}; return Object.entries(t).forEach(([e, t]) => { r.indexOf(`:${e}`) !== -1 ? r = r.replace(`:${e}`, t) : n[e] = t; }), { endpoint: r, query: n }; }addModel({ path: e, alias: t, relations: r }) { return i.addModel(t, new s(e, this, r)); }getModel(e) { const t = i.models[e]; if (!t) throw new Error(`Undefined model "${e}". Please define model before using.`); return t; }hasModel(e) { return i.models.hasOwnProperty(e); }registerModel(e, t, r) { const n = r || new d(); class o extends s {} return Object.entries(n.actions).forEach(([e, { method: t, path: r }]) => { Object.defineProperty(o.prototype, e, { value: (function (e, t) { return async function (r, n, o) { const i = `${this.path}${t}`; return await this.service[e.toLowerCase()](`${this.service.getEndpoint(i, r)}`, n, o); }; }(t, r)) }); }), i.addModel(e, new o(e, t, this, n)); } static modelConfig() { return new d(); }
  }Object.defineProperty(h, 'defaultMiddlewares', { value: { fetchResponse: n, fetchRequest: o } }), e.exports = h;
}, function (e, t, r) { e.exports = r(11); }]));
// # sourceMappingURL=index.js.map
