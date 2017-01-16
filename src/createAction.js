import * as _ from "./utils";
import * as ActionMethods from "./ActionMethods";
import * as PublisherMethods from "./PublisherMethods";
import * as Keep from "./Keep";

var allowed = { preEmit: 1, shouldEmit: 1 };

/**
 * Creates an action functor object. It is mixed in with functions
 * from the `PublisherMethods` mixin. `preEmit` and `shouldEmit` may
 * be overridden in the definition object.
 *
 * @param {Object} definition The action object definition
 */
export function createAction(definition) {

    definition = definition || {};
    if (!_.isObject(definition)){
        definition = {actionName: definition};
    }

    for(var a in ActionMethods){
        if (!allowed[a] && PublisherMethods[a]) {
            throw new Error("Cannot override API method " + a +
                " in Reflux.ActionMethods. Use another method name or override it on Reflux.PublisherMethods instead."
            );
        }
    }

    for(var d in definition){
        if (!allowed[d] && PublisherMethods[d]) {
            throw new Error("Cannot override API method " + d +
                " in action creation. Use another method name or override it on Reflux.PublisherMethods instead."
            );
        }
    }

    definition.children = definition.children || [];
    if (definition.asyncResult){
        definition.children = definition.children.concat(["completed", "failed"]);
    }

    var i = 0, childActions = {};
    for (; i < definition.children.length; i++) {
        var chDef = definition.children[i];
		var chName = typeof chDef === "string" ? chDef : chDef.actionName;
        childActions[chName] = createAction(chDef);
    }

    var context = _.extend({
        eventLabel: "action",
        emitter: new _.EventEmitter(),
        _isAction: true
    }, PublisherMethods, ActionMethods, definition);

    var functor = function() {
		var hasChildActions = false;
		/* eslint no-unused-vars:0 */
		for (var ignore in functor.childActions) { hasChildActions = true; break; }
		var async = (!functor.sync && typeof functor.sync !== "undefined") || hasChildActions;
        var triggerType = async ? "triggerAsync" : "trigger";
        return functor[triggerType].apply(functor, arguments);
    };

    _.extend(functor, childActions, context);

    Keep.addAction(functor);

    return functor;

}
