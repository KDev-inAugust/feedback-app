import React from "react";

import ClientAsset from "./ClientAsset";

function ClientProject ({clientProject, clientProjectUrls}) {
    console.log("data=>", clientProject)
    return (
        <div id="asset">
            <h1>{clientProject.name}</h1>
            {clientProjectUrls.map((url, index)=>{
                console.log("id's", clientProject.project_files[index].id)
                return( 
                  <ClientAsset 
                  key={index}
                  url={url} 
                  name={clientProject.asset_names[index]}
                  index={index} 
                  comments={clientProject.project_files[index].comments}
                  project_file_id={clientProject.project_files[index].id}
                  />
                )
            })}

        </div>
    )

}

export default ClientProject