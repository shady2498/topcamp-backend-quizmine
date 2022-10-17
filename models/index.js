const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user_auth = require("./userAuth.models.js")(sequelize, Sequelize);
db.add_skill = require("./admin/addSkills.models.js")(sequelize, Sequelize);
db.add_mcqs = require("./admin/addMcqs.models")(sequelize, Sequelize);



//associations
db.add_skill.hasMany(db.add_mcqs, {foreignKey: "skill_id", onUpdate: 'RESTRICT'});
db.add_mcqs.belongsTo(db.add_skill, {foreignKey: "skill_id", onUpdate: 'RESTRICT'});



module.exports = db;
