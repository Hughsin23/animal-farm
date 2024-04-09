import { useState, useEffect } from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";

// A custom hook to have the animals able to be searched with a fetch to our own server, then updates the state to the search results. The last query is stored in local storage for user QOL
const useAnimalSearch = () => {
  const [animals, setAnimals] = useState([]);

  // grabs last search from local storage
  useEffect(() => {
    const lastUserQuery = localStorage.getItem("lastUserQuery");
    search(lastUserQuery);
  }, []);

  // search function to grab from our server
  const search = async (q) => {
    const response = await fetch(
      `http://localhost:8080?` + new URLSearchParams({ q })
    );
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem("lastUserQuery", q);
  };

  // return the search function for use in the GUI, and the animal state
  return { search, animals };
};

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
