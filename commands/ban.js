const Discord = require('discord.js');

module.exports.run = async (Client, message, args) => {


let mention = message.mentions.members.first();
            if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return message.reply("Vous n'avez pas la permission d\'exécuter cette commande");
            if(message.member.hasPermission("ADMINISTRATOR"))
           

         

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné")
            } 

            else if(message.author == message.mentions.users.first()) {
                message.channel.send("Tu ne peux pas te ban toi-même !")
             
            }


            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni avec succés");
                }
                else {
                    message.reply("Impossble de bannir ce membre");
                }
            }
        }
module.exports.config = {
     name: "ban"
}