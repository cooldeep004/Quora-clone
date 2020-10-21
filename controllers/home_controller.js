const User=require('../models/user');
const Post=require('../models/post');
const { post } = require('../routes');
module.exports.home=async function(req,res){
    //console.log(req.cookies);
   /* Post.find({},function(err,posts){
        return res.render('home',{
            title:'Home',
            posts:posts
        });
    });*/

   Post.find({})
    .populate('user')
.populate({
    path:'comments',
    populate:{
        path: 'user'
    }
})
    .exec(function(err,posts){
       User.find({},function(err,user){
        return res.render('home',{
            title:'Home',
            posts:posts,
            users:user
        });  
       })
    })
}