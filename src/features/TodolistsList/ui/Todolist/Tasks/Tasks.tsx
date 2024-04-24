import React from "react";
import { Task } from "features/TodolistsList/ui/Todolist/Task/Task";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/TodolistsList/model/todolistsSlice";
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.type";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Tasks = ({ todolist, tasks }: Props) => {
  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
    </div>
  );
};
