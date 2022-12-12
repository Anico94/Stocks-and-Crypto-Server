const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: "First name cannot be blank",
    },
    lastName: {
      type: String,
      required: "Last name cannot be blank",
    },
    email: {
      unique: true,
      type: String,
      required: "Email cannot be blank",
    },
    password: {
      type: String,
      required: "A passord is required",
    },
    watchlists: {
      type: Array,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", UserSchema);
