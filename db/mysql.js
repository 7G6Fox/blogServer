//将连接连接池的方法封装
const mysql = require('mysql'); //引入mysql
const MYSQL_CONF = require('./config') //引入配置

//创建连接池
const pool = mysql.createPool(MYSQL_CONF);
// console.log(MYSQL_CONF);

function exec(sql, params = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, conn) {
            if (err) {
                console.log('连接失败');
                return
            }
            console.log('连接成功');
            conn.query(sql, params, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log('查询成功');
                    // console.log('result:', result);
                    resolve(result);
                }
            })
            conn.release();
        })
    })
}

module.exports = exec;