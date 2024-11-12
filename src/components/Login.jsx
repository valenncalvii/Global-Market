import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Hook para la navegación
import "../css/Login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import API_URL from "../API";
import axios from "axios";

const Login = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook para redirigir
  const location = useLocation(); // Hook para obtener la URL desde la que el usuario vino
  const from = location.state?.from || "/"; // Si no existe la URL de referencia, redirige a productos

  const handleSubmit = async(values)=>{
    try {
      
       // Realizar el POST para login
       const response = await axios.post(`${API_URL}/auth/login`, {
        username: values.username,
        email: values.email,
        password: values.password
      });
      setMessage("Inicio de sesión exitoso");
      localStorage.setItem('authToken', response.data.token);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Detalles del error:", error);

      // Manejar diferentes tipos de errores
      if (error.response) {
        // El servidor respondió con un código fuera del rango 2xx
        setMessage("Error en el inicio de sesión: " + (error.response.data?.message || "Detalles no disponibles."));
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta
        setMessage("Error en el inicio de sesión: No se recibió respuesta del servidor.");
      } else {
        // Error en la configuración de la solicitud
        setMessage("Error en el inicio de sesión: " + error.message);
      }
    }
  }

    

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
     
        <Formik
          initialValues={{username:"", email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.email = "Se necesita un nombre";
            }
            if (!values.email) {
              errors.email = "Se necesita un correo";
            }
            if (!values.password) {
              errors.password = 'Se necesita una contraseña';
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
           {({ values, errors }) => (
          <Form>
             <div className="form-group">
              <label>Nombre:</label>
              <Field type="text" id="username" name="username" value={values.username} />
              <ErrorMessage name="username" component={() =>(<div className="error-message">{errors.username}</div>)}/>
            </div>
            <div className="form-group">
              <label>Email:</label>
              <Field type="email" id="email" name="email" value={values.email} />
              <ErrorMessage name="email" component={() =>(<div className="error-message">{errors.email}</div>)}/>
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <Field type="password" id="password" name="password" value={values.password} />
              <ErrorMessage name="password" component={() =>(<div className="error-message">{errors.password}</div>)}/>
            </div>
            <button type="submit">Iniciar Sesión</button>
            {message && <p>{message}</p> }
          </Form>
        )}
        </Formik>

      <p className="register-link">
        ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;
