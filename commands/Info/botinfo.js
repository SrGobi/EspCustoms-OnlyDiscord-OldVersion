const Discord = require("discord.js");
const mongoose = require("mongoose");
const os = require('os');

module.exports = {
    //Command Information
    name: 'botinfo',
    category: 'Info',
    description: 'Muestra estadisticas del bot.',
    aliases: ['binfo, infobot'],
    usage: `botinfo`,
    run: async (discordclient, message, args) => {
        //Obtenga tiempo de actividad y uso de ram para bot
        const core = os.cpus()[0];
        let ramUsage = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2) + "MB";

        const EspGuilds = discordclient.emojis.cache.find(emoji => emoji.name === "EspBotGuilds");
        const EspServers = discordclient.emojis.cache.find(emoji => emoji.name === "EspBotServers");
        const EspMotherboard = discordclient.emojis.cache.find(emoji => emoji.name === "EspMotherboard");
        const EspCpu = discordclient.emojis.cache.find(emoji => emoji.name === "EspCpu");
        const EspSettings = discordclient.emojis.cache.find(emoji => emoji.name === "EspSettings");
        const EspApi = discordclient.emojis.cache.find(emoji => emoji.name === "EspBotApi");
        const EspUsers = discordclient.emojis.cache.find(emoji => emoji.name === "EspUsers");

        //Crea un incrustado para la información
        let statsEmbed = new Discord.MessageEmbed()
        .setAuthor(`${discordclient.user.username} INFO`, discordclient.user.displayAvatarURL())
        .setThumbnail(discordclient.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setColor(process.env.COLOR)

        //Agregue todos los demás valores para la inserción
        statsEmbed.addFields(
            { name: `${EspServers}Channels`, value:  "```" + discordclient.channels.cache.size + "```", inline: true},
            { name: `${EspGuilds}Servers`, value: "```" + discordclient.guilds.cache.size + "```", inline: true},
            { name: `${EspUsers}Users`, value:  "```" + discordclient.users.cache.size + "```", inline: true },
            { name: `${EspMotherboard}RAM usage`, value:  "```" + ramUsage + "```", inline: true },
            { name: `${EspCpu}CPU`, value: `Cores:` + "```" + os.cpus().length + "```" + `Model:` + "```" + core.model + "```" + `Speed:` + "```" + core.speed + "MHz" + "```", inline: true},
            { name: `${EspApi}API Latency`, value:  "```" + discordclient.ws.ping + "```", inline: true },
            { name: `${EspSettings}Built using`, value:  "```" + `Node.js: V${process.versions.node}, Discord.js: V${Discord.version}, Mongoose: V${mongoose.version}` + "```", inline: false },
        )
        .setFooter('Created by SrGobi | BLD SRGOBI#0001 | patreon.com/espcustoms')

        return message.channel.send(statsEmbed)
    },
};