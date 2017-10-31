<template src='./App.html'></template>

<script>
    const electron = window.require('electron')
    // const fs = window.require("fs")
    const { Menu, MenuItem } = electron.remote

    const path = require('path');

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
</style>
