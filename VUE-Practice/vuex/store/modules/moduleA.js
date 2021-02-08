export default{
        state:{
            name:'zhangsan'
        },
        mutations:{
            updateName(state,payload){
                state.name = payload
            },
        },
        getters:{
            fullname1(state){
                return state.name + '--11111--'
            },
            fullname2(state,getters){
                return getters.fullname1 + '--2222----'
            },
            fullname3(state, getters,rootState){
                return getters.fullname2 + rootState.counter
            }
        },
        actions:{
            moduleAAsyncUpdateName(context,name){
                // 可以通过context调用父类的action，state，mutation，getter
                console.log('moduleAAsyncUpdateName的context：', context);
                setTimeout(() => {
                    // 调用自己的mutation
                    context.commit('updateName',name)
                    // 调用父类的方法
                    context.commit('addStudent',{id:11, name:'rgrt',age:44})
                    context.dispatch('asyncUpdateInfo',{age:12, name:'fssry',height:57,address:'rtdff'})
                }, 1000);
            }
        }
}