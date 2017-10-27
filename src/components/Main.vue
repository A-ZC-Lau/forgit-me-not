<template src="./templates/Main.html">
</template>

<script>
    const electron = window.require('electron')
    const fs = window.require('fs')
    import store from '@/store'
    import $ from 'jquery'
    var autosize = require('autosize')
    const path = require('path')

    import Vue from 'vue'
    import { save_file } from '@/global.js'

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
            'collection': collection
        },
        data() {
            return {
                store
            }
        },
        computed: {
            folder: function() {
                return store.state.General.folder
            }
        },
        mounted() {
            autosize(this.$refs.textarea)
        },
        methods: {
            add_group() {

            },
            add_item() {

            },
            insert_tab() {
                var t = this.$refs.textarea
                var start = t.selectionStart
                var end = t.selectionEnd
                t.value = t.value.substring(0, start) + "\t" + t.value.substring(end)
                t.selectionStart = t.selectionEnd = start + 1;
            },
            save_file
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
        background-color: orange;
        flex: 1;
        overflow: auto;
        max-height: 100vh;
        width: 100%;
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
</style>
