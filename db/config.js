let MYSQL_CONF
const env = process.env.NODE_ENV
    //获取现在的进程环境

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123',
        database: 'blog'
    }
}
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123',
        database: 'blog'
    }
}

module.exports = MYSQL_CONF