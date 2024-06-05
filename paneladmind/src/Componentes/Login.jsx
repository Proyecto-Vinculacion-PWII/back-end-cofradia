import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'cofradiaong@gmail.com' && password === 'cofradia') {
      navigate('/dashboard');
    } else {
      setAlert('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div>
      <div className="login container">
        <h1 className="text-center mb-5">Inicio de sesión</h1>
    
        <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
          <div className="form-group w-50 mb-3">
            <label className="login label">Correo</label>
            <input 
              type="email" 
              className="form-control" 
              name="correo" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="form-group w-50 mb-3">
            <label className="login label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              name="contrasenia" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <br />
          <button type="submit" className="login btn btn-primary">
            Iniciar Sesión
          </button>
          <label className="login label">Registrarse</label>
          {alert && <div className="alert alert-danger">{alert}</div>}
        </form>
      </div>
    </div>
  );
};