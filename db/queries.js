const pool = require("./pool");
/**
 * Returns list of all invites
 * @returns {Promise<{
 * guest_name: string,
 * responded: boolean,
 * attending: boolean,
 * responded_at: Date}[]
 * | null>}
 */
async function getAllInvites() {
  try {
    const { rows } = await pool.query(
      `
      SELECT guest_name, responded, attending, responded_at, token
      FROM invites
      `,
    );
    return rows;
  } catch (error) {
    throw new Error(`getAllInvites failed ${error.message}`);
  }
}

/**
 * Checks db if personName is in the invites
 * @param {string} personName
 * @returns {Promise<{guest_name: string, token: string} | null>}
 */
async function checkInvites(personName) {
  if (!personName) {
    throw new Error("checkInvites error: personName must be string.");
  }
  try {
    const { rows } = await pool.query(
      `
      SELECT guest_name, token
      FROM invites 
      WHERE LOWER(guest_name) = LOWER($1) 
      LIMIT 1
      `,
      [personName],
    );
    return rows[0] || null;
  } catch (error) {
    throw new Error(`checkInvites failed ${error.message}`);
  }
}

/**
 * Updates guest's RSVP response
 * @param {string} token - unique invite token must be from db
 * @param {boolean} response
 * @returns {Promise<{
 * guest_name: string,
 * token: string,
 * attending: boolean,
 * responded_at: Date
 * } | null>}
 */
async function updateGuestResponse(token, response) {
  if (typeof response !== "boolean") {
    throw new Error("updateGuestResponse error: response must be boolean.");
  }
  if (!token) {
    throw new Error("updateGuestResponse error: token must be provided.");
  }
  try {
    const { rows } = await pool.query(
      `
      UPDATE invites
      SET responded = TRUE,
          attending = $1,
          responded_at = NOW()
      WHERE token = $2
      RETURNING guest_name, token, attending, responded_at
      `,
      [response, token],
    );
    return rows[0] || null;
  } catch (error) {
    throw new Error(`updateGuestResponse failed ${error.message}`);
  }
}

/**
 *
 * @param {string} guestName
 * @returns {Promise<{
 * guest_name: string,
 * token: string
 * }|null>}
 */
async function addNewGuest(guestName) {
  if (typeof guestName !== "string") {
    throw new Error("addNewGuest error: guestName must be string.");
  }
  try {
    const { rows } = await pool.query(
      `
      INSERT INTO invites (guest_name)
      VALUES ($1)
      RETURNING guest_name, token;
      `,
      [guestName],
    );
    return rows[0] || null;
  } catch (error) {
    throw new Error(`addNewGuest failed ${error.message}`);
  }
}

async function removeGuest(token) {
  if (typeof token !== "string") {
    throw new Error("removeGuest error: token must be string.");
  }
  try {
    const { rows } = await pool.query(
      `
      DELETE FROM invites
      WHERE token = $1
      RETURNING guest_name, token;
      `,
      [token],
    );
    return rows[0] || null;
  } catch (error) {
    throw new Error(`removeGuest failed ${error.message}`);
  }
}

module.exports = {
  getAllInvites,
  checkInvites,
  updateGuestResponse,
  addNewGuest,
  removeGuest,
};
