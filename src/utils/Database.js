const GameManager = require("./GameManager")

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
    games: []
}).write()

module.exports.SyncGames = async () => {
    return new Promise(async (resolve, reject) => {
        const games = (await GameManager.getGames()).map(
            (game) => {
                return {target: game.target,
                Base64ImageData: game.Base64ImageData,
                id: game.id, name: game.name}
            }
        )
        games.forEach(game => {
            if(!db.get("games").find({target: game.target}).value()) {
                db.get("games").push(game).write()
            }
        })
        resolve()
        
    })
}

module.exports.getGames = async () => {
    return new Promise((resolve, reject) => {
        resolve(db.get("games").value())
    })
}

module.exports.SyncGames()