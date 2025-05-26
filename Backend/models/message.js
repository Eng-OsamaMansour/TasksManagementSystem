const { Schema, model, Types } = require("mongoose");

const messageSchema = new Schema(
  {
    from: { type: Types.ObjectId, ref: "User", required: true },
    to: { type: Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Message", messageSchema);
