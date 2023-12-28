import React from "react";
import { useState, useEffect } from "react";
import { catsData } from "../api/cats";
import Card from "./Card";
import "./styles/Card.css";

const CardsContainer = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    catsData()
      .then((res) => res.json())
      .then((data) => {
        setCats(data);
      });
  }, [cats]);

  return (
    <>
      <main className="home-page">
        <div className="cards__container">
          {cats.map((cat) => (
            <Card key={cat.id} cat={cat} />
          ))}
        </div>
      </main>
    </>
  );
};

export default CardsContainer;
