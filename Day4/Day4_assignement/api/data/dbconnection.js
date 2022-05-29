const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
let _connection = null;
console.log(process.env.DB_URL);
const open = function () {
    if (get() == null) {
        MongoClient.connect(process.env.DB_URL, function (err, client) {
            if (err) {
                console.log("DB connection failed");
                return;
            }
            _connection = client.db(process.env.DB_NAME);
            console.log("DB connection open", _connection);
        });
    }    
}


const get = function () {
    return _connection;
}

module.exports = {
    open, get

}