const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3001; // You can choose any port you prefer

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL server's host
  user: 'root',
  password: '',
  database: 'mydb', // Replace with your database name
});

app.use(express.json());

// Define a POST endpoint for inserting data
app.post('/api/insertCustomer', (req, res) => {
  const { name, address } = req.body;

  // Log the data received in the request
  console.log('Received POST request with data:');
  console.log('Name:', name);
  console.log('Address:', address);

  // Insert the new record into the customers table
  connection.query(
    'INSERT INTO customers (name, address) VALUES (?, ?)',
    [name, address],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error inserting data into the table' });
      } else {
        res.json({ message: 'Data inserted successfully' });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
