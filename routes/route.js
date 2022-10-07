const userController = require("../controllers/user.controller");
const AuthController = require("../controllers/auth.controller");
const KandangController = require("../controllers/kandang.controller");
const PakanController = require("../controllers/pakan.controller");
const FaseController = require("../controllers/fase.controller");
const PenyakitController = require("../controllers/penyakit.controller");
const VarietasController = require("../controllers/varietas.controller");
const KawinController = require("../controllers/kawin.controller");
const TimbanganController = require("../controllers/timbangan.controller");
const TernakController = require("../controllers/ternak.controller");
const RiwayatKesehatanController = require("../controllers/riwayat_kesehatan.controller");
const VerifyController = require("../controllers/verify.controller");
const blokKandangController = require("../controllers/blokkandang.controller");

// Define url API in here
const _routes = [
    ['/auth', AuthController],
    // ['/users', userController],
    ['/kandang', KandangController],
    ['/pakan', PakanController],
    ['/fase', FaseController],
    ['/penyakit', PenyakitController],
    ['/varietas', VarietasController],
    ['/kawin', KawinController],
    ['/timbangan', TimbanganController],
    ['/ternak', TernakController],
    ['/riwayat-kesehatan', RiwayatKesehatanController],
    ['/verify', VerifyController],
    // ['/blok-kandang', blokKandangController],
];

const routes = (app) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(`/api${url}`, controller);
    })
}

module.exports = routes;