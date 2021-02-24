
import * as utils from '@/utils'


export default {
  install(Vue) {
    const requireComponent = require.context(
      "@/components",
      true,
      /[a-z0-9]+\.(vue)$/i,
    )
    //批量注册全局组件
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName)
      const componentName = componentConfig.default.name
      if(componentName) {
         Vue.component(componentName, componentConfig.default || componentConfig)
      }
    })
    // 修改默认尺寸大小
    Vue.prototype.$utils = utils

  }
}