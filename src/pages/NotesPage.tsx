import NoteEditor from "@/components/NoteEditor.tsx";
import NotesSidebar from "@/components/NotesSidebar.tsx";
import {useRef, useState} from "react";
import type {Note, NoteEditorHandle} from "@/types/types.ts";

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const editorRef = useRef<NoteEditorHandle>(null);

  const handleAddNote = (note: Omit<Note, "id" | "createdAt">) => {
    const newNote: Note = {
      id: Date.now().toString(),
      createdAt: Date.now(),
      ...note,
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleCreateClick = () => {
    editorRef.current?.focusTitle(); // or scroll to editor, etc.
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter(note => note.id !== id));

  }

  return (
    <>
      <div className="flex justify-center w-full space-x-4 mt-10">
        <span className={"w-[25%]"}> <NotesSidebar notes={notes} onDeleteNote={handleDeleteNote} createNewNote={handleCreateClick}/></span>
        <span className={"w-[75%]"}><NoteEditor onSave={handleAddNote}/></span>
      </div>

      {/*<NoteView/> */}

    </>
  )
}

export default NotesPage;