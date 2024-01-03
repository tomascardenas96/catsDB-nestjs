import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import "./Login.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [redirectBtn, setRedirectBtn] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3010/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
      });
  };

    if (redirectBtn) {
      return <Navigate to="/profile"/>
    }

    
  return (
    <>
      <div className="form-container">
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
          <input type="submit" value="Ingresar" />
        </form>
      </div>
    </>
  );
}

export default Login;
