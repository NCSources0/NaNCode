// LICENSED UNDER THE MIT LICENSE
/*
All of the contents of the language is defined
in this file, but we are not psychopaths so
you can search for (CTRL+F) for "////"
*/

// THIS FILE IS INTENDED FOR TRANSLATING THIS
// LANGUAGE INTO THE JS USING NODE, SO THIS
// LANGAUGE CAN BE USED FOR THE WEB.

//// THE BASICS
const keywords = ['null', 'NaN', '#', 'true', 'false', 'undefined', 'if', 'else', 'return'];
const functions = ['print', '!'];
const operators = ['==', '>=', '<=', '>', '<'];

const regex = {
  var: /([a-zA-Z0-9]+)\s*=\s*(.*)/,
  string: /^(["'])(.*?)\1$/m,
  array: /^\[.*]$/m,
  json: /^{.*}$/m,
  number: /^\d+(?:\.\d+)?$/m,
  stringIdentifier: /'(.*?)(?<!\\)'/g,
  setKey: /([a-zA-Z0-9]+)\s*\[\s*(.+)]\s*=\s*(.*)/
};

let variables = {};

function tokenize(str) {
  str.split('\n').forEach(line => {
    line = line.trim();
    if (regex.var.test(line)) {
      let match = regex.var.exec(line).slice(1, 3);

      const varName = match[0];

      if (keywords.includes(varName) || functions.includes(varName) || operators.includes(varName)) return;

      let value = match[1];

      value = value.replaceAll(regex.stringIdentifier, (_, inside) => `"${inside}"`);

      console.log(varName, value);

      const formatted = format(value);
      if (formatted.type === 'object') {
        for (const key in formatted.value) {
          variables[`${varName}[${key}]`] = format(`"${formatted.value[key]}"`);
        }
      } else if (formatted.type === 'array') {
        for (let i = 0; i < formatted.value.length; i++) {
          variables[`${varName}[${i}]`] = format(`"${formatted.value[i]}"`);
        }
      } else {
        variables[varName] = formatted;
      }
    } else if (regex.setKey.test(line)) {
      let match = regex.setKey.exec(line).slice(1, 4);

      const varName = match[0];
      const key = match[1];
      let value = match[2];

      if (!(varName in variables)) return;
      if (variables[varName].type !== 'object' && variables[varName].type !== 'array') return;


    }
  });
}

function format(value) {
  value = value.trim();
  let type = 'unknown';
  if (regex.string.test(value)) {
    value = regex.string.exec(value)[2];
    type = 'string';
  } else if (regex.array.test(value)) {
    value = JSON.parse(value);
    type = 'array';
  } else if (regex.json.test(value)) {
    value = JSON.parse(value);
    type = 'object';
  } else if (regex.number.test(value)) {
    value = parseFloat(value);
    type = 'number';
  }
  return {value, type};
}

tokenize(`hello = 'world'
hi = ['y', 'o', 'u']
z = { "a": 6, "b": 7 }
y = { "a": "a", "b": [6] }
int = 67
float = 6.7
z['a'] = 8`)
console.log(variables);