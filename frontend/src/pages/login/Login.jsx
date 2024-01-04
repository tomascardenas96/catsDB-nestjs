import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { BiSolidError } from "react-icons/bi";
import "./Login.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [reload, setReload] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const token = localStorage.getItem("token");
  const isAuthorized = token !== null;

  const handleReload = () => {
    setTimeout(() => {
      setReload(!reload);
    }, 300);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:3010/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            console.error(response);
          }
          return response.json();
        })
        .then((data) => {
          if (data.message === "success") {
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("username", data.userName);
          } else {
            setLoginError(true);
          }
        });
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      <div className="form-container">
        {loginError && (
          <div className="login-error__modal">
            <BiSolidError className="login-error__modal-warning" />
            <div>
              <h1>Email o contraseña incorrectos.</h1>
              <h2>Por favor, prueba nuevamente</h2>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            E-mail:
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </label>
          <input type="submit" value="Ingresar" onClick={handleReload} />
        </form>
      </div>
    </>
  );
}

export default Login;
