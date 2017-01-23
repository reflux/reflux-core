import Q from 'q';
import chai, { assert } from 'chai';
import asPromised from 'chai-as-promised';
import sinon from 'sinon';
import * as Reflux from '../src';

chai.use(asPromised);

describe('Creating action', function() {

    it("should implement the publisher API",function(){
        var action = Reflux.createAction();
        for(var apimethod in Reflux.PublisherMethods){
            assert.equal(Reflux.PublisherMethods[apimethod],action[apimethod]);
        }
    });

    it("should copy properties from the definition into the action",function(){
        var def = {preEmit:"PRE",shouldEmit:"SHO",random:"RAN"},
            action = Reflux.createAction(def);
        assert.equal(action.preEmit, def.preEmit);
        assert.equal(action.shouldEmit, def.shouldEmit);
        assert.equal(action.random, def.random);
    });

    it("should create specified child actions",function(){
        var def = {children: ["foo","BAR"]},
            action = Reflux.createAction(def);

        assert.deepEqual(action.children, ["foo", "BAR"]);
        assert.equal(action.foo._isAction, true);
        assert.deepEqual(action.foo.children, []);
        assert.equal(action.BAR._isAction, true);

    });

	it("should allow complex child action definitions",function(){
        var def = {children: [{actionName:"foo"},{actionName:"BAR"}]},
            action = Reflux.createAction(def);

		assert.equal(action.foo.actionName, "foo");
        assert.equal(action.foo._isAction, true);
        assert.deepEqual(action.foo.children, []);
		assert.equal(action.BAR.actionName, "BAR");
        assert.equal(action.BAR._isAction, true);

    });

    it("should create completed and failed child actions for async actions",function(){
        var def = {asyncResult: true, sync: true},
            action = Reflux.createAction(def);

        assert.equal(action.asyncResult, true);
        assert.deepEqual(action.children, ["completed", "failed"]);
        assert.equal(action.completed._isAction, true);
        assert.equal(action.failed._isAction, true);
    });


    it("should throw an error if you overwrite any API other than preEmit and shouldEmit",function(){
        assert.throws(function(){
            Reflux.createAction({listen:"FOO"});
        });
    });

    it("should create action with the parameter asyncCall",function(done){
        let doLogin = () => {
            done();
        };
        let actions = Reflux.createActions({login: {asyncCall: doLogin }});
        actions.login();
    });
    describe('Reflux.ActionMethods', function() {

        afterEach(function(){
            for (var prop in Reflux.ActionMethods) {
                if (Reflux.ActionMethods.hasOwnProperty(prop)) {
                    delete Reflux.ActionMethods[prop];
                }
            }
        });

        it("should copy properties from Reflux.ActionMethods into the action",function(){
            Reflux.ActionMethods.preEmit = function() {};
            Reflux.ActionMethods.exampleFn = function() {};
            var action = Reflux.createAction();
            assert.equal(action.preEmit, Reflux.ActionMethods.preEmit);
            assert.equal(action.exampleFn, Reflux.ActionMethods.exampleFn);
        });

        it("should throw an error if you overwrite any API other than preEmit and shouldEmit in Reflux.ActionMethods",function(){
            Reflux.ActionMethods.listen = "FOO";
            assert.throws(function(){
                Reflux.createAction({});
            });
        });

    });

    var action,
        testArgs;

    beforeEach(function () {
        action = Reflux.createAction();
        testArgs = [1337, 'test'];
    });

    it('should be a callable functor', function() {
        assert.isFunction(action);
    });

    describe("the synchronisity",function(){
        var syncaction = Reflux.createAction(),
            asyncaction = Reflux.createAction({sync:false}),
            synccalled = false,
            asynccalled = false,
            store = Reflux.createStore({
                sync: function(){synccalled=true;},
                async: function(){asynccalled=true;}
            });
        store.listenTo(syncaction,"sync");
        store.listenTo(asyncaction,"async");
        it("should be synchronous when not specified",function(){
            syncaction();
            assert.equal(true,synccalled);
        });
        it("should be asynchronous if requested",function(){
            asyncaction();
			assert.equal(false,asynccalled);
        });
        describe("when changed during lifetime",function(){
            var syncaction = Reflux.createAction(),
            asyncaction = Reflux.createAction({sync:false}),
            synccalled = false,
            asynccalled = false,
            store = Reflux.createStore({
                sync: function(){synccalled=true;},
                async: function(){asynccalled=true;}
            });
            store.listenTo(syncaction,"sync");
            store.listenTo(asyncaction,"async");
            it("should be asynchronous if initial sync was overridden",function(){
                syncaction.sync = false;
                syncaction();
                assert.equal(false,synccalled);
            });
            it("should be synchronous if set during lifetime",function(){
                asyncaction.sync = true;
                asyncaction();
                assert.equal(true,asynccalled);
            });
        });
    });

    describe('when listening to action', function() {

        var promise;

        beforeEach(function() {
            promise = Q.promise(function(resolve) {
                action.listen(function() {
                    resolve(Array.prototype.slice.call(arguments, 0));
                });
            });
        });


        it('should receive the correct arguments', function() {
            action(testArgs[0], testArgs[1]);

            return assert.eventually.deepEqual(promise, testArgs);
        });


        describe('when adding preEmit hook', function() {
            var preEmit = sinon.spy(),
                action = Reflux.createAction({preEmit:preEmit});

            action(1337,'test');

            it('should receive arguments from action functor', function() {
                assert.deepEqual(preEmit.firstCall.args,[1337,'test']);
            });
        });

        describe('when adding shouldEmit hook',function(){
            var context = {
                validateListening:function(){},
                fetchInitialState:function(){}
            };

            describe("when hook returns true",function(){
                var shouldEmit = sinon.stub().returns(true),
                    action = Reflux.createAction({shouldEmit:shouldEmit}),
                    callback = sinon.spy();
                Reflux.ListenerMethods.listenTo.call(context,action,callback);
                action(1337,'test');

                it('should receive arguments from action functor', function() {
                    assert.deepEqual(shouldEmit.firstCall.args,[1337,'test']);
                });

                it('should still trigger to listeners',function(){
                    assert.equal(callback.callCount,1);
                    assert.deepEqual(callback.firstCall.args,[1337,'test']);
                });

            });

            describe("when hook returns false",function(){
                var shouldEmit = sinon.stub().returns(false),
                    action = Reflux.createAction({shouldEmit:shouldEmit}),
                    callback = sinon.spy();
                Reflux.ListenerMethods.listenTo.call(context,action,callback);
                action(1337,'test');

                it('should receive arguments from action functor', function() {
                    assert.deepEqual(shouldEmit.firstCall.args,[1337,'test']);
                });

                it('should not trigger to listeners',function(){
                    assert.equal(callback.callCount,0);
                });
            });
        });
    });

});

