const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    length: String
});



const albumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
   
    songs: [songSchema]
});



mongoose.model(process.env.ALBUM_MODEL, albumSchema, process.env.ALBUM_COLLECTION);


