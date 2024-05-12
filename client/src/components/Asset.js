import React from "react";
import { useState } from "react";
import AssetComments from "./AssetComments";

function Asset ({url, index, project, assetNames, comments, handleDeleteAsset}){

    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentTimeStamp, setCommentTimeStamp] = useState(0);
    const [commentText, setCommentText] = useState("");
    const [assetComments, setAssetComments]=useState(comments);
    const [audioFileLoader, setAudioFileLoader] = useState(<div><p>...loading audio</p></div>)


//  -------------- show add comment form -------
function handleShowCommentForm (e){
    let audio = document.getElementById(`audio-element${e.target.value}`);

    setCommentTimeStamp(parseInt(audio.currentTime))
    setShowCommentForm(!showCommentForm);
}

// ----------DELETE COMMENT ----------

function handleDeleteComment (commentId){

    fetch(`/api/comments/${commentId}`,{
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
    fetch("/api/comments",{
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

// Code for onCanPlay through here 

function handleCanPlayThrough(){
    console.log("all good");
    setAudioFileLoader(<div><p>audio loaded</p></div>)
};

return (
    <div id="asset" key={index}>
                <p>{assetNames[index]}</p>
                <p>{project.project_file_ids[index]}</p>
                <audio controls 
                id={`audio-element${project.project_file_ids[index]}`}
                key={url} 
                src={url}
                preload="auto"
                onCanPlayThrough={handleCanPlayThrough}
                />
                {audioFileLoader}
                <button 
                onClick={handleShowCommentForm} value={project.project_file_ids[index]}
                key={index}>{showCommentForm? "cancel comment" : "add comment"}</button>

                {showCommentForm? 
                    commentForm: 
                    <p></p>}
                <AssetComments assetComments={assetComments} handleDeleteComment={handleDeleteComment}/>
                
                <button onClick={handleDeleteAsset} key={project.project_file_ids[index]}  
                        value={project.project_file_ids[index]}>delete this file and all comments</button>
              </div>
    )
}

export default Asset;