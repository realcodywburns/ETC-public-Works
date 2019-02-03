// common functions
const { log } = require('../common');

var statebot = require('./lib/statebot');
var multi = require('./lib/multi-sig');
var donate = require('./lib/donate');
var getetc = require('./lib/getetc');
var etcmail = require('./lib/etcmail');
var eventLog = require('./lib/eventLog');
var tipper = require('./lib/tipper');

log.info('[Bridgett-bot/dapps/index.js] dapps loaded');

module.exports = {
    statebot : statebot,
    multi : multi,
    donate : donate,
    getetc : getetc,
    etcmail : etcmail,
    eventLog : eventLog,
    tipper : tipper,
}

// copy paste 
// const { statebot, multi, donate, getetc, etcmail, eventLog, tipper } = require( "./dapps" );