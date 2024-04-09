import { useState, useEffect } from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import useAnimalSearch from "./hooks/useAnimalSearch";


function App() {
  // take the search function and animals state from the useAnimalSearch custom hook
  const { search, animals } = useAnimalSearch();

  return (
    <main>
      <h1>Hugh and Vivian's Animal Farm</h1>
      <p>Search and see what animals we've got going on</p>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
      ></input>
      <ErrorBoundary fallback={<p>Something went wrong 😭</p>}>
        <ul>
          {animals.map((animal) => (
            <li key={animal.id}>
              {animal.type} - {animal.name} - {animal.age} yr old
            </li>
          ))}
          {animals.length === 0 && "No animals found"}
        </ul>
      </ErrorBoundary>
    </main>
  );
}

export default App;
