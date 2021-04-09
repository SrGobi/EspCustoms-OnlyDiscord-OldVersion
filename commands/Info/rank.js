const db = require('quick.db')
const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');
const Guild = require('../../models/guild');

module.exports = {
    name: 'rank',
    category: 'Info',
    description: 'Verifique su rango o el de otra persona',
    usage: 'rank <@mention>',
    aliases: ['ranking'],
    run: async(discordclient, message, args) => {
        await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX,
                    rankcard: null
                });
                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            }
        });
        return getRank(discordclient, message);
    }
}
async function getRank(discordclient, message) {
    const guildDB = await Guild.findOne({
        guildID: message.guild.id
    });
    const member = message.author;
    var level = db.get(`guild_${message.guild.id}_level_${member.id}`) || 0
    let xp = db.get(`guild_${message.guild.id}_xp_${member.id}`) || 0
    var xpNeeded = level * 500 + 500
    let every = db
        .all()
        .filter(i => i.ID.startsWith(`guild_${message.guild.id}_xptotal_`))
        .sort((a, b) => b.data - a.data)
    var rank = every.map(x => x.ID).indexOf(`guild_${message.guild.id}_xptotal_${member.id}`) + 1
    const image = new canvacord.Rank()
        .setUsername(member.username)
        .setDiscriminator(member.discriminator)
        .setStatus(member.presence.status)
        .setCurrentXP(xp)
        .setRequiredXP(xpNeeded)
        .setRank(rank)
        .setLevel(level)
        .setBackground("IMAGE", guildDB.rankcard)
        .setAvatar(member.displayAvatarURL({ dynamic: false, format: 'png' }))
        .setRankColor('WHITE')
    image.build().then(data => {
        const img = new MessageAttachment(data, 'Rank-EspCutoms.png')
        return message.channel.send(img)
    })
}