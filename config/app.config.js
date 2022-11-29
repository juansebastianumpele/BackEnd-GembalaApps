require('dotenv').config();
const {URL} = process.env;

module.exports = {
  jwt:{
        secret: "$2a$19$QeyGVx5HvztvllwoKJnCBea1AMJCTUAioDLPepc7fCS.Sjd.ZdD3O",
        expiresIn: 18000
    },
  url: URL,
  auth:{
    email: "test.gembala@gmail.com",
    password: "gembalapp1",
    password_app: "owoawahhflzhwkcf",
    url_redirect_verify: "http://gembala.sembadafarm.com/verify/success-verify"
  },
  premiumFarm:{
    limitTernak: 20
  },
  geocode:{
    base_url: "http://geocode.xyz",
    auth: "456468407355067343971x122723",
    region: "ID",
    geoit: "JSON"
  }
}