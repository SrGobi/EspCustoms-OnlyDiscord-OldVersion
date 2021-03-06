const Discord = require('discord.js');

module.exports = {
    name: 'version',
    category: 'info',
    description: 'Te permite ver la version y el soporte del bot.',
    usage: `version`,
    run: (client, message, args) => {
        message.delete().catch(O_o => {});
        let gras = '``'
        if (args.length < 1) {
            const embed = new Discord.MessageEmbed()
                .setTitle("ESP CUSTOMS")
                .setColor(process.env.COLOR)
                .setThumbnail(client.user.displayAvatarURL())
                .addField("**Version:**", `${gras}ESP CUSTOMS | v2.4.5${gras}`, true)
                .addField("**Server Support:**", `https://discord.gg/cqrN3Eg`, true)
                .addField("**Comandos**", `${gras}Para ver todos los comandos utiliza !comandos${gras}`, false)
                .setFooter("Created by SrGobi | BLD SRGOBI#0001")
            message.channel.send(embed);
        }
    }
}