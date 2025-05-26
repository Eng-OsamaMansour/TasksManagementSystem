const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const Message = require("./models/message");
const User = require("./models/user");

module.exports = function init(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("no token"));
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.userId;
      socket.role = payload.role;
      socket.join(socket.userId);
      next();
    } catch (err) {
      next(new Error("invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("WS connect", socket.userId);

    socket.on("send-message", async ({ toUserId, text }) => {
      if (!text?.trim()) return;
      const toUser = await User.findById(toUserId).select("role");
      if (!toUser) return;
      const illegal =
        (socket.role === "student" && toUser.role !== "admin") ||
        (socket.role === "admin" && toUser.role !== "student");
      if (illegal) return;

      const doc = await Message.create({
        from: socket.userId,
        to: toUserId,
        text,
      });

      const payload = await doc.populate(["from", "to"]);

      socket.emit("new-message", payload);

      io.to(toUserId).emit("new-message", payload);
    });

    socket.on("fetch-history", async ({ withUserId }) => {
      const msgs = await Message.find({
        $or: [
          { from: socket.userId, to: withUserId },
          { from: withUserId, to: socket.userId },
        ],
      })
        .sort({ createdAt: 1 })
        // grab only usernames to keep the payload small
        .populate("from", "username")
        .populate("to", "username");

      socket.emit("chat-history", msgs);
    });
  });
};
