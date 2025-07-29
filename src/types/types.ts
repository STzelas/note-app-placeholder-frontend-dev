import { z } from 'zod';

export const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.number()
})

export type Note = z.infer<typeof noteSchema>;

export type NoteEditorHandle = {
  focusTitle: () => void;
};

export type NoteEditorProps = {
  onSave: (note: Omit<Note, "id" | "createdAt">) => void;
}

export type NoteViewProps = {
  note: Note;
  onEdit: () => void;
}

export type NotesSidebarProps = {
  notes: Note[];
  createNewNote: () => void;
  onDeleteNote: (id: string) => void;
}