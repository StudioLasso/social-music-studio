'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const process = require('process');

const config = {
	entry: {
		vendor: [
			'react',
			'react-dom',
			'script!jquery',
			'script!bootstrapjs',
			'script!sidebar',
			'imports?exports=>false&module=>false!firebase',
			'recorderjs',
			'moment'
		],
		app: './src/index.js'
	}, 
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js',
		publicPath: process.env.PUBLIC_PATH || '/'
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.js', '.css'],
		root: __dirname,
		modulesDirectories: ['node_modules', 'bower_components', 'src/js'],
		alias: {
			'bootstrapjs': 'bootstrap/dist/js/bootstrap.min.js',
			'sidebar': 'bootstrap-sidebar/dist/js/sidebar.js',
		}
	},
	module: {
		preLoaders: [
			{ test: /\.js$/, loader: 'eslint', exclude: /node_modules|bower_components/}  
		],
		loaders: [
			{ test: /\.js/, loaders: ['babel'], exclude: /node_modules|bower_components/ },
			{ test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=100000&mimetype=application/font-woff' },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=100000&mimetype=application/octet-stream' },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=100000&mimetype=image/svg+xml' },
			{ test: /\.jpg$/, loader: 'url?limit?100000'}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'body'
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
		new webpack.DefinePlugin({
			__DEVTOOLS__: process.env.NODE_ENV !== 'production'
		})
	],				
	progress: true,
	target: 'web'
};

if (process.env.NODE_ENV !== 'production') {
	config.entry.vendor = config.entry.vendor.concat([
		'./hotReload',
		'webpack/hot/dev-server'
	]);
	config.module.loaders = config.module.loaders.concat([
		{ test: /\.less/, loaders: [
			'style',
			'css?sourceMap',
			'less?sourceMap'
		]}, {
			test: /js.*\.css/, 
			loaders: [
				'style',
				'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
			]
		}
	]);
	config.devtool = 'source-map';
	config.debug = true;
} else {
	config.plugins = config.plugins.concat([
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin('[name].css')
	]);
	config.module.loaders = config.module.loaders.concat([
		{ 
			test: /\.less/, 
			loader: ExtractTextPlugin.extract(
				'style',
				'css-loader?sourceMap&minimize!less-loader?sourceMap'
			)
		}, {
			test: /js.*\.css/, 
			loader: ExtractTextPlugin.extract(
				'style',
				'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap'
			)	
		}
	]);
	config.devtool = 'source-map';
	config.debug = false;
}

module.exports = config;