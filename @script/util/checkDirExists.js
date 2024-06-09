const fs = require('fs');

const checkDirExists = (paths) => {
  const validate = (path) => {
    if (!fs.existsSync(path)) {
      throw new Error(`${path} 디렉토리가 없습니다!!!`);
    }
    const stat = fs.statSync(path);
    if (!stat.isDirectory()) {
      throw new Error(`${path} 디렉토리가 아닙니다!!!`);
    }
  }
  if (Array.isArray(paths)) {
    for (const path of paths) {
      validate(path);
    }
  } else {
    validate(paths);
  }
}

module.exports = checkDirExists;
