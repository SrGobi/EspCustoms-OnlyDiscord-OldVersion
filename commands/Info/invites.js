module.exports = {
    name: 'invites',
    category: 'Info',
    description: 'Te permite ver las invitaciones realizadas.',
    aliases: ['iv'],
    usage: `invites`,
    run: (discordclient, message, args) => {
        let gras = '**';
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