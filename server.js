/**
 * Selfhost Hub - 简易预览服务器
 * 使用 Express 提供静态文件服务
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 提供静态文件
app.use(express.static('./'));

// 对于 HTML 文件路径简化处理
app.get('/:page', (req, res, next) => {
    const pageName = req.params.page;

    // 如果请求没有扩展名，尝试增加 .html 扩展名
    if (!path.extname(pageName)) {
        const htmlFilePath = path.join(__dirname, `${pageName}.html`);

        // 检查文件是否存在
        fs.access(htmlFilePath, fs.constants.F_OK, (err) => {
            if (!err) {
                // 文件存在，发送 HTML 文件
                res.sendFile(htmlFilePath);
            } else {
                // 文件不存在，继续下一个中间件
                next();
            }
        });
    } else {
        // 有扩展名的请求，继续下一个中间件
        next();
    }
});

// 对于根路径默认提供 index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`
  ====================================================
  🚀 Selfhost Hub 预览服务器已启动！
  
  📂 网站根目录: ${path.resolve('./')}
  🔗 本地访问地址: http://localhost:${PORT}
  🌐 局域网访问: http://<本机IP>:${PORT}
  
  📝 请访问以下页面:
    • 主页: http://localhost:${PORT}
    • 服务列表: http://localhost:${PORT}/services
    • 标签: http://localhost:${PORT}/tags
    • 博客: http://localhost:${PORT}/blog
    • 关于: http://localhost:${PORT}/about
  
  ❗ 按 Ctrl+C 停止服务器
  ====================================================
  `);
}); 