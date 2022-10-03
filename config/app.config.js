require('dotenv').config()

const config = {
    db: {
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "user": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
    },
    jwt:{
        secret: "secret",
        expiresIn: 3600
    }
}

console.log(config)

module.exports = config