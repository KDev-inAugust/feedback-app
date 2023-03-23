import '../App.css';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import AssetContainer from './AssetContainer';


function Project(){
    const [selectedAsset, setSelectedAsset] = useState([]);
    const [project, setProject] = useState(null);
    const [assetName, setAssetName] = useState("");
    const [projectURLs, setProjectURLs] = useState([]);
    const [assetNames, setAssetNames] = useState([]);
    const [fileNameForDisplay, setFileNameForDisplay] = useState("");
    
    const { id } = useParams()
    console.log("params in Project", id)

  // ------- get the Project data for this project -------
    useEffect(()=>{
      fetch (`/projects/${id}/`)
      .then(r=>r.json())
      .then(data=>{
        setProjectURLs(data.asset_urls)
        setProject(data);  
        setAssetNames(data.asset_names);
      })
    },[])
    
  // ------ Select The Asset ------------ 
    function handleChooseAsset(e){
      setSelectedAsset(Array.from(e.target.files));
      setFileNameForDisplay(e.target.files[0].name)
    }

  // -----------Set The Name of the asset before upload

    function handleSetAssetName (e){
      setAssetName(e.target.value)
    }
  // -------Attach The Asset to the Project ---------
    function handleAssetSubmit(e){
      e.preventDefault()
      
      const formData = new FormData();
  
    formData.append('asset', selectedAsset[0])
    formData.append('id', id)
    formData.append('name', assetName)
  
  
      // for (const value of formData.values()) {
      //   console.log('form data values', value);
      // }
  
      fetch("/add_asset/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
        //   console.log(data.path, data.name);
        //  setProjectURLs([...projectURLs, data.path ]);
        //  setAssetNames([...assetNames, data.name])
        setProjectURLs(data.asset_urls);
          setProject(data);  
          setAssetNames(data.asset_names);
          console.log(data);
          setFileNameForDisplay("");
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
          setProjectURLs(data.asset_urls);
          setProject(data);  
          setAssetNames(data.asset_names);
          console.log(data)
    }
      )
    }
    

    return (
      <div id="project">
        <AssetContainer 
        project={project}
        projectURLs={projectURLs}
        handleChooseAsset={handleChooseAsset}
        handleSetAssetName={handleSetAssetName}
        handleAssetSubmit={handleAssetSubmit}
        handleDeleteAsset={handleDeleteAsset}
        assetNames={assetNames}
        fileNameForDisplay={fileNameForDisplay}
        />
      </div>
    )

  }

 

export default Project;