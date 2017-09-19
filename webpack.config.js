const path = require('path');

const Webpack = require('webpack');
const jqueryProvider = new Webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractText = new ExtractTextPlugin({
    filename: '[name].css'
});

const extractThemeCss = new ExtractTextPlugin({
    filename: 'light.css'
});

const extractDarkThemeCss = new ExtractTextPlugin({
    filename: 'dark.css'
});

const CleanWebpackPlugin = require('clean-webpack-plugin');
const cleanPaths = ['_assets'];
const cleanOptions = {
    verbose: true,
    dry: false
};
const cleanWebpack = new CleanWebpackPlugin(cleanPaths, cleanOptions);

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        application: path.resolve(__dirname, 'src/javascripts/application.js'),
        404: path.resolve(__dirname, 'src/javascripts/404.js'),
        about: path.resolve(__dirname, 'src/javascripts/about.js'),
    },
    output: {
        path: path.resolve(__dirname, '_assets'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            exclude: /.*(dark|light)\.scss/,
            use: extractText.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }],
                fallback: 'style-loader',
            })
        }, {
            test: /.*light\.scss/,
            use: extractThemeCss.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }],
                fallback: 'style-loader'
            })
        }, {
            test: /.*dark\.scss/,
            use: extractDarkThemeCss.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }],
                fallback: 'style-loader'
            })
        }, {
            test: /\.css$/,
            use: extractText.extract({
                use: [{
                    loader: 'css-loader',
                }],
                fallback: 'style-loader',
            })
        }, {
            test: /\.woff$/,
            loader: 'url-loader?mimetype=application/font-woff&name=fonts/[name].[ext]'
        }, {
            test: /\.woff2$/,
            loader: 'url-loader?mimetype=application/font-woff&name=fonts/[name].[ext]'
        }, {
            test: /\.ttf$/,
            loader: 'url-loader?mimetype=application/octet-stream&name=fonts/[name].[ext]'
        }, {
            test: /\.eot$/,
            loader: 'file-loader?name=/fonts/[name].[ext]'
        }, {
            test: /\.svg$/,
            loader: 'url-loader?mimetype=image/svg+xml&name=fonts/[name].[ext]',
        }, {
            test: /\.(jpe?g|png|gif)$/i,
            loader: 'file-loader?name=/images/[name].[ext]'
        }]
    },
    plugins: [
        jqueryProvider, extractText, extractDarkThemeCss, extractThemeCss, cleanWebpack, new UglifyJSPlugin()
    ]
}
