import React from 'react';
import './App.css';
import { Game } from './Game/Game';

function App() {
  const version: string = "0.1";
  console.log("version: " + version);
  return (
    <div className="App">
      <Game></Game>
    </div>
  );
}

export default App;
