import * as React from "react";

type TodoProps = {
  id: number;
  text: string;
  completed: boolean;
}

type Action =
  |{type: "ADD"; payload: string}
  |{type: "DELETE"; payload: number}
  |{type: "EDIT"; payload: {id: number, newText: string}}
  |{type: "COMPLETE"; payload: number}
  |{type: "CLEAR_ALL"}

type TodoFormProps = {
  dispatch: React.Dispatch<Action>
  inputRef: React.RefObject<HTMLTextAreaElement | null>
}

type TodoListProps = {
  todos: TodoProps[]
  dispatch: React.Dispatch<Action>
  editInputRef: React.RefObject<HTMLTextAreaElement | null>
  inputRef: React.RefObject<HTMLTextAreaElement | null>
}

export type { TodoProps, TodoFormProps, TodoListProps, Action}