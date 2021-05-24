const Discord = require("discord.js");
const config = require('./config.json');
const bdd = require("./bdd.json");
const fs = require("fs");


const Client = new Discord.Client;
const prefix = "s!";


Client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")

    if(jsfile.lenght <= 0) {
        return console.log("Impossible de trouver des commandes");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);

        Client.commands.set(pull.config.name, pull);
    });

});



Client.on("ready" , () =>{
    console.log("bot opérationnel");
      //chargé un msg                                   //serveur                                                           //channel                            //message
    /* Client.guilds.cache.find(guild => guild.id === "819997010789924896").channels.cache.find(channel => channel.id === "820377502568546344").messages.fetch("821089688668340284").then(message => {
        console.log("message ajouté a la memoire : " + message.content);
    }).catch(err => {
        console.log("impossible d'ajouté le mésage a la mémoire: " + err);
    });*/

    const channel = Client.channels.cache.get("846420909781942342");
    if (!channel) return console.error("The channel does not exist!");
    

    var interval = setInterval (function () {
        // use the message's channel (TextChannel) to send a new message
        channel.join().then(connection => {
            // Yay, it worked!
           
          }).catch(e => {
    
            // Oh no, it errored! Let's log it to console :)
            console.error(e)})
        .catch(console.error); // add error handling here
    }, 1 * 1000); 

    
    
});


Client.on("ready", () => {
 Client.user.setActivity('s!help')


});

/*Client.on("guildMemberAdd" , member => {
    console.log("un membre est arrivée");                       //id channel
    member.guild.channels.cache.find(channel => channel.id === "819997011242778676").send(member.displayName + " est arrivée !\nNous sommes désormais **" + member.guild.memberCount + "** sur le serveur !😃");
    member.roles.add("820041836831834122").then(mbr => {
        console.log("Rôle attribué avec succées pour " + mbr.displayName);
    }).catch(() => {
        console.log("Le rôle n'a pas pu etre attribué");
    });

});*/

/*Client.on("guildMemberRemove" , member => {
    console.log("un membre a quittée");                        // id channel
    member.guild.channels.cache.find(channel => channel.id === "819997011242778676").send(member.displayName + " a quitée !😭\nNous sommes désormais **" + member.guild.memberCount + "** sur le serveur !😃");
});*/


Client.on("messageReactionAdd" , (reaction, user) => {
    if(user.bot) return;

    console.log("réaction ajouté par " + user.username + "\nNom de l'emoji " + reaction.emoji.name + "c'est la " + reaction.count + "e reaction");


    if(reaction.message.id === "821089688668340284"){
        if(reaction.emoji.name === "✅"){
            var memberv =  reaction.message.guild.members.cache.find(member => member.id === user.id);
             member.roles.add("820041836831834122").then(mbr => {
                console.log("Rôle attribué avec succées pour " + mbr.displayName);
            }).catch(err => {
                console.log("Le rôle n'a pas pu etre attribué" + err);
            });

        };
    };

   /* if(reaction.users.remove(user.id).then(react => {
        console.log("reaction" + react.emoji.name + "retiré par le bot");
    }).catch(err => {
        console.log("impossible de retirer la réaction: " + err);
     });

     reaction.remove().then(react => {
        console.log("reaction" + react.emoji.name + "retiré par le bot");
    }).catch(err => {
        console.log("impossible de retirer la réaction: " + err);
    });*/
 
});

Client.on("messageReactionRemove" , (reaction, user) => {
    if(user.bot) return;
    console.log("reation retiré");

                                //messafe id
    if(reaction.message.id === "821089688668340284"){
        if(reaction.emoji.name === "✅"){
            var member =  reaction.message.guild.members.cache.find(member => member.id === user.id);
             member.roles.remove("820041836831834122").then(mbr => {
                console.log("Rôle reyiré avec succés " + mbr.displayName);
            }).catch(err => {
                console.log("Le rôle n'a pas pu etre retiré" + err);
            });

        };
    };

});

