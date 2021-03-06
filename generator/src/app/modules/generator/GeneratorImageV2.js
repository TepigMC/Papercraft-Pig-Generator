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
        var i, a, s, r, o, n, h, c, l, d, p, f, g, u, v = Array.prototype.slice.apply(arguments);
        d = e.clone(this.options);
        var m = !("object" != typeof v[0] || "number" != typeof v[1] && "undefined" != typeof v[1] || "number" != typeof v[2] && "undefined" != typeof v[2]);
        if (m && (i = v[0], g = v[1] || 0, u = v[2] || 0, i.context.drawImage(this.canvas, g, u)), "object" == typeof v[0] && "object" == typeof v[1]) {
          if (i = v[0], p = v[1], f = v[2], v[3] && e.extend(d, v[3]), a = 0, s = 0, r = 0, o = 0, p.region) {
            var w = this.map.regions[p.region];
            w || alert("Region " + p.region + " not found"), a = w[0], s = w[1], r = w[2], o = w[3]
          } else a = p.x, s = p.y, r = p.w, o = p.h;
          n = f.x, h = f.y, c = f.w, l = f.h, d.destinationScale && (c || (c = r * d.destinationScale), l || (l = o * d.destinationScale))
        } else {
          if (v.length > 1 && "object" == typeof v[v.length - 1]) {
            var y = v.pop();
            e.extend(d, y)
          }
          i = v[0], a = v[1], s = v[2], r = v[3], o = v[4], n = v[5], h = v[6], c = v[7], l = v[8], d.destinationScale && (c || (c = r * d.destinationScale), l || (l = o * d.destinationScale))
        }
        if (a = a || 0, s = s || 0, r = r || 0, o = o || 0, n = n || 0, h = h || 0, c = c || 0, l = l || 0, this.map && this.map.width && this.map.height && this.width > this.map.width && this.height > this.map.height && this.width % this.map.width === 0 && this.height % this.map.height === 0 ? (this.sourceScaleX = this.width / this.map.width, this.sourceScaleY = this.height / this.map.height) : d.standardWidth && d.standardHeight && (this.sourceScaleX = this.width / d.standardWidth, this.sourceScaleY = this.height / d.standardHeight), a *= this.sourceScaleX, s *= this.sourceScaleY, r *= this.sourceScaleX, o *= this.sourceScaleY, d.solidColourIsTransparent || d.solidColorIsTransparent) {
          var S = !0,
            x = this.context.getImageData(a, s, r, o),
            I = x.data,
            b = 0,
            z = null,
            D = null;
          for (u = 0; o > u; u++)
            for (g = 0; r > g; g++) {
              var R = 4 * (u * r + g),
                X = I[R],
                M = I[R + 1],
                P = I[R + 2],
                j = I[R + 3],
                C = X;
              if (C = (C << 8) + M, C = (C << 8) + P, C = (C << 8) + j, z = D, D = C, b > 0 && z !== D) {
                S = !1;
                break
              }
              b++
            }
          if (S) return
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
      var f = this.context.getImageData(i, a, s, r);
      p.putImageData(f, 0, 0);
      var g = this.scales,
        u = e.context,
        v = d.toDataURL("image/png"),
        m = t("<img>");
      m.attr("src", v), m.load(function() {
        var t, e = m.get(0),
          i = null,
          a = 0,
          r = 0;
        for (t = 0; t < g.length; t++)
          if (i = g[t], a = s * i.scale, r = s * i.scale, a > h && r > c) {
            t > 0 && (i = g[t - 1]);
            break
          }
        var d = i.steps;
        for (t = 0; t < d.length; t++) {
          var p = d[t];
          e = HQX(e, p)
        }
        if (u.save(), u.translate(o, n), l.flip && ("horizontal" === l.flip ? (u.translate(h, 0), u.scale(-1, 1)) : "vertical" === l.flip && (u.translate(c, 0), u.scale(1, -1))), l.rotate) {
          var f = l.rotate * Math.PI / 180;
          u.rotate(f)
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
        var f = p.getContext("2d"),
          g = n / a,
          u = h / s,
          v = Math.floor(g),
          m = Math.floor(u);
        g > v && (v += 1), u > m && (m += 1);
        for (var w = 0, y = 0, S = 0; s > S; S++) {
          for (var x = 0; a > x; x++) {
            var I = 4 * (S * a + x),
              b = d[I],
              z = d[I + 1],
              D = d[I + 2],
              R = d[I + 3] / 255;
            f.fillStyle = "rgba(" + b + "," + z + "," + D + "," + R + ")", f.fillRect(Math.floor(w), Math.floor(y), v, m), w += g
          }
          w = 0, y += u
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
