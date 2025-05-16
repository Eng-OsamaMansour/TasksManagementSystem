const bcrypt = require("bcryptjs");
const User = require("../../models/user");

module.exports = {
  students: async (_, req) => {
    if (!req.isAuth || req.role !== "admin") throw new Error("Forbidden");
    return User.find({ role: "student" });
  },

  createUser: (args) => {
    return bcrypt
      .hash(args.UserInput.password, 12)
      .then((hashedPassword) => {
        const u = new User({
          username: args.UserInput.username,
          password: hashedPassword,
          role: args.UserInput.role,
          universityID: args.UserInput.universityID,
        });
        return u.save();
      })
      .then((result) => {
        return { ...result._doc, password: null, _id: result.id };
      })
      .catch((err) => {
        throw err;
      });
  },
  login: async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Incorrect password");
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES || "1d" }
    );
    return { userId: user.id, token, role: user.role };
  },
};
