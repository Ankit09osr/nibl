const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.bundle.js'
  },
  resolve: {
    alias: {
      '../../theme.config$': path.join(__dirname, 'my-semantic-theme/theme.config')
    },
    extensions: ['.js', '.scss', '.css', '.json']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        use: ExtractTextPlugin.extract({
          use: ['css-loader','less-loader']
        }),
        test: /\.less$/
      },
    ]
  },
  devServer: {
    contentBase: __dirname + '/dist',
    compress: true,
    port: 2500,
    stats: 'errors-only',
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Nibl',
      template: 'index.ejs',
      minify: {
        collapseWhitespace: true
      },
      hash: true
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
    })
  ]
}
