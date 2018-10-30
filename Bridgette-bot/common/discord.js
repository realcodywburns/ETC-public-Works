var Discord = require('discord.js');

module.exports = new Discord.Client({
   token: process.env.DISCORD_TOKEN,
   autorun: true
});
