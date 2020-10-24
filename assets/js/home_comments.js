
console.log('helloqwertyui');
class PostComments{

    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);
      console.log('asdfgfdghbvcfghbnvg');
        this.createComment(postId)
        let self = this;

        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));


                    //noty for notification animation
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // CHANGE :: show the count of zero likes on this comment

        return $(`<div id="comment-${comment._id }">
        ${comment.content }

        <small>
        ${ comment.user.name }
        </small>

        <small>
                <a href="/comments/destroy/${ comment._id }">X</a>
        </small>
    

       </div>`);
    }



    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
          e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
               


                    new Noty({
                        theme: 'relax',
                        text: "Comment Deletedsssss",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

   /* convertPostsToAjax = function(){
        $('.posts-list-containers').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);
             //console.log(this);
            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            //console.log(postId);
            
        });
    }*/
   // convertcommentsToAjax();

}
