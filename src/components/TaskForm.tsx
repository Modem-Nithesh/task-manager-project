import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { addTask, updateTask } from "../redux/taskSlice";
import React, { useEffect } from "react";

function TaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({ mode: "onSubmit" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const task = useSelector(state => state.tasks.find(task => task.id === id));

  // state => state.tasks.find(task => task.id === id)
  

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("dueDate", task.dueDate);
    }
  }, [task, setValue]);
  


  const onSubmit = (data) => {
    if (isEdit) {
      dispatch(updateTask({ id, ...data }));
    } else {
      dispatch(addTask({ id: Date.now().toString(), ...data }));
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Task" : "Create Task"}
      </h1>
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input
          {...register("title", { required: true })}
          className="border p-2 w-full"
        />
        {errors.title && <p className="text-red-500">Title is required</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          {...register("description", { required: true })}
          className="border p-2 w-full"
        />
        {errors.description && (
          <p className="text-red-500">Description is required</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Due Date</label>
        <input
          type="date"
          {...register("dueDate", { required: true })}
          className="border p-2 w-full"
        />
        {errors.dueDate && <p className="text-red-500">Due date is required</p>}
      </div>
      <button
        type="submit"
        className="inline-block bg-blue-500 text-white py-2 px-4 rounded"
      >
        {isEdit ? "Update" : "Create"}
      </button>
    </form>
  );
}

export default TaskForm;