Client.on("message", message => {


    if(message.content.startsWith(prefix + "test")){
        message.reply("c bon poto")
    }


    if(message.content.startsWith(prefix + "warn")){
       if(message.author.bot) return;


      if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return message.reply("Vous n'avez pas la permission d\'exécuter cette commnde");

      if(message.member.hasPermission("ADMINISTRATOR")){



        if(message.author == message.mentions.users.first()) {
            message.channel.send("Tu ne peux pas te warn toi-même !")
         return};


        if(!message.mentions.users.first()) {
            message.reply("Membre non ou mal mentionné")
            return};
        utilisateur = message.mentions.users.first().id

        if(bdd["warn"][utilisateur] == 100){
            //mute
        }
        else{
            if(!bdd["warn"][utilisateur]){
               bdd["warn"][utilisateur] = 1
               Savebdd();
               message.channel.send("<@" + message.mentions.users.first() + "> est a présent a " +  bdd["warn"][utilisateur] + " avertissement(s)" );
            }
            else{
                bdd["warn"][utilisateur]++
                Savebdd();
                message.channel.send("<@" + message.mentions.users.first() + "> est a présent a " +  bdd["warn"][utilisateur] + " avertissements" );
            }
        }
    }

   }
   if(message.content.startsWith(prefix + "unwarn")){
   if(message.author.bot) return;


   if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return message.reply("Vous n'avez pas la permission d\'exécuter cette commnde");

   if(message.member.hasPermission("ADMINISTRATOR")){



       if(message.author == message.mentions.users.first()) {
           message.channel.send("Tu ne peux pas te unwarn toi-même !")
        return};


       if(!message.mentions.users.first()) {
           message.reply("Membre non ou mal mentionné")
           return};
       utilisateur = message.mentions.users.first().id



           if(!bdd["warn"][utilisateur]){

              message.channel.send("<@" + message.mentions.users.first() + "> a actuelement 0 warn" );
           }
           else{
              if(bdd["warn"][utilisateur] == 1){
              delete bdd["warn"][utilisateur]
              Savebdd();
               message.channel.send("<@" + message.mentions.users.first() + "> est a présent a 0 avertissements" );
              }
            else {
                if(bdd["warn"][utilisateur] > 1){
                   bdd["warn"][utilisateur]--
                   Savebdd();
                   message.channel.send("<@" + message.mentions.users.first() + "> est a présent a " +  bdd["warn"][utilisateur] + " avertissement(s)" );

                }
               }

           }

    }
 }












  /* message.react("😭");
   message.react("😀"); */
    //!ping


    if(message.content == prefix + "stat"){
        message.channel.send(message.author.username + " qui a pour identifient : " + message.author.id + " a posté un message")
    }


      //commande clear
    
        if(message.content.startsWith(prefix + "clear")){
            message.delete()
            let arguments = message.content.split(" ");

            if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) return message.reply("Vous n'avez pas la permission d\'exécuter cette commande");
            if(message.member.permissions.has("MANAGE_MESSAGES")){
            
            if(arguments[1] == undefined){
                message.reply("Nombre de message non ou mal défini. ");
            }
            else {
                let number = parseInt(arguments[1]);

                if(isNaN(number)){
                    message.reply("Nombre de message non ou mal défini.")
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Suppresion de " + messages.size + " messages réussi");
                    }).catch(err => {
                        console.log("Erreur de clear : " + err);
                    });
                }
            }
        }
    }




      //serveur stat
    if(message.content.startsWith(prefix + "server-stat")){
        let onlines = message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size;
        let totalmembers = message.guild.members.cache.size;
       /* let totalservers = bot.guilds.cache.size;*/
        let totalbots  = message.guild.members.cache.filter(member => member.user.bot).size;
       /* let totalrole = message.guild.roles.cache.get('id role').member.map(member => member.user.tag).length
       let membresonlines = onlines - totalbots*/

       const EmbedStat = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Statistiques du serveur')
	    /*.setURL('https://discord.js.org/')*/
	    .setAuthor('Lunaire・🌙', /*'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org'*/)
	    .setDescription('Voici les statistiques du serveur')
	   /* .setThumbnail('https://i.imgur.com/wSTFkRM.png')*/
    	.addFields(
		{ name: 'Nombres de membres total : ', value: totalmembers, inline: true },
		{ name: 'Nombres de membres connectés : ', value: onlines, inline: true },
        { name: 'Nombres total de bot : ', value: totalbots, inline: true },
	    )

	    .setTimestamp()
	    .setFooter('Crée par 𝔽𝕒𝕓𝕚  [LƲƝЯ] ',/* 'https://i.imgur.com/wSTFkRM.png');*/)

        message.channel.send(EmbedStat);


    }



     
   if(message.content.startsWith(prefix + "role")){
        if(message.member.permissions.has('ADMINISTRATOR')){


        const EmbedVerif = new Discord.MessageEmbed()
        .setColor('#fb6117')
        .setTitle('Info Roles')
        .setDescription('**__Pour obtenir vos rôles il vous faut:__**\n\n<@&846426436839669780> = 300 heures et  10000 messages\n\n<@&846426489640452158> = 250 heures et  9000 messages\n\n<@&846426491025752076> = 200 heures et 8000 messages\n\n<@&846426515804913694> = 135 heures et 5000 messages\n\n<@&846426524462481409> = 70 heures et 2500 messages\n\n<@&846426533547868160> = 10 heures et 500 messages \n\nMerci de faire la commande `s?u` dans le salon <#846430881080934430>')
        .setThumbnail('')
        .setImage('https://media.giphy.com/media/2nUnDhdX4CLjW/giphy.gif')
        .setFooter('');


        message.channel.send(EmbedVerif);
        }
    }

    if(message.content.startsWith(prefix + "say")) {

        
        let permbot = message.guild.roles.cache.find(role => role.name === "permbot");

        if(!message.member.roles.cache.has(permbot.id)) return message.reply("Tu n'as pas la permissions d'utiliser cette commande !");

              console.log(message.author);
              message.delete()
              let args = message.content.substring(5);

            if(args.includes("everyone") || args.includes("here")) return console.log(message.author) || message.reply("Tu ne doit pas inclure les mots everyone et here !");

            message.channel.send(args)




    }

    if(message.content.startsWith(prefix + "derank")){
    let mention = message.mentions.members.first();
    if(message.author != 286979053347405834)message.reply("ptdr t qui ? tu n'es pas <@286979053347405834> 🧐");

    if(message.author == 286979053347405834 ){
        
        mention.roles.remove("825685282590031892");
        message.reply(mention.displayName + " a été derank avec succès");

    }

    }
    if(message.content.startsWith(prefix + "uprank")){
        let mention = message.mentions.members.first();
        if(message.author != 286979053347405834)message.reply("ptdr t qui ? tu n'es pas <@286979053347405834> 🧐");
    
        if(message.author == 286979053347405834 ){
            mention.roles.add("825685282590031892");
            message.reply(mention.displayName + " a été uprank avec succès");
    
        }
    }

    if (message.mentions.has(Client.user.id)) {
        message.channel.send("Mon prefix est `s!`");
    };

   /* if(message.content.startsWith(prefix + "suppr")){
        let bote = message.guild.roles.cache.find(role => role.name === "𝙁𝙪𝙘𝙠𝙚𝙙 𝘽𝙮 !           𝙏𝙤𝙠𝙮𝙤");
        bote.delete();
        console.log("test");
    }*/

}); 

Client.on("message", async message => {



    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    let prefix = "s!";
    let messagearray = message.content.split(" ")
    let cmd = messagearray[0];
    let args = message.content.trim().split(/ +/g)

    if(!message.content.startsWith(prefix)) return;
    let commandfile = Client.commands.get(cmd.slice(prefix.length))
    if(commandfile) commandfile.run(Client, message, args);

});



function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if(err) message.channel.send("Une erreur est survenue. ");
    });
}






//token bot
Client.login(config.token);
