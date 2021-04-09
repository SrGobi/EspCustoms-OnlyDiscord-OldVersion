const Discord = require('discord.js');
const discordclient = new Discord.Client({disableEveryone: false});
const Distube = require('distube');
const fs = require('fs');
const Canvas = require('canvas');
const { config } = require('dotenv');
discordclient.db = require("quick.db");
discordclient.commands = new Discord.Collection();
discordclient.aliases = new Discord.Collection();
discordclient.mongoose = require('./utils/mongoose');
discordclient.categories = fs.readdirSync('./commands/');
discordclient.distube = new Distube(discordclient, {
    youtubeCookie: config.cookie,
    searchSongs: true,
    emitNewSongOnly: true,
    highWaterMark: 1<<24,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: true,
    searchSongs: false,
    youtubeDL: true,
    updateYouTubeDL: false
})
discordclient.distube
.on("playSong", (message, queue, song) => message.channel.send(
    `**Escuchando** 🎶 \`${song.name}\` - \`${song.formattedDuration}\``
))
.on("addSong", (message, queue, song) => message.channel.send(
    `**Agregada** 👍 ${song.name} - \`${song.formattedDuration}\``
))
/////////////////////////////////////////////////////  ENV  /////////////////////////////////////////////////////
config({
    path: `${__dirname}/.env`
});
/////////////////////////////////////////////////////  Handler  /////////////////////////////////////////////////////
['command'].forEach(handler => {
    require(`./handlers/${handler}`)(discordclient);
});
fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Evento cargado '${evtName}'`);
        discordclient.on(evtName, evt.bind(null, discordclient));
    });
});
/////////////////////////////////////////////////////  STATUS  /////////////////////////////////////////////////////
discordclient.on("ready", () => {
    console.log('[DISCORD]', `Estoy en linea, mi nombre es ${discordclient.user.username}`);
    let statuses = [
        `${discordclient.guilds.cache.size} servers!`,
        "!comandos",
        `sobre ${discordclient.users.cache.size} usuarios!`
    ]
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        discordclient.user.setActivity(status, {type: "WATCHING"});
    }, 20000)
});

discordclient.mongoose.init();
////////////////////////////////////////////////////////////////////////////   WELCOME  ///////////////////////////////////////////////////////////////////////////////////
discordclient.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.get('#ChannelId'); //El ID del canal donde se dará la bienvenida
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
    channel.send(`🎊 Buenas ${member}, Bienvenid@ a **ESP CUSTOMS**🎊\n\n`, attachment);
});
discordclient.on('message', message => {
	if (message.content === '!join') {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES"))return message.channel.send("⛔ **No tienes permiso para gestionar mensajes en este canal** ⛔");
		discordclient.emit('guildMemberAdd', message.member);
	}
});
////////////////////////////////////////////////////////////////////  ModLog  ////////////////////////////////////////////////////////////////////////
discordclient.on('messageDelete', async message => {
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
    .setColor(process.env.COLORPERMISSIONS)
    .addField("**❯ Usuario:**", message.author.tag)
    .addField("**❯ Borrado:**", message.content)
    .addField("**❯ Borrado en:**", message.channel)

    logchannel.send(txt)
});
/////////////////////////////////////////////////////  Palabras  /////////////////////////////////////////////////////
discordclient.on('message', async message => {
    const FILTER_LIST = require('./blacklist.json')
    let blacklisted = FILTER_LIST;
    let foundInText = false;
    for (var i in blacklisted){
        if (message.channel.id === '<#ChannelId>', '<#OtherChannelId>') //Los ID de canales bloquean palabras
        if (message.content.toLocaleLowerCase().includes(blacklisted[i].toLocaleLowerCase())) foundInText = true;
    }
    if (foundInText) {
        message.delete();
    }
})
/////////////////////////////////////////////////////  Token Bot Developer  /////////////////////////////////////////////////////
discordclient.login(process.env.TOKEN);