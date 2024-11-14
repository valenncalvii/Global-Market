import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Hook para la navegación
import "../styles/Login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import API_URL from "../services/API";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

const Login = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIdLoading] = useState(false)
  const navigate = useNavigate(); // Hook para redirigir
  const location = useLocation(); // Hook para obtener la URL desde la que el usuario vino
  const from = location.state?.from || "/"; // Si no existe la URL de referencia, redirige a productos
  const {login} = useAuth();

  const handleSubmit = async (values) => {
    setIdLoading(true)
    try {
      // Realizar el POST para login
      const response = await axios.post(`${API_URL}/auth/login`, {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      setMessage("Inicio de sesión exitoso");
      localStorage.setItem("authToken", response.data.token);

      // Guardamos los datos del usuario en el contexto global
      const userData = {
        id: response.data.user.id,
        username: response.data.user.username,
      };
      login(userData); // Actualiza el estado global del usuario

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Detalles del error:", error);

      // Manejar diferentes tipos de errores
      if (error.response) {
        // El servidor respondió con un código fuera del rango 2xx
        setMessage(
          "Error en el inicio de sesión: " +
            (error.response.data?.message || "Detalles no disponibles.")
        );
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta
        setMessage(
          "Error en el inicio de sesión: No se recibió respuesta del servidor."
        );
      } else {
        // Error en la configuración de la solicitud
        setMessage("Error en el inicio de sesión: " + error.message);
      }
    }finally{
      setIdLoading(false)
    }
  };

  return (
    <div className="login-container">
      {isLoading && <Loading></Loading> }
      <h2>Iniciar Sesión</h2>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Se necesita un nombre";
          }
          if (!values.email) {
            errors.email = "Se necesita un correo";
          }
          if (!values.password) {
            errors.password = "Se necesita una contraseña";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ values, errors }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Nombre:</label>
              <Field
                type="text"
                id="username"
                name="username"
                maxLength="20"
                value={values.username}
              />
              <ErrorMessage
                name="username"
                component={() => (
                  <div className="error-message">{errors.username}</div>
                )}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                maxLength="50"
                value={values.email}
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <div className="error-message">{errors.email}</div>
                )}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <Field
                type="password"
                id="password"
                name="password"
                maxLength="16"
                value={values.password}
              />
              <ErrorMessage
                name="password"
                component={() => (
                  <div className="error-message">{errors.password}</div>
                )}
              />
            </div>
            <button type="submit">Iniciar Sesión</button>
            {message && <p>{message}</p>}
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
