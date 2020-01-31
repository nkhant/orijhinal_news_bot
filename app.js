const sqlite3 = require('sqlite3').verbose();

const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = "4";

let dbArknights = new sqlite3.Database('./db/arknights.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

//dbArknights.run('CREATE TABLE operators(ID text, Name text, Profession text, HP text, ATK text, Def text, Rarity text, Target text, DamageType text)');

//dbArknights.run(`INSERT INTO operators(ID, Name, Profession, HP, ATK, Def, Rarity, Target, DamageType ) VALUES("172","SilverAsh", "Guard", "2560", "713", "397", "6","1","Physical Damage")`, function (err) {
//    if (err) {
//        return console.log(err.message);
//    }
//    // get the last insert id
//    console.log(`A row has been inserted `);
//});


bot.on('message', message => {
    //var command = message.substring(1).split(" ");
    //var commandInitalizer = command.substring(0, 1);
    if (message.author.bot) return;
    if (message.content.substring(0, 1) != prefix) return;
    
    var commandArguments = message.content.substring(1).split(" ");

    //message.reply('pong');

    
    switch (commandArguments[0]) {
        case 'help':
            message.channel.send('Current command 4operator [name or id]');
            break;
        //ARKNIGHTS COMMANDS
        case 'operator':
            if (commandArguments.length == 1) {
                message.channel.send("Operator Name or ID Please");
                //return;
            } else {
                dbArknights.get('SELECT \
                id, \
                name, \
                rarity, \
                profession, \
                rangeType, \
                damageType, \
                tag, \
                trait, \
                talentOneName, \
                talentOneDescription, \
                talentTwoName, \
                talentTwoDescription, \
                hp, \
                atk, \
                def, \
                skillOneName, \
                skillOneSPCost, \
                skillOneInitialCost, \
                skillOneSPChargeType, \
                skillOneActiviation, \
                skillOneDuration, \
                skillOneEffect, \
                skillTwoName, \
                skillTwoSPCost, \
                skillTwoInitialCost, \
                skillTwoSPChargeType, \
                skillTwoActiviation, \
                skillTwoDuration, \
                skillTwoEffect, \
                buildingOneBuffName, \
                buildingOneBuffDescription, \
                buildingTwoBuffName, \
                buildingTwoBuffDescription\
                FROM operators WHERE Name =? COLLATE NOCASE OR ID =? COLLATE NOCASE', commandArguments[1], commandArguments[1], function (err, operatorInfo) {
                    if (typeof operatorInfo == 'undefined') {
                        message.channel.send('Operator not in Database');
                    } else {
                        const embed = new Discord.RichEmbed()
                            .setTitle(operatorInfo.name)
                            .setDescription(operatorInfo.rarity + " " + operatorInfo.profession)
                            .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
                            .addField('HP', operatorInfo.hp, true)
                            .addField('ATK', operatorInfo.atk, true)
                            .addField('DEF', operatorInfo.def, true)
                            //.addField('Target', operatorInfo.Target, true)
                            //.addField('Damage Type', operatorInfo.DamageType, true)
                            //.addField('ID', operatorInfo.ID, true)

                        message.channel.send(embed);
                    }
                })
                    


                //message.channel.send(commandArguments);
            }
    }
});

bot.login('');
