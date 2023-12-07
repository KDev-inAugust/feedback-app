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
    const [onLoadProjectText, setOnLoadProjectText] = useState("Loading");
    const [assetErrors, setAssetErrors] =useState(null)
    const { id } = useParams()

  // ------- get the Project data for this project -------
    useEffect(()=>{
      fetch (`/projects/${id}/`)
      .then((r)=>{
        if (r.ok){
          r.json().then(
            (data)=>{
            setProjectURLs(data.asset_urls);
            setProject(data);  
            setAssetNames(data.asset_names);
          }
          )
    }
    else 
    r.json().then((error)=>{
      setOnLoadProjectText(error.error)
    })
  })
    },[])
    
  // ------ Select The Asset ------------ 
    function handleChooseAsset(e){

      setSelectedAsset(Array.from(e.target.files));
      setFileNameForDisplay(e.target.files[0].name);
    }

  // -----------Set The Name of the asset before upload

    function handleSetAssetName (e){
      setAssetName(e.target.value)
    }
  // -------Attach The Asset to the Project ---------
    function handleAssetSubmit(e){
      e.preventDefault()
      let loader=document.getElementById("loader");
      loader.className="loader"
      
      
      const formData = new FormData();
  
    formData.append('asset', selectedAsset[0])
    formData.append('id', id)
    formData.append('name', assetName)
  
  
      for (const value of formData.values()) {
        console.log('form data values', value);
      }
  
      fetch("/add_asset/", {
        method: "POST",
        body: formData,
        })
        .then(
          (response) => {

            console.log(response);
            
            if (response.ok){
          response.json().then((data) => {
            setProject(data); 
            setProjectURLs(data.asset_urls);
              setAssetNames(data.asset_names);
              setFileNameForDisplay("");
              setSelectedAsset([]);
              setAssetName("");
              loader.className="hidden";
              setAssetErrors(null);
              }
              )
            } else response.json().then((data)=>{setAssetErrors(data.error); loader.className="hidden";})
          }
        )
    }

    // ------------ Remove Asset From Project -----------
    function handleDeleteAsset (e) {
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
    }
      )
    }
    
    return (
      <div id="project">
        <div id="loader"></div>
        {project?  
        <AssetContainer 
        project={project}
        projectURLs={projectURLs}
        handleChooseAsset={handleChooseAsset}
        handleSetAssetName={handleSetAssetName}
        handleAssetSubmit={handleAssetSubmit}
        handleDeleteAsset={handleDeleteAsset}
        assetNames={assetNames}
        fileNameForDisplay={fileNameForDisplay}
        assetErrors={assetErrors}
        assetName={assetName}
        />
        
        : <p className='error-message'>{onLoadProjectText}</p>}
       
      </div>
    )

  }

 

export default Project;