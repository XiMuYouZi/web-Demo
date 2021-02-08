import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import moduleA from "./modules/moduleA";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        counter: 1000,
        students: [
        { id: 1, name: "aaaa", age: 12 },
        { id: 2, name: "bbbb", age: 30 },
        { id: 3, name: "cccc", age: 25 },
        { id: 4, name: "dddd", age: 49 },
        { id: 5, name: "eeee", age: 90 },
        { id: 6, name: "ffff", age: 32 },
        { id: 7, name: "gggg", age: 45 }
        ],
        info: {
        name: "ximu",
        age: 123,
        height: 190
        }
    },

    actions,
    getters,
    mutations,
    modules: {
        moduleA
    }
});

export default store;
