'use strict';

const express = require('express');
const cluster = require('cluster');
const server = express();
const prom = require('prom-client')
const register = prom.register;

const Histogram = prom.Histogram;
const h = new Histogram({
    name: 'test_histogram',
    help: 'Example of a histogram',
    labelNames: ['code']
});

const Counter = prom.Counter;
const c = new Counter({
    name: 'test_counter',
    help: 'Example of a counter',
    labelNames: ['code']
});

const Gauge = prom.Gauge;
const g = new Gauge({
    name: 'test_gauge',
    help: 'Example of a gauge',
    labelNames: ['method', 'code']
});

const Summary = prom.Summary;
const s = new Summary({
    name: 'test_summary',
    help: 'Example of a summary',
    labelNames: ['method', 'point'],
    percentiles: [0.5]
})

s.labels('GET', '/test').observe(50);
s.labels('GET', '/test').observe(50);
s.labels('POST', '/test').observe(100);
s.labels('POST', '/test').observe(100);

setTimeout(() => {
    h.labels('200').observe(Math.random());
    h.labels('200').observe(Math.random());
    h.labels('300').observe(Math.random());
    h.labels('300').observe(Math.random());
}, 10);

setInterval(() => {
    c.inc({ code: 200 });
}, 5000);

setInterval(() => {
    c.inc({ code: 400 });
}, 2000);

setInterval(() => {
    c.inc();
}, 2000);

setInterval(() => {
    g.set({ method: 'get', code: 200 }, Math.random());
    g.set(Math.random());
    g.labels('post', '300').inc();
}, 100);

if (cluster.isWorker) {
    // Expose some worker-specific metric as an example
    setInterval(() => {
        c.inc({ code: `worker_${cluster.worker.id}` });
    }, 2000);
}

server.get('/metrics', (req, res) => {
    res.set('Content-Type', register.contentType);
    console.log(register.metrics());
    
    res.end(register.metrics());
});

server.get('/metrics/counter', (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(register.getSingleMetricAsString('test_counter'));
});

//Enable collection of default metrics
prom.collectDefaultMetrics();

console.log('Server listening to 3000, metrics exposed on /metrics endpoint');
server.listen(3000);