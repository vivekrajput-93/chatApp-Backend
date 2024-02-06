const mongoose = require("mongoose");


const connection = async() => {
    await mongoose.connect("mongodb://127.0.0.1/chatApp");
}

module.exports = connection;