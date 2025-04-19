import http from "node:http";
import ejs from 'ejs';
import url from 'node:url';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // 设置公共模板数据
  const commonData = {
    title: 'SSR 示例',
    navLinks: [
      { path: '/', text: '首页' },
      { path: '/about', text: '关于我们' }
    ],
    currentPath: pathname  // 添加当前路径到模板数据
  };

  // 路由处理
  if (pathname === '/') {
    renderPage(res, 'index.html', {
      ...commonData,
      pageTitle: '首页',
      content: '欢迎来到我们的网站首页！'
    });
  } else if (pathname === '/about') {
    renderPage(res, 'index.html', {
      ...commonData,
      title: '关于我们 - SSR 示例',
      pageTitle: '关于我们',
      content: '这里是关于我们页面的内容。'
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

function renderPage(res, template, data) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  ejs.renderFile(path.join(__dirname, template), data, (err, html) => {
    if (err) {
      console.error('渲染错误:', err);
      res.writeHead(500);
      res.end('服务器内部错误');
    } else {
      res.end(html);
    }
  });
}

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});