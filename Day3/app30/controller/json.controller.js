
module.exports.json = function (req, res) {
    res.status(200).json({ "JSON Data": "True" })
};// this is seperation of concerns routing is in another file and modifying data (business logic) in this one