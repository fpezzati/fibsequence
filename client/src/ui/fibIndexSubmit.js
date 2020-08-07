const m = require('mithril');
var fibIndexSubmit = (function() {
  return {
    sendfibIndexSubmitToCompute: function(userGivenIndex) {
      this.eventbus.publish({ type: 'computeFibSequence', fibIndex: userGivenIndex });
    },

    view: function(vnode) {
      return m('div', [
        m('input', {
          type: 'number',
          oninput: function (e) {
            vnode.attrs.userGivenIndex = e.target.value
          },
          value: vnode.attrs.userGivenIndex
        }),
        m('button', { onclick: () => { this.sendfibIndexSubmitToCompute(vnode.attrs.userGivenIndex) } }, 'submit')
      ]);
    }
  }
})();
export default fibIndexSubmit;
