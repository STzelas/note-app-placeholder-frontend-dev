import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type {NoteViewProps} from "@/types/types.ts";


export default function NoteView({ note, onEdit }: NoteViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          -created at-
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-350px)]">
          <div>{note.content}</div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onEdit}>Edit Note</Button>
      </CardFooter>
    </Card>
  );
}