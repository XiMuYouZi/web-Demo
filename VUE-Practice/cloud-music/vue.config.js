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
    },
    module: {
        rules: [
          // ... 忽略其它规则
    
          // 普通的 `.scss` 文件和 `*.vue` 文件中的
          // `<style lang="scss">` 块都应用它
          {
            test: /\.scss$/,
            use: [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ]
          }
        ]
      },
    // lintOnSave: false,
    // devServer: {
    //     overlay: {
    //         warnings: false,
    //         errors: false
    //     },
     
    // }
}