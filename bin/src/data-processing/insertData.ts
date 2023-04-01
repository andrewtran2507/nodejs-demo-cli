import fs from "fs";
import { parse } from "csv";
import connectToDatabase from "./db";
import path from "path";

const handlingInsertData = () => {
  const db = connectToDatabase();
  const dataSource = path.resolve(`${process.cwd()}/bin/data/transactions.csv`);
  return new Promise((resolve, reject) => {
    fs.createReadStream(dataSource)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => {
      db.exec(`
        INSERT INTO transactions VALUES ('${row[0]}', '${row[1]}', '${row[2]}', '${row[3]}');
      `);
    })
    .on("end", () => {
      console.log('------------------ end to read the file --------------------------');
      db.close();
      resolve(console.log('DONE'));
    })
    .on("error", ((err) => {
      console.log('------------------ ERROR read the file ---------------------------', err);
      db.close();
      reject(err);
    }));
  })
  
}
export default handlingInsertData;