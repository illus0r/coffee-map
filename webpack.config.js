const webpack = require('webpack');

module.exports = {
    entry: './src/root.jsx',
    output: {
        filename: './static/build.js'
    },
    module: {
        rules: [{
            test: /(\.js|\.jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ]}
            }]
        }]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    },
    watch: true
};
