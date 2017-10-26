const state = {
    content: null, // content of the file
    file: null, // name of the file
    folder: null, // the selected folder - collections / chapters
    root: null, // the root folder
    main: 0,
    modal: {
        title: null,
        content: null
    }
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
        state.file = payload.file
    },
    set_root (state, payload) {
        state.folder = payload.root
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
