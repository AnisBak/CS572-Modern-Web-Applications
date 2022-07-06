const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        
    },
    username: {
        unique :true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 3
    }
});

mongoose.model(process.env.USER_MODEL, userSchema, process.env.USER_COLLECTION);
