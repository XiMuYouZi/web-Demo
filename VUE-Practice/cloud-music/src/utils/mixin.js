import store from "@/store"

export const hideMenuMixin = {
  beforeRouteEnter (to, from, next) {
    store.commit('music/setMenuShow', false)
    next()
  },
  beforeRouteLeave (to, from, next) {
    store.commit('music/setMenuShow', true)
    next()
  }
}