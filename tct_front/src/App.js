import React from 'react';
import { Routes, Route } from "react-router-dom";
import './css/App.css';
import Home from './component/Home/Home';
import TCT from './component/TCT';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/TCT' element={<TCT />} />
      </Routes>
    </div>
  );
}

export default App;
