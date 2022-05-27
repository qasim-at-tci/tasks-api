require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectToDatabase = require("./config/database");
const Todo = require("./models/todo");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
connectToDatabase();

// Root route
app.get("/", (req, res) => {
  res.json({ info: "API routes at /api/v1/todos" }).status(200);
});

// Get all todos
app.get("/api/v1/todos", async (req, res) => {
  const todos = await Todo.find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

// Get todo by its id
app.get("/api/v1/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id)
    .then((data) => res.json(data).status(200))
    .catch((err) => console.log(err));
});

// Create a todo task
app.post("/api/v1/todos", async (req, res) => {
  const todo = new Todo(req.body);

  await todo
    .save()
    .then(() => res.json(todo).status(201))
    .catch((err) => console.log(err));
});

// Toggle todo task completion
app.patch("/api/v1/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;

  await todo
    .save()
    .then(() => res.json(todo).status(200))
    .catch((err) => console.log(err));
});

// Update a todo task
app.put("/api/v1/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(todo).status(200);
});

// Delete a todo task
app.delete("/api/v1/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  res.json({ message: "Todo task deleted", data: todo }).status(200);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
