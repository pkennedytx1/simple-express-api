import express from 'express';
import bodyParser from 'body-parser';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url'

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req);
    next();
});
const adapter = new JSONFile('db.json');
const db = new Low(adapter);
await db.read();

import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Example Get Request
app.get("/coffees", (req, res) => {
    const coffees = db.data.coffees.map((coffee) => {
        return coffee;
    })
    res.json(coffees);
});

// Can send html files too!
app.get("/", (req, res) => {
    res.sendFile('index.html', { root: __dirname });
})

// Example POST request
app.post("/newcoffee", (req, res) => {
    const newCoffee = req.body;
    db.data.coffees.push(newCoffee);
    db.write();
    res.sendStatus(200);
})

app.listen(3000, () => {
 console.log("Server running on port 3000");
});