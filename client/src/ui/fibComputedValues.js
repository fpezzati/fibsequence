const m = require('mithril');
var fibComputedValues = (function(){
  return {
    view: function(vnode) {
      return m('div', [
        m('h2', 'Computed values'),
        (Array.isArray(vnode.attrs.calculatedValues) && vnode.attrs.calculatedValues.length) ?
          m('div', vnode.attrs.calculatedValues.map((value) => {
            return m('div', JSON.stringify(value))
          }))
        : m('div', 'No computed values for now :(')
      ])
    }
  }
})();
export default fibComputedValues;
