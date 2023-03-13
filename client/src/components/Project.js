import '../App.css';
import React, {useEffect, useState} from 'react';


function Project(){
    const [selectedAsset, setSelectedAsset] = useState([]);
    const [projectId, setProjectId] = useState(1);
    const [project, setProject] = useState(null);
    const [assetName, setAssetName] = useState("");
    const [projectURLs, setProjectURLs] = useState([])
    
  // ------- get the Project data for this project -------
    useEffect(()=>{
      fetch (`/projects/${projectId}/`)
      .then(r=>r.json())
      .then(data=>{
        setProjectURLs(data.asset_urls)
        setProject(data);  
      })
    },[])
    
  // ------ Select The Asset ------------ 
    function handleChooseAsset(e){
      setSelectedAsset(Array.from(e.target.files));
      console.log(e.target.files)
    }

  // -----------Set The Name of the asset before upload

    function handleSetAssetName (e){
      console.log(e.target.value);
      setAssetName(e.target.value)
    }
  // -------Attach The Asset to the Project ---------
    function handleAssetSubmit(e){
      e.preventDefault()
      
      const formData = new FormData();
  
    formData.append('asset', selectedAsset[0])
    formData.append('id', projectId)
    formData.append('name', assetName)
  
  
      for (const value of formData.values()) {
        console.log('form data values', value);
      }
  
      fetch("/add_asset", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log([...projectURLs, data ]);
         setProject([...projectURLs, data ])
        })
    }
    // ------------ Remove Asset From Project -----------
    function handleDeleteAsset (e) {
      console.log(e.target.value);
        fetch("/asset_purge",{

        method: "PUT",
        headers: {
        "Content-Type":"application/json",
                    },

          body: JSON.stringify({
            project_id: project.id,
            asset_id: e.target.value,
            })
        }).then(r=>r.json())
        .then((data)=>{
          console.log(projectURLs.filter(index=>index!==[data])); 
          setProjectURLs(projectURLs.filter(index=>index!==[data]))
    }
      )
    }

    // ----------- upload and display the uploaded asset ---------
  
    return (
      <div>
        <input type="file" 
          onChange={(e)=>handleChooseAsset(e)}
        />
        <input type="text" placeholder="file name" onChange={handleSetAssetName}/>
        <button onClick={handleAssetSubmit}>add file to project</button>
  
        <h1>{project ? project.name : "Loading Project"}</h1>

            {project ? 
            (projectURLs.map((url, index)=>{
              return (
                <div>
                  <p>{project.asset_names[index]}</p>
                  <audio controls key={url} src={url}/>
                  <button key={project.asset_ids[index]} onClick={handleDeleteAsset} 
                          value={project.asset_ids[index]}>delete</button>
                </div>
              )
            })) : (<h3>Loading</h3>)
            }
      </div>
    );
}

export default Project;