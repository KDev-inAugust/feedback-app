import React from "react";
import { useState} from "react";

import ClientAsset from "./ClientAsset";

function ClientProject ({clientProject, clientProjectUrls}) {
    
   
    const [comments, setComments] = useState([])

  



    return (
        <div id="asset">
            <h1>{clientProject.name}</h1>

            {clientProjectUrls.map((url, index)=>{
                
                return( 
                  <ClientAsset 
                  url={url} 
                  index={index} 
                  comments={clientProject.active_storage_attachments[index].comments}
                  active_storage_attachment_id={clientProject.active_storage_attachments[index].id}
                  />
                )
            })}

        </div>
        
    )

}

export default ClientProject