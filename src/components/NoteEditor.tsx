import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Save, X } from "lucide-react";
import type {NoteEditorProps} from "@/types/types.ts";
import {useState} from "react";



const NoteEditor = ({onSave}: NoteEditorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!title) return;
    onSave({title, content});
    setTitle("");
    setContent("");
  };

  return (
    <Card>
      <CardHeader>
        <Input
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-bold border-none px-0 focus-visible:ring-0"
        />
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-[calc(100vh-350px)] resize-none border-none focus-visible:ring-0 p-0 "
        />
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}

export default NoteEditor;