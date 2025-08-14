import NotesSidebar from "@/components/NotesSidebar.tsx";
import NoteView from "@/components/NoteView.tsx";
import {useEffect, useState} from "react";
import type {NoteType} from "@/types/types.ts";
import axiosInstance from "@/api/axiosInstance.ts";

const NotesPage = () => {

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

  return (
    <>
      <div className="flex justify-center w-full space-x-4 mt-2">
        <span className={"w-[25%]"}> <NotesSidebar notes={notes} loading={loading}/></span>
        <span className={"w-[75%] h-[75%]"}><NoteView onNoteSaved={note => setNotes(prevState => [...prevState, note])}/></span>
      </div>

      {/*<NoteView/> */}

    </>
  )
}

export default NotesPage;