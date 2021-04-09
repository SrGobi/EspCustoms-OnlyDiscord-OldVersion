const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    category: 'embeds',
    description: '',
    usage: `embed`,
    run: async (client, message, args) => {
        message.delete().catch(O_o => {});
        const input = args.toString();
        const regex = new RegExp('"[^"]+"|[\\S]+"[^"]+', 'g');
        const arguments = [];
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("No no no.");
        if(!args[0]){
            return message.reply(`Use: !embed "Title" "Desc" "tiempo"`);
        }else{

            input.match(regex).forEach(element => {
                if (!element) return;
                return arguments.push(element.replace(/"/g, '').replace(/,/g, ' '));
            });
        }


        const embed = new Discord.MessageEmbed()
        .setTitle(`${arguments[0]}`)
        .setDescription(`${arguments[1]}`)
        .setFooter(`Time :${arguments[arguments.length - 1]}`);

        message.channel.send(embed);
        message.reply(arguments);
        console.log(arguments);
        console.log(arguments[2]);
    }
}