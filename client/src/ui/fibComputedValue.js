const m = require('mithril');
var fibComputedValue = (function(){
  return {
    view: function(vnode) {
      console.log('fibComputedValue component: ' + JSON.stringify(vnode.attrs));
      return m('span', vnode.attrs.value);
    }
  }
})();
export default fibComputedValue;
