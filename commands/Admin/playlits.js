const Discord = require('discord.js');

module.exports = {
    name: 'playlist',
    category: 'Admin',
    description: 'Cambia la fiesta\'s playlist.',
    usage: '<playlist_id>',
    aliases: [],
    run: async (cdiscordclient, clientfortnite, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')){
            const newPlaylist = args.slice(0).join(' ');
            if (!newPlaylist) return message.channel.send('Proporcione una lista de reproducción.');
            clientfortnite.party.setPlaylist(newPlaylist).catch(err => { return message.channel.send('Ocurrió un error al intentar cambiar la lista de reproducción.');
        });
            let EmbedPlaylist = new Discord.MessageEmbed()
                .setTitle(`PLAYLIST`)
                .setThumbnail(discordclient.user.displayAvatarURL())
                .setColor(process.env.COLOR)
                .setDescription(`Cambiar la lista de reproducción a ${newPlaylist}.`)
                .setFooter('Created by SrGobi | BLD SRGOBI#0001 | patreon.com/espcustoms')
            message.channel.send(EmbedPlaylist)
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.COLORPERMISSIONS)
                .setTitle(`⛔ **No tienes permiso para usar este comando** ⛔`)
            message.channel.send(embed).then(m => m.delete({timeout: 5000}))
        }
    }
}