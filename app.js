const express = require('express');
const app = express();

const admin = require('./controllers/admin');
const user = require('./controllers/user');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/admin', admin);
app.use('/api/user', user);

module.exports = app;
