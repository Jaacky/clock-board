const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api' : ''}
            }
        }
    },
    entry: "./src/index.jsx",
    output: {
        path: path.join(__dirname, "dist"),
        filename: '[name].js'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.css', '.scss', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                postcssPresetEnv() // includes autoprefixer
                            ]
                        }
                    },
                    "sass-loader",
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ],
    },
    plugins: [
        new StyleLintPlugin({
            configFile: '.stylelintrc',
            context: 'src',
            files: '**/*.scss',
            failOnError: false,
            quiet: false,
            syntax: 'scss'
        }),
        new HtmlWebPackPlugin({
            template: "./src/static/index.html",
            filename: "index.html",
        })
    ],

}