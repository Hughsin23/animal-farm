import { useState, useEffect } from "react";
import "./App.css";

function App() {


  return (
    <main>
      <h1>Hugh and Vivian's Animal Farm</h1>
      <p>Search and see what animals we've got going on</p>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => console.log(e.target.value)}
      ></input>
    </main>
  );
}

export default App;
