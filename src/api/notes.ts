import type { NoteType} from "@/types/types.ts";
import axiosInstance from "@/api/axiosInstance.ts";
import type {AxiosError} from "axios";


export const saveNote = async ({title, content}: Omit<NoteType, "createdAt" | "updatedAt">) => {
  try {
    const response = await axiosInstance.post<NoteType>(
      `/notes/save`,
      { title, content },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ detail?: string }>;
    let detail = "Note save error.";
    if (err.response?.data?.detail) {
      detail = err.response.data.detail;
    }
    throw new Error(detail);
  }
}

export const updateNote = async (id: number, {title, content}: NoteType) => {
  console.log(id, title, content);
  try {
    const response = await axiosInstance.put(`/notes/${id}`, {title, content },
      {
        headers: {
          "Content-Type": "application/json",
        }
      });
    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<{ detail?: string }>;
    let detail = "Note update error.";
    if (err.response?.data?.detail) {
      detail = err.response.data.detail;
      console.log(detail)
    }
    throw new Error(detail);
  }
}
