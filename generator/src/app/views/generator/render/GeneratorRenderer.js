define(["jquery", "underscore", "backbone", "text!./GeneratorRenderer.html", "modules/generator/builder/ScriptRunner", "../input/InputPanel2", "./GeneratorVariables", "./GeneratorPrintPage"], function(e, r, t, s, n, i, a, o) {
  "use strict";
  return t.View.extend({
    template: r.template(s),
    initialize: function(e) {
      this.script = e.script, this.generatorModel = e.generatorModel, this.showErrors = e.showErrors || !1, this.pageViews = [], this.render()
    },
    render: function() {
      var e = this.template();
      this.$el.html(e), this.applyScript()
    },
    applyScript: function() {
      n.run(this.script, this.generatorModel), this.renderInputs(), this.renderVariables(), this.renderPages(), this.showErrors && this.renderErrors()
    },
    renderInputs: function() {
      var e = this;
      this.closeInputsView();
      var r = this.generatorModel.getInputDefs();
      if (r.length) {
        this.generatorInputs = new i({
          generatorModel: this.generatorModel
        }), this.generatorInputs.on("change", function() {
          e.applyScript()
        });
        var t = this.$(".generator-inputs");
        t.append(this.generatorInputs.$el), t.show()
      }
    },
    renderVariables: function() {
      var e = this;
      this.closeVariablesView();
      var r = this.generatorModel.getVariableDefs();
      if (r.length) {
        this.generatorVariables = new a({
          generatorModel: this.generatorModel
        }), this.generatorVariables.on("change", function() {
          e.applyScript()
        });
        var t = this.$(".generator-variables");
        t.append(this.generatorVariables.$el), t.show()
      }
    },
    renderErrors: function() {
      var t = this.$(".generator-errors").empty().hide(),
        s = this.generatorModel.getErrors();
      s.length && (r.each(s, function(r) {
        var s = e("<p>").text(r);
        t.append(s)
      }), t.show())
    },
    renderPages: function() {
      var e = this;
      this.closePageViews();
      var t = this.$(".generator-pages"),
        s = this.generatorModel.getPages(),
        n = s.length > 1;
      r.each(s, function(r) {
        var s = new o({
          page: r,
          showPageName: n
        });
        e.pageViews.push(s), t.append(s.$el)
      })
    },
    closeInputsView: function() {
      this.generatorInputs && this.generatorInputs.close()
    },
    closeVariablesView: function() {
      this.generatorVariables && this.generatorVariables.close()
    },
    closePageViews: function() {
      for (var e = 0; e < this.pageViews.length; e++) this.pageViews[e].close()
    },
    onClose: function() {
      this.closeInputsView(), this.closeVariablesView(), this.closePageViews()
    }
  })
});
