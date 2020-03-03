const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }

})
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})


const generateId = () => {
    min = persons.length
    max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min)) + min;
}


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === "") {
        return response.status(400).json({ error: 'name missing' })
    }
    if (body.number === "") {
        return response.status(400).json({ error: 'number missing' })
    }
    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({ error: 'name must be unique' })
    }
    

    const person = {
        name: body.name,
        number: body.number || false,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})