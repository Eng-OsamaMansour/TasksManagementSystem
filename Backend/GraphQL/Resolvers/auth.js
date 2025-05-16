const bcrypt = require("bcryptjs");
const User = require("../../models/user");


module.exports = {
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
};
