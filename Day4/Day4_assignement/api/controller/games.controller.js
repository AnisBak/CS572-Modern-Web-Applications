
const dbConnection = require("../data/dbconnection");
const ObjectId= require("mongodb").ObjectId;



require("dotenv").config();



const getAll = function (req, res) {
    const db = dbConnection.get();
    const gamesCollection = db.collection("games");
    if (req.query && req.query.count) {
        if (req.query.count > 10)
            process.env.COUNT = 10;
        process.env.COUNT = parseInt(req.query.count, 10);
    }
    if (req.query && req.query.offset) {
        process.env.OFFSET = parseInt(req.query.offset, 10);
    }


    gamesCollection.find().skip(parseInt(process.env.OFFSET)).limit(parseInt(process.env.COUNT)).toArray(function (err, docs) {
        res.status(200).json(docs);
    })
}
const getOne = function (req, res) {
    const db = dbConnection.get();
    const gamesCollection = db.collection("games");
    const gameId = req.params.gameId;
    gamesCollection.findOne({ "_id": ObjectId(gameId) }, function (err, game) {
        res.status(200).json(game);
    })
}

const addOne = function (req, res) {
    const db = dbConnection.get();
    const gamesCollection = db.collection("games");
    const game = {};
    if (req.body && req.body.title && req.body.price && req.body.minPlayer && req.body.minAge) {
        game.title = req.body.title;
        game.price = parseFloat(req.body.price);
        if (req.body.minPlayer < 1 | req.body.minPlayer > 11)
            res.status(500).send("Number of player shoud be between 1 and 11");
        if (req.body.minAge < 9 | req.body.minAge > 99)
            res.status(500).send("Age should be between 9 and 99");
        game.minPlayer = req.body.minPlayer;
        game.minAge = req.body.minAge;
        console.log(game);
        gamesCollection.insertOne(game, function (err, response) {
            if (err) {
                res.status(500).json({err:err})
            }
            else {
                res.status(201).json(response);
            }
        })

    }

}

const deleteOne = function (req, res) {
    const db = dbConnection.get();
    const gamesCollection = db.collection("games");
    const gameId = req.body.gameId;
    console.log(req.body.gameId);
    gamesCollection.deleteOne({ "_id": ObjectId(gameId) },  function (err, game) {
        res.status(200).json(game);
    })


}


module.exports = {
    getOne,
    getAll,
    addOne,
    deleteOne
}



