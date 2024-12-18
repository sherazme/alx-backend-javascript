/**
 * Create more complex HTTP server using Node's HTTP module
 */
const fs = require('fs');
const http = require('http');

const hostname = '127.0.0.1';
const port = 1245;

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, records) => {
      if (err) reject(new Error('Cannot load the database'));
      else {
        const content = records.split('\n');
        const cslist = [];
        const swelist = [];

        content.forEach((record) => {
          const field = record.split(',');
          if (field !== [] && field !== null) {
            if (field[3] === 'CS') {
              cslist.push(field[0]);
            } else if (field[3] === 'SWE') {
              swelist.push(field[0]);
            }
          }
        });
        let str = `Number of students: ${cslist.length + swelist.length}\n`;
        str += `Number of students in CS: ${cslist.length}. List: ${cslist.join(', ')}\n`;
        str += `Number of students in SWE: ${swelist.length}. List: ${swelist.join(', ')}`;
        resolve(str);
      }
    });
  });
}

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.write('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    const database = process.argv.length > 2 ? process.argv[2] : '';
    try {
      const content = await countStudents(database);
      res.write(content);
    } catch (err) {
      res.write(err.message);
    }
  }
  res.end();
});

app.listen(port, hostname);

module.exports = app;
