import { React, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";

function ClientAssetComment({comment, index, assetIndex, handleUpdateClientComment, handleDeleteClientComment }){
    const [showEditCommentFields, setShowEditCommentFields] = useState(false);
    const [commentBody, setCommentBody] = useState(null);
    const [commentTime, setCommentTime] = useState(null);
    const [assetDuration, setAssetDuration] = useState(0)
    
    let loggedInUser=useContext(UserContext);
    
    console.log("asset duration", assetIndex);

    // ---------- SHOW EDIT FORM --------------
    function handleShowEditForm(){
        setCommentTime(comment.track_time)
        setCommentBody(comment.body)
        setShowEditCommentFields(!showEditCommentFields);
        let audio = document.getElementById(`audio-element${assetIndex}`);
        setAssetDuration(audio.duration)
    }

    // ----------EDIT COMMENT-----------------   

    function handleUpdateBody(e){
        setCommentBody(e.target.value);
    }

    function handleUpdateTimeStamp(e){
        setCommentTime(e.target.value);
    }

    function handleEditComment(e){
        const id=e.target.value;
        handleUpdateClientComment(commentBody, commentTime, id);
        setShowEditCommentFields(false);
    }

    // --------------handle delete --------------------

    function handleDeleteComment(e){
       if(window.confirm("are you sure? deleting a comment cannot be undone.") === true){
        handleDeleteClientComment(e.target.value);
       } 
        
    }


    let remainder=comment.track_time%60;
    let parseSecs=remainder.toLocaleString(undefined, {minimumIntegerDigits: 2})
    let parseMins=parseInt(comment.track_time/60);
   return (
    <div id="asset-comments" key={index}>
        <p className="comment">{comment.body}</p>
        <p>{`at ${parseMins}:${parseSecs}`}</p>
        <p>{`by "${comment.user_name}"`}</p>

    {/* add edit buttons if this comment is yours as a client */}

        {comment.user_id===loggedInUser.id? 
        <div>
            {showEditCommentFields? 
                <div>
                    <p>edit comment</p>
                    <input type="text" onChange={handleUpdateBody} value={commentBody}/>
                    <p>{`edit comment time stamp, choose a number between 0 and ${assetDuration}`}</p>
                    <input type="number" min="0" max={`${assetDuration}`} 
                        onChange={handleUpdateTimeStamp} value={parseInt(commentTime%60)} />
                </div>
                :null}
            { showEditCommentFields? 
                <div>
                <button onClick={handleEditComment} value={comment.id}>save and close</button> 
                <button onClick={handleShowEditForm}>cancel</button>
                </div>
            : 
            <div>
                <button onClick={handleShowEditForm} value={comment.id}>edit comment</button> 
                <button onClick={handleDeleteComment} value={comment.id}>delete comment</button> 
            </div>
          
            }
            
        </div>
        // you don't get edit buttons, this is someone else's comment.
        : null }
        
   </div>
   ) 


}


export default ClientAssetComment;