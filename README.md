
# Tasks Managment System

A Node.js **GraphQL + WebSocket** server with role‑based access control that manages **Users**, **Projects**, **Tasks** and real‑time **messaging** between admins and students. Data is persisted in **MongoDB Atlas** via **Mongoose**.

---

## ✨ Key Features
- **JWT‑secured GraphQL API** for CRUD on projects & tasks  
- **Role‑based guards** (Admin ↔ Student) enforced at resolver & schema level  
- **Socket.IO** chat with server‑side persistence and history retrieval  
- **Data seeding** script to import sample users, projects & tasks from a flat file  
- Comprehensive **validators** ensuring only students can be assigned to tasks/projects  
- Written in clean CommonJS style – instantly runnable on Node v18+

---

## 🏗️ Tech Stack
| Layer | Tech |
|-------|------|
| Runtime | **Node.js 18+** |
| Framework | **Express** |
| API | **GraphQL** (`express-graphql`) |
| Database | **MongoDB Atlas** + **Mongoose** |
| Auth | **jsonwebtoken** |
| Realtime | **Socket.IO** |
| Passwords | **bcryptjs** (12 rounds) |
| Config | **dotenv** |

---

## 📁 Project Structure
```text
.
├─ app.js                  # App entry point
├─ socket.js               # WebSocket bootstrapper
├─ GraphQL/
│  ├─ Schema/SchemaQL.js   # GraphQL schema
│  └─ Resolvers/           # Query & mutation logic
├─ middleware/isAuth.js    # JWT auth guard
├─ models/                 # Mongoose models
├─ helpers/
│  ├─ importData.js        # DB seeder
│  └─ ChatTester.js        # CLI chat client
└─ package.json
```

---

## 🚀 Quick Start

```bash
git clone <repo>
cd <repo>
cp .env.example .env     # fill MongoDB creds + JWT_SECRET
npm install
node app.js              # server on http://localhost:5000
```

### Seed Example Data
```bash
node helpers/importData.js
```

---

## 🔐 Environment Variables

| Key | Description |
|-----|-------------|
| `MONGO_USER` / `MONGO_PASSWORD` | Atlas credentials |
| `MONGO_DB` | DB name |
| `MONGO_URI` | **Optional** – full override URI |
| `JWT_SECRET` | Token signing key |
| `TOKEN_EXPIRES` | Token TTL (default `1d`) |
| `PORT` | Default `5000` |

---

## 🧑‍💻 Using the GraphQL API

**Login**
```graphql
mutation {
  login(username: "admin1", password: "pass123") {
    token role
  }
}
```

Include returned token in every request:
```
Authorization: Bearer <token>
```

**Fetch my projects**
```graphql
query {
  projects {
    _id title status students { username }
  }
}
```

---

## 🔌 WebSocket Chat

```js
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: { token: "<JWT>" }
});

socket.emit("send-message", { toUserId: "<peerId>", text: "Hello!" });

socket.on("new-message", (msg) => console.log(msg));
```

---

## 📜 NPM Scripts

| Script | Purpose |
|--------|---------|
| `start` | `node app.js` |
| `import-data` | Seed DB with helpers/importData.js |
| `chat-test` | `node helpers/ChatTester.js <jwt> [peerId]` |

*(Add these to `package.json` if not already present.)*

---

## 🧪 Testing
Recommended stack:
- **jest** + **supertest** for GraphQL endpoints  
- **mongodb-memory-server** for unit DB isolation  
- **socket.io-client** for WS integration tests  

---

## 🛡️ Security Notes
- Bcrypt hashing with 12 salt rounds – raise in production
- Limit Socket.IO CORS to trusted origins
- Add `express-rate-limit` + `helmet` for hardening
- Consider refresh-token flow & password‑reset endpoints

---

## 🤝 Contributing

1. Fork 🎉
2. Create feature branch: `git checkout -b feature/awesome`
3. Commit & push
4. Open PR

Run ESLint & unit tests before pushing:
```
npm run lint && npm test
```

---

## 📄 License
MIT – do whatever you want but give credit.

---

Happy hacking 💚
