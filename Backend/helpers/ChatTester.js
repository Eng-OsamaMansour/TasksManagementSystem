
const { io } = require('socket.io-client');
const readline = require('readline');
const jwtDecode = (token) =>
  JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());

const jwt   = process.argv[2];
let   peer  = process.argv[3];           

if (!jwt) {
  console.error('Usage: node ChatTester.js <jwt> [peerUserId]');
  process.exit(1);
}
const myId = jwtDecode(jwt).userId;       

const rl = readline.createInterface({
  input:  process.stdin,
  output: process.stdout,
  prompt: '> '
});
const socket = io('http://localhost:5000', { auth: { token: jwt } });

socket.on('connect', () => {
  console.log(`logged in as ${myId}  socket ${socket.id}`);

  const askPeer = () =>
    rl.question('Peer userId? ', (id) => {
      peer = id.trim();
      fetchHistory();
      rl.prompt();
    });

  if (peer) {
    fetchHistory();
    rl.prompt();
  } else {
    askPeer();
  }
});

socket.on('connect_error', (err) => {
  console.error('connection error:', err.message);
  process.exit(1);
});

 // Events
socket.on('chat-history', (msgs) => {
  console.log(`\n--- history (${msgs.length}) ---`);
  msgs.forEach(m => {
    const mine = m.from === myId || m.from?._id === myId;
    const who  = mine ? 'you' : m.from.username ?? m.from;
    console.log(`${who}: ${m.text}`);
  });
  console.log('--- end history ---\n');
  rl.prompt();
});

socket.on('new-message', (m) => {
  const mine = m.from._id === myId;
  const who  = mine ? 'you' : m.from.username;
  console.log(`\n${who}: ${m.text}`);
  rl.prompt();
});


function fetchHistory() {
  socket.emit('fetch-history', { withUserId: peer });
}


rl.on('line', (line) => {
  const text = line.trim();
  if (!text) return rl.prompt();
  if (text === '/quit') { rl.close(); return; }
  if (!peer)  return console.log('set peer first!');

  socket.emit('send-message', { toUserId: peer, text });
  rl.prompt();
});

rl.on('close', () => {
  console.log('bye!');
  socket.close();
  process.exit(0);
});
