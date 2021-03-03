const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

require('dotenv').config();

const env = process.env.ENV;

module.exports = {
  entry: "./src/index.js",
  mode: env,
  output: {
    path: path.resolve(__dirname,"dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js",".jsx",".mjs"],
    alias:{
        '@utils':path.resolve(__dirname,'./src/utils'),
        '@templates':path.resolve(__dirname,'./src/templates'),
        '@styles':path.resolve(__dirname,'./src/styles'),
        '@images':path.resolve(__dirname,'./src/assets/images'),
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.woff|woff2$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin(
        {
            filename:"assets/[name].[contenthash].css"
        }
    ),
    new Dotenv(),
    new CleanWebpackPlugin()
  ],
  optimization:{
      minimize:true,
      minimizer:[
          new CssMinimizerPlugin(),
          new TerserPlugin(),
      ]
  }
};
