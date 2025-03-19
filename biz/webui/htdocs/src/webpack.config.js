var webpack = require('webpack');
var path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: path.join(__dirname, './js/index'),
    decode: path.join(__dirname, './js/decode')
  },
  output: {
    path: path.join(__dirname, '../js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1000000
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ],
  optimization: {
    minimize: true
  },
  performance: {
    hints: false
  }
};
