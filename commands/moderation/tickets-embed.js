const Discord = require('discord.js');

module.exports = {
    name: 'ticket',
    category: 'moderation',
    description: 'cree el mensaje con uan reaccion por defecto de ✉️.',
    usage: `ticket`,
    run: async (client, message, args) => {
        message.delete().catch(O_o => {});
        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send('⛔**No tienes permiso para usar este comando.**⛔').then(m => m.delete({timeout: 5000}));

        const channel = message.guild.channels.cache.find(ch => ch.name === 'trio-key');

        if (!channel)
            return message.channel.send('No puedo encontrar ese canal. Cree un canal llamado trio-key.').then(m => m.delete({timeout: 5000}));
            
            if (args.length < 1)
            return message.channel.send('Debes especificar el contenido del ticket!').then(m => m.delete({timeout: 5000}));

            const embed = new Discord.MessageEmbed()
                .setTitle("TICKET")
                .setColor(process.env.COLOR)
                .addField(args.join(' '))

            message.guild.channels.cache.find(ch => ch.name === channel).send(embed);
    }
}