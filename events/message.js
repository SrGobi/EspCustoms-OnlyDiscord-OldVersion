const Guild = require('../models/guild');
const mongoose = require('mongoose');
const db = require('quick.db');

module.exports = async (discordclient, message) => {
    if (message.author.bot) return;
    const settings = await Guild.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if (err) console.error(err)
        if (!guild) {
            const newGuild = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: process.env.PREFIX,
                logChannelID: null,
                rankcard: "https://cdn.discordapp.com/attachments/689769447602520067/802287864867323914/Rank-EspCutoms.png"
            })
            newGuild.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));
            return message.channel.send('¡Este servidor no estaba en nuestra base de datos! Ahora hemos agregado y debería poder usar los comandos de bot.').then(m => m.delete({timeout: 10000}));
        }
    });
    const xp = require('../events/xp.js')
    if (!message.guild) return;
    xp(message)

    const prefix = settings.prefix;

    // si la gente nos menciona, cuéntales sobre nuestro prefijo
	if(message.mentions.users.size){
		if(message.mentions.users.first().id == discordclient.user.id){
			return message.reply(`Mi prefijo es \`\`${prefix}\`\``)
		}
    }

    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember (message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command.length === 0) return;

    let commandFile = discordclient.commands.get(command);
    if (!commandFile) commandFile = discordclient.commands.get(discordclient.aliases.get(command));
    if (commandFile){
        commandFile.run(discordclient, message, args);
    }

    let customCommands = db.get(`guildConfigurations_${message.guild.id}.commands`)
    if (customCommands) {
        let customCommandsName = customCommands.find(x => x.name === command)
        if (customCommandsName) return message.channel.send(customCommandsName.response)
    }
};