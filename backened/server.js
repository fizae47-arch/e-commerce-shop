const path = require('path');

// Load environment variables
require('dotenv').config({
    path: path.resolve(__dirname, './config/.env')
});

const express = require('express');
const app = require('./app');
const connectDatabase = require('./db/Database');

console.log('Loading PORT:', process.env.PORT);
console.log('Loading DB_URL:', process.env.DB_URL);

// Handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

// Connecting to database
connectDatabase();

// Create server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});