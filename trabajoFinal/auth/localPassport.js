const passport = require("passport");
const LocalStrategy = require("passport-local");
const passEncrypt= require('./passEncrypt')
const {userDao}=require('../daos/index')
passport.use( "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passworField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            const usuario= await userDao.getByEmail(email)
            //const existe = await userDao.userValidate(email, password);
            if (usuario && passEncrypt.comparePassword(password,usuario.password) ) {                
                return done(null, usuario);
            } else {
                done(null, false);
            }
        }
    )
);

passport.use("registro",
    new LocalStrategy(
        {
            usernameField: "email",
            passworField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            const existe = await userDao.userRegisted(email, password);
            if (existe!=null && existe.length>0){
                //usuario existe
                return done(null, false);
            }else{
                //creo usuario nuevo
                const userNew = {
                    nombre: req.body.nombre,
                    email: email,
                    password: passEncrypt.encryptPassword(password),
                    dirección: {calle:req.body.calle, 
                        numero:req.body.numero, 
                        ciudad:req.body.ciudad,
                        provincia:req.body.provincia,
                        pais: req.body.pais
                    },
                    edad: Number(req.body.edad),
                    telefono: req.body.telefono,
                    foto:req.body.avatar
                };
                const a = await userDao.save(userNew);
                console.log(a);
                done(null, a);
            }
        }
    )
);
passport.serializeUser((usuario,done)=>{
    done(null,usuario.id)
})
passport.deserializeUser(async (id, done) => {
    const usuarioDB = await userDao.getById(id);
    done(null, usuarioDB);
});
