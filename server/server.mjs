import express from "express";
import mysql from "mysql2";

const app = express();
const port = 3000;
// const mysql = mysql();


// Create MySQL connection
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'mysql',
  database: 'quiz'
});

// Connect to MySQL
mysqlConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});


// register
app.post("/register", (req, res) => {
  try {
    const { first_name, last_name, email, gender } = req.body;
    const query = "INSERT INTO user(First_name, Last_name, Email, Gender) VALUES (?,?,?,?)";
    mysqlConnection.query(query,[first_name, last_name, email, gender], () => {
      res.status(200).json({
        message: "data inserted"
      })
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// login
app.post("/login", (req, res) => {
  try {
    const { email } = req.body;
    const query = "SELECT * from user WHERE email = ?";
    mysqlConnection.query(query,[email], () => {
      if (res.length > 0) {
        res.status(200).json({
          success: true,
          message: "Login successful",
          user: results[0] // Assuming only one user with given email/password
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})