const Discord = require('discord.js');
const Guild = require('../../models/guild');
const guildSchema = require('../../models/guild');
const mongoose = require('mongoose');

module.exports = {
    name: 'help',
    category: 'Info',
    description: 'Muestra ayuda sobre comandos especificos',
    aliases: ['h'],
    usage: `help [commandName]`,
    run: async (discordclient, message, args) => {
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
        if (args[0]) {
            return getCMD(discordclient, message, args[0]);
        } else {
            return helpMSG(discordclient, message);
        }
    }
}

async function helpMSG(discordclient, message) {
    const guildDB = await Guild.findOne({
        guildID: message.guild.id
    });
    const embed = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setAuthor(`${discordclient.user.username}`, discordclient.user.displayAvatarURL())
        .setThumbnail(discordclient.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription("[Website](https://teambld.github.io/enlaces) • [Twitter](https://twitter.com/SrgobiY) • [Discord](https://discord.gg/cqrN3Eg) • [Instagram](https://www.instagram.com/teambld.eu/)")
        .addField(`Para obtener una lista completa de comandos, escriba \`${guildDB.prefix}comandos\` \n\nPara ver más información sobre un comando específico, escriba \`${guildDB.prefix}help <comando>\` sin el \`<>\``)
        .addField('Acerca de', "ESP CUSTOMS")
        .setFooter('Created by SrGobi | BLD SRGOBI#0001 | patreon.com/espcustoms');
    message.channel.send(embed);
}
async function getCMD(discordclient, message, input) {
    const guildDB = await Guild.findOne({
        guildID: message.guild.id
    });
    const embed = new Discord.MessageEmbed()
    const command = discordclient.commands.get(input.toLowerCase()) || discordclient.commands.get(discordclient.aliases.get(input.toLowerCase()));
    let info = `No se encontró información para el comando **${input.toLowerCase()}**`;
    if (!command) {
        return message.channel.send(embed.setColor('#EF990B').setDescription(info));
    }
    if (command.name) info = `**Nombre del comando**: ${command.name}`
    if (command.aliases) info += `\n**Alias**: ${guildDB.prefix}${command.aliases}`;
    if (command.description) info += `\n**Descripción**: ${command.description}`;
    if (command.usage) {
        info += `\n**Uso**: ${guildDB.prefix}${command.usage}`;
        embed.setFooter('Created by SrGobi | BLD SRGOBI#0001 | patreon.com/espcustoms')
    }
    if (command.usage2) info += `\n**Uso 2**: ${guildDB.prefix}${command.usage2}`;

    return message.channel.send(embed.setColor(process.env.COLOR).setDescription(info));
}