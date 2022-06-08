import { createPool } from 'mysql2/promise'

// const pool = createPool({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   port: 3306,
//   database: "productsdb",
// })
const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
})

export { pool } 