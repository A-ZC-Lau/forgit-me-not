<template src='./App.html'></template>

<script>
    const electron = window.require('electron')
    // const fs = window.require("fs")
    const { Menu, MenuItem } = electron.remote
    import $ from 'jquery'
    require('jquery-ui/ui/widgets/resizable.js')
    require('jquery-ui/themes/base/resizable.css')
    const fs = window.require('fs')
    // import('jquery-ui/')

    import store from '@/store'
    import Main from '@/components/Main'
    import Sidebar from '@/components/Sidebar'
    const path = require('path');

    export default {
        name: 'app',
        components: {
            'writing': Main,
            'sidebar': Sidebar
        },
        data() {
            return {
                store,
                the_component: ""
            }
        },
        methods: {
            open_folder() {
                let the_folder = electron.remote.dialog.showOpenDialog({properties: ['openDirectory']});
                the_folder = the_folder[0]

                let folders = ["collections", "chapters"]
                for (let folder of folders)
                {
                    let location = path.join(the_folder, folder)
                    if (!fs.existsSync(location)){
                        fs.mkdirSync(location);
                    }
                }

                store.commit('set_folder', {folder: the_folder})
            }
        },
        created() {
            const template = [
                {
                    label: "File",
                    submenu: [
                        {role: 'save'}
                    ]
                },
                {
                    label: 'Edit',
                    submenu: [
                        {role: 'undo'},
                        {role: 'redo'},
                        {type: 'separator'},
                        {role: 'cut'},
                        {role: 'copy'},
                        {role: 'paste'},
                        {role: 'pasteandmatchstyle'},
                        {role: 'delete'},
                        {role: 'selectall'}
                    ]
                },
                {
                    label: 'View',
                    submenu: [
                        {type: 'separator'},
                        {role: 'resetzoom'},
                        {role: 'zoomin'},
                        {role: 'zoomout'},
                        {type: 'separator'},
                        {role: 'togglefullscreen'}
                    ]
                },
                {
                    role: 'window',
                    submenu: [
                        {role: 'minimize'},
                        {role: 'close'}
                    ]
                },
                {
                    role: 'help',
                    submenu: [
                        {
                            label: 'Learn More',
                            click () { electron.shell.openExternal('https://electron.atom.io') }
                        }
                    ]
                },
                {
                    label: 'Developer Tools',
                    submenu:[
                        {role: 'reload'},
                        {role: 'forcereload'},
                        {role: 'toggledevtools'}
                    ]
                },
            ]

            if (electron.remote.process.platform === 'darwin') {
              template.unshift({
                label: electron.remote.app.getName(),
                submenu: [
                  {role: 'about'},
                  {type: 'separator'},
                  {role: 'services', submenu: []},
                  {type: 'separator'},
                  {role: 'hide'},
                  {role: 'hideothers'},
                  {role: 'unhide'},
                  {type: 'separator'},
                  {role: 'quit'}
                ]
              })

              // Edit menu
              template[1].submenu.push(
                {type: 'separator'},
                {
                  label: 'Speech',
                  submenu: [
                    {role: 'startspeaking'},
                    {role: 'stopspeaking'}
                  ]
                }
              )

              // Window menu
              template[3].submenu = [
                {role: 'close'},
                {role: 'minimize'},
                {role: 'zoom'},
                {type: 'separator'},
                {role: 'front'}
              ]
            }

            const menu = Menu.buildFromTemplate(template)
            Menu.setApplicationMenu(menu)
        },
        mounted () {
            $( "#sidebar" ).resizable({
                maxHeight: "100vh",
                minWidth: 140
            });
        }
    }
</script>

<style>
    body, html {
        margin: 0px;
        padding: 0px;
    }
</style>
<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        display: flex;
        height: 100vh;
        overflow: hidden;
        text-align: center;
        width: 100vw;
    }

    #select_folder {
        align-items: center;
        background-color: lightblue;
        display: flex;
        font-size: 2.5em;
        justify-content: center;
        height: 100%;
        width: 100%;
    }

    aside {
        background-color: lightblue;
        resize: horizontal;
        width: 250px;
    }

    main {
        flex-grow: 1;
    }
</style>
