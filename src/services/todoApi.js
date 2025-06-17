import api from './api'; 

// Get all todos
export const getTodos = async () => {
  try {
    const response = await api.get('/api/todos');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch todos' };
  }
};

// Get single todo by id
export const getTodoById = async (id) => {
  try {
    const response = await api.get(`/api/todos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch todo' };
  }
};

// Create new todo
export const createTodo = async (todoData) => {
  try {
    const response = await api.post('/api/todos', todoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create todo' };
  }
};

// Update todo
export const updateTodo = async (id, todoData) => {
  try {
    const response = await api.put(`/api/todos/${id}`, todoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update todo' };
  }
};

// Delete todo
export const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`/api/todos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete todo' };
  }
};