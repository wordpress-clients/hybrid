#!/usr/bin/env node
'use strict';

const express = require('express');
const path = require('path');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';
const WWW = path.join(__dirname, '..', '/www/');

// App
const app = express();
app.use(express.static(WWW));
app.get('*', function (req, res) {
    res.sendFile(WWW);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
