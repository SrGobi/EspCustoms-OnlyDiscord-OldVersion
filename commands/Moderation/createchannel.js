const Discord = require('discord.js');

module.exports = {
    name: 'createchannel',
    category: 'Moderation',
    description: 'Crea tantos canales como sean necesarios',
    usage: `createchannel <namechannel>`,
    aliases: [],
    run: (discordclient, message, args) => {
        if(message.member.hasPermission('MANAGE_MESSAGES')){
            if (args.length < 1)
                return message.channel.send('Debes especificar el nombre del canal').then(m => m.delete({timeout: 5000}));
                const name = args.join(' ')
                message.guild.channels
                .create(name, {
                    type: 'text',
                })
                setTimeout(() => {
                    let embed = new Discord.MessageEmbed()
                        .setColor(process.env.COLOR)
                        .setTitle('Channel Create')
                        .setDescription('Ahora tiene que configurar los permisos del canal y moverlo hacia cualquier categoria si lo necesita')
                        message.guild.channels.cache.find(ch => ch.name === 'esp-log').send(embed);
                }, 500);
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.COLORPERMISSIONS)
                .setTitle(`⛔ **No tienes permiso para usar este comando** ⛔`)
        message.channel.send(embed).then(m => m.delete({timeout: 5000}))}
    }
};