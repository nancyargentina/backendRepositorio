const passport = require('passport')
const LocalStrategy= require('passport-local')
const userModel = require('../db/models/userModel')
let userContenedor =require('../DAC/userContenedor')
const userContainer= new userContenedor(userModel)

passport.use('login',new LocalStrategy({
    usernameField: 'email',
    passworField: 'password'},
    async (req, email,password,done)=>{
        const existe= await userContainer.userValidate(email,password)
        if (existe){            return done(null,false)       }
        done(null,existe)
    }
))