const { google } = require("googleapis");
const db = require("../db/queries");

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function updateSheets(invites) {
  console.log("seeding...");
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        ["Guest Name", "Responded", "Attending", "Responded At"],
        ...invites.map((guest) => [
          guest.guest_name,
          guest.responded,
          guest.attending,
          guest.responded_at
            ? new Date(guest.responded_at).toLocaleDateString()
            : "",
        ]),
      ],
    },
  });
  console.log("done");
}

module.exports = updateSheets;
