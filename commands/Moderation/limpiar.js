const Discord = require('discord.js');

module.exports = {
    name: 'limpiar',
    category: 'Moderation',
    description: 'Limpia el chat del numero de mensajes que quieras borrar',
    usage: `limpiar <numero>`,
    aliases: [],
    run: async (discordclient, message) => {
        let messageArray = message.content.split(' ');
        let args = messageArray.slice(1);
        let argument = args.join(' ');
        let gras = '**';
        if(message.member.hasPermission('MANAGE_MESSAGES')){
            var number = parseFloat(
                argument
            )
            if((number > 0) && (number < 101)){
                message.delete().catch(O_o => {})
                message.channel.bulkDelete(number)
                setTimeout(() => {
                    let embed = new Discord.MessageEmbed()
                        .setColor(process.env.COLOR)
                        .setTitle(`${number} mensaje fue eliminado por ${gras}${message.author.username}${gras}`)
                    message.channel.send(embed)
                }, 500);
            }else{
                let embed = new Discord.MessageEmbed()
                    .setColor('#EF990B')
                    .setTitle(`Debes ingresar un número entre 1 y 101`)
                message.channel.send(embed)
            }
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.COLORPERMISSIONS)
                .setTitle(`⛔ **No tienes permiso para limpiar el chat** ⛔`)
            message.channel.send(embed)
       }
   }
};