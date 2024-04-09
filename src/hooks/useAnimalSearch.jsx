import { useState, useEffect } from "react";

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