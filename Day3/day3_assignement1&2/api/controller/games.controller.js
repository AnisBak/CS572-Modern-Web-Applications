const gamesData = require("../data/games.json");

module.exports.getAll = function (req, res) {
    console.log("JSON get request received");

    res.status(200).json(gamesData);
}



 