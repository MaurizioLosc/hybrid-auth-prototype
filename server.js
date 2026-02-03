require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const ConnectDB = require('./config/db');
const authRoute = require('./routes/auth.route')

const app = express();

// CONFIGS
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_KEY';

// database connection
ConnectDB()

// Globle Middlewares
app.use(cors());
app.use(express.json());

app.set('jwt-secret', JWT_SECRET);

// health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'Hybrid Authorization Prototype',
        timestamp: new Date()
    });
});

app.use("/auth", authRoute)

// globle error healder
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// server start
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});