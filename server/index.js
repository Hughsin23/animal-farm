import express from "express"
import cors from 'cors'
// minimalist generator of random strings, numbers etc
import Chance from 'chance'


const app = express()
app.use(cors())
app.use(express.json())

const chance = new Chance()

app.get('jokes', (req, res) => {
  const q = req.query.q?.toLocaleLowerCase() || ''
  const results = jokes.filter(joke => joke.type.toLowerCase().includes(q))
})


app.listen(8080, () => { console.log('hello 8080'); })