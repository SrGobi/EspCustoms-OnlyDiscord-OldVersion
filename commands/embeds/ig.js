const Discord = require('discord.js');

module.exports = {
    name: 'ig',
    category: 'embeds',
    description: 'Te permite ver el evento de fornite que proximamente bloqueara la custom.',
    usage: `ig`,
    run: async (client, message, args) => {
        message.delete().catch(O_o => {});

        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send('⛔No tienes permiso para usar este comando⛔').then(m => m.delete({timeout: 5000}));
        
        if (args.length < 1) {
            const embed = new Discord.MessageEmbed()
                .setTitle("teambld.eu")
                .setURL("https://www.instagram.com/p/CHBOjwTBXgn/")
                .setColor('#bc2a8d')
                .setThumbnail(client.user.displayAvatarURL())
                .addField("El nuevo BLD\n\n• Desde la directiva de BLD, estamos orgullosos de presentaros la nueva organización.\n\n• Presentamos el Roster que nos acompañará en las siguientes competiciones de #Fortnite")
                .addField(`VIDEO INSTAGRAM`,"https://www.instagram.com/p/CHBOjwTBXgn/")
                .setImage(`https://i.imgur.com/VWBDSnw.jpg`)
            message.channel.send(embed);
        }
    }
}