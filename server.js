const express = require("express");
const app = express();

// Example Get Request
app.get("/greetings", (req, res, next) => {
    res.json(["Hello","Sup","Howdy","Greetings"]);
});

// ToDo: Make a post request to our db

// TODO: Make a new get request from the db

app.listen(3000, () => {
 console.log("Server running on port 3000");
});