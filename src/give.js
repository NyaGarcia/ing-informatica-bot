/*
  Asigna roles en base a la reacción del usuario
*/

const Discord = require('discord.js'),
  client = new Discord.Client(),
  prefix = '!',
  token = process.env.DISCORD_TOKEN;

const CURSO1 = {
  '🧲': 'FUNDAMENTOS FÍSICOS DE LA INFORMÁTICA',
  '🧮': 'FUNDAMENTOS MATEMÁTICOS DE LA INFORMÁTICA',
  '🧬': 'FUNDAMENTOS DE SISTEMAS DIGITALES',
  '💻': 'FUNDAMENTOS DE PROGRAMACIÓN',
  '🧠': 'LÓGICA Y ESTRUCTURAS DISCRETAS',
  '🗂': 'ESTRATEGIAS DE PROGRAMACIÓN Y ESTRUCTURAS DE DATOS',
  '📊': 'ESTADÍSTICA',
  '🔧': 'INGENIERÍA DE COMPUTADORES I',
  '⌨': 'PROGRAMACIÓN ORIENTADA A OBJETOS',
  '🤖': 'AUTÓMATAS, GRAMÁTICAS Y LENGUAJES',
};

const adminUser = 'REPLACE THIS WITH YOUR USER';

let messageCurses = [];

function createMessage() {}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async (e) => {
  console.log(e);
  if (
    e.author.id === adminUser &&
    e.content.startsWith(prefix + 'sendrolelist')
  ) {
    let messageText =
      '**vota!**.\n**Selecciona los emojis que correspondan con tu asignatura del PRIMER CURSO:**\n';
    Object.entries(CURSO1).forEach(
      (subject) => (messageText += subject[0] + ' ' + subject[1] + '\n')
    );
    const message = await e.channel.send(messageText);
    messageCurses.push(message);
    Object.keys(CURSO1).map((subjectEmoji) => {
      message.react(subjectEmoji);
    });
  }
});

const filteer = (reaction, user) => {
  console.log(reaction);
  console.log('userid', user.id);
  console.log('authorid', reaction.message.author.id);

  return user.id === reaction.message.author.id;
};

client.on('messageReactionAdd', async (reaction, user) => {
  const message = reaction.message;
  const emoji = reaction.emoji;

  // if (!messageCurses.includes(message.id)) return;

  if (!filteer(reaction, user)) {
    console.log('emoji: ' + emoji);
    const roleName = CURSO1[emoji];
    const userDiscord = await reaction.message.guild.member(user);
    const role = await message.guild.roles.cache.find(
      (r) => r.name === roleName
    );

    userDiscord.roles.add(role);
  }
});

client.login(token);
