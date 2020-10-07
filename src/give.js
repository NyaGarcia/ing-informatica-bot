/*
  Asigna roles en base a la reacción del usuario
*/

const Discord = require('discord.js'),
  client = new Discord.Client(),
  prefix = '!',
  token = process.env.DISCORD_TOKEN;

var emojiname = ['KEKW'],
  rolename = ['AUTÓMATAS, GRAMÁTICAS Y LENGUAJES'];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (e) => {
  if (e.content.startsWith(prefix + 'reaction')) {
    if (!e.channel.guild) return;
    for (let o in emojiname) {
      var n = [e.guild.emojis.find((e) => e.name == emojiname[o])];
      for (let o in n) e.react(n[o]);
    }
  }
});

client.on('messageReactionAdd', (e, n) => {
  if (n && !n.bot && e.message.channel.guild)
    for (let o in emojiname)
      if (e.emoji.name == emojiname[o]) {
        let i = e.message.guild.roles.find((e) => e.name == rolename[o]);
        e.message.guild.member(n).addRole(i).catch(console.error);
      }
});

client.on('messageReactionRemove', (e, n) => {
  if (n && !n.bot && e.message.channel.guild)
    for (let o in emojiname)
      if (e.emoji.name == emojiname[o]) {
        let i = e.message.guild.roles.find((e) => e.name == rolename[o]);
        e.message.guild.member(n).removeRole(i).catch(console.error);
      }
});

client.login(token);
