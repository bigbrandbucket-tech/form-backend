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
import express from "express";
import mysql from "mysql";

const app = express();
const port = 3000;

// Create a connection pool
let con = mysql.createPool({
  host: "srv1326.hstgr.io",
  port: 3306,
  user: "u619479099_crm",
  password: "Crm@2020#",
  database: "u619479099_crm",
  waitForConnections: true,
  connectionLimit: 5000,  // Limit number of concurrent connections (adjust as needed)
  queueLimit: 5000,  // No limit on queued connection requests
});

// Export the pool
export default con;

