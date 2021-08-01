module.exports = {
  devServer: {
    port: 8828,
    open: true,
    proxy: {
      '/_PROXYAPI_': {
        target: 'https://quotes.sina.cn/',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/_PROXYAPI_': ''
        }
      }
    }
  }
}