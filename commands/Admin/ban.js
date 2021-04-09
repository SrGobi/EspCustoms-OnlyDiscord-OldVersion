const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    category: 'Admin',
    description: 'Permite banear y especificar razón',
    usage: 'ban <@mention> <reason>',
    aliases: [],
    run: (discordclient, message, args) => {
        let gras = ``
        let toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        if(message.member.hasPermission('BAN_MEMBERS')){
            const reason = args[1] || "No especificado";
            toBan.ban({
                reason: reason
            })
            const EspStormfish = discordclient.emojis.cache.find(emoji => emoji.name === "EspStormfish");
            const embed = new Discord.MessageEmbed()
                .setColor(process.env.COLOR)
                .setTitle(`${EspStormfish}BANED${EspStormfish}`)
                .addFields(
                    { name: `**USER:**`, value: `${gras}${toBan}${gras}`, inline: false },
                    { name: `Reason`, value: `${reason}`, inline: true },
                  )
            message.channel.send(embed);         
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.COLORPERMISSIONS)
                .setTitle(`⛔ **No tienes permiso para usar este comando** ⛔`)
        message.channel.send(embed).then(m => m.delete({timeout: 5000}))
        }
    }
};