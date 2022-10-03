const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const kandangController = require("../controllers/kandang.controller");
const pakanController = require("../controllers/pakan.controller");
const faseController = require("../controllers/fase.controller");
const penyakitController = require("../controllers/penyakit.controller");
const varietasController = require("../controllers/varietas.controller");
const kawinController = require("../controllers/kawin.controller");
const timbanganController = require("../controllers/timbangan.controller");
const ternakController = require("../controllers/ternak.controller");
const blokKandangController = require("../controllers/blokkandang.controller");

// Define url API in here
const _routes = [
    ['/auth', authController],
    ['/users', userController],
    ['/kandang', kandangController],
    ['/pakan', pakanController],
    ['/fase', faseController],
    ['/penyakit', penyakitController],
    ['/varietas', varietasController],
    ['/kawin', kawinController],
    ['/timbangan', timbanganController],
    ['/ternak', ternakController],
    ['/blok-kandang', blokKandangController],
];

const routes = (app, db) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(`/api${url}`, controller(db));
    })
}

module.exports = routes;