const express = require("express");
const path = require("node:path");

const app = express();
const indexRouter = require("./routers/indexRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

const PORT = 8000;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`App is listening to port ${PORT}...`);
});
