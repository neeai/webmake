var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//html-webpack-plugin could create index.html for you, and open-browser-webpack-plugin could open a new browser tab when Webpack loads.
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var config = {
	//入口文件
	entry: {
		index: './src/js/index.js',
		login: './src/js/login.js',
		vendor: 'webpack-zepto'
	},
	//入口文件输出配置
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'js/[name].js' //为每个文件生成唯一的哈希值，[name].[crushhash].js用于生产环境 不要用在开发环境，因为这会增加编译时间
		//publicPath: "http://cdn.example.com/assets/[hash]/" 针对资源使用 CDN 和 hash
	},
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.js'
		}
	},
	module: {
		//加载器配置
		rules: [{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					//resolve-url-loader may be chained before sass-loader if necessary
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader'

				})
			},
			{
				test: /\.css$/,
				use:[{
					loader:'style-loader'
				},{
					loader:'css-loader'
				}]
			},
			{
				test: /\.json$/,
				use: [{
					loader: 'json-loader'
				}]
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [{
					loader: 'url-loader?url=8192&name=images/[hash:8].[name].[ext]',
				}]
			}
		]
	},
	//插件项
	plugins: [
		new webpack.BannerPlugin('This file is created by 巍'),
		new uglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		//api: https://www.npmjs.com/package/html-webpack-plugin
		new HtmlwebpackPlugin({
			title: '首页',
			filename: 'index.html',
			template: './src/view/index.ejs',
			inject: true,
			hash: true,
			showErrors: true,
			cache: false // 开发
		}),
		new HtmlwebpackPlugin({
			title: '登录页',
			filename: 'login.html',
			template: './src/view/login.ejs',
			inject: true,
			hash: true,
			showErrors: true,
			cache: false // 开发
		}),
		//		new OpenBrowserPlugin({
		//			url: 'http://localhost:8080'
		//		})
		new ExtractTextPlugin('css/[name].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor' // 指定公共 bundle 的名字。
		}),
		new webpack.ProvidePlugin({
			$: 'webpack-zepto',
			Zepto: 'webpack-zepto'
		})
	],
	//调试服务
	devServer: {
		contentBase: "./", //本地服务器所加载的页面所在的目录
		//	    colors: true,//
		//	    historyApiFallback: true,//不跳转
		inline: true, //实时刷新
		port: '80',
		host: '0.0.0.0'
	}

};

module.exports = config;