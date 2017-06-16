var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: [
    "webpack-dev-server/client?http://localhost:9339",
    "webpack/hot/only-dev-server",
    path.resolve(__dirname, "lib/js/src", "flappy.js"),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "assets"),
    publicPath: "/"
  },
  devServer: {
    contentBase: path.join(__dirname, "assets"),
    publicPath: '/',
    port: 9339,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
