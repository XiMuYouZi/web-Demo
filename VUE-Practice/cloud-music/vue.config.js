module.exports = {
    configureWebpack: {
        resolve: {
            //@表示src文件夹
            alias: {
                'img': "@/assets/img",
                'network': "@/network",
                'style': "@/assets/style",
                "business-cpn": "@/components/business",
                "common-cpn": "@/components/common",
                'views': "@/views",
                'utils':"@/components/common/utils"
            },
        },
    },
    // lintOnSave: false,
    // devServer: {
    //     overlay: {
    //         warnings: false,
    //         errors: false
    //     },

    // }
    css: {
        loaderOptions: {
            sass: {
                // 如果 sass-loader 版本 = 8，这里使用 `prependData` 字段
                // 如果 sass-loader 版本 < 8，这里使用 `data` 字段，本项目是7.0
                data: `
              @import "@/assets/style/variables.scss";
              @import "@/assets/style/mixin.scss";
            `,
            },
        },
    },
};
