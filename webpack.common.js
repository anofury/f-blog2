const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Path = require('path');
const SRC_DIR = Path.resolve(__dirname, './src');
const DIST_DIR = Path.resolve(__dirname, './dist');
const PUBLIC_DIR = Path.resolve(__dirname, './public');

module.exports = {
	entry: SRC_DIR,
	output: {
		path: DIST_DIR,
		filename: '[name].js',
		chunkFilename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						esModule: false,
						outputPath: 'imgs/',
					},
				}],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(PUBLIC_DIR, './index.html'),
			title: '',
			hash: true,
			inject: true,
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				minifyCSS: true,
				minifyJS: true,
			},
			chunks: 'all',
			version: new Date().getTime(),
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: PUBLIC_DIR,
					to: DIST_DIR,
					globOptions: {
						ignore: ['**/ori/**'],
					},
				},
			],
		}),
	],
};
