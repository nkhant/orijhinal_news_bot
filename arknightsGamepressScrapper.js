const rp = require('request-promise');
const $ = require('cheerio');
const arknightsParse = require('./arknightsGamepressParse');
const url = 'https://gamepress.gg/arknights/database/operators';

const sqlite3 = require('sqlite3').verbose();

let dbArknights = new sqlite3.Database('./db/arknights.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database for inserting.');
});

rp(url)
    .then(function (html) {
        //success!
        //console.log($('td > div > a', html).length);
        //console.log($('td > div > a', html));
        //const urlElems = $('div.operator-icon').length
        //console.log(urlElems)
        //const opLink = [];
        //$('.operator-icon > a', html).each(function (i, elem) {
        //    opLink[i] = $(this).text();
        //});
        //console.log(opLink);
        const operatorUrls = [];
        for (let i = 0; i < 2; i++) {
            console.log($('.operator-icon > a', html)[i].attribs.href);
            operatorUrls.push($('.operator-icon > a', html)[i].attribs.href)
        }
        return Promise.all(
            operatorUrls.map(function (url) {
                //console.log("entering parsing");
                return arknightsParse('https://gamepress.gg' + url);
            })
        );
    })
    .then(function (operators) {
        for (let i = 0; i < operators.length; i++) {
            console.log(operators[i].name);
        //console.log("inserting");

            //columns
            dbArknights.run('INSERT INTO operators(\
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
            buildingTwoBuffDescription \
            ) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    operators[i].name,
                    operators[i].rarity,
                    operators[i].profession,
                    operators[i].rangeType,
                    operators[i].damageType,
                    operators[i].tag,
                    operators[i].trait,
                    operators[i].talentOneName,
                    operators[i].talentOneDescription,
                    operators[i].talentTwoName,
                    operators[i].talentTwoDescription,
                    operators[i].hp,
                    operators[i].atk,
                    operators[i].def,
                    operators[i].skillOneName,
                    operators[i].skillOneSPCost,
                    operators[i].skillOneInitialCost,
                    operators[i].skillOneSPChargeType,
                    operators[i].skillOneActiviation,
                    operators[i].skillOneDuration,
                    operators[i].skillOneEffect,
                    operators[i].skillTwoName,
                    operators[i].skillTwoSPCost,
                    operators[i].skillTwoInitialCost,
                    operators[i].skillTwoSPChargeType,
                    operators[i].skillTwoActiviation,
                    operators[i].skillTwoDuration,
                    operators[i].skillTwoEffect,
                    operators[i].buildingOneBuffName,
                    operators[i].buildingOneBuffDescription,
                    operators[i].buildingTwoBuffName,
                    operators[i].buildingTwoBuffDescription],
                function (err) {
                    if (err) {
                        return console.log(err.message);
                        console.log(operators[i].name)
                    }
                    // get the last insert id
                   console.log('A row has been inserted ');
            });
        //var i = 1;
        //dbArknights.run('INSERT INTO operators(name) VALUES(?)', [operators[i].name]);
        
        console.log("done inserting");
       }
    })
    .catch(function (err) {
        //handle error
    });