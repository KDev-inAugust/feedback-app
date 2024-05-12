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
              console.log(data)
            setProjectURLs(data.project_file_urls);
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
    console.log("blob", blob);
    resolve({ signed_id: blob.signed_id, key: blob.key, blob: blob });
  }
});
});


const uploadFilesAndSubmit = async (data, fileUploads) =>{
  console.log("stage 3 uploadFilesAndSubmitCalled");
  console.log("file Uploads=>", fileUploads);
  let loader=document.getElementById("loader");
  loader.className="loader"
      
  const formData = new FormData();
  
  formData.append('id', id);
  formData.append('name', assetName);
  formData.append('asset', selectedAsset[0]);
  const  uploadResults = await Promise.all(fileUploads);
  
  for (const value of formData.values()) {
        console.log('form data values', value);
      }

  uploadResults.forEach(({ signed_id, key, blob } ) => {
    console.log("key=>", key);
    console.log("blob AGAIN=>", blob);
        data.append("key", key)
        data.append('signed_id', signed_id);
        data.append('id', id);
        data.append('name', assetName);
        data.append('blob', JSON.stringify(blob))
      });
      
      console.log("upload results=>", uploadResults)
      
  fetch("/api/add_asset/", {
        method: "POST",
        body: data,
        })
        .then(
          (response) => {

            console.log("first response=>", response);
            
            if (response.ok){
          response.json().then((data) => {
            console.log("data=>", data)
            setProject(data); 
            setProjectURLs(data.project_file_urls);
              setAssetNames(data.project_file_names);
              setFileNameForDisplay("");
              setSelectedAsset([]);
              setAssetName("");
              setAssetErrors(null);
              loader.className="hidden";
              
              }
              )
            } else {console.log("error", response);
            setAssetErrors("the upload failed please refresh the page and try again")
                     
                    };
          }
        )
    }

    // ------------ Remove Asset From Project -----------
    function handleDeleteAsset (e) {
      console.log(e.target.value)
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
          console.log(data)
          // setProjectURLs(data.project_file_urls);
          // setProject(data);  
          // setAssetNames(data.project_file_names);
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