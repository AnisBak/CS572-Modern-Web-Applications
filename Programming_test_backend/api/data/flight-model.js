const mongoose = require("mongoose");



const airlineSchema = mongoose.Schema({
    name: String,
    alias: String,
    iata:String
})


const flightSchema = new mongoose.Schema({
    airline: airlineSchema,
    srcAirport: String,
    desAirport: String,
    stops: Number,
    airplane:String
})



mongoose.model("Flight", flightSchema, "flights")