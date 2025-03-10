// fileOperations.test.js
const fs = require('fs');
const fileOps = require('./fileOperations');
const path = require('path');

describe('File Operations tests', () => {
  const filename = 'testFile.txt';

  test('should create a file with content', () => {
    fileOps.createFile(filename, 'Hello, world!');
    const content = fs.readFileSync(path.join(__dirname, filename), 'utf-8');
    expect(content).toBe('Hello, world!');
  });

  test('should read content from a file', () => {
    const content = fileOps.readFile(filename);
    expect(content).toBe('Hello, world!');
  });

  test('should update a file with new content', () => {
    fileOps.updateFile(filename, ' More text.');
    const content = fs.readFileSync(path.join(__dirname, filename), 'utf-8');
    expect(content).toBe('Hello, world! More text.');
  });

  test('should delete a file', () => {
    fileOps.deleteFile(filename);
    expect(() => fs.readFileSync(path.join(__dirname, filename), 'utf-8')).toThrow();
  });
});
