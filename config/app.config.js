require('dotenv').config();
const {URL} = process.env;

module.exports = {
  // Confihuration JSON Web Token
  jwt:{
    secret: "$2a$19$QeyGVx5HvztvllwoKJnCBea1AMJCTUAioDLPepc7fCS.Sjd.ZdD3O",
    expiresIn: 18000
  },

  // Base URL
  url: URL,

  // configuration verification email
  auth:{
    email: "cs.gembala@gmail.com",
    password: "CS.Gembala",
    password_app: "rvdkurrjeliffqwj",
    url_redirect_verify: "http://gembala.sembadafarm.com/verify/success-verify"
  },

  // Configuration premium account
  premiumFarm:{
    limitTernak: 20
  },

  // configuration geo location
  geocode:{
    base_url: "http://geocode.xyz",
    auth: "456468407355067343971x122723",
    region: "ID",
    geoit: "JSON"
  }
}