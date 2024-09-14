// import express from "express";
// import mysql from "mysql";


// const app = express()
// const port = 3000;

// let con = mysql.createConnection({
//     host: "srv1326.hstgr.io",
//     port: 3306,
//     user: "u619479099_crm",
//     password: "Crm@2020#",
//     database: "u619479099_crm",
//     waitForConnections: true,
//     connectionLimit: 5000,
//     queueLimit: 5000,
//   });


// export default con;
// import express from "express";
// import mysql from "mysql";

// const app = express();
// const port = 3000;

// // Create a connection pool
// let con = mysql.createPool({
//   host: "srv1326.hstgr.io",
//   port: 3306,
//   user: "u619479099_crm",
//   password: "Crm@2020#",
//   database: "u619479099_crm",
//   waitForConnections: true,
//   connectionLimit: 5000,  // Limit number of concurrent connections (adjust as needed)
//   queueLimit: 0,  // No limit on queued connection requests
// });

// // Export the pool
// export default con;

import express from "express";
import mysql from "mysql";

const app = express();
const port = 3000;

// Create a connection pool with extended timeouts for payment processing
let con = mysql.createPool({
  host: "srv1326.hstgr.io",
  port: 3306,
  user: "u619479099_crm",
  password: "Crm@2020#",
  database: "u619479099_crm",
  waitForConnections: true,
  connectionLimit: 100,  // Manageable concurrent connections
  queueLimit: 0,  // No limit on queued connection requests
  connectTimeout: 60000,  // Extended to 60 seconds for longer connection handshakes
  acquireTimeout: 60000,  // Extended acquire timeout to 60 seconds
  timeout: 120000,  // Extended timeout for inactive connections (120 seconds)
  idleTimeout: 120000,  // Close idle connections after 120 seconds
});

// Error handling when connecting
con.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }

  if (connection) connection.release();  // Release the connection back to the pool
});

// Export the pool
export default con;
