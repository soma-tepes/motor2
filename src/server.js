require("dotenv").config();
const app = require("./app");

const { db } = require("./basedata/config");
const initModel = require("./models/initModel");

db.authenticate()
  .then(() => console.log("DataBase conected"))
  .catch(() => console.log("error failed conection 🤬"));

initModel();

db.sync(/* { force: true } */)
  .then(() => console.log("DataBase syncro"))
  .catch(() => console.log("error failed syncro 🤬"));

app.listen(process.env.PORT, () => {
  console.log(`Port run server 😀 ${process.env.PORT}`);
});
