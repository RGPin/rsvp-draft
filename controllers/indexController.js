const db = require("../db/queries");
const updateSheets = require("../services/sheets");

const indexGet = (req, res) => res.render("index");

const formResponsePost = async (req, res) => {
  const invited = await db.checkInvites(req.body.guestName);
  // if (!invited) idiots.push(req.body.guestName);
  res.render("response", { invited });
};

const guestResponsePost = async (req, res) => {
  const isAccept = req.body.response === "accept";
  const { token } = req.params;
  const guestObj = await db.updateGuestResponse(token, isAccept);
  const invites = await db.getAllInvites();
  await updateSheets(invites);
  res.render(isAccept ? "accepted" : "declined");
};

const displayListGet = async (req, res) => {
  const invitedList = await db.getAllInvites();
  // if (idiots.length !== 0) {
  //   return res.render("guestList", { invitedList, idiots });
  // }
  res.render("guestList", { invitedList });
};

module.exports = {
  indexGet,
  formResponsePost,
  guestResponsePost,
  displayListGet,
};
