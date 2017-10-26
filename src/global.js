const electron = window.require('electron')
const path = require('path')
const fs = window.require('fs')
import store from '@/store'

export var select_root = function() {
    let the_root = electron.remote.dialog.showOpenDialog({properties: ['openDirectory']});
    if (!the_root)
    {
        return;
    }
    the_root = the_root[0]

    let folders = ["collections", "chapters"]
    for (let folder of folders)
    {
        let location = path.join(the_root, folder)
        if (!fs.existsSync(location)){
            fs.mkdirSync(location);
        }
    }

    store.commit('set_root', {root: the_root})
}
