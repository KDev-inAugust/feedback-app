import '../App.css';
import React, {useEffect, useState} from 'react';
import AssetContainer from './AssetContainer';


function Project(){
    const [selectedAsset, setSelectedAsset] = useState([]);
    const [projectId, setProjectId] = useState(1);
    const [project, setProject] = useState(null);
    const [assetName, setAssetName] = useState("");
    const [projectURLs, setProjectURLs] = useState([]);
    const [assetNames, setAssetNames] = useState([])
    
  // ------- get the Project data for this project -------
    useEffect(()=>{
      fetch (`/projects/${projectId}/`)
      .then(r=>r.json())
      .then(data=>{
        setProjectURLs(data.asset_urls)
        setProject(data);  
        setAssetNames(data.asset_names)
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
          console.log(data.path, data.name);
         setProjectURLs([...projectURLs, data.path ]);
         setAssetNames([...assetNames, data.name])
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

    return (
      <div>
        <AssetContainer 
        project={project}
        projectURLs={projectURLs}
        handleChooseAsset={handleChooseAsset}
        handleSetAssetName={handleSetAssetName}
        handleAssetSubmit={handleAssetSubmit}
        handleDeleteAsset={handleDeleteAsset}
        assetNames={assetNames}
        
        />
      </div>
    )

  }

 

export default Project;