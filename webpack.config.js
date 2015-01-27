var path = require('path'),
    webpack = require("webpack"),
    libPath = path.join(__dirname, 'lib'),
    wwwPath = path.join(__dirname, 'www'),
    pkg = require('./package.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: path.join(libPath, 'index.coffee'),
    output: {
        path: wwwPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /[\/]angular\.js$/,
            loader: 'expose?angular!exports?window.angular'
        }, {
            test: /[\/]underscore\.js$/,
            loader: 'expose?_'
        }, {
            test: /[\/]hammer\.js$/,
            loader: 'expose?Hammer'
        }, {
            test: /[\/]ionic\.js$/,
            loader: 'exports?ionic' // For non commonJs
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.json$/,
            loader: "json"
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.coffee$/,
            loader: "coffee"
        }, {
            test: /\.scss$/,
            loader: "style!css!sass?outputStyle=expanded"
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
            template: path.join(libPath, 'index.html')
        }),
        new ngAnnotatePlugin({
            add: true
        }),
    ]
};