define(["jquery", "underscore", "backbone", "text!./TextInput.html"], function(t, e, n, i) {
  "use strict";
  var u = n.View.extend({
    template: e.template(i),
    tagName: "tr",
    initialize: function(t) {
      this.inputDef = t.inputDef, this.render()
    },
    render: function() {
      var t = this.template({
        inputDef: this.inputDef
      });
      this.$el.html(t)
    },
    getName: function() {
      return this.inputDef.name
    },
    getText: function() {
      return this.$("input-text").val()
    }
  });
  return u
});
