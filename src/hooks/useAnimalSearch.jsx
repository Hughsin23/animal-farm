import { useState, useEffect } from "react";
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

export default useAnimalSearch