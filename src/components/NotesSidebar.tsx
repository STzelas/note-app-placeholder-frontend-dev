import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import type {NotesSidebarProps} from "@/types/types.ts";


export default function NotesSidebar({notes, onDeleteNote, createNewNote}: NotesSidebarProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>My Notes</CardTitle>
      </CardHeader>
      <CardContent>
        {notes.length === 0 ? (
          <div className={"flex justify-between"}>
            <h3>No notes yet</h3>
            <Button
              className={""}
              onClick={createNewNote}
            >
              Create a note
            </Button>

          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-250px)] mt-5">
            <div>
              {notes.map(note => (
                <div
                  key={note.id}
                  className={"p-3 rounded-md cursor-pointer hover:bg-accent transition-colors"}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{note.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {note.content.slice(0, 50)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer"

                    >
                      <Trash2
                        onClick={() => onDeleteNote(note.id)}
                        className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}