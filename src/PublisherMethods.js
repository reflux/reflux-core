import * as _ from "./utils";

/**
 * A module of methods for object that you want to be able to listen to.
 * This module is consumed by `createStore` and `createAction`
 */

/**
 * Hook used by the publisher that is invoked before emitting
 * and before `shouldEmit`. The arguments are the ones that the action
 * is invoked with. If this function returns something other than
 * undefined, that will be passed on as arguments for shouldEmit and
 * emission.
 */
export var preEmit = function() {};

/**
 * Hook used by the publisher after `preEmit` to determine if the
 * event should be emitted with given arguments. This may be overridden
 * in your application, default implementation always returns true.
 *
 * @returns {Boolean} true if event should be emitted
 */
export var shouldEmit = function() { return true; };

/**
 * Subscribes the given callback for action triggered
 *
 * @param {Function} callback The callback to register as event handler
 * @param {Mixed} [optional] bindContext The context to bind the callback with
 * @returns {Function} Callback that unsubscribes the registered event handler
 */
export var listen = function(callback, bindContext) {
    bindContext = bindContext || this;
    var eventHandler = function(args) {
        if (aborted){
            return;
        }
        callback.apply(bindContext, args);
    }, me = this, aborted = false;
    this.emitter.addListener(this.eventLabel, eventHandler);
    return function() {
        aborted = true;
        me.emitter.removeListener(me.eventLabel, eventHandler);
    };
};

/**
 * Publishes an event using `this.emitter` (if `shouldEmit` agrees)
 */
export var trigger = function() {
    var args = arguments,
        pre = this.preEmit.apply(this, args);
    args = pre === undefined ? args : _.isArguments(pre) ? pre : [].concat(pre);
    if (this.shouldEmit.apply(this, args)) {
        this.emitter.emit(this.eventLabel, args);
    }
};

/**
 * Tries to publish the event on the next tick
 */
export var triggerAsync = function(){
    var args = arguments, me = this;
    _.nextTick(function() {
        me.trigger.apply(me, args);
    });
};

/**
 * Wraps the trigger mechanism with a deferral function.
 *
 * @param {Function} callback the deferral function,
 *        first argument is the resolving function and the
 *        rest are the arguments provided from the previous
 *        trigger invocation
 */
export var deferWith = function(callback) {
    var oldTrigger = this.trigger,
        ctx = this,
        resolver = function() {
            oldTrigger.apply(ctx, arguments);
        };
    this.trigger = function() {
        callback.apply(ctx, [resolver].concat([].splice.call(arguments, 0)));
    };
};
