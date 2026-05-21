const express = require("express");

const indexRouter = express.Router();

const invitedList = ["christian", "ryan", "molina"];

indexRouter.get("/", (req, res) => res.render("index"));
indexRouter.post("/rsvp", (req, res) => {
  const invited = invitedList.includes(req.body.response.toLowerCase());
  res.render("response", { invited });
});

module.exports = indexRouter;
