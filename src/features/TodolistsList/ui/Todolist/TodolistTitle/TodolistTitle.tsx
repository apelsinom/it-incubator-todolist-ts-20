import React from "react";
import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolistsSlice";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist;
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistCallback = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleCallback = (title: string) => {
    changeTodolistTitle({ id, title });
  };

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleCallback} />
      <IconButton onClick={removeTodolistCallback} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
