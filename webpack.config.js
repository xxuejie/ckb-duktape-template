const path = require('path')

module.exports = {
  target: 'web',
  mode: 'production',
  entry: {
    duktape: './src/duktape/index.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    }]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd',
    library: 'Molecule',
    globalObject: 'this',
  },
}
