import React from 'react';
import './App.css';
import Circle from './Circle';

function App() {
  return (
    <div className="App">
      <div>
        <Circle color="red" size="100px" />
        <Circle color="green" size="100px" />
        <Circle color="yellow" size="100px" />
      </div>
    </div>
  );
}

export default App;
