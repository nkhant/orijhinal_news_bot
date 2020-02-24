const puppeteer = require('puppeteer');
const rp = require('request-promise');
const $ = require('cheerio');

//const url = 'https://gamepress.gg/arknights/operator/silverash';


//Async Version-----------------------------------------------------------------------------

//const operatorparse = function (url) {
//    (async () => {
//        /* initiate the puppeteer browser */
//        const browser = await puppeteer.launch();
//        const page = await browser.newpage();
//        /* go to the imdb movie page and wait for it to load */
//        await page.goto(url);
//        const html = await page.content();
//        //var name = $('#page-title > h1', html).text();
//        //console.log(name);
//        /* run javascript inside of the page */
//        var rarity = 0;
//        var tags = [];
//        for (let i = 0; i < await $('.rarity-cell > img', html).length; i++) {
//            rarity++;
//        }
//        await $('.tag-title', html).each(function () {
//            tags.push($(this).text().trim());
//        });
//        var name = await $('#page-title > h1', html).text();
//        var profession = await $('.profession-title', html).text().trim();
//        var rangetype = await $('.position-cell > .information-cell > .text-content-cell', html).text().trim();
//        var damagetype = await $('.traits-cell > .information-cell > .text-content-cell', html).text().trim();
//        var trait = await $('.description-box', html).first().text().trim();
//        var talentonename = await $('.talent-cell', html).first().find('.talent-child > .talent-title-cell > a').last().text().trim();
//        var talentonedescription = await $('.talent-cell', html).first().find('.talent-child > .talent-description').last().text().trim();
//        var talenttwoname = await $('.talent-cell', html).last().find('.talent-child > .talent-title-cell > a').last().text().trim();
//        var talenttwodescription = await $('.talent-cell', html).last().find('.talent-child > .talent-description').last().text().trim();
//        var hp = await $('#stat-hp', html).text().trim();
//        var atk = await $('#stat-atk', html).text().trim();
//        var def = await $('#stat-def', html).text().trim();
//        var skillonename = await $('#skill-tab-1 > div > div > a', html).clone().children().remove().end().text().trim();
//        var skillonespcost = await $('#skill-tab-1 > .sp-cell > .sp-cost > .skill-upgrade-tab-10', html).text().trim();
//        var skilloneinitialcost = await $('#skill-tab-1 > .sp-cell > .initial-sp > .skill-upgrade-tab-10', html).text().trim();
//        var skillonespchargetype = await $('#skill-tab-1 > .skill-effect-parent > .sp-charge-type > .effect-description', html).text().trim();
//        var skilloneactiviation = await $('#skill-tab-1 >  .skill-effect-parent > .skill-activation > .effect-description > a', html).text().trim();
//        var skilloneduration = await $('#skill-tab-1 >  .skill-effect-parent > .skill-duration > .skill-upgrade-tab-10', html).text().trim();
//        var skilloneeffect = await $('#skill-tab-1 >  .skill-description > .skill-upgrade-tab-10', html).text().trim();
//        var skilltwoname = await $('#skill-tab-2 > div > div > a', html).clone().children().remove().end().text().trim();
//        var skilltwospcost = await $('#skill-tab-2 > .sp-cell > .sp-cost > .skill-upgrade-tab-10', html).text().trim();
//        var skilltwoinitialcost = await $('#skill-tab-2 > .sp-cell > .initial-sp > .skill-upgrade-tab-10', html).text().trim();
//        var skilltwospchargetype = await $('#skill-tab-2 > .skill-effect-parent > .sp-charge-type > .effect-description', html).text().trim();
//        var skilltwoactiviation = await $('#skill-tab-2 >  .skill-effect-parent > .skill-activation > .effect-description > a', html).text().trim();
//        var skilltwoduration = await $('#skill-tab-2 >  .skill-effect-parent > .skill-duration > .skill-upgrade-tab-10', html).text().trim();
//        var skilltwoeffect = await $('#skill-tab-2 >  .skill-description > .skill-upgrade-tab-10', html).text().trim();
//        var buildingonebuffname = await $('.building-buff-cell', html).first().find('.top-cell > .left-cell > .buff-title > .title-cell').text().trim();
//        var buildingonebuffdescription = await $('.building-buff-cell', html).first().find('.bottom-cell > .build-description-cell').text().trim();
//        var buildingtwobuffname = await $('.building-buff-cell', html).last().find('.top-cell > .left-cell > .buff-title > .title-cell').text().trim();
//        var buildingtwobuffdescription = await $('.building-buff-cell', html).last().find('.bottom-cell > .build-description-cell').text().trim();
//        console.log("closing browser");
//        //console.log(name);
//        await browser.close();
//        return {
//            name: name,
//            rarity: rarity,
//            profession: profession,
//            rangetype: rangetype,
//            damagetype: damagetype,
//            tag: tags,
//            trait: trait,
//            talentonename: talentonename,
//            talentonedescription: talentonedescription,
//            talenttwoname: talenttwoname,
//            talenttwodescription: talenttwodescription,
//            hp: hp,
//            atk: atk,
//            def: def,
//            skillonename: skillonename,
//            skillonespcost: skillonespcost,
//            skilloneinitialcost: skilloneinitialcost,
//            skillonespchargetype: skillonespchargetype,
//            skilloneactiviation: skilloneactiviation,
//            skilloneduration: skilloneduration,
//            skilloneeffect: skilloneeffect,
//            skilltwoname: skilltwoname,
//            skilltwospcost: skilltwospcost,
//            skilltwoinitialcost: skilltwoinitialcost,
//            skilltwospchargetype: skilltwospchargetype,
//            skilltwoactiviation: skilltwoactiviation,
//            skilltwoduration: skilltwoduration,
//            skilltwoeffect: skilltwoeffect,
//            buildingonebuffname: buildingonebuffname,
//            buildingonebuffdescription: buildingonebuffdescription,
//            buildingtwobuffname: buildingtwobuffname,
//            buildingtwobuffdescription: buildingtwobuffdescription,
//        };
//        /* outputting what we scraped */
//        //console.log(data);
       
