const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    deadline: {
      type: Date,
      required: false,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;