# PublisherMethods

A module of methods for object that you want to be able to listen to, available on `Reflux.PublisherMethods`. Actions and stores have these methods mixed in.

## PublisherMethods.deferWith(callback)

Wraps the trigger mechanism with a deferral function.

@param {Function(function, ...arguments)} callback The deferral function, first argument is the resolving function and the rest are the arguments provided from the previous trigger invocation

## PublisherMethods.listen(callback, bindContext)

Subscribes the given callback for action triggered

@param {Function} callback The callback to register as event handler

@param {Mixed} [optional] bindContext The context to bind the callback with

@returns {Function} Callback that unsubscribes the registered event handler

## PublisherMethods.preEmit()

Hook used by the publisher that is invoked before emitting and before `shouldEmit`. The arguments are the ones that the action is invoked with. If this function returns something other than undefined, that will be passed on as arguments for shouldEmit and emission.

## PublisherMethods.shouldEmit()

Hook used by the publisher after `preEmit` to determine if the event should be emitted with given arguments. This may be overridden in your application, default implementation always returns true.

@returns {Boolean} true if event should be emitted

## PublisherMethods.trigger(...arguments)

Publishes an event using `this.emitter` (if `shouldEmit` agrees). The arguments are passed on to the listeners.

## PublisherMethods.triggerAsync(...arguments)

Tries to publish the event on the next tick (if `shouldEmit` agrees). The arguments are passed on to the listeners.
