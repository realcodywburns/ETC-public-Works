var assert = require('assert');
require('dotenv').config();
//* unit tests *//

var error = require('../Bridgette-bot/test/error');
var donate = require('../Bridgette-bot/test/donate');
var tipper = require('../Bridgette-bot/test/tipper');
var version = require('../Bridgette-bot/test/version');
//* end unit tests *//

/* tests */
describe('Global functions', function() {
  error,
  donate,
  tipper,
  version
});
