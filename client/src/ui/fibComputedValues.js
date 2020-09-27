const m = require('mithril');
import fibComputedValue from './fibComputedValue';
var fibComputedValues = (function(){
  return {
    view: function(vnode) {
      console.log('fibComputedValues component: ' + JSON.stringify(vnode.attrs));
      return m('div', [
        m('h2', 'Computed values'),
        (Array.isArray(vnode.attrs.calculatedValues) && vnode.attrs.calculatedValues.length) ?
          m('div', vnode.attrs.calculatedValues.map((val) => {
            return m(fibComputedValue, {value: val})
          }))
        : m('div', 'No computed values for now :(')
      ])
    }
  }
})();
export default fibComputedValues;
