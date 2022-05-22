const express = require('express') //引入express
const app = express(); //创建实例
const port = 3000; // 设置监听端口


app.use(express.json());

//将user中的接口挂载到app上
const getUser = require("./src/routes/user");
getUser(app);

app.get('/api', (req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.send('请加上/user或者/blog来访问接口')
})


app.listen(port, () => { console.log('server run at 3000'); });