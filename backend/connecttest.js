const mysql = require('mysql2')

// 创建数据库连接配置
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'mydatabase'
}

// 创建连接
const db = mysql.createConnection(dbConfig)

// 连接到数据库
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log('Connected to MySQL')

  // 测试查询
  db.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
    if (err) {
      console.error('Error executing query:', err)
      return
    }
    console.log('Query result:', results[0].solution) // 应输出2

    // 关闭连接
    db.end((err) => {
      if (err) {
        console.error('Error closing connection:', err)
        return
      }
      console.log('Connection closed')
    })
  })
})
