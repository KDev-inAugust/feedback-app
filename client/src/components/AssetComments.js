import React from "react";

function AssetComments ({assetComments}){

    return (
        <div id="asset-comments">
            {assetComments.map((comment)=>{
                    return(
                        <div>
                            <p className="comment">{comment.body}</p>
                            <p>at {comment.track_time} seconds</p>
                        </div>
                    )
                })}
        </div>
    )
}


export default AssetComments;