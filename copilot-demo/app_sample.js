const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

app.use(bodyParser.json());

db.serialize(() => {
    db.run('CREATE TABLE emails (email TEXT)', (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Table created successfully');
        }
    });
});

app.post('/email', (req, res) => {
    const { email } = req.body;

    db.run(`INSERT INTO emails(email) VALUES(?)`, [email], function(err) {
        if (err) {
            console.error('Error inserting email:', err);
            return res.status(500).json({ error: 'Failed to save email' });
        }
        return res.json({ message: 'Email saved successfully' });
    });
});

app.listen(3000, () => console.log('App is running on http://localhost:3000'));

module.exports = app;