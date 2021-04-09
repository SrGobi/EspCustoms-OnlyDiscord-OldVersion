const Discord = require('discord.js');

module.exports = {
    name: 'decir',
    category: 'Moderation',
    description: 'ESP repite lo que le dices / añadiendo embed podras escribir un embed.',
    usage: `decir`,
    aliases: [],
    run: (discordclient, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send('No tienes permiso para usar este comando.').then(m => m.delete({timeout: 5000}));

        if (args.length < 1)
            return message.channel.send('Debes especificar algo para que el bot repita!').then(m => m.delete({timeout: 5000}));

        if (args[0].toLowerCase() === 'embed') {
            const embed = new Discord.MessageEmbed()
                .setColor(process.env.COLOR)
                .setDescription(args.slice(1).join(' ').toString())
            message.channel.send(embed);
        } else {
            message.channel.send(args.join(' '));
        }
    }
}