// Dependencies
var express = require("express");
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser')
const data = require('./db/db.json')
const util = require('util')

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Create express app instance.
var app = express();
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

app.get("/api/notes", function(req, res) {
  res.send(data);

});

app.post("/api/notes", function(req, res) {
  console.log(data)
  data.push(req.body)
  console.log(data)
  res.send(data);
});

app.delete("/api/notes/:id", function(req, res) {
  console.log("id is " + req.params.id);
  data.splice(req.params.id,1)
  console.log(data)
  res.send(data);
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});




// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });