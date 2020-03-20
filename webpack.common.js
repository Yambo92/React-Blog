require('dotenv').config()
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  target: "web",
    entry: ["./client/src/index.js"],
    output: {
        path: path.resolve(__dirname, "client/dist"), 
        // publicPath: "/",
        filename: '[name]-[hash:8].js'
    },
    resolve: {
 
        // priority of lookup -> left to right
        modules: ["client/src", "node_modules"],
        extensions: ['.js', '.json', '.sass','.scss', '.less', '.jsx']
      },
    devtool: 'cheap-module-eval-source-map',
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', "@babel/preset-react"],
                    "plugins": [
                      "react-hot-loader/babel",
                      ["import", {
                        "libraryName": "antd",
                        "libraryDirectory": "es",
                        "style": true // `style: true` 会加载 less 文件
                      }]
                    ]
                  }
                }  
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                  {
                    loader: "css-loader",
                    options: {
                      sourceMap: true,
                      url: true
                    }
                  },
                  {
                    loader: "sass-loader",
                    options: {
                      sourceMap: true
                    }
                  }
                ]
              },
              {
                test: /\.less$/,
                use: [
                  "style-loader",
                   'css-loader', 
                  { loader: 'less-loader', options: { javascriptEnabled: true } }
                ]
            },
            {
                test: /\.(jpeg|jpg|gif|png)$/i,
                loader: "file-loader",
                options: {
                  name: "[name].[ext]",
                  outputPath: "images/",
                }
              },
            {
            test: /\.(eot|otf|svg|ttf|woff|woff2)$/i,
            loader: "file-loader",
            options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
                publicPath: "fonts/"
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
    
        new HtmlWebpackPlugin({
          template: path.join(__dirname, "./client/src/index.html"),
        }),
    
        new MiniCssExtractPlugin({
          filename: devMode ? "[name].css" : "[name].[hash].css",
          chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
        }),
        
      ],
      node: {
        fs: 'empty',
        net: 'empty'
      },

}