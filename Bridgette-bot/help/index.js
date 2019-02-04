// help files
const { log } = require('../common');

var bridgette = require('./bridgette');
var donatehelp = require('./donatehelp');
var etcmailhelp = require('./etcmailhelp');
var tipperError = require('./tipperError');

log.info('[Bridgett-bot/help/index.js] help loaded');

module.exports = {
    bridgette : bridgette,
    donatehelp : donatehelp,
    etcmailhelp : etcmailhelp,
    tipperError : tipperError,
}

// copy paste 
// const { bridgette, donatehelp, etcmailhelp, tipperError } = require( "./help" );