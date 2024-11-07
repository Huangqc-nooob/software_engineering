const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// 创建 MySQL 连接
const db = mysql.createConnection({
  host: '111.229.254.88',
  port: 3306,
  user: 'softEngGroup',
  password: 'softEngGroup@1234567890',
  database: 'test'
})

// 连接到 MySQL 数据库
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log('Connected to MySQL')
})

// 使用 body-parser 中间件
app.use(bodyParser.json())

// 登录路由
app.post('/api/login', (req, res) => {
  console.log('Request received at /api/login')
  console.log('Request body:', req.body) // 调试请求体
  const { username, password } = req.body
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?'
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res
        .status(500)
        .json({ success: false, message: 'Internal server error' })
    }
    console.log('Query results:', results) // 调试查询结果
    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' })
    } else {
      res.json({ success: false, message: 'Invalid credentials' })
    }
  })
})

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
