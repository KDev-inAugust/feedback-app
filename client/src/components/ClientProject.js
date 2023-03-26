import React from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";


function ClientProject () {
    const [clientProject, setClientProject]=useState([])
    const [clientProjectUrls, setClientProjectURLs] = useState([])
    const { id } = useParams();
    console.log(id)
// ------- get the Project data for this project -------
useEffect(()=>{
    fetch (`/projects/${id}`)
    .then((r)=>r.json()).then((data)=>{
        setClientProject(data);
        setClientProjectURLs(data.asset_urls)
    })
  },[])


    return (
        <div id="asset">
            <h1>{clientProject.name}</h1>

            {clientProjectUrls.map((url, index)=>{
                
                return( 
                    <div>
                <audio controls src={url}/>
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