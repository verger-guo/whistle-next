var webpack = require('webpack');
var path = require('path');
var baseConfig = require('./webpack.config.js');

module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    ...baseConfig.output,
    publicPath: '/js/'
  },
  devServer: {
    hot: true,
    port: 8000,
    open: true,
    client: {
      overlay: false
    },
    static: {
      directory: path.join(__dirname, '../'),
      publicPath: '/'
    },
    proxy: [
      {
        context: ['/cgi-bin', '/whistle', '/plugin.server'],
        target: 'http://localhost:8877',
        changeOrigin: true
      }
    ],
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}; 