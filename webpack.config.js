const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "none",

  target: 'web',
  devServer:{
    port:8828,
    open:true,
    compress:true
  },

  entry: './demo.js',
  output: {
    filename: "demo.js",
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /.tsx?$/i,
        use: "ts-loader"
      }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'www/index.html')
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};