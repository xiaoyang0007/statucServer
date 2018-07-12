// import { existsSync } from 'fs';

// 引入http
let http = require('http');
// 引入fs模块
let fs = require('fs');
// 引入路劲模块
let path = require('path');
// 引入第三方 模块
let mime = require('mime');
// 设置网站根目录
let rootPath = path.join(__dirname, "www");
// 开启服务
http.createServer((request, response) => {
    // 获取用户要获取的文件路径
    let pathFile = path.join(rootPath, request.url);
    console.log(pathFile);
    // 判断文件是否存在
    if (fs.existsSync(pathFile)) {
        if (pathFile[pathFile.length - 1] == '\\') {
            console.log("是文件夹");
        } else {
            console.log("是文件");
            // 读取文件
            fs.readFile(pathFile, (err, data) => {
                response.write(200, {
                    'content-type': mime.getType(pathFile)
                })
                if (err) {
                    console.log(err);
                } else {
                    response.end(data)
                }
            })
        }
    } else {
        response.writeHead(404, {
            'content-type': 'text/html;charset=utf-8'
        })
        response.end(`<h2>not find 404</h2>`)
    }
    // response.end('you come')
}).listen(80, '127.0.0.1', () => {
    console.log("监听成功");
})