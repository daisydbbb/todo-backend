// mongoose schemas
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: {
    // link to user's _id
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: { type: String, required: true, trim: true },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
