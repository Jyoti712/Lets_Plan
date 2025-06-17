import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTodo } from '../services/todoApi';
import TodoForm from '../Components/TodoForm';

const CreateTodoScreen = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await createTodo(values);
      toast.success('Todo created successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Failed to create todo');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">Create New Task</h1>
      <TodoForm onSubmit={handleSubmit} buttonText="Create Task" />
    </div>
  );
};

export default CreateTodoScreen;