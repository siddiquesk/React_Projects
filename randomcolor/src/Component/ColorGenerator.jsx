import React, { useState, useEffect } from "react";

function ColorGenerator() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  const randomColor = (max) => Math.floor(Math.random() * max);

  const handleHexColor = () => {
    let hexCode = "0123456789ABCDEF";
    let hex = "#";
    for (let i = 0; i < 6; i++) {
      hex += hexCode[randomColor(16)];
    }
    setColor(hex);
  };

  const handleRGBColor = () => {
    let red = randomColor(256);
    let green = randomColor(256);
    let blue = randomColor(256);
    setColor(`rgb(${red},${green},${blue})`);
  };

  useEffect(() => {
    if (typeOfColor === "hex") {
      handleHexColor();
    } else {
      handleRGBColor();
    }
  }, [typeOfColor]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        transition: "background 0.5s ease-in-out",
      }}>
      <div className="main" style={{ display: "flex", gap: "15px" }}>
        <button style={buttonStyle} onClick={() => setTypeOfColor("hex")}>
          Create Hex Color
        </button>
        <button style={buttonStyle} onClick={() => setTypeOfColor("rgb")}>
          Create RGB Color
        </button>
        <button
          style={buttonStyle}
          onClick={typeOfColor === "hex" ? handleHexColor : handleRGBColor}>
          Generate Random Color
        </button>
      </div>
      <div className="box" style={boxStyle}>
        <h2>{color}</h2>
        <h3>{typeOfColor.toUpperCase()} Mode</h3>
      </div>
    </div>
  );
}

// Button Styles
const buttonStyle = {
  padding: "12px 20px",
  fontSize: "16px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "transform 0.2s ease, background 0.3s ease",
  color: "white",
  boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#333",
};

// Box Styles
const boxStyle = {
  marginTop: "20px",
  padding: "15px 25px",
  borderRadius: "10px",
  background: "rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
};

export default ColorGenerator;
