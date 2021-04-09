const Discord = require('discord.js');
const Guild = require('../../models/guild');
const { stripIndents } = require('common-tags');
const mongoose = require('mongoose');

module.exports = {
    name: 'comandos',
    aliases: ['cm'],
    category: 'info',
    description: 'Muestra una lista completa de comandos de bot.',
    usage: `comandos`,
    run: async (client, message) => {
        await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX,
                    logChannelID: null
                });
    
                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            }
        });

        return getAll(client, message);
    }
}

async function getAll(client, message) {
    const guildDB = await Guild.findOne({
        guildID: message.guild.id
    });

    const embed = new Discord.MessageEmbed()
    .setColor(process.env.COLOR)
    .setTitle('LISTA DE COMANDOS')
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter('Created by SrGobi | BLD SRGOBI#0001')
    
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${(guildDB.prefix) + cmd.name}\``)
            .join('\n');
    }

    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toLowerCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => `${string}\n${category}`);

    return message.channel.send(embed.setDescription('Use `' + (`${guildDB.prefix}help <commandName>\` sin el \`<>\` para ver más información sobre un comando específico.\n\n${info}`)));
}