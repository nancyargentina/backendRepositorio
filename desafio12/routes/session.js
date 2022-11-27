const express = require("express");
const { Router } = express;
const session = require("express-session");
let router = new Router();

router.get("/login", (req, res) => {
    const usuario = req.session.nombre;
    if (usuario) {
        res.render("insertProduct", { data: req.session.nombre });
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
    res.redirect("/login");
});

router.get("/logout", (req, res) => {
    const nombre = req.session.nombre;
    req.session.destroy((error) => {
        if (error) {
            res.send("Error cerrando la sesión");
        } else {
            res.render("logout", { data: nombre });
        }
    });
});
module.exports = router;
