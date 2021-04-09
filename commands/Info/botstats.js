const Discord = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
    //Command Information
    name: 'botstats',
    aliases: ['bs'],
    category: 'info',
    description: 'Muestra estadisticas del bot.',
    usage: `botstats`,

    run: async (discordclient, message, args) => {

      //Obtenga tiempo de actividad y uso de ram para bot
      let uptime = convertMs(message.discordclient.uptime);
      let ramUsage = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2) + "MB";

      //Crea un incrustado para la información
      let statsEmbed = new Discord.MessageEmbed()
      .setAuthor(`${discordclient.user.username} STATS`, discordclient.user.displayAvatarURL())
      .setThumbnail(discordclient.user.displayAvatarURL())

      //Agregue todos los demás valores para la inserción
      statsEmbed.addFields(
        { name: "Channels", value:  "```" + discordclient.channels.cache.size + "```", inline: true },
        { name: "Guilds", value: "```" + discordclient.guilds.cache.size + "```", inline: true},
        { name: "Users", value:  "```" + discordclient.users.cache.size + "```", inline: true },
        { name: "RAM usage", value:  "```" + ramUsage + "```", inline: true },
        { name: "API Latency", value:  "```" + discordclient.ws.ping + "```", inline: true },
        { name: "Built using", value:  "```" + `Node.js: V${process.versions.node}, Discord.js: V${Discord.version}, Mongoose: V${mongoose.version}` + "```", inline: false },
        { name: "Uptime", value:  "```" + uptime + "```", inline: false },
      )

      return message.channel.send(statsEmbed)

      //Convert ms into time
      function convertMs(mills){
        let roundNumber = mills > 0 ? Math.floor : Math.ceil;
        let days = roundNumber(mills / 86400000),
        hours = roundNumber(mills / 3600000) % 24,
        mins = roundNumber(mills / 60000) % 60,
        secs = roundNumber(mills / 1000) % 60;
        var time = (days > 0) ? `${days} Days, ` : "";
        time += (hours > 0) ? `${hours} Hours, ` : "";
        time += (mins > 0) ? `${mins} Minutes, ` : "";
        time += (secs > 0) ? `${secs} Seconds` : "0 Seconds";
        return time;
      }

    },
};
