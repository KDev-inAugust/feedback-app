import '../App.css';
import React, {useEffect, useState} from 'react';
import { DirectUpload } from  'activestorage';
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
      fetch (`/api/projects/${id}/`)
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

  let attempts = 1;



   // --------- Direct Upload Requests Signed URL from Rails -----------
    
  // Main onSubmit function

const onSubmit = async () => {
      
  console.log("on submit called stage one");
  const data = new  FormData();
  const fileUploads = [];

  selectedAsset.forEach((file) => {
      fileUploads.push(uploadFile(file));
  });

  await uploadFilesAndSubmit(data, fileUploads);
};

const uploadFile = (file) => new Promise((resolve, reject) => {
console.log("file upload started stage 2");
const upload = new DirectUpload(
  file,
  `/rails/active_storage/direct_uploads`,
);
upload.create((error, blob) => {
  if (error) {
    reject();
  } else {
    resolve({ signed_id: blob.signed_id });
  }
});
});



const uploadFilesAndSubmit = async (data, fileUploads) =>{
  console.log("stage 3 uploadFilesAndSubmitCalled");
  let loader=document.getElementById("loader");
  loader.className="loader"
      
  const formData = new FormData();
  
  formData.append('asset', selectedAsset[0]);
  formData.append('id', id);
  formData.append('name', assetName);

  const  uploadResults = await  Promise.all(fileUploads);
  
  for (const value of formData.values()) {
        console.log('form data values', value);
      }

  uploadResults.forEach(({ signed_id } ) => {
        data.append(formData, signed_id);
      });
  
  fetch("/api/add_asset/", {
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
            } else {console.log("attempt=>", attempts);
                     if(attempts<=5){
                      onSubmit();
                      attempts++;
                    }else{console.log("attempt limit reached"); 
                    setAssetErrors("the upload failed please refresh the page and try again")}
                    };
          }
        )
    }

    // ------------ Remove Asset From Project -----------
    function handleDeleteAsset (e) {
        fetch("/api/asset_purge",{

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
        handleAssetSubmit={onSubmit}
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