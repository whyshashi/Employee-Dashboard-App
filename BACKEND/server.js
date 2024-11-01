const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

const emprouter = require('./routes/employee');

dotenv.config();
const app = express();


connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/auth', require('./routes/auth'));

app.use('/employees',emprouter );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 