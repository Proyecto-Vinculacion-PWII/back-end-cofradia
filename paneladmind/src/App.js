import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Componentes/Navbar';
import { Cursos } from './Componentes/CursosDisponibles';
import { Eventos } from './Componentes/Eventos';
import { LoginForm } from './Componentes/Login';
import Registro   from'./Componentes/Registro';
import UploadFiles from './Componentes/UploadFiles';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

const Dashboard = () => (
  <>
    <Navbar />
    <div className="container mt-5">
      <Cursos />
      <Eventos />
      <UploadFiles />
    </div>
  </>
);

export default App;