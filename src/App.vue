<template>
    <div id="app">
        <aside id="sidebar">
            Side bar
        </aside>
        <router-view class='main-view'/>
    </div>
</template>

<script>
    const electron = window.require('electron')
    // const fs = window.require("fs")
    const { Menu, MenuItem } = electron.remote
    import $ from 'jquery'
    require('jquery-ui/ui/widgets/resizable.js')
    require('jquery-ui/themes/base/resizable.css')
    // import('jquery-ui/')

    export default {
        name: 'app',
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
                label: app.getName(),
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


            // pop up menu
            const popup_menu = new Menu()
            popup_menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
            popup_menu.append(new MenuItem({type: 'separator'}))
            popup_menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

            window.addEventListener('contextmenu', (e) => {
              e.preventDefault()
              popup_menu.popup(electron.remote.getCurrentWindow())
            }, false)
        },
        mounted () {
            $( "#sidebar" ).resizable({
                maxHeight: "100vh",
                minWidth: 100
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
        text-align: center;
        color: #2c3e50;
        display: flex;
        height: 100vh;
        overflow: hidden;
    }

    aside {
        background-color: lightblue;
        resize: horizontal;
        width: 250px;
    }

    .main-view {
        background-color: orange;
        flex-grow: 1;
    }

</style>
