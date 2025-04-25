const path = require('path');

module.exports = {
  entry: './src/shared/App.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'App.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}; 