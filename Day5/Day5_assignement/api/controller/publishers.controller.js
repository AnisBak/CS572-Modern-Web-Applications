const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);




const getOne = function (req, res) {
    console.log("GET One Publisher Controller");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        console.log("Found publisher ", game.publisher, " for Game ", game);
        res.status(200).json(game.publisher);
    });
}



module.exports = {
    getOne: getOne
}
