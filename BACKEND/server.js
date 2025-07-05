const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

app.use(cors());

const emprouter = require('./routes/employee');

dotenv.config();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/auth', require('./routes/auth'));

app.use('/employees',emprouter );

app.get('/',(req,res)=>{
    res.status(200).send('this is the employee backend home route');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 