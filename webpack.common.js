const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Path = require('path');
const SRC_DIR = Path.resolve(__dirname, './src');
const DIST_DIR = Path.resolve(__dirname, './dist');
const COM_DIR = Path.resolve(__dirname, './common');

module.exports = {
	entry: {
		index: Path.resolve(SRC_DIR, './index/index.tsx')
	},
	output: {
		path: DIST_DIR,
		filename: '[name].js?[hash:8]',
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|jpeg|gif|bmp|ttf|eot|woff|woff2)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						esModule: false,
						outputPath: 'imgs',
						name: '[name].[ext]',
					},
				}],
			},
			{
				test: /\.css/,
				use: ['style-loader', 'css-loader'],
				include: [/antd\-mobile/, /normalize\.css/],
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: COM_DIR,
					to: DIST_DIR,
					globOptions: {
						ignore: ['**/ori/**'],
					},
				},
			],
		}),
		new HtmlWebpackPlugin({
			template: Path.resolve(COM_DIR, './index.html'),
			title: 'react-ts-demo',
			inject: true,
			timestamp: new Date().getTime(),
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				minifyCSS: true,
				minifyJS: true,
			},
			chunks: 'all',
		}),
	],
	resolve: {
		alias: {
			'@comp': Path.resolve(SRC_DIR, 'components')
		},
		extensions: ['.tsx', '.ts', '.jsx', '.js']
	},
};
