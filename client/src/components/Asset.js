import React from "react";
import { useState } from "react";
import AssetComments from "./AssetComments";

function Asset ({url, index, project, assetNames, comments, handleDeleteAsset}){


    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentTimeStamp, setCommentTimeStamp] = useState(0);
    const [commentText, setCommentText] = useState("");
    const [assetComments, setAssetComments]=useState(comments);

//  --------------ADD COMMENT -------
function handleShowCommentForm (e){
    let audio = document.getElementById(`audio-element${e.target.value}`);

    setCommentTimeStamp(parseInt(audio.currentTime))
    console.log(`${audio.currentTime} of blob_id ${e.target.value}`);
    setShowCommentForm(!showCommentForm);
    
}

// ----------DELETE COMMENT ----------

function handleDeleteComment (commentId){
    console.log(commentId);

    fetch(`/comments/${commentId}`,{
        method: "DELETE",
    }).then(r=>r.json()).then((comment)=>{
        setAssetComments(assetComments.filter((index)=>index.id!==comment.id));
    })

}

// --------------- the comment form -----------
let commentForm=
<div>
<p>comment at {`${parseInt(commentTimeStamp/60)}:${commentTimeStamp%60}`} seconds</p>
<input type="text" onChange={e=>setCommentText(e.target.value)}/>
<button onClick={handleAddComment}>add and close</button>
</div>

// ------------- add comment to project asset -----------------

function handleAddComment (){
    console.log("comment sent")
    fetch("/comments",{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
    },
    body: JSON.stringify({
        active_storage_attachment_id: project.asset_ids[index],
        user_id: project.user_id,
        track_time: commentTimeStamp,
        body: commentText
    })
    }).then(r=>r.json()).then((data)=>{setAssetComments(data)})

    setShowCommentForm(false);
  }


return (
    <div id="asset" key={index}>
                <p>{assetNames[index]}</p>
                <p>{project.asset_ids[index]}</p>
                <audio controls 
                id={`audio-element${project.asset_ids[index]}`}
                key={url} 
                src={url}
                />
                <button 
                onClick={handleShowCommentForm} value={project.asset_ids[index]}
                key={index}>{showCommentForm? "cancel comment" : "add comment"}</button>

                {showCommentForm? 
                    commentForm: 
                    <p></p>}
                <AssetComments assetComments={assetComments} handleDeleteComment={handleDeleteComment}/>
                
                <button onClick={handleDeleteAsset} key={project.asset_ids[index]}  
                        value={project.asset_ids[index]}>delete this file and all comments</button>
              </div>
    )
}

export default Asset;