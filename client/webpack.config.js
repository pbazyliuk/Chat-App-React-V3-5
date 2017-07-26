const path = require('path');

module.exports = {
	//context: __dirname + '/build',
	entry: './index.js',
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true
	},
	output: {
		// path: 'build',
		//path: __dirname + "/build",

		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/public/'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel-loader']
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader' // creates style nodes from JS strings
					},
					{
						loader: 'css-loader', // translates CSS into CommonJS
						query: {
							modules: true,
							camelCase: true,
							localIdentName: '[name]__[local]___[hash:base64:5]'
						}
					},
					{
						loader: 'sass-loader' // compiles Sass to CSS
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			}
		]
	}
};
