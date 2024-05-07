import React from "react";

function AssetComments ({assetComments, handleDeleteComment}){

    function onClickDeleteComment(e){
        handleDeleteComment(e.target.value);
    }
    return (
        <div >
            <p>Comments Will Go Here</p>
            {/* {assetComments.map((comment, index)=>{
                let remainder=comment.track_time%60;
                let parseSecs=remainder.toLocaleString(undefined, {minimumIntegerDigits: 2})
                let parseMins=parseInt(comment.track_time/60);
                    return(
                        <div id="asset-comments" key={index}>
                            <p className="comment">{comment.body}</p>
                            <p>at {`${parseMins}:${parseSecs}`}</p>
                            <p>by "{comment.user_name}"</p>
                            <button value={comment.id} onClick={onClickDeleteComment}>delete comment</button>
                        </div>
                    )
                })} */}
        </div>
    )
}


export default AssetComments;