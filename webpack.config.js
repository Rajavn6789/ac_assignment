const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
  './src/index.js' // the entry point of our app
],
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  output: {
    // Compile into js/build.js
    path: path.resolve(__dirname, 'build'),
    publicPath: 'build/',
    filename: 'bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'build'),
            },
          },
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'build'),
            },
          },
          'css-loader',
          'sass-loader',
        ]
      },

      {
        test: /\.(jpg|png|gif|svg)$/,
        use:[
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 40 kB
              limit: 40 * 1024
            }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  devServer: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 5000,
    }
  },
  stats: {
    colors: true
  },
};
