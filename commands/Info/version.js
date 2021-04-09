const Discord = require('discord.js');

module.exports = {
    name: 'version',
    category: 'Info',
    description: 'Te permite ver la version y el soporte del bot.',
    aliases: ['vs'],
    usage: `version`,
    run: (discordclient, message, args) => {
        if (args.length < 1) {
            const embed = new Discord.MessageEmbed()
                .setTitle("ESP CUSTOMS")
                .setColor(process.env.COLOR)
                .setThumbnail(discordclient.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .addField("**Version:**", "```" + `ESP CUSTOMS | v0.0.4b` + "```", true)
                .addField("**Server Support:**", `https://discord.gg/cqrN3Eg`, true)
                .addField("**Comandos**", "```" + `Para ver todos los comandos utiliza !comandos$` + "```", false)
                .setFooter('Created by SrGobi | BLD SRGOBI#0001 | patreon.com/espcustoms')
            message.channel.send(embed);
        }
    }
}