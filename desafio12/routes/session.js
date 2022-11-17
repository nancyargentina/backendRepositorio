const express = require("express");
const { Router } = express;
let router = new Router();

router.get("/login", (req, res) => {
    const usuario = req.session.nombre
    if (usuario){
        res.redirect('/insertProduct')
    }else{
        res.render("login");
    } 
});
router.post("/login",(req,res)=>{
    for (const key in req.body) {
        
      req.session[key] = req.body[key]   
      console.log(req.session)   
    }
    //console.log(req.session)
    //res.render("insertProduct",{data:req.session.nombre})
    res.send({'Datos guardados con exito':req.session})
})

module.exports = router;