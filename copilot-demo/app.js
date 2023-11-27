const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE emails (email TEXT)');
});

const app = express();
app.use(bodyParser.json());

app.post('/api/email', (req, res) => {
    db.run('INSERT INTO emails VALUES (?)', req.body.email, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Email saved successfully!');
        }
    });
});

app.listen(3000, () => console.log('Server is running on port 3000'));