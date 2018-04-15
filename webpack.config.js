const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');

module.exports = {
  // target: 'web',
  // devtool: 'source-map',
  entry: {
    app: ['./app/js/index.js'],
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(APP_PATH, 'js'),
        ],
        loader: 'babel-loader',
        query: {
          compact: true,
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(png|jpe?g|gif|eot|svg|ttf|woff|woff2|otf)/i,
        loader: 'file?name=assets/[name].[hash].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(APP_PATH, 'index.html'),
      filename: 'index.html',
      inject: false,
    }),
  ],
};
