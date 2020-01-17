const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../assets/src/'),
    dist: path.join(__dirname, '../assets/dist/')
};

module.exports ={

    externals: {
      paths: PATHS
    },
    entry: {
        main: `${PATHS.src}js/index.js`,
    },
    output: {
        filename: '[name].js',
        path: PATHS.dist,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    "presets": [
                        "@babel/preset-env"
                    ]
                }
                ,
                exclude: '/node_modules/'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['> 0%']
                                }),
                                require('css-mqpacker'),
                                require('cssnano')({
                                    preset: [
                                        'default',{
                                            discardComments: {
                                                removeAll: true
                                            }
                                        }
                                    ]
                                }),
                            ],
                            sourceMap: true
                        }
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['> 0%']
                                }),
                                require('css-mqpacker'),
                                require('cssnano')({
                                    preset: [
                                        'default',{
                                            discardComments: {
                                                removeAll: true
                                            }
                                        }
                                    ]
                                }),
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {sourceMap: true}
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}index.html`,
            filename:'./index.html'
        }),
        new CopyWebpackPlugin([
            {from: `${PATHS.src}img`, to: `${PATHS.dist}img`},
            {from: `${PATHS.src}static`, to: `${PATHS.dist}static`},
        ]),
    ],
};
