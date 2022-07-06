const mongoose = require("mongoose");
require("../data/flight-model");
const Flight = mongoose.model("Flight");



const getAll = function (req, res) {
    console.log("GET all flights controller");

    let offset = process.env.OFFSET;
    let count = process.env.COUNT;
    //let maxCount = process.env.MAXCOUNT;


    Flight.find().skip(offset).limit(count).exec(function (err, flights) {
        console.log("in the find method");
        if (err) {
            console.log("error finding flights");
            res.status(500).json(err);
        }
        else {
            console.log("Found Flights");
            res.status(200).json(flights);
        }
        
    });
}

const getOne = function (req, res) {
    console.log("GET one flight Controller");
    const flightId = req.params.flightId
    Flight.findById(flightId).exec(function (err, flight) {
        if (err) {
            console.log("Error finding flight");
            res.status(500).json(err);
        }
        else if (!flight) {
            console.log("Flight id not found");
            res.status(404).json({ "Message": "Job ID not found" });

        }
        else {
            console.log("Found flight", flight);
            res.status(200).json(flight);
}
    })
}

module.exports = {
    getAll, getOne
}