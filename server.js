const prompt = require("prompt-sync")({ sigint: true });
const fork = require("child_process").fork;

while (true) {
  console.log(
    `Server is ready. You can type intergers and then click [ENTER].  Clients will show the mean, median, and mode of the input values.`
  );
  // Get user input
  const inputStr = prompt(``);
  const integers = validateInputStr(inputStr);

  console.log(integers);

  // dispatch mean
  const childProcessMean = fork("./mean.js");
  childProcessMean.send();
  // dispatch median
  // dispatch mode
}

function validateInputStr(str) {
  let result = str.trim().split(" ");
  result = result.map((num) => parseInt(num));
  return result;
}

function dispatch(filePath, msg) {
  const childProcess = fork("./mean.js");
  childProcess.send({ msg });
  return childProcess;
}
