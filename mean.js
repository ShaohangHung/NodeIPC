const net = require("net");
const client = net.connect({ port: 3000 });
client.on(`connect`, () => {
  // client.write(`Hello I'm client`);
});

client.on("data", (buffer) => {
  console.log(`got a msg from server:${buffer.toString()}`);
});
