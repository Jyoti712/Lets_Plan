import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import { FaEdit, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';
import { getTodoById, updateTodo, deleteTodo } from '../services/todoApi';

const TodoDetailScreen = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await getTodoById(id);
        setTodo(data);
      } catch (error) {
        toast.error(error.message || 'Failed to load todo details');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id, navigate]);

  const handleToggleComplete = async () => {
    try {
      const updatedTodo = await updateTodo(id, { isCompleted: !todo.isCompleted });
      setTodo(updatedTodo);
      toast.success(`Task marked as ${updatedTodo.isCompleted ? 'completed' : 'active'}`);
    } catch (error) {
      toast.error(error.message || 'Failed to update todo');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTodo(id);
        toast.success('Task deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error(error.message || 'Failed to delete todo');
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 border-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 border-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 border-blue-600 bg-blue-50';
      default: return 'text-gray-600 border-gray-600 bg-gray-50';
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
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="flex items-center text-purple-600 mb-6 hover:text-purple-800 transition-colors">
        <FaArrowLeft className="mr-2" /> Back to Tasks
      </Link>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className={`text-2xl font-bold ${todo.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {todo.title}
          </h1>
          
          <div className="flex space-x-2">
            <button
              onClick={handleToggleComplete}
              className={`p-2 rounded-full ${todo.isCompleted ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'} hover:bg-opacity-80 transition-colors`}
              aria-label={todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}
            >
              <FaCheck />
            </button>
            <Link
              to={`/edit/${todo._id}`}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              aria-label="Edit todo"
            >
              <FaEdit />
            </Link>
            <button
              onClick={handleDelete}
              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
              aria-label="Delete todo"
            >
              <MdDelete />
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(todo.priority)}`}>
            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
          </span>
          
          <span className={`text-xs px-2 py-1 rounded-full border ${todo.isCompleted ? 'bg-green-50 text-green-600 border-green-600' : 'bg-blue-50 text-blue-600 border-blue-600'}`}>
            {todo.isCompleted ? 'Completed' : 'Active'}
          </span>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          {todo.description ? (
            <p className="text-gray-700 whitespace-pre-wrap">{todo.description}</p>
          ) : (
            <p className="text-gray-500 italic">No description provided</p>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Created At</h3>
              <p className="text-gray-700">
                {format(new Date(todo.createdAt), 'MMM dd, yyyy - hh:mm a')}
              </p>
              <p className="text-sm text-gray-500">
                ({formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })})
              </p>
            </div>
            
            {todo.deadline && (
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Deadline</h3>
                <p className="text-gray-700">
                  {format(new Date(todo.deadline), 'MMM dd, yyyy - hh:mm a')}
                </p>
                <p className={`text-sm ${new Date(todo.deadline) < new Date() && !todo.isCompleted ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                  ({formatDistanceToNow(new Date(todo.deadline), { addSuffix: true })})
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm text-gray-500 mb-1">Created By</h3>
            <p className="text-gray-700">{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailScreen;