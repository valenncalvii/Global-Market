import React, { useState } from 'react';
import "../css/Login.css"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const userData = JSON.parse(localStorage.getItem('user'));

   
    if (!userData) {
      setErrorMessage('Cuenta inexistente.');
    } else if (userData.email !== email || userData.password !== password) {
      setErrorMessage('Email y/o contraseñas incorrectos.');
    } else {
   
      window.location.href = '/products'; 
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p className="register-link">
        ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;
