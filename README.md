# Question 1 - Programming

## Description
---
    A NODE CLI APP
    It had two ways to run the List Question
* Running with **Database**
    + The **Migration** will take a bit long for the first run but later the application can run faster.
    + Using SQL query with high performance and speed.
* Running with **CVS**
    + No need to **Migration**.
    + Must take time to read the CSV file.
    + The running time on each question waiting longer when use with BD.
    + Performance and speed will same complex to optimize.
## Stack Usage
---
```bash
    $ Node JS
    $ TypeScript
    $ Sqlite3 Database
    $ inquirer
    $ csv
    $ axios
```
## Node JS
---
```bash
   $ v14.16.1
```
## How to run
---
1. git clone project
    + https://github.com/andrewtran2507/propine-demo-cli.git
2. Download the [CSV file](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip), and extract **transactions.csv.zip** and move to /propine-demo-cli/bin/data
3. cd propine-demo-cli
4. npm i
5. npm start

## Demo run with DB
---
![My Remote Imag](https://github.com/andrewtran2507/t2-real-time-ecommerce/blob/main/t2-real-time-ecommerce-BE/assets/run-with-db.png?raw=true)

## Demo run with CSV
---
![My Remote Imag](https://github.com/andrewtran2507/t2-real-time-ecommerce/blob/main/t2-real-time-ecommerce-BE/assets/run-with-csv.png?raw=true)


## Keep in touch
---
- Author
    + Andrew.Tran
    + tpt2213@gmail.com
