import React, { useState } from "react";
import SearchBar from "./components/searchbar";
import axios from 'axios';

const App = () => {
  const [cars, setCars] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = async (e) => {
    e.preventDefault(); 

    const make = searchInput.trim(); 

    if (!make) {
      alert("Please provide a car make.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/v1/cars`, {
       params: { make }
      });

      if (response.data.success) {
        setCars(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div>
      <h1>Car Search</h1>

      <SearchBar onSubmit={handleSearchSubmit} searchInput={searchInput} setSearchInput={setSearchInput} />
      <ul>
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <li key={index}>{car.make} {car.model} ({car.year})</li>
          ))
        ) : (
          <li>No cars found.</li>
        )}
      </ul>
    </div>
  );
};

const style = {
  app: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignContent: "center",
  },
};

export default App;
