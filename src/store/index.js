import Vue from 'vue'
import Vuex from 'vuex'
// import { firebaseMutations } from 'vuexfire'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import colors from '../colors'

Vue.use(Vuex)

const state = {
  notes: [],
  notesOrder: {},
  editor: {
    show: false,
    note: {}
  },
  newNote: {
    title: '',
    text: '',
    markdown: false,
    color: 'none'
  },
  colors
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
