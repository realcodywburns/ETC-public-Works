var Discord = require('discord.io');
var logger = require('winston');
var auth = require('../auth.json');

module.exports = new Discord.Client({
   token: auth.token,
   autorun: true
});
