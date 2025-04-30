import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { routes } from '../routes';

const app = express();
const port = 3000;

// 静态文件服务
app.use('/static', express.static('dist/client'));

app.get('*', async (req, res) => {
  const { query } = createStaticHandler(routes);
  const remixRequest = createFetchRequest(req);
  const context = await query(remixRequest);

  if (context instanceof Error) {
    return res.status(500).send(context.message);
  }

  const router = createStaticRouter(routes, context);

  const stream = renderToPipeableStream(
    <React.StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </React.StrictMode>,
    {
      bootstrapScripts: ['/static/main.js'],
      onShellReady() {
        res.setHeader('content-type', 'text/html');
        res.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>React SSR Demo</title>
            </head>
            <body>
              <div id="root">`);
        stream.pipe(res);
        res.write(`
              </div>
            </body>
          </html>
        `);
      },
      onError(error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      },
    }
  );
});

// 辅助函数：将 Express 请求转换为 Fetch 请求
function createFetchRequest(req: express.Request) {
  const origin = `${req.protocol}://${req.get("host")}`;
  const url = new URL(req.url, origin);

  const controller = new AbortController();
  req.on("close", () => controller.abort());

  const headers = new Headers();
  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 