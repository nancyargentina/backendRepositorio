const express = require("express");
const { Router } = express;

let userContenedor =require('../DAC/userContenedor')
const userModel = require('../db/models/userModel')
const userContainer= new userContenedor(userModel)
const auth = require("../auth/auth");
const session = require("express-session");
let router = new Router();

router.get("/", auth, (req, res) => {
    res.render("login");
});
/*-------------------------------ingreso------------------------------------------------*/
router.get("/login", (req, res) => {
    const usuario = req.session.nombre;
    if (usuario) {
        res.render("insertProduct", { data: req.session.nombre });
    } else {
        res.render("login");
    }
});

router.post("/login",async (req, res) => {
    const existe = await userContainer.userValidate(req.body.email,req.body.password)
    if (existe){
        for (const key in req.body) {
            req.session[key] = req.body[key];
        }
        res.redirect('/')
    }else{
        res.render('errorLogin')
    }
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

/*-------------------------------registracion------------------------------------------------*/
router.get("/registro",(req,res)=>{
    res.render('registro')
})

router.post("/registro", async (req, res) => {

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

});

module.exports = router;
