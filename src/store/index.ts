import { createStore } from 'vuex'

export default createStore({
  state: {
    simpleFormData: {
      name: '',
      country: 'ru',
      subscribe: false,
      comment: ''
    },
    complexFormData: {
      username: '',
      email: '',
      bio: '',
      experience: 'junior',
      remote: false,
      languages: [] as string[]
    }
  },
  mutations: {
    updateSimpleForm(state, payload) {
      state.simpleFormData = { ...state.simpleFormData, ...payload }
    },
    updateComplexForm(state, payload) {
      state.complexFormData = { ...state.complexFormData, ...payload }
    },
    resetSimpleForm(state) {
      state.simpleFormData = { name: '', country: 'ru', subscribe: false, comment: '' }
    },
    resetComplexForm(state) {
      state.complexFormData = {
        username: '',
        email: '',
        bio: '',
        experience: 'junior',
        remote: false,
        languages: []
      }
    }
  },
  actions: {
    saveSimpleForm({ commit }, payload) {
      commit('updateSimpleForm', payload)
    },
    saveComplexForm({ commit }, payload) {
      commit('updateComplexForm', payload)
    },
    resetSimpleForm({ commit }) {
      commit('resetSimpleForm')
    },
    resetComplexForm({ commit }) {
      commit('resetComplexForm')
    }
  }
})