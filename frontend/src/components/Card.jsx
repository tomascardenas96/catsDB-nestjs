import React from "react";
import "./styles/Card.css"

function Card({ cat }) {
  return (
    <>
      <div className='card'>
        <p>Nombre: {cat.name}</p>
        <p>Edad: {cat.age} años</p>
        <p>Raza: {cat.breed.name}</p>
      </div>
    </>
  );
}

export default Card;
