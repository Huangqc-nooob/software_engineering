//放在根目录
const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const app = express()
const port = 3000 // 选择不同于 MySQL 服务器的端口

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'mydatabase'
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    throw err
  }
  console.log('Connected to MySQL')
})

app.use(bodyParser.json())

app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Username and password are required' })
  }

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?'
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Database query error:', err)
      return res
        .status(500)
        .json({ success: false, message: 'Internal server error' })
    }
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
