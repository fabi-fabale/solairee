const Discord = require('discord.js');

module.exports.run = async (Client, message, args) => {

    
    const EmbedVerif = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Mon prefix est : `l!`')
    .setAuthor('Lunaire・🌙', 'https://cdn.discordapp.com/icons/819978308816339014/a_bc92c6b9cea9c98a32a733dce5fd5694.gif', 'https://discord.com/invite/vYNUF6gkmx')
    .setDescription('⬇️__Voici mes différentes commandes :__⬇️')
    .addField('🚔__Modération :__', '**`l!clear` = supression du nombre de messages**\n**`l!ban` = banissement d\'un membres**\n**`l!kick` = exclusion d\'un membres**\n**`l!mute` = mute un membre**\n**`l!unmute` = unmute un membre**\n **`l!tempmute` = mute un membre temporairement**', true)
    .setImage('')
    .setTimestamp()
    .setFooter('Lunaire・🌙', 'https://cdn.discordapp.com/icons/819978308816339014/a_bc92c6b9cea9c98a32a733dce5fd5694.gif');


    message.channel.send(EmbedVerif);
    
    
}
module.exports.config = {
    name: "help"
}