# Reflux

The default object exposed by the library.

## Reflux.ActionMethods

A module of methods that the user may want to include in all actions. The module's set variables and functions will be assigned to Actions by `createAction`.

## Reflux.createAction(definition)

Creates an action function. It is mixed in with functions from the `PublisherMethods` mixin. `preEmit` and `shouldEmit` may be overridden in the definition object.

@param {Object} definition The action object definition

@returns {Action} The action

## Reflux.createActions(definitions)

Convenience function for creating a set of actions.

@param definitions the definitions for the actions to be created

@returns {Object} an object with actions with corresponding action names as key

## Reflux.createStore(definition)

Creates an event emitting Data Store. It is mixed in with functions from the `ListenerMethods` and `PublisherMethods` mixins. `preEmit` and `shouldEmit` may be overridden in the definition object.

@param {Object} definition The data store object definition

@returns {Store} A data store instance

## Reflux.joinTrailing(...publishers)

Creates a static join for the given publishers. It emits when all the publishers have emitted at least once, and will emit with the data that was last emitted by each listenable.

@param {...Publisher} publishers The objects to listen to

@returns {Publisher} The join

@alias Reflux.all

## Reflux.joinLeading(...publishers)

Creates a static join for the given publishers. It emits when all the publishers have emitted at least once, and will emit with the data that was first emitted by each listenable.

@param {...Publisher} publishers The objects to listen to

@returns {Publisher} The join

## Reflux.joinStrict(...publishers)

Creates a static join for the given publishers. It emits when all the publishers have emitted once. This join will throw an error if a listenable has emitted more than once.

@param {...Publisher} publishers The objects to listen to

@returns {Publisher} The join

## Reflux.joinConcat(...publishers)

Creates a static join for the given publishers. It emits when all the publishers have emitted once. This join will concatenate all emits from publishers in arrays.

@param {...Publisher} publishers The objects to listen to

@returns {Publisher} The join

## Reflux.ListenerMethods

See [ListenerMethods](ListenerMethods.md).

## Reflux.nextTick(nextTick)

Sets the method used for deferring actions and stores

@param {Function} nextTick Tthe method to replace with

## Reflux.PublisherMethods

See [PublisherMethods](PublisherMethods.md).

## Reflux.setEventEmitter(eventEmitter)

Overrides the event emitter

@param {EventEmitter} eventEmitter The event emitter

## Reflux.StoreMethods

A module of methods that the user may want to include in all stores. The module's set variables and functions will be assigned to Stores by `createStore`.

## Reflux.use(extension)

Convenience function to install extensions for reflux

@param {Function} extension The extension to install
