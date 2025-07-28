import { z } from 'zod';

export const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.number()
})

export type Note = z.infer<typeof noteSchema>;

export type NoteEditorProps = {
  note: Note;
  onSave: (note: Note) => void;
  onCancel: () => void;
}

export type NoteViewProps = {
  note: Note;
  onEdit: () => void;
}

export type NotesSidebarProps = {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  createNewNote: () => void;
  onDeleteNote: (id: string) => void;
  activeNoteId?: string;
}