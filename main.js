const electron = require("electron")
const url = require("url")
const path = require("path")

const {app, BrowserWindow, Menu, ipcMain} = electron;

let component_dir = path.join(__dirname, 'components')

let mainWindow;
let addWindow;

// Set environment
// process.env.NODE_ENV = "live"

app.on("ready", function() {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: "file:",
        slashes: true
    }));
    // Quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
})

// Handle add item window
function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    });
    addWindow.loadURL(url.format({
        pathname: path.join(component_dir, 'addWindow.html'),
        protocol: 'file:',
        slashes:true
    }));
    // Handle garbage collection
    addWindow.on('close', function(){
        addWindow = null;
    });
}

// Catch item:add
ipcMain.on('item:add', function(e, item){
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
    // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
    //addWindow = null;
});

// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label:'Add Item',
        click(){
          createAddWindow();
        }
      },
      {
        label:'Clear Items',
        click(){
          mainWindow.webContents.send('item:clear');
        }
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+shift+Q' : 'Ctrl+shift+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];


// If OSX, add empty object to menu
if (process.platform == 'darwin')
{
    mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if (process.env.NODE_ENV !== 'live')
{
    console.log(process.env.NODE_ENV)
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
}
