import chai, { assert } from 'chai';
import asPromised from 'chai-as-promised';
import { default as Reflux } from '../src';
import * as internalUtils from '../src/utils';

chai.use(asPromised);

describe('Switching the used EventEmitter to Node\'s internal', function() {
    var original;

    beforeEach(function() {
        original = internalUtils.EventEmitter;
        Reflux.setEventEmitter(require('events').EventEmitter);
    });

    afterEach(function () {
        Reflux.setEventEmitter(require('eventemitter3'));
    });

    it('should not be the original', function() {
        assert.notEqual(original, internalUtils.EventEmitter);
    });

    it('should have the same interface', function() {
        var ee = internalUtils.EventEmitter.prototype;
        assert.property(ee, 'addListener');
        assert.property(ee, 'removeListener');
        assert.property(ee, 'emit');
    });

});
