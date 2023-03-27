import React from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";


function ClientProject () {
    const [clientProject, setClientProject]=useState([]);
    const [clientProjectUrls, setClientProjectURLs] = useState([]);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentTimeStamp, setCommentTimeStamp] = useState(0);
    const [commentText, setCommentText] = useState("");
    const { id } = useParams();

// ------- get the Project data for this project -------
useEffect(()=>{
    fetch (`/client_projects/${id}`)
    .then((r)=>r.json()).then((data)=>{
        setClientProject(data);
        setClientProjectURLs(data.asset_urls)
    })
  },[])

  // ------------- add comment to project asset -----------------

function handleAddComment (e){
    console.log("comment sent")
    fetch("/comments",{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
    },
    body: JSON.stringify({
        active_storage_attachment_id: clientProject.active_storage_attachments[e.target.value].id,
        user_id: clientProject.user_id,
        track_time: commentTimeStamp,
        body: commentText
    })
    }).then(r=>r.json()).then((data)=>{console.log(data)})

    setShowCommentForm(false);
  }
// ---------- on SHOW comment form ------------
  function handleShowCommentForm (e){
    let audio = document.getElementById(`audio-element${e.target.value}`);
    setCommentTimeStamp(parseInt(audio.currentTime))
    console.log(`${audio.currentTime} of blob_id ${e.target.value}`);
    setShowCommentForm(!showCommentForm);
    
}

  // --------------- the comment form -----------
let commentForm=
<div>
<p>comment at {`${parseInt(commentTimeStamp/60)}:${commentTimeStamp%60}`} seconds</p>
<input type="text" onChange={e=>setCommentText(e.target.value)}/>
<button onClick={handleAddComment}>add and close</button>
</div>



    return (
        <div id="asset">
            <h1>{clientProject.name}</h1>

            {clientProjectUrls.map((url, index)=>{
                
                return( 
                    <div key={index}>
                <audio controls src={url} id={`audio-element${index}`} key={index}/>
                <button onClick={handleShowCommentForm} value={index}>add comment</button>

                {showCommentForm? 
                    <div>
                    <p>comment at {`${parseInt(commentTimeStamp/60)}:${commentTimeStamp%60}`} seconds</p>
                    <input type="text" onChange={e=>setCommentText(e.target.value)}/>
                    <button onClick={handleAddComment} value={index}>add and close</button>
                    </div>
                    
                    : 
                    <p></p>}


                {clientProject.active_storage_attachments[index].comments.map((comment)=>{
                    let remainder=comment.track_time%60;
                    let parseSecs=remainder.toLocaleString(undefined, {minimumIntegerDigits: 2})
                    let parseMins=parseInt(comment.track_time/60);
                   return (
                    <div id="asset-comments">
                        <p className="comment">{comment.body}</p>
                        <p>{`at ${parseMins}:${parseSecs}`}</p>
                        <p>{`by "${comment.user_name}"`}</p>
                       
                   </div>
                   ) 
                })}
                </div>
                )
                
            })}

        </div>
        
    )

}

export default ClientProject