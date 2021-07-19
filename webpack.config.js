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

  entry: {
    demo: {
      import: './www/demo.js',
      dependOn: 'testdata'
    },
    testdata: './www/testdata.json'// separate testdatas from the main js
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
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
