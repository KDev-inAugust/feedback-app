import '../App.css';
import React, {useEffect, useState} from 'react';
import Project from './Project';

function App() {
  return(
    <div className='App'>
      <header className="App-header">
          <h1>The Feedback App</h1>
      </header>
      <Project />
    </div>
  )
}

export default App;