//    })();
//}

//Working non Async Version -----------------------------------------------------------------------
const operatorParse = function (url) {
    return puppeteer
        .launch().then(function (browser) {
            return browser.newPage().then(function (page) {
                    return page.goto(url).then(function () {
                        //console.log("Entering: " + url);
                        return page.content().then(function (html) {
                            //console.log("beginning to retrieve");
                            var rarity = 0;
                            var tags = [];
                            for (let i = 0; i < $('.rarity-cell > img', html).length; i++) {
                                rarity++;
                            }
                            $('.tag-title', html).each(function () {
                                tags.push($(this).text().trim());
                            });
                            var name = $('#page-title > h1', html).text();
                            var profession = $('.profession-title', html).text().trim();
                            var rangeType = $('.position-cell > .information-cell > .text-content-cell', html).text().trim();
                            var damageType = $('.traits-cell > .information-cell > .text-content-cell', html).text().trim();
                            var trait = $('.description-box', html).first().text().trim();
                            var talentOneName = $('.talent-cell', html).first().find('.talent-child > .talent-title-cell > a').last().text().trim();
                            var talentOneDescription = $('.talent-cell', html).first().find('.talent-child > .talent-description').last().text().trim();
                            var talentTwoName =  $('.talent-cell', html).last().find('.talent-child > .talent-title-cell > a').last().text().trim();
                            var talentTwoDescription =  $('.talent-cell', html).last().find('.talent-child > .talent-description').last().text().trim();
                            var hp =  $('#stat-hp', html).text().trim();
                            var atk =  $('#stat-atk', html).text().trim();
                            var def =  $('#stat-def', html).text().trim();
                            var skillOneName =  $('#skill-tab-1 > div > div > a', html).clone().children().remove().end().text().trim();
                            var skillOneSPCost =  $('#skill-tab-1 > .sp-cell > .sp-cost > .skill-upgrade-tab-10', html).text().trim();
                            var skillOneInitialCost = $('#skill-tab-1 > .sp-cell > .initial-sp > .skill-upgrade-tab-10', html).text().trim();
                            var skillOneSPChargeType = $('#skill-tab-1 > .skill-effect-parent > .sp-charge-type > .effect-description', html).text().trim();
                            var skillOneActiviation = $('#skill-tab-1 >  .skill-effect-parent > .skill-activation > .effect-description > a', html).text().trim();
                            var skillOneDuration = $('#skill-tab-1 >  .skill-effect-parent > .skill-duration > .skill-upgrade-tab-10', html).text().trim();
                            var skillOneEffect = $('#skill-tab-1 >  .skill-description > .skill-upgrade-tab-10', html).text().trim();
                            var skillTwoName = $('#skill-tab-2 > div > div > a', html).clone().children().remove().end().text().trim();
                            var skillTwoSPCost = $('#skill-tab-2 > .sp-cell > .sp-cost > .skill-upgrade-tab-10', html).text().trim();
                            var skillTwoInitialCost = $('#skill-tab-2 > .sp-cell > .initial-sp > .skill-upgrade-tab-10', html).text().trim();
                            var skillTwoSPChargeType = $('#skill-tab-2 > .skill-effect-parent > .sp-charge-type > .effect-description', html).text().trim();
                            var skillTwoActiviation = $('#skill-tab-2 >  .skill-effect-parent > .skill-activation > .effect-description > a', html).text().trim();
                            var skillTwoDuration = $('#skill-tab-2 >  .skill-effect-parent > .skill-duration > .skill-upgrade-tab-10', html).text().trim();
                            var skillTwoEffect = $('#skill-tab-2 >  .skill-description > .skill-upgrade-tab-10', html).text().trim();
                            var buildingOneBuffName = $('.building-buff-cell', html).first().find('.top-cell > .left-cell > .buff-title > .title-cell').text().trim();
                            var buildingOneBuffDescription = $('.building-buff-cell', html).first().find('.bottom-cell > .build-description-cell').text().trim();
                            var buildingTwoBuffName = $('.building-buff-cell', html).last().find('.top-cell > .left-cell > .buff-title > .title-cell').text().trim();
                            var buildingTwoBuffDescription = $('.building-buff-cell', html).last().find('.bottom-cell > .build-description-cell').text().trim();
                            //page.close();
                            browser.close();
                            return {
                                name: name,
                                rarity: rarity,
                                profession: profession,
                                rangeType: rangeType,
                                damageType: damageType,
                                tag: tags,
                                trait: trait,
                                talentOneName: talentOneName,
                                talentOneDescription: talentOneDescription,
                                talentTwoName: talentTwoName,
                                talentTwoDescription: talentTwoDescription,
                                hp: hp,
                                atk: atk,
                                def: def,
                                skillOneName: skillOneName,
                                skillOneSPCost: skillOneSPCost,
                                skillOneInitialCost: skillOneInitialCost,
                                skillOneSPChargeType: skillOneSPChargeType,
                                skillOneActiviation: skillOneActiviation,
                                skillOneDuration: skillOneDuration,
                                skillOneEffect: skillOneEffect,
                                skillTwoName: skillTwoName,
                                skillTwoSPCost: skillTwoSPCost,
                                skillTwoInitialCost: skillTwoInitialCost,
                                skillTwoSPChargeType: skillTwoSPChargeType,
                                skillTwoActiviation: skillTwoActiviation,
                                skillTwoDuration: skillTwoDuration,
                                skillTwoEffect: skillTwoEffect,
                                buildingOneBuffName: buildingOneBuffName,
                                buildingOneBuffDescription: buildingOneBuffDescription,
                                buildingTwoBuffName: buildingTwoBuffName,
                                buildingTwoBuffDescription: buildingTwoBuffDescription,
                            };
                        })
                    })
                })                              
    })
    .catch (function (err) {
    //handle error
    });
}

