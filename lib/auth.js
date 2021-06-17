import bcrypt from "bcrypt";

async function compare(password, hash) {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
}
module.exports.compare = compare;

const saltRounds = 10;

async function hash(password) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}
module.exports.hash = hash;

function token(userObject) {
  const token = jwt.sign(userObject, privateKey);
  return token;
}

module.exports.token = token;

import { parseCookies, setCookie, destroyCookie } from "nookies";
var jwt = require("jsonwebtoken");
var privateKey = "veryPrivateKey";

function setToken(res, userObject) {
  const ctx = { res: res };
  const token = jwt.sign(userObject, privateKey);
  setCookie(ctx, "bearer", token, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
}

module.exports.setToken = setToken;

function auth(ctx) {
  ctx = ctx.res ? ctx : { res: ctx };
  const cookies = parseCookies(ctx);
  const verify = cookies.bearer
    ? jwt.verify(cookies.bearer, privateKey)
    : false;

  if (!verify) {
    ctx.res.writeHead(302, {
      location: "/login",
    });
    ctx.res.end();
  }

  return verify;
}

module.exports.auth = auth;
