const User = require("./user");
const Auth = require("./auth");

User.hasMany(Auth, { foreignKey: "session_user_id", as: "authSessions" });
Auth.belongsTo(User, { foreignKey: "session_user_id", as: "user" });

module.exports = { User, Auth };
