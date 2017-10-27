<template src="./templates/Sidebar.html"></template>

<script>
    const electron = window.require('electron')
    const { Menu, MenuItem } = electron.remote
    const fs = window.require('fs')
    const path = require('path')
    const url = require('url')
    import $ from 'jquery'

    import Modal from '@/components/Modal'
    import store from '@/store'
    import { save_file, select_root } from '@/global.js'

    export default {
        data() {
            return {
                files: {},
                folders: ['collections', 'chapters'],
                store
            }
        },
        components: {
            'Modal': Modal
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

            electron.remote.ipcMain.on('item:add', function(e, item){
                mainWindow.webContents.send('item:add', item);
                addWindow.close();
            });
        },
        methods: {
            add (folder) {
                let location = path.join(store.state.General.root, folder)
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
            add_thing () {
                var win = new electron.remote.BrowserWindow({
                    height: 300,
                    width: 500,
                    title: "open test"
                })

                let live = false
                let format = live ?
                    url.format({
                        pathname: path.join(__dirname, 'dist/index.html#input'),
                        protocol: 'file:',
                        slashes: true,
                    })
                    :
                    'http://localhost:8080/#/input'
                win.loadURL(format);

                win.on('close', function () {
                    win = null
                })
            },
            load_file ({folder, file}) {
                // save current file first
                save_file()

                // load new file
                let new_location = path.join(store.state.General.root, folder, file);
                let content = fs.readFileSync(new_location, 'utf8')

                console.log(content)

                if (folder === "collections")
                {
                    content = JSON.parse(content)
                }
                store.commit('set_content', {folder, content, file})
            },
            select_root,
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
