import express from 'express';
import bodyParser from 'body-parser';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url'

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const adapter = new JSONFile('db.json');
const db = new Low(adapter);
await db.read();

import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Example Get Request
app.get("/coffees", (req, res, next) => {
    const coffees = db.data.coffees.map((coffee) => {
        return coffee;
    })
    res.json(coffees);
});

app.get("/", (req, res) => {
    res.sendFile('index.html', { root: __dirname });
})

// ToDo: Make a post request to our db
app.post("/newcoffee", (req, res) => {
    const newCoffee = req.body;
    db.data.coffees.push(newCoffee);
    db.write();
    res.sendStatus(200);
})

// TODO: Make a new get request from the db

app.listen(3000, () => {
 console.log("Server running on port 3000");
});