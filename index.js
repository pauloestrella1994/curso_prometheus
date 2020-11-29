var express = require('express');
var promClient = require('prom-client');
const register = promClient.register;

var app = express()

const client = require('prom-client');
const counter = new promClient.Counter({
    name: 'request_total',
    help: 'request counter',
    labelNames: ['statusCode']
});

const gauge = new promClient.Gauge ({

    name: 'free_bytes',
    help: 'Exemplo de gauge'
});

const histogram = new promClient.Histogram ({

    name: 'request_time_seconds',
    help: 'Tempo de resposta da API',
    buckets: [0.1, 0.2, 0.3, 0.4, 0.5]
})

app.get('/', function(req, res) {
    counter.labels('200').inc();

    gauge.set(100*Math.random());

    histogram.observe(Math.random());

    res.send('Hello World!');
});

app.get('/metrics', function(req, res) {
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
});

app.listen(3000);