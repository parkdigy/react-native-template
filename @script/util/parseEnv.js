const ll = console.log;

const fs = require('fs');
const path = require('path');

const parseEnv = (envFilePath) => {
  const envContent = fs.readFileSync(envFilePath, 'utf8');
  const env = {};
  envContent.split('\n').forEach((line) => {
    line = line.trim();
    if (line.startsWith('#') || line === '') {
      return;
    }
    const [key, value] = line.split('=');
    let finalValue = value;
    if (value.startsWith('"') && value.endsWith('"')) {
      finalValue = value.slice(1, -1);
    }
    env[key] = finalValue;
  });
  return env;
}

module.exports = parseEnv;
