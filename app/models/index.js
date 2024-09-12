const config = require("../config/db");

const Sequelize = require("sequelize");

// change NTX when do test to NTX_test
const sequelize = new Sequelize('NTX_test' , config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User")(sequelize, Sequelize);
db.survey = require("./Survey")(sequelize, Sequelize);
db.attacks = require('./Attack')(sequelize, Sequelize);

db.user.hasMany(db.survey, {
  foreignKey: "userId",
  as: "surveys",
});

db.survey.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});


// define model example
// db.user = require("../models/User")(sequelize, Sequelize);

// relation example
// relation between role and user
// db.role.hasMany(db.user, {
//   as: "users",
//   onDelete: "cascade",
//   onUpdate: "cascade",
// });

// db.user.belongsTo(db.role, {
//   foreignKey: "roleId",
//   as: "role",
// });

module.exports = db;
