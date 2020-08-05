const m = require('mithril');
import model from './model';
import fibIndexSubmit from './ui/fibIndexSubmit';
import Eventbus from './eventbus';

var app = (function() {
  function loadFibValuesAndIndexes() {
    console.log('Hey! ' + JSON.stringify(model));
  }

  return {
    oninit: function(vnode) {
      loadFibValuesAndIndexes();
      this.eventbus = new Eventbus();
      fibIndexSubmit.eventbus = this.eventbus;
    },
    view: function(vnode) {
      return m(fibIndexSubmit, model);
    }
  }
})();
m.mount(document.body, app);
