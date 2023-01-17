const readline = require("readline");
const net = require("net");
const { sleep } = require("./commonFunc");
const fork = require("child_process").fork;

let socketObject = null;
const main = async () => {
  // implement socket, function:mean
  createSocketServer();
  // implement pipe, function:median
  // implement shared memory, function:mode

  await sleep(1000);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  // Get user input
  const ask = () => {
    rl.question(
      `You can type intergers and then click [ENTER].  Clients will show the mean, median, and mode of the input values. \n`,
      (inputStr) => {
        const integers = validateInputStr(inputStr);
        if (socketObject) {
          socketObject.write(integers.toString());
        }
      }
    );
  };

  ask();
};

function validateInputStr(str) {
  let result = str.trim().split(" ");
  result = result.map((num) => parseInt(num));
  return result;
}

function createSocketServer() {
  const server = net.createServer();
  server.listen(3000, () => {
    console.log(`server is on ${JSON.stringify(server.address())}`);
  });

  server.on("connection", (socket) => {
    socketObject = socket;
    socket.on("data", (buffer) => {
      console.log(`got a msg from client:${buffer.toString()}`);
    });
  });
}

function dispatch(filePath, msg) {
  const childProcess = fork("./mean.js");
  childProcess.send({ msg });
  return childProcess;
}

main();
