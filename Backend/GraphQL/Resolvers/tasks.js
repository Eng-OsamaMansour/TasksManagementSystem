const Task = require("../../models/task");

module.exports = {
  /* ------- Queries ------- */
  tasks: async (_, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    const filter = req.role === "admin" ? {} : { assignedStudent: req.userId };
    const docs = await Task.find(filter)
      .populate("assignedStudent")
      .populate("project");
    return docs;
  },
  /* ------- Mutations -------*/
  createTask: async ({ TaskInput }) => {
    const t = new Task({
      name: TaskInput.name,
      description: TaskInput.description,
      status: TaskInput.status,
      dueDate: TaskInput.dueDate,
      assignedStudent: TaskInput.assignedStudentId,
    });
    const res = await t.save();
    return { ...res._doc, _id: res.id };
  },
  updateTaskStatus: async ({ _id, status }, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    const t = await Task.findById(_id);
    const isOwner = t.assignedStudent.toString() === req.userId;
    if (req.role !== "admin" && !isOwner) throw new Error("Forbidden");
    t.status = status;
    await t.save();
    return t.populate("assignedStudent project");
  },
};
