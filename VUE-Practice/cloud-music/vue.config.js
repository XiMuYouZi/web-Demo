module.exports ={
    configureWebpack:{
        resolve:{
            //@表示src文件夹
            alias:{
                'img':'@/assets/img',
                'network':'@/network',
                'css':'@/assets/css',
                'business-cpn':'@/components/business',
                'common-cpn':'@/components/common',
                'views':'@/views',

            }
        }
    }
}