module.exports ={
    configureWebpack:{
        resolve:{
            //@表示src文件夹
            alias:{
                'assets':'@/assets',
                'network':'@/network'
            }
        }
    }
}