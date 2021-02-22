const Discord = require('discord.js');

module.exports = {
    name: 'invites',
    category: 'info',
    description: 'Te permite ver las invitaciones realizadas.',
    usage: `invites`,
    run: (client, message, args) => {
        message.delete().catch(O_o => {});
        let gras = '**';
        if (!message.member.hasPermission('SEND_MESSAGES'))
            return message.channel.send('⛔**No tienes permiso para usar este comando.**⛔').then(m => m.delete({timeout: 5000}));
        
        if (args.length < 1) {
            var user = message.author;
            message.guild.fetchInvites()
            .then
            (invites =>{
                const userInvites = invites.array().filter(o => o.inviter.id === user.id);
                var userInviteCount = 0;
                for(var i=0; i < userInvites.length; i++){
                    var invite = userInvites[i];
                    userInviteCount += invite['uses'];
                }
            message.reply(`has invitado ha ${gras}${userInviteCount}${gras} personas`);
            })
        }
    }
}
