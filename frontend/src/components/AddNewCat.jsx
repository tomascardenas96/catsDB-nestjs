import { useState } from "react";
import "./styles/AddNewCat.css";

const AddNewCat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCat, setNewCat] = useState({
    name: "",
    age: "",
    breed: "",
  });
  const BASEURL = "http://localhost:3010/api/v1/cats";

  const handleChange = (e) => {
    const value =
      e.target.name === "age" ? parseInt(e.target.value) : e.target.value;
    setNewCat({ ...newCat, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(BASEURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCat),
    });
    setNewCat({
      name: "",
      age: "",
      breed: "",
    });
    closeModal();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="add-new-cat__button" onClick={openModal}>
        +
      </div>
      {isModalOpen && (
        <div className="add-new-cat__modal">
          <form onSubmit={handleSubmit}>
          <p onClick={closeModal}>x</p>
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
              <select
                name="breed"
                id="breed"
                value={newCat.breed}
                onChange={handleChange}
              >
                <option value="persa">Persa</option>
                <option value="punk">Punk</option>
                <option value="aleman">Aleman</option>
              </select>
            </label>
            <input type="submit" value="Agregar" />
          </form>
        </div>
      )}
    </>
  );
};

export default AddNewCat;
