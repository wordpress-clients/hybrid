var path = require('path'),
    webpack = require("webpack"),
    libPath = path.join(__dirname, 'lib'),
    wwwPath = path.join(__dirname, 'www'),
    pkg = require('./package.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

HtmlWebpackPlugin.prototype.htmlWebpackPluginAssets = function (compiler, webpackStatsJson) {
    var assets = {};
    for (var chunk in webpackStatsJson.assetsByChunkName) {
        var chunkValue = webpackStatsJson.assetsByChunkName[chunk];

        // Webpack outputs an array for each chunk when using sourcemaps
        if (chunkValue instanceof Array) {
            // Is the main bundle always the first element?
            chunkValue = chunkValue[0];
        }

        if (compiler.options.output.publicPath) {
            chunkValue = compiler.options.output.publicPath + chunkValue;
        }
        for (var i = 0; i < webpackStatsJson.assets.length; i++) {
            var asset = webpackStatsJson.assets[i];
            if (asset.name.indexOf('css/style') === 0) {
                assets['css'] = asset;
            }
            if (asset.name === chunkValue) {
                assets[chunk] = asset;
            }
        }
    }
    return assets;
};

module.exports = {
    entry: path.join(libPath, 'index.coffee'),
    output: {
        path: path.join(wwwPath, 'js'),
        filename: 'bundle-[hash:6].js'
    },
    module: {
        loaders: [{
            test: /[\/]angular\.js$/,
            loader: 'expose?angular!exports?window.angular'
        }, {
            test: /[\/]masonry\.js$/,
            loader: 'expose?Masonry'
        }, {
            test: /[\/]imagesloaded.pkgd\.js$/,
            loader: 'expose?imagesLoaded'
        }, {
            test: /[\/]ionic\.js$/,
            loader: 'exports?ionic' // For non commonJs
        }, {
            test: /\.html$/,
            loader: 'file?name=templates/[name]-[hash:6].html'
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
            loader: "style!css!autoprefixer!sass?outputStyle=expanded&recursive=sass-json-vars"
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
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr/),
        new webpack.DefinePlugin({
            IS_PROD: false
        })
    ]
};