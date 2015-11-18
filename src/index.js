const version = {
    "reflux-core": "@VERSION"
};

import ActionMethods from "./ActionMethods";
import ListenerMethods from "./ListenerMethods";
import PublisherMethods from "./PublisherMethods";
import StoreMethods from "./StoreMethods";

import { staticJoinCreator as maker} from "./joins";
const joinTrailing = maker("last");
const all = joinTrailing; // Reflux.all alias for backward compatibility
const joinLeading = maker("first");
const joinStrict = maker("strict");
const joinConcat = maker("all");

import * as _ from "./utils";
const utils = _;
import createAction from "./createAction";
import createStore from "./createStore";

/**
 * Convenience function for creating a set of actions
 *
 * @param definitions the definitions for the actions to be created
 * @returns an object with actions of corresponding action names
 */
const createActions = (function() {
    var reducer = function(definitions, actions) {
        Object.keys(definitions).forEach(function(actionName) {
            var val = definitions[actionName];
            actions[actionName] = createAction(val);
        });
    };

    return function(definitions) {
        var actions = {};
        if (definitions instanceof Array) {
            definitions.forEach(function(val) {
                if (_.isObject(val)) {
                    reducer(val, actions);
                } else {
                    actions[val] = createAction(val);
                }
            });
        } else {
            reducer(definitions, actions);
        }
        return actions;
    };
})();

/**
 * Sets the eventmitter that Reflux uses
 */
function setEventEmitter (ctx) {
    _.EventEmitter = ctx;
}

/**
 * Sets the method used for deferring actions and stores
 */
function nextTick (nextTick) {
    _.nextTick = nextTick;
}

function use (pluginCb) {
    pluginCb(this);
}

/**
 * Provides the set of created actions and stores for introspection
 */
/*eslint-disable no-underscore-dangle*/
import __keep from "./Keep";

export default {
    version,
    ActionMethods,
    ListenerMethods,
    PublisherMethods,
    StoreMethods,
    utils,
    createAction,
    createStore,
    createActions,
    setEventEmitter,
    nextTick,
    use,
    joinTrailing,
    all,
    joinLeading,
    joinStrict,
    joinConcat,
    __keep
};
/*eslint-enable no-underscore-dangle*/

/**
 * Warn if Function.prototype.bind not available
 */
if (!Function.prototype.bind) {
  console.error(
    "Function.prototype.bind not available. " +
    "ES5 shim required. " +
    "https://github.com/spoike/refluxjs#es5"
  );
}
