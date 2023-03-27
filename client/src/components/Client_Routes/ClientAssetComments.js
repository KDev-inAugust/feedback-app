import React from "react";


function ClientAssetComments ({comments}){






    return (
        <div>
            
                {comments.map((comment)=>{
            
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
}

export default ClientAssetComments;