//console.log(operatorParse(url));

//Outdated version async-------------------------------------
//const operatorParse = function (url) {
//puppeteer
//    .launch({ headless: false })
//    .then(function (browser) {
//        return browser.newPage();
//    })
//    .then(function (page) {
//        return page.goto(url).then(function () {
//            console.log("Entering: " + url);
//            return page.content();
//        });
//    })
//    .then(function (html) {
//        console.log("beginning to retrieve");
//        var rarity = 0;
//        var tags = [];
//        for (let i = 0; i < $('.rarity-cell > img', html).length; i++) {
//            rarity++;
//        }
//        $('.tag-title', html).each(function () {
//            tags.push($(this).text().trim());
//        });

//        var name = $('#page-title > h1', html).text();
//        var profession = $('.profession-title', html).text().trim();
//        var rangeType = $('.position-cell > .information-cell > .text-content-cell', html).text().trim();
//        var damageType = $('.traits-cell > .information-cell > .text-content-cell', html).text().trim();
//        var trait = $('.description-box', html).first().text().trim();
//        var talentOneName = $('.talent-cell', html).first().find('.talent-child > .talent-title-cell > a').last().text().trim();
//        var talentOneDescription = $('.talent-cell', html).first().find('.talent-child > .talent-description').last().text().trim();
//        var talentTwoName = $('.talent-cell', html).last().find('.talent-child > .talent-title-cell > a').last().text().trim();
//        var talentTwoDescription = $('.talent-cell', html).last().find('.talent-child > .talent-description').last().text().trim();
//        var hp = $('#stat-hp', html).text().trim();
//        var atk = $('#stat-atk', html).text().trim();
//        var def = $('#stat-def', html).text().trim();
//        var skillOneName = $('#skill-tab-1 > div > div > a', html).clone().children().remove().end().text().trim();
//        var skillOneSPCost = $('#skill-tab-1 > .sp-cell > .sp-cost > .skill-upgrade-tab-10', html).text().trim();
//        var skillOneInitialCost = $('#skill-tab-1 > .sp-cell > .initial-sp > .skill-upgrade-tab-10', html).text().trim();
//        var skillOneSPChargeType = $('#skill-tab-1 > .skill-effect-parent > .sp-charge-type > .effect-description', html).text().trim();
//        var skillOneActiviation = $('#skill-tab-1 >  .skill-effect-parent > .skill-activation > .effect-description > a', html).text().trim();
//        var skillOneDuration = $('#skill-tab-1 >  .skill-effect-parent > .skill-duration > .skill-upgrade-tab-10', html).text().trim();
//        var skillOneEffect = $('#skill-tab-1 >  .skill-description > .skill-upgrade-tab-10', html).text().trim();
//        var skillTwoName = $('#skill-tab-2 > div > div > a', html).clone().children().remove().end().text().trim();
//        var skillTwoSPCost = $('#skill-tab-2 > .sp-cell > .sp-cost > .skill-upgrade-tab-10', html).text().trim();
//        var skillTwoInitialCost = $('#skill-tab-2 > .sp-cell > .initial-sp > .skill-upgrade-tab-10', html).text().trim();
//        var skillTwoSPChargeType = $('#skill-tab-2 > .skill-effect-parent > .sp-charge-type > .effect-description', html).text().trim();
//        var skillTwoActiviation = $('#skill-tab-2 >  .skill-effect-parent > .skill-activation > .effect-description > a', html).text().trim();
//        var skillTwoDuration = $('#skill-tab-2 >  .skill-effect-parent > .skill-duration > .skill-upgrade-tab-10', html).text().trim();
//        var skillTwoEffect = $('#skill-tab-2 >  .skill-description > .skill-upgrade-tab-10', html).text().trim();
//        var buildingOneBuffName = $('.building-buff-cell', html).first().find('.top-cell > .left-cell > .buff-title > .title-cell').text().trim();
//        var buildingOneBuffDescription = $('.building-buff-cell', html).first().find('.bottom-cell > .build-description-cell').text().trim();
//        var buildingTwoBuffName = $('.building-buff-cell', html).last().find('.top-cell > .left-cell > .buff-title > .title-cell').text().trim();
//        var buildingTwoBuffDescription = $('.building-buff-cell', html).last().find('.bottom-cell > .build-description-cell').text().trim();
//        console.log("closing browser");
//        console.log(name);
//        //return {
//        //    name: name,
//        //    rarity: rarity,
//        //    profession: profession,
//        //    rangeType: rangeType,
//        //    damageType: damageType,
//        //    tag: tags,
//        //    trait: trait,
//        //    talentOneName: talentOneName,
//        //    talentOneDescription: talentOneDescription,
//        //    talentTwoName: talentTwoName,
//        //    talentTwoDescription: talentTwoDescription,
//        //    hp: hp,
//        //    atk: atk,
//        //    def: def,
//        //    skillOneName: skillOneName,
//        //    skillOneSPCost: skillOneSPCost,
//        //    skillOneInitialCost: skillOneInitialCost,
//        //    skillOneSPChargeType: skillOneSPChargeType,
//        //    skillOneActiviation: skillOneActiviation,
//        //    skillOneDuration: skillOneDuration,
//        //    skillOneEffect: skillOneEffect,
//        //    skillTwoName: skillTwoName,
//        //    skillTwoSPCost: skillTwoSPCost,
//        //    skillTwoInitialCost: skillTwoInitialCost,
//        //    skillTwoSPChargeType: skillTwoSPChargeType,
//        //    skillTwoActiviation: skillTwoActiviation,
//        //    skillTwoDuration: skillTwoDuration,
//        //    skillTwoEffect: skillTwoEffect,
//        //    buildingOneBuffName: buildingOneBuffName,
//        //    buildingOneBuffDescription: buildingOneBuffDescription,
//        //    buildingTwoBuffName: buildingTwoBuffName,
//        //    buildingTwoBuffDescription: buildingTwoBuffDescription,
//        //};

