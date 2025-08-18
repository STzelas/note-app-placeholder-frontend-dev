import TodoView from "@/components/TodoView.tsx";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.ts";
import type {TodoType} from "@/types/types.ts";
import {deleteTodo} from "@/api/todo.ts";

const TodoPage = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  useEffect(() => {
    document.title = "Your Notes";
    const fetchTodos = async () => {
      try {
        const res = await axiosInstance.get("http://localhost:8080/api/todos", {
          withCredentials: true // ⬅ sends cookies with the request
        });
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();

  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      if (selectedTodo?.id === id) setSelectedTodo(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      <TodoView
        todos={todos}
        loading={loading}
        onTodoDelete={handleDelete}
        onTodoCreate={todo => {
          setTodos(prevState => {
            const exists = prevState.find(t => t.id === todo.id)
            if (exists) {
              return prevState.map(t => t.id === todo.id ? todo : t)
            } else {
              setSelectedTodo(todo)
              return [...prevState, todo]
            }
          })
        }}
        // onTodoCreate={handleCreate}
        // onTodoEdit={}
        // onCreateNewTodo={}
      />
    </>
  )
}

export default TodoPage