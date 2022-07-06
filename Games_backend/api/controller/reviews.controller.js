const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);




const getAll = function (req, res) {
    console.log("GET Reviews Controller");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        console.log("Found reviews ", game.reviews, " for Game ", game);
        res.status(200).json(game.reviews);
    });
}



const getOne = function (req, res) {
    console.log("GET One review Controller");
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        console.log("Found review ", game.reviews.id(reviewId), " for Game ", game);
        res.status(200).json(game.reviews.id(reviewId));
    });
}

const addOne = function (req, res) {
    console.log("Add One Review Controller");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        console.log("Found game ", game);
        const response = { status: 200, message: game };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            console.log("Error finding game");
            response.status = 404;
            response.message = { "message": "Game ID not found " + gameId };
        }
        if (game) {
            _addReviews(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }
    });


}

const _addReviews = function (req, res, game) {

    game.reviews = req.body
    game.save(function (err, updatedGame) {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedGame.reviews;
        }
        res.status(response.status).json(response.message);
    });
}


module.exports = {
    getAll,
    getOne,
    addOne
}