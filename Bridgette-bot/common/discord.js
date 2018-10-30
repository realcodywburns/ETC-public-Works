var Discord = require('discord.io');

module.exports = new Discord.Client({
   token: process.env.DISCORD_TOKEN,
   autorun: true
});
