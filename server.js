import express from 'express';
import bodyParser from 'body-parser';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url'

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log('Hello I am middle ware');
    next();
});
app.use("/specific", (req, res, next) => {
    console.log("I am middle ware for specific route");
    next();
})
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

app.get("/specific", (req, res) => {
    console.log("I am a specific resource");
})

// Example POST request
app.post("/newcoffee", (req, res) => {
    const newCoffee = req.body;
    db.data.coffees.push(newCoffee);
    db.write();
    res.redirect('/');
})

app.listen(3000, () => {
 console.log("Server running on port 3000");
});