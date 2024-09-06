import express from "express";
import mysql from "mysql";


const app = express()
const port = 3000;

let con = mysql.createConnection({
    host: "srv1326.hstgr.io",
    port: 3306,
    user: "u619479099_crm",
    password: "Crm@2020#",
    database: "u619479099_crm",
    waitForConnections: true,
    connectionLimit: 50000,
    queueLimit: 5000,
  });


export default con;
