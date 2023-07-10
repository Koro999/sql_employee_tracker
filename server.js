// Import express and mysql2
const express = require('express');
const mysql = require('mysql2');

//assign PORT for host, and local fixed PORT
const PORT = process.env.PORT || 3001;
//call instance of express 
const app = express();

// Express middleware, to parse information
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    //access the .env file to insert credentials
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to ${process.env.DB_NAME} database.`)
);

//show which port were on
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});