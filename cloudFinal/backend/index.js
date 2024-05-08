const waitPort = require('wait-port');
const mysql = require('mysql2');
const express = require('express');
const app = express();

// Function to fetch data from the database and cache it
function initializeData(connection) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM STUDENTS', (error, results) => {
      if (error) {
        reject(error);
      } else {
        const students = results.map(result => ({
          name: result.student_name,
          id: result.id,
          cgpa: parseFloat(result.cgpa),
          age: result.age,
        }));
        // Cache the fetched data (you may want to store it in a variable accessible to your routes)
        app.locals.students = students;
        resolve();
      }
    });
  });
}

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'uni_db',
  port: 3306,
});

// Middleware to ensure database connection is established before serving requests
app.use((req, res, next) => {
  if (connection.state === 'authenticated') {
    next();
  } else {
    res.status(500).send('Database connection not established.');
  }
});

// Wait for the database port to become available
const params = { host: 'db', port: 3306 };
waitPort(params)
  .then(({ open }) => {
    if (open) {
      // Connect to the database
      connection.connect(error => {
        if (error) {
          console.error('Error connecting to database:', error);
        } else {
          console.log('Connected to database.');

          // Initialize data when the connection is established
          initializeData(connection)
            .then(() => {
              console.log('Data initialized.');
            })
            .catch(error => {
              console.error('Error initializing data:', error);
            });
        }
      });
    } else {
      console.error('Database port did not open before the timeout.');
    }
  })
  .catch(err => {
    console.error('An error occurred while waiting for the database port:', err);
  });

// Define routes
app.get('/students', (req, res) => {
  // Retrieve cached data
  const students = app.locals.students || [];
  res.send(students);
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
