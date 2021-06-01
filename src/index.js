const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
  });
  mainWindow.maximize()
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


const express = require('express');

let app1 = express();

let server = app1.listen(3000);



app1.get('/', function(req, res){
    var data = req.query
    res.send('Server is ready!');
    receiveData(data);
});

function datetime() {
  var d = new Date();
  var n = d.toDateString();
  var t = d.toLocaleTimeString();

  return [n, t];
}
var updateParam = [];
var imgpath = '';
function receiveData(data){
    dt = datetime();
    updateParam = [
    {
      date: "Date", date_val: dt[0],
      time: "Time", time_val: dt[1],
      licen: "ทะเบียนรถ", licen_val: data.licen,
      provin: "จังหวัด", provin_val:  data.provin
      , brand: "ยี่ห้อรถ", brand_val:  data.brand,
      color: "สี", color_val: data.color,
      iso: "ISO CODE", iso_val: data.iso
    },
  ];
  imgpath = data.path;

const fs = require('fs');

fs.writeFile("value.json", JSON.stringify(updateParam), function writeJSON(err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(updateParam),null, 2);
});
fs.writeFile("path.json", JSON.stringify(imgpath), function writeJSON(err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(imgpath),null, 2);
});
}