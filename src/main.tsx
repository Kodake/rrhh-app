import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Add from './components/Add.tsx';
import Edit from './components/Edit.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path='/' element={<App />}></Route>
          <Route path='/agregar' element={<Add />}></Route>
          <Route path='/editar/:id' element={<Edit />}></Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
