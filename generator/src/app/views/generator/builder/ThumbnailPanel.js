define(["jquery", "underscore", "backbone", "./Thumbnail"], function(e, n, i, t) {
  "use strict";
  return i.View.extend({
    tagName: "ul",
    className: "unstyled",
    initialize: function(e) {
      this.images = e, this.render()
    },
    render: function() {
      var e = this;
      n.each(this.images, function(n) {
        e.renderThumbnail(n)
      })
    },
    renderThumbnail: function(n) {
      var i = this,
        a = e("<li>");
      a.css({
        padding: "1em",
        display: "inline-block",
        verticalAlign: "top"
      });
      var s = new t({
        image: n
      });
      s.on("remove", function(e) {
        a.fadeOut(function() {
          s.close(), a.remove()
        }), i.trigger("remove", e)
      }), s.on("rename", function(e) {
        i.trigger("rename", e)
      }), a.append(s.$el), this.$el.append(a)
    },
    closeThumbnails: function() {
      this.thumbnails && n.each(this.thumbnails, function(e) {
        e.close()
      })
    },
    onClose: function() {
      this.closeThumbnails()
    }
  })
});
