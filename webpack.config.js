var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: [
        './app/index.js'  //ทางเข้า App ของเรา เทียบกับ main.php
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ] // ให้ babel เป็นตัว compile .js
    },
    output: {
        path: __dirname + '/dist',
        filename: "index_bundle.js"
    },
    devServer: {
        port: 8082
    },
    plugins: [HTMLWebpackPluginConfig]
}