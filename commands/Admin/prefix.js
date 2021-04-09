const Discord = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
    name: 'prefix',
    category: 'admin',
    description: 'Establece el prefijo para este servidor.',
    usage: `prefix <newPrefix>`,
    run: async (discordclient, message, args) => {
        message.delete();

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send('⛔**No tienes permiso para usar este comando.**⛔').then(m => m.delete({timeout: 10000}));
        };

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send('¡Este servidor no estaba en nuestra base de datos! Lo hemos agregado, vuelva a escribir este comando.').then(m => m.delete({timeout: 10000}));
            }
        });

        if (args.length < 1) {
            return message.channel.send(`¡Debe especificar un prefijo para establecer para este servidor! Su prefijo de servidor actual es \`${settings.prefix}\``).then(m => m.delete({timeout: 10000}));
        };

        await settings.updateOne({
            prefix: args[0]
        });

        return message.channel.send(`Su prefijo de servidor se ha actualizado a \`${args[0]}\``);
    }
}