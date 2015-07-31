export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function callbackName(string, prefix) {
    prefix = prefix || "on";
    return prefix + exports.capitalize(string);
}

export var environment = {};

function checkEnv(target) {
    let flag;
    try {
        /*eslint-disable no-eval */
        if (eval(target)) {
            flag = true;
        }
        /*eslint-enable no-eval */
    }
    catch (e) {
        flag = false;
    }
    environment[callbackName(target, "has")] = flag;
}
checkEnv("setImmediate");
checkEnv("Promise");

/*
 * isObject, extend, isFunction, isArguments are taken from undescore/lodash in
 * order to remove the dependency
 */
export function isObject(obj) {
    const type = typeof obj;
    return type === "function" || type === "object" && !!obj;
}

export function extend(obj) {
    if (!isObject(obj)) {
        return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
            if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
                var propertyDescriptor = Object.getOwnPropertyDescriptor(source, prop);
                Object.defineProperty(obj, prop, propertyDescriptor);
            } else {
                obj[prop] = source[prop];
            }
        }
    }
    return obj;
}

export function isFunction(value) {
    return typeof value === "function";
}

exports.EventEmitter = require("eventemitter3");

if (environment.hasSetImmediate) {
    exports.nextTick = function(callback) {
        setImmediate(callback);
    };
} else {
    exports.nextTick = function(callback) {
        setTimeout(callback, 0);
    };
}

export function object(keys, vals){
    var o = {}, i = 0;
    for(;i < keys.length; i++){
        o[keys[i]] = vals[i];
    }
    return o;
}

if (environment.hasPromise) {
    exports.Promise = Promise;
    exports.createPromise = function (resolver) {
        return new exports.Promise(resolver);
    };
} else {
    exports.Promise = null;
    exports.createPromise = function() {};
}

export function isArguments(value) {
    return typeof value === "object" && ("callee" in value) && typeof value.length === "number";
}

export function throwIf(val, msg){
    if (val){
        throw Error(msg || val);
    }
}
