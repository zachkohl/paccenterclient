import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

export default NextAuth({
  // Configure one or more authentication providers
  // see https://next-auth.js.org/providers/credentials
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        //  console.log(credentials)
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

        //const response = await axios.get(`https://${credentials.username}:${credentials.password}@bonner.hopto.org/api/v1/user`)

        console.log("hello world");

        const userPayload =
          credentials.password === "y" && credentials.username === "x"
            ? { id: 1, name: "Zach", email: "zach.kohl@protonmail.com" }
            : null;

        if (userPayload) {
          return userPayload;
        } else {
          return null;
        }
      },
    }),
  ],
});
