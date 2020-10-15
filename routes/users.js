const express=require('express');
const router=express.Router();

const userController=require('../controllers/user_controller');

router.get('/profile',userController.profile);
router.get('/sign_up',userController.sign_up);
router.get('/sign_in',userController.sign_in);
router.post('/create', userController.create);

module.exports=router;