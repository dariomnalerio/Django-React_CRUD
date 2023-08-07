import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { TaskProp } from "../types/types";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const params = useParams();
  const navigate = useNavigate();

  const handleToast = (title: string) => {
    toast.success(title, {
      position: "bottom-right",
      style: {
        background: "#101010",
        color: "#FFFFFF",
      },
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(parseInt(params.id), data as TaskProp);
      handleToast("Task successfully updated!");
    } else {
      await createTask(data as TaskProp);
      handleToast("Task successfully created!");
    }

    navigate("/tasks");
  });

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (isConfirmed && params.id) {
      await deleteTask(parseInt(params.id));
      handleToast("Task successfully deleted!");
      navigate("/tasks");
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const {
          data: { title, description },
        } = await getTask(parseInt(params.id));
        setValue("title", title);
        setValue("description", description);
      }
    };
    loadTask();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>This field is rerquired</span>}
        <textarea
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          rows={3}
          placeholder="description"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span>This field is rerquired</span>}
        <button
          className="bg-indigo-500 p-3 rounded-lg block w-full mt-3"
          type="submit"
        >
          {params.id ? "Edit" : "Create"}
        </button>
      </form>

        {params.id && (
          <button
            className="bg-red-500 p-3 rounded-lg block w-full mt-3"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
    </div>
  );
}
