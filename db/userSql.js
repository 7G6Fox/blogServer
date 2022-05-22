//验证数据库中的用户名，user表中的查询操作
const User = {

    queryUserTel(option) {

        return 'select * from user where tel = ' + option.userTel + '';

    },
    //查询密码
    queryUserPwd(option) {
        return 'select * from user where (tel = ' + option.userTel + ') and pwd = ' + option.userPwd + '';
    },
}

exports = module.exports = User;