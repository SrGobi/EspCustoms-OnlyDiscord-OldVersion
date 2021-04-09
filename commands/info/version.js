const Discord = require('discord.js');

module.exports = {
    name: 'version',
    category: 'info',
    description: 'Te permite ver la version y el soporte del bot.',
    usage: `version`,
    run: (client, message, args) => {
        message.delete().catch(O_o => {});
        let gras = '``'

        if (!message.member.hasPermission('SEND_MESSAGES'))
            return message.channel.send('⛔**No tienes permiso para usar este comando.**⛔').then(m => m.delete({timeout: 5000}));
        
        if (args.length < 1) {
            const embed = new Discord.MessageEmbed()
                .setTitle("ESP CUSTOMS")
                .setColor('RANDOM')
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .addField("**Version:**", `${gras}ESP CUSTOMS | v0.0.1b${gras}`, true)
                .addField("**Server Support:**", `https://discord.gg/cqrN3Eg`, true)
                .addField("**Ayuda**", `${gras}Para ver todos los comandos utiliza !ayuda${gras}`, false)
                .setFooter("| Command used !version", "https://i.imgur.com/XbgZXYQ.png")
            message.channel.send(embed);
        }
    }
}