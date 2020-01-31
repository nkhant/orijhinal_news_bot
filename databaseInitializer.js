const sqlite3 = require('sqlite3').verbose();

let dbArknights = new sqlite3.Database('./db/arknights.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

dbArknights.run('CREATE TABLE operators( \
    id text, \
    name text, \
    rarity text, \
    profession text, \
    rangeType text, \
    damageType text, \
    tag text, \
    trait text, \
    talentOneName text, \
    talentOneDescription text, \
    talentTwoName text, \
    talentTwoDescription text, \
    hp text, \
    atk text, \
    def text, \
    skillOneName text, \
    skillOneSPCost text, \
    skillOneInitialCost text, \
    skillOneSPChargeType text, \
    skillOneActiviation text, \
    skillOneDuration text, \
    skillOneEffect text, \
    skillTwoName text, \
    skillTwoSPCost text, \
    skillTwoInitialCost text, \
    skillTwoSPChargeType text, \
    skillTwoActiviation text, \
    skillTwoDuration text, \
    skillTwoEffect text, \
    buildingOneBuffName text, \
    buildingOneBuffDescription text, \
    buildingTwoBuffName text, \
    buildingTwoBuffDescription text)');

//dbArknights.run(`INSERT INTO operators(ID, Name, Profession, HP, ATK, Def, Rarity, Target, DamageType ) VALUES("172","SilverAsh", "Guard", "2560", "713", "397", "6","1","Physical Damage")`, function (err) {
//    if (err) {
//        return console.log(err.message);
//    }
//    // get the last insert id
//    console.log(`A row has been inserted `);
//});
