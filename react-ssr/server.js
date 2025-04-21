import App from "./src/App.jsx";

// 修改后的 server.js 部分
app.get('/', (req, res) => {
  const appString = ReactDOMServer.renderToString(<App />);
  
  // 读取生成的 HTML 模板
  const templatePath = path.resolve(__dirname, 'dist/index.html');
  let html = fs.readFileSync(templatePath, 'utf-8');
  
  // 替换占位符
  html = html
    .replace('<!-- SSR_CONTENT -->', appString)
    .replace('</body>', '<script src="/client.js"></script></body>');

  res.send(html);
});