const Discord = require('discord.js');

module.exports = {
    name: 'cup',
    category: 'embeds',
    description: 'Te permite ver el evento de fornite que proximamente bloqueara la custom.',
    usage: `cup`,
    run: async (client, message, args) => {
        message.delete().catch(O_o => {});

        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send('⛔No tienes permiso para usar este comando⛔').then(m => m.delete({timeout: 5000}));
        
        if (args.length < 1) {
            const embed = new Discord.MessageEmbed()
                .setTitle("FORTNITE CHAMPION SERIES WARMUP")
                .setURL("https://fortnitetracker.com/events/epicgames_S14_FNCS_Warmup_EU_PC")
                .setColor('RANDOM')
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .addField("**PAUSED CUSTOMS:**", `:flag_gb: | **Due to the next event, we delay customs. We wish you good luck** :call_me:\n\n:flag_ea: | **Debido al proximo evento, atrasamos las customs. Os deseamos mucha suerte** :call_me: `, true)
                .setImage(`https://i.imgur.com/UjwPRif.png`)
            message.channel.send('<@&614777211555414017>', embed);
        }
    }
}