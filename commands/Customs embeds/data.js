const Discord = require('discord.js');

module.exports = {
    name: 'data',
    aliases: ['dt'],
    category: 'embeds',
    description: 'ESP repite lo que le dices / añadiendo embed podras escribir un embed.',
    usage: `data`,
    run: (discordclient, message, args) => {
        message.delete().catch(O_o => {});
        let gras = '```';

        if(message.member.hasPermission('MANAGE_MESSAGES')){
            if (args.length < 1)
                return message.channel.send('Debes añadir el texto que tiene que repetir el bot').then(m => m.delete({timeout: 5000}));

                const embed = new Discord.MessageEmbed()
                    .setColor(process.env.COLOREMBED)
                    .setDescription(`${gras}${args.join(' ')}${gras}`)
                message.channel.send(embed);
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.COLORPERMISSIONS)
                .setTitle(`⛔ **No tienes permiso para usar este comando** ⛔`)
        message.channel.send(embed).then(m => m.delete({timeout: 5000}))
        }
    }
}