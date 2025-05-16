const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["In Progress", "Completed", "Canceled", "Pending"],
    },
    dueDate: { type: String, required: true },
    assignedStudent: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async function (userId) {
          const u = await mongoose
            .model("User")
            .findById(userId)
            .select("role");
          return u && u.role === "student";
        },
        message: 'Assigned user must have role "student".',
      },
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
