var express = require('express');
var prom = require('prom-client');

var app = express()

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(3000);