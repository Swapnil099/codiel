
// method to createPost by ajax
const createPost = function(){
    const newPostForm = $('#postForm');
    newPostForm.submit(function(e){
        e.preventDefault();
        console.log("clicked");
        $.ajax({
            type:'post',
            url:'/posts/create-post',
            data: newPostForm.serialize(),
            success: function(data){
                const GetUploadTime = postTime(data.data.post);
                const newPostDom = createNewPostDom(data.data.post,GetUploadTime);
                $('#all_content>ul').prepend(newPostDom);
                deletePost($('.delete_post_button' , newPostDom));
            },
            error:function(error){
                console.log(error.responseText);
            }
        });
    })
}


// post time indicator function
const postTime = function(post){
    const currDate = new Date();
    const diffInSeconds = Math.abs(post.createdAt - currDate) / 1000; 
    const days = Math.floor(diffInSeconds / 60 / 60 / 24); 
    const hours = Math.floor(diffInSeconds / 60 / 60 % 24); 
    const minutes = Math.floor(diffInSeconds / 60 % 60); 

    if(days > 0){
        return `Posted ${days} Ago`;
    }
    else if(hours > 0){
        return `Posted ${hours} Ago`;
    }
    else if(minutes > 2){
        return `Posted ${minutes} Ago`;
    }
    else{
        return `Posted Just Now`;
    }
}

// method to prepend post in DOM

const createNewPostDom = function(post,uploadTime){
    return $(`<li id="post-${post._id}">
                <div class="feed_post">
                    <div class="upload_time">
                        <p> ${uploadTime} </p>
                    </div>
                    <div class="user_info">
                        <div class="user_info_2">
                            <img src="${post.user.avatar}" alt="Avatar" class="dp_img">
                            <p> <a href="/user/show-profile/${post.user._id}"> ${ post.user.first_name } ${ post.user.last_name } </a> </p>
                        </div>
                        <div class="post_delete_button">
                            <a class="delete_post_button" href="/posts/delete-post/${ post._id }" > <i class="fas fa-trash"></i> </a>    
                        </div>

                    </div>
                    <p class="caption">${ post.content }</p>
                    <p> <i class="fas fa-thumbs-up"></i> 15 Peoples liked this post  </p>
                    <hr width="100%" color="black">
                    <div class="like_comment">
                        <div class="like_btn_div">
                            <a href=""> <i class="far fa-heart"></i> </a>
                            <p>Like</p>
                        </div>
                        <div class="comment_btn_div">
                            <a onclick="toggleCommentSec('${post._id}')" > <i class="far fa-comment"></i> </a>
                            <p>Comment</p>
                        </div>
                    </div>

                    <div  class="comment_display ${post._id} hidden-content" id="comment_id">
                        <form id="create_comment"  action="/comment/create" method="post">
                            <textarea name="comment_content" id="" cols="60" rows="2" placeholder="Write Comment"></textarea>
                            <input type="hidden" value="${post._id}" name="post_id">
                            <input type="hidden" value="<%= locals.user._id %>" name="comment_user_id" >
                            <button type="submit">Comment</button>
                        </form>
                    </div>
                </div>
            </li>`)
}

const deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url: $(deleteLink).prop('href'),
            success:function(data){
                let toDelete = `#post-${data.data.post_id}`;
                $(toDelete).remove();
            },
            error: function(error){
                console.log(error.responseText);
            }
        });
    });
}


createPost();



// comment Functionalities by ajax


const postComment = function(){
    const commentForm = $('#create_comment');
    commentForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/comment/create',
            data: commentForm.serialize(),
            success:function(data){
                const newCommentDOM = createCommentDOM(data.data.sendComment);
                $(`#post_commment_${data.data.sendComment.post_id}`).prepend(newCommentDOM);

            },
            error:function(err){
                console.log(error.responseText);
                
            }
        });
    });
}

const createCommentDOM = function(comment){
    return $(`
            <li id="comment_id_${comment._id}">
                <div class="comment ">
                    <div class="comment_userinfo">
                        <div class="comment_userinfo_1">
                            <img src="${comment.user_id.avatar}" alt="Avatar">
                            <p> ${comment.user_id.first_name} ${comment.user_id.last_name}</p>
                        </div>
                
                        <div class="comment_userinfo_2">
                            <a href="/comment/delete/${comment._id}"> <i class="fas fa-trash"></i> </a>    
                        </div>
                    </div>
                    <div class="comment_content">
                        <p> ${comment.content} </p>
                    </div>
                </div>
            </li>   
    `);
};

postComment();



