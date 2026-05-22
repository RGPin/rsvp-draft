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
      SELECT guest_name, responded, attending, responded_at 
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
    if (!rows[0]) return null;
    return rows[0];
  } catch (error) {
    throw new Error(`updateGuestResponse failed ${error.message}`);
  }
}

module.exports = {
  getAllInvites,
  checkInvites,
  updateGuestResponse,
};
