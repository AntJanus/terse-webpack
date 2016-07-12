module.exports = `{
  "devtool": "cheap-module-eval-source-map",
  "entry": {
    "client": [
      "${process.cwd()}/src/client.js"
    ]
  },
  "module": {
    "loaders": [
      {
        test: /\.js$/,
        loaders: [
          {
            "loader": "babel",
            "exclude": /node_modules/,
            "query": {
              "cacheDirectory": true
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loaders: [
          "json-loader"
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          "style-loader",
          {
            "loader": "css",
            "query": {
              "localIdentName": "[name]-[local]--[hash:base64:5]"
            }
          }
        ]
      },
      {
        test: /\.jpg$/,
        loaders: [
          {
            "loader": "url",
            "query": {
              "limit": 8192
            }
          }
        ]
      },
      {
        test: /\.png$/,
        loaders: [
          {
            "loader": "url",
            "query": {
              "limit": 8192
            }
          }
        ]
      }
    ]
  },
  "output": {
    "chunkFilename": "[id].[hash:5]-[chunkhash:7].js",
    "devtoolModuleFilenameTemplate": "[absolute-resource-path]",
    "filename": "[name].js",
    "libraryTarget": "var",
    "publicPath": "/",
    "path": "${process.cwd()}/build/client"
  },
  "plugins": [
    new terse.plugin("webpack.DefinePlugin", {
      "__CLIENT__": true,
      "__ENV__": JSON.stringify(process.env.NODE_ENV || "development"),
      "__SERVER__": false,
      "process.env.NODE_ENV": JSON.stringify(
        ~[undefined, "development"].indexOf(process.env.NODE_ENV)
        ? "development"
        : "production"
      ),
    }),
    new terse.plugin("npm-install-webpack-plugin"),
    new terse.plugin("webpack.HotModuleReplacementPlugin")
  ],
  "resolve": {
    "modules": [
      "${process.cwd()}/lib",
      "node_modules"
    ]
  },
  "target": "web"
}`;