const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const kandangController = require("../controllers/kandang.controller");
const pakanController = require("../controllers/pakan.controller");
const bahanPakanController = require("../controllers/bahan_pakan.controller");
const faseController = require("../controllers/fase.controller");
const penyakitController = require("../controllers/penyakit.controller");
const bangsaController = require("../controllers/bangsa.controller");
const kawinController = require("../controllers/kawin.controller");
const timbanganController = require("../controllers/timbangan.controller");
const ternakController = require("../controllers/ternak.controller");
const riwayatKesehatanController = require("../controllers/riwayat_kesehatan.controller");
const rfidController = require("../controllers/rfid.controller");
const dashboardController = require("../controllers/dashboard.controller");

// Define url API in here
const _routes = [
    ['/auth', authController],
    ['/users', userController],
    ['/kandang', kandangController],
    ['/pakan', pakanController],
    ['/bahan-pakan', bahanPakanController],
    ['/fase', faseController],
    ['/penyakit', penyakitController],
    ['/bangsa', bangsaController],
    ['/kawin', kawinController],
    ['/timbangan', timbanganController],
    ['/ternak', ternakController],
    ['/riwayat-kesehatan', riwayatKesehatanController],
    ['/rfid', rfidController],
    ['/dashboard', dashboardController],
];

const routes = (app, db) => {
    // Routing
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(`/api${url}`, controller(db));
    })
}

module.exports = routes;