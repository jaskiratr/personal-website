/**
 * @module Store
 * @desc Vuex Store
 */
// Turn off Strict Mode
export const strict = false

export const state = () => ({
  darkMode: false
})

export const getters = {
  darkMode: (state) => state.darkMode
}
export const mutations = {
  setDarkMode(state, payload) {
    state.darkMode = payload
  }
}
export const actions = {
  setDarkMode: (store, payload) => {
    if (typeof payload === 'boolean') {
      store.commit('setDarkMode', payload)
    }
  }
}
