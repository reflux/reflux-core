import { assert } from 'chai';
import * as Reflux from '../src';

describe('with the keep reset', function() {
    beforeEach(function () {
        Reflux.__keep.reset();
    });

    describe('when an action is created and useKeep() is called', function() {
        var action;

        beforeEach(function () {
			Reflux.__keep.useKeep();
            action = Reflux.createAction();
        });

        it('should be in the keep', function() {
            assert.equal(Reflux.__keep.createdActions[0], action);
        });
    });

    describe('when a store is created and useKeep() is called', function() {
        var store;

        beforeEach(function () {
			Reflux.__keep.useKeep();
            store = Reflux.createStore({ init: function() { /* no-op */} });
        });

        it('should be in the keep', function() {
            assert.equal(Reflux.__keep.createdStores[0], store);
        });
    });

	describe('when an action is created and useKeep(false) is called', function() {
        beforeEach(function () {
			Reflux.__keep.useKeep(false);
            Reflux.createAction();
        });

        it('should not be in the keep', function() {
            assert.equal(Reflux.__keep.createdActions.length, 0);
        });
    });

    describe('when a store is created and useKeep(false) is called', function() {
        beforeEach(function () {
			Reflux.__keep.useKeep(false);
            Reflux.createStore({ init: function() { /* no-op */} });
        });

        it('should not be in the keep', function() {
            assert.equal(Reflux.__keep.createdStores.length, 0);
        });
    });
});
