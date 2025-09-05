const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3002,
    allowedHosts: [
      'bengalifriendsofseattle.org',
      'www.bengalifriendsofseattle.org',
      'localhost',
      '127.0.0.1'
    ],
    host: '0.0.0.0',
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    }
  }
};
