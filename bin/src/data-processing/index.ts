import fs from "fs";
import { parse } from "csv";
import path from "path";
import { defCurrency } from "../utils/constant";
import connectToDatabase from "./db";

const getDataProcessing = (token: string | null, date: number | null) => {
  return new Promise((resolve, reject) => {
    const dataSource = path.resolve(`${process.cwd()}/bin/data/transactions.csv`);
    const portfolio: any = {};

    fs.createReadStream(dataSource)
        .pipe(parse({ delimiter: ",", columns: true }))
        .on("data", (row) => {
          if (token && token !== row.token)
            return;

          const timestamp = Number(row.timestamp);
          if (date && date < timestamp)
            return;

          if (row.transaction_type === 'DEPOSIT')
            portfolio[row.token] = (portfolio[row.token] ?? 0.00) + Number(row.amount);
          else if (row.transaction_type === 'WITHDRAWAL')
            portfolio[row.token] = (portfolio[row.token] ?? 0.00) - Number(row.amount);
        })
        .on("end", () => {
          console.log('------------------ end to read the file --------------------------');
          resolve({ portfolio });
        })
        .on("error", reject);
  });
};

const getExtWHERE = (token: string | null, date: number | null): string => {
  let strExtraWHERE = ``;
  // const timeCnt = '>= (CAST(t.timestamp as decimal) - CAST(t.timestamp as decimal) % 86400)';
  const timeCnt = '> CAST(t.timestamp as decimal)';
  const tToken = 't.token =';
  if (token && date) {
    strExtraWHERE = ` WHERE ${tToken} '${token}' AND ${date} ${timeCnt} `;
  } else if (token && !date) {
    strExtraWHERE = ` WHERE ${tToken} '${token}' `;
  } else if (!token && date) {
    strExtraWHERE = ` WHERE  ${date} ${timeCnt} `;
  }
  return strExtraWHERE;
}

const getDataFromDB = async (token: string | null, date: number | null) => {
  const db = connectToDatabase(),
  portfolio: any = {},
  strPickData =
  `
    SELECT
    t.token,
    SUM (
      CASE 
        WHEN t.transaction_type = 'WITHDRAWAL' THEN CAST(t.amount as decimal) * (-1)
        ELSE CAST(t.amount as decimal)
      END
    ) AS 'value'
    FROM transactions t
    ${getExtWHERE(token, date)}
    GROUP BY t.token;
  `;
  const takeData = new Promise((resolve, reject) => {
    db.all(strPickData, [], (err, rows: {token: string; value: string;}[]) => {
      if (err) {
        return reject(err);
      }
      if (rows?.length > 0) {
        rows.map(({token, value}: {token: string; value: string;}) => {
          portfolio[token] = value;
        });
      }
      resolve({portfolio});
    });
  });
  const data: any = await takeData;
  db.close();
  return data;
}

const mappingPortfolioAndPrice = (portfolio: {}[], price: []): void => {
  Object.keys(portfolio)
    .map((key: any) => {
      portfolio[key] = portfolio[key] as number * price[key][defCurrency]
    });
}

export {
  getDataFromDB,
  getDataProcessing,
  mappingPortfolioAndPrice
}