const query = require('../../db/mysql.js');
let express = require('express');
let router = express.Router();


//这里是user接口
router.get('/', (req, res) => {

    let sql = 'select * from user';
    query(sql).then(result => {
        console.log('sql成功');
        res.status(201).send(
            "这是发送的req:", req.body, "这是我查询到的:", result)
    }).catch(
        err => {
            console.log('sql语句失败');
            throw err;
        })



})


router.post('/login', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //设置响应头，设置允许跨域
    res.setHeader('Access-Control-Allow-Headers', '*');
    console.log('成功');
    console.log(req.body);
    //从请求体中获取参数
    let params = [
        req.body.tel,
        req.body.psw
    ]

    //sql语句
    let sql = 'select * from user where tel = ? and password = ? ';
    // query(sql, params, function(err, result) {
    //     if (err) {
    //         console.log('sql语句失败');
    //         throw err;
    //     } else {
    //         console.log("sql成功:", result);
    //         console.log("params", params);
    //         res.send(result);
    //     }
    // })
    query(sql, params).then(
        result => {
            console.log('sql成功');
            console.log("params", params);
            res.status(201).send("这是发送的req:", req.body,
                "这是我查询到的:", result)
        }
    ).catch(
        err => {
            console.log('sql语句失败');
            throw err;
        })
});


module.exports = router;