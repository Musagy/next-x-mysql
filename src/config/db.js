import { createPool } from 'mysql2/promise'

const dbConf = ({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
})

const pool = createPool(dbConf)
console.log(dbConf)

export { pool } 
