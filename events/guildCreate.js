const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports = async (discordclient, guild) => {
    guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: message.guild.id,
        guildName: message.guild.name,
        prefix: process.env.PREFIX,
        logChannelID: null,
        rankcard: "https://cdn.discordapp.com/attachments/689769447602520067/802287864867323914/Rank-EspCutoms.png"
    });

    guild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));

    console.log('[DISCORD]', `Me he unido a un nuevo servidor!`);
};