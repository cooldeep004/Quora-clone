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

try{
    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
.populate({
    path:'comments',
    populate:{
        path: 'user'
    }
})
    //.exec(function(err,posts){
     let user=await  User.find({})
       //,function(err,user){
        return res.render('home',{
            title:'Home',
            posts:posts,
            users:user
        });  
      // })
    //})
}
catch(err){
console.log('error',err)
return;
}
}