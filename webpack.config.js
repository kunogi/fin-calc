const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'none',

  target: 'web',
  devServer: {
    port: 8828,
    open: true,
    compress: true
  },

<<<<<<< HEAD
  entry: './www/demo.js',
=======
  entry: './www/index.js',
>>>>>>> ea331a74d1d7406177c5503f9b2ac8d4b216daad
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /.tsx?$/i,
        use: 'ts-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'www/index.html')
    }),
    new ESLintPlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}
