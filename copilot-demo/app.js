const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
app.use(bodyParser.json());

// Initialize in-memory SQLite database
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// Create table for emails
db.run('CREATE TABLE emails(email TEXT)', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Emails table created.');
});

// API endpoint for storing emails
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/email', (req, res) => {
    try {
        const { email } = req.body;

        if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
            return res.status(400).send({ message: 'Invalid email format' });
        }

        db.run(`INSERT INTO emails(email) VALUES(?)`, [email], function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send({ message: 'Failed to store email' });
            }
            res.send({ message: 'Email stored successfully!' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});