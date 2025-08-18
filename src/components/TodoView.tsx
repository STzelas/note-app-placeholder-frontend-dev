import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, Plus, Save, Trash2} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import { useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger, DialogDescription, DialogFooter, DialogClose} from "@/components/ui/dialog.tsx";
import {todoSchema, type TodoType, type TodoViewProps} from "@/types/types.ts";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {saveTodo} from "@/api/todo.ts";

const TodoView = ({loading, todos, onTodoDelete, onTodoCreate}: TodoViewProps) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskMenuOpen, setTaskMenuOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<TodoType>({
    resolver: zodResolver(todoSchema)
  })

  const handleCreate = async ({description, importance}: TodoType) => {
    console.log("Form data: ", description, importance)
    try {
      const savedTodo = await saveTodo({description, importance})
      onTodoCreate(savedTodo)
      setTaskMenuOpen(false);
      console.log("Successfully added task: ", savedTodo)
    } catch (err) {
      console.log("Error saving task", err);
    }
  }

  if (loading) return <p>Loading Tasks...</p>;
  return (
    <>
    <div className="flex flex-col max-w-8xl mx-auto p-8 space-y-4 mt-20">
      <div className="flex w-full justify-end">
        <Dialog open={taskMenuOpen} onOpenChange={setTaskMenuOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add new Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit(handleCreate)}>
              <DialogHeader>
                <DialogTitle>Add a new Task</DialogTitle>
                <DialogDescription>
                  Add a new Task by clicking 'Add Task'
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="description">Task Description</Label>
                  <Input
                    {...register("description")}
                    placeholder={"Description"}
                    id="description"
                  />
                  {errors.description && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.description.message}</div>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="importance">Task Importance</Label>
                  <Controller
                    name="importance"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="importance">
                          <SelectValue placeholder="Select importance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MINOR">MINOR</SelectItem>
                          <SelectItem value="MODERATE">MODERATE</SelectItem>
                          <SelectItem value="MAJOR">MAJOR</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.importance && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.importance.message}</div>}
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    type="button"
                  >Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >{isSubmitting ? "Adding..." : "Add Task"}</Button>
              </DialogFooter>
              </form>
            </DialogContent>
        </Dialog>


      </div>
      <div className="w-full mx-auto p-8 space-y-4 rounded-xl bg-white shadow-xl text-md overflow-auto border">
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Importance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id} className={"p-3 mr-5 rounded-xl cursor-pointer hover:bg-accent transition-colors hover:bg-gray-200"}>
                <TableCell className={"flex items-center justify-center"}>
                  <Checkbox className={"h4 w-4 bg-white border border-gray-300"}/>
                </TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell className={"font-semibold"}>{todo.importance}</TableCell>
                <TableCell>
                  <div className={"flex space-x-2"}>
                    <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>

                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 text-muted-foreground hover:text-black cursor-pointer"
                          >
                            <Pencil className={"h-4 w-4"}/>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <form>
                          <DialogHeader>
                            <DialogTitle>Edit Task</DialogTitle>
                            <DialogDescription>
                              Save the edited the task here by clicking 'Save'
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="description">Task Description</Label>
                              <Input placeholder={"Description"}/>
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="importance">Task Importance</Label>
                              <Controller
                                name="importance"
                                control={control}
                                render={({ field }) => (
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger id="importance">
                                      <SelectValue placeholder="Select importance" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="MINOR">MINOR</SelectItem>
                                      <SelectItem value="MODERATE">MODERATE</SelectItem>
                                      <SelectItem value="MAJOR">MAJOR</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline" >Cancel</Button>
                            </DialogClose>
                            <Button type="submit"><Save className={"h-4 w-4"}/>Save</Button>
                          </DialogFooter>
                          </form>
                        </DialogContent>

                    </Dialog>

                    <AlertDialog open={open} onOpenChange={setOpen}>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer"
                        >
                          <Trash2
                            className="h-4 w-4"/>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Task</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this task? This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              if (todo?.id) onTodoDelete(todo.id)
                            }}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                  </div>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>

    </>
  )
}

export default TodoView