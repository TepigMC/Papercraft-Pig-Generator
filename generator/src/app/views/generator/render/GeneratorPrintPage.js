define(["jquery", "underscore", "backbone", "print", "text!./GeneratorPrintPage.html"], function(e, t, n, a, i) {
  "use strict";
  return n.View.extend({
    template: t.template(i),
    events: {
      "click .print-button": "onClickPrintButton"
    },
    initialize: function(e) {
      this.page = e.page, this.showPageName = e.showPageName, this.render()
    },
    render: function() {
      var e = this.template({
        page: this.page
      });
      this.$el.html(e), this.$pageContainer = this.$(".generator-page"), this.renderPageName(), this.renderPage()
    },
    renderPageName: function() {
      this.showPageName && this.$(".generator-page-name").show()
    },
    renderPage: function() {
      var t = this.page.toImage(),
        n = e(t);
      this.$pageContainer.append(n)
    },
    onClickPrintButton: function(e) {
      e.preventDefault();
      var t = this.$("img");
      t.print({
        globalStyles: !1,
        stylesheet: "/css/generator-print-style.css"
      })
    }
  })
});
