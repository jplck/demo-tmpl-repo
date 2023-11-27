const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS emails (email TEXT)');
});

const app = express();
app.use(bodyParser.json());

app.post('/api/email', (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    //validate email for right format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Email is invalid');
    }

    db.run('INSERT INTO emails VALUES (?)', email, (err) => {
        if (err) {
            console.error('Error saving email:', err);
            return res.status(500).send('An error occurred while saving the email');
        }

        res.status(200).send('Email saved successfully!');
    });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
