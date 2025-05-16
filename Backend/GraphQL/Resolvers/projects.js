const Project = require("../../models/project");

module.exports = {
  /* ------- Quires ------- */
  projects: async () => {
    const docs = await Project.find();
    return docs.map((d) => ({ ...d._doc, _id: d.id }));
  },
  /* ------- Mutations -------*/
  createProject: async ({ ProjectInput }, req) => {
    const proj = new Project({
      title: ProjectInput.title,
      description: ProjectInput.description,
      category: ProjectInput.category,
      startDate: new Date(ProjectInput.startDate),
      endDate: new Date(ProjectInput.endDate),
      status: ProjectInput.status,
    });
    const res = await proj.save();
    return { ...res._doc, _id: res.id };
  },
};
