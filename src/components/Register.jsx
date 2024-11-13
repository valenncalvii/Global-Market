import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import API_URL from "../API";
const Register = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const errors = {};
          //error nombre
          if (!values.username) {
            errors.username = "se necesita un nombre";
          }
          //error correo
          if (!values.email) {
            errors.email = "Se necesita un correo";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email =
              '"El correo debe tener un formato válido: solo letras, números, puntos, guiones y un dominio de al menos dos letras después del punto (ej., .com)."';
          }
          //error password
          if (!values.password) {
            errors.password = "Se necesita una contraseña";
          } else if (
            !/^[A-Za-z0-9!@#$%^&*()_+.,-]{8,16}$/i.test(values.password)
          ) {
            errors.password =
              '"la contraseña debe tener entre 8 y 16 caracteres y puede incluir letras, números y símbolos';
          }
          if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "las contraseñas no coinciden";
          }

          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            const { confirmPassword, ...filteredValues } = values;
            const response = await axios.post(
              `${API_URL}/users`,
              filteredValues
            );
            console.log(message);
            setMessage("registro exitoso!" + (response.data.message || ""));
          } catch (error) {
            setMessage(
              "error en el registro: " +
                (error.response?.data?.message || error.message)
            );
          }
          resetForm();
        }}
      >
        {({ values, errors }) => (
          <Form className="register-form">
            <div className="form-group">
              <label htmlFor="username">Nombre:</label>
              <Field
                type="text"
                id="username"
                name="username"
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
                value={values.password}
              />
              <ErrorMessage
                name="password"
                component={() => (
                  <div className="error-message">{errors.password}</div>
                )}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <Field
                type="Password"
                id="confirmPassword"
                name="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component={() => (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}
              />
            </div>

            <button type="submit" name="submit" className="register-button">
              Registrarse
            </button>
            {message && <p>{message}</p>}
          </Form>
        )}
      </Formik>
      <p className="login-link">
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default Register;

/*
  orders: comparar userid con orden de userid, seria compra de productos. que muestre cada compra en carrito que se hizo, guardar en order los productos en carrito

  */
