import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Save, X } from "lucide-react";
import {useForm} from "react-hook-form";
import {noteSchema, type NoteType} from "@/types/types.ts";
import {zodResolver} from "@hookform/resolvers/zod";

const NoteEditor = () => {

  const {
    register,
    handleSubmit,
  } = useForm<Omit<NoteType, "createdAt" | "updatedAt">>({
    resolver: zodResolver(noteSchema)
  })

  const onSubmit = async (data: Omit<NoteType, "createdAt" | "updatedAt">) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Submitted data: ", data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader>
          <Input
            placeholder="Note title"
            {...register("title")}
            id="title"
            // value={}
            // onChange={}
            className="text-xl font-bold border-none px-0 focus-visible:ring-0"
          />
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Write your note here..."
            {...register("content")}
            // value={}
            // onChange={}
            className="h-[calc(100vh-350px)] resize-none border-none focus-visible:ring-0 p-0"
          />
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            type={"submit"}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>

  );
}

export default NoteEditor;