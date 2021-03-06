define(["jquery", "underscore", "modules/image/Img"], function(t, e, i) {
  "use strict";
  var a = function(e, a) {
    var s = this;
    if (this.map = a, this.$deferred = t.Deferred(), this.properties = {}, "string" == typeof e) {
      var r = e,
        o = i.getImageByURL(r);
      o.done(function(t) {
        s.initialize(t)
      })
    } else e.done ? e.done(function(t) {
      s.initialize(t)
    }) : this.initialize(e)
  };
  return a.prototype = {
    constructor: a,
    initialize: function(t) {
      this.image = t, this.width = this.image.width, this.height = this.image.height, this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.canvas.width = this.width, this.canvas.height = this.height, this.context.drawImage(this.image, 0, 0), this.options = {}, this.sourceScaleX = 1, this.sourceScaleY = 1, this.$deferred.resolve()
    },
    setOption: function(t, e) {
      this.options[t] = e
    },
    clearOptions: function() {
      this.options = {}
    },
    setProperty: function(t, e) {
      this.properties[t] = e
    },
    setProperties: function(t) {
      e.extend(this.properties, t)
    },
    getProperty: function(t) {
      return this.properties[t]
    },
    getProperties: function() {
      return this.properties
    },
    serialize: function() {
      var t = e.clone(this.properties);
      return t.dataURL = null, this.canvas && (t.dataURL = this.canvas.toDataURL("image/png")), t
    },
    draw: function() {
      var t = "resolved" === this.$deferred.state();
      if (t) {
        var i, a, s, r, o, n, h, c, l, d, p, g, f = Array.prototype.slice.apply(arguments);
        if (d = e.clone(this.options), "object" == typeof f[0] && "object" == typeof f[1]) {
          if (i = f[0], p = f[1], g = f[2], f[3] && e.extend(d, f[3]), a = 0, s = 0, r = 0, o = 0, p.region) {
            var u = this.map.regions[p.region];
            u || alert("Region " + p.region + " not found"), a = u[0], s = u[1], r = u[2], o = u[3]
          } else a = p.x, s = p.y, r = p.w, o = p.h;
          n = g.x, h = g.y, c = g.w, l = g.h, d.destinationScale && (c || (c = r * d.destinationScale), l || (l = o * d.destinationScale))
        } else {
          if (f.length > 1 && "object" == typeof f[f.length - 1]) {
            var v = f.pop();
            e.extend(d, v)
          }
          i = f[0], a = f[1], s = f[2], r = f[3], o = f[4], n = f[5], h = f[6], c = f[7], l = f[8], d.destinationScale && (c || (c = r * d.destinationScale), l || (l = o * d.destinationScale))
        }
        if (a = a || 0, s = s || 0, r = r || 0, o = o || 0, n = n || 0, h = h || 0, c = c || 0, l = l || 0, this.map && this.map.width && this.map.height && this.width > this.map.width && this.height > this.map.height && this.width % this.map.width === 0 && this.height % this.map.height === 0 ? (this.sourceScaleX = this.width / this.map.width, this.sourceScaleY = this.height / this.map.height) : d.standardWidth && d.standardHeight && (this.sourceScaleX = this.width / d.standardWidth, this.sourceScaleY = this.height / d.standardHeight), a *= this.sourceScaleX, s *= this.sourceScaleY, r *= this.sourceScaleX, o *= this.sourceScaleY, d.solidColourIsTransparent || d.solidColorIsTransparent) {
          for (var m = !0, w = this.context.getImageData(a, s, r, o), S = w.data, x = 0, y = null, I = null, b = 0; o > b; b++)
            for (var z = 0; r > z; z++) {
              var D = 4 * (b * r + z),
                R = S[D],
                X = S[D + 1],
                M = S[D + 2],
                P = S[D + 3],
                C = R;
              if (C = (C << 8) + X, C = (C << 8) + M, C = (C << 8) + P, y = I, I = C, x > 0 && y !== I) {
                m = !1;
                break
              }
              x++
            }
          if (m) return
        }
        this.drawNearestNeighbour(i, a, s, r, o, n, h, c, l, d)
      }
    },
    scales: [{
      scale: 1,
      steps: []
    }, {
      scale: 2,
      steps: [2]
    }, {
      scale: 3,
      steps: [3]
    }, {
      scale: 4,
      steps: [4]
    }, {
      scale: 8,
      steps: [4, 2]
    }, {
      scale: 12,
      steps: [4, 3]
    }, {
      scale: 16,
      steps: [4, 4]
    }],
    drawHQX: function(e, i, a, s, r, o, n, h, c, l) {
      var d = document.createElement("canvas"),
        p = d.getContext("2d");
      d.width = s, d.height = r;
      var g = this.context.getImageData(i, a, s, r);
      p.putImageData(g, 0, 0);
      var f = this.scales,
        u = e.context,
        v = d.toDataURL("image/png"),
        m = t("<img>");
      m.attr("src", v), m.load(function() {
        var t, e = m.get(0),
          i = null,
          a = 0,
          r = 0;
        for (t = 0; t < f.length; t++)
          if (i = f[t], a = s * i.scale, r = s * i.scale, a > h && r > c) {
            t > 0 && (i = f[t - 1]);
            break
          }
        var d = i.steps;
        for (t = 0; t < d.length; t++) {
          var p = d[t];
          e = HQX(e, p)
        }
        if (u.save(), u.translate(o, n), l.flip && ("horizontal" === l.flip ? (u.translate(h, 0), u.scale(-1, 1)) : "vertical" === l.flip && (u.translate(c, 0), u.scale(1, -1))), l.rotate) {
          var g = l.rotate * Math.PI / 180;
          u.rotate(g)
        }
        u.drawImage(e, 0, 0, h, c), u.restore()
      })
    },
    drawNearestNeighbour: function(t, e, i, a, s, r, o, n, h, c) {
      if (0 !== a && 0 !== s && 0 !== n && 0 !== h) {
        var l = this.context.getImageData(e, i, a, s),
          d = l.data,
          p = document.createElement("canvas");
        p.width = n, p.height = h;
        var g = p.getContext("2d"),
          f = n / a,
          u = h / s,
          v = Math.floor(f),
          m = Math.floor(u);
        f > v && (v += 1), u > m && (m += 1);
        for (var w = 0, S = 0, x = 0; s > x; x++) {
          for (var y = 0; a > y; y++) {
            var I = 4 * (x * a + y),
              b = d[I],
              z = d[I + 1],
              D = d[I + 2],
              R = d[I + 3] / 255;
            g.fillStyle = "rgba(" + b + "," + z + "," + D + "," + R + ")", g.fillRect(Math.floor(w), Math.floor(S), v, m), w += f
          }
          w = 0, S += u
        }
        var X = t.context;
        if (X.save(), X.translate(r, o), c.rotate) {
          var M = c.rotate * Math.PI / 180;
          X.rotate(M)
        }
        c.flip && ("horizontal" === c.flip ? (X.translate(n, 0), X.scale(-1, 1)) : "vertical" === c.flip && (X.translate(0, h), X.scale(1, -1))), X.drawImage(p, 0, 0), X.restore()
      }
    }
  }, a
});
