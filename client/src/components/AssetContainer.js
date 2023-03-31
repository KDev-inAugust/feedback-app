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
    fileNameForDisplay,
    }) {

console.log("client projects", project.client_projects[0].user.name)

 // ----------- upload and display the uploaded asset ---------
  
 return (
    <div>
      <label for="asset-upload-field">
       <input id="asset-upload-field" type="file" onChange={(e)=>handleChooseAsset(e)}
        />
      </label>
      <p>{fileNameForDisplay}</p>
      <input type="text" placeholder="file name" onChange={handleSetAssetName}/>
      <button onClick={handleAssetSubmit}>add file to project</button>
      
      <h1>{project ? project.name : "Loading Project"}</h1>
      <h2>{project ? 
      
        project.client_projects.map(index=><p>{index.user.name}</p>)
      : "Loading Client List" }</h2>
        
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