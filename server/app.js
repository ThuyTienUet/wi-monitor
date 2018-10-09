const express = require('express');
const app = express();
const http = require('http');
const config = require('config');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
app.use(cors());
app.use(bodyParser.json());

let responseTimeRouter = require('./api/response_times');

app.use('/', express.static(path.join(__dirname, '../client')));
app.use((req, res, next) => {
    next();
});
app.use('/', responseTimeRouter);
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

http.createServer(app).listen(config.app.port, () => {
    console.log("Monitoring service listening on port ", config.app.port);
});