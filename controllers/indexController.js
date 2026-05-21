const invitedList = [
  {
    name: "christian",
    isAccept: null,
  },
  {
    name: "ryan",
    isAccept: null,
  },
  {
    name: "molina",
    isAccept: null,
  },
];

const idiots = [];

const indexGet = (req, res) => res.render("index");

const formResponsePost = (req, res) => {
  const invited = invitedList
    .map((guest) => guest.name)
    .includes(req.body.guestName);
  if (!invited) idiots.push(req.body.guestName);
  res.render("response", { invited, guestName: req.body.guestName });
};

const guestResponsePost = (req, res) => {
  const isAccept = req.body.response === "accept";
  const { guestName } = req.params;
  const guestObj = invitedList.find((guest) => guest.name === guestName);
  if (isAccept) {
    guestObj.isAccept = true;
    res.render("accepted");
  } else {
    guestObj.isAccept = false;
    res.render("declined");
  }
};

const displayListGet = (req, res) => {
  if (idiots.length !== 0) {
    return res.render("guestList", { invitedList, idiots });
  }
  res.render("guestList", { invitedList });
};

module.exports = {
  indexGet,
  formResponsePost,
  guestResponsePost,
  displayListGet,
};
