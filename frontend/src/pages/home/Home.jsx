import { useState } from "react";
import CardsContainer from "../../components/CardsContainer";

const Home = () => {
  const [newCat, setNewCat] = useState({
    name: "",
    age: "",
    breed: "",
  });

  const handleChange = (e) => {
    const value =
      e.target.name === "age" ? parseInt(e.target.value) : e.target.value;
    setNewCat({ ...newCat, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3010/api/v1/cats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCat),
    });
    console.log(newCat);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nombre
          <input
            type="text"
            name="name"
            id="name"
            value={newCat.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="age">
          Edad
          <input
            type="text"
            name="age"
            id="age"
            value={newCat.age}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="breed">
          Raza
          <input
            type="text"
            name="breed"
            id="breed"
            value={newCat.breed}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Agregar" />
      </form>

      <CardsContainer />
    </>
  );
};

export default Home;
