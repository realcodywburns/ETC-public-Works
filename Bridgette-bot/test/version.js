var assert = require('assert');



//* unit under test *//
var error = require('../lib/error');

//files needed to verify
var pkg = require('../../package.json');

module.exports =
describe('version reporting', function() {
      it('returns correct version statement', function() {
        var res = error('123', 'im an error');
        assert.equal(res.to, '123', 'version returns correct channel');
        assert.equal(res.message, "I am running version: `" + pkg.version  + "`" , 'version returns correct message');
    });
  });
