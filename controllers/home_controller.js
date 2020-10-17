const User=require('../models/user');
const Post=require('../models/post');
module.exports.home=function(req,res){
    //console.log(req.cookies);
    Post.find({},function(err,posts){
        return res.render('home',{
            title:'Home',
            posts:posts
        });
    });
}