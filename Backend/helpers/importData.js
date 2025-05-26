require('dotenv').config();
const fs        = require('fs');
const path      = require('path');
const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');

const User      = require('../models/user');
const Project   = require('../models/project');
const Task      = require('../models/task');

const syntheticUni = () => 'S' + Math.random().toString().slice(2, 7);


const mongoUri =
  process.env.MONGO_URI ||
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}` +
  `@cluster0.dbzdwkd.mongodb.net/${process.env.MONGO_DB}` +
  `?retryWrites=true&w=majority&appName=Cluster0`;

console.log('→ connecting to', mongoUri.replace(/\/\/.*?:.*?@/, '//<user>:<pwd>@'));

(async () => {
  await mongoose.connect(mongoUri);


  const rawLines = fs
    .readFileSync(path.join(__dirname, 'TestingData.txt'), 'utf8')
    .split(/\r?\n/);

  const users = [], projects = [], tasks = [];
  let section = null, obj = null;
  const flush = () => {
    if (!obj) return;
    if (section === 'USERS')    users.push(obj);
    if (section === 'PROJECTS') projects.push(obj);
    if (section === 'TASKS')    tasks.push(obj);
    obj = null;
  };

  for (const line0 of rawLines) {
    const line = line0.trim();
    if (!line) continue;

    if (/^USERS:/i.test(line))    { flush(); section = 'USERS';    continue; }
    if (/^PROJECTS:/i.test(line)) { flush(); section = 'PROJECTS'; continue; }
    if (/^TASKS:/i.test(line))    { flush(); section = 'TASKS';    continue; }
    if (/^-{5,}/.test(line))      { flush();                      continue; }

    switch (section) {
      case 'USERS':
        if (/^ID:/i.test(line)) { flush(); obj = {}; }
        line.split(',').forEach(p => {
          const [k, v] = p.split(':').map(t => t.trim());
          if (!k || !v) return;
          const key = k.toLowerCase().replace(/\s+/g, '');
          if (key === 'username')     obj.username     = v;
          if (key === 'password')     obj.password     = v;
          if (key === 'role')         obj.role         = v.toLowerCase();
          if (key === 'universityid') obj.universityID = v;
        });
        break;

      case 'PROJECTS':
        if (/^ID:/i.test(line))           { flush(); obj = { students: [] }; }
        else if (/^Title:/i.test(line))       obj.title       = line.slice(6).trim();
        else if (/^Description:/i.test(line)) obj.description = line.slice(12).trim();
        else if (/^Students:/i.test(line))    obj.students    = line.slice(9).split(',').map(s => s.trim());
        else if (/^Category:/i.test(line))    obj.category    = line.slice(9).trim();
        else if (/^Start Date:/i.test(line))  obj.startDate   = line.slice(11).trim();
        else if (/^End Date:/i.test(line))    obj.endDate     = line.slice(9).trim();
        else if (/^Status:/i.test(line))      obj.status      = line.slice(7).trim();
        break;

      case 'TASKS':
        if (/^ID:/i.test(line))             { flush(); obj = {}; }
        else if (/^Project:/i.test(line))     obj.project   = line.slice(8).trim();
        else if (/^Task:/i.test(line))        obj.name      = line.slice(5).trim();
        else if (/^Description:/i.test(line)) obj.description = line.slice(12).trim();
        else if (/^Assigned:/i.test(line))    obj.assigned  = line.slice(9).trim();
        else if (/^Status:/i.test(line))      obj.status    = line.slice(7).trim();
        else if (/^Due:/i.test(line))         obj.dueDate   = line.slice(4).trim();
        break;
    }
  }
  flush();
  console.log(`✔  parsed ${users.length} users, ${projects.length} projects, ${tasks.length} tasks`);

  await Promise.all([
    User.deleteMany({}),
    Project.deleteMany({}),
    Task.deleteMany({})
  ]);


  const usersHashed = await Promise.all(
    users.map(async u => {
      if (u.role === 'student' && !u.universityID) u.universityID = syntheticUni();
      return {
        ...u,
        password: await bcrypt.hash(u.password, 12)   // 12 salt rounds
      };
    })
  );

  const insertedUsers   = await User.insertMany(usersHashed);
  const uidByUsername   = Object.fromEntries(insertedUsers.map(u => [u.username, u._id]));


  const projectsReady = projects.map(p => ({
    ...p,
    students: p.students.map(un => uidByUsername[un]).filter(Boolean)
  }));

  const insertedProjects = await Project.insertMany(projectsReady);
  const pidByTitle       = Object.fromEntries(insertedProjects.map(p => [p.title, p._id]));

  const tasksReady = tasks
    .map(t => {
      const studentId = uidByUsername[t.assigned];
      const projId    = pidByTitle[t.project];
      if (!studentId || !projId) return null;              // skip bad refs
      return {
        project         : projId,
        name            : t.name,
        description     : t.description,
        assignedStudent : studentId,
        status          : t.status,
        dueDate         : new Date(t.dueDate)
      };
    })
    .filter(Boolean);


  await Task.insertMany(tasksReady);

  console.log('🎉  Import completed and passwords hashed!');
  process.exit(0);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
