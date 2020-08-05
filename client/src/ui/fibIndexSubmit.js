const m = require('mithril');
var fibIndexSubmit = (function() {
  return {
    sendfibIndexSubmitToCompute: function(userGivenIndex) {
      console.log('sendfibIndexSubmitToCompute ' + userGivenIndex);
      console.log('fibIndexSubmit eventbus ready ' + (typeof this.eventbus !== 'undefined'));
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
