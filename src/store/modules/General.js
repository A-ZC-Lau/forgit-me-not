const state = {
    content: null,
    folder: null,
    main: 0,
    type: null
}

const mutations = {
    DECREMENT_MAIN_COUNTER (state) {
        state.main--
    },
    INCREMENT_MAIN_COUNTER (state) {
        state.main++
    },
    set_content (state, payload) {
        state.content = payload.content
        state.type = payload.type
    },
    set_folder (state, payload) {
        state.folder = payload.folder
    },
}

const actions = {
    someAsyncTask ({ commit }) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    }
}

export default {
    state,
    mutations,
    actions
}
