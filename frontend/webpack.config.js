const path = require('path');


module.exports = {
    mode: 'development',
    entry: {
        app: path.resolve(__dirname, 'src/index.js')
    },
    devtool: 'inline-source-map',
    devServer: {
         contentBase: './dist',
    },
    output: {
    filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            { test: /\.html$/, use: 'raw-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            app: path.resolve(__dirname, 'src')
        }
    }
};