//        console.log('returned');
//        //browser.close();
//        //page.close();
//        // return browser.close();
//        page.close()
//    })
//    .then(function (browser) {
//        return browser.close();
//    })
//    .catch(function (err) {
//        //handle error
//    });



////const operatorParse = function (url) {
//    puppeteer
//        .launch()
//        .then(function (browser) {
//            return browser.newPage();
//        })
//        .then(function (page) {
//            return page.goto(url).then(function () {
//                console.log("Entering: " + url);

//                return page.content();
//            });
//        })
//        .then(function (html) {
//            console.log("beginning to retrieve");
//            var rarity = 0;
//            var tags = [];
//            for (let i = 0; i < $('.rarity-cell > img', html).length; i++) {
//                rarity++;
//            }
//            $('.tag-title', html).each(function () {
//                tags.push($(this).text().trim());
//            });

//            var name = $('#page-title > h1', html).text();
//            var profession = $('.profession-title', html).text().trim();
//            var rangeType = $('.position-cell > .information-cell > .text-content-cell', html).text().trim();
//            var damageType = $('.traits-cell > .information-cell > .text-content-cell', html).text().trim();
//            var trait = $('.description-box', html).first().text().trim();
//            var talentOneName = $('.talent-cell', html).first().find('.talent-child > .talent-title-cell > a').last().text().trim();
//            var talentOneDescription = $('.talent-cell', html).first().find('.talent-child > .talent-description').last().text().trim();
//            var talentTwoName =  $('.talent-cell', html).last().find('.talent-child > .talent-title-cell > a').last().text().trim();
//            var talentTwoDescription =  $('.talent-cell', html).last().find('.talent-child > .talent-description').last().text().trim();
//            var hp =  $('#stat-hp', html).text().trim();
//            var atk =  $('#stat-atk', html).text().trim();
//            var def =  $('#stat-def', html).text().trim();
//            var skillOneName =  $('#skill-tab-1 > div > div > a', html).clone().children().remove().end().text().trim();
//            var skillOneSPCost =  $('#skill-tab-1 > .sp-cell > .sp-cost > .skill-upgrade-tab-10', html).text().trim();
//            var skillOneInitialCost = $('#skill-tab-1 > .sp-cell > .initial-sp > .skill-upgrade-tab-10', html).text().trim();
//            var skillOneSPChargeType = $('#skill-tab-1 > .skill-effect-parent > .sp-charge-type > .effect-description', html).text().trim();
//            var skillOneActiviation = $('#skill-tab-1 >  .skill-effect-parent > .skill-activation > .effect-description > a', html).text().trim();
//            var skillOneDuration = $('#skill-tab-1 >  .skill-effect-parent > .skill-duration > .skill-upgrade-tab-10', html).text().trim();
//            var skillOneEffect = $('#skill-tab-1 >  .skill-description > .skill-upgrade-tab-10', html).text().trim();
//            var skillTwoName = $('#skill-tab-2 > div > div > a', html).clone().children().remove().end().text().trim();
//            var skillTwoSPCost = $('#skill-tab-2 > .sp-cell > .sp-cost > .skill-upgrade-tab-10', html).text().trim();
//            var skillTwoInitialCost = $('#skill-tab-2 > .sp-cell > .initial-sp > .skill-upgrade-tab-10', html).text().trim();
//            var skillTwoSPChargeType = $('#skill-tab-2 > .skill-effect-parent > .sp-charge-type > .effect-description', html).text().trim();
//            var skillTwoActiviation = $('#skill-tab-2 >  .skill-effect-parent > .skill-activation > .effect-description > a', html).text().trim();
//            var skillTwoDuration = $('#skill-tab-2 >  .skill-effect-parent > .skill-duration > .skill-upgrade-tab-10', html).text().trim();
//            var skillTwoEffect = $('#skill-tab-2 >  .skill-description > .skill-upgrade-tab-10', html).text().trim();
//            var buildingOneBuffName = $('.building-buff-cell', html).first().find('.top-cell > .left-cell > .buff-title > .title-cell').text().trim();
//            var buildingOneBuffDescription = $('.building-buff-cell', html).first().find('.bottom-cell > .build-description-cell').text().trim();
//            var buildingTwoBuffName = $('.building-buff-cell', html).last().find('.top-cell > .left-cell > .buff-title > .title-cell').text().trim();
//            var buildingTwoBuffDescription = $('.building-buff-cell', html).last().find('.bottom-cell > .build-description-cell').text().trim();
//            console.log("closing browser");
           
