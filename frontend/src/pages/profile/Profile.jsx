import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const token = localStorage.getItem("token");
  const isAuthorized = token === null;

  useEffect(() => {
    try {
      fetch("http://localhost:3010/api/v1/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data));
    } catch (error) {}
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setReload(!reload);
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }
console.log(user)
  return (
    <>
        <div>
          <div>Profile Page</div>
          <input type="button" value="Cerrar sesion" onClick={handleLogOut} />
        </div>
    </>
  );
}

export default Profile;
