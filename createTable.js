const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');

  // Define the SQL query to create a table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS your_table_name (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      age INT
    )
  `;

  // Execute the query to create the table
  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating the table:', err);
    } else {
      console.log('Table created successfully');
    }

    // Close the database connection
    connection.end();
  });
});
