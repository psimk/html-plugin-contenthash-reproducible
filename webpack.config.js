var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpackMajorVersion = require("webpack/package.json").version.split(".")[0];

module.exports = {
  context: __dirname,
  entry: "./example.js",
  output: {
    path: path.join(__dirname, "dist/webpack-" + webpackMajorVersion),
    publicPath: "",
    filename: "bundle.[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new (class {
      apply(compiler) {
        compiler.hooks.compilation.tap("ReproductionPlugin", (compilation) => {
          HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
            "ReproductionPlugin",
            (data, cb) => {
              console.log(data.assetTags.scripts);
              cb(null, data); // Tell webpack to move on
            }
          );
        });
      }
    })(),
  ],
};
