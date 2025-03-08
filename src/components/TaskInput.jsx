import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Bell, RotateCcw, Calendar, Star } from 'lucide-react';
import { addTask } from '../store/slices/tasksSlice';

const TaskInput = ({ darkMode }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [starred, setStarred] = useState(false);
  const [dueToday, setDueToday] = useState(false);
  const [planned, setPlanned] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      priority,
      completed: false,
      starred,
      dueToday,
      planned
    };

    dispatch(addTask(newTask));
    setTitle('');
    setPriority('medium');
    setStarred(false);
    setDueToday(false);
    setPlanned(false);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-700' : 'bg-[#EEF6EF]'} rounded p-4 mb-6`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task"
          className={`flex-1 text-lg border-none focus:outline-none focus:ring-0 ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-[#EEF6EF] text-black'
          } px-3 py-2 rounded-md`}
        />

        <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
          <button 
            type="button" 
            className={`p-2 rounded-md ${starred ? 'text-[#FFD700]' : 'text-gray-400'} hover:text-[#FFD700]`}
            onClick={() => setStarred(!starred)}
          >
            <Star size={20} fill={starred ? "#FFD700" : "transparent"} />
          </button>

          <button 
            type="button" 
            className={`p-2 rounded-md ${dueToday ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-600`}
            onClick={() => setDueToday(!dueToday)}
          >
            <Calendar size={18} />
          </button>

          <button 
            type="button" 
            className={`p-2 rounded-md ${planned ? 'text-purple-500' : 'text-gray-400'} hover:text-purple-600`}
            onClick={() => setPlanned(!planned)}
          >
            <RotateCcw size={18} />
          </button>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-[#EEF6EF] text-black'} px-3 py-1 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-600`}
          >
            <option value="high" className='text-red-500 text-sm font-medium'>High</option>
            <option value="medium" className='text-yellow-500 text-sm font-medium'>Medium</option>
            <option value="low" className='text-green-500 text-sm font-medium'>Low</option>
          </select>

          <button
            type="submit"
            className="px-4 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
          >
            ADD TASK
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
