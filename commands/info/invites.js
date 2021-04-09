const Discord = require('discord.js');

module.exports = {
    name: 'invites',
    aliases: [iv],
    category: 'info',
    description: 'Te permite ver las invitaciones realizadas.',
    usage: `invites`,
    run: (client, message, args) => {
        message.delete().catch(O_o => {});
        
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
