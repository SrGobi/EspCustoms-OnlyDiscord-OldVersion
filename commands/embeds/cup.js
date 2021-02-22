const Discord = require('discord.js');

module.exports = {
    name: 'cup',
    category: 'embeds',
    description: 'Te permite ver el evento de fornite que proximamente bloqueara la custom.',
    usage: `cup`,
    run: async (client, message, args) => {
        message.delete().catch(O_o => {});
        if(message.member.hasPermission('MANAGE_MESSAGES')){
            if (args.length < 1) {
                const embed = new Discord.MessageEmbed()
                    .setTitle("DREAMHACK ONLINE OPEN FEATURING FORTNITE")
                    .setURL("https://fortnitetracker.com/events/epicgames_S14_Dreamhack_November_EU_Heat1")
                    .setColor('RANDOM')
                    .setThumbnail(client.user.displayAvatarURL())
                    .addField("**PAUSED CUSTOMS:**", `:flag_gb: | **Due to the next event, we delay customs. We wish you good luck** :call_me:\n\n:flag_ea: | **Debido al proximo evento, atrasamos las customs. Os deseamos mucha suerte** :call_me: `, true)
                    .setImage(`https://i.imgur.com/BJvqXi7.png`)
                message.channel.send('<@&614777211555414017>', embed);
            }
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor('#EF0B0B')
                .setTitle(`⛔ **No tienes permiso para usar este comando** ⛔`)
        message.channel.send(embed).then(m => m.delete({timeout: 5000}))
        }
    }
}
