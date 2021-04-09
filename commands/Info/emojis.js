const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'emojis',
    category: 'Info',
    description: 'Crea una lista de todos los emojis animados de tu servidor',
    aliases: ['ejs'],
    usage: `emojis`,
    run: (discordclient, message, args) => {
        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;
        function Emoji(id) {
            return discordclient.emojis.cache.get(id).toString();
        }
        message.guild.emojis.cache.forEach((emoji) => {
            OverallEmojis++;
            if (emoji.animated) {
                Animated++;
                EmojisAnimated += Emoji(emoji.id);
            } else {
                EmojiCount++;
                Emojis += Emoji(emoji.id);
            }
        });
        let Embed = new MessageEmbed()
        .setTitle(`Emojis en ${message.guild.name}.`)
        .setDescription(`**Animados [${Animated}]**:\n${EmojisAnimated}\n\n**`)
        .setColor(process.env.COLOR);
        message.channel.send(Embed);
    },
};