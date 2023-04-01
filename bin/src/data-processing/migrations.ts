import handlingInsertData from "./insertData";

const startMigrations = async () => {
  console.log(' ========== start migrations ======== ');
  console.log(new Date());
  await handlingInsertData();
  console.log(new Date());
}

export {
  startMigrations
}