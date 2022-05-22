//使用原生http
const http = require('http');
const querystring = require('querystring')
const PORT = 8000;
const handleBlogRouter = require('./src/routes/blog')

//用于处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise;
}

const serverHandle = (req, res) => {
    //设置返回格式为JSON
    res.setHeader('Content-type', 'application/json');

    //获取path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析query
    req.query = querystring.parse(url.split('?')[1])

    //处理post Data
    getPostData(req).then(postData => {
        req.body = postData
            //处理blog路由,原生的方法
            // const blogData = handleBlogRouter(req, res);
            // if (blogData) {
            //     res.end(
            //         JSON.stringify(blogData)
            //     );
            //     return
            // }

        //使用promise的方法
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                );
            })
            return
        }
        res.writeHead(404, { "Content-type": "text/plain" })
        res.write('404 Not Fond')
        res.end()
    })
}
const server = http.createServer(serverHandle)
server.listen(PORT, () => {
    console.log('8000端口打开');
})