const express = require("express");
const { Router } = express;
const passport = require("passport");


let userContenedor = require("../DAC/userContenedor");
const userModel = require("../db/models/userModel");
const userContainer = new userContenedor(userModel);
const auth = require('../auth/auth');
const session = require("express-session");
let router = new Router();

router.get("/", auth, (req, res) => {
    res.render("login");
});
/*-------------------------------ingreso------------------------------------------------*/
router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/errorLogin", (req, res) => {
    res.render("errorLogin");
});

router.get("/logout",auth, (req, res) => {
    const nombre = req.user.nombre;
    req.logout((error) => {
        if (error) {
            res.send("Error cerrando la sesión");
        } else {
            res.render("logout", { data: nombre });
        }
    });
});
router.post("/login",
    passport.authenticate("login", {
        failureRedirect: "/errorLogin",
        successRedirect: "/insertProduct",
    })
);

/*router.post("/login",async (req, res) => {
   // login con session sin passport
    const existe = await userContainer.userValidate(req.body.email,req.body.password)

    if (existe){
        for (const key in req.body) {
            req.session[key] = req.body[key];
        }
        req.session["nombre"] = existe.nombre
        console.log(req.session.nombre )
        res.render("insertProduct", { data: req.session.nombre });
    }else{
        res.render('errorLogin')
    }
}); */

/*-------------------------------registracion------------------------------------------------*/
router.get("/registro", (req, res) => {
    res.render("registro");
});

router.get("/errorRegistro", (req, res) => {
    res.render("errorRegistro");
});

router.post("/registro",
    passport.authenticate("registro", {
        failureRedirect: "/errorRegistro",
        successRedirect: "/insertProduct",
    })
);
/* router.post("/registro",async(req,res)=>{
    // registro con session sin passport
    const { nombre, email, password } = req.body;
    const existe = await userContainer.userRegisted(email,password)
    if (existe==null ||existe.length==0){
        const userNew = {
            nombre: nombre,
            email: email,
            password: password,
        };
        const a=await userContainer.save(userNew)
        console.log(a)
        res.redirect('/')
    }else{
        res.render('errorRegistro')
    }
})*/
module.exports = router;