describe('Creating actions with children to an action definition object', function() {
    var actionNames, actions;

    beforeEach(function () {
        actionNames = {'foo': {asyncResult: true}, 'bar': {children: ['baz']}};
        actions = Reflux.createActions(actionNames);
    });

    it('should contain foo and bar properties', function() {
        assert.property(actions, 'foo');
        assert.property(actions, 'bar');
    });

    it('should contain action functor on foo and bar properties with children', function() {
        assert.isFunction(actions.foo);
        assert.isFunction(actions.foo.completed);
        assert.isFunction(actions.foo.failed);
        assert.isFunction(actions.bar);
        assert.isFunction(actions.bar.baz);
    });

    describe('when listening to the child action created this way', function() {
        var promise;

        beforeEach(function() {
            promise = Q.promise(function(resolve) {
                actions.bar.baz.listen(function() {
                    resolve(Array.prototype.slice.call(arguments, 0));
                }, {}); // pass empty context
            });
        });

        it('should receive the correct arguments', function() {
            var testArgs = [1337, 'test'];
            actions.bar.baz(testArgs[0], testArgs[1]);

            return assert.eventually.deepEqual(promise, testArgs);
        });
    });
});

describe('Creating multiple actions to an action definition object', function() {

    var actionNames, actions;

    beforeEach(function () {
        actionNames = ['foo', 'bar'];
        actions = Reflux.createActions(actionNames);
    });

    it('should contain foo and bar properties', function() {
        assert.property(actions, 'foo');
        assert.property(actions, 'bar');
    });

    it('should contain action functor on foo and bar properties', function() {
        assert.isFunction(actions.foo);
        assert.isFunction(actions.bar);
    });

    describe('when listening to any of the actions created this way', function() {

        var promise;

        beforeEach(function() {
            promise = Q.promise(function(resolve) {
                actions.foo.listen(function() {
                    assert.equal(this, actions.foo);
                    resolve(Array.prototype.slice.call(arguments, 0));
                }); // not passing context, should default to action
            });
        });

        it('should receive the correct arguments', function() {
            var testArgs = [1337, 'test'];
            actions.foo(testArgs[0], testArgs[1]);

            return assert.eventually.deepEqual(promise, testArgs);
        });

    });

});

describe('Creating multiple actions from an mixed array of strings and object definitions', function() {

    var actionNames, actions;

    beforeEach(function () {
        actionNames = [
            'foo',
            'bar',
            { baz: { asyncResult: true, children: ['woo'] }},
            {
                anotherFoo: { asyncResult: true },
                anotherBar: { children: ['wee'] }
            }];
        actions = Reflux.createActions(actionNames);
    });

    it('should contain foo, bar and baz properties', function() {
        assert.property(actions, 'foo');
        assert.property(actions, 'bar');
        assert.property(actions, 'baz');
        assert.property(actions, 'anotherFoo');
        assert.property(actions, 'anotherBar');
    });

    it('should contain action functor on foo, bar and baz properties with children', function() {
        assert.isFunction(actions.foo);
        assert.isFunction(actions.bar);
        assert.isFunction(actions.baz);
        assert.isFunction(actions.baz.completed);
        assert.isFunction(actions.baz.failed);
        assert.isFunction(actions.baz.woo);
        assert.isFunction(actions.anotherFoo.completed);
        assert.isFunction(actions.anotherFoo.failed);
        assert.isFunction(actions.anotherBar.wee);
    });

    describe('when listening to any of the actions created this way', function() {

        var promise;

        beforeEach(function() {
            promise = Q.promise(function(resolve) {
                actions.foo.listen(function() {
                    assert.equal(this, actions.foo);
                    resolve(Array.prototype.slice.call(arguments, 0));
                }); // not passing context, should default to action
            });
        });

        it('should receive the correct arguments', function() {
            var testArgs = [1337, 'test'];
            actions.foo(testArgs[0], testArgs[1]);

            return assert.eventually.deepEqual(promise, testArgs);
        });

    });

});
