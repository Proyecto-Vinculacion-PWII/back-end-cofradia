import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { setDoc, doc } from'firebase/firestore/lite';


function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: ""
        });
      }
      
      setAlert('Usuario registrado con éxito');
    
      setTimeout(() => {
        navigate("/");
      }, 2000); 
    } catch (error) {
      setAlert('Usuario no registrado');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <form onSubmit={handleRegister}>
          <h3 className="text-center mb-3">Registro de Usuario</h3>
          {alert && <div className="alert alert-Success">{alert}</div>}

          <div className="mt-5">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div className="mt-3">
            <label>Apellido</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mt-3">
            <label>Correo</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-3">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-success">
              Registrarse
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            ¿Ya tienes una cuenta? <a href="/">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registro;