//            console.log(name);
//            return {
//                name: name,
//                rarity: rarity,
//                profession: profession,
//                rangeType: rangeType,
//                damageType: damageType,
//                tag: tags,
//                trait: trait,
//                talentOneName: talentOneName,
//                talentOneDescription: talentOneDescription,
//                talentTwoName: talentTwoName,
//                talentTwoDescription: talentTwoDescription,
//                hp: hp,
//                atk: atk,
//                def: def,
//                skillOneName: skillOneName,
//                skillOneSPCost: skillOneSPCost,
//                skillOneInitialCost: skillOneInitialCost,
//                skillOneSPChargeType: skillOneSPChargeType,
//                skillOneActiviation: skillOneActiviation,
//                skillOneDuration: skillOneDuration,
//                skillOneEffect: skillOneEffect,
//                skillTwoName: skillTwoName,
//                skillTwoSPCost: skillTwoSPCost,
//                skillTwoInitialCost: skillTwoInitialCost,
//                skillTwoSPChargeType: skillTwoSPChargeType,
//                skillTwoActiviation: skillTwoActiviation,
//                skillTwoDuration: skillTwoDuration,
//                skillTwoEffect: skillTwoEffect,
//                buildingOneBuffName: buildingOneBuffName,
//                buildingOneBuffDescription: buildingOneBuffDescription,
//                buildingTwoBuffName: buildingTwoBuffName,
//                buildingTwoBuffDescription: buildingTwoBuffDescription,
//            };

