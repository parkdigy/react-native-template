const fs = require('fs');
const path = require('path');

function deleteDir(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach(file => {
      const filePath = path.join(directoryPath, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        // 디렉토리인 경우 재귀적으로 삭제
        deleteDir(filePath);
      } else {
        // 파일인 경우 삭제
        fs.unlinkSync(filePath);
      }
    });
    // 디렉토리 내용이 모두 삭제된 후 디렉토리 자체 삭제
    fs.rmdirSync(directoryPath);
  }
}

module.exports = deleteDir;
