const merge = require("webpack-merge");
const base = require("./webpack.config.base");
const webpack = require("webpack");

const dev = merge(base, {
  mode: "development",
  devServer: {
    port: 3000,
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: "eval-source-map"
});

module.exports = dev;
