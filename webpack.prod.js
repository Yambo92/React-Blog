const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.(css|js|html)$/,
            minRatio: 0.4
          })
    ],
})