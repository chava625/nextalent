const { createProxyMiddleware } = require('http-proxy-middleware');

// http://localhost:3000 -> http://localhost:4000
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};