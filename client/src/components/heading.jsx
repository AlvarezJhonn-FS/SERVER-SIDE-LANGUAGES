import React from "react";

const Heading = () => {
  return (
    <div style={style.heading}>
      <h1 style={style.title}>Car Search</h1>
    </div>
  );
}
const style = {
    heading:{
        textAlign: "center",
        fontSize: "2rem", 
        fontWeight: "bold",
        color: "#fff", 
        textShadow: "2px 2px 4px #000, 0 0 25px #fff, 0 0 5px #fff", 
        fontFamily: "'Press Start 2P', cursive", 
        letterSpacing: "5px", 
        textTransform: "uppercase",
    }
};
export default Heading;