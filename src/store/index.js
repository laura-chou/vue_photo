import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    file: '',
    folder: []
  },
  mutations: {
    login (state, data) {
      state.user = data
    },
    logout (state) {
      state.user = ''
    },
    folder (state, data) {
      state.folder = data
    },
    gofile (state, data) {
      state.file = data
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    file (state) {
      return state.file
    },
    folder (state) {
      return state.folder
    }
  },
  plugins: [createPersistedstate()]
})
