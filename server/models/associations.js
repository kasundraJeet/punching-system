const Auth = require('./auth');
const User = require('./user');
const PunchRecord = require('./puching');

// Define associations
Auth.belongsTo(User, { foreignKey: 'session_user_id', as: 'user' });
User.hasMany(Auth, { foreignKey: 'session_user_id', as: 'sessions' });

PunchRecord.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(PunchRecord, { foreignKey: 'user_id', as: 'punchRecords' });

module.exports = { User, Auth, PunchRecord };
