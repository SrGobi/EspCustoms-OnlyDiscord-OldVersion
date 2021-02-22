const Discord = require('discord.js');

module.exports = {
    name: 'ayuda',
    category: 'info',
    description: 'Muestra todos los comandos de embed existentes.',
    usage: `ayuda`,
    run: (client, message, args) => {
        message.delete().catch(O_o => {});
        let gras = '``'

        if (!message.member.hasPermission('SEND_MESSAGES'))
            return message.channel.send('⛔**No tienes permiso para usar este comando.**⛔').then(m => m.delete({timeout: 5000}));
            
            const embed1 = new Discord.MessageEmbed()
	        .setAuthor("Commands","https://media4.giphy.com/media/PipPMHXiNIHJHMQ4ZT/giphy.gif")
            .setColor('RANDOM')
            .addField(`${gras}!solo${gras}`, "Crea un canal llamado solo-key para introducir tus customs")
            .addField(`${gras}!trio${gras}`, "Crea un canal llamado trio-key para introducir tus customs")
            .addField(`${gras}!version${gras}`, "Comprueba la version del bot, ya que puede añadir nuevas versiones")
            .addField(`${gras}!dm <message>${gras}`, "Envia una mensaje para todos los integrantes del servidor")
            .addField(`${gras}!limpiar <numero>${gras}`, "Borra el numero de mensages que necesites")
            .addField(`${gras}!txt <message>${gras}`, "Escribe un embed avanzado")
            .addField(`${gras}!data <message>${gras}`, "Escribe un embed basico")
            .addField(`${gras}!st <numero>${gras}`, "Embed inicio de partida")
            .addField(`${gras}!cp${gras}`, "Embed cancelar partida")
            .addField(`${gras}!react <message>${gras}`, "Reaccion basica (añadir reaccion custom)")
	        .setFooter(" ESP CUSTOMS | Page 1/2", "https://i.imgur.com/XbgZXYQ.png")

	        const embed2 = new Discord.MessageEmbed()
	        .setAuthor("Commandos2","https://media3.giphy.com/media/oYT490RpTJDK4YlMXZ/giphy.gif")
            .setColor('RANDOM')
            .addField(`${gras}!encuesta <message>${gras}`, "Escribe una encuesta 👍 : 👎")
            .addField(`${gras}!reaction <message>${gras}`, "Embed avanzado con reaccion")
	        .addField(`${gras}!1/9 <message>${gras}`, "Embed con reaccion numerica del 1/9")
            .addField(`${gras}!pay${gras}`, "Ingreso monetario para nuestras waggers")
	        .addField(`${gras}!vs${gras}`, "In progress...")
	        .addField(`${gras}!wagger${gras}`, "In progress...")
	        .addField(`${gras}!6${gras}`, "In progress...")
	        .setFooter(" ESP CUSTOMS | Page 2/2", "https://i.imgur.com/XbgZXYQ.png")

	        message.channel.send(embed1).then(async msg => {
                msg.react('⬅️')
                await msg.react('➡️')
		        const filter = (reaction, user) => {
                return reaction.emoji.name === '➡️' && user.id === message.author.id
                }
	        const collector = msg.createReactionCollector(filter)
	        collector.on('collect', (reaction, author) => {
		        if (reaction.emoji.name === '➡️' && message.author.id) {
                    msg.edit(embed2).then(async msg => {
                        await msg.react('⬅️')
                        const filter = (reaction, user) => {
                        return reaction.emoji.name === '⬅️' && user.id === message.author.id
                        }
                    const collector = msg.createReactionCollector(filter)
                    collector.on('collect', (reaction, author) => {
                        if (reaction.emoji.name === '⬅️' && message.author.id) {
                            msg.edit(embed1)
                        }
                    });
                }) 
            }
        });
	    });
    }
};