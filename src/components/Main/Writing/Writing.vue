<template src="./Writing.html">
</template>

<script>
    const electron = window.require('electron')
    const fs = window.require('fs')
    import store from '@/store'
    import $ from 'jquery'
    var autosize = require('autosize')
    const path = require('path')
    require('uikit/dist/js/uikit.min.js')
    require('uikit/dist/css/uikit.min.css')

    import Vue from 'vue'
    import Modal from '@/components/Modal'
    import CollectionList from '@/components/Main/Writing/CollectionList/CollectionList'
    // import { save_file } from '@/global.js'

    var collection = Vue.component('collection', {
        computed: {
            new_counter: function() {
                return this.counter - 1
            }
        },
        props: [
            "counter"
        ],
        template: `
            <div v-if="counter > 0">
                stats
                <collection :counter="new_counter"></collection>
            </div>
        `
    })

    export default {
        components: {
            'CollectionList': CollectionList,
            'collection': collection,
            'Modal': Modal
        },
        data() {
            return {
                store,
                type: null
            }
        },
        computed: {
            folder: function() {
                return store.state.General.folder
            },
            tabs: function() {
                // let tabs = Array(20).fill().map( (v,i) => { return { folder: "test", name: "test"+i } } )
                // return tabs
                return store.state.General.tabs
            }
        },
        mounted() {
            autosize(this.$refs.textarea)
            console.log(store.state.General.folder);
        },
        methods: {
            add_group() {

            },
            add_item(value) {
                console.log("add item", value)
            },
            change_type(type) {
                this.type = type
            },
            save_file() {
                let active = $("ul.uk-tab li.uk-active")[0]
                let file = $(active).data('file');
                let folder = $(active).data('folder')

                let { root } = store.state.General
                if (folder === "chapters")
                {
                    let location = path.join(root, folder, file);
                    let content = $("#textarea").val()
                    fs.writeFile(location, content, (err) => {
                        if (err)
                        {
                            console.error(err)
                        }
                    })
                }
            },
            close_tab({name, folder}) {
                store.commit("close_tab", {name, folder})
                console.log("tab close")
            },
            insert_tab(event) {
                var t = event.target
                var start = t.selectionStart
                var end = t.selectionEnd
                t.value = t.value.substring(0, start) + "\t" + t.value.substring(end)
                t.selectionStart = t.selectionEnd = start + 1;
            },
            show_files() {
                console.log(store.state.General.tabs);
            }
        },
        watch: {
            folder: function() {
                if (store.state.General.folder === "chapters")
                {
                    this.$nextTick( function() {
                        autosize(this.$refs.textarea)
                    })
                }
            }
        }
    }
</script>

<style scoped>
    section {
        background-color: none;
        flex: 1;
        max-height: 100vh;
        overflow: auto;
        text-align: left;
        width: 100%;
        max-width: 100%;
    }

    textarea {
        box-sizing: border-box;
        border: 1px solid black;
        resize: none;
        padding: 0.5em;
        tab-size: 1.5em;
        width: 100%;
    }

    #textarea-wrapper {
        padding: 0.5em;
    }

    .hover.padding {
        color: grey;
    }
    .hover:hover {
        color: black;
    }
</style>
