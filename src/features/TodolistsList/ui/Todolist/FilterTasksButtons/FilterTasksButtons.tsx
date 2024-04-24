import React, { Fragment } from "react";
import { Button } from "@mui/material";
import { useActions } from "common/hooks";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/TodolistsList/model/todolistsSlice";

type Props = {
  todolist: TodolistDomainType;
};
export const FilterTasksButtons = ({ todolist }: Props) => {
  const { filter, id } = todolist;
  const { changeTodolistFilter } = useActions(todolistsActions);

  const changeTasksFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ filter, id });
  };
  /*  const onAllClickHandler = () => changeTodolistFilter({ filter: "all", id });
  const onActiveClickHandler = () => changeTodolistFilter({ filter: "active", id });
  const onCompletedClickHandler = () => changeTodolistFilter({ filter: "completed", id });*/
  return (
    <Fragment>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => changeTasksFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => changeTasksFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => changeTasksFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </Fragment>
  );
};
