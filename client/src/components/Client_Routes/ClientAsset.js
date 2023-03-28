import React, { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../App";
import ClientAssetComments from "./ClientAssetComments";

function ClientAsset ({url, clientId, index, name, comments, active_storage_attachment_id}){
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentTimeStamp, setCommentTimeStamp] = useState(0);
    const [commentText, setCommentText] = useState("");
    const [assetComments, setAssetComments] = useState(comments)

    const postingUser=useContext(UserContext)

// ------------- add comment to project asset -----------------
    function handleAddComment (commentTimeStamp, commentText){
        console.log("comment sent")
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
      }

// ------------ delete comment on asset --------
  function handleDeleteClientComment (id){
    console.log(id)
        fetch(`/comments/${id}`,{
            method: "DELETE"
        }).then(r=>r.json()).then((comment)=>{
            console.log(comment);
        setAssetComments(assetComments.filter((index)=>index.id!==comment.id))
        })
  }      
    
// ---------- on SHOW comment form ------------
function handleShowCommentForm (e){
    let audio = document.getElementById(`audio-element${e.target.value}`);
    setCommentTimeStamp(parseInt(audio.currentTime))
    console.log(`${audio.currentTime} of blob_id ${e.target.value}`);
    setShowCommentForm(!showCommentForm);
}

// pass comment state(s) up to ClientAssetContainer for "POST"
    function handleClick(e){
        handleAddComment(commentTimeStamp, commentText, e.target.value)
    }


    return (
        <div key={index}>
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

        <ClientAssetComments clientId={clientId} comments={assetComments} handleDeleteClientComment={handleDeleteClientComment}/>
       
        </div>
    )
}

export default ClientAsset;