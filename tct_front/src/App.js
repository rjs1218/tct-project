import React from 'react';
import { Routes, Route } from "react-router-dom";
import './css/App.css';
import Home from './component/Home/Home';
import FileInputPage from './component/Input/FileInputPage';
import CategoryPage from './component/Input/CategoryPage';
import Output from './component/Output/OutputPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/FileInputPage' element={<FileInputPage />} />
        <Route path='/CategoryPage' element={<CategoryPage />} />
        <Route path='/Output' element={<Output />} />
      </Routes>
    </div>
  );
}

export default App;
