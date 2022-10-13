import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './HomePage/Home';
import Second from './SecondPage/Second';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Second' element={<Second />} />
      </Routes>
    </div>
  );
}

export default App;
