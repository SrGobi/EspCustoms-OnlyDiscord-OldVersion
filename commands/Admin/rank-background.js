const Guild = require('../../models/guild');
const mongoose = require('mongoose');

module.exports = {
    name: 'rank-background',
    category: 'Admin',
    description: '',
    usage: 'rank-background <enlace>',
    aliases: ['rankbackground'],
    run: async(discordclient, message, args) => {
        if(message.member.hasPermission('ADMINISTRATOR')){
            const background = args.join(' ');
            if (!background)
            return message.channel.send('No puedo encontrar ese enlace. Añada un enlace para poder modificar el background.').then(m => m.delete({timeout: 5000}));
            await Guild.findOne({
                guildID: message.guild.id
            }, async (err, guild) => {
                if (err) console.error(err);
                if (!guild) {
                    const newGuild = new Guild({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        guildName: message.guild.name,
                        prefix: process.env.PREFIX,
                        rankcard: background
                    });
        
                    await newGuild.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
        
                    return message.channel.send(`El background de los rangos se a establecido con ${background}`);
                } else {
                    guild.updateOne({
                        rankcard: background
                    })
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
        
                    return message.channel.send(`El background de los rangos se a establecido con ${background}`);
                }
            })
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.COLORPERMISSIONS)
                .setTitle(`⛔ **No tienes permiso para usar este comando** ⛔`)
            message.channel.send(embed).then(m => m.delete({timeout: 5000}))
        }
    }
}