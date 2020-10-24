const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes/comments');




module.exports.create = function (req, res) {
    Post.findById(req.body.post, function (err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                if (err) {
                    console.log('errrr');
                    return;
                }
                post.comments.push(comment);
                post.save();



                if (req.xhr){
                
    
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Comment created!"
                    });
                }

                req.flash('success', 'comment created!');


                return res.redirect('back');
            });
        }
    });
}

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) {
            console.log('errror in deleting comment');
            return;
        }

        if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "comment deleted"
            });
        }
        let postId = comment.post;
        //console.log(comment.user);
        Post.findOne({ _id: postId }).populate('user').exec(function (err, post) {
            if (req.user.id == post.user.id) {
                //   console.log(post.user.id);
                comment.remove();
                Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                 
                    
                    if (req.xhr){
                        return res.status(200).json({
                            data: {
                                comment_id: req.params.id
                            },
                            message: "comment deleted"
                        });
                    }

                    req.flash('success', 'Comment deleted!');


                    return res.redirect('back');
                })
            }
            //console.log(post.user);


            else if (comment.user == req.user.id || req.user.id == postId.user) {
                comment.remove();
                Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {

                    if (req.xhr){
                        return res.status(200).json({
                            data: {
                                comment_id: req.params.id
                            },
                            message: "comment deleted"
                        });
                    }
                    req.flash('success', 'Comment deletedgggggg!');

                    return res.redirect('back');
                })

            }
            else
                return res.redirect('back');
        })
    })
}