//            console.log('returned');
//            browser.close();
//        })
//        .catch(function (err) {
//            //handle error
//        });
   

//working rp version-------------------------------------------------------------------------------
//const operatorParse = function (url) {
//    return rp(url)
//        .then(function (html) {
//            var rarity = 0;
//            var tags = [];
//            for (let i = 0; i < $('.rarity-cell > img', html).length; i++) {
//                rarity++;
//            }
//            $('.tag-title', html).each(function () {
//                tags.push($(this).text().trim());
//            });
//            return {
//                name: $('#page-title > h1', html).text(),
//                rarity: rarity,
//                profession: $('.profession-title', html).text().trim(),
//                rangeType: $('.position-cell > .information-cell > .text-content-cell', html).text().trim(),
//                damageType: $('.traits-cell > .information-cell > .text-content-cell', html).text().trim(),
//                tag: tags,
//                trait: $('.description-box', html).first().text().trim(),
//                talentOneName: $('.talent-cell', html).first().find('.talent-child > .talent-title-cell > a').last().text().trim(),
//                talentOneDescription: $('.talent-cell', html).first().find('.talent-child > .talent-description').last().text().trim(),
//                talentTwoName: $('.talent-cell', html).last().find('.talent-child > .talent-title-cell > a').last().text().trim(),
//                talentTwoDescription: $('.talent-cell', html).last().find('.talent-child > .talent-description').last().text().trim(),
//                hp: $('#stat-hp', html).text().trim(),
//                atk: $('#stat-atk', html).text().trim(),
//                def: $('#stat-def', html).text().trim(),
//                skillOneName: $('#skill-tab-1 > div > div > a', html).clone().children().remove().end().text().trim(),
//                skillOneSPCost: $('#skill-tab-1 > .sp-cell > .sp-cost > .skill-upgrade-tab-10', html).text().trim(),
//                skillOneInitialCost: $('#skill-tab-1 > .sp-cell > .initial-sp > .skill-upgrade-tab-10', html).text().trim(),
//                skillOneSPChargeType: $('#skill-tab-1 > .skill-effect-parent > .sp-charge-type > .effect-description', html).text().trim(),
//                skillOneActiviation: $('#skill-tab-1 >  .skill-effect-parent > .skill-activation > .effect-description > a', html).text().trim(),
//                skillOneDuration: $('#skill-tab-1 >  .skill-effect-parent > .skill-duration > .skill-upgrade-tab-10', html).text().trim(),
//                skillOneEffect: $('#skill-tab-1 >  .skill-description > .skill-upgrade-tab-10', html).text().trim(),
//                skillTwoName: $('#skill-tab-2 > div > div > a', html).clone().children().remove().end().text().trim(),
//                skillTwoSPCost: $('#skill-tab-2 > .sp-cell > .sp-cost > .skill-upgrade-tab-10', html).text().trim(),
//                skillTwoInitialCost: $('#skill-tab-2 > .sp-cell > .initial-sp > .skill-upgrade-tab-10', html).text().trim(),
//                skillTwoSPChargeType: $('#skill-tab-2 > .skill-effect-parent > .sp-charge-type > .effect-description', html).text().trim(),
//                skillTwoActiviation: $('#skill-tab-2 >  .skill-effect-parent > .skill-activation > .effect-description > a', html).text().trim(),
//                skillTwoDuration: $('#skill-tab-2 >  .skill-effect-parent > .skill-duration > .skill-upgrade-tab-10', html).text().trim(),
//                skillTwoEffect: $('#skill-tab-2 >  .skill-description > .skill-upgrade-tab-10', html).text().trim(),
//                buildingOneBuffName: $('.building-buff-cell', html).first().find('.top-cell > .left-cell > .buff-title > .title-cell').text().trim(),
//                buildingOneBuffDescription: $('.building-buff-cell', html).first().find('.bottom-cell > .build-description-cell').text().trim(),
//                buildingTwoBuffName: $('.building-buff-cell', html).last().find('.top-cell > .left-cell > .buff-title > .title-cell').text().trim(),
//                buildingTwoBuffDescription: $('.building-buff-cell', html).last().find('.bottom-cell > .build-description-cell').text().trim(),

