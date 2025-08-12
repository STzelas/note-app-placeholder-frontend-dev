import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import type {NoteType} from "@/types/types.ts";
import {Trash2} from "lucide-react";
import axiosInstance from "@/api/axiosInstance.ts";


export default function NotesSidebar() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get("http://localhost:8080/api/notes", {
          withCredentials: true // ⬅ sends cookies with the request
        });
        setNotes(res.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) return <p>Loading notes...</p>;

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
              // onClick={createNewNote}
            >
              Create a note
            </Button>

          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-250px)] mt-5">
            <div>
              {notes.map(note => (
                <div
                  className={"p-3 rounded-md cursor-pointer hover:bg-accent transition-colors hover:bg-gray-200"}
                  key={note.id}
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
                        // onClick={() => onDeleteNote(note.id)}
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