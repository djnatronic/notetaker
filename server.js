// Dependencies
var express = require("express");
var path = require('path');
var fs = require('fs');

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Create express app instance.
var app = express();
app.use(express.static('public'))

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

app.get("/api/notes", function(req, res) {
  const data = require('./db/db.json')
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));

});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});




// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });