const keywords = ['null', 'NaN', '#', 'true', 'false', 'undefined', 'if', 'else', 'function', 'return', 'try', 'catch', 'finally', 'new'];
const functions = ['print', '!'];
const operators = ['==', '>=', '<=', '>', '<'];
const declare = /\s*(.*?)\s*=\s*(.*)/;
const string = /^(["'])(.*)\1$/m;
const array = /^\[.*]$/m;
const json = /^{.*}$/m;
const number = /^\d+$/m;
let variables = {};

function tokenize(str) {
  str.split('\n').forEach(line => {
    if (declare.test(line)) {
      let match = declare.exec(line).slice(1, 3);

      const varName = match[0];

      if (keywords.includes(varName) || functions.includes(varName) || operators.includes(varName)) return;

      let value = match[1];
      let type = 'unknown';

      if (string.test(value)) {
        value = string.exec(value)[2];
        type = 'string';
      } else if (array.test(value)) {
        value = JSON.parse(value);
        type = 'array';
      } else if (json.test(value)) {
        value = JSON.parse(value);
        type = 'object';
      } else if (number.test(value)) {
        value = parseFloat(value);
        type = 'number';
      }

      variables[varName] = {value, type};
    }
  });
}

tokenize(`x = "67"
y = [6, 7]
z = { "a": 6, "b": 7 }
n = 67`)
console.log(variables);