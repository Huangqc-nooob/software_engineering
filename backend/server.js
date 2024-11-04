const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
})

db.connect((err) => {
  if (err) throw err
  console.log('Connected to MySQL')
})

app.use(bodyParser.json())

app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?'
  db.query(query, [username, password], (err, results) => {
    if (err) throw err
    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' })
    } else {
      res.json({ success: false, message: 'Invalid credentials' })
    }
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
