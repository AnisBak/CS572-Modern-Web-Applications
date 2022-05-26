const gamesdata = require("../data/games.json");

const getAll = function (req, res) {
    
    if (req.query && req.query.count) {
        count = req.query.count;
    }
    if (req.query && req.query.offset) {
        offset = req.query.offset; // This won't be yellow in the log but numbers will yellow "This is amazing"
    }
    res.status(200).json(gamesdata.slice(offset, offset+count));//chunks (Convention over configuration)
}
const getOne = function (req, res) {
    res.status(200).json(gamesdata[req.params.x]);
    
}
module.exports.getAll = {
    getAll,
    getOne
}// this is seperation of concerns routing is in another file and modifying data (business logic) in this one

