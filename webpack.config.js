const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
<<<<<<< HEAD

module.exports = {
    entry: path.resolve(__dirname, './src/index.ts'),
=======
const { NetlifyPlugin } = require('netlify-webpack-plugin');


module.exports = {
    entry: path.resolve(__dirname, './src/server'),
>>>>>>> f40317ee5804eeb3a666297adad52a9792e76a17
    mode: 'development',
    module: {
        rules: [
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
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
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
<<<<<<< HEAD
=======
        historyApiFallback: true,
        historyApiFallback: {
            rewrites: [
                { from: /./, to: '/index.html' }, // all request to index.html
            ],
        }
>>>>>>> f40317ee5804eeb3a666297adad52a9792e76a17
        // port: 8080,
        // open: true,
        // hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ extensions: 'ts' }),
        new CopyPlugin({
            patterns: [
                { from: "./src/assets/img", to: "img" },
<<<<<<< HEAD
            ]
        })
=======
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
>>>>>>> f40317ee5804eeb3a666297adad52a9792e76a17
    ]
};
