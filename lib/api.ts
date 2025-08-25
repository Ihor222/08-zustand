import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!myKey) {
  throw new Error("Missing NEXT_PUBLIC_NOTEHUB_TOKEN in environment variables");
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

//  fetchNotes тепер підтримує tag
export const fetchNotes = async (
  page: number,
  search: string,
  tag?: NoteTag
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page };

  if (search.trim()) {
    params.search = search.trim();
  }

  if (tag) {
    params.tag = tag; // додаємо tag у query string
  }

  try {
    const res = await axios.get<FetchNotesResponse>("/notes", {
      params,
      headers: { Authorization: `Bearer ${myKey}` },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  try {
    const res = await axios.post<Note>("/notes", newNote, {
      headers: { Authorization: `Bearer ${myKey}` },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  try {
    const res = await axios.delete<Note>(`/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${myKey}` },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const res = await axios.get<Note>(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${myKey}` },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
