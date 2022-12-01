function auth (req,res,next){
    if (req.session.nombre) {
         next()
    } else {
         res.render("login")
    }
}
module.exports = auth