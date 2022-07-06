
const mongoose = require("mongoose");
require("../data/games-model");
const Game = mongoose.model("Game");



require("dotenv").config();



const getAll = function (req, res) {
    let offset = process.env.OFFSET;
    let count = process.env.COUNT;
    let maxCount = process.env.MAX_COUNT;

    if (req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return;
    }
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ "message": "QueryString Offset and Count should be numbers" });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({ "message": "Cannot exceed count of " + maxCount });
        return;
    }

    Game.find().skip(offset).limit(count).exec(function (err, games) {
        if (err) {
            console.log("Error finding games");
            res.status(500).json(err);
        } else {
            console.log("Found games", games.length);
            res.status(200).json(games);
        }
    });
}


const getOne = function (req, res) {
    console.log("GET One Game Controller");
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function (err, game) {
        if (err) {
            console.log("Error finding game");
            res.status(500).json(err);
        } else if (!game) {
            console.log("Game id not found");
            res.status(404).json({ "message": "Game ID not found" });
        }
        else {
            console.log("Found game", game);
            res.status(200).json(game);
        }
    });
}

const addOne = function (req, res) {
    console.log("Game AddOne request");
    const newGame = {
        title: req.body.title,
        year: req.body.year,
        rate: req.body.rate,
        price: req.body.price,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        publisher: {
            name: "NoName"
        },
        reviews: [],
        minAge: req.body.minAge,
        designers: [req.body.designers]
    };
    Game.create(newGame, function (err, game) {
        const response = { status: 201, message: game };
        if (err) {
            console.log("Error creating game");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });

}

const _updateOne = function (req, res, updateGameCallback) {
    console.log("Update One Game Controller");
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function (err, game) {
        const response = { status: 204, message: game };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            console.log("Game id not found");
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            updateGameCallback(req, res, game, response);
        }
    });
}

const fullUpdateOne = function (req, res) {
    console.log("Full Update One Game Controller");
    const gameUpdate = function (req, res, game, response) {
        game.title = req.body.title;
        game.year = req.body.year;
        game.rate = req.body.rate;
        game.price = req.body.price;
        game.minPlayers = req.body.minPlayers;
        game.maxPlayers = req.body.maxPlayers;
        game.minAge = req.body.minAge;
        game.designers = req.body.designers;
        if (req.body.name) {
            console.log("Name passed");
            game.publisher = { name: req.body.name };
        } else {
            console.log("No Name passed");
            game.publisher = { name: "NoName" };
        }
        game.reviews = [];
        game.save(function (err, updatedGame) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            else {
                response.status = 201;
                response.message = updatedGame;
            }
            res.status(response.status).json(response.message);
        });
    }
    _updateOne(req, res, gameUpdate);
}

const partialUpdateOne = function (req, res) {
    console.log("Partial Update One Game Controller");
    const gameUpdate = function (req, res, game, response) {
        if (req.body.title) {
            game.title = req.body.title
                ;
        }
        if (req.body.year) {
            game.year = req.body.year
                ;
        }
        if (req.body.rate) {
            game.rate = req.body.rate
                ;
        }
        if (req.body.price) {
            game.price = req.body.price
                ;
        }
        if (req.body.minPlayers) {
            game.minPlayers = req.body.minPlayers
                ;
        }
        if (req.body.maxPlayers) {
            game.maxPlayers = req.body.maxPlayers
                ;
        }
        if (req.body.minAge) {
            game.minAge = req.body.minAge
                ;
        }
        if (req.body.designers) {
            game.designers = req.body.designers
                ;
        }
        if (req.body.publisher) {
            game.publisher = req.body.publisher
                ;
        }
        if (req.body.reviews) {
            game.reviews = req.body.reviews
                ;
        }
        game.save(function (err, updatedGame) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            else {
                response.status = 201;
                response.message = updatedGame;
            }
            res.status(response.status).json(response.message);
        });
    }
    _updateOne(req, res, gameUpdate);
}

const deleteOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId).exec(function (err, deletedGame) {
        const response = { status: 204, message: deletedGame };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!deletedGame) {
            console.log("Game id not found");
            response.status = 404;
            response.message = {
                "message": "Game ID not found"
            };
        }
        else {
            response.status = 200;
        }
            res.status(response.status).json(response.message);
        
    });
}


module.exports = {
    getOne,
    getAll,
    addOne,
    fullUpdateOne,
    partialUpdateOne,
    deleteOne

}



