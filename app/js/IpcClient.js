
const sgb = document.getElementById("SyncGamesButton")
const { ipcRenderer } = require('electron')
ipcRenderer.on('games-update-async', (event, arg) => {
    if (sgb) {
        sgb.innerHTML = "Sync Games"
        sgb.classList.remove("sync-disabled")
    }
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
    if (sgb){
        sgb.innerHTML = "Syncing Games...."
        sgb.classList.add("sync-disabled")
    }
    ipcRenderer.send('sync-games', 'ping')
}

if (sgb) sgb.click = gamesSync;
