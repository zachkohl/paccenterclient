import fetchJson from "../../lib/fetchJson";
import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const { username, password } = await req.body;
  const address = `https://${req.body.username}:${req.body.password}@bonner.hopto.org/api/v1/user`;

  try {
    // we check that the user exists on GitHub and store some data in session
    const response = await fetchJson(address);
    req.session.set("user", response);
    await req.session.save();
    res.json({ user: response, message: "complete" });
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
