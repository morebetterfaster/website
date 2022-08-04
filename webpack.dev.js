const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "eval-cheap-module-source-map",
  entry: "./src/index.js",
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, "dist")
  },
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["env"]
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            // creates style nodes from JS strings
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // translates CSS into CommonJS
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader",
            options: {
              outputStyle: "expanded",
              sourceMap: true,
              sourceMapContents: true
            }
          }
          // Please note we are not running postcss here
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // On development we want to see where the file is coming from, hence we preserve the [path]
              name: "[path][name].[ext]?hash=[hash:20]",
              limit: 8192
            }
          }
        ]
      },
      {
        // Load all icons
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: "src/assets/aaron.png", to: "aaron.png" },
      { from: "src/assets/email-logo.png", to: "email-logo.png" },
      { from: "src/assets/logo.png", to: "logo.png" },
      { from: "src/assets/requirements/requirements-doc-thumbnail.png", to: "requirements-doc-thumbnail.png" },
      { from: "src/assets/requirements/wireframe-thumbnail.png", to: "wireframe-thumbnail.png" },
      { from: "src/assets/requirements/Fizzle Stix - Mass Status for Slack - Requirements.pdf", to: "Fizzle Stix - Mass Status for Slack - Requirements.pdf" },
      { from: "src/assets/requirements/Fizzle Stix - Mass Status for Slack - Wireframe.pdf", to: "Fizzle Stix - Mass Status for Slack - Wireframe.pdf" },
      { from: "robots.txt", to: "robots.txt" },
      { from: "humans.txt", to: "humans.txt" },
      {
        from: "[Example] Acme Corp - Statement of Work.pdf",
        to: "[Example] Acme Corp - Statement of Work.pdf"
      }
    ]),
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: "./laravel/index.html",
      filename: "./laravel/index.html",
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: "./coaching/index.html",
      filename: "./coaching/index.html",
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: "./requirements-documentation/index.html",
      filename: "./requirements-documentation/index.html",
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: "./requirements-gathering/index.html",
      filename: "./requirements-gathering/index.html",
      inject: true
    })
  ]
};
