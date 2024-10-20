import React, { useState } from 'react';
import "../css/Register.css"; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    
    const existingUser = JSON.parse(localStorage.getItem('user'));

 
    if (existingUser && existingUser.email === email) {
      setMessage('Cuenta ya existente.');
      return;
    }

   
    const userData = { email, password };
    localStorage.setItem('user', JSON.stringify(userData));
    setMessage('Registro exitoso. Puedes iniciar sesión ahora.');
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      {message && <p className="error-message">{message}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
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
        <div className="form-group">
          <label>Confirmar Contraseña:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="register-button">Registrarse</button>
      </form>
      <p className="login-link">
        ¿Ya tienes una cuenta? <a href="/">Inicia sesión aquí</a>
      </p>
    </div>
  );
};

export default Register;
