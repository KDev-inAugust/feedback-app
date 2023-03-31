import React, { useContext, useState } from "react";

import ClientAssetComment from "./ClientAssetComment";



function ClientAssetComments ({comments, assetDuration, handleUpdateClientComment, handleDeleteClientComment}){
    
    return (
        <div id="asset-comments">
            
                {comments.map((comment, index)=>{
                    return(
                    <ClientAssetComment 
                    key={index}
                    comment={comment} 
                    index={index} 
                    assetDuration={assetDuration}
                    handleUpdateClientComment={handleUpdateClientComment}
                    handleDeleteClientComment={handleDeleteClientComment}

                    />
                    )
           
        })}
        </div>
        
    )
}

export default ClientAssetComments;