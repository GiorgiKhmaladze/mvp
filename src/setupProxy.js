const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://178.63.13.157:8090',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/mock-api/api',
      },
    })
  );
};
