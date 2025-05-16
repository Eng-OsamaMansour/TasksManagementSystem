const Task = require("../../models/task");

module.exports = {
  /* ------- Quires ------- */
  tasks: async () => {
    const docs = await Task.find();
    return docs.map((d) => ({ ...d._doc, _id: d.id }));
  },
  /* ------- Mutations -------*/
  createTask: async ({ TaskInput }) => {
    const t = new Task({
      name: TaskInput.name,
      description: TaskInput.description,
      status: TaskInput.status,
      dueDate: TaskInput.dueDate,
    });
    const res = await t.save();
    return { ...res._doc, _id: res.id };
  },
};
