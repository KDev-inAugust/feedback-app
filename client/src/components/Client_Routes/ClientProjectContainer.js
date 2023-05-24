import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClientProject from "./ClientProject";

function ClientProjectContainer (){
    const [clientProject, setClientProject]=useState([]);
    const [clientProjectUrls, setClientProjectURLs] = useState([]);
    const { id } = useParams();

// ------- get the Project data for this project -------
    useEffect(()=>{
        fetch (`/client_projects/${id}`)
        .then((r)=>r.json()).then((data)=>{
          // consider refactoring into one piece of state if they are both set together
            setClientProject(data);
            setClientProjectURLs(data.asset_urls)
        })
      },[])


// -------the return----------------
      return (
        <div >
            <ClientProject 
            clientProject={clientProject} 
            clientProjectUrls={clientProjectUrls}/>
        </div>
      )


}

export default ClientProjectContainer;