const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const transactionRouter = require('./routes/transaction')
require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const app = express();
const mongoose = require('mongoose')

// mongodb+srv://ahmadSyukron:Syukron699!@clusteribenk-v2bjp.mongodb.net/test?retryWrites=true
mongoose.connect("mongodb+srv://ahmadSyukron:Syukron699!@clusteribenk-v2bjp.mongodb.net/test?retryWrites=true")

app.use(cors())
app.use(express.json(
    {
    parameterLimit: 10000,
    limit: '50mb'
}
));
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/transactions', transactionRouter);

module.exports = app;
