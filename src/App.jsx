import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const { search, animals } = useAnimalSearch();

  const useAnimalSearch = () => {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
      const lastUserQuery = localStorage.getItem("lastUserQuery");
      aniSearch(lastUserQuery);
    }, []);

    const animalSearch = async (q) => {
      const response = await fetch(`http://localhost:8080?${q}`);
      const data = await response.json();
      setAnimals(data);

      localStorage.setItem("lastUserQuery", q);
    };

    return { search, animals };
  };

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
