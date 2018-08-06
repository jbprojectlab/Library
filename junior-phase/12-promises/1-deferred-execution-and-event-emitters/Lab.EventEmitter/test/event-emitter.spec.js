/* eslint-env jasmine */
/* global EventEmitter */

// ## Event Emitter

describe('EventEmitter', () => {
  it('constructor function initializes an empty `callbacks` object', () => {
    const ee = new EventEmitter()
    expect(typeof ee.callbacks).toBe('object')
  })

  it('has prototypal methods `on` and `emit`', () => {
    expect(typeof EventEmitter.prototype.on).toBe('function')
    expect(typeof EventEmitter.prototype.emit).toBe('function')
  })

  describe('on', () => {
    // EventEmitter.prototype.on accepts two arguments:
    // - The first argument is a string representing the event to listen for
    // - The second argument is callback function to invoke when that event occurs
    //
    // Example:
    // ```javascript
    // ee.on('newMessage', (message) => console.log('Got message: ', message))
    // ```
    //
    // The purpose of this is to "register" a callback to be run whenever the
    // specified "event" is emitted. This callback should be stored in the "callbacks"
    // object in an array stored at the key for the event name. For example:
    //
    // ```javascript
    // {
    //   "newMessage": [(message) => {/* etc */}]
    // }
    // ```
    //
    // Note that we store the callback in an array - this is because we could store multiple
    // callbacks to be run for the same event!
    //
    it('accepts two arguments and stores them in its callbacks object', () => {
      const callback = (message) => console.log('Got message: ', message)
      const ee = new EventEmitter()
      const NEW_MESSAGE = 'MESSAGE:NEW'
      ee.on(NEW_MESSAGE, callback)

      expect(Array.isArray(ee.callbacks[NEW_MESSAGE])).toEqual(true)
      expect(ee.callbacks[NEW_MESSAGE].length).toEqual(1)
      expect(ee.callbacks[NEW_MESSAGE][0]).toEqual(callback)
    })

    it('can register multiple callbacks for the same event', () => {
      const callback1 = (message) => console.log('Got message: ', message)
      const callback2 = (missive) => console.log('Got missive: ', missive)
      const ee = new EventEmitter()
      const NEW_MESSAGE = 'MESSAGE:NEW'
      ee.on(NEW_MESSAGE, callback1)
      ee.on(NEW_MESSAGE, callback2)

      expect(Array.isArray(ee.callbacks[NEW_MESSAGE])).toEqual(true)
      expect(ee.callbacks[NEW_MESSAGE].length).toEqual(2)
      expect(ee.callbacks[NEW_MESSAGE][0]).toEqual(callback1)
      expect(ee.callbacks[NEW_MESSAGE][1]).toEqual(callback2)
    })

    it('can register multiple events', () => {
      const callback1 = (message) => console.log('Got message: ', message)
      const callback2 = (message) => console.log('Removed: ', message)

      const ee = new EventEmitter()
      const NEW_MESSAGE = 'MESSAGE:NEW'
      const REMOVE_MESSAGE = 'MESSAGE:REMOVE'
      ee.on(NEW_MESSAGE, callback1)
      ee.on(REMOVE_MESSAGE, callback2)

      expect(Array.isArray(ee.callbacks[NEW_MESSAGE])).toEqual(true)
      expect(ee.callbacks[NEW_MESSAGE].length).toEqual(1)
      expect(ee.callbacks[NEW_MESSAGE][0]).toEqual(callback1)

      expect(Array.isArray(ee.callbacks[NEW_MESSAGE])).toEqual(true)
      expect(ee.callbacks[REMOVE_MESSAGE].length).toEqual(1)
      expect(ee.callbacks[REMOVE_MESSAGE][0]).toEqual(callback2)
    })
  })

  describe('emit', () => {
    // EventEmitter.prototype.emit accepts two arguments:
    // - The first argument is a string representing the event to emit
    // - The second argument is a "payload" that will be given to all callbacks registered for that event
    //
    // Example:
    // ```javascript
    // // if first we "register" a listener...
    // ee.on('newMessage', (message) => console.log('Got message: ', message))
    //
    // // ..and then later...
    // ee.emit('newMessage', "Hello world!")
    // // this causes the callback from .on to be invoked - 'Got message: Hello world!' will be logged to the console
    // ```
    // To "emit" an event just means to get all of the functions stored at that key in our "callbacks" object,
    // and to invoke them all with the "payload"
    //
    it('invokes a callback registered for an event', () => {
      const ee = new EventEmitter()
      const NEW_MESSAGE = 'MESSAGE:NEW'
      let counter = 0
      ee.on(NEW_MESSAGE, () => counter++)

      ee.emit(NEW_MESSAGE)
      expect(counter).toBe(1)
    })

    it('passes the `payload` to the callback function', () => {
      const ee = new EventEmitter()
      const results = []
      const NEW_MESSAGE = 'MESSAGE:NEW'
      ee.on(NEW_MESSAGE, (message) => results.push(message))

      ee.emit(NEW_MESSAGE, 'Hello world!')
      expect(results.length).toBe(1)
      expect(results[0]).toBe('Hello world!')
    })

    it('invokes all callbacks registered for an event with the `payload`', () => {
      const ee = new EventEmitter()
      const NEW_MESSAGE = 'MESSAGE:NEW'
      let result1
      let result2
      ee.on(NEW_MESSAGE, (message) => result1 = message)
      ee.on(NEW_MESSAGE, (message) => result2 = message)

      ee.emit(NEW_MESSAGE, 'YOLO world!')
      expect(result1).toEqual('YOLO world!')
      expect(result2).toEqual('YOLO world!')
    })

    it('does not invoke any callbacks for an unrecognized event', () => {
      const ee = new EventEmitter()
      const NEW_MESSAGE = 'MESSAGE:NEW'
      const results = []
      ee.on(NEW_MESSAGE, (message) => results.push(message))

      ee.emit('lolwut', "I have no idea what's going on")
      expect(results.length).toBe(0)
    })

    it('can emit multiple times', () => {
      const ee = new EventEmitter()
      const NEW_MESSAGE = 'MESSAGE:NEW'
      const results = []
      ee.on(NEW_MESSAGE, (message) => results.push(message))

      ee.emit(NEW_MESSAGE, 'How')
      ee.emit(NEW_MESSAGE, 'Are')
      ee.emit(NEW_MESSAGE, 'You?')

      expect(results.length).toBe(3)
      expect(results[0]).toEqual('How')
      expect(results[1]).toEqual('Are')
      expect(results[2]).toEqual('You?')
    })
  })

  describe("Extra-Credit (If you finish early)", () => {
    describe("Remove Listener", () => {
      // EventEmitter.prototype.removeListener accepts two arguments:
      // - The first argument is a string representing the event
      // - The second argument is callback function you originally provided to `on`
      //
      // Example:
      // ```javascript
      // const handleNewMessage = (message) => console.log('Got message: ', message)
      // ee.on('newMessage', handleNewMessage)
      // // ..and then later...
      // ee.removeListener('newMessage', handleNewMessage)
      // ```
      it('accepts two arguments and removes them from its callbacks object', () => {
        const callback = (message) => console.log('Got message: ', message)
        const ee = new EventEmitter()
        const NEW_MESSAGE = 'MESSAGE:NEW'
        ee.on(NEW_MESSAGE, callback)
        expect(Array.isArray(ee.callbacks[NEW_MESSAGE])).toEqual(true)
        ee.removeListener(NEW_MESSAGE, callback)
        expect(ee.callbacks[NEW_MESSAGE].length).toEqual(0)
      })

      it('it does not invokes callbacks for removed listeners', () => {
        let callCount = 0
        const callback = (message) => callCount ++
        const ee = new EventEmitter()
        const NEW_MESSAGE = 'MESSAGE:NEW'
        ee.on(NEW_MESSAGE, callback)
        ee.emit(NEW_MESSAGE, 'Hello')
        ee.removeListener(NEW_MESSAGE, callback)
        ee.emit(NEW_MESSAGE, 'Anybody here?')
        expect(callCount).toEqual(1)
      })
    })
  })
})
