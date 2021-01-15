const path = require('path');
const fs = require('fs');
const ws = require("windows-shortcuts")
var iconExtractor = require('icon-extractor')
const nid = require("nanoid")


function getShortcutData(pathToShortcut) {
    return new Promise((resolve, reject) => {
        ws.query(pathToShortcut, (err, data) => {
            if (err) return reject(err)
            
            function cb({Base64ImageData, Context}){
                if (Context == data.target) {
                    resolve({...data, Base64ImageData, id: nid.nanoid(10), 
                        name: path.basename(data.target).split(".")[0], isRunning: false });
                    iconExtractor.emitter.removeListener('icon', cb)
                }
            }
            
            iconExtractor.emitter.on('icon', cb);
            iconExtractor.getIcon(data.target, data.target);
        })
    })    
}

module.exports.getGames = async () => {
    const directoryPath = "C:\\Games"; 
    const files = fs.readdirSync(directoryPath);
    const GameShortcuts = files.filter(a => {
        if ( a.split(".")[1] == "lnk" ) return true;
        else return false;
    }).map(GameShortcut => {
        return getShortcutData(path.join(directoryPath, GameShortcut))
    })
    return await Promise.all(GameShortcuts)
}