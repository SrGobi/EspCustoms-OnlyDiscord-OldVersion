const Discord = require("discord.js");
const mongoose = require("mongoose");
moment = require('moment');

module.exports = {
    //Command Information
    name: 'serverinfo',
    aliases: ['sv'],
    category: 'info',
    description: 'Muestra estadisticas del servidor.',
    usage: `serverinfo`,

    run: async (client, message, args) => {

        // Utilice el momento para convertir ms a la fecha
        let createDate = await moment(message.guild.createdAt).format('MMMM Do YYYY, HH:mm:ss');

        // Obtenga la cantidad de canales de texto y voz
        let textChans = await message.guild.channels.cache.filter(x => x.type === 'text').size;
        let voiceChans = await message.guild.channels.cache.filter(x => x.type === 'voice').size;
        // Obtenga la cantidad de categorías
        let catCount = await message.guild.channels.cache.filter(x => x.type === 'category').size;

        // Obtener el nivel de verificación del servidor
        let verifyLevel = await message.guild.verificationLevel.toLowerCase();
        verifyLevel = verifyLevel.charAt(0).toUpperCase() + verifyLevel.slice(1)
        // Get the amount of banned users
        let banCount = await message.guild.fetchBans()

        // Crea el incrustado y agrega la información
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: `Server ID`, value: `${message.guild.id}`, inline: false },
            { name: `Region`, value: message.guild.region, inline: true },
            { name: `Verification Level`, value: verifyLevel, inline: true },
            { name: `Members`, value: message.guild.memberCount, inline: true },
            { name: `Server Owner`, value: `${message.guild.owner} [${message.guild.owner.id}]`, inline: false },
            { name: `Guild Created`, value: createDate, inline: false },
            { name: `Channels [${textChans + voiceChans + catCount}]`, value: `Category: ${catCount}\n\nText: ${textChans}\nVoice: ${voiceChans}`, inline: true },
            { name: `Bans`, value: banCount.size, inline: false},
            { name: `Server Boosts`, value: `Level: ${message.guild.premiumTier}\nAmount: ${message.guild.premiumSubscriptionCount || 0}` , inline: false },
    	    )
        return message.channel.send(embed);
    },
};