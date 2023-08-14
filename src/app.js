const express = require("express");

const app = express();
const routes = require("./routes/user.routes");
const routesRapair = require("./routes/repair.routes");

app.use(express.json());
app.use("/api/v1/users", routes);
app.use("/api/v1/repair", routesRapair);

module.exports = app;
