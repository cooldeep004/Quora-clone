const express=require('express');
const router=express.Router();
const passport=require('passport');
const userController=require('../controllers/user_controller');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/sign_up',userController.sign_up);
router.get('/sign_in',userController.sign_in);
router.post('/create', userController.create);
// use passport as amiddleware to authenticate
router.post('/session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/sign_in'
    }
),userController.createSession)
router.get('/sign-out',userController.destroySession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',   {
    failureRedirect:'/users/sign_in'
}), userController.createSession);
module.exports=router;