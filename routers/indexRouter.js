const express = require("express");

const indexRouter = express.Router();
const controller = require("../controllers/indexController");

indexRouter.get("/", controller.indexGet);
indexRouter.post("/rsvp", controller.formResponsePost);
indexRouter.post("/response/:token", controller.guestResponsePost);
indexRouter.get("/supersecretstuff", controller.displayListGet);
indexRouter.post("/supersecretstuff/add", controller.addGuestPost);
indexRouter.post("/supersecretstuff/remove/:token", controller.removeGuestPost);

module.exports = indexRouter;
