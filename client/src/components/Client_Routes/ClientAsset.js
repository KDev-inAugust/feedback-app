import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../App";
import ClientAssetComments from "./ClientAssetComments";

function ClientAsset ({url, clientId, index, name, comments, active_storage_attachment_id}){
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentTimeStamp, setCommentTimeStamp] = useState(0);
    const [commentText, setCommentText] = useState("");
    const [assetComments, setAssetComments] = useState(comments);

// ----------- useContext to associate logged-in user with posted comments
    const postingUser=useContext(UserContext)
// ------------------------------------------------------------------------
    

// ------------- add comment to project asset -----------------
    function handleAddComment (commentTimeStamp, commentText){
        fetch("/comments",{
          method: "POST",
          headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            active_storage_attachment_id: active_storage_attachment_id ,
            user_id: postingUser.id,
            track_time: commentTimeStamp,
            body: commentText
        })
        }).then(r=>r.json()).then((data)=>{setAssetComments(data)});
        setShowCommentForm(false);
      }

// -------------update a comment on an asset ---------

function handleUpdateClientComment(commentBody, commentTime, id){
   
    fetch(`/comments/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            track_time: commentTime,
            body: commentBody
        })
    }).then(r=>r.json()).then((updatedComment)=>{setAssetComments(
        assetComments.map((index)=>{
            if(index.id===updatedComment.id){
                return updatedComment
            }
            else return index
        })

    )})
}

// ------------ delete a comment on an asset -------------
  function handleDeleteClientComment (id){
        fetch(`/comments/${id}`,{
            method: "DELETE"
        }).then(r=>r.json()).then((comment)=>{
        setAssetComments(assetComments.filter((index)=>index.id!==comment.id))
        })
  }      
    
// ---------- on SHOW comment form ------------
function handleShowCommentForm (e){
    let audio = document.getElementById(`audio-element${e.target.value}`);
    setCommentTimeStamp(parseInt(audio.currentTime))
    setShowCommentForm(!showCommentForm);
}

// ------- Click Event Handler for adding a comment
    function handleClick(e){
        handleAddComment(commentTimeStamp, commentText, e.target.value)
    }


    return (
        <div id="asset" key={index}>
            <h2>{name}</h2>
            <audio controls src={url} id={`audio-element${index}`} key={index}/>
            <button onClick={handleShowCommentForm} value={index}>add comment</button>

            {showCommentForm? 
                <div>
                    <p>comment at {`${parseInt(commentTimeStamp/60)}:${commentTimeStamp%60}`} seconds</p>
                    <input type="text" onChange={e=>setCommentText(e.target.value)}/>
                    <button onClick={handleClick} value={index}>add and close</button>
                </div>
                : 
                <p></p>}
            <ClientAssetComments 
                clientId={clientId} 
                comments={assetComments} 
                assetIndex={index}
                handleDeleteClientComment={handleDeleteClientComment}
                handleUpdateClientComment={handleUpdateClientComment}
            />

        </div>
    )
}

export default ClientAsset;