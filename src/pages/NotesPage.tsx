import NotesSidebar from "@/components/NotesSidebar.tsx";
import NoteView from "@/components/NoteView.tsx";

const NotesPage = () => {


  // const handleAddNote = (note: Omit<Note, "id" | "createdAt">) => {
  //   const newNote: Note = {
  //     id: Date.now().toString(),
  //     createdAt: Date.now(),
  //     ...note,
  //   };
  //   setNotes((prev) => [newNote, ...prev]);
  // };

  // const handleCreateClick = () => {
  //   editorRef.current?.focusTitle(); // or scroll to editor, etc.
  // };
  //
  // const handleDeleteNote = (id: string) => {
  //   setNotes((prev) => prev.filter(note => note.id !== id));
  //
  // }

  return (
    <>
      <div className="flex justify-center w-full space-x-4 mt-2">
        <span className={"w-[25%]"}> <NotesSidebar/></span>
        <span className={"w-[75%] h-[75%]"}><NoteView/></span>
      </div>

      {/*<NoteView/> */}

    </>
  )
}

export default NotesPage;