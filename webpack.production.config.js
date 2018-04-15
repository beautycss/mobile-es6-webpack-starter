const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ContentReplacerWebpackPlugin = require('webpack-content-replacer-plugin');
// const WebpackSftpClient = require('webpack-sftp-client');

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
        include: APP_PATH,
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
      // minify: true,
    }),
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new CopyWebpackPlugin([
      {
        from: 'app/assets/',
        to: 'assets',
        toType: 'dir',
        // flatten: true,
      },
    ]),
    new ContentReplacerWebpackPlugin({
      modifiedFile: './dist/index.html',
      modifications: [
        {
          regex: /\/assets\/bundle/g,
          modification: 'bundle',
        },
        {
          regex: /\/assets/g,
          modification: 'assets',
        },
      ],
    }),
    new ContentReplacerWebpackPlugin({
      modifiedFile: './dist/bundle.js',
      modifications: [
        {
          regex: /\/assets\/images/g,
          modification: 'assets/images',
        },
      ],
    }),
    // new WebpackSftpClient({
    //   port: '22',
    //   host: 'host',
    //   username: 'username',
    //   password: 'password',
    //   path: path.resolve(ROOT_PATH, 'dist'),
    //   remotePath: '/path',
    //   verbose: true,
    // }),
  ],
};
