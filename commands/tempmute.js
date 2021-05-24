const Discord = require('discord.js');

module.exports.run = async (Client, message, args) => {

    
    let mention = message.mentions.members.first();
    if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return message.reply("Vous n'avez pas la permission d\'exécuter cette commande")
    if(message.member.hasPermission("ADMINISTRATOR"))
  

    

    if(mention == undefined){
        message.reply("Membre non ou mal mentionné")
    }

    else if(message.author == message.mentions.users.first()) {
        message.channel.send("Tu ne peux pas te mute toi-même !")
     
    }

    else {
        let arguments = message.content.split(" ");

        if(arguments[2] == undefined) return message.reply("Vous n'avez pas définis de temps") 
        

        mention.roles.add("821116077198147626");
        setTimeout(function() {
            mention.roles.remove("821116077198147626");
            message.channel.send("<@" + mention.id + "> tu peux désormais parler de nouveau !");

        }, arguments[2] * 1000);

        if(arguments == undefined) return message.reply("vous n'avez pas définis de temps")
        message.channel.send("<@" + mention.id + "> est mute pour " + arguments[2] + " second(s)");
    }
    
}
module.exports.config = {
    name: "tempmute"
}