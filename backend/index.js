const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

const date = new Date();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>PhoneBook</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    console.log("Request: ", person);

    response.json(person);
  } else {
    response.status(404).end();
  }
});

//POST REQUEST

app.post("/api/persons/", (request, response) => {
  const body = request.body;
  console.log("Data entry: ", body);
  if (!body.name || !body.number) {
    console.log("Error: Name or Number missing");

    return response.status(400).json({ error: "Name or Number missing" });
  }

  if (
    persons.some(
      (person) => person.name.toLowerCase() === body.name.toLowerCase(),
    )
  ) {
    console.log("Error: Name already in the database");

    return response.status(400).json({ error: "Name must be unique" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: crypto.randomUUID(),
  };

  persons = persons.concat(person);
  response.json(person);
});

//PUT REQUEST
app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "Name or Number missing" });
  }

  const personExists = persons.some((person) => person.id === id);
  if (!personExists) {
    return response.status(404).json({ error: "Person not found" });
  }

  persons = persons.map((person) =>
    person.id === id
      ? { ...person, name: body.name, number: body.number }
      : person,
  );

  const updatedPerson = persons.find((person) => person.id === id);
  response.json(updatedPerson);
});

//DELETE REQUEST

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`,
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
