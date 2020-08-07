/*
This is just a simple eventbus.
It does nothing special. You pass an handler and a key and every action dispatched with that key will be passed to the handler.
No multicast mechanism here. You register two handlers the same key, the second override the first.
*/
class Eventbus {
  constructor() {
    this.handlers = {};
  }

  subscribe(handler) {
    this.handlers[handler.type] = handler.handle;
    return this;
  }

  unsubscribe(handler) {
    this.handlers.splice(handlers.indexOf(handler.type), 1);
    return this;
  }

  publish(event) {
    if(!(typeof this.handlers[event.type] === "undefined")) {
      this.handlers[event.type](event, this.model);
    } else {
      console.log("No handler subscribes to event type: "+event.type);
    }
    return this;
  }
}
export default Eventbus;
