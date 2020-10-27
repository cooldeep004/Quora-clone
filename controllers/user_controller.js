const User=require('../models/user');
const fs=require('fs');
const path=require('path');
module.exports.profile = function (req, res) {
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'profile',
            users: user
        });
    })
   
}



module.exports.update= async function(req,res){
  /*  if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user)
    {
        return res.redirect('back');
    })
    
    }
    else{
        return res.status(401).send('Unauthorized');
    }*/
if(req.user.id==req.params.id)
{
try{
let user=await User.findById(req.params.id);
User.uploadedAvatar(req,res,function(err){
    if(err)
    {
        console.log('*******Multer Error',err);

    }
    user.name=req.body.name;
    user.email=req.body.email;
    if(req.file){

        if(user.avatar)
        {
            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
        }
        //this is saving path to uploadaed file into avatar field in the user
        user.avatar=User.avatarPath +'/'+ req.file.filename;
    }
    user.save();
    return res.redirect('back');
})
}
catch(err)
{  
    return res.redirect('back');  
}
}else{
    
    return res.status(401).send('Unauthorized');
}
}


module.exports.sign_up = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_up', {
        title: 'sign_up'
    });
}
module.exports.sign_in = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_in', {
        title: 'sign_in'
    });
}

module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back')
    }
    User.findOne({email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error');
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('errror');
                    return;
                }
                req.flash('success', 'succesfully_sign-up!!!!');

                return res.redirect('/users/sign_in');
            })
        }
       else{
        return res.redirect('back');
       }
    })
   
}
module.exports.createSession = function (req, res) {
    req.flash('success','logged in');
return res.redirect('/');
}


module.exports.destroySession=function(req,res){
    req.flash('success','logged out');
    req.logout();
    return res.redirect('/');
}