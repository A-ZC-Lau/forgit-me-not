<template src="./templates/Main.html">
</template>

<script>
    const electron = window.require('electron')
    const fs = window.require('fs')
    import store from '@/store'
    import $ from 'jquery'
    var autosize = require('autosize')

    export default {
        data() {
            return {
                store
            }
        },
        mounted() {
            autosize(this.$refs.textarea)
        },
        methods: {
            insert_tab() {
                var t = this.$refs.textarea
                var start = t.selectionStart
                var end = t.selectionEnd
                t.value = t.value.substring(0, start) + "\t" + t.value.substring(end)
                t.selectionStart = t.selectionEnd = start + 1;
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
</style>
