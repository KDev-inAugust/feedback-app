import '../App.css';
import React, {useEffect, useState} from 'react';

function App() {

  const [selectedAsset, setSelectedAsset] = useState([]);
  const [projectId, setProjectId] = useState(1)
  
// ------ Select The Asset ------------ 
  function handleChooseAsset(e){
    setSelectedAsset(Array.from(e.target.files))
    console.log("selected asset", selectedAsset)
  }
// -------Attach The Asset to the Project ---------
  function handleAssetSubmit(e){
    e.preventDefault()
    
    const formData = new FormData();

  formData.append('asset', selectedAsset[0])
  formData.append('id', projectId)


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

  return (
    <div className="App">
      <header className="App-header">
      <h1>The Feedback App</h1>
      </header>
      
      <input 
        type="file" 
        onChange={(e)=>handleChooseAsset(e)}
      />
      <button onClick={handleAssetSubmit}>add file to project</button>

    </div>
  );
}

export default App;
