import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import GameContainer from "./GameContainer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <GameContainer />
    </div>
  );
}

export default App;
