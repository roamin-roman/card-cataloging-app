const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./CardData");

app.use(bodyParser.json());

const CardData = mongoose.model("card");

const mongoUri = "";

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to Mongo");
});
mongoose.connection.on("error", (err) => {
    console.log("Connection Error", err);
});

app.get("/", (req, res) => {
    CardData.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/send-data", (req, res) => {
    const card = new CardData({
        name: req.body.name,
        brand: req.body.brand,
        year: req.body.year,
        picture: req.body.picture,
        price: req.body.price,
        condition: req.body.condition,
    });
    card.save()
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/delete", (req, res) => {
    CardData.findByIdAndRemove(req.body.id)
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/update", (req, res) => {
    CardData.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        brand: req.body.brand,
        year: req.body.year,
        picture: req.body.picture,
        price: req.body.price,
        condition: req.body.condition,
    })
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.listen(3000, () => {
    console.log("Server Running");
});
