var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'examples');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
   entry: ['./examples/index'],
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  devtool: 'eval-source-map',
  module: {

    loaders: [
      { 
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ 
      },
      { 
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      }
    ]
  },
  perLoaders: [
    {
      test: /\.jsx?$/,
      include: APP_PATH,
      loader: 'jshint-loader'
    }
  ],
  postcss: function () {
    return [autoprefixer];
  },
  jshint: {
    "esnext": true
  },
  //添加我们的插件 会自动生成一个html文件
  plugins: [
    // new HtmlwebpackPlugin({
    //   title: 'Hello World app'
    // }),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
};