var express = require('express');
var prom = require('prom-client');
const register = prom.register;

var app = express()

const client = require('prom-client');
const counter = new client.Counter({
    name: 'request_total',
    help: 'request counter',
    labelNames: ['statusCode']
})

app.get('/', function(req, res) {
    counter.labels('200').inc();

    res.send('Hello World!');
});

app.get('/metrics', function(req, res) {
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
})

app.listen(3000);