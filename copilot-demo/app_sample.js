const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 8080;

// Enable body parsing for JSON
app.use(express.json());

// Initialize SQLite database
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// Create table to store emails
db.run('CREATE TABLE emails (email TEXT)', (err) => {
  if (err) {
    return console.error(err.message);
  }
});

// API endpoint to store email

app.post('/email', (req, res) => {
    const { email } = req.body;

    const stmt = db.prepare('INSERT INTO emails(email) VALUES(?)');
    stmt.run(email, (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send('Email saved successfully');
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;