require('dotenv').config();
const {URL} = process.env;

module.exports = {
  jwt:{
        secret: "gembalaapp",
        expiresIn: 3600
    },
    url: URL,
    auth:{
      email: "test.gembala@gmail.com",
      password: "gembalapp1",
      password_app: "owoawahhflzhwkcf"
    }
}