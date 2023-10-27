const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000; // You can choose any port you prefer

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb',
});

// Define an API endpoint for fetching data
app.get('/api/fetchTable', (req, res) => {
  connection.query('SELECT * FROM customers', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching data from the table' });
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
