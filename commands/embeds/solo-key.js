const Discord = require('discord.js');

module.exports = {
    name: 'solo',
    category: 'embeds',
    description: 'ESP repite lo que le dices / añadiendo embed podras escribir un embed.',
    usage: `solo`,
    run: async (client, message, args) => {
        message.delete().catch(O_o => {});
        if(message.member.hasPermission('MANAGE_MESSAGES')){
            const channel = message.guild.channels.cache.find(ch => ch.name === 'solo-key');
            if (!channel)
                return message.channel.send('No puedo encontrar ese canal. Cree un canal llamado solo-key.').then(m => m.delete({timeout: 5000}));
            
            if (args.length < 1)
                return message.channel.send('Debes especificar el codigo de la custom').then(m => m.delete({timeout: 5000}));
                const embed = new Discord.MessageEmbed()
                    .setTitle("Solo Arena Custom")
                    .setColor(process.env.COLOREMBED)
                    .setThumbnail("https://cdn.discordapp.com/attachments/689769447602520067/754892886306193488/Moving_Zonev2.gif")
                    .addField("**CUSTOM KEY:**", args.join(' '), true)
                    .addField("**MODO DE JUEGO**", `ARENA SOLO`, true)
                    .addField("**NORMAS:**", `
                    **1** · Si se puede pelear spot
                    **2** · Se puede pelear cuando cierre 2ª zona
                    **3** · No teaming.
                    **4** · No puedes posicionarte encima de una torre ya construida por un jugador antes de que se cierre la zona establecida.
                    **5** · Si salta el Storm Surge puede matar donde sea necesario.
                    **6** · NO se puede robar loot.`, false)
                message.guild.channels.cache.find(ch => ch.name === 'solo-key').send('<@&614777211555414017>', embed);
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.COLORPERMISSIONS)
                .setTitle(`⛔ **No tienes permiso para usar este comando** ⛔`)
        message.channel.send(embed).then(m => m.delete({timeout: 5000}))
        }
    }
}