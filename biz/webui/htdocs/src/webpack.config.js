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
    filename: '[name].js',
    library: {
      type: 'umd'
    },
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                modules: 'commonjs'
              }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
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
  },
  resolve: {
    fallback: {
      'buffer': false,
      'path': false
    }
  }
};
