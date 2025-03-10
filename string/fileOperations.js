// fileOperations.js
const fs = require('fs');
const path = require('path');

module.exports = {
  createFile: (filename, content) => {
    fs.writeFileSync(path.join(__dirname, filename), content);
  },

  readFile: (filename) => {
    return fs.readFileSync(path.join(__dirname, filename), 'utf-8');
  },

  updateFile: (filename, content) => {
    fs.appendFileSync(path.join(__dirname, filename), content);
  },

  deleteFile: (filename) => {
    fs.unlinkSync(path.join(__dirname, filename));
  }
};
