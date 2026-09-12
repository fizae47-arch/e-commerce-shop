const path = require('path');

// Load environment variables
require('dotenv').config({
    path: path.resolve(__dirname, './config/.env')
});

const app = require('./app');
const connectDatabase = require('./db/Database');

console.log('Loading PORT:', process.env.PORT ? 'set' : 'missing');
console.log('Loading DB_URL:', process.env.DB_URL ? 'set' : 'missing');

// Handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

const port = process.env.PORT || 3000;

connectDatabase()
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`Server is working on port ${port}`);
        });

        process.on('unhandledRejection', (err) => {
            console.log(`Error: ${err.message}`);
            console.log(`Shutting down the server due to Unhandled Promise Rejection`);
            server.close(() => {
                process.exit(1);
            });
        });
    })
    .catch((err) => {
        console.log(`Database connection error: ${err.message}`);
        process.exit(1);
    });