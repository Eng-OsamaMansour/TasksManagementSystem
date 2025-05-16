const Project = require("../../models/project");

module.exports = {
  /* ------- Queries ------- */
  projects: async (_, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    if (req.role === "admin") {
      return Project.find().populate("students");
    }
    const docs = await Project.find({ students: req.userId }).populate(
      "students"
    );
    return docs;
  },
  /* ------- Mutations -------*/
  createProject: async ({ ProjectInput }) => {
    if (!req.isAuth || req.role !== "admin") throw new Error("Forbidden");
    const proj = new Project({
      title: ProjectInput.title,
      description: ProjectInput.description,
      category: ProjectInput.category,
      startDate: new Date(ProjectInput.startDate),
      endDate: new Date(ProjectInput.endDate),
      status: ProjectInput.status,
      students: ProjectInput.studentIds,
    });
    const res = await proj.save();
    return { ...res._doc, _id: res.id };
  },
  deleteProject: async ({ _id }, req) => {
    if (!req.isAuth || req.role !== "admin") throw new Error("Forbidden");
    await Project.findByIdAndDelete(_id);
    await Task.deleteMany({ project: _id }); // cascade delete tasks
    return true;
  },
};
