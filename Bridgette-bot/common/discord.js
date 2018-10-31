var Discord = require('discord.io-gateway6');

module.exports = new Discord.Client({
   token: process.env.DISCORD_TOKEN,
   autorun: true
});
