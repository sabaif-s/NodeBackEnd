const { Sequelize } = require('sequelize');

// Database configuration
const dbName = 'ReactNode'; // Replace with your desired database name
const username = 'root'; // Your database username
const password = 'Strong&2013'; // Your database password

// Create a Sequelize instance to connect to MySQL
const sequelize = new Sequelize(dbName, username, password, {
  host: 'localhost',
  dialect: 'mysql',
});

// Function to create the database if it doesn't exist
async function createDatabase() {
  try {
    // Connect to MySQL using the 'mysql' database
    const connection = new Sequelize('mysql', username, password, {
      host: 'localhost',
      dialect: 'mysql',
    });

    // Authenticate the connection
    await connection.authenticate();
    console.log('Connection to MySQL has been established successfully.');

    // Check if the database exists
    const [results] = await connection.query(
      "SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = ?",
      { replacements: [dbName] }
    );

    if (results.length === 0) {
      // Create the database if it doesn't exist
      await connection.query(`CREATE DATABASE \`${dbName}\``);
      console.log(`Database "${dbName}" created successfully.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }

    // Close the connection
    await connection.close();
    return true;
  } catch (error) {
    console.error('Unable to create the database:', error);
    return false;
  }
}

// Call the function to create the database
 
  const created =  createDatabase();
  module.exports = { created, sequelize };