module.exports = {
    entry: "./js/main.js",
    output: {
        path: "build",
        filename: "main.bundle.js",
        library: "pokemon-util",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel-loader",
            query: {
                presets: ["es2015"]
            }
        }]
    }
};