const Discord = require('discord.js');
const Guild = require('../../models/guild');
const { stripIndents } = require('common-tags');
const mongoose = require('mongoose');

module.exports = {
    name: 'comandos',
    category: 'info',
    description: 'Muestra una lista completa de comandos de bot.',
    aliases: ['cm'],
    usage: `comandos`,
    run: async (discordclient, message) => {
        await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX
                });
    
                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            }
        });

        return getAll(discordclient, message);
    }
}

async function getAll(discordclient, message) {
    const guildDB = await Guild.findOne({
        guildID: message.guild.id
    });
    const admin = discordclient.commands
		.filter(command => command.category === 'Admin')
        .map(command => `${(guildDB.prefix) + command.name}`)
        .join('\n');

    const customs = discordclient.commands
		.filter(command => command.category === 'Customs embeds')
        .map(command => `${(guildDB.prefix) + command.name}`)
        .join('\n');

	const info = discordclient.commands
		.filter(command => command.category === 'Info')
        .map(command => `${(guildDB.prefix) + command.name}`)
        .join('\n');

	const moderation = discordclient.commands
		.filter(command => command.category === 'Moderation')
        .map(command => `${(guildDB.prefix) + command.name}`)
        .join('\n');

    const music = discordclient.commands
		.filter(command => command.category === 'Music')
        .map(command => `${(guildDB.prefix) + command.name}`)
        .join('\n');

    const embed = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle('LISTA DE COMANDOS')
        .setThumbnail(discordclient.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription('Use `' + (`${guildDB.prefix}help <commandName>\` sin el \`<>\` para ver más información sobre un comando específico.\n`))
        .addFields(
            { name: `**Admin**`, value: "```" + admin + "```", inline: true },
            { name: `**Customs Embeds**`, value: "```" + customs + "```", inline: true },
            { name: `**Info**`, value: "```" + info + "```", inline: true },
            { name: `**Moderation**`, value: "```" + moderation + "```", inline: true },
            { name: `**Music**`, value: "```" + music + "```", inline: true },
          )
        .setFooter('Created by SrGobi | BLD SRGOBI#0001 | patreon.com/espcustoms')
    return message.channel.send(embed);
}