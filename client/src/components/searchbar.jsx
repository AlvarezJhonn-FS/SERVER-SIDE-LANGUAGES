import React, { useState } from "react";

function SearchBar({ onSubmit }) {
  const [term, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   onSubmit(term);
  };
  

  return (
    <form onSubmit={handleSubmit} style={style.searchBar}>
      <div style={style.searchContents}>
        <input
          type="text"
          placeholder="Search for a car make..."
          value={term}
          onChange={handleInputChange}
          style={style.search}
        />
        <button type="submit" style={style.submit}>
          Search
        </button>
      </div>
    </form>
  );
}

const style = {
  searchBar: {
    border: "2px solid white",
    borderRadius: "20px",
    height: "500px",
    width: "90%",
    display: "flex",
    justifyContent: "center",
  },
  searchContents: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  search: {
    width: "50%",
    borderRadius: "5px",
    outline: "none",
    fontSize: "16px",
    border: "1px solid white",
    height: "40px",
  },
  submit: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "200px",
  },
};

export default SearchBar;

