import {useEffect, useState} from "react";
import type {TodoFormProps} from "@/types/TodoTypes.ts";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";


const ToDoForm = ({ dispatch, inputRef }: TodoFormProps) => {

  const [text, setText] = useState("");

  // const inputRef = useRef<HTMLInputElement>(null);


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() !== "") {
      dispatch({type: "ADD", payload: text})
      setText("")
      inputRef.current?.focus()
    }
  }

  const handleNoContent = () => {
    if (text.length === 0)
      inputRef.current?.focus()
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <>
      <form
        className={"flex gap-4 mb-4 justify-center mt-4"}
        onSubmit={handleSubmit}
      >
        <Textarea
          className={"border p-2 rounded-lg"}
          value={text}
          ref={inputRef}
          onChange={handleChange}
          placeholder={"New Task..."}/>
        <Button
          variant={"default"}
          type={"submit"}
          onClick={handleNoContent}
        >
          Add
        </Button>
      </form>
    </>
  )
}

export default ToDoForm;