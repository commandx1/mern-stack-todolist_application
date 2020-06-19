const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    header: { type: String, required: true },
    kullanici: { type: mongoose.Types.ObjectId, required: true, ref: "User"},
    missions: [{ type: mongoose.Types.ObjectId, required: true, ref: "Mission"}]
});

module.exports = mongoose.model('Card', cardSchema);