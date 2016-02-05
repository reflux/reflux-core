import chai, { assert } from 'chai';
import asPromised from 'chai-as-promised';
import Reflux from "../src";
import sinon from "sinon";

chai.use(asPromised);

describe('with a reducer', function() {
    describe('that has initial data', function() {
        var reducer, initialData;

        beforeEach(() => {
            initialData = {
                datum: 1337
            };
            reducer = Reflux.createReducer(initialData);
        });

        it('should be able to peek the data', function() {
            assert.equal(initialData.datum, reducer.peek().datum);
        });

        describe('hooked to an action', function() {
            var action, listener;

            beforeEach(() => {
                action = Reflux.createAction({sync: true});
                listener = sinon.spy();
                reducer.listen(listener);
            });

            it('should pass previous data as first argument', function() {
                reducer.on(action, (a) => a);
                action();
                return assert.deepEqual(listener.args[0][0], initialData);
            });

            it('should pass arguments to the rest', function() {
                reducer.on(action, (a, b, c) => { return {b: b, c: c}; });
                action("dude", 1337);
                return assert.deepEqual(reducer.peek(), {b: "dude", c: 1337});
            });

        });
    });
});
