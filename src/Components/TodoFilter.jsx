import React from 'react';

const TodoFilter = ({ showFinished, toggleFinished, remainingCount }) => {
  return (
    <div className="flex justify-between items-center py-3">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={showFinished}
          onChange={toggleFinished}
          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mr-2"
        />
        <span>Show completed tasks</span>
      </label>
      <span className="px-3 py-1 bg-purple-100 text-purple-800 font-medium text-sm rounded-full">
        {remainingCount} remaining
      </span>
    </div>
  );
};

export default TodoFilter;