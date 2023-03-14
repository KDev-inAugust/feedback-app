import '../App.css';
import React, {useEffect, useState} from 'react';

function AssetContainer ({
    project, 
    handleChooseAsset, 
    handleSetAssetName, 
    handleAssetSubmit,
    projectURLs,
    handleDeleteAsset,
    assetNames,
    }) {


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
              <div key={index}>
                <p>{assetNames[index]}</p>
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



export default AssetContainer;