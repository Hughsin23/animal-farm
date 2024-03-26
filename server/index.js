import express from "express";
import cors from "cors";
// minimalist generator of random strings, numbers etc
import Chance from "chance";

//initialise the express app
const app = express();

// middleware for cors and express to parse json
app.use(cors());
app.use(express.json());

const chance = new Chance();

const animals = [...Array(300).keys()].map((id) => {
  return {
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  };
});

//endpoint to search for animals, would usually have the get to have an endpoint such as /animals, but we wanted to serve something on the index of the API for now
app.get("", (req, res) => {
  const q = req.query.q?.toLocaleLowerCase() || "";
  const results = animals.filter((animal) =>
    animal.type.toLocaleLowerCase().includes(q)
  );

  res.send(results);
});

app.listen(8080, () => {
  console.log("Listening on port http://localhost:8080");
});
