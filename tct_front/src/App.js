import React from 'react';
import { Routes, Route } from "react-router-dom";
import './css/App.css';
import Home from './component/Home/Home';
import FileInputPage from './component/Input/FileInputPage';
import CategoryPage from './component/Input/CategoryPage';
import Output from './component/Output/OutputPage';
import Output2 from './component/Output/OutputPage2';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/FileInputPage' element={<FileInputPage />} />
        <Route path='/CategoryPage' element={<CategoryPage />} />
        <Route path='/Output' element={<Output />} />
        <Route path='/Output2' element={<Output2 />} />
      </Routes>
    </div>
  );
}

export default App;
