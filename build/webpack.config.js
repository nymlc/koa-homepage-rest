
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
let nodeModules = {};
fs.readdirSync('node_modules')
    .filter((x) => {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach((mod) => {
        nodeModules[mod] = 'commonjs ' + mod;
    });
module.exports = {
    cache: false,
    entry: [
        '../src/app.js'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    context: __dirname,
    node: {
        __filename: false,
        __dirname: false
    },
    target: 'node',
    externals: nodeModules,
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [resolve('src'), resolve('test')],
            exclude: [resolve('src/assets')],
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test')] //必须处理包含src和test文件夹
        }]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('src'),
            'src': path.resolve(__dirname, '../src'),
            'config': path.resolve(__dirname, '../src/config'),
            'controllers': path.resolve(__dirname, '../src/controllers'),
            'middleware': path.resolve(__dirname, '../src/middleware'),
            'models': path.resolve(__dirname, '../src/models'),
            'plugins': path.resolve(__dirname, '../src/plugins'),
            'routes': path.resolve(__dirname, '../src/routes'),
            'services': path.resolve(__dirname, '../src/services'),
            'utils': path.resolve(__dirname, '../src/utils')
        }
    }
}