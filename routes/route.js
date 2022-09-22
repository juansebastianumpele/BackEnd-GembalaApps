const UserController = require("../controllers/user.controller");
const AuthController = require("../controllers/auth.controller");
const KandangController = require("../controllers/kandang.controller");


// Define url API in here
const _routes = [
    ['/auth', AuthController],
    ['/user', UserController],
    ['/kandang', KandangController]
];

const routes = (app) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(`/api${url}`, controller);
    })
}

module.exports = routes;