import { assert } from 'chai';
import sinon from 'sinon';
import { default as Reflux } from '../src';

describe('using deferWith function', function() {

    describe('in an action', function() {
        var action, triggerSpy;

        beforeEach(function () {
            action = Reflux.createAction({sync: true});
            triggerSpy = sinon.spy();
            action.trigger = triggerSpy;
        });

        it('should have "deferWith" function', function() {
            assert.isFunction(action.deferWith);
        });

        describe('that does not defer', function() {
            beforeEach(function () {
                action.deferWith(function() {});
            });

            it('should not trigger', function() {
                action();

                assert.equal(triggerSpy.callCount, 0);
            });
        });

        describe('that does defer', function() {
            beforeEach(function() {
                action.deferWith(function(done) {
                    done.apply(action, [].splice.call(arguments, 1));
                });
            });

            it('should trigger', function() {
                action();

                assert.equal(triggerSpy.callCount, 1);
            });

            it('should trigger with arguments intact', function() {
                action("dude", "bro");

                assert.equal(triggerSpy.firstCall.args[0], "dude");
                assert.equal(triggerSpy.firstCall.args[1], "bro");
            });
        });

        describe('that defers with new value', function() {
            it('should pass on the new value', function() {
                action.deferWith(function(d) { d("1337"); });
                action();

                assert.equal(triggerSpy.firstCall.args[0], "1337");
            });
        });
    });

    describe('in a store', function() {
        var store;

        beforeEach(function () {
            store = Reflux.createStore({});
        });

        it('should have "deferWith" function', function() {
            assert.isFunction(store.deferWith);
        });

        it('should be the same as the one an action uses', function() {
            assert.equal(store.deferWith,
                Reflux.createAction().deferWith);
        });
    });

});
