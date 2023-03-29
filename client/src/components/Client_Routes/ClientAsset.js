import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../App";
import ClientAssetComments from "./ClientAssetComments";

function ClientAsset ({url, clientId, index, name, comments, active_storage_attachment_id}){
    const [assetDuration, setAssetDuration] = useState(0);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentTimeStamp, setCommentTimeStamp] = useState(0);
    const [commentText, setCommentText] = useState("");
    const [assetComments, setAssetComments] = useState(comments);

    const postingUser=useContext(UserContext)

    useEffect(()=>{
        let audio = document.getElementById(`audio-element${index}`);
       setAssetDuration(audio.duration)
    },)

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
        setShowCommentForm(false)
      }
// -------------update comment on asset ---------

function handleUpdateClientComment(commentBody, commentTime, id){
    console.log(`update client comment ${id}`);

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

// ------------ delete comment on asset -------------
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
    console.log(audio)
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

        <ClientAssetComments 
        clientId={clientId} 
        comments={assetComments} 
        assetDuration={assetDuration}
        handleDeleteClientComment={handleDeleteClientComment}
        handleUpdateClientComment={handleUpdateClientComment}
        />
       
        </div>
    )
}

export default ClientAsset;