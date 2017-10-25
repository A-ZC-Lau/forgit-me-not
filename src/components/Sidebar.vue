<template src="./templates/Sidebar.html"></template>

<script>
    const fs = window.require('fs')
    const path = require('path')
    import $ from 'jquery'

    import store from '@/store'

    export default {
        data() {
            return {
                folders: ['collections', 'chapters'],
                store
            }
        },
        computed: {
            files() {
                let obj = {}

                for (let folder in this.folders)
                {
                    obj[folder]
                }
            },
            chapters() {
                return this.return_files('chapters')
            },
            collections() {
                return this.return_files('collections')
            },
        },
        mounted() {
            $( "#sidebar" ).resizable({
                maxHeight: 250,
                maxWidth: 350,
                minHeight: 150,
                minWidth: 200
            });
        },
        methods: {
            return_files (folder) {
                let location = path.join(store.state.General.folder, folder)
                var return_files;
                return fs.readdirSync(location)
            }
        }
    }
</script>

<style scoped>
    article:hover {
        cursor: default;
    }
    article + article {
        border-top: 5px solid grey;
    }

    div {
        margin: 10px 0;
    }

    header {
        font-size: 1.5em;
        padding: 0.5em;
        border-bottom: 1.5px solid grey;
    }
    ul {
        padding: 0;
        margin: 0;
    }
    li {
        list-style-type: none;
        margin: 0;
        padding: 0.5em 0;
    }
    li:hover {
        background-color: rgba(0, 0, 0, 0.3);
    }
</style>
