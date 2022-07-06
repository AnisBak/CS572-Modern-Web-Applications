const mongoose = require("mongoose");


const locationSchema = new mongoose.Schema({
    address: String,
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})
const jobSchema = new mongoose.Schema({
    title: String,
    salary: Number,
    description: String,
    location: locationSchema,
    experience: Number,
    skills: [String],
    postDate: Date
})



mongoose.model("Job", jobSchema, "jobs");