const webpack = require('webpack');

const config = {
  entry: {
    frame: './app/frame/index',
    parent: './app/parent/index',
  },
  output: {
    path: './bundle/',
    filename: '[name].js',
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: './node_modules',
        loaders: ['babel'],
      },
    ],
  },
};

module.exports = config;