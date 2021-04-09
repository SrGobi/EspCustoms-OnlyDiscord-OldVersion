const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports = async (discordclient, guild) => {
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if(err) console.error(err)
        console.log('Me han eliminado de un servidor!');
    });
};