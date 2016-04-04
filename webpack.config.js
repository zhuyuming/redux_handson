var webpack = require('webpack')

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        './src_final/index'
    ],
    output: {
        path: './dist/js',
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
                include: __dirname
            }
        ]
    },
    devtool: "#inline-source-map",
    devServer: {
        contentBase: "./dist",
        port: 8080,
        hot: true,
        inline: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
