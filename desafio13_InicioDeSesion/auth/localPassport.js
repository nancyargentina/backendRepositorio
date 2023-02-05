const passport = require("passport");
const LocalStrategy = require("passport-local");
const passEncrypt= require('../auth/passEncrypt')
const userModel = require("../db/models/userModel");
let userContenedor = require("../DAC/userContenedor");
const userContainer = new userContenedor(userModel);

passport.use( "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passworField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            const usuario= await userContainer.getByEmail(email)
            //const existe = await userContainer.userValidate(email, password);
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
            const existe = await userContainer.userRegisted(email, password);
            if (existe!=null && existe.length>0){
                //usuario existe
                return done(null, false);
            }else{
                //creo usuario nuevo
                const userNew = {
                    nombre: req.body.nombre,
                    email: email,
                    password: passEncrypt.encryptPassword(password) ,
                };
                const a = await userContainer.save(userNew);
                console.log(a);
                done(null, a);
            }
        }
    )
);
passport.serializeUser((usuario,done)=>{
    done(null,usuario.id)
})
passport.deserializeUser(async(id,done)=>{
const usuarioDB= await userContainer.getById(id) 
done(null,usuarioDB)
})
