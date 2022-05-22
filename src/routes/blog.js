const {
    getList,
    getDetail,
    updateBlog,
    insertBlog,
    deleteBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel.js');


//原生
const handelBlogRouter = (req, res) => {
    const method = req.method //得到是get 还是post请求

    //获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword)
        return result.then((listData) => {
            return new SuccessModel(listData, '这是获取博客列表的接口')
        }).catch((err) => {
            return new ErrorModel()
        });

    }
    //获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id
        const result = getDetail(id)
        return result.then((article) => {
            return new SuccessModel(article)
        })

    }
    //新增一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = req.body
        const result = insertBlog(blogData)
        return result.then(val => {
            console.log(val);
            return new SuccessModel(`插入到了第${val}行`)
        }).catch(err => {
            return new ErrorModel(err.sqlMessage)
        })
    }

    //更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const id = req.query.id
        const blogData = req.body
        const result = updateBlog(id, blogData)
        return result.then((val) => {
            if (val) {
                return new SuccessModel('更新成功')
            } else {
                return new ErrorModel('更新失败')
            }
        })
    }


    //删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        const id = req.query.id
        const author = req.body.author
        const result = deleteBlog(id, author)
        return result.then((val) => {
            if (val) {
                return new SuccessModel('删除成功')
            } else {
                return new ErrorModel('删除失败')
            }
        })
    }

}
module.exports = handelBlogRouter