import React from "react";

function Card({ cat }) {
  return (
    <>
      <div>
        <p>Nombre: {cat.name}</p>
        <p>Edad: {cat.age}</p>
        <p>Raza: {cat.breed.name}</p>
      </div>
    </>
  );
}

export default Card;
