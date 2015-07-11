define(["jquery", "underscore", "backbone", "text!./GeneratorSelectVariable.html"], function(e, t, a, i) {
  return a.View.extend({
    template: t.template(i),
    className: "control-group",
    events: {
      "change select": "onChangeSelect"
    },
    initialize: function(e) {
      this.variableDef = e.variableDef, this.render()
    },
    render: function() {
      var e = this.template({
        variableDef: this.variableDef
      });
      this.$el.html(e), this.$select = this.$("select")
    },
    setValue: function(e) {
      this.$select.val(e)
    },
    onChangeSelect: function() {
      var e = this.$select.val();
      this.trigger("change", e)
    }
  })
});
