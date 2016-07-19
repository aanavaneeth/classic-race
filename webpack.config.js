var webPack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var autoprefixer = require('autoprefixer');
var CleanPlugin = require('clean-webpack-plugin');
var path = require("path");
var production = process.env.NODE_ENV === 'production';


var externals = (!!production)  ? {
  //"jquery": "jQuery"
} : {};
var cdn = (!!production) ? [] : [];

var plugins = [
  new CleanPlugin('dist'),
  // working with chunks. Need to test!
  new webPack.optimize.CommonsChunkPlugin({
    name:      'vendor',
    children:  true,
    minChunks: 2
  }),
  new HtmlWebpackPlugin({ filename: 'race.html', template: 'race.ejs', chunks: ['vendor', 'index'],cdn: cdn}),
  new ExtractTextPlugin("[name]-[hash].css", {allChunks: true}),
  new CopyWebpackPlugin([{from: 'lib', to: 'lib'}]), //{ignore: ['JS/*', 'styles/*', 'index.ejs']}
];

if (production) {
  plugins = plugins.concat([
    // Production plugins go here
    new webPack.optimize.UglifyJsPlugin({
      mangle:   true,
      compress: {
        warnings: false, // Suppress uglification warnings
      },
    }),
  ]);
}


module.exports = {
  context: path.join(__dirname, 'src'),
  eslint: {
    configFile: '.eslintrc',
    failOnError: true
  },
  entry: {
    index: './js/main.js'
  },
  output: {
    path: 'dist',
    filename: '[name]-[hash].js',
  },
  externals: externals,
  plugins: plugins,
  module: {
    preLoaders: [
      {test: /\.js$/, loader: "eslint-loader", include: "src"}
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader"), exclude: /node_modules/},
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader"), exclude: /node_modules/},
      { test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=10000000', exclude: /node_modules/ }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 4 versions'] }) ]
};
