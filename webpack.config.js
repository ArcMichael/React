var webpack = require('webpack');
var path = require('path');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  entry: {
    main:['./client.js'],
    vendor:[
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk'
    ]
  },

  output: {
    path: 'public',
    filename: 'soa/bundle/[hash].bundle.js',
    publicPath: '/'
  },

  plugins: [
      new AssetsPlugin({
          filename: '/common/configuration/hash.json'
      }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
          name: "vendor",
          filename : 'soa/bundle/[hash].vendor.js',
          minChunks: Infinity,
      }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("soa/bundle/[hash].bundle.css"),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
        { test: /\.json$/, exclude: /node_modules/, loader: 'json'},
        { test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=soa/bundle/[name].[ext]'}
    ]
  }
}

//{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
//{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
//{ test: /\.json$/, exclude: /node_modules/, loader: 'json'},
//{ test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=./soa/bundle/[name].[ext]'}