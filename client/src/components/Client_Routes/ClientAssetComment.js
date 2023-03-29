import { React, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";

function ClientAssetComment({comment, index, assetDuration, handleUpdateClientComment, handleDeleteClientComment }){
    const [showEditCommentFields, setShowEditCommentFields] = useState(false);
    const [commentBody, setCommentBody] = useState(null);
    // const [editMode, setEditMode] = useState(false)
    const [commentTime, setCommentTime] = useState(null);
    
    let loggedInUser=useContext(UserContext)

    // ---------- SHOW EDIT FORM --------------

    function handleShowEditForm(){
        setCommentTime(comment.track_time)
        setCommentBody(comment.body)
        setShowEditCommentFields(!showEditCommentFields);
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
        console.log(e.target.value)
        handleUpdateClientComment(commentBody, commentTime, id);
        setShowEditCommentFields(false);
    }

    // --------------handle delete --------------------

    function handleDeleteComment(e){
        handleDeleteClientComment(e.target.value);
        
    }




    let remainder=comment.track_time%60;
    let parseSecs=remainder.toLocaleString(undefined, {minimumIntegerDigits: 2})
    let parseMins=parseInt(comment.track_time/60);
   return (
    <div id="asset-comments" key={index}>
        <p className="comment">{comment.body}</p>
        <p>{`at ${parseMins}:${parseSecs}`}</p>
        <p>{`by "${comment.user_name}"`}</p>

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
            : <button onClick={handleShowEditForm} value={comment.id}>edit comment</button> }
            <button onClick={handleDeleteComment} value={comment.id}>delete comment</button> 
        </div>
        : null }
        
   </div>
   ) 


}


export default ClientAssetComment;