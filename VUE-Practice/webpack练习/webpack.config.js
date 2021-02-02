const path = require('path')

module.exports = {
    entry:"./src/main.js",
    output:{
        // __dirname标识本文件所在的目录，path = 当前文件所在目录 + dist
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        // 所有的url前面都加上前缀dist
        publicPath:'dist/'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            },

            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 大于100kb用file-loader加载，小于100kb编译成base64加载
                            limit: 100000,
                            // name:'img/[name].[hash:8].[ext]'
                        },
                    },
                ],
            },

            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }


        ],
    },
}