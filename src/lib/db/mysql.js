import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); 

let mysqlconn = null;

export async function mysqlconnFn() {
  if (!mysqlconn) {
    try {
      mysqlconn = await mysql.createConnection({
        uri: process.env.MYSQL_URL // Usar el URI directamente
      });
      console.log("Database connection established");
    } catch (error) {
      console.error("Error establishing database connection:", error);
      throw new Error("Database connection failed");
    }
  }

  return mysqlconn;
}
