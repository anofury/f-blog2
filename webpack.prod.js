const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    minChunks: 2,
                    minSize: 0,
                    name: 'vendors',
                },
                commons: {
                    chunks: 'all',
                    test: /\.(ts|tsx|js|jsx)/,
                    priority: -10,
                    minChunks: 2,
                    minSize: 0,
                    name: 'commons',
                },
            },
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    warnings: false,
                    compress: {
                        drop_debugger: true,
                        drop_console: true,
                    }
                },
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin(),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(css|less)/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
        new CleanWebpackPlugin(),
    ],
})