define(["underscore", "./GeneratorPage"], function(t, e) {
  "use strict";
  var i = {
      width: 595,
      height: 842
    },
    a = function(t) {
      t = t || {}, this.images = t.images || {}, this.variables = t.variables || {}, this.inputs = t.inputs || {}, this.resetInputDefs(), this.resetVariableDefs(), this.resetImageOptions(), this.resetErrors(), this.resetPages()
    };
  return t.extend(a.prototype, {
    logError: function(t, e) {
      this.errorMap[t] || (this.errorMap[t] = e, this.errorArr.push(e))
    },
    getErrors: function() {
      return this.errorArr
    },
    resetErrors: function() {
      this.errorArr = [], this.errorMap = {}
    },
    resetPages: function() {
      this.currentPage = null, this.pageMap = {}, this.pageArr = []
    },
    addPage: function(t) {
      var e = t.getProperty("name");
      this.pageMap[e] = t, this.pageArr.push(t)
    },
    getPages: function() {
      return this.pageArr
    },
    createPage: function(t, a, r) {
      a = a || i.width, r = r || i.height;
      var n = new e(a, r);
      return n.setProperty("name", t), n
    },
    usePage: function(t, e, i) {
      if (!this.pageMap[t]) {
        var a = this.createPage(t, e, i);
        this.addPage(a)
      }
      this.currentPage = this.pageMap[t]
    },
    getCurrentPage: function() {
      return this.currentPage || this.usePage("Page"), this.currentPage
    },
    resetInputDefs: function() {
      this.inputDefMap = {}, this.inputDefArr = []
    },
    defineMinecraftSteveTextureInput: function(e, i) {
      var a = this;
      this.setImageOption(e, "standardWidth", i.standardWidth || 64), this.setImageOption(e, "standardHeight", i.standardHeight || 64), i.choices && t.each(i.choices, function(t) {
        a.setImageOption(t, "standardWidth", i.standardWidth || 64), a.setImageOption(t, "standardHeight", i.standardHeight || 64)
      })
    },
    defineInput: function(e, i) {
      i = i || {};
      var a = t.clone(i);
      a.type = a.type || "texture", a.id = e, this.inputDefArr.push(a), this.inputDefMap[e] = a, "minecraft-character-texture" === a.type ? this.defineMinecraftSteveTextureInput(e, a) : (a.standardWidth && this.setImageOption(e, "standardWidth", a.standardWidth), a.standardHeight && this.setImageOption(e, "standardHeight", a.standardHeight))
    },
    getInputDef: function(t) {
      return this.inputDefMap[t]
    },
    getInputDefs: function() {
      return this.inputDefArr
    },
    setInput: function(t, e) {
      this.inputs[t] = e
    },
    getInput: function(t) {
      return this.inputs[t]
    },
    getInputs: function() {
      return this.inputs
    },
    setInputs: function(t) {
      this.inputs = t
    },
    addImage: function(t) {
      var e = t.getProperty("id");
      this.images[e] = t, t.clearOptions()
    },
    addImages: function(t) {
      for (var e = 0; e < t.length; e++) this.addImage(t[e])
    },
    removeImage: function(t) {
      delete this.images[t]
    },
    getImage: function(t) {
      return this.getInput(t) || this.images[t]
    },
    getImages: function() {
      return this.images
    },
    hasImage: function(t) {
      return !!this.getImage(t)
    },
    setImageOption: function(t, e, i) {
      this.imageOptions[t] || (this.imageOptions[t] = {}), this.imageOptions[t][e] = i
    },
    resetImageOptions: function() {
      this.imageOptions = this.imageOptions || {}
    },
    resetVariableDefs: function() {
      this.variableDefMap = {}, this.variableDefArr = []
    },
    defineVariable: function(t) {
      this.variableDefMap[t.id] = t, this.variableDefArr.push(t)
    },
    hasVariableDef: function(t) {
      return this.variableDefMap.hasOwnProperty(t)
    },
    getVariableDefs: function() {
      return this.variableDefArr
    },
    defineBooleanVariable: function(t, e) {
      if (this.hasVariableDef(t)) return this.getVariable(t);
      var i = "object" == typeof e ? e.value : e,
        a = {
          id: t,
          type: "boolean",
          value: i
        };
      return this.defineVariable(a), this.hasVariable(t) || this.setVariable(t, a.value), this.getVariable(t)
    },
    defineRangeVariable: function(t, e) {
      if (this.hasVariableDef(t)) return this.getVariable(t);
      var i = {
        id: t,
        type: "range",
        min: e.min || 1,
        max: e.max || 100,
        step: e.step || 1,
        value: e.value || 50
      };
      return this.defineVariable(i), this.hasVariable(t) || this.setVariable(t, i.value), this.getVariable(t)
    },
    defineSelectVariable: function(t, e) {
      if (this.hasVariableDef(t)) return this.getVariable(t);
      var i = {
        id: t,
        type: "select",
        options: e || [],
        value: e.length ? e[0] : void 0
      };
      return this.defineVariable(i), this.hasVariable(t) || this.setVariable(t, i.value), this.getVariable(t)
    },
    setVariable: function(t, e) {
      this.variables[t] = e
    },
    getVariable: function(t) {
      return this.variables[t]
    },
    hasVariable: function(t) {
      return this.variables.hasOwnProperty(t)
    },
    setVariables: function(t) {
      this.variables = t
    },
    getVariables: function() {
      return this.variables
    },
    drawImage: function() {
      var t = Array.prototype.slice.apply(arguments),
        e = t.shift(),
        i = this.getImage(e);
      if (!i) return void this.logError("ImageNotFound-" + e, "No image found for id '" + e + "'.");
      var a = this.imageOptions[e];
      if (a)
        for (var r in a) i.setOption(r, a[r]);
      t.unshift(this.getCurrentPage()), i.draw.apply(i, t)
    },
    drawText: function(t, e, i, a) {
      if (t) {
        e = e || 0, i = i || 0, a = a || {};
        var r, n = this.getCurrentPage().context;
        if (a.font) r = a.font;
        else {
          var s = a.fontStyle || "normal",
            h = a.fontSize || "16px",
            u = a.fontFamily || "sans-serif";
          r = s + " " + h + " " + u
        }
        var o = a.textBaseline || "top",
          f = a.textAlign || "left";
        n.textBaseline = o, n.textAlign = f, n.font = r, n.fillText(t, e, i)
      }
    }
  }), a
});
