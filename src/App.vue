<template>
    <div id="app">
        <img src="./assets/logo.png">
        <router-view/>
    </div>
</template>

<script>
    const electron = window.require('electron')

    export default {
        name: 'app',
        created() {
            const mainMenuTemplate = []
            mainMenuTemplate.push({
              label: 'Developer Tools',
              submenu:[
                {
                  role: 'reload'
                },
                {
                  label: 'Toggle DevTools',
                  accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                  click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                  }
                }
              ]
            });
            const mainMenu = electron.remote.Menu.buildFromTemplate(mainMenuTemplate);
            // Insert menu
            electron.remote.Menu.setApplicationMenu(mainMenu);
        }
    }
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
