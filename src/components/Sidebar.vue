<template src="./templates/Sidebar.html"></template>

<script>
    const electron = window.require('electron')
    const fs = window.require('fs')
    const path = require('path')
    import $ from 'jquery'

    import store from '@/store'

    export default {
        data() {
            return {
                files: {},
                folders: ['collections', 'chapters'],
                store
            }
        },
        computed: {
        },
        created() {
            this.update_files()
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
            add (folder) {
                let location = path.join(store.state.General.folder, folder)
                let filename = electron.remote.dialog.showSaveDialog({title: "New file", defaultPath: location});

                if (filename)
                {
                    fs.writeFile(filename, '', (err) => {
                        if (err)
                        {
                            console.error(err)
                        }
                    })
                    this.update_files()
                }
            },
            return_files (folder) {
                let location = path.join(store.state.General.folder, folder)
                var return_files;
                console.log()
                return fs.readdirSync(location)
            },
            update_files() {
                let obj = {}
                for (let folder of this.folders)
                {
                    this.$set(this.files, folder, this.return_files(folder))
                }
                console.log(this.files)
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
