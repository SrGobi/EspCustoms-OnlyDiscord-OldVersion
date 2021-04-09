const Discord = require('discord.js');

module.exports = {
    name: 'logchannel',
    category: 'Moderation',
    description: 'Crea un canal de registro sobre mensajes eliminados de todo el servidor',
    usage: `logchannel`,
    aliases: [],
    run: (discordclient, message, args) => {
        if(message.member.hasPermission('MANAGE_MESSAGES')){
            const name = "esp-log"
            message.guild.channels
            .create(name, {
                type: 'text',
            })
            setTimeout(() => {
                let embed = new Discord.MessageEmbed()
                    .setColor(process.env.COLOR)
                    .setTitle('Create ChannelLog')
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