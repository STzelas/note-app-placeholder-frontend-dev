import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Button } from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {noteSchema, type NoteType, type NoteViewProps} from "@/types/types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Save} from "lucide-react";
import { saveNote } from "@/api/notes";


const NoteView = ({onNoteSaved}:NoteViewProps) => {

  const {
    register,
    handleSubmit,
  } = useForm<NoteType>({
    resolver: zodResolver(noteSchema)
  })

  const onSubmit = async ({title, content}: NoteType) => {
    console.log("Form data: ", title, content)
    try {
      const savedNote = await saveNote({title, content});
      onNoteSaved(savedNote);
      console.log(savedNote)
    } catch (error) {
      console.log("Save failed with error: ", error);
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
            id="content"
            // value={}
            // onChange={}
            className="h-[calc(100vh-350px)] resize-none border-none focus-visible:ring-0 p-0"
          />
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" type={"button"}>
            Edit Note
          </Button>
          <Button
            type="submit"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default NoteView;