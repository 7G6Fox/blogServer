let login = require('./login.js');
//所有关于user的接口在此中转

module.exports = function getUser(app) {
    app.use('/api/user', login)
};