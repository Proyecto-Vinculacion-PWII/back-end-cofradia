import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div>
      <div className="login container">
        <h1 className="text-center mb-5">Inicio de sesión</h1>
        <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
          <div className="form-group w-50 mb-3">
            <label className="login label">Usuario</label>
            <input type="email" className="form-control" name="correo"  />
          </div>
          <div className="form-group w-50 mb-3">
            <label className="login label">Contraseña</label>
            <input type="password" className="form-control" name="contrasenia"  />
          </div>
          <br />
          <button type="submit" className="login btn btn-primary">
            Iniciar Sesión
          </button>
          <label className="login label">Registrarse</label>
        </form>
      </div>
    </div>
  );
};
