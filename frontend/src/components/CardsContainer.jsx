import React from "react";
import { useState, useEffect } from "react";
import { catsData } from "../api/cats";
import Card from "./Card";

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
      {cats.map((cat) => (
        <Card key={cat.id} cat={cat} />
      ))}
    </>
  );
};

export default CardsContainer;
