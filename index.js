const Discord = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const client = new Discord.Client({disableEveryone: false});
const Canvas = require('canvas');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.mongoose = require('./utils/mongoose');

client.categories = fs.readdirSync('./commands/');
/////////////////////////////////////////////////////  ENV  /////////////////////////////////////////////////////
config({
    path: `${__dirname}/.env`
});
/////////////////////////////////////////////////////  Handler  /////////////////////////////////////////////////////
['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});
/////////////////////////////////////////////////////  STATUS  /////////////////////////////////////////////////////
client.on("ready", () => {
    console.log(`Estoy en linea, mi nombre es ${client.user.username}`);
    let statuses = [
        `${client.guilds.cache.size} servers!`,
        "!ayuda",
        `over ${client.users.cache.size} users!`
    ]
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "WATCHING"});
    }, 20000)
});
client.mongoose.init();
////////////////////////////////////////////////////////////////////////////   WELCOME  ///////////////////////////////////////////////////////////////////////////////////
client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.get('#ChannelId');
    if (!channel) return;
    const backgroundEsp = `${__dirname}imagenes/ESP.jpg`;
    const CircleEnter = `${__dirname}imagenes/CircleEnter.png`;
    const WelcomeEsquinas = `${__dirname}imagenes/WelcomeEsquinas.png`;
    const canvas = Canvas.createCanvas(700, 300);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage(backgroundEsp);
    const circle = await Canvas.loadImage(CircleEnter);
    const esquina = await Canvas.loadImage(WelcomeEsquinas);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(circle, 1, 0);
    ctx.drawImage(esquina, 0, 0);

    ctx.beginPath();
    ctx.arc(340, 120, 75, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, 265, 45, 150, 150);

    ctx.strokeStyle = "#000";
    ctx.globalAlpha = 0.5;
    ctx.strokeRect(8, 11, 680, 280);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `welcome_${member.user.username}.png`);
    channel.send(`🎊 Buenas ${member}, Bienvenid@ a **ESP CUSTOMS** <:esp:684175193404342303> 🎊 Read the <#681193531456749593> section\n\n`, attachment);
});
client.on('message', message => {
	if (message.content === '!join') {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES"))return message.channel.send("⛔ **No tienes permiso para gestionar mensajes en este canal** ⛔");
		client.emit('guildMemberAdd', message.member);
	}
});
////////////////////////////////////////////////////////////////////  ModLog  ////////////////////////////////////////////////////////////////////////
client.on('messageDelete', async message => {
    let logchannel = message.guild.channels.cache.find(ch => ch.name === 'esp-log')
    if (!logchannel) return
    //Devolver si no está habilitado.

    if (message.guild.channels.cache.find(ch => ch.name === "esp-log")) return;
    if (message.channel.id === 'esp-log') return
    if (message.channel.id === 'solo-key') return
    if (message.channel.id === 'duo-key') return
    if (message.channel.id === 'trio-key') return
    //Esto evitará cualquier caos al eliminar algún mensaje dentro de los canales especificados
    //Es para deshabilitar el comando/codigo especifico

    const txt = new Discord.MessageEmbed()
    .setAuthor("Mensaje Borrado", "https://i.imgur.com/W7dd0e7.gif")
    .setColor('#f2190a')
    .addField("**❯ Usuario:**", message.author.tag)
    .addField("**❯ Borrado:**", message.content)
    .addField("**❯ Borrado en:**", message.channel)

    logchannel.send(txt)
});
/////////////////////////////////////////////////////  Token Bot Developer  /////////////////////////////////////////////////////
client.login(process.env.TOKEN);