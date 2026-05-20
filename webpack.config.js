const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
// const dotenv = require('dotenv');

module.exports = () => {
  // const env = dotenv.config().parsed;

  // const envKeys = Object.keys(env).reduce((prev, next) => {
  //     prev[`process.env.${next}`] = JSON.stringify(env[next]);
  //     return prev;
  // }, {});

  return {
    // mode: process.env.NODE_ENV,
    devtool: "source-map",
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: "/",
    },
    devServer: {
      contentBase: "./dist",
      historyApiFallback: true,
      port: 4001,
      compress: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|svg|gif)?$/,
          use: "file-loader",
        },
      ],
    },
    plugins: [
      // new webpack.DefinePlugin(envKeys),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        filename: "index.html",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            to: ".",
            globOptions: { ignore: ["**/index.html"] },
          },
        ],
      }),
    ],
  };
};
