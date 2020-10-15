const User=require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'profile'
    });
}
module.exports.sign_up = function (req, res) {
    return res.render('sign_up', {
        title: 'sign_up'
    });
}
module.exports.sign_in = function (req, res) {
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
                return res.redirect('/users/sign_in');
            })
        }
       else{
        return res.redirect('back');
       }
    })
   
}
module.exports.createSession = function (req, res) {

}