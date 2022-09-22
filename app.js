const express = require('express');
const cors = require('cors');
const route = require('./routes/route');
const app = express();

const port = process.env.POST || 3000;

// Handler Cors
app.use(cors());

// Serialize dan Deserialize Input
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

route(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    }
);