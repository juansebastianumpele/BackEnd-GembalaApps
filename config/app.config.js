require('dotenv').config();
const {URL} = process.env;

module.exports = {
  jwt:{
        secret: "$2a$19$QeyGVx5HvztvllwoKJnCBea1AMJCTUAioDLPepc7fCS.Sjd.ZdD3O",
        expiresIn: 3600
    },
    url: URL,
    auth:{
      email: "test.gembala@gmail.com",
      password: "gembalapp1",
      password_app: "owoawahhflzhwkcf",
      url_redirect_verify: "https://gembala.netlify.app/verify/success-verify"
    }
}