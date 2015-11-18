import { assert } from 'chai';
import sinon from 'sinon';
import Reflux from '../src';

describe('add plugins with use function', function() {

    it('Reflux will have it', function() {

        assert.isFunction(Reflux.use);

    });

    describe('when plugin is added', function() {

        var pluginKey = "myPlugin", pluginCb;

        function plugin(refluxDefs) {
            refluxDefs[pluginKey] = pluginCb;
        }

        before(function () {
            pluginCb = sinon.spy();
            Reflux.use(plugin);
        });

        it('Reflux should have the plugin at key', function() {
            assert.equal(Reflux[pluginKey], pluginCb);
        });

        after(function () {
            if (!!Reflux[pluginKey]) {
                delete Reflux[pluginKey];
            }
        });

    });

});
