import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deleteTask } from '../redux/taskSlice';

function TaskDetails() {
  const { id } = useParams();
  const task = useSelector(state => state.tasks.find(task => task.id === id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!task) {
    return <p>Task not found</p>;
  }

  const handleDelete = () => {
    dispatch(deleteTask(id));
    navigate('/');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <p className="mb-2">{task.description}</p>
      <p className="mb-4">{task.dueDate}</p>
      <button onClick={handleDelete} className="mt-4 inline-block bg-red-500 text-white py-2 px-4 rounded">Delete Task</button>
      <Link to="/" className="ml-4 text-blue-500">Back to List</Link>
      <Link to={`/edit/${task.id}`} className="ml-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">Edit Task</Link>
    </div>
  );
}

export default TaskDetails;