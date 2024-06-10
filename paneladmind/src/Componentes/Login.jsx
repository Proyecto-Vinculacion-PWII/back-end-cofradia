import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';
import SignInwithGoogle from "./signInWIthGoogle";

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();


 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
     
      navigate('/dashboard');
    } catch (error) {
      
      setAlert('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
      
    }
  };


  return (
    <div>
      <div className="login container">
        <h1 className="text-center mb-5">Inicio de sesión</h1>
    
        <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
          <div className="form-group w-75 mb-3">
            <label className="login label">Correo</label>
            <input 
              type="email" 
              className="form-control" 
              name="correo" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="form-group w-75 mb-3">
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
          <button type="submit" className="login btn btn-primary mb-3">
            Iniciar Sesión
          </button>
        
                    <a href="/Registro" style={{ textDecoration: "underline"}}>Registrarse</a>
           <SignInwithGoogle/>
           {alert && <div className="alert alert-danger">{alert}</div>}
         
        </form>
      </div>
    </div>
  );
};