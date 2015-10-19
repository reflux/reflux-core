# ListenerMethods

A module of methods related to listening, available on `Reflux.ListenerMethods`. Actions and stores have these methods mixed in.

## ListenerMethods.fetchInitialState()

Used in `listenTo`. Fetches initial data from a publisher if it has a `getInitialState` method.

@param {Action|Store} listenable The publisher we want to get initial state from

@param {Function|String} defaultCallback The method to receive the data

## ListenerMethods.hasListener(listenable)

An internal utility function used by `validateListening`

@param {Action|Store} listenable The listenable we want to search for

@returns {Boolean} The result of a recursive search among `this.subscriptions`

## ListenerMethods.joinTrailing(...Publishers)

The callback will be called once all listenables have triggered at least once. It will be invoked with the last emission from each listenable.

@param {...Publishers} publishers Publishers that should be tracked.

@param {Function|String} callback The method to call when all publishers have emitted

@returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables

## ListenerMethods.joinLeading(...Publishers)

The callback will be called once all listenables have triggered at least once. It will be invoked with the first emission from each listenable.

@param {...Publishers} publishers Publishers that should be tracked.

@param {Function|String} callback The method to call when all publishers have emitted

@returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables

## ListenerMethods.joinConcat(...Publishers)

The callback will be called once all listenables have triggered at least once. It will be invoked with all emission from each listenable.

@param {...Publishers} publishers Publishers that should be tracked.

@param {Function|String} callback The method to call when all publishers have emitted

@returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables

## ListenerMethods.joinStrict(...Publishers)

The callback will be called once all listenables have triggered.

If a callback triggers twice before that happens, an error is thrown.

@param {...Publishers} publishers Publishers that should be tracked.

@param {Function|String} callback The method to call when all publishers have emitted

@returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables

## ListenerMethods.listenTo(listenable, callback, defaultCallback)

Sets up a subscription to the given listenable for the context object

@param {Action|Store} listenable An Action or Store that should be listened to.

@param {Function|String} callback The callback to register as event handler

@param {Function|String} defaultCallback The callback to register as default handler

@returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is the object being listened to

## ListenerMethods.listenToMany(listenables)

A convenience method that listens to all listenables in the given object.

@param {Object} listenables An object of listenables. Keys will be used as callback method names.

## ListenerMethods.stopListeningTo(listenable)

Stops listening to a single listenable

@param {Action|Store} listenable The action or store we no longer want to listen to

@returns {Boolean} True if a subscription was found and removed, otherwise false.

## ListenerMethods.stopListeningToAll()

Stops all subscriptions and empties subscriptions array

## ListenerMethods.validateListening(listenable)

Checks if the current context can listen to the supplied listenable

@param {Action|Store} listenable An Action or Store that should be listened to.

@returns {String|Undefined} An error message, or undefined if there was no problem.
