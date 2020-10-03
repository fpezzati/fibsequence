const m = require('mithril');
var mainBar = (function() {
  return {
    view: function(vnode) {
      return m('h1', 'Fibonacci sequence calculator!');
    }
  }
})();
export default mainBar;
