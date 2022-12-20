const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { NetlifyPlugin } = require('netlify-webpack-plugin');


module.exports = {
    entry: path.resolve(__dirname, './src/server'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    devServer: {
        static: path.resolve(__dirname),
        // historyApiFallback: true,
        // historyApiFallback: {
        //     rewrites: [
        //         { from: /./, to: '/index.html' }, // all request to index.html
        //     ],
        // },

        port: 8080,
        open: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/product1.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ extensions: 'ts' }),
        new CopyPlugin({
            patterns: [
                { from: "./src/assets/img", to: "assets/img" },
                { from: "netlify.toml", to: "" },
            ]
        }),
        new NetlifyPlugin({
            redirects: [
                {
                    from: "/api/*",
                    to: "/index.html",
                    status: 200,
                    force: true,
                }
            ]
        }),
    ]
};
