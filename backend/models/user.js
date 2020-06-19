const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String },
  cards: [{ type: mongoose.Types.ObjectId, required: true, ref: "Card" }],
  background: {
    imageUrl: { type: String },
    left: { type: String },
    right: { type: String },
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
