import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function TaskList() {
  const tasks = useSelector(state => state.tasks);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Task Manager</h1>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      {tasks.map(task => (
        <div key={task.id} className="mb-4 p-4 border rounded shadow-lg">
          <h3 className="text-xl mb-2 font-semibold text-blue-600">{task.title}</h3>
          <p className="mb-2 text-gray-700">{task.description}</p>
          <p className="mb-2 text-sm text-gray-500">{task.dueDate}</p>
          <Link to={`/task/${task.id}`} className="text-blue-500">View Details</Link>
        </div>
      ))}
      <Link to="/create" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create Task</Link>
    </div>
  );
}

export default TaskList;