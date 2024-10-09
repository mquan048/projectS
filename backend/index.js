//packages
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';


// utils
import connnectDB from './config/db.js';
import cookieParser from 'cookie-parser';

// load env vars
dotenv.config();
const port = process.env.PORT || 5000;


// connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('API is running...');
}
);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold);
});


// import routes
