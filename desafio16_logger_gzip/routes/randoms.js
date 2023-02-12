const express = require("express");
const { Router } = express;
const { fork } = require("child_process");

let router = new Router();

router.get("/", (req, res) => {
    const repeticiones = req.query.cant || 100000000;

    const subproceso = fork("./utils/childProcess.js");
    
    subproceso.send(repeticiones);
    subproceso.on("message", (listado) => {
        res.render("randoms", { cantidad: repeticiones, data: listado });
    });
});

module.exports = router;
