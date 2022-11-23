const express = require("express");
const { Router } = express;
const session = require("express-session");
let router = new Router();

router.get("/login", (req, res) => {
    const usuario = req.session.nombre;
    if (usuario) {
        res.render("insertProduct",{data:req.session.nombre});
    } else {
        res.render("login");
    }
});

router.post("/login", (req, res) => {
    //console.log(req.body);
    //console.log(req.session);
    for (const key in req.body) {
        req.session[key] = req.body[key];
    }
    res.redirect('/login');
});

module.exports = router;
