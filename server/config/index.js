const sequelize = require("./database");
const { Sequelize, Model } = require('sequelize');


const db = {};
db.Sequelize = Sequelize
db.sequelize = sequelize


db.user = require('../models/user')(sequelize, DataTypes, Model)
db.auth = require('../models/auth')(sequelize, DataTypes) 

// hasOne Relationship
db.user.hasOne(db.auth, {foreignKey: 'session_user_id', as: 'auth'})


// module.exports = { sequelize };
module.exports = {db};

