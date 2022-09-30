const UserController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const KandangController = require("../controllers/kandang.controller");
const PakanController = require("../controllers/pakan.controller");
const FaseController = require("../controllers/fase.controller");
const PenyakitController = require("../controllers/penyakit.controller");
const VarietasController = require("../controllers/varietas.controller");
const KawinController = require("../controllers/kawin.controller");
const TimbanganController = require("../controllers/timbangan.controller");
const TernakController = require("../controllers/ternak.controller");
const BlokKandangController = require("../controllers/blokkandang.controller");

// Define url API in here
const _routes = [
    ['/auth', authController],
    // ['/users', UserController],
    // ['/kandang', KandangController],
    // ['/pakan', PakanController],
    // ['/fase', FaseController],
    // ['/penyakit', PenyakitController],
    // ['/varietas', VarietasController],
    // ['/kawin', KawinController],
    // ['/timbangan', TimbanganController],
    // ['/ternak', TernakController],
    // ['/blok-kandang', BlokKandangController],
];

const routes = (app, db) => {
    console.log(db);
    _routes.forEach((route) => {
        console.log('====================')
        const [url, controller] = route;
        app.use(`/api${url}`, controller(db));
    })
}

module.exports = routes;