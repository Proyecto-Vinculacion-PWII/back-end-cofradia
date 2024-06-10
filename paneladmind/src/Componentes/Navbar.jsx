import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ongpantalla from '../assets/ongpantalla.png';

function Navbar() {
  return (
    <div className="App mb-5">
      <header className="App-header mb-5">
        <nav className="navbar fixed-top navbar-expand-lg mb-5">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={ongpantalla} alt="Logo CDAJ" className="d-inline-block align-text-center logo" />
              <span className="nombre">CDAJ Cofradia</span>
            </Link>
           
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;