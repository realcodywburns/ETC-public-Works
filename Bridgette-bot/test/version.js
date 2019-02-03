var assert = require('assert');

//* unit under test *//
const { version } = require( "../funcs" );

//files needed to verify
var pkg = require('../../package.json');

module.exports =
describe('version reporting', function() {
      it('returns correct version statement', function() {
        var res = version('123');
        assert.equal(res.to, '123', 'version returns correct channel');
        assert.equal(res.message, "I am running version: `" + pkg.version  + "`" , 'version returns correct message');
    });
  });
