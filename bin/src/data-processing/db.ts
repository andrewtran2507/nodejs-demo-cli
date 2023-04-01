import fs from "fs";
import path from "path";
import sqlite from "sqlite3";
const sqlite3 = sqlite.verbose();

const filepath = path.resolve(`${process.cwd()}/bin/data/transactions.db`);
const dataSource = path.resolve(`${process.cwd()}/bin/data/transactions.csv`);

export const isDataSourceExists = () => fs.existsSync(dataSource) ? true : false;
export const isDBExists = () => fs.existsSync(filepath) ? true : false;

const connectToDatabase = () => {
  if (fs.existsSync(filepath)) {
    console.log("Connected to the database successfully");
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error('The DB error now', error.message);
      }
      createTransactionsTable(db);
      createTransactionsTableIndexing(db);
    });
    console.log("Connected to the database successfully");
    return db;
  }
}

const createTransactionsTable = (db) => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions
    (
      timestamp         VARCHAR(20),
      transaction_type  VARCHAR(20),
      token             VARCHAR(10),
      amount            VARCHAR(50)
    )
  `);
}

const createTransactionsTableIndexing = (db) => {
  db.exec(`
    CREATE INDEX IF NOT EXISTS transactions_idx
    ON transactions (timestamp, transaction_type, token, amount);
  `);
}

export default connectToDatabase;