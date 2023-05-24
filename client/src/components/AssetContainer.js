import '../App.css';
import Asset from './Asset';

function AssetContainer ({
    project, 
    handleChooseAsset, 
    handleSetAssetName, 
    handleAssetSubmit,
    projectURLs,
    handleDeleteAsset,
    assetNames,
    assetName,
    fileNameForDisplay,
    assetErrors
    }) {

      console.log("asset container loaded")
 // ------------------------------- Return ----------------------------
  
 return (
    <div>
      <label for="asset-upload-field">
       <input id="asset-upload-field" type="file" onChange={(e)=>handleChooseAsset(e)}/>
      </label>
      <p>{fileNameForDisplay}</p>
      <input type="text" placeholder="file name" onChange={handleSetAssetName} value={assetName}/>
      <button onClick={handleAssetSubmit}>add file to project</button>
      {assetErrors?  <p className='error-message'>{assetErrors}</p>:null }
      <h1>{project ? project.name : "Loading Project"}</h1>
      
      <div>{project.client_projects.length>0 ? 
          <div>  
            <h2>Client List:</h2>      
            {project.client_projects.map(index=><p>{index.user.name}</p>)}
          </div>
          : null }
      </div>
        
          {project ? 
          (projectURLs.map((url, index)=>{
            return (
              <Asset 
              key={url}
              url={url} 
              index={index} 
              project={project} 
              assetNames={assetNames}
              handleDeleteAsset={handleDeleteAsset}
              comments={project.active_storage_attachments[index].comments}
              />
            )
          })) : (<h3>Loading</h3>)
          }

    </div>
  );
}


export default AssetContainer;