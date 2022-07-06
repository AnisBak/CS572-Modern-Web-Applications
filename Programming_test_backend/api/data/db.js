const mongoose = require("mongoose");

require("dotenv").config();
console.log(process.env.DB_URL);
console.log(process.env.DB_NAME);


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function () {
    console.log("Mongoose is connected to "+ process.env.DB_NAME);
})

mongoose.connection.on("disconnected", function () {
    console.log("Mongoose is disconnected");
});

mongoose.connection.on("error", function (error) {
    console.log("Mongoose connection error" + error);
});

process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });
});

process.on("SIGTERM", function () {
    mongoose.connection.close(function () {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    });
});

process.on("SIGUSR2", function () {
    mongoose.connection.close(function () {
        console.log(process.env.SIGUSR2_MESSAGE);
        process.kill(process.pid, "SIGUSR2");
    });
});