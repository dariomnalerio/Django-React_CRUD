import { TaskProp } from "../types/types";
import { useNavigate } from "react-router-dom";

export default function TaskCard({ task }: { task: TaskProp }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer rounded-md" onClick={handleNavigate}>
      <p className="text-xl font-bold">{task.title}</p>
      <p className="text-slate-400 mt-4">{task.description}</p>
    </div>
  );
}
