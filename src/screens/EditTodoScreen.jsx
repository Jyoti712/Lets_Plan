import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTodoById, updateTodo } from '../services/todoApi';
import TodoForm from '../Components/TodoForm';

const EditTodoScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await getTodoById(id);
        setTodo(data);
      } catch (error) {
        toast.error(error.message || 'Failed to load todo');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id, navigate]);

  const handleSubmit = async (values) => {
    try {
      await updateTodo(id, values);
      toast.success('Todo updated successfully');
      navigate(`/todos/${id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to update todo');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">Edit Task</h1>
      <TodoForm initialValues={todo} onSubmit={handleSubmit} buttonText="Update Task" />
    </div>
  );
};

export default EditTodoScreen;