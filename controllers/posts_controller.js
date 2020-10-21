const Post =require('../models/post');
const Comment=require('../models/comment');
module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){

if(req.xhr){
    return res.status(200).json({
        data:{
            post:post
        },
        message:"Post created"
    })
}

        if(err)
        {
            console.log('errrrrrr in creating post',err);
            return;
        }
        return res.redirect('back');
    })
}

module.exports.destroy = async function(req,res){
  let post=await  Post.findById(req.params.id);
        //.id means converting the object id into string
        
        if(post.user ==req.user.id){
            post.remove();
await Comment.deleteMany({post:req.params.id})


if(req.xhr){
    return res.status(200).json({
        data:{
            post_id:req.params.id
        },
        message:"post deleted"
    })
}


    return res.redirect('back');

        }
    
}