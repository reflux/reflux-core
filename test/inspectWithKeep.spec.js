import { assert } from 'chai';
import { default as Reflux } from '../src';

describe('with the keep reset and keep use to true', function() {
    beforeEach(function () {
		Reflux.__keep.use = true;
        Reflux.__keep.reset();
    });

    describe('when an action is created', function() {
        var action;

        beforeEach(function () {
            action = Reflux.createAction();
        });

        it('should be in the keep', function() {
            assert.equal(Reflux.__keep.createdActions[0], action);
        });
    });

    describe('when a store is created', function() {
        var store;

        beforeEach(function () {
            store = Reflux.createStore({ init: function() { /* no-op */} });
        });

        it('should be in the keep', function() {
            assert.equal(Reflux.__keep.createdStores[0], store);
        });
    });
});
