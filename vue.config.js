module.exports = {
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
      },
      '/_MEITUANPROXY_': {
        target: 'https://www.meituan.com',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/_MEITUANPROXY_': ''
        }
      }
    }
  }
}