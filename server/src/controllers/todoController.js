const Todo = require('../models/todoModel');

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createTodo = async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;

    const todo = new Todo({
      title,
      description,
      deadline: deadline ? new Date(deadline) : null,
      priority,
      user: req.user._id,
    });

    const createdTodo = await todo.save();
    res.status(201).json(createdTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (todo && todo.user.toString() === req.user._id.toString()) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateTodo = async (req, res) => {
  try {
    const { title, description, isCompleted, deadline, priority } = req.body;

    const todo = await Todo.findById(req.params.id);

    if (todo && todo.user.toString() === req.user._id.toString()) {
      todo.title = title || todo.title;
      todo.description = description || todo.description;
      todo.isCompleted = isCompleted !== undefined ? isCompleted : todo.isCompleted;
      todo.deadline = deadline ? new Date(deadline) : todo.deadline;
      todo.priority = priority || todo.priority;

      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (todo && todo.user.toString() === req.user._id.toString()) {
      await Todo.deleteOne({ _id: todo._id });
      res.json({ message: 'Todo removed' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};