//            };
//        })
//        .catch(function (err) {
//            //handle error
//        });
//};

module.exports = operatorParse;

//test version (not dependant on a file)----------------------------------------------------
//rp(url)
//    .then(function (html) {
//        console.log($('#page-title > h1', html).text());
//        var rarity = 0;
//        for (let i = 0; i < $('.rarity-cell > img', html).length; i++) {
//            rarity++;
//        }
//        console.log(rarity);

//        console.log($('.profession-title', html).text());
//        //range type of melee  
//        console.log($('.position-cell > .information-cell > .text-content-cell', html).text());
//        //damage type
//        console.log($('.traits-cell > .information-cell > .text-content-cell', html).text());
//        //tags

//        // tag unit types like dps and support
//        console.log($('.tag-title > a', html).text());

//        //traits
//        console.log($('.description-box', html).first().text());

//        //talent 1
//        //console.log($('.talent-cell > .talent-child > .talent-title-cell > a', html).text());
//        console.log($('.talent-cell', html).first().find('.talent-child > .talent-title-cell > a').last().text());
//        console.log($('.talent-cell', html).first().find('.talent-child > .talent-description').last().text());

//        //talent 2
//        //console.log($('.talent-cell > .talent-child > .talent-title-cell > a', html).text());
//        console.log($('.talent-cell', html).last().find('.talent-child > .talent-title-cell > a').last().text());
//        console.log($('.talent-cell', html).last().find('.talent-child > .talent-description').last().text());

