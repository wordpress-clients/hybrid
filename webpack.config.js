var path = require('path'),
    fs = require('fs'),
    webpack = require("webpack"),
    libPath = path.join(__dirname, 'lib'),
    wwwPath = path.join(__dirname, 'www'),
    pkg = require('./package.json'),
    cordovaLib = require('cordova').cordova_lib,
    projectConfig = require('./config.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(libPath, 'index.coffee'),
    output: {
        path: wwwPath,
        filename: 'bundle-[hash:6].js'
    },
    module: {
        loaders: [{
            test: /[\/]angular\.js$/,
            loader: 'expose?angular!exports?window.angular'
        }, {
            test: /[\/]highlight\.js$/,
            loader: 'expose?hljs'
        }, {
            test: /[\/]imgcache\.js$/,
            loader: 'expose?ImgCache'
        }, {
            test: /[\/]ionic\.js$/,
            loader: 'exports?ionic' // For non commonJs
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.md$/,
            loader: "html!markdown"
        }, {
            test: /\.json$/,
            loader: "json"
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file?name=img/[name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.coffee$/,
            loader: "ng-annotate?add=true!coffee"
        }, {
            test: /\.scss$/,
            loader: "style!css!autoprefixer!sass"
        }, {
            test: [/Roboto\.ttf/, /Roboto\.woff/, /Roboto\.woff2/],
            loader: 'file?name=fonts/[name].[ext]'
        }, {
            test: [/ionicons\.svg/, /ionicons\.eot/, /ionicons\.ttf/, /ionicons\.woff/],
            loader: 'file?name=fonts/[name].[ext]'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss', '.coffee', '.html'],
        root: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'bower_components')
        ],
        moduleDirectories: [
            'bower_components',
            'node_modules'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            pkg: pkg,
            appVersion: getAppVersion(),
            template: path.join(libPath, 'index.html')
        }),
        new webpack.ContextReplacementPlugin(/moment\/locale$/, getRegexAutorizedLanguages()),
        new webpack.DefinePlugin({
            IS_PROD: false
        })
    ]
};

function getRegexAutorizedLanguages() {
    return new RegExp(Object.keys(projectConfig.translation.available).join('|'));
}

function getAppVersion() {
    var config = new cordovaLib.configparser(__dirname + '/config.xml');
    return config.version();
}
