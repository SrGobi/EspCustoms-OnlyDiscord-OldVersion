const Discord = require('discord.js');
const Guild = require('../../models/guild');
const mongoose = require('mongoose');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'info',
    description: 'Muestra el mensaje de ayuda del bot.',
    usage: `help [commandName]`,
    run: async (client, message, args) => {
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

        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return helpMSG(client, message);
        }
    }
}

async function helpMSG(client, message) {
    const guildDB = await Guild.findOne({
        guildID: message.guild.id
    });

    const embed = new Discord.MessageEmbed()
        .setColor(process.env.COLOREMBED)
        .setTitle('ESP AYUDA')
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`Para obtener una lista completa de comandos, escriba \`${guildDB.prefix}comandos\` \n\nPara ver más información sobre un comando específico, escriba \`${guildDB.prefix}help <comando>\` sin el \`<>\``)
        .addField('Acerca de', "ESP CUSTOMS")
        .addField('Links', `https://twitter.com/SrgobiY
        https://discord.gg/cqrN3Eg
        https://www.instagram.com/teambld.eu/`)
        .setFooter('Created by SrGobi | BLD SRGOBI#0001');
    message.channel.send(embed);
}

async function getCMD(client, message, input) {
    const guildDB = await Guild.findOne({
        guildID: message.guild.id
    });

    const embed = new Discord.MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `No se encontró información para el comando **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor(process.env.COLOREMBED).setDescription(info));
    }

    if (cmd.name) info = `**Nombre del comando**: ${cmd.name}`
    if (cmd.aliases) info += `\n**Alias**: ${cmd.aliases.map(a => `\`{a}\``).join(', ')}`;
    if (cmd.description) info += `\n**Descripción**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Uso**: ${guildDB.prefix}${cmd.usage}`;
        embed.setFooter('<> = REQUIRED | [] = OPTIONAL')
    }
    if (cmd.usage2) info += `\n**Uso 2**: ${guildDB.prefix}${cmd.usage2}`;

    return message.channel.send(embed.setColor(process.env.COLOREMBED).setDescription(info));
}