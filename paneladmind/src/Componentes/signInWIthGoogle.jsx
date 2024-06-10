import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from '../firebase/config';
import { setDoc, doc } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";

function SignInwithGoogle() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState('');

  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const user = result.user;
      if (user) {
        const userDocRef = doc(db, "Users", user.uid);
        await setDoc(userDocRef, {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        setAlert('Usuario registrado con éxito');
        navigate('/dashboard');
      }
    } catch (error) {
      setAlert('Usuario no registrado');
    }
  }

  return (
    <div>
      <p className="continue-p" style={{ textAlign: "center", marginBottom: "2px", marginTop: "10px"}}>--O continuar con--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={require("../assets/google.png")} width={"40%"} alt="Google Login" />
        {alert && <div className="alert alert-danger">{alert}</div>}
      </div>
    </div>
  );
}

export default SignInwithGoogle;