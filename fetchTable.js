const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');

  const selectQuery = 'SELECT id, name FROM customers';

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data from the table:', err);
    } else {
      console.log('Fetched data from the table:');
      console.log(results);
    }

    // Close the database connection
    connection.end();
  });
});
