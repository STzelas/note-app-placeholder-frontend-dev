import {Trash2, Edit, Save, X, Square, CheckSquare} from "lucide-react"
import type {TodoListProps} from "@/types/TodoTypes.ts";
import {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/textarea.tsx";


const TodoList = ({todos, dispatch, editInputRef, inputRef}: TodoListProps) => {
  const [editId, setEditId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  const handleDelete = (id: number) => () => {
    dispatch({type: "DELETE", payload: id})
  }

  const handleEdit = (id: number, text:string) => () => {
    setEditId(id)
    setEditText(text)
    editInputRef.current?.focus()
  }

  const handleCancel = () => {
    setEditId(null)
    setEditText("")
    inputRef.current?.focus()
  }

  const handleSave = (id: number) => () => {
    dispatch({type: "EDIT", payload: {id, newText: editText}})
    setEditId(null);
    setEditText("")
  }

  const handleToggle = (id: number) => () => {
    dispatch({type: "COMPLETE", payload: id})
  }

  useEffect(() => {
    editInputRef.current?.focus()
  })

  return (
    <>
      <div className={"max-h-[90vh] w-full"}>
        <ul className={"space-y-2 flex-wrap flex items-center min-w-sm space-x-5"}>
          {todos.map(
            todo => (
              <li key={todo.id}
                  className={`flex items-center justify-between bg-gray-100 p-2 rounded w-sm overflow-auto
              ${todo.completed ? "opacity-60 line-through" : ""}`}
              >
                { editId === todo.id ? (
                  <>
                    <div className={"flex flex-1 gap-2"}>
                      <Textarea
                        className={"border rounded p-1 max-w-xs text-wrap overflow-y-auto"}
                        value={editText}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditText(e.target.value)}
                        ref={editInputRef}
                      />
                    </div>
                    <div className={"flex gap-2"}>
                      <button
                        onClick={handleSave(todo.id)}
                        className={"text-cf-gray"}>
                        <Save size={18} />
                      </button>

                      <button
                        onClick={handleCancel}
                        className="text-cf-dark-red">
                        <X size={18} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 flex-1">
                      <button
                        className={"text-green-500"}
                        onClick={handleToggle(todo.id)}
                      >
                        {
                          todo.completed ? <CheckSquare size={18} /> : <Square size={18} />
                        }

                      </button>
                      <span>{todo.text}</span>
                    </div>


                    <div className={"flex gap-2"}>
                      <button
                        onClick={handleEdit(todo.id, todo.text)}
                        className={"text-cf-gray"}>
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={handleDelete(todo.id)}
                        className="text-cf-dark-red">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </li>
            )
          )}
        </ul>
      </div>

    </>
  )
}

export default TodoList