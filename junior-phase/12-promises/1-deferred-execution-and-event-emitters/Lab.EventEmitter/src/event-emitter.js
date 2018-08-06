class EventEmitter {
  constructor () {
    // initialize with an empty object containing no deferred callbacks
    this.callbacks = {};
  }
  on (eventName, handler) {
    // when an event handler is registered, check if we've registered any other callbacks to run
    if (!this.callbacks[eventName]) {
      // if we have not, create a new array, containing just this one handler
      this.callbacks[eventName] = [handler];
    } else {
      // if we have, push this handler to the array
      this.callbacks[eventName].push(handler);
    }
  }
  emit (eventName, eventData) {
    // when an event is triggered, check if we have any registered callbacks to run
    if (!this.callbacks[eventName]) return; // if not, return immediately (do nothing)
    // if we do have callbacks, loop through them
    this.callbacks[eventName].forEach((handler) => {
      // and execute each handler with the given emitted data
      handler(eventData);
    });
  }
  removeListener (eventName, handlerToBeRemoved) {
    // when an event handler should be removed, check if we have any registered callbacks for that event
    if (!this.callbacks[eventName]) return; // if not, return immediately (do nothing)
    // if we do have callbacks, filter the array...
    this.callbacks[eventName] = this.callbacks[eventName]
    .filter((handler) => {
      // keeping any callbacks that are not equal to the one that is to-be-removed
      return handler !== handlerToBeRemoved;
    });
  }
}
