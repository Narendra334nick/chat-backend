import mysql, { PoolConfig, MysqlError, PoolConnection } from 'mysql';
import config from '../config/config';

// create the pool
const options: PoolConfig = {
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  database: config.db.name,
  password: config.db.password,
  connectionLimit: 20, // Adjust the limit as needed
};
const pool = mysql.createPool(options);

pool.getConnection((err: MysqlError, conn: PoolConnection) => {
  if (err) {
    console.log('Database:', err);
    return;
  }
  console.log('Database connection done.');
  //release the connection when finished!
  conn.release();
});

export default pool;