import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import riot from 'riot';
import paths from './paths.js';

export default (env) => {
  return {
    mode: "development",
    entry: {
      polyfills: [
        'babel-polyfill'
      ],
      main: [
        paths.srcJs
      ]
    },
    output: {
      path: paths.distDir,
      filename: '[name].bundle.js',
      // publicPath: publicPath,
      sourceMapFilename: '[name].map'
    },
    module: {
      rules: [
        { // js
          test: /\.(js)$/,
          include: /src/,
          exclude: /node_modules/,
          enforce: 'post',
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [ 'latest', { modules: false } ]
            ]
          }
        },
        { // css
          test: /\.css$/,
          include: /src/,
          exclude: /node_modules/,
          enforce: 'post',
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        { // sass
          test: /\.(less)$/,
          include: /src/,
          exclude: /node_modules/,
          enforce: 'post',
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'less-loader'
            ]
          })
        },
        { // ts
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        { // img
          test: /\.(jpg|png|gif)$/,
          include: /src/,
          exclude: /node_modules/,
          enforce: 'post',
          use: 'file-loader'
        },
        { // font
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          include: /src/,
          exclude: /node_modules/,
          enforce: 'post',
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'html'],
    },
    plugins: [
      new webpack.ProvidePlugin({riot: 'riot'}),
      new HtmlWebpackPlugin({
        template: paths.srcHtml,
        chunks: ['main', 'polyfills', 'vendor']
      }),
      new CleanWebpackPlugin(['*'], {
        root: paths.distDir,
        exclude: '.gitkeep'
      }),
      new ExtractTextPlugin('main.css')
    ]
  };
}
