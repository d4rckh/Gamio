const { ipcRenderer } = require('electron')
ipcRenderer.on('games-update-async', (event, arg) => {
    document.getElementById("SyncGamesButton").innerHTML = "Sync Games"
    document.getElementById("SyncGamesButton").classList.remove("sync-disabled")
    console.log(arg)
    games = arg
    updateGames()
})

ipcRenderer.on("games-update-status", (event, data) => {
    games.filter(a => a.target == data)[0].isRunning = true
    updateGames()
})

ipcRenderer.send('get-games-async', 'ping')

setTimeout(() => {
    ipcRenderer.send('get-games-status', 'ping')
}, 1000);


const gamesSync = () => {
    console.log("click")
    document.getElementById("SyncGamesButton").innerHTML = "Syncing Games...."
    document.getElementById("SyncGamesButton").classList.add("sync-disabled")
    ipcRenderer.send('sync-games', 'ping')
}


document.getElementById("SyncGamesButton").click = gamesSync;
