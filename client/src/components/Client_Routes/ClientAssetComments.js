import React, { useContext } from "react";
import { UserContext } from "../App";



function ClientAssetComments ({comments, handleDeleteClientComment}){

    let loggedInUser=useContext(UserContext)
    
   

    // handle delete 
    function handleDeleteComment(e){
        handleDeleteClientComment(e.target.value)
    }

    return (
        <div>
            
                {comments.map((comment, index)=>{
            
            let remainder=comment.track_time%60;
            let parseSecs=remainder.toLocaleString(undefined, {minimumIntegerDigits: 2})
            let parseMins=parseInt(comment.track_time/60);
           return (
            <div id="asset-comments" key={index}>
                <p className="comment">{comment.body}</p>
                <p>{`at ${parseMins}:${parseSecs}`}</p>
                <p>{`by "${comment.user_name}"`}</p>

                {comment.user_id===loggedInUser.id? <button onClick={handleDeleteComment} value={comment.id}>delete comment</button> : null}
                
           </div>
           ) 
        })}
        </div>
        
    )
}

export default ClientAssetComments;