const { HtmlRspackPlugin } = require("@rspack/core");

module.exports = {
  // 客户端入口文件
  entry: './src/client.js',
  
  // 构建模式（开发环境可改为 'development'）
  mode: 'production',
  
  // 输出配置
  output: {
    filename: 'client-[contenthash].js',
    path: __dirname + '/dist',
    clean: true // 构建前清理 dist 目录
  },
  
  // 模块处理规则
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true
              },
              transform: {
                react: {
                  runtime: 'automatic'
                }
              }
            }
          }
        }
      }
    ]
  },
  
  // 插件配置
  plugins: [
    new HtmlRspackPlugin({
      template: './src/template.html' // HTML 模板文件
    })
  ]
};