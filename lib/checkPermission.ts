import db from "./postgresSetup";

async function checkPermission(req, permission) {
  const user = req.session.get("user");
  const text = `select permissions from users where user_uid=$1`;
  const values = [user.user_uid];
  const response = await db.query(text, values);

  if (response.rows.length > 0) {
    if (response.rows[0].permissions[permission]) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export default checkPermission;
