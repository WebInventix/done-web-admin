import { createAsyncThunk } from "@reduxjs/toolkit";
import { type_constant } from "../utils/asyncStatus";

// Mock data store
let mockNotes = [
  {
    id: 1,
    userId: 1,
    first_name: "John",
    last_name: "Doe",
    userEmail: "john@example.com",
    note: "Good customer, pays on time",
    createdAt: "2025-12-20T10:30:00Z",
    updatedAt: "2025-12-20T10:30:00Z",
  },
  {
    id: 2,
    userId: 2,
    first_name: "Jane",
    last_name: "Smith",
    userEmail: "jane@example.com",
    note: "Requires follow-up for service completion",
    createdAt: "2025-12-19T14:45:00Z",
    updatedAt: "2025-12-19T14:45:00Z",
  },
];

let noteIdCounter = 3;

// Get all notes
export const get_notes_list = createAsyncThunk(
  type_constant.GET_NOTES_LIST,
  async () => {
    try {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        notes: mockNotes,
        message: "Notes fetched successfully",
      };
    } catch (error) {
      console.log("error from get notes list", error);
      throw Error(error.message);
    }
  }
);

// Get notes by user search
export const search_notes_by_user = createAsyncThunk(
  type_constant.SEARCH_NOTES_BY_USER,
  async (searchTerm) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const filtered = mockNotes.filter(
        (note) =>
          note.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return {
        notes: filtered,
        message: "Notes searched successfully",
      };
    } catch (error) {
      console.log("error from search notes by user", error);
      throw Error(error.message);
    }
  }
);

// Add new note
export const add_note_async = createAsyncThunk(
  type_constant.ADD_NOTE_ASYNC,
  async (noteData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const newNote = {
        id: noteIdCounter++,
        ...noteData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockNotes.push(newNote);
      return {
        note: newNote,
        message: "Note added successfully",
      };
    } catch (error) {
      console.log("error from add note", error);
      throw Error(error.message);
    }
  }
);

// Edit note
export const edit_note_async = createAsyncThunk(
  type_constant.EDIT_NOTE_ASYNC,
  async ({ id, data }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const noteIndex = mockNotes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        mockNotes[noteIndex] = {
          ...mockNotes[noteIndex],
          ...data,
          updatedAt: new Date().toISOString(),
        };
        return {
          note: mockNotes[noteIndex],
          message: "Note updated successfully",
        };
      }
      throw Error("Note not found");
    } catch (error) {
      console.log("error from edit note", error);
      throw Error(error.message);
    }
  }
);

// Delete note
export const delete_note_async = createAsyncThunk(
  type_constant.DELETE_NOTE_ASYNC,
  async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const noteIndex = mockNotes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        const deletedNote = mockNotes.splice(noteIndex, 1);
        return {
          deletedNoteId: id,
          message: "Note deleted successfully",
        };
      }
      throw Error("Note not found");
    } catch (error) {
      console.log("error from delete note", error);
      throw Error(error.message);
    }
  }
);
