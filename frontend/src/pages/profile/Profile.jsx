import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Realiza la solicitud al backend para obtener los datos del perfil
      fetch("http://localhost:3010/api/v1/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error al obtener el perfil:", error);
          // Manejar los errores de la solicitud
        });
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Email: {user.email}</p>
      {/* Otros detalles del perfil */}
    </div>
  );
};

export default Profile;
