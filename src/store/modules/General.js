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
    add_tab (state, {name, content}) {
        console.log('tabs here')
        console.log(name,content)
        let shouldAdd = true
        for (let tab of state.tabs)
        {
            if (tab.name === name)
            {
                console.log('break tab')
                shouldAdd = false
                break
            }
        }

        if (shouldAdd)
        {
            console.log('add tab')
            state.tabs = [...state.tabs, {name, content}]
        }
    },
    delete_tab (state, {name}) {
        state.tabs = state.tabs.filter( tab => tab.name !== name)
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
