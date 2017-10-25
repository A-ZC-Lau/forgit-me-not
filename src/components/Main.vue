<template src="./templates/Main.html">
</template>

<script>
    const electron = window.require('electron')
    const fs = window.require('fs')

    export default {
        methods: {
            open_folder() {
                // alert('open folder')
                let folder = electron.remote.dialog.showOpenDialog({properties: ['openDirectory']});
                console.log(folder[0]);
                // fs.readdir('.', function(dir) {
                //     console.log(dir);
                //     // es6
                //     //   for(let filePath of dir) {
                //     //     console.log(filePath);
                //     //   }
                // });
                fs.writeFile('./fs-test.txt', 'fs test', (err) => console.log('could not write', err))
            }
        }
    }
</script>

<style>

</style>
