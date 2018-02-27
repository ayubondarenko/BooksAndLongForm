/**
 * Created by alexander on 01.09.17.
 */
var webpack = require('webpack');
const path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './app.js',
        vendor: ['webpack-material-design-icons']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|ico|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'public'),
        sourceMapFilename: 'bundle.map.js'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin(
            {name: 'vendor', filename: 'vendor.bundle.js'}),

        new CopyWebpackPlugin([
            {from: './books/views', to: './books/views'},
            {from: './long_form/views', to: './long_form/views'},
            {from: 'index.html', to: 'index.html'}
        ])
    ]

};