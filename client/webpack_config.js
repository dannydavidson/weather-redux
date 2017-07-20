const path = require('path'),
      webpack = require("webpack"),
      HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve('./src'),
  watch: true,
  devtool: 'source-map',
  devServer: {
    host       : '0.0.0.0',
    port       : 8080,
    contentBase: 'dist/',
    quiet      : false,
    stats      : {
        colors: true
    },
    watchOptions: {
      poll: 1000
    }
  },
  entry: {
    'webpack-redux': path.resolve('./src/init.js')
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    libraryTarget: "var",
    library: 'WeatherRedux'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /(node_modules|coverage)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('./src/index.html'),
      title: 'Weather Redux',
      ioConfig: {
        weather: {
          apiKey: '567453406b0529684eacf2eabf2250be',
          base: 'weather-redux.dannydavidson.com',
          forecast: '/forecast'
        },
      },
      cities: require('./data/city.list.min.json')
        .filter(city => city.country === 'US')
        .slice(0, 20)
    })
  ],
  resolve: {
    extensions: [
      '.js'
    ]
  },
};
