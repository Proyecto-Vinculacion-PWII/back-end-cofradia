import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import ongpantalla from '../assets/ongpantalla.png';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Desea cerrar la sesion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
               navigate('/');
      }
    });
  };

  return (
    <div className="App mb-5">
      <header className="App-header mb-5">
        <nav className="navbar fixed-top navbar-expand-lg mb-5">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={ongpantalla} alt="Logo CDAJ" className="d-inline-block align-text-center logo" />
              <span className="nombre">CDAJ Cofradia</span>
            </Link>
            <button className="btn  btn-outline-dark" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
