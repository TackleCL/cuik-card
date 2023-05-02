import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isIOS: false
  },
  mutations: {
    setIOS(state, payload) {
      state.isIOS = payload
    }
  },
  actions: {},
  modules: {}
})
