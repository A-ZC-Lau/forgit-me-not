<template src="./templates/Sidebar.html"></template>

<script>
    const electron = window.require('electron')
    const { Menu, MenuItem } = electron.remote
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
            // pop up menu
            const popup_menu = new Menu()
            popup_menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
            popup_menu.append(new MenuItem({type: 'separator'}))
            popup_menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))
            this.$refs.wrapper.addEventListener('contextmenu', (e) => {
                e.preventDefault()
                popup_menu.popup(electron.remote.getCurrentWindow())
            }, false)


        },
        methods: {
            add (folder) {
                let location = path.join(store.state.General.folder, folder)
                let filename = electron.remote.dialog.showSaveDialog({title: "New file", defaultPath: location});

                if (filename)
                {
                    let content = folder === "collections" ? "{}" : ""
                    fs.writeFile(filename, content, (err) => {
                        if (err)
                        {
                            console.error(err)
                        }
                    })
                    this.update_files()
                }
            },
            load_file ({folder, file}) {
                // save current file first
                let { root, folder: old_folder, file: old_file } = store.state.General

                console.log("root: ", root)
                console.log("oldfolder: ", old_folder)
                if (old_folder !== null && old_file !== null)
                {
                    let old_location = path.join(root, old_folder, old_file);
                    console.log(old_location);
                    // let old_content = $("#textarea").val()
                    // fs.writeFile(old_location, old_content, (err) => {
                    //     if (err)
                    //     {
                    //         console.error(err)
                    //     }
                    // })
                }

                // load new file
                let new_location = path.join(store.state.General.folder, folder, file);
                let content = fs.readFileSync(new_location, 'utf8')

                if (folder === "collections")
                {
                    content = JSON.parse(content)
                }
                store.commit('set_content', {folder, content, file})
            },
            return_files (folder) {
                let location = path.join(store.state.General.root, folder)
                let files = fs.readdirSync(location);

                files = files.filter( file => !file.match(/^\./) )

                return files
            },
            update_files() {
                let obj = {}
                for (let folder of this.folders)
                {
                    this.$set(this.files, folder, this.return_files(folder))
                }
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
