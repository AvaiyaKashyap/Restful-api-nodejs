const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3002; // You can choose any port you prefer

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL server's host
  user: 'root',
  password: '',
  database: 'mydb', // Replace with your database name
});

app.use(express.json());

// Define a DELETE endpoint to delete a user by ID
app.delete('/api/deleteCustomer/:id', (req, res) => {
  const userId = req.params.id;

  // Retrieve the data of the user to be deleted before deletion
  connection.query('SELECT * FROM customers WHERE id = ?', [userId], (selectErr, selectResult) => {
    if (selectErr) {
      res.status(500).json({ error: 'Error retrieving data before deletion' });
    } else {
      if (selectResult.length > 0) {
        const deletedUserData = selectResult[0]; // Assuming only one record matches the ID

        // Delete the user with the specified ID from the customers table
        connection.query('DELETE FROM customers WHERE id = ?', [userId], (deleteErr, deleteResult) => {
          if (deleteErr) {
            res.status(500).json({ error: 'Error deleting data from the table' });
          } else {
            if (deleteResult.affectedRows > 0) {
              res.json({
                message: 'User data deleted successfully',
                deletedUser: deletedUserData,
              });
            } else {
              res.status(404).json({ error: 'User with the specified ID not found' });
            }
          }
        });
      } else {
        res.status(404).json({ error: 'User with the specified ID not found' });
      }
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
