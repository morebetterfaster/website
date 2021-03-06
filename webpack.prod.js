const path = require("path");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); //installed via npm
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");

module.exports = {
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    filename: "[name].[hash:20].js",
    path: buildPath
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
        test: /\.(scss|css|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            // translates CSS into CommonJS
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // Runs compiled CSS through postcss for vendor prefixing
            loader: "postcss-loader",
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
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[hash:20].[ext]",
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
      { from: "robots.txt", to: "robots.txt" },
      { from: "humans.txt", to: "humans.txt" },
      {
        from: "[Example] Acme Corp - Statement of Work.pdf",
        to: "[Example] Acme Corp - Statement of Work.pdf"
      },
      { from: "src/assets/requirements/requirements-doc-thumbnail.png", to: "requirements-doc-thumbnail.png" },
      { from: "src/assets/requirements/wireframe-thumbnail.png", to: "wireframe-thumbnail.png" },
      { from: "src/assets/requirements/Fizzle Stix - Mass Status for Slack - Requirements.pdf", to: "Fizzle Stix - Mass Status for Slack - Requirements.pdf" },
      { from: "src/assets/requirements/Fizzle Stix - Mass Status for Slack - Wireframe.pdf", to: "Fizzle Stix - Mass Status for Slack - Wireframe.pdf" },
    ]),
    new HtmlWebpackPlugin({
      template: "./index.html",
      // Inject the js bundle at the end of the body of the given template
      inject: "body",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new HtmlWebpackPlugin({
      template: "./laravel/index.html",
      filename: "./laravel/index.html",
      // Inject the js bundle at the end of the body of the given template
      inject: "body",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new HtmlWebpackPlugin({
      template: "./coaching/index.html",
      filename: "./coaching/index.html",
      // Inject the js bundle at the end of the body of the given template
      inject: "body",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new HtmlWebpackPlugin({
      template: "./requirements/index.html",
      filename: "./requirements/index.html",
      // Inject the js bundle at the end of the body of the given template
      inject: "body",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new CleanWebpackPlugin(buildPath),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: "./src/assets/thumbsup.png",
      // The prefix for all image files (might be a folder or a name)
      prefix: "/icons-[hash]/",
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: "#fff",
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: "morebetterfaster",

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css"
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        map: {
          inline: false
        },
        discardComments: {
          removeAll: true
        },
        discardUnused: false
      },
      canPrint: true
    })
  ]
};
