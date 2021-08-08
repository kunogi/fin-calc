module.exports = {
  configureWebpack: {
    //devtool: process.env.NODE_ENV === 'dev' ? 'eval-source-map' : 'nosource-source-map'
  },
  devServer: {
    port: 8828,
    open: true,
    proxy: {
      '/_SINAPROXY_': {
        target: 'https://quotes.sina.cn/',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/_SINAPROXY_': ''
        }
      }
    }
  }
}