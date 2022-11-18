import React from 'react';
import { Routes, Route } from "react-router-dom";
import './css/App.css';

import Home from './component/Home/Home';
import File from './component/Input/FileInputPage'
import Cate from './component/Input/CategoryPage';
import Check from './component/Input/CheckPage'

import First from './component/Output/OutputPage'
import Secon from './component/Output/OutputPage2'
import MG from './component/Output/MagicGridPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/File' element={<File />} />
        <Route path='/Cate' element={<Cate />} />
        <Route path='/Check' element={<Check />} />
        <Route path='/First' element={<First />} />
        <Route path='/Secon' element={<Secon />} />
        <Route path='/MG' element={< MG />} />
      </Routes>
    </div>
  );
}

export default App;
