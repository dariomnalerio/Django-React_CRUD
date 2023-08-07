import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import { TaskProp } from "../types/types";
import TaskCard from "./TaskCard";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const loadTasks = async () => {
      const res = await getAllTasks();
      setTasks(res.data);
    };

    loadTasks();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
        {tasks.map((task: TaskProp) => (
            <TaskCard task={task} key={task.id} />
        ))}
    </div>
  )
}
