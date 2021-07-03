import withSession from "../../lib/session";
import db from "../../lib/postgresSetup";

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  const permission = req.query.permission;
  if (user) {
    const text = `select permissions from users where user_uid=$1`;
    const values = [user.user_uid];
    const response = await db.query(text, values);
    if (response.rows == 0) {
      res.json({
        isLoggedIn: false,
      });
      return;
    }

    if (permission) {
      const permissions = response.rows[0].permissions;
      const authorized = permissions[permission];
      if (authorized) {
        res.json({
          isLoggedIn: true,
          authorized: true,
          permissions: permissions,
          ...user,
        });
      } else {
        res.json({
          isLoggedIn: true,
          authorized: false,
          permissions: permissions,
          ...user,
        });
      }
    } else {
      res.json({
        isLoggedIn: true,
        permissions: permissions,
        ...user,
      });
    }
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
