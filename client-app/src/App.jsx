// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Clientes from './pages/Manager';
import LineChart from './components/Char';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes/>} />
        <Route path="/chart" element={<LineChart/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;