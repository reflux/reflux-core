import * as _ from "./utils";
import PublisherMethods from "./PublisherMethods";

export default function createReducer(initialData) {

    var data = initialData;

    function Reducer() {
        this.emitter = new _.EventEmitter();
        this.eventLabel = "reducer";
    }

    Reducer.prototype.on = function(publisher, reducerFn) {
        publisher.listen(function() {
            data = reducerFn.apply(this, [ data, ...arguments ]);
            this.trigger(data);
        }, this);
    };

    Reducer.prototype.peek = function() {
        return data;
    };

    _.extend(Reducer.prototype, PublisherMethods);

    return new Reducer();
}