//        //hp
//        console.log($('#stat-hp', html).text());
//        //atk
//        console.log($('#stat-atk', html).text());
//        //def
//        console.log($('#stat-def', html).text());
//        //arts resist

//        //skill 1
//        console.log($('#skill-tab-1 > div > div > a', html).clone().children().remove().end().text());
//        //sp cost
//        console.log($('#skill-tab-1 > .sp-cell > .sp-cost > .skill-upgrade-tab-10', html).text());
//        //inital sp
//        console.log($('#skill-tab-1 > .sp-cell > .initial-sp > .skill-upgrade-tab-10', html).text());
//        //sp charge type
//        console.log($('#skill-tab-1 > .skill-effect-parent > .sp-charge-type > .effect-description', html).text());
//        //skill activation
//        console.log($('#skill-tab-1 >  .skill-effect-parent > .skill-activation > .effect-description > a', html).text());
//        //duration
//        console.log($('#skill-tab-1 >  .skill-effect-parent > .skill-duration > .skill-upgrade-tab-10', html).text());
//        //skill effect
//        console.log($('#skill-tab-1 >  .skill-description > .skill-upgrade-tab-10', html).text());

//        //building buff 1
//        //name
//        console.log($('.building-buff-cell', html).first().find('.top-cell > .left-cell > .buff-title > .title-cell').text());
//        //description
//        console.log($('.building-buff-cell', html).first().find('.bottom-cell > .build-description-cell').text());
//        //building buff 1
//        //name
//        console.log($('.building-buff-cell', html).last().find('.top-cell > .left-cell > .buff-title > .title-cell').text());
//        //description
//        console.log($('.building-buff-cell', html).last().find('.bottom-cell > .build-description-cell').text());

//        //var $skillone = $('#skill-tab-1 > div > div > a').contents().filter(function () {
//        //    return this.nodeType === 1;
//        //})
//        //$skillone.each(function () {
//        //    console.log($(this).text());
//        //});
//        //$('#skill-tab-1 > div > div > a').first().contents().filter(function () {
//        //    return this.type === 'Skill';
//        //}).text();
//    })
//    .catch(function (err) {
//        //handle error
//    });