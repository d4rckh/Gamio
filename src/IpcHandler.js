const GameManager = require("./utils/GameManager")
const Database = require("./utils/Database")
const path = require("path");
const { resolve } = require("path");
const exec = require('child_process').exec;

           
const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

async function checkRunning(event) {
    const games = await Database.getGames()
    games.forEach(async game => {
        
        isRunning(path.basename(game.target), async (running) => {
            if (running) {
                event.reply('games-update-status', game.target)
            }
        })
    })
}

module.exports.handleIpc = (ipcMain) => {
    ipcMain.on('get-games-async', async (event, arg) => {       
        event.reply("games-update-async", await Database.getGames())
    }) 

    ipcMain.on('sync-games', async (event, arg) => {    
        console.log("Syncing")   
            Database.SyncGames().then(async () => {
                console.log("SYNCED")
                event.reply("games-update-async", await Database.getGames())            
            })
    }) 


    ipcMain.on('get-games-status', async (event, arg) => {       
        (await checkRunning(event))
    }) 
}