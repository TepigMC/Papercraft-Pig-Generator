define(["underscore", "../GeneratorPage"], function() {
  "use strict";
  var e = function(e) {
    return {
      hasImage: function() {
        return e.hasImage.apply(e, arguments)
      },
      setImageOption: function() {
        return e.setImageOption.apply(e, arguments)
      },
      drawImage: function() {
        e.drawImage.apply(e, arguments)
      },
      drawText: function() {
        e.drawText.apply(e, arguments)
      },
      usePage: function() {
        e.usePage.apply(e, arguments)
      },
      defineInput: function() {
        return e.defineInput.apply(e, arguments)
      },
      getVariable: function() {
        return e.getVariable.apply(e, arguments)
      },
      defineBooleanVariable: function() {
        return e.defineBooleanVariable.apply(e, arguments)
      },
      defineRangeVariable: function() {
        return e.defineRangeVariable.apply(e, arguments)
      },
      defineSelectVariable: function() {
        return e.defineSelectVariable.apply(e, arguments)
      }
    }
  };
  return e
});
