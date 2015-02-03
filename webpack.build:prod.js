var path = require('path'),
    webpack = require("webpack"),
    libPath = path.join(__dirname, 'lib'),
    distPath = path.join(__dirname, 'dist'),
    pkg = require('./package.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    output: {
        filename: 'bundle-[hash:6].min.js'
    }
};