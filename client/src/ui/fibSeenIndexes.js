const m = require('mithril');
var fibSeenIndexes = (function(){
  return {
    view: function(vnode) {
      return m('div', [
        m('h2', 'Seen Fib indexes'),
        (Array.isArray(vnode.attrs.fibSeenIndexes) && vnode.attrs.fibSeenIndexes.length) ?
          m('div',
            vnode.attrs.fibSeenIndexes.map((seenIndex) => {
              return m('span', seenIndex)
            })
          )
        : m('div', 'No seen indexes for now :(')
      ]);
    }
  }
})();
export default fibSeenIndexes;
