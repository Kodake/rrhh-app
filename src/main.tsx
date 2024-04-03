import 'sweetalert2/src/sweetalert2.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import EmpleadosList from './components/empleados/List.tsx';
import EmpleadosAdd from './components/empleados/Add.tsx';
import EmpleadosEdit from './components/empleados/Edit.tsx';
import DepartamentosList from './components/departamentos/List.tsx';
import DepartamentosAdd from './components/departamentos/Add.tsx';
import DepartamentosEdit from './components/departamentos/Edit.tsx';
import Loading from './components/Loading.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Loading />
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/empleados' element={<EmpleadosList />}></Route>
        <Route path='/empleados/agregar' element={<EmpleadosAdd />}></Route>
        <Route path='/empleados/editar/:id' element={<EmpleadosEdit />}></Route>
        <Route path='/departamentos' element={<DepartamentosList />}></Route>
        <Route path='/departamentos/agregar' element={<DepartamentosAdd />}></Route>
        <Route path='/departamentos/editar/:id' element={<DepartamentosEdit />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
