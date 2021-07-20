const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    name: String,
    brand: String,
    year: String,
    picture: String,
    price: String,
    condition: String,
});

mongoose.model("card", CardSchema);
