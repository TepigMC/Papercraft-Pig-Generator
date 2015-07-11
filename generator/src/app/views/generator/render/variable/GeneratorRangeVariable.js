define(["jquery", "underscore", "backbone", "text!./GeneratorRangeVariable.html"], function(e, t, n, a) {
  return n.View.extend({
    template: t.template(a),
    className: "control-group",
    events: {
      "change input": "onChangeInput"
    },
    initialize: function(e) {
      this.variableDef = e.variableDef, this.render()
    },
    render: function() {
      var e = this.template({
        variableDef: this.variableDef
      });
      this.$el.html(e), this.$input = this.$("input"), this.$rangeValue = this.$(".range-value")
    },
    setValue: function(e) {
      this.$input.val(e), this.$rangeValue.text(e)
    },
    onChangeInput: function() {
      var e = this.$input.val();
      this.$rangeValue.text(e), this.trigger("change", e)
    }
  })
});
