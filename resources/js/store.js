import Vue from 'vue'
import Vuex from 'vuex'
import avatar from '@/images/avatar.png'
import axios from 'axios'
import { entrySorter } from '@/js/utilities'

Vue.use(Vuex)

const SET_UPDATING = 'SET_UPDATING'
const SET_UPLOADING = 'SET_UPLOADING'
const SET_ERROR = 'SET_ERROR'
const LOAD_ENTRIES = 'LOAD_ENTRIES'
const ADD_ENTRY = 'ADD_ENTRY'
const UPDATE_ENTRY = 'UPDATE_ENTRY'
const DELETE_ENTRY = 'DELETE_ENTRY'
// const UPLOAD_ENTRIES = 'UPLOAD_ENTRIES' // TBD in phase 2

export const store = new Vuex.Store({
  state: {
    error: null,
    isUpdating: false,
    isUploading: false,
    user: {
      id: 1,
      avatar,
      name: 'Molly Green',
    },
    entries: [],
  },
  mutations: {
    [SET_UPDATING] (state, val) {
      state.isUpdating = val
    },
    [SET_UPLOADING] (state, val) {
      state.isUploading = val
    },
    [SET_ERROR] (state, val) {
      state.error = val
    },
    [LOAD_ENTRIES] (state, entries) {
      state.entries = entries
    },
    [ADD_ENTRY] (state, entry) {
      state.entries = [...state.entries, entry].sort(entrySorter)
    },
    [UPDATE_ENTRY] (state, entry) {
      const i = state.entries.findIndex(e => e.id === entry.id)
      state.entries = [...state.entries.slice(0, i - 1), entry, ...state.entries.slice(i)].sort(entrySorter)
    },
    [DELETE_ENTRY] (state, id) {
      const i = state.entries.findIndex(e => e.id === id)
      state.entries = [...state.entries.slice(0, i - 1), ...state.entries.slice(i)]
    },
  },
  actions: {
    setUpdating ({ commit }, val) {
      commit(SET_UPDATING, val)
    },
    setUploading ({ commit }, val) {
      commit(SET_UPLOADING, val)
    },
    dismissError ({ commit }) {
      commit(SET_ERROR, null)
    },
    loadEntries ({ commit }) {
      commit(SET_UPDATING, true)
      // request entries from the API
      axios.get('/api/entries')
        // then transform dates into ISO 8601 format
        .then(res => res.data.map(e => ({ ...e, date: (new Date(e.date)).toISOString() })))
        // then sort them by date descending
        .then(entries => entries.sort(entrySorter))
        // then update the store
        .then(entries => { commit(LOAD_ENTRIES, entries) })
        // catch errors
        .catch(error => { commit(SET_ERROR, error) })
        // unset the updating flag
        .finally(() => { commit(SET_UPDATING, false) })
    },
    addEntry ({ commit }, entry) {
      commit(SET_UPDATING, true)
      // convert date to MYSQL/PHP date format before uploading
      axios.post('/api/entries', { ...entry, date: entry.date.substr(0, 10) + ' ' + entry.date.substr(11, 8) })
        // then transform returned date into ISO 8601 format
        .then(({ data: entry }) => ({ ...entry, date: (new Date(entry.date)).toISOString() }))
        // then update the store
        .then(entry => { commit(ADD_ENTRY, entry) })
        // catch errors
        .catch(error => { commit(SET_ERROR, error) })
        // unset the updating flag
        .finally(() => { commit(SET_UPDATING, false) })
    },
    updateEntry ({ commit }, entry) {
      commit(SET_UPDATING, true)
      // convert date to MYSQL/PHP date format before uploading
      axios.put('/api/entries/' + entry.id, { ...entry, date: entry.date.substr(0, 10) + ' ' + entry.date.substr(11, 8) })
        // then transform returned date into ISO 8601 format
        .then(({ data: entry }) => ({ ...entry, date: (new Date(entry.date)).toISOString() }))
        // then update the store
        .then(entry => { commit(UPDATE_ENTRY, entry) })
        // catch errors
        .catch(error => { commit(SET_ERROR, error) })
        // unset the updating flag
        .finally(() => { commit(SET_UPDATING, false) })
    },
    deleteEntry ({ commit }, entry) {
      commit(SET_UPDATING, true)
      // convert date to MYSQL/PHP date format before uploading
      axios.delete('/api/entries' + entry.id)
        // then update the store
        .then(() => { commit(DELETE_ENTRY, entry.id) })
        // catch errors
        .catch(error => { commit(SET_ERROR, error) })
        // unset the updating flag
        .finally(() => { commit(SET_UPDATING, false) })
    },
  },
})