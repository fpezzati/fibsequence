const m = require('mithril');
var fibSeenIndexes = (function(){
  return {
    view: function(vnode) {
      console.log('fibSeenIndexes component: ' + JSON.stringify(vnode.attrs));
      return m('div', [
        m('h2', 'Seen Fib indexes'),
        (Array.isArray(vnode.attrs.fibSeenIndexes) && vnode.attrs.fibSeenIndexes.length) ?
          m('div',
            vnode.attrs.fibSeenIndexes.map((seenIndex) => {
              return m('span', { class: "computed-value" }, seenIndex)
            })
          )
        : m('div', 'No seen indexes for now :(')
      ]);
    }
  }
})();
export default fibSeenIndexes;
