const m = require('mithril');
import model from './model';
import mainBar from './ui/fibMainBar';
import fibIndexSubmit from './ui/fibIndexSubmit';
import fibSeenIndexes from './ui/fibSeenIndexes';
import fibComputedValues from './ui/fibComputedValues';
import Eventbus from './eventbus';

var app = (function() {
  function loadFibValuesAndIndexes(eventbus) {
    eventbus.publish({ type: 'loadIndexes' });
    eventbus.publish({ type: 'loadValues' });
  }

  return {
    setupEventbus: function(eventbus) {
      eventbus.subscribe({
        type: 'computeFibSequence',
        handle: function(event, model) {
          m.request({ url: '/api/values', method: 'POST', body: { fibIndex: event.fibIndex } })
          .then(function(data) {
              console.log('computeFibSequence ' + JSON.stringify(data));
          })
          .catch(function(err) {
            console.log('computeFibSequence ' + JSON.stringify(err));
          });
        }
      }).subscribe({
        type: 'loadIndexes',
        handle: function(event, model) {
          m.request({ url: '/api/values/all', method: 'GET'})
          .then(function(data) {
              console.log('loadIndexes ' + JSON.stringify(data));
          })
          .catch(function(err) {
            console.log('loadIndexes ' + JSON.stringify(err));
          });
        }
      }).subscribe({
        type: 'loadValues',
        handle: function(event, model) {
          m.request({ url: '/api/values/current', method: 'GET'})
          .then(function(data) {
              console.log('loadValues ' + JSON.stringify(data));
          })
          .catch(function(err) {
            console.log('loadValues ' + JSON.stringify(err));
          });
        }
      });
      return eventbus;
    },
    oninit: function(vnode) {
      this.eventbus = new Eventbus();
      this.eventbus.model = model;
      this.eventbus = this.setupEventbus(this.eventbus);
      fibIndexSubmit.eventbus = this.eventbus;
      loadFibValuesAndIndexes(this.eventbus);
    },
    view: function(vnode) {
      return m('div', [
        m(mainBar),
        m(fibIndexSubmit, model),
        m(fibSeenIndexes, model),
        m(fibComputedValues, model)
      ]);
    }
  }
})();
m.mount(document.body, app);
