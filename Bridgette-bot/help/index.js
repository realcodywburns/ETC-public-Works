// help files
const { log } = require('../common');

var bridgette = require('./help/bridgette');
var donatehelp = require('./help/donatehelp');
var etcmailhelp = require('./help/etcmailhelp');
var tipperError = require('./help/tipperError');

log.info('[Bridgett-bot/help/index.js] help loaded');

module.exports = {
    bridgette : bridgette,
    donatehelp : donatehelp,
    etcmailhelp : etcmailhelp,
    tipperError : tipperError,
}

// copy paste 
// const { bridgette, donatehelp, etcmailhelp, tipperError } = require( "./help" );