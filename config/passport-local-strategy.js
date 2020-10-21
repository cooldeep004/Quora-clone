const passport =require('passport');
const LocalStrategy =require('passport-local').Strategy;

const User=require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true // for using the flassh messgaes
},
function(req,email,password,done){
//find a user and establish the identity
User.findOne({email:email},function(err,user)
{
    if(err)
    {
        req.flash('error','invalid username');
        return done(err);
    }
    if(!user || user.password!=password)
    {
        req.flash('error','invalid username');
        return done(null,false);
    }
    else{
        return done(null,user);
    }
})
}
));
//serializing to user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id); // kept user id as cookies
});

//deserialzing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log('errrrrrror');
            return done(err);
        }
        return done(null,user);
    })
})

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
   //if the user is signed in , the pass on the request to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signin
    return res.redirect('/users/sign_in');
}

passport.setAuthenticatedUser=function(req,res,next){
    //req. user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}


module.exports =passport;