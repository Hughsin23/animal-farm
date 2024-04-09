import { useState, useEffect } from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import useAnimalSearch from "./hooks/useAnimalSearch";


function App() {
  // take the search function and animals state from the useAnimalSearch custom hook
  const { search, animals } = useAnimalSearch();

  // animation variables for controlling the duration and delay for fadein of search items
  const animationDuration = 1000
  const animationDelay = 500


  // animation being put into inline style in component Right now, all the items actually appear already and then "fade" in and out upon reload makes sense, as they're "loaded in" potentially from double running of useeffect in dev mode? Will test tomorrow
  const animateList = (aniIndex) => `fadeIn ${animationDuration}ms ease-out ${animationDelay * (aniIndex + 1)}ms forwards`

  return (
    <main>
      <h1>Hugh and Vivian's Animal Farm</h1>
      <p>Search and see what animals we've got going on</p>
      <input
        type="text"
        name="search"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
      ></input>
      <ErrorBoundary fallback={<p>Something went wrong 😭</p>}>
        {/* use the animal.length to show total search results */}
        <div>{animals.length} results found</div>
        <ul>
          {animals.map((animal, i) => (
            <li key={animal.id} style={{ animation: animateList(i) }}>
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
