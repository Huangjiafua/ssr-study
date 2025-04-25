const express = require('express');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('../dist/server/App').default;

const app = express();
const port = process.env.PORT || 3000;

// 静态文件服务
app.use(express.static(path.join(__dirname, '../dist')));

// SSR 路由
app.get('*', (req, res) => {
  const html = ReactDOMServer.renderToString(React.createElement(App));
  
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
}); 