import React from "react";

import ClientAsset from "./ClientAsset";

function ClientProject ({clientProject, clientProjectUrls}) {
    
    return (
        <div id="asset">
            <h1>{clientProject.name}</h1>
            {clientProjectUrls.map((url, index)=>{
                
                return( 
                  <ClientAsset 
                  key={index}
                  url={url} 
                  name={clientProject.asset_names[index]}
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