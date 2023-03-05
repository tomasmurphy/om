import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, dataBase } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Loader from './Loader';
import logoMobile from '../img/logoVioleta.jpg';
import { Link } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { email } = result.user;

      if (userAuth.find(usuario => usuario.mail === email)) {
        setLoggedIn(true);
        onLoginSuccess(false); // llamamos la función onLoginSuccess desde aquí
      } else {
        setLoggedIn(false)
        alert("Usuario no autorizado");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      onLoginSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const [userAuth, setUserAuth] = useState([]);
  
  useEffect(() => {
    const collectionAuth = collection(dataBase, "auth");
    getDocs(collectionAuth)
      .then((res) => {
        const userAuth = res.docs.map((user) => {
          return {
            ...user.data(),
          };
        });
        setUserAuth(userAuth);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    {userAuth.length === 0 ? (
      <div><Loader /></div>
    ) : loggedIn ? (
      <div className='d-flex justify-content-end'>
        <div className='boton' onClick={handleLogout}>Cerrar sesión</div>
      </div>
    ) : (
<>
<div className='d-flex justify-content-center'>
      <Link to="/">
<img src={logoMobile} width="300" alt="logo optimarket OK" />
</Link>
</div>
      <div className='d-flex justify-content-center'>
        <div className='boton' onClick={handleLogin}>Iniciar sesión con google</div>
      </div>
      </>
    )}
  </>
  );
};

export default Login;
