const state = {
    content: null, // content of the file
    file: null, // name of the file
    folder: null, // the selected folder - collections / chapters
    root: null, // the root folder
    main: 0,
    modal: {
        title: null,
        content: null
    },
    tabs: []
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
        state.folder = payload.folder
        state.file = payload.file
    },
    set_root (state, payload) {
        state.root = payload.root
    },
    add_tab (state, {name, content, folder}) {
        let shouldAdd = state.tabs.find( tab => (tab.name === name && tab.folder === folder) )

        if (!shouldAdd)
        {
            console.log('add tab')
            // state.tabs = [...state.tabs, {name, content, folder}]
            state.tabs.push({name, content, folder})
        }
    },
    close_tab (state, {name, folder}) {
        console.log('close tab', name, folder);
        state.tabs = state.tabs.filter( tab => (tab.name !== name || tab.folder !== folder))
    }
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
