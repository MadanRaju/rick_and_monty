import path from 'path';
import webpack from 'webpack';

const bundlePath = path.resolve(__dirname, 'dist/');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['env'], plugins: ['transform-class-properties'] },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    output: {
        publicPath: bundlePath,
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3003,
        publicPath: 'http://localhost:3003/dist',
        hotOnly: true,
    },
    plugins: [
        new webpack.DefinePlugin({ CONFIG: JSON.stringify(require('config')) }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
