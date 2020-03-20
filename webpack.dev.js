require('dotenv').config()
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const apiUrl = process.env.API_URL

module.exports = merge(common, {
    devtool: "source-map",
    mode: "development",
    devServer:{
        contentBase: path.resolve(__dirname, "client/dist"),
        historyApiFallback: true,
        // publicPath: '/',
        compress: true,
        proxy: {
            "/": {
              target: apiUrl,
              secure: false,
              bypass: function(req, res, proxyOptions) {
                   if (req.headers.accept.indexOf('html') !== -1) {
                    console.log('Skipping proxy for browser request.');
                    return '/index.html';
                   }
                }
            }
          }
    }
})
