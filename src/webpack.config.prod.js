const merge = require("webpack-merge");
const base = require("./webpack.config.base");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const prod = merge(base, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    moduleIds: "hashed",
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /node_modules/gi,
        sourceMap: true
      })
    ],
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  }
});

module.exports = prod;
