import { Link, useNavigate } from 'react-router-dom';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoItem = ({ todo, onToggleComplete, onDelete }) => {
  const navigate = useNavigate();
  const isUpcoming = todo.deadline && isBefore(new Date(), new Date(todo.deadline));
  const isDueSoon = todo.deadline && 
                   isAfter(new Date(todo.deadline), new Date()) && 
                   isBefore(new Date(todo.deadline), addDays(new Date(), 2));
  
  const getTimeRemaining = () => {
    if (!todo.deadline) return null;
    
    const now = new Date();
    const deadline = new Date(todo.deadline);
    const diff = deadline.getTime() - now.getTime();
    if (diff < 0) return 'Overdue!';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h left`;
    } else {
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m left`;
    }
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };
  
  // Handler for navigating to edit page
  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit/${todo._id}`);
  };

  return (
    <Link to={`/todos/${todo._id}`} className="block">
      <div className={`flex items-center justify-between p-4 mb-2 border rounded-lg shadow-sm transition-all ${
        todo.isCompleted ? 'bg-green-50 border-green-200' : 
        isDueSoon ? 'bg-yellow-50 border-yellow-200' :
        'bg-white border-gray-200'
      }`}>
        <div className="flex items-center space-x-3 flex-1">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={(e) => {
              e.preventDefault();
              onToggleComplete(todo._id);
            }}
            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
          />
          <div>
            <h3 className={`text-lg font-medium ${
              todo.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-sm text-gray-600 line-clamp-1">{todo.description}</p>
            )}
            <div className="flex mt-1 items-center space-x-2">
              {todo.deadline && (
                <span className={`text-xs ${isDueSoon && !todo.isCompleted ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                  Due: {format(new Date(todo.deadline), 'MMM dd, yyyy - hh:mm a')}
                </span>
              )}
              {isDueSoon && !todo.isCompleted && (
                <span className="text-xs font-bold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                  {getTimeRemaining()}
                </span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[todo.priority] || priorityColors.medium}`}>
                {todo.priority}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 ml-2">
          {/* Changed from Link to button */}
          <button 
            onClick={handleEditClick}
            className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Edit todo"
          >
            <FaEdit />
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(todo._id);
            }} 
            className="p-2 text-red-600 hover:text-red-800 transition-colors"
            aria-label="Delete todo"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TodoItem;