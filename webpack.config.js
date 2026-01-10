const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const phaserModule = path.join(__dirname, 'node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');

module.exports = {
  mode: 'development',
  entry: './main',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              import: false
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /p2\.js/,
        use: {
          loader: 'expose-loader',
          options: {
            exposes: 'p2'
          }
        }
      },
      {
        test: /pixi\.js/,
        use: {
          loader: 'expose-loader',
          options: {
            exposes: 'PIXI'
          }
        }
      },
      {
        test: /phaser-split\.js$/,
        use: [
          {
            loader: 'imports-loader',
            options: {
              type: 'commonjs',
              imports: ['single p2 p2', 'single pixi PIXI']
            }
          },
          {
            loader: 'expose-loader',
            options: {
              exposes: 'Phaser'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.sass', '.json'],
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: {
      pixi: pixi,
      phaser: phaser,
      p2: path.resolve(__dirname, 'node_modules/p2/src/p2.js'),
      app: path.resolve(__dirname, 'app'),
      data: path.resolve(__dirname, 'data'),
      debug: path.resolve(__dirname, 'app/debug'),
      util: path.resolve(__dirname, 'app/util.js'),
      config: path.resolve(__dirname, 'app/config.js'),
      game: path.resolve(__dirname, 'app/game'),
      views: path.resolve(__dirname, 'app/views'),
      office: path.resolve(__dirname, 'app/office'),
      states: path.resolve(__dirname, 'app/states'),
      market: path.resolve(__dirname, 'app/market')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    })
  ],
  performance: {
    hints: 'warning',
    maxAssetSize: 3145728,
    maxEntrypointSize: 3145728
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname)
    }
  }
};
