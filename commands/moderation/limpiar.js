const Discord = require('discord.js');

module.exports = {
    name: 'limpiar',
    category: 'admin',
    description: 'Te permite ver el evento de fornite que proximamente bloqueara la custom.',
    usage: `limpiar`,
    run: async (client, message) => {
        message.delete().catch(O_o => {});

        let messageArray = message.content.split(' ');
        let args = messageArray.slice(1);
        let argument = args.join(' ');
        let gras = '**';
        if(message.member.hasPermission('MANAGE_CHANNELS')){
            var number = parseFloat(
                argument
            )
            if((number > 0) && (number < 101)){
                message.delete()
                message.channel.bulkDelete(number)
                setTimeout(() => {
                    let embed = new Discord.MessageEmbed()
                        .setColor(process.env.COLOR)
                        .setTitle(`${number} mensaje fue eliminado por ${gras}${message.author.username}${gras}`)
                    message.channel.send(embed)
                }, 500);
            }else{
                let embed = new Discord.MessageEmbed()
                    .setColor(process.env.COLOR)
                    .setTitle(`Debes ingresar un número entre 1 y 101`)
                message.channel.send(embed)
            }
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.COLOR)
                .setTitle(`⛔ **No tienes permiso para limpiar el chat** ⛔`)
           message.channel.send(embed)
       }
   }
};