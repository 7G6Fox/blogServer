const exec = require('../../db/mysql');

const getList = (author, keyword) => {
    let sql = `select * from article where 1=1 `
    if (author) {
        sql += `and author ='${author}'`
    }
    if (keyword) {
        sql += `and keyword like '%${keyword}%' `
    }
    sql += `order by id desc;`
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from article where id = ${id}`
    return exec(sql).then(article => {
        return article[0]
    })
}

const insertBlog = (blogData) => {
    const sql = `insert into article (author,title,content,data,tag) values (?,?,?,?,?)`;
    const data = new time;
    const params = [
        blogData.author,
        blogData.title,
        blogData.content,
        data,
        blogData.tag
    ]
    return exec(sql, params).then(insertData => {
        if (insertData.insertId)
            return insertData.insertId
    })
}

const deleteBlog = (id, author) => {
    const sql = `delete from article where id = ${id} and author = '${author}' `
    return exec(sql).then(deleteData => {
        // console.log('updateData', updateData);
        if (deleteData.affectedRows > 0)
            return true
        else
            return false
    })
}

const updateBlog = (id, blogData = {}) => {
    //id 是要更新博客的id
    //blogData是一个博客对象，包含title content 属性
    const title = blogData.title;
    const content = blogData.content;
    const sql = `update article set title = '${title}',content = '${content}' WHERE id = ${id}`
    return exec(sql).then(updateData => {
        // console.log('updateData', updateData);
        if (updateData.affectedRows > 0)
            return true
        else
            return false
    })
}


module.exports = {
    getList,
    getDetail,
    updateBlog,
    insertBlog,
    deleteBlog
}