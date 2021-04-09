const Discord = require('discord.js');
const Guild = require('../../models/guild');
const mongoose = require('mongoose');

module.exports = {
    name: 'modlog',
    category: 'moderation',
    description: 'Establece el canal en el que se registrarán las acciones de moderación..',
    usage: `modlog <#channel>`,
    run: async (client, message, args) => {
        message.delete();

        if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('⛔**No tienes permiso para usar este comando.**⛔').then(m => m.delete({timeout: 5000}));

        const channel = await message.mentions.channels.first();

        if (!channel)
            return message.channel.send('No puedo encontrar ese canal. Mencione un canal dentro de este servidor.').then(m => m.delete({timeout: 5000}));

        await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX,
                    logChannelID: channel.id
                });

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send(`El canal de registros de mod se ha establecido en ${channel}`);
            } else {
                guild.updateOne({
                    logChannelID: channel.id
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send(`El canal de registros de mod se ha establecido en ${channel}`);
            };
        });
    }
}