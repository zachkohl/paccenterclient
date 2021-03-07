import axios from "axios";

async function getEmail(username, password) {
  const response = await axios.get(
    `https://debBot:oo$C$NIweTJ9@bonner.hopto.org/api/v1/user/emails`,
    {
      auth: {
        username: username,
        password: password,
      },
    }
  );

  return response.data[0].email;
}

export default getEmail;
