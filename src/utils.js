export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function callbackName(string, prefix) {
    prefix = prefix || "on";
    return prefix + exports.capitalize(string);
}

/*
 * isObject, extend, isFunction, isArguments are taken from underscore/lodash in
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
    var source, keys, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        keys = Object.keys(source);
        for (var j = 0; j < keys.length; j++) {
            prop = keys[j];
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

export function nextTick(callback) {
    setTimeout(callback, 0);
}

export function object(keys, vals){
    var o = {}, i = 0;
    for(;i < keys.length; i++){
        o[keys[i]] = vals[i];
    }
    return o;
}

export function isArguments(value) {
    return typeof value === "object" && ("callee" in value) && typeof value.length === "number";
}

export function throwIf(val, msg){
    if (val){
        throw Error(msg || val);
    }
}
