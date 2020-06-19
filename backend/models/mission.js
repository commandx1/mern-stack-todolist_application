const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const missionSchema = new Schema({
    name: { type: String, required: true },
    card: { type: mongoose.Types.ObjectId, required: true, ref: "Card"},
    date: { type: Date },
    isDate: {type: Boolean},
    todos: [{type: mongoose.Types.ObjectId, required: true, ref: "Todo"}]
});

module.exports = mongoose.model('Mission', missionSchema);