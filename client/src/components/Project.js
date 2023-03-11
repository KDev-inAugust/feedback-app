import '../App.css';
import React, {useEffect, useState} from 'react';


function Project(){
    const [selectedAsset, setSelectedAsset] = useState([]);
    const [projectId, setProjectId] = useState(1);
    const [project, setProject] = useState(null)
    const [projectName, setProjectName] = useState("");
    const [projectUrls, setProjectUrls] = useState([]);
    const [assetName, setAssetName] = useState("")
    
  // ------- get the Project data for this project -------
    useEffect(()=>{
      fetch (`/projects/${projectId}/`)
      .then(r=>r.json())
      .then(data=>{setProject(data); setProjectName(data.name); 
        setProjectUrls(data.asset_urls); 
        console.log(data.asset_urls)})
    },[])
    
  // ------ Select The Asset ------------ 
    function handleChooseAsset(e){
      setSelectedAsset(Array.from(e.target.files));
      console.log(e.target.files)
    }
  // -------Attach The Asset to the Project ---------
    function handleAssetSubmit(e){
      e.preventDefault()
      
      const formData = new FormData();
  
    formData.append('asset', selectedAsset[0])
    formData.append('id', projectId)
    formData.append('name', "this work?")
  
  
      for (const value of formData.values()) {
        console.log('form data values', value);
      }
  
      fetch("/add_asset", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
    }
  
    // ----------- upload and display the uploaded asset ---------
  
    return (
      <div className="App">
        <header className="App-header">
        <h1>The Feedback App</h1>
        </header>
        
        <input 
          type="file" 
          onChange={(e)=>handleChooseAsset(e)}
        />
        <input type="text" placeholder="file name" onChange={setAssetName}/>
        <button onClick={handleAssetSubmit}>add file to project</button>
  
        <div>{projectName}</div>
        
            {projectUrls.map((url)=>{
              return (
                <audio controls key={url} src={url}/>
              )
            })}
      </div>
    );
}

export default Project;