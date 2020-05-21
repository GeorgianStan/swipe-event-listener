const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  target: "web",
  entry: {
    index: "./src/swipe-event.ts",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "swipe-event.js",
    library: "SwipeEvent",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "./dist")],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    // * scss
    config.module.rules.push({
      test: /\.s?css$/,
      use: [
        "style-loader",
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
            config: {
              path: "postcss.config.js",
            },
          },
        },
        "sass-loader",
      ],
    });
  } else if (argv.mode === "production") {
    config.module.rules.push({
      test: /\.s?css$/,
      use: [
        "style-loader",
        {
          loader: "postcss-loader",
          options: {
            config: {
              path: "postcss.config.js",
            },
          },
        },

        "sass-loader",
      ],
    });
  } else {
    throw new Error("Specify env");
  }

  return config;
};
