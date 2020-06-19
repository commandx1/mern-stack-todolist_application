const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    task: { type: String, required: true },
    completed: {type: Boolean},
    mission: { type: mongoose.Types.ObjectId, required: true, ref: "Mission"}
});

module.exports = mongoose.model("Todos", todoSchema);