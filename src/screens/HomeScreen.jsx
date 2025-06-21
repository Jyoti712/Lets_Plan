import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import TodoItem from '../Components/TodoItem';
import TodoFilter from '../Components/TodoFilter';
import { getTodos, updateTodo, deleteTodo } from '../services/todoApi';

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, completed, upcoming, overdue

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        toast.error(error.message || 'Failed to load todos');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleToggleComplete = async (id) => {
    try {
      const todo = todos.find(t => t._id === id);
      const updatedTodo = await updateTodo(id, { isCompleted: !todo.isCompleted });
      
      setTodos(todos.map(t => 
        t._id === id ? updatedTodo : t
      ));
      
      toast.success(`Task marked as ${updatedTodo.isCompleted ? 'completed' : 'active'}`);
    } catch (error) {
      toast.error(error.message || 'Failed to update todo');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTodo(id);
        setTodos(todos.filter(t => t._id !== id));
        toast.success('Task deleted successfully');
      } catch (error) {
        toast.error(error.message || 'Failed to delete todo');
      }
    }
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const filterTodos = () => {
    const now = new Date();
    
    let filtered = [...todos];
    
    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.isCompleted);
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.isCompleted);
    } else if (filter === 'upcoming') {
      filtered = filtered.filter(todo => 
        todo.deadline && new Date(todo.deadline) > now
      );
    } else if (filter === 'overdue') {
      filtered = filtered.filter(todo => 
        !todo.isCompleted && todo.deadline && new Date(todo.deadline) < now
      );
    }
    
    if (!showFinished) {
      filtered = filtered.filter(todo => !todo.isCompleted);
    }
    
    return filtered;
  };

  const remainingCount = todos.filter(t => !t.isCompleted).length;
  const filteredTodos = filterTodos();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Tasks</h1>
        <Link 
          to="/create" 
          className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
        >
          <FaPlus className="mr-2" /> New Task
        </Link>
      </div>
      
      <TodoFilter 
        showFinished={showFinished} 
        toggleFinished={toggleFinished} 
        remainingCount={remainingCount}
        filter={filter}
        setFilter={setFilter}
      />
      
      <div className="h-px bg-gray-200 my-4"></div>
      
      <div className="space-y-2">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No tasks to show. Add some tasks or change your filters!
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem 
              key={todo._id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;